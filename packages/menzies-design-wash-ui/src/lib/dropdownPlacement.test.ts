import { describe, expect, it } from 'vitest'
import {
  dropdownPlacementClassName,
  sameDropdownPlacement,
  shouldFlipDropdownTop,
} from './dropdownPlacement'

describe('dropdownPlacement', () => {
  it('dropdownPlacementClassName reflects end and top flags', () => {
    const className = dropdownPlacementClassName({
      end: true,
      top: true,
      maxHeight: 240,
    })
    expect(className).toContain('dropdown-end')
    expect(className).toContain('dropdown-top')
  })

  it('shouldFlipDropdownTop honors forced bottom', () => {
    expect(
      shouldFlipDropdownTop('bottom', 40, 400, 160),
    ).toBe(false)
    expect(
      shouldFlipDropdownTop('auto', 40, 400, 160),
    ).toBe(true)
    expect(
      shouldFlipDropdownTop('auto', 200, 100, 160),
    ).toBe(false)
  })

  it('sameDropdownPlacement compares placement tuples', () => {
    const a = { end: false, top: true, maxHeight: 200 }
    const b = { end: false, top: true, maxHeight: 200 }
    expect(sameDropdownPlacement(a, b)).toBe(true)
    expect(
      sameDropdownPlacement(a, { ...a, maxHeight: 201 }),
    ).toBe(false)
  })
})
