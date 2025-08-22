import { getRuntimes, getRuntimesPidHealth, getRuntimesPidMetrics, getRuntimesPidMetricsServiceId, getRuntimesPidMetricsServiceIdWorkerId, getRuntimesPidServices, getRuntimesPidOpenapiServiceId, postRuntimesPidRestart, setBaseUrl, postRecord } from './client/backend'
import { subtractSecondsFromDate } from './utilities/dates'
import type { Mode } from './useAdminStore'
import loaded from './loaded.json'
import type { GetRuntimesPidMetricsResponseOK, GetRuntimesPidServicesResponseOK, GetRuntimesResponseOK, PostRecordRequest } from './client/backend-types'
import { getOfflineMode } from './utilities/getters'

setBaseUrl('/api')

const isLoadMode = (mode: Mode): boolean => mode === 'load' || getOfflineMode()

type LoadedJson = { runtimes: GetRuntimesResponseOK, services: GetRuntimesPidServicesResponseOK, metrics: { aggregated: GetRuntimesPidMetricsResponseOK, services: Record<string, Record<'all' | number, GetRuntimesPidMetricsResponseOK>> } }

const getDataLoaded = () => ('LOADED_JSON' in window) ? (window as unknown as { LOADED_JSON: LoadedJson }).LOADED_JSON : loaded as unknown as LoadedJson

export const getApiApplication = async (mode: Mode) => {
  const runtimes = isLoadMode(mode) ? getDataLoaded().runtimes : (await getRuntimes({ query: { includeAdmin: false } })).body

  for (const runtime of runtimes) {
    const { platformaticVersion: pltVersion, packageName: name, pid: id, uptimeSeconds, url, selected } = runtime
    if (!selected) continue
    const lastStarted = subtractSecondsFromDate(new Date(), uptimeSeconds)
    return { id, url, name, pltVersion, lastStarted }
  }

  throw new Error('No available runtime')
}

// This is to avoid calling npm registry every time we run the method below
let latest = ''
export const isWattpmVersionOutdated = async (mode: Mode, currentVersion?: string) => {
  if (isLoadMode(mode)) return true
  if (!latest) {
    const result = await fetch('https://registry.npmjs.org/@platformatic/control')
    const data = await result.json()
    latest = data['dist-tags'].latest
  }
  return latest !== currentVersion
}

export const getServices = async (pid: number, mode: Mode) => {
  const { services } = isLoadMode(mode) ? getDataLoaded().services : (await getRuntimesPidServices({ path: { pid } })).body
  return services
}

export const getServiceHealth = async (pid: number, mode: Mode) => {
  const status = isLoadMode(mode) ? 'OK' : (await getRuntimesPidHealth({ path: { pid } })).body.status
  if (status === 'KO') {
    throw new Error(`Service with pid ${pid} is currently down`)
  }
}

export const getApiMetricsPod = async (pid: number, mode: Mode) => {
  await getServiceHealth(pid, mode)
  const result = isLoadMode(mode) ? getDataLoaded().metrics.aggregated : (await getRuntimesPidMetrics({ path: { pid } })).body
  return result
}

export const getApiMetricsPodService = async (pid: number, serviceId: string, mode: Mode) => {
  await getServiceHealth(pid, mode)
  const result = isLoadMode(mode) ? getDataLoaded().metrics.services[serviceId].all : (await getRuntimesPidMetricsServiceId({ path: { pid, serviceId } })).body
  return result
}

export const getApiMetricsPodWorker = async (pid: number, serviceId: string, workerId: number, mode: Mode) => {
  await getServiceHealth(pid, mode)
  const result = isLoadMode(mode) ? getDataLoaded().metrics.services[serviceId][workerId] : (await getRuntimesPidMetricsServiceIdWorkerId({ path: { pid, serviceId, workerId } })).body
  return result
}

export const getOpenApi = async (pid: number, serviceId: string) => {
  const { body } = await getRuntimesPidOpenapiServiceId({ path: { pid, serviceId } })
  return body
}

export const restartApiApplication = async (pid: number) => {
  const result = await postRuntimesPidRestart({ body: {}, path: { pid } })
  return { result }
}

export type RecordMode = PostRecordRequest['body']['mode']
export const updateMode = async (mode: RecordMode) => postRecord({ body: { mode } })
