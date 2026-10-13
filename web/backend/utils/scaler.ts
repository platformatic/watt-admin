import type { RuntimeMemory, WorkersScaler, WorkersScalerApplication } from '@platformatic/control'
import type { ScalerPoint, ScalerResponse } from '../schemas/scaler.ts'

export interface ScalerHistory {
  workers: ScalerPoint[]
  metrics: Record<string, ScalerPoint[]>
}

// The scaler data format version this watt-admin understands.
export const SUPPORTED_SCALER_VERSION = 1
export const SCALER_HISTORY_MS = 60000
const MAX_POINTS = 120

export type ScalerState =
  | { status: 'unavailable' }
  | { status: 'unsupported', version: number }
  | { status: 'available', scaler: WorkersScaler, memory: RuntimeMemory | null, histories: Map<string, ScalerHistory> }

// Live worker counts for a step chart. The count in effect at the left edge of
// the window is kept, moved to that edge.
export function appendWorkerCount (points: ScalerPoint[], now: number, value: number): ScalerPoint[] {
  const start = now - SCALER_HISTORY_MS
  let next = points.filter(point => point.timestamp < now)
  const firstAfterStart = next.findIndex(point => point.timestamp > start)
  next = next.slice(firstAfterStart === -1 ? -1 : Math.max(0, firstAfterStart - 1))
  if (next[0]?.timestamp < start) next[0] = { timestamp: start, value: next[0].value }
  next.push({ timestamp: now, value })
  return next.slice(-MAX_POINTS)
}

// The last point before the window is kept: charts clip it at their left edge,
// so the line starts at the edge instead of at the oldest point inside.
function trimToWindow (points: ScalerPoint[], start: number): ScalerPoint[] {
  const firstInside = points.findIndex(point => point.timestamp >= start)
  return points.slice(firstInside === -1 ? -1 : Math.max(0, firstInside - 1))
}

// One point per processed run: the smoothed level per live worker.
export function appendMetricLevel (points: ScalerPoint[], now: number, level: number | null, lastProcessedTs: number, liveCount: number): ScalerPoint[] {
  const next = trimToWindow(points, now - SCALER_HISTORY_MS)
  const isNewRun = lastProcessedTs > (next.at(-1)?.timestamp ?? 0)
  if (isNewRun && level !== null && Number.isFinite(level) && liveCount > 0) {
    next.push({ timestamp: lastProcessedTs, value: level / liveCount })
  }
  return next.slice(-MAX_POINTS)
}

function updateHistory (previous: ScalerHistory | undefined, application: WorkersScalerApplication, now: number): ScalerHistory {
  const metrics: Record<string, ScalerPoint[]> = {}
  for (const [name, metric] of Object.entries(application.metrics)) {
    metrics[name] = appendMetricLevel(previous?.metrics[name] ?? [], now, metric.level, metric.lastProcessedTs, application.liveCount)
  }
  return { workers: appendWorkerCount(previous?.workers ?? [], now, application.liveCount), metrics }
}

// The memory reading is optional: without it the page shows no memory headroom.
export function nextScalerState (previous: ScalerState | undefined, scaler: WorkersScaler | null, memory: RuntimeMemory | null = null): ScalerState {
  if (scaler === null) return { status: 'unavailable' }
  if (scaler.version !== SUPPORTED_SCALER_VERSION) return { status: 'unsupported', version: scaler.version }

  const previousHistories = previous?.status === 'available' ? previous.histories : undefined
  const histories = new Map<string, ScalerHistory>()
  for (const application of scaler.applications) {
    histories.set(application.id, updateHistory(previousHistories?.get(application.id), application, scaler.now))
  }
  return { status: 'available', scaler, memory, histories }
}

export function toScalerResponse (state: ScalerState | undefined): ScalerResponse {
  if (!state || state.status === 'unavailable') return { status: 'unavailable', applications: [] }
  if (state.status === 'unsupported') return { status: 'unsupported', version: state.version, applications: [] }

  const { scaler, memory, histories } = state
  const response: ScalerResponse = {
    status: 'available',
    version: scaler.version,
    now: scaler.now,
    processIntervalMs: scaler.processIntervalMs,
    maxTotalWorkers: scaler.maxTotalWorkers,
    applications: scaler.applications.map(application => {
      const history = histories.get(application.id)
      const metrics: ScalerResponse['applications'][number]['metrics'] = {}
      for (const [name, { threshold, level, lastProcessedTs, trendPerSecond }] of Object.entries(application.metrics)) {
        metrics[name] = { lastProcessedTs, trendPerSecond, history: history?.metrics[name] ?? [] }
        if (threshold !== null) metrics[name].threshold = threshold
        if (level !== null) metrics[name].level = level
      }
      return { ...application, metrics, workerHistory: history?.workers ?? [] }
    })
  }
  if (memory) response.memory = { used: memory.used, limit: scaler.memoryLimit }
  return response
}
