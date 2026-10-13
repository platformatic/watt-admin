import type { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts'
import type { FastifyInstance } from 'fastify'
import { pidParamSchema } from '../schemas/index.ts'
import { scalerResponseSchema } from '../schemas/scaler.ts'
import { toScalerResponse } from '../utils/scaler.ts'

export default async function (fastify: FastifyInstance) {
  fastify.withTypeProvider<JsonSchemaToTsProvider>().get('/runtimes/:pid/scaler', {
    schema: { params: pidParamSchema, response: { 200: scalerResponseSchema } }
  }, async ({ params: { pid } }) => toScalerResponse(fastify.scalerStates.get(pid)))
}
