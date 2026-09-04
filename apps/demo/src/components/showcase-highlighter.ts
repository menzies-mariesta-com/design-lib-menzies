import { createHighlighter, type Highlighter } from 'shiki'

export type ShowcaseCodeLang = 'html' | 'css' | 'tsx' | 'svelte' | 'kotlin'
export type ShowcaseCodeTheme = 'github-light' | 'github-dark'

let highlighterPromise: Promise<Highlighter> | null = null
const highlightCache = new Map<string, string>()

function cacheKey(code: string, lang: ShowcaseCodeLang, theme: ShowcaseCodeTheme) {
  return `${theme}:${lang}:${code}`
}

export function getShowcaseHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['github-light', 'github-dark'],
      langs: ['html', 'css', 'tsx', 'svelte', 'kotlin'],
    })
  }
  return highlighterPromise
}

export async function highlightShowcaseCode(
  code: string,
  lang: ShowcaseCodeLang,
  theme: ShowcaseCodeTheme,
) {
  const key = cacheKey(code, lang, theme)
  const cached = highlightCache.get(key)
  if (cached) return cached

  const highlighter = await getShowcaseHighlighter()
  const html = highlighter.codeToHtml(code, {
    lang,
    theme,
  })

  highlightCache.set(key, html)
  return html
}
