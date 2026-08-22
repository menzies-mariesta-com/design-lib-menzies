import { useEffect, useMemo, useRef, useState, type ToggleEvent } from 'react'
import { Check, Paintbrush, Search } from '../icons'
import {
  DROPDOWN_PANEL_OVERFLOW,
  useDetailsDropdownPlacement,
} from '../lib/dropdownPlacement'
import {
  applyBrushPreset,
  BRUSH_CHANGE_EVENT,
  brushGroups,
  filterBrushPresets,
  getBrushPreset,
  groupLabels,
  readStoredBrush,
  tipLabels,
  type BrushChangeDetail,
  type BrushGroup,
  type BrushState,
} from '../brush'

export function BrushSwitcher() {
  const [brush, setBrush] = useState<BrushState>(() => readStoredBrush())
  const [query, setQuery] = useState('')
  const [group, setGroup] = useState<BrushGroup | 'all'>('all')
  const detailsRef = useRef<HTMLDetailsElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const { placement, className: dropdownClass, onToggle } =
    useDetailsDropdownPlacement(detailsRef, { panelWidth: 320, panelHeight: 420 }, true)

  const filtered = useMemo(
    () => filterBrushPresets(query, group),
    [query, group],
  )

  useEffect(() => {
    setBrush(readStoredBrush())
  }, [])

  useEffect(() => {
    function onBrushChange(event: Event) {
      const detail = (event as CustomEvent<BrushChangeDetail>).detail
      if (!detail) return
      setBrush(detail)
    }

    window.addEventListener(BRUSH_CHANGE_EVENT, onBrushChange)
    return () => window.removeEventListener(BRUSH_CHANGE_EVENT, onBrushChange)
  }, [])

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      const el = detailsRef.current
      if (!el?.open) return
      if (event.target instanceof Node && !el.contains(event.target)) {
        el.open = false
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && detailsRef.current?.open) {
        detailsRef.current.open = false
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  function handleToggle(event: ToggleEvent<HTMLDetailsElement>) {
    onToggle(event)
    if (event.currentTarget.open) {
      window.setTimeout(() => searchRef.current?.focus(), 0)
    } else {
      setQuery('')
      setGroup('all')
    }
  }

  function selectBrush(id: string) {
    const next = applyBrushPreset(id)
    setBrush(next)
    if (detailsRef.current) detailsRef.current.open = false
  }

  const current = getBrushPreset(brush.id)

  return (
    <details ref={detailsRef} className={dropdownClass} onToggle={handleToggle}>
      <summary
        className="btn btn-ghost ripple cursor-pointer gap-2 border border-ink-border px-2 sm:px-3 [&::-webkit-details-marker]:hidden"
        aria-label={`Brush: ${current.name}`}
      >
        <Paintbrush className="size-4 text-base-content" strokeWidth={2} />
        <span className="hidden max-w-[9rem] truncate text-sm font-medium sm:inline">
          {current.name}
        </span>
      </summary>

      <div
        className={`dropdown-content absolute z-50 w-80 max-w-[min(100vw-1rem,20rem)] rounded-2xl border border-ink-border bg-base-100 p-3 shadow-[var(--shadow-paper-md)] ${DROPDOWN_PANEL_OVERFLOW} ${
          placement.top ? 'bottom-full mb-2 mt-0' : 'mt-2'
        } ${placement.end ? 'right-0' : 'left-0'}`}
        role="listbox"
        aria-label="Brush presets"
      >
        <div
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-2xl"
          aria-hidden
        >
          <span className="absolute -left-6 -top-8 size-36 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--wash-a)_70%,transparent)_0%,transparent_70%)] opacity-80 blur-2xl" />
          <span className="absolute -bottom-10 -right-4 size-32 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--wash-c)_65%,transparent)_0%,transparent_70%)] opacity-70 blur-2xl" />
        </div>
        <p className="label-ink mb-2 px-1">
          Active brush · {tipLabels[brush.tip]} · {brush.size}px
        </p>

        <label className="input input-sm mb-2 flex w-full cursor-text items-center gap-2 border-ink-border bg-base-100/80">
          <Search className="size-3.5 shrink-0 text-ink-muted" strokeWidth={2} />
          <input
            ref={searchRef}
            type="search"
            className="grow cursor-text bg-transparent text-sm outline-none"
            placeholder="Search brushes…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search brush presets"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          />
        </label>

        <div
          className="mb-2 flex gap-1 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Brush groups"
        >
          <button
            type="button"
            role="tab"
            aria-selected={group === 'all'}
            className={`btn btn-xs shrink-0 cursor-pointer ${
              group === 'all' ? 'btn-primary' : 'btn-ghost border border-ink-border'
            }`}
            onClick={(e) => {
              e.stopPropagation()
              setGroup('all')
            }}
          >
            All
          </button>
          {brushGroups.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={group === item.id}
              className={`btn btn-xs shrink-0 cursor-pointer ${
                group === item.id
                  ? 'btn-primary'
                  : 'btn-ghost border border-ink-border'
              }`}
              onClick={(e) => {
                e.stopPropagation()
                setGroup(item.id)
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        <ul className="menu menu-sm w-full gap-0.5 overscroll-contain p-0">
          {filtered.length === 0 ? (
            <li className="px-2 py-3 text-center text-xs text-ink-muted">
              No brushes match.
            </li>
          ) : (
            filtered.map((item) => {
              const active = item.id === brush.id
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    className={`ripple cursor-pointer ${active ? 'menu-wash-active' : ''}`}
                    onClick={() => selectBrush(item.id)}
                  >
                    <span className="flex min-w-0 flex-1 flex-col items-start leading-tight">
                      <span className="font-medium">{item.name}</span>
                      <span className="font-mono text-[0.65rem] text-ink-muted">
                        {tipLabels[item.tip]} · {groupLabels[item.group]} · H
                        {item.hardness} · O{item.opacity}
                      </span>
                    </span>
                    {active ? (
                      <Check className="size-4 shrink-0 text-primary" strokeWidth={2} />
                    ) : null}
                  </button>
                </li>
              )
            })
          )}
        </ul>
      </div>
    </details>
  )
}
