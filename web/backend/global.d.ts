// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FastifyInstance } from 'fastify'
import { PlatformaticApp, PlatformaticServiceConfig } from '@platformatic/service'
import { MappedMetrics } from './utils/metrics-helpers'

declare module 'fastify' {
  interface FastifyInstance {
    platformatic: PlatformaticApp<PlatformaticServiceConfig>
    metricsInterval: NodeJS.Timeout
    mappedMetrics: MappedMetrics
  }
}
