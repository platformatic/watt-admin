/// <reference path="../global.d.ts" />
import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts'
// TODO: create types for RuntimeApiClient and re-enable strict mode
import { RuntimeApiClient } from '@platformatic/control'

declare module 'fastify' {
  interface FastifyInstance {
    example: string
  }
}

export default async function (fastify: FastifyInstance, opts: FastifyPluginOptions) {
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
  }, async (request, reply) => {
    let runtimes = await api.getRuntimes()

    console.log(request.query.includeAdmin)

    if (!request.query.includeAdmin) {
      runtimes = runtimes.filter((runtime) => runtime.packageName !== 'watt-admin')
    }

    return runtimes
  })

  typedFastify.get('/runtimes/:pid/metrics', {
    schema: {
      params: { type: 'object', properties: { pid: { type: 'number' } }, required: ['pid'] }
    }
  }, async (request, reply) => {
    return api.getRuntimeMetrics(request.params.pid, { format: 'json' })
  })
}
