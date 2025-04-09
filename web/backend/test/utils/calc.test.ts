import test, { mock } from 'node:test'
import assert from 'node:assert'
import { calcBytesToMB } from '../../utils/calc'
import proxyquire from 'proxyquire'
import { FastifyBaseLogger, FastifyInstance } from 'fastify'
import { metricFixtures } from '../fixtures/metrics'
import { RuntimeServices } from '@platformatic/control'

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
        { id: 'composer', status },
        { id: 'fastify2', status },
        { id: 'fastify3', status },
        { id: 'node3', status },
        { id: 'type1', status },
        { id: 'type4', status }
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

  const service1Mem = metricService1.dataMem[0]
  assert.strictEqual(service1Mem.rss, 520.66)
  assert.strictEqual(service1Mem.totalHeap, 33.92)
  assert.strictEqual(service1Mem.usedHeap, 17.29)
  assert.strictEqual(service1Mem.newSpace, 2.46)
  assert.strictEqual(service1Mem.oldSpace, 11.38)

  const service1Cpu = metricService1.dataCpu[0]
  assert.strictEqual(service1Cpu.cpu, 0.25760680931397056)
  assert.strictEqual(service1Cpu.eventLoop, 0.91912591661838)

  const service1Latency = metricService1.dataLatency[0]
  assert.strictEqual(service1Latency.p90, 0)
  assert.strictEqual(service1Latency.p95, 0)
  assert.strictEqual(service1Latency.p99, 0)

  const service2Latency = metricService2.dataLatency[0]
  assert.strictEqual(service2Latency.p90, 0.607875)
  assert.strictEqual(service2Latency.p95, 0.607875)
  assert.strictEqual(service2Latency.p99, 0.607875)

  const service1Req = metricService1.dataReq[0]
  assert.strictEqual(service1Req.count, 1)
  assert.strictEqual(service1Req.rps, 1)

  const service2Req = metricService2.dataReq[0]
  assert.strictEqual(service2Req.count, 2)
  assert.strictEqual(service2Req.rps, 2)

  const aggregatedMem = mockedMetrics.aggregated.dataMem[0]
  assert.strictEqual(aggregatedMem.rss, 520.66)
  assert.strictEqual(aggregatedMem.totalHeap, 650.3199999999999)
  assert.strictEqual(aggregatedMem.usedHeap, 405.73)
  assert.strictEqual(aggregatedMem.newSpace, 27.860000000000003)
  assert.strictEqual(aggregatedMem.oldSpace, 285.08)

  const aggregatedReq = mockedMetrics.aggregated.dataReq[0]
  assert.strictEqual(aggregatedReq.count, 7)
  assert.strictEqual(aggregatedReq.rps, 7)

  assert.ok(metricService1.dataMem.length <= 20)
  assert.ok(metricService1.dataCpu.length <= 20)
  assert.ok(metricService1.dataLatency.length <= 20)
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

  assert.strictEqual(service1Metrics.dataMem[0].rss, 0)
  assert.strictEqual(service1Metrics.dataMem[0].totalHeap, 0)
  assert.strictEqual(service1Metrics.dataCpu[0].cpu, 0)
  assert.strictEqual(service1Metrics.dataLatency[0].p90, 0)
  assert.strictEqual(service1Metrics.dataReq[0].count, 0)
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
    assert.strictEqual(service.dataMem.length, 20, 'Service memory metrics should be limited to 20 entries')
    assert.strictEqual(service.dataCpu.length, 20, 'Service CPU metrics should be limited to 20 entries')
    assert.strictEqual(service.dataLatency.length, 20, 'Service latency metrics should be limited to 20 entries')
    assert.strictEqual(service.dataReq.length, 20, 'Service req metrics should be limited to 20 entries')
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
