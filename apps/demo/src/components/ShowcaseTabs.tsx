import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from 'react'
import { Check, Copy } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import { CodePreview } from './CodePreview'
import { buildShowcaseCode } from './showcaseCodeSnippets'
import type { ShowcaseCodeLang } from './showcase-highlighter'

type TabId = 'preview' | 'css' | 'html' | 'jsx' | 'svelte' | 'kotlin'

export type ShowcaseTabsProps = {
  preview: ReactNode
  html: string
  jsx: string
  /** Optional CSS / theme source block (shown as a CSS tab when provided). */
  css?: string
  /** Optional hand-authored Svelte. Defaults to HTML markup + Wash core imports. */
  svelte?: string
  /** Optional hand-authored Kotlin/Compose. Defaults from HTML class heuristics. */
  kotlin?: string
  className?: string
  /** Prefer opening a code tab (e.g. CSS) instead of Preview. */
  defaultTab?: TabId
}

const allTabs: { id: TabId; label: string }[] = [
  { id: 'preview', label: 'Preview' },
  { id: 'css', label: 'CSS' },
  { id: 'html', label: 'HTML' },
  { id: 'jsx', label: 'JSX' },
  { id: 'svelte', label: 'Svelte' },
  { id: 'kotlin', label: 'Kotlin' },
]

const codeLangByTab: Record<Exclude<TabId, 'preview'>, ShowcaseCodeLang> = {
  css: 'css',
  html: 'html',
  jsx: 'tsx',
  svelte: 'svelte',
  kotlin: 'kotlin',
}

export function ShowcaseTabs({
  preview,
  html,
  jsx,
  css,
  svelte,
  kotlin,
  className = '',
  defaultTab = 'preview',
}: ShowcaseTabsProps) {
  const baseId = useId()
  const previewRef = useRef<HTMLDivElement>(null)
  const [panelsHeight, setPanelsHeight] = useState<number | null>(null)
  const [active, setActive] = useState<TabId>(defaultTab)
  const [copiedTab, setCopiedTab] = useState<TabId | null>(null)

  const tabs = useMemo(
    () => allTabs.filter((tab) => tab.id !== 'css' || Boolean(css)),
    [css],
  )

  const snippets = useMemo(
    () => ({
      ...buildShowcaseCode({ html, jsx, svelte, kotlin }),
      css: css?.replace(/^\s+/, '') ?? '',
    }),
    [html, jsx, css, svelte, kotlin],
  )

  useEffect(() => {
    setActive(defaultTab === 'css' && !css ? 'preview' : defaultTab)
  }, [css, defaultTab, html, jsx])

  useEffect(() => {
    const previewEl = previewRef.current
    if (!previewEl) return

    const syncHeight = () => {
      setPanelsHeight(previewEl.offsetHeight)
    }

    syncHeight()

    const observer = new ResizeObserver(syncHeight)
    observer.observe(previewEl)
    return () => observer.disconnect()
  }, [preview])

  async function copyCode(tab: Exclude<TabId, 'preview'>) {
    const text = tab === 'css' ? snippets.css : snippets[tab]
    try {
      await navigator.clipboard.writeText(text)
      setCopiedTab(tab)
      window.setTimeout(() => setCopiedTab(null), 2000)
    } catch {
      // Clipboard unavailable in some contexts.
    }
  }

  const codeTab = active === 'preview' ? null : active
  const code = codeTab ? (codeTab === 'css' ? snippets.css : snippets[codeTab]) : ''
  const codeLang = codeTab ? codeLangByTab[codeTab] : 'html'

  return (
    <div
      className={`overflow-hidden rounded-box border border-ink-border/70 bg-base-100/60 ${className}`.trim()}
    >
      <div
        role="tablist"
        className="tabs tabs-box tabs-sm flex-wrap border-b border-ink-border/70 bg-base-200/50 px-2 pt-2 sm:tabs-md"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active === tab.id}
            aria-controls={`${baseId}-${tab.id}`}
            id={`${baseId}-tab-${tab.id}`}
            className={`tab cursor-pointer ${active === tab.id ? 'tab-active' : ''}`}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        className="showcase-tabs-panels"
        style={panelsHeight != null ? { height: panelsHeight } : undefined}
      >
        <div
          ref={previewRef}
          role="tabpanel"
          id={`${baseId}-preview`}
          aria-labelledby={`${baseId}-tab-preview`}
          aria-hidden={active !== 'preview'}
          className={`showcase-tabs-preview-panel w-full min-w-0 p-4 md:p-5 ${
            active !== 'preview' ? 'invisible pointer-events-none' : ''
          }`}
        >
          {preview}
        </div>

        {codeTab ? (
          <div
            role="tabpanel"
            id={`${baseId}-${codeTab}`}
            aria-labelledby={`${baseId}-tab-${codeTab}`}
            className="showcase-tabs-code-panel relative flex w-full min-w-0 flex-col items-stretch justify-start overflow-hidden bg-base-200/30"
          >
            <div
              className="tooltip tooltip-primary tooltip-left absolute top-2 right-2 z-10"
              data-tip={copiedTab === codeTab ? 'Copied' : 'Copy code'}
            >
              <button
                type="button"
                className="btn btn-ghost btn-square btn-sm btn-primary cursor-pointer"
                aria-label={copiedTab === codeTab ? 'Copied' : 'Copy code'}
                onClick={() => void copyCode(codeTab)}
              >
                {copiedTab === codeTab ? (
                  <Check className="size-4" strokeWidth={1.75} aria-hidden="true" />
                ) : (
                  <Copy className="size-4" strokeWidth={1.75} aria-hidden="true" />
                )}
              </button>
            </div>
            <CodePreview code={code} lang={codeLang} className="showcase-tabs-code-scroll" />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default ShowcaseTabs
