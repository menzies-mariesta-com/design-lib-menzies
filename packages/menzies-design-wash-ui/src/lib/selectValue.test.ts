import { describe, expect, it } from 'vitest'
import {
  formatMultiSelectTrigger,
  toggleSelectValues,
} from './selectValue'

describe('selectValue', () => {
  it('toggleSelectValues adds and removes in option order', () => {
    const order = ['a', 'b', 'c']
    expect(toggleSelectValues(['a'], 'b', order)).toEqual(['a', 'b'])
    expect(toggleSelectValues(['a', 'b'], 'a', order)).toEqual(['b'])
    expect(toggleSelectValues(['c', 'a'], 'b', order)).toEqual(['a', 'b', 'c'])
  })

  it('formatMultiSelectTrigger summarizes many picks', () => {
    const label = (v: string) => v.toUpperCase()
    expect(
      formatMultiSelectTrigger(['a', 'b', 'c'], label, 'Pick…', 2),
    ).toBe('A, B +1')
    expect(formatMultiSelectTrigger([], label, 'Pick…')).toBe('Pick…')
  })
})
