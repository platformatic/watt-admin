import { getRuntimes, getRuntimesPidHealth, getRuntimesPidMetrics, getRuntimesPidMetricsServiceId, getRuntimesPidServices, postRuntimesPidRestart, setBaseUrl } from './client/backend'
import { subtractSecondsFromDate } from './utilities/dates'

const host = '/api'
setBaseUrl(host)

export const getApiApplication = async () => {
  const { body } = await getRuntimes({ query: { includeAdmin: false } })

  for (const runtime of body) {
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
  if (!latest) {
    const result = await fetch('https://registry.npmjs.org/@platformatic/control')
    const data = await result.json()
    latest = data['dist-tags'].latest
  }
  console.log('last stable @platformatic/control version', latest)
  return latest !== currentVersion
}

export const getServices = async (pid: number) => {
  const { body } = await getRuntimesPidServices({ path: { pid } })
  return body?.services
}

export const getLogs = async (id: number) => {
  const result = await fetch(`${host}/runtimes/${id}/logs`)
  const data = await result.json()
  return data
}

export const getApiMetricsPod = async (pid: number) => {
  const { body } = await getRuntimesPidMetrics({ path: { pid } })
  return body
}
export const getServiceHealth = async (pid: number) => {
  const { body: { status } } = await getRuntimesPidHealth({ path: { pid } })
  if (status === 'KO') {
    throw new Error(`Service with pid ${pid} is currently down`)
  }
}

export const getApiMetricsPodService = async (pid: number, serviceId: string) => {
  const { body } = await getRuntimesPidMetricsServiceId({ path: { pid, serviceId } })
  return body
}

export const restartApiApplication = async (pid: number) => {
  const result = await postRuntimesPidRestart({ body: {}, path: { pid } })
  console.log('restart api application status', result)
  return {}
}
