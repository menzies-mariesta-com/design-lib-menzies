import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'
import { Check, ChevronsUpDown, Search } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import {
  DROPDOWN_PANEL_OVERFLOW,
  DROPDOWN_PANEL_Z,
  dropdownPanelStyle,
  dropdownPlacementClassName,
} from '../lib/dropdownPlacement'
import { useDropdownPlacement } from '../hooks/useDropdownPlacement'

export type SearchSelectOption = {
  value: string
  label: string
  disabled?: boolean
}

export type SearchSelectProps = {
  options: readonly (string | SearchSelectOption)[]
  label?: ReactNode
  placeholder?: string
  required?: boolean
  disabled?: boolean
  /** Controlled selected value (option value). */
  value?: string | null
  /** Uncontrolled initial value. */
  defaultValue?: string | null
  onChange?: (value: string | null) => void
  /** Called when an option is picked (same as onChange with a string). */
  onPick?: (value: string) => void
  emptyMessage?: string
  filterPlaceholder?: string
  triggerClassName?: string
  inputClassName?: string
  className?: string
  /** Keep the menu open (demos / forced preview). */
  forceOpen?: boolean
  /** Initial filter query (demos / empty-state previews). */
  defaultQuery?: string
  id?: string
}

function normalizeOptions(
  options: readonly (string | SearchSelectOption)[],
): SearchSelectOption[] {
  return options.map((opt) =>
    typeof opt === 'string' ? { value: opt, label: opt } : opt,
  )
}

function filterText(query: string, haystack: string) {
  return haystack.toLowerCase().includes(query.trim().toLowerCase())
}

/**
 * Searchable select (combobox): trigger + filter field + scrollable menu.
 * Placement flips top/bottom from viewport space (bottom default) and caps
 * panel height so the list scrolls instead of overflowing the page.
 */
export function SearchSelect({
  options,
  label,
  placeholder = 'Choose…',
  required = false,
  disabled = false,
  value: valueProp,
  defaultValue = null,
  onChange,
  onPick,
  emptyMessage = 'No options match.',
  filterPlaceholder = 'Type to filter…',
  triggerClassName = '',
  inputClassName = '',
  className = '',
  forceOpen = false,
  defaultQuery = '',
  id,
}: SearchSelectProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const listId = useId()
  const autoId = useId()
  const labelId = id ?? autoId

  const normalized = normalizeOptions(options)
  const [open, setOpen] = useState(forceOpen)
  const [query, setQuery] = useState(defaultQuery)
  const [uncontrolled, setUncontrolled] = useState<string | null>(defaultValue)
  const controlled = valueProp !== undefined
  const value = controlled ? valueProp : uncontrolled

  const menuOpen = (open || forceOpen) && !disabled
  const placement = useDropdownPlacement(rootRef, menuOpen, {
    panelWidth: 448,
    panelHeight: 320,
  })

  useEffect(() => {
    if (forceOpen) setOpen(true)
  }, [forceOpen])

  useEffect(() => {
    if (!menuOpen) return

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
  }, [menuOpen])

  useEffect(() => {
    if (menuOpen) searchRef.current?.focus()
  }, [menuOpen])

  const selected = normalized.find((opt) => opt.value === value) ?? null

  const matches = normalized.filter((opt) => {
    if (!query.trim()) return true
    return filterText(query, opt.label) || filterText(query, opt.value)
  })

  function commit(next: string) {
    if (!controlled) setUncontrolled(next)
    onChange?.(next)
    onPick?.(next)
    setQuery('')
    if (!forceOpen) setOpen(false)
  }

  function toggle() {
    if (disabled) return
    setOpen((prev) => !prev)
  }

  const rootClass = dropdownPlacementClassName(
    placement,
    `dropdown-no-hover w-full max-w-md ${menuOpen ? 'dropdown-open' : ''} ${className}`.trim(),
  )

  return (
    <div ref={rootRef} className={rootClass}>
      <label className="form-control w-full" htmlFor={undefined}>
        {label ? (
          <span className="label">
            <span className="label-text" id={`${labelId}-label`}>
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
        ) : null}
        <button
          type="button"
          role="combobox"
          aria-expanded={menuOpen}
          aria-controls={listId}
          aria-haspopup="listbox"
          aria-required={required || undefined}
          aria-labelledby={label ? `${labelId}-label` : undefined}
          disabled={disabled}
          className={`btn w-full justify-between border-ink-border font-normal cursor-pointer ${
            disabled ? 'btn-disabled cursor-not-allowed' : ''
          } ${triggerClassName}`}
          onClick={toggle}
        >
          <span
            className={selected ? 'truncate' : 'truncate text-base-content/50'}
          >
            {selected?.label ?? placeholder}
          </span>
          <ChevronsUpDown
            className="size-4 shrink-0 opacity-60"
            strokeWidth={2}
          />
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

      {menuOpen ? (
        <div
          className={`dropdown-content ${DROPDOWN_PANEL_Z} ${
            placement.top ? 'mb-1' : 'mt-1'
          } w-full max-w-[min(100vw-1rem,28rem)] rounded-box border border-ink-border bg-base-100 p-2 shadow-[var(--shadow-paper-md)] ${DROPDOWN_PANEL_OVERFLOW}`}
          style={dropdownPanelStyle(placement) as CSSProperties}
        >
          <label className="input input-sm mb-2 w-full cursor-text border-ink-border">
            <Search className="size-3.5 shrink-0 opacity-60" strokeWidth={2} />
            <input
              ref={searchRef}
              type="search"
              value={query}
              placeholder={filterPlaceholder}
              className={`grow cursor-text ${inputClassName}`}
              aria-label={
                typeof label === 'string' ? `Filter ${label}` : 'Filter options'
              }
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
          <ul
            id={listId}
            role="listbox"
            className="menu w-full overflow-y-auto overflow-x-hidden rounded-box p-0"
            tabIndex={-1}
          >
            {matches.length === 0 ? (
              <li className="px-3 py-2 text-sm text-ink-muted">{emptyMessage}</li>
            ) : (
              matches.map((opt) => {
                const active = value === opt.value
                return (
                  <li key={opt.value} role="option" aria-selected={active}>
                    <button
                      type="button"
                      disabled={opt.disabled}
                      className={`cursor-pointer ${active ? 'active' : ''} ${
                        opt.disabled ? 'cursor-not-allowed opacity-50' : ''
                      }`}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => {
                        if (!opt.disabled) commit(opt.value)
                      }}
                    >
                      <span className="truncate">{opt.label}</span>
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
