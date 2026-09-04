import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
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
  return listKtNames(join(composeKotlinRoot(), 'icons/lucide'))
}

export function listBrandIcons(): string[] {
  return listKtNames(join(composeKotlinRoot(), 'icons/brands'))
}

export function listPrimitiveNames(): string[] {
  return listKtNames(join(composeKotlinRoot(), 'primitives'))
}

export function listComponentNames(): string[] {
  return listKtNames(join(composeKotlinRoot(), 'components'))
}

export function readPigments(): string[] {
  const src = readSafe(join(composeKotlinRoot(), 'theme/WashPigment.kt'))
  if (!src) return []
  const enumBody = src.match(/enum class WashPigment\s*\{([\s\S]*?)(?:;|\n\s*val |\n\s*companion )/m)
  if (!enumBody) return []
  return enumBody[1]
    .split(/[\s,]+/)
    .map((s) => s.trim())
    .filter((s) => /^[a-z][a-z0-9_]*$/.test(s))
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

export function findComposable(name: string): ParsedComposable | null {
  const q = name.replace(/^Wash/i, '').toLowerCase()
  const candidates = [
    ...listPrimitiveNames().map((n) => ({
      file: join(composeKotlinRoot(), 'primitives', `${n}.kt`),
      rel: `primitives/${n}.kt`,
      key: n,
    })),
    ...listComponentNames().map((n) => ({
      file: join(composeKotlinRoot(), 'components', `${n}.kt`),
      rel: `components/${n}.kt`,
      key: n,
    })),
    {
      file: join(composeKotlinRoot(), 'WashProvider.kt'),
      rel: 'WashProvider.kt',
      key: 'WashProvider',
    },
    {
      file: join(composeKotlinRoot(), 'icons/WashIcons.kt'),
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
      return parseComposable(c.file, c.rel)
    }
  }

  // Fallback: scan all for fun Name
  for (const c of candidates) {
    const parsed = parseComposable(c.file, c.rel)
    if (parsed && parsed.name.toLowerCase() === name.toLowerCase()) return parsed
  }
  return null
}

export function readIconSource(kind: 'lucide' | 'brand', name: string): string | null {
  const dir = kind === 'lucide' ? 'icons/lucide' : 'icons/brands'
  return readSafe(join(composeKotlinRoot(), dir, `${name}.kt`))
}
