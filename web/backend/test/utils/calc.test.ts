import test from 'node:test'
import assert from 'node:assert'
import { bytesToMB } from '../../utils/calc'

test('converts 1048576 bytes to 1.00MB', () => {
  const result = bytesToMB(1048576)
  assert.strictEqual(result, 1.00)
})

test('converts 2621440 bytes to 2.50MB', () => {
  const result = bytesToMB(2621440)
  assert.strictEqual(result, 2.50)
})

test('converts 0 bytes to 0.00MB', () => {
  const result = bytesToMB(0)
  assert.strictEqual(result, 0.00)
})

test('handles small numbers correctly', () => {
  const result = bytesToMB(10000)
  assert.strictEqual(result, 0.01)
})
