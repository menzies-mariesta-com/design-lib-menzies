import { useState, type ReactNode } from 'react'
import { Check, Copy } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import { ShowcaseTabs } from './ShowcaseTabs'

type CopyFieldProps = {
  label: string
  value: string
  multiline?: boolean
}

function CopyField({ label, value, multiline = false }: CopyFieldProps) {
  const [copied, setCopied] = useState(false)

  async function copyValue() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard unavailable in some contexts.
    }
  }

  return (
    <div className="rounded-box border border-ink-border/70 bg-base-100/80 p-4">
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="label-ink">{label}</p>
        <div
          className="tooltip tooltip-primary tooltip-left"
          data-tip={copied ? 'Copied' : `Copy ${label.toLowerCase()}`}
        >
          <button
            type="button"
            className="btn btn-ghost btn-square btn-sm btn-primary cursor-pointer"
            aria-label={copied ? 'Copied' : `Copy ${label.toLowerCase()}`}
            onClick={() => void copyValue()}
          >
            {copied ? (
              <Check className="size-4" strokeWidth={1.75} aria-hidden="true" />
            ) : (
              <Copy className="size-4" strokeWidth={1.75} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
      {multiline ? (
        <pre className="max-h-40 overflow-auto whitespace-pre-wrap font-mono text-xs leading-relaxed text-base-content">
          {value}
        </pre>
      ) : (
        <p className="font-mono text-sm text-base-content">{value}</p>
      )}
    </div>
  )
}

export type EmailShowcaseTabsProps = {
  subject: string
  plainText: string
  html: string
  usage: string
  preview: ReactNode
  className?: string
}

export function EmailShowcaseTabs({
  subject,
  plainText,
  html,
  usage,
  preview,
  className = '',
}: EmailShowcaseTabsProps) {
  return (
    <div className={`space-y-4 ${className}`.trim()}>
      <div className="grid gap-3 md:grid-cols-2">
        <CopyField label="Subject line" value={subject} />
        <CopyField label="Plain-text body" value={plainText} multiline />
      </div>
      <ShowcaseTabs preview={preview} html={html} jsx={usage} />
    </div>
  )
}

export default EmailShowcaseTabs
