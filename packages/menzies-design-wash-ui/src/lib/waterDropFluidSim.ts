/**
 * Lightweight 2D wet-blob sim for scroll-indicator drops (XPBD-ish + area preserve).
 * Sim units: local space centered at rest; caller maps to screen pixels.
 */

export type FluidAxis = 'vertical' | 'horizontal'

export type FluidMassOptions = {
  clientSize: number
  scrollSize: number
  minRadiusPx?: number
  maxRadiusPx?: number
  /** Multiplier on clientSize * sqrt(client/scroll). */
  massGain?: number
}

export type FluidParticle = {
  x: number
  y: number
  vx: number
  vy: number
}

const DEFAULT_MASS = {
  minRadiusPx: 8,
  maxRadiusPx: 19,
  massGain: 0.036,
} as const

const PARTICLE_COUNT = 24
const REST_DIST_FACTOR = 0.92
const CENTER_SPRING = 14
const DAMPING_IDLE = 0.82
const DAMPING_ACTIVE = 0.94
const AREA_LERP = 0.35
const IMPULSE_CAP = 2.8

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n))
}

/** Visible drop radius from content ratio and viewport extent (px). */
export function computeDropRadiusPx(opts: FluidMassOptions): number {
  const {
    clientSize,
    scrollSize,
    minRadiusPx = DEFAULT_MASS.minRadiusPx,
    maxRadiusPx = DEFAULT_MASS.maxRadiusPx,
    massGain = DEFAULT_MASS.massGain,
  } = opts
  if (scrollSize <= 0 || clientSize <= 0) return minRadiusPx
  const ratio = clamp(clientSize / scrollSize, 0.05, 1)
  const r = massGain * clientSize * Math.sqrt(ratio)
  return clamp(minRadiusPx, maxRadiusPx, r)
}

/** Scroll activity 0–1 with asymmetric ease. */
export function easeActivity(
  current: number,
  target: number,
  dtMs: number,
  riseHalfLifeMs = 140,
  fallHalfLifeMs = 520,
): number {
  if (dtMs <= 0) return current
  const half = target > current ? riseHalfLifeMs : fallHalfLifeMs
  const alpha = 1 - Math.exp(-dtMs / half)
  return current + (target - current) * alpha
}

function ringArea(particles: FluidParticle[]): number {
  let a = 0
  const n = particles.length
  for (let i = 0; i < n; i++) {
    const p0 = particles[i]
    const p1 = particles[(i + 1) % n]
    a += p0.x * p1.y - p1.x * p0.y
  }
  return Math.abs(a) * 0.5
}

function enforceRingDistances(
  particles: FluidParticle[],
  restDist: number,
  stiffness: number,
): void {
  const n = particles.length
  for (let i = 0; i < n; i++) {
    const a = particles[i]
    const b = particles[(i + 1) % n]
    let dx = b.x - a.x
    let dy = b.y - a.y
    let dist = Math.hypot(dx, dy)
    if (dist < 1e-4) continue
    const err = dist - restDist
    const corr = (err / dist) * stiffness * 0.5
    dx *= corr
    dy *= corr
    a.x += dx
    a.y += dy
    b.x -= dx
    b.y -= dy
  }
}

function enforceTargetArea(
  particles: FluidParticle[],
  targetArea: number,
): void {
  const area = ringArea(particles)
  if (area < 1e-6) return
  const scale = Math.sqrt(targetArea / area)
  const blend = AREA_LERP
  const s = 1 + (scale - 1) * blend
  for (const p of particles) {
    p.x *= s
    p.y *= s
  }
}

export class WaterDropFluidSim {
  readonly particles: FluidParticle[]
  readonly axis: FluidAxis
  readonly targetArea: number
  readonly restRadius: number
  private readonly restDist: number
  private breathPhase = 0

  constructor(restRadiusPx: number, axis: FluidAxis, count = PARTICLE_COUNT) {
    this.axis = axis
    this.restRadius = restRadiusPx
    this.restDist = (2 * Math.PI * restRadiusPx * REST_DIST_FACTOR) / count
    this.targetArea = Math.PI * restRadiusPx * restRadiusPx * 0.82
    this.particles = []
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 2
      const x = Math.cos(t) * restRadiusPx
      const y = Math.sin(t) * restRadiusPx
      this.particles.push({ x, y, vx: 0, vy: 0 })
    }
  }

  /** Impulse from scroll velocity (px/ms); elongates along scroll axis. */
  impulseScroll(velocityPxPerMs: number, gain = 1.15): void {
    const v = clamp(velocityPxPerMs * gain, -IMPULSE_CAP, IMPULSE_CAP)
    const alongX = this.axis === 'horizontal' ? v : 0
    const alongY = this.axis === 'vertical' ? v : 0
    for (const p of this.particles) {
      p.vx += alongX
      p.vy += alongY
    }
  }

  step(
    dtMs: number,
    activity: number,
    reducedMotion: boolean,
  ): void {
    if (reducedMotion) return
    const dt = clamp(dtMs / 1000, 0.001, 0.05)
    const damp = DAMPING_IDLE + (DAMPING_ACTIVE - DAMPING_IDLE) * activity
    const stiff = 0.45 + activity * 0.25

    this.breathPhase += dt * (0.6 + activity * 2.2)
    const breath =
      activity > 0.28 ? Math.sin(this.breathPhase) * (0.6 + activity * 1.2) : 0

    const n = this.particles.length
    for (const p of this.particles) {
      p.vx += (-p.x * CENTER_SPRING - p.vx * 2) * dt
      p.vy += (-p.y * CENTER_SPRING - p.vy * 2) * dt
      if (breath !== 0) {
        const len = Math.hypot(p.x, p.y) || 1
        p.x += (p.x / len) * breath * dt
        p.y += (p.y / len) * breath * dt
      }
      p.vx *= damp
      p.vy *= damp
      p.x += p.vx * dt * 60
      p.y += p.vy * dt * 60
    }

    for (let i = 0; i < 2; i++) {
      enforceRingDistances(this.particles, this.restDist, stiff)
      enforceTargetArea(this.particles, this.targetArea)
    }

    for (let i = 0; i < n; i++) {
      const a = this.particles[i]
      const b = this.particles[(i + 1) % n]
      const midX = (a.x + b.x) * 0.5
      const midY = (a.y + b.y) * 0.5
      const radial = Math.hypot(midX, midY) || 1
      const pull = (this.restRadius - radial) * 0.08 * dt * 60
      a.vx += (midX / radial) * pull
      a.vy += (midY / radial) * pull
      b.vx += (midX / radial) * pull
      b.vy += (midY / radial) * pull
    }
  }

  /** Particles in screen space (px). */
  toScreenPoints(
    centerX: number,
    centerY: number,
    particleRadiusPx: number,
  ): Array<{ x: number; y: number; r: number }> {
    const kernel = particleRadiusPx
    return this.particles.map((p) => ({
      x: centerX + p.x,
      y: centerY + p.y,
      r: kernel,
    }))
  }

  /** Eccentricity along scroll axis after impulse (≥1). For tests. */
  eccentricity(): number {
    let minA = Infinity
    let maxA = -Infinity
    for (const p of this.particles) {
      const a = this.axis === 'vertical' ? p.y : p.x
      minA = Math.min(minA, a)
      maxA = Math.max(maxA, a)
    }
    let minC = Infinity
    let maxC = -Infinity
    for (const p of this.particles) {
      const c = this.axis === 'vertical' ? p.x : p.y
      minC = Math.min(minC, c)
      maxC = Math.max(maxC, c)
    }
    const major = maxA - minA
    const minor = maxC - minC
    if (minor < 1e-3) return 1
    return major / minor
  }
}

/** Critical-damped spring toward target (1D, px). */
export function springFollow(
  pos: number,
  target: number,
  dtMs: number,
  stiffness = 0.018,
): number {
  if (dtMs <= 0) return pos
  const t = 1 - Math.exp(-stiffness * dtMs)
  return pos + (target - pos) * t
}
