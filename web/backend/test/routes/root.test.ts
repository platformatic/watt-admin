import test from 'node:test'
import assert from 'node:assert'
import { getServer, startWatt } from '../helper.ts'

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

  const services = await server.inject({
    url: `/runtimes/${runtimePid}/services`
  })
  assert.strictEqual(services.statusCode, 200, 'services endpoint')
  const servicesJson = services.json()
  assert.strictEqual(servicesJson.production, true)
  assert.strictEqual(servicesJson.entrypoint, 'composer')
  assert.strictEqual(typeof servicesJson.applications[0].localUrl, 'string')
  assert.strictEqual(typeof servicesJson.applications[0].entrypoint, 'boolean')

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

  assert.strictEqual(server.loaded.mode, undefined, 'empty mode')
  const recordEmpty = await server.inject({ url: `/record/${runtimePid}`, method: 'POST', body: { mode: '', profile: '' } })
  assert.strictEqual(recordEmpty.statusCode, 400)

  const recordStart = await server.inject({ url: `/record/${runtimePid}`, method: 'POST', body: { mode: 'start', profile: 'cpu' } })
  assert.strictEqual(server.loaded.type, 'cpu', 'cpu mode')
  assert.strictEqual(server.loaded.mode, 'start', 'start mode')
  assert.strictEqual(recordStart.statusCode, 200)

  const recordStop = await server.inject({ url: `/record/${runtimePid}`, method: 'POST', body: { mode: 'stop', profile: 'cpu' } })
  assert.strictEqual(server.loaded.type, 'cpu', 'cpu mode')
  assert.strictEqual(server.loaded.mode, 'stop', 'stop mode')
  assert.strictEqual(recordStop.statusCode, 200)

  await server.inject({ url: `/record/${runtimePid}`, method: 'POST', body: { mode: 'start', profile: 'heap' } })
  assert.strictEqual(server.loaded.type, 'heap', 'heap mode')
  await server.inject({ url: `/record/${runtimePid}`, method: 'POST', body: { mode: 'stop', profile: 'heap' } })
  assert.strictEqual(server.loaded.type, 'heap', 'heap mode')

  const restart = await server.inject({
    method: 'POST',
    url: `/runtimes/${runtimePid}/restart`,
    body: {}
  })
  assert.strictEqual(restart.statusCode, 200, 'check for restart endpoint')
})

test('record endpoint accepts outputPath parameter', async (t) => {
  await startWatt(t)
  const server = await getServer(t)
  const res = await server.inject({ url: '/runtimes?includeAdmin=true' })
  const [runtime] = res.json()
  const runtimePid = runtime.pid

  // Start recording
  await server.inject({ url: `/record/${runtimePid}`, method: 'POST', body: { mode: 'start', profile: 'cpu' } })
  assert.strictEqual(server.loaded.mode, 'start', 'start mode')

  // Stop recording with outputPath parameter - should be accepted without validation error
  const stopRes = await server.inject({
    url: `/record/${runtimePid}`,
    method: 'POST',
    body: { mode: 'stop', profile: 'cpu', outputPath: '/tmp/test-output.html' }
  })
  assert.strictEqual(stopRes.statusCode, 200, 'outputPath parameter should be accepted')
  assert.strictEqual(server.loaded.mode, 'stop', 'stop mode')
})

test('record endpoint accepts outputPath as directory path', async (t) => {
  await startWatt(t)
  const server = await getServer(t)
  const res = await server.inject({ url: '/runtimes?includeAdmin=true' })
  const [runtime] = res.json()
  const runtimePid = runtime.pid

  // Start recording first
  await server.inject({ url: `/record/${runtimePid}`, method: 'POST', body: { mode: 'start', profile: 'cpu' } })

  // Stop with outputPath as directory (no .html extension)
  const stopRes = await server.inject({
    url: `/record/${runtimePid}`,
    method: 'POST',
    body: { mode: 'stop', profile: 'cpu', outputPath: '/tmp/recordings' }
  })
  assert.strictEqual(stopRes.statusCode, 200, 'should accept directory path')
  assert.strictEqual(server.loaded.mode, 'stop', 'stop mode')
})
