import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'
import { Check, ChevronsUpDown, Search } from '../icons'
import {
  DROPDOWN_PANEL_Z,
  dropdownPlacementClassName,
  mergeDropdownPanelStyle,
  resolveTriggerMatchedPanelStyle,
} from '../lib/dropdownPlacement'
import {
  DROPDOWN_HOVER_MEDIA,
  useDivDropdownHover,
  useDropdownPlacement,
  useTriggerWidthPx,
} from '../hooks/useDropdownPlacement'
import {
  formatMultiSelectTrigger,
  toggleSelectValues,
} from '../lib/selectValue'

export type SearchSelectOption = {
  value: string
  label: string
  disabled?: boolean
}

type SearchSelectPropsShared = {
  options: readonly (string | SearchSelectOption)[]
  label?: ReactNode
  placeholder?: string
  required?: boolean
  disabled?: boolean
  emptyMessage?: string
  filterPlaceholder?: string
  triggerClassName?: string
  inputClassName?: string
  className?: string
  forceOpen?: boolean
  defaultQuery?: string
  id?: string
  name?: string
  maxTriggerLabels?: number
  /** Fine-pointer hover open (default true). Touch uses click. */
  openOnHover?: boolean
}

export type SearchSelectProps =
  | (SearchSelectPropsShared & {
      multiple?: false
      value?: string | null
      defaultValue?: string | null
      onChange?: (value: string | null) => void
      onPick?: (value: string) => void
    })
  | (SearchSelectPropsShared & {
      multiple: true
      value?: string[]
      defaultValue?: string[]
      onChange?: (value: string[]) => void
      onPick?: (value: string) => void
    })

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
export function SearchSelect(props: SearchSelectProps) {
  const {
    options,
    label,
    placeholder = 'Choose…',
    required = false,
    disabled = false,
    emptyMessage = 'No options match.',
    filterPlaceholder = 'Type to filter…',
    triggerClassName = '',
    inputClassName = '',
    className = '',
    forceOpen = false,
    defaultQuery = '',
    id,
    name,
    maxTriggerLabels = 2,
    openOnHover = true,
  } = props
  const multiple = props.multiple === true
  const valueProp = props.value
  const onChange = props.onChange
  const onPick = props.onPick

  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const listId = useId()
  const autoId = useId()
  const labelId = id ?? autoId

  const normalized = normalizeOptions(options)
  const optionOrder = useMemo(
    () => normalized.map((o) => o.value),
    [normalized],
  )
  const [open, setOpen] = useState(forceOpen)
  const [query, setQuery] = useState(defaultQuery)
  const [uncontrolledSingle, setUncontrolledSingle] = useState<string | null>(
    !multiple ? (props.defaultValue ?? null) : null,
  )
  const [uncontrolledMulti, setUncontrolledMulti] = useState<string[]>(
    multiple ? (props.defaultValue ?? []) : [],
  )
  const controlled = valueProp !== undefined
  const valueSingle = controlled
    ? (valueProp as string | null)
    : uncontrolledSingle
  const valueMulti = controlled
    ? (valueProp as string[])
    : uncontrolledMulti
  const selectedSet = useMemo(
    () => new Set(valueMulti),
    [valueMulti],
  )

  const menuOpen = (open || forceOpen) && !disabled
  const triggerWidthPx = useTriggerWidthPx(triggerRef, menuOpen)
  const placement = useDropdownPlacement(rootRef, menuOpen, {
    panelWidth: triggerWidthPx ?? 320,
    panelHeight: 320,
  })
  const menuPanelStyle: CSSProperties = mergeDropdownPanelStyle(
    placement,
    resolveTriggerMatchedPanelStyle(triggerWidthPx),
  ) as CSSProperties

  const openMenu = useCallback(() => {
    if (!disabled) setOpen(true)
  }, [disabled])

  const closeMenu = useCallback(() => {
    if (!forceOpen) setOpen(false)
  }, [forceOpen])

  useDivDropdownHover(rootRef, {
    disabled,
    forceOpen,
    hover: openOnHover,
    onOpen: openMenu,
    onClose: closeMenu,
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

  const selected = multiple
    ? null
    : normalized.find((opt) => opt.value === valueSingle) ?? null

  const triggerLabel = multiple
    ? formatMultiSelectTrigger(
        valueMulti,
        (v) => normalized.find((o) => o.value === v)?.label ?? v,
        placeholder,
        maxTriggerLabels,
      )
    : (selected?.label ?? placeholder)

  const hasSelection = multiple ? valueMulti.length > 0 : Boolean(selected)

  const matches = normalized.filter((opt) => {
    if (!query.trim()) return true
    return filterText(query, opt.label) || filterText(query, opt.value)
  })

  function commitSingle(next: string) {
    if (!controlled) setUncontrolledSingle(next)
    ;(onChange as ((value: string | null) => void) | undefined)?.(next)
    onPick?.(next)
    setQuery('')
    if (!forceOpen) setOpen(false)
  }

  function commitMulti(toggleValue: string) {
    const next = toggleSelectValues(valueMulti, toggleValue, optionOrder)
    if (!controlled) setUncontrolledMulti(next)
    ;(onChange as ((value: string[]) => void) | undefined)?.(next)
    onPick?.(toggleValue)
  }

  function toggle() {
    if (disabled) return
    if (
      typeof window !== 'undefined' &&
      window.matchMedia(DROPDOWN_HOVER_MEDIA).matches &&
      openOnHover
    ) {
      return
    }
    setOpen((prev) => !prev)
  }

  const rootClass = dropdownPlacementClassName(
    placement,
    `dropdown w-full max-w-md ${menuOpen ? 'dropdown-open' : ''} ${className}`.trim(),
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
          ref={triggerRef}
          type="button"
          role="combobox"
          aria-expanded={menuOpen}
          aria-controls={listId}
          aria-haspopup="listbox"
          {...(multiple ? { 'aria-multiselectable': true } : {})}
          aria-required={required || undefined}
          aria-labelledby={label ? `${labelId}-label` : undefined}
          disabled={disabled}
          className={`btn w-full justify-between border-ink-border font-normal cursor-pointer ${
            disabled ? 'btn-disabled cursor-not-allowed' : ''
          } ${triggerClassName}`}
          onClick={toggle}
          onFocus={openMenu}
        >
          <span
            className={
              hasSelection ? 'truncate' : 'truncate text-base-content/50'
            }
          >
            {triggerLabel}
          </span>
          <ChevronsUpDown
            className="size-4 shrink-0 opacity-60"
            strokeWidth={2}
          />
        </button>
        {multiple && name
          ? valueMulti.map((v) => (
              <input
                key={v}
                type="hidden"
                name={name}
                value={v}
                disabled={disabled}
                aria-hidden="true"
                tabIndex={-1}
              />
            ))
          : null}
        {!multiple && required ? (
          <input
            type="text"
            className="sr-only"
            tabIndex={-1}
            required
            value={valueSingle ?? ''}
            onChange={() => undefined}
            aria-hidden="true"
          />
        ) : null}
        {multiple && required ? (
          <input
            type="text"
            className="sr-only"
            tabIndex={-1}
            required
            disabled={disabled}
            value={valueMulti.length > 0 ? '1' : ''}
            onChange={() => undefined}
            aria-hidden="true"
          />
        ) : null}
      </label>

      {menuOpen ? (
        <div
          className={`dropdown-content wash-dropdown-trigger-width ${DROPDOWN_PANEL_Z} ${
            placement.top ? 'mb-1' : 'mt-1'
          } overflow-x-hidden overflow-y-auto rounded-box border border-ink-border bg-base-100 p-2 shadow-[var(--shadow-paper-md)] box-border`}
          style={menuPanelStyle}
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
            aria-multiselectable={multiple || undefined}
            className="menu flex w-full flex-col flex-nowrap overflow-y-auto overflow-x-hidden rounded-box p-0"
            tabIndex={-1}
          >
            {matches.length === 0 ? (
              <li className="px-3 py-2 text-sm text-ink-muted">{emptyMessage}</li>
            ) : (
              matches.map((opt) => {
                const active = multiple
                  ? selectedSet.has(opt.value)
                  : valueSingle === opt.value
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
                        if (opt.disabled) return
                        if (multiple) commitMulti(opt.value)
                        else commitSingle(opt.value)
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
