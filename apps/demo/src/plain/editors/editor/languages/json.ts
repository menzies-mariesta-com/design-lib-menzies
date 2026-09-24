import type { LanguagePack } from './types'
import { escapeHtml, span, validateJson, snippetsFromKeywords } from './shared'

function highlightJson(line: string): string {
  return (
    line.replace(
      /("(?:\\.|[^"\\])*")(\s*:)?|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)|(\btrue\b|\bfalse\b|\bnull\b)|([{}[\],])/g,
      (
        full,
        str: string | undefined,
        colon: string | undefined,
        num: string | undefined,
        kw: string | undefined,
        punct: string | undefined,
      ) => {
        if (str !== undefined) {
          if (colon !== undefined) {
            const ws = colon.slice(0, -1)
            return (
              span('wash-code-tok-property', str) +
              escapeHtml(ws) +
              span('wash-code-tok-operator', ':')
            )
          }
          return span('wash-code-tok-string', str)
        }
        if (num !== undefined) return span('wash-code-tok-number', num)
        if (kw !== undefined) return span('wash-code-tok-builtin', kw)
        if (punct !== undefined) return span('wash-code-tok-punct', punct)
        return escapeHtml(full)
      },
    ) || '&nbsp;'
  )
}

export const json: LanguagePack = {
  id: 'json',
  label: 'JSON',
  extensions: ['.json', '.jsonc'],
  aliases: [],
  keywords: ['true', 'false', 'null'],
  snippets: snippetsFromKeywords(['true', 'false', 'null']),
  tokenize: highlightJson,
  validate: validateJson,
}
