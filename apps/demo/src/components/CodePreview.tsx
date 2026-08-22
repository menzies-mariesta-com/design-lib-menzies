import { useEffect, useState } from 'react'
import {
  highlightShowcaseCode,
  type ShowcaseCodeLang,
} from './showcase-highlighter'
import { useShowcaseCodeTheme } from './useShowcaseCodeTheme'

export type CodePreviewProps = {
  code: string
  lang: ShowcaseCodeLang
  className?: string
}

export function CodePreview({ code, lang, className = '' }: CodePreviewProps) {
  const theme = useShowcaseCodeTheme()
  const [html, setHtml] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setHtml(null)

    void highlightShowcaseCode(code, lang, theme).then((result) => {
      if (!cancelled) setHtml(result)
    })

    return () => {
      cancelled = true
    }
  }, [code, lang, theme])

  return (
    <div
      className={`showcase-code ${className}`.trim()}
      data-code-theme={theme}
    >
      {html ? (
        <div
          className="showcase-code-highlight"
          // Shiki emits trusted static markup from bundled grammars/themes.
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <pre className="showcase-code-fallback">
          <code>{code}</code>
        </pre>
      )}
    </div>
  )
}
