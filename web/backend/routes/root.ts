import { FastifyInstance } from 'fastify'
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts'
import { RuntimeApiClient } from '@platformatic/control'
import { pidParamSchema, SelectableRuntime, selectableRuntimeSchema } from '../schemas'

export default async function (fastify: FastifyInstance) {
  const typedFastify = fastify.withTypeProvider<JsonSchemaToTsProvider>()
  const api = new RuntimeApiClient()

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
      fastify.log.warn({ err }, 'Issue restarting the runtime')
    }
  })
}
