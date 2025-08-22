import { CpuDataPoint, KafkaDataPoint, LatencyDataPoint, MemoryDataPoint, MetricsResponse, RequestDataPoint, SingleMetricResponse, UndiciDataPoint, WebsocketDataPoint } from '../schemas'
import { MAX_STORED_METRICS } from './constants'

export type MappedMetrics = Record<number, {
  aggregated: MetricsResponse,
  services: Record<string, Record<'all' | number, MetricsResponse>>
}>

export const websocketMetricMap = {
  active_ws_composer_connections: 'connections',
} as const
export const isWebsocketMetricName = (metricName: string): metricName is keyof typeof websocketMetricMap => metricName in websocketMetricMap

export const undiciMetricMap = {
  http_client_stats_free: 'idleSockets',
  http_client_stats_connected: 'openSockets',
  http_client_stats_pending: 'pendingRequests',
  http_client_stats_queued: 'queuedRequests',
  http_client_stats_running: 'activeRequests',
  http_client_stats_size: 'sizeRequests'
} as const
export const isUndiciMetricName = (metricName: string): metricName is keyof typeof undiciMetricMap => metricName in undiciMetricMap

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

export const addMetricDataPoint = <T extends MemoryDataPoint | CpuDataPoint | LatencyDataPoint | RequestDataPoint | KafkaDataPoint | UndiciDataPoint | WebsocketDataPoint>(metrics: T[], dataPoint: T) => {
  if (metrics.length >= MAX_STORED_METRICS) {
    metrics.shift()
  }
  metrics.push(dataPoint)
}

export const initMetricsObject = (date: string): SingleMetricResponse => ({ dataMem: initMemData(date), dataCpu: initCpuData(date), dataKafka: initKafkaData(date), dataReq: initReqData(date), dataLatency: initLatencyData(date), dataUndici: initUndiciData(date), dataWebsocket: initWebsocketData(date) })

export const initMetricsResponse = (date?: string, length?: number): MetricsResponse => {
  const isArray = date && length
  return {
    dataCpu: isArray ? Array.from({ length }, () => initCpuData(date)) : [],
    dataLatency: isArray ? Array.from({ length }, () => initLatencyData(date)) : [],
    dataMem: isArray ? Array.from({ length }, () => initMemData(date)) : [],
    dataReq: isArray ? Array.from({ length }, () => initReqData(date)) : [],
    dataKafka: isArray ? Array.from({ length }, () => initKafkaData(date)) : [],
    dataUndici: isArray ? Array.from({ length }, () => initUndiciData(date)) : [],
    dataWebsocket: isArray ? Array.from({ length }, () => initWebsocketData(date)) : [],
  }
}

const initMemData = (date: string): MemoryDataPoint => ({ date, rss: 0, totalHeap: 0, usedHeap: 0, newSpace: 0, oldSpace: 0 })
const initCpuData = (date: string): CpuDataPoint => ({ date, cpu: 0, eventLoop: 0 })
const initLatencyData = (date: string): LatencyDataPoint => ({ date, p90: 0, p95: 0, p99: 0 })
const initReqData = (date: string): RequestDataPoint => ({ date, count: 0, rps: 0, })
const initKafkaData = (date: string): KafkaDataPoint => ({ date, consumedMessages: 0, consumers: 0, consumersStreams: 0, consumersTopics: 0, hooksDlqMessagesTotal: 0, hooksMessagesInFlight: 0, producedMessages: 0, producers: 0 })
const initUndiciData = (date: string): UndiciDataPoint => ({ date, activeRequests: 0, idleSockets: 0, openSockets: 0, pendingRequests: 0, queuedRequests: 0, sizeRequests: 0 })
const initWebsocketData = (date: string): WebsocketDataPoint => ({ date, connections: 0 })

export const initServiceMetrics = ({ areMultipleWorkersEnabled, metrics, pid, serviceId, workers }: {
  metrics: MappedMetrics,
  pid: number,
  serviceId: string,
  workers: number,
  areMultipleWorkersEnabled: boolean
}): void => {
  if (!metrics[pid].services[serviceId]) {
    metrics[pid].services[serviceId] = { all: initMetricsResponse() }

    if (areMultipleWorkersEnabled) {
      for (let i = 0; i < workers; i++) {
        metrics[pid].services[serviceId][i] = initMetricsResponse()
      }
    }
  }
}
