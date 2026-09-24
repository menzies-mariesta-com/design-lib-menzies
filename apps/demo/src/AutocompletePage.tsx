import { ShowcaseTabs } from './components/ShowcaseTabs'
import { daisyToJsx } from './snippets/markup/daisyGalleryDefaults'
import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
  type RefObject,
} from 'react'
import {
  Check,
  Droplets,
  Paintbrush,
  Search,
  Sparkles,
} from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import { watercolorThemes } from './themes'

const pigmentNames = [
  'Ultramarine',
  'Yellow ochre',
  'Alizarin crimson',
  'Viridian',
  'Burnt sienna',
  'Cobalt blue',
  'Cerulean',
  'Quinacridone rose',
] as const

const colors = [
  { name: 'Default', className: '' },
  { name: 'Neutral', className: 'input-neutral' },
  { name: 'Primary', className: 'input-primary' },
  { name: 'Secondary', className: 'input-secondary' },
  { name: 'Accent', className: 'input-accent' },
  { name: 'Info', className: 'input-info' },
  { name: 'Success', className: 'input-success' },
  { name: 'Warning', className: 'input-warning' },
  { name: 'Error', className: 'input-error' },
] as const

const sizes = [
  { name: 'XS', className: 'input-xs' },
  { name: 'SM', className: 'input-sm' },
  { name: 'MD', className: 'input-md' },
  { name: 'LG', className: 'input-lg' },
  { name: 'XL', className: 'input-xl' },
] as const

const toolOptions = [
  {
    id: 'round',
    label: 'Round brush',
    note: 'Washes and edges',
    Icon: Paintbrush,
    badge: 'Tool',
  },
  {
    id: 'drop',
    label: 'Wash dropper',
    note: 'Dilution control',
    Icon: Droplets,
    badge: 'Water',
  },
  {
    id: 'spark',
    label: 'Bloom lift',
    note: 'Soft highlights',
    Icon: Sparkles,
    badge: 'Effect',
  },
] as const

const menuPanel =
  'menu dropdown-content z-50 mt-1 max-h-[min(70vh,15rem)] w-full max-w-[min(100vw-1rem,28rem)] overflow-x-hidden overflow-y-auto rounded-box border border-ink-border bg-base-100 p-2 shadow-[var(--shadow-paper-md)]'

const searchSvg = `<svg class="size-4 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>`
const paintbrushSvg = `<svg class="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m14.622 17.897-10.68-2.913"/><path d="M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z"/><path d="M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15"/></svg>`
const dropletsSvg = `<svg class="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/></svg>`
const sparklesSvg = `<svg class="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/><path d="M20 2v4"/><path d="M22 4h-4"/><circle cx="4" cy="20" r="2"/></svg>`

const pigmentOptionsHtml = pigmentNames
  .map(
    (name) => `      <li role="option">
        <button type="button" class="cursor-pointer">${name}</button>
      </li>`,
  )
  .join('\n')

function typeaheadHtml(opts: {
  label: string
  required?: boolean
  placeholder?: string
  inputClass?: string
  disabled?: boolean
  open?: boolean
  value?: string
  options?: string
  emptyMessage?: string
}) {
  const {
    label,
    required = false,
    placeholder = 'Type to filter…',
    inputClass = '',
    disabled = false,
    open = true,
    value = '',
    options = pigmentOptionsHtml,
    emptyMessage,
  } = opts
  const star = required
    ? `<span class="text-error align-top text-sm leading-none" aria-hidden="true">*</span>`
    : ''
  const openClass = open && !disabled ? ' dropdown-open' : ''
  const list =
    emptyMessage != null
      ? `      <li class="px-3 py-2 text-sm text-ink-muted">${emptyMessage}</li>`
      : options
  const menu =
    open && !disabled
      ? `
  <ul role="listbox" class="${menuPanel}" tabindex="-1">
${list}
  </ul>`
      : ''
  return `<div class="dropdown dropdown-no-hover w-full max-w-md${openClass}">
  <label class="form-control w-full">
    <span class="label">
      <span class="label-text">${label}${star}</span>
    </span>
    <input
      type="text"
      role="combobox"
      aria-expanded="${open && !disabled ? 'true' : 'false'}"
      aria-autocomplete="list"
      ${required ? 'required ' : ''}${disabled ? 'disabled ' : ''}value="${value}"
      placeholder="${disabled ? 'Suggestions locked' : placeholder}"
      class="input w-full cursor-text border-ink-border${disabled ? ' cursor-not-allowed' : ''}${inputClass ? ` ${inputClass}` : ''}"
    />
  </label>${menu}
</div>`
}

const basicHtml = `<div class="grid gap-6 md:grid-cols-2">
${typeaheadHtml({
  label: 'Pigment name',
  required: true,
  placeholder: 'Start typing a pigment…',
})}
${typeaheadHtml({
  label: 'Suggest pigment',
  required: true,
})}
</div>`

const iconsHtml = `<div class="flex w-full max-w-lg flex-col gap-3">
  <div class="dropdown dropdown-no-hover dropdown-open w-full">
    <label class="input w-full cursor-text border-ink-border focus-within:dry-brush">
      ${searchSvg}
      <input type="search" role="combobox" aria-expanded="true" aria-autocomplete="list" value="" placeholder="Search studio tools…" class="grow cursor-text" />
    </label>
    <ul role="listbox" class="${menuPanel}" tabindex="-1">
      <li role="option">
        <button type="button" class="cursor-pointer">
          ${paintbrushSvg}
          <span class="flex min-w-0 flex-1 flex-col items-start gap-0.5">
            <span class="font-medium">Round brush</span>
            <span class="text-xs text-ink-muted">Washes and edges</span>
          </span>
          <span class="badge badge-ghost badge-sm">Tool</span>
        </button>
      </li>
      <li role="option">
        <button type="button" class="cursor-pointer">
          ${dropletsSvg}
          <span class="flex min-w-0 flex-1 flex-col items-start gap-0.5">
            <span class="font-medium">Wash dropper</span>
            <span class="text-xs text-ink-muted">Dilution control</span>
          </span>
          <span class="badge badge-ghost badge-sm">Water</span>
        </button>
      </li>
      <li role="option">
        <button type="button" class="cursor-pointer">
          ${sparklesSvg}
          <span class="flex min-w-0 flex-1 flex-col items-start gap-0.5">
            <span class="font-medium">Bloom lift</span>
            <span class="text-xs text-ink-muted">Soft highlights</span>
          </span>
          <span class="badge badge-ghost badge-sm">Effect</span>
        </button>
      </li>
    </ul>
  </div>
</div>`

const sizesHtml = `<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
${sizes
  .map((size) =>
    typeaheadHtml({
      label: `${size.name} size`,
      inputClass: size.className,
      open: false,
      placeholder: 'Type to filter…',
    }),
  )
  .join('\n')}
</div>`

const colorsHtml = `<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
${colors
  .map((color) =>
    typeaheadHtml({
      label: color.name,
      inputClass: color.className,
      open: false,
      placeholder: 'Type to filter…',
    }),
  )
  .join('\n')}
</div>`

const studioThemeRows = [
  { id: 'mineral', label: 'Mineral', note: 'Blue · ochre · rose', swatch: '#276C8E' },
  { id: 'indigo', label: 'Indigo', note: 'Deep lake violet', swatch: '#3D4F8F' },
  { id: 'celadon', label: 'Celadon', note: 'Sage glaze', swatch: '#3D7A5F' },
  { id: 'vermilion', label: 'Vermilion', note: 'Warm lake red', swatch: '#B8432F' },
  { id: 'sepia', label: 'Sepia', note: 'Archival ink', swatch: '#6B4E32' },
] as const

const studioOptionsHtml = studioThemeRows
  .map(
    (theme) => `      <li role="option">
        <button type="button" class="cursor-pointer">
          <span class="size-3.5 shrink-0 rounded-full border border-ink-border" style="background-color: ${theme.swatch}" aria-hidden="true"></span>
          <span class="flex min-w-0 flex-1 flex-col items-start gap-0.5">
            <span class="font-medium">${theme.label}</span>
            <span class="text-xs text-ink-muted">${theme.note}</span>
          </span>
        </button>
      </li>`,
  )
  .join('\n')

const studioHtml = `<div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(12rem,16rem)] lg:items-start">
  <div class="dropdown dropdown-no-hover dropdown-open w-full">
    <label class="form-control w-full">
      <span class="label">
        <span class="label-text">Studio pigment<span class="text-error align-top text-sm leading-none" aria-hidden="true">*</span></span>
      </span>
      <input type="search" role="combobox" required aria-expanded="true" aria-autocomplete="list" value="" placeholder="Filter watercolorThemes…" class="input input-primary w-full cursor-text" />
    </label>
    <ul role="listbox" class="${menuPanel}" tabindex="-1">
${studioOptionsHtml}
    </ul>
    <p class="mt-2 text-xs text-ink-muted">Showing ${studioThemeRows.length} of ${watercolorThemes.length} pigments</p>
  </div>
  <aside class="rounded-box border border-ink-border/70 bg-base-200/40 p-4">
    <p class="label-ink mb-2">Selection</p>
    <p class="text-sm text-ink-muted">Choose a pigment from the suggestions.</p>
  </aside>
</div>`

const disabledEmptyHtml = `<div class="grid gap-6 md:grid-cols-2">
${typeaheadHtml({
  label: 'Locked suggestions',
  disabled: true,
  open: false,
})}
${typeaheadHtml({
  label: 'Unmatched query',
  open: true,
  value: 'zzzx',
  inputClass: 'input-warning',
  emptyMessage: 'No pigments match.',
  placeholder: '',
})}
</div>`

const responsiveHtml = `<div class="grid gap-4 sm:grid-cols-2">
${typeaheadHtml({
  label: 'Quick pick',
  placeholder: 'Pigment…',
})}
${typeaheadHtml({
  label: 'Mobile-friendly filter',
})}
</div>`

function Section({
  eyebrow,
  title,
  description,
  children,
  panel = '',
}: {
  eyebrow: string
  title: string
  description: string
  children: ReactNode
  panel?: string
}) {
  return (
    <article className={`wash-panel wash-panel-flush paper-grain soak-in ${panel}`}>
      <div className="border-b border-ink-border/70 px-5 py-4">
        <p className="label-ink">{eyebrow}</p>
        <h2 className="font-display text-xl font-semibold md:text-2xl">
          {title}
        </h2>
        <p className="mt-1 text-sm text-ink-muted">{description}</p>
      </div>
      <div className="p-5">{children}</div>
    </article>
  )
}

function ClassLabel({ value }: { value: string }) {
  return (
    <code className="font-mono text-[0.65rem] text-ink-muted">{value}</code>
  )
}

function Sample({
  label,
  children,
  className = '',
}: {
  label: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {children}
      <ClassLabel value={label} />
    </div>
  )
}

function useOutsideClose(
  open: boolean,
  setOpen: (next: boolean) => void,
  rootRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    if (!open) return

    function onPointerDown(event: PointerEvent) {
      const el = rootRef.current
      if (!el) return
      if (event.target instanceof Node && !el.contains(event.target)) {
        setOpen(false)
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, rootRef, setOpen])
}

function filterText(query: string, haystack: string) {
  return haystack.toLowerCase().includes(query.trim().toLowerCase())
}

/** daisyUI dropdown + menu combobox (filters as you type) */
function TypeaheadAutocomplete({
  inputClassName = '',
  label = 'Suggest pigment',
  placeholder = 'Type to filter…',
  required = false,
  disabled = false,
  emptyQueryShowsAll = true,
}: {
  inputClassName?: string
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  emptyQueryShowsAll?: boolean
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const listId = useId()
  const optionId = (index: number) => `${listId}-opt-${index}`

  useOutsideClose(open, setOpen, rootRef)

  const matches = pigmentNames.filter((name) => {
    if (!query.trim()) return emptyQueryShowsAll
    return filterText(query, name)
  })

  useEffect(() => {
    setActiveIndex(-1)
  }, [query])

  function pick(name: string) {
    setQuery(name)
    setOpen(false)
    setActiveIndex(-1)
  }

  function onKeyDown(event: ReactKeyboardEvent<HTMLInputElement>) {
    if (disabled) return

    if (event.key === 'Escape') {
      if (open) {
        event.preventDefault()
        setOpen(false)
        setActiveIndex(-1)
      }
      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (!open) {
        setOpen(true)
        setActiveIndex(matches.length > 0 ? 0 : -1)
        return
      }
      if (matches.length === 0) return
      setActiveIndex((prev) => (prev + 1) % matches.length)
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (!open) {
        setOpen(true)
        setActiveIndex(matches.length > 0 ? matches.length - 1 : -1)
        return
      }
      if (matches.length === 0) return
      setActiveIndex((prev) =>
        prev <= 0 ? matches.length - 1 : prev - 1,
      )
      return
    }

    if (event.key === 'Enter') {
      if (open && activeIndex >= 0 && matches[activeIndex]) {
        event.preventDefault()
        pick(matches[activeIndex])
      }
    }
  }

  return (
    <div
      ref={rootRef}
      className={`dropdown dropdown-no-hover w-full max-w-md ${open ? 'dropdown-open' : ''}`}
    >
      <label className="form-control w-full">
        <span className="label">
          <span className="label-text">
            {label}
            {required ? (
              <span
                className="text-error align-top text-sm leading-none"
                aria-hidden="true"
              >
                *
              </span>
            ) : null}
          </span>
        </span>
        <input
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={
            open && activeIndex >= 0 ? optionId(activeIndex) : undefined
          }
          required={required}
          disabled={disabled}
          value={query}
          placeholder={disabled ? 'Suggestions locked' : placeholder}
          className={`input w-full cursor-text border-ink-border ${disabled ? 'cursor-not-allowed' : ''} ${inputClassName}`}
          onChange={(event) => {
            setQuery(event.target.value)
            setOpen(true)
          }}
          onFocus={() => {
            if (!disabled) setOpen(true)
          }}
          onKeyDown={onKeyDown}
        />
      </label>
      {open && !disabled ? (
        <ul
          id={listId}
          role="listbox"
          className={menuPanel}
          tabIndex={-1}
        >
          {matches.length === 0 ? (
            <li className="px-3 py-2 text-sm text-ink-muted">
              No pigments match.
            </li>
          ) : (
            matches.map((name, index) => (
              <li
                key={name}
                id={optionId(index)}
                role="option"
                aria-selected={activeIndex === index}
              >
                <button
                  type="button"
                  className={`cursor-pointer ${activeIndex === index ? 'active' : ''}`}
                  onMouseDown={(event) => event.preventDefault()}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => pick(name)}
                >
                  {name}
                  {query &&
                  name.toLowerCase() === query.trim().toLowerCase() ? (
                    <Check className="size-4 opacity-70" strokeWidth={2} />
                  ) : null}
                </button>
              </li>
            ))
          )}
        </ul>
      ) : null}
    </div>
  )
}

function IconBadgeAutocomplete() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [picked, setPicked] = useState<(typeof toolOptions)[number] | null>(
    null,
  )
  const listId = useId()

  useOutsideClose(open, setOpen, rootRef)

  const matches = toolOptions.filter((item) => {
    if (!query.trim()) return true
    return (
      filterText(query, item.label) ||
      filterText(query, item.note) ||
      filterText(query, item.badge)
    )
  })

  function pick(item: (typeof toolOptions)[number]) {
    setPicked(item)
    setQuery(item.label)
    setOpen(false)
  }

  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <div
        ref={rootRef}
        className={`dropdown dropdown-no-hover w-full ${open ? 'dropdown-open' : ''}`}
      >
        <label className="input w-full cursor-text border-ink-border focus-within:dry-brush">
          <Search className="size-4 shrink-0 opacity-60" strokeWidth={2} />
          <input
            type="search"
            role="combobox"
            aria-expanded={open}
            aria-controls={listId}
            aria-autocomplete="list"
            value={query}
            placeholder="Search studio tools…"
            className="grow cursor-text"
            onChange={(event) => {
              setQuery(event.target.value)
              setOpen(true)
            }}
            onFocus={() => setOpen(true)}
          />
          {picked ? (
            <span className="badge badge-sm badge-primary shrink-0">
              {picked.badge}
            </span>
          ) : null}
        </label>
        {open ? (
          <ul id={listId} role="listbox" className={menuPanel} tabIndex={-1}>
            {matches.length === 0 ? (
              <li className="px-3 py-2 text-sm text-ink-muted">
                No tools match.
              </li>
            ) : (
              matches.map((item) => {
                const Icon = item.Icon
                const active = picked?.id === item.id
                return (
                  <li key={item.id} role="option" aria-selected={active}>
                    <button
                      type="button"
                      className={`cursor-pointer ${active ? 'active' : ''}`}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => pick(item)}
                    >
                      <Icon className="size-4 shrink-0" strokeWidth={2} />
                      <span className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
                        <span className="font-medium">{item.label}</span>
                        <span className="text-xs text-ink-muted">
                          {item.note}
                        </span>
                      </span>
                      <span className="badge badge-ghost badge-sm">
                        {item.badge}
                      </span>
                    </button>
                  </li>
                )
              })
            )}
          </ul>
        ) : null}
      </div>
      <ClassLabel value="label.input + dropdown menu + badge" />
    </div>
  )
}

function StudioPigmentsAutocomplete() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const listId = useId()

  useOutsideClose(open, setOpen, rootRef)

  const matches = watercolorThemes.filter((theme) => {
    if (!query.trim()) return true
    return (
      filterText(query, theme.label) ||
      filterText(query, theme.note) ||
      filterText(query, theme.id)
    )
  })

  const selected =
    watercolorThemes.find((theme) => theme.id === selectedId) ?? null

  function pick(id: string, label: string) {
    setSelectedId(id)
    setQuery(label)
    setOpen(false)
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(12rem,16rem)] lg:items-start">
      <div
        ref={rootRef}
        className={`dropdown dropdown-no-hover w-full ${open ? 'dropdown-open' : ''}`}
      >
        <label className="form-control w-full">
          <span className="label">
            <span className="label-text">
              Studio pigment
              <span
                className="text-error align-top text-sm leading-none"
                aria-hidden="true"
              >
                *
              </span>
            </span>
          </span>
          <input
            type="search"
            role="combobox"
            required
            aria-expanded={open}
            aria-controls={listId}
            aria-autocomplete="list"
            value={query}
            placeholder="Filter watercolorThemes…"
            className="input input-primary w-full cursor-text"
            onChange={(event) => {
              setQuery(event.target.value)
              setSelectedId(null)
              setOpen(true)
            }}
            onFocus={() => setOpen(true)}
          />
        </label>
        {open ? (
          <ul id={listId} role="listbox" className={menuPanel} tabIndex={-1}>
            {matches.length === 0 ? (
              <li className="px-3 py-2 text-sm text-ink-muted">
                No studio pigments match “{query.trim()}”.
              </li>
            ) : (
              matches.map((theme) => {
                const active = selectedId === theme.id
                return (
                  <li key={theme.id} role="option" aria-selected={active}>
                    <button
                      type="button"
                      className={`cursor-pointer ${active ? 'active' : ''}`}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => pick(theme.id, theme.label)}
                    >
                      <span
                        className="size-3.5 shrink-0 rounded-full border border-ink-border"
                        style={{ backgroundColor: theme.swatch }}
                        aria-hidden="true"
                      />
                      <span className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
                        <span className="font-medium">{theme.label}</span>
                        <span className="text-xs text-ink-muted">
                          {theme.note}
                        </span>
                      </span>
                      {active ? (
                        <Check className="size-4 opacity-70" strokeWidth={2} />
                      ) : null}
                    </button>
                  </li>
                )
              })
            )}
          </ul>
        ) : null}
        <p className="mt-2 text-xs text-ink-muted">
          Showing {matches.length} of {watercolorThemes.length} pigments
        </p>
        <ClassLabel value="input + menu · watercolorThemes filter" />
      </div>

      <aside className="rounded-box border border-ink-border/70 bg-base-200/40 p-4">
        <p className="label-ink mb-2">Selection</p>
        {selected ? (
          <div className="flex items-start gap-3">
            <span
              className="mt-0.5 size-8 shrink-0 rounded-full border border-ink-border"
              style={{ backgroundColor: selected.swatch }}
              aria-hidden="true"
            />
            <div className="min-w-0">
              <p className="font-display text-lg font-semibold">
                {selected.label}
              </p>
              <p className="text-sm text-ink-muted">{selected.note}</p>
              <p className="mt-1 font-mono text-[0.65rem] text-ink-muted">
                {selected.id}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-ink-muted">
            Choose a pigment from the suggestions.
          </p>
        )}
      </aside>
    </div>
  )
}

export default function AutocompletePage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Autocomplete
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">input</span> has no dedicated autocomplete class.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Typeahead suggestions"
          description="Input plus daisyUI dropdown menu"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-6 md:grid-cols-2">
                            <Sample label="input + dropdown menu combobox">
                              <TypeaheadAutocomplete
                                required
                                label="Pigment name"
                                placeholder="Start typing a pigment…"
                              />
                            </Sample>
                            <Sample label="dropdown + menu typeahead">
                              <TypeaheadAutocomplete required label="Suggest pigment" />
                            </Sample>
                          </div>
              </>
            }
            html={basicHtml}
            jsx={daisyToJsx(basicHtml)}
          />
        
        </Section>

        <Section
          eyebrow="02 · Icons and badges"
          title="Rich option rows"
          description="Search field with Lucide icons and badge chips in each suggestion"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <IconBadgeAutocomplete />
              </>
            }
            html={iconsHtml}
            jsx={daisyToJsx(iconsHtml)}
          />
        
        </Section>

        <Section
          eyebrow="03 · Sizes"
          title="Input size scale"
          description="Autocomplete inherits daisyUI input sizes (xs through xl)"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {sizes.map((size) => (
                              <Sample
                                key={size.name}
                                label={
                                  size.className
                                    ? `input ${size.className} + menu`
                                    : 'input + menu'
                                }
                              >
                                <TypeaheadAutocomplete
                                  inputClassName={size.className}
                                  label={`${size.name} size`}
                                  emptyQueryShowsAll={false}
                                />
                              </Sample>
                            ))}
                          </div>
              </>
            }
            html={sizesHtml}
            jsx={daisyToJsx(sizesHtml)}
          />
        
        </Section>

        <Section
          eyebrow="04 · Colors"
          title="Semantic input colors"
          description="Neutral through error border accents"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {colors.map((color) => (
                              <Sample
                                key={color.name}
                                label={
                                  color.className
                                    ? `input ${color.className} + menu`
                                    : 'input + menu'
                                }
                              >
                                <TypeaheadAutocomplete
                                  inputClassName={color.className}
                                  label={color.name}
                                  emptyQueryShowsAll={false}
                                />
                              </Sample>
                            ))}
                          </div>
              </>
            }
            html={colorsHtml}
            jsx={daisyToJsx(colorsHtml)}
          />
        
        </Section>

        <Section
          eyebrow="05 · Studio pigments"
          title="Filter watercolorThemes"
          description="Type to narrow every Menzies Design pigment"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <StudioPigmentsAutocomplete />
              </>
            }
            html={studioHtml}
            jsx={daisyToJsx(studioHtml)}
          />
        
        </Section>

        <Section
          eyebrow="06 · Disabled and empty"
          title="Quiet and empty states"
          description="Disabled field locks suggestions"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-6 md:grid-cols-2">
                            <Sample label="input[disabled] + dropdown">
                              <TypeaheadAutocomplete
                                disabled
                                label="Locked suggestions"
                              />
                            </Sample>
                            <Sample label="empty matches">
                              <EmptyStateDemo />
                            </Sample>
                          </div>
              </>
            }
            html={disabledEmptyHtml}
            jsx={daisyToJsx(disabledEmptyHtml)}
          />
        
        </Section>

        <Section
          eyebrow="07 · Responsive"
          title="Stack on small screens"
          description="Two typeaheads sit side by side on desktop and stack on mobile"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                            <Sample label="dropdown + menu">
                              <TypeaheadAutocomplete
                                label="Quick pick"
                                placeholder="Pigment…"
                              />
                            </Sample>
                            <Sample label="dropdown + menu">
                              <TypeaheadAutocomplete label="Mobile-friendly filter" />
                            </Sample>
                          </div>
              </>
            }
            html={responsiveHtml}
            jsx={daisyToJsx(responsiveHtml)}
          />
        
        </Section>
      </div>
    </>
  )
}

function EmptyStateDemo() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [query, setQuery] = useState('zzzx')
  const [open, setOpen] = useState(true)
  const listId = useId()

  useOutsideClose(open, setOpen, rootRef)

  const matches = pigmentNames.filter((name) => filterText(query, name))

  return (
    <div
      ref={rootRef}
      className={`dropdown dropdown-no-hover w-full max-w-md ${open ? 'dropdown-open' : ''}`}
    >
      <label className="form-control w-full">
        <span className="label">
          <span className="label-text">Unmatched query</span>
        </span>
        <input
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          value={query}
          className="input input-warning w-full cursor-text"
          onChange={(event) => {
            setQuery(event.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
        />
      </label>
      {open ? (
        <ul id={listId} role="listbox" className={menuPanel} tabIndex={-1}>
          {matches.length === 0 ? (
            <li className="px-3 py-2 text-sm text-ink-muted">
              No pigments match.
            </li>
          ) : (
            matches.map((name) => (
              <li key={name} role="option">
                <button
                  type="button"
                  className="cursor-pointer"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => {
                    setQuery(name)
                    setOpen(false)
                  }}
                >
                  {name}
                </button>
              </li>
            ))
          )}
        </ul>
      ) : null}
    </div>
  )
}
