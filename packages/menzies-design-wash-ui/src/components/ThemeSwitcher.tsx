import { useEffect, useRef, useState } from 'react'
import { Check, Moon, Sun, SwatchBook } from '../icons'
import { DROPDOWN_PANEL_OVERFLOW } from '../lib/dropdownPlacement'
import { useDetailsDropdownPlacement } from '../hooks/useDropdownPlacement'
import {
  applyTheme,
  readStoredMode,
  readStoredTheme,
  THEME_CHANGE_EVENT,
  watercolorThemes,
  type ThemeChangeDetail,
  type ThemeMode,
  type WatercolorThemeId,
} from '../theme'

function ModeToggle({
  mode,
  onToggle,
}: {
  mode: ThemeMode
  onToggle: () => void
}) {
  const isDark = mode === 'dark'
  const label = isDark ? 'Switch to light' : 'Switch to dark'

  return (
    <div className="tooltip tooltip-bottom tooltip-secondary" data-tip={label}>
      <button
        type="button"
        className="btn btn-ghost btn-square btn-secondary ripple ripple-secondary cursor-pointer"
        aria-label={label}
        aria-pressed={isDark}
        onClick={onToggle}
      >
        {isDark ? (
          <Sun className="size-5" strokeWidth={2} />
        ) : (
          <Moon className="size-5" strokeWidth={2} />
        )}
      </button>
    </div>
  )
}

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<WatercolorThemeId>('mineral')
  const [mode, setMode] = useState<ThemeMode>('light')
  const detailsRef = useRef<HTMLDetailsElement>(null)
  const { placement, className: dropdownClass, onToggle } =
    useDetailsDropdownPlacement(detailsRef, { panelWidth: 288, panelHeight: 420 }, true)

  useEffect(() => {
    const initialTheme = readStoredTheme()
    const initialMode = readStoredMode()
    setTheme(initialTheme)
    setMode(initialMode)
    applyTheme(initialTheme, initialMode)
  }, [])

  useEffect(() => {
    function onThemeChange(event: Event) {
      const detail = (event as CustomEvent<ThemeChangeDetail>).detail
      if (!detail) return
      setTheme(detail.pigment)
      setMode(detail.mode)
    }

    window.addEventListener(THEME_CHANGE_EVENT, onThemeChange)
    return () => window.removeEventListener(THEME_CHANGE_EVENT, onThemeChange)
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

  function selectTheme(id: WatercolorThemeId) {
    setTheme(id)
    applyTheme(id, mode)
    if (detailsRef.current) detailsRef.current.open = false
  }

  function toggleMode() {
    const next: ThemeMode = mode === 'dark' ? 'light' : 'dark'
    setMode(next)
    applyTheme(theme, next)
  }

  const current = watercolorThemes.find((t) => t.id === theme) ?? watercolorThemes[0]

  return (
    <div className="flex items-center gap-0.5">
      <ModeToggle mode={mode} onToggle={toggleMode} />

      <details
        ref={detailsRef}
        className={dropdownClass}
        onToggle={onToggle}
      >
        <summary
          className="btn btn-ghost ripple cursor-pointer gap-2 border border-ink-border px-2 sm:px-3 [&::-webkit-details-marker]:hidden"
          aria-label={`Theme: ${current.label}`}
        >
          <span
            className="size-3.5 shrink-0 rounded-full border border-ink-border"
            style={{
              background: `radial-gradient(circle at 35% 30%, color-mix(in oklab, white 70%, transparent) 0%, ${current.swatch} 60%, color-mix(in oklab, ${current.swatch} 70%, black) 100%)`,
            }}
            aria-hidden
          />
          <SwatchBook className="size-4 text-base-content sm:hidden" strokeWidth={2} />
          <span className="hidden text-sm font-medium sm:inline">{current.label}</span>
        </summary>

        {/* absolute required: wash-panel sets position:relative and would stretch the navbar */}
        <div
          className={`dropdown-content absolute z-50 w-72 max-w-[min(100vw-1rem,18rem)] rounded-2xl border border-ink-border bg-base-100 p-3 shadow-[var(--shadow-paper-md)] ${DROPDOWN_PANEL_OVERFLOW} ${
            placement.top ? 'bottom-full mb-2 mt-0' : 'mt-2'
          } ${placement.end ? 'right-0' : 'left-0'}`}
          role="listbox"
          aria-label="Watercolor themes"
        >
          <div
            className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-2xl"
            aria-hidden
          >
            <span className="absolute -left-6 -top-8 size-36 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--wash-a)_70%,transparent)_0%,transparent_70%)] opacity-80 blur-2xl" />
            <span className="absolute -bottom-10 -right-4 size-32 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--wash-b)_65%,transparent)_0%,transparent_70%)] opacity-70 blur-2xl" />
          </div>
          <p className="label-ink mb-2 px-1">
            Pigment themes · {watercolorThemes.length}
          </p>
          <ul className="menu menu-sm w-full gap-0.5 overscroll-contain p-0">
            {watercolorThemes.map((item) => {
              const active = item.id === theme
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    className={`ripple cursor-pointer ${active ? 'menu-wash-active' : ''}`}
                    onClick={() => selectTheme(item.id)}
                  >
                    <span
                      className="size-4 shrink-0 rounded-full border border-ink-border"
                      style={{
                        background: `radial-gradient(circle at 35% 30%, color-mix(in oklab, white 70%, transparent) 0%, ${item.swatch} 60%, color-mix(in oklab, ${item.swatch} 70%, black) 100%)`,
                      }}
                      aria-hidden
                    />
                    <span className="flex min-w-0 flex-1 flex-col items-start leading-tight">
                      <span className="flex min-w-0 items-baseline gap-1.5">
                        <span className="truncate font-medium">{item.label}</span>
                        <span className="shrink-0 font-mono text-[0.65rem] uppercase text-ink-muted">
                          {item.swatch}
                        </span>
                      </span>
                      <span className="truncate font-mono text-[0.65rem] text-ink-muted">
                        {item.note}
                      </span>
                    </span>
                    {active ? (
                      <Check className="size-4 shrink-0 text-primary" strokeWidth={2} />
                    ) : null}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </details>
    </div>
  )
}
