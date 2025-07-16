import { CpuDataPoint, KafkaDataPoint, LatencyDataPoint, MemoryDataPoint, MetricsResponse, RequestDataPoint, SingleMetricResponse } from '../schemas'

export type MappedMetrics = Record<number, {
  aggregated: MetricsResponse,
  services: Record<string, Record<'all' | number, MetricsResponse>>
}>

// This is to avoid the mapped metrics array from growing indefinitely (and therefore a memory leak)
const MAX_STORED_METRICS = 20

export const kafkaMetricMap = {
  kafka_producers: 'producers',
  kafka_produced_messages: 'producedMessages',
  kafka_consumers: 'consumers',
  kafka_consumers_streams: 'consumersStreams',
  kafka_consumers_topics: 'consumersTopics',
  kafka_consumed_messages: 'consumedMessages',
  kafka_hooks_messages_in_flight: 'hooksMessagesInFlight',
  kafka_hooks_dlq_messages_total: 'hooksDlqMessagesTotal'
} as const
export const isKafkaMetricName = (metricName: string): metricName is keyof typeof kafkaMetricMap => metricName in kafkaMetricMap

export const addMetricDataPoint = <T extends MemoryDataPoint | CpuDataPoint | LatencyDataPoint | RequestDataPoint | KafkaDataPoint>(metrics: T[], dataPoint: T) => {
  if (metrics.length >= MAX_STORED_METRICS) {
    metrics.shift()
  }
  metrics.push(dataPoint)
}

export const initMetricsObject = (date: string): SingleMetricResponse => ({ dataMem: initMemData(date), dataCpu: initCpuData(date), dataKafka: initKafkaData(date), dataReq: initReqData(date), dataLatency: initLatencyData(date) })

export const initMetricsResponse = (date?: string, length?: number): MetricsResponse => {
  const isArray = date && length
  return {
    dataCpu: isArray ? Array.from({ length }, () => initCpuData(date)) : [],
    dataLatency: isArray ? Array.from({ length }, () => initLatencyData(date)) : [],
    dataMem: isArray ? Array.from({ length }, () => initMemData(date)) : [],
    dataReq: isArray ? Array.from({ length }, () => initReqData(date)) : [],
    dataKafka: isArray ? Array.from({ length }, () => initKafkaData(date)) : []
  }
}

const initMemData = (date: string): MemoryDataPoint => ({ date, rss: 0, totalHeap: 0, usedHeap: 0, newSpace: 0, oldSpace: 0 })
const initCpuData = (date: string): CpuDataPoint => ({ date, cpu: 0, eventLoop: 0 })
const initLatencyData = (date: string): LatencyDataPoint => ({ date, p90: 0, p95: 0, p99: 0 })
const initReqData = (date: string): RequestDataPoint => ({ date, count: 0, rps: 0, })
const initKafkaData = (date: string): KafkaDataPoint => ({ date, consumedMessages: 0, consumers: 0, consumersStreams: 0, consumersTopics: 0, hooksDlqMessagesTotal: 0, hooksMessagesInFlight: 0, producedMessages: 0, producers: 0 })

export const initServiceMetrics = ({ areMultipleWorkersEnabled, mappedMetrics, pid, serviceId, workers }: {
  mappedMetrics: MappedMetrics,
  pid: number,
  serviceId: string,
  workers: number,
  areMultipleWorkersEnabled: boolean
}): void => {
  if (!mappedMetrics[pid].services[serviceId]) {
    mappedMetrics[pid].services[serviceId] = { all: initMetricsResponse() }

    if (areMultipleWorkersEnabled) {
      for (let i = 0; i < workers; i++) {
        mappedMetrics[pid].services[serviceId][i] = initMetricsResponse()
      }
    }
  }
}
