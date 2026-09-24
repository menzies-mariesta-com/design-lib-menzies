export const THEME_STORAGE_KEY = 'design-web-menzies-theme'
export const MODE_STORAGE_KEY = 'design-web-menzies-mode'

/** Previous Washfield keys; read once for migration, never written. */
const LEGACY_THEME_STORAGE_KEY = 'washfield-theme'
const LEGACY_MODE_STORAGE_KEY = 'washfield-mode'

export type ThemeMode = 'light' | 'dark'

export const watercolorThemes = [
  {
    id: 'mineral',
    label: 'Mineral',
    note: 'Blue · ochre · rose',
    swatch: '#276C8E',
  },
  {
    id: 'indigo',
    label: 'Indigo',
    note: 'Deep lake violet',
    swatch: '#3D4F8F',
  },
  {
    id: 'celadon',
    label: 'Celadon',
    note: 'Sage glaze',
    swatch: '#3D7A5F',
  },
  {
    id: 'vermilion',
    label: 'Vermilion',
    note: 'Warm lake red',
    swatch: '#B8432F',
  },
  {
    id: 'sepia',
    label: 'Sepia',
    note: 'Archival ink',
    swatch: '#6B4E32',
  },
  {
    id: 'cobalt',
    label: 'Cobalt',
    note: 'Bright mineral blue',
    swatch: '#1F5F9E',
  },
  {
    id: 'moss',
    label: 'Moss',
    note: 'Botanical green',
    swatch: '#4A6B3A',
  },
  {
    id: 'saffron',
    label: 'Saffron',
    note: 'Gold ochre',
    swatch: '#C48A28',
  },
  {
    id: 'slate',
    label: 'Slate',
    note: 'Cool pigment gray',
    swatch: '#5A6573',
  },
  {
    id: 'lake',
    label: 'Lake',
    note: 'Viridian teal',
    swatch: '#2A7A72',
  },
  {
    id: 'ultramarine',
    label: 'Ultramarine',
    note: 'Deep lapis blue',
    swatch: '#2F4A9B',
  },
  {
    id: 'viridian',
    label: 'Viridian',
    note: 'Cool chrome green',
    swatch: '#2F7A68',
  },
  {
    id: 'madder',
    label: 'Madder',
    note: 'Rose madder lake',
    swatch: '#A63D52',
  },
  {
    id: 'ochre',
    label: 'Ochre',
    note: 'Yellow earth',
    swatch: '#B8892E',
  },
  {
    id: 'umber',
    label: 'Umber',
    note: 'Burnt earth brown',
    swatch: '#6B4A32',
  },
  {
    id: 'ivory',
    label: 'Ivory',
    note: 'Ivory black gray',
    swatch: '#4A4842',
  },
  {
    id: 'cerulean',
    label: 'Cerulean',
    note: 'Sky mineral blue',
    swatch: '#3A7CA8',
  },
  {
    id: 'crimson',
    label: 'Crimson',
    note: 'Deep carmine',
    swatch: '#9E2F3E',
  },
  {
    id: 'olive',
    label: 'Olive',
    note: 'Muted leaf green',
    swatch: '#6A6B3A',
  },
  {
    id: 'sienna',
    label: 'Sienna',
    note: 'Raw earth orange',
    swatch: '#A65A32',
  },
  {
    id: 'turquoise',
    label: 'Turquoise',
    note: 'Copper blue-green',
    swatch: '#2A8A8E',
  },
  {
    id: 'lavender',
    label: 'Lavender',
    note: 'Soft mineral violet',
    swatch: '#6A5A8E',
  },
  {
    id: 'charcoal',
    label: 'Charcoal',
    note: 'Graphite gray',
    swatch: '#3E4248',
  },
  {
    id: 'coral',
    label: 'Coral',
    note: 'Warm shell pink',
    swatch: '#C45A4A',
  },
  {
    id: 'pine',
    label: 'Pine',
    note: 'Forest needle green',
    swatch: '#3A5E42',
  },
  {
    id: 'bronze',
    label: 'Bronze',
    note: 'Metallic ochre',
    swatch: '#8E6A32',
  },
  {
    id: 'mist',
    label: 'Mist',
    note: 'Cool vapor gray',
    swatch: '#6A7A88',
  },
  {
    id: 'rust',
    label: 'Rust',
    note: 'Iron oxide',
    swatch: '#A04828',
  },
  {
    id: 'jade',
    label: 'Jade',
    note: 'Soft stone green',
    swatch: '#3A8A6A',
  },
  {
    id: 'ink',
    label: 'Ink',
    note: 'Sumi black-blue',
    swatch: '#2A3548',
  },
] as const

export type WatercolorThemeId = (typeof watercolorThemes)[number]['id']

export function isWatercolorTheme(value: string): value is WatercolorThemeId {
  return watercolorThemes.some((theme) => theme.id === value)
}

export function isThemeMode(value: string): value is ThemeMode {
  return value === 'light' || value === 'dark'
}

/** data-theme attribute for pigment + light/dark mode */
export function themeDataAttr(pigment: WatercolorThemeId, mode: ThemeMode): string {
  return mode === 'dark' ? `${pigment}-dark` : pigment
}

function readStorage(key: string, legacyKey: string): string | null {
  return localStorage.getItem(key) ?? localStorage.getItem(legacyKey)
}

export function readStoredTheme(): WatercolorThemeId {
  const stored = readStorage(THEME_STORAGE_KEY, LEGACY_THEME_STORAGE_KEY)
  if (stored && isWatercolorTheme(stored)) return stored
  // Migrate legacy composite keys like "mineral|dark" or accidental "-dark" ids
  if (stored?.includes('|')) {
    const [pigment] = stored.split('|')
    if (pigment && isWatercolorTheme(pigment)) return pigment
  }
  if (stored?.endsWith('-dark')) {
    const pigment = stored.slice(0, -5)
    if (isWatercolorTheme(pigment)) return pigment
  }
  return 'mineral'
}

export function readStoredMode(): ThemeMode {
  const stored = readStorage(MODE_STORAGE_KEY, LEGACY_MODE_STORAGE_KEY)
  if (stored && isThemeMode(stored)) return stored
  const legacy = readStorage(THEME_STORAGE_KEY, LEGACY_THEME_STORAGE_KEY)
  if (legacy?.endsWith('-dark') || legacy?.endsWith('|dark')) return 'dark'
  return 'light'
}

export const THEME_CHANGE_EVENT = 'design-web-menzies-theme-change'

export type ThemeChangeDetail = {
  pigment: WatercolorThemeId
  mode: ThemeMode
}

export function applyTheme(pigment: WatercolorThemeId, mode: ThemeMode = readStoredMode()) {
  document.documentElement.setAttribute('data-theme', themeDataAttr(pigment, mode))
  localStorage.setItem(THEME_STORAGE_KEY, pigment)
  localStorage.setItem(MODE_STORAGE_KEY, mode)
  window.dispatchEvent(
    new CustomEvent<ThemeChangeDetail>(THEME_CHANGE_EVENT, {
      detail: { pigment, mode },
    }),
  )
}

export function applyMode(mode: ThemeMode) {
  applyTheme(readStoredTheme(), mode)
}
