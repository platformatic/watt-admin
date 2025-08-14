import test from 'node:test'
import assert from 'node:assert'
import { writeFile, unlink } from 'fs/promises'
import { fileExists } from '../../utils/files'

test('fileExists returns true for existing file', async () => {
  const testFile = 'test-file.txt'
  await writeFile(testFile, 'test content')

  const result = await fileExists(testFile)
  assert.strictEqual(result, true)

  await unlink(testFile)
})

test('fileExists returns false for non-existing file', async () => {
  const result = await fileExists('non-existent-file.txt')
  assert.strictEqual(result, false)
})

test('fileExists handles empty string path', async () => {
  const result = await fileExists('')
  assert.strictEqual(result, false)
})
