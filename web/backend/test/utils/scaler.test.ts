import test from 'node:test'
import assert from 'node:assert'
import type { WorkersScaler, WorkersScalerApplication } from '@platformatic/control'
import { appendMetricLevel, appendWorkerCount, nextScalerState, SUPPORTED_SCALER_VERSION, toScalerResponse } from '../../utils/scaler.ts'

function application (overrides: Partial<WorkersScalerApplication> = {}): WorkersScalerApplication {
  return {
    id: 'app',
    targetCount: 2,
    liveCount: 2,
    minimum: 1,
    maximum: 4,
    initTimeoutMs: 5000,
    horizonMs: 7000,
    pending: [],
    metrics: { elu: { threshold: 0.8, lastProcessedTs: 10000, level: 1.2, trendPerSecond: 0 } },
    workers: [],
    ...overrides
  }
}

function scaler (now: number, applications: WorkersScalerApplication[], version = SUPPORTED_SCALER_VERSION): WorkersScaler {
  return { version, now, processIntervalMs: 1000, maxTotalWorkers: 8, memoryLimit: 200, applications }
}

test('worker counts keep the count in effect at the left edge and stay bounded', () => {
  let points = appendWorkerCount([], 100000, 2)
  assert.deepStrictEqual(points, [{ timestamp: 100000, value: 2 }])
  for (let i = 1; i <= 200; i++) points = appendWorkerCount(points, 100000 + i, 2)
  assert.strictEqual(points.length, 120)
  points = appendWorkerCount(points, 200000, 3)
  assert.deepStrictEqual(points, [{ timestamp: 140000, value: 2 }, { timestamp: 200000, value: 3 }])
})

test('metric levels add one point per processed run, per live worker', () => {
  let points = appendMetricLevel([], 10500, 1.2, 10000, 2)
  assert.deepStrictEqual(points, [{ timestamp: 10000, value: 0.6 }])
  // A poll before the next run adds nothing.
  points = appendMetricLevel(points, 11000, 1.2, 10000, 2)
  assert.strictEqual(points.length, 1)
  points = appendMetricLevel(points, 20500, 1.6, 20000, 2)
  assert.deepStrictEqual(points.at(-1), { timestamp: 20000, value: 0.8 })
  // No level or no live workers is not a point.
  assert.strictEqual(appendMetricLevel(points, 30500, null, 30000, 2).length, 2)
  assert.strictEqual(appendMetricLevel(points, 30500, 1, 30000, 0).length, 2)
  // Older points are dropped, except the last one before the window, which
  // anchors the line at the chart's left edge.
  assert.deepStrictEqual(appendMetricLevel(points, 75000, 2, 74000, 2), [{ timestamp: 10000, value: 0.6 }, { timestamp: 20000, value: 0.8 }, { timestamp: 74000, value: 1 }])
  assert.deepStrictEqual(appendMetricLevel(points, 85000, 2, 84000, 2), [{ timestamp: 20000, value: 0.8 }, { timestamp: 84000, value: 1 }])
  const anchored = appendMetricLevel([{ timestamp: 10000, value: 0.1 }, { timestamp: 20000, value: 0.2 }, { timestamp: 30000, value: 0.3 }], 85000, 2, 84000, 2)
  assert.deepStrictEqual(anchored.map(point => point.timestamp), [20000, 30000, 84000])
})

test('scaler state follows availability and version', () => {
  assert.deepStrictEqual(toScalerResponse(undefined), { status: 'unavailable', applications: [] })
  assert.deepStrictEqual(toScalerResponse(nextScalerState(undefined, null)), { status: 'unavailable', applications: [] })
  assert.deepStrictEqual(toScalerResponse(nextScalerState(undefined, scaler(10500, [application()], 99))), { status: 'unsupported', version: 99, applications: [] })
})

test('history accumulates across polls and is attached to each application', () => {
  let state = nextScalerState(undefined, scaler(10500, [application()]))
  state = nextScalerState(state, scaler(20500, [application({ liveCount: 3, metrics: { elu: { threshold: 0.8, lastProcessedTs: 20000, level: 1.5, trendPerSecond: 0 } } })]), { scope: 'host', used: 100, total: 1000 })
  const response = toScalerResponse(state)
  assert.strictEqual(response.status, 'available')
  assert.strictEqual(response.version, SUPPORTED_SCALER_VERSION)
  assert.deepStrictEqual(response.memory, { used: 100, limit: 200 })
  const [app] = response.applications
  assert.deepStrictEqual(app.workerHistory, [{ timestamp: 10500, value: 2 }, { timestamp: 20500, value: 3 }])
  assert.deepStrictEqual(app.metrics.elu.history, [{ timestamp: 10000, value: 0.6 }, { timestamp: 20000, value: 0.5 }])

  // Without a memory reading there is no memory headroom to show.
  assert.strictEqual('memory' in toScalerResponse(nextScalerState(state, scaler(21500, [application()]))), false)

  // An application that disappears takes its history with it.
  assert.deepStrictEqual(toScalerResponse(nextScalerState(state, scaler(30500, []))).applications, [])
})
