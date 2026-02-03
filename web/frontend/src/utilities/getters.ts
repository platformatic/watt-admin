import type { GetRuntimesPidServicesResponseOK } from 'src/client/backend-types'
import type { ServiceData } from 'src/types'

export const getServiceSelected = (service: ServiceData): boolean => 'selected' in service ? !!service.selected : false

export const getServiceWorkers = (service: ServiceData): number => 'workers' in service ? (service.workers ? service.workers : 0) : 0

export const getServiceEntrypoint = (service: ServiceData): boolean => 'entrypoint' in service ? service.entrypoint : false

export const getOptionMetricsLabel = (input: { label: string }[]) => input.map(({ label }) => label)

export const getKafkaType = (services: GetRuntimesPidServicesResponseOK['applications']): boolean => services.some(service => 'type' in service && service.type === 'kafka-hooks')

export const getOfflineMode = () => import.meta.url.startsWith('file:///')
