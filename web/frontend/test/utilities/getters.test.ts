import { describe, test, expect } from 'vitest'
import { getServiceSelected, getServiceWorkers, getServiceEntrypoint, getKafkaType, getOptionMetricsLabel } from '../../src/utilities/getters'
import { ServiceData } from '../../src/types'
import { KAFKA_OPTIONS_METRICS } from '../../src/ui-constants'

describe('getServiceSelected', () => {
  test('should return true when service has selected property set to true', () => {
    const service = { selected: true } as ServiceData
    expect(getServiceSelected(service)).toBe(true)
  })

  test('should return false when service has selected property set to false', () => {
    const service = { selected: false } as ServiceData
    expect(getServiceSelected(service)).toBe(false)
  })

  test('should return false when service has selected property set to null', () => {
    const service = { selected: null } as unknown as ServiceData
    expect(getServiceSelected(service)).toBe(false)
  })

  test('should return false when service has selected property set to undefined', () => {
    const service = { selected: undefined } as ServiceData
    expect(getServiceSelected(service)).toBe(false)
  })

  test('should return false when service has selected property set to 0', () => {
    const service = { selected: 0 } as unknown as ServiceData
    expect(getServiceSelected(service)).toBe(false)
  })

  test('should return true when service has selected property set to non-zero number', () => {
    const service = { selected: 1 } as unknown as ServiceData
    expect(getServiceSelected(service)).toBe(true)
  })

  test('should return false when service has selected property set to empty string', () => {
    const service = { selected: '' } as unknown as ServiceData
    expect(getServiceSelected(service)).toBe(false)
  })

  test('should return true when service has selected property set to non-empty string', () => {
    const service = { selected: 'true' } as unknown as ServiceData
    expect(getServiceSelected(service)).toBe(true)
  })

  test('should return false when service does not have selected property', () => {
    const service = {} as ServiceData
    expect(getServiceSelected(service)).toBe(false)
  })

  test('should return false when service has other properties but not selected', () => {
    const service = { name: 'test-service', workers: 5 } as unknown as ServiceData
    expect(getServiceSelected(service)).toBe(false)
  })
})

describe('getServiceWorkers', () => {
  test('should return correct number when service has workers property with positive value', () => {
    const service = { workers: 5 } as ServiceData
    expect(getServiceWorkers(service)).toBe(5)
  })

  test('should return 0 when service has workers property set to 0', () => {
    const service = { workers: 0 } as ServiceData
    expect(getServiceWorkers(service)).toBe(0)
  })

  test('should return 0 when service has workers property set to null', () => {
    const service = { workers: null } as unknown as ServiceData
    expect(getServiceWorkers(service)).toBe(0)
  })

  test('should return 0 when service has workers property set to undefined', () => {
    const service = { workers: undefined } as ServiceData
    expect(getServiceWorkers(service)).toBe(0)
  })

  test('should return 0 when service does not have workers property', () => {
    const service = {} as ServiceData
    expect(getServiceWorkers(service)).toBe(0)
  })

  test('should return 0 when service has other properties but not workers', () => {
    const service = { name: 'test-service', selected: true } as unknown as ServiceData
    expect(getServiceWorkers(service)).toBe(0)
  })

  test('should handle negative numbers correctly', () => {
    const service = { workers: -5 } as ServiceData
    expect(getServiceWorkers(service)).toBe(-5)
  })

  test('should handle decimal numbers correctly', () => {
    const service = { workers: 3.5 } as ServiceData
    expect(getServiceWorkers(service)).toBe(3.5)
  })

  test('should work when service has both selected and workers properties', () => {
    const service = { selected: true, workers: 10 } as ServiceData
    expect(getServiceWorkers(service)).toBe(10)
  })
})

describe('getServiceEntrypoint', () => {
  test('should return true when service has entrypoint property set to true', () => {
    const service = { entrypoint: true } as ServiceData
    expect(getServiceEntrypoint(service)).toBe(true)
  })

  test('should return false when service has entrypoint property set to false', () => {
    const service = { entrypoint: false } as ServiceData
    expect(getServiceEntrypoint(service)).toBe(false)
  })

  test('should return null when service has entrypoint property set to null', () => {
    const service = { entrypoint: null } as unknown as ServiceData
    expect(getServiceEntrypoint(service)).toBe(null)
  })

  test('should return undefined when service has entrypoint property set to undefined', () => {
    const service = { entrypoint: undefined } as unknown as ServiceData
    expect(getServiceEntrypoint(service)).toBe(undefined)
  })

  test('should return 0 when service has entrypoint property set to 0', () => {
    const service = { entrypoint: 0 } as unknown as ServiceData
    expect(getServiceEntrypoint(service)).toBe(0)
  })

  test('should return non-zero number when service has entrypoint property set to non-zero number', () => {
    const service = { entrypoint: 1 } as unknown as ServiceData
    expect(getServiceEntrypoint(service)).toBe(1)
  })

  test('should return empty string when service has entrypoint property set to empty string', () => {
    const service = { entrypoint: '' } as unknown as ServiceData
    expect(getServiceEntrypoint(service)).toBe('')
  })

  test('should return string when service has entrypoint property set to non-empty string', () => {
    const service = { entrypoint: 'main' } as unknown as ServiceData
    expect(getServiceEntrypoint(service)).toBe('main')
  })

  test('should return false when service does not have entrypoint property', () => {
    const service = {} as ServiceData
    expect(getServiceEntrypoint(service)).toBe(false)
  })

  test('should return false when service has other properties but not entrypoint', () => {
    const service = { name: 'test-service', workers: 5, selected: true } as unknown as ServiceData
    expect(getServiceEntrypoint(service)).toBe(false)
  })

  test('should work when service has entrypoint along with other properties', () => {
    const service = { selected: true, workers: 10, entrypoint: true } as ServiceData
    expect(getServiceEntrypoint(service)).toBe(true)
  })
})

describe('getOptionMetricsLabel', () => {
  test('when passing an empty array, should return the same', () =>
    expect(getOptionMetricsLabel([])).toEqual([])
  )

  test('when passing an an array containing multiple property including labels, should return an array of only labels', () =>
    expect(getOptionMetricsLabel(KAFKA_OPTIONS_METRICS)).toEqual(['Producers', 'Consumers', 'Topics', 'Streams', 'Flight', 'DLQ'])
  )
})

describe('getKafkaType', () => {
  test('should return false when there are no positive values', () =>
    expect(getKafkaType([{
      date: new Date().toISOString(),
      producers: 0,
      producedMessages: 0,
      consumers: 0,
      consumersStreams: 0,
      consumersTopics: 0,
      consumedMessages: 0,
      hooksMessagesInFlight: 0,
      hooksDlqMessagesTotal: 0
    }])).toBe(false)
  )

  test('should return true when there is at least a positive value', () =>
    expect(getKafkaType([{
      date: new Date().toISOString(),
      producers: 0,
      producedMessages: 0,
      consumers: 0,
      consumersStreams: 0,
      consumersTopics: 0,
      consumedMessages: 0,
      hooksMessagesInFlight: 0,
      hooksDlqMessagesTotal: 0
    }, {
      date: new Date().toISOString(),
      producers: 0,
      producedMessages: 0,
      consumers: 0,
      consumersStreams: 1,
      consumersTopics: 0,
      consumedMessages: 0,
      hooksMessagesInFlight: 0,
      hooksDlqMessagesTotal: 0
    }])).toBe(true)
  )

  test('should return true when there are all positive values', () =>
    expect(getKafkaType([{
      date: new Date().toISOString(),
      producers: 2,
      producedMessages: 2,
      consumers: 2,
      consumersStreams: 3,
      consumersTopics: 3,
      consumedMessages: 3,
      hooksMessagesInFlight: 5,
      hooksDlqMessagesTotal: 5
    }, {
      date: new Date().toISOString(),
      producers: 4,
      producedMessages: 4,
      consumers: 4,
      consumersStreams: 1,
      consumersTopics: 7,
      consumedMessages: 7,
      hooksMessagesInFlight: 7,
      hooksDlqMessagesTotal: 10
    }])).toBe(true)
  )
})
