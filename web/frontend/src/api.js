import { subtractSecondsFromDate } from './utilities/dates'

// FIXME: once the codebase will be migrated to TypeScript, we should leverage auto-generated clients through `@platformatic/client-cli`
const host = '/api'

/* APPLICATIONS */
export const getApiApplication = async () => {
  const result = await fetch(`${host}/runtimes`)
  const data = await result.json()

  if (data?.length > 0) {
    const [{ platformaticVersion: pltVersion, packageName: name, pid: id, uptimeSeconds, url }] = data
    const lastStarted = subtractSecondsFromDate(new Date(), uptimeSeconds)
    return {
      id,
      url,
      name,
      pltVersion,
      lastStarted
    }
  }

  return {}
}

// This is to avoid calling npm registry every time we run the method below
let latest = ''
export const isWattpmVersionOutdated = async (currentVersion) => {
  if (!latest) {
    const result = await fetch('https://registry.npmjs.org/wattpm')
    const data = await result.json()
    latest = data['dist-tags'].latest
  }
  console.log('last stable wattpm version', latest)
  return latest !== currentVersion
}

// FIXME@backend get dynamic data
const generateMockData = () => {
  const generateTimestamps = (count) => {
    const timestamps = []
    const now = new Date()
    for (let i = 0; i < count; i++) {
      timestamps.unshift(new Date(now - i * 60000))
    }
    return timestamps
  }

  const randomInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const timestamps = generateTimestamps(14)
  const mockData = timestamps.map(date => ({
    date: date.toISOString(),
    rss: randomInRange(150 * 1024 * 1024, 200 * 1024 * 1024),
    totalHeapSize: randomInRange(100 * 1024 * 1024, 150 * 1024 * 1024),
    usedHeapSize: randomInRange(50 * 1024 * 1024, 100 * 1024 * 1024),
    newSpaceSize: randomInRange(20 * 1024 * 1024, 40 * 1024 * 1024),
    oldSpaceSize: randomInRange(30 * 1024 * 1024, 60 * 1024 * 1024),
    cpu: randomInRange(10, 40) / 100,
    elu: randomInRange(20, 60) / 100,
    latencies: {
      p90: randomInRange(50, 100),
      p95: randomInRange(100, 150),
      p99: randomInRange(150, 200)
    }
  }))
  return mockData
}

// FIXME@backend get dynamic data
export const getApiMetricsPod = async () => {
  const mockData = generateMockData()
  return { status: 200, json: () => Promise.resolve(mockData) }
}

export const restartApiApplication = async (applicationId) => {
  const result = await fetch(`${host}/runtimes/${applicationId}/restart`, { method: 'POST' })
  console.log('restart api application status', result.status)
  return {}
}

/* PODS */
export const getApiPod = async (applicationId, taxonomyId, podId) => {
  const [dataMem, dataCpu] = await Promise.all([
    getApiMetricsPod(taxonomyId, applicationId, podId, 'mem'),
    getApiMetricsPod(taxonomyId, applicationId, podId, 'cpu')
  ])

  const dataValuesMem = await dataMem.json()
  const dataValuesCpu = await dataCpu.json()

  return { ...dataValuesMem, ...dataValuesCpu }
}
