import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { embeddedSnapshot } from '../data/embedded-snapshot.js'
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

function parsePigmentThemes(src: string): PigmentTheme[] {
  const themes: PigmentTheme[] = []
  const blockRe =
    /\{\s*id:\s*'([^']+)',\s*label:\s*'([^']+)',\s*note:\s*'([^']*)',\s*swatch:\s*'([^']+)'/g
  let m: RegExpExecArray | null
  while ((m = blockRe.exec(src))) {
    themes.push({ id: m[1], label: m[2], note: m[3], swatch: m[4] })
  }
  return themes
}

/** Parse watercolorThemes from themes.ts (live) or embedded snapshot. */
export function readPigmentThemes(): PigmentTheme[] {
  const srcDir = washUiSrc()
  if (srcDir) {
    const src = readSafe(join(srcDir, 'theme/themes.ts'))
    if (src) {
      const live = parsePigmentThemes(src)
      if (live.length) return live
    }
  }
  return embeddedSnapshot.pigmentThemes
}

/** Extract one pigment's CSS block from themes.css (live or embedded). */
export function readThemeCss(
  pigment: string,
  mode: 'light' | 'dark' = 'light',
): {
  selector: string
  css: string
  found: boolean
} {
  const selector =
    mode === 'dark' ? `[data-theme="${pigment}-dark"]` : `[data-theme="${pigment}"]`
  const srcDir = washUiSrc()
  const src =
    (srcDir ? readSafe(join(srcDir, 'styles/themes.css')) : null) ??
    embeddedSnapshot.themesCss

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
  const srcDir = washUiSrc()
  if (srcDir) {
    const src = readSafe(join(srcDir, 'icons/brands/slugMap.ts'))
    if (src) {
      const brands: CuratedBrand[] = []
      const re = /^\s*([a-z0-9]+):\s*'([^']+)'/gm
      let m: RegExpExecArray | null
      while ((m = re.exec(src))) {
        brands.push({ slug: m[1], exportName: m[2] })
      }
      if (brands.length) return brands
    }
  }
  return embeddedSnapshot.brands
}

function excerptFromSource(src: string): string {
  const typeMatch = src.match(
    /export type \w+Props[\s\S]*?=[\s\S]*?(?=\nexport |\nconst |\nfunction )/m,
  )
  const fnMatch = src.match(/export (?:const|function) \w+[\s\S]{0,800}/m)
  const parts = [typeMatch?.[0]?.trim(), fnMatch?.[0]?.trim()].filter(Boolean)
  return (parts.join('\n\n') || src.slice(0, 1200)).slice(0, 2500)
}

/** Best-effort prop / type extraction from a TSX source file. */
export function readComponentSourceSnippet(
  relativePath: string,
): { path: string; excerpt: string } | null {
  const srcDir = washUiSrc()
  if (srcDir) {
    const full = join(srcDir, relativePath)
    const src = readSafe(full)
    if (src) {
      return {
        path: `packages/menzies-design-wash-ui/src/${relativePath}`,
        excerpt: excerptFromSource(src),
      }
    }
  }
  return embeddedSnapshot.sourceSnippets[relativePath] ?? null
}

export function listPrimitiveFiles(): string[] {
  const srcDir = washUiSrc()
  if (srcDir) {
    const dir = join(srcDir, 'primitives')
    if (existsSync(dir)) {
      return readdirSync(dir)
        .filter((f) => f.endsWith('.tsx') && f !== 'index.ts')
        .map((f) => f.replace(/\.tsx$/, ''))
    }
  }
  return embeddedSnapshot.primitives
}

export function listComponentFiles(): string[] {
  const srcDir = washUiSrc()
  if (srcDir) {
    const dir = join(srcDir, 'components')
    if (existsSync(dir)) {
      return readdirSync(dir)
        .filter((f) => f.endsWith('.tsx'))
        .map((f) => f.replace(/\.tsx$/, ''))
    }
  }
  return embeddedSnapshot.components
}
