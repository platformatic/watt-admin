import test from 'node:test'
import assert from 'node:assert'
import {
  isKafkaMetricName,
  addMetricDataPoint,
  initMetricsObject,
  initMetricsResponse,
  initServiceMetrics,
  MappedMetrics,
  isUndiciMetricName,
  isWebsocketMetricName
} from '../../utils/metrics-helpers'
import { MemoryDataPoint } from '../../schemas'
import { MAX_STORED_METRICS } from '../../utils/constants'

test('isKafkaMetricName returns true for valid kafka metric names', () => {
  assert.strictEqual(isKafkaMetricName('kafka_producers'), true)
  assert.strictEqual(isKafkaMetricName('kafka_consumed_messages'), true)
  assert.strictEqual(isKafkaMetricName('kafka_hooks_dlq_messages_total'), true)
})

test('isKafkaMetricName returns false for invalid kafka metric names', () => {
  assert.strictEqual(isKafkaMetricName('invalid_metric'), false)
  assert.strictEqual(isKafkaMetricName('kafka_invalid'), false)
  assert.strictEqual(isKafkaMetricName(''), false)
})

test('isUndiciMetricName returns true for valid undici metric names', () => {
  assert.strictEqual(isUndiciMetricName('http_client_stats_free'), true)
  assert.strictEqual(isUndiciMetricName('http_client_stats_pending'), true)
  assert.strictEqual(isUndiciMetricName('http_client_stats_size'), true)
})

test('isUndiciMetricName returns false for invalid undici metric names', () => {
  assert.strictEqual(isUndiciMetricName('wrong_metric'), false)
  assert.strictEqual(isUndiciMetricName('undici_invalid'), false)
  assert.strictEqual(isUndiciMetricName(''), false)
})

test('isWebsocketMetricName returns true for valid ws metric names', () => {
  assert.strictEqual(isWebsocketMetricName('active_ws_composer_connections'), true)
})

test('isWebsocketMetricName returns false for invalid ws metric names', () => {
  assert.strictEqual(isWebsocketMetricName('wrong_metric'), false)
})

test('addMetricDataPoint adds data point to empty array', () => {
  const metrics: MemoryDataPoint[] = []
  const dataPoint = { date: '2023-01-01', rss: 100, totalHeap: 200, usedHeap: 150, newSpace: 50, oldSpace: 100 }

  addMetricDataPoint(metrics, dataPoint)

  assert.strictEqual(metrics.length, 1)
  assert.deepStrictEqual(metrics[0], dataPoint)
})

test('addMetricDataPoint adds multiple data points', () => {
  const metrics: MemoryDataPoint[] = [{ date: '2024-01-01', rss: 200, totalHeap: 400, usedHeap: 300, newSpace: 150, oldSpace: 200 }]
  const dataPoint1 = { date: '2023-01-01', rss: 100, totalHeap: 200, usedHeap: 150, newSpace: 50, oldSpace: 100 }
  const dataPoint2 = { date: '2023-01-02', rss: 110, totalHeap: 210, usedHeap: 160, newSpace: 60, oldSpace: 110 }

  addMetricDataPoint(metrics, dataPoint1)
  addMetricDataPoint(metrics, dataPoint2)

  assert.strictEqual(metrics.length, 3)
  assert.deepStrictEqual(metrics[1], dataPoint1)
  assert.deepStrictEqual(metrics[2], dataPoint2)
})

test('addMetricDataPoint removes oldest when MAX_STORED_METRICS is reached', () => {
  const metrics = Array.from({ length: MAX_STORED_METRICS }, (_, i) => ({
    date: `2023-01-${i + 1}`,
    rss: i * 10,
    totalHeap: i * 20,
    usedHeap: i * 15,
    newSpace: i * 5,
    oldSpace: i * 10
  }))

  const newDataPoint = { date: '2023-01-21', rss: 210, totalHeap: 420, usedHeap: 315, newSpace: 105, oldSpace: 210 }

  addMetricDataPoint(metrics, newDataPoint)

  assert.strictEqual(metrics.length, MAX_STORED_METRICS)
  assert.strictEqual(metrics[0].date, '2023-01-2', 'First item was removed')
  assert.deepStrictEqual(metrics[MAX_STORED_METRICS - 1], newDataPoint, 'New item is at the end')
})

test('initMetricsObject creates object with correct structure and date', () => {
  const date = '2023-01-01T10:00:00Z'
  const result = initMetricsObject(date)

  assert.strictEqual(typeof result, 'object')
  assert.strictEqual(result.dataMem.date, date)
  assert.strictEqual(result.dataCpu.date, date)
  assert.strictEqual(result.dataKafka.date, date)
  assert.strictEqual(result.dataReq.date, date)
  assert.strictEqual(result.dataLatency.date, date)
})

test('initMetricsObject initializes memory data with zeros', () => {
  const date = '2023-01-01T10:00:00Z'
  const result = initMetricsObject(date)

  assert.strictEqual(result.dataMem.rss, 0)
  assert.strictEqual(result.dataMem.totalHeap, 0)
  assert.strictEqual(result.dataMem.usedHeap, 0)
  assert.strictEqual(result.dataMem.newSpace, 0)
  assert.strictEqual(result.dataMem.oldSpace, 0)
})

test('initMetricsObject initializes CPU data with zeros', () => {
  const date = '2023-01-01T10:00:00Z'
  const result = initMetricsObject(date)

  assert.strictEqual(result.dataCpu.cpu, 0)
  assert.strictEqual(result.dataCpu.eventLoop, 0)
})

test('initMetricsObject initializes Kafka data with zeros', () => {
  const date = '2023-01-01T10:00:00Z'
  const result = initMetricsObject(date)

  assert.strictEqual(result.dataKafka.consumedMessages, 0)
  assert.strictEqual(result.dataKafka.consumers, 0)
  assert.strictEqual(result.dataKafka.consumersStreams, 0)
  assert.strictEqual(result.dataKafka.consumersTopics, 0)
  assert.strictEqual(result.dataKafka.hooksDlqMessagesTotal, 0)
  assert.strictEqual(result.dataKafka.hooksMessagesInFlight, 0)
  assert.strictEqual(result.dataKafka.producedMessages, 0)
  assert.strictEqual(result.dataKafka.producers, 0)
})

test('initMetricsObject initializes undici data with zeros', () => {
  const date = '2023-01-01T10:00:00Z'
  const result = initMetricsObject(date)

  assert.strictEqual(result.dataUndici.activeRequests, 0)
  assert.strictEqual(result.dataUndici.idleSockets, 0)
  assert.strictEqual(result.dataUndici.openSockets, 0)
  assert.strictEqual(result.dataUndici.pendingRequests, 0)
  assert.strictEqual(result.dataUndici.queuedRequests, 0)
  assert.strictEqual(result.dataUndici.sizeRequests, 0)
})

test('initMetricsObject initializes websocket data with zeros', () => {
  const date = '2023-01-01T10:00:00Z'
  const result = initMetricsObject(date)

  assert.strictEqual(result.dataWebsocket.connections, 0)
})

test('initMetricsObject initializes request data with zeros', () => {
  const date = '2023-01-01T10:00:00Z'
  const result = initMetricsObject(date)

  assert.strictEqual(result.dataReq.count, 0)
  assert.strictEqual(result.dataReq.rps, 0)
})

test('initMetricsObject initializes latency data with zeros', () => {
  const date = '2023-01-01T10:00:00Z'
  const result = initMetricsObject(date)

  assert.strictEqual(result.dataLatency.p90, 0)
  assert.strictEqual(result.dataLatency.p95, 0)
  assert.strictEqual(result.dataLatency.p99, 0)
})

test('initMetricsResponse creates empty arrays when called without parameters', () => {
  const result = initMetricsResponse()

  assert.strictEqual(Array.isArray(result.dataCpu), true)
  assert.strictEqual(result.dataCpu.length, 0)
  assert.strictEqual(Array.isArray(result.dataLatency), true)
  assert.strictEqual(result.dataLatency.length, 0)
  assert.strictEqual(Array.isArray(result.dataMem), true)
  assert.strictEqual(result.dataMem.length, 0)
  assert.strictEqual(Array.isArray(result.dataReq), true)
  assert.strictEqual(result.dataReq.length, 0)
  assert.strictEqual(Array.isArray(result.dataKafka), true)
  assert.strictEqual(result.dataKafka.length, 0)
  assert.strictEqual(Array.isArray(result.dataUndici), true)
  assert.strictEqual(result.dataUndici.length, 0)
  assert.strictEqual(Array.isArray(result.dataWebsocket), true)
  assert.strictEqual(result.dataWebsocket.length, 0)
})

test('initMetricsResponse creates arrays with specified length when date and length provided', () => {
  const date = '2023-01-01T10:00:00Z'
  const length = 5
  const result = initMetricsResponse(date, length)

  assert.strictEqual(result.dataCpu.length, length)
  assert.strictEqual(result.dataLatency.length, length)
  assert.strictEqual(result.dataMem.length, length)
  assert.strictEqual(result.dataReq.length, length)
  assert.strictEqual(result.dataKafka.length, length)
  assert.strictEqual(result.dataUndici.length, length)
  assert.strictEqual(result.dataWebsocket.length, length)

  result.dataCpu.forEach(item => assert.strictEqual(item.date, date))
  result.dataLatency.forEach(item => assert.strictEqual(item.date, date))
  result.dataMem.forEach(item => assert.strictEqual(item.date, date))
  result.dataReq.forEach(item => assert.strictEqual(item.date, date))
  result.dataKafka.forEach(item => assert.strictEqual(item.date, date))
  result.dataUndici.forEach(item => assert.strictEqual(item.date, date))
  result.dataWebsocket.forEach(item => assert.strictEqual(item.date, date))
})

test('initMetricsResponse creates empty arrays when only date provided', () => {
  const date = '2023-01-01T10:00:00Z'
  const result = initMetricsResponse(date)

  assert.strictEqual(result.dataCpu.length, 0)
  assert.strictEqual(result.dataLatency.length, 0)
  assert.strictEqual(result.dataMem.length, 0)
  assert.strictEqual(result.dataReq.length, 0)
  assert.strictEqual(result.dataKafka.length, 0)
  assert.strictEqual(result.dataUndici.length, 0)
  assert.strictEqual(result.dataWebsocket.length, 0)
})

test('initServiceMetrics creates service metrics structure when service does not exist', () => {
  const metrics: MappedMetrics = {
    1234: {
      aggregated: initMetricsResponse(),
      services: {}
    }
  }

  initServiceMetrics({
    metrics,
    pid: 1234,
    serviceId: 'test-service',
    workers: 3,
    areMultipleWorkersEnabled: false
  })

  assert.strictEqual(typeof metrics[1234].services['test-service'], 'object')
  assert.strictEqual(typeof metrics[1234].services['test-service'].all, 'object')
})

test('initServiceMetrics does not overwrite existing service metrics', () => {
  const existingMetrics = initMetricsResponse()
  const metrics: MappedMetrics = {
    1234: {
      aggregated: initMetricsResponse(),
      services: {
        'test-service': {
          all: existingMetrics
        }
      }
    }
  }

  initServiceMetrics({
    metrics,
    pid: 1234,
    serviceId: 'test-service',
    workers: 3,
    areMultipleWorkersEnabled: false
  })

  assert.strictEqual(metrics[1234].services['test-service'].all, existingMetrics)
})

test('initServiceMetrics creates worker-specific metrics when multiple workers enabled', () => {
  const metrics: MappedMetrics = {
    1234: {
      aggregated: initMetricsResponse(),
      services: {}
    }
  }

  initServiceMetrics({
    metrics,
    pid: 1234,
    serviceId: 'test-service',
    workers: 3,
    areMultipleWorkersEnabled: true
  })

  assert.strictEqual(typeof metrics[1234].services['test-service'][0], 'object')
  assert.strictEqual(typeof metrics[1234].services['test-service'][1], 'object')
  assert.strictEqual(typeof metrics[1234].services['test-service'][2], 'object')
})

test('initServiceMetrics does not create worker-specific metrics when multiple workers disabled', () => {
  const metrics: MappedMetrics = {
    1234: {
      aggregated: initMetricsResponse(),
      services: {}
    }
  }

  initServiceMetrics({
    metrics,
    pid: 1234,
    serviceId: 'test-service',
    workers: 3,
    areMultipleWorkersEnabled: false
  })

  assert.strictEqual(metrics[1234].services['test-service'][0], undefined)
  assert.strictEqual(metrics[1234].services['test-service'][1], undefined)
  assert.strictEqual(metrics[1234].services['test-service'][2], undefined)
})
