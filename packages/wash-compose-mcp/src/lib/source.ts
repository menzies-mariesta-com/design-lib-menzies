import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { embeddedSnapshot } from '../data/embedded-snapshot.js'
import { composeKotlinRoot } from './paths.js'

function readSafe(path: string): string | null {
  try {
    if (!existsSync(path)) return null
    return readFileSync(path, 'utf8')
  } catch {
    return null
  }
}

function listKtNames(dir: string): string[] {
  if (!existsSync(dir)) return []
  return readdirSync(dir)
    .filter((f) => f.endsWith('.kt'))
    .map((f) => f.replace(/\.kt$/, ''))
    .sort()
}

export function listLucideIcons(): string[] {
  const root = composeKotlinRoot()
  if (root) {
    const names = listKtNames(join(root, 'icons/lucide'))
    if (names.length) return names
  }
  return embeddedSnapshot.lucide
}

export function listBrandIcons(): string[] {
  const root = composeKotlinRoot()
  if (root) {
    const names = listKtNames(join(root, 'icons/brands'))
    if (names.length) return names
  }
  return embeddedSnapshot.brands
}

export function listPrimitiveNames(): string[] {
  const root = composeKotlinRoot()
  if (root) {
    const names = listKtNames(join(root, 'primitives'))
    if (names.length) return names
  }
  return embeddedSnapshot.primitives
}

export function listComponentNames(): string[] {
  const root = composeKotlinRoot()
  if (root) {
    const names = listKtNames(join(root, 'components'))
    if (names.length) return names
  }
  return embeddedSnapshot.components
}

export function readPigments(): string[] {
  const root = composeKotlinRoot()
  if (root) {
    const src = readSafe(join(root, 'theme/WashPigment.kt'))
    if (src) {
      const enumBody = src.match(
        /enum class WashPigment\s*\{([\s\S]*?)(?:;|\n\s*val |\n\s*companion )/m,
      )
      if (enumBody) {
        const pigments = enumBody[1]
          .split(/[\s,]+/)
          .map((s) => s.trim())
          .filter((s) => /^[a-z][a-z0-9_]*$/.test(s))
        if (pigments.length) return pigments
      }
    }
  }
  return embeddedSnapshot.pigments
}

export type ParsedComposable = {
  name: string
  packagePath: string
  relativeFile: string
  params: string[]
  kdoc?: string
  excerpt: string
}

function parseComposable(filePath: string, relativeFile: string): ParsedComposable | null {
  const src = readSafe(filePath)
  if (!src) return null

  const pkgMatch = src.match(/^package\s+([\w.]+)/m)
  const packagePath = pkgMatch?.[1] ?? 'com.mariesta.menzies.washui'

  const kdocMatch = src.match(/\/\*\*([\s\S]*?)\*\/\s*(?:@Composable\s+)?(?:public\s+)?fun\s+(\w+)/)
  const funMatch = src.match(
    /(?:@Composable\s+)?(?:public\s+)?fun\s+(\w+)\s*\(([\s\S]*?)\)\s*(?::\s*[\w.<>,\s?]+)?\s*\{/,
  )
  if (!funMatch) return null

  const name = funMatch[1]
  const rawParams = funMatch[2]
  const params = rawParams
    .split(',')
    .map((p) => p.replace(/\s+/g, ' ').trim())
    .filter((p) => p && !p.startsWith('//'))
    .map((p) => {
      const cleaned = p.replace(/\/\*[\s\S]*?\*\//g, '').trim()
      const m = cleaned.match(/^(\w+)\s*:/)
      return m ? `${m[1]}: ${cleaned.slice(m[0].length).trim().slice(0, 80)}` : cleaned.slice(0, 100)
    })
    .filter(Boolean)

  const kdoc = kdocMatch?.[1]
    ?.replace(/^\s*\*\s?/gm, '')
    .trim()
    .slice(0, 500)

  const excerpt = (funMatch[0] + '\n  …\n}').slice(0, 1500)

  return {
    name,
    packagePath,
    relativeFile,
    params,
    kdoc,
    excerpt,
  }
}

function findInEmbedded(name: string): ParsedComposable | null {
  const q = name.replace(/^Wash/i, '').toLowerCase()
  const entries = Object.values(embeddedSnapshot.composables)
  for (const c of entries) {
    const base = c.name.replace(/^Wash/i, '').toLowerCase()
    if (
      c.name.toLowerCase() === name.toLowerCase() ||
      base === q ||
      c.name.toLowerCase() === `wash${q}`
    ) {
      return c
    }
  }
  return null
}

export function findComposable(name: string): ParsedComposable | null {
  const root = composeKotlinRoot()
  if (root) {
    const q = name.replace(/^Wash/i, '').toLowerCase()
    const candidates = [
      ...listPrimitiveNames().map((n) => ({
        file: join(root, 'primitives', `${n}.kt`),
        rel: `primitives/${n}.kt`,
        key: n,
      })),
      ...listComponentNames().map((n) => ({
        file: join(root, 'components', `${n}.kt`),
        rel: `components/${n}.kt`,
        key: n,
      })),
      {
        file: join(root, 'WashProvider.kt'),
        rel: 'WashProvider.kt',
        key: 'WashProvider',
      },
      {
        file: join(root, 'icons/WashIcons.kt'),
        rel: 'icons/WashIcons.kt',
        key: 'WashIcon',
      },
    ]

    for (const c of candidates) {
      const base = c.key.replace(/^Wash/i, '').toLowerCase()
      if (
        c.key.toLowerCase() === name.toLowerCase() ||
        base === q ||
        c.key.toLowerCase() === `wash${q}`
      ) {
        const parsed = parseComposable(c.file, c.rel)
        if (parsed) return parsed
      }
    }

    for (const c of candidates) {
      const parsed = parseComposable(c.file, c.rel)
      if (parsed && parsed.name.toLowerCase() === name.toLowerCase()) return parsed
    }
  }

  return findInEmbedded(name)
}

export function readIconSource(kind: 'lucide' | 'brand', name: string): string | null {
  const root = composeKotlinRoot()
  if (!root) return null
  const dir = kind === 'lucide' ? 'icons/lucide' : 'icons/brands'
  return readSafe(join(root, dir, `${name}.kt`))
}
