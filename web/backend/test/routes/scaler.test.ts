import test from 'node:test'
import assert from 'node:assert'
import { getServer } from '../helper.ts'
import { nextScalerState, SUPPORTED_SCALER_VERSION } from '../../utils/scaler.ts'

test('scaler route serves the polled state of a runtime', async (t) => {
  const server = await getServer(t)

  const missing = await server.inject({ url: '/runtimes/12345/scaler' })
  assert.strictEqual(missing.statusCode, 200)
  assert.deepStrictEqual(missing.json(), { status: 'unavailable', applications: [] })

  server.scalerStates.set(12345, nextScalerState(undefined, {
    version: SUPPORTED_SCALER_VERSION,
    now: 10500,
    processIntervalMs: 1000,
    maxTotalWorkers: 8,
    memoryLimit: 900,
    applications: [{
      id: 'app',
      targetCount: 1,
      liveCount: 1,
      minimum: 1,
      maximum: 2,
      initTimeoutMs: 5000,
      horizonMs: 7000,
      pending: [],
      metrics: { heap: { threshold: null, lastProcessedTs: 10000, level: 100, trendPerSecond: 0 } },
      workers: [{ id: 'app:0-0', startTime: 1000, metrics: { heap: { lastSampleTs: 10200, lastValue: 100, firstSampleTs: 10000, intervalMs: 1000, values: [100] } } }]
    }]
  }))

  const res = await server.inject({ url: '/runtimes/12345/scaler' })
  assert.strictEqual(res.statusCode, 200)
  const body = res.json()
  assert.strictEqual(body.status, 'available')
  assert.strictEqual('memory' in body, false)
  assert.strictEqual('threshold' in body.applications[0].metrics.heap, false)
  assert.deepStrictEqual(body.applications[0].workers[0].metrics.heap.values, [100])
  assert.deepStrictEqual(body.applications[0].metrics.heap.history, [{ timestamp: 10000, value: 100 }])
})
