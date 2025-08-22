import { FastifyInstance } from 'fastify'
import { getMetrics } from '../utils/metrics'
import { join } from 'path'
import { MS_WAITING } from '../utils/constants'

export default async function (fastify: FastifyInstance) {
  fastify.decorate('loaded', { path: join(__dirname, '..', '..', '..', 'frontend', 'src', 'loaded.json'), metrics: {} })

  fastify.decorate('metricsInterval', setInterval(() => getMetrics(fastify), MS_WAITING))

  fastify.addHook('onClose', async () => {
    // If the following log is not called, please run the project directly through the `wattpm` binary (ref. https://github.com/platformatic/platformatic/issues/3751)
    fastify.log.info('Closing the backend...')
    clearInterval(fastify.metricsInterval)
  })
}
