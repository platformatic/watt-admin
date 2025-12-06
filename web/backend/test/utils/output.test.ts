import test from 'node:test'
import assert from 'node:assert'
import { generateDefaultFilename, getUniqueFilePath } from '../../utils/output.ts'
import { writeFile, rm, mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import { tmpdir } from 'node:os'

test('generateDefaultFilename creates filename with correct format', () => {
  const filename = generateDefaultFilename()

  assert.ok(filename.startsWith('watt-admin-'), 'Filename should start with watt-admin-')
  assert.ok(filename.endsWith('.html'), 'Filename should end with .html')

  // Check date format YYYY-MM-DD
  const dateMatch = filename.match(/watt-admin-(\d{4}-\d{2}-\d{2})-(\d{2}-\d{2}-\d{2})\.html/)
  assert.ok(dateMatch, 'Filename should match expected format')

  // Verify the date is valid
  const [, datePart, timePart] = dateMatch
  const dateObj = new Date(`${datePart}T${timePart.replace(/-/g, ':')}`)
  assert.ok(!isNaN(dateObj.getTime()), 'Date should be valid')
})

test('generateDefaultFilename uses current date and time', () => {
  const before = new Date()
  const filename = generateDefaultFilename()
  const after = new Date()

  const dateMatch = filename.match(/watt-admin-(\d{4}-\d{2}-\d{2})-(\d{2}-\d{2}-\d{2})\.html/)
  assert.ok(dateMatch)

  const [, datePart, timePart] = dateMatch
  const fileDate = new Date(`${datePart}T${timePart.replace(/-/g, ':')}`)

  // File date should be between before and after (with some tolerance)
  assert.ok(fileDate >= new Date(before.getTime() - 1000), 'File date should not be before test started')
  assert.ok(fileDate <= new Date(after.getTime() + 1000), 'File date should not be after test ended')
})

test('getUniqueFilePath returns original path when file does not exist', async (t) => {
  const tempDir = join(tmpdir(), `watt-admin-test-${Date.now()}`)
  await mkdir(tempDir, { recursive: true })
  t.after(async () => {
    await rm(tempDir, { recursive: true, force: true })
  })

  const originalPath = join(tempDir, 'test-file.html')
  const uniquePath = await getUniqueFilePath(originalPath)

  assert.strictEqual(uniquePath, originalPath, 'Should return original path when file does not exist')
})

test('getUniqueFilePath appends -1 when file exists', async (t) => {
  const tempDir = join(tmpdir(), `watt-admin-test-${Date.now()}`)
  await mkdir(tempDir, { recursive: true })
  t.after(async () => {
    await rm(tempDir, { recursive: true, force: true })
  })

  const originalPath = join(tempDir, 'test-file.html')
  await writeFile(originalPath, 'existing content', 'utf8')

  const uniquePath = await getUniqueFilePath(originalPath)
  const expectedPath = join(tempDir, 'test-file-1.html')

  assert.strictEqual(uniquePath, expectedPath, 'Should append -1 when original file exists')
})

test('getUniqueFilePath increments counter for multiple existing files', async (t) => {
  const tempDir = join(tmpdir(), `watt-admin-test-${Date.now()}`)
  await mkdir(tempDir, { recursive: true })
  t.after(async () => {
    await rm(tempDir, { recursive: true, force: true })
  })

  // Create original file and first suffix
  const originalPath = join(tempDir, 'test-file.html')
  await writeFile(originalPath, 'existing content', 'utf8')
  await writeFile(join(tempDir, 'test-file-1.html'), 'existing content 1', 'utf8')

  const uniquePath = await getUniqueFilePath(originalPath)
  const expectedPath = join(tempDir, 'test-file-2.html')

  assert.strictEqual(uniquePath, expectedPath, 'Should find next available counter')
})

test('getUniqueFilePath handles nested directories', async (t) => {
  const tempDir = join(tmpdir(), `watt-admin-test-${Date.now()}`, 'nested', 'dir')
  await mkdir(tempDir, { recursive: true })
  t.after(async () => {
    await rm(join(tmpdir(), `watt-admin-test-${Date.now().toString().slice(0, -3)}`), { recursive: true, force: true }).catch(() => {})
  })

  const originalPath = join(tempDir, 'nested-file.html')
  const uniquePath = await getUniqueFilePath(originalPath)

  assert.strictEqual(uniquePath, originalPath, 'Should work with nested directories')
})

test('getUniqueFilePath preserves directory path when appending counter', async (t) => {
  const tempDir = join(tmpdir(), `watt-admin-test-${Date.now()}`)
  await mkdir(tempDir, { recursive: true })
  t.after(async () => {
    await rm(tempDir, { recursive: true, force: true })
  })

  const originalPath = join(tempDir, 'recording.html')
  await writeFile(originalPath, 'existing content', 'utf8')

  const uniquePath = await getUniqueFilePath(originalPath)

  assert.ok(uniquePath.startsWith(tempDir), 'Should preserve directory path')
  assert.ok(uniquePath.endsWith('-1.html'), 'Should append -1 before .html extension')
})
