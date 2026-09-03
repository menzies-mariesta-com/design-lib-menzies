import { ShowcaseTabs } from './components/ShowcaseTabs'
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
    <article className={`wash-panel paper-grain soak-in ${panel}`}>
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
      className={`dropdown w-full max-w-md ${open ? 'dropdown-open' : ''}`}
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
        className={`dropdown w-full ${open ? 'dropdown-open' : ''}`}
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
        className={`dropdown w-full ${open ? 'dropdown-open' : ''}`}
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
            html={"<div class=\"grid gap-6 md:grid-cols-2\">\n            <!-- Sample -->\n            <!-- Sample -->\n          </div>"}
            jsx={"<div className=\"grid gap-6 md:grid-cols-2\">\n            <Sample label=\"input + dropdown menu combobox\">\n              <TypeaheadAutocomplete\n                required\n                label=\"Pigment name\"\n                placeholder=\"Start typing a pigment\u2026\"\n              />\n            </Sample>\n            <Sample label=\"dropdown + menu typeahead\">\n              <TypeaheadAutocomplete required label=\"Suggest pigment\" />\n            </Sample>\n          </div>"}
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
            html={"<!-- IconBadgeAutocomplete -->"}
            jsx={"<IconBadgeAutocomplete />"}
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
            html={"<div class=\"grid gap-4 sm:grid-cols-2 lg:grid-cols-3\">\n            {sizes.map((size) => (\n              <!-- Sample -->\n            ))}\n          </div>"}
            jsx={"<div className=\"grid gap-4 sm:grid-cols-2 lg:grid-cols-3\">\n            {sizes.map((size) => (\n              <Sample\n                key={size.name}\n                label={\n                  size.className\n                    ? `input ${size.className} + menu`\n                    : 'input + menu'\n                }\n              >\n                <TypeaheadAutocomplete\n                  inputClassName={size.className}\n                  label={`${size.name} size`}\n                  emptyQueryShowsAll={false}\n                />\n              </Sample>\n            ))}\n          </div>"}
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
            html={"<div class=\"grid gap-4 sm:grid-cols-2 lg:grid-cols-3\">\n            {colors.map((color) => (\n              <!-- Sample -->\n            ))}\n          </div>"}
            jsx={"<div className=\"grid gap-4 sm:grid-cols-2 lg:grid-cols-3\">\n            {colors.map((color) => (\n              <Sample\n                key={color.name}\n                label={\n                  color.className\n                    ? `input ${color.className} + menu`\n                    : 'input + menu'\n                }\n              >\n                <TypeaheadAutocomplete\n                  inputClassName={color.className}\n                  label={color.name}\n                  emptyQueryShowsAll={false}\n                />\n              </Sample>\n            ))}\n          </div>"}
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
            html={"<!-- StudioPigmentsAutocomplete -->"}
            jsx={"<StudioPigmentsAutocomplete />"}
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
            html={"<div class=\"grid gap-6 md:grid-cols-2\">\n            <!-- Sample -->\n            <!-- Sample -->\n          </div>"}
            jsx={"<div className=\"grid gap-6 md:grid-cols-2\">\n            <Sample label=\"input[disabled] + dropdown\">\n              <TypeaheadAutocomplete\n                disabled\n                label=\"Locked suggestions\"\n              />\n            </Sample>\n            <Sample label=\"empty matches\">\n              <EmptyStateDemo />\n            </Sample>\n          </div>"}
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
            html={"<div class=\"grid gap-4 sm:grid-cols-2\">\n            <!-- Sample -->\n            <!-- Sample -->\n          </div>"}
            jsx={"<div className=\"grid gap-4 sm:grid-cols-2\">\n            <Sample label=\"dropdown + menu\">\n              <TypeaheadAutocomplete\n                label=\"Quick pick\"\n                placeholder=\"Pigment\u2026\"\n              />\n            </Sample>\n            <Sample label=\"dropdown + menu\">\n              <TypeaheadAutocomplete label=\"Mobile-friendly filter\" />\n            </Sample>\n          </div>"}
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
      className={`dropdown w-full max-w-md ${open ? 'dropdown-open' : ''}`}
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
