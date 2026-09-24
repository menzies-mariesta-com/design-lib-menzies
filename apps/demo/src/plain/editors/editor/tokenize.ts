import { getLanguagePack, normalizeLanguageProp } from './languages'
import type { CodeLanguage, LanguageId } from './languages'

/** Highlight full source using the language registry. */
export function highlightCode(
  source: string,
  language?: CodeLanguage | LanguageId | string,
  fileName?: string,
): string {
  const id = normalizeLanguageProp(language, fileName)
  const pack = getLanguagePack(id)
  const lines = source.split('\n')
  return lines.map((line) => pack.tokenize(line)).join('\n')
}

export function highlightCodeLine(
  line: string,
  language?: CodeLanguage | LanguageId | string,
): string {
  const pack = getLanguagePack(normalizeLanguageProp(language))
  return pack.tokenize(line)
}

export function lineColFromIndex(
  source: string,
  index: number,
): { line: number; col: number } {
  let line = 1
  let col = 1
  const end = Math.min(index, source.length)
  for (let i = 0; i < end; i += 1) {
    if (source[i] === '\n') {
      line += 1
      col = 1
    } else {
      col += 1
    }
  }
  return { line, col }
}

export function indexFromLineCol(
  source: string,
  line: number,
  col: number,
): number {
  const lines = source.split('\n')
  let idx = 0
  for (let i = 0; i < line - 1 && i < lines.length; i += 1) {
    idx += lines[i]!.length + 1
  }
  const row = lines[Math.max(0, line - 1)] ?? ''
  return idx + Math.min(Math.max(col - 1, 0), row.length)
}

export type { CodeLanguage, LanguageId } from './languages'
