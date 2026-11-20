import { describe, expect, it } from 'vitest'

import {
  attachDetailsDropdowns,
  attachGlobalRipple,
  attachOverflowMarquee,
  attachSmartTooltips,
  attachWaterDropScrollbar,
  placeContextMenuNearCursor,
} from './index'

describe('behaviours barrel', () => {
  it('re-exports core behaviour entrypoints', () => {
    expect(typeof attachGlobalRipple).toBe('function')
    expect(typeof attachOverflowMarquee).toBe('function')
    expect(typeof attachSmartTooltips).toBe('function')
    expect(typeof attachDetailsDropdowns).toBe('function')
    expect(typeof attachWaterDropScrollbar).toBe('function')
    expect(typeof placeContextMenuNearCursor).toBe('function')
  })
})
