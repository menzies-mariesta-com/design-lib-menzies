import { describe, expect, it } from 'vitest'
import {
  computeDropRadiusPx,
  easeActivity,
  springFollow,
  WaterDropFluidSim,
} from './waterDropFluidSim'

describe('waterDropFluidSim', () => {
  it('computeDropRadiusPx grows with more content than viewport', () => {
    const small = computeDropRadiusPx({
      clientSize: 400,
      scrollSize: 1600,
    })
    const large = computeDropRadiusPx({
      clientSize: 400,
      scrollSize: 500,
    })
    expect(small).toBeLessThan(large)
  })

  it('easeActivity rises faster than it falls', () => {
    const rise = easeActivity(0, 1, 80, 140, 520)
    const fall = easeActivity(1, 0, 80, 140, 520)
    expect(rise).toBeGreaterThan(1 - fall)
  })

  it('springFollow moves toward target', () => {
    const next = springFollow(0, 100, 32)
    expect(next).toBeGreaterThan(0)
    expect(next).toBeLessThan(100)
  })

  it('impulse adds scroll-axis velocity', () => {
    const sim = new WaterDropFluidSim(14, 'vertical')
    const vySum = () => sim.particles.reduce((s, p) => s + Math.abs(p.vy), 0)
    expect(vySum()).toBeLessThan(0.01)
    sim.impulseScroll(2.5)
    expect(vySum()).toBeGreaterThan(1)
  })

  it('area stays near target after steps', () => {
    const sim = new WaterDropFluidSim(16, 'vertical')
    for (let i = 0; i < 30; i++) sim.step(16, 0.5, false)
    let minX = Infinity
    let maxX = -Infinity
    let minY = Infinity
    let maxY = -Infinity
    for (const p of sim.particles) {
      minX = Math.min(minX, p.x)
      maxX = Math.max(maxX, p.x)
      minY = Math.min(minY, p.y)
      maxY = Math.max(maxY, p.y)
    }
    const approxArea = (maxX - minX) * (maxY - minY) * 0.55
    expect(approxArea).toBeGreaterThan(sim.targetArea * 0.35)
    expect(approxArea).toBeLessThan(sim.targetArea * 3.5)
  })
})
