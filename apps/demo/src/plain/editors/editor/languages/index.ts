export type {
  LanguageId,
  LanguagePack,
  CodeLanguage,
  Diagnostic,
  DiagnosticSeverity,
  LanguageSnippet,
} from './types'
export {
  listLanguages,
  getLanguagePack,
  resolveLanguageFromFileName,
  resolveLanguageId,
  normalizeLanguageProp,
} from './registry'
