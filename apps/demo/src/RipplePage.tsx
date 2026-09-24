import {
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react'
import { Droplets, Heart, Palette, Settings } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import { usePrefersReducedMotion, type RippleOrigin } from './hooks/useRipple'
import { ShowcaseTabs } from './components/ShowcaseTabs'

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

const usageHtml = `<div class="space-y-3 text-sm text-ink-muted">
  <p>
    Add <code class="font-mono text-[0.65rem] text-ink-muted">ripple</code> (or
    <code class="font-mono text-[0.65rem] text-ink-muted">data-ripple</code>) next to
    <code class="font-mono text-[0.65rem] text-ink-muted">btn</code>. Optional:
    <code class="font-mono text-[0.65rem] text-ink-muted">data-ripple-origin="center"</code>, tint helpers
    <code class="font-mono text-[0.65rem] text-ink-muted">ripple-primary</code>, opt-out
    <code class="font-mono text-[0.65rem] text-ink-muted">no-ripple</code>.
  </p>
  <p>
    Imperative React path:
    <code class="font-mono text-[0.65rem] text-ink-muted">useRipple()</code> from
    <code class="font-mono text-[0.65rem] text-ink-muted">src/hooks/useRipple.ts</code> (sets
    <code class="font-mono text-[0.65rem] text-ink-muted">data-ripple-managed</code> so global attach does
    not double-spawn). Core helpers live in
    <code class="font-mono text-[0.65rem] text-ink-muted">src/lib/ripple.ts</code>.
  </p>
  <div class="flex flex-col items-start gap-2">
    <button type="button" class="btn btn-primary ripple cursor-pointer">Class-only press</button>
  </div>
</div>`

const usageJsx = `<div className="space-y-3 text-sm text-ink-muted">
  <p>
    Add <code className="font-mono text-[0.65rem] text-ink-muted">ripple</code> (or
    <code className="font-mono text-[0.65rem] text-ink-muted">data-ripple</code>) next to
    <code className="font-mono text-[0.65rem] text-ink-muted">btn</code>. Optional:
    <code className="font-mono text-[0.65rem] text-ink-muted">data-ripple-origin="center"</code>, tint helpers
    <code className="font-mono text-[0.65rem] text-ink-muted">ripple-primary</code>, opt-out
    <code className="font-mono text-[0.65rem] text-ink-muted">no-ripple</code>.
  </p>
  <p>
    Imperative React path:
    <code className="font-mono text-[0.65rem] text-ink-muted">useRipple()</code> from
    <code className="font-mono text-[0.65rem] text-ink-muted">src/hooks/useRipple.ts</code> (sets
    <code className="font-mono text-[0.65rem] text-ink-muted">data-ripple-managed</code> so global attach does
    not double-spawn). Core helpers live in
    <code className="font-mono text-[0.65rem] text-ink-muted">src/lib/ripple.ts</code>.
  </p>
  <div className="flex flex-col items-start gap-2">
    <button type="button" className="btn btn-primary ripple cursor-pointer">Class-only press</button>
  </div>
</div>`

const basicHtml = `<div class="flex flex-wrap items-end gap-6">
  <div class="flex flex-col items-start gap-2">
    <button type="button" class="btn ripple cursor-pointer">Press wash</button>
  </div>
  <div class="flex flex-col items-start gap-2">
    <button type="button" class="btn btn-outline ripple cursor-pointer">Outline press</button>
  </div>
  <div class="flex flex-col items-start gap-2">
    <button type="button" class="btn btn-soft ripple ripple-ink cursor-pointer">Soft ink</button>
  </div>
</div>`

const basicJsx = `<div className="flex flex-wrap items-end gap-6">
  <div className="flex flex-col items-start gap-2">
    <button type="button" className="btn ripple cursor-pointer">Press wash</button>
  </div>
  <div className="flex flex-col items-start gap-2">
    <button type="button" className="btn btn-outline ripple cursor-pointer">Outline press</button>
  </div>
  <div className="flex flex-col items-start gap-2">
    <button type="button" className="btn btn-soft ripple ripple-ink cursor-pointer">Soft ink</button>
  </div>
</div>`

const colorsHtml = `<div class="flex flex-wrap items-end gap-6">
  <div class="flex flex-col items-start gap-2">
    <button type="button" class="btn btn-primary ripple ripple-primary cursor-pointer">Primary</button>
  </div>
  <div class="flex flex-col items-start gap-2">
    <button type="button" class="btn btn-secondary ripple ripple-secondary cursor-pointer">Secondary</button>
  </div>
  <div class="flex flex-col items-start gap-2">
    <button type="button" class="btn btn-accent ripple ripple-accent cursor-pointer">Accent</button>
  </div>
</div>`

const colorsJsx = `<div className="flex flex-wrap items-end gap-6">
  <div className="flex flex-col items-start gap-2">
    <button type="button" className="btn btn-primary ripple ripple-primary cursor-pointer">Primary</button>
  </div>
  <div className="flex flex-col items-start gap-2">
    <button type="button" className="btn btn-secondary ripple ripple-secondary cursor-pointer">Secondary</button>
  </div>
  <div className="flex flex-col items-start gap-2">
    <button type="button" className="btn btn-accent ripple ripple-accent cursor-pointer">Accent</button>
  </div>
</div>`

const originHtml = `<div class="flex flex-wrap items-end gap-6">
  <div class="flex flex-col items-start gap-2">
    <button type="button" class="btn btn-primary ripple cursor-pointer">Pointer origin</button>
  </div>
  <div class="flex flex-col items-start gap-2">
    <button type="button" class="btn btn-secondary ripple ripple-secondary cursor-pointer" data-ripple-origin="center">Centered</button>
  </div>
</div>`

const originJsx = `<div className="flex flex-wrap items-end gap-6">
  <div className="flex flex-col items-start gap-2">
    <button type="button" className="btn btn-primary ripple cursor-pointer">Pointer origin</button>
  </div>
  <div className="flex flex-col items-start gap-2">
    <button type="button" className="btn btn-secondary ripple ripple-secondary cursor-pointer" data-ripple-origin="center">Centered</button>
  </div>
</div>`

const surfacesHtml = `<div class="grid gap-6 lg:grid-cols-2">
  <div class="flex flex-col items-start gap-2">
    <div role="button" tabindex="0" class="card w-full max-w-sm cursor-pointer bg-base-100 shadow-sm ripple ripple-primary">
      <div class="card-body">
        <h3 class="card-title font-display text-lg">Mist plate</h3>
        <p class="text-sm text-ink-muted">Press anywhere on the card for a soft primary wash.</p>
      </div>
    </div>
  </div>
  <div class="flex flex-wrap items-end gap-4">
    <div class="flex flex-col items-start gap-2">
      <div class="tooltip tooltip-primary" data-tip="Favorite">
        <button type="button" class="btn btn-ghost btn-square btn-primary ripple ripple-primary cursor-pointer" aria-label="Favorite">
          <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg>
        </button>
      </div>
    </div>
    <div class="flex flex-col items-start gap-2">
      <div class="tooltip tooltip-secondary" data-tip="Settings">
        <button type="button" class="btn btn-ghost btn-square btn-secondary ripple ripple-secondary cursor-pointer" aria-label="Settings">
          <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>
        </button>
      </div>
    </div>
    <div class="flex flex-col items-start gap-2">
      <div class="tooltip tooltip-accent" data-tip="Palette">
        <button type="button" class="btn btn-ghost btn-square btn-accent ripple ripple-accent cursor-pointer" aria-label="Palette">
          <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/></svg>
        </button>
      </div>
    </div>
  </div>
</div>`

const surfacesJsx = `<div className="grid gap-6 lg:grid-cols-2">
  <div className="flex flex-col items-start gap-2">
    <div role="button" tabIndex="0" className="card w-full max-w-sm cursor-pointer bg-base-100 shadow-sm ripple ripple-primary">
      <div className="card-body">
        <h3 className="card-title font-display text-lg">Mist plate</h3>
        <p className="text-sm text-ink-muted">Press anywhere on the card for a soft primary wash.</p>
      </div>
    </div>
  </div>
  <div className="flex flex-wrap items-end gap-4">
    <div className="flex flex-col items-start gap-2">
      <div className="tooltip tooltip-primary" data-tip="Favorite">
        <button type="button" className="btn btn-ghost btn-square btn-primary ripple ripple-primary cursor-pointer" aria-label="Favorite">
          <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg>
        </button>
      </div>
    </div>
    <div className="flex flex-col items-start gap-2">
      <div className="tooltip tooltip-secondary" data-tip="Settings">
        <button type="button" className="btn btn-ghost btn-square btn-secondary ripple ripple-secondary cursor-pointer" aria-label="Settings">
          <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>
        </button>
      </div>
    </div>
    <div className="flex flex-col items-start gap-2">
      <div className="tooltip tooltip-accent" data-tip="Palette">
        <button type="button" className="btn btn-ghost btn-square btn-accent ripple ripple-accent cursor-pointer" aria-label="Palette">
          <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/></svg>
        </button>
      </div>
    </div>
  </div>
</div>`

const studioHtml = `<div class="flex flex-col items-start gap-2">
  <div role="button" tabindex="0" class="wash-panel wash-panel-ochre w-full max-w-md cursor-pointer ripple ripple-primary" aria-label="Pigment plate">
    <div class="flex items-start gap-3">
      <svg class="mt-0.5 size-5 shrink-0 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/></svg>
      <div>
        <p class="font-display text-lg font-semibold">Cerulean drop</p>
        <p class="mt-1 text-sm text-ink-muted">Press the plate. Watch the wash expand from your fingertip.</p>
      </div>
    </div>
  </div>
</div>`

const studioJsx = `<div className="flex flex-col items-start gap-2">
  <div role="button" tabIndex="0" className="wash-panel wash-panel-ochre w-full max-w-md cursor-pointer ripple ripple-primary" aria-label="Pigment plate">
    <div className="flex items-start gap-3">
      <svg className="mt-0.5 size-5 shrink-0 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/></svg>
      <div>
        <p className="font-display text-lg font-semibold">Cerulean drop</p>
        <p className="mt-1 text-sm text-ink-muted">Press the plate. Watch the wash expand from your fingertip.</p>
      </div>
    </div>
  </div>
</div>`

const motionHtml = `<div class="space-y-3 text-sm text-ink-muted">
  <p>
    Current preference:
    <span class="font-mono text-xs text-base-content">prefers-reduced-motion: no-preference</span>
  </p>
  <p>
    Under reduce, handlers skip wave creation and any leftover waves
    are cleared on unmount with timers and DOM nodes.
  </p>
  <div class="flex flex-col items-start gap-2">
    <button type="button" class="btn btn-primary ripple cursor-pointer">Try a press</button>
  </div>
</div>`

const motionJsx = `<div className="space-y-3 text-sm text-ink-muted">
  <p>
    Current preference:
    <span className="font-mono text-xs text-base-content">prefers-reduced-motion: no-preference</span>
  </p>
  <p>
    Under reduce, handlers skip wave creation and any leftover waves
    are cleared on unmount with timers and DOM nodes.
  </p>
  <div className="flex flex-col items-start gap-2">
    <button type="button" className="btn btn-primary ripple cursor-pointer">Try a press</button>
  </div>
</div>`

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
          Soft wash bloom on press.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="00 · Usage"
          title="How to opt in"
          description="Shared CSS host + one global listener"
        >
          <ShowcaseTabs
            preview={
              <>
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
              </>
            }
            html={usageHtml}
            jsx={usageJsx}
          />
        </Section>

        <Section
          eyebrow="01 · Basic"
          title="Click ripple on buttons"
          description="Pointer-origin wash bloom on daisyUI buttons"
        >
          <ShowcaseTabs
            preview={
              <>
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
              </>
            }
            html={basicHtml}
            jsx={basicJsx}
          />
        </Section>

        <Section
          eyebrow="02 · Colors"
          title="Primary, secondary, accent washes"
          description="Tinted ripple ink matched to studio theme colors"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
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
              </>
            }
            html={colorsHtml}
            jsx={colorsJsx}
          />
        </Section>

        <Section
          eyebrow="03 · Origin"
          title="Centered vs pointer-origin"
          description="Centered blooms from the host middle"
        >
          <ShowcaseTabs
            preview={
              <>
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
              </>
            }
            html={originHtml}
            jsx={originJsx}
          />
        </Section>

        <Section
          eyebrow="04 · Surfaces"
          title="Cards and icon buttons"
          description="Ripple hosts on card plates and square icon actions"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
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
              </>
            }
            html={surfacesHtml}
            jsx={surfacesJsx}
          />
        </Section>

        <Section
          eyebrow="05 · Studio"
          title="Pigment plate press"
          description="A wash panel that blooms from the press point, like a drop hitting"
        >
          <ShowcaseTabs
            preview={
              <>
                <Sample label="ripple ripple-primary + wash-panel">
                            <RippleSurface
                              className="wash-panel wash-panel-ochre w-full max-w-md"
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
              </>
            }
            html={studioHtml}
            jsx={studioJsx}
          />
        </Section>

        <Section
          eyebrow="06 · Motion"
          title="Reduced motion"
          description="Ripple nodes are not spawned when the OS asks for less motion"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
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
              </>
            }
            html={motionHtml}
            jsx={motionJsx}
          />
        </Section>
      </div>
    </>
  )
}
