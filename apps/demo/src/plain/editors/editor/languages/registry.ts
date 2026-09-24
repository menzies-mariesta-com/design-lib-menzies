import type { CodeLanguage, LanguageId, LanguagePack } from './types'
import { typescript, javascript } from './typescript'
import { json } from './json'
import { css, html, markdown, plaintext } from './markup'
import { yaml, toml, xml, sql, graphql, shell } from './data'
import {
  python,
  go,
  rust,
  java,
  c,
  cpp,
  kotlin,
  svelte,
  vue,
} from './systems'

const packs: LanguagePack[] = [
  typescript,
  javascript,
  json,
  css,
  html,
  markdown,
  plaintext,
  yaml,
  toml,
  xml,
  sql,
  graphql,
  shell,
  python,
  go,
  rust,
  java,
  c,
  cpp,
  kotlin,
  svelte,
  vue,
]

const byId = new Map<LanguageId, LanguagePack>(packs.map((p) => [p.id, p]))

const aliasToId = new Map<string, LanguageId>()
for (const pack of packs) {
  aliasToId.set(pack.id, pack.id)
  for (const alias of pack.aliases) {
    aliasToId.set(alias.toLowerCase(), pack.id)
  }
  for (const ext of pack.extensions) {
    aliasToId.set(ext.toLowerCase(), pack.id)
  }
}

/** Map legacy short ids used by older CodeEditor callers. */
const legacyAlias: Record<string, LanguageId> = {
  ts: 'typescript',
  js: 'javascript',
  txt: 'plaintext',
}

export function listLanguages(): LanguagePack[] {
  return packs.slice()
}

export function getLanguagePack(id: string): LanguagePack {
  const normalized = legacyAlias[id] ?? (id as LanguageId)
  return byId.get(normalized) ?? plaintext
}

export function resolveLanguageId(input?: string | null): LanguageId {
  if (!input) return 'plaintext'
  const key = input.trim().toLowerCase()
  if (legacyAlias[key]) return legacyAlias[key]
  return aliasToId.get(key) ?? aliasToId.get(`.${key}`) ?? 'plaintext'
}

export function resolveLanguageFromFileName(fileName: string): LanguageId {
  const base = fileName.trim().toLowerCase()
  const dot = base.lastIndexOf('.')
  if (dot < 0) return 'plaintext'
  const ext = base.slice(dot)
  return aliasToId.get(ext) ?? 'plaintext'
}

export function normalizeLanguageProp(
  language?: CodeLanguage | LanguageId | string,
  fileName?: string,
): LanguageId {
  if (language) return resolveLanguageId(language)
  if (fileName) return resolveLanguageFromFileName(fileName)
  return 'plaintext'
}

export { byId as languagePacksById }
export type { LanguageId, LanguagePack, CodeLanguage, Diagnostic } from './types'
