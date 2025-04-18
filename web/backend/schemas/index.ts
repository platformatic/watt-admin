import { type FromSchema } from 'json-schema-to-ts'

const dateSchema = { type: 'string', format: 'date-time' } as const

const memoryDataPointSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    date: dateSchema,
    rss: { type: 'number' },
    totalHeap: { type: 'number' },
    usedHeap: { type: 'number' },
    newSpace: { type: 'number' },
    oldSpace: { type: 'number' }
  },
  required: ['date', 'rss', 'totalHeap', 'usedHeap', 'newSpace', 'oldSpace']
} as const
export type MemoryDataPoint = FromSchema<typeof memoryDataPointSchema>

const cpuDataPointSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    date: dateSchema,
    cpu: { type: 'number' },
    eventLoop: { type: 'number' }
  },
  required: ['date', 'cpu', 'eventLoop']
} as const
export type CpuDataPoint = FromSchema<typeof cpuDataPointSchema>

const latencyDataPointSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    date: { type: 'string', format: 'date-time' },
    p90: { type: 'number' },
    p95: { type: 'number' },
    p99: { type: 'number' }
  },
  required: ['date', 'p90', 'p95', 'p99']
} as const
export type LatencyDataPoint = FromSchema<typeof latencyDataPointSchema>

const requestDataPointSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    date: { type: 'string', format: 'date-time' },
    count: { type: 'number' },
    rps: { type: 'number' }
  },
  required: ['date', 'count', 'rps']
} as const
export type RequestDataPoint = FromSchema<typeof requestDataPointSchema>

export const metricResponseSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    dataMem: { type: 'array', items: memoryDataPointSchema },
    dataCpu: { type: 'array', items: cpuDataPointSchema },
    dataLatency: { type: 'array', items: latencyDataPointSchema },
    dataReq: { type: 'array', items: requestDataPointSchema }
  },
  required: ['dataMem', 'dataCpu', 'dataLatency', 'dataReq']
} as const
export type MetricsResponse = FromSchema<typeof metricResponseSchema>

export const selectableRuntimeSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    pid: {
      type: 'integer'
    },
    cwd: {
      type: 'string'
    },
    argv: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    uptimeSeconds: {
      type: 'number'
    },
    execPath: {
      type: 'string'
    },
    nodeVersion: {
      type: 'string'
    },
    projectDir: {
      type: 'string'
    },
    packageName: {
      type: 'string'
    },
    packageVersion: {
      type: 'string'
    },
    url: {
      type: 'string'
    },
    platformaticVersion: {
      type: 'string'
    },
    selected: {
      type: 'boolean'
    }
  },
  required: [
    'pid',
    'cwd',
    'argv',
    'uptimeSeconds',
    'execPath',
    'nodeVersion',
    'projectDir',
    'packageName',
    'packageVersion',
    'url',
    'platformaticVersion',
    'selected'
  ]
} as const
export type SelectableRuntime = FromSchema<typeof selectableRuntimeSchema>
