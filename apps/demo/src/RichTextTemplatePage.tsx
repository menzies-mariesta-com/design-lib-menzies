import { useState, type ReactNode } from 'react'
import {
  Card,
  CardBody,
  washRecipes,
} from '@menzies-mariesta-com/menzies-design-wash-ui'
import { RichTextEditor } from '@menzies-mariesta-com/menzies-design-wash-ui/editors'
import { Check, ClipboardCopy } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'

const docStarter = `<h1>Rich text</h1>
<p>Draft product copy with toolbar formatting, lists, and links.</p>
<p>Wash rich text is <em>from-scratch</em>: contenteditable chrome and paste sanitize, not TipTap or Lexical.</p>`

const paneCardClassName = `w-full overflow-hidden bg-base-100 ${washRecipes.paneCard}`

function EditorPaneCard({
  title,
  className = '',
  children,
}: {
  title: string
  className?: string
  children: ReactNode
}) {
  return (
    <section className={className}>
      <Card bordered className={paneCardClassName}>
        <CardBody className="gap-3 p-4 sm:p-5">
          <h2 className="font-display text-lg font-semibold">{title}</h2>
          {children}
        </CardBody>
      </Card>
    </section>
  )
}

export default function RichTextTemplatePage() {
  const [html, setHtml] = useState(docStarter)
  const [copying, setCopying] = useState(false)
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    setCopying(true)
    try {
      await navigator.clipboard.writeText(html)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } finally {
      setCopying(false)
    }
  }

  return (
    <div className="space-y-6">
      <header className="soak-in">
        <p className="label-ink mb-2">Studio template</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Rich text
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          From-scratch document editor: toolbar formatting, lists, links, undo/redo,
          and paste sanitize. Import from the optional{' '}
          <code className="text-xs">/editors</code> entry.
        </p>
      </header>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          className={`btn btn-sm btn-secondary cursor-pointer gap-1.5 ${copying ? 'btn-disabled cursor-not-allowed' : ''}`}
          disabled={copying}
          aria-busy={copying}
          onClick={() => void onCopy()}
        >
          {copying ? (
            <span className="loading loading-spinner loading-sm" aria-hidden="true" />
          ) : copied ? (
            <Check className="size-4" aria-hidden="true" />
          ) : (
            <ClipboardCopy className="size-4" aria-hidden="true" />
          )}
          {copied ? 'Copied' : 'Copy HTML'}
        </button>
      </div>

      <EditorPaneCard title="Document">
        <RichTextEditor value={html} onChange={setHtml} minHeight="22rem" />
      </EditorPaneCard>
    </div>
  )
}
