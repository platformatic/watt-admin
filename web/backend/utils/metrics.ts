import { RuntimeApiClient } from '@platformatic/control'
import { FastifyInstance } from 'fastify'
import { requiredMetricKeys, MemoryDataPoint, CpuDataPoint } from '../schemas'
import { bytesToMB } from './bytes'
import { getReqRps } from './rps'
import { addMetricDataPoint, initMetricsObject, initMetricsResponse, initServiceMetrics, isKafkaMetricName, kafkaMetricMap } from './metrics-helpers'

export const getMetrics = async ({ mappedMetrics, log }: FastifyInstance): Promise<void> => {
  try {
    const api = new RuntimeApiClient()
    const runtimes = await api.getRuntimes()
    for (const { pid } of runtimes) {
      const date = new Date().toISOString()
      const aggregatedMetrics = initMetricsObject(date)
      let aggregatedRss = 0

      const runtimeMetrics = await api.getRuntimeMetrics(pid, { format: 'json' })
      if (!mappedMetrics[pid]) {
        mappedMetrics[pid] = { services: {}, aggregated: initMetricsResponse() }
      }

      const { services, entrypoint } = await api.getRuntimeServices(pid)
      for (const service of services) {
        const { id: serviceId } = service
        const workers = 'workers' in service && service?.workers ? service.workers : 1
        const areMultipleWorkersEnabled = workers > 1
        const isEntrypointService = entrypoint === serviceId
        initServiceMetrics({ mappedMetrics, pid, serviceId, workers, areMultipleWorkersEnabled })
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

            if (isEntrypointService) {
              if (metric.name === 'process_resident_memory_bytes') {
                aggregatedRss = bytesToMB(value)
              }
            }

            if (serviceId === labels.serviceId) {
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
                        aggregatedMetrics.dataLatency.p90 = serviceMetrics.dataLatency.p90
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
                        aggregatedMetrics.dataLatency.p95 = serviceMetrics.dataLatency.p95
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
                        aggregatedMetrics.dataLatency.p99 = serviceMetrics.dataLatency.p99
                      }
                    }
                  }
                }
              }

              if (metric.name === 'http_request_duration_seconds') {
                const alreadyIteratedRoutes: Record<string, boolean> = {}
                const count = metric.values.reduce((acc, { metricName, value, labels }) => {
                  const routeLabel = labels.route || ''
                  const cleanRouteLabel = routeLabel?.endsWith('/') ? routeLabel.slice(0, -1) : routeLabel
                  if (metricName === 'http_request_duration_seconds_count' && !alreadyIteratedRoutes[cleanRouteLabel]) {
                    // The check above is to avoid duplicated data returned from `@platformatic/control`, when `route` have trailing slash (or not)
                    acc += value
                    alreadyIteratedRoutes[cleanRouteLabel] = true
                  }
                  return acc
                }, 0)
                if (!count) {
                  log.debug(metric.values, 'Empty HTTP request count')
                } else {
                  if (areMultipleWorkersEnabled) {
                    workerMetrics.dataReq[workerId].count = count
                    const rps = getReqRps(count, mappedMetrics[pid].services[serviceId][workerId].dataReq)
                    workerMetrics.dataReq[workerId].rps = rps
                  }
                  serviceMetrics.dataReq.count += count
                  const rps = getReqRps(serviceMetrics.dataReq.count, mappedMetrics[pid].services[serviceId].all.dataReq)
                  serviceMetrics.dataReq.rps = rps

                  if (isEntrypointService) {
                    aggregatedMetrics.dataReq.count = serviceMetrics.dataReq.count
                    aggregatedMetrics.dataReq.rps = rps
                  }
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

        if (areMultipleWorkersEnabled) {
          for (let i = 0; i < workers; i++) {
            workerMetrics.dataMem[i].rss = aggregatedRss
            requiredMetricKeys.forEach(key => addMetricDataPoint(mappedMetrics[pid].services[serviceId][i][key], workerMetrics[key][i]))
          }
        }

        requiredMetricKeys.forEach(key => addMetricDataPoint(mappedMetrics[pid].services[serviceId].all[key], serviceMetrics[key]))
      }
      requiredMetricKeys.forEach(key => addMetricDataPoint(mappedMetrics[pid].aggregated[key], aggregatedMetrics[key]))
    }
  } catch (error) {
    log.warn(error, 'Unable to get runtime metrics. Retry will start soon...')
  }
}
