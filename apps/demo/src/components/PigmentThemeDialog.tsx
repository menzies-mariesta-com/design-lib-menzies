import { useEffect, useId, useMemo, useRef, type ReactNode } from 'react'
import { Check, X } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import { ShowcaseTabs } from './ShowcaseTabs'
import {
  getPigmentThemeCss,
  getPigmentThemeHtmlUsage,
  getPigmentThemeJsxUsage,
  getPigmentThemeKotlinUsage,
  getPigmentThemeSvelteUsage,
} from '../data/pigmentThemeSource'
import {
  watercolorThemes,
  type ThemeMode,
  type WatercolorThemeId,
} from '../themes'

export type PigmentTheme = (typeof watercolorThemes)[number]

function openDialog(el: HTMLDialogElement | null) {
  if (!el) return
  if (typeof el.showModal === 'function') el.showModal()
}

function closeDialog(el: HTMLDialogElement | null) {
  if (!el) return
  if (typeof el.close === 'function') el.close()
}

const previewRoles = [
  { name: 'Primary', bg: 'bg-primary', content: 'text-primary-content' },
  { name: 'Secondary', bg: 'bg-secondary', content: 'text-secondary-content' },
  { name: 'Accent', bg: 'bg-accent', content: 'text-accent-content' },
  { name: 'Neutral', bg: 'bg-neutral', content: 'text-neutral-content' },
  { name: 'Base 100', bg: 'bg-base-100', content: 'text-base-content' },
  { name: 'Base 200', bg: 'bg-base-200', content: 'text-base-content' },
] as const

export function PigmentThemeDialog({
  theme,
  activePigment,
  mode,
  onClose,
  onApply,
}: {
  theme: PigmentTheme | null
  activePigment: WatercolorThemeId
  mode: ThemeMode
  onClose: () => void
  onApply: (id: WatercolorThemeId) => void
}) {
  const dialogId = useId()
  const dialogRef = useRef<HTMLDialogElement>(null)

  const snippets = useMemo(() => {
    if (!theme) return null
    return {
      css: getPigmentThemeCss(theme.id),
      html: getPigmentThemeHtmlUsage(theme.id),
      jsx: getPigmentThemeJsxUsage(theme.id),
      svelte: getPigmentThemeSvelteUsage(theme.id),
      kotlin: getPigmentThemeKotlinUsage(theme.id),
    }
  }, [theme])

  useEffect(() => {
    if (theme) openDialog(dialogRef.current)
  }, [theme])

  const isActive = theme?.id === activePigment

  return (
    <dialog
      ref={dialogRef}
      id={dialogId}
      className="modal"
      onClose={onClose}
    >
      {theme && snippets ? (
        <div className="modal-box max-w-4xl">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="card-title text-primary font-bold">{theme.label}</h2>
              <p className="mt-1 text-sm text-ink-muted">{theme.note}</p>
              <p className="mt-1 font-mono text-xs text-ink-muted">
                data-theme=&quot;{theme.id}&quot; · {theme.id}-dark
              </p>
            </div>
            <form method="dialog">
              <div
                className="tooltip tooltip-primary tooltip-left"
                data-tip="Close"
              >
                <button
                  type="submit"
                  className="btn btn-ghost btn-square btn-sm btn-primary cursor-pointer"
                  aria-label="Close"
                  onClick={() => closeDialog(dialogRef.current)}
                >
                  <X className="size-4" strokeWidth={1.75} aria-hidden="true" />
                </button>
              </div>
            </form>
          </div>

          <ShowcaseTabs
            className="mt-4"
            defaultTab="css"
            css={snippets.css}
            html={snippets.html}
            jsx={snippets.jsx}
            svelte={snippets.svelte}
            kotlin={snippets.kotlin}
            preview={
              <div
                className="flex min-h-56 flex-col gap-4 rounded-box"
                data-theme={theme.id}
              >
                <div
                  className="relative flex h-24 items-end justify-between rounded-box border border-ink-border/60 p-3"
                  style={{
                    background: `radial-gradient(circle at 35% 30%, color-mix(in oklab, white 70%, transparent) 0%, ${theme.swatch} 55%, color-mix(in oklab, ${theme.swatch} 70%, black) 100%)`,
                  }}
                >
                  <span className="rounded-box bg-base-100/90 px-2 py-1 font-display text-sm font-semibold text-base-content">
                    {theme.label}
                  </span>
                  <span className="font-mono text-[0.65rem] text-base-100 drop-shadow">
                    {theme.swatch}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                  {previewRoles.map((swatch) => (
                    <div
                      key={swatch.name}
                      className={`flex h-12 items-end rounded-lg border border-ink-border/50 p-1.5 ${swatch.bg} ${swatch.content}`}
                    >
                      <span className="text-[0.6rem] font-medium leading-tight">
                        {swatch.name}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-ink-muted">
                  Source from{' '}
                  <code className="font-mono">menzies-design-wash-ui/styles/themes.css</code>
                  . Import{' '}
                  <code className="font-mono">
                    @menzies-mariesta-com/menzies-design-wash-ui/styles.css
                  </code>{' '}
                  (or use <code className="font-mono">applyTheme</code> /{' '}
                  <code className="font-mono">WashProvider</code>).
                </p>
              </div>
            }
          />

          <div className="modal-action flex-wrap gap-2">
            <button
              type="button"
              className={`btn cursor-pointer ${isActive ? 'btn-disabled cursor-not-allowed' : 'btn-primary'}`}
              disabled={isActive}
              onClick={() => onApply(theme.id)}
            >
              {isActive ? `Active · ${mode}` : 'Apply pigment'}
            </button>
            <form method="dialog">
              <button type="submit" className="btn cursor-pointer">
                Close
              </button>
            </form>
          </div>
        </div>
      ) : null}
      <form method="dialog" className="modal-backdrop">
        <button type="submit" className="cursor-pointer">
          close
        </button>
      </form>
    </dialog>
  )
}

export function PigmentThemeCard({
  theme,
  active,
  onOpen,
}: {
  theme: PigmentTheme
  active: boolean
  onOpen: () => void
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={`Open ${theme.label} pigment theme code`}
      className={`flex cursor-pointer flex-col gap-2 rounded-box border p-2 text-left transition-[box-shadow,border-color] ${
        active
          ? 'border-primary shadow-[var(--shadow-paper-sm)] dry-brush'
          : 'border-ink-border hover:border-primary/40'
      }`}
      onClick={onOpen}
    >
      <div
        className="relative flex h-16 items-end justify-between rounded-lg border border-ink-border/60 p-2"
        style={{
          background: `radial-gradient(circle at 35% 30%, color-mix(in oklab, white 70%, transparent) 0%, ${theme.swatch} 55%, color-mix(in oklab, ${theme.swatch} 70%, black) 100%)`,
        }}
      >
        {active ? (
          <span className="absolute right-1.5 top-1.5 flex size-6 items-center justify-center rounded-full bg-base-100/90 text-primary">
            <Check className="size-3.5" strokeWidth={2.5} />
          </span>
        ) : null}
      </div>
      <div className="min-w-0 px-0.5">
        <p className="font-display text-sm font-semibold leading-tight">
          {theme.label}
        </p>
        <p className="mt-0.5 font-mono text-[0.65rem] text-ink-muted">
          {theme.note}
        </p>
        <code className="font-mono text-[0.65rem] text-ink-muted">{theme.id}</code>
      </div>
    </button>
  )
}

export function PigmentThemeCompactRow({
  theme,
  active,
  onOpen,
}: {
  theme: PigmentTheme
  active?: boolean
  onOpen: () => void
}): ReactNode {
  return (
    <button
      type="button"
      aria-label={`Open ${theme.label} pigment theme code`}
      className={`flex cursor-pointer items-center gap-2 rounded-box border p-2 text-left transition-[border-color,box-shadow] ${
        active
          ? 'border-primary shadow-[var(--shadow-paper-sm)]'
          : 'border-ink-border hover:border-primary/40'
      }`}
      onClick={onOpen}
    >
      <span
        className="size-8 shrink-0 rounded-full border border-ink-border"
        style={{ background: theme.swatch }}
        aria-hidden
      />
      <div className="min-w-0">
        <p className="truncate text-sm font-medium">{theme.label}</p>
        <p className="truncate font-mono text-[0.65rem] text-ink-muted">
          {theme.id}
        </p>
      </div>
    </button>
  )
}
