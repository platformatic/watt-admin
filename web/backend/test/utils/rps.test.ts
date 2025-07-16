import test from 'node:test'
import assert from 'node:assert'
import { RequestDataPoint } from '../../schemas'
import { getReqRps } from '../../utils/rps'

test('getReqRps calculates correct RPS when count increases', () => {
  const previousRequests: RequestDataPoint[] = [{
    date: '2024-01-01T00:00:00.000Z',
    count: 100,
    rps: 0
  }]
  const currentCount = 150

  const result = getReqRps(currentCount, previousRequests)
  assert.strictEqual(result, 50)
})

test('getReqRps calculates correct RPS when count decreases', () => {
  const previousRequests: RequestDataPoint[] = [{
    date: '2024-01-01T00:00:00.000Z',
    count: 150,
    rps: 0
  }]
  const currentCount = 100

  const result = getReqRps(currentCount, previousRequests)
  assert.strictEqual(result, 50)
})

test('getReqRps returns current count when no previous requests exist', () => {
  const previousRequests: RequestDataPoint[] = []
  const currentCount = 100

  const result = getReqRps(currentCount, previousRequests)
  assert.strictEqual(result, 100)
})

test('getReqRps handles zero current count', () => {
  const previousRequests: RequestDataPoint[] = [{
    date: '2024-01-01T00:00:00.000Z',
    count: 50,
    rps: 0
  }]
  const currentCount = 0

  const result = getReqRps(currentCount, previousRequests)
  assert.strictEqual(result, 50)
})

test('getReqRps handles zero previous count', () => {
  const previousRequests: RequestDataPoint[] = [{
    date: '2024-01-01T00:00:00.000Z',
    count: 0,
    rps: 0
  }]
  const currentCount = 50

  const result = getReqRps(currentCount, previousRequests)
  assert.strictEqual(result, 50)
})

test('getReqRps uses most recent request count from array', () => {
  const previousRequests: RequestDataPoint[] = [
    {
      date: '2024-01-01T00:00:00.000Z',
      count: 50,
      rps: 0
    },
    {
      date: '2024-01-01T00:00:01.000Z',
      count: 75,
      rps: 0
    },
    {
      date: '2024-01-01T00:00:02.000Z',
      count: 100,
      rps: 0
    }
  ]
  const currentCount = 150

  const result = getReqRps(currentCount, previousRequests)
  assert.strictEqual(result, 50)
})

test('getReqRps handles request spikes and dips correctly', () => {
  const previousRequests: RequestDataPoint[] = [
    { date: '2024-01-01T00:00:00.000Z', count: 100, rps: 10 },
    { date: '2024-01-01T00:00:01.000Z', count: 200, rps: 100 },
    { date: '2024-01-01T00:00:02.000Z', count: 150, rps: 0 }
  ]

  let result = getReqRps(300, previousRequests)
  assert.strictEqual(result, 150)

  result = getReqRps(100, previousRequests)
  assert.strictEqual(result, 50)
})
