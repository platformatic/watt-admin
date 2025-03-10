import { subtractSecondsFromDate } from './utilities/dates'

// FIXME: once the codebase will be migrated to TypeScript, we should leverage auto-generated clients through `@platformatic/client-cli`
const host = '/api'

export const getApiApplication = async () => {
  const result = await fetch(`${host}/runtimes`)
  const data = await result.json()

  for (const runtime of data) {
    const { platformaticVersion: pltVersion, packageName: name, pid: id, uptimeSeconds, url, selected } = runtime
    if (!selected) continue
    const lastStarted = subtractSecondsFromDate(new Date(), uptimeSeconds)
    return { id, url, name, pltVersion, lastStarted }
  }

  return {}
}

// This is to avoid calling npm registry every time we run the method below
let latest = ''
export const isWattpmVersionOutdated = async (currentVersion) => {
  if (!latest) {
    const result = await fetch('https://registry.npmjs.org/@platformatic/control')
    const data = await result.json()
    latest = data['dist-tags'].latest
  }
  console.log('last stable @platformatic/control version', latest)
  return latest !== currentVersion
}

export const getServices = async (id) => {
  const result = await fetch(`${host}/runtimes/${id}/services`)
  const data = await result.json()
  return data.services
}

export const getLogs = async (id) => {
  const result = await fetch(`${host}/runtimes/${id}/logs`)
  const data = await result.json()
  return data
}

export const getApiMetricsPod = async (id) => {
  try {
    const response = await fetch(`${host}/runtimes/${id}/metrics`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching metrics:', error)
    throw error
  }
}

export const getApiMetricsPodService = async (podId, serviceId) => {
  try {
    const response = await fetch(`${host}/runtimes/${podId}/metrics/${serviceId}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching metrics for service:', error)
    throw error
  }
}

export const restartApiApplication = async (applicationId) => {
  const result = await fetch(`${host}/runtimes/${applicationId}/restart`, { method: 'POST' })
  console.log('restart api application status', result.status)
  return {}
}
