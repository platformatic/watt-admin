import { RuntimeApiClient } from '@platformatic/control'
import { FastifyInstance } from 'fastify'
import type { CpuDataPoint, LatencyDataPoint, MemoryDataPoint, MetricsResponse, RequestDataPoint } from '../schemas'

export type MappedMetrics = Record<number, {
  aggregated: MetricsResponse,
  services: Record<string, Record<'all' | number, MetricsResponse>>
}>

// This is to avoid the mapped metrics array from growing indefinitely (and therefore a memory leak)
const MAX_STORED_METRICS = 20

export const calcReqRps = (count: number, req: RequestDataPoint[]) => Math.abs(count - (req[req.length - 1]?.count || 0))

const initMetricsResponse = (): MetricsResponse => ({ dataCpu: [], dataLatency: [], dataMem: [], dataReq: [] })

const initMemData = (date: string): MemoryDataPoint => ({ date, rss: 0, totalHeap: 0, usedHeap: 0, newSpace: 0, oldSpace: 0 })

const initCpuData = (date: string): CpuDataPoint => ({ date, cpu: 0, eventLoop: 0 })

const initLatencyData = (date: string): LatencyDataPoint => ({ date, p90: 0, p95: 0, p99: 0 })

const initReqData = (date: string): RequestDataPoint => ({ date, count: 0, rps: 0, })

export const calculateMetrics = async ({ mappedMetrics, log }: FastifyInstance): Promise<void> => {
  try {
    const api = new RuntimeApiClient()
    const runtimes = await api.getRuntimes()
    for (const { pid } of runtimes) {
      const date = new Date().toISOString()
      const aggregatedMemData = initMemData(date)
      const aggregatedCpuData = initCpuData(date)
      const aggregatedLatencyData = initLatencyData(date)
      const aggregatedReqData = initReqData(date)
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

        if (!mappedMetrics[pid].services[serviceId]) {
          mappedMetrics[pid].services[serviceId] = { all: initMetricsResponse() }

          if (areMultipleWorkersEnabled) {
            for (let i = 0; i < workers; i++) {
              mappedMetrics[pid].services[serviceId][i] = initMetricsResponse()
            }
          }
        }

        const workersMemData: MemoryDataPoint[] = Array.from({ length: workers }, () => initMemData(date))
        const workersCpuData: CpuDataPoint[] = Array.from({ length: workers }, () => initCpuData(date))
        const workersLatencyData: LatencyDataPoint[] = Array.from({ length: workers }, () => initLatencyData(date))
        const workersReqData: RequestDataPoint[] = Array.from({ length: workers }, () => initReqData(date))
        const serviceMemData = initMemData(date)
        const serviceCpuData = initCpuData(date)
        const serviceLatencyData = initLatencyData(date)
        const serviceReqData = initReqData(date)

        for (const metric of runtimeMetrics) {
          if (metric.values.length > 0) {
            const [{ value, labels }] = metric.values
            const workerId = labels.workerId ?? 0

            if (isEntrypointService) {
              if (metric.name === 'process_resident_memory_bytes') {
                aggregatedRss = calcBytesToMB(value)
              }
            }

            if (serviceId === labels.serviceId) {
              if (metric.name === 'nodejs_heap_size_total_bytes') {
                const data = calcBytesToMB(value)
                if (areMultipleWorkersEnabled) {
                  workersMemData[workerId].totalHeap = data
                }
                serviceMemData.totalHeap += data
                aggregatedMemData.totalHeap += serviceMemData.totalHeap
              }

              if (metric.name === 'nodejs_heap_size_used_bytes') {
                const data = calcBytesToMB(value)
                if (areMultipleWorkersEnabled) {
                  workersMemData[workerId].usedHeap = data
                }
                serviceMemData.usedHeap += data
                aggregatedMemData.usedHeap += serviceMemData.usedHeap
              }

              if (metric.name === 'nodejs_heap_space_size_used_bytes') {
                metric.values.forEach(val => {
                  const data = calcBytesToMB(val.value)
                  if (val.labels?.space === 'new') {
                    if (areMultipleWorkersEnabled) {
                      workersMemData[workerId].newSpace = data
                    }
                    serviceMemData.newSpace += data
                    aggregatedMemData.newSpace += serviceMemData.newSpace
                  } else if (val.labels?.space === 'old') {
                    if (areMultipleWorkersEnabled) {
                      workersMemData[workerId].oldSpace = data
                    }
                    serviceMemData.oldSpace += data
                    aggregatedMemData.oldSpace += serviceMemData.oldSpace
                  }
                })
              }

              if (metric.name === 'thread_cpu_percent_usage') {
                const data = value / workers
                if (areMultipleWorkersEnabled) {
                  workersCpuData[workerId].cpu = data
                }
                serviceCpuData.cpu += data
                aggregatedCpuData.cpu += serviceCpuData.cpu
              }

              if (metric.name === 'nodejs_eventloop_utilization') {
                const data = (value * 100) / workers
                if (areMultipleWorkersEnabled) {
                  workersCpuData[workerId].eventLoop = data
                }
                serviceCpuData.eventLoop += data
                aggregatedCpuData.eventLoop += serviceCpuData.eventLoop
              }

              if (metric.name === 'http_request_all_summary_seconds') {
                for (const metricValue of metric.values) {
                  const data = metricValue.value * 1000
                  if (data > 0) {
                    if (metricValue.labels?.quantile === 0.9) {
                      if (data > serviceLatencyData.p90) {
                        if (areMultipleWorkersEnabled) {
                          workersLatencyData[workerId].p90 = data
                        }
                        serviceLatencyData.p90 = data
                      }
                      if (isEntrypointService) {
                        aggregatedLatencyData.p90 = serviceLatencyData.p90
                      }
                    }
                    if (metricValue.labels?.quantile === 0.95) {
                      if (data > serviceLatencyData.p95) {
                        if (areMultipleWorkersEnabled) {
                          workersLatencyData[workerId].p95 = data
                        }
                        serviceLatencyData.p95 = data
                      }
                      if (isEntrypointService) {
                        aggregatedLatencyData.p95 = serviceLatencyData.p95
                      }
                    }
                    if (metricValue.labels?.quantile === 0.99) {
                      if (data > serviceLatencyData.p99) {
                        if (areMultipleWorkersEnabled) {
                          workersLatencyData[workerId].p99 = data
                        }
                        serviceLatencyData.p99 = data
                      }
                      if (isEntrypointService) {
                        aggregatedLatencyData.p99 = serviceLatencyData.p99
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
                    /*
                      TODO: The check above is to avoid duplicated data returned from `@platformatic/control`. For instance, we may received values like:

                        ...
                        {
                          "value": 56,
                          "metricName": "http_request_duration_seconds_count",
                          "labels": {
                            "method": "GET",
                            "route": "/typescript/",
                            "status_code": 200,
                            "telemetry_id": "unknown",
                            "serviceId": "composer"
                          }
                        }, {
                          "value": 56,
                          "metricName": "http_request_duration_seconds_count",
                          "labels": {
                            "method": "GET",
                            "route": "/typescript",
                            "status_code": 200,
                            "telemetry_id": "unknown",
                            "serviceId": "composer"
                          }
                        }
                        ...

                        Evaluate if this approach is correct (on `@platformatic/control`) and update this code accordingly in case of an update from the lib itself.
                     */
                    acc += value
                    alreadyIteratedRoutes[cleanRouteLabel] = true
                  }
                  return acc
                }, 0)
                if (!count) {
                  log.debug(metric.values, 'Empty HTTP request count')
                } else {
                  if (areMultipleWorkersEnabled) {
                    workersReqData[workerId].count = count
                    const rps = calcReqRps(count, mappedMetrics[pid].services[serviceId][workerId].dataReq)
                    workersReqData[workerId].rps = rps
                  }
                  serviceReqData.count += count
                  const rps = calcReqRps(serviceReqData.count, mappedMetrics[pid].services[serviceId].all.dataReq)
                  serviceReqData.rps = rps

                  if (isEntrypointService) {
                    aggregatedReqData.count = serviceReqData.count
                    aggregatedReqData.rps = rps
                  }
                }
              }
            }
          }
        }

        serviceMemData.rss = aggregatedRss
        aggregatedMemData.rss = aggregatedRss

        if (areMultipleWorkersEnabled) {
          for (let i = 0; i < workers; i++) {
            workersMemData[i].rss = aggregatedRss

            if (mappedMetrics[pid].services[serviceId][i].dataMem.length >= MAX_STORED_METRICS) {
              mappedMetrics[pid].services[serviceId][i].dataMem.shift()
            }
            if (mappedMetrics[pid].services[serviceId][i].dataCpu.length >= MAX_STORED_METRICS) {
              mappedMetrics[pid].services[serviceId][i].dataCpu.shift()
            }
            if (mappedMetrics[pid].services[serviceId][i].dataLatency.length >= MAX_STORED_METRICS) {
              mappedMetrics[pid].services[serviceId][i].dataLatency.shift()
            }
            if (mappedMetrics[pid].services[serviceId][i].dataReq.length >= MAX_STORED_METRICS) {
              mappedMetrics[pid].services[serviceId][i].dataReq.shift()
            }

            mappedMetrics[pid].services[serviceId][i].dataMem.push(workersMemData[i])
            mappedMetrics[pid].services[serviceId][i].dataCpu.push(workersCpuData[i])
            mappedMetrics[pid].services[serviceId][i].dataLatency.push(workersLatencyData[i])
            mappedMetrics[pid].services[serviceId][i].dataReq.push(workersReqData[i])
          }
        }

        if (mappedMetrics[pid].services[serviceId].all.dataMem.length >= MAX_STORED_METRICS) {
          mappedMetrics[pid].services[serviceId].all.dataMem.shift()
        }
        if (mappedMetrics[pid].services[serviceId].all.dataCpu.length >= MAX_STORED_METRICS) {
          mappedMetrics[pid].services[serviceId].all.dataCpu.shift()
        }
        if (mappedMetrics[pid].services[serviceId].all.dataLatency.length >= MAX_STORED_METRICS) {
          mappedMetrics[pid].services[serviceId].all.dataLatency.shift()
        }
        if (mappedMetrics[pid].services[serviceId].all.dataReq.length >= MAX_STORED_METRICS) {
          mappedMetrics[pid].services[serviceId].all.dataReq.shift()
        }
        mappedMetrics[pid].services[serviceId].all.dataMem.push(serviceMemData)
        mappedMetrics[pid].services[serviceId].all.dataCpu.push(serviceCpuData)
        mappedMetrics[pid].services[serviceId].all.dataLatency.push(serviceLatencyData)
        mappedMetrics[pid].services[serviceId].all.dataReq.push(serviceReqData)
      }

      if (mappedMetrics[pid].aggregated.dataMem.length >= MAX_STORED_METRICS) {
        mappedMetrics[pid].aggregated.dataMem.shift()
      }
      if (mappedMetrics[pid].aggregated.dataCpu.length >= MAX_STORED_METRICS) {
        mappedMetrics[pid].aggregated.dataCpu.shift()
      }
      if (mappedMetrics[pid].aggregated.dataLatency.length >= MAX_STORED_METRICS) {
        mappedMetrics[pid].aggregated.dataLatency.shift()
      }
      if (mappedMetrics[pid].aggregated.dataReq.length >= MAX_STORED_METRICS) {
        mappedMetrics[pid].aggregated.dataReq.shift()
      }

      mappedMetrics[pid].aggregated.dataMem.push(aggregatedMemData)
      mappedMetrics[pid].aggregated.dataCpu.push(aggregatedCpuData)
      mappedMetrics[pid].aggregated.dataLatency.push(aggregatedLatencyData)
      mappedMetrics[pid].aggregated.dataReq.push(aggregatedReqData)
    }
  } catch (error) {
    log.warn(error, 'Unable to get runtime metrics. Retry will start soon...')
  }
}

export const calcBytesToMB = (bytes: number): number => Number((bytes / (1024 * 1024)).toFixed(2))
