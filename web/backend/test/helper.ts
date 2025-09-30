import { join, resolve } from 'node:path'
import { create, type ServiceCapability } from '@platformatic/service'
import { test } from 'node:test'
import { spawn } from 'node:child_process'
import { MS_WAITING } from '../utils/constants.ts'
import type { FastifyInstance } from 'fastify'

type testfn = Parameters<typeof test>[0]
type TestContext = Parameters<Exclude<testfn, undefined>>[0]

const __dirname = import.meta.dirname

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
  const basePath = resolve(__dirname, join('..', 'platformatic.json'))
  const server = await create(basePath, {
    watch: false,
    server: {
      logger: {
        level: 'fatal'
      }
    },
    plugins: {
      paths: [
        {
          path: '../plugins',
          encapsulate: false
        },
        {
          path: '../routes'
        }
      ]
    }
  }) as unknown as ServiceCapability & FastifyInstance & { start: () => unknown } // FIXME: the new type returned from `create` is wrong, and it should be updated directly on the original platformatic module
  await server.start()
  t.after(async () => {
    await server.close()
  })
  return server.getApplication()
}

export async function startWatt (t: TestContext): Promise<string> {
  const fixturesPath = join(__dirname, '..', '..', '..', 'node_modules', '.bin', 'wattpm')
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
