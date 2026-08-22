import {
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react'
import { Droplets, Heart, Palette, Settings } from 'menzies-design-wash-ui/icons'
import { usePrefersReducedMotion, type RippleOrigin } from './hooks/useRipple'

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
    <div className="flex flex-col items-start gap-2">
      {children}
      <ClassLabel value={label} />
    </div>
  )
}

/** Class-only host: global `attachGlobalRipple` spawns the wave. */
function RippleButton({
  className = '',
  rippleClass = 'ripple',
  origin = 'pointer',
  children,
  ...rest
}: {
  className?: string
  rippleClass?: string
  origin?: RippleOrigin
  children: ReactNode
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>) {
  return (
    <button
      type="button"
      {...rest}
      className={`cursor-pointer ${rippleClass} ${className}`.trim()}
      data-ripple-origin={origin === 'center' ? 'center' : undefined}
    >
      {children}
    </button>
  )
}

function RippleSurface({
  className = '',
  rippleClass = 'ripple',
  origin = 'pointer',
  children,
  role = 'button',
  tabIndex = 0,
  onActivate,
  'aria-label': ariaLabel,
}: {
  className?: string
  rippleClass?: string
  origin?: RippleOrigin
  children: ReactNode
  role?: string
  tabIndex?: number
  onActivate?: () => void
  'aria-label'?: string
}) {
  return (
    <div
      role={role}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
      className={`cursor-pointer ${rippleClass} ${className}`.trim()}
      data-ripple-origin={origin === 'center' ? 'center' : undefined}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onActivate?.()
        }
      }}
    >
      {children}
    </div>
  )
}

const colorSamples = [
  { name: 'Primary', rippleClass: 'ripple ripple-primary', btn: 'btn-primary' },
  {
    name: 'Secondary',
    rippleClass: 'ripple ripple-secondary',
    btn: 'btn-secondary',
  },
  { name: 'Accent', rippleClass: 'ripple ripple-accent', btn: 'btn-accent' },
] as const

export default function RipplePage() {
  const reduced = usePrefersReducedMotion()

  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Ripple
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Soft wash bloom on press. daisyUI 5 has no official{' '}
          <span className="font-mono text-xs">ripple</span> class. Opt in with{' '}
          <span className="font-mono text-xs">.ripple</span>,{' '}
          <span className="font-mono text-xs">.ripple-surface</span>, or{' '}
          <span className="font-mono text-xs">data-ripple</span>;{' '}
          <span className="font-mono text-xs">attachGlobalRipple()</span> in{' '}
          <span className="font-mono text-xs">main.tsx</span> handles pointer and
          Enter/Space. Skip motion when{' '}
          <span className="font-mono text-xs">prefers-reduced-motion</span> is
          set.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="00 · Usage"
          title="How to opt in"
          description="Shared CSS host + one global listener. No per-button handlers required."
        >
          <div className="space-y-3 text-sm text-ink-muted">
            <p>
              Add <ClassLabel value="ripple" /> (or{' '}
              <ClassLabel value="data-ripple" />) next to{' '}
              <ClassLabel value="btn" />. Optional:{' '}
              <ClassLabel value='data-ripple-origin="center"' />, tint helpers{' '}
              <ClassLabel value="ripple-primary" />, opt-out{' '}
              <ClassLabel value="no-ripple" />.
            </p>
            <p>
              Imperative React path:{' '}
              <ClassLabel value="useRipple()" /> from{' '}
              <ClassLabel value="src/hooks/useRipple.ts" /> (sets{' '}
              <ClassLabel value="data-ripple-managed" /> so global attach does
              not double-spawn). Core helpers live in{' '}
              <ClassLabel value="src/lib/ripple.ts" />.
            </p>
            <Sample label='btn ripple (class only)'>
              <button type="button" className="btn btn-primary ripple">
                Class-only press
              </button>
            </Sample>
          </div>
        </Section>

        <Section
          eyebrow="01 · Basic"
          title="Click ripple on buttons"
          description="Pointer-origin wash bloom on daisyUI buttons. Press to see the wave."
        >
          <div className="flex flex-wrap items-end gap-6">
            <Sample label="ripple + btn">
              <RippleButton className="btn">Press wash</RippleButton>
            </Sample>
            <Sample label="ripple + btn btn-outline">
              <RippleButton className="btn btn-outline">Outline press</RippleButton>
            </Sample>
            <Sample label="ripple ripple-ink + btn btn-soft">
              <RippleButton
                className="btn btn-soft"
                rippleClass="ripple ripple-ink"
              >
                Soft ink
              </RippleButton>
            </Sample>
          </div>
        </Section>

        <Section
          eyebrow="02 · Colors"
          title="Primary, secondary, accent washes"
          description="Tinted ripple ink matched to studio theme colors."
          panel="wash-panel-ochre"
        >
          <div className="flex flex-wrap items-end gap-6">
            {colorSamples.map((sample) => (
              <Sample
                key={sample.name}
                label={`${sample.rippleClass} + btn ${sample.btn}`}
              >
                <RippleButton
                  className={`btn ${sample.btn}`}
                  rippleClass={sample.rippleClass}
                >
                  {sample.name}
                </RippleButton>
              </Sample>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="03 · Origin"
          title="Centered vs pointer-origin"
          description="Centered blooms from the host middle. Pointer-origin follows the press."
        >
          <div className="flex flex-wrap items-end gap-6">
            <Sample label="ripple (pointer origin)">
              <RippleButton className="btn btn-primary" origin="pointer">
                Pointer origin
              </RippleButton>
            </Sample>
            <Sample label='ripple data-ripple-origin="center"'>
              <RippleButton
                className="btn btn-secondary"
                origin="center"
                rippleClass="ripple ripple-secondary"
              >
                Centered
              </RippleButton>
            </Sample>
          </div>
        </Section>

        <Section
          eyebrow="04 · Surfaces"
          title="Cards and icon buttons"
          description="Ripple hosts on card plates and square icon actions."
          panel="wash-panel-rose"
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <Sample label="ripple + card">
              <RippleSurface
                className="card w-full max-w-sm bg-base-100 shadow-sm"
                rippleClass="ripple ripple-primary"
              >
                <div className="card-body">
                  <h3 className="card-title font-display text-lg">Mist plate</h3>
                  <p className="text-sm text-ink-muted">
                    Press anywhere on the card for a soft primary wash.
                  </p>
                </div>
              </RippleSurface>
            </Sample>

            <div className="flex flex-wrap items-end gap-4">
              <Sample label="ripple + btn-square">
                <div className="tooltip tooltip-primary" data-tip="Favorite">
                  <RippleButton
                    className="btn btn-ghost btn-square btn-primary"
                    rippleClass="ripple ripple-primary"
                    aria-label="Favorite"
                  >
                    <Heart className="size-5" strokeWidth={2} />
                  </RippleButton>
                </div>
              </Sample>
              <Sample label="ripple + btn-square">
                <div className="tooltip tooltip-secondary" data-tip="Settings">
                  <RippleButton
                    className="btn btn-ghost btn-square btn-secondary"
                    rippleClass="ripple ripple-secondary"
                    aria-label="Settings"
                  >
                    <Settings className="size-5" strokeWidth={2} />
                  </RippleButton>
                </div>
              </Sample>
              <Sample label="ripple + btn-square">
                <div className="tooltip tooltip-accent" data-tip="Palette">
                  <RippleButton
                    className="btn btn-ghost btn-square btn-accent"
                    rippleClass="ripple ripple-accent"
                    aria-label="Palette"
                  >
                    <Palette className="size-5" strokeWidth={2} />
                  </RippleButton>
                </div>
              </Sample>
            </div>
          </div>
        </Section>

        <Section
          eyebrow="05 · Studio"
          title="Pigment plate press"
          description="A wash panel that blooms from the press point, like a drop hitting damp paper."
        >
          <Sample label="ripple ripple-primary + wash-panel">
            <RippleSurface
              className="wash-panel wash-panel-ochre w-full max-w-md p-6"
              rippleClass="ripple ripple-primary"
              aria-label="Pigment plate"
            >
              <div className="flex items-start gap-3">
                <Droplets
                  className="mt-0.5 size-5 shrink-0 text-primary"
                  strokeWidth={2}
                  aria-hidden
                />
                <div>
                  <p className="font-display text-lg font-semibold">
                    Cerulean drop
                  </p>
                  <p className="mt-1 text-sm text-ink-muted">
                    Press the plate. Watch the wash expand from your fingertip.
                  </p>
                </div>
              </div>
            </RippleSurface>
          </Sample>
        </Section>

        <Section
          eyebrow="06 · Motion"
          title="Reduced motion"
          description="Ripple nodes are not spawned when the OS asks for less motion. CSS also collapses wave animation."
          panel="wash-panel-ochre"
        >
          <div className="space-y-3 text-sm text-ink-muted">
            <p>
              Current preference:{' '}
              <span className="font-mono text-xs text-base-content">
                {reduced
                  ? 'prefers-reduced-motion: reduce'
                  : 'prefers-reduced-motion: no-preference'}
              </span>
            </p>
            <p>
              Under reduce, handlers skip wave creation and any leftover waves
              are cleared on unmount with timers and DOM nodes.
            </p>
            <Sample label="ripple (motion gated)">
              <RippleButton className="btn btn-primary">
                {reduced ? 'Ripple disabled' : 'Try a press'}
              </RippleButton>
            </Sample>
          </div>
        </Section>
      </div>
    </>
  )
}
