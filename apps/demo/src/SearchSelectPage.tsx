import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
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
  DROPDOWN_PANEL_OVERFLOW,
  DROPDOWN_PANEL_Z,
  SearchSelect,
  dropdownPanelStyle,
  dropdownPlacementClassName,
  useDropdownPlacement,
} from '#plain'
import {
  applyTheme,
  isWatercolorTheme,
  readStoredMode,
  watercolorThemes,
  type WatercolorThemeId,
} from './themes'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import { searchSelectSvelteFiles } from './snippets/svelte/search-select'

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

const menuListClass =
  'menu max-h-52 w-full overflow-y-auto overflow-x-hidden rounded-box p-0'

function panelClassName(top: boolean) {
  return `dropdown-content ${DROPDOWN_PANEL_Z} ${
    top ? 'mb-1' : 'mt-1'
  } w-full max-w-[min(100vw-1rem,28rem)] rounded-box border border-ink-border bg-base-100 p-2 shadow-[var(--shadow-paper-md)] ${DROPDOWN_PANEL_OVERFLOW}`
}

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

function IconBadgeSearchSelect() {
  const rootRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const listId = useId()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [picked, setPicked] = useState<(typeof toolOptions)[number] | null>(
    null,
  )
  const placement = useDropdownPlacement(rootRef, open, {
    panelWidth: 448,
    panelHeight: 280,
  })

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
        className={dropdownPlacementClassName(
          placement,
          `dropdown-no-hover w-full ${open ? 'dropdown-open' : ''}`,
        )}
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
          <div
            className={panelClassName(placement.top)}
            style={dropdownPanelStyle(placement) as CSSProperties}
          >
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
  const placement = useDropdownPlacement(rootRef, open, {
    panelWidth: 448,
    panelHeight: 360,
  })

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
        className={dropdownPlacementClassName(
          placement,
          `dropdown-no-hover w-full ${open ? 'dropdown-open' : ''}`,
        )}
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
          <div
            className={panelClassName(placement.top)}
            style={dropdownPanelStyle(placement) as CSSProperties}
          >
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

const basicHtml = `<div class="dropdown dropdown-no-hover w-full max-w-md">
  <label class="form-control w-full">
    <span class="label"><span class="label-text">Pigment</span></span>
    <button type="button" role="combobox" aria-expanded="false" aria-haspopup="listbox" class="btn w-full justify-between border-ink-border font-normal cursor-pointer">
      <span class="truncate text-base-content/50">Search pigments…</span>
      <svg class="size-4 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
    </button>
  </label>
  <div class="dropdown-content z-[80] mt-1 w-full max-w-[min(100vw-1rem,28rem)] overflow-y-auto overflow-x-hidden rounded-box border border-ink-border bg-base-100 p-2 shadow-[var(--shadow-paper-md)]">
    <label class="input input-sm mb-2 w-full cursor-text border-ink-border">
      <svg class="size-3.5 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>
      <input type="search" value="" placeholder="Type to filter…" class="grow cursor-text" aria-label="Filter Pigment" />
    </label>
    <ul role="listbox" class="menu max-h-52 w-full overflow-y-auto overflow-x-hidden rounded-box p-0" tabindex="-1">
        <li role="option"><button type="button" class="cursor-pointer"><span class="truncate">Ultramarine</span></button></li>
        <li role="option"><button type="button" class="cursor-pointer"><span class="truncate">Yellow ochre</span></button></li>
        <li role="option"><button type="button" class="cursor-pointer"><span class="truncate">Alizarin crimson</span></button></li>
        <li role="option"><button type="button" class="cursor-pointer"><span class="truncate">Viridian</span></button></li>
        <li role="option"><button type="button" class="cursor-pointer"><span class="truncate">Burnt sienna</span></button></li>
        <li role="option"><button type="button" class="cursor-pointer"><span class="truncate">Cobalt blue</span></button></li>
        <li role="option"><button type="button" class="cursor-pointer"><span class="truncate">Cerulean</span></button></li>
        <li role="option"><button type="button" class="cursor-pointer"><span class="truncate">Quinacridone rose</span></button></li>
    </ul>
  </div>
</div>`

const basicJsx = `<div className="dropdown dropdown-no-hover w-full max-w-md">
  <label className="form-control w-full">
    <span className="label"><span className="label-text">Pigment</span></span>
    <button type="button" role="combobox" aria-expanded="false" aria-haspopup="listbox" className="btn w-full justify-between border-ink-border font-normal cursor-pointer">
      <span className="truncate text-base-content/50">Search pigments…</span>
      <svg className="size-4 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
    </button>
  </label>
  <div className="dropdown-content z-[80] mt-1 w-full max-w-[min(100vw-1rem,28rem)] overflow-y-auto overflow-x-hidden rounded-box border border-ink-border bg-base-100 p-2 shadow-[var(--shadow-paper-md)]">
    <label className="input input-sm mb-2 w-full cursor-text border-ink-border">
      <svg className="size-3.5 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>
      <input type="search" value="" placeholder="Type to filter…" className="grow cursor-text" aria-label="Filter Pigment" />
    </label>
    <ul role="listbox" className="menu max-h-52 w-full overflow-y-auto overflow-x-hidden rounded-box p-0" tabIndex="-1">
        <li role="option"><button type="button" className="cursor-pointer"><span className="truncate">Ultramarine</span></button></li>
        <li role="option"><button type="button" className="cursor-pointer"><span className="truncate">Yellow ochre</span></button></li>
        <li role="option"><button type="button" className="cursor-pointer"><span className="truncate">Alizarin crimson</span></button></li>
        <li role="option"><button type="button" className="cursor-pointer"><span className="truncate">Viridian</span></button></li>
        <li role="option"><button type="button" className="cursor-pointer"><span className="truncate">Burnt sienna</span></button></li>
        <li role="option"><button type="button" className="cursor-pointer"><span className="truncate">Cobalt blue</span></button></li>
        <li role="option"><button type="button" className="cursor-pointer"><span className="truncate">Cerulean</span></button></li>
        <li role="option"><button type="button" className="cursor-pointer"><span className="truncate">Quinacridone rose</span></button></li>
    </ul>
  </div>
</div>`

const sizesColorsHtml = `<div class="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
  <div class="flex flex-col gap-2">
<div class="dropdown dropdown-no-hover w-full max-w-md">
  <label class="form-control w-full">
    <span class="label"><span class="label-text">XS size</span></span>
    <button type="button" role="combobox" aria-expanded="false" aria-haspopup="listbox" class="btn w-full justify-between border-ink-border font-normal cursor-pointer btn-xs">
      <span class="truncate text-base-content/50">Search pigments…</span>
      <svg class="size-4 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
    </button>
  </label>

</div>
  </div>
  <div class="flex flex-col gap-2">
<div class="dropdown dropdown-no-hover w-full max-w-md">
  <label class="form-control w-full">
    <span class="label"><span class="label-text">SM size</span></span>
    <button type="button" role="combobox" aria-expanded="false" aria-haspopup="listbox" class="btn w-full justify-between border-ink-border font-normal cursor-pointer btn-sm">
      <span class="truncate text-base-content/50">Search pigments…</span>
      <svg class="size-4 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
    </button>
  </label>

</div>
  </div>
  <div class="flex flex-col gap-2">
<div class="dropdown dropdown-no-hover w-full max-w-md">
  <label class="form-control w-full">
    <span class="label"><span class="label-text">MD size</span></span>
    <button type="button" role="combobox" aria-expanded="false" aria-haspopup="listbox" class="btn w-full justify-between border-ink-border font-normal cursor-pointer btn-md">
      <span class="truncate text-base-content/50">Search pigments…</span>
      <svg class="size-4 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
    </button>
  </label>

</div>
  </div>
  <div class="flex flex-col gap-2">
<div class="dropdown dropdown-no-hover w-full max-w-md">
  <label class="form-control w-full">
    <span class="label"><span class="label-text">LG size</span></span>
    <button type="button" role="combobox" aria-expanded="false" aria-haspopup="listbox" class="btn w-full justify-between border-ink-border font-normal cursor-pointer btn-lg">
      <span class="truncate text-base-content/50">Search pigments…</span>
      <svg class="size-4 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
    </button>
  </label>

</div>
  </div>
  <div class="flex flex-col gap-2">
<div class="dropdown dropdown-no-hover w-full max-w-md">
  <label class="form-control w-full">
    <span class="label"><span class="label-text">XL size</span></span>
    <button type="button" role="combobox" aria-expanded="false" aria-haspopup="listbox" class="btn w-full justify-between border-ink-border font-normal cursor-pointer btn-xl">
      <span class="truncate text-base-content/50">Search pigments…</span>
      <svg class="size-4 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
    </button>
  </label>

</div>
  </div>
</div>
<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
  <div class="flex flex-col gap-2">
<div class="dropdown dropdown-no-hover w-full max-w-md">
  <label class="form-control w-full">
    <span class="label"><span class="label-text">Default</span></span>
    <button type="button" role="combobox" aria-expanded="false" aria-haspopup="listbox" class="btn w-full justify-between border-ink-border font-normal cursor-pointer">
      <span class="truncate text-base-content/50">Search pigments…</span>
      <svg class="size-4 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
    </button>
  </label>

</div>
  </div>
  <div class="flex flex-col gap-2">
<div class="dropdown dropdown-no-hover w-full max-w-md">
  <label class="form-control w-full">
    <span class="label"><span class="label-text">Neutral</span></span>
    <button type="button" role="combobox" aria-expanded="false" aria-haspopup="listbox" class="btn w-full justify-between border-ink-border font-normal cursor-pointer btn-neutral">
      <span class="truncate text-base-content/50">Search pigments…</span>
      <svg class="size-4 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
    </button>
  </label>

</div>
  </div>
  <div class="flex flex-col gap-2">
<div class="dropdown dropdown-no-hover w-full max-w-md">
  <label class="form-control w-full">
    <span class="label"><span class="label-text">Primary</span></span>
    <button type="button" role="combobox" aria-expanded="false" aria-haspopup="listbox" class="btn w-full justify-between border-ink-border font-normal cursor-pointer btn-primary">
      <span class="truncate text-base-content/50">Search pigments…</span>
      <svg class="size-4 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
    </button>
  </label>

</div>
  </div>
  <div class="flex flex-col gap-2">
<div class="dropdown dropdown-no-hover w-full max-w-md">
  <label class="form-control w-full">
    <span class="label"><span class="label-text">Secondary</span></span>
    <button type="button" role="combobox" aria-expanded="false" aria-haspopup="listbox" class="btn w-full justify-between border-ink-border font-normal cursor-pointer btn-secondary">
      <span class="truncate text-base-content/50">Search pigments…</span>
      <svg class="size-4 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
    </button>
  </label>

</div>
  </div>
  <div class="flex flex-col gap-2">
<div class="dropdown dropdown-no-hover w-full max-w-md">
  <label class="form-control w-full">
    <span class="label"><span class="label-text">Accent</span></span>
    <button type="button" role="combobox" aria-expanded="false" aria-haspopup="listbox" class="btn w-full justify-between border-ink-border font-normal cursor-pointer btn-accent">
      <span class="truncate text-base-content/50">Search pigments…</span>
      <svg class="size-4 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
    </button>
  </label>

</div>
  </div>
  <div class="flex flex-col gap-2">
<div class="dropdown dropdown-no-hover w-full max-w-md">
  <label class="form-control w-full">
    <span class="label"><span class="label-text">Info</span></span>
    <button type="button" role="combobox" aria-expanded="false" aria-haspopup="listbox" class="btn w-full justify-between border-ink-border font-normal cursor-pointer btn-info">
      <span class="truncate text-base-content/50">Search pigments…</span>
      <svg class="size-4 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
    </button>
  </label>

</div>
  </div>
  <div class="flex flex-col gap-2">
<div class="dropdown dropdown-no-hover w-full max-w-md">
  <label class="form-control w-full">
    <span class="label"><span class="label-text">Success</span></span>
    <button type="button" role="combobox" aria-expanded="false" aria-haspopup="listbox" class="btn w-full justify-between border-ink-border font-normal cursor-pointer btn-success">
      <span class="truncate text-base-content/50">Search pigments…</span>
      <svg class="size-4 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
    </button>
  </label>

</div>
  </div>
  <div class="flex flex-col gap-2">
<div class="dropdown dropdown-no-hover w-full max-w-md">
  <label class="form-control w-full">
    <span class="label"><span class="label-text">Warning</span></span>
    <button type="button" role="combobox" aria-expanded="false" aria-haspopup="listbox" class="btn w-full justify-between border-ink-border font-normal cursor-pointer btn-warning">
      <span class="truncate text-base-content/50">Search pigments…</span>
      <svg class="size-4 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
    </button>
  </label>

</div>
  </div>
  <div class="flex flex-col gap-2">
<div class="dropdown dropdown-no-hover w-full max-w-md">
  <label class="form-control w-full">
    <span class="label"><span class="label-text">Error</span></span>
    <button type="button" role="combobox" aria-expanded="false" aria-haspopup="listbox" class="btn w-full justify-between border-ink-border font-normal cursor-pointer btn-error">
      <span class="truncate text-base-content/50">Search pigments…</span>
      <svg class="size-4 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
    </button>
  </label>

</div>
  </div>
</div>`

const sizesColorsJsx = `<div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
  <div className="flex flex-col gap-2">
<div className="dropdown dropdown-no-hover w-full max-w-md">
  <label className="form-control w-full">
    <span className="label"><span className="label-text">XS size</span></span>
    <button type="button" role="combobox" aria-expanded="false" aria-haspopup="listbox" className="btn w-full justify-between border-ink-border font-normal cursor-pointer btn-xs">
      <span className="truncate text-base-content/50">Search pigments…</span>
      <svg className="size-4 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
    </button>
  </label>

</div>
  </div>
  <div className="flex flex-col gap-2">
<div className="dropdown dropdown-no-hover w-full max-w-md">
  <label className="form-control w-full">
    <span className="label"><span className="label-text">SM size</span></span>
    <button type="button" role="combobox" aria-expanded="false" aria-haspopup="listbox" className="btn w-full justify-between border-ink-border font-normal cursor-pointer btn-sm">
      <span className="truncate text-base-content/50">Search pigments…</span>
      <svg className="size-4 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
    </button>
  </label>

</div>
  </div>
  <div className="flex flex-col gap-2">
<div className="dropdown dropdown-no-hover w-full max-w-md">
  <label className="form-control w-full">
    <span className="label"><span className="label-text">MD size</span></span>
    <button type="button" role="combobox" aria-expanded="false" aria-haspopup="listbox" className="btn w-full justify-between border-ink-border font-normal cursor-pointer btn-md">
      <span className="truncate text-base-content/50">Search pigments…</span>
      <svg className="size-4 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
    </button>
  </label>

</div>
  </div>
  <div className="flex flex-col gap-2">
<div className="dropdown dropdown-no-hover w-full max-w-md">
  <label className="form-control w-full">
    <span className="label"><span className="label-text">LG size</span></span>
    <button type="button" role="combobox" aria-expanded="false" aria-haspopup="listbox" className="btn w-full justify-between border-ink-border font-normal cursor-pointer btn-lg">
      <span className="truncate text-base-content/50">Search pigments…</span>
      <svg className="size-4 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
    </button>
  </label>

</div>
  </div>
  <div className="flex flex-col gap-2">
<div className="dropdown dropdown-no-hover w-full max-w-md">
  <label className="form-control w-full">
    <span className="label"><span className="label-text">XL size</span></span>
    <button type="button" role="combobox" aria-expanded="false" aria-haspopup="listbox" className="btn w-full justify-between border-ink-border font-normal cursor-pointer btn-xl">
      <span className="truncate text-base-content/50">Search pigments…</span>
      <svg className="size-4 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
    </button>
  </label>

</div>
  </div>
</div>
<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
  <div className="flex flex-col gap-2">
<div className="dropdown dropdown-no-hover w-full max-w-md">
  <label className="form-control w-full">
    <span className="label"><span className="label-text">Default</span></span>
    <button type="button" role="combobox" aria-expanded="false" aria-haspopup="listbox" className="btn w-full justify-between border-ink-border font-normal cursor-pointer">
      <span className="truncate text-base-content/50">Search pigments…</span>
      <svg className="size-4 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
    </button>
  </label>

</div>
  </div>
  <div className="flex flex-col gap-2">
<div className="dropdown dropdown-no-hover w-full max-w-md">
  <label className="form-control w-full">
    <span className="label"><span className="label-text">Neutral</span></span>
    <button type="button" role="combobox" aria-expanded="false" aria-haspopup="listbox" className="btn w-full justify-between border-ink-border font-normal cursor-pointer btn-neutral">
      <span className="truncate text-base-content/50">Search pigments…</span>
      <svg className="size-4 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
    </button>
  </label>

</div>
  </div>
  <div className="flex flex-col gap-2">
<div className="dropdown dropdown-no-hover w-full max-w-md">
  <label className="form-control w-full">
    <span className="label"><span className="label-text">Primary</span></span>
    <button type="button" role="combobox" aria-expanded="false" aria-haspopup="listbox" className="btn w-full justify-between border-ink-border font-normal cursor-pointer btn-primary">
      <span className="truncate text-base-content/50">Search pigments…</span>
      <svg className="size-4 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
    </button>
  </label>

</div>
  </div>
  <div className="flex flex-col gap-2">
<div className="dropdown dropdown-no-hover w-full max-w-md">
  <label className="form-control w-full">
    <span className="label"><span className="label-text">Secondary</span></span>
    <button type="button" role="combobox" aria-expanded="false" aria-haspopup="listbox" className="btn w-full justify-between border-ink-border font-normal cursor-pointer btn-secondary">
      <span className="truncate text-base-content/50">Search pigments…</span>
      <svg className="size-4 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
    </button>
  </label>

</div>
  </div>
  <div className="flex flex-col gap-2">
<div className="dropdown dropdown-no-hover w-full max-w-md">
  <label className="form-control w-full">
    <span className="label"><span className="label-text">Accent</span></span>
    <button type="button" role="combobox" aria-expanded="false" aria-haspopup="listbox" className="btn w-full justify-between border-ink-border font-normal cursor-pointer btn-accent">
      <span className="truncate text-base-content/50">Search pigments…</span>
      <svg className="size-4 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
    </button>
  </label>

</div>
  </div>
  <div className="flex flex-col gap-2">
<div className="dropdown dropdown-no-hover w-full max-w-md">
  <label className="form-control w-full">
    <span className="label"><span className="label-text">Info</span></span>
    <button type="button" role="combobox" aria-expanded="false" aria-haspopup="listbox" className="btn w-full justify-between border-ink-border font-normal cursor-pointer btn-info">
      <span className="truncate text-base-content/50">Search pigments…</span>
      <svg className="size-4 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
    </button>
  </label>

</div>
  </div>
  <div className="flex flex-col gap-2">
<div className="dropdown dropdown-no-hover w-full max-w-md">
  <label className="form-control w-full">
    <span className="label"><span className="label-text">Success</span></span>
    <button type="button" role="combobox" aria-expanded="false" aria-haspopup="listbox" className="btn w-full justify-between border-ink-border font-normal cursor-pointer btn-success">
      <span className="truncate text-base-content/50">Search pigments…</span>
      <svg className="size-4 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
    </button>
  </label>

</div>
  </div>
  <div className="flex flex-col gap-2">
<div className="dropdown dropdown-no-hover w-full max-w-md">
  <label className="form-control w-full">
    <span className="label"><span className="label-text">Warning</span></span>
    <button type="button" role="combobox" aria-expanded="false" aria-haspopup="listbox" className="btn w-full justify-between border-ink-border font-normal cursor-pointer btn-warning">
      <span className="truncate text-base-content/50">Search pigments…</span>
      <svg className="size-4 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
    </button>
  </label>

</div>
  </div>
  <div className="flex flex-col gap-2">
<div className="dropdown dropdown-no-hover w-full max-w-md">
  <label className="form-control w-full">
    <span className="label"><span className="label-text">Error</span></span>
    <button type="button" role="combobox" aria-expanded="false" aria-haspopup="listbox" className="btn w-full justify-between border-ink-border font-normal cursor-pointer btn-error">
      <span className="truncate text-base-content/50">Search pigments…</span>
      <svg className="size-4 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
    </button>
  </label>

</div>
  </div>
</div>`

const iconsHtml = `<div class="flex w-full max-w-lg flex-col gap-3">
  <div class="dropdown dropdown-no-hover w-full">
    <label class="form-control w-full">
      <span class="label"><span class="label-text">Studio tool</span></span>
      <button type="button" role="combobox" aria-expanded="false" aria-haspopup="listbox" class="btn w-full justify-between border-ink-border font-normal cursor-pointer">
        <span class="truncate text-base-content/50">Search and pick a tool…</span>
        <svg class="size-4 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
      </button>
    </label>
    <div class="dropdown-content z-[80] mt-1 w-full max-w-[min(100vw-1rem,28rem)] overflow-y-auto overflow-x-hidden rounded-box border border-ink-border bg-base-100 p-2 shadow-[var(--shadow-paper-md)]">
      <label class="input input-sm mb-2 w-full cursor-text border-ink-border">
        <svg class="size-3.5 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>
        <input type="search" placeholder="Filter tools…" class="grow cursor-text" aria-label="Filter studio tools" />
      </label>
      <ul role="listbox" class="menu max-h-52 w-full overflow-y-auto overflow-x-hidden rounded-box p-0" tabindex="-1">
        <li role="option">
          <button type="button" class="cursor-pointer">
            <svg class="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m14.622 17.897-10.68-2.913"/><path d="M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z"/><path d="M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15"/></svg>
            <span class="flex min-w-0 flex-1 flex-col items-start gap-0.5">
              <span class="font-medium">Round brush</span>
              <span class="text-xs text-ink-muted">Washes and edges</span>
            </span>
            <span class="badge badge-ghost badge-sm">Tool</span>
          </button>
        </li>
        <li role="option">
          <button type="button" class="cursor-pointer">
            <svg class="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/></svg>
            <span class="flex min-w-0 flex-1 flex-col items-start gap-0.5">
              <span class="font-medium">Wash dropper</span>
              <span class="text-xs text-ink-muted">Dilution control</span>
            </span>
            <span class="badge badge-ghost badge-sm">Water</span>
          </button>
        </li>
        <li role="option">
          <button type="button" class="cursor-pointer">
            <svg class="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/><path d="M20 2v4"/><path d="M22 4h-4"/><circle cx="4" cy="20" r="2"/></svg>
            <span class="flex min-w-0 flex-1 flex-col items-start gap-0.5">
              <span class="font-medium">Bloom lift</span>
              <span class="text-xs text-ink-muted">Soft highlights</span>
            </span>
            <span class="badge badge-ghost badge-sm">Effect</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</div>`

const iconsJsx = `<div className="flex w-full max-w-lg flex-col gap-3">
  <div className="dropdown dropdown-no-hover w-full">
    <label className="form-control w-full">
      <span className="label"><span className="label-text">Studio tool</span></span>
      <button type="button" role="combobox" aria-expanded="false" aria-haspopup="listbox" className="btn w-full justify-between border-ink-border font-normal cursor-pointer">
        <span className="truncate text-base-content/50">Search and pick a tool…</span>
        <svg className="size-4 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
      </button>
    </label>
    <div className="dropdown-content z-[80] mt-1 w-full max-w-[min(100vw-1rem,28rem)] overflow-y-auto overflow-x-hidden rounded-box border border-ink-border bg-base-100 p-2 shadow-[var(--shadow-paper-md)]">
      <label className="input input-sm mb-2 w-full cursor-text border-ink-border">
        <svg className="size-3.5 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>
        <input type="search" placeholder="Filter tools…" className="grow cursor-text" aria-label="Filter studio tools" />
      </label>
      <ul role="listbox" className="menu max-h-52 w-full overflow-y-auto overflow-x-hidden rounded-box p-0" tabIndex="-1">
        <li role="option">
          <button type="button" className="cursor-pointer">
            <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m14.622 17.897-10.68-2.913"/><path d="M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z"/><path d="M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15"/></svg>
            <span className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
              <span className="font-medium">Round brush</span>
              <span className="text-xs text-ink-muted">Washes and edges</span>
            </span>
            <span className="badge badge-ghost badge-sm">Tool</span>
          </button>
        </li>
        <li role="option">
          <button type="button" className="cursor-pointer">
            <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/></svg>
            <span className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
              <span className="font-medium">Wash dropper</span>
              <span className="text-xs text-ink-muted">Dilution control</span>
            </span>
            <span className="badge badge-ghost badge-sm">Water</span>
          </button>
        </li>
        <li role="option">
          <button type="button" className="cursor-pointer">
            <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/><path d="M20 2v4"/><path d="M22 4h-4"/><circle cx="4" cy="20" r="2"/></svg>
            <span className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
              <span className="font-medium">Bloom lift</span>
              <span className="text-xs text-ink-muted">Soft highlights</span>
            </span>
            <span className="badge badge-ghost badge-sm">Effect</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</div>`

const studioHtml = `<div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(12rem,16rem)] lg:items-start">
  <div class="dropdown dropdown-no-hover w-full">
    <label class="form-control w-full">
      <span class="label"><span class="label-text">Studio pigment<span class="text-error align-top text-sm leading-none" aria-hidden="true">*</span></span></span>
      <button type="button" role="combobox" aria-expanded="false" aria-haspopup="listbox" class="btn btn-primary w-full justify-between font-normal cursor-pointer">
        <span class="truncate opacity-80">Search watercolorThemes…</span>
        <svg class="size-4 shrink-0 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
      </button>
    </label>
    <div class="dropdown-content z-[80] mt-1 w-full max-w-[min(100vw-1rem,28rem)] overflow-y-auto overflow-x-hidden rounded-box border border-ink-border bg-base-100 p-2 shadow-[var(--shadow-paper-md)]">
      <label class="input input-sm mb-2 w-full cursor-text border-ink-border">
        <svg class="size-3.5 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>
        <input type="search" placeholder="Filter by name, note, or id…" class="grow cursor-text" aria-label="Filter studio pigments" />
      </label>
      <ul role="listbox" class="menu max-h-52 w-full overflow-y-auto overflow-x-hidden rounded-box p-0" tabindex="-1">
        <li role="option">
          <button type="button" class="cursor-pointer">
            <span class="size-3.5 shrink-0 rounded-full border border-ink-border" style="background-color: #7aa2b5" aria-hidden="true"></span>
            <span class="flex min-w-0 flex-1 flex-col items-start gap-0.5">
              <span class="font-medium">Coastal fog</span>
              <span class="text-xs text-ink-muted">Cool mist over paper</span>
            </span>
          </button>
        </li>
        <li role="option">
          <button type="button" class="cursor-pointer">
            <span class="size-3.5 shrink-0 rounded-full border border-ink-border" style="background-color: #c49a6c" aria-hidden="true"></span>
            <span class="flex min-w-0 flex-1 flex-col items-start gap-0.5">
              <span class="font-medium">Ochre cliff</span>
              <span class="text-xs text-ink-muted">Warm earth margin</span>
            </span>
          </button>
        </li>
        <li role="option">
          <button type="button" class="cursor-pointer">
            <span class="size-3.5 shrink-0 rounded-full border border-ink-border" style="background-color: #c97b8a" aria-hidden="true"></span>
            <span class="flex min-w-0 flex-1 flex-col items-start gap-0.5">
              <span class="font-medium">Rose field</span>
              <span class="text-xs text-ink-muted">Soft bloom wash</span>
            </span>
          </button>
        </li>
      </ul>
    </div>
    <p class="mt-2 text-xs text-ink-muted">Showing 3 of many pigments. Pick one to restain the desk.</p>
  </div>
  <aside class="rounded-box border border-ink-border/70 bg-base-200/40 p-4">
    <p class="label-ink mb-2">Applied</p>
    <p class="text-sm text-ink-muted">Search and select a pigment to restain the desk.</p>
  </aside>
</div>`

const studioJsx = `<div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(12rem,16rem)] lg:items-start">
  <div className="dropdown dropdown-no-hover w-full">
    <label className="form-control w-full">
      <span className="label"><span className="label-text">Studio pigment<span className="text-error align-top text-sm leading-none" aria-hidden="true">*</span></span></span>
      <button type="button" role="combobox" aria-expanded="false" aria-haspopup="listbox" className="btn btn-primary w-full justify-between font-normal cursor-pointer">
        <span className="truncate opacity-80">Search watercolorThemes…</span>
        <svg className="size-4 shrink-0 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
      </button>
    </label>
    <div className="dropdown-content z-[80] mt-1 w-full max-w-[min(100vw-1rem,28rem)] overflow-y-auto overflow-x-hidden rounded-box border border-ink-border bg-base-100 p-2 shadow-[var(--shadow-paper-md)]">
      <label className="input input-sm mb-2 w-full cursor-text border-ink-border">
        <svg className="size-3.5 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>
        <input type="search" placeholder="Filter by name, note, or id…" className="grow cursor-text" aria-label="Filter studio pigments" />
      </label>
      <ul role="listbox" className="menu max-h-52 w-full overflow-y-auto overflow-x-hidden rounded-box p-0" tabIndex="-1">
        <li role="option">
          <button type="button" className="cursor-pointer">
            <span className="size-3.5 shrink-0 rounded-full border border-ink-border" style="background-color: #7aa2b5" aria-hidden="true"></span>
            <span className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
              <span className="font-medium">Coastal fog</span>
              <span className="text-xs text-ink-muted">Cool mist over paper</span>
            </span>
          </button>
        </li>
        <li role="option">
          <button type="button" className="cursor-pointer">
            <span className="size-3.5 shrink-0 rounded-full border border-ink-border" style="background-color: #c49a6c" aria-hidden="true"></span>
            <span className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
              <span className="font-medium">Ochre cliff</span>
              <span className="text-xs text-ink-muted">Warm earth margin</span>
            </span>
          </button>
        </li>
        <li role="option">
          <button type="button" className="cursor-pointer">
            <span className="size-3.5 shrink-0 rounded-full border border-ink-border" style="background-color: #c97b8a" aria-hidden="true"></span>
            <span className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
              <span className="font-medium">Rose field</span>
              <span className="text-xs text-ink-muted">Soft bloom wash</span>
            </span>
          </button>
        </li>
      </ul>
    </div>
    <p className="mt-2 text-xs text-ink-muted">Showing 3 of many pigments. Pick one to restain the desk.</p>
  </div>
  <aside className="rounded-box border border-ink-border/70 bg-base-200/40 p-4">
    <p className="label-ink mb-2">Applied</p>
    <p className="text-sm text-ink-muted">Search and select a pigment to restain the desk.</p>
  </aside>
</div>`

const disabledHtml = `<div class="grid gap-6 md:grid-cols-2">
  <div class="flex flex-col gap-2">
<div class="dropdown dropdown-no-hover w-full max-w-md">
  <label class="form-control w-full">
    <span class="label"><span class="label-text">Locked select</span></span>
    <button type="button" role="combobox" aria-expanded="false" aria-haspopup="listbox" class="btn w-full justify-between border-ink-border font-normal cursor-pointer btn-disabled cursor-not-allowed" disabled>
      <span class="truncate text-base-content/50">Search locked</span>
      <svg class="size-4 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
    </button>
  </label>

</div>
  </div>
  <div class="flex flex-col gap-2">
<div class="dropdown dropdown-no-hover w-full max-w-md">
  <label class="form-control w-full">
    <span class="label"><span class="label-text">Unmatched filter</span></span>
    <button type="button" role="combobox" aria-expanded="false" aria-haspopup="listbox" class="btn w-full justify-between border-ink-border font-normal cursor-pointer">
      <span class="truncate text-base-content/50">Search pigments…</span>
      <svg class="size-4 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
    </button>
  </label>
  <div class="dropdown-content z-[80] mt-1 w-full max-w-[min(100vw-1rem,28rem)] overflow-y-auto overflow-x-hidden rounded-box border border-ink-border bg-base-100 p-2 shadow-[var(--shadow-paper-md)]">
    <label class="input input-sm mb-2 w-full cursor-text border-ink-border">
      <svg class="size-3.5 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>
      <input type="search" value="zzzx" placeholder="Type to filter…" class="grow cursor-text" aria-label="Filter Unmatched filter" />
    </label>
    <ul role="listbox" class="menu max-h-52 w-full overflow-y-auto overflow-x-hidden rounded-box p-0" tabindex="-1">
        <li class="px-3 py-2 text-sm text-ink-muted">No pigments match.</li>
    </ul>
  </div>
</div>
  </div>
</div>`

const disabledJsx = `<div className="grid gap-6 md:grid-cols-2">
  <div className="flex flex-col gap-2">
<div className="dropdown dropdown-no-hover w-full max-w-md">
  <label className="form-control w-full">
    <span className="label"><span className="label-text">Locked select</span></span>
    <button type="button" role="combobox" aria-expanded="false" aria-haspopup="listbox" className="btn w-full justify-between border-ink-border font-normal cursor-pointer btn-disabled cursor-not-allowed" disabled>
      <span className="truncate text-base-content/50">Search locked</span>
      <svg className="size-4 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
    </button>
  </label>

</div>
  </div>
  <div className="flex flex-col gap-2">
<div className="dropdown dropdown-no-hover w-full max-w-md">
  <label className="form-control w-full">
    <span className="label"><span className="label-text">Unmatched filter</span></span>
    <button type="button" role="combobox" aria-expanded="false" aria-haspopup="listbox" className="btn w-full justify-between border-ink-border font-normal cursor-pointer">
      <span className="truncate text-base-content/50">Search pigments…</span>
      <svg className="size-4 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
    </button>
  </label>
  <div className="dropdown-content z-[80] mt-1 w-full max-w-[min(100vw-1rem,28rem)] overflow-y-auto overflow-x-hidden rounded-box border border-ink-border bg-base-100 p-2 shadow-[var(--shadow-paper-md)]">
    <label className="input input-sm mb-2 w-full cursor-text border-ink-border">
      <svg className="size-3.5 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>
      <input type="search" value="zzzx" placeholder="Type to filter…" className="grow cursor-text" aria-label="Filter Unmatched filter" />
    </label>
    <ul role="listbox" className="menu max-h-52 w-full overflow-y-auto overflow-x-hidden rounded-box p-0" tabIndex="-1">
        <li className="px-3 py-2 text-sm text-ink-muted">No pigments match.</li>
    </ul>
  </div>
</div>
  </div>
</div>`

const requiredHtml = `<form class="flex w-full max-w-md flex-col gap-4">
<div class="dropdown dropdown-no-hover w-full max-w-md">
  <label class="form-control w-full">
    <span class="label"><span class="label-text">Series pigment<span class="text-error align-top text-sm leading-none" aria-hidden="true">*</span></span></span>
    <button type="button" role="combobox" aria-expanded="false" aria-haspopup="listbox" class="btn w-full justify-between border-ink-border font-normal cursor-pointer">
      <span class="truncate text-base-content/50">Search then select…</span>
      <svg class="size-4 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
    </button>
  </label>

</div>
  <button type="submit" class="btn btn-primary cursor-pointer self-start">Save pick</button>
</form>`

const requiredJsx = `<form className="flex w-full max-w-md flex-col gap-4">
<div className="dropdown dropdown-no-hover w-full max-w-md">
  <label className="form-control w-full">
    <span className="label"><span className="label-text">Series pigment<span className="text-error align-top text-sm leading-none" aria-hidden="true">*</span></span></span>
    <button type="button" role="combobox" aria-expanded="false" aria-haspopup="listbox" className="btn w-full justify-between border-ink-border font-normal cursor-pointer">
      <span className="truncate text-base-content/50">Search then select…</span>
      <svg className="size-4 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
    </button>
  </label>

</div>
  <button type="submit" className="btn btn-primary cursor-pointer self-start">Save pick</button>
</form>`

const responsiveHtml = `<div class="grid gap-4 sm:grid-cols-2">
  <div class="flex flex-col gap-2">
<div class="dropdown dropdown-no-hover w-full max-w-md">
  <label class="form-control w-full">
    <span class="label"><span class="label-text">Wash medium</span></span>
    <button type="button" role="combobox" aria-expanded="false" aria-haspopup="listbox" class="btn w-full justify-between border-ink-border font-normal cursor-pointer">
      <span class="truncate text-base-content/50">Search mediums…</span>
      <svg class="size-4 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
    </button>
  </label>

</div>
  </div>
  <div class="flex flex-col gap-2">
<div class="dropdown dropdown-no-hover w-full max-w-md">
  <label class="form-control w-full">
    <span class="label"><span class="label-text">Paper tooth</span></span>
    <button type="button" role="combobox" aria-expanded="false" aria-haspopup="listbox" class="btn w-full justify-between border-ink-border font-normal cursor-pointer">
      <span class="truncate text-base-content/50">Search papers…</span>
      <svg class="size-4 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
    </button>
  </label>

</div>
  </div>
</div>`

const responsiveJsx = `<div className="grid gap-4 sm:grid-cols-2">
  <div className="flex flex-col gap-2">
<div className="dropdown dropdown-no-hover w-full max-w-md">
  <label className="form-control w-full">
    <span className="label"><span className="label-text">Wash medium</span></span>
    <button type="button" role="combobox" aria-expanded="false" aria-haspopup="listbox" className="btn w-full justify-between border-ink-border font-normal cursor-pointer">
      <span className="truncate text-base-content/50">Search mediums…</span>
      <svg className="size-4 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
    </button>
  </label>

</div>
  </div>
  <div className="flex flex-col gap-2">
<div className="dropdown dropdown-no-hover w-full max-w-md">
  <label className="form-control w-full">
    <span className="label"><span className="label-text">Paper tooth</span></span>
    <button type="button" role="combobox" aria-expanded="false" aria-haspopup="listbox" className="btn w-full justify-between border-ink-border font-normal cursor-pointer">
      <span className="truncate text-base-content/50">Search papers…</span>
      <svg className="size-4 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
    </button>
  </label>

</div>
  </div>
</div>`

export default function SearchSelectPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Search Select
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">dropdown</span> has no dedicated
          searchable select. Wash <span className="font-mono text-xs">SearchSelect</span>{' '}
          adds a filter field and flips the menu top or bottom from viewport space
          (bottom default).
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
          
            html={basicHtml}
            jsx={basicJsx}
            svelteFiles={searchSelectSvelteFiles}
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
          
            html={sizesColorsHtml}
            jsx={sizesColorsJsx}
            svelteFiles={searchSelectSvelteFiles}
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
          
            html={iconsHtml}
            jsx={iconsJsx}
            svelteFiles={searchSelectSvelteFiles}
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
          
            html={studioHtml}
            jsx={studioJsx}
            svelteFiles={searchSelectSvelteFiles}
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
                                defaultQuery="zzzx"
                                forceOpen
                                emptyMessage="No pigments match."
                              />
                            </Sample>
                          </div>
              </>
            }
          
            html={disabledHtml}
            jsx={disabledJsx}
            svelteFiles={searchSelectSvelteFiles}
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
          
            html={requiredHtml}
            jsx={requiredJsx}
            svelteFiles={searchSelectSvelteFiles}
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
          
            html={responsiveHtml}
            jsx={responsiveJsx}
            svelteFiles={searchSelectSvelteFiles}
          />
        </Section>
      </div>
    </>
  )
}
