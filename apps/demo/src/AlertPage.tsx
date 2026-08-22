import type { ReactNode } from 'react'
import {
  CircleCheck,
  CircleX,
  Info,
  TriangleAlert,
} from 'menzies-design-wash-ui/icons'

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
    <article className={`wash-panel paper-grain soak-in ${panel}`}>
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
          style, and direction. Lucide icons and actions included. CRUD feedback
          uses the same alert inside{' '}
          <span className="font-mono text-xs">toast toast-bottom toast-end</span>.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Default"
          title="Base alert"
          description="role=alert with optional Lucide icon and message."
        >
          <Sample label="alert">
            <div role="alert" className="alert">
              <Info className="size-6 shrink-0 stroke-current text-info" strokeWidth={2} />
              <span>12 unread messages. Tap to see.</span>
            </div>
          </Sample>
        </Section>

        <Section
          eyebrow="02 · Colors"
          title="Semantic colors"
          description="info, success, warning, and error with matching Lucide icons."
          panel="wash-panel-ochre"
        >
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
        </Section>

        <Section
          eyebrow="03 · Soft"
          title="Soft style"
          description="alert-soft with each semantic color."
        >
          <div className="grid gap-3">
            {colors.map(({ name, className, message }) => (
              <Sample key={name} label={`alert ${className} alert-soft`}>
                <div role="alert" className={`alert ${className} alert-soft`}>
                  <span>{message}</span>
                </div>
              </Sample>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="04 · Outline"
          title="Outline style"
          description="alert-outline for a lighter border treatment."
          panel="wash-panel-rose"
        >
          <div className="grid gap-3">
            {colors.map(({ name, className, message }) => (
              <Sample key={name} label={`alert ${className} alert-outline`}>
                <div role="alert" className={`alert ${className} alert-outline`}>
                  <span>{message}</span>
                </div>
              </Sample>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="05 · Dash"
          title="Dash style"
          description="alert-dash uses a dashed outline."
        >
          <div className="grid gap-3">
            {colors.map(({ name, className, message }) => (
              <Sample key={name} label={`alert ${className} alert-dash`}>
                <div role="alert" className={`alert ${className} alert-dash`}>
                  <span>{message}</span>
                </div>
              </Sample>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="06 · Styles × colors"
          title="Style matrix"
          description="Soft, outline, and dash across all four colors at a glance."
          panel="wash-panel-ochre"
        >
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
        </Section>

        <Section
          eyebrow="07 · Direction"
          title="Vertical and horizontal"
          description="alert-vertical stacks on small screens; alert-horizontal lays out in a row."
        >
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
        </Section>

        <Section
          eyebrow="08 · With actions"
          title="Buttons and title copy"
          description="Alerts can carry CTAs and a short title plus description."
          panel="wash-panel-rose"
        >
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
        </Section>

        <Section
          eyebrow="09 · Toast placement"
          title="CRUD toast pattern"
          description="Menzies Design mutation feedback wraps alert in toast toast-bottom toast-end (demo is contained, not fixed to the viewport)."
          panel="wash-panel-ochre"
        >
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
        </Section>
      </div>
    </>
  )
}
