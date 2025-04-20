import test from 'node:test'
import assert from 'node:assert'
import { getServer, startWatt, loadMetrics } from '../helper'
import type { Log } from '../../utils/log'

test('no runtime running', async (t) => {
  const server = await getServer(t)
  const res = await server.inject({
    url: '/runtimes?includeAdmin=true'
  })
  assert.strictEqual(res.statusCode, 200)
  assert.deepStrictEqual(res.json(), [], 'with no runtime running')

  const services = await server.inject({
    url: '/runtimes/42/services'
  })
  assert.strictEqual(services.statusCode, 500)
  assert.ok(services.json().message.includes('connect ENOENT'), 'unable to list services due to no runtime available')

  const health = await server.inject({
    url: '/runtimes/42/health'
  })
  assert.strictEqual(health.statusCode, 200)
  assert.deepEqual(health.json(), { status: 'KO' })
})

test('runtime is running', async (t) => {
  await startWatt(t)
  const server = await getServer(t)
  const res = await server.inject({
    url: '/runtimes?includeAdmin=true'
  })
  assert.strictEqual(res.statusCode, 200, 'runtimes endpoint')
  const [runtime] = res.json()
  const runtimePid = runtime.pid
  assert.strictEqual(runtime.packageName, '@platformatic/watt-admin')
  assert.strictEqual(typeof runtimePid, 'number')

  const health = await server.inject({
    url: `/runtimes/${runtimePid}/health`
  })
  assert.strictEqual(health.statusCode, 200)
  assert.deepEqual(health.json(), { status: 'OK' })

  const metricsEmpty = await server.inject({
    url: `/runtimes/${runtimePid}/metrics`
  })
  assert.strictEqual(metricsEmpty.statusCode, 200, 'metrics endpoint')
  assert.deepEqual(metricsEmpty.json(), { dataCpu: [], dataLatency: [], dataMem: [], dataReq: [] }, 'metrics result is empty')

  const services = await server.inject({
    url: `/runtimes/${runtimePid}/services`
  })
  assert.strictEqual(services.statusCode, 200, 'services endpoint')
  const servicesJson = services.json()
  assert.strictEqual(servicesJson.production, true)
  assert.strictEqual(servicesJson.entrypoint, 'composer')
  assert.strictEqual(typeof servicesJson.services[0].localUrl, 'string')
  assert.strictEqual(typeof servicesJson.services[0].entrypoint, 'boolean')

  await loadMetrics(server)
  const metrics = await server.inject({
    url: `/runtimes/${runtimePid}/metrics`
  })
  assert.strictEqual(metrics.statusCode, 200, 'metrics endpoint')
  const metricsJson = metrics.json()
  assert.ok('dataCpu' in metricsJson)
  assert.ok('dataLatency' in metricsJson)
  assert.ok('dataMem' in metricsJson)
  assert.notDeepEqual(metricsJson, {}, 'metrics are not empty after the interval')

  const serviceMetrics = await server.inject({
    url: `/runtimes/${runtimePid}/metrics/backend`
  })
  assert.strictEqual(serviceMetrics.statusCode, 200, 'service metrics endpoint')
  assert.notDeepEqual(serviceMetrics.json(), [], 'service metrics are not empty for a valid service name')

  const serviceMetricsEmpty = await server.inject({
    url: `/runtimes/${runtimePid}/metrics/fantozzi`
  })
  assert.strictEqual(serviceMetricsEmpty.statusCode, 200, 'service metrics endpoint')
  assert.deepEqual(serviceMetricsEmpty.json(), { dataCpu: [], dataLatency: [], dataMem: [], dataReq: [] }, 'service metrics are empty for an invalid service name')

  const serviceOpenapi = await server.inject({
    url: `/runtimes/${runtimePid}/openapi/backend`
  })
  assert.strictEqual(serviceOpenapi.statusCode, 200, 'service OpenAPI endpoint')
  const json = serviceOpenapi.json()
  assert.strictEqual(json.openapi, '3.0.3')
  assert.deepEqual(json.info, {
    title: 'Platformatic',
    description: 'This is a service built on top of Platformatic',
    version: '1.0.0'
  })
  assert.deepEqual(json.servers, [{ url: '/' }])
  assert.deepEqual(json.paths['/runtimes']['get']['parameters'], [
    {
      schema: {
        type: 'boolean',
        default: false,
      },
      in: 'query',
      name: 'includeAdmin',
      required: false,
    },
  ])

  const serviceInvalidOpenapi = await server.inject({
    url: `/runtimes/${runtimePid}/openapi/fantozzi`
  })
  assert.strictEqual(serviceInvalidOpenapi.statusCode, 500, 'service OpenAPI endpoint')
  assert.strictEqual(typeof serviceInvalidOpenapi.json().code, 'string')

  const logs = await server.inject({
    url: `/runtimes/${runtimePid}/logs`
  })
  assert.strictEqual(logs.statusCode, 200)

  const result = logs.json<Log[]>()
  assert.ok(result.some(({ msg }) => msg.includes('Starting the service')))
  assert.ok(result.some(({ msg }) => msg.includes('Started the service')))
  assert.ok(result.some(({ msg }) => msg.includes('Server listening at')))
  assert.ok(result.some(({ msg }) => msg.includes('Platformatic is now listening')))

  const [{ level, time, pid, hostname }] = result
  assert.ok(typeof level, 'number')
  assert.ok(typeof time, 'number')
  assert.ok(typeof pid, 'number')
  assert.ok(typeof hostname, 'string')

  const restart = await server.inject({
    method: 'POST',
    url: `/runtimes/${pid}/restart`,
    body: {}
  })
  assert.strictEqual(restart.statusCode, 200, 'check for restart endpoint')
})
