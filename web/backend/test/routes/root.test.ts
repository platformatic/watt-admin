import test from 'node:test'
import assert from 'node:assert'
import { getServer, startWatt } from '../helper'

test('no runtime running', async (t) => {
  const server = await getServer(t)
  const res = await server.inject({
    method: 'GET',
    url: '/runtimes'
  })
  assert.strictEqual(res.statusCode, 200)
  assert.deepStrictEqual(res.json(), [], 'with no runtime running')
})

test('runtime is running', async (t) => {
  await startWatt(t)
  const server = await getServer(t)
  const res = await server.inject({
    method: 'GET',
    url: '/runtimes'
  })
  assert.strictEqual(res.statusCode, 200)
  const [runtime] = res.json()
  assert.strictEqual(typeof runtime.packageName, 'string')
  assert.strictEqual(typeof runtime.pid, 'number')
  assert.strictEqual(runtime.packageVersion, null)
})
