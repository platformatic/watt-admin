import split2 from 'split2'
import { Readable } from 'stream'
import { pipeline } from 'node:stream/promises'
import { FastifyBaseLogger } from 'fastify'

export type Log = {
  level: number,
  time: number,
  pid: number,
  hostname: string,
  msg: string
}

const MAX_LOGS = 1000

export const getLogsFromReadable = async (readable: Readable, log?: FastifyBaseLogger) => {
  const result: Log[] = []

  await pipeline(
    readable,
    split2(),
    async function * (source) {
      for await (const line of source) {
        try {
          const parsedObject = JSON.parse(line)
          if (result.length >= MAX_LOGS) {
            result.shift()
          }
          result.push(parsedObject)
        } catch (err) {
          log?.warn({ line }, 'Invalid JSON line found:')
        }
      }
    }
  )

  return result
}
