import test from 'node:test'
import assert from 'node:assert'
import { getPidToLoad, getSelectableRuntimes } from '../../utils/runtimes'
import { Runtime } from '@platformatic/control'
import { SelectableRuntime } from '../../schemas'

const mockRuntimes: Runtime[] = [
  {
    pid: 1234,
    packageName: 'my-app',
    packageVersion: '1.0.0',
    url: 'http://localhost:3000'
  } as Runtime,
  {
    pid: 5678,
    packageName: 'watt-admin',
    packageVersion: '2.0.0',
    url: 'http://localhost:3001'
  } as Runtime
]

test('getSelectableRuntimes should handle empty runtimes array', () => {
  const result = getSelectableRuntimes([], true)
  assert.strictEqual(result.length, 0)
})

test('getSelectableRuntimes should exclude watt-admin when includeAdmin is false', () => {
  const result = getSelectableRuntimes(mockRuntimes, false)

  assert.strictEqual(result.length, 1)
  assert.strictEqual(result[0].packageName, 'my-app')
  assert.strictEqual(result.find(r => r.packageName === 'watt-admin'), undefined)
})

test('getSelectableRuntimes should set specific runtime as selected when SELECTED_RUNTIME is set', () => {
  const originalValue = process.env.SELECTED_RUNTIME
  process.env.SELECTED_RUNTIME = '1234'

  const result = getSelectableRuntimes(mockRuntimes, true)

  assert.strictEqual(result[0].selected, true)  // pid 1234
  assert.strictEqual(result[1].selected, false) // pid 5678

  if (originalValue === undefined) {
    delete process.env.SELECTED_RUNTIME
  } else {
    process.env.SELECTED_RUNTIME = originalValue
  }
})

test('getSelectableRuntimes should set all runtimes as selected when SELECTED_RUNTIME is not set', () => {
  const originalValue = process.env.SELECTED_RUNTIME
  delete process.env.SELECTED_RUNTIME

  const result = getSelectableRuntimes(mockRuntimes, true)

  assert.strictEqual(result[0].selected, true)
  assert.strictEqual(result[1].selected, true)

  if (originalValue !== undefined) {
    process.env.SELECTED_RUNTIME = originalValue
  }
})

test('getPidToLoad should return 0 when no selected runtime', () => {
  const result = getPidToLoad([
    { pid: 1234, selected: false },
    { pid: 5678, selected: false }
  ] as SelectableRuntime[])
  assert.strictEqual(result, 0)
})

test('getPidToLoad should return selected runtime pid', () => {
  const result = getPidToLoad([
    { pid: 1234, selected: true },
    { pid: 5678, selected: false }
  ] as SelectableRuntime[])
  assert.strictEqual(result, 1234)
})
