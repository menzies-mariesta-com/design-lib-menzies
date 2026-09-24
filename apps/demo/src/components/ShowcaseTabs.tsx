import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from 'react'
import { Check, Copy } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import {
  CodeEditor,
  type CodeEditorTab,
  type LanguageId,
} from '#plain/editors'
import { copyTextToClipboard } from '../lib/copyText'
import { buildShowcaseCode } from './showcaseCodeSnippets'
import type { ShowcaseCodeLang, ShowcaseSvelteFile } from './showcaseTypes'

type TabId = 'preview' | 'css' | 'html' | 'jsx' | 'svelte' | 'kotlin'

export type { ShowcaseSvelteFile, ShowcaseCodeLang }

export type ShowcaseTabsProps = {
  preview: ReactNode
  html: string
  jsx: string
  /** Optional CSS / theme source block (shown as a CSS tab when provided). */
  css?: string
  /** Optional hand-authored Svelte. Defaults to daisyUI class markup from HTML. */
  svelte?: string
  /**
   * Optional multi-file SvelteKit kit. When set, the Svelte tab uses CodeEditor
   * titlebar file tabs (e.g. WashCalendar.svelte / calendar-month.ts / +page.svelte).
   */
  svelteFiles?: ShowcaseSvelteFile[]
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

const fileNameByLang: Record<ShowcaseCodeLang, string> = {
  html: 'snippet.html',
  css: 'snippet.css',
  tsx: 'snippet.tsx',
  svelte: 'snippet.svelte',
  kotlin: 'Showcase.kt',
}

function toEditorLanguage(lang: ShowcaseCodeLang): LanguageId {
  if (lang === 'tsx') return 'typescript'
  return lang
}

function svelteFileToEditorTab(file: ShowcaseSvelteFile, index: number): CodeEditorTab {
  return {
    id: `svelte-file-${index}-${file.name}`,
    fileName: file.name,
    value: file.code,
    language: toEditorLanguage(file.lang),
  }
}

export function ShowcaseTabs({
  preview,
  html,
  jsx,
  css,
  svelte,
  svelteFiles,
  kotlin,
  className = '',
  defaultTab = 'preview',
}: ShowcaseTabsProps) {
  const baseId = useId()
  const previewRef = useRef<HTMLDivElement>(null)
  const [panelsHeight, setPanelsHeight] = useState<number | null>(null)
  const [active, setActive] = useState<TabId>(defaultTab)
  const [copiedTab, setCopiedTab] = useState<TabId | null>(null)
  const [copying, setCopying] = useState(false)
  const [svelteTabId, setSvelteTabId] = useState<string | undefined>(undefined)

  const tabs = useMemo(
    () => allTabs.filter((tab) => tab.id !== 'css' || Boolean(css)),
    [css],
  )

  const hasSvelteFiles = Boolean(svelteFiles && svelteFiles.length > 0)

  const svelteEditorTabs = useMemo(
    () =>
      hasSvelteFiles
        ? svelteFiles!.map((file, index) => svelteFileToEditorTab(file, index))
        : [],
    [hasSvelteFiles, svelteFiles],
  )

  const activeSvelteEditorTab = useMemo(() => {
    if (!hasSvelteFiles || svelteEditorTabs.length === 0) return null
    return (
      svelteEditorTabs.find((tab) => tab.id === svelteTabId) ?? svelteEditorTabs[0]!
    )
  }, [hasSvelteFiles, svelteEditorTabs, svelteTabId])

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
    setSvelteTabId(svelteEditorTabs[0]?.id)
  }, [svelteEditorTabs])

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

  function resolveCopyText(tab: Exclude<TabId, 'preview'>): string {
    if (tab === 'css') return snippets.css
    if (tab === 'svelte' && hasSvelteFiles && svelteFiles && svelteFiles.length > 0) {
      const activeId = svelteTabId ?? svelteEditorTabs[0]?.id
      const index = Math.max(
        0,
        svelteEditorTabs.findIndex((editorTab) => editorTab.id === activeId),
      )
      return svelteFiles[index]?.code ?? svelteEditorTabs[index]?.value ?? ''
    }
    return snippets[tab] ?? ''
  }

  async function copyCode(tab: Exclude<TabId, 'preview'>) {
    if (copying) return
    const text = resolveCopyText(tab)
    setCopying(true)
    try {
      await copyTextToClipboard(text)
      setCopiedTab(tab)
      window.setTimeout(() => setCopiedTab(null), 2000)
    } catch {
      // Clipboard still unavailable after fallback.
    } finally {
      setCopying(false)
    }
  }

  const codeTab = active === 'preview' ? null : active
  const code = codeTab
    ? codeTab === 'css'
      ? snippets.css
      : codeTab === 'svelte' && activeSvelteEditorTab
        ? activeSvelteEditorTab.value
        : snippets[codeTab]
    : ''
  const codeLang: ShowcaseCodeLang = codeTab
    ? codeTab === 'svelte' && activeSvelteEditorTab
      ? (svelteFiles?.find((f) => f.name === activeSvelteEditorTab.fileName)?.lang ??
        'svelte')
      : codeLangByTab[codeTab]
    : 'html'

  const copyTip =
    copying
      ? 'Copying...'
      : copiedTab === codeTab
        ? 'Copied'
        : codeTab === 'svelte' && activeSvelteEditorTab
          ? `Copy ${activeSvelteEditorTab.fileName}`
          : 'Copy code'

  return (
    <div
      className={`wash-allow-dropdown-overflow overflow-hidden rounded-box border border-ink-border/70 bg-base-100/60 ${className}`.trim()}
    >
      <div
        role="tablist"
        aria-label="Showcase language"
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
            className="showcase-tabs-code-panel relative flex w-full min-w-0 flex-col overflow-hidden bg-base-200/30"
          >
            <div
              className="showcase-code-copy tooltip tooltip-primary tooltip-left pointer-events-auto absolute right-2 top-1.5 z-40"
              data-tip={copyTip}
            >
              <button
                type="button"
                className={`btn btn-ghost btn-square btn-sm btn-primary ${
                  copying
                    ? 'btn-disabled cursor-not-allowed loading'
                    : 'cursor-pointer'
                }`}
                aria-label={copyTip}
                aria-busy={copying}
                disabled={copying}
                onClick={(event) => {
                  event.preventDefault()
                  event.stopPropagation()
                  void copyCode(codeTab)
                }}
              >
                {copying ? null : copiedTab === codeTab ? (
                  <Check className="size-4" strokeWidth={1.75} aria-hidden="true" />
                ) : (
                  <Copy className="size-4" strokeWidth={1.75} aria-hidden="true" />
                )}
              </button>
            </div>
            {codeTab === 'svelte' && hasSvelteFiles ? (
              <CodeEditor
                key={`${baseId}-svelte-kit`}
                readOnly
                showFind={false}
                tabs={svelteEditorTabs}
                activeTabId={activeSvelteEditorTab?.id}
                onTabChange={setSvelteTabId}
                minHeight={0}
                className="showcase-tabs-code-editor h-full min-h-0 flex-1"
              />
            ) : (
              <CodeEditor
                key={`${baseId}-${codeTab}-${codeLang}`}
                readOnly
                showFind={false}
                value={code}
                language={toEditorLanguage(codeLang)}
                fileName={fileNameByLang[codeLang]}
                minHeight={0}
                className="showcase-tabs-code-editor h-full min-h-0 flex-1"
              />
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default ShowcaseTabs
