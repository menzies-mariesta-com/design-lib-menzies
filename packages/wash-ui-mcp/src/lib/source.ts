import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { washUiSrc } from './paths.js'

function readSafe(path: string): string | null {
  try {
    if (!existsSync(path)) return null
    return readFileSync(path, 'utf8')
  } catch {
    return null
  }
}

export type PigmentTheme = {
  id: string
  label: string
  note?: string
  swatch?: string
}

/** Parse watercolorThemes from themes.ts (source of truth). */
export function readPigmentThemes(): PigmentTheme[] {
  const src = readSafe(join(washUiSrc(), 'theme/themes.ts'))
  if (!src) return []

  const themes: PigmentTheme[] = []
  const blockRe =
    /\{\s*id:\s*'([^']+)',\s*label:\s*'([^']+)',\s*note:\s*'([^']*)',\s*swatch:\s*'([^']+)'/g
  let m: RegExpExecArray | null
  while ((m = blockRe.exec(src))) {
    themes.push({ id: m[1], label: m[2], note: m[3], swatch: m[4] })
  }
  return themes
}

/** Extract one pigment's CSS block from themes.css. */
export function readThemeCss(pigment: string, mode: 'light' | 'dark' = 'light'): {
  selector: string
  css: string
  found: boolean
} {
  const cssPath = join(washUiSrc(), 'styles/themes.css')
  const src = readSafe(cssPath)
  const selector =
    mode === 'dark' ? `[data-theme="${pigment}-dark"]` : `[data-theme="${pigment}"]`
  if (!src) {
    return { selector, css: '', found: false }
  }

  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const re = new RegExp(`${escaped}\\s*\\{([\\s\\S]*?)\\n\\}`, 'm')
  const match = src.match(re)
  if (!match) {
    return { selector, css: '', found: false }
  }
  return {
    selector,
    css: `${selector} {${match[1]}\n}`,
    found: true,
  }
}

export type CuratedBrand = { slug: string; exportName: string }

export function readCuratedBrands(): CuratedBrand[] {
  const src = readSafe(join(washUiSrc(), 'icons/brands/slugMap.ts'))
  if (!src) return []
  const brands: CuratedBrand[] = []
  const re = /^\s*([a-z0-9]+):\s*'([^']+)'/gm
  let m: RegExpExecArray | null
  while ((m = re.exec(src))) {
    brands.push({ slug: m[1], exportName: m[2] })
  }
  return brands
}

/** Best-effort prop / type extraction from a TSX source file. */
export function readComponentSourceSnippet(
  relativePath: string,
): { path: string; excerpt: string } | null {
  const full = join(washUiSrc(), relativePath)
  const src = readSafe(full)
  if (!src) return null

  // Prefer exported type Props / *Props blocks + first export function/const
  const typeMatch = src.match(/export type \w+Props[\s\S]*?=[\s\S]*?(?=\nexport |\nconst |\nfunction )/m)
  const fnMatch = src.match(
    /export (?:const|function) \w+[\s\S]{0,800}/m,
  )
  const parts = [typeMatch?.[0]?.trim(), fnMatch?.[0]?.trim()].filter(Boolean)
  const excerpt = (parts.join('\n\n') || src.slice(0, 1200)).slice(0, 2500)
  return { path: `packages/menzies-design-wash-ui/src/${relativePath}`, excerpt }
}

export function listPrimitiveFiles(): string[] {
  const dir = join(washUiSrc(), 'primitives')
  if (!existsSync(dir)) return []
  return readdirSync(dir)
    .filter((f) => f.endsWith('.tsx') && f !== 'index.ts')
    .map((f) => f.replace(/\.tsx$/, ''))
}

export function listComponentFiles(): string[] {
  const dir = join(washUiSrc(), 'components')
  if (!existsSync(dir)) return []
  return readdirSync(dir)
    .filter((f) => f.endsWith('.tsx'))
    .map((f) => f.replace(/\.tsx$/, ''))
}
