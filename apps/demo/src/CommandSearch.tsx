import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react'
import { Search, X } from 'menzies-design-wash-ui/icons'
import type { AppPage } from './App'
import {
  filterSearchEntries,
  type SearchEntry,
} from './searchIndex'

type CommandSearchProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  entries: SearchEntry[]
  onSelect: (page: AppPage, query: string) => void
}

function useIsMac(): boolean {
  const [isMac, setIsMac] = useState(false)
  useEffect(() => {
    setIsMac(
      /Mac|iPhone|iPad|iPod/i.test(navigator.platform) ||
        /Mac OS X/i.test(navigator.userAgent),
    )
  }, [])
  return isMac
}

export function SearchTriggerButton({
  onOpen,
  className = '',
}: {
  onOpen: () => void
  className?: string
}) {
  const isMac = useIsMac()

  return (
    <button
      type="button"
      className={`btn btn-ghost h-10 min-h-10 w-72 justify-start gap-2 border border-ink-border bg-base-100 px-3 font-normal ripple cursor-pointer focus-within:dry-brush ${className}`}
      onClick={onOpen}
      aria-label="Search"
    >
      <Search className="size-4 shrink-0 text-base-content/75" strokeWidth={2} />
      <span className="flex-1 truncate text-left text-sm text-base-content/60">
        Search pages…
      </span>
      <kbd className="kbd kbd-sm border-ink-border bg-base-200 text-[0.65rem]">
        {isMac ? '⌘' : 'Ctrl'}K
      </kbd>
    </button>
  )
}

export function SearchIconButton({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="tooltip tooltip-bottom" data-tip="Search">
      <button
        type="button"
        className="btn btn-ghost btn-square ripple cursor-pointer"
        aria-label="Search"
        onClick={onOpen}
      >
        <Search className="size-5 text-base-content" strokeWidth={2} />
      </button>
    </div>
  )
}

export default function CommandSearch({
  open,
  onOpenChange,
  entries,
  onSelect,
}: CommandSearchProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const titleId = useId()
  const isMac = useIsMac()
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)

  const results = useMemo(
    () => filterSearchEntries(entries, query),
    [entries, query],
  )

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open) {
      if (!dialog.open) dialog.showModal()
      setQuery('')
      setActiveIndex(0)
      requestAnimationFrame(() => inputRef.current?.focus())
    } else if (dialog.open) {
      dialog.close()
    }
  }, [open])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const active = list.querySelector<HTMLElement>('[data-active="true"]')
    active?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex, results])

  const close = useCallback(() => {
    onOpenChange(false)
  }, [onOpenChange])

  const selectAt = useCallback(
    (index: number) => {
      const entry = results[index]
      if (!entry) return
      onSelect(entry.id, query.trim())
      onOpenChange(false)
    },
    [results, query, onSelect, onOpenChange],
  )

  function onDialogClose() {
    onOpenChange(false)
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (results.length === 0) return
      setActiveIndex((i) => (i + 1) % results.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (results.length === 0) return
      setActiveIndex((i) => (i - 1 + results.length) % results.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      selectAt(activeIndex)
    } else if (e.key === 'Escape') {
      e.preventDefault()
      close()
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className="modal modal-middle"
      aria-labelledby={titleId}
      onClose={onDialogClose}
      onCancel={(e) => {
        e.preventDefault()
        close()
      }}
    >
      <div
        className="modal-box flex max-h-[min(32rem,85dvh)] w-11/12 max-w-lg flex-col gap-0 overflow-hidden p-0"
        onKeyDown={onKeyDown}
      >
        <div className="flex items-center gap-2 border-b border-ink-border px-3 py-2">
          <Search
            className="size-4 shrink-0 text-base-content/70"
            strokeWidth={2}
            aria-hidden
          />
          <input
            ref={inputRef}
            type="search"
            className="input input-ghost h-10 min-h-10 flex-1 cursor-text border-0 bg-transparent px-0 text-base focus:outline-none"
            placeholder="Search anything…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-autocomplete="list"
            aria-controls="command-search-results"
            aria-activedescendant={
              results[activeIndex]
                ? `command-search-option-${results[activeIndex].id}`
                : undefined
            }
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="kbd kbd-sm hidden border-ink-border sm:inline-flex">
            {isMac ? '⌘' : 'Ctrl'}K
          </kbd>
          <div className="tooltip tooltip-left" data-tip="Close">
            <button
              type="button"
              className="btn btn-ghost btn-square btn-sm ripple cursor-pointer"
              aria-label="Close"
              onClick={close}
            >
              <X className="size-4" strokeWidth={2} />
            </button>
          </div>
        </div>

        <h2 id={titleId} className="sr-only">
          Search pages
        </h2>

        <div className="min-h-0 flex-1 overflow-y-auto">
          {results.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-ink-muted">
              {query.trim()
                ? 'No results for that query.'
                : 'No pages to search.'}
            </p>
          ) : (
            <ul
              ref={listRef}
              id="command-search-results"
              role="listbox"
              className="menu menu-md w-full gap-0.5 p-2"
            >
              {results.map((entry, index) => (
                <ResultRow
                  key={entry.id}
                  entry={entry}
                  active={index === activeIndex}
                  onHover={() => setActiveIndex(index)}
                  onSelect={() => selectAt(index)}
                />
              ))}
            </ul>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3 border-t border-ink-border px-4 py-2 text-xs text-ink-muted">
          <span className="inline-flex items-center gap-1">
            <kbd className="kbd kbd-xs">↑</kbd>
            <kbd className="kbd kbd-xs">↓</kbd>
            navigate
          </span>
          <span className="inline-flex items-center gap-1">
            <kbd className="kbd kbd-xs">↵</kbd>
            open
          </span>
          <span className="inline-flex items-center gap-1">
            <kbd className="kbd kbd-xs">Esc</kbd>
            close
          </span>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button type="submit" className="cursor-pointer" aria-label="Close search">
          close
        </button>
      </form>
    </dialog>
  )
}

function ResultRow({
  entry,
  active,
  onHover,
  onSelect,
}: {
  entry: SearchEntry
  active: boolean
  onHover: () => void
  onSelect: () => void
}) {
  const Icon = entry.icon

  return (
    <li role="option" aria-selected={active} id={`command-search-option-${entry.id}`}>
      <button
        type="button"
        data-active={active ? 'true' : undefined}
        className={`cursor-pointer ${active ? 'bg-primary/25' : ''}`}
        onMouseEnter={onHover}
        onClick={onSelect}
      >
        <Icon className="size-4 shrink-0" strokeWidth={2} />
        <span className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
          <span className="truncate font-medium">{entry.label}</span>
          {entry.subtitle ? (
            <span className="truncate text-xs font-normal text-ink-muted">
              {entry.subtitle}
            </span>
          ) : null}
        </span>
      </button>
    </li>
  )
}
