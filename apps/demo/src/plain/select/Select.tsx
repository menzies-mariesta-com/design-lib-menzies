import {
  Fragment,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from 'react'
import { useWashId } from '../a11y'
import {
  DROPDOWN_PANEL_Z,
  dropdownPanelStyle,
  dropdownPlacementClassName,
} from '../lib/dropdownPlacement'
import { useDropdownPlacement } from '../hooks/useDropdownPlacement'
import { Check, ChevronDown } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'

export type SelectOption = {
  value: string
  label: string
  disabled?: boolean
}

export type SelectOptionGroup = {
  label: string
  options: readonly SelectOption[]
}

/**
 * Menu panel width strategy.
 * - `'trigger'` (default): match the trigger’s measured width (absolute overlay; table-safe)
 * - `'auto'`: no inline width (content / `menuClassName` utilities)
 * - number: pixels
 * - string: any CSS length (e.g. `'12rem'`, `'min(100%, 20rem)'`)
 */
export type SelectMenuWidth = 'trigger' | 'auto' | number | string

export type SelectProps = {
  options: readonly (SelectOption | SelectOptionGroup)[]
  label?: ReactNode
  hint?: ReactNode
  placeholder?: string
  /** Controlled selected value. */
  value?: string
  /** Uncontrolled initial value. */
  defaultValue?: string
  onChange?: (value: string) => void
  disabled?: boolean
  required?: boolean
  name?: string
  id?: string
  /**
   * Classes on the trigger (sizes / colors: `select-sm`, `select-primary`).
   * Root dropdown chrome uses placement classes only.
   */
  className?: string
  /**
   * Dropdown panel width. Default `'trigger'` sets absolute overlay `width` /
   * `maxWidth` from the trigger’s `getBoundingClientRect` (ResizeObserver while
   * open). Does not grow table cells or document flow. Use a px number, CSS
   * length, or `'auto'` + `menuClassName` (e.g. `w-72 max-w-none`) to customize.
   */
  menuWidth?: SelectMenuWidth
  /** Extra classes on the absolute dropdown panel (width utilities, padding, …). */
  menuClassName?: string
  /** Keep the menu open (demos / forced preview). */
  forceOpen?: boolean
  'aria-label'?: string
}

function resolveMenuPanelStyle(
  menuWidth: SelectMenuWidth,
  triggerWidthPx: number | null,
): CSSProperties | undefined {
  if (menuWidth === 'auto') return undefined
  if (menuWidth === 'trigger') {
    if (triggerWidthPx == null || triggerWidthPx <= 0) return undefined
    return {
      width: triggerWidthPx,
      minWidth: triggerWidthPx,
      maxWidth: triggerWidthPx,
    }
  }
  if (typeof menuWidth === 'number') {
    return {
      width: menuWidth,
      minWidth: menuWidth,
      maxWidth: menuWidth,
    }
  }
  return {
    width: menuWidth,
    minWidth: menuWidth,
    maxWidth: menuWidth,
  }
}

function isOptionGroup(
  item: SelectOption | SelectOptionGroup,
): item is SelectOptionGroup {
  return 'options' in item && Array.isArray((item as SelectOptionGroup).options)
}

function flattenOptions(
  items: readonly (SelectOption | SelectOptionGroup)[],
): SelectOption[] {
  const out: SelectOption[] = []
  for (const item of items) {
    if (isOptionGroup(item)) out.push(...item.options)
    else out.push(item)
  }
  return out
}

/**
 * Wash select: daisyUI-styled trigger + custom listbox menu (not the OS picker).
 * Placement flips top/bottom from viewport space; outside click + Escape close.
 * Menu width defaults to the trigger (absolute overlay; table-cell safe).
 */
export function Select({
  options,
  label,
  hint,
  placeholder = 'Choose…',
  value: valueProp,
  defaultValue = '',
  onChange,
  disabled = false,
  required = false,
  name,
  id,
  className = '',
  menuWidth = 'trigger',
  menuClassName = '',
  forceOpen = false,
  'aria-label': ariaLabel,
}: SelectProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const listId = useId()
  const autoId = useWashId('select')
  const selectId = id ?? autoId
  const labelId = `${selectId}-label`

  const flat = flattenOptions(options)
  const [open, setOpen] = useState(forceOpen)
  const [uncontrolled, setUncontrolled] = useState(defaultValue)
  const [triggerWidthPx, setTriggerWidthPx] = useState<number | null>(null)
  const controlled = valueProp !== undefined
  const value = controlled ? valueProp : uncontrolled

  const menuOpen = (open || forceOpen) && !disabled

  useLayoutEffect(() => {
    if (!menuOpen || menuWidth !== 'trigger') {
      setTriggerWidthPx(null)
      return
    }

    function measure() {
      const node = triggerRef.current
      if (!node) return
      const width = node.getBoundingClientRect().width
      setTriggerWidthPx(width > 0 ? Math.round(width) : null)
    }

    measure()
    const node = triggerRef.current
    const ro =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null
    if (node) ro?.observe(node)
    window.addEventListener('resize', measure)
    return () => {
      ro?.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [menuOpen, menuWidth])

  const placementPanelWidth =
    menuWidth === 'trigger' && triggerWidthPx != null
      ? triggerWidthPx
      : typeof menuWidth === 'number'
        ? menuWidth
        : 320

  const placement = useDropdownPlacement(rootRef, menuOpen, {
    panelWidth: placementPanelWidth,
    panelHeight: 280,
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

  const selected = flat.find((opt) => opt.value === value) ?? null

  function commit(next: string) {
    if (!controlled) setUncontrolled(next)
    onChange?.(next)
    if (!forceOpen) setOpen(false)
  }

  function toggle() {
    if (disabled) return
    setOpen((prev) => !prev)
  }

  const rootClass = dropdownPlacementClassName(
    placement,
    `dropdown-no-hover w-full ${menuOpen ? 'dropdown-open' : ''}`.trim(),
  )

  const triggerClass = [
    'select wash-select--icon inline-flex w-full cursor-pointer items-center justify-between gap-2 border-ink-border text-start font-normal',
    disabled && 'cursor-not-allowed opacity-60',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const widthStyle = resolveMenuPanelStyle(menuWidth, triggerWidthPx)
  const menuPanelStyle: CSSProperties = {
    ...(dropdownPanelStyle(placement) as CSSProperties),
    ...widthStyle,
  }

  function renderOption(opt: SelectOption) {
    const active = value === opt.value
    return (
      <li key={opt.value} role="option" aria-selected={active}>
        <button
          type="button"
          disabled={opt.disabled}
          className={[
            'cursor-pointer',
            active && 'active',
            opt.disabled && 'cursor-not-allowed opacity-50',
          ]
            .filter(Boolean)
            .join(' ')}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => {
            if (!opt.disabled) commit(opt.value)
          }}
        >
          <span className="truncate">{opt.label}</span>
          {active ? (
            <Check className="size-4 opacity-70" strokeWidth={2} aria-hidden />
          ) : null}
        </button>
      </li>
    )
  }

  return (
    <div ref={rootRef} className={rootClass}>
      <div className="form-control w-full min-w-0">
        {label ? (
          <span className="label">
            <span className="label-text" id={labelId}>
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
          id={selectId}
          role="combobox"
          aria-expanded={menuOpen}
          aria-controls={listId}
          aria-haspopup="listbox"
          aria-required={required || undefined}
          aria-labelledby={label ? labelId : undefined}
          aria-label={ariaLabel}
          disabled={disabled}
          className={triggerClass}
          onClick={toggle}
        >
          <span
            className={
              selected ? 'min-w-0 flex-1 truncate' : 'min-w-0 flex-1 truncate text-base-content/50'
            }
          >
            {selected?.label ?? placeholder}
          </span>
          <ChevronDown
            className={[
              'size-5 shrink-0 opacity-60',
              disabled && 'opacity-40',
            ]
              .filter(Boolean)
              .join(' ')}
            strokeWidth={2}
            aria-hidden
          />
        </button>

        {name || required ? (
          <input
            type="text"
            className="sr-only"
            tabIndex={-1}
            name={name}
            required={required}
            disabled={disabled}
            value={value}
            onChange={() => undefined}
            aria-hidden="true"
          />
        ) : null}

        {hint ? (
          <span className="label">
            <span className="label-text-alt">{hint}</span>
          </span>
        ) : null}
      </div>

      {menuOpen ? (
        <div
          className={[
            'dropdown-content',
            DROPDOWN_PANEL_Z,
            placement.top ? 'mb-1' : 'mt-1',
            // Width comes from inline style when menuWidth is trigger/number/CSS.
            // `auto` falls back to full trigger host + shared max-w cap.
            menuWidth === 'auto'
              ? 'w-full max-w-[min(100vw-1rem,24rem)]'
              : '',
            'overflow-x-hidden overflow-y-auto rounded-box border border-ink-border bg-base-100 p-2 shadow-[var(--shadow-paper-md)]',
            menuClassName,
          ]
            .filter(Boolean)
            .join(' ')}
          style={menuPanelStyle}
        >
          <ul
            id={listId}
            role="listbox"
            className="menu flex w-full flex-col flex-nowrap overflow-y-auto overflow-x-hidden rounded-box p-0"
            tabIndex={-1}
          >
            {options.length === 0 ? (
              <li className="px-3 py-2 text-sm text-ink-muted">No options</li>
            ) : (
              options.map((item) => {
                if (isOptionGroup(item)) {
                  return (
                    <Fragment key={`group-${item.label}`}>
                      <li className="menu-title">{item.label}</li>
                      {item.options.map(renderOption)}
                    </Fragment>
                  )
                }
                return renderOption(item)
              })
            )}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

export type TableShellProps = HTMLAttributes<HTMLDivElement> & {
  header: ReactNode
  body: ReactNode
  footer?: ReactNode
  /** Min height for the scroll body. */
  bodyClassName?: string
}

/**
 * Sticky header + scroll body + sticky footer shell for data tables.
 *
 * Typical chrome (see demo Data table template):
 * - `header`: `DataTableHeader` (title + description) and/or sticky thead
 * - `body`: scrollable tbody region
 * - `footer`: `DataTableFooterBar` (per-page left; Showing centered, hidden
 *   below sm; paginator right via 1fr auto 1fr), then optional `DataTableLegendsRow`. Header actions hold Export / Refresh / Add.
 *
 * Mark columns for legends with `DataTableColumnDef.legend` and
 * `resolveColumnLegends(columns)`.
 */
export function TableShell({
  header,
  body,
  footer,
  className,
  bodyClassName,
  ...rest
}: TableShellProps) {
  return (
    <div
      className={[
        'wash-allow-dropdown-overflow flex min-h-0 flex-1 flex-col overflow-hidden',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      <div className="shrink-0">{header}</div>
      <div
        className={[
          'wash-allow-dropdown-overflow min-h-0 flex-1 overflow-auto',
          bodyClassName,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {body}
      </div>
      {footer ? <div className="shrink-0">{footer}</div> : null}
    </div>
  )
}

export type AlertProps = HTMLAttributes<HTMLDivElement> & {
  tone?: 'info' | 'success' | 'warning' | 'error'
  soft?: boolean
  children: ReactNode
}

export function Alert({
  tone = 'info',
  soft,
  className,
  children,
  ...rest
}: AlertProps) {
  return (
    <div
      role="alert"
      className={[
        'alert',
        soft && 'alert-soft',
        `alert-${tone}`,
        'border border-ink-border',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </div>
  )
}
