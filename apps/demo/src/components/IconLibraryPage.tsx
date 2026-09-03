import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { Search, X } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import { ShowcaseTabs } from './ShowcaseTabs'

const PAGE_SIZE = 96

export type IconLibraryItem = {
  id: string
  label: string
  keywords: string
  preview: ReactNode
  html: string
  jsx: string
  svelte: string
  kotlin: string
}

export type IconLibraryPageProps = {
  eyebrow: string
  title: string
  description: string
  items: IconLibraryItem[]
  emptyLabel?: string
}

function openDialog(el: HTMLDialogElement | null) {
  if (!el) return
  if (typeof el.showModal === 'function') el.showModal()
}

function closeDialog(el: HTMLDialogElement | null) {
  if (!el) return
  if (typeof el.close === 'function') el.close()
}

export function IconLibraryPage({
  eyebrow,
  title,
  description,
  items,
  emptyLabel = 'No icons match this search.',
}: IconLibraryPageProps) {
  const dialogId = useId()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<IconLibraryItem | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.keywords.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q),
    )
  }, [items, query])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, pageCount)
  const pageItems = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  )

  useEffect(() => {
    setPage(1)
  }, [query])

  useEffect(() => {
    if (selected) openDialog(dialogRef.current)
  }, [selected])

  function onPick(item: IconLibraryItem) {
    setSelected(item)
  }

  function onDialogClose() {
    setSelected(null)
  }

  return (
    <div>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">{eyebrow}</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          {title}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted">{description}</p>
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="input input-bordered flex w-full max-w-md cursor-text items-center gap-2">
          <Search className="size-4 shrink-0 opacity-60" aria-hidden="true" />
          <input
            type="search"
            className="grow cursor-text bg-transparent outline-none"
            placeholder="Search icons"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search icons"
          />
        </label>
        <p className="text-sm text-ink-muted">
          {filtered.length.toLocaleString()} icons
          {filtered.length !== items.length
            ? ` (of ${items.length.toLocaleString()})`
            : ''}
        </p>
      </div>

      {pageItems.length === 0 ? (
        <p className="rounded-box border border-ink-border/70 bg-base-100/60 p-8 text-center text-sm text-ink-muted">
          {emptyLabel}
        </p>
      ) : (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {pageItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className="flex cursor-pointer flex-col items-center gap-2 rounded-box border border-ink-border/60 bg-base-100/70 px-2 py-3 text-center transition-colors hover:border-primary/50 hover:bg-primary/10"
              onClick={() => onPick(item)}
              aria-label={`Open ${item.label}`}
            >
              <span className="flex size-10 items-center justify-center text-base-content">
                {item.preview}
              </span>
              <span className="w-full truncate font-mono text-[0.65rem] leading-tight text-ink-muted">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      )}

      {pageCount > 1 ? (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-ink-muted">
            Page {safePage} of {pageCount}
          </p>
          <div className="join">
            <button
              type="button"
              className="btn btn-sm join-item cursor-pointer"
              disabled={safePage <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Prev
            </button>
            <button
              type="button"
              className="btn btn-sm join-item cursor-pointer"
              disabled={safePage >= pageCount}
              onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            >
              Next
            </button>
          </div>
        </div>
      ) : null}

      <dialog
        ref={dialogRef}
        id={dialogId}
        className="modal"
        onClose={onDialogClose}
      >
        {selected ? (
          <div className="modal-box max-w-3xl">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="card-title text-primary font-bold">{selected.label}</h2>
                <p className="mt-1 font-mono text-xs text-ink-muted">{selected.id}</p>
              </div>
              <form method="dialog">
                <div
                  className="tooltip tooltip-primary tooltip-left"
                  data-tip="Close"
                >
                  <button
                    type="submit"
                    className="btn btn-ghost btn-square btn-sm btn-primary cursor-pointer"
                    aria-label="Close"
                    onClick={() => closeDialog(dialogRef.current)}
                  >
                    <X className="size-4" strokeWidth={1.75} aria-hidden="true" />
                  </button>
                </div>
              </form>
            </div>

            <ShowcaseTabs
              className="mt-4"
              preview={
                <div className="flex min-h-28 flex-col items-center justify-center gap-3">
                  <span className="flex size-16 items-center justify-center text-base-content">
                    {selected.preview}
                  </span>
                  <p className="text-sm text-ink-muted">{selected.label}</p>
                </div>
              }
              html={selected.html}
              jsx={selected.jsx}
              svelte={selected.svelte}
              kotlin={selected.kotlin}
            />

            <div className="modal-action">
              <form method="dialog">
                <button type="submit" className="btn cursor-pointer">
                  Close
                </button>
              </form>
            </div>
          </div>
        ) : null}
        <form method="dialog" className="modal-backdrop">
          <button type="submit" className="cursor-pointer">
            close
          </button>
        </form>
      </dialog>
    </div>
  )
}
