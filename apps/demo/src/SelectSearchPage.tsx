import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
  type RefObject,
} from 'react'
import {
  Check,
  ChevronsUpDown,
  Droplets,
  Paintbrush,
  Search,
  Sparkles,
} from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import {
  applyTheme,
  isWatercolorTheme,
  readStoredMode,
  watercolorThemes,
  type WatercolorThemeId,
} from './themes'
import { ShowcaseTabs } from './components/ShowcaseTabs'

const pigmentOptions = [
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
  { name: 'Neutral', className: 'btn-neutral' },
  { name: 'Primary', className: 'btn-primary' },
  { name: 'Secondary', className: 'btn-secondary' },
  { name: 'Accent', className: 'btn-accent' },
  { name: 'Info', className: 'btn-info' },
  { name: 'Success', className: 'btn-success' },
  { name: 'Warning', className: 'btn-warning' },
  { name: 'Error', className: 'btn-error' },
] as const

const sizes = [
  { name: 'XS', btn: 'btn-xs', input: 'input-xs' },
  { name: 'SM', btn: 'btn-sm', input: 'input-sm' },
  { name: 'MD', btn: 'btn-md', input: 'input-md' },
  { name: 'LG', btn: 'btn-lg', input: 'input-lg' },
  { name: 'XL', btn: 'btn-xl', input: 'input-xl' },
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

const panelClass =
  'dropdown-content z-50 mt-1 w-full max-w-[min(100vw-1rem,28rem)] max-h-[min(70vh,20rem)] overflow-x-hidden overflow-y-auto rounded-box border border-ink-border bg-base-100 p-2 shadow-[var(--shadow-paper-md)]'

const menuListClass =
  'menu max-h-52 w-full overflow-y-auto overflow-x-hidden rounded-box p-0'

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

type SearchSelectProps = {
  options: readonly string[]
  label: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  triggerClassName?: string
  inputClassName?: string
  emptyMessage?: string
  initialQuery?: string
  forceOpen?: boolean
  onPick?: (value: string) => void
}

/** Composed searchable select: select-like trigger, search field, filtered menu */
function SearchSelect({
  options,
  label,
  placeholder = 'Choose…',
  required = false,
  disabled = false,
  triggerClassName = '',
  inputClassName = '',
  emptyMessage = 'No options match.',
  initialQuery = '',
  forceOpen = false,
  onPick,
}: SearchSelectProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const listId = useId()
  const [open, setOpen] = useState(forceOpen)
  const [query, setQuery] = useState(initialQuery)
  const [value, setValue] = useState<string | null>(null)

  useOutsideClose(open && !disabled, setOpen, rootRef)

  useEffect(() => {
    if (open && !disabled) {
      searchRef.current?.focus()
    }
  }, [open, disabled])

  const matches = options.filter((name) => {
    if (!query.trim()) return true
    return filterText(query, name)
  })

  function pick(name: string) {
    setValue(name)
    setQuery('')
    setOpen(false)
    onPick?.(name)
  }

  function toggle() {
    if (disabled) return
    setOpen((prev) => !prev)
  }

  return (
    <div
      ref={rootRef}
      className={`dropdown w-full max-w-md ${open && !disabled ? 'dropdown-open' : ''}`}
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
        <button
          type="button"
          role="combobox"
          aria-expanded={open && !disabled}
          aria-controls={listId}
          aria-haspopup="listbox"
          aria-required={required || undefined}
          disabled={disabled}
          className={`btn w-full justify-between border-ink-border font-normal cursor-pointer ${
            disabled ? 'btn-disabled cursor-not-allowed' : ''
          } ${triggerClassName}`}
          onClick={toggle}
        >
          <span className={value ? 'truncate' : 'truncate text-base-content/50'}>
            {value ?? placeholder}
          </span>
          <ChevronsUpDown className="size-4 shrink-0 opacity-60" strokeWidth={2} />
        </button>
        {required ? (
          <input
            type="text"
            className="sr-only"
            tabIndex={-1}
            required
            value={value ?? ''}
            onChange={() => undefined}
            aria-hidden="true"
          />
        ) : null}
      </label>

      {open && !disabled ? (
        <div className={panelClass}>
          <label className="input input-sm mb-2 w-full cursor-text border-ink-border">
            <Search className="size-3.5 shrink-0 opacity-60" strokeWidth={2} />
            <input
              ref={searchRef}
              type="search"
              value={query}
              placeholder="Type to filter…"
              className={`grow cursor-text ${inputClassName}`}
              aria-label={`Filter ${label}`}
              aria-controls={listId}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Escape') {
                  event.stopPropagation()
                  setOpen(false)
                }
              }}
            />
          </label>
          <ul id={listId} role="listbox" className={menuListClass} tabIndex={-1}>
            {matches.length === 0 ? (
              <li className="px-3 py-2 text-sm text-ink-muted">{emptyMessage}</li>
            ) : (
              matches.map((name) => {
                const active = value === name
                return (
                  <li key={name} role="option" aria-selected={active}>
                    <button
                      type="button"
                      className={`cursor-pointer ${active ? 'active' : ''}`}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => pick(name)}
                    >
                      <span className="truncate">{name}</span>
                      {active ? (
                        <Check className="size-4 opacity-70" strokeWidth={2} />
                      ) : null}
                    </button>
                  </li>
                )
              })
            )}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

function IconBadgeSearchSelect() {
  const rootRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const listId = useId()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [picked, setPicked] = useState<(typeof toolOptions)[number] | null>(
    null,
  )

  useOutsideClose(open, setOpen, rootRef)

  useEffect(() => {
    if (open) searchRef.current?.focus()
  }, [open])

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
    setQuery('')
    setOpen(false)
  }

  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <div
        ref={rootRef}
        className={`dropdown w-full ${open ? 'dropdown-open' : ''}`}
      >
        <label className="form-control w-full">
          <span className="label">
            <span className="label-text">Studio tool</span>
          </span>
          <button
            type="button"
            role="combobox"
            aria-expanded={open}
            aria-controls={listId}
            aria-haspopup="listbox"
            className="btn w-full justify-between border-ink-border font-normal cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
          >
            <span className="flex min-w-0 items-center gap-2">
              {picked ? (
                <>
                  <picked.Icon className="size-4 shrink-0" strokeWidth={2} />
                  <span className="truncate">{picked.label}</span>
                  <span className="badge badge-sm badge-primary shrink-0">
                    {picked.badge}
                  </span>
                </>
              ) : (
                <span className="truncate text-base-content/50">
                  Search and pick a tool…
                </span>
              )}
            </span>
            <ChevronsUpDown className="size-4 shrink-0 opacity-60" strokeWidth={2} />
          </button>
        </label>

        {open ? (
          <div className={panelClass}>
            <label className="input input-sm mb-2 w-full cursor-text border-ink-border">
              <Search className="size-3.5 shrink-0 opacity-60" strokeWidth={2} />
              <input
                ref={searchRef}
                type="search"
                value={query}
                placeholder="Filter tools…"
                className="grow cursor-text"
                aria-label="Filter studio tools"
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>
            <ul id={listId} role="listbox" className={menuListClass} tabIndex={-1}>
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
          </div>
        ) : null}
      </div>
      <ClassLabel value="btn + input + menu · icons / badges" />
    </div>
  )
}

function StudioPigmentSearchSelect() {
  const rootRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const listId = useId()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState<WatercolorThemeId | null>(null)

  useOutsideClose(open, setOpen, rootRef)

  useEffect(() => {
    if (open) searchRef.current?.focus()
  }, [open])

  const matches = watercolorThemes.filter((theme) => {
    if (!query.trim()) return true
    return (
      filterText(query, theme.label) ||
      filterText(query, theme.note) ||
      filterText(query, theme.id)
    )
  })

  const selected =
    selectedId != null
      ? (watercolorThemes.find((theme) => theme.id === selectedId) ?? null)
      : null

  function pick(id: WatercolorThemeId) {
    setSelectedId(id)
    setQuery('')
    setOpen(false)
    applyTheme(id, readStoredMode())
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
          <button
            type="button"
            role="combobox"
            aria-expanded={open}
            aria-controls={listId}
            aria-haspopup="listbox"
            className="btn btn-primary w-full justify-between font-normal cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
          >
            <span className="flex min-w-0 items-center gap-2">
              {selected ? (
                <>
                  <span
                    className="size-3.5 shrink-0 rounded-full border border-ink-border"
                    style={{ backgroundColor: selected.swatch }}
                    aria-hidden="true"
                  />
                  <span className="truncate">{selected.label}</span>
                </>
              ) : (
                <span className="truncate opacity-80">
                  Search watercolorThemes…
                </span>
              )}
            </span>
            <ChevronsUpDown className="size-4 shrink-0 opacity-80" strokeWidth={2} />
          </button>
        </label>

        {open ? (
          <div className={panelClass}>
            <label className="input input-sm mb-2 w-full cursor-text border-ink-border">
              <Search className="size-3.5 shrink-0 opacity-60" strokeWidth={2} />
              <input
                ref={searchRef}
                type="search"
                value={query}
                placeholder="Filter by name, note, or id…"
                className="grow cursor-text"
                aria-label="Filter studio pigments"
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>
            <ul id={listId} role="listbox" className={menuListClass} tabIndex={-1}>
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
                        onClick={() => {
                          if (isWatercolorTheme(theme.id)) pick(theme.id)
                        }}
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
          </div>
        ) : null}

        <p className="mt-2 text-xs text-ink-muted">
          Showing {matches.length} of {watercolorThemes.length} pigments. Pick
          one to call applyTheme (ThemeSwitcher stays in sync).
        </p>
        <ClassLabel value="btn + input + menu · applyTheme" />
      </div>

      <aside className="rounded-box border border-ink-border/70 bg-base-200/40 p-4">
        <p className="label-ink mb-2">Applied</p>
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
            Search and select a pigment to restain the desk.
          </p>
        )}
      </aside>
    </div>
  )
}

function RequiredFormDemo() {
  const [submitted, setSubmitted] = useState<string | null>(null)
  const [picked, setPicked] = useState<string | null>(null)

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!picked) return
    setSubmitted(picked)
  }

  return (
    <form
      className="flex w-full max-w-md flex-col gap-4"
      onSubmit={onSubmit}
      noValidate={false}
    >
      <SearchSelect
        options={pigmentOptions}
        label="Series pigment"
        placeholder="Search then select…"
        required
        onPick={(value) => {
          setPicked(value)
          setSubmitted(null)
        }}
      />
      <button type="submit" className="btn btn-primary cursor-pointer self-start">
        Save pick
      </button>
      {submitted ? (
        <p className="text-sm text-success">
          Saved “{submitted}” from the searchable select.
        </p>
      ) : null}
      <ClassLabel value="form + required combobox" />
    </form>
  )
}

export default function SelectSearchPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Select search
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">dropdown</span> has no dedicated searchable select.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Searchable single select"
          description="Trigger shows the committed value"
        >
          <ShowcaseTabs
            preview={
              <>
                <Sample label="dropdown + btn + input + menu">
                            <SearchSelect
                              options={pigmentOptions}
                              label="Pigment"
                              placeholder="Search pigments…"
                            />
                          </Sample>
              </>
            }
            html={`<SearchSelect
              options=
              label="Pigment"
              placeholder="Search pigments…"
            />`}
            jsx={`<SearchSelect
              options={pigmentOptions}
              label="Pigment"
              placeholder="Search pigments…"
            />`}
          />
        </Section>

        <Section
          eyebrow="02 · Sizes and colors"
          title="Trigger scale and accents"
          description="Sizes and semantic colors apply to the select-like button"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {sizes.map((size) => (
                              <Sample
                                key={size.name}
                                label={`btn ${size.btn} + input ${size.input}`}
                              >
                                <SearchSelect
                                  options={pigmentOptions}
                                  label={`${size.name} size`}
                                  triggerClassName={size.btn}
                                  inputClassName={size.input}
                                />
                              </Sample>
                            ))}
                          </div>
                          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {colors.map((color) => (
                              <Sample
                                key={color.name}
                                label={
                                  color.className
                                    ? `btn ${color.className} + menu`
                                    : 'btn + menu'
                                }
                              >
                                <SearchSelect
                                  options={pigmentOptions}
                                  label={color.name}
                                  triggerClassName={color.className}
                                />
                              </Sample>
                            ))}
                          </div>
              </>
            }
            html={`<div class="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <!-- repeat for each item -->
          </div>
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <!-- repeat for each item -->
          </div>`}
            jsx={`<div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sizes.map((size) => (
              
                <SearchSelect
                  options={pigmentOptions}
                  label={\`\${size.name} size\`}
                  triggerClassName={size.btn}
                  inputClassName={size.input}
                />
              
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {colors.map((color) => (
              
                <SearchSelect
                  options={pigmentOptions}
                  label={color.name}
                  triggerClassName={color.className}
                />
              
            ))}
          </div>`}
          />
        </Section>

        <Section
          eyebrow="03 · Icons and badges"
          title="Rich option rows"
          description="Filtered options can carry Lucide icons and badge chips"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <IconBadgeSearchSelect />
              </>
            }
            html={`<IconBadgeSearchSelect />`}
            jsx={`<IconBadgeSearchSelect />`}
          />
        </Section>

        <Section
          eyebrow="04 · Studio pigments"
          title="Search watercolorThemes"
          description="Filter every Menzies Design pigment, then apply it"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <StudioPigmentSearchSelect />
              </>
            }
            html={`<StudioPigmentSearchSelect />`}
            jsx={`<StudioPigmentSearchSelect />`}
          />
        </Section>

        <Section
          eyebrow="05 · Disabled and empty"
          title="Quiet and no-results states"
          description="Disabled locks the trigger"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-6 md:grid-cols-2">
                            <Sample label="btn[disabled] + dropdown">
                              <SearchSelect
                                options={pigmentOptions}
                                label="Locked select"
                                disabled
                                placeholder="Search locked"
                              />
                            </Sample>
                            <Sample label="empty matches">
                              <SearchSelect
                                options={pigmentOptions}
                                label="Unmatched filter"
                                initialQuery="zzzx"
                                forceOpen
                                emptyMessage="No pigments match."
                              />
                            </Sample>
                          </div>
              </>
            }
            html={`<div class="grid gap-6 md:grid-cols-2">
            
              <SearchSelect
                options=
                label="Locked select"
                disabled
                placeholder="Search locked"
              />
            
            
              <SearchSelect
                options=
                label="Unmatched filter"
                initialQuery="zzzx"
                forceOpen
                emptyMessage="No pigments match."
              />
            
          </div>`}
            jsx={`<div className="grid gap-6 md:grid-cols-2">
            
              <SearchSelect
                options={pigmentOptions}
                label="Locked select"
                disabled
                placeholder="Search locked"
              />
            
            
              <SearchSelect
                options={pigmentOptions}
                label="Unmatched filter"
                initialQuery="zzzx"
                forceOpen
                emptyMessage="No pigments match."
              />
            
          </div>`}
          />
        </Section>

        <Section
          eyebrow="06 · Required"
          title="Required form field"
          description="Required asterisk beside the label"
        >
          <ShowcaseTabs
            preview={
              <>
                <RequiredFormDemo />
              </>
            }
            html={`<RequiredFormDemo />`}
            jsx={`<RequiredFormDemo />`}
          />
        </Section>

        <Section
          eyebrow="07 · Responsive"
          title="Stack on small screens"
          description="Two searchable selects sit side by side on desktop and stack on"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                            <Sample label="dropdown + menu">
                              <SearchSelect
                                options={pigmentOptions}
                                label="Wash medium"
                                placeholder="Search mediums…"
                              />
                            </Sample>
                            <Sample label="dropdown + menu">
                              <SearchSelect
                                options={[
                                  'Cold press',
                                  'Hot press',
                                  'Rough',
                                  'Plate',
                                  'Block',
                                ]}
                                label="Paper tooth"
                                placeholder="Search papers…"
                              />
                            </Sample>
                          </div>
              </>
            }
            html={`<div class="grid gap-4 sm:grid-cols-2">
            
              <SearchSelect
                options=
                label="Wash medium"
                placeholder="Search mediums…"
              />
            
            
              <SearchSelect
                options=
                label="Paper tooth"
                placeholder="Search papers…"
              />
            
          </div>`}
            jsx={`<div className="grid gap-4 sm:grid-cols-2">
            
              <SearchSelect
                options={pigmentOptions}
                label="Wash medium"
                placeholder="Search mediums…"
              />
            
            
              <SearchSelect
                options={[
                  'Cold press',
                  'Hot press',
                  'Rough',
                  'Plate',
                  'Block',
                ]}
                label="Paper tooth"
                placeholder="Search papers…"
              />
            
          </div>`}
          />
        </Section>
      </div>
    </>
  )
}
