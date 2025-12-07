import { getRuntimes, getRuntimesPidHealth, getRuntimesPidMetrics, getRuntimesPidMetricsServiceId, getRuntimesPidMetricsServiceIdWorkerId, getRuntimesPidServices, getRuntimesPidOpenapiServiceId, postRuntimesPidRestart, setBaseUrl, postRecordPid } from './client/backend.mts'
import { subtractSecondsFromDate } from './utilities/dates'
import type { Mode } from './useAdminStore'
import type { GetRuntimesPidMetricsResponseOK, GetRuntimesPidServicesResponseOK, GetRuntimesResponseOK, PostRecordPidRequest } from './client/backend-types'
import { getOfflineMode } from './utilities/getters'
// FIXME: the `react-pprof` should export the real Profile class, not only the type definition of it (import the class directly from `react-pprof` once this will be fixed)
import { Profile } from 'pprof-format'
import { fetchProfile } from 'react-pprof'

setBaseUrl('/api')

const isLoadMode = (mode: Mode): boolean => mode === 'load' || getOfflineMode()

export type Type = PostRecordPidRequest['body']['profile']

type LoadedJson = { type: Type, profile: Record<string, Record<string, number>>, runtimes: GetRuntimesResponseOK, services: GetRuntimesPidServicesResponseOK, metrics: { aggregated: GetRuntimesPidMetricsResponseOK, services: Record<string, Record<'all' | number, GetRuntimesPidMetricsResponseOK>> } }

const getDataLoaded = () => {
  if (!('LOADED_JSON' in window)) {
    throw new Error(`No JSON data loaded in ${JSON.stringify(window)}`)
  }
  return (window as Window & typeof globalThis & { LOADED_JSON: LoadedJson }).LOADED_JSON
}

export const getType = () => getDataLoaded().type

export const hasProfiles = (): boolean => {
  if (!getOfflineMode()) return false
  try {
    const profiles = getDataLoaded().profile
    return profiles && Object.keys(profiles).length > 0
  } catch {
    return false
  }
}

export const getResource = async (id: string) => {
  return getOfflineMode() ? Profile.decode(new Uint8Array(Object.values(getDataLoaded().profile[id]))) : await fetchProfile(`${getType()}-profile-${id}.pb`)
}

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
export const isWattpmVersionOutdated = async (mode: Mode) => {
  if (isLoadMode(mode)) return ''
  if (!latest) {
    const result = await fetch('https://registry.npmjs.org/@platformatic/control')
    const data = await result.json()
    latest = data['dist-tags'].latest
  }
  return latest
}

export const getServices = async (pid: number, mode: Mode) => {
  if (isLoadMode(mode)) {
    console.log('Getting services from loaded data', getDataLoaded().services)
    return getDataLoaded().services.applications
  }
  const runtimePidServices = await getRuntimesPidServices({ path: { pid } })
  const { applications } = runtimePidServices.body
  return applications
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

export type RecordMode = PostRecordPidRequest['body']['mode']
export const updateMode = async (pid: number, mode: RecordMode) => postRecordPid({ path: { pid }, body: { mode, profile: 'cpu' } })
