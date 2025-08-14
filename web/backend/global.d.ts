// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { FastifyInstance } from 'fastify'
import type { PlatformaticApp, PlatformaticServiceConfig } from '@platformatic/service'
import type { RuntimeServices } from '@platformatic/control'
import type { MappedMetrics } from './utils/metrics-helpers'
import type { Mode, SelectableRuntime } from './schemas'

declare module 'fastify' {
  interface FastifyInstance {
    platformatic: PlatformaticApp<PlatformaticServiceConfig>
    metricsInterval: NodeJS.Timeout
    mappedMetrics: MappedMetrics
    loaded: { path: string, mode: Mode, runtimes: SelectableRuntime[], services: RuntimeServices }
  }
}
