import { join } from 'node:path'
import { readFile } from 'node:fs/promises'
import { buildServer } from '@platformatic/service'
import { test } from 'node:test'
import { spawn } from 'node:child_process'
import { FastifyInstance } from 'fastify'
import { MS_WAITING } from '../utils/constants'

type testfn = Parameters<typeof test>[0]
type TestContext = Parameters<Exclude<testfn, undefined>>[0]

export async function loadMetrics (server: FastifyInstance): Promise<void> {
  return new Promise((resolve, reject) => {
    let count = 0
    let timeoutId: NodeJS.Timeout

    const check = () => {
      if (Object.keys(server.loaded.metrics).length > 0) {
        clearTimeout(timeoutId)
        resolve()
      } else {
        timeoutId = setTimeout(check, MS_WAITING)
      }

      if (count > 4) {
        clearTimeout(timeoutId)
        reject(new Error(`Unable to load metrics after ${count} retries`))
      }
      count++
    }

    check()
  })
}

export async function getServer (t: TestContext) {
  // We go up two folder because this files executes in the dist folder
  const config = JSON.parse(await readFile(join(__dirname, '..', '..', 'platformatic.json'), 'utf8'))
  // Add your config customizations here. For example you want to set
  // all things that are set in the config file to read from an env variable
  config.server ||= {}
  config.server.logger ||= {}
  // If you need to debug a test, update the default log level
  config.server.logger.level = 'fatal'
  config.watch = false

  // Add your config customizations here
  const server = await buildServer(config)
  t.after(() => server.close())

  return server
}

export async function startWatt (t: TestContext): Promise<string> {
  const fixturesPath = join(__dirname, '..', '..', '..', '..', 'node_modules', '.bin', 'wattpm')
  const process = spawn(fixturesPath, ['start'])
  t.after(() => process.kill('SIGKILL'))

  return new Promise((resolve, reject) => {
    const onData = (data: Buffer) => {
      const input = data.toString()
      if (input.includes('Platformatic is now listening at ')) {
        removeListeners()
        resolve(input.match(/http:\/\/[^:]+:(\d+)/)?.[1] || '0')
      }
    }

    const onError = (error: Error) => {
      removeListeners()
      reject(error)
    }

    const removeListeners = () => {
      process.stdout.removeListener('data', onData)
      process.removeListener('error', onError)
    }

    process.stdout.on('data', onData)
    process.on('error', onError)
  })
}
