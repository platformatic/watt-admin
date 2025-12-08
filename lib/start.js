'use strict'

import { create } from '@platformatic/runtime'
import { join } from 'path'
import { parseArgs, promisify } from 'util'
import { request } from 'undici'
import { exec } from 'child_process'

const __dirname = import.meta.dirname

const execAsync = promisify(exec)

const msOneMinute = 1000 * 60
let recordTimeout
let entrypointUrl

export async function start (client, selectedRuntime) {
  process.env.SELECTED_RUNTIME = selectedRuntime
  const { values: { port, record, profile } } = parseArgs({
    options: {
      port: { type: 'string' },
      profile: { type: 'string' },
      record: { type: 'boolean' },
    }
  })

  process.env.PORT = port || 4042

  const requestRecord = async (mode) => {
    return await request(`${entrypointUrl}/api/record/${selectedRuntime}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode, profile: profile ?? 'cpu' })
    })
  }

  const recordMetrics = async () => {
    try {
      const { statusCode, body } = await requestRecord('stop')
      if (statusCode === 200) {
        const { path } = await body.json()
        await execAsync(`${process.platform === 'win32' ? 'start' : 'open'} ${path}`)
        return path
      } else {
        console.error(`Failure triggering the stop command: ${await body.text()}`)
      }
    } catch (error) {
      console.error('Error on record metrics', { error, entrypointUrl })
      clearTimeout(recordTimeout)
    }
  }

  const configFile = join(__dirname, '..', 'watt.json')
  const server = await create(configFile, undefined, {
    setupSignals: false,
    isProduction: true
  })
  entrypointUrl = await server.start()

  if (record) {
    async function shutdown () {
      // Always clean up the client
      await client.close()

      // Then stop the server
      await server.close()
    }

    async function recordAndShutdown () {
      console.log('SIGINT received, recording metrics and shutting down...')
      clearTimeout(recordTimeout)
      const path = await recordMetrics(entrypointUrl)
      await shutdown()
      process.removeAllListeners('SIGINT')

      console.log(`Profile recorded at ${path}`)
    }

    process.once('SIGINT', () => {
      process.on('SIGINT', () => {
        // we ignore future signals to avoid double shutdown
      })
      recordAndShutdown()
    })

    const { statusCode, body } = await requestRecord('start')
    if (statusCode === 200) {
      await body.dump()

      recordTimeout = setTimeout(async () => {
        await recordMetrics(entrypointUrl)
      }, msOneMinute * 10)
    } else {
      console.log(`Failure triggering the start command: ${await body.text()}`)
    }
  }
}
