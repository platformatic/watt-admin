import { RuntimeApiClient } from '@platformatic/control'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'

export default async function (fastify: FastifyInstance, opts: FastifyPluginOptions) {
  // FIXME: store the `mappedMetrics` into a DB, where the pid is the table name, and `pid`, `serviceId`, name (like `process_cpu_user_seconds_total`), etc. are rows values that can be easily retrieve through an SQL query. the current approach isn't scalable and it leads to a memory leak.
  fastify.decorate('mappedMetrics', {})

  const api = new RuntimeApiClient()

  const metricsInterval = setInterval(async () => {
    const runtimes = await api.getRuntimes()
    for (const { pid } of runtimes) {
      try {
        const runtimeMetrics = await api.getRuntimeMetrics(pid, { format: 'json' })

        for (const { name, type, aggregator, values } of runtimeMetrics) {
          if (!fastify.mappedMetrics[pid]) {
            fastify.mappedMetrics[pid] = []
          }

          const serviceId = values[0]?.labels?.serviceId
          if (serviceId) {
            fastify.mappedMetrics[pid].push({ name, time: new Date(), type, aggregator, values, serviceId, pid })
          }
        }
      } catch (error) {
        fastify.log.warn(error, 'Unable to get runtime metrics. Retry will start soon...')
      }
    }
  }, 1000)

  fastify.decorate('metricsInterval', metricsInterval)

  fastify.addHook('onClose', async () => {
    // FIXME: there is currently an issue on wattpm => `onClose` hook is not called (https://github.com/platformatic/platformatic/issues/3751)
    fastify.log.info('Closing the backend...')
    clearInterval(fastify.metricsInterval)
  })
}
