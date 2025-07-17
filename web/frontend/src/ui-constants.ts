export const HOME_PATH = '/'
export const POD_SERVICES_PATH = '/services'
export const POD_LOGS_PATH = '/logs'

export const STATUS_RUNNING = 'running'
export const STATUS_STARTED = 'started'
export const STATUS_STOPPED = 'stopped'

export const RAW = 'raw'
export const PRETTY = 'pretty'

export const DIRECTION_DOWN = 'down'
export const DIRECTION_STILL = 'still'
export const DIRECTION_UP = 'up'
export const DIRECTION_TAIL = 'tail'

export const REFRESH_INTERVAL_METRICS = 2000
export const REFRESH_INTERVAL_LOGS = 2000

export const MEMORY_UNIT_METRICS = 'MB'
export const LATENCY_UNIT_METRICS = 'ms'
export const CPU_UNIT_METRICS = '%'
export const REQ_UNIT_METRICS = '#'
export const KAFKA_UNIT_METRICS = '#'

export const MEMORY_OPTIONS_METRICS = [{
  label: 'RSS',
  internalKey: 'rss',
  unit: MEMORY_UNIT_METRICS
}, {
  label: 'Total Heap',
  internalKey: 'totalHeap',
  unit: MEMORY_UNIT_METRICS
}, {
  label: 'Heap Used',
  internalKey: 'usedHeap',
  unit: MEMORY_UNIT_METRICS
}, {
  label: 'New Space',
  internalKey: 'newSpace',
  unit: MEMORY_UNIT_METRICS
}, {
  label: 'Old Space',
  internalKey: 'oldSpace',
  unit: MEMORY_UNIT_METRICS
}]
export const CPU_OPTIONS_METRICS = [{
  label: 'CPU',
  internalKey: 'cpu',
  unit: CPU_UNIT_METRICS
}, {
  label: 'ELU',
  internalKey: 'eventLoop',
  unit: CPU_UNIT_METRICS
}]
export const LATENCY_OPTIONS_METRICS = [{
  label: 'P90',
  internalKey: 'p90',
  unit: LATENCY_UNIT_METRICS
}, {
  label: 'P95',
  internalKey: 'p95',
  unit: LATENCY_UNIT_METRICS
}, {
  label: 'P99',
  internalKey: 'p99',
  unit: LATENCY_UNIT_METRICS
}]
export const REQ_OPTIONS_METRICS = [{
  label: 'RPS',
  internalKey: 'rps',
  unit: REQ_UNIT_METRICS
}]
export const KAFKA_OPTIONS_METRICS = [
  {
    label: 'Producers',
    internalKey: 'producers',
    unit: KAFKA_UNIT_METRICS
  },
  {
    label: 'Consumers',
    internalKey: 'consumers',
    unit: KAFKA_UNIT_METRICS
  },
  {
    label: 'Topics',
    internalKey: 'consumersTopics',
    unit: KAFKA_UNIT_METRICS
  },
  {
    label: 'Streams',
    internalKey: 'consumersStreams',
    unit: KAFKA_UNIT_METRICS
  },
  {
    label: 'Flight',
    internalKey: 'hooksMessagesInFlight',
    unit: KAFKA_UNIT_METRICS
  },
  {
    label: 'DLQ',
    internalKey: 'hooksDlqMessagesTotal',
    unit: KAFKA_UNIT_METRICS
  }
]

export const POSITION_ABSOLUTE = 'absolute'
export const POSITION_FIXED = 'fixed'
