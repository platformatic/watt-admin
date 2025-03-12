import test, { mock } from 'node:test'
import assert from 'node:assert'
import { Readable } from 'stream'
import { getLogsFromReadable, Log } from '../../utils/log'
import { FastifyBaseLogger } from 'fastify'

test('should parse valid JSON log lines', async () => {
  const sampleLogs = [
    JSON.stringify({
      level: 30,
      time: 1678901234567,
      pid: 123,
      hostname: 'test-host',
      msg: 'Test message 1'
    }),
    JSON.stringify({
      level: 40,
      time: 1678901234568,
      pid: 123,
      hostname: 'test-host',
      msg: 'Test message 2'
    })
  ].join('\n')

  const readable = Readable.from([sampleLogs])
  const [first, second] = await getLogsFromReadable(readable)

  assert.deepStrictEqual(first, {
    level: 30,
    time: 1678901234567,
    pid: 123,
    hostname: 'test-host',
    msg: 'Test message 1'
  })
  assert.deepStrictEqual(second, {
    level: 40,
    time: 1678901234568,
    pid: 123,
    hostname: 'test-host',
    msg: 'Test message 2'
  })
})

test('should handle invalid JSON lines', async () => {
  const mockLogger = {
    warn: () => {}
  }
  const warnSpy = mock.method(mockLogger, 'warn')

  const invalidLogs = [
    'invalid json',
    JSON.stringify({
      level: 30,
      time: 1678901234567,
      pid: 123,
      hostname: 'test-host',
      msg: 'Valid message'
    }),
    'other invalid json'
  ].join('\n')

  const readable = Readable.from([invalidLogs])
  const [result] = await getLogsFromReadable(readable, mockLogger as unknown as FastifyBaseLogger)

  assert.strictEqual(warnSpy.mock.calls.length, 2)
  assert.deepStrictEqual(result, {
    level: 30,
    time: 1678901234567,
    pid: 123,
    hostname: 'test-host',
    msg: 'Valid message'
  })
})

test('should maintain MAX_LOGS limit', async () => {
  const logs: Log[] = Array.from({ length: 1100 }, (_, i) => ({
    level: 30,
    time: 1678901234567 + i,
    pid: 123,
    hostname: 'test-host',
    msg: `Message ${i}`
  }))

  const logsString = logs.map(log => JSON.stringify(log)).join('\n')
  const readable = Readable.from([logsString])
  const result = await getLogsFromReadable(readable)

  assert.strictEqual(result.length, 1000, 'Should not exceed MAX_LOGS')

  const lastLog = result[999]
  assert.strictEqual(lastLog.msg, 'Message 1099', 'Should keep most recent logs')
  const firstLog = result[0]
  assert.strictEqual(firstLog.msg, 'Message 100', 'Should remove oldest logs')
})

test('should handle empty input', async () => {
  const readable = Readable.from([''])
  const result = await getLogsFromReadable(readable)
  assert.strictEqual(result.length, 0)
})
