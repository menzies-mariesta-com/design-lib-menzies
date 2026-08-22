import { useId, useState, type ReactNode } from 'react'
import { Check, Copy } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'

type TabId = 'preview' | 'html' | 'jsx'

export type ShowcaseTabsProps = {
  preview: ReactNode
  html: string
  jsx: string
  className?: string
}

const tabs: { id: TabId; label: string }[] = [
  { id: 'preview', label: 'Preview' },
  { id: 'html', label: 'HTML' },
  { id: 'jsx', label: 'JSX' },
]

export function ShowcaseTabs({
  preview,
  html,
  jsx,
  className = '',
}: ShowcaseTabsProps) {
  const baseId = useId()
  const [active, setActive] = useState<TabId>('preview')
  const [copiedTab, setCopiedTab] = useState<TabId | null>(null)

  async function copyCode(tab: TabId) {
    const text = tab === 'html' ? html : jsx
    try {
      await navigator.clipboard.writeText(text)
      setCopiedTab(tab)
      window.setTimeout(() => setCopiedTab(null), 2000)
    } catch {
      // Clipboard unavailable in some contexts.
    }
  }

  const code = active === 'html' ? html : jsx

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

      {active === 'preview' ? (
        <div
          role="tabpanel"
          id={`${baseId}-preview`}
          aria-labelledby={`${baseId}-tab-preview`}
          className="p-4 md:p-5"
        >
          {preview}
        </div>
      ) : (
        <div
          role="tabpanel"
          id={`${baseId}-${active}`}
          aria-labelledby={`${baseId}-tab-${active}`}
          className="relative bg-base-200/30"
        >
          <div
            className="tooltip tooltip-primary tooltip-left absolute top-2 right-2 z-10"
            data-tip={copiedTab === active ? 'Copied' : 'Copy code'}
          >
            <button
              type="button"
              className="btn btn-ghost btn-square btn-sm btn-primary cursor-pointer"
              aria-label={copiedTab === active ? 'Copied' : 'Copy code'}
              onClick={() => void copyCode(active)}
            >
              {copiedTab === active ? (
                <Check className="size-4" strokeWidth={1.75} aria-hidden="true" />
              ) : (
                <Copy className="size-4" strokeWidth={1.75} aria-hidden="true" />
              )}
            </button>
          </div>
          <pre className="overflow-x-auto p-4 pt-12 text-xs leading-relaxed md:p-5 md:pt-12 md:text-sm">
            <code className="font-mono whitespace-pre text-ink">{code}</code>
          </pre>
        </div>
      )}
    </div>
  )
}

export default ShowcaseTabs
