import type { LanguagePack } from './types'
import {
  span,
  escapeHtml,
  snippetsFromKeywords,
  validateBracketBalance,
  highlightMarkupLine,
  highlightWithKeywords,
} from './shared'

const CSS_AT_KEYWORDS = new Set([
  '@media',
  '@import',
  '@keyframes',
  '@font-face',
  '@supports',
  '@charset',
  '@layer',
  '@container',
  '@property',
])

const CSS_BUILTINS = new Set([
  'important',
  'inherit',
  'initial',
  'unset',
  'revert',
  'none',
  'auto',
  'solid',
  'dashed',
  'dotted',
  'flex',
  'grid',
  'block',
  'inline',
  'absolute',
  'relative',
  'fixed',
  'sticky',
  'hidden',
  'visible',
  'bold',
  'normal',
  'italic',
  'center',
  'left',
  'right',
  'row',
  'column',
  'wrap',
  'nowrap',
])

function highlightCss(line: string): string {
  const trimmed = line.trim()
  if (
    trimmed.startsWith('/*') ||
    trimmed.endsWith('*/') ||
    (trimmed.includes('/*') && trimmed.includes('*/'))
  ) {
    // Full-line or simple block comment on one line
    if (trimmed.startsWith('/*') || /^[^'"]*\/\*/.test(line)) {
      return span('wash-code-tok-comment', line) || '&nbsp;'
    }
  }

  let out = ''
  let i = 0
  while (i < line.length) {
    const ch = line[i]!

    if (line.startsWith('/*', i)) {
      const end = line.indexOf('*/', i + 2)
      const j = end >= 0 ? end + 2 : line.length
      out += span('wash-code-tok-comment', line.slice(i, j))
      i = j
      continue
    }

    if (ch === '"' || ch === "'") {
      const q = ch
      let j = i + 1
      while (j < line.length && line[j] !== q) {
        if (line[j] === '\\') j += 1
        j += 1
      }
      if (j < line.length) j += 1
      out += span('wash-code-tok-string', line.slice(i, j))
      i = j
      continue
    }

    if (ch === '#' && /[0-9A-Fa-f]/.test(line[i + 1] ?? '')) {
      let j = i + 1
      while (j < line.length && /[0-9A-Fa-f]/.test(line[j]!)) j += 1
      out += span('wash-code-tok-number', line.slice(i, j))
      i = j
      continue
    }

    if (ch === '.' || ch === '#') {
      if (i + 1 < line.length && /[A-Za-z_-]/.test(line[i + 1]!)) {
        let j = i + 1
        while (j < line.length && /[A-Za-z0-9_-]/.test(line[j]!)) j += 1
        out +=
          span('wash-code-tok-punct', ch) +
          span('wash-code-tok-type', line.slice(i + 1, j))
        i = j
        continue
      }
    }

    if (ch === '@') {
      let j = i + 1
      while (j < line.length && /[A-Za-z-]/.test(line[j]!)) j += 1
      const at = line.slice(i, j)
      out += span(
        CSS_AT_KEYWORDS.has(at) || at.startsWith('@')
          ? 'wash-code-tok-keyword'
          : 'wash-code-tok-decorator',
        at,
      )
      i = j
      continue
    }

    if (/[0-9]/.test(ch)) {
      let j = i + 1
      while (j < line.length && /[0-9.]/.test(line[j]!)) j += 1
      while (j < line.length && /[a-z%]/i.test(line[j]!)) j += 1
      out += span('wash-code-tok-number', line.slice(i, j))
      i = j
      continue
    }

    if (/[A-Za-z_-]/.test(ch)) {
      let j = i + 1
      while (j < line.length && /[A-Za-z0-9_-]/.test(line[j]!)) j += 1
      const word = line.slice(i, j)
      let k = j
      while (k < line.length && /\s/.test(line[k]!)) k += 1
      const next = line[k]

      let cls = 'wash-code-tok-variable'
      if (CSS_BUILTINS.has(word) || word === 'important') {
        cls = 'wash-code-tok-builtin'
      } else if (next === '(') {
        cls = 'wash-code-tok-function'
      } else if (next === ':') {
        cls = 'wash-code-tok-property'
      } else if (next === '{' || next === ',' || next === '>' || next === '+') {
        cls = 'wash-code-tok-tag'
      }

      out += span(cls, word)
      i = j
      continue
    }

    if (/[{}();:,>+~*]/.test(ch)) {
      out += span(
        /[>{+~*]/.test(ch) ? 'wash-code-tok-operator' : 'wash-code-tok-punct',
        ch,
      )
      i += 1
      continue
    }

    if (ch === '!' && line.startsWith('!important', i)) {
      out += span('wash-code-tok-builtin', '!important')
      i += '!important'.length
      continue
    }

    out += escapeHtml(ch)
    i += 1
  }

  return out || '&nbsp;'
}

function highlightMarkdown(line: string): string {
  if (/^#{1,6}\s/.test(line)) {
    const m = /^(#{1,6})(\s+)(.*)$/.exec(line)
    if (m) {
      return (
        span('wash-code-tok-keyword', m[1]!) +
        escapeHtml(m[2]!) +
        span('wash-code-tok-type', m[3]!)
      )
    }
    return span('wash-code-tok-keyword', line) || '&nbsp;'
  }
  if (/^>\s/.test(line)) {
    return (
      span('wash-code-tok-operator', '>') +
      (line[1] === ' ' ? escapeHtml(line.slice(1, 2)) + escapeHtml(line.slice(2)) : escapeHtml(line.slice(1)))
    )
  }
  if (/^[-*+]\s/.test(line)) {
    return span('wash-code-tok-operator', line.slice(0, 1)) + escapeHtml(line.slice(1))
  }
  if (/^```/.test(line)) {
    return span('wash-code-tok-punct', '```') + span('wash-code-tok-namespace', line.slice(3))
  }
  if (/^\|/.test(line)) {
    return highlightWithKeywords(line, new Set(), { capitalizeAsType: false })
  }

  // Inline: code, links, bold, italic, images
  let out = ''
  let i = 0
  const s = line
  while (i < s.length) {
    if (s[i] === '`') {
      let j = i + 1
      while (j < s.length && s[j] !== '`') j += 1
      if (j < s.length) j += 1
      out += span('wash-code-tok-string', s.slice(i, j))
      i = j
      continue
    }
    if (s.startsWith('![', i) || s[i] === '[') {
      const isImg = s.startsWith('![', i)
      const open = isImg ? '![' : '['
      out += span('wash-code-tok-operator', open)
      i += open.length
      let j = i
      while (j < s.length && s[j] !== ']') j += 1
      out += span('wash-code-tok-property', s.slice(i, j))
      i = j
      if (s[i] === ']') {
        out += span('wash-code-tok-operator', ']')
        i += 1
      }
      if (s[i] === '(') {
        out += span('wash-code-tok-punct', '(')
        i += 1
        let k = i
        while (k < s.length && s[k] !== ')') k += 1
        out += span('wash-code-tok-namespace', s.slice(i, k))
        i = k
        if (s[i] === ')') {
          out += span('wash-code-tok-punct', ')')
          i += 1
        }
      }
      continue
    }
    if (s.startsWith('**', i)) {
      let j = i + 2
      while (j < s.length && !s.startsWith('**', j)) j += 1
      if (s.startsWith('**', j)) {
        out += span('wash-code-tok-keyword', s.slice(i, j + 2))
        i = j + 2
        continue
      }
    }
    if (s[i] === '*' || s[i] === '_') {
      const mark = s[i]!
      let j = i + 1
      while (j < s.length && s[j] !== mark) j += 1
      if (j < s.length) {
        out += span('wash-code-tok-decorator', s.slice(i, j + 1))
        i = j + 1
        continue
      }
    }
    out += escapeHtml(s[i]!)
    i += 1
  }
  return out || '&nbsp;'
}

export const css: LanguagePack = {
  id: 'css',
  label: 'CSS',
  extensions: ['.css', '.scss', '.less'],
  aliases: [],
  lineComment: undefined,
  blockComment: { open: '/*', close: '*/' },
  keywords: ['@media', '@import', '@keyframes', 'important'],
  snippets: snippetsFromKeywords(['display', 'flex', 'grid', 'color', 'margin', 'padding']),
  tokenize: highlightCss,
  validate: validateBracketBalance,
}

export const html: LanguagePack = {
  id: 'html',
  label: 'HTML',
  extensions: ['.html', '.htm'],
  aliases: [],
  blockComment: { open: '<!--', close: '-->' },
  keywords: ['div', 'span', 'class', 'id', 'href', 'src'],
  snippets: [
    { label: 'div', insert: '<div>$1</div>' },
    { label: 'a', insert: '<a href="$1">$2</a>' },
  ],
  tokenize: highlightMarkupLine,
}

export const markdown: LanguagePack = {
  id: 'markdown',
  label: 'Markdown',
  extensions: ['.md', '.markdown', '.mdx'],
  aliases: ['md'],
  lineComment: undefined,
  keywords: ['TODO', 'NOTE', 'FIXME'],
  snippets: [
    { label: 'h1', insert: '# $1' },
    { label: 'link', insert: '[$1]($2)' },
  ],
  tokenize: highlightMarkdown,
}

export const plaintext: LanguagePack = {
  id: 'plaintext',
  label: 'Plain text',
  extensions: ['.txt', '.text', '.log'],
  aliases: ['txt', 'text', 'plain'],
  keywords: [],
  snippets: [],
  tokenize: (line) => escapeHtml(line) || '&nbsp;',
}
