import { Metric } from '@platformatic/control'

export const metricFixtures = [
  {
    help: 'Total user CPU time spent in seconds.',
    name: 'process_cpu_user_seconds_total',
    type: 'counter',
    values: [
      {
        value: 1.016634,
        labels: {
          serviceId: 'composer'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total system CPU time spent in seconds.',
    name: 'process_cpu_system_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.24545400000000003,
        labels: {
          serviceId: 'composer'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total user and system CPU time spent in seconds.',
    name: 'process_cpu_seconds_total',
    type: 'counter',
    values: [
      {
        value: 1.2620879999999999,
        labels: {
          serviceId: 'composer'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Start time of the process since unix epoch in seconds.',
    name: 'process_start_time_seconds',
    type: 'gauge',
    values: [
      {
        value: 1743244689,
        labels: {
          serviceId: 'composer'
        }
      }
    ],
    aggregator: 'omit'
  },
  {
    help: 'Resident memory size in bytes.',
    name: 'process_resident_memory_bytes',
    type: 'gauge',
    values: [
      {
        value: 543653888,
        labels: {
          serviceId: 'composer'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Lag of event loop in seconds.',
    name: 'nodejs_eventloop_lag_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.001445417,
        labels: {
          serviceId: 'composer'
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'The minimum recorded event loop delay.',
    name: 'nodejs_eventloop_lag_min_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.010248192,
        labels: {
          serviceId: 'composer'
        }
      }
    ],
    aggregator: 'min'
  },
  {
    help: 'The maximum recorded event loop delay.',
    name: 'nodejs_eventloop_lag_max_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.013066239,
        labels: {
          serviceId: 'composer'
        }
      }
    ],
    aggregator: 'max'
  },
  {
    help: 'The mean of the recorded event loop delays.',
    name: 'nodejs_eventloop_lag_mean_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.011015404307692309,
        labels: {
          serviceId: 'composer'
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'The standard deviation of the recorded event loop delays.',
    name: 'nodejs_eventloop_lag_stddev_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.0006653726396935994,
        labels: {
          serviceId: 'composer'
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'The 50th percentile of the recorded event loop delays.',
    name: 'nodejs_eventloop_lag_p50_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.010911743,
        labels: {
          serviceId: 'composer'
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'The 90th percentile of the recorded event loop delays.',
    name: 'nodejs_eventloop_lag_p90_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.011427839,
        labels: {
          serviceId: 'composer'
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'The 99th percentile of the recorded event loop delays.',
    name: 'nodejs_eventloop_lag_p99_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.013066239,
        labels: {
          serviceId: 'composer'
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'Number of active resources that are currently keeping the event loop alive, grouped by async resource type.',
    name: 'nodejs_active_resources',
    type: 'gauge',
    values: [
      {
        value: 11,
        labels: {
          type: 'MessagePort',
          serviceId: 'composer'
        }
      },
      {
        value: 1,
        labels: {
          type: 'TCPServerWrap',
          serviceId: 'composer'
        }
      },
      {
        value: 1,
        labels: {
          type: 'Immediate',
          serviceId: 'composer'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total number of active resources.',
    name: 'nodejs_active_resources_total',
    type: 'gauge',
    values: [
      {
        value: 13,
        labels: {
          serviceId: 'composer'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Number of active libuv handles grouped by handle type. Every handle type is C++ class name.',
    name: 'nodejs_active_handles',
    type: 'gauge',
    values: [
      {
        value: 11,
        labels: {
          type: 'MessagePort',
          serviceId: 'composer'
        }
      },
      {
        value: 1,
        labels: {
          type: 'Server',
          serviceId: 'composer'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total number of active handles.',
    name: 'nodejs_active_handles_total',
    type: 'gauge',
    values: [
      {
        value: 12,
        labels: {
          serviceId: 'composer'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Number of active libuv requests grouped by request type. Every request type is C++ class name.',
    name: 'nodejs_active_requests',
    type: 'gauge',
    values: [],
    aggregator: 'sum'
  },
  {
    help: 'Total number of active requests.',
    name: 'nodejs_active_requests_total',
    type: 'gauge',
    values: [
      {
        value: 0,
        labels: {
          serviceId: 'composer'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Process heap size from Node.js in bytes.',
    name: 'nodejs_heap_size_total_bytes',
    type: 'gauge',
    values: [
      {
        value: 55689216,
        labels: {
          serviceId: 'composer'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Process heap size used from Node.js in bytes.',
    name: 'nodejs_heap_size_used_bytes',
    type: 'gauge',
    values: [
      {
        value: 48001848,
        labels: {
          serviceId: 'composer'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Node.js external memory size in bytes.',
    name: 'nodejs_external_memory_bytes',
    type: 'gauge',
    values: [
      {
        value: 5092344,
        labels: {
          serviceId: 'composer'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Process heap space size total from Node.js in bytes.',
    name: 'nodejs_heap_space_size_total_bytes',
    type: 'gauge',
    values: [
      {
        value: 0,
        labels: {
          space: 'read_only',
          serviceId: 'composer'
        }
      },
      {
        value: 4194304,
        labels: {
          space: 'new',
          serviceId: 'composer'
        }
      },
      {
        value: 38240256,
        labels: {
          space: 'old',
          serviceId: 'composer'
        }
      },
      {
        value: 3407872,
        labels: {
          space: 'code',
          serviceId: 'composer'
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared',
          serviceId: 'composer'
        }
      },
      {
        value: 5570560,
        labels: {
          space: 'trusted',
          serviceId: 'composer'
        }
      },
      {
        value: 0,
        labels: {
          space: 'new_large_object',
          serviceId: 'composer'
        }
      },
      {
        value: 3899392,
        labels: {
          space: 'large_object',
          serviceId: 'composer'
        }
      },
      {
        value: 212992,
        labels: {
          space: 'code_large_object',
          serviceId: 'composer'
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared_large_object',
          serviceId: 'composer'
        }
      },
      {
        value: 163840,
        labels: {
          space: 'trusted_large_object',
          serviceId: 'composer'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Process heap space size used from Node.js in bytes.',
    name: 'nodejs_heap_space_size_used_bytes',
    type: 'gauge',
    values: [
      {
        value: 0,
        labels: {
          space: 'read_only',
          serviceId: 'composer'
        }
      },
      {
        value: 357928,
        labels: {
          space: 'new',
          serviceId: 'composer'
        }
      },
      {
        value: 36012104,
        labels: {
          space: 'old',
          serviceId: 'composer'
        }
      },
      {
        value: 2658784,
        labels: {
          space: 'code',
          serviceId: 'composer'
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared',
          serviceId: 'composer'
        }
      },
      {
        value: 4997336,
        labels: {
          space: 'trusted',
          serviceId: 'composer'
        }
      },
      {
        value: 0,
        labels: {
          space: 'new_large_object',
          serviceId: 'composer'
        }
      },
      {
        value: 3678792,
        labels: {
          space: 'large_object',
          serviceId: 'composer'
        }
      },
      {
        value: 155328,
        labels: {
          space: 'code_large_object',
          serviceId: 'composer'
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared_large_object',
          serviceId: 'composer'
        }
      },
      {
        value: 143736,
        labels: {
          space: 'trusted_large_object',
          serviceId: 'composer'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Process heap space size available from Node.js in bytes.',
    name: 'nodejs_heap_space_size_available_bytes',
    type: 'gauge',
    values: [
      {
        value: 0,
        labels: {
          space: 'read_only',
          serviceId: 'composer'
        }
      },
      {
        value: 1703896,
        labels: {
          space: 'new',
          serviceId: 'composer'
        }
      },
      {
        value: 1498472,
        labels: {
          space: 'old',
          serviceId: 'composer'
        }
      },
      {
        value: 110112,
        labels: {
          space: 'code',
          serviceId: 'composer'
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared',
          serviceId: 'composer'
        }
      },
      {
        value: 475528,
        labels: {
          space: 'trusted',
          serviceId: 'composer'
        }
      },
      {
        value: 2097152,
        labels: {
          space: 'new_large_object',
          serviceId: 'composer'
        }
      },
      {
        value: 0,
        labels: {
          space: 'large_object',
          serviceId: 'composer'
        }
      },
      {
        value: 0,
        labels: {
          space: 'code_large_object',
          serviceId: 'composer'
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared_large_object',
          serviceId: 'composer'
        }
      },
      {
        value: 0,
        labels: {
          space: 'trusted_large_object',
          serviceId: 'composer'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Node.js version info.',
    name: 'nodejs_version_info',
    type: 'gauge',
    values: [
      {
        value: 1,
        labels: {
          version: 'v22.12.0',
          major: 22,
          minor: 12,
          patch: 0,
          serviceId: 'composer'
        }
      }
    ],
    aggregator: 'first'
  },
  {
    name: 'nodejs_gc_duration_seconds',
    help: 'Garbage collection duration by kind, one of major, minor, incremental or weakcb.',
    type: 'histogram',
    values: [
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.001,
          kind: 'incremental',
          serviceId: 'composer'
        }
      },
      {
        value: 2,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.01,
          kind: 'incremental',
          serviceId: 'composer'
        }
      },
      {
        value: 2,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.1,
          kind: 'incremental',
          serviceId: 'composer'
        }
      },
      {
        value: 2,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 1,
          kind: 'incremental',
          serviceId: 'composer'
        }
      },
      {
        value: 2,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 2,
          kind: 'incremental',
          serviceId: 'composer'
        }
      },
      {
        value: 2,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 5,
          kind: 'incremental',
          serviceId: 'composer'
        }
      },
      {
        value: 2,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: '+Inf',
          kind: 'incremental',
          serviceId: 'composer'
        }
      },
      {
        value: 0.0022564170002005992,
        metricName: 'nodejs_gc_duration_seconds_sum',
        labels: {
          kind: 'incremental',
          serviceId: 'composer'
        }
      },
      {
        value: 2,
        metricName: 'nodejs_gc_duration_seconds_count',
        labels: {
          kind: 'incremental',
          serviceId: 'composer'
        }
      },
      {
        value: 0,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.001,
          kind: 'major',
          serviceId: 'composer'
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.01,
          kind: 'major',
          serviceId: 'composer'
        }
      },
      {
        value: 2,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.1,
          kind: 'major',
          serviceId: 'composer'
        }
      },
      {
        value: 2,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 1,
          kind: 'major',
          serviceId: 'composer'
        }
      },
      {
        value: 2,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 2,
          kind: 'major',
          serviceId: 'composer'
        }
      },
      {
        value: 2,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 5,
          kind: 'major',
          serviceId: 'composer'
        }
      },
      {
        value: 2,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: '+Inf',
          kind: 'major',
          serviceId: 'composer'
        }
      },
      {
        value: 0.017058375999797135,
        metricName: 'nodejs_gc_duration_seconds_sum',
        labels: {
          kind: 'major',
          serviceId: 'composer'
        }
      },
      {
        value: 2,
        metricName: 'nodejs_gc_duration_seconds_count',
        labels: {
          kind: 'major',
          serviceId: 'composer'
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.001,
          kind: 'minor',
          serviceId: 'composer'
        }
      },
      {
        value: 2,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.01,
          kind: 'minor',
          serviceId: 'composer'
        }
      },
      {
        value: 2,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.1,
          kind: 'minor',
          serviceId: 'composer'
        }
      },
      {
        value: 2,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 1,
          kind: 'minor',
          serviceId: 'composer'
        }
      },
      {
        value: 2,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 2,
          kind: 'minor',
          serviceId: 'composer'
        }
      },
      {
        value: 2,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 5,
          kind: 'minor',
          serviceId: 'composer'
        }
      },
      {
        value: 2,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: '+Inf',
          kind: 'minor',
          serviceId: 'composer'
        }
      },
      {
        value: 0.0013569180006161334,
        metricName: 'nodejs_gc_duration_seconds_sum',
        labels: {
          kind: 'minor',
          serviceId: 'composer'
        }
      },
      {
        value: 2,
        metricName: 'nodejs_gc_duration_seconds_count',
        labels: {
          kind: 'minor',
          serviceId: 'composer'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'The event loop utilization as a fraction of the loop time. 1 is fully utilized, 0 is fully idle.',
    name: 'nodejs_eventloop_utilization',
    type: 'gauge',
    values: [
      {
        value: 0.018317402597156054,
        labels: {
          serviceId: 'composer'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'The process CPU percent usage.',
    name: 'process_cpu_percent_usage',
    type: 'gauge',
    values: [
      {
        value: 53.91,
        labels: {
          serviceId: 'composer'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total user CPU time spent in seconds for the current thread.',
    name: 'thread_cpu_user_system_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.08258100000000002,
        labels: {
          serviceId: 'composer'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total system CPU time spent in seconds for the current thread.',
    name: 'thread_cpu_system_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.020998000000000003,
        labels: {
          serviceId: 'composer'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'The thread CPU percent usage.',
    name: 'thread_cpu_percent_usage',
    type: 'gauge',
    values: [
      {
        value: 1.7182668591777364,
        labels: {
          serviceId: 'composer'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total user and system CPU time spent in seconds for the current threads.',
    name: 'thread_cpu_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.10357899999999999,
        labels: {
          serviceId: 'composer'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Number of http cache hits',
    name: 'http_cache_hit_count',
    type: 'counter',
    values: [
      {
        value: 0,
        labels: {
          serviceId: 'composer'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Number of http cache misses',
    name: 'http_cache_miss_count',
    type: 'counter',
    values: [
      {
        value: 0,
        labels: {
          serviceId: 'composer'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    name: 'http_request_summary_seconds',
    help: 'request duration in seconds summary',
    type: 'summary',
    values: [
      {
        labels: {
          quantile: 0.01,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'composer'
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.05,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'composer'
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.5,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'composer'
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.9,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'composer'
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.95,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'composer'
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.99,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'composer'
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.999,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'composer'
        },
        value: 0
      },
      {
        metricName: 'http_request_summary_seconds_sum',
        labels: {
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'composer'
        },
        value: 0
      },
      {
        metricName: 'http_request_summary_seconds_count',
        labels: {
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'composer'
        },
        value: 1
      },
      {
        labels: {
          quantile: 0.01,
          method: 'GET',
          route: '/typescript/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0.010855
      },
      {
        labels: {
          quantile: 0.05,
          method: 'GET',
          route: '/typescript/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0.010855
      },
      {
        labels: {
          quantile: 0.5,
          method: 'GET',
          route: '/typescript/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0.010855
      },
      {
        labels: {
          quantile: 0.9,
          method: 'GET',
          route: '/typescript/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0.010855
      },
      {
        labels: {
          quantile: 0.95,
          method: 'GET',
          route: '/typescript/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0.010855
      },
      {
        labels: {
          quantile: 0.99,
          method: 'GET',
          route: '/typescript/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0.010855
      },
      {
        labels: {
          quantile: 0.999,
          method: 'GET',
          route: '/typescript/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0.010855
      },
      {
        metricName: 'http_request_summary_seconds_sum',
        labels: {
          method: 'GET',
          route: '/typescript/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0.010855
      },
      {
        metricName: 'http_request_summary_seconds_count',
        labels: {
          method: 'GET',
          route: '/typescript/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 1
      },
      {
        labels: {
          quantile: 0.01,
          method: 'GET',
          route: '/typescript',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0.017176958
      },
      {
        labels: {
          quantile: 0.05,
          method: 'GET',
          route: '/typescript',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0.017176958
      },
      {
        labels: {
          quantile: 0.5,
          method: 'GET',
          route: '/typescript',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0.017176958
      },
      {
        labels: {
          quantile: 0.9,
          method: 'GET',
          route: '/typescript',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0.017176958
      },
      {
        labels: {
          quantile: 0.95,
          method: 'GET',
          route: '/typescript',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0.017176958
      },
      {
        labels: {
          quantile: 0.99,
          method: 'GET',
          route: '/typescript',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0.017176958
      },
      {
        labels: {
          quantile: 0.999,
          method: 'GET',
          route: '/typescript',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0.017176958
      },
      {
        metricName: 'http_request_summary_seconds_sum',
        labels: {
          method: 'GET',
          route: '/typescript',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0.017176958
      },
      {
        metricName: 'http_request_summary_seconds_count',
        labels: {
          method: 'GET',
          route: '/typescript',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 1
      },
      {
        labels: {
          quantile: 0.01,
          method: 'GET',
          route: '/ts2/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0.002305917
      },
      {
        labels: {
          quantile: 0.05,
          method: 'GET',
          route: '/ts2/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0.002305917
      },
      {
        labels: {
          quantile: 0.5,
          method: 'GET',
          route: '/ts2/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0.004781063
      },
      {
        labels: {
          quantile: 0.9,
          method: 'GET',
          route: '/ts2/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0.007337792
      },
      {
        labels: {
          quantile: 0.95,
          method: 'GET',
          route: '/ts2/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0.007337792
      },
      {
        labels: {
          quantile: 0.99,
          method: 'GET',
          route: '/ts2/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0.007337792
      },
      {
        labels: {
          quantile: 0.999,
          method: 'GET',
          route: '/ts2/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0.007337792
      },
      {
        metricName: 'http_request_summary_seconds_sum',
        labels: {
          method: 'GET',
          route: '/ts2/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0.019205835
      },
      {
        metricName: 'http_request_summary_seconds_count',
        labels: {
          method: 'GET',
          route: '/ts2/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 4
      },
      {
        labels: {
          quantile: 0.01,
          method: 'GET',
          route: '/ts2',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0.00259225
      },
      {
        labels: {
          quantile: 0.05,
          method: 'GET',
          route: '/ts2',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0.00259225
      },
      {
        labels: {
          quantile: 0.5,
          method: 'GET',
          route: '/ts2',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0.0051754374999999995
      },
      {
        labels: {
          quantile: 0.9,
          method: 'GET',
          route: '/ts2',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0.007755709
      },
      {
        labels: {
          quantile: 0.95,
          method: 'GET',
          route: '/ts2',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0.007755709
      },
      {
        labels: {
          quantile: 0.99,
          method: 'GET',
          route: '/ts2',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0.007755709
      },
      {
        labels: {
          quantile: 0.999,
          method: 'GET',
          route: '/ts2',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0.007755709
      },
      {
        metricName: 'http_request_summary_seconds_sum',
        labels: {
          method: 'GET',
          route: '/ts2',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0.020698834
      },
      {
        metricName: 'http_request_summary_seconds_count',
        labels: {
          method: 'GET',
          route: '/ts2',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 4
      }
    ],
    aggregator: 'sum'
  },
  {
    name: 'http_request_duration_seconds',
    help: 'request duration in seconds',
    type: 'histogram',
    values: [
      {
        value: 0,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.005,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'composer'
        }
      },
      {
        value: 0,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.01,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'composer'
        }
      },
      {
        value: 0,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.025,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'composer'
        }
      },
      {
        value: 0,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.05,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'composer'
        }
      },
      {
        value: 0,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.1,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'composer'
        }
      },
      {
        value: 0,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.25,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'composer'
        }
      },
      {
        value: 0,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.5,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'composer'
        }
      },
      {
        value: 0,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 1,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'composer'
        }
      },
      {
        value: 0,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 2.5,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'composer'
        }
      },
      {
        value: 0,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 5,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'composer'
        }
      },
      {
        value: 0,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 10,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'composer'
        }
      },
      {
        value: 0,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: '+Inf',
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'composer'
        }
      },
      {
        value: 0,
        metricName: 'http_request_duration_seconds_sum',
        labels: {
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'composer'
        }
      },
      {
        value: 0,
        metricName: 'http_request_duration_seconds_count',
        labels: {
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'composer'
        }
      },
      {
        value: 0,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.005,
          method: 'GET',
          route: '/typescript/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      },
      {
        value: 0,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.01,
          method: 'GET',
          route: '/typescript/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      },
      {
        value: 1,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.025,
          method: 'GET',
          route: '/typescript/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      },
      {
        value: 1,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.05,
          method: 'GET',
          route: '/typescript/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      },
      {
        value: 1,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.1,
          method: 'GET',
          route: '/typescript/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      },
      {
        value: 1,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.25,
          method: 'GET',
          route: '/typescript/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      },
      {
        value: 1,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.5,
          method: 'GET',
          route: '/typescript/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      },
      {
        value: 1,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 1,
          method: 'GET',
          route: '/typescript/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      },
      {
        value: 1,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 2.5,
          method: 'GET',
          route: '/typescript/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      },
      {
        value: 1,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 5,
          method: 'GET',
          route: '/typescript/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      },
      {
        value: 1,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 10,
          method: 'GET',
          route: '/typescript/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      },
      {
        value: 1,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: '+Inf',
          method: 'GET',
          route: '/typescript/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      },
      {
        value: 0.0108895,
        metricName: 'http_request_duration_seconds_sum',
        labels: {
          method: 'GET',
          route: '/typescript/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      },
      {
        value: 1,
        metricName: 'http_request_duration_seconds_count',
        labels: {
          method: 'GET',
          route: '/typescript/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      },
      {
        value: 0,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.005,
          method: 'GET',
          route: '/typescript',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      },
      {
        value: 0,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.01,
          method: 'GET',
          route: '/typescript',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      },
      {
        value: 1,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.025,
          method: 'GET',
          route: '/typescript',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      },
      {
        value: 1,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.05,
          method: 'GET',
          route: '/typescript',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      },
      {
        value: 1,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.1,
          method: 'GET',
          route: '/typescript',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      },
      {
        value: 1,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.25,
          method: 'GET',
          route: '/typescript',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      },
      {
        value: 1,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.5,
          method: 'GET',
          route: '/typescript',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      },
      {
        value: 1,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 1,
          method: 'GET',
          route: '/typescript',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      },
      {
        value: 1,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 2.5,
          method: 'GET',
          route: '/typescript',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      },
      {
        value: 1,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 5,
          method: 'GET',
          route: '/typescript',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      },
      {
        value: 1,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 10,
          method: 'GET',
          route: '/typescript',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      },
      {
        value: 1,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: '+Inf',
          method: 'GET',
          route: '/typescript',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      },
      {
        value: 0.017233584,
        metricName: 'http_request_duration_seconds_sum',
        labels: {
          method: 'GET',
          route: '/typescript',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      },
      {
        value: 1,
        metricName: 'http_request_duration_seconds_count',
        labels: {
          method: 'GET',
          route: '/typescript',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      },
      {
        value: 2,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.005,
          method: 'GET',
          route: '/ts2/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      },
      {
        value: 4,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.01,
          method: 'GET',
          route: '/ts2/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      },
      {
        value: 4,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.025,
          method: 'GET',
          route: '/ts2/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      },
      {
        value: 4,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.05,
          method: 'GET',
          route: '/ts2/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      },
      {
        value: 4,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.1,
          method: 'GET',
          route: '/ts2/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      },
      {
        value: 4,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.25,
          method: 'GET',
          route: '/ts2/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      },
      {
        value: 4,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.5,
          method: 'GET',
          route: '/ts2/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      },
      {
        value: 4,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 1,
          method: 'GET',
          route: '/ts2/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      },
      {
        value: 4,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 2.5,
          method: 'GET',
          route: '/ts2/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      },
      {
        value: 4,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 5,
          method: 'GET',
          route: '/ts2/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      },
      {
        value: 4,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 10,
          method: 'GET',
          route: '/ts2/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      },
      {
        value: 4,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: '+Inf',
          method: 'GET',
          route: '/ts2/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      },
      {
        value: 0.019308375,
        metricName: 'http_request_duration_seconds_sum',
        labels: {
          method: 'GET',
          route: '/ts2/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      },
      {
        value: 4,
        metricName: 'http_request_duration_seconds_count',
        labels: {
          method: 'GET',
          route: '/ts2/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      },
      {
        value: 2,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.005,
          method: 'GET',
          route: '/ts2',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      },
      {
        value: 4,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.01,
          method: 'GET',
          route: '/ts2',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      },
      {
        value: 4,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.025,
          method: 'GET',
          route: '/ts2',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      },
      {
        value: 4,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.05,
          method: 'GET',
          route: '/ts2',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      },
      {
        value: 4,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.1,
          method: 'GET',
          route: '/ts2',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      },
      {
        value: 4,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.25,
          method: 'GET',
          route: '/ts2',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      },
      {
        value: 4,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.5,
          method: 'GET',
          route: '/ts2',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      },
      {
        value: 4,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 1,
          method: 'GET',
          route: '/ts2',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      },
      {
        value: 4,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 2.5,
          method: 'GET',
          route: '/ts2',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      },
      {
        value: 4,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 5,
          method: 'GET',
          route: '/ts2',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      },
      {
        value: 4,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 10,
          method: 'GET',
          route: '/ts2',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      },
      {
        value: 4,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: '+Inf',
          method: 'GET',
          route: '/ts2',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      },
      {
        value: 0.020732082,
        metricName: 'http_request_duration_seconds_sum',
        labels: {
          method: 'GET',
          route: '/ts2',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      },
      {
        value: 4,
        metricName: 'http_request_duration_seconds_count',
        labels: {
          method: 'GET',
          route: '/ts2',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    name: 'http_request_all_summary_seconds',
    help: 'request duration in seconds histogram for all requests',
    type: 'summary',
    values: [
      {
        labels: {
          quantile: 0.01,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'composer'
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.05,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'composer'
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.5,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'composer'
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.9,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'composer'
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.95,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'composer'
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.99,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'composer'
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.999,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'composer'
        },
        value: 0
      },
      {
        metricName: 'http_request_all_summary_seconds_sum',
        labels: {
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'composer'
        },
        value: 0
      },
      {
        metricName: 'http_request_all_summary_seconds_count',
        labels: {
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'composer'
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.01,
          method: 'GET',
          route: '/typescript/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.05,
          method: 'GET',
          route: '/typescript/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.5,
          method: 'GET',
          route: '/typescript/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.9,
          method: 'GET',
          route: '/typescript/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.95,
          method: 'GET',
          route: '/typescript/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.99,
          method: 'GET',
          route: '/typescript/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.999,
          method: 'GET',
          route: '/typescript/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0
      },
      {
        metricName: 'http_request_all_summary_seconds_sum',
        labels: {
          method: 'GET',
          route: '/typescript/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0
      },
      {
        metricName: 'http_request_all_summary_seconds_count',
        labels: {
          method: 'GET',
          route: '/typescript/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.01,
          method: 'GET',
          route: '/typescript',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.05,
          method: 'GET',
          route: '/typescript',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.5,
          method: 'GET',
          route: '/typescript',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.9,
          method: 'GET',
          route: '/typescript',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.95,
          method: 'GET',
          route: '/typescript',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.99,
          method: 'GET',
          route: '/typescript',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.999,
          method: 'GET',
          route: '/typescript',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0
      },
      {
        metricName: 'http_request_all_summary_seconds_sum',
        labels: {
          method: 'GET',
          route: '/typescript',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0
      },
      {
        metricName: 'http_request_all_summary_seconds_count',
        labels: {
          method: 'GET',
          route: '/typescript',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.01,
          method: 'GET',
          route: '/ts2/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.05,
          method: 'GET',
          route: '/ts2/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.5,
          method: 'GET',
          route: '/ts2/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.9,
          method: 'GET',
          route: '/ts2/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.95,
          method: 'GET',
          route: '/ts2/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.99,
          method: 'GET',
          route: '/ts2/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.999,
          method: 'GET',
          route: '/ts2/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0
      },
      {
        metricName: 'http_request_all_summary_seconds_sum',
        labels: {
          method: 'GET',
          route: '/ts2/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0
      },
      {
        metricName: 'http_request_all_summary_seconds_count',
        labels: {
          method: 'GET',
          route: '/ts2/',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.01,
          method: 'GET',
          route: '/ts2',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.05,
          method: 'GET',
          route: '/ts2',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.5,
          method: 'GET',
          route: '/ts2',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.9,
          method: 'GET',
          route: '/ts2',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.95,
          method: 'GET',
          route: '/ts2',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.99,
          method: 'GET',
          route: '/ts2',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.999,
          method: 'GET',
          route: '/ts2',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0
      },
      {
        metricName: 'http_request_all_summary_seconds_sum',
        labels: {
          method: 'GET',
          route: '/ts2',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0
      },
      {
        metricName: 'http_request_all_summary_seconds_count',
        labels: {
          method: 'GET',
          route: '/ts2',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'composer'
        },
        value: 0
      }
    ],
    aggregator: 'sum'
  },
  {
    name: 'http_request_all_duration_seconds',
    help: 'request duration in seconds summary for all requests',
    type: 'histogram',
    values: [],
    aggregator: 'sum'
  },
  {
    help: 'Total user CPU time spent in seconds.',
    name: 'process_cpu_user_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.9675760000000001,
        labels: {
          serviceId: 'fastify2'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total system CPU time spent in seconds.',
    name: 'process_cpu_system_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.232756,
        labels: {
          serviceId: 'fastify2'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total user and system CPU time spent in seconds.',
    name: 'process_cpu_seconds_total',
    type: 'counter',
    values: [
      {
        value: 1.2003320000000002,
        labels: {
          serviceId: 'fastify2'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Start time of the process since unix epoch in seconds.',
    name: 'process_start_time_seconds',
    type: 'gauge',
    values: [
      {
        value: 1743244689,
        labels: {
          serviceId: 'fastify2'
        }
      }
    ],
    aggregator: 'omit'
  },
  {
    help: 'Resident memory size in bytes.',
    name: 'process_resident_memory_bytes',
    type: 'gauge',
    values: [
      {
        value: 543850496,
        labels: {
          serviceId: 'fastify2'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Lag of event loop in seconds.',
    name: 'nodejs_eventloop_lag_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.000665667,
        labels: {
          serviceId: 'fastify2'
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'The minimum recorded event loop delay.',
    name: 'nodejs_eventloop_lag_min_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.010354688,
        labels: {
          serviceId: 'fastify2'
        }
      }
    ],
    aggregator: 'min'
  },
  {
    help: 'The maximum recorded event loop delay.',
    name: 'nodejs_eventloop_lag_max_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.012263423,
        labels: {
          serviceId: 'fastify2'
        }
      }
    ],
    aggregator: 'max'
  },
  {
    help: 'The mean of the recorded event loop delays.',
    name: 'nodejs_eventloop_lag_mean_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.010995239384615383,
        labels: {
          serviceId: 'fastify2'
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'The standard deviation of the recorded event loop delays.',
    name: 'nodejs_eventloop_lag_stddev_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.00041283109400437856,
        labels: {
          serviceId: 'fastify2'
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'The 50th percentile of the recorded event loop delays.',
    name: 'nodejs_eventloop_lag_p50_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.010985471,
        labels: {
          serviceId: 'fastify2'
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'The 90th percentile of the recorded event loop delays.',
    name: 'nodejs_eventloop_lag_p90_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.011075583,
        labels: {
          serviceId: 'fastify2'
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'The 99th percentile of the recorded event loop delays.',
    name: 'nodejs_eventloop_lag_p99_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.012263423,
        labels: {
          serviceId: 'fastify2'
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'Number of active resources that are currently keeping the event loop alive, grouped by async resource type.',
    name: 'nodejs_active_resources',
    type: 'gauge',
    values: [
      {
        value: 11,
        labels: {
          type: 'MessagePort',
          serviceId: 'fastify2'
        }
      },
      {
        value: 2,
        labels: {
          type: 'TCPServerWrap',
          serviceId: 'fastify2'
        }
      },
      {
        value: 1,
        labels: {
          type: 'Immediate',
          serviceId: 'fastify2'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total number of active resources.',
    name: 'nodejs_active_resources_total',
    type: 'gauge',
    values: [
      {
        value: 14,
        labels: {
          serviceId: 'fastify2'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Number of active libuv handles grouped by handle type. Every handle type is C++ class name.',
    name: 'nodejs_active_handles',
    type: 'gauge',
    values: [
      {
        value: 11,
        labels: {
          type: 'MessagePort',
          serviceId: 'fastify2'
        }
      },
      {
        value: 2,
        labels: {
          type: 'Server',
          serviceId: 'fastify2'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total number of active handles.',
    name: 'nodejs_active_handles_total',
    type: 'gauge',
    values: [
      {
        value: 13,
        labels: {
          serviceId: 'fastify2'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Number of active libuv requests grouped by request type. Every request type is C++ class name.',
    name: 'nodejs_active_requests',
    type: 'gauge',
    values: [],
    aggregator: 'sum'
  },
  {
    help: 'Total number of active requests.',
    name: 'nodejs_active_requests_total',
    type: 'gauge',
    values: [
      {
        value: 0,
        labels: {
          serviceId: 'fastify2'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Process heap size from Node.js in bytes.',
    name: 'nodejs_heap_size_total_bytes',
    type: 'gauge',
    values: [
      {
        value: 46039040,
        labels: {
          serviceId: 'fastify2'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Process heap size used from Node.js in bytes.',
    name: 'nodejs_heap_size_used_bytes',
    type: 'gauge',
    values: [
      {
        value: 39108000,
        labels: {
          serviceId: 'fastify2'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Node.js external memory size in bytes.',
    name: 'nodejs_external_memory_bytes',
    type: 'gauge',
    values: [
      {
        value: 5430633,
        labels: {
          serviceId: 'fastify2'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Process heap space size total from Node.js in bytes.',
    name: 'nodejs_heap_space_size_total_bytes',
    type: 'gauge',
    values: [
      {
        value: 0,
        labels: {
          space: 'read_only',
          serviceId: 'fastify2'
        }
      },
      {
        value: 4194304,
        labels: {
          space: 'new',
          serviceId: 'fastify2'
        }
      },
      {
        value: 31686656,
        labels: {
          space: 'old',
          serviceId: 'fastify2'
        }
      },
      {
        value: 2359296,
        labels: {
          space: 'code',
          serviceId: 'fastify2'
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared',
          serviceId: 'fastify2'
        }
      },
      {
        value: 4521984,
        labels: {
          space: 'trusted',
          serviceId: 'fastify2'
        }
      },
      {
        value: 0,
        labels: {
          space: 'new_large_object',
          serviceId: 'fastify2'
        }
      },
      {
        value: 3063808,
        labels: {
          space: 'large_object',
          serviceId: 'fastify2'
        }
      },
      {
        value: 212992,
        labels: {
          space: 'code_large_object',
          serviceId: 'fastify2'
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared_large_object',
          serviceId: 'fastify2'
        }
      },
      {
        value: 0,
        labels: {
          space: 'trusted_large_object',
          serviceId: 'fastify2'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Process heap space size used from Node.js in bytes.',
    name: 'nodejs_heap_space_size_used_bytes',
    type: 'gauge',
    values: [
      {
        value: 0,
        labels: {
          space: 'read_only',
          serviceId: 'fastify2'
        }
      },
      {
        value: 429064,
        labels: {
          space: 'new',
          serviceId: 'fastify2'
        }
      },
      {
        value: 29906288,
        labels: {
          space: 'old',
          serviceId: 'fastify2'
        }
      },
      {
        value: 1740128,
        labels: {
          space: 'code',
          serviceId: 'fastify2'
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared',
          serviceId: 'fastify2'
        }
      },
      {
        value: 3997920,
        labels: {
          space: 'trusted',
          serviceId: 'fastify2'
        }
      },
      {
        value: 0,
        labels: {
          space: 'new_large_object',
          serviceId: 'fastify2'
        }
      },
      {
        value: 2881432,
        labels: {
          space: 'large_object',
          serviceId: 'fastify2'
        }
      },
      {
        value: 155328,
        labels: {
          space: 'code_large_object',
          serviceId: 'fastify2'
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared_large_object',
          serviceId: 'fastify2'
        }
      },
      {
        value: 0,
        labels: {
          space: 'trusted_large_object',
          serviceId: 'fastify2'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Process heap space size available from Node.js in bytes.',
    name: 'nodejs_heap_space_size_available_bytes',
    type: 'gauge',
    values: [
      {
        value: 0,
        labels: {
          space: 'read_only',
          serviceId: 'fastify2'
        }
      },
      {
        value: 1632760,
        labels: {
          space: 'new',
          serviceId: 'fastify2'
        }
      },
      {
        value: 1165536,
        labels: {
          space: 'old',
          serviceId: 'fastify2'
        }
      },
      {
        value: 176800,
        labels: {
          space: 'code',
          serviceId: 'fastify2'
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared',
          serviceId: 'fastify2'
        }
      },
      {
        value: 444120,
        labels: {
          space: 'trusted',
          serviceId: 'fastify2'
        }
      },
      {
        value: 2097152,
        labels: {
          space: 'new_large_object',
          serviceId: 'fastify2'
        }
      },
      {
        value: 0,
        labels: {
          space: 'large_object',
          serviceId: 'fastify2'
        }
      },
      {
        value: 0,
        labels: {
          space: 'code_large_object',
          serviceId: 'fastify2'
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared_large_object',
          serviceId: 'fastify2'
        }
      },
      {
        value: 0,
        labels: {
          space: 'trusted_large_object',
          serviceId: 'fastify2'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Node.js version info.',
    name: 'nodejs_version_info',
    type: 'gauge',
    values: [
      {
        value: 1,
        labels: {
          version: 'v22.12.0',
          major: 22,
          minor: 12,
          patch: 0,
          serviceId: 'fastify2'
        }
      }
    ],
    aggregator: 'first'
  },
  {
    name: 'nodejs_gc_duration_seconds',
    help: 'Garbage collection duration by kind, one of major, minor, incremental or weakcb.',
    type: 'histogram',
    values: [
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.001,
          kind: 'incremental',
          serviceId: 'fastify2'
        }
      },
      {
        value: 2,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.01,
          kind: 'incremental',
          serviceId: 'fastify2'
        }
      },
      {
        value: 2,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.1,
          kind: 'incremental',
          serviceId: 'fastify2'
        }
      },
      {
        value: 2,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 1,
          kind: 'incremental',
          serviceId: 'fastify2'
        }
      },
      {
        value: 2,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 2,
          kind: 'incremental',
          serviceId: 'fastify2'
        }
      },
      {
        value: 2,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 5,
          kind: 'incremental',
          serviceId: 'fastify2'
        }
      },
      {
        value: 2,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: '+Inf',
          kind: 'incremental',
          serviceId: 'fastify2'
        }
      },
      {
        value: 0.0012983329994603991,
        metricName: 'nodejs_gc_duration_seconds_sum',
        labels: {
          kind: 'incremental',
          serviceId: 'fastify2'
        }
      },
      {
        value: 2,
        metricName: 'nodejs_gc_duration_seconds_count',
        labels: {
          kind: 'incremental',
          serviceId: 'fastify2'
        }
      },
      {
        value: 0,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.001,
          kind: 'major',
          serviceId: 'fastify2'
        }
      },
      {
        value: 2,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.01,
          kind: 'major',
          serviceId: 'fastify2'
        }
      },
      {
        value: 2,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.1,
          kind: 'major',
          serviceId: 'fastify2'
        }
      },
      {
        value: 2,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 1,
          kind: 'major',
          serviceId: 'fastify2'
        }
      },
      {
        value: 2,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 2,
          kind: 'major',
          serviceId: 'fastify2'
        }
      },
      {
        value: 2,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 5,
          kind: 'major',
          serviceId: 'fastify2'
        }
      },
      {
        value: 2,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: '+Inf',
          kind: 'major',
          serviceId: 'fastify2'
        }
      },
      {
        value: 0.01037754200026393,
        metricName: 'nodejs_gc_duration_seconds_sum',
        labels: {
          kind: 'major',
          serviceId: 'fastify2'
        }
      },
      {
        value: 2,
        metricName: 'nodejs_gc_duration_seconds_count',
        labels: {
          kind: 'major',
          serviceId: 'fastify2'
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.001,
          kind: 'minor',
          serviceId: 'fastify2'
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.01,
          kind: 'minor',
          serviceId: 'fastify2'
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.1,
          kind: 'minor',
          serviceId: 'fastify2'
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 1,
          kind: 'minor',
          serviceId: 'fastify2'
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 2,
          kind: 'minor',
          serviceId: 'fastify2'
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 5,
          kind: 'minor',
          serviceId: 'fastify2'
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: '+Inf',
          kind: 'minor',
          serviceId: 'fastify2'
        }
      },
      {
        value: 0.0006098330002278089,
        metricName: 'nodejs_gc_duration_seconds_sum',
        labels: {
          kind: 'minor',
          serviceId: 'fastify2'
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_count',
        labels: {
          kind: 'minor',
          serviceId: 'fastify2'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'The event loop utilization as a fraction of the loop time. 1 is fully utilized, 0 is fully idle.',
    name: 'nodejs_eventloop_utilization',
    type: 'gauge',
    values: [
      {
        value: 0.01589029779397555,
        labels: {
          serviceId: 'fastify2'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'The process CPU percent usage.',
    name: 'process_cpu_percent_usage',
    type: 'gauge',
    values: [
      {
        value: 53.54,
        labels: {
          serviceId: 'fastify2'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total user CPU time spent in seconds for the current thread.',
    name: 'thread_cpu_user_system_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.033231000000000004,
        labels: {
          serviceId: 'fastify2'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total system CPU time spent in seconds for the current thread.',
    name: 'thread_cpu_system_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.013029,
        labels: {
          serviceId: 'fastify2'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'The thread CPU percent usage.',
    name: 'thread_cpu_percent_usage',
    type: 'gauge',
    values: [
      {
        value: 0.22112781128049053,
        labels: {
          serviceId: 'fastify2'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total user and system CPU time spent in seconds for the current threads.',
    name: 'thread_cpu_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.04626,
        labels: {
          serviceId: 'fastify2'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    name: 'http_request_summary_seconds',
    help: 'request duration in seconds summary for all requests',
    type: 'summary',
    values: [],
    aggregator: 'sum'
  },
  {
    name: 'http_request_duration_seconds',
    help: 'request duration in seconds histogram for all requests',
    type: 'histogram',
    values: [],
    aggregator: 'sum'
  },
  {
    name: 'http_request_all_summary_seconds',
    help: 'request duration in seconds histogram for all requests',
    type: 'summary',
    values: [],
    aggregator: 'sum'
  },
  {
    name: 'http_request_all_duration_seconds',
    help: 'request duration in seconds summary for all requests',
    type: 'histogram',
    values: [],
    aggregator: 'sum'
  },
  {
    help: 'Number of http cache hits',
    name: 'http_cache_hit_count',
    type: 'counter',
    values: [
      {
        value: 0,
        labels: {
          serviceId: 'fastify2'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Number of http cache misses',
    name: 'http_cache_miss_count',
    type: 'counter',
    values: [
      {
        value: 0,
        labels: {
          serviceId: 'fastify2'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total user CPU time spent in seconds.',
    name: 'process_cpu_user_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.923535,
        labels: {
          serviceId: 'fastify2',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total system CPU time spent in seconds.',
    name: 'process_cpu_system_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.225285,
        labels: {
          serviceId: 'fastify2',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total user and system CPU time spent in seconds.',
    name: 'process_cpu_seconds_total',
    type: 'counter',
    values: [
      {
        value: 1.1488200000000002,
        labels: {
          serviceId: 'fastify2',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Start time of the process since unix epoch in seconds.',
    name: 'process_start_time_seconds',
    type: 'gauge',
    values: [
      {
        value: 1743244689,
        labels: {
          serviceId: 'fastify2',
          workerId: 1
        }
      }
    ],
    aggregator: 'omit'
  },
  {
    help: 'Resident memory size in bytes.',
    name: 'process_resident_memory_bytes',
    type: 'gauge',
    values: [
      {
        value: 544079872,
        labels: {
          serviceId: 'fastify2',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Lag of event loop in seconds.',
    name: 'nodejs_eventloop_lag_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.000604167,
        labels: {
          serviceId: 'fastify2',
          workerId: 1
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'The minimum recorded event loop delay.',
    name: 'nodejs_eventloop_lag_min_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.010330112,
        labels: {
          serviceId: 'fastify2',
          workerId: 1
        }
      }
    ],
    aggregator: 'min'
  },
  {
    help: 'The maximum recorded event loop delay.',
    name: 'nodejs_eventloop_lag_max_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.012337151,
        labels: {
          serviceId: 'fastify2',
          workerId: 1
        }
      }
    ],
    aggregator: 'max'
  },
  {
    help: 'The mean of the recorded event loop delays.',
    name: 'nodejs_eventloop_lag_mean_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.010960896,
        labels: {
          serviceId: 'fastify2',
          workerId: 1
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'The standard deviation of the recorded event loop delays.',
    name: 'nodejs_eventloop_lag_stddev_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.00043276882477632985,
        labels: {
          serviceId: 'fastify2',
          workerId: 1
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'The 50th percentile of the recorded event loop delays.',
    name: 'nodejs_eventloop_lag_p50_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.010960895,
        labels: {
          serviceId: 'fastify2',
          workerId: 1
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'The 90th percentile of the recorded event loop delays.',
    name: 'nodejs_eventloop_lag_p90_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.011067391,
        labels: {
          serviceId: 'fastify2',
          workerId: 1
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'The 99th percentile of the recorded event loop delays.',
    name: 'nodejs_eventloop_lag_p99_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.012337151,
        labels: {
          serviceId: 'fastify2',
          workerId: 1
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'Number of active resources that are currently keeping the event loop alive, grouped by async resource type.',
    name: 'nodejs_active_resources',
    type: 'gauge',
    values: [
      {
        value: 11,
        labels: {
          type: 'MessagePort',
          serviceId: 'fastify2',
          workerId: 1
        }
      },
      {
        value: 2,
        labels: {
          type: 'TCPServerWrap',
          serviceId: 'fastify2',
          workerId: 1
        }
      },
      {
        value: 1,
        labels: {
          type: 'Immediate',
          serviceId: 'fastify2',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total number of active resources.',
    name: 'nodejs_active_resources_total',
    type: 'gauge',
    values: [
      {
        value: 14,
        labels: {
          serviceId: 'fastify2',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Number of active libuv handles grouped by handle type. Every handle type is C++ class name.',
    name: 'nodejs_active_handles',
    type: 'gauge',
    values: [
      {
        value: 11,
        labels: {
          type: 'MessagePort',
          serviceId: 'fastify2',
          workerId: 1
        }
      },
      {
        value: 2,
        labels: {
          type: 'Server',
          serviceId: 'fastify2',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total number of active handles.',
    name: 'nodejs_active_handles_total',
    type: 'gauge',
    values: [
      {
        value: 13,
        labels: {
          serviceId: 'fastify2',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Number of active libuv requests grouped by request type. Every request type is C++ class name.',
    name: 'nodejs_active_requests',
    type: 'gauge',
    values: [],
    aggregator: 'sum'
  },
  {
    help: 'Total number of active requests.',
    name: 'nodejs_active_requests_total',
    type: 'gauge',
    values: [
      {
        value: 0,
        labels: {
          serviceId: 'fastify2',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Process heap size from Node.js in bytes.',
    name: 'nodejs_heap_size_total_bytes',
    type: 'gauge',
    values: [
      {
        value: 79331328,
        labels: {
          serviceId: 'fastify2',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Process heap size used from Node.js in bytes.',
    name: 'nodejs_heap_size_used_bytes',
    type: 'gauge',
    values: [
      {
        value: 53868048,
        labels: {
          serviceId: 'fastify2',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Node.js external memory size in bytes.',
    name: 'nodejs_external_memory_bytes',
    type: 'gauge',
    values: [
      {
        value: 5442277,
        labels: {
          serviceId: 'fastify2',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Process heap space size total from Node.js in bytes.',
    name: 'nodejs_heap_space_size_total_bytes',
    type: 'gauge',
    values: [
      {
        value: 0,
        labels: {
          space: 'read_only',
          serviceId: 'fastify2',
          workerId: 1
        }
      },
      {
        value: 33554432,
        labels: {
          space: 'new',
          serviceId: 'fastify2',
          workerId: 1
        }
      },
      {
        value: 35356672,
        labels: {
          space: 'old',
          serviceId: 'fastify2',
          workerId: 1
        }
      },
      {
        value: 2621440,
        labels: {
          space: 'code',
          serviceId: 'fastify2',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared',
          serviceId: 'fastify2',
          workerId: 1
        }
      },
      {
        value: 4521984,
        labels: {
          space: 'trusted',
          serviceId: 'fastify2',
          workerId: 1
        }
      },
      {
        value: 180224,
        labels: {
          space: 'new_large_object',
          serviceId: 'fastify2',
          workerId: 1
        }
      },
      {
        value: 2883584,
        labels: {
          space: 'large_object',
          serviceId: 'fastify2',
          workerId: 1
        }
      },
      {
        value: 212992,
        labels: {
          space: 'code_large_object',
          serviceId: 'fastify2',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared_large_object',
          serviceId: 'fastify2',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'trusted_large_object',
          serviceId: 'fastify2',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Process heap space size used from Node.js in bytes.',
    name: 'nodejs_heap_space_size_used_bytes',
    type: 'gauge',
    values: [
      {
        value: 0,
        labels: {
          space: 'read_only',
          serviceId: 'fastify2',
          workerId: 1
        }
      },
      {
        value: 10600112,
        labels: {
          space: 'new',
          serviceId: 'fastify2',
          workerId: 1
        }
      },
      {
        value: 34096944,
        labels: {
          space: 'old',
          serviceId: 'fastify2',
          workerId: 1
        }
      },
      {
        value: 1926144,
        labels: {
          space: 'code',
          serviceId: 'fastify2',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared',
          serviceId: 'fastify2',
          workerId: 1
        }
      },
      {
        value: 4210248,
        labels: {
          space: 'trusted',
          serviceId: 'fastify2',
          workerId: 1
        }
      },
      {
        value: 162584,
        labels: {
          space: 'new_large_object',
          serviceId: 'fastify2',
          workerId: 1
        }
      },
      {
        value: 2718848,
        labels: {
          space: 'large_object',
          serviceId: 'fastify2',
          workerId: 1
        }
      },
      {
        value: 155328,
        labels: {
          space: 'code_large_object',
          serviceId: 'fastify2',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared_large_object',
          serviceId: 'fastify2',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'trusted_large_object',
          serviceId: 'fastify2',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Process heap space size available from Node.js in bytes.',
    name: 'nodejs_heap_space_size_available_bytes',
    type: 'gauge',
    values: [
      {
        value: 0,
        labels: {
          space: 'read_only',
          serviceId: 'fastify2',
          workerId: 1
        }
      },
      {
        value: 5894480,
        labels: {
          space: 'new',
          serviceId: 'fastify2',
          workerId: 1
        }
      },
      {
        value: 621984,
        labels: {
          space: 'old',
          serviceId: 'fastify2',
          workerId: 1
        }
      },
      {
        value: 203776,
        labels: {
          space: 'code',
          serviceId: 'fastify2',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared',
          serviceId: 'fastify2',
          workerId: 1
        }
      },
      {
        value: 231984,
        labels: {
          space: 'trusted',
          serviceId: 'fastify2',
          workerId: 1
        }
      },
      {
        value: 16614632,
        labels: {
          space: 'new_large_object',
          serviceId: 'fastify2',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'large_object',
          serviceId: 'fastify2',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'code_large_object',
          serviceId: 'fastify2',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared_large_object',
          serviceId: 'fastify2',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'trusted_large_object',
          serviceId: 'fastify2',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Node.js version info.',
    name: 'nodejs_version_info',
    type: 'gauge',
    values: [
      {
        value: 1,
        labels: {
          version: 'v22.12.0',
          major: 22,
          minor: 12,
          patch: 0,
          serviceId: 'fastify2',
          workerId: 1
        }
      }
    ],
    aggregator: 'first'
  },
  {
    name: 'nodejs_gc_duration_seconds',
    help: 'Garbage collection duration by kind, one of major, minor, incremental or weakcb.',
    type: 'histogram',
    values: [],
    aggregator: 'sum'
  },
  {
    help: 'The event loop utilization as a fraction of the loop time. 1 is fully utilized, 0 is fully idle.',
    name: 'nodejs_eventloop_utilization',
    type: 'gauge',
    values: [
      {
        value: 0.010346294095894928,
        labels: {
          serviceId: 'fastify2',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'The process CPU percent usage.',
    name: 'process_cpu_percent_usage',
    type: 'gauge',
    values: [
      {
        value: 53.91,
        labels: {
          serviceId: 'fastify2',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total user CPU time spent in seconds for the current thread.',
    name: 'thread_cpu_user_system_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.014038000000000002,
        labels: {
          serviceId: 'fastify2',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total system CPU time spent in seconds for the current thread.',
    name: 'thread_cpu_system_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.007868,
        labels: {
          serviceId: 'fastify2',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'The thread CPU percent usage.',
    name: 'thread_cpu_percent_usage',
    type: 'gauge',
    values: [
      {
        value: 0.2670280767421637,
        labels: {
          serviceId: 'fastify2',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total user and system CPU time spent in seconds for the current threads.',
    name: 'thread_cpu_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.021906000000000002,
        labels: {
          serviceId: 'fastify2',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    name: 'http_request_summary_seconds',
    help: 'request duration in seconds summary for all requests',
    type: 'summary',
    values: [],
    aggregator: 'sum'
  },
  {
    name: 'http_request_duration_seconds',
    help: 'request duration in seconds histogram for all requests',
    type: 'histogram',
    values: [],
    aggregator: 'sum'
  },
  {
    name: 'http_request_all_summary_seconds',
    help: 'request duration in seconds histogram for all requests',
    type: 'summary',
    values: [],
    aggregator: 'sum'
  },
  {
    name: 'http_request_all_duration_seconds',
    help: 'request duration in seconds summary for all requests',
    type: 'histogram',
    values: [],
    aggregator: 'sum'
  },
  {
    help: 'Number of http cache hits',
    name: 'http_cache_hit_count',
    type: 'counter',
    values: [
      {
        value: 0,
        labels: {
          serviceId: 'fastify2',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Number of http cache misses',
    name: 'http_cache_miss_count',
    type: 'counter',
    values: [
      {
        value: 0,
        labels: {
          serviceId: 'fastify2',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total user CPU time spent in seconds.',
    name: 'process_cpu_user_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.870777,
        labels: {
          serviceId: 'fastify3',
          workerId: 0
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total system CPU time spent in seconds.',
    name: 'process_cpu_system_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.209774,
        labels: {
          serviceId: 'fastify3',
          workerId: 0
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total user and system CPU time spent in seconds.',
    name: 'process_cpu_seconds_total',
    type: 'counter',
    values: [
      {
        value: 1.0805509999999998,
        labels: {
          serviceId: 'fastify3',
          workerId: 0
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Start time of the process since unix epoch in seconds.',
    name: 'process_start_time_seconds',
    type: 'gauge',
    values: [
      {
        value: 1743244689,
        labels: {
          serviceId: 'fastify3',
          workerId: 0
        }
      }
    ],
    aggregator: 'omit'
  },
  {
    help: 'Resident memory size in bytes.',
    name: 'process_resident_memory_bytes',
    type: 'gauge',
    values: [
      {
        value: 544178176,
        labels: {
          serviceId: 'fastify3',
          workerId: 0
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Lag of event loop in seconds.',
    name: 'nodejs_eventloop_lag_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.00068525,
        labels: {
          serviceId: 'fastify3',
          workerId: 0
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'The minimum recorded event loop delay.',
    name: 'nodejs_eventloop_lag_min_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.010272768,
        labels: {
          serviceId: 'fastify3',
          workerId: 0
        }
      }
    ],
    aggregator: 'min'
  },
  {
    help: 'The maximum recorded event loop delay.',
    name: 'nodejs_eventloop_lag_max_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.011673599,
        labels: {
          serviceId: 'fastify3',
          workerId: 0
        }
      }
    ],
    aggregator: 'max'
  },
  {
    help: 'The mean of the recorded event loop delays.',
    name: 'nodejs_eventloop_lag_mean_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.010939245714285714,
        labels: {
          serviceId: 'fastify3',
          workerId: 0
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'The standard deviation of the recorded event loop delays.',
    name: 'nodejs_eventloop_lag_stddev_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.00035979387027483794,
        labels: {
          serviceId: 'fastify3',
          workerId: 0
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'The 50th percentile of the recorded event loop delays.',
    name: 'nodejs_eventloop_lag_p50_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.010960895,
        labels: {
          serviceId: 'fastify3',
          workerId: 0
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'The 90th percentile of the recorded event loop delays.',
    name: 'nodejs_eventloop_lag_p90_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.011591679,
        labels: {
          serviceId: 'fastify3',
          workerId: 0
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'The 99th percentile of the recorded event loop delays.',
    name: 'nodejs_eventloop_lag_p99_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.011673599,
        labels: {
          serviceId: 'fastify3',
          workerId: 0
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'Number of active resources that are currently keeping the event loop alive, grouped by async resource type.',
    name: 'nodejs_active_resources',
    type: 'gauge',
    values: [
      {
        value: 11,
        labels: {
          type: 'MessagePort',
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 1,
        labels: {
          type: 'Immediate',
          serviceId: 'fastify3',
          workerId: 0
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total number of active resources.',
    name: 'nodejs_active_resources_total',
    type: 'gauge',
    values: [
      {
        value: 12,
        labels: {
          serviceId: 'fastify3',
          workerId: 0
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Number of active libuv handles grouped by handle type. Every handle type is C++ class name.',
    name: 'nodejs_active_handles',
    type: 'gauge',
    values: [
      {
        value: 11,
        labels: {
          type: 'MessagePort',
          serviceId: 'fastify3',
          workerId: 0
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total number of active handles.',
    name: 'nodejs_active_handles_total',
    type: 'gauge',
    values: [
      {
        value: 11,
        labels: {
          serviceId: 'fastify3',
          workerId: 0
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Number of active libuv requests grouped by request type. Every request type is C++ class name.',
    name: 'nodejs_active_requests',
    type: 'gauge',
    values: [],
    aggregator: 'sum'
  },
  {
    help: 'Total number of active requests.',
    name: 'nodejs_active_requests_total',
    type: 'gauge',
    values: [
      {
        value: 0,
        labels: {
          serviceId: 'fastify3',
          workerId: 0
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Process heap size from Node.js in bytes.',
    name: 'nodejs_heap_size_total_bytes',
    type: 'gauge',
    values: [
      {
        value: 94470144,
        labels: {
          serviceId: 'fastify3',
          workerId: 0
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Process heap size used from Node.js in bytes.',
    name: 'nodejs_heap_size_used_bytes',
    type: 'gauge',
    values: [
      {
        value: 44846648,
        labels: {
          serviceId: 'fastify3',
          workerId: 0
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Node.js external memory size in bytes.',
    name: 'nodejs_external_memory_bytes',
    type: 'gauge',
    values: [
      {
        value: 4857986,
        labels: {
          serviceId: 'fastify3',
          workerId: 0
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Process heap space size total from Node.js in bytes.',
    name: 'nodejs_heap_space_size_total_bytes',
    type: 'gauge',
    values: [
      {
        value: 0,
        labels: {
          space: 'read_only',
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 33554432,
        labels: {
          space: 'new',
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 46104576,
        labels: {
          space: 'old',
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 2359296,
        labels: {
          space: 'code',
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared',
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 4521984,
        labels: {
          space: 'trusted',
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 0,
        labels: {
          space: 'new_large_object',
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 7929856,
        labels: {
          space: 'large_object',
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 0,
        labels: {
          space: 'code_large_object',
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared_large_object',
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 0,
        labels: {
          space: 'trusted_large_object',
          serviceId: 'fastify3',
          workerId: 0
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Process heap space size used from Node.js in bytes.',
    name: 'nodejs_heap_space_size_used_bytes',
    type: 'gauge',
    values: [
      {
        value: 0,
        labels: {
          space: 'read_only',
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 3013008,
        labels: {
          space: 'new',
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 28250768,
        labels: {
          space: 'old',
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 1838336,
        labels: {
          space: 'code',
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared',
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 3950472,
        labels: {
          space: 'trusted',
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 0,
        labels: {
          space: 'new_large_object',
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 7796224,
        labels: {
          space: 'large_object',
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 0,
        labels: {
          space: 'code_large_object',
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared_large_object',
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 0,
        labels: {
          space: 'trusted_large_object',
          serviceId: 'fastify3',
          workerId: 0
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Process heap space size available from Node.js in bytes.',
    name: 'nodejs_heap_space_size_available_bytes',
    type: 'gauge',
    values: [
      {
        value: 0,
        labels: {
          space: 'read_only',
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 13481584,
        labels: {
          space: 'new',
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 125352,
        labels: {
          space: 'old',
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 78592,
        labels: {
          space: 'code',
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared',
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 491912,
        labels: {
          space: 'trusted',
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 16777216,
        labels: {
          space: 'new_large_object',
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 0,
        labels: {
          space: 'large_object',
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 0,
        labels: {
          space: 'code_large_object',
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared_large_object',
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 0,
        labels: {
          space: 'trusted_large_object',
          serviceId: 'fastify3',
          workerId: 0
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Node.js version info.',
    name: 'nodejs_version_info',
    type: 'gauge',
    values: [
      {
        value: 1,
        labels: {
          version: 'v22.12.0',
          major: 22,
          minor: 12,
          patch: 0,
          serviceId: 'fastify3',
          workerId: 0
        }
      }
    ],
    aggregator: 'first'
  },
  {
    name: 'nodejs_gc_duration_seconds',
    help: 'Garbage collection duration by kind, one of major, minor, incremental or weakcb.',
    type: 'histogram',
    values: [
      {
        value: 0,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.001,
          kind: 'minor',
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.01,
          kind: 'minor',
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.1,
          kind: 'minor',
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 1,
          kind: 'minor',
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 2,
          kind: 'minor',
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 5,
          kind: 'minor',
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: '+Inf',
          kind: 'minor',
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 0.0017345420001074671,
        metricName: 'nodejs_gc_duration_seconds_sum',
        labels: {
          kind: 'minor',
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_count',
        labels: {
          kind: 'minor',
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 0,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.001,
          kind: 'major',
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.01,
          kind: 'major',
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.1,
          kind: 'major',
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 1,
          kind: 'major',
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 2,
          kind: 'major',
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 5,
          kind: 'major',
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: '+Inf',
          kind: 'major',
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 0.002879790999926627,
        metricName: 'nodejs_gc_duration_seconds_sum',
        labels: {
          kind: 'major',
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_count',
        labels: {
          kind: 'major',
          serviceId: 'fastify3',
          workerId: 0
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'The event loop utilization as a fraction of the loop time. 1 is fully utilized, 0 is fully idle.',
    name: 'nodejs_eventloop_utilization',
    type: 'gauge',
    values: [
      {
        value: 0.02373277137572059,
        labels: {
          serviceId: 'fastify3',
          workerId: 0
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'The process CPU percent usage.',
    name: 'process_cpu_percent_usage',
    type: 'gauge',
    values: [
      {
        value: 54.62,
        labels: {
          serviceId: 'fastify3',
          workerId: 0
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total user CPU time spent in seconds for the current thread.',
    name: 'thread_cpu_user_system_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.03345,
        labels: {
          serviceId: 'fastify3',
          workerId: 0
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total system CPU time spent in seconds for the current thread.',
    name: 'thread_cpu_system_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.008731999999999998,
        labels: {
          serviceId: 'fastify3',
          workerId: 0
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'The thread CPU percent usage.',
    name: 'thread_cpu_percent_usage',
    type: 'gauge',
    values: [
      {
        value: 0.20068110236622552,
        labels: {
          serviceId: 'fastify3',
          workerId: 0
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total user and system CPU time spent in seconds for the current threads.',
    name: 'thread_cpu_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.04218199999999999,
        labels: {
          serviceId: 'fastify3',
          workerId: 0
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Number of http cache hits',
    name: 'http_cache_hit_count',
    type: 'counter',
    values: [
      {
        value: 0,
        labels: {
          serviceId: 'fastify3',
          workerId: 0
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Number of http cache misses',
    name: 'http_cache_miss_count',
    type: 'counter',
    values: [
      {
        value: 0,
        labels: {
          serviceId: 'fastify3',
          workerId: 0
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    name: 'http_request_summary_seconds',
    help: 'request duration in seconds summary',
    type: 'summary',
    values: [
      {
        labels: {
          quantile: 0.01,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 0
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.05,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 0
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.5,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 0
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.9,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 0
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.95,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 0
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.99,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 0
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.999,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 0
        },
        value: 0
      },
      {
        metricName: 'http_request_summary_seconds_sum',
        labels: {
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 0
        },
        value: 0
      },
      {
        metricName: 'http_request_summary_seconds_count',
        labels: {
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 0
        },
        value: 1
      }
    ],
    aggregator: 'sum'
  },
  {
    name: 'http_request_duration_seconds',
    help: 'request duration in seconds',
    type: 'histogram',
    values: [
      {
        value: 0,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.005,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 0,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.01,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 0,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.025,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 0,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.05,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 0,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.1,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 0,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.25,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 0,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.5,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 0,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 1,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 0,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 2.5,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 0,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 5,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 0,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 10,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 0,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: '+Inf',
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 0,
        metricName: 'http_request_duration_seconds_sum',
        labels: {
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 0
        }
      },
      {
        value: 0,
        metricName: 'http_request_duration_seconds_count',
        labels: {
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 0
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    name: 'http_request_all_summary_seconds',
    help: 'request duration in seconds histogram for all requests',
    type: 'summary',
    values: [
      {
        labels: {
          quantile: 0.01,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 0
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.05,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 0
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.5,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 0
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.9,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 0
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.95,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 0
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.99,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 0
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.999,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 0
        },
        value: 0
      },
      {
        metricName: 'http_request_all_summary_seconds_sum',
        labels: {
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 0
        },
        value: 0
      },
      {
        metricName: 'http_request_all_summary_seconds_count',
        labels: {
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 0
        },
        value: 0
      }
    ],
    aggregator: 'sum'
  },
  {
    name: 'http_request_all_duration_seconds',
    help: 'request duration in seconds summary for all requests',
    type: 'histogram',
    values: [],
    aggregator: 'sum'
  },
  {
    help: 'Total user CPU time spent in seconds.',
    name: 'process_cpu_user_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.766574,
        labels: {
          serviceId: 'fastify3',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total system CPU time spent in seconds.',
    name: 'process_cpu_system_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.19189,
        labels: {
          serviceId: 'fastify3',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total user and system CPU time spent in seconds.',
    name: 'process_cpu_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.958464,
        labels: {
          serviceId: 'fastify3',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Start time of the process since unix epoch in seconds.',
    name: 'process_start_time_seconds',
    type: 'gauge',
    values: [
      {
        value: 1743244689,
        labels: {
          serviceId: 'fastify3',
          workerId: 1
        }
      }
    ],
    aggregator: 'omit'
  },
  {
    help: 'Resident memory size in bytes.',
    name: 'process_resident_memory_bytes',
    type: 'gauge',
    values: [
      {
        value: 544374784,
        labels: {
          serviceId: 'fastify3',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Lag of event loop in seconds.',
    name: 'nodejs_eventloop_lag_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.000695459,
        labels: {
          serviceId: 'fastify3',
          workerId: 1
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'The minimum recorded event loop delay.',
    name: 'nodejs_eventloop_lag_min_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.010387456,
        labels: {
          serviceId: 'fastify3',
          workerId: 1
        }
      }
    ],
    aggregator: 'min'
  },
  {
    help: 'The maximum recorded event loop delay.',
    name: 'nodejs_eventloop_lag_max_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.011681791,
        labels: {
          serviceId: 'fastify3',
          workerId: 1
        }
      }
    ],
    aggregator: 'max'
  },
  {
    help: 'The mean of the recorded event loop delays.',
    name: 'nodejs_eventloop_lag_mean_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.010960896,
        labels: {
          serviceId: 'fastify3',
          workerId: 1
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'The standard deviation of the recorded event loop delays.',
    name: 'nodejs_eventloop_lag_stddev_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.0003398833905041131,
        labels: {
          serviceId: 'fastify3',
          workerId: 1
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'The 50th percentile of the recorded event loop delays.',
    name: 'nodejs_eventloop_lag_p50_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.010977279,
        labels: {
          serviceId: 'fastify3',
          workerId: 1
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'The 90th percentile of the recorded event loop delays.',
    name: 'nodejs_eventloop_lag_p90_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.011624447,
        labels: {
          serviceId: 'fastify3',
          workerId: 1
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'The 99th percentile of the recorded event loop delays.',
    name: 'nodejs_eventloop_lag_p99_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.011681791,
        labels: {
          serviceId: 'fastify3',
          workerId: 1
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'Number of active resources that are currently keeping the event loop alive, grouped by async resource type.',
    name: 'nodejs_active_resources',
    type: 'gauge',
    values: [
      {
        value: 11,
        labels: {
          type: 'MessagePort',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 1,
        labels: {
          type: 'Immediate',
          serviceId: 'fastify3',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total number of active resources.',
    name: 'nodejs_active_resources_total',
    type: 'gauge',
    values: [
      {
        value: 12,
        labels: {
          serviceId: 'fastify3',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Number of active libuv handles grouped by handle type. Every handle type is C++ class name.',
    name: 'nodejs_active_handles',
    type: 'gauge',
    values: [
      {
        value: 11,
        labels: {
          type: 'MessagePort',
          serviceId: 'fastify3',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total number of active handles.',
    name: 'nodejs_active_handles_total',
    type: 'gauge',
    values: [
      {
        value: 11,
        labels: {
          serviceId: 'fastify3',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Number of active libuv requests grouped by request type. Every request type is C++ class name.',
    name: 'nodejs_active_requests',
    type: 'gauge',
    values: [],
    aggregator: 'sum'
  },
  {
    help: 'Total number of active requests.',
    name: 'nodejs_active_requests_total',
    type: 'gauge',
    values: [
      {
        value: 0,
        labels: {
          serviceId: 'fastify3',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Process heap size from Node.js in bytes.',
    name: 'nodejs_heap_size_total_bytes',
    type: 'gauge',
    values: [
      {
        value: 96829440,
        labels: {
          serviceId: 'fastify3',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Process heap size used from Node.js in bytes.',
    name: 'nodejs_heap_size_used_bytes',
    type: 'gauge',
    values: [
      {
        value: 45000072,
        labels: {
          serviceId: 'fastify3',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Node.js external memory size in bytes.',
    name: 'nodejs_external_memory_bytes',
    type: 'gauge',
    values: [
      {
        value: 4857986,
        labels: {
          serviceId: 'fastify3',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Process heap space size total from Node.js in bytes.',
    name: 'nodejs_heap_space_size_total_bytes',
    type: 'gauge',
    values: [
      {
        value: 0,
        labels: {
          space: 'read_only',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 33554432,
        labels: {
          space: 'new',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 48463872,
        labels: {
          space: 'old',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 2359296,
        labels: {
          space: 'code',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 4521984,
        labels: {
          space: 'trusted',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'new_large_object',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 7929856,
        labels: {
          space: 'large_object',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'code_large_object',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared_large_object',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'trusted_large_object',
          serviceId: 'fastify3',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Process heap space size used from Node.js in bytes.',
    name: 'nodejs_heap_space_size_used_bytes',
    type: 'gauge',
    values: [
      {
        value: 0,
        labels: {
          space: 'read_only',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 3182072,
        labels: {
          space: 'new',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 28236296,
        labels: {
          space: 'old',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 1838368,
        labels: {
          space: 'code',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 3949272,
        labels: {
          space: 'trusted',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'new_large_object',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 7796224,
        labels: {
          space: 'large_object',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'code_large_object',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared_large_object',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'trusted_large_object',
          serviceId: 'fastify3',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Process heap space size available from Node.js in bytes.',
    name: 'nodejs_heap_space_size_available_bytes',
    type: 'gauge',
    values: [
      {
        value: 0,
        labels: {
          space: 'read_only',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 13312520,
        labels: {
          space: 'new',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 404160,
        labels: {
          space: 'old',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 78560,
        labels: {
          space: 'code',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 493040,
        labels: {
          space: 'trusted',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 16777216,
        labels: {
          space: 'new_large_object',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'large_object',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'code_large_object',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared_large_object',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'trusted_large_object',
          serviceId: 'fastify3',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Node.js version info.',
    name: 'nodejs_version_info',
    type: 'gauge',
    values: [
      {
        value: 1,
        labels: {
          version: 'v22.12.0',
          major: 22,
          minor: 12,
          patch: 0,
          serviceId: 'fastify3',
          workerId: 1
        }
      }
    ],
    aggregator: 'first'
  },
  {
    name: 'nodejs_gc_duration_seconds',
    help: 'Garbage collection duration by kind, one of major, minor, incremental or weakcb.',
    type: 'histogram',
    values: [
      {
        value: 0,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.001,
          kind: 'minor',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.01,
          kind: 'minor',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.1,
          kind: 'minor',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 1,
          kind: 'minor',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 2,
          kind: 'minor',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 5,
          kind: 'minor',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: '+Inf',
          kind: 'minor',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 0.001670292000286281,
        metricName: 'nodejs_gc_duration_seconds_sum',
        labels: {
          kind: 'minor',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_count',
        labels: {
          kind: 'minor',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.001,
          kind: 'incremental',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.01,
          kind: 'incremental',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.1,
          kind: 'incremental',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 1,
          kind: 'incremental',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 2,
          kind: 'incremental',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 5,
          kind: 'incremental',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: '+Inf',
          kind: 'incremental',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 0.00019883299991488456,
        metricName: 'nodejs_gc_duration_seconds_sum',
        labels: {
          kind: 'incremental',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_count',
        labels: {
          kind: 'incremental',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 0,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.001,
          kind: 'major',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.01,
          kind: 'major',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.1,
          kind: 'major',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 1,
          kind: 'major',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 2,
          kind: 'major',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 5,
          kind: 'major',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: '+Inf',
          kind: 'major',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 0.0023610000000335277,
        metricName: 'nodejs_gc_duration_seconds_sum',
        labels: {
          kind: 'major',
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_count',
        labels: {
          kind: 'major',
          serviceId: 'fastify3',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'The event loop utilization as a fraction of the loop time. 1 is fully utilized, 0 is fully idle.',
    name: 'nodejs_eventloop_utilization',
    type: 'gauge',
    values: [
      {
        value: 0.022610670119415338,
        labels: {
          serviceId: 'fastify3',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'The process CPU percent usage.',
    name: 'process_cpu_percent_usage',
    type: 'gauge',
    values: [
      {
        value: 55.22,
        labels: {
          serviceId: 'fastify3',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total user CPU time spent in seconds for the current thread.',
    name: 'thread_cpu_user_system_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.032486,
        labels: {
          serviceId: 'fastify3',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total system CPU time spent in seconds for the current thread.',
    name: 'thread_cpu_system_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.008194,
        labels: {
          serviceId: 'fastify3',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'The thread CPU percent usage.',
    name: 'thread_cpu_percent_usage',
    type: 'gauge',
    values: [
      {
        value: 0.2414677210914478,
        labels: {
          serviceId: 'fastify3',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total user and system CPU time spent in seconds for the current threads.',
    name: 'thread_cpu_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.040679999999999994,
        labels: {
          serviceId: 'fastify3',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Number of http cache hits',
    name: 'http_cache_hit_count',
    type: 'counter',
    values: [
      {
        value: 0,
        labels: {
          serviceId: 'fastify3',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Number of http cache misses',
    name: 'http_cache_miss_count',
    type: 'counter',
    values: [
      {
        value: 0,
        labels: {
          serviceId: 'fastify3',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    name: 'http_request_summary_seconds',
    help: 'request duration in seconds summary',
    type: 'summary',
    values: [
      {
        labels: {
          quantile: 0.01,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 1
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.05,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 1
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.5,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 1
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.9,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 1
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.95,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 1
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.99,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 1
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.999,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 1
        },
        value: 0
      },
      {
        metricName: 'http_request_summary_seconds_sum',
        labels: {
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 1
        },
        value: 0
      },
      {
        metricName: 'http_request_summary_seconds_count',
        labels: {
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 1
        },
        value: 1
      }
    ],
    aggregator: 'sum'
  },
  {
    name: 'http_request_duration_seconds',
    help: 'request duration in seconds',
    type: 'histogram',
    values: [
      {
        value: 0,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.005,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 0,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.01,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 0,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.025,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 0,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.05,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 0,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.1,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 0,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.25,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 0,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.5,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 0,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 1,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 0,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 2.5,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 0,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 5,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 0,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 10,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 0,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: '+Inf',
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 0,
        metricName: 'http_request_duration_seconds_sum',
        labels: {
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 1
        }
      },
      {
        value: 0,
        metricName: 'http_request_duration_seconds_count',
        labels: {
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    name: 'http_request_all_summary_seconds',
    help: 'request duration in seconds histogram for all requests',
    type: 'summary',
    values: [
      {
        labels: {
          quantile: 0.01,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 1
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.05,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 1
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.5,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 1
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.9,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 1
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.95,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 1
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.99,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 1
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.999,
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 1
        },
        value: 0
      },
      {
        metricName: 'http_request_all_summary_seconds_sum',
        labels: {
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 1
        },
        value: 0
      },
      {
        metricName: 'http_request_all_summary_seconds_count',
        labels: {
          method: 'GET',
          route: '/__empty_metrics',
          status_code: 404,
          serviceId: 'fastify3',
          workerId: 1
        },
        value: 0
      }
    ],
    aggregator: 'sum'
  },
  {
    name: 'http_request_all_duration_seconds',
    help: 'request duration in seconds summary for all requests',
    type: 'histogram',
    values: [],
    aggregator: 'sum'
  },
  {
    help: 'Total user CPU time spent in seconds.',
    name: 'process_cpu_user_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.748953,
        labels: {
          serviceId: 'node3'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total system CPU time spent in seconds.',
    name: 'process_cpu_system_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.189186,
        labels: {
          serviceId: 'node3'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total user and system CPU time spent in seconds.',
    name: 'process_cpu_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.938139,
        labels: {
          serviceId: 'node3'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Start time of the process since unix epoch in seconds.',
    name: 'process_start_time_seconds',
    type: 'gauge',
    values: [
      {
        value: 1743244689,
        labels: {
          serviceId: 'node3'
        }
      }
    ],
    aggregator: 'omit'
  },
  {
    help: 'Resident memory size in bytes.',
    name: 'process_resident_memory_bytes',
    type: 'gauge',
    values: [
      {
        value: 544620544,
        labels: {
          serviceId: 'node3'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Lag of event loop in seconds.',
    name: 'nodejs_eventloop_lag_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.000675416,
        labels: {
          serviceId: 'node3'
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'The minimum recorded event loop delay.',
    name: 'nodejs_eventloop_lag_min_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.010354688,
        labels: {
          serviceId: 'node3'
        }
      }
    ],
    aggregator: 'min'
  },
  {
    help: 'The maximum recorded event loop delay.',
    name: 'nodejs_eventloop_lag_max_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.012378111,
        labels: {
          serviceId: 'node3'
        }
      }
    ],
    aggregator: 'max'
  },
  {
    help: 'The mean of the recorded event loop delays.',
    name: 'nodejs_eventloop_lag_mean_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.010982546285714285,
        labels: {
          serviceId: 'node3'
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'The standard deviation of the recorded event loop delays.',
    name: 'nodejs_eventloop_lag_stddev_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.00043301362154942304,
        labels: {
          serviceId: 'node3'
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'The 50th percentile of the recorded event loop delays.',
    name: 'nodejs_eventloop_lag_p50_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.010895359,
        labels: {
          serviceId: 'node3'
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'The 90th percentile of the recorded event loop delays.',
    name: 'nodejs_eventloop_lag_p90_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.011190271,
        labels: {
          serviceId: 'node3'
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'The 99th percentile of the recorded event loop delays.',
    name: 'nodejs_eventloop_lag_p99_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.012378111,
        labels: {
          serviceId: 'node3'
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'Number of active resources that are currently keeping the event loop alive, grouped by async resource type.',
    name: 'nodejs_active_resources',
    type: 'gauge',
    values: [
      {
        value: 11,
        labels: {
          type: 'MessagePort',
          serviceId: 'node3'
        }
      },
      {
        value: 1,
        labels: {
          type: 'Immediate',
          serviceId: 'node3'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total number of active resources.',
    name: 'nodejs_active_resources_total',
    type: 'gauge',
    values: [
      {
        value: 12,
        labels: {
          serviceId: 'node3'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Number of active libuv handles grouped by handle type. Every handle type is C++ class name.',
    name: 'nodejs_active_handles',
    type: 'gauge',
    values: [
      {
        value: 11,
        labels: {
          type: 'MessagePort',
          serviceId: 'node3'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total number of active handles.',
    name: 'nodejs_active_handles_total',
    type: 'gauge',
    values: [
      {
        value: 11,
        labels: {
          serviceId: 'node3'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Number of active libuv requests grouped by request type. Every request type is C++ class name.',
    name: 'nodejs_active_requests',
    type: 'gauge',
    values: [],
    aggregator: 'sum'
  },
  {
    help: 'Total number of active requests.',
    name: 'nodejs_active_requests_total',
    type: 'gauge',
    values: [
      {
        value: 0,
        labels: {
          serviceId: 'node3'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Process heap size from Node.js in bytes.',
    name: 'nodejs_heap_size_total_bytes',
    type: 'gauge',
    values: [
      {
        value: 38567936,
        labels: {
          serviceId: 'node3'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Process heap size used from Node.js in bytes.',
    name: 'nodejs_heap_size_used_bytes',
    type: 'gauge',
    values: [
      {
        value: 34464152,
        labels: {
          serviceId: 'node3'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Node.js external memory size in bytes.',
    name: 'nodejs_external_memory_bytes',
    type: 'gauge',
    values: [
      {
        value: 5232342,
        labels: {
          serviceId: 'node3'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Process heap space size total from Node.js in bytes.',
    name: 'nodejs_heap_space_size_total_bytes',
    type: 'gauge',
    values: [
      {
        value: 0,
        labels: {
          space: 'read_only',
          serviceId: 'node3'
        }
      },
      {
        value: 1048576,
        labels: {
          space: 'new',
          serviceId: 'node3'
        }
      },
      {
        value: 28540928,
        labels: {
          space: 'old',
          serviceId: 'node3'
        }
      },
      {
        value: 2097152,
        labels: {
          space: 'code',
          serviceId: 'node3'
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared',
          serviceId: 'node3'
        }
      },
      {
        value: 3997696,
        labels: {
          space: 'trusted',
          serviceId: 'node3'
        }
      },
      {
        value: 0,
        labels: {
          space: 'new_large_object',
          serviceId: 'node3'
        }
      },
      {
        value: 2883584,
        labels: {
          space: 'large_object',
          serviceId: 'node3'
        }
      },
      {
        value: 0,
        labels: {
          space: 'code_large_object',
          serviceId: 'node3'
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared_large_object',
          serviceId: 'node3'
        }
      },
      {
        value: 0,
        labels: {
          space: 'trusted_large_object',
          serviceId: 'node3'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Process heap space size used from Node.js in bytes.',
    name: 'nodejs_heap_space_size_used_bytes',
    type: 'gauge',
    values: [
      {
        value: 0,
        labels: {
          space: 'read_only',
          serviceId: 'node3'
        }
      },
      {
        value: 197584,
        labels: {
          space: 'new',
          serviceId: 'node3'
        }
      },
      {
        value: 26252544,
        labels: {
          space: 'old',
          serviceId: 'node3'
        }
      },
      {
        value: 1617280,
        labels: {
          space: 'code',
          serviceId: 'node3'
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared',
          serviceId: 'node3'
        }
      },
      {
        value: 3680056,
        labels: {
          space: 'trusted',
          serviceId: 'node3'
        }
      },
      {
        value: 0,
        labels: {
          space: 'new_large_object',
          serviceId: 'node3'
        }
      },
      {
        value: 2718848,
        labels: {
          space: 'large_object',
          serviceId: 'node3'
        }
      },
      {
        value: 0,
        labels: {
          space: 'code_large_object',
          serviceId: 'node3'
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared_large_object',
          serviceId: 'node3'
        }
      },
      {
        value: 0,
        labels: {
          space: 'trusted_large_object',
          serviceId: 'node3'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Process heap space size available from Node.js in bytes.',
    name: 'nodejs_heap_space_size_available_bytes',
    type: 'gauge',
    values: [
      {
        value: 0,
        labels: {
          space: 'read_only',
          serviceId: 'node3'
        }
      },
      {
        value: 833328,
        labels: {
          space: 'new',
          serviceId: 'node3'
        }
      },
      {
        value: 977216,
        labels: {
          space: 'old',
          serviceId: 'node3'
        }
      },
      {
        value: 69216,
        labels: {
          space: 'code',
          serviceId: 'node3'
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared',
          serviceId: 'node3'
        }
      },
      {
        value: 246832,
        labels: {
          space: 'trusted',
          serviceId: 'node3'
        }
      },
      {
        value: 1048576,
        labels: {
          space: 'new_large_object',
          serviceId: 'node3'
        }
      },
      {
        value: 0,
        labels: {
          space: 'large_object',
          serviceId: 'node3'
        }
      },
      {
        value: 0,
        labels: {
          space: 'code_large_object',
          serviceId: 'node3'
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared_large_object',
          serviceId: 'node3'
        }
      },
      {
        value: 0,
        labels: {
          space: 'trusted_large_object',
          serviceId: 'node3'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Node.js version info.',
    name: 'nodejs_version_info',
    type: 'gauge',
    values: [
      {
        value: 1,
        labels: {
          version: 'v22.12.0',
          major: 22,
          minor: 12,
          patch: 0,
          serviceId: 'node3'
        }
      }
    ],
    aggregator: 'first'
  },
  {
    name: 'nodejs_gc_duration_seconds',
    help: 'Garbage collection duration by kind, one of major, minor, incremental or weakcb.',
    type: 'histogram',
    values: [
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.001,
          kind: 'incremental',
          serviceId: 'node3'
        }
      },
      {
        value: 2,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.01,
          kind: 'incremental',
          serviceId: 'node3'
        }
      },
      {
        value: 2,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.1,
          kind: 'incremental',
          serviceId: 'node3'
        }
      },
      {
        value: 2,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 1,
          kind: 'incremental',
          serviceId: 'node3'
        }
      },
      {
        value: 2,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 2,
          kind: 'incremental',
          serviceId: 'node3'
        }
      },
      {
        value: 2,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 5,
          kind: 'incremental',
          serviceId: 'node3'
        }
      },
      {
        value: 2,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: '+Inf',
          kind: 'incremental',
          serviceId: 'node3'
        }
      },
      {
        value: 0.0012351660006679594,
        metricName: 'nodejs_gc_duration_seconds_sum',
        labels: {
          kind: 'incremental',
          serviceId: 'node3'
        }
      },
      {
        value: 2,
        metricName: 'nodejs_gc_duration_seconds_count',
        labels: {
          kind: 'incremental',
          serviceId: 'node3'
        }
      },
      {
        value: 0,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.001,
          kind: 'major',
          serviceId: 'node3'
        }
      },
      {
        value: 2,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.01,
          kind: 'major',
          serviceId: 'node3'
        }
      },
      {
        value: 2,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.1,
          kind: 'major',
          serviceId: 'node3'
        }
      },
      {
        value: 2,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 1,
          kind: 'major',
          serviceId: 'node3'
        }
      },
      {
        value: 2,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 2,
          kind: 'major',
          serviceId: 'node3'
        }
      },
      {
        value: 2,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 5,
          kind: 'major',
          serviceId: 'node3'
        }
      },
      {
        value: 2,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: '+Inf',
          kind: 'major',
          serviceId: 'node3'
        }
      },
      {
        value: 0.009325541999656708,
        metricName: 'nodejs_gc_duration_seconds_sum',
        labels: {
          kind: 'major',
          serviceId: 'node3'
        }
      },
      {
        value: 2,
        metricName: 'nodejs_gc_duration_seconds_count',
        labels: {
          kind: 'major',
          serviceId: 'node3'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'The event loop utilization as a fraction of the loop time. 1 is fully utilized, 0 is fully idle.',
    name: 'nodejs_eventloop_utilization',
    type: 'gauge',
    values: [
      {
        value: 0.01057749224854425,
        labels: {
          serviceId: 'node3'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'The process CPU percent usage.',
    name: 'process_cpu_percent_usage',
    type: 'gauge',
    values: [
      {
        value: 55.22,
        labels: {
          serviceId: 'node3'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total user CPU time spent in seconds for the current thread.',
    name: 'thread_cpu_user_system_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.028707,
        labels: {
          serviceId: 'node3'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total system CPU time spent in seconds for the current thread.',
    name: 'thread_cpu_system_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.013470999999999999,
        labels: {
          serviceId: 'node3'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'The thread CPU percent usage.',
    name: 'thread_cpu_percent_usage',
    type: 'gauge',
    values: [
      {
        value: 1.3030084551353478,
        labels: {
          serviceId: 'node3'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total user and system CPU time spent in seconds for the current threads.',
    name: 'thread_cpu_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.04217800000000001,
        labels: {
          serviceId: 'node3'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    name: 'http_request_summary_seconds',
    help: 'request duration in seconds summary for all requests',
    type: 'summary',
    values: [],
    aggregator: 'sum'
  },
  {
    name: 'http_request_duration_seconds',
    help: 'request duration in seconds histogram for all requests',
    type: 'histogram',
    values: [],
    aggregator: 'sum'
  },
  {
    name: 'http_request_all_summary_seconds',
    help: 'request duration in seconds histogram for all requests',
    type: 'summary',
    values: [],
    aggregator: 'sum'
  },
  {
    name: 'http_request_all_duration_seconds',
    help: 'request duration in seconds summary for all requests',
    type: 'histogram',
    values: [],
    aggregator: 'sum'
  },
  {
    help: 'Number of http cache hits',
    name: 'http_cache_hit_count',
    type: 'counter',
    values: [
      {
        value: 0,
        labels: {
          serviceId: 'node3'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Number of http cache misses',
    name: 'http_cache_miss_count',
    type: 'counter',
    values: [
      {
        value: 0,
        labels: {
          serviceId: 'node3'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total user CPU time spent in seconds.',
    name: 'process_cpu_user_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.7223759999999999,
        labels: {
          serviceId: 'node3',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total system CPU time spent in seconds.',
    name: 'process_cpu_system_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.185146,
        labels: {
          serviceId: 'node3',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total user and system CPU time spent in seconds.',
    name: 'process_cpu_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.907522,
        labels: {
          serviceId: 'node3',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Start time of the process since unix epoch in seconds.',
    name: 'process_start_time_seconds',
    type: 'gauge',
    values: [
      {
        value: 1743244689,
        labels: {
          serviceId: 'node3',
          workerId: 1
        }
      }
    ],
    aggregator: 'omit'
  },
  {
    help: 'Resident memory size in bytes.',
    name: 'process_resident_memory_bytes',
    type: 'gauge',
    values: [
      {
        value: 544882688,
        labels: {
          serviceId: 'node3',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Lag of event loop in seconds.',
    name: 'nodejs_eventloop_lag_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.000568167,
        labels: {
          serviceId: 'node3',
          workerId: 1
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'The minimum recorded event loop delay.',
    name: 'nodejs_eventloop_lag_min_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.010067968,
        labels: {
          serviceId: 'node3',
          workerId: 1
        }
      }
    ],
    aggregator: 'min'
  },
  {
    help: 'The maximum recorded event loop delay.',
    name: 'nodejs_eventloop_lag_max_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.011599871,
        labels: {
          serviceId: 'node3',
          workerId: 1
        }
      }
    ],
    aggregator: 'max'
  },
  {
    help: 'The mean of the recorded event loop delays.',
    name: 'nodejs_eventloop_lag_mean_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.010934114461538462,
        labels: {
          serviceId: 'node3',
          workerId: 1
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'The standard deviation of the recorded event loop delays.',
    name: 'nodejs_eventloop_lag_stddev_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.000370004960690366,
        labels: {
          serviceId: 'node3',
          workerId: 1
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'The 50th percentile of the recorded event loop delays.',
    name: 'nodejs_eventloop_lag_p50_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.011042815,
        labels: {
          serviceId: 'node3',
          workerId: 1
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'The 90th percentile of the recorded event loop delays.',
    name: 'nodejs_eventloop_lag_p90_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.011255807,
        labels: {
          serviceId: 'node3',
          workerId: 1
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'The 99th percentile of the recorded event loop delays.',
    name: 'nodejs_eventloop_lag_p99_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.011599871,
        labels: {
          serviceId: 'node3',
          workerId: 1
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'Number of active resources that are currently keeping the event loop alive, grouped by async resource type.',
    name: 'nodejs_active_resources',
    type: 'gauge',
    values: [
      {
        value: 11,
        labels: {
          type: 'MessagePort',
          serviceId: 'node3',
          workerId: 1
        }
      },
      {
        value: 1,
        labels: {
          type: 'Immediate',
          serviceId: 'node3',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total number of active resources.',
    name: 'nodejs_active_resources_total',
    type: 'gauge',
    values: [
      {
        value: 12,
        labels: {
          serviceId: 'node3',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Number of active libuv handles grouped by handle type. Every handle type is C++ class name.',
    name: 'nodejs_active_handles',
    type: 'gauge',
    values: [
      {
        value: 11,
        labels: {
          type: 'MessagePort',
          serviceId: 'node3',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total number of active handles.',
    name: 'nodejs_active_handles_total',
    type: 'gauge',
    values: [
      {
        value: 11,
        labels: {
          serviceId: 'node3',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Number of active libuv requests grouped by request type. Every request type is C++ class name.',
    name: 'nodejs_active_requests',
    type: 'gauge',
    values: [],
    aggregator: 'sum'
  },
  {
    help: 'Total number of active requests.',
    name: 'nodejs_active_requests_total',
    type: 'gauge',
    values: [
      {
        value: 0,
        labels: {
          serviceId: 'node3',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Process heap size from Node.js in bytes.',
    name: 'nodejs_heap_size_total_bytes',
    type: 'gauge',
    values: [
      {
        value: 77365248,
        labels: {
          serviceId: 'node3',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Process heap size used from Node.js in bytes.',
    name: 'nodejs_heap_size_used_bytes',
    type: 'gauge',
    values: [
      {
        value: 43773888,
        labels: {
          serviceId: 'node3',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Node.js external memory size in bytes.',
    name: 'nodejs_external_memory_bytes',
    type: 'gauge',
    values: [
      {
        value: 5236992,
        labels: {
          serviceId: 'node3',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Process heap space size total from Node.js in bytes.',
    name: 'nodejs_heap_space_size_total_bytes',
    type: 'gauge',
    values: [
      {
        value: 0,
        labels: {
          space: 'read_only',
          serviceId: 'node3',
          workerId: 1
        }
      },
      {
        value: 33554432,
        labels: {
          space: 'new',
          serviceId: 'node3',
          workerId: 1
        }
      },
      {
        value: 34308096,
        labels: {
          space: 'old',
          serviceId: 'node3',
          workerId: 1
        }
      },
      {
        value: 2359296,
        labels: {
          space: 'code',
          serviceId: 'node3',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared',
          serviceId: 'node3',
          workerId: 1
        }
      },
      {
        value: 4259840,
        labels: {
          space: 'trusted',
          serviceId: 'node3',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'new_large_object',
          serviceId: 'node3',
          workerId: 1
        }
      },
      {
        value: 2883584,
        labels: {
          space: 'large_object',
          serviceId: 'node3',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'code_large_object',
          serviceId: 'node3',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared_large_object',
          serviceId: 'node3',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'trusted_large_object',
          serviceId: 'node3',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Process heap space size used from Node.js in bytes.',
    name: 'nodejs_heap_space_size_used_bytes',
    type: 'gauge',
    values: [
      {
        value: 0,
        labels: {
          space: 'read_only',
          serviceId: 'node3',
          workerId: 1
        }
      },
      {
        value: 2664424,
        labels: {
          space: 'new',
          serviceId: 'node3',
          workerId: 1
        }
      },
      {
        value: 32740304,
        labels: {
          space: 'old',
          serviceId: 'node3',
          workerId: 1
        }
      },
      {
        value: 1793664,
        labels: {
          space: 'code',
          serviceId: 'node3',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared',
          serviceId: 'node3',
          workerId: 1
        }
      },
      {
        value: 3858808,
        labels: {
          space: 'trusted',
          serviceId: 'node3',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'new_large_object',
          serviceId: 'node3',
          workerId: 1
        }
      },
      {
        value: 2718848,
        labels: {
          space: 'large_object',
          serviceId: 'node3',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'code_large_object',
          serviceId: 'node3',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared_large_object',
          serviceId: 'node3',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'trusted_large_object',
          serviceId: 'node3',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Process heap space size available from Node.js in bytes.',
    name: 'nodejs_heap_space_size_available_bytes',
    type: 'gauge',
    values: [
      {
        value: 0,
        labels: {
          space: 'read_only',
          serviceId: 'node3',
          workerId: 1
        }
      },
      {
        value: 13830168,
        labels: {
          space: 'new',
          serviceId: 'node3',
          workerId: 1
        }
      },
      {
        value: 941376,
        labels: {
          space: 'old',
          serviceId: 'node3',
          workerId: 1
        }
      },
      {
        value: 123264,
        labels: {
          space: 'code',
          serviceId: 'node3',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared',
          serviceId: 'node3',
          workerId: 1
        }
      },
      {
        value: 325680,
        labels: {
          space: 'trusted',
          serviceId: 'node3',
          workerId: 1
        }
      },
      {
        value: 16777216,
        labels: {
          space: 'new_large_object',
          serviceId: 'node3',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'large_object',
          serviceId: 'node3',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'code_large_object',
          serviceId: 'node3',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared_large_object',
          serviceId: 'node3',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'trusted_large_object',
          serviceId: 'node3',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Node.js version info.',
    name: 'nodejs_version_info',
    type: 'gauge',
    values: [
      {
        value: 1,
        labels: {
          version: 'v22.12.0',
          major: 22,
          minor: 12,
          patch: 0,
          serviceId: 'node3',
          workerId: 1
        }
      }
    ],
    aggregator: 'first'
  },
  {
    name: 'nodejs_gc_duration_seconds',
    help: 'Garbage collection duration by kind, one of major, minor, incremental or weakcb.',
    type: 'histogram',
    values: [],
    aggregator: 'sum'
  },
  {
    help: 'The event loop utilization as a fraction of the loop time. 1 is fully utilized, 0 is fully idle.',
    name: 'nodejs_eventloop_utilization',
    type: 'gauge',
    values: [
      {
        value: 0.014306853176291191,
        labels: {
          serviceId: 'node3',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'The process CPU percent usage.',
    name: 'process_cpu_percent_usage',
    type: 'gauge',
    values: [
      {
        value: 55.22,
        labels: {
          serviceId: 'node3',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total user CPU time spent in seconds for the current thread.',
    name: 'thread_cpu_user_system_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.013733,
        labels: {
          serviceId: 'node3',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total system CPU time spent in seconds for the current thread.',
    name: 'thread_cpu_system_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.007416,
        labels: {
          serviceId: 'node3',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'The thread CPU percent usage.',
    name: 'thread_cpu_percent_usage',
    type: 'gauge',
    values: [
      {
        value: 0.2041511326186852,
        labels: {
          serviceId: 'node3',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total user and system CPU time spent in seconds for the current threads.',
    name: 'thread_cpu_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.021148999999999998,
        labels: {
          serviceId: 'node3',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    name: 'http_request_summary_seconds',
    help: 'request duration in seconds summary for all requests',
    type: 'summary',
    values: [],
    aggregator: 'sum'
  },
  {
    name: 'http_request_duration_seconds',
    help: 'request duration in seconds histogram for all requests',
    type: 'histogram',
    values: [],
    aggregator: 'sum'
  },
  {
    name: 'http_request_all_summary_seconds',
    help: 'request duration in seconds histogram for all requests',
    type: 'summary',
    values: [],
    aggregator: 'sum'
  },
  {
    name: 'http_request_all_duration_seconds',
    help: 'request duration in seconds summary for all requests',
    type: 'histogram',
    values: [],
    aggregator: 'sum'
  },
  {
    help: 'Number of http cache hits',
    name: 'http_cache_hit_count',
    type: 'counter',
    values: [
      {
        value: 0,
        labels: {
          serviceId: 'node3',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Number of http cache misses',
    name: 'http_cache_miss_count',
    type: 'counter',
    values: [
      {
        value: 0,
        labels: {
          serviceId: 'node3',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total user CPU time spent in seconds.',
    name: 'process_cpu_user_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.030403999999999997,
        labels: {
          serviceId: 'type1'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total system CPU time spent in seconds.',
    name: 'process_cpu_system_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.009579,
        labels: {
          serviceId: 'type1'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total user and system CPU time spent in seconds.',
    name: 'process_cpu_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.039983,
        labels: {
          serviceId: 'type1'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Start time of the process since unix epoch in seconds.',
    name: 'process_start_time_seconds',
    type: 'gauge',
    values: [
      {
        value: 1743244694,
        labels: {
          serviceId: 'type1'
        }
      }
    ],
    aggregator: 'omit'
  },
  {
    help: 'Resident memory size in bytes.',
    name: 'process_resident_memory_bytes',
    type: 'gauge',
    values: [
      {
        value: 67649536,
        labels: {
          serviceId: 'type1'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Lag of event loop in seconds.',
    name: 'nodejs_eventloop_lag_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.00077725,
        labels: {
          serviceId: 'type1'
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'The minimum recorded event loop delay.',
    name: 'nodejs_eventloop_lag_min_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.010092544,
        labels: {
          serviceId: 'type1'
        }
      }
    ],
    aggregator: 'min'
  },
  {
    help: 'The maximum recorded event loop delay.',
    name: 'nodejs_eventloop_lag_max_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.011698175,
        labels: {
          serviceId: 'type1'
        }
      }
    ],
    aggregator: 'max'
  },
  {
    help: 'The mean of the recorded event loop delays.',
    name: 'nodejs_eventloop_lag_mean_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.01095914057142857,
        labels: {
          serviceId: 'type1'
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'The standard deviation of the recorded event loop delays.',
    name: 'nodejs_eventloop_lag_stddev_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.00038665680355687044,
        labels: {
          serviceId: 'type1'
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'The 50th percentile of the recorded event loop delays.',
    name: 'nodejs_eventloop_lag_p50_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.011026431,
        labels: {
          serviceId: 'type1'
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'The 90th percentile of the recorded event loop delays.',
    name: 'nodejs_eventloop_lag_p90_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.011362303,
        labels: {
          serviceId: 'type1'
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'The 99th percentile of the recorded event loop delays.',
    name: 'nodejs_eventloop_lag_p99_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.011698175,
        labels: {
          serviceId: 'type1'
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'Number of active resources that are currently keeping the event loop alive, grouped by async resource type.',
    name: 'nodejs_active_resources',
    type: 'gauge',
    values: [
      {
        value: 2,
        labels: {
          type: 'PipeWrap',
          serviceId: 'type1'
        }
      },
      {
        value: 1,
        labels: {
          type: 'TCPServerWrap',
          serviceId: 'type1'
        }
      },
      {
        value: 1,
        labels: {
          type: 'Immediate',
          serviceId: 'type1'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total number of active resources.',
    name: 'nodejs_active_resources_total',
    type: 'gauge',
    values: [
      {
        value: 4,
        labels: {
          serviceId: 'type1'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Number of active libuv handles grouped by handle type. Every handle type is C++ class name.',
    name: 'nodejs_active_handles',
    type: 'gauge',
    values: [
      {
        value: 2,
        labels: {
          type: 'Socket',
          serviceId: 'type1'
        }
      },
      {
        value: 1,
        labels: {
          type: 'Server',
          serviceId: 'type1'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total number of active handles.',
    name: 'nodejs_active_handles_total',
    type: 'gauge',
    values: [
      {
        value: 3,
        labels: {
          serviceId: 'type1'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Number of active libuv requests grouped by request type. Every request type is C++ class name.',
    name: 'nodejs_active_requests',
    type: 'gauge',
    values: [],
    aggregator: 'sum'
  },
  {
    help: 'Total number of active requests.',
    name: 'nodejs_active_requests_total',
    type: 'gauge',
    values: [
      {
        value: 0,
        labels: {
          serviceId: 'type1'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Process heap size from Node.js in bytes.',
    name: 'nodejs_heap_size_total_bytes',
    type: 'gauge',
    values: [
      {
        value: 35831808,
        labels: {
          serviceId: 'type1'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Process heap size used from Node.js in bytes.',
    name: 'nodejs_heap_size_used_bytes',
    type: 'gauge',
    values: [
      {
        value: 18841152,
        labels: {
          serviceId: 'type1'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Node.js external memory size in bytes.',
    name: 'nodejs_external_memory_bytes',
    type: 'gauge',
    values: [
      {
        value: 4065624,
        labels: {
          serviceId: 'type1'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Process heap space size total from Node.js in bytes.',
    name: 'nodejs_heap_space_size_total_bytes',
    type: 'gauge',
    values: [
      {
        value: 0,
        labels: {
          space: 'read_only',
          serviceId: 'type1'
        }
      },
      {
        value: 16777216,
        labels: {
          space: 'new',
          serviceId: 'type1'
        }
      },
      {
        value: 14647296,
        labels: {
          space: 'old',
          serviceId: 'type1'
        }
      },
      {
        value: 1310720,
        labels: {
          space: 'code',
          serviceId: 'type1'
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared',
          serviceId: 'type1'
        }
      },
      {
        value: 1900544,
        labels: {
          space: 'trusted',
          serviceId: 'type1'
        }
      },
      {
        value: 0,
        labels: {
          space: 'new_large_object',
          serviceId: 'type1'
        }
      },
      {
        value: 1196032,
        labels: {
          space: 'large_object',
          serviceId: 'type1'
        }
      },
      {
        value: 0,
        labels: {
          space: 'code_large_object',
          serviceId: 'type1'
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared_large_object',
          serviceId: 'type1'
        }
      },
      {
        value: 0,
        labels: {
          space: 'trusted_large_object',
          serviceId: 'type1'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Process heap space size used from Node.js in bytes.',
    name: 'nodejs_heap_space_size_used_bytes',
    type: 'gauge',
    values: [
      {
        value: 0,
        labels: {
          space: 'read_only',
          serviceId: 'type1'
        }
      },
      {
        value: 3107488,
        labels: {
          space: 'new',
          serviceId: 'type1'
        }
      },
      {
        value: 12035272,
        labels: {
          space: 'old',
          serviceId: 'type1'
        }
      },
      {
        value: 867136,
        labels: {
          space: 'code',
          serviceId: 'type1'
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared',
          serviceId: 'type1'
        }
      },
      {
        value: 1702664,
        labels: {
          space: 'trusted',
          serviceId: 'type1'
        }
      },
      {
        value: 0,
        labels: {
          space: 'new_large_object',
          serviceId: 'type1'
        }
      },
      {
        value: 1130752,
        labels: {
          space: 'large_object',
          serviceId: 'type1'
        }
      },
      {
        value: 0,
        labels: {
          space: 'code_large_object',
          serviceId: 'type1'
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared_large_object',
          serviceId: 'type1'
        }
      },
      {
        value: 0,
        labels: {
          space: 'trusted_large_object',
          serviceId: 'type1'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Process heap space size available from Node.js in bytes.',
    name: 'nodejs_heap_space_size_available_bytes',
    type: 'gauge',
    values: [
      {
        value: 0,
        labels: {
          space: 'read_only',
          serviceId: 'type1'
        }
      },
      {
        value: 5139808,
        labels: {
          space: 'new',
          serviceId: 'type1'
        }
      },
      {
        value: 1628304,
        labels: {
          space: 'old',
          serviceId: 'type1'
        }
      },
      {
        value: 197824,
        labels: {
          space: 'code',
          serviceId: 'type1'
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared',
          serviceId: 'type1'
        }
      },
      {
        value: 162432,
        labels: {
          space: 'trusted',
          serviceId: 'type1'
        }
      },
      {
        value: 8388608,
        labels: {
          space: 'new_large_object',
          serviceId: 'type1'
        }
      },
      {
        value: 0,
        labels: {
          space: 'large_object',
          serviceId: 'type1'
        }
      },
      {
        value: 0,
        labels: {
          space: 'code_large_object',
          serviceId: 'type1'
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared_large_object',
          serviceId: 'type1'
        }
      },
      {
        value: 0,
        labels: {
          space: 'trusted_large_object',
          serviceId: 'type1'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Node.js version info.',
    name: 'nodejs_version_info',
    type: 'gauge',
    values: [
      {
        value: 1,
        labels: {
          version: 'v22.12.0',
          major: 22,
          minor: 12,
          patch: 0,
          serviceId: 'type1'
        }
      }
    ],
    aggregator: 'first'
  },
  {
    name: 'nodejs_gc_duration_seconds',
    help: 'Garbage collection duration by kind, one of major, minor, incremental or weakcb.',
    type: 'histogram',
    values: [],
    aggregator: 'sum'
  },
  {
    help: 'The event loop utilization as a fraction of the loop time. 1 is fully utilized, 0 is fully idle.',
    name: 'nodejs_eventloop_utilization',
    type: 'gauge',
    values: [
      {
        value: 0.010959286068950178,
        labels: {
          serviceId: 'type1'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'The process CPU percent usage.',
    name: 'process_cpu_percent_usage',
    type: 'gauge',
    values: [
      {
        value: 55.64,
        labels: {
          serviceId: 'type1'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total user CPU time spent in seconds for the current thread.',
    name: 'thread_cpu_user_system_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.021881,
        labels: {
          serviceId: 'type1'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total system CPU time spent in seconds for the current thread.',
    name: 'thread_cpu_system_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.008741,
        labels: {
          serviceId: 'type1'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'The thread CPU percent usage.',
    name: 'thread_cpu_percent_usage',
    type: 'gauge',
    values: [
      {
        value: 0.3537638524799959,
        labels: {
          serviceId: 'type1'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total user and system CPU time spent in seconds for the current threads.',
    name: 'thread_cpu_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.030622,
        labels: {
          serviceId: 'type1'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    name: 'http_request_summary_seconds',
    help: 'request duration in seconds summary for all requests',
    type: 'summary',
    values: [
      {
        labels: {
          quantile: 0.01,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type1'
        },
        value: 0.00126675
      },
      {
        labels: {
          quantile: 0.05,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type1'
        },
        value: 0.00126675
      },
      {
        labels: {
          quantile: 0.5,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type1'
        },
        value: 0.00126675
      },
      {
        labels: {
          quantile: 0.9,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type1'
        },
        value: 0.00126675
      },
      {
        labels: {
          quantile: 0.95,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type1'
        },
        value: 0.00126675
      },
      {
        labels: {
          quantile: 0.99,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type1'
        },
        value: 0.00126675
      },
      {
        labels: {
          quantile: 0.999,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type1'
        },
        value: 0.00126675
      },
      {
        metricName: 'http_request_summary_seconds_sum',
        labels: {
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type1'
        },
        value: 0.00126675
      },
      {
        metricName: 'http_request_summary_seconds_count',
        labels: {
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type1'
        },
        value: 1
      }
    ],
    aggregator: 'sum'
  },
  {
    name: 'http_request_duration_seconds',
    help: 'request duration in seconds histogram for all requests',
    type: 'histogram',
    values: [
      {
        value: 1,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.005,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type1'
        }
      },
      {
        value: 1,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.01,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type1'
        }
      },
      {
        value: 1,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.025,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type1'
        }
      },
      {
        value: 1,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.05,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type1'
        }
      },
      {
        value: 1,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.1,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type1'
        }
      },
      {
        value: 1,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.25,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type1'
        }
      },
      {
        value: 1,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.5,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type1'
        }
      },
      {
        value: 1,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 1,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type1'
        }
      },
      {
        value: 1,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 2.5,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type1'
        }
      },
      {
        value: 1,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 5,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type1'
        }
      },
      {
        value: 1,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 10,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type1'
        }
      },
      {
        value: 1,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: '+Inf',
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type1'
        }
      },
      {
        value: 0.001660625,
        metricName: 'http_request_duration_seconds_sum',
        labels: {
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type1'
        }
      },
      {
        value: 1,
        metricName: 'http_request_duration_seconds_count',
        labels: {
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type1'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    name: 'http_request_all_summary_seconds',
    help: 'request duration in seconds histogram for all requests',
    type: 'summary',
    values: [
      {
        labels: {
          quantile: 0.01,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type1'
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.05,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type1'
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.5,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type1'
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.9,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type1'
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.95,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type1'
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.99,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type1'
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.999,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type1'
        },
        value: 0
      },
      {
        metricName: 'http_request_all_summary_seconds_sum',
        labels: {
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type1'
        },
        value: 0
      },
      {
        metricName: 'http_request_all_summary_seconds_count',
        labels: {
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type1'
        },
        value: 0
      }
    ],
    aggregator: 'sum'
  },
  {
    name: 'http_request_all_duration_seconds',
    help: 'request duration in seconds summary for all requests',
    type: 'histogram',
    values: [],
    aggregator: 'sum'
  },
  {
    help: 'Number of http cache hits',
    name: 'http_cache_hit_count',
    type: 'counter',
    values: [
      {
        value: 0,
        labels: {
          serviceId: 'type1'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Number of http cache misses',
    name: 'http_cache_miss_count',
    type: 'counter',
    values: [
      {
        value: 0,
        labels: {
          serviceId: 'type1'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total user CPU time spent in seconds.',
    name: 'process_cpu_user_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.022261999999999997,
        labels: {
          serviceId: 'type1',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total system CPU time spent in seconds.',
    name: 'process_cpu_system_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.006999999999999999,
        labels: {
          serviceId: 'type1',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total user and system CPU time spent in seconds.',
    name: 'process_cpu_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.029261999999999993,
        labels: {
          serviceId: 'type1',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Start time of the process since unix epoch in seconds.',
    name: 'process_start_time_seconds',
    type: 'gauge',
    values: [
      {
        value: 1743244695,
        labels: {
          serviceId: 'type1',
          workerId: 1
        }
      }
    ],
    aggregator: 'omit'
  },
  {
    help: 'Resident memory size in bytes.',
    name: 'process_resident_memory_bytes',
    type: 'gauge',
    values: [
      {
        value: 71335936,
        labels: {
          serviceId: 'type1',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Lag of event loop in seconds.',
    name: 'nodejs_eventloop_lag_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.0006465,
        labels: {
          serviceId: 'type1',
          workerId: 1
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'The minimum recorded event loop delay.',
    name: 'nodejs_eventloop_lag_min_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.010092544,
        labels: {
          serviceId: 'type1',
          workerId: 1
        }
      }
    ],
    aggregator: 'min'
  },
  {
    help: 'The maximum recorded event loop delay.',
    name: 'nodejs_eventloop_lag_max_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.011182079,
        labels: {
          serviceId: 'type1',
          workerId: 1
        }
      }
    ],
    aggregator: 'max'
  },
  {
    help: 'The mean of the recorded event loop delays.',
    name: 'nodejs_eventloop_lag_mean_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.010808173714285715,
        labels: {
          serviceId: 'type1',
          workerId: 1
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'The standard deviation of the recorded event loop delays.',
    name: 'nodejs_eventloop_lag_stddev_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.00036507099903354,
        labels: {
          serviceId: 'type1',
          workerId: 1
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'The 50th percentile of the recorded event loop delays.',
    name: 'nodejs_eventloop_lag_p50_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.010985471,
        labels: {
          serviceId: 'type1',
          workerId: 1
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'The 90th percentile of the recorded event loop delays.',
    name: 'nodejs_eventloop_lag_p90_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.011165695,
        labels: {
          serviceId: 'type1',
          workerId: 1
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'The 99th percentile of the recorded event loop delays.',
    name: 'nodejs_eventloop_lag_p99_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.011182079,
        labels: {
          serviceId: 'type1',
          workerId: 1
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'Number of active resources that are currently keeping the event loop alive, grouped by async resource type.',
    name: 'nodejs_active_resources',
    type: 'gauge',
    values: [
      {
        value: 2,
        labels: {
          type: 'PipeWrap',
          serviceId: 'type1',
          workerId: 1
        }
      },
      {
        value: 1,
        labels: {
          type: 'TCPServerWrap',
          serviceId: 'type1',
          workerId: 1
        }
      },
      {
        value: 1,
        labels: {
          type: 'Immediate',
          serviceId: 'type1',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total number of active resources.',
    name: 'nodejs_active_resources_total',
    type: 'gauge',
    values: [
      {
        value: 4,
        labels: {
          serviceId: 'type1',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Number of active libuv handles grouped by handle type. Every handle type is C++ class name.',
    name: 'nodejs_active_handles',
    type: 'gauge',
    values: [
      {
        value: 2,
        labels: {
          type: 'Socket',
          serviceId: 'type1',
          workerId: 1
        }
      },
      {
        value: 1,
        labels: {
          type: 'Server',
          serviceId: 'type1',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total number of active handles.',
    name: 'nodejs_active_handles_total',
    type: 'gauge',
    values: [
      {
        value: 3,
        labels: {
          serviceId: 'type1',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Number of active libuv requests grouped by request type. Every request type is C++ class name.',
    name: 'nodejs_active_requests',
    type: 'gauge',
    values: [],
    aggregator: 'sum'
  },
  {
    help: 'Total number of active requests.',
    name: 'nodejs_active_requests_total',
    type: 'gauge',
    values: [
      {
        value: 0,
        labels: {
          serviceId: 'type1',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Process heap size from Node.js in bytes.',
    name: 'nodejs_heap_size_total_bytes',
    type: 'gauge',
    values: [
      {
        value: 35569664,
        labels: {
          serviceId: 'type1',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Process heap size used from Node.js in bytes.',
    name: 'nodejs_heap_size_used_bytes',
    type: 'gauge',
    values: [
      {
        value: 18127824,
        labels: {
          serviceId: 'type1',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Node.js external memory size in bytes.',
    name: 'nodejs_external_memory_bytes',
    type: 'gauge',
    values: [
      {
        value: 4037100,
        labels: {
          serviceId: 'type1',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Process heap space size total from Node.js in bytes.',
    name: 'nodejs_heap_space_size_total_bytes',
    type: 'gauge',
    values: [
      {
        value: 0,
        labels: {
          space: 'read_only',
          serviceId: 'type1',
          workerId: 1
        }
      },
      {
        value: 16777216,
        labels: {
          space: 'new',
          serviceId: 'type1',
          workerId: 1
        }
      },
      {
        value: 14647296,
        labels: {
          space: 'old',
          serviceId: 'type1',
          workerId: 1
        }
      },
      {
        value: 1048576,
        labels: {
          space: 'code',
          serviceId: 'type1',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared',
          serviceId: 'type1',
          workerId: 1
        }
      },
      {
        value: 1900544,
        labels: {
          space: 'trusted',
          serviceId: 'type1',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'new_large_object',
          serviceId: 'type1',
          workerId: 1
        }
      },
      {
        value: 1196032,
        labels: {
          space: 'large_object',
          serviceId: 'type1',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'code_large_object',
          serviceId: 'type1',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared_large_object',
          serviceId: 'type1',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'trusted_large_object',
          serviceId: 'type1',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Process heap space size used from Node.js in bytes.',
    name: 'nodejs_heap_space_size_used_bytes',
    type: 'gauge',
    values: [
      {
        value: 0,
        labels: {
          space: 'read_only',
          serviceId: 'type1',
          workerId: 1
        }
      },
      {
        value: 2578952,
        labels: {
          space: 'new',
          serviceId: 'type1',
          workerId: 1
        }
      },
      {
        value: 11935792,
        labels: {
          space: 'old',
          serviceId: 'type1',
          workerId: 1
        }
      },
      {
        value: 835104,
        labels: {
          space: 'code',
          serviceId: 'type1',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared',
          serviceId: 'type1',
          workerId: 1
        }
      },
      {
        value: 1649432,
        labels: {
          space: 'trusted',
          serviceId: 'type1',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'new_large_object',
          serviceId: 'type1',
          workerId: 1
        }
      },
      {
        value: 1130752,
        labels: {
          space: 'large_object',
          serviceId: 'type1',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'code_large_object',
          serviceId: 'type1',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared_large_object',
          serviceId: 'type1',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'trusted_large_object',
          serviceId: 'type1',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Process heap space size available from Node.js in bytes.',
    name: 'nodejs_heap_space_size_available_bytes',
    type: 'gauge',
    values: [
      {
        value: 0,
        labels: {
          space: 'read_only',
          serviceId: 'type1',
          workerId: 1
        }
      },
      {
        value: 5668344,
        labels: {
          space: 'new',
          serviceId: 'type1',
          workerId: 1
        }
      },
      {
        value: 1583704,
        labels: {
          space: 'old',
          serviceId: 'type1',
          workerId: 1
        }
      },
      {
        value: 16864,
        labels: {
          space: 'code',
          serviceId: 'type1',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared',
          serviceId: 'type1',
          workerId: 1
        }
      },
      {
        value: 215736,
        labels: {
          space: 'trusted',
          serviceId: 'type1',
          workerId: 1
        }
      },
      {
        value: 8388608,
        labels: {
          space: 'new_large_object',
          serviceId: 'type1',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'large_object',
          serviceId: 'type1',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'code_large_object',
          serviceId: 'type1',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared_large_object',
          serviceId: 'type1',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'trusted_large_object',
          serviceId: 'type1',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Node.js version info.',
    name: 'nodejs_version_info',
    type: 'gauge',
    values: [
      {
        value: 1,
        labels: {
          version: 'v22.12.0',
          major: 22,
          minor: 12,
          patch: 0,
          serviceId: 'type1',
          workerId: 1
        }
      }
    ],
    aggregator: 'first'
  },
  {
    name: 'nodejs_gc_duration_seconds',
    help: 'Garbage collection duration by kind, one of major, minor, incremental or weakcb.',
    type: 'histogram',
    values: [],
    aggregator: 'sum'
  },
  {
    help: 'The event loop utilization as a fraction of the loop time. 1 is fully utilized, 0 is fully idle.',
    name: 'nodejs_eventloop_utilization',
    type: 'gauge',
    values: [
      {
        value: 0.0091912591661838,
        labels: {
          serviceId: 'type1',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'The process CPU percent usage.',
    name: 'process_cpu_percent_usage',
    type: 'gauge',
    values: [
      {
        value: 55.73,
        labels: {
          serviceId: 'type1',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total user CPU time spent in seconds for the current thread.',
    name: 'thread_cpu_user_system_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.01583,
        labels: {
          serviceId: 'type1',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total system CPU time spent in seconds for the current thread.',
    name: 'thread_cpu_system_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.006524,
        labels: {
          serviceId: 'type1',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'The thread CPU percent usage.',
    name: 'thread_cpu_percent_usage',
    type: 'gauge',
    values: [
      {
        value: 0.25760680931397056,
        labels: {
          serviceId: 'type1',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total user and system CPU time spent in seconds for the current threads.',
    name: 'thread_cpu_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.022354,
        labels: {
          serviceId: 'type1',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    name: 'http_request_summary_seconds',
    help: 'request duration in seconds summary for all requests',
    type: 'summary',
    values: [],
    aggregator: 'sum'
  },
  {
    name: 'http_request_duration_seconds',
    help: 'request duration in seconds histogram for all requests',
    type: 'histogram',
    values: [],
    aggregator: 'sum'
  },
  {
    name: 'http_request_all_summary_seconds',
    help: 'request duration in seconds histogram for all requests',
    type: 'summary',
    values: [],
    aggregator: 'sum'
  },
  {
    name: 'http_request_all_duration_seconds',
    help: 'request duration in seconds summary for all requests',
    type: 'histogram',
    values: [],
    aggregator: 'sum'
  },
  {
    help: 'Number of http cache hits',
    name: 'http_cache_hit_count',
    type: 'counter',
    values: [
      {
        value: 0,
        labels: {
          serviceId: 'type1',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Number of http cache misses',
    name: 'http_cache_miss_count',
    type: 'counter',
    values: [
      {
        value: 0,
        labels: {
          serviceId: 'type1',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total user CPU time spent in seconds.',
    name: 'process_cpu_user_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.6891440000000001,
        labels: {
          serviceId: 'type4'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total system CPU time spent in seconds.',
    name: 'process_cpu_system_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.175248,
        labels: {
          serviceId: 'type4'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total user and system CPU time spent in seconds.',
    name: 'process_cpu_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.864392,
        labels: {
          serviceId: 'type4'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Start time of the process since unix epoch in seconds.',
    name: 'process_start_time_seconds',
    type: 'gauge',
    values: [
      {
        value: 1743244689,
        labels: {
          serviceId: 'type4'
        }
      }
    ],
    aggregator: 'omit'
  },
  {
    help: 'Resident memory size in bytes.',
    name: 'process_resident_memory_bytes',
    type: 'gauge',
    values: [
      {
        value: 545685504,
        labels: {
          serviceId: 'type4'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Lag of event loop in seconds.',
    name: 'nodejs_eventloop_lag_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.001332708,
        labels: {
          serviceId: 'type4'
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'The minimum recorded event loop delay.',
    name: 'nodejs_eventloop_lag_min_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.009142272,
        labels: {
          serviceId: 'type4'
        }
      }
    ],
    aggregator: 'min'
  },
  {
    help: 'The maximum recorded event loop delay.',
    name: 'nodejs_eventloop_lag_max_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.013148159,
        labels: {
          serviceId: 'type4'
        }
      }
    ],
    aggregator: 'max'
  },
  {
    help: 'The mean of the recorded event loop delays.',
    name: 'nodejs_eventloop_lag_mean_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.010897115428571429,
        labels: {
          serviceId: 'type4'
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'The standard deviation of the recorded event loop delays.',
    name: 'nodejs_eventloop_lag_stddev_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.0008804749392534621,
        labels: {
          serviceId: 'type4'
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'The 50th percentile of the recorded event loop delays.',
    name: 'nodejs_eventloop_lag_p50_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.010838015,
        labels: {
          serviceId: 'type4'
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'The 90th percentile of the recorded event loop delays.',
    name: 'nodejs_eventloop_lag_p90_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.012132351,
        labels: {
          serviceId: 'type4'
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'The 99th percentile of the recorded event loop delays.',
    name: 'nodejs_eventloop_lag_p99_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.013148159,
        labels: {
          serviceId: 'type4'
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'Number of active resources that are currently keeping the event loop alive, grouped by async resource type.',
    name: 'nodejs_active_resources',
    type: 'gauge',
    values: [
      {
        value: 11,
        labels: {
          type: 'MessagePort',
          serviceId: 'type4'
        }
      },
      {
        value: 1,
        labels: {
          type: 'Immediate',
          serviceId: 'type4'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total number of active resources.',
    name: 'nodejs_active_resources_total',
    type: 'gauge',
    values: [
      {
        value: 12,
        labels: {
          serviceId: 'type4'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Number of active libuv handles grouped by handle type. Every handle type is C++ class name.',
    name: 'nodejs_active_handles',
    type: 'gauge',
    values: [
      {
        value: 11,
        labels: {
          type: 'MessagePort',
          serviceId: 'type4'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total number of active handles.',
    name: 'nodejs_active_handles_total',
    type: 'gauge',
    values: [
      {
        value: 11,
        labels: {
          serviceId: 'type4'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Number of active libuv requests grouped by request type. Every request type is C++ class name.',
    name: 'nodejs_active_requests',
    type: 'gauge',
    values: [],
    aggregator: 'sum'
  },
  {
    help: 'Total number of active requests.',
    name: 'nodejs_active_requests_total',
    type: 'gauge',
    values: [
      {
        value: 0,
        labels: {
          serviceId: 'type4'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Process heap size from Node.js in bytes.',
    name: 'nodejs_heap_size_total_bytes',
    type: 'gauge',
    values: [
      {
        value: 44859392,
        labels: {
          serviceId: 'type4'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Process heap size used from Node.js in bytes.',
    name: 'nodejs_heap_size_used_bytes',
    type: 'gauge',
    values: [
      {
        value: 34881336,
        labels: {
          serviceId: 'type4'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Node.js external memory size in bytes.',
    name: 'nodejs_external_memory_bytes',
    type: 'gauge',
    values: [
      {
        value: 5232342,
        labels: {
          serviceId: 'type4'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Process heap space size total from Node.js in bytes.',
    name: 'nodejs_heap_space_size_total_bytes',
    type: 'gauge',
    values: [
      {
        value: 0,
        labels: {
          space: 'read_only',
          serviceId: 'type4'
        }
      },
      {
        value: 1048576,
        labels: {
          space: 'new',
          serviceId: 'type4'
        }
      },
      {
        value: 34308096,
        labels: {
          space: 'old',
          serviceId: 'type4'
        }
      },
      {
        value: 2359296,
        labels: {
          space: 'code',
          serviceId: 'type4'
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared',
          serviceId: 'type4'
        }
      },
      {
        value: 4259840,
        labels: {
          space: 'trusted',
          serviceId: 'type4'
        }
      },
      {
        value: 0,
        labels: {
          space: 'new_large_object',
          serviceId: 'type4'
        }
      },
      {
        value: 2883584,
        labels: {
          space: 'large_object',
          serviceId: 'type4'
        }
      },
      {
        value: 0,
        labels: {
          space: 'code_large_object',
          serviceId: 'type4'
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared_large_object',
          serviceId: 'type4'
        }
      },
      {
        value: 0,
        labels: {
          space: 'trusted_large_object',
          serviceId: 'type4'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Process heap space size used from Node.js in bytes.',
    name: 'nodejs_heap_space_size_used_bytes',
    type: 'gauge',
    values: [
      {
        value: 0,
        labels: {
          space: 'read_only',
          serviceId: 'type4'
        }
      },
      {
        value: 138112,
        labels: {
          space: 'new',
          serviceId: 'type4'
        }
      },
      {
        value: 26487832,
        labels: {
          space: 'old',
          serviceId: 'type4'
        }
      },
      {
        value: 1744160,
        labels: {
          space: 'code',
          serviceId: 'type4'
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared',
          serviceId: 'type4'
        }
      },
      {
        value: 3794576,
        labels: {
          space: 'trusted',
          serviceId: 'type4'
        }
      },
      {
        value: 0,
        labels: {
          space: 'new_large_object',
          serviceId: 'type4'
        }
      },
      {
        value: 2718848,
        labels: {
          space: 'large_object',
          serviceId: 'type4'
        }
      },
      {
        value: 0,
        labels: {
          space: 'code_large_object',
          serviceId: 'type4'
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared_large_object',
          serviceId: 'type4'
        }
      },
      {
        value: 0,
        labels: {
          space: 'trusted_large_object',
          serviceId: 'type4'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Process heap space size available from Node.js in bytes.',
    name: 'nodejs_heap_space_size_available_bytes',
    type: 'gauge',
    values: [
      {
        value: 0,
        labels: {
          space: 'read_only',
          serviceId: 'type4'
        }
      },
      {
        value: 892800,
        labels: {
          space: 'new',
          serviceId: 'type4'
        }
      },
      {
        value: 979320,
        labels: {
          space: 'old',
          serviceId: 'type4'
        }
      },
      {
        value: 172768,
        labels: {
          space: 'code',
          serviceId: 'type4'
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared',
          serviceId: 'type4'
        }
      },
      {
        value: 390056,
        labels: {
          space: 'trusted',
          serviceId: 'type4'
        }
      },
      {
        value: 1048576,
        labels: {
          space: 'new_large_object',
          serviceId: 'type4'
        }
      },
      {
        value: 0,
        labels: {
          space: 'large_object',
          serviceId: 'type4'
        }
      },
      {
        value: 0,
        labels: {
          space: 'code_large_object',
          serviceId: 'type4'
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared_large_object',
          serviceId: 'type4'
        }
      },
      {
        value: 0,
        labels: {
          space: 'trusted_large_object',
          serviceId: 'type4'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Node.js version info.',
    name: 'nodejs_version_info',
    type: 'gauge',
    values: [
      {
        value: 1,
        labels: {
          version: 'v22.12.0',
          major: 22,
          minor: 12,
          patch: 0,
          serviceId: 'type4'
        }
      }
    ],
    aggregator: 'first'
  },
  {
    name: 'nodejs_gc_duration_seconds',
    help: 'Garbage collection duration by kind, one of major, minor, incremental or weakcb.',
    type: 'histogram',
    values: [
      {
        value: 0,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.001,
          kind: 'incremental',
          serviceId: 'type4'
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.01,
          kind: 'incremental',
          serviceId: 'type4'
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.1,
          kind: 'incremental',
          serviceId: 'type4'
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 1,
          kind: 'incremental',
          serviceId: 'type4'
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 2,
          kind: 'incremental',
          serviceId: 'type4'
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 5,
          kind: 'incremental',
          serviceId: 'type4'
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: '+Inf',
          kind: 'incremental',
          serviceId: 'type4'
        }
      },
      {
        value: 0.001067375000100583,
        metricName: 'nodejs_gc_duration_seconds_sum',
        labels: {
          kind: 'incremental',
          serviceId: 'type4'
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_count',
        labels: {
          kind: 'incremental',
          serviceId: 'type4'
        }
      },
      {
        value: 0,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.001,
          kind: 'major',
          serviceId: 'type4'
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.01,
          kind: 'major',
          serviceId: 'type4'
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.1,
          kind: 'major',
          serviceId: 'type4'
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 1,
          kind: 'major',
          serviceId: 'type4'
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 2,
          kind: 'major',
          serviceId: 'type4'
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 5,
          kind: 'major',
          serviceId: 'type4'
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: '+Inf',
          kind: 'major',
          serviceId: 'type4'
        }
      },
      {
        value: 0.0050144580001942815,
        metricName: 'nodejs_gc_duration_seconds_sum',
        labels: {
          kind: 'major',
          serviceId: 'type4'
        }
      },
      {
        value: 1,
        metricName: 'nodejs_gc_duration_seconds_count',
        labels: {
          kind: 'major',
          serviceId: 'type4'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'The event loop utilization as a fraction of the loop time. 1 is fully utilized, 0 is fully idle.',
    name: 'nodejs_eventloop_utilization',
    type: 'gauge',
    values: [
      {
        value: 0.11558672064139244,
        labels: {
          serviceId: 'type4'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'The process CPU percent usage.',
    name: 'process_cpu_percent_usage',
    type: 'gauge',
    values: [
      {
        value: 56.39,
        labels: {
          serviceId: 'type4'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total user CPU time spent in seconds for the current thread.',
    name: 'thread_cpu_user_system_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.02978,
        labels: {
          serviceId: 'type4'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total system CPU time spent in seconds for the current thread.',
    name: 'thread_cpu_system_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.013567,
        labels: {
          serviceId: 'type4'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'The thread CPU percent usage.',
    name: 'thread_cpu_percent_usage',
    type: 'gauge',
    values: [
      {
        value: 1.1780956175645974,
        labels: {
          serviceId: 'type4'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total user and system CPU time spent in seconds for the current threads.',
    name: 'thread_cpu_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.043347,
        labels: {
          serviceId: 'type4'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    name: 'http_request_summary_seconds',
    help: 'request duration in seconds summary for all requests',
    type: 'summary',
    values: [
      {
        labels: {
          quantile: 0.01,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4'
        },
        value: 0.000451083
      },
      {
        labels: {
          quantile: 0.05,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4'
        },
        value: 0.000451083
      },
      {
        labels: {
          quantile: 0.5,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4'
        },
        value: 0.000575167
      },
      {
        labels: {
          quantile: 0.9,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4'
        },
        value: 0.002818
      },
      {
        labels: {
          quantile: 0.95,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4'
        },
        value: 0.002818
      },
      {
        labels: {
          quantile: 0.99,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4'
        },
        value: 0.002818
      },
      {
        labels: {
          quantile: 0.999,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4'
        },
        value: 0.002818
      },
      {
        metricName: 'http_request_summary_seconds_sum',
        labels: {
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4'
        },
        value: 0.0038442500000000004
      },
      {
        metricName: 'http_request_summary_seconds_count',
        labels: {
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4'
        },
        value: 3
      }
    ],
    aggregator: 'sum'
  },
  {
    name: 'http_request_duration_seconds',
    help: 'request duration in seconds histogram for all requests',
    type: 'histogram',
    values: [
      {
        value: 3,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.005,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4'
        }
      },
      {
        value: 3,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.01,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4'
        }
      },
      {
        value: 3,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.025,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4'
        }
      },
      {
        value: 3,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.05,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4'
        }
      },
      {
        value: 3,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.1,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4'
        }
      },
      {
        value: 3,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.25,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4'
        }
      },
      {
        value: 3,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.5,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4'
        }
      },
      {
        value: 3,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 1,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4'
        }
      },
      {
        value: 3,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 2.5,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4'
        }
      },
      {
        value: 3,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 5,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4'
        }
      },
      {
        value: 3,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 10,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4'
        }
      },
      {
        value: 3,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: '+Inf',
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4'
        }
      },
      {
        value: 0.004572499999999999,
        metricName: 'http_request_duration_seconds_sum',
        labels: {
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4'
        }
      },
      {
        value: 3,
        metricName: 'http_request_duration_seconds_count',
        labels: {
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    name: 'http_request_all_summary_seconds',
    help: 'request duration in seconds histogram for all requests',
    type: 'summary',
    values: [
      {
        labels: {
          quantile: 0.01,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4'
        },
        value: 0.000607875
      },
      {
        labels: {
          quantile: 0.05,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4'
        },
        value: 0.000607875
      },
      {
        labels: {
          quantile: 0.5,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4'
        },
        value: 0.000607875
      },
      {
        labels: {
          quantile: 0.9,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4'
        },
        value: 0.000607875
      },
      {
        labels: {
          quantile: 0.95,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4'
        },
        value: 0.000607875
      },
      {
        labels: {
          quantile: 0.99,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4'
        },
        value: 0.000607875
      },
      {
        labels: {
          quantile: 0.999,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4'
        },
        value: 0.000607875
      },
      {
        metricName: 'http_request_all_summary_seconds_sum',
        labels: {
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4'
        },
        value: 0.000607875
      },
      {
        metricName: 'http_request_all_summary_seconds_count',
        labels: {
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4'
        },
        value: 1
      }
    ],
    aggregator: 'sum'
  },
  {
    name: 'http_request_all_duration_seconds',
    help: 'request duration in seconds summary for all requests',
    type: 'histogram',
    values: [
      {
        value: 1,
        metricName: 'http_request_all_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.005,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4'
        }
      },
      {
        value: 1,
        metricName: 'http_request_all_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.01,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4'
        }
      },
      {
        value: 1,
        metricName: 'http_request_all_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.025,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4'
        }
      },
      {
        value: 1,
        metricName: 'http_request_all_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.05,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4'
        }
      },
      {
        value: 1,
        metricName: 'http_request_all_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.1,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4'
        }
      },
      {
        value: 1,
        metricName: 'http_request_all_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.25,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4'
        }
      },
      {
        value: 1,
        metricName: 'http_request_all_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.5,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4'
        }
      },
      {
        value: 1,
        metricName: 'http_request_all_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 1,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4'
        }
      },
      {
        value: 1,
        metricName: 'http_request_all_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 2.5,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4'
        }
      },
      {
        value: 1,
        metricName: 'http_request_all_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 5,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4'
        }
      },
      {
        value: 1,
        metricName: 'http_request_all_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 10,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4'
        }
      },
      {
        value: 1,
        metricName: 'http_request_all_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: '+Inf',
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4'
        }
      },
      {
        value: 0.000618833,
        metricName: 'http_request_all_duration_seconds_sum',
        labels: {
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4'
        }
      },
      {
        value: 1,
        metricName: 'http_request_all_duration_seconds_count',
        labels: {
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Number of http cache hits',
    name: 'http_cache_hit_count',
    type: 'counter',
    values: [
      {
        value: 0,
        labels: {
          serviceId: 'type4'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Number of http cache misses',
    name: 'http_cache_miss_count',
    type: 'counter',
    values: [
      {
        value: 0,
        labels: {
          serviceId: 'type4'
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total user CPU time spent in seconds.',
    name: 'process_cpu_user_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.6866869999999999,
        labels: {
          serviceId: 'type4',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total system CPU time spent in seconds.',
    name: 'process_cpu_system_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.174117,
        labels: {
          serviceId: 'type4',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total user and system CPU time spent in seconds.',
    name: 'process_cpu_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.860804,
        labels: {
          serviceId: 'type4',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Start time of the process since unix epoch in seconds.',
    name: 'process_start_time_seconds',
    type: 'gauge',
    values: [
      {
        value: 1743244689,
        labels: {
          serviceId: 'type4',
          workerId: 1
        }
      }
    ],
    aggregator: 'omit'
  },
  {
    help: 'Resident memory size in bytes.',
    name: 'process_resident_memory_bytes',
    type: 'gauge',
    values: [
      {
        value: 545947648,
        labels: {
          serviceId: 'type4',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Lag of event loop in seconds.',
    name: 'nodejs_eventloop_lag_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.00133125,
        labels: {
          serviceId: 'type4',
          workerId: 1
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'The minimum recorded event loop delay.',
    name: 'nodejs_eventloop_lag_min_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.010092544,
        labels: {
          serviceId: 'type4',
          workerId: 1
        }
      }
    ],
    aggregator: 'min'
  },
  {
    help: 'The maximum recorded event loop delay.',
    name: 'nodejs_eventloop_lag_max_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.011739135,
        labels: {
          serviceId: 'type4',
          workerId: 1
        }
      }
    ],
    aggregator: 'max'
  },
  {
    help: 'The mean of the recorded event loop delays.',
    name: 'nodejs_eventloop_lag_mean_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.011012973714285714,
        labels: {
          serviceId: 'type4',
          workerId: 1
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'The standard deviation of the recorded event loop delays.',
    name: 'nodejs_eventloop_lag_stddev_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.00039107509699205724,
        labels: {
          serviceId: 'type4',
          workerId: 1
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'The 50th percentile of the recorded event loop delays.',
    name: 'nodejs_eventloop_lag_p50_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.011026431,
        labels: {
          serviceId: 'type4',
          workerId: 1
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'The 90th percentile of the recorded event loop delays.',
    name: 'nodejs_eventloop_lag_p90_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.011542527,
        labels: {
          serviceId: 'type4',
          workerId: 1
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'The 99th percentile of the recorded event loop delays.',
    name: 'nodejs_eventloop_lag_p99_seconds',
    type: 'gauge',
    values: [
      {
        value: 0.011739135,
        labels: {
          serviceId: 'type4',
          workerId: 1
        }
      }
    ],
    aggregator: 'average'
  },
  {
    help: 'Number of active resources that are currently keeping the event loop alive, grouped by async resource type.',
    name: 'nodejs_active_resources',
    type: 'gauge',
    values: [
      {
        value: 11,
        labels: {
          type: 'MessagePort',
          serviceId: 'type4',
          workerId: 1
        }
      },
      {
        value: 1,
        labels: {
          type: 'Immediate',
          serviceId: 'type4',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total number of active resources.',
    name: 'nodejs_active_resources_total',
    type: 'gauge',
    values: [
      {
        value: 12,
        labels: {
          serviceId: 'type4',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Number of active libuv handles grouped by handle type. Every handle type is C++ class name.',
    name: 'nodejs_active_handles',
    type: 'gauge',
    values: [
      {
        value: 11,
        labels: {
          type: 'MessagePort',
          serviceId: 'type4',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total number of active handles.',
    name: 'nodejs_active_handles_total',
    type: 'gauge',
    values: [
      {
        value: 11,
        labels: {
          serviceId: 'type4',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Number of active libuv requests grouped by request type. Every request type is C++ class name.',
    name: 'nodejs_active_requests',
    type: 'gauge',
    values: [],
    aggregator: 'sum'
  },
  {
    help: 'Total number of active requests.',
    name: 'nodejs_active_requests_total',
    type: 'gauge',
    values: [
      {
        value: 0,
        labels: {
          serviceId: 'type4',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Process heap size from Node.js in bytes.',
    name: 'nodejs_heap_size_total_bytes',
    type: 'gauge',
    values: [
      {
        value: 77365248,
        labels: {
          serviceId: 'type4',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Process heap size used from Node.js in bytes.',
    name: 'nodejs_heap_size_used_bytes',
    type: 'gauge',
    values: [
      {
        value: 44498312,
        labels: {
          serviceId: 'type4',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Node.js external memory size in bytes.',
    name: 'nodejs_external_memory_bytes',
    type: 'gauge',
    values: [
      {
        value: 5239356,
        labels: {
          serviceId: 'type4',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Process heap space size total from Node.js in bytes.',
    name: 'nodejs_heap_space_size_total_bytes',
    type: 'gauge',
    values: [
      {
        value: 0,
        labels: {
          space: 'read_only',
          serviceId: 'type4',
          workerId: 1
        }
      },
      {
        value: 33554432,
        labels: {
          space: 'new',
          serviceId: 'type4',
          workerId: 1
        }
      },
      {
        value: 34308096,
        labels: {
          space: 'old',
          serviceId: 'type4',
          workerId: 1
        }
      },
      {
        value: 2359296,
        labels: {
          space: 'code',
          serviceId: 'type4',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared',
          serviceId: 'type4',
          workerId: 1
        }
      },
      {
        value: 4259840,
        labels: {
          space: 'trusted',
          serviceId: 'type4',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'new_large_object',
          serviceId: 'type4',
          workerId: 1
        }
      },
      {
        value: 2883584,
        labels: {
          space: 'large_object',
          serviceId: 'type4',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'code_large_object',
          serviceId: 'type4',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared_large_object',
          serviceId: 'type4',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'trusted_large_object',
          serviceId: 'type4',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Process heap space size used from Node.js in bytes.',
    name: 'nodejs_heap_space_size_used_bytes',
    type: 'gauge',
    values: [
      {
        value: 0,
        labels: {
          space: 'read_only',
          serviceId: 'type4',
          workerId: 1
        }
      },
      {
        value: 2959256,
        labels: {
          space: 'new',
          serviceId: 'type4',
          workerId: 1
        }
      },
      {
        value: 32976744,
        labels: {
          space: 'old',
          serviceId: 'type4',
          workerId: 1
        }
      },
      {
        value: 1873600,
        labels: {
          space: 'code',
          serviceId: 'type4',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared',
          serviceId: 'type4',
          workerId: 1
        }
      },
      {
        value: 3972024,
        labels: {
          space: 'trusted',
          serviceId: 'type4',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'new_large_object',
          serviceId: 'type4',
          workerId: 1
        }
      },
      {
        value: 2718848,
        labels: {
          space: 'large_object',
          serviceId: 'type4',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'code_large_object',
          serviceId: 'type4',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared_large_object',
          serviceId: 'type4',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'trusted_large_object',
          serviceId: 'type4',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Process heap space size available from Node.js in bytes.',
    name: 'nodejs_heap_space_size_available_bytes',
    type: 'gauge',
    values: [
      {
        value: 0,
        labels: {
          space: 'read_only',
          serviceId: 'type4',
          workerId: 1
        }
      },
      {
        value: 13535336,
        labels: {
          space: 'new',
          serviceId: 'type4',
          workerId: 1
        }
      },
      {
        value: 713320,
        labels: {
          space: 'old',
          serviceId: 'type4',
          workerId: 1
        }
      },
      {
        value: 43328,
        labels: {
          space: 'code',
          serviceId: 'type4',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared',
          serviceId: 'type4',
          workerId: 1
        }
      },
      {
        value: 212448,
        labels: {
          space: 'trusted',
          serviceId: 'type4',
          workerId: 1
        }
      },
      {
        value: 16777216,
        labels: {
          space: 'new_large_object',
          serviceId: 'type4',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'large_object',
          serviceId: 'type4',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'code_large_object',
          serviceId: 'type4',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'shared_large_object',
          serviceId: 'type4',
          workerId: 1
        }
      },
      {
        value: 0,
        labels: {
          space: 'trusted_large_object',
          serviceId: 'type4',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Node.js version info.',
    name: 'nodejs_version_info',
    type: 'gauge',
    values: [
      {
        value: 1,
        labels: {
          version: 'v22.12.0',
          major: 22,
          minor: 12,
          patch: 0,
          serviceId: 'type4',
          workerId: 1
        }
      }
    ],
    aggregator: 'first'
  },
  {
    name: 'nodejs_gc_duration_seconds',
    help: 'Garbage collection duration by kind, one of major, minor, incremental or weakcb.',
    type: 'histogram',
    values: [],
    aggregator: 'sum'
  },
  {
    help: 'The event loop utilization as a fraction of the loop time. 1 is fully utilized, 0 is fully idle.',
    name: 'nodejs_eventloop_utilization',
    type: 'gauge',
    values: [
      {
        value: 0.019634691729692292,
        labels: {
          serviceId: 'type4',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'The process CPU percent usage.',
    name: 'process_cpu_percent_usage',
    type: 'gauge',
    values: [
      {
        value: 57.66,
        labels: {
          serviceId: 'type4',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total user CPU time spent in seconds for the current thread.',
    name: 'thread_cpu_user_system_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.019477,
        labels: {
          serviceId: 'type4',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total system CPU time spent in seconds for the current thread.',
    name: 'thread_cpu_system_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.008555,
        labels: {
          serviceId: 'type4',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'The thread CPU percent usage.',
    name: 'thread_cpu_percent_usage',
    type: 'gauge',
    values: [
      {
        value: 1.1238290702286227,
        labels: {
          serviceId: 'type4',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Total user and system CPU time spent in seconds for the current threads.',
    name: 'thread_cpu_seconds_total',
    type: 'counter',
    values: [
      {
        value: 0.028032,
        labels: {
          serviceId: 'type4',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    name: 'http_request_summary_seconds',
    help: 'request duration in seconds summary for all requests',
    type: 'summary',
    values: [
      {
        labels: {
          quantile: 0.01,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4',
          workerId: 1
        },
        value: 0.000471792
      },
      {
        labels: {
          quantile: 0.05,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4',
          workerId: 1
        },
        value: 0.000471792
      },
      {
        labels: {
          quantile: 0.5,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4',
          workerId: 1
        },
        value: 0.001589521
      },
      {
        labels: {
          quantile: 0.9,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4',
          workerId: 1
        },
        value: 0.00270725
      },
      {
        labels: {
          quantile: 0.95,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4',
          workerId: 1
        },
        value: 0.00270725
      },
      {
        labels: {
          quantile: 0.99,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4',
          workerId: 1
        },
        value: 0.00270725
      },
      {
        labels: {
          quantile: 0.999,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4',
          workerId: 1
        },
        value: 0.00270725
      },
      {
        metricName: 'http_request_summary_seconds_sum',
        labels: {
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4',
          workerId: 1
        },
        value: 0.003179042
      },
      {
        metricName: 'http_request_summary_seconds_count',
        labels: {
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4',
          workerId: 1
        },
        value: 2
      }
    ],
    aggregator: 'sum'
  },
  {
    name: 'http_request_duration_seconds',
    help: 'request duration in seconds histogram for all requests',
    type: 'histogram',
    values: [
      {
        value: 2,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.005,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4',
          workerId: 1
        }
      },
      {
        value: 2,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.01,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4',
          workerId: 1
        }
      },
      {
        value: 2,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.025,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4',
          workerId: 1
        }
      },
      {
        value: 2,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.05,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4',
          workerId: 1
        }
      },
      {
        value: 2,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.1,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4',
          workerId: 1
        }
      },
      {
        value: 2,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.25,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4',
          workerId: 1
        }
      },
      {
        value: 2,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 0.5,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4',
          workerId: 1
        }
      },
      {
        value: 2,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 1,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4',
          workerId: 1
        }
      },
      {
        value: 2,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 2.5,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4',
          workerId: 1
        }
      },
      {
        value: 2,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 5,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4',
          workerId: 1
        }
      },
      {
        value: 2,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: 10,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4',
          workerId: 1
        }
      },
      {
        value: 2,
        metricName: 'http_request_duration_seconds_bucket',
        exemplar: null,
        labels: {
          le: '+Inf',
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4',
          workerId: 1
        }
      },
      {
        value: 0.003811084,
        metricName: 'http_request_duration_seconds_sum',
        labels: {
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4',
          workerId: 1
        }
      },
      {
        value: 2,
        metricName: 'http_request_duration_seconds_count',
        labels: {
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    name: 'http_request_all_summary_seconds',
    help: 'request duration in seconds histogram for all requests',
    type: 'summary',
    values: [
      {
        labels: {
          quantile: 0.01,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4',
          workerId: 1
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.05,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4',
          workerId: 1
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.5,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4',
          workerId: 1
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.9,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4',
          workerId: 1
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.95,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4',
          workerId: 1
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.99,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4',
          workerId: 1
        },
        value: 0
      },
      {
        labels: {
          quantile: 0.999,
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4',
          workerId: 1
        },
        value: 0
      },
      {
        metricName: 'http_request_all_summary_seconds_sum',
        labels: {
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4',
          workerId: 1
        },
        value: 0
      },
      {
        metricName: 'http_request_all_summary_seconds_count',
        labels: {
          method: 'GET',
          status_code: 200,
          telemetry_id: 'unknown',
          serviceId: 'type4',
          workerId: 1
        },
        value: 0
      }
    ],
    aggregator: 'sum'
  },
  {
    name: 'http_request_all_duration_seconds',
    help: 'request duration in seconds summary for all requests',
    type: 'histogram',
    values: [],
    aggregator: 'sum'
  },
  {
    help: 'Number of http cache hits',
    name: 'http_cache_hit_count',
    type: 'counter',
    values: [
      {
        value: 0,
        labels: {
          serviceId: 'type4',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  },
  {
    help: 'Number of http cache misses',
    name: 'http_cache_miss_count',
    type: 'counter',
    values: [
      {
        value: 0,
        labels: {
          serviceId: 'type4',
          workerId: 1
        }
      }
    ],
    aggregator: 'sum'
  }
] as Metric[] // FIXME: remove the cast once this is merged (https://github.com/platformatic/platformatic/pull/3979)
