import test from 'node:test'
import assert from 'node:assert'
import { getServer, startWatt } from '../helper'

test('websocket logs', async (t) => {
  const port = await startWatt(t)
  const server = await getServer(t)

  const res = await server.inject({
    url: '/runtimes?includeAdmin=true'
  })
  assert.strictEqual(res.statusCode, 200, 'runtimes endpoint')
  const [runtime] = res.json()
  const runtimePid = runtime.pid

  const WebSocket = require('ws')
  const ws = new WebSocket(`ws://127.0.0.1:${port}/api/runtimes/${runtimePid}/logs/ws`)

  const logs: {
    level: number,
    time: number,
    pid: number,
    hostname: string,
    msg: string
  }[] = []
  await new Promise((resolve, reject) => {
    const ms = 2000
    const timeout = setTimeout(() => reject(new Error('WebSocket connection timed out')), ms)

    ws.on('open', () => {
      clearTimeout(timeout)

      setTimeout(() => {
        ws.close()
        resolve(null)
      }, ms - 1)
    })

    ws.on('error', (err: unknown) => {
      clearTimeout(timeout)
      reject(err)
    })

    ws.on('message', (data: string) => logs.push(JSON.parse(data.toString())))
  })

  assert.ok(logs.some(({ msg }) => msg.includes('Starting the service')))
  assert.ok(logs.some(({ msg }) => msg.includes('Started the service')))
  assert.ok(logs.some(({ msg }) => msg.includes('Server listening at')))
  assert.ok(logs.some(({ msg }) => msg.includes('Platformatic is now listening')))

  const [{ level, time, pid, hostname }] = logs
  assert.ok(typeof level, 'number')
  assert.ok(typeof time, 'number')
  assert.ok(typeof pid, 'number')
  assert.ok(typeof hostname, 'string')
})
