import test, { mock } from 'node:test'
import assert from 'node:assert'
import { calcBytesToMB, calcReqRps } from '../../utils/calc'
import proxyquire from 'proxyquire'
import { FastifyBaseLogger, FastifyInstance } from 'fastify'
import { metricFixtures } from '../fixtures/metrics'
import { RuntimeServices } from '@platformatic/control'
import { RequestDataPoint } from '../../schemas'

const calcPath = '../../utils/calc'

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
        { id: 'type4', status, workers: 2 }
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

test('calculateMetrics handles runtime client errors gracefully', async () => {
  class ErrorThrowingClient extends RuntimeApiClient {
    async getRuntimes (): Promise<{ pid: number }[]> {
      throw new Error('Failed to get runtimes')
    }
  }

  const warn = mock.fn<FastifyBaseLogger['warn']>()
  const { calculateMetrics: calculateErrorMetrics } = proxyquire(calcPath, {
    '@platformatic/control': {
      RuntimeApiClient: ErrorThrowingClient
    }
  })

  const fastify = { mappedMetrics: {}, log: { debug, warn } } as unknown as FastifyInstance
  await calculateErrorMetrics(fastify)

  assert.strictEqual(warn.mock.calls.length, 1)
  assert.ok(warn.mock.calls[0].arguments[1].includes('Unable to get runtime metrics'))
})

test('calculateMetrics handles services with single worker correctly', async () => {
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

  const { calculateMetrics: calculateSingleWorker } = proxyquire(calcPath, {
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

test('calculateMetrics collects and aggregates metrics correctly', async () => {
  const { calculateMetrics } = proxyquire(calcPath, {
    '@platformatic/control': { RuntimeApiClient },
  })

  const fastify = getMockFastify()
  await calculateMetrics(fastify)

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
  assert.strictEqual(service2Req.count, 5)
  assert.strictEqual(service2Req.rps, 5)

  const aggregatedMem = mockedMetrics.aggregated.dataMem[0]
  assert.strictEqual(aggregatedMem.rss, 520.66)
  assert.strictEqual(aggregatedMem.totalHeap, 898.05)
  assert.strictEqual(aggregatedMem.usedHeap, 569.9100000000001)
  assert.strictEqual(aggregatedMem.newSpace, 34.42)
  assert.strictEqual(aggregatedMem.oldSpace, 402.32)

  const aggregatedReq = mockedMetrics.aggregated.dataReq[0]
  assert.strictEqual(aggregatedReq.count, 7)
  assert.strictEqual(aggregatedReq.rps, 7)

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
  assert.ok(mockedMetrics.aggregated.dataMem.length <= 20)
  assert.ok(mockedMetrics.aggregated.dataCpu.length <= 20)
  assert.ok(mockedMetrics.aggregated.dataLatency.length <= 20)
  assert.ok(mockedMetrics.aggregated.dataReq.length <= 20)
})

test('calculateMetrics handles empty metrics correctly', async () => {
  class EmptyMetricsMockClient extends RuntimeApiClient {
    async getRuntimeMetrics () {
      return []
    }
  }

  const { calculateMetrics: calculateEmptyMetrics } = proxyquire(calcPath, {
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

  assert.strictEqual(service1Metrics[0].dataMem[0].rss, 0)
  assert.strictEqual(service1Metrics[0].dataMem[0].totalHeap, 0)
  assert.strictEqual(service1Metrics[0].dataCpu[0].cpu, 0)
  assert.strictEqual(service1Metrics[0].dataLatency[0].p90, 0)
  assert.strictEqual(service1Metrics[0].dataReq[0].count, 0)

  assert.strictEqual(service1Metrics[1].dataMem[0].rss, 0)
  assert.strictEqual(service1Metrics[1].dataMem[0].totalHeap, 0)
  assert.strictEqual(service1Metrics[1].dataCpu[0].cpu, 0)
  assert.strictEqual(service1Metrics[1].dataLatency[0].p90, 0)
  assert.strictEqual(service1Metrics[1].dataReq[0].count, 0)
})

test('calculateMetrics handles missing services', async () => {
  class NoServicesMockClient extends RuntimeApiClient {
    async getRuntimeServices () {
      return { production: false, services: [], entrypoint: '' }
    }
  }

  const { calculateMetrics: calculateNoServices } = proxyquire(calcPath, {
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
})

test('calculateMetrics respects MAX_STORED_METRICS limit', async () => {
  const { calculateMetrics: calculateLimitedMetrics } = proxyquire(calcPath, {
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

    assert.strictEqual(service[0].dataMem.length, 20, 'Worker 0 memory metrics should be limited to 20 entries')
    assert.strictEqual(service[0].dataCpu.length, 20, 'Worker 0 CPU metrics should be limited to 20 entries')
    assert.strictEqual(service[0].dataLatency.length, 20, 'Worker 0 latency metrics should be limited to 20 entries')
    assert.strictEqual(service[0].dataReq.length, 20, 'Worker 0 req metrics should be limited to 20 entries')

    assert.strictEqual(service[1].dataMem.length, 20, 'Worker 1 memory metrics should be limited to 20 entries')
    assert.strictEqual(service[1].dataCpu.length, 20, 'Worker 1 CPU metrics should be limited to 20 entries')
    assert.strictEqual(service[1].dataLatency.length, 20, 'Worker 1 latency metrics should be limited to 20 entries')
    assert.strictEqual(service[1].dataReq.length, 20, 'Worker 1 req metrics should be limited to 20 entries')
  })

  assert.strictEqual(fastify.mappedMetrics[1234].aggregated.dataMem.length, 20, 'Aggregated memory metrics should be limited to 20 entries')
  assert.strictEqual(fastify.mappedMetrics[1234].aggregated.dataCpu.length, 20, 'Aggregated CPU metrics should be limited to 20 entries')
  assert.strictEqual(fastify.mappedMetrics[1234].aggregated.dataLatency.length, 20, 'Aggregated latency metrics should be limited to 20 entries')
  assert.strictEqual(fastify.mappedMetrics[1234].aggregated.dataReq.length, 20, 'Aggregated req metrics should be limited to 20 entries')
})

test('calcBytesToMB converts 1048576 bytes to 1.00MB', () => {
  const result = calcBytesToMB(1048576)
  assert.strictEqual(result, 1.00)
})

test('calcBytesToMB converts 2621440 bytes to 2.50MB', () => {
  const result = calcBytesToMB(2621440)
  assert.strictEqual(result, 2.50)
})

test('calcBytesToMB converts 0 bytes to 0.00MB', () => {
  const result = calcBytesToMB(0)
  assert.strictEqual(result, 0.00)
})

test('calcBytesToMB handles small numbers correctly', () => {
  const result = calcBytesToMB(10000)
  assert.strictEqual(result, 0.01)
})

test('calcReqRps calculates correct RPS when count increases', () => {
  const previousRequests: RequestDataPoint[] = [{
    date: '2024-01-01T00:00:00.000Z',
    count: 100,
    rps: 0
  }]
  const currentCount = 150

  const result = calcReqRps(currentCount, previousRequests)
  assert.strictEqual(result, 50)
})

test('calcReqRps calculates correct RPS when count decreases', () => {
  const previousRequests: RequestDataPoint[] = [{
    date: '2024-01-01T00:00:00.000Z',
    count: 150,
    rps: 0
  }]
  const currentCount = 100

  const result = calcReqRps(currentCount, previousRequests)
  assert.strictEqual(result, 50)
})

test('calcReqRps returns current count when no previous requests exist', () => {
  const previousRequests: RequestDataPoint[] = []
  const currentCount = 100

  const result = calcReqRps(currentCount, previousRequests)
  assert.strictEqual(result, 100)
})

test('calcReqRps handles zero current count', () => {
  const previousRequests: RequestDataPoint[] = [{
    date: '2024-01-01T00:00:00.000Z',
    count: 50,
    rps: 0
  }]
  const currentCount = 0

  const result = calcReqRps(currentCount, previousRequests)
  assert.strictEqual(result, 50)
})

test('calcReqRps handles zero previous count', () => {
  const previousRequests: RequestDataPoint[] = [{
    date: '2024-01-01T00:00:00.000Z',
    count: 0,
    rps: 0
  }]
  const currentCount = 50

  const result = calcReqRps(currentCount, previousRequests)
  assert.strictEqual(result, 50)
})

test('calcReqRps uses most recent request count from array', () => {
  const previousRequests: RequestDataPoint[] = [
    {
      date: '2024-01-01T00:00:00.000Z',
      count: 50,
      rps: 0
    },
    {
      date: '2024-01-01T00:00:01.000Z',
      count: 75,
      rps: 0
    },
    {
      date: '2024-01-01T00:00:02.000Z',
      count: 100,
      rps: 0
    }
  ]
  const currentCount = 150

  const result = calcReqRps(currentCount, previousRequests)
  assert.strictEqual(result, 50)
})

test('calcReqRps handles request spikes and dips correctly', () => {
  const previousRequests: RequestDataPoint[] = [
    { date: '2024-01-01T00:00:00.000Z', count: 100, rps: 10 },
    { date: '2024-01-01T00:00:01.000Z', count: 200, rps: 100 },
    { date: '2024-01-01T00:00:02.000Z', count: 150, rps: 0 }
  ]

  let result = calcReqRps(300, previousRequests)
  assert.strictEqual(result, 150)

  result = calcReqRps(100, previousRequests)
  assert.strictEqual(result, 50)
})
