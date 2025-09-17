'use strict'

import type { Runtime } from '@platformatic/control'

const { describe, it, beforeEach, afterEach } = require('node:test')
const assert = require('node:assert')
const proxyquire = require('proxyquire')

describe('CLI', () => {
  // Mock console.log to capture output
  let consoleOutput: string[] = []
  const originalConsoleLog = console.log

  // Mock data
  let mockRuntimes: Runtime[] = []
  let mockConfig = {}
  let mockSelectedRuntime: Runtime | null = null

  // Mock modules
  const mockRuntimeApiClient = class MockRuntimeApiClient {
    // No constructor needed since we only have empty implementation
    async getRuntimes () {
      return mockRuntimes
    }

    async getRuntimeConfig () {
      if (mockConfig instanceof Error) {
        throw mockConfig
      }
      return mockConfig
    }

    async close () {}
  }

  const mockSelect = async ({ choices }: { choices: [{ value: Runtime }] }) => {
    return mockSelectedRuntime || choices[0].value
  }

  // Setup mocks
  const mockedCli = () => {
    return proxyquire.noCallThru().load('../cli.js', {
      '@platformatic/control': {
        RuntimeApiClient: mockRuntimeApiClient
      },
      '@inquirer/prompts': {
        select: mockSelect
      },
      './lib/start.js': {
        start: async (pid: Runtime['pid']) => {
          return { pid, started: true }
        }
      }
    })
  }

  beforeEach(() => {
    // Setup console capture
    consoleOutput = []
    console.log = (...args) => {
      consoleOutput.push(args.join(' '))
    }

    // Reset mock state
    mockRuntimes = []
    mockConfig = {}
    mockSelectedRuntime = null
  })

  afterEach(() => {
    // Restore console.log
    console.log = originalConsoleLog
  })

  it('should handle no available runtimes', async () => {
    // Set up empty runtimes
    mockRuntimes = []

    // Get mocked CLI module
    const main = mockedCli()
    const result = await main()

    assert.strictEqual(result, null)
    assert.ok(consoleOutput.some(output => output.includes('No runtimes available')))
  })

  it('should automatically select runtime when only one is available', async () => {
    // Create a mock runtime
    const singleRuntime = {
      packageName: 'test-app',
      pid: 12345,
      cwd: '/test/app',
      startTime: new Date().getTime(),
      argv: ['node', 'server.js']
    } as unknown as Runtime

    // Set up mock data
    mockRuntimes = [singleRuntime]
    mockConfig = { path: '/test/app/config.json' }

    // Get mocked CLI module
    const main = mockedCli()
    const result = await main()

    assert.deepStrictEqual(result, singleRuntime)
    assert.ok(consoleOutput.some(output => output.includes('test-app')))
    assert.ok(consoleOutput.some(output => output.includes('12345')))
  })

  it('should prompt for runtime selection when multiple runtimes are available', async () => {
    // Create mock runtimes
    const multipleRuntimes = [
      {
        packageName: 'app-1',
        pid: 1111,
        cwd: '/test/app1',
        startTime: new Date().getTime(),
        argv: ['node', 'server1.js']
      },
      {
        packageName: 'app-2',
        pid: 2222,
        cwd: '/test/app2',
        startTime: new Date().getTime(),
        argv: ['node', 'server2.js']
      }
    ] as unknown as Runtime[]

    // Set up mock data
    mockRuntimes = multipleRuntimes
    mockConfig = { path: '/test/app/config.json' }
    mockSelectedRuntime = multipleRuntimes[1]  // Select the second runtime

    // Get mocked CLI module
    const main = mockedCli()
    const result = await main()

    assert.deepStrictEqual(result, multipleRuntimes[1])
    assert.ok(consoleOutput.some(output => output.includes('app-2')))
    assert.ok(consoleOutput.some(output => output.includes('2222')))
  })

  it('should handle errors when fetching runtime config', async () => {
    // Create a mock runtime
    const mockRuntime = {
      packageName: 'error-app',
      pid: 9999,
      cwd: '/test/error-app',
      startTime: new Date().getTime()
    } as unknown as Runtime

    // Set up mock data
    mockRuntimes = [mockRuntime]
    mockConfig = new Error('Config not available')

    // Get mocked CLI module
    const main = mockedCli()
    const result = await main()

    assert.deepStrictEqual(result, mockRuntime)
    assert.ok(consoleOutput.some(output => output.includes('error-app')))
    assert.ok(consoleOutput.some(output => output.includes('9999')))
    assert.ok(consoleOutput.some(output => output.includes('/test/error-app')))
  })
})
