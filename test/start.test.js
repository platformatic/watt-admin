'use strict'

const { describe, it, beforeEach } = require('node:test')
const assert = require('node:assert')
const proxyquire = require('proxyquire')

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
    configManager: { config: { server: {} } }
  })
  const mockReadFile = async () => JSON.stringify({ server: {} })

  // Setup module with mocks
  const mockedStart = () => {
    return proxyquire.noCallThru().load('../lib/start', {
      '@platformatic/runtime': {
        buildRuntime: mockBuildRuntime,
        loadConfig: mockLoadConfig
      },
      fs: {
        promises: {
          readFile: mockReadFile
        }
      }
    })
  }

  beforeEach(() => {
    // Reset mockServer state
    mockServer.started = false

    // Delete environment variable if it exists
    if ('SELECTED_RUNTIME' in process.env) {
      delete process.env.SELECTED_RUNTIME
    }
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
})
