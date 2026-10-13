import { describe, expect, it } from 'vitest'
import { metricView, resourceUsage, scalingWarnings, workerIndex, workerPoints, workerView, type AvailableScaler, type ScalerApplication } from '../../../src/components/scaler/model'

function application (overrides: Partial<ScalerApplication> = {}): ScalerApplication {
  return {
    id: 'app',
    targetCount: 1,
    liveCount: 1,
    minimum: 1,
    maximum: 4,
    initTimeoutMs: 5000,
    horizonMs: 7000,
    pending: [],
    metrics: {},
    workers: [],
    workerHistory: [],
    ...overrides
  }
}

function scaler (applications: ScalerApplication[], overrides: Partial<AvailableScaler> = {}): AvailableScaler {
  return { status: 'available', version: 1, now: 1000, processIntervalMs: 1000, maxTotalWorkers: 8, memory: { used: 700, limit: 1000 }, applications, ...overrides }
}

function worker (id: string, heap?: number) {
  return { id, startTime: 0, metrics: heap === undefined ? {} : { heap: { lastSampleTs: 0, lastValue: heap, firstSampleTs: 0, intervalMs: 1000, values: [] } } }
}

describe('scalingWarnings', () => {
  it('covers total capacity, memory, application limits and delayed starts, and clears on recovery', () => {
    const selected = application({ id: 'a', targetCount: 3, liveCount: 1, maximum: 3, pending: [{ scaleAt: 900, decisionAt: 0, expectedCount: 2 }, { scaleAt: 1100, decisionAt: 0, expectedCount: 3 }] })
    const other = application({ id: 'b', targetCount: 1, maximum: 4 })
    const state = scaler([selected, other], { maxTotalWorkers: 4, memory: { used: 200e6, limit: 200e6 } })
    const warnings = scalingWarnings(state, selected)
    expect(warnings).toHaveLength(4)
    expect(warnings[0]).toMatch(/Total worker limit reached \(4\/4 scheduled, including pending starts\)/)
    expect(warnings[1]).toMatch(/Memory limit reached/)
    expect(warnings[2]).toMatch(/a: application worker limit reached \(3\/3 scheduled\)/)
    expect(warnings[3]).toMatch(/a: 1 scheduled worker is taking longer/)
    expect(scalingWarnings(state, other)).toHaveLength(2)

    const recovered = scaler([application({ id: 'a', targetCount: 3, maximum: 4 })], { maxTotalWorkers: 8, memory: { used: 100e6, limit: 200e6 } })
    expect(scalingWarnings(recovered, recovered.applications[0])).toEqual([])
  })

  it('warns about a missing heap threshold', () => {
    const selected = application({ metrics: { heap: { lastProcessedTs: 0, trendPerSecond: 0, history: [] } } })
    expect(scalingWarnings(scaler([selected]), selected)[0]).toMatch(/heap scaling threshold not configured/)
  })
})

describe('metricView', () => {
  it('normalizes the forecast by the scheduled count and keeps the history in the window', () => {
    const app = application({
      targetCount: 3,
      metrics: { elu: { threshold: 0.7, lastProcessedTs: 100000, level: 1.8, trendPerSecond: 0.05, history: [{ timestamp: 30000, value: 0.5 }, { timestamp: 100000, value: 0.9 }] } }
    })
    const view = metricView(app, 'elu', 101000)!
    expect(view.history).toEqual([{ timestamp: 100000, value: 0.9 }])
    expect(view.current).toBe(0.9)
    expect(view.forecast[0].value).toBeCloseTo(1.85 / 3)
    expect(view.forecast[1]).toEqual({ timestamp: 108000, value: expect.closeTo(2.2 / 3) })
    expect(metricView(app, 'heap', 101000)).toBeNull()
  })

  it('flattens ELU at 100% and at zero, while heap has no upper bound', () => {
    const rising = application({ targetCount: 2, horizonMs: 24000, metrics: { elu: { threshold: 0.7, lastProcessedTs: 10000, level: 1.5, trendPerSecond: 0.1, history: [{ timestamp: 10000, value: 1.2 }] } } })
    expect(metricView(rising, 'elu', 10000)).toMatchObject({
      current: 1,
      forecast: [{ timestamp: 10000, value: 0.75 }, { timestamp: 15000, value: 1 }, { timestamp: 34000, value: 1 }]
    })

    const falling = application({ targetCount: 2, metrics: { elu: { threshold: 0.7, lastProcessedTs: 10000, level: 1, trendPerSecond: -0.5, history: [] } } })
    expect(metricView(falling, 'elu', 10000)!.forecast).toEqual([{ timestamp: 10000, value: 0.5 }, { timestamp: 12000, value: 0 }, { timestamp: 17000, value: 0 }])

    const heap = application({ targetCount: 2, metrics: { heap: { lastProcessedTs: 10000, level: 100e6, trendPerSecond: 20e6, history: [] } } })
    expect(metricView(heap, 'heap', 10000)!.forecast).toEqual([{ timestamp: 10000, value: 50e6 }, { timestamp: 17000, value: 120e6 }])
  })

  it('has no forecast before the first processed run', () => {
    const app = application({ metrics: { heap: { threshold: 100e6, lastProcessedTs: 0, trendPerSecond: 0, history: [] } } })
    expect(metricView(app, 'heap', 1000)!.forecast).toEqual([])
  })
})

describe('workers', () => {
  it('shows the scheduled count until the end of the forecast window', () => {
    expect(workerView(application({ targetCount: 3, liveCount: 2, maximum: 5 }), 1000)).toEqual({
      history: [],
      forecast: [{ timestamp: 1000, value: 3 }, { timestamp: 21000, value: 3 }],
      threshold: 5,
      current: 2
    })
  })

  it('reads stored samples plus a newer raw reading, within the worker window', () => {
    const metric = { lastSampleTs: 42500, lastValue: 0.9, firstSampleTs: 10000, intervalMs: 1000, values: [0.1, 0.2, 0.3] }
    expect(workerPoints(metric, 41000)).toEqual([{ timestamp: 11000, value: 0.2 }, { timestamp: 12000, value: 0.3 }, { timestamp: 42500, value: 0.9 }])
    expect(workerPoints(undefined, 41000)).toEqual([])
    expect(workerIndex('app:3-12')).toBe('3')
    expect(workerIndex('custom')).toBe('custom')
  })
})

describe('resourceUsage', () => {
  it('distinguishes live workers, scheduled workers and available capacity', () => {
    const { workers } = resourceUsage(scaler([
      application({ id: 'api', targetCount: 4, liveCount: 2, workers: [worker('api:0-1', 100), worker('api:1-1', 200)] }),
      application({ id: 'jobs', workers: [worker('jobs:0-1', 50)] })
    ]))
    expect(workers).toMatchObject({ live: 3, scheduled: 2, available: 3, scale: 8 })
    expect(workers.segments.map(({ label, value, kind }) => ({ label, value, kind }))).toEqual([
      { label: 'api:0', value: 1, kind: 'worker' },
      { label: 'api:1', value: 1, kind: 'worker' },
      { label: 'api · scheduled', value: 2, kind: 'scheduled' },
      { label: 'jobs:0', value: 1, kind: 'worker' },
      { label: 'Available', value: 3, kind: 'available' }
    ])
  })

  it('shows worker heaps and scale-up headroom, without inventing missing measurements', () => {
    const { memory } = resourceUsage(scaler([application({ workers: [worker('app:0-1', 100), worker('app:1-1', 200), worker('app:2-1'), worker('app:3-1', 0)] })]))
    expect(memory).toMatchObject({ heapUsed: 300, available: 300, missingHeap: 1 })
    expect(memory!.segments.map(segment => segment.value)).toEqual([100, 200, 300])
  })

  it('keeps over-limit usage and reports no headroom', () => {
    const { workers, memory } = resourceUsage(scaler([application({ targetCount: 3, liveCount: 2, workers: [worker('app:0-1', 400), worker('app:1-1', 400)] })], { maxTotalWorkers: 2, memory: { used: 1100, limit: 1000 } }))
    expect(workers).toMatchObject({ available: 0, scale: 3 })
    expect(memory).toMatchObject({ available: 0, heapUsed: 800 })
  })

  it('has an explicit empty state', () => {
    const { workers, memory } = resourceUsage(scaler([], { memory: null }))
    expect(workers.segments).toEqual([{ kind: 'available', label: 'Available', value: 8 }])
    expect(memory).toBeNull()
  })
})
