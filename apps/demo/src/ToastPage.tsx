import { useEffect, useRef, useState, type ReactNode } from 'react'
import {
  CircleCheck,
  CircleX,
  Info,
  TriangleAlert,
  type WashIcon,
} from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import { daisyToJsx } from './snippets/markup/daisyGalleryDefaults'

type AlertTone = 'success' | 'error' | 'warning' | 'info'

type ToastPlacement = {
  name: string
  className: string
  h: 'start' | 'center' | 'end'
  v: 'top' | 'middle' | 'bottom'
}

const placements: ToastPlacement[] = [
  { name: 'Top start', className: 'toast-top toast-start', h: 'start', v: 'top' },
  { name: 'Top center', className: 'toast-top toast-center', h: 'center', v: 'top' },
  { name: 'Top end', className: 'toast-top toast-end', h: 'end', v: 'top' },
  { name: 'Middle start', className: 'toast-middle toast-start', h: 'start', v: 'middle' },
  { name: 'Middle center', className: 'toast-middle toast-center', h: 'center', v: 'middle' },
  { name: 'Middle end', className: 'toast-middle toast-end', h: 'end', v: 'middle' },
  { name: 'Bottom start', className: 'toast-bottom toast-start', h: 'start', v: 'bottom' },
  { name: 'Bottom center', className: 'toast-bottom toast-center', h: 'center', v: 'bottom' },
  { name: 'Bottom end', className: 'toast-bottom toast-end', h: 'end', v: 'bottom' },
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
    message: 'Created successfully',
  },
  {
    tone: 'error',
    label: 'Error',
    alertClass: 'alert-error',
    Icon: CircleX,
    message: 'Could not save changes',
  },
  {
    tone: 'warning',
    label: 'Warning',
    alertClass: 'alert-warning',
    Icon: TriangleAlert,
    message: 'This action needs review',
  },
  {
    tone: 'info',
    label: 'Info',
    alertClass: 'alert-info',
    Icon: Info,
    message: 'New pigment series is ready',
  },
]

const softOutline: {
  name: string
  alertClass: string
  styleClass: string
  Icon: WashIcon
  message: string
}[] = [
  {
    name: 'Soft success',
    alertClass: 'alert-success',
    styleClass: 'alert-soft',
    Icon: CircleCheck,
    message: 'Soft success toast',
  },
  {
    name: 'Outline error',
    alertClass: 'alert-error',
    styleClass: 'alert-outline',
    Icon: CircleX,
    message: 'Outline error toast',
  },
  {
    name: 'Soft warning',
    alertClass: 'alert-warning',
    styleClass: 'alert-soft',
    Icon: TriangleAlert,
    message: 'Soft warning toast',
  },
  {
    name: 'Outline info',
    alertClass: 'alert-info',
    styleClass: 'alert-outline',
    Icon: Info,
    message: 'Outline info toast',
  },
]

const svgIcon = (paths: string, className = 'size-5 shrink-0') =>
  `<svg class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">${paths}</svg>`

const svgSuccess = svgIcon(
  '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
)
const svgError = svgIcon(
  '<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>',
)
const svgWarning = svgIcon(
  '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
)
const svgInfo = svgIcon(
  '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
)
const svgSuccessSm = svgIcon(
  '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  'size-4',
)
const svgErrorSm = svgIcon(
  '<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>',
  'size-4',
)
const svgWarningSm = svgIcon(
  '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  'size-4',
)
const svgInfoSm = svgIcon(
  '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  'size-4',
)

function toJsxMarkup(html: string): string {
  return daisyToJsx(html).replace(/stroke-width=/g, 'strokeWidth=')
}

const interactiveHtml = `<div class="flex flex-wrap gap-2">
  <button type="button" class="btn btn-sm cursor-pointer btn-success">${svgSuccessSm} Show Success</button>
  <button type="button" class="btn btn-sm cursor-pointer btn-error">${svgErrorSm} Show Error</button>
  <button type="button" class="btn btn-sm cursor-pointer btn-warning">${svgWarningSm} Show Warning</button>
  <button type="button" class="btn btn-sm cursor-pointer btn-info">${svgInfoSm} Show Info</button>
</div>
<div class="relative mt-4 min-h-28 overflow-hidden rounded-box border border-ink-border/70 bg-base-100/60">
  <div class="toast toast-bottom toast-end !absolute z-10">
    <div role="alert" class="alert alert-success shadow-lg">
      ${svgSuccess}
      <span>Created successfully</span>
      <button type="button" class="btn btn-ghost btn-xs cursor-pointer" aria-label="Dismiss toast">Close</button>
    </div>
  </div>
</div>`

const crudHtml = `<div class="flex flex-wrap gap-2">
  <button type="button" class="btn btn-primary btn-sm cursor-pointer">${svgSuccessSm} Simulate create</button>
  <button type="button" class="btn btn-secondary btn-sm cursor-pointer">${svgSuccessSm} Simulate update</button>
  <button type="button" class="btn btn-error btn-sm cursor-pointer">${svgErrorSm} Simulate delete error</button>
  <button type="button" class="btn btn-warning btn-sm cursor-pointer">${svgWarningSm} Simulate warning</button>
  <button type="button" class="btn btn-info btn-sm cursor-pointer">${svgInfoSm} Simulate info</button>
</div>
<div class="mt-4 relative min-h-40 overflow-hidden rounded-box border border-ink-border/70 bg-base-100/60">
  <div class="toast toast-bottom toast-end !absolute z-10">
    <div role="alert" class="alert alert-success shadow-lg">
      ${svgSuccess}
      <span>Created successfully</span>
    </div>
  </div>
</div>`

const studioToastHtml = `<div class="flex flex-wrap gap-2">
  <button type="button" class="btn btn-success btn-sm cursor-pointer">${svgSuccessSm} Pigment saved</button>
  <button type="button" class="btn btn-error btn-sm cursor-pointer">${svgErrorSm} Wash failed</button>
  <button type="button" class="btn btn-info btn-sm cursor-pointer">${svgInfoSm} Layer locked</button>
</div>
<div class="mt-4 grid gap-4 sm:grid-cols-2">
  <div class="relative min-h-24 overflow-hidden rounded-box border border-ink-border/70 bg-base-100/60">
    <div class="toast toast-bottom toast-end !absolute z-10">
      <div role="alert" class="alert alert-success shadow-lg">${svgSuccess}<span>Pigment saved</span></div>
    </div>
  </div>
  <div class="relative min-h-24 overflow-hidden rounded-box border border-ink-border/70 bg-base-100/60">
    <div class="toast toast-bottom toast-end !absolute z-10">
      <div role="alert" class="alert alert-error shadow-lg">${svgError}<span>Wash failed</span></div>
    </div>
  </div>
</div>`

const placementsHtml = `<div class="grid gap-2 sm:grid-cols-3">
  <button type="button" class="btn btn-outline btn-sm w-full cursor-pointer">Top start</button>
  <button type="button" class="btn btn-outline btn-sm w-full cursor-pointer">Top center</button>
  <button type="button" class="btn btn-outline btn-sm w-full cursor-pointer">Top end</button>
  <button type="button" class="btn btn-outline btn-sm w-full cursor-pointer">Middle start</button>
  <button type="button" class="btn btn-outline btn-sm w-full cursor-pointer">Middle center</button>
  <button type="button" class="btn btn-outline btn-sm w-full cursor-pointer">Middle end</button>
  <button type="button" class="btn btn-outline btn-sm w-full cursor-pointer">Bottom start</button>
  <button type="button" class="btn btn-outline btn-sm w-full cursor-pointer">Bottom center</button>
  <button type="button" class="btn btn-outline btn-sm w-full cursor-pointer">Bottom end</button>
</div>
<div class="mt-5 relative min-h-56 overflow-hidden rounded-box border border-ink-border/70 bg-base-100/60">
  <p class="absolute inset-0 flex items-center justify-center text-xs text-ink-muted">Contained placement preview (static)</p>
  <div class="toast toast-top toast-start !absolute"><div role="alert" class="alert alert-soft alert-info py-1 text-xs shadow"><span>Top start</span></div></div>
  <div class="toast toast-top toast-center !absolute"><div role="alert" class="alert alert-soft alert-info py-1 text-xs shadow"><span>Top center</span></div></div>
  <div class="toast toast-top toast-end !absolute"><div role="alert" class="alert alert-soft alert-info py-1 text-xs shadow"><span>Top end</span></div></div>
  <div class="toast toast-middle toast-start !absolute"><div role="alert" class="alert alert-soft alert-info py-1 text-xs shadow"><span>Middle start</span></div></div>
  <div class="toast toast-middle toast-center !absolute"><div role="alert" class="alert alert-soft alert-info py-1 text-xs shadow"><span>Middle center</span></div></div>
  <div class="toast toast-middle toast-end !absolute"><div role="alert" class="alert alert-soft alert-info py-1 text-xs shadow"><span>Middle end</span></div></div>
  <div class="toast toast-bottom toast-start !absolute"><div role="alert" class="alert alert-soft alert-info py-1 text-xs shadow"><span>Bottom start</span></div></div>
  <div class="toast toast-bottom toast-center !absolute"><div role="alert" class="alert alert-soft alert-info py-1 text-xs shadow"><span>Bottom center</span></div></div>
  <div class="toast toast-bottom toast-end !absolute"><div role="alert" class="alert alert-soft alert-info py-1 text-xs shadow"><span>Bottom end</span></div></div>
</div>`

const alertColorsHtml = `<div class="grid gap-4 sm:grid-cols-2">
  <div class="flex flex-col gap-2">
    <div class="relative min-h-24 overflow-hidden rounded-box border border-ink-border/70 bg-base-100/60">
      <div class="toast toast-bottom toast-end !absolute z-10">
        <div role="alert" class="alert alert-success shadow-lg">${svgSuccess}<span>Created successfully</span></div>
      </div>
    </div>
    <button type="button" class="btn btn-ghost btn-xs cursor-pointer self-start">Show live</button>
  </div>
  <div class="flex flex-col gap-2">
    <div class="relative min-h-24 overflow-hidden rounded-box border border-ink-border/70 bg-base-100/60">
      <div class="toast toast-bottom toast-end !absolute z-10">
        <div role="alert" class="alert alert-error shadow-lg">${svgError}<span>Could not save changes</span></div>
      </div>
    </div>
    <button type="button" class="btn btn-ghost btn-xs cursor-pointer self-start">Show live</button>
  </div>
  <div class="flex flex-col gap-2">
    <div class="relative min-h-24 overflow-hidden rounded-box border border-ink-border/70 bg-base-100/60">
      <div class="toast toast-bottom toast-end !absolute z-10">
        <div role="alert" class="alert alert-warning shadow-lg">${svgWarning}<span>This action needs review</span></div>
      </div>
    </div>
    <button type="button" class="btn btn-ghost btn-xs cursor-pointer self-start">Show live</button>
  </div>
  <div class="flex flex-col gap-2">
    <div class="relative min-h-24 overflow-hidden rounded-box border border-ink-border/70 bg-base-100/60">
      <div class="toast toast-bottom toast-end !absolute z-10">
        <div role="alert" class="alert alert-info shadow-lg">${svgInfo}<span>New pigment series is ready</span></div>
      </div>
    </div>
    <button type="button" class="btn btn-ghost btn-xs cursor-pointer self-start">Show live</button>
  </div>
</div>`

const softOutlineHtml = `<div class="grid gap-4 sm:grid-cols-2">
  <div class="flex flex-col gap-2">
    <div class="relative min-h-24 overflow-hidden rounded-box border border-ink-border/70 bg-base-100/60">
      <div class="toast toast-bottom toast-end !absolute z-10">
        <div role="alert" class="alert alert-success alert-soft shadow-lg">${svgSuccess}<span>Soft success toast</span></div>
      </div>
    </div>
    <button type="button" class="btn btn-ghost btn-xs cursor-pointer self-start">Show live</button>
  </div>
  <div class="flex flex-col gap-2">
    <div class="relative min-h-24 overflow-hidden rounded-box border border-ink-border/70 bg-base-100/60">
      <div class="toast toast-bottom toast-end !absolute z-10">
        <div role="alert" class="alert alert-error alert-outline shadow-lg">${svgError}<span>Outline error toast</span></div>
      </div>
    </div>
    <button type="button" class="btn btn-ghost btn-xs cursor-pointer self-start">Show live</button>
  </div>
  <div class="flex flex-col gap-2">
    <div class="relative min-h-24 overflow-hidden rounded-box border border-ink-border/70 bg-base-100/60">
      <div class="toast toast-bottom toast-end !absolute z-10">
        <div role="alert" class="alert alert-warning alert-soft shadow-lg">${svgWarning}<span>Soft warning toast</span></div>
      </div>
    </div>
    <button type="button" class="btn btn-ghost btn-xs cursor-pointer self-start">Show live</button>
  </div>
  <div class="flex flex-col gap-2">
    <div class="relative min-h-24 overflow-hidden rounded-box border border-ink-border/70 bg-base-100/60">
      <div class="toast toast-bottom toast-end !absolute z-10">
        <div role="alert" class="alert alert-info alert-outline shadow-lg">${svgInfo}<span>Outline info toast</span></div>
      </div>
    </div>
    <button type="button" class="btn btn-ghost btn-xs cursor-pointer self-start">Show live</button>
  </div>
</div>`

const stackedHtml = `<div class="relative min-h-44 overflow-hidden rounded-box border border-ink-border/70 bg-base-100/60">
  <div class="toast toast-top toast-end !absolute z-10">
    <div role="alert" class="alert alert-info shadow-lg">${svgInfo}<span>New message arrived</span></div>
    <div role="alert" class="alert alert-success shadow-lg">${svgSuccess}<span>Message marked as read</span></div>
  </div>
</div>
<div class="mt-3 flex flex-wrap gap-2">
  <button type="button" class="btn btn-sm cursor-pointer">${svgInfoSm} Push stack toast</button>
  <button type="button" class="btn btn-success btn-sm cursor-pointer">${svgSuccessSm} Push success</button>
  <button type="button" class="btn btn-error btn-sm cursor-pointer">${svgErrorSm} Push error</button>
  <button type="button" class="btn btn-ghost btn-sm cursor-pointer">Clear stack</button>
</div>`

const responsiveHtml = `<ul class="list-inside list-disc space-y-2 text-sm text-ink-muted">
  <li>Mobile (~360-430px): use <span class="font-mono text-xs">toast-bottom toast-end</span> or <span class="font-mono text-xs">toast-bottom toast-center</span>. Keep messages short so they wrap cleanly.</li>
  <li>Tablet (~768-1024px): all nine placements work. Avoid middle-center for long CRUD strings.</li>
  <li>Desktop (~1280px+): bottom-end remains the form-crud-ui default. Raise with <span class="font-mono text-xs">z-[100]</span> so toasts sit above drawers and dialogs.</li>
  <li>Gallery demos nest toast in <span class="font-mono text-xs">relative</span> panels with <span class="font-mono text-xs">!absolute</span> so static samples do not escape the page. Live triggers still use page-level toast.</li>
</ul>`

type LiveToast = {
  id: number
  placement: string
  alertClass: string
  styleClass?: string
  Icon: WashIcon
  message: string
}

const DISMISS_MS = 3200
const STACK_DISMISS_MS = 4000

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

export default function ToastPage() {
  const [live, setLive] = useState<LiveToast | null>(null)
  const [stack, setStack] = useState<LiveToast[]>([])
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const stackTimersRef = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map())
  const idRef = useRef(0)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      for (const timer of stackTimersRef.current.values()) {
        clearTimeout(timer)
      }
      stackTimersRef.current.clear()
    }
  }, [])

  function showToast(next: Omit<LiveToast, 'id'>) {
    if (timerRef.current) clearTimeout(timerRef.current)
    idRef.current += 1
    const id = idRef.current
    setLive({ ...next, id })
    timerRef.current = setTimeout(() => {
      setLive((current) => (current?.id === id ? null : current))
    }, DISMISS_MS)
  }

  function dismissLive() {
    if (timerRef.current) clearTimeout(timerRef.current)
    setLive(null)
  }

  function pushStack(next: Omit<LiveToast, 'id'>) {
    idRef.current += 1
    const id = idRef.current
    setStack((prev) => [...prev, { ...next, id }])
    const timer = setTimeout(() => {
      setStack((prev) => prev.filter((t) => t.id !== id))
      stackTimersRef.current.delete(id)
    }, STACK_DISMISS_MS)
    stackTimersRef.current.set(id, timer)
  }

  function dismissStackItem(id: number) {
    const timer = stackTimersRef.current.get(id)
    if (timer) {
      clearTimeout(timer)
      stackTimersRef.current.delete(id)
    }
    setStack((prev) => prev.filter((t) => t.id !== id))
  }

  function clearStack() {
    for (const timer of stackTimersRef.current.values()) {
      clearTimeout(timer)
    }
    stackTimersRef.current.clear()
    setStack([])
  }

  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Toast
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">toast</span> placements and alert wrappers.
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
            className={`alert shadow-lg ${live.alertClass} ${live.styleClass ?? ''}`.trim()}
          >
            <live.Icon className="size-5 shrink-0" strokeWidth={2} />
            <span>{live.message}</span>
            <button
              type="button"
              className="btn btn-ghost btn-xs cursor-pointer"
              onClick={dismissLive}
              aria-label="Dismiss toast"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}

      {stack.length > 0 ? (
        <div
          className="toast toast-bottom toast-end z-[100]"
          role="status"
          aria-live="polite"
        >
          {stack.map((item) => (
            <div
              key={item.id}
              role="alert"
              className={`alert shadow-lg ${item.alertClass}`}
            >
              <item.Icon className="size-5 shrink-0" strokeWidth={2} />
              <span>{item.message}</span>
              <button
                type="button"
                className="btn btn-ghost btn-xs cursor-pointer"
                onClick={() => dismissStackItem(item.id)}
                aria-label="Dismiss toast"
              >
                Close
              </button>
            </div>
          ))}
        </div>
      ) : null}

      <div className="space-y-6">
        <Section
          eyebrow="01 · Interactive"
          title="Show toast"
          description="Trigger a live toast that auto-dismisses after a few seconds"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap gap-2">
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
                                  showToast({
                                    placement: 'toast-bottom toast-end',
                                    alertClass,
                                    Icon,
                                    message,
                                  })
                                }
                              >
                                <Icon className="size-4" strokeWidth={2} />
                                Show {label}
                              </button>
                            ))}
                          </div>
                          <div className="mt-3">
                            <ClassLabel value="toast toast-bottom toast-end z-[100] > alert alert-{color}" />
                          </div>
              </>
            }
            html={interactiveHtml}
            jsx={toJsxMarkup(interactiveHtml)}
          />
        </Section>

        <Section
          eyebrow="02 · CRUD pattern"
          title="Bottom-end mutation feedback"
          description="form-crud-ui: every create, update, or delete ends with toast-bottom"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              className="btn btn-primary btn-sm cursor-pointer"
                              onClick={() =>
                                showToast({
                                  placement: 'toast-bottom toast-end',
                                  alertClass: 'alert-success',
                                  Icon: CircleCheck,
                                  message: 'Plate saved successfully',
                                })
                              }
                            >
                              <CircleCheck className="size-4" strokeWidth={2} />
                              Simulate create
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary btn-sm cursor-pointer"
                              onClick={() =>
                                showToast({
                                  placement: 'toast-bottom toast-end',
                                  alertClass: 'alert-success',
                                  Icon: CircleCheck,
                                  message: 'Wash series updated',
                                })
                              }
                            >
                              <CircleCheck className="size-4" strokeWidth={2} />
                              Simulate update
                            </button>
                            <button
                              type="button"
                              className="btn btn-error btn-sm cursor-pointer"
                              onClick={() =>
                                showToast({
                                  placement: 'toast-bottom toast-end',
                                  alertClass: 'alert-error',
                                  Icon: CircleX,
                                  message: 'Delete failed. Try again.',
                                })
                              }
                            >
                              <CircleX className="size-4" strokeWidth={2} />
                              Simulate delete error
                            </button>
                            <button
                              type="button"
                              className="btn btn-warning btn-sm cursor-pointer"
                              onClick={() =>
                                showToast({
                                  placement: 'toast-bottom toast-end',
                                  alertClass: 'alert-warning',
                                  Icon: TriangleAlert,
                                  message: 'Unsaved wash changes remain',
                                })
                              }
                            >
                              <TriangleAlert className="size-4" strokeWidth={2} />
                              Simulate warning
                            </button>
                            <button
                              type="button"
                              className="btn btn-info btn-sm cursor-pointer"
                              onClick={() =>
                                showToast({
                                  placement: 'toast-bottom toast-end',
                                  alertClass: 'alert-info',
                                  Icon: Info,
                                  message: 'Export queued for tonight',
                                })
                              }
                            >
                              <Info className="size-4" strokeWidth={2} />
                              Simulate info
                            </button>
                          </div>
                          <div className="mt-4 relative min-h-40 overflow-hidden rounded-box border border-ink-border/70 bg-base-100/60">
                            <div className="toast toast-bottom toast-end !absolute z-10">
                              <div role="alert" className="alert alert-success shadow-lg">
                                <CircleCheck className="size-5 shrink-0" strokeWidth={2} />
                                <span>Created successfully</span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-3">
                            <ClassLabel value="toast toast-bottom toast-end z-[100] > alert alert-success" />
                          </div>
              </>
            }
            html={crudHtml}
            jsx={toJsxMarkup(crudHtml)}
          />
        </Section>

        <Section
          eyebrow="03 · Studio"
          title="Pigment desk messages"
          description="Menzies Design copy for save and failure feedback"
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
                                showToast({
                                  placement: 'toast-bottom toast-end',
                                  alertClass: 'alert-success',
                                  Icon: CircleCheck,
                                  message: 'Pigment saved',
                                })
                              }
                            >
                              <CircleCheck className="size-4" strokeWidth={2} />
                              Pigment saved
                            </button>
                            <button
                              type="button"
                              className="btn btn-error btn-sm cursor-pointer"
                              onClick={() =>
                                showToast({
                                  placement: 'toast-bottom toast-end',
                                  alertClass: 'alert-error',
                                  Icon: CircleX,
                                  message: 'Wash failed',
                                })
                              }
                            >
                              <CircleX className="size-4" strokeWidth={2} />
                              Wash failed
                            </button>
                            <button
                              type="button"
                              className="btn btn-info btn-sm cursor-pointer"
                              onClick={() =>
                                showToast({
                                  placement: 'toast-bottom toast-end',
                                  alertClass: 'alert-info',
                                  Icon: Info,
                                  message: 'Layer opacity locked for this plate',
                                })
                              }
                            >
                              <Info className="size-4" strokeWidth={2} />
                              Layer locked
                            </button>
                          </div>
                          <div className="mt-4 grid gap-4 sm:grid-cols-2">
                            <Sample label="toast > alert alert-success (Pigment saved)">
                              <div className="relative min-h-24 overflow-hidden rounded-box border border-ink-border/70 bg-base-100/60">
                                <div className="toast toast-bottom toast-end !absolute z-10">
                                  <div role="alert" className="alert alert-success shadow-lg">
                                    <CircleCheck className="size-5 shrink-0" strokeWidth={2} />
                                    <span>Pigment saved</span>
                                  </div>
                                </div>
                              </div>
                            </Sample>
                            <Sample label="toast > alert alert-error (Wash failed)">
                              <div className="relative min-h-24 overflow-hidden rounded-box border border-ink-border/70 bg-base-100/60">
                                <div className="toast toast-bottom toast-end !absolute z-10">
                                  <div role="alert" className="alert alert-error shadow-lg">
                                    <CircleX className="size-5 shrink-0" strokeWidth={2} />
                                    <span>Wash failed</span>
                                  </div>
                                </div>
                              </div>
                            </Sample>
                          </div>
              </>
            }
            html={studioToastHtml}
            jsx={toJsxMarkup(studioToastHtml)}
          />
        </Section>

        <Section
          eyebrow="04 · Placements"
          title="All nine corners and edges"
          description="toast-start / toast-center / toast-end combined"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-2 sm:grid-cols-3">
                            {placements.map((p) => (
                              <Sample key={p.className} label={`toast ${p.className}`}>
                                <button
                                  type="button"
                                  className="btn btn-outline btn-sm w-full cursor-pointer"
                                  onClick={() =>
                                    showToast({
                                      placement: p.className,
                                      alertClass: 'alert-info',
                                      Icon: Info,
                                      message: p.name,
                                    })
                                  }
                                >
                                  {p.name}
                                </button>
                              </Sample>
                            ))}
                          </div>
                          <div className="mt-5 relative min-h-56 overflow-hidden rounded-box border border-ink-border/70 bg-base-100/60">
                            <p className="absolute inset-0 flex items-center justify-center text-xs text-ink-muted">
                              Contained placement preview (static)
                            </p>
                            {placements
                              .filter((p) => p.h !== 'center' || p.v !== 'middle')
                              .map((p) => (
                                <div
                                  key={`static-${p.className}`}
                                  className={`toast !absolute ${p.className}`}
                                >
                                  <div
                                    role="alert"
                                    className="alert alert-soft alert-info py-1 text-xs shadow"
                                  >
                                    <span>{p.name}</span>
                                  </div>
                                </div>
                              ))}
                            <div className="toast toast-middle toast-center !absolute">
                              <div
                                role="alert"
                                className="alert alert-soft alert-info py-1 text-xs shadow"
                              >
                                <span>Middle center</span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-3">
                            <ClassLabel value="toast toast-{top|middle|bottom} toast-{start|center|end}" />
                          </div>
              </>
            }
            html={placementsHtml}
            jsx={toJsxMarkup(placementsHtml)}
          />
        </Section>

        <Section
          eyebrow="05 · Alert colors"
          title="Toast wrapping alerts"
          description="success, error, warning, and info alerts inside toast"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                            {tones.map(({ label, alertClass, Icon, message }) => (
                              <Sample
                                key={label}
                                label={`toast toast-bottom toast-end > alert ${alertClass}`}
                              >
                                <div className="relative min-h-24 overflow-hidden rounded-box border border-ink-border/70 bg-base-100/60">
                                  <div className="toast toast-bottom toast-end !absolute z-10">
                                    <div role="alert" className={`alert ${alertClass} shadow-lg`}>
                                      <Icon className="size-5 shrink-0" strokeWidth={2} />
                                      <span>{message}</span>
                                    </div>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  className="btn btn-ghost btn-xs mt-1 cursor-pointer self-start"
                                  onClick={() =>
                                    showToast({
                                      placement: 'toast-bottom toast-end',
                                      alertClass,
                                      Icon,
                                      message,
                                    })
                                  }
                                >
                                  Show live
                                </button>
                              </Sample>
                            ))}
                          </div>
              </>
            }
            html={alertColorsHtml}
            jsx={toJsxMarkup(alertColorsHtml)}
          />
        </Section>

        <Section
          eyebrow="06 · Soft and outline"
          title="Alert styles in toast"
          description="alert-soft and alert-outline work inside toast"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                            {softOutline.map(({ name, alertClass, styleClass, Icon, message }) => (
                              <Sample
                                key={name}
                                label={`toast > alert ${alertClass} ${styleClass}`}
                              >
                                <div className="relative min-h-24 overflow-hidden rounded-box border border-ink-border/70 bg-base-100/60">
                                  <div className="toast toast-bottom toast-end !absolute z-10">
                                    <div
                                      role="alert"
                                      className={`alert ${alertClass} ${styleClass} shadow-lg`}
                                    >
                                      <Icon className="size-5 shrink-0" strokeWidth={2} />
                                      <span>{message}</span>
                                    </div>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  className="btn btn-ghost btn-xs mt-1 cursor-pointer self-start"
                                  onClick={() =>
                                    showToast({
                                      placement: 'toast-bottom toast-end',
                                      alertClass,
                                      styleClass,
                                      Icon,
                                      message,
                                    })
                                  }
                                >
                                  Show live
                                </button>
                              </Sample>
                            ))}
                          </div>
              </>
            }
            html={softOutlineHtml}
            jsx={toJsxMarkup(softOutlineHtml)}
          />
        </Section>

        <Section
          eyebrow="07 · Stacked"
          title="Multiple alerts in one toast"
          description="A single toast wrapper stacks several alerts"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <Sample label="toast toast-top toast-end > alert × 2">
                            <div className="relative min-h-44 overflow-hidden rounded-box border border-ink-border/70 bg-base-100/60">
                              <div className="toast toast-top toast-end !absolute z-10">
                                <div role="alert" className="alert alert-info shadow-lg">
                                  <Info className="size-5 shrink-0" strokeWidth={2} />
                                  <span>New message arrived</span>
                                </div>
                                <div role="alert" className="alert alert-success shadow-lg">
                                  <CircleCheck className="size-5 shrink-0" strokeWidth={2} />
                                  <span>Message marked as read</span>
                                </div>
                              </div>
                            </div>
                          </Sample>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <button
                              type="button"
                              className="btn btn-sm cursor-pointer"
                              onClick={() =>
                                pushStack({
                                  placement: 'toast-bottom toast-end',
                                  alertClass: 'alert-info',
                                  Icon: Info,
                                  message: `Stack item ${stack.length + 1}`,
                                })
                              }
                            >
                              <Info className="size-4" strokeWidth={2} />
                              Push stack toast
                            </button>
                            <button
                              type="button"
                              className="btn btn-success btn-sm cursor-pointer"
                              onClick={() =>
                                pushStack({
                                  placement: 'toast-bottom toast-end',
                                  alertClass: 'alert-success',
                                  Icon: CircleCheck,
                                  message: 'Pigment saved',
                                })
                              }
                            >
                              <CircleCheck className="size-4" strokeWidth={2} />
                              Push success
                            </button>
                            <button
                              type="button"
                              className="btn btn-error btn-sm cursor-pointer"
                              onClick={() =>
                                pushStack({
                                  placement: 'toast-bottom toast-end',
                                  alertClass: 'alert-error',
                                  Icon: CircleX,
                                  message: 'Wash failed',
                                })
                              }
                            >
                              <CircleX className="size-4" strokeWidth={2} />
                              Push error
                            </button>
                            <button
                              type="button"
                              className="btn btn-ghost btn-sm cursor-pointer"
                              onClick={clearStack}
                              disabled={stack.length === 0}
                            >
                              Clear stack
                            </button>
                          </div>
                          <div className="mt-3">
                            <ClassLabel value="toast toast-bottom toast-end > alert + alert + …" />
                          </div>
              </>
            }
            html={stackedHtml}
            jsx={toJsxMarkup(stackedHtml)}
          />
        </Section>

        <Section
          eyebrow="08 · Responsive"
          title="Viewport notes"
          description="Toast stays fixed to the viewport corner"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <ul className="list-inside list-disc space-y-2 text-sm text-ink-muted">
                            <li>
                              Mobile (~360-430px): use{' '}
                              <span className="font-mono text-xs">toast-bottom toast-end</span>{' '}
                              or{' '}
                              <span className="font-mono text-xs">toast-bottom toast-center</span>.
                              Keep messages short so they wrap cleanly.
                            </li>
                            <li>
                              Tablet (~768-1024px): all nine placements work. Avoid middle-center
                              for long CRUD strings.
                            </li>
                            <li>
                              Desktop (~1280px+): bottom-end remains the form-crud-ui default.
                              Raise with{' '}
                              <span className="font-mono text-xs">z-[100]</span> so toasts sit
                              above drawers and dialogs.
                            </li>
                            <li>
                              Gallery demos nest toast in{' '}
                              <span className="font-mono text-xs">relative</span> panels with{' '}
                              <span className="font-mono text-xs">!absolute</span> so static
                              samples do not escape the page. Live triggers still use page-level
                              toast.
                            </li>
                          </ul>
                          <div className="mt-4">
                            <ClassLabel value="toast toast-bottom toast-end z-[100] (CRUD default)" />
                          </div>
              </>
            }
            html={responsiveHtml}
            jsx={toJsxMarkup(responsiveHtml)}
          />
        </Section>
      </div>
    </>
  )
}
