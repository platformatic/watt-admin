import { describe, test, expect } from 'vitest'
import { getFormattedDate, getFormattedLogTimestamp, subtractSecondsFromDate } from '../../src/utilities/dates'

const invalidDates = [
  '-',
  'invalid date',
  {},
  [],
  null,
  undefined
] as string[]

describe('getFormattedDate', () => {
  test('should print \'-\' for invalid date types', () => {
    for (let i = 0; i < invalidDates.length; i++) {
      expect(getFormattedDate(invalidDates[i])).toEqual('-')
    }
  })
  test('should print formatted date', () => {
    const input = '2024-02-20T09:52:57.858Z'
    const expected = 'Feb 20, 2024'

    expect(getFormattedDate(input)).toEqual(expected)
  })
})

describe('getFormattedLogTimestamp', () => {
  test('should print \'-\' for invalid date types', () => {
    for (let i = 0; i < invalidDates.length; i++) {
      expect(getFormattedLogTimestamp(invalidDates[i])).toEqual('-')
    }
  })
  test('should print formatted time', () => {
    const input = '2024-03-20T09:52:57.858Z'
    const expected = '09:52:57'

    expect(getFormattedLogTimestamp(input)).toEqual(expected)
  })

  test('should print formatted time (with milliseconds)', () => {
    const input = '2024-03-20T09:52:57.858Z'
    const expected = '09:52:57.858'

    expect(getFormattedLogTimestamp(input, true)).toEqual(expected)
  })
})

describe('subtractSecondsFromDate', () => {
  test('should return same date if the amount of seconds is 0', () => {
    const input = new Date('2025-02-18T01:52:42.858Z')
    const expected = '2025-02-18T01:52:42.858Z'

    expect(subtractSecondsFromDate(input, 0)).toEqual(expected)
  })

  test('should return subtracted date when seconds are passed', () => {
    const input = new Date('2025-02-18T01:52:42.858Z')
    const expected = '2025-02-18T01:52:00.858Z'

    expect(subtractSecondsFromDate(input, 42)).toEqual(expected)
  })
})
