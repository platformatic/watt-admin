/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyInstance } from 'fastify'
import { PlatformaticApp, PlatformaticServiceConfig } from '@platformatic/service'
import { MetricValue } from '@platformatic/control'

declare module 'fastify' {
  interface FastifyInstance {
    platformatic: PlatformaticApp<PlatformaticServiceConfig>
    metricsInterval: NodeJS.Timeout
    mappedMetrics: Record<number, {
      name: string,
      time: Date,
      type: string,
      aggregator: string,
      values: MetricValue[],
      serviceId: string,
      pid: number
    }[]>
  }
}
