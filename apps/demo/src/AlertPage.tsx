import type { ReactNode } from 'react'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import { daisyToJsx } from './snippets/markup/daisyGalleryDefaults'
import {
  CircleCheck,
  CircleX,
  Info,
  TriangleAlert,
} from '@menzies-mariesta-com/menzies-design-wash-ui/icons'

const colors = [
  {
    name: 'Info',
    className: 'alert-info',
    Icon: Info,
    message: 'New software update available.',
  },
  {
    name: 'Success',
    className: 'alert-success',
    Icon: CircleCheck,
    message: 'Your purchase has been confirmed!',
  },
  {
    name: 'Warning',
    className: 'alert-warning',
    Icon: TriangleAlert,
    message: 'Warning: Invalid email address!',
  },
  {
    name: 'Error',
    className: 'alert-error',
    Icon: CircleX,
    message: 'Error! Task failed successfully.',
  },
] as const

const styles = [
  { name: 'Soft', className: 'alert-soft' },
  { name: 'Outline', className: 'alert-outline' },
  { name: 'Dash', className: 'alert-dash' },
] as const

const svgInfo =
  '<svg class="size-6 shrink-0 stroke-current text-info" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>'
const svgInfoPlain =
  '<svg class="size-6 shrink-0 stroke-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>'
const svgSuccess =
  '<svg class="size-6 shrink-0 stroke-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>'
const svgWarning =
  '<svg class="size-6 shrink-0 stroke-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>'
const svgError =
  '<svg class="size-6 shrink-0 stroke-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>'
const svgCheckSm =
  '<svg class="size-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>'
const svgXSm =
  '<svg class="size-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>'

function toJsxSvg(html: string): string {
  return html
    .replace(/class=/g, 'className=')
    .replace(/stroke-width=/g, 'strokeWidth=')
}

const baseHtml = `<div role="alert" class="alert">
  ${svgInfo}
  <span>12 unread messages. Tap to see.</span>
</div>`

const baseJsx = `<div role="alert" className="alert">
  ${toJsxSvg(svgInfo)}
  <span>12 unread messages. Tap to see.</span>
</div>`

const colorsHtml = `<div class="grid gap-4">
  <div role="alert" class="alert alert-info">
    ${svgInfoPlain}
    <span>New software update available.</span>
  </div>
  <div role="alert" class="alert alert-success">
    ${svgSuccess}
    <span>Your purchase has been confirmed!</span>
  </div>
  <div role="alert" class="alert alert-warning">
    ${svgWarning}
    <span>Warning: Invalid email address!</span>
  </div>
  <div role="alert" class="alert alert-error">
    ${svgError}
    <span>Error! Task failed successfully.</span>
  </div>
</div>`

const colorsJsx = toJsxSvg(colorsHtml)

const softHtml = `<div class="grid gap-3">
  <div role="alert" class="alert alert-info alert-soft">
    <span>New software update available.</span>
  </div>
  <div role="alert" class="alert alert-success alert-soft">
    <span>Your purchase has been confirmed!</span>
  </div>
  <div role="alert" class="alert alert-warning alert-soft">
    <span>Warning: Invalid email address!</span>
  </div>
  <div role="alert" class="alert alert-error alert-soft">
    <span>Error! Task failed successfully.</span>
  </div>
</div>`

const outlineHtml = `<div class="grid gap-3">
  <div role="alert" class="alert alert-info alert-outline">
    <span>New software update available.</span>
  </div>
  <div role="alert" class="alert alert-success alert-outline">
    <span>Your purchase has been confirmed!</span>
  </div>
  <div role="alert" class="alert alert-warning alert-outline">
    <span>Warning: Invalid email address!</span>
  </div>
  <div role="alert" class="alert alert-error alert-outline">
    <span>Error! Task failed successfully.</span>
  </div>
</div>`

const dashHtml = `<div class="grid gap-3">
  <div role="alert" class="alert alert-info alert-dash">
    <span>New software update available.</span>
  </div>
  <div role="alert" class="alert alert-success alert-dash">
    <span>Your purchase has been confirmed!</span>
  </div>
  <div role="alert" class="alert alert-warning alert-dash">
    <span>Warning: Invalid email address!</span>
  </div>
  <div role="alert" class="alert alert-error alert-dash">
    <span>Error! Task failed successfully.</span>
  </div>
</div>`

const matrixHtml = `<div class="grid gap-6 sm:grid-cols-3">
  <div class="flex flex-col gap-3">
    <p class="label-ink">Soft</p>
    <div role="alert" class="alert alert-info alert-soft"><span>Info</span></div>
    <div role="alert" class="alert alert-success alert-soft"><span>Success</span></div>
    <div role="alert" class="alert alert-warning alert-soft"><span>Warning</span></div>
    <div role="alert" class="alert alert-error alert-soft"><span>Error</span></div>
  </div>
  <div class="flex flex-col gap-3">
    <p class="label-ink">Outline</p>
    <div role="alert" class="alert alert-info alert-outline"><span>Info</span></div>
    <div role="alert" class="alert alert-success alert-outline"><span>Success</span></div>
    <div role="alert" class="alert alert-warning alert-outline"><span>Warning</span></div>
    <div role="alert" class="alert alert-error alert-outline"><span>Error</span></div>
  </div>
  <div class="flex flex-col gap-3">
    <p class="label-ink">Dash</p>
    <div role="alert" class="alert alert-info alert-dash"><span>Info</span></div>
    <div role="alert" class="alert alert-success alert-dash"><span>Success</span></div>
    <div role="alert" class="alert alert-warning alert-dash"><span>Warning</span></div>
    <div role="alert" class="alert alert-error alert-dash"><span>Error</span></div>
  </div>
</div>`

const directionHtml = `<div class="grid gap-4">
  <div role="alert" class="alert alert-vertical">
    ${svgInfo}
    <span>Stacked content for narrow viewports.</span>
    <button type="button" class="btn btn-sm cursor-pointer">Dismiss</button>
  </div>
  <div role="alert" class="alert alert-horizontal">
    ${svgInfo}
    <span>Side-by-side layout for wider desks.</span>
    <button type="button" class="btn btn-sm cursor-pointer">Dismiss</button>
  </div>
  <div role="alert" class="alert alert-vertical sm:alert-horizontal">
    ${svgInfo}
    <span>Responsive: vertical by default, horizontal from sm up.</span>
    <button type="button" class="btn btn-sm cursor-pointer">Got it</button>
  </div>
</div>`

const directionJsx = toJsxSvg(directionHtml)

const actionsHtml = `<div class="grid gap-4">
  <div role="alert" class="alert alert-vertical sm:alert-horizontal">
    ${svgInfo}
    <span>We use cookies for no reason.</span>
    <div class="flex flex-wrap gap-2">
      <button type="button" class="btn btn-sm cursor-pointer">Deny</button>
      <button type="button" class="btn btn-sm btn-primary cursor-pointer">Accept</button>
    </div>
  </div>
  <div role="alert" class="alert alert-vertical sm:alert-horizontal">
    ${svgInfo}
    <div>
      <h3 class="font-bold">New message!</h3>
      <div class="text-xs">You have 1 unread message</div>
    </div>
    <button type="button" class="btn btn-sm cursor-pointer">See</button>
  </div>
</div>`

const actionsJsx = toJsxSvg(actionsHtml)

const toastHtml = `<div class="relative min-h-48 overflow-hidden rounded-box border border-ink-border/70 bg-base-100/60">
  <div class="toast toast-bottom toast-end !absolute z-10">
    <div role="alert" class="alert alert-success shadow-lg">
      ${svgCheckSm}
      <span>Created successfully</span>
    </div>
    <div role="alert" class="alert alert-error shadow-lg">
      ${svgXSm}
      <span>Could not save changes</span>
    </div>
  </div>
</div>`

const toastJsx = toJsxSvg(toastHtml)

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
    <code className="font-mono text-[0.65rem] text-ink-muted">
      {value || 'alert'}
    </code>
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

export default function AlertPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Alert
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Every daisyUI <span className="font-mono text-xs">alert</span> color,
          style, and direction.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Default"
          title="Base alert"
          description="role=alert with optional Lucide icon and message"
        >
          <ShowcaseTabs
            preview={
              <>
                <Sample label="alert">
                  <div role="alert" className="alert">
                    <Info className="size-6 shrink-0 stroke-current text-info" strokeWidth={2} />
                    <span>12 unread messages. Tap to see.</span>
                  </div>
                </Sample>
              </>
            }
            html={baseHtml}
            jsx={baseJsx}
          />
        </Section>

        <Section
          eyebrow="02 · Colors"
          title="Semantic colors"
          description="info, success, warning, and error with matching Lucide icons"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-4">
                  {colors.map(({ name, className, Icon, message }) => (
                    <Sample key={name} label={`alert ${className}`}>
                      <div role="alert" className={`alert ${className}`}>
                        <Icon className="size-6 shrink-0 stroke-current" strokeWidth={2} />
                        <span>{message}</span>
                      </div>
                    </Sample>
                  ))}
                </div>
              </>
            }
            html={colorsHtml}
            jsx={colorsJsx}
          />
        </Section>

        <Section
          eyebrow="03 · Soft"
          title="Soft style"
          description="alert-soft with each semantic color"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-3">
                  {colors.map(({ name, className, message }) => (
                    <Sample key={name} label={`alert ${className} alert-soft`}>
                      <div role="alert" className={`alert ${className} alert-soft`}>
                        <span>{message}</span>
                      </div>
                    </Sample>
                  ))}
                </div>
              </>
            }
            html={softHtml}
            jsx={daisyToJsx(softHtml)}
          />
        </Section>

        <Section
          eyebrow="04 · Outline"
          title="Outline style"
          description="alert-outline for a lighter border treatment"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-3">
                  {colors.map(({ name, className, message }) => (
                    <Sample key={name} label={`alert ${className} alert-outline`}>
                      <div role="alert" className={`alert ${className} alert-outline`}>
                        <span>{message}</span>
                      </div>
                    </Sample>
                  ))}
                </div>
              </>
            }
            html={outlineHtml}
            jsx={daisyToJsx(outlineHtml)}
          />
        </Section>

        <Section
          eyebrow="05 · Dash"
          title="Dash style"
          description="alert-dash uses a dashed outline"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-3">
                  {colors.map(({ name, className, message }) => (
                    <Sample key={name} label={`alert ${className} alert-dash`}>
                      <div role="alert" className={`alert ${className} alert-dash`}>
                        <span>{message}</span>
                      </div>
                    </Sample>
                  ))}
                </div>
              </>
            }
            html={dashHtml}
            jsx={daisyToJsx(dashHtml)}
          />
        </Section>

        <Section
          eyebrow="06 · Styles × colors"
          title="Style matrix"
          description="Soft, outline, and dash across all four colors at a glance"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-6 sm:grid-cols-3">
                  {styles.map((style) => (
                    <div key={style.name} className="flex flex-col gap-3">
                      <p className="label-ink">{style.name}</p>
                      {colors.map(({ name, className }) => (
                        <Sample
                          key={`${style.name}-${name}`}
                          label={`alert ${className} ${style.className}`}
                        >
                          <div
                            role="alert"
                            className={`alert ${className} ${style.className}`}
                          >
                            <span>{name}</span>
                          </div>
                        </Sample>
                      ))}
                    </div>
                  ))}
                </div>
              </>
            }
            html={matrixHtml}
            jsx={daisyToJsx(matrixHtml)}
          />
        </Section>

        <Section
          eyebrow="07 · Direction"
          title="Vertical and horizontal"
          description="alert-vertical stacks on small screens"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-4">
                  <Sample label="alert alert-vertical">
                    <div role="alert" className="alert alert-vertical">
                      <Info className="size-6 shrink-0 stroke-current text-info" strokeWidth={2} />
                      <span>Stacked content for narrow viewports.</span>
                      <button type="button" className="btn btn-sm cursor-pointer">
                        Dismiss
                      </button>
                    </div>
                  </Sample>
                  <Sample label="alert alert-horizontal">
                    <div role="alert" className="alert alert-horizontal">
                      <Info className="size-6 shrink-0 stroke-current text-info" strokeWidth={2} />
                      <span>Side-by-side layout for wider desks.</span>
                      <button type="button" className="btn btn-sm cursor-pointer">
                        Dismiss
                      </button>
                    </div>
                  </Sample>
                  <Sample label="alert alert-vertical sm:alert-horizontal">
                    <div
                      role="alert"
                      className="alert alert-vertical sm:alert-horizontal"
                    >
                      <Info className="size-6 shrink-0 stroke-current text-info" strokeWidth={2} />
                      <span>Responsive: vertical by default, horizontal from sm up.</span>
                      <button type="button" className="btn btn-sm cursor-pointer">
                        Got it
                      </button>
                    </div>
                  </Sample>
                </div>
              </>
            }
            html={directionHtml}
            jsx={directionJsx}
          />
        </Section>

        <Section
          eyebrow="08 · With actions"
          title="Buttons and title copy"
          description="Alerts can carry CTAs and a short title plus description"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-4">
                  <Sample label="alert alert-vertical sm:alert-horizontal + btn">
                    <div
                      role="alert"
                      className="alert alert-vertical sm:alert-horizontal"
                    >
                      <Info
                        className="size-6 shrink-0 stroke-current text-info"
                        strokeWidth={2}
                      />
                      <span>We use cookies for no reason.</span>
                      <div className="flex flex-wrap gap-2">
                        <button type="button" className="btn btn-sm cursor-pointer">
                          Deny
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-primary cursor-pointer"
                        >
                          Accept
                        </button>
                      </div>
                    </div>
                  </Sample>
                  <Sample label="alert + title + description + btn">
                    <div
                      role="alert"
                      className="alert alert-vertical sm:alert-horizontal"
                    >
                      <Info
                        className="size-6 shrink-0 stroke-current text-info"
                        strokeWidth={2}
                      />
                      <div>
                        <h3 className="font-bold">New message!</h3>
                        <div className="text-xs">You have 1 unread message</div>
                      </div>
                      <button type="button" className="btn btn-sm cursor-pointer">
                        See
                      </button>
                    </div>
                  </Sample>
                </div>
              </>
            }
            html={actionsHtml}
            jsx={actionsJsx}
          />
        </Section>

        <Section
          eyebrow="09 · Toast placement"
          title="CRUD toast pattern"
          description="Menzies Design mutation feedback wraps alert in toast toast-bottom"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <p className="mb-4 text-sm text-ink-muted">
                  Prefer{' '}
                  <span className="font-mono text-xs">
                    toast toast-bottom toast-end z-[100]
                  </span>{' '}
                  with an <span className="font-mono text-xs">alert-*</span> child and
                  Lucide icon after every create, update, or delete.
                </p>
                <div className="relative min-h-48 overflow-hidden rounded-box border border-ink-border/70 bg-base-100/60">
                  <div className="toast toast-bottom toast-end !absolute z-10">
                    <div role="alert" className="alert alert-success shadow-lg">
                      <CircleCheck className="size-5 shrink-0" strokeWidth={2} />
                      <span>Created successfully</span>
                    </div>
                    <div role="alert" className="alert alert-error shadow-lg">
                      <CircleX className="size-5 shrink-0" strokeWidth={2} />
                      <span>Could not save changes</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <ClassLabel value="toast toast-bottom toast-end > alert alert-success | alert-error" />
                </div>
              </>
            }
            html={toastHtml}
            jsx={toastJsx}
          />
        </Section>
      </div>
    </>
  )
}
