import { type FromSchema } from 'json-schema-to-ts'

export const scalerPointSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    timestamp: { type: 'number' },
    value: { type: 'number' }
  },
  required: ['timestamp', 'value']
} as const
export type ScalerPoint = FromSchema<typeof scalerPointSchema>

const scalerPointsSchema = { type: 'array', items: scalerPointSchema } as const

// The scaler's smoothed state for one metric, summed over the application's
// workers, plus the per-worker level recorded by watt-admin after each run.
// Unset values are omitted: OpenAPI 3.0, which the gateway validates, has no null type.
const scalerMetricSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    threshold: { type: 'number', description: 'Omitted when no threshold is configured.' },
    lastProcessedTs: { type: 'number' },
    level: { type: 'number', description: 'Omitted before the first processed run.' },
    trendPerSecond: { type: 'number' },
    history: scalerPointsSchema
  },
  required: ['lastProcessedTs', 'trendPerSecond', 'history']
} as const

// One worker's stored samples: sample i is at firstSampleTs + i * intervalMs.
const scalerWorkerMetricSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    lastSampleTs: { type: 'number' },
    lastValue: { type: 'number' },
    firstSampleTs: { type: 'number' },
    intervalMs: { type: 'number' },
    values: { type: 'array', items: { type: 'number' } }
  },
  required: ['lastSampleTs', 'lastValue', 'firstSampleTs', 'intervalMs', 'values']
} as const

const scalerApplicationSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    id: { type: 'string' },
    targetCount: { type: 'number' },
    liveCount: { type: 'number' },
    minimum: { type: 'number' },
    maximum: { type: 'number' },
    initTimeoutMs: { type: 'number' },
    horizonMs: { type: 'number' },
    pending: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          scaleAt: { type: 'number' },
          decisionAt: { type: 'number' },
          expectedCount: { type: 'number' }
        },
        required: ['scaleAt', 'decisionAt', 'expectedCount']
      }
    },
    metrics: { type: 'object', additionalProperties: scalerMetricSchema },
    workers: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          id: { type: 'string' },
          startTime: { type: 'number' },
          metrics: { type: 'object', additionalProperties: scalerWorkerMetricSchema }
        },
        required: ['id', 'startTime', 'metrics']
      }
    },
    // Live worker counts recorded by watt-admin.
    workerHistory: scalerPointsSchema
  },
  required: ['id', 'targetCount', 'liveCount', 'minimum', 'maximum', 'initTimeoutMs', 'horizonMs', 'pending', 'metrics', 'workers', 'workerHistory']
} as const
export type ScalerApplication = FromSchema<typeof scalerApplicationSchema>

// "unavailable": the runtime does not run the dynamic workers scaler.
// "unsupported": it reports a format version this watt-admin does not know.
export const scalerResponseSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    status: { type: 'string', enum: ['available', 'unavailable', 'unsupported'] },
    version: { type: 'number' },
    now: { type: 'number' },
    processIntervalMs: { type: 'number' },
    maxTotalWorkers: { type: 'number' },
    memory: {
      type: 'object',
      description: 'Omitted until memory usage is known.',
      additionalProperties: false,
      properties: { used: { type: 'number' }, limit: { type: 'number' } },
      required: ['used', 'limit']
    },
    applications: { type: 'array', items: scalerApplicationSchema }
  },
  required: ['status', 'applications']
} as const
export type ScalerResponse = FromSchema<typeof scalerResponseSchema>
