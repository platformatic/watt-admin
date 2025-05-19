import { FastifyInstance } from 'fastify'
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts'
import { metricResponseSchema, pidParamSchema } from '../schemas'

export default async function (fastify: FastifyInstance) {
  const typedFastify = fastify.withTypeProvider<JsonSchemaToTsProvider>()
  const emptyMetrics = { dataCpu: [], dataLatency: [], dataMem: [], dataReq: [] }

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
}
