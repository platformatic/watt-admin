import { FastifyInstance } from 'fastify'
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts'
import { RuntimeApiClient, Runtime } from '@platformatic/control'
import { getLogsFromReadable } from '../utils/log'

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
    }
  }, async (request) => {
    const runtimes = await api.getRuntimes()

    type SelectableRuntime = Runtime & { selected?: boolean }

    let selectableRuntimes: SelectableRuntime[] = runtimes

    if (!request.query.includeAdmin) {
      selectableRuntimes = selectableRuntimes.filter((runtime) => runtime.packageName !== 'watt-admin')
    }

    for (const runtime of selectableRuntimes) {
      if (process.env.SELECTED_RUNTIME === runtime.pid.toString()) {
        runtime.selected = true
      }
    }

    return selectableRuntimes
  })

  typedFastify.get('/runtimes/:pid/metrics', {
    schema: {
      params: { type: 'object', properties: { pid: { type: 'number' } }, required: ['pid'] }
    }
  }, async ({ params: { pid } }) => {
    return typedFastify.mappedMetrics[pid]?.aggregated || {}
  })

  typedFastify.get('/runtimes/:pid/metrics/:serviceId', {
    schema: {
      params: { type: 'object', properties: { pid: { type: 'number' }, serviceId: { type: 'string' } }, required: ['pid', 'serviceId'] }
    }
  }, async ({ params: { pid, serviceId } }) => {
    return fastify.mappedMetrics[pid]?.services[serviceId] || {}
  })

  typedFastify.get('/runtimes/:pid/services', {
    schema: {
      params: { type: 'object', properties: { pid: { type: 'number' } }, required: ['pid'] }
    }
  }, async (request) => {
    return api.getRuntimeServices(request.params.pid)
  })

  typedFastify.get('/runtimes/:pid/logs', {
    schema: {
      params: { type: 'object', properties: { pid: { type: 'number' } }, required: ['pid'] }
    }
  }, async ({ params: { pid }, log }) =>
    getLogsFromReadable(await api.getRuntimeAllLogsStream(pid), log))

  typedFastify.get('/runtimes/:pid/openapi/:serviceId', {
    schema: {
      params: { type: 'object', properties: { pid: { type: 'number' }, serviceId: { type: 'string' } }, required: ['pid', 'serviceId'] }
    }
  }, async ({ params: { pid, serviceId } }) => {
    return api.getRuntimeOpenapi(pid, serviceId)
  })

  typedFastify.post('/runtimes/:pid/restart', {
    schema: {
      params: { type: 'object', properties: { pid: { type: 'number' } }, required: ['pid'] }
    }
  }, async (request) => {
    try {
      await api.restartRuntime(request.params.pid)
    } catch (err) {
      // TODO: restart is currently not working. Apparently, the call to `this.start()` on `@platformatic/runtime/lib/runtime.js` fails. Once it will be fixed, we can remove the catch and the warning log (and leave the function throw as it was before). Monitor this issue to check if it's fixed or not (https://github.com/platformatic/platformatic/issues/3928)
      fastify.log.warn({ err }, 'Issue restarting the runtime')
    }
  })

  typedFastify.post('/runtimes/:pid/stop', {
    schema: {
      params: { type: 'object', properties: { pid: { type: 'number' } }, required: ['pid'] }
    }
  }, async (request) => {
    return api.stopRuntime(request.params.pid)
  })
}
