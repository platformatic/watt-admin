import { RuntimeApiClient } from '@platformatic/control'
import type { Metric } from '@platformatic/control'
import type { FastifyInstance } from 'fastify'
import { requiredMetricKeys } from '../schemas/index.ts'
import type { MemoryDataPoint, CpuDataPoint } from '../schemas/index.ts'
import { bytesToMB } from './bytes.ts'
import { getReqRps } from './rps.ts'
import { addMetricDataPoint, initMetricsObject, initMetricsResponse, initServiceMetrics, isKafkaMetricName, isNodejsMetricName, isUndiciMetricName, isWebsocketMetricName, kafkaMetricMap, nodejsMetricMap, undiciMetricMap, websocketMetricMap } from './metrics-helpers.ts'

export const getMetrics = async ({ loaded: { metrics }, log }: FastifyInstance): Promise<void> => {
  const api = new RuntimeApiClient()
  try {
    const runtimes = await api.getRuntimes()
    for (const { pid } of runtimes) {
      const date = new Date().toISOString()
      const aggregatedMetrics = initMetricsObject(date)
      // A runtime with disabled metrics must not prevent collecting from the selected runtime.
      let runtimeMetrics: Metric[]
      try {
        runtimeMetrics = await api.getRuntimeMetrics(pid, { format: 'json' })
      } catch (error) {
        log.warn({ err: error, pid }, 'Unable to get runtime metrics. Retry will start soon...')
        continue
      }

      if (!Array.isArray(runtimeMetrics)) {
        continue
      }

      const rss = runtimeMetrics.findLast(metric => metric.name === 'process_resident_memory_bytes')
      const aggregatedRss = bytesToMB(rss?.values[0]?.value ?? 0)
      if (!metrics[pid]) {
        metrics[pid] = { services: {}, aggregated: initMetricsResponse() }
      }

      const runtimeApplications = await api.getRuntimeApplications(pid)
      const { applications } = runtimeApplications
      const entrypoint = 'entrypoint' in runtimeApplications ? runtimeApplications.entrypoint : undefined
      for (const service of applications) {
        const { id: serviceId } = service
        const workers = 'workers' in service && service?.workers ? service.workers : 1
        const areMultipleWorkersEnabled = workers > 1
        // v4 has no single entrypoint: aggregate traffic from all listening applications.
        const isEntrypointService = entrypoint === undefined
          ? 'servingState' in service && service.servingState === 'listening'
          : entrypoint === serviceId
        initServiceMetrics({ metrics, pid, serviceId, workers, areMultipleWorkersEnabled })
        const workerMetrics = initMetricsResponse(date, workers)
        const serviceMetrics = initMetricsObject(date)

        const incDataMetric = <T extends 'dataMem' | 'dataCpu'>({ key, workerId, data, prop }: { key: T, workerId: number, data: number, prop: Exclude<T extends 'dataMem' ? keyof MemoryDataPoint : keyof CpuDataPoint, 'date'> }) => {
          if (areMultipleWorkersEnabled) {
            workerMetrics[key as 'dataMem'][workerId][prop as 'rss'] = data
          }
          serviceMetrics[key as 'dataMem'][prop as 'rss'] += data
          aggregatedMetrics[key as 'dataMem'][prop as 'rss'] += serviceMetrics[key as 'dataMem'][prop as 'rss']
        }

        for (const metric of runtimeMetrics) {
          if (metric.values.length > 0) {
            const [{ value, labels }] = metric.values
            const workerId = labels.workerId ?? 0

            if (serviceId === labels.applicationId) {
              if (metric.name === 'nodejs_heap_size_total_bytes') {
                incDataMetric({ key: 'dataMem', workerId, data: bytesToMB(value), prop: 'totalHeap' })
              }

              if (metric.name === 'nodejs_heap_size_used_bytes') {
                incDataMetric({ key: 'dataMem', workerId, data: bytesToMB(value), prop: 'usedHeap' })
              }

              if (metric.name === 'nodejs_heap_space_size_used_bytes') {
                metric.values.forEach(({ value, labels }) => {
                  if (labels?.space === 'new') {
                    incDataMetric({ key: 'dataMem', workerId, data: bytesToMB(value), prop: 'newSpace' })
                  } else if (labels?.space === 'old') {
                    incDataMetric({ key: 'dataMem', workerId, data: bytesToMB(value), prop: 'oldSpace' })
                  }
                })
              }

              if (metric.name === 'thread_cpu_percent_usage') {
                incDataMetric({ key: 'dataCpu', workerId, data: value / workers, prop: 'cpu' })
              }

              if (metric.name === 'nodejs_eventloop_utilization') {
                incDataMetric({ key: 'dataCpu', workerId, data: (value * 100) / workers, prop: 'eventLoop' })
              }

              if (metric.name === 'http_request_all_summary_seconds') {
                for (const metricValue of metric.values) {
                  const data = metricValue.value * 1000
                  if (data > 0) {
                    if (metricValue.labels?.quantile === 0.9) {
                      if (data > serviceMetrics.dataLatency.p90) {
                        if (areMultipleWorkersEnabled) {
                          workerMetrics.dataLatency[workerId].p90 = data
                        }
                        serviceMetrics.dataLatency.p90 = data
                      }
                      if (isEntrypointService) {
                        aggregatedMetrics.dataLatency.p90 = Math.max(aggregatedMetrics.dataLatency.p90, serviceMetrics.dataLatency.p90)
                      }
                    }
                    if (metricValue.labels?.quantile === 0.95) {
                      if (data > serviceMetrics.dataLatency.p95) {
                        if (areMultipleWorkersEnabled) {
                          workerMetrics.dataLatency[workerId].p95 = data
                        }
                        serviceMetrics.dataLatency.p95 = data
                      }
                      if (isEntrypointService) {
                        aggregatedMetrics.dataLatency.p95 = Math.max(aggregatedMetrics.dataLatency.p95, serviceMetrics.dataLatency.p95)
                      }
                    }
                    if (metricValue.labels?.quantile === 0.99) {
                      if (data > serviceMetrics.dataLatency.p99) {
                        if (areMultipleWorkersEnabled) {
                          workerMetrics.dataLatency[workerId].p99 = data
                        }
                        serviceMetrics.dataLatency.p99 = data
                      }
                      if (isEntrypointService) {
                        aggregatedMetrics.dataLatency.p99 = Math.max(aggregatedMetrics.dataLatency.p99, serviceMetrics.dataLatency.p99)
                      }
                    }
                  }
                }
              }

              if (metric.name === 'http_request_all_duration_seconds') {
                const count = metric.values.reduce((acc, { metricName, value }) => {
                  if (metricName === 'http_request_all_duration_seconds_count') {
                    acc += value
                  }
                  return acc
                }, 0)
                if (!count) {
                  log.debug(metric.values, 'Empty HTTP request count')
                } else {
                  if (areMultipleWorkersEnabled) {
                    workerMetrics.dataReq[workerId].count = count
                    const rps = getReqRps(count, metrics[pid].services[serviceId][workerId].dataReq)
                    workerMetrics.dataReq[workerId].rps = rps
                  }
                  serviceMetrics.dataReq.count += count
                  const rps = getReqRps(serviceMetrics.dataReq.count, metrics[pid].services[serviceId].all.dataReq)
                  serviceMetrics.dataReq.rps = rps
                }
              }

              if (isUndiciMetricName(metric.name)) {
                const key = undiciMetricMap[metric.name]
                serviceMetrics.dataUndici[key] = value
                aggregatedMetrics.dataUndici[key] = value
                if (areMultipleWorkersEnabled) {
                  workerMetrics.dataUndici[workerId][key] = value
                }
              }

              if (isWebsocketMetricName(metric.name)) {
                const key = websocketMetricMap[metric.name]
                serviceMetrics.dataWebsocket[key] = value
                aggregatedMetrics.dataWebsocket[key] = value
                if (areMultipleWorkersEnabled) {
                  workerMetrics.dataWebsocket[workerId][key] = value
                }
              }

              if (isNodejsMetricName(metric.name)) {
                const key = nodejsMetricMap[metric.name]
                serviceMetrics.dataNodejs[key] = value
                aggregatedMetrics.dataNodejs[key] = value
                if (areMultipleWorkersEnabled) {
                  workerMetrics.dataNodejs[workerId][key] = value
                }
              }

              if (isKafkaMetricName(metric.name)) {
                const key = kafkaMetricMap[metric.name]
                serviceMetrics.dataKafka[key] = value
                aggregatedMetrics.dataKafka[key] = value
                if (areMultipleWorkersEnabled) {
                  workerMetrics.dataKafka[workerId][key] = value
                }
              }
            }
          }
        }

        serviceMetrics.dataMem.rss = aggregatedRss
        aggregatedMetrics.dataMem.rss = aggregatedRss

        if (isEntrypointService) {
          aggregatedMetrics.dataReq.count += serviceMetrics.dataReq.count
          aggregatedMetrics.dataReq.rps += serviceMetrics.dataReq.rps
        }

        if (areMultipleWorkersEnabled) {
          for (let i = 0; i < workers; i++) {
            workerMetrics.dataMem[i].rss = aggregatedRss
            requiredMetricKeys.forEach(key => addMetricDataPoint(metrics[pid].services[serviceId][i][key], workerMetrics[key][i]))
          }
        }

        requiredMetricKeys.forEach(key => addMetricDataPoint(metrics[pid].services[serviceId].all[key], serviceMetrics[key]))
      }
      requiredMetricKeys.forEach(key => addMetricDataPoint(metrics[pid].aggregated[key], aggregatedMetrics[key]))
    }
  } catch (error) {
    log.warn(error, 'Unable to get runtime metrics. Retry will start soon...')
  } finally {
    await api.close()
  }
}
