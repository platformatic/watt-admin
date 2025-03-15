import { describe, it, expect } from 'vitest'
import { getTicks } from '../../../src/components/metrics/utils'

describe('getTicks', () => {
  it('should return an array with min value when count is 0', () => {
    const result = getTicks(0, 10, 0, false)
    expect(result).toEqual([0, 10])
  })

  it('should return correct ticks when including max', () => {
    const result = getTicks(0, 100, 4, false)
    expect(result).toEqual([0, 25, 50, 75, 100])
  })

  it('should return correct ticks when excluding max', () => {
    const result = getTicks(0, 100, 4, true)
    expect(result).toEqual([0, 25, 50, 75])
  })

  it('should handle negative numbers', () => {
    const result = getTicks(-100, 100, 4, false)
    expect(result).toEqual([-100, -50, 0, 50, 100])
  })

  it('should handle decimal numbers', () => {
    const result = getTicks(0, 1, 4, false)
    expect(result).toEqual([0, 0.25, 0.5, 0.75, 1])
  })

  it('should handle small ranges', () => {
    const result = getTicks(0, 1, 2, false)
    expect(result).toEqual([0, 0.5, 1])
  })

  it('should maintain equal spacing between ticks', () => {
    const result = getTicks(0, 100, 5, false)
    const differences: number[] = []
    for (let i = 1; i < result.length; i++) {
      differences.push(result[i] - result[i - 1])
    }
    
    const firstDiff = differences[0]
    differences.forEach(diff => {
      expect(diff).toBeCloseTo(firstDiff, 10)
    })
  })

  it('should always include min value', () => {
    const tests = [
      { min: 0, max: 100, count: 4 },
      { min: -50, max: 50, count: 3 },
      { min: 1.5, max: 10.5, count: 2 }
    ]

    tests.forEach(test => {
      const result = getTicks(test.min, test.max, test.count, false)
      expect(result[0]).toBe(test.min)
    })
  })

  it('should handle floating point precision correctly', () => {
    const result = getTicks(0, 0.3, 3, false)
    expect(result.map(n => Number(n.toFixed(2)))).toEqual([0, 0.1, 0.2, 0.3])
  })
})