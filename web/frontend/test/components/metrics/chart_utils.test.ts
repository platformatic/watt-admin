import { describe, it, expect, beforeEach, vi } from 'vitest'
import { findY } from '../../../src/components/metrics/chart_utils';

describe('findY', () => {
  let mockPath: {
    getTotalLength: () => number;
    getPointAtLength: (length: number) => { x: number; y: number };
  }

  beforeEach(() => {
    mockPath = {
      getTotalLength: vi.fn().mockReturnValue(100),
      getPointAtLength: vi.fn().mockImplementation((length: number) => {
        return {
          x: length,
          y: length
        }
      })
    }
  })

  it('should handle x coordinates outside path bounds', () => {
    const resultStart = findY(mockPath, 100, -10, 100)
    expect(resultStart).toBeDefined()

    const resultEnd = findY(mockPath, 100, 110, 100)
    expect(resultEnd).toBeDefined()
  })

  it('should maintain precision within specified accuracy', () => {
    let previousY: number | null = null
    const xValues = [25, 25.1, 25.2, 25.3, 25.4, 25.5]
    
    xValues.forEach(x => {
      const y = findY(mockPath, 100, x, 100)
      if (previousY !== null) {
        const difference = Math.abs(y - previousY)
        expect(difference).toBeLessThanOrEqual(1)
      }
      previousY = y
    })
  })

  it('should handle zero width', () => {
    expect(() => findY(mockPath, 100, 50, 0)).not.toThrow()
  })

  it('should handle zero path length', () => {
    const zeroLengthPath = {
      getTotalLength: vi.fn().mockReturnValue(0),
      getPointAtLength: vi.fn().mockReturnValue({ x: 0, y: 0 })
    }

    expect(() => findY(zeroLengthPath, 0, 50, 100)).not.toThrow()
  })

  it('should make expected number of iterations', () => {
    findY(mockPath, 100, 50, 100)
    
    const accuracy = 1
    const width = 100
    const expectedIterations = Math.ceil(Math.log10(accuracy / width) / Math.log10(0.5))
    
    expect(mockPath.getPointAtLength).toHaveBeenCalledTimes(expectedIterations)
  })
})