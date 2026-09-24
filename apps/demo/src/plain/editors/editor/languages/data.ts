import { makeKeywordPack } from './factory'
import type { LanguagePack } from './types'
import {
  highlightWithKeywords,
  highlightMarkupLine,
  snippetsFromKeywords,
  span,
  escapeHtml,
} from './shared'

const yamlBuiltins = new Set([
  'true', 'false', 'null', 'yes', 'no', 'on', 'off',
])

function highlightYaml(line: string): string {
  const hash = line.indexOf('#')
  if (hash >= 0) {
    const before = line.slice(0, hash)
    // Only treat as comment when # is outside quotes (simple check)
    const quotes = (before.match(/["']/g) ?? []).length
    if (quotes % 2 === 0) {
      const head =
        before.length > 0
          ? highlightYamlValueOrKey(before).replace(/&nbsp;$/, '')
          : ''
      return (head + span('wash-code-tok-comment', line.slice(hash))) || '&nbsp;'
    }
  }
  return highlightYamlValueOrKey(line)
}

function highlightYamlValueOrKey(line: string): string {
  const list = /^(\s*)(-)(\s+)(.*)$/.exec(line)
  if (list) {
    return (
      escapeHtml(list[1]!) +
      span('wash-code-tok-operator', list[2]!) +
      escapeHtml(list[3]!) +
      highlightYamlValueOrKey(list[4]!)
    )
  }

  // Prefer: leading ws + key + : + rest
  const keyMatch = /^(\s*)([^:#\n]+?)(\s*)(:)(\s*)(.*)$/.exec(line)
  if (keyMatch) {
    const [, lead, key, preColon, colon, postColon, rest] = keyMatch
    const keyTrim = key!.trim()
    // Avoid treating URLs / times as keys when weird; require non-empty key
    if (keyTrim && !keyTrim.includes(' ')) {
      return (
        escapeHtml(lead!) +
        span('wash-code-tok-property', keyTrim) +
        escapeHtml(preColon!) +
        span('wash-code-tok-operator', colon!) +
        escapeHtml(postColon!) +
        (rest
          ? highlightWithKeywords(rest, new Set(), {
              stringQuotes: ['"', "'"],
              builtins: yamlBuiltins,
              capitalizeAsType: false,
            }).replace(/^&nbsp;$/, '')
          : '')
      ) || '&nbsp;'
    }
  }

  return highlightWithKeywords(line, new Set(), {
    stringQuotes: ['"', "'"],
    builtins: yamlBuiltins,
    capitalizeAsType: false,
  })
}

export const yaml: LanguagePack = {
  id: 'yaml',
  label: 'YAML',
  extensions: ['.yaml', '.yml'],
  aliases: ['yml'],
  lineComment: '#',
  keywords: [...yamlBuiltins],
  snippets: snippetsFromKeywords(['true', 'false', 'null']),
  tokenize: highlightYaml,
}

export const toml = makeKeywordPack({
  id: 'toml',
  label: 'TOML',
  extensions: ['.toml'],
  keywords: [],
  builtins: ['true', 'false'],
  lineComment: '#',
  stringQuotes: ['"', "'"],
  validateBrackets: false,
  capitalizeAsType: false,
})

export const xml: LanguagePack = {
  id: 'xml',
  label: 'XML',
  extensions: ['.xml', '.svg', '.xsl'],
  aliases: [],
  keywords: ['xml', 'version', 'encoding', 'xmlns'],
  blockComment: { open: '<!--', close: '-->' },
  snippets: snippetsFromKeywords(['xml', 'xmlns']),
  tokenize: highlightMarkupLine,
}

export const sql = makeKeywordPack({
  id: 'sql',
  label: 'SQL',
  extensions: ['.sql'],
  keywords: [
    'SELECT', 'FROM', 'WHERE', 'INSERT', 'UPDATE', 'DELETE', 'JOIN', 'LEFT',
    'RIGHT', 'INNER', 'OUTER', 'ON', 'AS', 'AND', 'OR', 'NOT', 'CREATE',
    'TABLE', 'INDEX', 'DROP', 'ALTER', 'VALUES', 'INTO', 'SET', 'GROUP', 'BY',
    'ORDER', 'LIMIT', 'OFFSET', 'HAVING', 'DISTINCT', 'UNION', 'ALL',
  ],
  builtins: ['NULL', 'TRUE', 'FALSE'],
  lineComment: '--',
  blockComment: { open: '/*', close: '*/' },
  capitalizeAsType: true,
})

export const graphql = makeKeywordPack({
  id: 'graphql',
  label: 'GraphQL',
  extensions: ['.graphql', '.gql'],
  keywords: [
    'query', 'mutation', 'subscription', 'type', 'input', 'interface', 'enum',
    'union', 'scalar', 'schema', 'extend', 'implements', 'fragment', 'on',
  ],
  builtins: ['true', 'false', 'null'],
  types: ['Int', 'Float', 'String', 'Boolean', 'ID'],
  lineComment: '#',
})

export const shell = makeKeywordPack({
  id: 'shell',
  label: 'Shell',
  extensions: ['.sh', '.bash', '.zsh'],
  aliases: ['bash', 'zsh', 'sh'],
  keywords: [
    'if', 'then', 'else', 'elif', 'fi', 'for', 'while', 'do', 'done', 'case',
    'esac', 'function', 'return', 'export', 'local',
  ],
  builtins: [
    'echo', 'ls', 'grep', 'awk', 'sed', 'true', 'false', 'cat', 'mkdir',
    'rm', 'cp', 'mv', 'chmod', 'chown', 'pwd', 'exit', 'source', 'alias', 'cd',
  ],
  lineComment: '#',
  stringQuotes: ['"', "'"],
  validateBrackets: false,
  capitalizeAsType: false,
})
