import test from 'node:test'
import assert from 'node:assert'
import { getServer, startWatt, loadMetrics } from '../helper'
import { MetricsResponse } from '../../schemas'

test('metrics without runtime', async (t) => {
  const server = await getServer(t)
  assert.ok('_idleTimeout' in server.metricsInterval, 'interval for metrics are defined')
  const metricsKeys = Object.keys(server.mappedMetrics)
  assert.ok(metricsKeys.length === 0, 'mapped metrics are defined, and are empty')
})

test('metrics with runtime', async (t) => {
  // Collecting metrics requires no parallelism in tests
  // TODO: fix it and make tests parallel again
  await startWatt(t)
  const server = await getServer(t)
  await loadMetrics(server)
  const [pid] = Object.keys(server.mappedMetrics)
  const servicePID = parseInt(pid)
  assert.ok(Array.isArray(server.mappedMetrics[servicePID].aggregated.dataCpu))

  const res = await server.inject({
    url: `/runtimes/${pid}/metrics`
  })
  assert.strictEqual(res.statusCode, 200)

  const metrics = res.json<MetricsResponse>()
  assert.ok(metrics.dataCpu[0].cpu >= 0)
  assert.ok(metrics.dataCpu[0].eventLoop >= 0)
  assert.ok(new Date(metrics.dataCpu[0].date) <= new Date())

  assert.ok(metrics.dataLatency[0].p90 >= 0)
  assert.ok(metrics.dataLatency[0].p95 >= 0)
  assert.ok(metrics.dataLatency[0].p99 >= 0)
  assert.ok(new Date(metrics.dataLatency[0].date) <= new Date())

  assert.ok(metrics.dataMem[0].rss >= 0)
  assert.ok(metrics.dataMem[0].totalHeap >= 0)
  assert.ok(metrics.dataMem[0].usedHeap >= 0)
  assert.ok(metrics.dataMem[0].newSpace >= 0)
  assert.ok(metrics.dataMem[0].oldSpace >= 0)
  assert.ok(new Date(metrics.dataMem[0].date) <= new Date())

  assert.ok(metrics.dataReq[0].count >= 0)
  assert.ok(new Date(metrics.dataReq[0].date) <= new Date())

  const backendMetrics = await server.inject({
    url: `/runtimes/${pid}/metrics/backend`
  })
  assert.strictEqual(backendMetrics.statusCode, 200)
  const response = backendMetrics.json()
  assert.ok('dataCpu' in response)
  assert.ok('dataLatency' in response)
  assert.ok('dataMem' in response)
  assert.ok('dataReq' in response)

  assert.equal(metrics.dataMem[0].rss, response.dataMem[0].rss)
})
