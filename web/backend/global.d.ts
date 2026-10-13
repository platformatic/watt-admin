// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { FastifyInstance } from 'fastify'
import type { PlatformaticApp, PlatformaticServiceConfig } from '@platformatic/service'
import type { Mode, Profile } from './schemas/index.ts'
import type { MappedMetrics } from './utils/metrics-helpers.ts'
import type { ScalerState } from './utils/scaler.ts'

declare module 'fastify' {
  interface FastifyInstance {
    platformatic: PlatformaticApp<PlatformaticServiceConfig>
    metricsInterval: NodeJS.Timeout
    loaded: { mode?: Mode, metrics: MappedMetrics, type?: Profile }
    scalerStates: Map<number, ScalerState>
  }

  interface FastifySchema {
    hide?: boolean
  }
}
