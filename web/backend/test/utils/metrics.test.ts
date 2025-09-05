import test, { mock } from 'node:test'
import assert from 'node:assert'
import proxyquire from 'proxyquire'
import { FastifyBaseLogger, FastifyInstance } from 'fastify'
import { metricFixtures } from '../fixtures/metrics'
import { RuntimeServices } from '@platformatic/control'

const calcPath = '../../utils/metrics'

class RuntimeApiClient {
  async getRuntimes () {
    return [{ pid: 1234 }]
  }

  async getRuntimeServices () {
    const status = 'ok'
    const services: RuntimeServices = {
      production: false,
      entrypoint: 'composer',
      services: [
        { id: 'composer', status, workers: 2 },
        { id: 'fastify2', status, workers: 2 },
        { id: 'fastify3', status, workers: 2 },
        { id: 'node3', status, workers: 2 },
        { id: 'type1', status, workers: 2 },
        { id: 'type4', status, workers: 2 },
        { id: 'kafka', status, workers: 2 }
      ]
    }
    return services
  }

  async getRuntimeMetrics () {
    return metricFixtures
  }
}

const debug = mock.fn<FastifyBaseLogger['debug']>()
const getMockFastify = () => ({ mappedMetrics: {}, log: { debug } }) as unknown as FastifyInstance

test('getMetrics handles runtime client errors gracefully', async () => {
  class ErrorThrowingClient extends RuntimeApiClient {
    async getRuntimes (): Promise<{ pid: number }[]> {
      throw new Error('Failed to get runtimes')
    }
  }

  const warn = mock.fn<FastifyBaseLogger['warn']>()
  const { getMetrics: calculateErrorMetrics } = proxyquire(calcPath, {
    '@platformatic/control': {
      RuntimeApiClient: ErrorThrowingClient
    }
  })

  const fastify = { mappedMetrics: {}, log: { debug, warn } } as unknown as FastifyInstance
  await calculateErrorMetrics(fastify)

  assert.strictEqual(warn.mock.calls.length, 1)
  assert.ok(warn.mock.calls[0].arguments[1]?.includes('Unable to get runtime metrics'))
})

test('getMetrics handles services with single worker correctly', async () => {
  class SingleWorkerClient extends RuntimeApiClient {
    async getRuntimeServices () {
      const status = 'ok'
      return {
        production: false,
        entrypoint: 'composer',
        services: [
          { id: 'singleWorker', status, workers: 1 }
        ]
      }
    }
  }

  const { getMetrics: calculateSingleWorker } = proxyquire(calcPath, {
    '@platformatic/control': {
      RuntimeApiClient: SingleWorkerClient
    }
  })

  const fastify = getMockFastify()
  await calculateSingleWorker(fastify)

  assert.ok(fastify.mappedMetrics[1234])
  assert.ok(fastify.mappedMetrics[1234].services['singleWorker'])
  assert.ok(fastify.mappedMetrics[1234].services['singleWorker'].all)
  assert.strictEqual(Object.keys(fastify.mappedMetrics[1234].services['singleWorker']).length, 1,
    'Single worker service should only have "all" metrics and no worker-specific metrics')
})

test('getMetrics collects and aggregates metrics correctly', async () => {
  const { getMetrics } = proxyquire(calcPath, {
    '@platformatic/control': { RuntimeApiClient },
  })

  const fastify = getMockFastify()
  await getMetrics(fastify)

  const mockedMetrics = fastify.mappedMetrics[1234]
  const metricService1 = mockedMetrics.services['type1']
  const metricService2 = mockedMetrics.services['type4']
  assert.ok(mockedMetrics)
  assert.ok(metricService1)
  assert.ok(metricService2)
  assert.ok(mockedMetrics.services['composer'])

  const service1Mem = metricService1.all.dataMem[0]
  assert.strictEqual(service1Mem.rss, 520.66)
  assert.strictEqual(service1Mem.totalHeap, 68.09)
  assert.strictEqual(service1Mem.usedHeap, 35.26)
  assert.strictEqual(service1Mem.newSpace, 5.42)
  assert.strictEqual(service1Mem.oldSpace, 22.86)

  const worker1Mem = metricService1[0].dataMem[0]
  assert.strictEqual(worker1Mem.rss, 520.66)
  assert.strictEqual(worker1Mem.totalHeap, 34.17)
  assert.strictEqual(worker1Mem.usedHeap, 17.97)
  assert.strictEqual(worker1Mem.newSpace, 2.96)
  assert.strictEqual(worker1Mem.oldSpace, 11.48)

  const worker2Mem = metricService1[1].dataMem[0]
  assert.strictEqual(worker2Mem.rss, 520.66)
  assert.strictEqual(worker2Mem.totalHeap, 33.92)
  assert.strictEqual(worker2Mem.usedHeap, 17.29)
  assert.strictEqual(worker2Mem.newSpace, 2.46)
  assert.strictEqual(worker2Mem.oldSpace, 11.38)

  const service1Cpu = metricService1.all.dataCpu[0]
  assert.strictEqual(service1Cpu.cpu, 0.30568533089698324)
  assert.strictEqual(service1Cpu.eventLoop, 1.0075272617566988)

  const worker1Cpu = metricService1[0].dataCpu[0]
  assert.strictEqual(worker1Cpu.cpu, 0.17688192623999796)
  assert.strictEqual(worker1Cpu.eventLoop, 0.5479643034475089)

  const worker2Cpu = metricService1[1].dataCpu[0]
  assert.strictEqual(worker2Cpu.cpu, 0.12880340465698528)
  assert.strictEqual(worker2Cpu.eventLoop, 0.45956295830919)

  const service1Latency = metricService1.all.dataLatency[0]
  assert.strictEqual(service1Latency.p90, 543.3)
  assert.strictEqual(service1Latency.p95, 832.4)
  assert.strictEqual(service1Latency.p99, 431.20000000000005)

  const worker1Latency = metricService1[0].dataLatency[0]
  assert.strictEqual(worker1Latency.p90, 543.3)
  assert.strictEqual(worker1Latency.p95, 832.4)
  assert.strictEqual(worker1Latency.p99, 431.20000000000005)

  const worker2Latency = metricService1[1].dataLatency[0]
  assert.strictEqual(worker2Latency.p90, 0)
  assert.strictEqual(worker2Latency.p95, 0)
  assert.strictEqual(worker2Latency.p99, 0)

  const service2Latency = metricService2.all.dataLatency[0]
  assert.strictEqual(service2Latency.p90, 9.8765)
  assert.strictEqual(service2Latency.p95, 0.45678)
  assert.strictEqual(service2Latency.p99, 0.45321)

  const service1Req = metricService1.all.dataReq[0]
  assert.strictEqual(service1Req.count, 1)
  assert.strictEqual(service1Req.rps, 1)

  const worker1Req = metricService1[0].dataReq[0]
  assert.strictEqual(worker1Req.count, 1)
  assert.strictEqual(worker1Req.rps, 1)

  const worker2Req = metricService1[1].dataReq[0]
  assert.strictEqual(worker2Req.count, 0)
  assert.strictEqual(worker2Req.rps, 0)

  const service2Req = metricService2.all.dataReq[0]
  assert.strictEqual(service2Req.count, 6)
  assert.strictEqual(service2Req.rps, 6)

  assert.strictEqual(metricService1.all.dataKafka[0].consumers, 0)
  assert.strictEqual(metricService2.all.dataKafka[0].consumers, 0)
  assert.strictEqual(metricService1[0].dataKafka[0].consumers, 0)
  assert.strictEqual(metricService1[1].dataKafka[0].consumers, 0)

  assert.strictEqual(metricService1.all.dataUndici[0].activeRequests, 0)
  assert.strictEqual(metricService2.all.dataUndici[0].activeRequests, 0)
  assert.strictEqual(metricService1[0].dataUndici[0].activeRequests, 0)
  assert.strictEqual(metricService1[1].dataUndici[0].activeRequests, 0)

  assert.strictEqual(metricService1.all.dataWebsocket[0].connections, 0)
  assert.strictEqual(metricService2.all.dataWebsocket[0].connections, 0)
  assert.strictEqual(metricService1[0].dataWebsocket[0].connections, 0)
  assert.strictEqual(metricService1[1].dataWebsocket[0].connections, 0)

  assert.strictEqual(metricService1.all.dataNodejs[0].resources, 0)
  assert.strictEqual(metricService2.all.dataNodejs[0].resources, 0)
  assert.strictEqual(metricService1[0].dataNodejs[0].resources, 0)
  assert.strictEqual(metricService1[1].dataNodejs[0].resources, 0)

  const aggregatedMem = mockedMetrics.aggregated.dataMem[0]
  assert.strictEqual(aggregatedMem.rss, 520.66)
  assert.strictEqual(aggregatedMem.totalHeap, 898.05)
  assert.strictEqual(aggregatedMem.usedHeap, 569.9100000000001)
  assert.strictEqual(aggregatedMem.newSpace, 34.42)
  assert.strictEqual(aggregatedMem.oldSpace, 402.32)

  const aggregatedReq = mockedMetrics.aggregated.dataReq[0]
  assert.strictEqual(aggregatedReq.count, 12)
  assert.strictEqual(aggregatedReq.rps, 12)

  const aggregatedKafka = mockedMetrics.aggregated.dataKafka[0]
  assert.strictEqual(aggregatedKafka.consumedMessages, 0)
  assert.strictEqual(aggregatedKafka.consumers, 1)
  assert.strictEqual(aggregatedKafka.consumersStreams, 1)
  assert.strictEqual(aggregatedKafka.consumersTopics, 1)
  assert.strictEqual(aggregatedKafka.hooksDlqMessagesTotal, 0)
  assert.strictEqual(aggregatedKafka.hooksMessagesInFlight, 0)
  assert.strictEqual(aggregatedKafka.producedMessages, 0)
  assert.strictEqual(aggregatedKafka.producers, 2)

  const aggregatedUndici = mockedMetrics.aggregated.dataUndici[0]
  assert.strictEqual(aggregatedUndici.idleSockets, 1)
  assert.strictEqual(aggregatedUndici.openSockets, 1)
  assert.strictEqual(aggregatedUndici.pendingRequests, 2)
  assert.strictEqual(aggregatedUndici.queuedRequests, 3)
  assert.strictEqual(aggregatedUndici.activeRequests, 4)
  assert.strictEqual(aggregatedUndici.sizeRequests, 9)

  const aggregatedWebsocket = mockedMetrics.aggregated.dataWebsocket[0]
  assert.strictEqual(aggregatedWebsocket.connections, 2)

  const aggregatedNodejs = mockedMetrics.aggregated.dataNodejs[0]
  assert.strictEqual(aggregatedNodejs.resources, 5)

  const aggregatedCpu = mockedMetrics.aggregated.dataCpu[0]
  assert.strictEqual(aggregatedCpu.cpu, 5.16285167341297)
  assert.strictEqual(aggregatedCpu.eventLoop, 22.39501535708998)

  const aggregatedLatency = mockedMetrics.aggregated.dataLatency[0]
  assert.strictEqual(aggregatedLatency.p90, 3.2)
  assert.strictEqual(aggregatedLatency.p95, 4.5)
  assert.strictEqual(aggregatedLatency.p99, 5.6)

  assert.ok(metricService1.all.dataMem.length <= 20)
  assert.ok(metricService1.all.dataCpu.length <= 20)
  assert.ok(metricService1.all.dataLatency.length <= 20)
  assert.ok(metricService1.all.dataReq.length <= 20)
  assert.ok(metricService1.all.dataKafka.length <= 20)
  assert.ok(metricService1.all.dataWebsocket.length <= 20)
  assert.ok(metricService1.all.dataNodejs.length <= 20)
  assert.ok(metricService1.all.dataUndici.length <= 20)
  assert.ok(mockedMetrics.aggregated.dataMem.length <= 20)
  assert.ok(mockedMetrics.aggregated.dataCpu.length <= 20)
  assert.ok(mockedMetrics.aggregated.dataLatency.length <= 20)
  assert.ok(mockedMetrics.aggregated.dataReq.length <= 20)
  assert.ok(mockedMetrics.aggregated.dataKafka.length <= 20)
  assert.ok(mockedMetrics.aggregated.dataWebsocket.length <= 20)
  assert.ok(mockedMetrics.aggregated.dataNodejs.length <= 20)
  assert.ok(mockedMetrics.aggregated.dataUndici.length <= 20)
})

test('getMetrics handles empty metrics correctly', async () => {
  class EmptyMetricsMockClient extends RuntimeApiClient {
    async getRuntimeMetrics () {
      return []
    }
  }

  const { getMetrics: calculateEmptyMetrics } = proxyquire(calcPath, {
    '@platformatic/control': {
      RuntimeApiClient: EmptyMetricsMockClient
    }
  })

  const fastify = getMockFastify()
  await calculateEmptyMetrics(fastify)

  assert.ok(fastify.mappedMetrics[1234])
  const service1Metrics = fastify.mappedMetrics[1234].services['type1']

  assert.strictEqual(service1Metrics.all.dataMem[0].rss, 0)
  assert.strictEqual(service1Metrics.all.dataMem[0].totalHeap, 0)
  assert.strictEqual(service1Metrics.all.dataCpu[0].cpu, 0)
  assert.strictEqual(service1Metrics.all.dataLatency[0].p90, 0)
  assert.strictEqual(service1Metrics.all.dataReq[0].count, 0)
  assert.strictEqual(service1Metrics.all.dataKafka[0].consumers, 0)
  assert.strictEqual(service1Metrics.all.dataWebsocket[0].connections, 0)
  assert.strictEqual(service1Metrics.all.dataNodejs[0].resources, 0)
  assert.strictEqual(service1Metrics.all.dataUndici[0].activeRequests, 0)

  assert.strictEqual(service1Metrics[0].dataMem[0].rss, 0)
  assert.strictEqual(service1Metrics[0].dataMem[0].totalHeap, 0)
  assert.strictEqual(service1Metrics[0].dataCpu[0].cpu, 0)
  assert.strictEqual(service1Metrics[0].dataLatency[0].p90, 0)
  assert.strictEqual(service1Metrics[0].dataReq[0].count, 0)
  assert.strictEqual(service1Metrics[0].dataKafka[0].consumers, 0)
  assert.strictEqual(service1Metrics[0].dataWebsocket[0].connections, 0)
  assert.strictEqual(service1Metrics[0].dataNodejs[0].resources, 0)
  assert.strictEqual(service1Metrics[0].dataUndici[0].activeRequests, 0)

  assert.strictEqual(service1Metrics[1].dataMem[0].rss, 0)
  assert.strictEqual(service1Metrics[1].dataMem[0].totalHeap, 0)
  assert.strictEqual(service1Metrics[1].dataCpu[0].cpu, 0)
  assert.strictEqual(service1Metrics[1].dataLatency[0].p90, 0)
  assert.strictEqual(service1Metrics[1].dataReq[0].count, 0)
  assert.strictEqual(service1Metrics[1].dataUndici[0].activeRequests, 0)
})

test('getMetrics handles missing services', async () => {
  class NoServicesMockClient extends RuntimeApiClient {
    async getRuntimeServices () {
      return { production: false, services: [], entrypoint: '' }
    }
  }

  const { getMetrics: calculateNoServices } = proxyquire(calcPath, {
    '@platformatic/control': {
      RuntimeApiClient: NoServicesMockClient
    }
  })

  const fastify = getMockFastify()
  await calculateNoServices(fastify)

  assert.ok(fastify.mappedMetrics[1234])
  assert.deepStrictEqual(fastify.mappedMetrics[1234].services, {})
  assert.ok(fastify.mappedMetrics[1234].aggregated.dataMem.length === 1)
  assert.ok(fastify.mappedMetrics[1234].aggregated.dataCpu.length === 1)
  assert.ok(fastify.mappedMetrics[1234].aggregated.dataLatency.length === 1)
  assert.ok(fastify.mappedMetrics[1234].aggregated.dataReq.length === 1)
  assert.ok(fastify.mappedMetrics[1234].aggregated.dataKafka.length === 1)
  assert.ok(fastify.mappedMetrics[1234].aggregated.dataWebsocket.length === 1)
  assert.ok(fastify.mappedMetrics[1234].aggregated.dataNodejs.length === 1)
  assert.ok(fastify.mappedMetrics[1234].aggregated.dataUndici.length === 1)
})

test('getMetrics respects MAX_STORED_METRICS limit', async () => {
  const { getMetrics: calculateLimitedMetrics } = proxyquire(calcPath, {
    '@platformatic/control': { RuntimeApiClient }
  })

  const fastify = getMockFastify()
  for (let i = 0; i < 25; i++) {
    await calculateLimitedMetrics(fastify)
  }

  Object.values(fastify.mappedMetrics[1234].services).forEach(service => {
    assert.strictEqual(service.all.dataMem.length, 20, 'Service memory metrics should be limited to 20 entries')
    assert.strictEqual(service.all.dataCpu.length, 20, 'Service CPU metrics should be limited to 20 entries')
    assert.strictEqual(service.all.dataLatency.length, 20, 'Service latency metrics should be limited to 20 entries')
    assert.strictEqual(service.all.dataReq.length, 20, 'Service req metrics should be limited to 20 entries')
    assert.strictEqual(service.all.dataKafka.length, 20, 'Service kafka metrics should be limited to 20 entries')
    assert.strictEqual(service.all.dataUndici.length, 20, 'Service undici metrics should be limited to 20 entries')
    assert.strictEqual(service.all.dataWebsocket.length, 20, 'Service websocket metrics should be limited to 20 entries')
    assert.strictEqual(service.all.dataNodejs.length, 20, 'Service nodejs metrics should be limited to 20 entries')

    assert.strictEqual(service[0].dataMem.length, 20, 'Worker 0 memory metrics should be limited to 20 entries')
    assert.strictEqual(service[0].dataCpu.length, 20, 'Worker 0 CPU metrics should be limited to 20 entries')
    assert.strictEqual(service[0].dataLatency.length, 20, 'Worker 0 latency metrics should be limited to 20 entries')
    assert.strictEqual(service[0].dataReq.length, 20, 'Worker 0 req metrics should be limited to 20 entries')
    assert.strictEqual(service[0].dataKafka.length, 20, 'Worker 0 kafka metrics should be limited to 20 entries')
    assert.strictEqual(service[0].dataUndici.length, 20, 'Worker 0 undici metrics should be limited to 20 entries')
    assert.strictEqual(service[0].dataWebsocket.length, 20, 'Worker 0 websocket metrics should be limited to 20 entries')
    assert.strictEqual(service[0].dataNodejs.length, 20, 'Worker 0 nodejs metrics should be limited to 20 entries')

    assert.strictEqual(service[1].dataMem.length, 20, 'Worker 1 memory metrics should be limited to 20 entries')
    assert.strictEqual(service[1].dataCpu.length, 20, 'Worker 1 CPU metrics should be limited to 20 entries')
    assert.strictEqual(service[1].dataLatency.length, 20, 'Worker 1 latency metrics should be limited to 20 entries')
    assert.strictEqual(service[1].dataReq.length, 20, 'Worker 1 req metrics should be limited to 20 entries')
    assert.strictEqual(service[1].dataKafka.length, 20, 'Worker 1 kafka metrics should be limited to 20 entries')
    assert.strictEqual(service[1].dataUndici.length, 20, 'Worker 1 undici metrics should be limited to 20 entries')
    assert.strictEqual(service[1].dataWebsocket.length, 20, 'Worker 1 websocket metrics should be limited to 20 entries')
    assert.strictEqual(service[1].dataNodejs.length, 20, 'Worker 1 nodejs metrics should be limited to 20 entries')
  })

  assert.strictEqual(fastify.mappedMetrics[1234].aggregated.dataMem.length, 20, 'Aggregated memory metrics should be limited to 20 entries')
  assert.strictEqual(fastify.mappedMetrics[1234].aggregated.dataCpu.length, 20, 'Aggregated CPU metrics should be limited to 20 entries')
  assert.strictEqual(fastify.mappedMetrics[1234].aggregated.dataLatency.length, 20, 'Aggregated latency metrics should be limited to 20 entries')
  assert.strictEqual(fastify.mappedMetrics[1234].aggregated.dataReq.length, 20, 'Aggregated req metrics should be limited to 20 entries')
  assert.strictEqual(fastify.mappedMetrics[1234].aggregated.dataKafka.length, 20, 'Aggregated kafka metrics should be limited to 20 entries')
  assert.strictEqual(fastify.mappedMetrics[1234].aggregated.dataUndici.length, 20, 'Aggregated undici metrics should be limited to 20 entries')
  assert.strictEqual(fastify.mappedMetrics[1234].aggregated.dataWebsocket.length, 20, 'Aggregated websocket metrics should be limited to 20 entries')
  assert.strictEqual(fastify.mappedMetrics[1234].aggregated.dataNodejs.length, 20, 'Aggregated nodejs metrics should be limited to 20 entries')
})
