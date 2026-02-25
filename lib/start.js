'use strict'

import { create } from '@platformatic/runtime'
import { join } from 'path'
import { parseArgs, promisify } from 'util'
import { request } from 'undici'
import { exec } from 'child_process'

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

  process.env.WATT_ADMIN_PORT = port || 4042

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

  // We move to the project root to start the server
  // so amaro will load correctly
  const cwd = process.cwd() 
  const root = join(import.meta.dirname, '..')
  process.chdir(root)
  const server = await create('watt.json', undefined, {
    setupSignals: false,
    isProduction: true
  })
  entrypointUrl = await server.start()
  process.chdir(cwd)

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
