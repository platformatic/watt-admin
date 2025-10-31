import { RuntimeApiClient } from '@platformatic/control'
import { describe, it, beforeEach, afterEach, mock } from 'node:test'
import assert from 'node:assert'
import * as util from 'util'

interface MockServer {
  started: boolean
  start(): Promise<string>
  close(): Promise<void>
}

interface MockClient {
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
    profile?: string
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

  let mockClient: MockClient
  let requestMock: MockFunction<(url: string, options: RequestOptions) => Promise<RequestResponse>>
  let execAsyncMock: MockFunction<(command: string) => Promise<ExecResult>>
  let createMock: MockFunction<(configFile: string, env: any, options: any) => Promise<MockServer>>
  let parseArgsResult: ParseArgsResult

  beforeEach(() => {
    mockServer.started = false
    delete process.env.SELECTED_RUNTIME
    delete process.env.PORT

    // Default parseArgs result
    parseArgsResult = { values: {} }

    // Create mock client
    mockClient = {
      close: mock.fn(async () => {})
    }

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
    // Remove all SIGINT listeners that may have been added during tests
    process.removeAllListeners('SIGINT')
  })

  it('should start the server with the selected runtime and handle record mode', async () => {
    // Test 1: Normal start without record mode
    parseArgsResult = { values: {} }

    const { start } = await import('../lib/start.js')

    const testRuntime = 'test-runtime-123'
    await start(mockClient, testRuntime)

    assert.strictEqual(process.env.SELECTED_RUNTIME, testRuntime, 'SELECTED_RUNTIME should be set')
    assert.strictEqual(mockServer.started, true, 'Server should be started')
    assert.strictEqual(createMock.mock.calls.length, 1, 'create should be called once')

    // Verify setupSignals: false is passed to create
    const [, , createOptions] = createMock.mock.calls[0].arguments
    assert.deepStrictEqual(createOptions, { setupSignals: false }, 'setupSignals should be false')

    // Reset server state and mocks for second part of test
    mockServer.started = false
    mockClient.close = mock.fn(async () => {})

    // Test 2: Start with record mode
    let recordTimeout: NodeJS.Timeout | undefined

    // Mock clearTimeout to capture the timeout
    const originalClearTimeout = globalThis.clearTimeout
    const clearTimeoutMock = mock.fn((id: NodeJS.Timeout) => {
      originalClearTimeout(id)
    })
    globalThis.clearTimeout = clearTimeoutMock

    // Mock setTimeout to capture and immediately clear the 10-minute timeout
    const originalSetTimeout = globalThis.setTimeout
    globalThis.setTimeout = mock.fn((callback: () => void, delay: number) => {
      if (delay === 600000) { // 10 minutes in milliseconds
        // Don't actually set the 10-minute timeout, just store a fake ID
        recordTimeout = {} as NodeJS.Timeout
        return recordTimeout
      }
      return originalSetTimeout(callback, delay)
    }) as typeof setTimeout

    try {
      // Set parseArgs result for this test to enable recording
      parseArgsResult = { values: { record: true } }

      const pid = 'test-runtime-record'
      const startPromise = start(mockClient, pid)

      // Wait for the start to complete
      await startPromise

      // 1. Check if the server was started
      assert.strictEqual(mockServer.started, true, 'Server should be started in record mode')

      // 2. Check if the 'start' record request was made
      assert.strictEqual(requestMock.mock.calls.length, 1, 'Should have made one request to start recording')
      const [startUrl, startOptions] = requestMock.mock.calls[0].arguments
      assert.strictEqual(startUrl, `http://localhost:3000/api/record/${pid}`)
      assert.deepStrictEqual(JSON.parse(startOptions.body), { mode: 'start', profile: 'cpu' })

      // 3. Verify that SIGINT listener was added
      const sigintListenerCount = process.listenerCount('SIGINT')
      assert.strictEqual(sigintListenerCount, 1, 'SIGINT listener should be registered')

      // 4. Manually trigger the SIGINT handler and wait for it to complete
      process.emit('SIGINT')

      // Wait for async operations to complete
      await new Promise(resolve => setImmediate(resolve))
      await new Promise(resolve => setImmediate(resolve))

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

      // 7. Check if client.close() was called
      const closeMock = mockClient.close as MockFunction<() => Promise<void>>
      assert.strictEqual(closeMock.mock.calls.length, 1, 'client.close() should be called once')

      // 8. Check if the server was stopped
      assert.strictEqual(mockServer.started, false, 'Server should be stopped after SIGINT')

      // 9. Verify the timeout was cleared
      assert.ok(clearTimeoutMock.mock.calls.length > 0, 'clearTimeout should have been called')
    } finally {
      // Restore original functions
      globalThis.clearTimeout = originalClearTimeout
      globalThis.setTimeout = originalSetTimeout
    }
  })

  it('should prevent double shutdown when multiple SIGINT signals are received', async () => {
    // Set parseArgs result to enable recording
    parseArgsResult = { values: { record: true } }

    const pid = 'test-runtime-multi-sigint'

    // Track shutdown calls
    let shutdownCount = 0
    const originalClose = mockServer.close
    mockServer.close = mock.fn(async () => {
      shutdownCount++
      await originalClose.call(mockServer)
    })

    // Mock setTimeout to prevent actual 10-minute timeout
    const originalSetTimeout = globalThis.setTimeout
    globalThis.setTimeout = mock.fn((callback: () => void, delay: number) => {
      if (delay === 600000) {
        return {} as NodeJS.Timeout
      }
      return originalSetTimeout(callback, delay)
    }) as typeof setTimeout

    try {
      const { start } = await import('../lib/start.js')
      await start(mockClient, pid)

      // Verify SIGINT listener is registered
      assert.strictEqual(process.listenerCount('SIGINT'), 1, 'Should have one SIGINT listener')

      // First SIGINT - should trigger shutdown
      process.emit('SIGINT')
      await new Promise(resolve => setImmediate(resolve))

      // During shutdown, there should be an ignoring handler
      const listenerCountDuringShutdown = process.listenerCount('SIGINT')

      // Send second SIGINT during shutdown
      process.emit('SIGINT')
      await new Promise(resolve => setImmediate(resolve))

      // Send third SIGINT to be sure
      process.emit('SIGINT')
      await new Promise(resolve => setImmediate(resolve))
      await new Promise(resolve => setImmediate(resolve))

      // Verify shutdown was only called once
      const closeMock = mockServer.close as MockFunction<() => Promise<void>>
      assert.strictEqual(closeMock.mock.calls.length, 1, 'Server close should only be called once despite multiple SIGINT signals')
      assert.strictEqual(shutdownCount, 1, 'Shutdown should only happen once')

      // Verify all SIGINT listeners are cleaned up
      assert.strictEqual(process.listenerCount('SIGINT'), 0, 'All SIGINT listeners should be removed after shutdown')
    } finally {
      globalThis.setTimeout = originalSetTimeout
      mockServer.close = originalClose
    }
  })
})
