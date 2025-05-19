import type { WebSocket } from 'ws'
import split2 from 'split2'
import { FastifyInstance } from 'fastify'
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts'
import { RuntimeApiClient } from '@platformatic/control'
import { PidParam, pidParamSchema } from '../schemas'
import { pipeline } from 'node:stream/promises'

export default async function (fastify: FastifyInstance) {
  const typedFastify = fastify.withTypeProvider<JsonSchemaToTsProvider>()
  const api = new RuntimeApiClient()

  const wsSendAsync = (socket: WebSocket, data: string): Promise<void> => new Promise((resolve, reject) => setTimeout(() => socket.send(data, (err) => (err)
    ? reject(err)
    : resolve()
  ), 100)
  )

  typedFastify.get<{ Params: PidParam }>('/runtimes/:pid/logs/ws', {
    schema: { params: pidParamSchema, hide: true },
    websocket: true
  }, async (socket, { params: { pid } }) => {
    try {
      const clientStream = api.getRuntimeLiveLogsStream(pid)

      socket.on('close', () => {
        clientStream.destroy()
      })

      await pipeline(
        clientStream,
        split2(),
        async function * (source: AsyncIterable<string>) {
          for await (const line of source) {
            await wsSendAsync(socket, line)
          }
        }
      )
    } catch (error) {
      fastify.log.error({ error }, 'fatal error on runtime logs ws')
      socket.close()
    }
  })
}
