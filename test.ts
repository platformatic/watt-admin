// FIXME: remove this file, it's only used as test for websocket streams (command to run is `node --experimental-strip-types test.ts`)
import Fastify from 'fastify'
import fastifyWebsocket from '@fastify/websocket'

const fastify = Fastify()

await fastify.register(fastifyWebsocket)

fastify.register(async function (fastify) {
  fastify.get('/ws', { websocket: true }, (socket, req) => {
    const interval = setInterval(() => {
      const message = `Current time: ${new Date().toISOString()}`
      socket.send(message)
    }, 1000)

    socket.on('close', () => {
      clearInterval(interval)
    })
  })
})

try {
  await fastify.listen({ port: 3000 })
  console.log('Server listening on port 3000')
} catch (err) {
  console.error('Error starting server:', err)
  process.exit(1)
}
