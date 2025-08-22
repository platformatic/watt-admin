'use strict'

const { describe, it, beforeEach, mock } = require('node:test')
const assert = require('node:assert')
const proxyquire = require('proxyquire')
const { join } = require('path')

describe('start', () => {
  // Mock server object
  const mockServer = {
    started: false,
    start: async function () {
      this.started = true
      return this
    }
  }

  // Mock modules
  const mockBuildRuntime = async () => mockServer
  const mockLoadConfig = async () => ({
    configManager: {
      config: { server: {} },
      current: { server: { hostname: 'localhost', port: 3000 } }
    }
  })
  const mockReadFile = async () => JSON.stringify({ server: {} })

  // Setup module with mocks
  const mockedStart = (overrides = {}) => {
    return proxyquire.noCallThru().load('../lib/start', {
      '@platformatic/runtime': {
        buildRuntime: mockBuildRuntime,
        loadConfig: mockLoadConfig
      },
      'fs/promises': {
        readFile: mockReadFile
      },
      ...overrides
    })
  }

  beforeEach(() => {
    // Reset mockServer state
    mockServer.started = false

    // Delete environment variable if it exists
    if ('SELECTED_RUNTIME' in process.env) {
      delete process.env.SELECTED_RUNTIME
    }
    mock.reset()
  })

  it('should start the server with the selected runtime', async () => {
    // Get mocked start module
    const { start } = mockedStart()

    // Set a test PID
    const testPid = '12345'

    // Call the start function
    await start(testPid)

    // Check if environment variable was set
    assert.strictEqual(process.env.SELECTED_RUNTIME, testPid)

    // Check if server was started
    assert.strictEqual(mockServer.started, true)
  })

  it('should start recording and save metrics on exit', async (t) => {
    const requestMock = mock.fn(async (_, options) => {
      const body = JSON.parse(options.body)
      if (body.mode === 'start') {
        return { statusCode: 200, body: { dump: async () => {} } }
      }
      if (body.mode === 'stop') {
        return { statusCode: 200, body: { text: async () => '{"foo":"bar"}' } }
      }
      return { statusCode: 500, body: { text: async () => 'error' } }
    })

    let closeHandler
    const closeWithGraceMock = mock.fn((_, handler) => {
      closeHandler = handler
    })

    const readFileMock = mock.fn(async () => '<html><body></body></html>')
    const writeFileMock = mock.fn(async () => {})
    const execAsyncMock = mock.fn(async () => {})

    const { start } = mockedStart({
      undici: {
        request: requestMock
      },
      'close-with-grace': closeWithGraceMock,
      'fs/promises': {
        readFile: readFileMock,
        writeFile: writeFileMock
      },
      child_process: { exec: execAsyncMock },
      util: {
        ...require('util'),
        parseArgs: () => ({ values: { record: true } }),
        promisify: (fn) => fn
      }
    })

    await start('test-runtime-record')

    // 1. Check if the server was started
    assert.strictEqual(mockServer.started, true, 'Server should be started')

    // 2. Check if the 'start' record request was made
    assert.strictEqual(requestMock.mock.calls.length, 1, 'Should have made one request to start recording')
    const [startUrl, startOptions] = requestMock.mock.calls[0].arguments
    assert.strictEqual(startUrl, 'http://localhost:3000/api/record')
    assert.deepStrictEqual(JSON.parse(startOptions.body), { mode: 'start' })

    // 3. Check if closeWithGrace was configured
    assert.strictEqual(closeWithGraceMock.mock.calls.length, 1, 'closeWithGrace should be called')
    assert.ok(typeof closeHandler === 'function', 'closeWithGrace handler should be a function')

    // 4. Simulate SIGINT to trigger the exit handler
    await closeHandler({ signal: 'SIGINT' })

    // 5. Check if the 'stop' record request was made
    assert.strictEqual(requestMock.mock.calls.length, 2, 'Should have made a second request to stop recording')
    const [stopUrl, stopOptions] = requestMock.mock.calls[1].arguments
    assert.strictEqual(stopUrl, 'http://localhost:3000/api/record')
    assert.deepStrictEqual(JSON.parse(stopOptions.body), { mode: 'stop' })

    // 6. Check if the bundle was read and updated
    assert.strictEqual(readFileMock.mock.calls.length, 1, 'Should read the bundle file')
    assert.strictEqual(writeFileMock.mock.calls.length, 1, 'Should write to the bundle file')
    const expectedBundlePath = join(__dirname, '..', 'web', 'frontend', 'dist', 'index.html')
    const [writtenPath, writtenContent] = writeFileMock.mock.calls[0].arguments
    assert.strictEqual(writtenPath, expectedBundlePath)
    assert.strictEqual(writtenContent, '<html><body>  <script>window.LOADED_JSON={"foo":"bar"}</script>\n</body></html>')

    // 7. Check if the 'open' command was executed
    assert.strictEqual(execAsyncMock.mock.calls.length, 1, 'Should execute the open command')
    assert.strictEqual(execAsyncMock.mock.calls[0].arguments[0], `open ${expectedBundlePath}`)
  })
})
