'use strict'

const { describe, it, beforeEach, afterEach } = require('node:test')
const assert = require('node:assert')
const proxyquire = require('proxyquire')

describe('CLI Integration', () => {
  // Mock runtime data
  const mockRuntimes = [
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
  ]

  // Setup for test
  let consoleOutput = []
  const originalConsoleLog = console.log

  beforeEach(() => {
    consoleOutput = []
    console.log = (...args) => {
      consoleOutput.push(args.join(' '))
    }
  })

  afterEach(() => {
    console.log = originalConsoleLog
  })

  it('should correctly select a runtime from multiple options', async () => {
    // Mock modules for the test
    const mockedCli = proxyquire.noCallThru().load('../cli.js', {
      '@platformatic/control': {
        RuntimeApiClient: class {
          // No constructor needed since we only have empty implementation
          async getRuntimes () { return mockRuntimes }
          async getRuntimeConfig () { return { path: '/test/config.json' } }
          async close () {}
        }
      },
      '@inquirer/prompts': {
        select: async () => mockRuntimes[1] // Always select the second runtime
      }
    })

    // Call the main function
    const result = await mockedCli()

    // Verify result
    assert.deepStrictEqual(result, mockRuntimes[1])
    assert.ok(consoleOutput.some(output => output.includes('app-2')))
    assert.ok(consoleOutput.some(output => output.includes('2222')))
  })
})
