import websocket from '@fastify/websocket'
import { FastifyInstance } from 'fastify'

export default async function (fastify: FastifyInstance) {
  await fastify.register(websocket)
}
