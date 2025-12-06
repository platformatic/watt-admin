import type { FastifyInstance } from 'fastify'
import type { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts'
import { RuntimeApiClient } from '@platformatic/control'
import { getPidToLoad, getSelectableRuntimes } from '../utils/runtimes.ts'
import { writeFile, readFile } from 'fs/promises'
import { checkRecordState } from '../utils/states.ts'
import { join } from 'path'
import { pidParamSchema, selectableRuntimeSchema, modeSchema, profileSchema } from '../schemas/index.ts'
import { generateDefaultFilename, getUniqueFilePath } from '../utils/output.ts'

const __dirname = import.meta.dirname

export default async function (fastify: FastifyInstance) {
  const typedFastify = fastify.withTypeProvider<JsonSchemaToTsProvider>()

  // FIXME: types have not been properly implemented in `@platformatic/control` and they should be updated as form the cast in the following line
  const api = new RuntimeApiClient() as RuntimeApiClient & { startApplicationProfiling: (...args: unknown[]) => Promise<unknown>, stopApplicationProfiling: (...args: unknown[]) => Promise<string> }

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
  }, async (request) => getSelectableRuntimes(await api.getRuntimes(), request.query.includeAdmin))

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
    const ok = { status: 'OK' as const }
    const ko = { status: 'KO' as const }

    try {
      const result = await api.getMatchingRuntime({ pid: pid.toString() })
      return (result.pid === pid) ? ok : ko
    } catch {
      return ko
    }
  })

  typedFastify.get('/runtimes/:pid/services', {
    schema: {
      params: pidParamSchema,
      response: {
        200: {
          type: 'object',
          additionalProperties: false,
          required: ['entrypoint', 'production', 'applications'],
          properties: {
            entrypoint: {
              type: 'string'
            },
            production: {
              type: 'boolean'
            },
            applications: {
              type: 'array',
              items: {
                anyOf: [
                  {
                    additionalProperties: false,
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
                        items: { type: 'string' }
                      }
                    }
                  },
                  {
                    additionalProperties: false,
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
  }, async (request) => api.getRuntimeApplications(request.params.pid))

  typedFastify.get('/runtimes/:pid/openapi/:serviceId', {
    schema: {
      params: { type: 'object', properties: { pid: { type: 'number' }, serviceId: { type: 'string' } }, required: ['pid', 'serviceId'] }
    }
  }, async ({ params: { pid, serviceId } }) => api.getRuntimeOpenapi(pid, serviceId))

  typedFastify.post('/runtimes/:pid/restart', {
    schema: { params: pidParamSchema, body: { type: 'object' } }
  }, async (request) => {
    try {
      await api.restartRuntime(request.params.pid)
    } catch (err) {
      fastify.log.warn({ err }, 'Issue restarting the runtime')
    }
  })

  typedFastify.post('/record/:pid', {
    schema: {
      params: pidParamSchema,
      body: {
        type: 'object',
        additionalProperties: false,
        properties: {
          mode: modeSchema,
          profile: profileSchema,
          outputPath: { type: 'string', description: 'Directory or file path for the output HTML. Defaults to cwd with auto-generated filename.' }
        },
        required: ['mode', 'profile']
      }
    }
  }, async ({ body: { mode, profile: type, outputPath }, params: { pid } }) => {
    const from = fastify.loaded.mode
    const to = mode
    if (!checkRecordState({ from, to })) {
      return fastify.log.error({ from, to }, 'Invalid record state machine transition')
    }

    const { applications } = await api.getRuntimeApplications(pid)
    fastify.loaded.mode = mode
    if (mode === 'start') {
      for (const { id } of applications) {
        await api.startApplicationProfiling(pid, id, { type })
      }
      fastify.loaded.type = type
      fastify.loaded.metrics = {}
    }

    if (mode === 'stop') {
      try {
        const runtimes = getSelectableRuntimes(await api.getRuntimes(), false)
        const services = await api.getRuntimeApplications(getPidToLoad(runtimes))

        const profile: Record<string, Uint8Array> = {}
        for (const { id } of applications) {
          const profileData = Buffer.from(await api.stopApplicationProfiling(pid, id, { type }))
          profile[id] = new Uint8Array(profileData)
        }

        const loadedJson = JSON.stringify({ runtimes, services, metrics: fastify.loaded.metrics[getPidToLoad(runtimes)], profile, type })

        const scriptToAppend = `  <script>window.LOADED_JSON=${loadedJson}</script>\n</body>`
        const templatePath = join(__dirname, '..', '..', 'frontend', 'dist', 'index.html')
        const templateHtml = await readFile(templatePath, 'utf8')
        const outputHtml = templateHtml.replace('</body>', scriptToAppend)

        // Determine output file path
        let targetPath: string
        if (outputPath) {
          // If outputPath ends with .html, use it as-is; otherwise treat as directory
          if (outputPath.endsWith('.html')) {
            targetPath = outputPath
          } else {
            targetPath = join(outputPath, generateDefaultFilename())
          }
        } else {
          // Default to current working directory
          targetPath = join(process.cwd(), generateDefaultFilename())
        }

        // Ensure we never overwrite an existing file
        const uniquePath = await getUniqueFilePath(targetPath)
        await writeFile(uniquePath, outputHtml, 'utf8')
        fastify.log.info({ path: uniquePath }, 'Recording saved')
      } catch (err) {
        fastify.log.error({ err }, 'Unable to save the loaded JSON')
      }
    }
  })
}
