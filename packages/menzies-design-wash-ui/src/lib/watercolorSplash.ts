export const SPLASH_VARIANTS = [
  'blob',
  'splash',
  'wash',
  'ring',
  'drip',
  'burst',
  'petal',
  'cloud',
  'puddle',
  'streak',
  'arc',
  'splatter',
  'feather',
  'wave',
  'ripple',
  'starburst',
  'comet',
  'smudge',
  'blot',
  'spray',
  'fan',
  'crescent',
  'teardrop',
  'cluster',
  'swirl',
  'blotchy',
  'streaky',
  'speckle',
  'halo',
  'notch',
  'shard',
  'bloom',
  'funnel',
  'tail',
  'crown',
  'island',
  'delta',
  'hook',
  'tendril',
  'crater',
] as const

export type SplashVariant = (typeof SPLASH_VARIANTS)[number]

export type WatercolorSplashConfig = {
  seed: number
  variant: SplashVariant
  colors: string[]
  opacity: number
  blur: number
  spread: number
  rotation: number
  size: number
}

export type WatercolorSplashPropsInput = Partial<
  Omit<WatercolorSplashConfig, 'seed' | 'colors'>
> & {
  seed?: number
  /** @deprecated Use `colors` array instead */
  color?: string
  /** @deprecated Use `colors` array instead */
  primaryColor?: string
  /** @deprecated Use `colors` array instead */
  secondaryColor?: string
  colors?: string[] | [string, string]
  className?: string
}

export const MAX_SPLASH_COLORS = 8

const DEFAULT_PRIMARY = 'var(--wash-a, var(--color-primary))'
const DEFAULT_SECONDARY = 'var(--wash-b, var(--color-accent))'
const DEFAULT_TERTIARY = 'var(--wash-c, var(--color-secondary))'

export const DEFAULT_SPLASH_COLORS = [DEFAULT_PRIMARY, DEFAULT_SECONDARY] as const

const THEME_COLOR_VARS = [
  DEFAULT_PRIMARY,
  DEFAULT_SECONDARY,
  DEFAULT_TERTIARY,
] as const

const EVEN_ODD_VARIANTS = new Set<SplashVariant>([
  'ring',
  'ripple',
  'halo',
  'crater',
  'notch',
  'crescent',
])

function mulberry32(seed: number) {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function pickVariant(rng: () => number): SplashVariant {
  return SPLASH_VARIANTS[Math.floor(rng() * SPLASH_VARIANTS.length)] ?? 'blob'
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function lerp(min: number, max: number, t: number) {
  return min + (max - min) * t
}

export function normalizeSplashColors(colors: string[]): string[] {
  const trimmed = colors.map((color) => color.trim()).filter(Boolean)
  if (trimmed.length === 0) return [...DEFAULT_SPLASH_COLORS]
  return trimmed.slice(0, MAX_SPLASH_COLORS)
}

export function resolveSplashColors(input?: Partial<WatercolorSplashPropsInput>): string[] {
  if (input?.colors && input.colors.length > 0) {
    return normalizeSplashColors([...input.colors])
  }

  const primary = input?.color ?? input?.primaryColor ?? DEFAULT_PRIMARY
  const secondary = input?.secondaryColor ?? DEFAULT_SECONDARY
  return normalizeSplashColors([primary, secondary])
}

export function themeSplashColors(count: number): string[] {
  const size = clamp(Math.floor(count), 1, MAX_SPLASH_COLORS)
  return Array.from({ length: size }, (_, index) => {
    const themeColor = THEME_COLOR_VARS[index % THEME_COLOR_VARS.length]
    return themeColor ?? DEFAULT_PRIMARY
  })
}

export function generateSplashConfig(seed?: number): WatercolorSplashConfig {
  const resolvedSeed = seed ?? Math.floor(Math.random() * 1_000_000)
  const rng = mulberry32(resolvedSeed)

  return {
    seed: resolvedSeed,
    variant: pickVariant(rng),
    colors: [...DEFAULT_SPLASH_COLORS],
    opacity: lerp(0.45, 0.88, rng()),
    blur: lerp(6, 28, rng()),
    spread: lerp(0.75, 1.35, rng()),
    rotation: Math.floor(lerp(0, 360, rng())),
    size: lerp(120, 320, rng()),
  }
}

export function mergeSplashConfig(
  base: WatercolorSplashConfig,
  input?: Partial<WatercolorSplashPropsInput>,
): WatercolorSplashConfig {
  const hasColorInput =
    input?.colors != null ||
    input?.color != null ||
    input?.primaryColor != null ||
    input?.secondaryColor != null

  return {
    seed: input?.seed ?? base.seed,
    variant: input?.variant ?? base.variant,
    colors: hasColorInput ? resolveSplashColors(input) : base.colors,
    opacity: input?.opacity ?? base.opacity,
    blur: input?.blur ?? base.blur,
    spread: input?.spread ?? base.spread,
    rotation: input?.rotation ?? base.rotation,
    size: input?.size ?? base.size,
  }
}

type Point = { x: number; y: number }

function organicBlobPoints(rng: () => number, spread: number, count?: number) {
  const total = count ?? 8 + Math.floor(rng() * 4)
  const points: Point[] = []
  for (let i = 0; i < total; i += 1) {
    const angle = (i / total) * Math.PI * 2
    const radius = lerp(28, 42, rng()) * spread
    const wobble = lerp(0.78, 1.22, rng())
    points.push({
      x: 50 + Math.cos(angle) * radius * wobble,
      y: 50 + Math.sin(angle) * radius * wobble,
    })
  }
  return points
}

function pointsToPath(points: Point[]) {
  if (points.length === 0) return ''
  const first = points[0]!
  let path = `M ${first.x.toFixed(2)} ${first.y.toFixed(2)}`
  for (let i = 0; i < points.length; i += 1) {
    const current = points[i]!
    const next = points[(i + 1) % points.length]!
    const midX = (current.x + next.x) / 2
    const midY = (current.y + next.y) / 2
    path += ` Q ${current.x.toFixed(2)} ${current.y.toFixed(2)} ${midX.toFixed(2)} ${midY.toFixed(2)}`
  }
  path += ' Z'
  return path
}

function polarPoints(
  rng: () => number,
  count: number,
  innerRadius: number,
  outerRadius: number,
  spread: number,
  offset = -Math.PI / 2,
) {
  const points: Point[] = []
  for (let i = 0; i < count * 2; i += 1) {
    const angle = (i / (count * 2)) * Math.PI * 2 + offset
    const outer = i % 2 === 0
    const radius =
      (outer ? lerp(outerRadius * 0.7, outerRadius, rng()) : lerp(innerRadius * 0.5, innerRadius, rng())) *
      spread
    points.push({
      x: 50 + Math.cos(angle) * radius,
      y: 50 + Math.sin(angle) * radius,
    })
  }
  return points
}

function ellipsePath(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  rotation = 0,
) {
  const cos = Math.cos(rotation)
  const sin = Math.sin(rotation)
  const x0 = cx + rx * cos
  const y0 = cy + rx * sin
  const x2 = cx - rx * cos
  const y2 = cy - rx * sin
  return [
    `M ${x0.toFixed(2)} ${y0.toFixed(2)}`,
    `A ${rx.toFixed(2)} ${ry.toFixed(2)} ${((rotation * 180) / Math.PI).toFixed(1)} 1 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`,
    `A ${rx.toFixed(2)} ${ry.toFixed(2)} ${((rotation * 180) / Math.PI).toFixed(1)} 1 1 ${x0.toFixed(2)} ${y0.toFixed(2)}`,
    'Z',
  ].join(' ')
}

function buildRingPath(rng: () => number, spread: number, shrink = lerp(0.52, 0.68, rng())) {
  const outer = organicBlobPoints(rng, spread)
  const inner = outer.map((point, index) => {
    const angle = (index / outer.length) * Math.PI * 2
    return {
      x: 50 + Math.cos(angle) * (point.x - 50) * shrink,
      y: 50 + Math.sin(angle) * (point.y - 50) * shrink,
    }
  })
  return `${pointsToPath(outer)} ${pointsToPath(inner.reverse())}`
}

function buildVariantPath(variant: SplashVariant, rng: () => number, spread: number) {
  switch (variant) {
    case 'splash':
      return pointsToPath(polarPoints(rng, 9 + Math.floor(rng() * 5), 12, 48, spread))
    case 'wash': {
      const left = lerp(8, 16, rng())
      const right = lerp(84, 92, rng())
      const top = lerp(36, 44, rng())
      const bottom = lerp(56, 64, rng())
      const curl = lerp(4, 12, rng()) * spread
      return [
        `M ${left.toFixed(1)} ${(top + curl).toFixed(1)}`,
        `C ${(left + 10).toFixed(1)} ${(top - curl).toFixed(1)} ${(50 - 8).toFixed(1)} ${(top - curl * 0.6).toFixed(1)} 50 ${top.toFixed(1)}`,
        `C ${(50 + 8).toFixed(1)} ${(top + curl * 0.8).toFixed(1)} ${(right - 10).toFixed(1)} ${(top - curl).toFixed(1)} ${right.toFixed(1)} ${(top + curl).toFixed(1)}`,
        `C ${(right - 6).toFixed(1)} ${(bottom + curl).toFixed(1)} ${(50 + 10).toFixed(1)} ${(bottom + curl * 0.5).toFixed(1)} 50 ${bottom.toFixed(1)}`,
        `C ${(50 - 10).toFixed(1)} ${(bottom - curl * 0.4).toFixed(1)} ${(left + 6).toFixed(1)} ${(bottom + curl).toFixed(1)} ${left.toFixed(1)} ${(top + curl).toFixed(1)}`,
        'Z',
      ].join(' ')
    }
    case 'ring':
      return buildRingPath(rng, spread)
    case 'drip': {
      const width = lerp(14, 22, rng()) * spread
      const top = lerp(18, 28, rng())
      const tip = lerp(78, 88, rng())
      return [
        `M ${(50 - width).toFixed(1)} ${top.toFixed(1)}`,
        `Q ${(50 - width * 1.4).toFixed(1)} ${lerp(45, 55, rng()).toFixed(1)} ${(50 - width * 0.4).toFixed(1)} ${lerp(58, 68, rng()).toFixed(1)}`,
        `Q ${50} ${tip.toFixed(1)} ${(50 + width * 0.4).toFixed(1)} ${lerp(58, 68, rng()).toFixed(1)}`,
        `Q ${(50 + width * 1.4).toFixed(1)} ${lerp(45, 55, rng()).toFixed(1)} ${(50 + width).toFixed(1)} ${top.toFixed(1)}`,
        `Q 50 ${(top - 8).toFixed(1)} ${(50 - width).toFixed(1)} ${top.toFixed(1)}`,
        'Z',
      ].join(' ')
    }
    case 'burst':
      return pointsToPath(polarPoints(rng, 12 + Math.floor(rng() * 6), 8, 46, spread))
    case 'petal': {
      const tilt = lerp(-0.4, 0.4, rng())
      const length = lerp(32, 44, rng()) * spread
      const width = lerp(14, 22, rng()) * spread
      return [
        `M 50 50`,
        `C ${(50 + width).toFixed(1)} ${(50 - length * 0.3).toFixed(1)} ${(50 + width * 0.6 + tilt * 10).toFixed(1)} ${(50 - length).toFixed(1)} 50 ${(50 - length).toFixed(1)}`,
        `C ${(50 - width * 0.6 - tilt * 10).toFixed(1)} ${(50 - length).toFixed(1)} ${(50 - width).toFixed(1)} ${(50 - length * 0.3).toFixed(1)} 50 50`,
        'Z',
      ].join(' ')
    }
    case 'cloud': {
      const bumps = 5 + Math.floor(rng() * 3)
      const points: Point[] = []
      for (let i = 0; i < bumps * 2; i += 1) {
        const t = i / (bumps * 2)
        const angle = lerp(-Math.PI * 0.15, Math.PI * 1.15, t)
        const outer = i % 2 === 0
        const radius = (outer ? lerp(30, 42, rng()) : lerp(18, 26, rng())) * spread
        points.push({
          x: 50 + Math.cos(angle) * radius * 1.1,
          y: 50 + Math.sin(angle) * radius * 0.75,
        })
      }
      return pointsToPath(points)
    }
    case 'puddle':
      return ellipsePath(50, lerp(52, 58, rng()), lerp(30, 40, rng()) * spread, lerp(12, 18, rng()) * spread, lerp(-0.2, 0.2, rng()))
    case 'streak': {
      const y = lerp(44, 56, rng())
      const height = lerp(6, 14, rng()) * spread
      const left = lerp(6, 14, rng())
      const right = lerp(86, 94, rng())
      return [
        `M ${left.toFixed(1)} ${(y + height).toFixed(1)}`,
        `C ${(left + 20).toFixed(1)} ${(y - height).toFixed(1)} ${(right - 20).toFixed(1)} ${(y - height * 0.6).toFixed(1)} ${right.toFixed(1)} ${y.toFixed(1)}`,
        `C ${(right - 8).toFixed(1)} ${(y + height).toFixed(1)} ${(left + 8).toFixed(1)} ${(y + height * 0.8).toFixed(1)} ${left.toFixed(1)} ${(y + height).toFixed(1)}`,
        'Z',
      ].join(' ')
    }
    case 'arc': {
      const start = lerp(-Math.PI * 0.85, -Math.PI * 0.55, rng())
      const end = lerp(Math.PI * 0.55, Math.PI * 0.85, rng())
      const outerR = lerp(36, 44, rng()) * spread
      const innerR = outerR * lerp(0.55, 0.72, rng())
      const outerStart = { x: 50 + Math.cos(start) * outerR, y: 50 + Math.sin(start) * outerR }
      const outerEnd = { x: 50 + Math.cos(end) * outerR, y: 50 + Math.sin(end) * outerR }
      const innerEnd = { x: 50 + Math.cos(end) * innerR, y: 50 + Math.sin(end) * innerR }
      const innerStart = { x: 50 + Math.cos(start) * innerR, y: 50 + Math.sin(start) * innerR }
      const largeArc = end - start > Math.PI ? 1 : 0
      return [
        `M ${outerStart.x.toFixed(2)} ${outerStart.y.toFixed(2)}`,
        `A ${outerR.toFixed(2)} ${outerR.toFixed(2)} 0 ${largeArc} 1 ${outerEnd.x.toFixed(2)} ${outerEnd.y.toFixed(2)}`,
        `L ${innerEnd.x.toFixed(2)} ${innerEnd.y.toFixed(2)}`,
        `A ${innerR.toFixed(2)} ${innerR.toFixed(2)} 0 ${largeArc} 0 ${innerStart.x.toFixed(2)} ${innerStart.y.toFixed(2)}`,
        'Z',
      ].join(' ')
    }
    case 'splatter': {
      const blobs: string[] = []
      const count = 4 + Math.floor(rng() * 4)
      for (let i = 0; i < count; i += 1) {
        const cx = lerp(28, 72, rng())
        const cy = lerp(28, 72, rng())
        const r = lerp(6, 16, rng()) * spread
        blobs.push(ellipsePath(cx, cy, r, r * lerp(0.7, 1.2, rng())))
      }
      return blobs.join(' ')
    }
    case 'feather': {
      const length = lerp(38, 48, rng()) * spread
      const width = lerp(8, 14, rng()) * spread
      const curve = lerp(8, 18, rng())
      return [
        `M 50 50`,
        `C ${(50 + width).toFixed(1)} ${(50 - length * 0.4).toFixed(1)} ${(50 + curve).toFixed(1)} ${(50 - length).toFixed(1)} ${(50 + width * 0.3).toFixed(1)} ${(50 - length).toFixed(1)}`,
        `C ${(50 - width * 0.5).toFixed(1)} ${(50 - length * 0.85).toFixed(1)} ${(50 - width).toFixed(1)} ${(50 - length * 0.35).toFixed(1)} 50 50`,
        'Z',
      ].join(' ')
    }
    case 'wave': {
      const baseY = lerp(48, 56, rng())
      const amp = lerp(6, 12, rng()) * spread
      return [
        `M 8 ${baseY.toFixed(1)}`,
        `C 22 ${(baseY - amp).toFixed(1)} 38 ${(baseY + amp).toFixed(1)} 50 ${baseY.toFixed(1)}`,
        `C 62 ${(baseY - amp).toFixed(1)} 78 ${(baseY + amp).toFixed(1)} 92 ${baseY.toFixed(1)}`,
        `L 92 ${(baseY + amp * 1.5).toFixed(1)}`,
        `C 78 ${(baseY + amp * 0.5).toFixed(1)} 62 ${(baseY + amp * 2).toFixed(1)} 50 ${(baseY + amp * 1.5).toFixed(1)}`,
        `C 38 ${(baseY + amp * 2).toFixed(1)} 22 ${(baseY + amp * 0.5).toFixed(1)} 8 ${(baseY + amp * 1.5).toFixed(1)}`,
        'Z',
      ].join(' ')
    }
    case 'ripple':
      return buildRingPath(rng, spread, lerp(0.72, 0.82, rng()))
    case 'starburst':
      return pointsToPath(polarPoints(rng, 16 + Math.floor(rng() * 8), 6, 44, spread))
    case 'comet': {
      const headR = lerp(14, 20, rng()) * spread
      const tailLen = lerp(28, 40, rng()) * spread
      const head = ellipsePath(lerp(58, 66, rng()), lerp(42, 52, rng()), headR, headR * 0.9)
      const tail = [
        `M ${(50 - tailLen).toFixed(1)} ${50}`,
        `L ${(50 - tailLen * 0.3).toFixed(1)} ${(50 - headR * 0.5).toFixed(1)}`,
        `L ${(50 + headR).toFixed(1)} ${50}`,
        `L ${(50 - tailLen * 0.3).toFixed(1)} ${(50 + headR * 0.5).toFixed(1)}`,
        'Z',
      ].join(' ')
      return `${head} ${tail}`
    }
    case 'smudge': {
      const points: Point[] = []
      const count = 10 + Math.floor(rng() * 4)
      for (let i = 0; i < count; i += 1) {
        const angle = lerp(-Math.PI * 0.35, Math.PI * 0.35, i / (count - 1)) + lerp(-0.2, 0.2, rng())
        const radius = lerp(20, 38, rng()) * spread
        points.push({
          x: 50 + Math.cos(angle) * radius,
          y: 50 + Math.sin(angle) * radius * 0.55,
        })
      }
      return pointsToPath(points)
    }
    case 'blot':
      return pointsToPath(organicBlobPoints(rng, spread * 0.85, 10))
    case 'spray': {
      const rays = 7 + Math.floor(rng() * 5)
      const points: Point[] = [{ x: 50, y: 50 }]
      for (let i = 0; i < rays; i += 1) {
        const angle = lerp(-Math.PI * 0.6, Math.PI * 0.15, rng())
        const radius = lerp(28, 44, rng()) * spread
        points.push({
          x: 50 + Math.cos(angle) * radius,
          y: 50 + Math.sin(angle) * radius,
        })
      }
      points.sort((a, b) => Math.atan2(a.y - 50, a.x - 50) - Math.atan2(b.y - 50, b.x - 50))
      return pointsToPath(points)
    }
    case 'fan': {
      const start = lerp(-Math.PI * 0.75, -Math.PI * 0.45, rng())
      const end = lerp(Math.PI * 0.05, Math.PI * 0.35, rng())
      const radius = lerp(36, 46, rng()) * spread
      const startPt = { x: 50 + Math.cos(start) * radius, y: 50 + Math.sin(start) * radius }
      const endPt = { x: 50 + Math.cos(end) * radius, y: 50 + Math.sin(end) * radius }
      return [
        `M 50 50`,
        `L ${startPt.x.toFixed(2)} ${startPt.y.toFixed(2)}`,
        `Q ${(50 + Math.cos((start + end) / 2) * radius * 1.05).toFixed(2)} ${(50 + Math.sin((start + end) / 2) * radius * 1.05).toFixed(2)} ${endPt.x.toFixed(2)} ${endPt.y.toFixed(2)}`,
        'Z',
      ].join(' ')
    }
    case 'crescent':
      return buildRingPath(rng, spread, lerp(0.78, 0.88, rng()))
    case 'teardrop': {
      const size = lerp(32, 42, rng()) * spread
      return [
        `M 50 ${(50 - size).toFixed(1)}`,
        `C ${(50 + size * 0.65).toFixed(1)} ${(50 - size * 0.2).toFixed(1)} ${(50 + size * 0.55).toFixed(1)} ${(50 + size * 0.55).toFixed(1)} 50 ${(50 + size * 0.65).toFixed(1)}`,
        `C ${(50 - size * 0.55).toFixed(1)} ${(50 + size * 0.55).toFixed(1)} ${(50 - size * 0.65).toFixed(1)} ${(50 - size * 0.2).toFixed(1)} 50 ${(50 - size).toFixed(1)}`,
        'Z',
      ].join(' ')
    }
    case 'cluster': {
      const parts: string[] = []
      const count = 3 + Math.floor(rng() * 3)
      for (let i = 0; i < count; i += 1) {
        const cx = lerp(32, 68, rng())
        const cy = lerp(32, 68, rng())
        const r = lerp(10, 18, rng()) * spread
        const localRng = mulberry32(Math.floor(rng() * 10000))
        const blob = organicBlobPoints(localRng, 0.55, 6).map((p) => ({
          x: cx + (p.x - 50) * (r / 40),
          y: cy + (p.y - 50) * (r / 40),
        }))
        parts.push(pointsToPath(blob))
      }
      return parts.join(' ')
    }
    case 'swirl': {
      const points: Point[] = []
      const turns = lerp(1.2, 1.8, rng())
      const steps = 24
      for (let i = 0; i <= steps; i += 1) {
        const t = i / steps
        const angle = t * Math.PI * 2 * turns - Math.PI / 2
        const radius = lerp(8, 38, t) * spread
        points.push({
          x: 50 + Math.cos(angle) * radius,
          y: 50 + Math.sin(angle) * radius,
        })
      }
      for (let i = steps; i >= 0; i -= 1) {
        const t = i / steps
        const angle = t * Math.PI * 2 * turns - Math.PI / 2 + 0.35
        const radius = lerp(6, 32, t) * spread
        points.push({
          x: 50 + Math.cos(angle) * radius,
          y: 50 + Math.sin(angle) * radius,
        })
      }
      return pointsToPath(points)
    }
    case 'blotchy':
      return pointsToPath(organicBlobPoints(rng, spread * 1.15, 12))
    case 'streaky': {
      const streaks: string[] = []
      const count = 3 + Math.floor(rng() * 3)
      for (let i = 0; i < count; i += 1) {
        const y = lerp(30, 70, rng())
        const h = lerp(4, 10, rng()) * spread
        const left = lerp(10, 24, rng())
        const right = lerp(76, 90, rng())
        streaks.push(
          [
            `M ${left.toFixed(1)} ${(y + h).toFixed(1)}`,
            `C ${(left + 18).toFixed(1)} ${(y - h).toFixed(1)} ${(right - 18).toFixed(1)} ${y.toFixed(1)} ${right.toFixed(1)} ${(y + h * 0.5).toFixed(1)}`,
            `C ${(right - 6).toFixed(1)} ${(y + h).toFixed(1)} ${(left + 6).toFixed(1)} ${(y + h * 0.7).toFixed(1)} ${left.toFixed(1)} ${(y + h).toFixed(1)}`,
            'Z',
          ].join(' '),
        )
      }
      return streaks.join(' ')
    }
    case 'speckle': {
      const dots: string[] = []
      const count = 8 + Math.floor(rng() * 8)
      for (let i = 0; i < count; i += 1) {
        const cx = lerp(22, 78, rng())
        const cy = lerp(22, 78, rng())
        const r = lerp(3, 9, rng()) * spread
        dots.push(ellipsePath(cx, cy, r, r * lerp(0.8, 1.3, rng())))
      }
      return dots.join(' ')
    }
    case 'halo':
      return buildRingPath(rng, spread, lerp(0.82, 0.9, rng()))
    case 'notch': {
      const outer = organicBlobPoints(rng, spread)
      const notchDepth = lerp(0.35, 0.5, rng())
      const notchAngle = lerp(-0.5, 0.8, rng())
      const inner = outer.map((point, index) => {
        const angle = (index / outer.length) * Math.PI * 2
        let shrink = lerp(0.55, 0.68, rng())
        if (Math.abs(angle - notchAngle) < 0.5) shrink = notchDepth
        return {
          x: 50 + Math.cos(angle) * (point.x - 50) * shrink,
          y: 50 + Math.sin(angle) * (point.y - 50) * shrink,
        }
      })
      return `${pointsToPath(outer)} ${pointsToPath(inner.reverse())}`
    }
    case 'shard': {
      const points: Point[] = []
      const corners = 3 + Math.floor(rng() * 2)
      for (let i = 0; i < corners; i += 1) {
        const angle = (i / corners) * Math.PI * 2 - Math.PI / 2 + lerp(-0.15, 0.15, rng())
        const radius = lerp(30, 44, rng()) * spread
        points.push({
          x: 50 + Math.cos(angle) * radius,
          y: 50 + Math.sin(angle) * radius,
        })
      }
      return pointsToPath(points)
    }
    case 'bloom': {
      const petals = 5 + Math.floor(rng() * 3)
      const parts: string[] = []
      for (let i = 0; i < petals; i += 1) {
        const angle = (i / petals) * Math.PI * 2 - Math.PI / 2
        const length = lerp(22, 32, rng()) * spread
        const width = lerp(10, 16, rng()) * spread
        const tipX = 50 + Math.cos(angle) * length
        const tipY = 50 + Math.sin(angle) * length
        const leftX = 50 + Math.cos(angle - 0.35) * width
        const leftY = 50 + Math.sin(angle - 0.35) * width
        const rightX = 50 + Math.cos(angle + 0.35) * width
        const rightY = 50 + Math.sin(angle + 0.35) * width
        parts.push(
          [
            `M 50 50`,
            `Q ${leftX.toFixed(1)} ${leftY.toFixed(1)} ${tipX.toFixed(1)} ${tipY.toFixed(1)}`,
            `Q ${rightX.toFixed(1)} ${rightY.toFixed(1)} 50 50`,
            'Z',
          ].join(' '),
        )
      }
      return parts.join(' ')
    }
    case 'funnel': {
      const topWidth = lerp(36, 48, rng()) * spread
      const neck = lerp(6, 12, rng()) * spread
      const top = lerp(16, 26, rng())
      const bottom = lerp(72, 84, rng())
      return [
        `M ${(50 - topWidth).toFixed(1)} ${top.toFixed(1)}`,
        `L ${(50 + topWidth).toFixed(1)} ${top.toFixed(1)}`,
        `L ${(50 + neck).toFixed(1)} ${bottom.toFixed(1)}`,
        `L ${(50 - neck).toFixed(1)} ${bottom.toFixed(1)}`,
        'Z',
      ].join(' ')
    }
    case 'tail': {
      const headR = lerp(16, 22, rng()) * spread
      const headX = lerp(62, 70, rng())
      const headY = lerp(46, 54, rng())
      return [
        ellipsePath(headX, headY, headR, headR * 0.85),
        `M ${(headX - headR).toFixed(1)} ${headY.toFixed(1)}`,
        `C ${(headX - headR * 2.2).toFixed(1)} ${(headY - headR * 0.3).toFixed(1)} ${(headX - headR * 3).toFixed(1)} ${(headY + headR * 0.5).toFixed(1)} ${(headX - headR * 3.8).toFixed(1)} ${(headY + headR * 0.2).toFixed(1)}`,
        `C ${(headX - headR * 2.5).toFixed(1)} ${(headY + headR * 0.8).toFixed(1)} ${(headX - headR * 1.2).toFixed(1)} ${(headY + headR * 0.4).toFixed(1)} ${(headX - headR).toFixed(1)} ${headY.toFixed(1)}`,
        'Z',
      ].join(' ')
    }
    case 'crown': {
      const peaks = 5 + Math.floor(rng() * 3)
      const points: Point[] = []
      for (let i = 0; i < peaks * 2; i += 1) {
        const t = i / (peaks * 2)
        const angle = lerp(-Math.PI * 0.9, -Math.PI * 0.1, t)
        const outer = i % 2 === 0
        const radius = (outer ? lerp(34, 44, rng()) : lerp(20, 28, rng())) * spread
        points.push({
          x: 50 + Math.cos(angle) * radius,
          y: 50 + Math.sin(angle) * radius * 0.9 + (outer ? -4 : 6),
        })
      }
      return pointsToPath(points)
    }
    case 'island': {
      const points: Point[] = []
      const count = 9 + Math.floor(rng() * 4)
      for (let i = 0; i < count; i += 1) {
        const angle = (i / count) * Math.PI * 2
        const radiusX = lerp(26, 40, rng()) * spread
        const radiusY = lerp(20, 34, rng()) * spread
        points.push({
          x: 50 + Math.cos(angle) * radiusX,
          y: 50 + Math.sin(angle) * radiusY,
        })
      }
      return pointsToPath(points)
    }
    case 'delta': {
      const width = lerp(38, 48, rng()) * spread
      const top = lerp(18, 28, rng())
      const bottom = lerp(72, 82, rng())
      const inset = lerp(8, 16, rng()) * spread
      return [
        `M ${(50 - width).toFixed(1)} ${top.toFixed(1)}`,
        `L ${(50 + width).toFixed(1)} ${top.toFixed(1)}`,
        `L ${(50 + inset).toFixed(1)} ${bottom.toFixed(1)}`,
        `L ${(50 - inset).toFixed(1)} ${bottom.toFixed(1)}`,
        'Z',
      ].join(' ')
    }
    case 'hook': {
      const thickness = lerp(10, 16, rng()) * spread
      return [
        `M ${(50 - thickness).toFixed(1)} ${(50 - thickness).toFixed(1)}`,
        `C ${(50 + thickness * 1.5).toFixed(1)} ${(50 - thickness * 1.8).toFixed(1)} ${(50 + thickness * 1.8).toFixed(1)} ${(50 + thickness).toFixed(1)} ${50} ${(50 + thickness * 1.6).toFixed(1)}`,
        `C ${(50 - thickness * 1.2).toFixed(1)} ${(50 + thickness * 2).toFixed(1)} ${(50 - thickness * 2).toFixed(1)} ${(50 + thickness * 0.5).toFixed(1)} ${(50 - thickness).toFixed(1)} ${(50 - thickness).toFixed(1)}`,
        'Z',
      ].join(' ')
    }
    case 'tendril': {
      const points: Point[] = []
      const steps = 16
      for (let i = 0; i <= steps; i += 1) {
        const t = i / steps
        const angle = t * Math.PI * 1.4 - Math.PI / 2
        const radius = lerp(10, 36, t) * spread
        const width = lerp(8, 2, t)
        points.push({
          x: 50 + Math.cos(angle) * radius + Math.cos(angle + Math.PI / 2) * width,
          y: 50 + Math.sin(angle) * radius + Math.sin(angle + Math.PI / 2) * width,
        })
      }
      for (let i = steps; i >= 0; i -= 1) {
        const t = i / steps
        const angle = t * Math.PI * 1.4 - Math.PI / 2
        const radius = lerp(10, 36, t) * spread
        const width = lerp(8, 2, t)
        points.push({
          x: 50 + Math.cos(angle) * radius - Math.cos(angle + Math.PI / 2) * width,
          y: 50 + Math.sin(angle) * radius - Math.sin(angle + Math.PI / 2) * width,
        })
      }
      return pointsToPath(points)
    }
    case 'crater':
      return buildRingPath(rng, spread, lerp(0.38, 0.52, rng()))
    case 'blob':
    default:
      return pointsToPath(organicBlobPoints(rng, spread))
  }
}

function filterId(config: WatercolorSplashConfig) {
  return `wash-splash-filter-${config.seed}-${config.variant}`
}

function gradientId(config: WatercolorSplashConfig) {
  return `wash-splash-gradient-${config.seed}-${config.variant}`
}

function buildGradientStops(colors: string[], opacity: number) {
  const normalized = normalizeSplashColors(colors)
  if (normalized.length === 1) {
    const color = normalized[0]!
    return [
      `<stop offset="0%" stop-color="${color}" stop-opacity="${opacity.toFixed(2)}" />`,
      `<stop offset="100%" stop-color="${color}" stop-opacity="0" />`,
    ]
  }

  if (normalized.length === 2) {
    const [primary, secondary] = normalized
    return [
      `<stop offset="0%" stop-color="${primary}" stop-opacity="${opacity.toFixed(2)}" />`,
      `<stop offset="58%" stop-color="${secondary}" stop-opacity="${(opacity * 0.72).toFixed(2)}" />`,
      `<stop offset="100%" stop-color="${secondary}" stop-opacity="0" />`,
    ]
  }

  return normalized.map((color, index) => {
    const last = index === normalized.length - 1
    const offset =
      index === 0 ? 0 : last ? 100 : Math.round((index / (normalized.length - 1)) * 88)
    const stopOpacity = last ? 0 : opacity * (1 - (index / (normalized.length - 1)) * 0.38)
    return `<stop offset="${offset}%" stop-color="${color}" stop-opacity="${stopOpacity.toFixed(2)}" />`
  })
}

function buildAccentLayers(config: WatercolorSplashConfig) {
  if (config.colors.length < 3) return ''

  const layers: string[] = []
  for (let index = 2; index < config.colors.length; index += 1) {
    const color = config.colors[index]!
    const blobRng = mulberry32(config.seed + index * 7919)
    const path = pointsToPath(
      organicBlobPoints(blobRng, config.spread * lerp(0.32, 0.52, blobRng()), 7),
    )
    const cx = lerp(22, 78, blobRng())
    const cy = lerp(22, 78, blobRng())
    const layerOpacity = clamp(config.opacity * lerp(0.34, 0.58, blobRng()), 0.05, 0.78)
    layers.push(
      `<g transform="translate(${(cx - 50).toFixed(1)} ${(cy - 50).toFixed(1)})"><path d="${path}" fill="${color}" fill-opacity="${layerOpacity.toFixed(2)}" /></g>`,
    )
  }

  return layers.join('\n    ')
}

export function buildSplashSvgMarkup(
  config: WatercolorSplashConfig,
  options?: { inline?: boolean },
): string {
  const rng = mulberry32(config.seed)
  const path = buildVariantPath(config.variant, rng, config.spread)
  const filter = filterId(config)
  const gradient = gradientId(config)
  const displacement = clamp(config.spread * 18, 8, 36)
  const turbulenceSeed = config.seed % 997
  const opacity = clamp(config.opacity, 0.05, 1)
  const blur = clamp(config.blur, 0, 48)
  const fillRule = EVEN_ODD_VARIANTS.has(config.variant) ? ' fill-rule="evenodd"' : ''
  const gradientStops = buildGradientStops(config.colors, opacity).join('\n      ')
  const accentLayers = buildAccentLayers(config)

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="${config.size}" height="${config.size}" role="img" aria-hidden="true">
  <defs>
    <filter id="${filter}" x="-30%" y="-30%" width="160%" height="160%" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="3" seed="${turbulenceSeed}" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="${displacement.toFixed(1)}" xChannelSelector="R" yChannelSelector="G" result="displaced" />
      <feGaussianBlur in="displaced" stdDeviation="${(blur / 10).toFixed(2)}" />
    </filter>
    <radialGradient id="${gradient}" cx="42%" cy="38%" r="68%">
      ${gradientStops}
    </radialGradient>
  </defs>
  <g transform="rotate(${config.rotation} 50 50)" filter="url(#${filter})">
    <path d="${path}" fill="url(#${gradient})"${fillRule} />
    ${accentLayers}
  </g>
</svg>`

  if (options?.inline) {
    return svg.replace(/\s+/g, ' ').trim()
  }
  return svg
}

export function splashToSvg(config: WatercolorSplashConfig): string {
  return buildSplashSvgMarkup(config)
}

export function splashToCss(config: WatercolorSplashConfig): string {
  const encoded = encodeURIComponent(buildSplashSvgMarkup(config, { inline: true }))
  return [
    `.wash-paint-splash-${config.seed} {`,
    `  width: ${config.size}px;`,
    `  height: ${config.size}px;`,
    `  background-image: url("data:image/svg+xml,${encoded}");`,
    '  background-repeat: no-repeat;',
    '  background-size: contain;',
    '  background-position: center;',
    '}',
  ].join('\n')
}

function formatProp(value: string | number | boolean | undefined) {
  if (typeof value === 'number') return `{${value}}`
  if (typeof value === 'boolean') return `{${value}}`
  return `"${value}"`
}

function colorsMatchDefaults(colors: string[]) {
  return (
    colors.length === DEFAULT_SPLASH_COLORS.length &&
    colors.every((color, index) => color === DEFAULT_SPLASH_COLORS[index])
  )
}

function formatColorsProp(colors: string[]) {
  const formatted = colors.map((color) => `"${color}"`).join(', ')
  return `{[${formatted}]}`
}

export function splashToReact(config: WatercolorSplashConfig): string {
  const props = [
    !colorsMatchDefaults(config.colors)
      ? `colors=${formatColorsProp(config.colors)}`
      : null,
    config.variant !== 'blob' ? `variant=${formatProp(config.variant)}` : null,
    config.seed ? `seed={${config.seed}}` : null,
    config.opacity !== 0.65 ? `opacity={${config.opacity.toFixed(2)}}` : null,
    config.blur !== 16 ? `blur={${config.blur.toFixed(1)}}` : null,
    config.spread !== 1 ? `spread={${config.spread.toFixed(2)}}` : null,
    config.rotation ? `rotation={${config.rotation}}` : null,
    config.size !== 200 ? `size={${Math.round(config.size)}}` : null,
  ]
    .filter(Boolean)
    .join('\n  ')

  return props
    ? `<WatercolorSplash\n  ${props}\n/>`
    : '<WatercolorSplash />'
}

export function splashToHtml(config: WatercolorSplashConfig): string {
  return buildSplashSvgMarkup(config)
}

export function splashVariantLabel(variant: SplashVariant): string {
  return variant.charAt(0).toUpperCase() + variant.slice(1)
}

export { DEFAULT_PRIMARY, DEFAULT_SECONDARY, DEFAULT_TERTIARY }
