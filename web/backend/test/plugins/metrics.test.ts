import test from 'node:test'
import assert from 'node:assert'
import { getServer, startWatt } from '../helper'

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

test('metrics without runtime', async (t) => {
  const server = await getServer(t)
  assert.ok('_idleTimeout' in server.metricsInterval, 'interval for metrics are defined')
  const metricsKeys = Object.keys(server.mappedMetrics)
  assert.ok(metricsKeys.length === 0, 'mapped metrics are defined, and are empty')
})

test('metrics with runtime', async (t) => {
  await startWatt(t)
  const server = await getServer(t)

  await wait(1200)
  const metricsKeys = Object.keys(server.mappedMetrics)
  const [pid] = metricsKeys
  assert.ok(metricsKeys.length > 0, 'mapped metrics are defined, and contain values')
  assert.strictEqual(server.mappedMetrics[pid][0].pid, parseInt(pid))

  const res = await server.inject({
    method: 'GET',
    url: `/runtimes/${pid}/metrics`
  })
  assert.strictEqual(res.statusCode, 200)

  const metrics = res.json()
  const expectedNames = [
    'process_cpu_user_seconds_total',
    'process_cpu_system_seconds_total',
    'process_cpu_seconds_total',
    'process_start_time_seconds',
    'process_resident_memory_bytes',
    'nodejs_eventloop_lag_seconds',
    'nodejs_eventloop_lag_min_seconds',
    'nodejs_eventloop_lag_max_seconds',
    'nodejs_eventloop_lag_mean_seconds',
    'nodejs_eventloop_lag_stddev_seconds',
    'nodejs_eventloop_lag_p50_seconds',
    'nodejs_eventloop_lag_p90_seconds',
    'nodejs_eventloop_lag_p99_seconds',
    'nodejs_active_resources',
    'nodejs_active_resources_total',
    'nodejs_active_handles',
    'nodejs_active_handles_total',
    'nodejs_active_requests_total',
    'nodejs_heap_size_total_bytes',
    'nodejs_heap_size_used_bytes',
    'nodejs_external_memory_bytes',
    'nodejs_heap_space_size_total_bytes',
    'nodejs_heap_space_size_used_bytes',
    'nodejs_heap_space_size_available_bytes',
    'nodejs_version_info',
    'nodejs_gc_duration_seconds',
    'nodejs_eventloop_utilization',
    'process_cpu_percent_usage',
    'thread_cpu_user_system_seconds_total',
    'thread_cpu_system_seconds_total',
    'thread_cpu_percent_usage',
    'thread_cpu_seconds_total',
    'http_cache_hit_count',
    'http_cache_miss_count'
  ]
  expectedNames.forEach(expectedName => {
    // TODO: remove cast to any
    const exists = metrics.some((metric: any) => metric.name === expectedName)
    assert.ok(exists, `Expected metric: ${expectedName}`)
  })
})
