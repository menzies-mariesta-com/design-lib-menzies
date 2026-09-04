import { useEffect, useRef, useState, type ReactNode } from 'react'
import {
  CircleCheck,
  CircleX,
  Info,
  TriangleAlert,
  type WashIcon,
} from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import { ShowcaseTabs } from './components/ShowcaseTabs'

type AlertTone = 'success' | 'error' | 'warning' | 'info'

type SnackbarPlacement = {
  name: string
  className: string
}

const snackPlacements: SnackbarPlacement[] = [
  { name: 'Bottom center', className: 'toast-bottom toast-center' },
  { name: 'Bottom start', className: 'toast-bottom toast-start' },
  { name: 'Bottom end', className: 'toast-bottom toast-end' },
]

const tones: {
  tone: AlertTone
  label: string
  alertClass: string
  Icon: WashIcon
  message: string
}[] = [
  {
    tone: 'success',
    label: 'Success',
    alertClass: 'alert-success',
    Icon: CircleCheck,
    message: 'Changes kept',
  },
  {
    tone: 'error',
    label: 'Error',
    alertClass: 'alert-error',
    Icon: CircleX,
    message: 'Could not undo',
  },
  {
    tone: 'warning',
    label: 'Warning',
    alertClass: 'alert-warning',
    Icon: TriangleAlert,
    message: 'Draft almost gone',
  },
  {
    tone: 'info',
    label: 'Info',
    alertClass: 'alert-info',
    Icon: Info,
    message: 'Synced to desk',
  },
]

type LiveSnack = {
  id: number
  placement: string
  alertClass: string
  Icon?: WashIcon
  message: string
  actionLabel?: string
  onAction?: () => void
}

const SNACK_MS = 2200

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
        <h2 className="font-display text-xl font-semibold md:text-2xl">{title}</h2>
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
}: {
  label: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      {children}
      <ClassLabel value={label} />
    </div>
  )
}

export default function SnackbarPage() {
  const [live, setLive] = useState<LiveSnack | null>(null)
  const [studioNote, setStudioNote] = useState<string | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const noteTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const idRef = useRef(0)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      if (noteTimerRef.current) clearTimeout(noteTimerRef.current)
    }
  }, [])

  function clearSnackTimer() {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  function showSnack(next: Omit<LiveSnack, 'id'>, ms = SNACK_MS) {
    clearSnackTimer()
    idRef.current += 1
    const id = idRef.current
    setLive({ ...next, id })
    timerRef.current = setTimeout(() => {
      setLive((current) => (current?.id === id ? null : current))
    }, ms)
  }

  function dismissSnack() {
    clearSnackTimer()
    setLive(null)
  }

  function flashNote(message: string) {
    if (noteTimerRef.current) clearTimeout(noteTimerRef.current)
    setStudioNote(message)
    noteTimerRef.current = setTimeout(() => setStudioNote(null), 1600)
  }

  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Snackbar
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Composed snackbar pattern from daisyUI{' '}
          <span className="font-mono text-xs">toast</span> and{' '}
          <span className="font-mono text-xs">alert</span> (no dedicated snackbar
          component in daisyUI 5.7.9).
        </p>
      </div>

      {live ? (
        <div
          key={live.id}
          className={`toast z-[100] ${live.placement}`}
          role="status"
          aria-live="polite"
        >
          <div
            role="alert"
            className={`alert shadow-lg ${live.alertClass}`.trim()}
          >
            {live.Icon ? (
              <live.Icon className="size-5 shrink-0" strokeWidth={2} />
            ) : null}
            <span>{live.message}</span>
            {live.actionLabel && live.onAction ? (
              <button
                type="button"
                className="btn btn-ghost btn-xs cursor-pointer"
                onClick={() => {
                  live.onAction?.()
                  dismissSnack()
                }}
              >
                {live.actionLabel}
              </button>
            ) : null}
            <button
              type="button"
              className="btn btn-ghost btn-xs cursor-pointer"
              onClick={dismissSnack}
              aria-label="Dismiss snackbar"
            >
              Dismiss
            </button>
          </div>
        </div>
      ) : null}

      {studioNote ? (
        <div
          className="toast toast-bottom toast-center z-[90]"
          role="status"
          aria-live="polite"
        >
          <div role="alert" className="alert alert-soft alert-info py-2 shadow">
            <span className="text-sm">{studioNote}</span>
          </div>
        </div>
      ) : null}

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Short message bar"
          description="A single line inside toast + alert"
        >
          <ShowcaseTabs
            preview={
              <>
                <Sample label="toast toast-bottom toast-center > alert">
                            <div className="relative min-h-28 overflow-hidden rounded-box border border-ink-border/70 bg-base-100/60">
                              <div className="toast toast-bottom toast-center !absolute z-10">
                                <div role="alert" className="alert shadow-lg">
                                  <span>Wash layer locked</span>
                                </div>
                              </div>
                            </div>
                          </Sample>
                          <div className="mt-3">
                            <ClassLabel value="toast toast-bottom toast-center > alert (composed snackbar)" />
                          </div>
              </>
            }
            html={`alert">
            <div class="relative min-h-28 overflow-hidden rounded-box border border-ink-border/70 bg-base-100/60">
              <div class="toast toast-bottom toast-center !absolute z-10">
                <div role="alert" class="alert shadow-lg">
                  <span>Wash layer locked</span>
                </div>
              </div>
            </div>
          
          <div class="mt-3">
            <ClassLabel value="toast toast-bottom toast-center > alert (composed snackbar)" />
          </div>`}
            jsx={`alert">
            <div className="relative min-h-28 overflow-hidden rounded-box border border-ink-border/70 bg-base-100/60">
              <div className="toast toast-bottom toast-center !absolute z-10">
                <div role="alert" className="alert shadow-lg">
                  <span>Wash layer locked</span>
                </div>
              </div>
            </div>
          
          <div className="mt-3">
            <ClassLabel value="toast toast-bottom toast-center > alert (composed snackbar)" />
          </div>`}
          />
        </Section>

        <Section
          eyebrow="02 · With action"
          title="Undo and Dismiss"
          description="Snackbars often pair a brief message with a single action (Undo)"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                            <Sample label="toast > alert + Undo + Dismiss">
                              <div className="relative min-h-28 overflow-hidden rounded-box border border-ink-border/70 bg-base-100/60">
                                <div className="toast toast-bottom toast-center !absolute z-10">
                                  <div role="alert" className="alert shadow-lg">
                                    <span>Plate archived</span>
                                    <button
                                      type="button"
                                      className="btn btn-ghost btn-xs cursor-pointer"
                                    >
                                      Undo
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-ghost btn-xs cursor-pointer"
                                    >
                                      Dismiss
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </Sample>
                            <Sample label="toast > alert alert-soft + Undo">
                              <div className="relative min-h-28 overflow-hidden rounded-box border border-ink-border/70 bg-base-100/60">
                                <div className="toast toast-bottom toast-start !absolute z-10">
                                  <div role="alert" className="alert alert-soft shadow-lg">
                                    <span>Tag removed</span>
                                    <button
                                      type="button"
                                      className="btn btn-ghost btn-xs cursor-pointer"
                                    >
                                      Undo
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </Sample>
                          </div>
              </>
            }
            html={`<div class="grid gap-4 sm:grid-cols-2">
             alert + Undo + Dismiss">
              <div class="relative min-h-28 overflow-hidden rounded-box border border-ink-border/70 bg-base-100/60">
                <div class="toast toast-bottom toast-center !absolute z-10">
                  <div role="alert" class="alert shadow-lg">
                    <span>Plate archived</span>
                    <button
                      type="button"
                      class="btn btn-ghost btn-xs cursor-pointer"
                    >
                      Undo
                    </button>
                    <button
                      type="button"
                      class="btn btn-ghost btn-xs cursor-pointer"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            
             alert alert-soft + Undo">
              <div class="relative min-h-28 overflow-hidden rounded-box border border-ink-border/70 bg-base-100/60">
                <div class="toast toast-bottom toast-start !absolute z-10">
                  <div role="alert" class="alert alert-soft shadow-lg">
                    <span>Tag removed</span>
                    <button
                      type="button"
                      class="btn btn-ghost btn-xs cursor-pointer"
                    >
                      Undo
                    </button>
                  </div>
                </div>
              </div>
            
          </div>`}
            jsx={`<div className="grid gap-4 sm:grid-cols-2">
             alert + Undo + Dismiss">
              <div className="relative min-h-28 overflow-hidden rounded-box border border-ink-border/70 bg-base-100/60">
                <div className="toast toast-bottom toast-center !absolute z-10">
                  <div role="alert" className="alert shadow-lg">
                    <span>Plate archived</span>
                    <button
                      type="button"
                      className="btn btn-ghost btn-xs cursor-pointer"
                    >
                      Undo
                    </button>
                    <button
                      type="button"
                      className="btn btn-ghost btn-xs cursor-pointer"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            
             alert alert-soft + Undo">
              <div className="relative min-h-28 overflow-hidden rounded-box border border-ink-border/70 bg-base-100/60">
                <div className="toast toast-bottom toast-start !absolute z-10">
                  <div role="alert" className="alert alert-soft shadow-lg">
                    <span>Tag removed</span>
                    <button
                      type="button"
                      className="btn btn-ghost btn-xs cursor-pointer"
                    >
                      Undo
                    </button>
                  </div>
                </div>
              </div>
            
          </div>`}
          />
        </Section>

        <Section
          eyebrow="03 · Colors"
          title="Success, error, info, warning"
          description="Reuse alert color classes"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                            {tones.map(({ label, alertClass, Icon, message }) => (
                              <Sample
                                key={label}
                                label={`toast toast-bottom toast-center > alert ${alertClass}`}
                              >
                                <div className="relative min-h-24 overflow-hidden rounded-box border border-ink-border/70 bg-base-100/60">
                                  <div className="toast toast-bottom toast-center !absolute z-10">
                                    <div role="alert" className={`alert ${alertClass} shadow-lg`}>
                                      <Icon className="size-5 shrink-0" strokeWidth={2} />
                                      <span>{message}</span>
                                    </div>
                                  </div>
                                </div>
                              </Sample>
                            ))}
                          </div>
              </>
            }
            html={`<div class="grid gap-4 sm:grid-cols-2">
            <!-- repeat for each item -->
          </div>`}
            jsx={`<div className="grid gap-4 sm:grid-cols-2">
            {tones.map(({ label, alertClass, Icon, message }) => (
               alert \${alertClass}\`}
              >
                <div className="relative min-h-24 overflow-hidden rounded-box border border-ink-border/70 bg-base-100/60">
                  <div className="toast toast-bottom toast-center !absolute z-10">
                    <div role="alert" className={\`alert \${alertClass} shadow-lg\`}>
                      <Icon className="size-5 shrink-0" strokeWidth={2} />
                      <span>{message}</span>
                    </div>
                  </div>
                </div>
              
            ))}
          </div>`}
          />
        </Section>

        <Section
          eyebrow="04 · Positions"
          title="Bottom-first placements"
          description="Snackbars lean Material: bottom-center and bottom-start first"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-2 sm:grid-cols-3">
                            {snackPlacements.map((p) => (
                              <Sample key={p.className} label={`toast ${p.className}`}>
                                <button
                                  type="button"
                                  className="btn btn-outline btn-sm w-full cursor-pointer"
                                  onClick={() =>
                                    showSnack({
                                      placement: p.className,
                                      alertClass: 'alert',
                                      message: p.name,
                                    })
                                  }
                                >
                                  {p.name}
                                </button>
                              </Sample>
                            ))}
                          </div>
                          <div className="mt-5 relative min-h-40 overflow-hidden rounded-box border border-ink-border/70 bg-base-100/60">
                            <p className="absolute inset-0 flex items-center justify-center text-xs text-ink-muted">
                              Contained bottom placements (static)
                            </p>
                            {snackPlacements.map((p) => (
                              <div
                                key={`static-${p.className}`}
                                className={`toast !absolute ${p.className}`}
                              >
                                <div
                                  role="alert"
                                  className="alert alert-soft py-1 text-xs shadow"
                                >
                                  <span>{p.name}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="mt-3">
                            <ClassLabel value="toast toast-bottom toast-{center|start|end}" />
                          </div>
              </>
            }
            html={`<div class="grid gap-2 sm:grid-cols-3">
            <!-- repeat for each item -->
          </div>
          <div class="mt-5 relative min-h-40 overflow-hidden rounded-box border border-ink-border/70 bg-base-100/60">
            <p class="absolute inset-0 flex items-center justify-center text-xs text-ink-muted">
              Contained bottom placements (static)
            </p>
            <!-- repeat for each item -->
          </div>
          <div class="mt-3">
            
          </div>`}
            jsx={`<div className="grid gap-2 sm:grid-cols-3">
            {snackPlacements.map((p) => (
              
                <button
                  type="button"
                  className="btn btn-outline btn-sm w-full cursor-pointer"
                  onClick={() =>
                    showSnack({
                      placement: p.className,
                      alertClass: 'alert',
                      message: p.name,
                    })
                  }
                >
                  {p.name}
                </button>
              
            ))}
          </div>
          <div className="mt-5 relative min-h-40 overflow-hidden rounded-box border border-ink-border/70 bg-base-100/60">
            <p className="absolute inset-0 flex items-center justify-center text-xs text-ink-muted">
              Contained bottom placements (static)
            </p>
            {snackPlacements.map((p) => (
              <div
                key={\`static-\${p.className}\`}
                className={\`toast !absolute \${p.className}\`}
              >
                <div
                  role="alert"
                  className="alert alert-soft py-1 text-xs shadow"
                >
                  <span>{p.name}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3">
            
          </div>`}
          />
        </Section>

        <Section
          eyebrow="05 · Interactive"
          title="Trigger, auto-dismiss, cleanup"
          description="Live snackbars auto-dismiss (~2.2s)"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              className="btn btn-sm cursor-pointer"
                              onClick={() =>
                                showSnack({
                                  placement: 'toast-bottom toast-center',
                                  alertClass: 'alert',
                                  message: 'Brief snackbar',
                                })
                              }
                            >
                              Show basic
                            </button>
                            {tones.map(({ tone, label, alertClass, Icon, message }) => (
                              <button
                                key={tone}
                                type="button"
                                className={`btn btn-sm cursor-pointer ${
                                  tone === 'success'
                                    ? 'btn-success'
                                    : tone === 'error'
                                      ? 'btn-error'
                                      : tone === 'warning'
                                        ? 'btn-warning'
                                        : 'btn-info'
                                }`}
                                onClick={() =>
                                  showSnack({
                                    placement: 'toast-bottom toast-center',
                                    alertClass,
                                    Icon,
                                    message,
                                  })
                                }
                              >
                                <Icon className="size-4" strokeWidth={2} />
                                {label}
                              </button>
                            ))}
                            <button
                              type="button"
                              className="btn btn-primary btn-sm cursor-pointer"
                              onClick={() =>
                                showSnack(
                                  {
                                    placement: 'toast-bottom toast-center',
                                    alertClass: 'alert',
                                    message: 'Item removed',
                                    actionLabel: 'Undo',
                                    onAction: () => flashNote('Undo applied'),
                                  },
                                  4000,
                                )
                              }
                            >
                              With Undo
                            </button>
                            <button
                              type="button"
                              className="btn btn-ghost btn-sm cursor-pointer"
                              onClick={dismissSnack}
                              disabled={!live}
                            >
                              Dismiss now
                            </button>
                          </div>
                          <div className="mt-3">
                            <ClassLabel value="toast toast-bottom toast-center z-[100] > alert (+ Undo)" />
                          </div>
              </>
            }
            html={`<div class="flex flex-wrap gap-2">
            <button
              type="button"
              class="btn btn-sm cursor-pointer"
              onClick=)
              }
            >
              Show basic
            </button>
            <!-- repeat for each item -->
            <button
              type="button"
              class="btn btn-primary btn-sm cursor-pointer"
              onClick=,
                  4000,
                )
              }
            >
              With Undo
            </button>
            <button
              type="button"
              class="btn btn-ghost btn-sm cursor-pointer"
              onClick=
              disabled=
            >
              Dismiss now
            </button>
          </div>
          <div class="mt-3">
            <ClassLabel value="toast toast-bottom toast-center z-[100] > alert (+ Undo)" />
          </div>`}
            jsx={`<div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="btn btn-sm cursor-pointer"
              onClick={() =>
                showSnack({
                  placement: 'toast-bottom toast-center',
                  alertClass: 'alert',
                  message: 'Brief snackbar',
                })
              }
            >
              Show basic
            </button>
            {tones.map(({ tone, label, alertClass, Icon, message }) => (
              <button
                key={tone}
                type="button"
                className={\`btn btn-sm cursor-pointer \${
                  tone === 'success'
                    ? 'btn-success'
                    : tone === 'error'
                      ? 'btn-error'
                      : tone === 'warning'
                        ? 'btn-warning'
                        : 'btn-info'
                }\`}
                onClick={() =>
                  showSnack({
                    placement: 'toast-bottom toast-center',
                    alertClass,
                    Icon,
                    message,
                  })
                }
              >
                <Icon className="size-4" strokeWidth={2} />
                {label}
              </button>
            ))}
            <button
              type="button"
              className="btn btn-primary btn-sm cursor-pointer"
              onClick={() =>
                showSnack(
                  {
                    placement: 'toast-bottom toast-center',
                    alertClass: 'alert',
                    message: 'Item removed',
                    actionLabel: 'Undo',
                    onAction: () => flashNote('Undo applied'),
                  },
                  4000,
                )
              }
            >
              With Undo
            </button>
            <button
              type="button"
              className="btn btn-ghost btn-sm cursor-pointer"
              onClick={dismissSnack}
              disabled={!live}
            >
              Dismiss now
            </button>
          </div>
          <div className="mt-3">
            <ClassLabel value="toast toast-bottom toast-center z-[100] > alert (+ Undo)" />
          </div>`}
          />
        </Section>

        <Section
          eyebrow="06 · Studio"
          title="Menzies Design snackbars"
          description="Wash saved and Pigment removed with Undo"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              className="btn btn-success btn-sm cursor-pointer"
                              onClick={() =>
                                showSnack(
                                  {
                                    placement: 'toast-bottom toast-center',
                                    alertClass: 'alert-success',
                                    Icon: CircleCheck,
                                    message: 'Wash saved',
                                    actionLabel: 'Undo',
                                    onAction: () => flashNote('Wash save undone'),
                                  },
                                  4000,
                                )
                              }
                            >
                              <CircleCheck className="size-4" strokeWidth={2} />
                              Wash saved
                            </button>
                            <button
                              type="button"
                              className="btn btn-error btn-sm cursor-pointer"
                              onClick={() =>
                                showSnack(
                                  {
                                    placement: 'toast-bottom toast-start',
                                    alertClass: 'alert-error',
                                    Icon: CircleX,
                                    message: 'Pigment removed',
                                    actionLabel: 'Undo',
                                    onAction: () => flashNote('Pigment restored'),
                                  },
                                  4000,
                                )
                              }
                            >
                              <CircleX className="size-4" strokeWidth={2} />
                              Pigment removed
                            </button>
                          </div>
                          <div className="mt-4 grid gap-4 sm:grid-cols-2">
                            <Sample label="toast toast-bottom toast-center > alert-success + Undo">
                              <div className="relative min-h-24 overflow-hidden rounded-box border border-ink-border/70 bg-base-100/60">
                                <div className="toast toast-bottom toast-center !absolute z-10">
                                  <div role="alert" className="alert alert-success shadow-lg">
                                    <CircleCheck className="size-5 shrink-0" strokeWidth={2} />
                                    <span>Wash saved</span>
                                    <button
                                      type="button"
                                      className="btn btn-ghost btn-xs cursor-pointer"
                                    >
                                      Undo
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </Sample>
                            <Sample label="toast toast-bottom toast-start > alert-error + Undo">
                              <div className="relative min-h-24 overflow-hidden rounded-box border border-ink-border/70 bg-base-100/60">
                                <div className="toast toast-bottom toast-start !absolute z-10">
                                  <div role="alert" className="alert alert-error shadow-lg">
                                    <CircleX className="size-5 shrink-0" strokeWidth={2} />
                                    <span>Pigment removed</span>
                                    <button
                                      type="button"
                                      className="btn btn-ghost btn-xs cursor-pointer"
                                    >
                                      Undo
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </Sample>
                          </div>
              </>
            }
            html={`<div class="flex flex-wrap gap-2">
            <button
              type="button"
              class="btn btn-success btn-sm cursor-pointer"
              onClick=,
                  4000,
                )
              }
            >
              <CircleCheck class="size-4" strokeWidth= />
              Wash saved
            </button>
            <button
              type="button"
              class="btn btn-error btn-sm cursor-pointer"
              onClick=,
                  4000,
                )
              }
            >
              <CircleX class="size-4" strokeWidth= />
              Pigment removed
            </button>
          </div>
          <div class="mt-4 grid gap-4 sm:grid-cols-2">
             alert-success + Undo">
              <div class="relative min-h-24 overflow-hidden rounded-box border border-ink-border/70 bg-base-100/60">
                <div class="toast toast-bottom toast-center !absolute z-10">
                  <div role="alert" class="alert alert-success shadow-lg">
                    <CircleCheck class="size-5 shrink-0" strokeWidth= />
                    <span>Wash saved</span>
                    <button
                      type="button"
                      class="btn btn-ghost btn-xs cursor-pointer"
                    >
                      Undo
                    </button>
                  </div>
                </div>
              </div>
            
             alert-error + Undo">
              <div class="relative min-h-24 overflow-hidden rounded-box border border-ink-border/70 bg-base-100/60">
                <div class="toast toast-bottom toast-start !absolute z-10">
                  <div role="alert" class="alert alert-error shadow-lg">
                    <CircleX class="size-5 shrink-0" strokeWidth= />
                    <span>Pigment removed</span>
                    <button
                      type="button"
                      class="btn btn-ghost btn-xs cursor-pointer"
                    >
                      Undo
                    </button>
                  </div>
                </div>
              </div>
            
          </div>`}
            jsx={`<div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="btn btn-success btn-sm cursor-pointer"
              onClick={() =>
                showSnack(
                  {
                    placement: 'toast-bottom toast-center',
                    alertClass: 'alert-success',
                    Icon: CircleCheck,
                    message: 'Wash saved',
                    actionLabel: 'Undo',
                    onAction: () => flashNote('Wash save undone'),
                  },
                  4000,
                )
              }
            >
              <CircleCheck className="size-4" strokeWidth={2} />
              Wash saved
            </button>
            <button
              type="button"
              className="btn btn-error btn-sm cursor-pointer"
              onClick={() =>
                showSnack(
                  {
                    placement: 'toast-bottom toast-start',
                    alertClass: 'alert-error',
                    Icon: CircleX,
                    message: 'Pigment removed',
                    actionLabel: 'Undo',
                    onAction: () => flashNote('Pigment restored'),
                  },
                  4000,
                )
              }
            >
              <CircleX className="size-4" strokeWidth={2} />
              Pigment removed
            </button>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
             alert-success + Undo">
              <div className="relative min-h-24 overflow-hidden rounded-box border border-ink-border/70 bg-base-100/60">
                <div className="toast toast-bottom toast-center !absolute z-10">
                  <div role="alert" className="alert alert-success shadow-lg">
                    <CircleCheck className="size-5 shrink-0" strokeWidth={2} />
                    <span>Wash saved</span>
                    <button
                      type="button"
                      className="btn btn-ghost btn-xs cursor-pointer"
                    >
                      Undo
                    </button>
                  </div>
                </div>
              </div>
            
             alert-error + Undo">
              <div className="relative min-h-24 overflow-hidden rounded-box border border-ink-border/70 bg-base-100/60">
                <div className="toast toast-bottom toast-start !absolute z-10">
                  <div role="alert" className="alert alert-error shadow-lg">
                    <CircleX className="size-5 shrink-0" strokeWidth={2} />
                    <span>Pigment removed</span>
                    <button
                      type="button"
                      className="btn btn-ghost btn-xs cursor-pointer"
                    >
                      Undo
                    </button>
                  </div>
                </div>
              </div>
            
          </div>`}
          />
        </Section>

        <Section
          eyebrow="07 · Responsive"
          title="Viewport notes"
          description="Keep snackbars thumb-reachable and short"
        >
          <ShowcaseTabs
            preview={
              <>
                <ul className="list-inside list-disc space-y-2 text-sm text-ink-muted">
                            <li>
                              Mobile (~360-430px): prefer{' '}
                              <span className="font-mono text-xs">toast-bottom toast-center</span>{' '}
                              so the bar stays centered above the home indicator.
                            </li>
                            <li>
                              Tablet (~768-1024px):{' '}
                              <span className="font-mono text-xs">toast-bottom toast-start</span>{' '}
                              works when a side drawer is open.
                            </li>
                            <li>
                              Desktop (~1280px+): bottom-center remains the snackbar default.
                              Reserve bottom-end for Toast CRUD feedback.
                            </li>
                            <li>
                              Gallery static samples nest toast in{' '}
                              <span className="font-mono text-xs">relative</span> panels with{' '}
                              <span className="font-mono text-xs">!absolute</span>. Live triggers
                              use page-level toast with timer cleanup on unmount.
                            </li>
                          </ul>
                          <div className="mt-4">
                            <ClassLabel value="toast toast-bottom toast-center z-[100] (snackbar default)" />
                          </div>
              </>
            }
            html={`<ul class="list-inside list-disc space-y-2 text-sm text-ink-muted">
            <li>
              Mobile (~360-430px): prefer
              <span class="font-mono text-xs">toast-bottom toast-center</span>
              so the bar stays centered above the home indicator.
            </li>
            <li>
              Tablet (~768-1024px):
              <span class="font-mono text-xs">toast-bottom toast-start</span>
              works when a side drawer is open.
            </li>
            <li>
              Desktop (~1280px+): bottom-center remains the snackbar default.
              Reserve bottom-end for Toast CRUD feedback.
            </li>
            <li>
              Gallery static samples nest toast in
              <span class="font-mono text-xs">relative</span> panels with
              <span class="font-mono text-xs">!absolute</span>. Live triggers
              use page-level toast with timer cleanup on unmount.
            </li>
          </ul>
          <div class="mt-4">
            
          </div>`}
            jsx={`<ul className="list-inside list-disc space-y-2 text-sm text-ink-muted">
            <li>
              Mobile (~360-430px): prefer{' '}
              <span className="font-mono text-xs">toast-bottom toast-center</span>{' '}
              so the bar stays centered above the home indicator.
            </li>
            <li>
              Tablet (~768-1024px):{' '}
              <span className="font-mono text-xs">toast-bottom toast-start</span>{' '}
              works when a side drawer is open.
            </li>
            <li>
              Desktop (~1280px+): bottom-center remains the snackbar default.
              Reserve bottom-end for Toast CRUD feedback.
            </li>
            <li>
              Gallery static samples nest toast in{' '}
              <span className="font-mono text-xs">relative</span> panels with{' '}
              <span className="font-mono text-xs">!absolute</span>. Live triggers
              use page-level toast with timer cleanup on unmount.
            </li>
          </ul>
          <div className="mt-4">
            
          </div>`}
          />
        </Section>
      </div>
    </>
  )
}
