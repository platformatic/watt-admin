import type { FastifyInstance } from 'fastify'
import type { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts'
import { RuntimeApiClient } from '@platformatic/control'
import { getPidToLoad, getSelectableRuntimes } from '../utils/runtimes.ts'
import { writeFile, readFile } from 'node:fs/promises'
import { exec } from 'node:child_process'
import { promisify } from 'node:util'

const execAsync = promisify(exec)
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
                    additionalProperties: true,
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
      },
      response: {
        200: {
          type: 'object',
          additionalProperties: false,
          properties: {
            path: { type: 'string', description: 'Path to the saved recording HTML file' }
          }
        }
      }
    }
  }, async ({ body: { mode, profile: type, outputPath }, params: { pid } }, reply) => {
    const from = fastify.loaded.mode
    const to = mode
    if (!checkRecordState({ from, to })) {
      return fastify.log.error({ from, to }, 'Invalid record state machine transition')
    }

    const { applications } = await api.getRuntimeApplications(pid)
    fastify.loaded.mode = mode
    if (mode === 'start') {
      for (const { id } of applications) {
        await api.startApplicationProfiling(pid, id, { type, sourceMaps: true })
      }
      fastify.loaded.type = type
      fastify.loaded.metrics = {}
      return {}
    }

    if (mode === 'stop') {
      try {
        reply.log.trace({ pid, type, outputPath }, 'Stopping recording and generating output')
        const runtimes = getSelectableRuntimes(await api.getRuntimes(), false)
        reply.log.trace({ pid }, 'Fetching services from runtime')
        const pidToLoad = pid || getPidToLoad(runtimes)
        reply.log.trace({ pidToLoad }, 'Determined PID to load for recording')
        const services = await api.getRuntimeApplications(pidToLoad)

        const profile: Record<string, Uint8Array> = {}
        for (const { id } of applications) {
          const profileData = Buffer.from(await api.stopApplicationProfiling(pid, id, { type }))
          profile[id] = new Uint8Array(profileData)
        }

        reply.log.trace({ pid, type }, 'Profiling data collected from runtime')

        const loadedJson = JSON.stringify({ runtimes, services, metrics: fastify.loaded.metrics[getPidToLoad(runtimes)], profile, type })

        const scriptToAppend = `  <script>window.LOADED_JSON=${loadedJson}</script>\n</body>`
        const templatePath = join(__dirname, '..', '..', 'frontend', 'dist', 'index.html')
        const fontsDir = join(__dirname, '..', '..', 'frontend', 'dist', 'fonts')
        let templateHtml = await readFile(templatePath, 'utf8')

        // Inline fonts as base64 data URIs for offline usage
        const fontFiles = [
          { path: 'Inter/Inter-VariableFont_wght.ttf', url: './fonts/Inter/Inter-VariableFont_wght.ttf' },
          { path: 'Roboto_Mono/RobotoMono-VariableFont_wght.ttf', url: './fonts/Roboto_Mono/RobotoMono-VariableFont_wght.ttf' }
        ]
        for (const font of fontFiles) {
          try {
            const fontData = await readFile(join(fontsDir, font.path))
            const base64Font = fontData.toString('base64')
            const dataUri = `data:font/ttf;base64,${base64Font}`
            templateHtml = templateHtml.replaceAll(font.url, dataUri)
          } catch (err) {
            reply.log.warn({ err, font: font.path }, 'Failed to inline font')
          }
        }

        // Remove font preload links (not needed with inlined fonts)
        templateHtml = templateHtml.replace(/<link rel="preload"[^>]*\.ttf"[^>]*>/g, '')

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
        reply.log.trace({ targetPath }, 'Saving recording to output path')
        const uniquePath = await getUniqueFilePath(targetPath)
        await writeFile(uniquePath, outputHtml, 'utf8')
        reply.log.info({ path: uniquePath }, 'Recording saved')

        // Open the file in the default browser (skip during CI/tests)
        if (!process.env.CI && !process.env.NODE_TEST_CONTEXT) {
          const openCommand = process.platform === 'win32' ? 'start' : 'open'
          execAsync(`${openCommand} "${uniquePath}"`)
            .then(() => reply.log.info({ path: uniquePath }, 'Recording opened in browser'))
            .catch((err) => reply.log.warn({ err, path: uniquePath }, 'Failed to open recording in browser'))
        }

        return { path: uniquePath }
      } catch (err) {
        reply.log.error({ err }, 'Unable to save the loaded JSON')
      }
    }
  })
}
