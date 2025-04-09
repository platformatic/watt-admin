import { RuntimeApiClient } from '@platformatic/control'
import { FastifyInstance } from 'fastify'

interface CommonMetricData {
  date: Date;
}

interface MemoryDataPoint extends CommonMetricData {
  rss: number;
  totalHeap: number;
  usedHeap: number;
  newSpace: number;
  oldSpace: number;
}

interface CpuDataPoint extends CommonMetricData {
  cpu: number;
  eventLoop: number;
}

interface LatencyDataPoint extends CommonMetricData {
  p90: number;
  p95: number;
  p99: number;
}

interface RequestDataPoint extends CommonMetricData {
  count: number;
  rps: number
}

export interface MetricsResponse {
  dataMem: MemoryDataPoint[];
  dataCpu: CpuDataPoint[];
  dataLatency: LatencyDataPoint[];
  dataReq: RequestDataPoint[];
}

export type MappedMetrics = Record<number, {
  aggregated: MetricsResponse,
  services: Record<string, MetricsResponse>
}>

// This is to avoid the mapped metrics array from growing indefinitely (and therefore a memory leak)
const MAX_STORED_METRICS = 20

export const calculateMetrics = async ({ mappedMetrics, log }: FastifyInstance): Promise<void> => {
  try {
    const api = new RuntimeApiClient()
    const runtimes = await api.getRuntimes()
    for (const { pid } of runtimes) {
      const date = new Date()
      const aggregatedMemData: MemoryDataPoint = {
        date,
        rss: 0,
        totalHeap: 0,
        usedHeap: 0,
        newSpace: 0,
        oldSpace: 0
      }
      const aggregatedCpuData: CpuDataPoint = {
        date,
        cpu: 0,
        eventLoop: 0
      }
      const aggregatedLatencyData: LatencyDataPoint = {
        date,
        p90: 0,
        p95: 0,
        p99: 0
      }
      const aggregatedReqData: RequestDataPoint = {
        date,
        count: 0,
        rps: 0,
      }
      let aggregatedRss = 0

      const runtimeMetrics = await api.getRuntimeMetrics(pid, { format: 'json' })
      if (!mappedMetrics[pid]) {
        mappedMetrics[pid] = { services: {}, aggregated: { dataCpu: [], dataLatency: [], dataMem: [], dataReq: [] } }
      }

      const { services, entrypoint } = await api.getRuntimeServices(pid)
      for (const { id: serviceId } of services) {
        const isEntrypointService = entrypoint === serviceId

        if (!mappedMetrics[pid].services[serviceId]) {
          mappedMetrics[pid].services[serviceId] = { dataCpu: [], dataLatency: [], dataMem: [], dataReq: [] }
        }

        const serviceMemData: MemoryDataPoint = {
          date,
          rss: 0,
          totalHeap: 0,
          usedHeap: 0,
          newSpace: 0,
          oldSpace: 0
        }
        const serviceCpuData: CpuDataPoint = {
          date,
          cpu: 0,
          eventLoop: 0
        }
        const serviceLatencyData: LatencyDataPoint = {
          date,
          p90: 0,
          p95: 0,
          p99: 0
        }
        const serviceReqData: RequestDataPoint = {
          date,
          count: 0,
          rps: 0
        }

        for (const metric of runtimeMetrics) {
          if (metric.values.length > 0) {
            const [{ value, labels }] = metric.values

            if (metric.name === 'process_resident_memory_bytes') {
              aggregatedRss = calcBytesToMB(value)
            }

            if (serviceId === labels.serviceId) {
              if (metric.name === 'nodejs_heap_size_total_bytes') {
                serviceMemData.totalHeap = calcBytesToMB(value)
                aggregatedMemData.totalHeap += serviceMemData.totalHeap
              }

              if (metric.name === 'nodejs_heap_size_used_bytes') {
                serviceMemData.usedHeap = calcBytesToMB(value)
                aggregatedMemData.usedHeap += serviceMemData.usedHeap
              }

              if (metric.name === 'nodejs_heap_space_size_used_bytes') {
                metric.values.forEach(val => {
                  if (val.labels?.space === 'new') {
                    serviceMemData.newSpace = calcBytesToMB(val.value)
                    aggregatedMemData.newSpace += serviceMemData.newSpace
                  } else if (val.labels?.space === 'old') {
                    serviceMemData.oldSpace = calcBytesToMB(val.value)
                    aggregatedMemData.oldSpace += serviceMemData.oldSpace
                  }
                })
              }

              if (metric.name === 'thread_cpu_percent_usage') {
                serviceCpuData.cpu = value
                aggregatedCpuData.cpu += serviceCpuData.cpu
              }

              if (metric.name === 'nodejs_eventloop_utilization') {
                serviceCpuData.eventLoop = value * 100
                aggregatedCpuData.eventLoop += serviceCpuData.eventLoop
              }

              if (metric.name === 'http_request_all_summary_seconds') {
                for (const metricValue of metric.values) {
                  const data = metricValue.value * 1000
                  if (data > 0) {
                    if (metricValue.labels?.quantile === 0.9) {
                      serviceLatencyData.p90 = data
                      if (isEntrypointService) {
                        aggregatedLatencyData.p90 = data
                      }
                    }
                    if (metricValue.labels?.quantile === 0.95) {
                      serviceLatencyData.p95 = data
                      if (isEntrypointService) {
                        aggregatedLatencyData.p95 = data
                      }
                    }
                    if (metricValue.labels?.quantile === 0.99) {
                      serviceLatencyData.p99 = data
                      if (isEntrypointService) {
                        aggregatedLatencyData.p99 = data
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
                  const req = mappedMetrics[pid].services[serviceId].dataReq
                  const rps = count - (req[req.length - 1]?.count || 0)
                  serviceReqData.rps = rps
                  serviceReqData.count = count

                  if (isEntrypointService) {
                    aggregatedReqData.count = count
                    aggregatedReqData.rps = rps
                  }
                }
              }
            }
          }
        }

        serviceMemData.rss = aggregatedRss
        aggregatedMemData.rss = aggregatedRss
        if (mappedMetrics[pid].services[serviceId].dataMem.length >= MAX_STORED_METRICS) {
          mappedMetrics[pid].services[serviceId].dataMem.shift()
        }
        if (mappedMetrics[pid].services[serviceId].dataCpu.length >= MAX_STORED_METRICS) {
          mappedMetrics[pid].services[serviceId].dataCpu.shift()
        }
        if (mappedMetrics[pid].services[serviceId].dataLatency.length >= MAX_STORED_METRICS) {
          mappedMetrics[pid].services[serviceId].dataLatency.shift()
        }
        if (mappedMetrics[pid].services[serviceId].dataReq.length >= MAX_STORED_METRICS) {
          mappedMetrics[pid].services[serviceId].dataReq.shift()
        }
        mappedMetrics[pid].services[serviceId].dataMem.push(serviceMemData)
        mappedMetrics[pid].services[serviceId].dataCpu.push(serviceCpuData)
        mappedMetrics[pid].services[serviceId].dataLatency.push(serviceLatencyData)
        mappedMetrics[pid].services[serviceId].dataReq.push(serviceReqData)
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
