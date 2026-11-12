import { describe, expect, it } from 'vitest'
import { dropDrawBounds } from './waterDropFluidRender'

describe('waterDropFluidRender', () => {
  it('dropDrawBounds caps draw region', () => {
    const points = [{ x: 400, y: 300, r: 80 }]
    const b = dropDrawBounds(points, 8, 120)
    expect(b).not.toBeNull()
    expect(b!.width).toBeLessThanOrEqual(120)
    expect(b!.height).toBeLessThanOrEqual(120)
    expect(b!.x).toBeGreaterThan(300)
    expect(b!.y).toBeGreaterThan(200)
  })

  it('dropDrawBounds returns null for empty', () => {
    expect(dropDrawBounds([])).toBeNull()
  })
})
