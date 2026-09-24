import type { LanguagePack, LanguageId } from './types'
import {
  highlightWithKeywords,
  snippetsFromKeywords,
  validateBracketBalance,
  COMMON_BUILTINS,
  type HighlightOpts,
} from './shared'

export function makeKeywordPack(opts: {
  id: LanguageId
  label: string
  extensions: string[]
  aliases?: string[]
  keywords: string[]
  builtins?: string[]
  types?: string[]
  lineComment?: string
  blockComment?: { open: string; close: string }
  snippets?: { label: string; insert: string }[]
  stringQuotes?: string[]
  validateBrackets?: boolean
  capitalizeAsType?: boolean
  highlightRegex?: boolean
  highlightDecorators?: boolean
  tokenize?: (line: string) => string
}): LanguagePack {
  const keywordSet = new Set(opts.keywords)
  const builtinSet = new Set([
    ...COMMON_BUILTINS,
    ...(opts.builtins ?? []),
  ])
  // Prefer builtin over keyword when both listed
  for (const b of builtinSet) keywordSet.delete(b)

  const typeSet = opts.types?.length ? new Set(opts.types) : undefined
  const highlightOpts: HighlightOpts = {
    lineComment: opts.lineComment,
    stringQuotes: opts.stringQuotes,
    builtins: builtinSet,
    types: typeSet,
    capitalizeAsType: opts.capitalizeAsType,
    highlightRegex: opts.highlightRegex,
    highlightDecorators: opts.highlightDecorators,
  }

  return {
    id: opts.id,
    label: opts.label,
    extensions: opts.extensions,
    aliases: opts.aliases ?? [],
    lineComment: opts.lineComment,
    blockComment: opts.blockComment,
    keywords: opts.keywords,
    snippets: snippetsFromKeywords(opts.keywords, opts.snippets),
    tokenize:
      opts.tokenize ??
      ((line) => highlightWithKeywords(line, keywordSet, highlightOpts)),
    validate: opts.validateBrackets === false ? undefined : validateBracketBalance,
  }
}
