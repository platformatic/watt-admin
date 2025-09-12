import { FastifyInstance } from 'fastify'
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts'
import { metricResponseSchema, MetricsResponse, pidParamSchema } from '../schemas'

export default async function (fastify: FastifyInstance) {
  const typedFastify = fastify.withTypeProvider<JsonSchemaToTsProvider>()
  const emptyMetrics: MetricsResponse = { dataCpu: [], dataLatency: [], dataMem: [], dataReq: [], dataKafka: [], dataUndici: [], dataWebsocket: [], dataNodejs: [] }

  typedFastify.get('/runtimes/:pid/metrics', {
    schema: { params: pidParamSchema, response: { 200: metricResponseSchema } },
  }, async ({ params: { pid } }) => fastify.loaded.metrics[pid]?.aggregated || emptyMetrics)

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
    return fastify.loaded.metrics[pid]?.services[serviceId]?.all || emptyMetrics
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
    return fastify.loaded.metrics[pid]?.services[serviceId]?.[workerId] || emptyMetrics
  })
}
