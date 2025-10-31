import { RuntimeApiClient } from '@platformatic/control'
import { describe, it, beforeEach, afterEach, mock } from 'node:test'
import assert from 'node:assert'
import { EventEmitter } from 'node:events'
import * as util from 'util'
import type { CloseWithGraceAsyncCallback } from 'close-with-grace'

interface MockServer {
  started: boolean
  start(): Promise<string>
  close(): Promise<void>
}

interface RequestOptions {
  method?: string
  headers?: Record<string, string>
  body: string
}

interface RequestResponse {
  statusCode: number
  body: {
    dump(): Promise<void>
    text(): Promise<string>
  }
}

interface ParseArgsResult {
  values: {
    port?: string
    record?: boolean
  }
}

interface ExecResult {
  stdout: string
  stderr: string
}

interface MockFunction<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): ReturnType<T>
  mock: {
    calls: Array<{ arguments: Parameters<T> }>
  }
}

interface CloseWithGraceMockFunction extends MockFunction<(options: unknown, handler: CloseWithGraceAsyncCallback) => EventEmitter> {
  handler?: CloseWithGraceAsyncCallback
}

describe('start', () => {
  const mockServer: MockServer = {
    started: false,
    start: async function () {
      this.started = true
      return 'http://localhost:3000'
    },
    close: async function () {
      this.started = false
    }
  }

  let requestMock: MockFunction<(url: string, options: RequestOptions) => Promise<RequestResponse>>
  let closeWithGraceMock: CloseWithGraceMockFunction
  let execAsyncMock: MockFunction<(command: string) => Promise<ExecResult>>
  let createMock: MockFunction<() => Promise<MockServer>>
  let parseArgsResult: ParseArgsResult

  beforeEach(() => {
    mockServer.started = false
    delete process.env.SELECTED_RUNTIME
    delete process.env.PORT

    // Default parseArgs result
    parseArgsResult = { values: {} }

    // Reset mocks
    requestMock = mock.fn(async (_: string, options: RequestOptions): Promise<RequestResponse> => {
      const body = JSON.parse(options.body)
      if (body.mode === 'start' || body.mode === 'stop') {
        return {
          statusCode: 200,
          body: {
            dump: async () => {},
            text: async () => 'success'
          }
        }
      }
      return {
        statusCode: 500,
        body: {
          dump: async () => {},
          text: async () => 'error'
        }
      }
    })

    closeWithGraceMock = mock.fn((_: unknown, handler: CloseWithGraceAsyncCallback): EventEmitter => {
      closeWithGraceMock.handler = handler
      return new EventEmitter()
    })

    execAsyncMock = mock.fn(async (_: string): Promise<ExecResult> => ({
      stdout: '',
      stderr: ''
    }))

    createMock = mock.fn(async (): Promise<MockServer> => mockServer)

    // Setup module mocks
    mock.module('@platformatic/runtime', {
      namedExports: {
        create: createMock
      }
    })

    mock.module('undici', {
      namedExports: {
        request: requestMock
      }
    })

    mock.module('close-with-grace', {
      defaultExport: closeWithGraceMock
    })

    mock.module('node:child_process', {
      namedExports: {
        exec: (command: string, callback: (error: null, data: ExecResult) => void) => {
          execAsyncMock(command)
          callback(null, { stdout: '', stderr: '' })
        }
      }
    })

    mock.module('util', {
      namedExports: {
        ...util,
        parseArgs: (): ParseArgsResult => parseArgsResult
      }
    })
  })

  afterEach(() => {
    mock.restoreAll()
  })

  it('should start the server with the selected runtime', async () => {
    // Set parseArgs result for this test
    parseArgsResult = { values: {} }

    const { start } = await import('../lib/start.js')

    const client = new RuntimeApiClient()
    const testRuntime = 'test-runtime-123'
    await start(client, testRuntime)

    assert.strictEqual(process.env.SELECTED_RUNTIME, testRuntime, 'SELECTED_RUNTIME should be set')
    assert.strictEqual(mockServer.started, true, 'Server should be started')
    assert.strictEqual(createMock.mock.calls.length, 1, 'create should be called once')

    // Set parseArgs result for this test to enable recording
    parseArgsResult = { values: { record: true } }

    const pid = 'test-runtime-record'
    await start(client, pid)

    // 1. Check if the server was started
    assert.strictEqual(mockServer.started, true, 'Server should be started')

    // 2. Check if the 'start' record request was made
    assert.strictEqual(requestMock.mock.calls.length, 1, 'Should have made one request to start recording')
    const [startUrl, startOptions] = requestMock.mock.calls[0].arguments
    assert.strictEqual(startUrl, `http://localhost:3000/api/record/${pid}`)
    assert.deepStrictEqual(JSON.parse(startOptions.body), { mode: 'start', profile: 'cpu' })

    // 3. Check if closeWithGrace was configured
    assert.strictEqual(closeWithGraceMock.mock.calls.length, 1, 'closeWithGrace should be called')
    assert.ok(typeof closeWithGraceMock.handler === 'function', 'closeWithGrace handler should be a function')

    // 4. Simulate SIGINT to trigger the exit handler
    // The handler might expect a callback, so we need to handle both Promise and callback patterns
    const handlerResult = closeWithGraceMock.handler!({ signal: 'SIGINT' })

    // If the handler returns a Promise, wait for it
    if (handlerResult && typeof handlerResult.then === 'function') {
      await handlerResult
    }

    // 5. Check if the 'stop' record request was made
    assert.strictEqual(requestMock.mock.calls.length, 2, 'Should have made a second request to stop recording')
    const [stopUrl, stopOptions] = requestMock.mock.calls[1].arguments
    assert.strictEqual(stopUrl, `http://localhost:3000/api/record/${pid}`)
    assert.deepStrictEqual(JSON.parse(stopOptions.body), { mode: 'stop', profile: 'cpu' })

    // 6. Check if execAsync was called with 'open' and 'index.html'
    assert.strictEqual(execAsyncMock.mock.calls.length, 1, 'execAsync should be called once')
    const [execCommand] = execAsyncMock.mock.calls[0].arguments
    assert.ok(execCommand.includes('open') || execCommand.includes('start'), 'execAsync command should contain "open" or "start"')
    assert.ok(execCommand.includes('index.html'), 'execAsync command should contain "index.html"')

    // 7. Check if the server was stopped
    assert.strictEqual(mockServer.started, false, 'Server should be stopped')
  })
})
