import { getRuntimes, getRuntimesPidHealth, getRuntimesPidMetrics, getRuntimesPidMetricsServiceId, getRuntimesPidMetricsServiceIdWorkerId, getRuntimesPidServices, getRuntimesPidOpenapiServiceId, postRuntimesPidRestart, setBaseUrl, postMode, getMode } from './client/backend'
import { PostModeRequest } from './client/backend-types'
import { subtractSecondsFromDate } from './utilities/dates'
import loaded from './loaded.json' // FIXME: find a better way to load it, avoiding the any cast

setBaseUrl('/api')

const isOfflineMode = (): boolean => import.meta.url.startsWith('file:///')

export const getApiApplication = async () => {
  const runtimes = isOfflineMode() ? (loaded as any).runtimes : (await getRuntimes({ query: { includeAdmin: false } })).body

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
export const isWattpmVersionOutdated = async (currentVersion?: string) => {
  if (isOfflineMode()) return true
  if (!latest) {
    const result = await fetch('https://registry.npmjs.org/@platformatic/control')
    const data = await result.json()
    latest = data['dist-tags'].latest
  }
  return latest !== currentVersion
}

export const getServices = async (pid: number) => {
  const { services } = isOfflineMode() ? (loaded as any).services : (await getRuntimesPidServices({ path: { pid } })).body
  return services
}

export const getServiceHealth = async (pid: number) => {
  const status = isOfflineMode() ? 'OK' : (await getRuntimesPidHealth({ path: { pid } })).body.status
  if (status === 'KO') {
    throw new Error(`Service with pid ${pid} is currently down`)
  }
}

export const getApiMetricsPod = async (pid: number) => {
  await getServiceHealth(pid)
  const result = isOfflineMode() ? (loaded as any).metrics.aggregated : (await getRuntimesPidMetrics({ path: { pid } })).body
  return result
}

export const getApiMetricsPodService = async (pid: number, serviceId: string) => {
  await getServiceHealth(pid)
  const { body } = await getRuntimesPidMetricsServiceId({ path: { pid, serviceId } })
  return body
}

export const getApiMetricsPodWorker = async (pid: number, serviceId: string, workerId: number) => {
  await getServiceHealth(pid)
  const { body } = await getRuntimesPidMetricsServiceIdWorkerId({ path: { pid, serviceId, workerId } })
  return body
}

export const getOpenApi = async (pid: number, serviceId: string) => {
  const { body } = await getRuntimesPidOpenapiServiceId({ path: { pid, serviceId } })
  return body
}

export const restartApiApplication = async (pid: number) => {
  const result = await postRuntimesPidRestart({ body: {}, path: { pid } })
  return { result }
}

export type MetricsMode = PostModeRequest['body']['mode']
export const updateMode = async (mode: MetricsMode) => postMode({ body: { mode } })

// FIXME: move the mode login into the frontend
export const fetchMode = async () => {
  if (isOfflineMode()) return { path: './loaded.json' }
  const result = await getMode({})
  if (result.statusCode === 200) {
    return result.body
  }
  throw new Error(`Call to fetch mode failed with ${result.statusCode}`)
}
