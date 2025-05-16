import type { WebSocket } from 'ws'
import split2 from 'split2'
import { FastifyInstance } from 'fastify'
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts'
import { RuntimeApiClient } from '@platformatic/control'
import { metricResponseSchema, PidParam, pidParamSchema, SelectableRuntime, selectableRuntimeSchema } from '../schemas'
import { pipeline } from 'node:stream/promises'

export default async function (fastify: FastifyInstance) {
  const typedFastify = fastify.withTypeProvider<JsonSchemaToTsProvider>()
  const api = new RuntimeApiClient()
  const emptyMetrics = { dataCpu: [], dataLatency: [], dataMem: [], dataReq: [] }

  typedFastify.get('/runtimes', {
    schema: {
      querystring: {
        type: 'object',
        properties: {
          includeAdmin: {
            type: 'boolean',
            default: false,
          },
        },
      },
      response: { 200: { type: 'array', items: selectableRuntimeSchema } }
    }
  }, async (request) => {
    const runtimes = await api.getRuntimes()
    const selectableRuntimes: SelectableRuntime[] = []
    for (const runtime of runtimes) {
      if (!request.query.includeAdmin && runtime.packageName === 'watt-admin') {
        continue
      }

      let selected = true
      if (process.env.SELECTED_RUNTIME) {
        selected = process.env.SELECTED_RUNTIME === runtime.pid.toString()
      }

      selectableRuntimes.push({ ...runtime, packageName: runtime.packageName || '', packageVersion: runtime.packageVersion || '', url: runtime.url || '', selected })
    }
    return selectableRuntimes
  })

  typedFastify.get('/runtimes/:pid/health', {
    schema: {
      params: pidParamSchema,
      response: {
        200: {
          type: 'object',
          additionalProperties: false,
          properties: {
            status: {
              type: 'string',
              enum: ['OK', 'KO'],
              description: "Status can only be 'OK' or 'KO'"
            }
          },
          required: ['status']
        }
      }
    }
  }, async ({ params: { pid } }) => {
    try {
      const result = await api.getMatchingRuntime({ pid: pid.toString() })
      if (result.pid === pid) {
        return { status: 'OK' as const }
      }
      return { status: 'KO' as const }
    } catch {
      return { status: 'KO' as const }
    }
  })

  typedFastify.get('/runtimes/:pid/metrics', {
    schema: { params: pidParamSchema, response: { 200: metricResponseSchema } },
  }, async ({ params: { pid } }) => {
    return typedFastify.mappedMetrics[pid]?.aggregated || emptyMetrics
  })

  typedFastify.get('/runtimes/:pid/metrics/:serviceId', {
    schema: {
      params: {
        type: 'object',
        properties: {
          pid: { type: 'number' },
          serviceId: { type: 'string' }
        },
        required: ['pid', 'serviceId']
      },
      response: { 200: metricResponseSchema }
    }
  }, async ({ params: { pid, serviceId } }) => {
    return fastify.mappedMetrics[pid]?.services[serviceId]?.all || emptyMetrics
  })

  typedFastify.get('/runtimes/:pid/metrics/:serviceId/:workerId', {
    schema: {
      params: {
        type: 'object',
        properties: {
          pid: { type: 'number' },
          serviceId: { type: 'string' },
          workerId: { type: 'number' },
        },
        required: ['pid', 'serviceId', 'workerId']
      },
      response: { 200: metricResponseSchema }
    }
  }, async ({ params: { pid, serviceId, workerId } }) => {
    return fastify.mappedMetrics[pid]?.services[serviceId]?.[workerId] || emptyMetrics
  })

  typedFastify.get('/runtimes/:pid/services', {
    schema: {
      params: pidParamSchema,
      response: {
        200: {
          type: 'object',
          additionalProperties: false,
          required: ['entrypoint', 'production', 'services'],
          properties: {
            entrypoint: {
              type: 'string'
            },
            production: {
              type: 'boolean'
            },
            services: {
              type: 'array',
              items: {
                anyOf: [
                  {
                    type: 'object',
                    required: ['id', 'type', 'status', 'version', 'localUrl', 'entrypoint', 'dependencies'],
                    properties: {
                      id: {
                        type: 'string'
                      },
                      type: {
                        type: 'string'
                      },
                      status: {
                        type: 'string'
                      },
                      version: {
                        type: 'string'
                      },
                      localUrl: {
                        type: 'string'
                      },
                      entrypoint: {
                        type: 'boolean'
                      },
                      workers: {
                        type: 'number'
                      },
                      url: {
                        type: 'string'
                      },
                      dependencies: {
                        type: 'array',
                        items: {
                          type: 'object',
                          required: ['id', 'url', 'local'],
                          properties: {
                            id: {
                              type: 'string'
                            },
                            url: {
                              type: 'string'
                            },
                            local: {
                              type: 'boolean'
                            }
                          }
                        }
                      }
                    }
                  },
                  {
                    type: 'object',
                    required: ['id', 'status'],
                    properties: {
                      id: {
                        type: 'string'
                      },
                      status: {
                        type: 'string'
                      }
                    }
                  }
                ]
              }
            }
          }
        }
      }
    }
  }, async (request) => {
    return api.getRuntimeServices(request.params.pid)
  })

  const wsSendAsync = (socket: WebSocket, data: string): Promise<void> => new Promise((resolve, reject) =>
    socket.send(data, (err: unknown) => (err) ? reject(err) : resolve()
    )
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

  typedFastify.get('/runtimes/:pid/openapi/:serviceId', {
    schema: {
      params: { type: 'object', properties: { pid: { type: 'number' }, serviceId: { type: 'string' } }, required: ['pid', 'serviceId'] }
    }
  }, async ({ params: { pid, serviceId } }) => {
    return api.getRuntimeOpenapi(pid, serviceId)
  })

  typedFastify.post('/runtimes/:pid/restart', {
    schema: { params: pidParamSchema, body: { type: 'object' } }
  }, async (request) => {
    try {
      await api.restartRuntime(request.params.pid)
    } catch (err) {
      // TODO: restart is currently not working. Apparently, the call to `this.start()` on `@platformatic/runtime/lib/runtime.js` fails. Once it will be fixed, we can remove the catch and the warning log (and leave the function throw as it was before). Monitor this issue to check if it's fixed or not (https://github.com/platformatic/platformatic/issues/3928)
      fastify.log.warn({ err }, 'Issue restarting the runtime')
    }
  })
}
