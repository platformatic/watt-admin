import type { GetRuntimesPidScalerResponseOK } from 'src/client/backend-types'

export type Scaler = GetRuntimesPidScalerResponseOK
export type ScalerApplication = Scaler['applications'][number]
export type ScalerWorker = ScalerApplication['workers'][number]
export type ScalerWorkerMetric = ScalerWorker['metrics'][string]
export type AvailableScaler = Scaler & { status: 'available', now: number, maxTotalWorkers: number }

export interface Point {
  timestamp: number
  value: number
}

export type MetricName = 'elu' | 'heap'
export type ChartName = 'workers' | MetricName

// Chart time ranges. Each worker stores its last 30 one-second samples.
export const WINDOW_MS = 60000
export const FORECAST_MS = 20000
export const WORKER_WINDOW_MS = 30000

export const METRICS: MetricName[] = ['elu', 'heap']
export const COLORS: Record<ChartName | 'forecast' | 'threshold', string> = {
  workers: '#2588E4',
  elu: '#C61BE2',
  heap: '#00BCD4',
  forecast: '#FEB928',
  threshold: '#FA2121'
}

// Display bound for a per-worker value. ELU cannot exceed 100%.
const MAX_VALUE: Record<MetricName, number> = { elu: 1, heap: Infinity }

export function last<T> (items: T[]): T | undefined {
  return items[items.length - 1]
}

export function isAvailable (scaler: Scaler): scaler is AvailableScaler {
  return scaler.status === 'available'
}

export function formatMetric (name: ChartName, value: number | null | undefined): string {
  if (typeof value !== 'number' || !Number.isFinite(value)) return '—'
  if (name === 'elu') return `${Math.round(value * 100)}%`
  if (name === 'heap') return formatBytes(value)
  return String(Math.round(value))
}

export function formatBytes (value: number): string {
  const gigabyte = 1024 ** 3
  return value >= gigabyte ? `${(value / gigabyte).toFixed(1)} GB` : `${(value / 1024 / 1024).toFixed(1)} MB`
}

export function plural (count: number, noun: string): string {
  return `${count} ${noun}${count === 1 ? '' : 's'}`
}

// Instance IDs are "<application>:<index>-<lifetime>".
export function workerIndex (id: string): string {
  return id.match(/:(\d+)-\d+$/)?.[1] ?? id
}

// Current constraints, not a record of rejected scaling decisions.
export function scalingWarnings (scaler: AvailableScaler, selected: ScalerApplication | undefined): string[] {
  const warnings: string[] = []
  const scheduled = scaler.applications.reduce((sum, app) => sum + app.targetCount, 0)
  if (scheduled >= scaler.maxTotalWorkers) {
    warnings.push(`Total worker limit reached (${scheduled}/${scaler.maxTotalWorkers} scheduled, including pending starts). More capacity requires workers.total to be increased or workers to be released.`)
  }
  if (scaler.memory && scaler.memory.used >= scaler.memory.limit) {
    warnings.push(`Memory limit reached (${formatBytes(scaler.memory.used)} / ${formatBytes(scaler.memory.limit)}). Scale-up is blocked until memory is available.`)
  }
  if (!selected) return warnings

  if (selected.targetCount >= selected.maximum) {
    warnings.push(`${selected.id}: application worker limit reached (${selected.targetCount}/${selected.maximum} scheduled). Increase its workers.maximum to allow more workers.`)
  }
  if (selected.metrics.heap && selected.metrics.heap.threshold === undefined) {
    warnings.push(`${selected.id}: heap scaling threshold not configured. Heap is monitored and used for memory checks, but does not trigger scaling. Set workers.heapThresholdMb to enable heap-based scaling.`)
  }
  const overdue = selected.pending.filter(pending => pending.scaleAt < scaler.now).length
  if (overdue) {
    warnings.push(`${selected.id}: ${overdue} scheduled worker${overdue === 1 ? ' is' : 's are'} taking longer than expected to start.`)
  }
  return warnings
}

export interface MetricView {
  history: Point[]
  forecast: Point[]
  threshold: number | null
  current: number | null
}

// Past values and the Holt forecast for one metric, per worker. The forecast
// divides by the scheduled count: that is the capacity the decision plans for.
export function metricView (app: ScalerApplication, name: MetricName, now: number): MetricView | null {
  const metric = app.metrics[name]
  if (!metric) return null

  const max = MAX_VALUE[name]
  const clamp = (value: number): number => Math.max(0, Math.min(max, value))
  const history = metric.history
    .filter(point => point.timestamp >= now - WINDOW_MS)
    .map(point => ({ timestamp: point.timestamp, value: clamp(point.value) }))

  const forecast: Point[] = []
  const { level, trendPerSecond, lastProcessedTs } = metric
  if (level !== undefined && lastProcessedTs && app.targetCount > 0) {
    const end = now + app.horizonMs
    for (const timestamp of [now, end]) {
      const value = (level + trendPerSecond * (timestamp - lastProcessedTs) / 1000) / app.targetCount
      if (Number.isFinite(value)) forecast.push({ timestamp, value: clamp(value) })
    }
    // Keep the slope until it reaches a display bound, then flatten there.
    // Clamping only the endpoints would change the slope.
    const bound = trendPerSecond > 0 ? max : 0
    if (trendPerSecond !== 0 && Number.isFinite(bound)) {
      const crossing = lastProcessedTs + (bound * app.targetCount - level) / trendPerSecond * 1000
      if (crossing > now && crossing < end) forecast.splice(1, 0, { timestamp: Math.round(crossing), value: bound })
    }
  }

  return { history, forecast, threshold: metric.threshold ?? null, current: last(history)?.value ?? null }
}

// The scheduled worker count, held until the end of the forecast window.
export function workerView (app: ScalerApplication, now: number): MetricView {
  return {
    history: app.workerHistory,
    forecast: [{ timestamp: now, value: app.targetCount }, { timestamp: now + FORECAST_MS, value: app.targetCount }],
    threshold: app.maximum,
    current: app.liveCount
  }
}

// A worker's stored samples, plus its latest raw reading when it is newer.
export function workerPoints (metric: ScalerWorkerMetric | undefined, now: number): Point[] {
  if (!metric) return []
  const points = metric.values.map((value, index) => ({ timestamp: metric.firstSampleTs + index * metric.intervalMs, value }))
  if (metric.lastSampleTs > (last(points)?.timestamp ?? 0)) points.push({ timestamp: metric.lastSampleTs, value: metric.lastValue })
  return points.filter(point => point.timestamp >= now - WORKER_WINDOW_MS && Number.isFinite(point.value))
}

export interface ResourceSegment {
  kind: 'worker' | 'scheduled' | 'available'
  application?: string
  label: string
  value: number
}

export interface ResourceUsage {
  workers: { limit: number, live: number, scheduled: number, occupied: number, available: number, scale: number, segments: ResourceSegment[] }
  memory: { heapUsed: number, available: number, missingHeap: number, segments: ResourceSegment[] } | null
}

// The memory row shows worker heaps plus the headroom used by the scaler's
// admission check. System memory already in use is excluded from the bar.
export function resourceUsage (scaler: AvailableScaler): ResourceUsage {
  const workerSegments: ResourceSegment[] = []
  const heapSegments: ResourceSegment[] = []
  let live = 0
  let scheduled = 0
  let heapUsed = 0
  let missingHeap = 0

  for (const application of scaler.applications) {
    for (const worker of application.workers) {
      const segment: ResourceSegment = { kind: 'worker', application: application.id, label: `${application.id}:${workerIndex(worker.id)}`, value: 1 }
      workerSegments.push(segment)
      live++

      const heap = worker.metrics.heap?.lastValue
      if (typeof heap === 'number' && Number.isFinite(heap) && heap >= 0) {
        if (heap > 0) heapSegments.push({ ...segment, value: heap })
        heapUsed += heap
      } else {
        missingHeap++
      }
    }

    const pending = Math.max(0, application.targetCount - application.liveCount)
    if (pending > 0) {
      workerSegments.push({ kind: 'scheduled', application: application.id, label: `${application.id} · scheduled`, value: pending })
      scheduled += pending
    }
  }

  const limit = scaler.maxTotalWorkers
  const occupied = live + scheduled
  const available = Math.max(0, limit - occupied)
  if (available > 0) workerSegments.push({ kind: 'available', label: 'Available', value: available })
  const workers = { limit, live, scheduled, occupied, available, scale: Math.max(limit, occupied, 1), segments: workerSegments }

  let memory: ResourceUsage['memory'] = null
  if (scaler.memory && scaler.memory.limit >= 0) {
    const headroom = Math.max(0, scaler.memory.limit - scaler.memory.used)
    if (headroom > 0) heapSegments.push({ kind: 'available', label: 'Available for scale-up', value: headroom })
    memory = { heapUsed, available: headroom, missingHeap, segments: heapSegments }
  }
  return { workers, memory }
}
