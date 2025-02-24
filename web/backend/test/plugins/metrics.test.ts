import test from 'node:test'
import assert from 'node:assert'
import { getServer, startWatt } from '../helper'
import { Metric } from '@platformatic/control'

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
  const servicePID = parseInt(pid)
  assert.ok(metricsKeys.length > 0, 'mapped metrics are defined, and contain values')
  assert.strictEqual(server.mappedMetrics[servicePID][0].pid, servicePID)

  const res = await server.inject({
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
    const exists = metrics.some((metric: Metric) => metric.name === expectedName)
    assert.ok(exists, `Expected metric: ${expectedName}`)
  })

  const logs = await server.inject({
    url: `/runtimes/${pid}/logs`
  })
  assert.strictEqual(logs.statusCode, 200)

  const [starting, listening, started, platformatic] = logs.body.trim().split('\n')
  assert.ok(starting.includes('Starting the service'))
  assert.ok(listening.includes('Server listening at http://127.0.0.1'))
  assert.ok(started.includes('Started the service'))
  assert.ok(platformatic.includes('Platformatic is now listening at http://127.0.0.1'))
})
