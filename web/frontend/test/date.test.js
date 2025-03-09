import { describe, test } from 'node:test'
import assert from 'node:assert'
import { getFormattedDate, getFormattedLogTimestamp, subtractSecondsFromDate } from '../src/utilities/dates.js'

describe('getFormattedDate', () => {
  test('should print \'-\' for invalid date types', () => {
    const invalidDates = [
      '-',
      'invalid date',
      {},
      [],
      null,
      undefined
    ]
    for (let i = 0; i < invalidDates.length; i++) {
      assert.equal(getFormattedDate(invalidDates[i]), '-')
    }
  })
  test('should print formatted date', () => {
    const input = '2024-02-20T09:52:57.858Z'
    const expected = 'Feb 20, 2024'

    assert.equal(getFormattedDate(input), expected)
  })
})

describe('getFormattedLogTimestamp', () => {
  test('should print \'-\' for invalid date types', () => {
    const invalidDates = [
      '-',
      'invalid date',
      {},
      [],
      null,
      undefined
    ]
    for (let i = 0; i < invalidDates.length; i++) {
      assert.equal(getFormattedLogTimestamp(invalidDates[i]), '-')
    }
  })
  test('should print formatted time', () => {
    const input = '2024-03-20T09:52:57.858Z'
    const expected = '09:52:57'

    assert.equal(getFormattedLogTimestamp(input), expected)
  })

  test('should print formatted time (with milliseconds)', () => {
    const input = '2024-03-20T09:52:57.858Z'
    const expected = '09:52:57.858'

    assert.equal(getFormattedLogTimestamp(input, true), expected)
  })
})

describe('subtractSecondsFromDate', () => {
  test('should return same date if the amount of seconds is 0', () => {
    const input = new Date('2025-02-18T01:52:42.858Z')
    const expected = '2025-02-18T01:52:42.858Z'

    assert.equal(subtractSecondsFromDate(input, 0), expected)
  })

  test('should return subtracted date when seconds are passed', () => {
    const input = new Date('2025-02-18T01:52:42.858Z')
    const expected = '2025-02-18T01:52:00.858Z'

    assert.equal(subtractSecondsFromDate(input, 42), expected)
  })
})
