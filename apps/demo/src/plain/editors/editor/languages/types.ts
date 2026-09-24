export type LanguageId =
  | 'typescript'
  | 'javascript'
  | 'json'
  | 'css'
  | 'html'
  | 'markdown'
  | 'plaintext'
  | 'yaml'
  | 'toml'
  | 'xml'
  | 'sql'
  | 'graphql'
  | 'shell'
  | 'python'
  | 'go'
  | 'rust'
  | 'java'
  | 'c'
  | 'cpp'
  | 'kotlin'
  | 'svelte'
  | 'vue'

/** @deprecated Prefer LanguageId. Kept for existing CodeEditor callers. */
export type CodeLanguage =
  | LanguageId
  | 'ts'
  | 'js'
  | 'txt'

export type DiagnosticSeverity = 'error' | 'warning' | 'info'

export type Diagnostic = {
  line: number
  col?: number
  message: string
  severity: DiagnosticSeverity
}

export type LanguageSnippet = {
  label: string
  insert: string
}

export type LanguagePack = {
  id: LanguageId
  label: string
  extensions: string[]
  aliases: string[]
  lineComment?: string
  blockComment?: { open: string; close: string }
  keywords: string[]
  snippets: LanguageSnippet[]
  tokenize: (line: string) => string
  validate?: (source: string) => Diagnostic[]
}
