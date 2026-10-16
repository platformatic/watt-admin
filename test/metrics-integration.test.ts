import assert from 'node:assert/strict'
import { join } from 'node:path'
import { mock, test } from 'node:test'
import { RuntimeApiClient } from '@platformatic/control'
import { create } from '@platformatic/runtime'
import config from './fixtures/metrics/watt.config.js'

test('startup enables metrics on a live Watt runtime without restarting workers', async t => {
  // Keep the dashboard isolated while exercising startup against the real management API.
  mock.module('@platformatic/runtime', {
    namedExports: {
      create: async () => ({ start: async () => ({ 'composer:0': 'http://127.0.0.1:4042' }) })
    }
  })
  t.after(() => mock.restoreAll())
  const originalEnv = { ...process.env }
  t.after(() => { process.env = originalEnv })
  const { start } = await import('../lib/start.js')

  for (const initialMetrics of [false, undefined, {
    enabled: false,
    port: 0,
    hostname: '127.0.0.1',
    labels: { environment: 'test' }
  }]) {
    await t.test(JSON.stringify(initialMetrics) ?? 'omitted', async t => {
      const runtime = await create(join(import.meta.dirname, 'fixtures/metrics'), {
        ...config,
        logger: { level: 'silent' },
        metrics: initialMetrics
      }, { setupSignals: false })
      t.after(() => runtime.close())
      const urls = await runtime.start()

      const client = new RuntimeApiClient({ socket: runtime.getManagementApiUrl() })
      t.after(() => client.close())
      const workers = await runtime.getWorkers()
      const initialConfig = runtime.getRuntimeConfig().metrics
      await assert.rejects(client.getRuntimeMetrics(process.pid), { code: 'PLT_CTR_FAILED_TO_GET_RUNTIME_METRICS' })

      await start(client, process.pid)

      const previousOptions = typeof initialConfig === 'boolean' ? {} : initialConfig
      assert.deepEqual(runtime.getRuntimeConfig().metrics, { ...previousOptions, enabled: true })
      assert.deepEqual(await runtime.getWorkers(), workers)
      const response = await fetch(`${urls['api:0']}/hello`)
      assert.deepEqual(await response.json(), { hello: 'world' })
      const metrics = await client.getRuntimeMetrics(process.pid, { format: 'json' })
      assert.ok(metrics.some(metric => metric.name === 'process_resident_memory_bytes'))
      assert.ok(metrics.some(metric => metric.values.some(value => value.labels.applicationId === 'api')))
      const requestMetric = metrics.find(metric => metric.name === 'http_request_all_duration_seconds')
      assert.ok(requestMetric?.values.some(value => value.metricName === 'http_request_all_duration_seconds_count' && value.value > 0))

      // Reopening the dashboard must not change the worker identities or clear collection.
      await start(client, process.pid)
      assert.deepEqual(await runtime.getWorkers(), workers)
      const repeatedMetrics = await client.getRuntimeMetrics(process.pid, { format: 'json' })
      assert.deepEqual(repeatedMetrics.find(metric => metric.name === requestMetric.name), requestMetric)
    })
  }
})
