/**
 * Optional React editors entry.
 * Import from `@menzies-mariesta-com/menzies-design-wash-ui/editors`
 * so apps that do not use editors never pay for them in the main React chunk.
 */

export {
  RichTextEditor,
  type RichTextEditorProps,
} from '../components/RichTextEditor'

export {
  CodeEditor,
  type CodeEditorProps,
  type CodeEditorTab,
  type CodeLanguage,
  type LanguageId,
  type Diagnostic,
} from '../components/CodeEditor'

export {
  listLanguages,
  getLanguagePack,
  resolveLanguageFromFileName,
  resolveLanguageId,
  type LanguagePack,
} from '../components/editor/languages'

export { sanitizeRichHtml, isRichHtmlEmpty } from '../components/editor/sanitizeHtml'
