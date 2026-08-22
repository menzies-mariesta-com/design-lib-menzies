export const BRUSH_STORAGE_KEY = 'design-web-menzies-brush'
export const BRUSH_SETTINGS_STORAGE_KEY = 'design-web-menzies-brush-settings'
export const BRUSH_CHANGE_EVENT = 'design-web-menzies-brush-change'

export type TipShape = 'round' | 'flat' | 'rigger' | 'mop' | 'dry' | 'fan'

/** Light library tags for browsing (not hair family). */
export type BrushGroup =
  | 'wash'
  | 'line'
  | 'texture'
  | 'botanical'
  | 'sky'
  | 'ink'
  | 'edge'
  | 'script'

export type BrushPreset = {
  id: string
  name: string
  tip: TipShape
  size: number
  hardness: number
  opacity: number
  flow: number
  water: number
  wetEdges: boolean
  pressure: boolean
  /** Hair / bristle family stored on the desk. */
  family: string
  group: BrushGroup
  panel: string
  note: string
}

/** Editable brush desk state (preset id + live parameters). */
export type BrushState = {
  id: string
  tip: TipShape
  size: number
  hardness: number
  opacity: number
  flow: number
  water: number
  wetEdges: boolean
  pressure: boolean
  family: string
}

export const brushGroups: { id: BrushGroup; label: string }[] = [
  { id: 'wash', label: 'Wash' },
  { id: 'line', label: 'Line' },
  { id: 'texture', label: 'Texture' },
  { id: 'botanical', label: 'Botanical' },
  { id: 'sky', label: 'Sky' },
  { id: 'ink', label: 'Ink' },
  { id: 'edge', label: 'Edge' },
  { id: 'script', label: 'Script' },
]

export const groupLabels: Record<BrushGroup, string> = Object.fromEntries(
  brushGroups.map((g) => [g.id, g.label]),
) as Record<BrushGroup, string>

/**
 * Studio library: 30 distinct personalities.
 * Legacy ids (round-8, flat-12, …) stay so stored selections keep resolving.
 */
export const brushPresets: BrushPreset[] = [
  {
    id: 'round-8',
    name: 'Studio round',
    tip: 'round',
    size: 18,
    hardness: 62,
    opacity: 78,
    flow: 70,
    water: 45,
    wetEdges: true,
    pressure: true,
    family: 'sable',
    group: 'wash',
    panel: '',
    note: 'Everyday washes and soft edges',
  },
  {
    id: 'flat-12',
    name: 'Ochre flat',
    tip: 'flat',
    size: 28,
    hardness: 70,
    opacity: 72,
    flow: 65,
    water: 40,
    wetEdges: true,
    pressure: true,
    family: 'sable',
    group: 'wash',
    panel: 'wash-panel-ochre',
    note: 'Planes and graded bands',
  },
  {
    id: 'rigger-2',
    name: 'Ink rigger',
    tip: 'rigger',
    size: 6,
    hardness: 88,
    opacity: 90,
    flow: 55,
    water: 30,
    wetEdges: false,
    pressure: true,
    family: 'sable',
    group: 'line',
    panel: 'wash-panel-rose',
    note: 'Fine lines, twigs, and lettering leads',
  },
  {
    id: 'mop-20',
    name: 'Coastal mop',
    tip: 'mop',
    size: 42,
    hardness: 28,
    opacity: 48,
    flow: 85,
    water: 80,
    wetEdges: true,
    pressure: false,
    family: 'squirrel',
    group: 'sky',
    panel: '',
    note: 'Soft sky and wet-into-wet bloom',
  },
  {
    id: 'dry-brush',
    name: 'Ochre scumble',
    tip: 'dry',
    size: 22,
    hardness: 92,
    opacity: 55,
    flow: 25,
    water: 12,
    wetEdges: false,
    pressure: true,
    family: 'hog',
    group: 'texture',
    panel: 'wash-panel-ochre',
    note: 'Scratchy texture and scumble',
  },
  {
    id: 'fan-10',
    name: 'Grass fan',
    tip: 'fan',
    size: 32,
    hardness: 45,
    opacity: 58,
    flow: 40,
    water: 35,
    wetEdges: true,
    pressure: true,
    family: 'synthetic',
    group: 'botanical',
    panel: 'wash-panel-rose',
    note: 'Grass, hair, and fringe',
  },
  {
    id: 'cloud-mop',
    name: 'Cloud mop',
    tip: 'mop',
    size: 58,
    hardness: 14,
    opacity: 32,
    flow: 92,
    water: 95,
    wetEdges: true,
    pressure: false,
    family: 'squirrel',
    group: 'sky',
    panel: 'wash-panel-blue',
    note: 'Huge vapor blooms for open sky',
  },
  {
    id: 'dusk-wash',
    name: 'Dusk wash',
    tip: 'round',
    size: 36,
    hardness: 38,
    opacity: 42,
    flow: 88,
    water: 78,
    wetEdges: true,
    pressure: false,
    family: 'squirrel',
    group: 'wash',
    panel: 'wash-panel-rose',
    note: 'Low-chroma evening veils',
  },
  {
    id: 'mineral-flat',
    name: 'Mineral flat',
    tip: 'flat',
    size: 34,
    hardness: 84,
    opacity: 80,
    flow: 48,
    water: 22,
    wetEdges: false,
    pressure: true,
    family: 'hog',
    group: 'edge',
    panel: 'wash-panel-ochre',
    note: 'Crisp architectural planes',
  },
  {
    id: 'vine-rigger',
    name: 'Vine rigger',
    tip: 'rigger',
    size: 4,
    hardness: 94,
    opacity: 86,
    flow: 42,
    water: 18,
    wetEdges: false,
    pressure: true,
    family: 'sable',
    group: 'botanical',
    panel: '',
    note: 'Whisper-thin stems and tendrils',
  },
  {
    id: 'petal-round',
    name: 'Petal round',
    tip: 'round',
    size: 12,
    hardness: 48,
    opacity: 68,
    flow: 62,
    water: 55,
    wetEdges: true,
    pressure: true,
    family: 'sable',
    group: 'botanical',
    panel: 'wash-panel-rose',
    note: 'Soft botanical petals and buds',
  },
  {
    id: 'bark-dry',
    name: 'Bark dry',
    tip: 'dry',
    size: 30,
    hardness: 96,
    opacity: 62,
    flow: 18,
    water: 8,
    wetEdges: false,
    pressure: true,
    family: 'hog',
    group: 'texture',
    panel: 'wash-panel-ochre',
    note: 'Rough trunk and stone scrapes',
  },
  {
    id: 'mist-mop',
    name: 'Mist mop',
    tip: 'mop',
    size: 48,
    hardness: 18,
    opacity: 28,
    flow: 78,
    water: 90,
    wetEdges: true,
    pressure: false,
    family: 'squirrel',
    group: 'sky',
    panel: 'wash-panel-blue',
    note: 'Ghost fog and distant haze',
  },
  {
    id: 'tide-flat',
    name: 'Tide flat',
    tip: 'flat',
    size: 40,
    hardness: 36,
    opacity: 50,
    flow: 82,
    water: 72,
    wetEdges: true,
    pressure: false,
    family: 'squirrel',
    group: 'wash',
    panel: 'wash-panel-blue',
    note: 'Horizontal water bands and reflections',
  },
  {
    id: 'quill-script',
    name: 'Quill script',
    tip: 'rigger',
    size: 8,
    hardness: 78,
    opacity: 92,
    flow: 58,
    water: 28,
    wetEdges: false,
    pressure: true,
    family: 'sable',
    group: 'script',
    panel: '',
    note: 'Calligraphy leads with pressure taper',
  },
  {
    id: 'charcoal-dry',
    name: 'Charcoal dry',
    tip: 'dry',
    size: 16,
    hardness: 98,
    opacity: 88,
    flow: 22,
    water: 6,
    wetEdges: false,
    pressure: true,
    family: 'hog',
    group: 'ink',
    panel: '',
    note: 'Dense grainy charcoal marks',
  },
  {
    id: 'fringe-fan',
    name: 'Fringe fan',
    tip: 'fan',
    size: 24,
    hardness: 52,
    opacity: 48,
    flow: 35,
    water: 28,
    wetEdges: true,
    pressure: true,
    family: 'synthetic',
    group: 'texture',
    panel: 'wash-panel-rose',
    note: 'Delicate fringe and whiskers',
  },
  {
    id: 'bloom-round',
    name: 'Bloom round',
    tip: 'round',
    size: 26,
    hardness: 34,
    opacity: 55,
    flow: 90,
    water: 85,
    wetEdges: true,
    pressure: false,
    family: 'squirrel',
    group: 'wash',
    panel: 'wash-panel-rose',
    note: 'Wet blooms that feather outward',
  },
  {
    id: 'knife-edge',
    name: 'Knife edge',
    tip: 'flat',
    size: 14,
    hardness: 96,
    opacity: 85,
    flow: 40,
    water: 15,
    wetEdges: false,
    pressure: true,
    family: 'hog',
    group: 'edge',
    panel: '',
    note: 'Chiseled highlights and hard cuts',
  },
  {
    id: 'horizon-mop',
    name: 'Horizon mop',
    tip: 'mop',
    size: 50,
    hardness: 24,
    opacity: 38,
    flow: 86,
    water: 70,
    wetEdges: true,
    pressure: false,
    family: 'squirrel',
    group: 'sky',
    panel: 'wash-panel-blue',
    note: 'Wide graded skies and distant soft focus',
  },
  {
    id: 'needle-rigger',
    name: 'Needle rigger',
    tip: 'rigger',
    size: 3,
    hardness: 99,
    opacity: 95,
    flow: 38,
    water: 10,
    wetEdges: false,
    pressure: true,
    family: 'sable',
    group: 'line',
    panel: '',
    note: 'Archival hairlines and map work',
  },
  {
    id: 'sponge-dry',
    name: 'Sponge dry',
    tip: 'dry',
    size: 38,
    hardness: 72,
    opacity: 45,
    flow: 30,
    water: 20,
    wetEdges: false,
    pressure: false,
    family: 'synthetic',
    group: 'texture',
    panel: 'wash-panel-ochre',
    note: 'Broken sponge lifts and mottling',
  },
  {
    id: 'glaze-veil',
    name: 'Glaze veil',
    tip: 'round',
    size: 44,
    hardness: 22,
    opacity: 22,
    flow: 70,
    water: 88,
    wetEdges: true,
    pressure: false,
    family: 'squirrel',
    group: 'wash',
    panel: 'wash-panel-blue',
    note: 'Transparent glaze over dry layers',
  },
  {
    id: 'block-flat',
    name: 'Block flat',
    tip: 'flat',
    size: 52,
    hardness: 68,
    opacity: 74,
    flow: 55,
    water: 35,
    wetEdges: true,
    pressure: false,
    family: 'synthetic',
    group: 'wash',
    panel: 'wash-panel-ochre',
    note: 'Broad opaque color blocks',
  },
  {
    id: 'reed-fan',
    name: 'Reed fan',
    tip: 'fan',
    size: 40,
    hardness: 58,
    opacity: 64,
    flow: 45,
    water: 32,
    wetEdges: false,
    pressure: true,
    family: 'hog',
    group: 'botanical',
    panel: '',
    note: 'Marsh reeds and clustered strokes',
  },
  {
    id: 'archival-ink',
    name: 'Archival ink',
    tip: 'round',
    size: 10,
    hardness: 90,
    opacity: 98,
    flow: 50,
    water: 14,
    wetEdges: false,
    pressure: true,
    family: 'sable',
    group: 'ink',
    panel: '',
    note: 'Dense ink for signatures and notes',
  },
  {
    id: 'wet-edge-bloom',
    name: 'Wet edge bloom',
    tip: 'round',
    size: 22,
    hardness: 40,
    opacity: 60,
    flow: 75,
    water: 92,
    wetEdges: true,
    pressure: true,
    family: 'sable',
    group: 'edge',
    panel: 'wash-panel-rose',
    note: 'Controlled blooms with soft perimeter',
  },
  {
    id: 'stipple-dry',
    name: 'Stipple dry',
    tip: 'dry',
    size: 8,
    hardness: 88,
    opacity: 70,
    flow: 20,
    water: 10,
    wetEdges: false,
    pressure: true,
    family: 'synthetic',
    group: 'texture',
    panel: '',
    note: 'Tiny stipple for lichen and grit',
  },
  {
    id: 'cascade-mop',
    name: 'Cascade mop',
    tip: 'mop',
    size: 46,
    hardness: 30,
    opacity: 52,
    flow: 95,
    water: 76,
    wetEdges: true,
    pressure: false,
    family: 'squirrel',
    group: 'wash',
    panel: 'wash-panel-blue',
    note: 'Pouring cascades and waterfall foam',
  },
  {
    id: 'chisel-script',
    name: 'Chisel script',
    tip: 'flat',
    size: 11,
    hardness: 82,
    opacity: 88,
    flow: 52,
    water: 24,
    wetEdges: false,
    pressure: true,
    family: 'sable',
    group: 'script',
    panel: 'wash-panel-ochre',
    note: 'Italic flats for display lettering',
  },
]

export const tipLabels: Record<TipShape, string> = {
  round: 'Round',
  flat: 'Flat',
  rigger: 'Rigger',
  mop: 'Mop',
  dry: 'Dry brush',
  fan: 'Fan',
}

const TIP_SHAPES = new Set<string>(Object.keys(tipLabels))
const BRUSH_GROUP_IDS = new Set<string>(brushGroups.map((g) => g.id))

export function isTipShape(value: string): value is TipShape {
  return TIP_SHAPES.has(value)
}

export function isBrushGroup(value: string): value is BrushGroup {
  return BRUSH_GROUP_IDS.has(value)
}

export function isBrushPresetId(value: string): boolean {
  return brushPresets.some((brush) => brush.id === value)
}

export function getBrushPreset(id: string): BrushPreset {
  return brushPresets.find((brush) => brush.id === id) ?? brushPresets[0]
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n))
}

function asNumber(value: unknown, fallback: number, min: number, max: number): number {
  const n = typeof value === 'number' ? value : Number(value)
  if (!Number.isFinite(n)) return fallback
  return clamp(n, min, max)
}

export function presetToState(preset: BrushPreset, extras?: Partial<BrushState>): BrushState {
  return {
    id: preset.id,
    tip: preset.tip,
    size: preset.size,
    hardness: preset.hardness,
    opacity: preset.opacity,
    flow: preset.flow,
    water: preset.water,
    wetEdges: extras?.wetEdges ?? preset.wetEdges,
    pressure: extras?.pressure ?? preset.pressure,
    family: extras?.family ?? preset.family,
  }
}

export function defaultBrushState(): BrushState {
  return presetToState(brushPresets[0])
}

function normalizeState(raw: Partial<BrushState> | null | undefined): BrushState {
  const base = defaultBrushState()
  if (!raw) return base

  const tip = typeof raw.tip === 'string' && isTipShape(raw.tip) ? raw.tip : base.tip
  // Unknown / removed preset ids fall back to the default studio round.
  const id =
    typeof raw.id === 'string' && isBrushPresetId(raw.id) ? raw.id : base.id

  return {
    id,
    tip,
    size: asNumber(raw.size, base.size, 2, 64),
    hardness: asNumber(raw.hardness, base.hardness, 0, 100),
    opacity: asNumber(raw.opacity, base.opacity, 5, 100),
    flow: asNumber(raw.flow, base.flow, 0, 100),
    water: asNumber(raw.water, base.water, 0, 100),
    wetEdges: typeof raw.wetEdges === 'boolean' ? raw.wetEdges : base.wetEdges,
    pressure: typeof raw.pressure === 'boolean' ? raw.pressure : base.pressure,
    family: typeof raw.family === 'string' && raw.family ? raw.family : base.family,
  }
}

export function readStoredBrush(): BrushState {
  try {
    const settingsRaw = localStorage.getItem(BRUSH_SETTINGS_STORAGE_KEY)
    if (settingsRaw) {
      return normalizeState(JSON.parse(settingsRaw) as Partial<BrushState>)
    }

    const id = localStorage.getItem(BRUSH_STORAGE_KEY)
    if (id && isBrushPresetId(id)) {
      return presetToState(getBrushPreset(id))
    }
  } catch {
    /* ignore corrupt storage */
  }
  return defaultBrushState()
}

export type BrushChangeDetail = BrushState

function setCssVar(root: HTMLElement, name: string, value: string) {
  root.style.setProperty(name, value)
}

/** Map brush desk numbers to CSS custom properties on <html>. */
export function brushCssVars(state: BrushState): Record<string, string> {
  const blur = Math.max(0, (100 - state.hardness) / 28)
  const alpha = state.opacity / 100
  const washBlur = 14 + (state.water / 100) * 22 + (state.flow / 100) * 8
  const washOpacity = 0.55 + (state.flow / 100) * 0.35
  const grainOpacity = 0.22 + (state.hardness / 100) * 0.45 + (state.tip === 'dry' ? 0.12 : 0)
  const rippleMs = Math.round(380 + (state.water / 100) * 420 + (state.flow / 100) * 120)
  const rippleOpacity = 0.22 + alpha * 0.35
  const rippleScale = 0.75 + (state.size / 64) * 0.7 + (state.water / 100) * 0.25
  const soakMs = Math.round(280 + (state.water / 100) * 280)
  const edgeSoft = state.wetEdges ? blur + state.water / 50 : blur * 0.35
  const cursorSize = Math.max(10, Math.min(40, Math.round(state.size * 0.85)))

  let rippleRadius = '9999px'
  if (state.tip === 'flat') rippleRadius = '18%'
  else if (state.tip === 'rigger') rippleRadius = '40%'
  else if (state.tip === 'fan') rippleRadius = '35% 65%'
  else if (state.tip === 'dry') rippleRadius = '42%'
  else if (state.tip === 'mop') rippleRadius = '50%'

  return {
    '--brush-size': String(state.size),
    '--brush-hardness': String(state.hardness),
    '--brush-opacity': String(alpha),
    '--brush-flow': String(state.flow),
    '--brush-water': String(state.water),
    '--brush-blur': `${blur.toFixed(2)}px`,
    '--brush-edge-soft': `${edgeSoft.toFixed(2)}px`,
    '--brush-wash-blur': `${washBlur.toFixed(1)}px`,
    '--brush-wash-opacity': washOpacity.toFixed(3),
    '--brush-grain-opacity': Math.min(0.85, grainOpacity).toFixed(3),
    '--brush-ripple-duration': `${rippleMs}ms`,
    '--brush-ripple-opacity': rippleOpacity.toFixed(3),
    '--brush-ripple-scale': rippleScale.toFixed(3),
    '--brush-ripple-radius': rippleRadius,
    '--brush-soak-duration': `${soakMs}ms`,
    '--brush-cursor-size': `${cursorSize}px`,
    '--brush-pressure': state.pressure ? '1' : '0',
    '--brush-wet-edges': state.wetEdges ? '1' : '0',
  }
}

export function applyBrush(partial: Partial<BrushState> = {}) {
  const current = readStoredBrush()
  const next = normalizeState({ ...current, ...partial })
  const root = document.documentElement

  root.setAttribute('data-brush', next.tip)
  root.setAttribute('data-brush-id', next.id)
  root.setAttribute('data-brush-family', next.family)
  root.toggleAttribute('data-brush-wet-edges', next.wetEdges)
  root.toggleAttribute('data-brush-pressure', next.pressure)

  const vars = brushCssVars(next)
  for (const [name, value] of Object.entries(vars)) {
    setCssVar(root, name, value)
  }

  localStorage.setItem(BRUSH_STORAGE_KEY, next.id)
  localStorage.setItem(BRUSH_SETTINGS_STORAGE_KEY, JSON.stringify(next))

  window.dispatchEvent(
    new CustomEvent<BrushChangeDetail>(BRUSH_CHANGE_EVENT, {
      detail: next,
    }),
  )

  return next
}

export function applyBrushPreset(id: string) {
  const preset = getBrushPreset(id)
  return applyBrush(presetToState(preset))
}

/** Filter presets by free text and optional group tag. */
export function filterBrushPresets(
  query: string,
  group: BrushGroup | 'all' = 'all',
): BrushPreset[] {
  const q = query.trim().toLowerCase()
  return brushPresets.filter((preset) => {
    if (group !== 'all' && preset.group !== group) return false
    if (!q) return true
    const hay = [
      preset.name,
      preset.note,
      tipLabels[preset.tip],
      groupLabels[preset.group],
      preset.family,
      preset.id,
    ]
      .join(' ')
      .toLowerCase()
    return hay.includes(q)
  })
}
