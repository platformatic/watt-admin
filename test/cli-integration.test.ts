import type { RuntimeApiClient } from '@platformatic/control'
import assert from 'node:assert'
import { after, before, describe, it, mock } from 'node:test'
import * as util from 'util'

interface ParseArgsResult {
  values: {
    socket?: string
  }
}

describe('CLI Integration', () => {
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
  let consoleOutput: string[] = []
  let parseArgsResult: ParseArgsResult = { values: {} }
  let runtimeApi: RuntimeApiClient & { socket?: string }
  const originalConsoleLog = console.log

  before(() => {
    consoleOutput = []
    console.log = (...args) => {
      consoleOutput.push(args.join(' '))
    }

    mock.module('@platformatic/control', {
      namedExports: {
        RuntimeApiClient: class {
          socket?: string

          constructor (options: { socket?: string }) {
            this.socket = options.socket
            runtimeApi = this as unknown as RuntimeApiClient & { socket?: string }
          }

          async getRuntimes () {
            return mockRuntimes
          }

          async getRuntimeConfig () {
            return { path: '/test/config.json' }
          }

          async close () {}
        }
      }
    })

    mock.module('@inquirer/prompts', {
      namedExports: {
        select: async () => mockRuntimes[1] // Always select the second runtime
      }
    })

    mock.module('util', {
      namedExports: {
        ...util,
        parseArgs: (): ParseArgsResult => parseArgsResult
      }
    })
  })

  after(() => {
    console.log = originalConsoleLog
    mock.restoreAll()
  })

  it('should correctly select a runtime from multiple options', async () => {
    const { default: cli } = await import('../cli.js')

    // Call the main function
    const result = await cli()

    // Verify result
    assert.deepStrictEqual(result, mockRuntimes[1])
    assert.ok(consoleOutput.some(output => output.includes('app-2')))
    assert.ok(consoleOutput.some(output => output.includes('2222')))
  })

  it('should accept the socket option', async () => {
    parseArgsResult = { values: { socket: 'foo.sock' } }
    const { cli } = await import('../cli.js')

    // Call the main function
    const runtime = await cli()

    // @ts-expect-error Not typed yet
    await runtime.close()

    assert.deepStrictEqual(runtimeApi.socket, 'foo.sock')
  })
})
