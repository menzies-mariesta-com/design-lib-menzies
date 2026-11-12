import { describe, expect, it } from 'vitest'
import {
  computeVerticalThumb,
  easeStretch,
  stretchFromVelocity,
} from './waterDropScrollbar'

describe('waterDropScrollbar', () => {
  it('computeVerticalThumb returns not visible when no overflow', () => {
    expect(computeVerticalThumb(0, 400, 400)).toEqual({
      visible: false,
      top: 0,
      height: 0,
    })
  })

  it('computeVerticalThumb scales height with content ratio', () => {
    const m = computeVerticalThumb(0, 2000, 500, {
      minThumbPx: 24,
      maxThumbPx: 200,
    })
    expect(m.visible).toBe(true)
    expect(m.height).toBeGreaterThanOrEqual(24)
    expect(m.height).toBeLessThanOrEqual(125)
    expect(m.top).toBe(0)
  })

  it('computeVerticalThumb moves top at mid scroll', () => {
    const m = computeVerticalThumb(500, 2000, 500, {
      minThumbPx: 24,
      maxThumbPx: 200,
    })
    expect(m.top).toBeGreaterThan(100)
    expect(m.top).toBeLessThan(400)
  })

  it('stretchFromVelocity increases with speed', () => {
    const slow = stretchFromVelocity(0.2, {
      maxStretch: 2,
      velocityGain: 0.02,
    })
    const fast = stretchFromVelocity(4, {
      maxStretch: 2,
      velocityGain: 0.02,
    })
    expect(fast).toBeGreaterThan(slow)
    expect(fast).toBeLessThanOrEqual(2)
  })

  it('easeStretch decays toward 1', () => {
    const next = easeStretch(1.6, 1, 32, 100)
    expect(next).toBeLessThan(1.6)
    expect(next).toBeGreaterThan(1)
  })
})
