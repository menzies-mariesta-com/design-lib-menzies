import type { Diagnostic } from './types'

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export function span(cls: string, text: string): string {
  return `<span class="${cls}">${escapeHtml(text)}</span>`
}

/** Shared constants / builtins used across C-family and scripting languages. */
export const COMMON_BUILTINS = new Set([
  'true',
  'false',
  'null',
  'undefined',
  'NaN',
  'Infinity',
  'nil',
  'None',
  'True',
  'False',
  'this',
  'super',
  'self',
  'Self',
])

const MULTI_OPS = [
  '>>>=',
  '>>=',
  '<<=',
  '===',
  '!==',
  '>>>',
  '**=',
  '&&=',
  '||=',
  '??=',
  '...',
  '=>',
  '->',
  '::',
  '++',
  '--',
  '==',
  '!=',
  '<=',
  '>=',
  '<<',
  '>>',
  '&&',
  '||',
  '??',
  '+=',
  '-=',
  '*=',
  '/=',
  '%=',
  '&=',
  '|=',
  '^=',
  '**',
]

const OP_CHARS = new Set('+-*/%=<>!&|^~?:')
const PUNCT_CHARS = new Set('{}()[];,.')

function isIdentStart(ch: string): boolean {
  return /[A-Za-z_$]/.test(ch)
}

function isIdentCont(ch: string): boolean {
  return /[A-Za-z0-9_$#]/.test(ch)
}

function skipWs(line: string, i: number): number {
  while (i < line.length && /\s/.test(line[i]!)) i += 1
  return i
}

function looksLikeTypeName(word: string): boolean {
  if (word.length < 2) return false
  if (COMMON_BUILTINS.has(word)) return false
  if (!/^[A-Z]/.test(word)) return false
  // ALL_CAPS constants are builtins, not types
  if (/^[A-Z][A-Z0-9_]+$/.test(word) && word.includes('_')) return false
  if (/^[A-Z]{3,}$/.test(word)) return false
  return true
}

function looksLikeConstant(word: string): boolean {
  return /^[A-Z][A-Z0-9_]*$/.test(word) && word.length > 1
}

function highlightStringContents(raw: string): string {
  let out = ''
  let i = 0
  while (i < raw.length) {
    if (raw[i] === '\\' && i + 1 < raw.length) {
      let end = i + 2
      const next = raw[i + 1]!
      if (next === 'u' && raw[i + 2] === '{') {
        end = i + 3
        while (end < raw.length && raw[end] !== '}') end += 1
        if (end < raw.length) end += 1
      } else if (next === 'u') {
        end = Math.min(i + 6, raw.length)
      } else if (next === 'x') {
        end = Math.min(i + 4, raw.length)
      }
      out += span('wash-code-tok-escape', raw.slice(i, end))
      i = end
      continue
    }
    let j = i + 1
    while (j < raw.length && raw[j] !== '\\') j += 1
    out += span('wash-code-tok-string', raw.slice(i, j))
    i = j
  }
  return out
}

function tryMatchOperator(line: string, i: number): string | null {
  for (const op of MULTI_OPS) {
    if (line.startsWith(op, i)) return op
  }
  const ch = line[i]!
  if (OP_CHARS.has(ch)) return ch
  return null
}

function prevSignificant(line: string, i: number): string | null {
  let k = i - 1
  while (k >= 0 && /\s/.test(line[k]!)) k -= 1
  return k >= 0 ? line[k]! : null
}

function precedesTypeAnnotation(line: string, i: number): boolean {
  const prev = prevSignificant(line, i)
  if (prev === ':') return true
  // `->` return type
  let k = i - 1
  while (k >= 0 && /\s/.test(line[k]!)) k -= 1
  if (k >= 1 && line[k] === '>' && line[k - 1] === '-') return true
  return false
}

function precedesDoubleColon(line: string, i: number): boolean {
  let k = i - 1
  while (k >= 0 && /\s/.test(line[k]!)) k -= 1
  if (k < 1 || line[k] !== ':') return false
  return line[k - 1] === ':'
}

function canStartRegex(line: string, i: number): boolean {
  const prev = prevSignificant(line, i)
  if (prev === null) return true
  // Division / end of previous expression
  if (/[)\]\d$'"`]/.test(prev)) return false
  if (/[A-Za-z_$]/.test(prev)) {
    let end = i - 1
    while (end >= 0 && /\s/.test(line[end]!)) end -= 1
    let start = end
    while (start >= 0 && /[A-Za-z0-9_$]/.test(line[start]!)) start -= 1
    const word = line.slice(start + 1, end + 1)
    // Keywords / soft keywords that may precede a regex literal
    return (
      word === 'return' ||
      word === 'case' ||
      word === 'throw' ||
      word === 'delete' ||
      word === 'void' ||
      word === 'typeof' ||
      word === 'await' ||
      word === 'yield' ||
      word === 'in' ||
      word === 'of' ||
      word === 'instanceof' ||
      word === 'new' ||
      word === 'else' ||
      word === '&&' ||
      word === '||'
    )
  }
  return true
}

function readRegexLiteral(line: string, i: number): number {
  let j = i + 1
  let escaped = false
  while (j < line.length) {
    const c = line[j]!
    if (escaped) {
      escaped = false
      j += 1
      continue
    }
    if (c === '\\') {
      escaped = true
      j += 1
      continue
    }
    if (c === '/') {
      j += 1
      while (j < line.length && /[gimsuyvd]/.test(line[j]!)) j += 1
      return j
    }
    if (c === '\n') break
    j += 1
  }
  return -1
}

export type HighlightOpts = {
  lineComment?: string
  stringQuotes?: string[]
  /** Language keywords (control flow, declarations). */
  builtins?: Set<string>
  /** Known primitive / library type names (string, int, …). */
  types?: Set<string>
  /** PascalCase identifiers → type (default true). */
  capitalizeAsType?: boolean
  /** Attempt JS-style `/regex/` literals (default false). */
  highlightRegex?: boolean
  /** `@name` → decorator (default true when `@` seen). */
  highlightDecorators?: boolean
}

/**
 * From-scratch line highlighter with rich token classes for Wash CodeEditor.
 * Classifies keywords, builtins, functions, types, variables, operators, etc.
 */
export function highlightWithKeywords(
  line: string,
  keywords: Set<string>,
  opts: HighlightOpts = {},
): string {
  const quotes = opts.stringQuotes ?? ['"', "'", '`']
  const lineComment = opts.lineComment
  const builtins = opts.builtins ?? COMMON_BUILTINS
  const types = opts.types
  const capitalizeAsType = opts.capitalizeAsType !== false
  const highlightRegex = opts.highlightRegex === true
  const highlightDecorators = opts.highlightDecorators !== false
  let out = ''
  let i = 0

  while (i < line.length) {
    const ch = line[i]!

    if (
      lineComment &&
      line.slice(i, i + lineComment.length) === lineComment
    ) {
      out += span('wash-code-tok-comment', line.slice(i))
      break
    }

    if (quotes.includes(ch)) {
      const quote = ch
      let j = i + 1
      let escaped = false
      while (j < line.length) {
        const c = line[j]!
        if (escaped) {
          escaped = false
        } else if (c === '\\') {
          escaped = true
        } else if (c === quote) {
          j += 1
          break
        }
        j += 1
      }
      const raw = line.slice(i, j)
      out +=
        raw.includes('\\')
          ? highlightStringContents(raw)
          : span('wash-code-tok-string', raw)
      i = j
      continue
    }

    if (
      highlightRegex &&
      ch === '/' &&
      line[i + 1] !== '/' &&
      line[i + 1] !== '*' &&
      canStartRegex(line, i)
    ) {
      const end = readRegexLiteral(line, i)
      if (end > i) {
        out += span('wash-code-tok-regex', line.slice(i, end))
        i = end
        continue
      }
    }

    if (highlightDecorators && ch === '@' && i + 1 < line.length && isIdentStart(line[i + 1]!)) {
      let j = i + 1
      while (j < line.length && isIdentCont(line[j]!)) j += 1
      out += span('wash-code-tok-decorator', line.slice(i, j))
      i = j
      continue
    }

    if (/[0-9]/.test(ch) || (ch === '.' && i + 1 < line.length && /[0-9]/.test(line[i + 1]!))) {
      let j = i + 1
      while (j < line.length && /[0-9._xXa-fA-F]/.test(line[j]!)) j += 1
      if (line[j] === 'n' || line[j] === 'N') j += 1
      out += span('wash-code-tok-number', line.slice(i, j))
      i = j
      continue
    }

    if (isIdentStart(ch)) {
      let j = i + 1
      while (j < line.length && isIdentCont(line[j]!)) j += 1
      const word = line.slice(i, j)
      const after = skipWs(line, j)
      const nextCh = line[after]
      const prev = prevSignificant(line, i)

      let cls = 'wash-code-tok-variable'
      if (keywords.has(word)) {
        cls = 'wash-code-tok-keyword'
      } else if (
        (types?.has(word) || (capitalizeAsType && looksLikeTypeName(word))) &&
        precedesTypeAnnotation(line, i)
      ) {
        cls = 'wash-code-tok-type'
      } else if (builtins.has(word) || looksLikeConstant(word)) {
        cls = 'wash-code-tok-builtin'
      } else if (types?.has(word)) {
        cls = 'wash-code-tok-type'
      } else if (nextCh === '(') {
        cls = 'wash-code-tok-function'
      } else if (prev === '.') {
        cls = 'wash-code-tok-property'
      } else if (precedesDoubleColon(line, i)) {
        cls = 'wash-code-tok-namespace'
      } else if (capitalizeAsType && looksLikeTypeName(word)) {
        cls = 'wash-code-tok-type'
      }

      out += span(cls, word)
      i = j
      continue
    }

    const op = tryMatchOperator(line, i)
    if (op) {
      out += span('wash-code-tok-operator', op)
      i += op.length
      continue
    }

    if (PUNCT_CHARS.has(ch)) {
      out += span('wash-code-tok-punct', ch)
      i += 1
      continue
    }

    if (ch === '#' && i + 1 < line.length && isIdentStart(line[i + 1]!)) {
      // CSS id / some preprocessors, or Python/shell shebang already handled as comment
      let j = i + 1
      while (j < line.length && isIdentCont(line[j]!)) j += 1
      out += span('wash-code-tok-decorator', line.slice(i, j))
      i = j
      continue
    }

    out += escapeHtml(ch)
    i += 1
  }

  return out || '&nbsp;'
}

/** Highlight HTML/XML-ish markup: tags, attributes, strings, comments. */
export function highlightMarkupLine(line: string): string {
  const trimmed = line.trim()
  if (trimmed.startsWith('<!--') || trimmed.includes('-->')) {
    return span('wash-code-tok-comment', line) || '&nbsp;'
  }

  let out = ''
  let i = 0
  while (i < line.length) {
    const ch = line[i]!

    if (line.startsWith('<!--', i)) {
      const end = line.indexOf('-->', i)
      const j = end >= 0 ? end + 3 : line.length
      out += span('wash-code-tok-comment', line.slice(i, j))
      i = j
      continue
    }

    if (ch === '<' && line[i + 1] !== ' ') {
      const isClose = line[i + 1] === '/'
      const isDecl = line[i + 1] === '!' || line[i + 1] === '?'
      out += span('wash-code-tok-punct', isClose ? '</' : '<')
      i += isClose ? 2 : 1

      if (isDecl) {
        const bang = line[i]!
        out += span('wash-code-tok-keyword', bang)
        i += 1
      }

      if (i < line.length && /[A-Za-z]/.test(line[i]!)) {
        let j = i
        while (j < line.length && /[A-Za-z0-9:_-]/.test(line[j]!)) j += 1
        out += span('wash-code-tok-tag', line.slice(i, j))
        i = j
      }

      while (i < line.length && line[i] !== '>') {
        if (line.startsWith('/>', i)) {
          out += span('wash-code-tok-punct', '/>')
          i += 2
          break
        }
        const c = line[i]!
        if (c === '"' || c === "'") {
          const q = c
          let j = i + 1
          while (j < line.length && line[j] !== q) j += 1
          if (j < line.length) j += 1
          out += span('wash-code-tok-string', line.slice(i, j))
          i = j
          continue
        }
        if (/[A-Za-z_]/.test(c)) {
          let j = i + 1
          while (j < line.length && /[A-Za-z0-9:_-]/.test(line[j]!)) j += 1
          const word = line.slice(i, j)
          const after = skipWs(line, j)
          out += span(
            line[after] === '=' ? 'wash-code-tok-property' : 'wash-code-tok-variable',
            word,
          )
          i = j
          continue
        }
        if (c === '=' || c === '/' || c === '?' || c === '!') {
          out += span('wash-code-tok-operator', c)
          i += 1
          continue
        }
        out += escapeHtml(c)
        i += 1
      }
      if (i < line.length && line[i] === '>') {
        out += span('wash-code-tok-punct', '>')
        i += 1
      }
      continue
    }

    // Text / mustache-ish content outside tags: light keyword pass for {#if} etc.
    if (ch === '{' && (line[i + 1] === '#' || line[i + 1] === '/' || line[i + 1] === ':')) {
      out += span('wash-code-tok-punct', '{')
      i += 1
      out += span('wash-code-tok-operator', line[i]!)
      i += 1
      if (i < line.length && isIdentStart(line[i]!)) {
        let j = i
        while (j < line.length && isIdentCont(line[j]!)) j += 1
        out += span('wash-code-tok-keyword', line.slice(i, j))
        i = j
      }
      continue
    }

    out += escapeHtml(ch)
    i += 1
  }

  return out || '&nbsp;'
}

export function validateBracketBalance(source: string): Diagnostic[] {
  const pairs: Record<string, string> = { '(': ')', '[': ']', '{': '}' }
  const opens = new Set(Object.keys(pairs))
  const closes = new Set(Object.values(pairs))
  const stack: { ch: string; line: number; col: number }[] = []
  const out: Diagnostic[] = []
  let line = 1
  let col = 1
  let inLineComment = false
  let inBlockComment = false
  let stringQuote: string | null = null

  for (let i = 0; i < source.length; i += 1) {
    const ch = source[i]!
    const next = source[i + 1]

    if (ch === '\n') {
      line += 1
      col = 1
      inLineComment = false
      continue
    }

    if (inLineComment) {
      col += 1
      continue
    }

    if (inBlockComment) {
      if (ch === '*' && next === '/') {
        inBlockComment = false
        i += 1
        col += 2
        continue
      }
      col += 1
      continue
    }

    if (stringQuote) {
      if (ch === '\\') {
        i += 1
        col += 2
        continue
      }
      if (ch === stringQuote) stringQuote = null
      col += 1
      continue
    }

    if (ch === '/' && next === '/') {
      inLineComment = true
      i += 1
      col += 2
      continue
    }
    if (ch === '/' && next === '*') {
      inBlockComment = true
      i += 1
      col += 2
      continue
    }
    if (ch === '"' || ch === "'" || ch === '`') {
      stringQuote = ch
      col += 1
      continue
    }

    if (opens.has(ch)) {
      stack.push({ ch, line, col })
    } else if (closes.has(ch)) {
      const top = stack.pop()
      if (!top || pairs[top.ch] !== ch) {
        out.push({
          line,
          col,
          message: `Unmatched '${ch}'`,
          severity: 'error',
        })
      }
    }
    col += 1
  }

  for (const left of stack) {
    out.push({
      line: left.line,
      col: left.col,
      message: `Unclosed '${left.ch}'`,
      severity: 'error',
    })
  }

  return out
}

export function validateJson(source: string): Diagnostic[] {
  const trimmed = source.trim()
  if (!trimmed) return []
  try {
    JSON.parse(trimmed)
    return []
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Invalid JSON'
    const match = /position\s+(\d+)/i.exec(message)
    let line = 1
    let col = 1
    if (match) {
      const pos = Number(match[1])
      let cur = 0
      for (let i = 0; i < source.length && cur < pos; i += 1) {
        if (source[i] === '\n') {
          line += 1
          col = 1
        } else {
          col += 1
        }
        cur += 1
      }
    }
    return [{ line, col, message, severity: 'error' }]
  }
}

export function snippetsFromKeywords(
  keywords: string[],
  extras: { label: string; insert: string }[] = [],
): { label: string; insert: string }[] {
  return [
    ...extras,
    ...keywords.slice(0, 40).map((k) => ({ label: k, insert: k })),
  ]
}
