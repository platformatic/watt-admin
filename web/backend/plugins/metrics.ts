import { FastifyInstance } from 'fastify'
import { getMetrics } from '../utils/metrics'
import { join } from 'path'
import { readFile, writeFile } from 'fs/promises'
import { Mode } from '../schemas'
import { getPidToLoad, getSelectableRuntimes } from '../utils/runtimes'
import { RuntimeApiClient } from '@platformatic/control'
import { fileExists } from '../utils/files'
import { MS_WAITING } from '../utils/constants'

export default async function (fastify: FastifyInstance) {
  const api = new RuntimeApiClient()

  fastify.decorate('mappedMetrics', {})

  fastify.decorate('loaded', {
    mode: 'live',
    runtimes: [],
    services: { entrypoint: '', production: false, services: [] },
    path: join(__dirname, '..', '..', '..', 'frontend', 'src', 'loaded.json')
  })

  let prevMode: Mode

  const isValidMode = (mode: Mode) => fastify.loaded.mode === mode && prevMode !== mode

  fastify.decorate('metricsInterval', setInterval(async () => {
    if (fastify.loaded.mode !== 'load') {
      getMetrics(fastify)
    }

    if (isValidMode('live') || isValidMode('record:start')) {
      fastify.mappedMetrics = {}
    }

    if (isValidMode('record:stop')) {
      const runtimes = getSelectableRuntimes(await api.getRuntimes(), false)
      const services = await api.getRuntimeServices(getPidToLoad(runtimes))
      await writeFile(fastify.loaded.path, JSON.stringify({ runtimes, services, metrics: fastify.mappedMetrics[getPidToLoad(runtimes)] }))
    }

    if (isValidMode('load')) {
      if (await fileExists(fastify.loaded.path)) {
        const mappedMetrics = await readFile(fastify.loaded.path)
        const data = JSON.parse(mappedMetrics.toString())
        if ('metrics' in data && 'runtimes' in data) {
          fastify.mappedMetrics = { [getPidToLoad(fastify.loaded.runtimes)]: data.metrics }
          fastify.loaded.runtimes = data.runtimes
          fastify.loaded.services = data.services
        }
      }
    }

    prevMode = fastify.loaded.mode
  }, MS_WAITING))

  fastify.addHook('onClose', async () => {
    // If the following log is not called, please run the project directly through the `wattpm` binary (ref. https://github.com/platformatic/platformatic/issues/3751)
    fastify.log.info('Closing the backend...')
    clearInterval(fastify.metricsInterval)
  })
}
