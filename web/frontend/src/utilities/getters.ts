import { GetRuntimesPidMetricsResponseOK } from 'src/client/backend-types'
import { ServiceData } from 'src/types'

export const getServiceSelected = (service: ServiceData): boolean => 'selected' in service ? !!service.selected : false

export const getServiceWorkers = (service: ServiceData): number => 'workers' in service ? (service.workers ? service.workers : 0) : 0

export const getServiceEntrypoint = (service: ServiceData): boolean => 'entrypoint' in service ? service.entrypoint : false

export const getOptionMetricsLabel = (input: { label: string }[]) => input.map(({ label }) => label)

// FIXME: remove this manual check once the following issue has been done, and we can get the service type directly (https://github.com/platformatic/platformatic/issues/4130)
export const getKafkaType = (kafkaData: GetRuntimesPidMetricsResponseOK['dataKafka']): boolean => {
  for (const kafkaMetrics of kafkaData) {
    for (const value of Object.values(kafkaMetrics)) {
      if (typeof value === 'number' && value > 0) {
        return true
      }
    }
  }
  return false
}
