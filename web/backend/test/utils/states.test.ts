import test from 'node:test'
import assert from 'node:assert'
import { checkRecordState } from '../../utils/states'

test('checkRecordState returns true for undefined to start transition', () => {
  const result = checkRecordState({ from: undefined, to: 'start' })
  assert.strictEqual(result, true)
})

test('checkRecordState returns true for start to stop transition', () => {
  const result = checkRecordState({ from: 'start', to: 'stop' })
  assert.strictEqual(result, true)
})

test('checkRecordState returns true for stop to start transition', () => {
  const result = checkRecordState({ from: 'stop', to: 'start' })
  assert.strictEqual(result, true)
})

test('checkRecordState returns false for invalid transitions', () => {
  const result = checkRecordState({ from: 'stop', to: 'stop' })
  assert.strictEqual(result, false)
})
