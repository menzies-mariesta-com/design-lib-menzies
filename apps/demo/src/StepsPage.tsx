import { useState, type ReactNode } from 'react'
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Droplets,
  Pencil,
  Sparkles,
  Sun,
  Waves,
} from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import { ShowcaseTabs } from './components/ShowcaseTabs'

const colors = [
  { name: 'Neutral', className: 'step-neutral' },
  { name: 'Primary', className: 'step-primary' },
  { name: 'Secondary', className: 'step-secondary' },
  { name: 'Accent', className: 'step-accent' },
  { name: 'Info', className: 'step-info' },
  { name: 'Success', className: 'step-success' },
  { name: 'Warning', className: 'step-warning' },
  { name: 'Error', className: 'step-error' },
] as const

const studioStages = [
  { label: 'Sketch', icon: Pencil, tip: 'Light graphite underdrawing.' },
  { label: 'Wash', icon: Waves, tip: 'Lay a soft first wash.' },
  { label: 'Dry', icon: Sun, tip: 'Wait until the plate is fully dry.' },
  { label: 'Glaze', icon: Droplets, tip: 'Transparent color over dry wash.' },
  { label: 'Finish', icon: Sparkles, tip: 'Final accents and signature.' },
] as const

const interactiveLabels = [
  'Prep paper',
  'Mix pigment',
  'First wash',
  'Details',
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

function InteractiveSteps() {
  const [current, setCurrent] = useState(1)
  const last = interactiveLabels.length - 1

  return (
    <div className="flex w-full flex-col gap-5">
      <ul className="steps w-full" aria-label="Interactive studio steps">
        {interactiveLabels.map((label, index) => (
          <li
            key={label}
            className={`step cursor-pointer ${index <= current ? 'step-primary' : ''}`}
            onClick={() => setCurrent(index)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setCurrent(index)
              }
            }}
            role="button"
            tabIndex={0}
            aria-current={index === current ? 'step' : undefined}
          >
            {label}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          className={`btn btn-sm btn-ghost ${current <= 0 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          disabled={current <= 0}
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
        >
          <ChevronLeft className="size-4" strokeWidth={2} aria-hidden />
          Previous
        </button>
        <button
          type="button"
          className={`btn btn-sm btn-primary ${current >= last ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          disabled={current >= last}
          onClick={() => setCurrent((c) => Math.min(last, c + 1))}
        >
          Next
          <ChevronRight className="size-4" strokeWidth={2} aria-hidden />
        </button>
        <span className="text-sm text-ink-muted">
          Step {current + 1} of {interactiveLabels.length}
        </span>
      </div>
      <ClassLabel value="steps + step-primary (controlled)" />
    </div>
  )
}

export default function StepsPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Steps
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">steps</span>.: horizontal and vertical layouts, semantic colors.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Horizontal steps"
          description="Default direction is horizontal"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-col gap-6">
                            <Sample label="steps">
                              <ul className="steps w-full">
                                <li className="step">Register</li>
                                <li className="step">Choose plan</li>
                                <li className="step">Purchase</li>
                                <li className="step">Receive</li>
                              </ul>
                            </Sample>
                            <Sample label="steps · step-primary (partial)">
                              <ul className="steps w-full">
                                <li className="step step-primary">Register</li>
                                <li className="step step-primary">Choose plan</li>
                                <li className="step">Purchase</li>
                                <li className="step">Receive</li>
                              </ul>
                            </Sample>
                          </div>
              </>
            }
            html={`<div class="flex flex-col gap-6">
  <ul class="steps w-full">
    <li class="step">Register</li>
    <li class="step">Choose plan</li>
    <li class="step">Purchase</li>
    <li class="step">Receive</li>
  </ul>
  <ul class="steps w-full">
    <li class="step step-primary">Register</li>
    <li class="step step-primary">Choose plan</li>
    <li class="step">Purchase</li>
    <li class="step">Receive</li>
  </ul>
</div>`}
            jsx={`<div className="flex flex-col gap-6">
  <ul className="steps w-full">
    <li className="step">Register</li>
    <li className="step">Choose plan</li>
    <li className="step">Purchase</li>
    <li className="step">Receive</li>
  </ul>
  <ul className="steps w-full">
    <li className="step step-primary">Register</li>
    <li className="step step-primary">Choose plan</li>
    <li className="step">Purchase</li>
    <li className="step">Receive</li>
  </ul>
</div>`}
          />
        </Section>

        <Section
          eyebrow="02 · Vertical"
          title="Vertical steps"
          description="Add steps-vertical on the list for a stacked process trail"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <Sample label="steps steps-vertical">
                            <ul className="steps steps-vertical">
                              <li className="step step-primary">Stretch paper</li>
                              <li className="step step-primary">Mix wash</li>
                              <li className="step">Lay glaze</li>
                              <li className="step">Sign plate</li>
                            </ul>
                          </Sample>
              </>
            }
            html={`<ul class="steps steps-vertical">
  <li class="step step-primary">Stretch paper</li>
  <li class="step step-primary">Mix wash</li>
  <li class="step">Lay glaze</li>
  <li class="step">Sign plate</li>
</ul>`}
            jsx={`<ul className="steps steps-vertical">
  <li className="step step-primary">Stretch paper</li>
  <li className="step step-primary">Mix wash</li>
  <li className="step">Lay glaze</li>
  <li className="step">Sign plate</li>
</ul>`}
          />
        </Section>

        <Section
          eyebrow="03 · Colors"
          title="Semantic step colors"
          description="step-primary through step-error"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-6 sm:grid-cols-2">
                            {colors.map((c) => (
                              <Sample key={c.name} label={`step ${c.className}`}>
                                <div className="flex w-full flex-col gap-2">
                                  <span className="text-sm font-medium">{c.name}</span>
                                  <ul className="steps w-full">
                                    <li className={`step ${c.className}`}>Start</li>
                                    <li className={`step ${c.className}`}>Mid</li>
                                    <li className="step">End</li>
                                  </ul>
                                </div>
                              </Sample>
                            ))}
                          </div>
              </>
            }
            html={`<div class="grid gap-6 sm:grid-cols-2">
  <div class="flex w-full flex-col gap-2">
    <span class="text-sm font-medium">Neutral</span>
    <ul class="steps w-full">
      <li class="step step-neutral">Start</li>
      <li class="step step-neutral">Mid</li>
      <li class="step">End</li>
    </ul>
  </div>
  <div class="flex w-full flex-col gap-2">
    <span class="text-sm font-medium">Primary</span>
    <ul class="steps w-full">
      <li class="step step-primary">Start</li>
      <li class="step step-primary">Mid</li>
      <li class="step">End</li>
    </ul>
  </div>
  <div class="flex w-full flex-col gap-2">
    <span class="text-sm font-medium">Secondary</span>
    <ul class="steps w-full">
      <li class="step step-secondary">Start</li>
      <li class="step step-secondary">Mid</li>
      <li class="step">End</li>
    </ul>
  </div>
  <div class="flex w-full flex-col gap-2">
    <span class="text-sm font-medium">Accent</span>
    <ul class="steps w-full">
      <li class="step step-accent">Start</li>
      <li class="step step-accent">Mid</li>
      <li class="step">End</li>
    </ul>
  </div>
  <div class="flex w-full flex-col gap-2">
    <span class="text-sm font-medium">Info</span>
    <ul class="steps w-full">
      <li class="step step-info">Start</li>
      <li class="step step-info">Mid</li>
      <li class="step">End</li>
    </ul>
  </div>
  <div class="flex w-full flex-col gap-2">
    <span class="text-sm font-medium">Success</span>
    <ul class="steps w-full">
      <li class="step step-success">Start</li>
      <li class="step step-success">Mid</li>
      <li class="step">End</li>
    </ul>
  </div>
  <div class="flex w-full flex-col gap-2">
    <span class="text-sm font-medium">Warning</span>
    <ul class="steps w-full">
      <li class="step step-warning">Start</li>
      <li class="step step-warning">Mid</li>
      <li class="step">End</li>
    </ul>
  </div>
  <div class="flex w-full flex-col gap-2">
    <span class="text-sm font-medium">Error</span>
    <ul class="steps w-full">
      <li class="step step-error">Start</li>
      <li class="step step-error">Mid</li>
      <li class="step">End</li>
    </ul>
  </div>
</div>`}
            jsx={`<div className="grid gap-6 sm:grid-cols-2">
  <div className="flex w-full flex-col gap-2">
    <span className="text-sm font-medium">Neutral</span>
    <ul className="steps w-full">
      <li className="step step-neutral">Start</li>
      <li className="step step-neutral">Mid</li>
      <li className="step">End</li>
    </ul>
  </div>
  <div className="flex w-full flex-col gap-2">
    <span className="text-sm font-medium">Primary</span>
    <ul className="steps w-full">
      <li className="step step-primary">Start</li>
      <li className="step step-primary">Mid</li>
      <li className="step">End</li>
    </ul>
  </div>
  <div className="flex w-full flex-col gap-2">
    <span className="text-sm font-medium">Secondary</span>
    <ul className="steps w-full">
      <li className="step step-secondary">Start</li>
      <li className="step step-secondary">Mid</li>
      <li className="step">End</li>
    </ul>
  </div>
  <div className="flex w-full flex-col gap-2">
    <span className="text-sm font-medium">Accent</span>
    <ul className="steps w-full">
      <li className="step step-accent">Start</li>
      <li className="step step-accent">Mid</li>
      <li className="step">End</li>
    </ul>
  </div>
  <div className="flex w-full flex-col gap-2">
    <span className="text-sm font-medium">Info</span>
    <ul className="steps w-full">
      <li className="step step-info">Start</li>
      <li className="step step-info">Mid</li>
      <li className="step">End</li>
    </ul>
  </div>
  <div className="flex w-full flex-col gap-2">
    <span className="text-sm font-medium">Success</span>
    <ul className="steps w-full">
      <li className="step step-success">Start</li>
      <li className="step step-success">Mid</li>
      <li className="step">End</li>
    </ul>
  </div>
  <div className="flex w-full flex-col gap-2">
    <span className="text-sm font-medium">Warning</span>
    <ul className="steps w-full">
      <li className="step step-warning">Start</li>
      <li className="step step-warning">Mid</li>
      <li className="step">End</li>
    </ul>
  </div>
  <div className="flex w-full flex-col gap-2">
    <span className="text-sm font-medium">Error</span>
    <ul className="steps w-full">
      <li className="step step-error">Start</li>
      <li className="step step-error">Mid</li>
      <li className="step">End</li>
    </ul>
  </div>
</div>`}
          />
        </Section>

        <Section
          eyebrow="04 · Data content"
          title="Custom bubble content"
          description="Use data-content for symbols or letters, or nest Lucide icons in"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-col gap-8">
                            <Sample label='step data-content="…"'>
                              <ul className="steps w-full">
                                <li className="step step-primary" data-content="✓">
                                  Checked
                                </li>
                                <li className="step step-primary" data-content="!">
                                  Alert
                                </li>
                                <li className="step" data-content="?">
                                  Question
                                </li>
                                <li className="step" data-content="★">
                                  Star
                                </li>
                              </ul>
                            </Sample>
                            <Sample label="step · step-icon">
                              <ul className="steps w-full">
                                <li className="step step-primary">
                                  <span className="step-icon">
                                    <Check className="size-4" strokeWidth={2} aria-hidden />
                                  </span>
                                  Done
                                </li>
                                <li className="step step-secondary">
                                  <span className="step-icon">
                                    <Droplets className="size-4" strokeWidth={2} aria-hidden />
                                  </span>
                                  Wash
                                </li>
                                <li className="step step-accent">
                                  <span className="step-icon">
                                    <Sun className="size-4" strokeWidth={2} aria-hidden />
                                  </span>
                                  Dry
                                </li>
                                <li className="step">
                                  <span className="step-icon">
                                    <Sparkles className="size-4" strokeWidth={2} aria-hidden />
                                  </span>
                                  Finish
                                </li>
                              </ul>
                            </Sample>
                          </div>
              </>
            }
            html={`<div class="flex flex-col gap-8">
  <ul class="steps w-full">
    <li class="step step-primary" data-content="✓">Checked</li>
    <li class="step step-primary" data-content="!">Alert</li>
    <li class="step" data-content="?">Question</li>
    <li class="step" data-content="★">Star</li>
  </ul>
  <ul class="steps w-full">
    <li class="step step-primary"><span class="step-icon"><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg></span>Done</li>
    <li class="step step-secondary"><span class="step-icon"><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 1 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/></svg></span>Wash</li>
    <li class="step step-accent"><span class="step-icon"><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg></span>Dry</li>
    <li class="step"><span class="step-icon"><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg></span>Finish</li>
  </ul>
</div>`}
            jsx={`<div className="flex flex-col gap-8">
  <ul className="steps w-full">
    <li className="step step-primary" data-content="✓">Checked</li>
    <li className="step step-primary" data-content="!">Alert</li>
    <li className="step" data-content="?">Question</li>
    <li className="step" data-content="★">Star</li>
  </ul>
  <ul className="steps w-full">
    <li className="step step-primary"><span className="step-icon"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg></span>Done</li>
    <li className="step step-secondary"><span className="step-icon"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 1 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/></svg></span>Wash</li>
    <li className="step step-accent"><span className="step-icon"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg></span>Dry</li>
    <li className="step"><span className="step-icon"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg></span>Finish</li>
  </ul>
</div>`}
          />
        </Section>

        <Section
          eyebrow="05 · Interactive"
          title="Controlled current step"
          description="Drive step-primary from React state"
        >
          <ShowcaseTabs
            preview={
              <>
                <InteractiveSteps />
              </>
            }
            html={`<div class="flex w-full flex-col gap-5">
  <ul class="steps w-full" aria-label="Interactive studio steps">
    <li class="step step-primary cursor-pointer">Prep paper</li>
    <li class="step step-primary cursor-pointer" aria-current="step">Mix pigment</li>
    <li class="step cursor-pointer">First wash</li>
    <li class="step cursor-pointer">Details</li>
  </ul>
  <div class="flex flex-wrap items-center gap-2">
    <button type="button" class="btn btn-sm btn-ghost cursor-pointer"><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg> Previous</button>
    <button type="button" class="btn btn-sm btn-primary cursor-pointer">Next <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></button>
    <span class="text-sm text-ink-muted">Step 2 of 4</span>
  </div>
</div>`}
            jsx={`<div className="flex w-full flex-col gap-5">
  <ul className="steps w-full" aria-label="Interactive studio steps">
    <li className="step step-primary cursor-pointer">Prep paper</li>
    <li className="step step-primary cursor-pointer" aria-current="step">Mix pigment</li>
    <li className="step cursor-pointer">First wash</li>
    <li className="step cursor-pointer">Details</li>
  </ul>
  <div className="flex flex-wrap items-center gap-2">
    <button type="button" className="btn btn-sm btn-ghost cursor-pointer"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg> Previous</button>
    <button type="button" className="btn btn-sm btn-primary cursor-pointer">Next <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></button>
    <span className="text-sm text-ink-muted">Step 2 of 4</span>
  </div>
</div>`}
          />
        </Section>

        <Section
          eyebrow="06 · Studio"
          title="Studio workflow"
          description="Sketch, wash, dry, glaze, finish: a watercolor plate pipeline"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-col gap-6">
                            <ul className="steps w-full" aria-label="Studio workflow">
                              {studioStages.map((stage, index) => {
                                const Icon = stage.icon
                                const done = index < 3
                                return (
                                  <li
                                    key={stage.label}
                                    className={`step ${done ? 'step-primary' : index === 3 ? 'step-secondary' : ''}`}
                                  >
                                    <span className="step-icon">
                                      <Icon className="size-4" strokeWidth={2} aria-hidden />
                                    </span>
                                    {stage.label}
                                  </li>
                                )
                              })}
                            </ul>
                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                              {studioStages.map((stage, index) => (
                                <div
                                  key={stage.label}
                                  className="rounded-box border border-ink-border/60 bg-base-100/70 px-3 py-3"
                                >
                                  <p className="text-sm font-medium">
                                    {index + 1}. {stage.label}
                                  </p>
                                  <p className="mt-1 text-xs text-ink-muted">{stage.tip}</p>
                                </div>
                              ))}
                            </div>
                            <ClassLabel value="steps · step-icon · studio stages" />
                          </div>
              </>
            }
            html={`<div class="flex flex-col gap-6">
  <ul class="steps w-full" aria-label="Studio workflow">
    <li class="step step-primary"><span class="step-icon"><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg></span>Sketch</li>
    <li class="step step-primary"><span class="step-icon"><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg></span>Wash</li>
    <li class="step step-primary"><span class="step-icon"><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg></span>Dry</li>
    <li class="step step-secondary"><span class="step-icon"><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 1 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/></svg></span>Glaze</li>
    <li class="step"><span class="step-icon"><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg></span>Finish</li>
  </ul>
  <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
    <div class="rounded-box border border-ink-border/60 bg-base-100/70 px-3 py-3">
      <p class="text-sm font-medium">1. Sketch</p>
      <p class="mt-1 text-xs text-ink-muted">Light graphite underdrawing.</p>
    </div>
    <div class="rounded-box border border-ink-border/60 bg-base-100/70 px-3 py-3">
      <p class="text-sm font-medium">2. Wash</p>
      <p class="mt-1 text-xs text-ink-muted">Lay a soft first wash.</p>
    </div>
    <div class="rounded-box border border-ink-border/60 bg-base-100/70 px-3 py-3">
      <p class="text-sm font-medium">3. Dry</p>
      <p class="mt-1 text-xs text-ink-muted">Wait until the plate is fully dry.</p>
    </div>
    <div class="rounded-box border border-ink-border/60 bg-base-100/70 px-3 py-3">
      <p class="text-sm font-medium">4. Glaze</p>
      <p class="mt-1 text-xs text-ink-muted">Transparent color over dry wash.</p>
    </div>
    <div class="rounded-box border border-ink-border/60 bg-base-100/70 px-3 py-3">
      <p class="text-sm font-medium">5. Finish</p>
      <p class="mt-1 text-xs text-ink-muted">Final accents and signature.</p>
    </div>
  </div>
</div>`}
            jsx={`<div className="flex flex-col gap-6">
  <ul className="steps w-full" aria-label="Studio workflow">
    <li className="step step-primary"><span className="step-icon"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg></span>Sketch</li>
    <li className="step step-primary"><span className="step-icon"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg></span>Wash</li>
    <li className="step step-primary"><span className="step-icon"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg></span>Dry</li>
    <li className="step step-secondary"><span className="step-icon"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 1 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/></svg></span>Glaze</li>
    <li className="step"><span className="step-icon"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg></span>Finish</li>
  </ul>
  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
    <div className="rounded-box border border-ink-border/60 bg-base-100/70 px-3 py-3">
      <p className="text-sm font-medium">1. Sketch</p>
      <p className="mt-1 text-xs text-ink-muted">Light graphite underdrawing.</p>
    </div>
    <div className="rounded-box border border-ink-border/60 bg-base-100/70 px-3 py-3">
      <p className="text-sm font-medium">2. Wash</p>
      <p className="mt-1 text-xs text-ink-muted">Lay a soft first wash.</p>
    </div>
    <div className="rounded-box border border-ink-border/60 bg-base-100/70 px-3 py-3">
      <p className="text-sm font-medium">3. Dry</p>
      <p className="mt-1 text-xs text-ink-muted">Wait until the plate is fully dry.</p>
    </div>
    <div className="rounded-box border border-ink-border/60 bg-base-100/70 px-3 py-3">
      <p className="text-sm font-medium">4. Glaze</p>
      <p className="mt-1 text-xs text-ink-muted">Transparent color over dry wash.</p>
    </div>
    <div className="rounded-box border border-ink-border/60 bg-base-100/70 px-3 py-3">
      <p className="text-sm font-medium">5. Finish</p>
      <p className="mt-1 text-xs text-ink-muted">Final accents and signature.</p>
    </div>
  </div>
</div>`}
          />
        </Section>

        <Section
          eyebrow="07 · Responsive"
          title="Adaptive direction"
          description="Vertical on small screens, horizontal from md up"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-col gap-8">
                            <Sample label="steps steps-vertical md:steps-horizontal">
                              <ul className="steps steps-vertical w-full md:steps-horizontal">
                                <li className="step step-primary">Prep</li>
                                <li className="step step-primary">Wash</li>
                                <li className="step">Glaze</li>
                                <li className="step">Finish</li>
                              </ul>
                            </Sample>
                            <Sample label="steps · overflow-x-auto (scroll)">
                              <div className="w-full max-w-full overflow-x-auto">
                                <ul className="steps min-w-[36rem]">
                                  <li className="step step-info">Stretch</li>
                                  <li className="step step-info">Mask</li>
                                  <li className="step step-info">Wash A</li>
                                  <li className="step step-info">Wash B</li>
                                  <li className="step">Dry</li>
                                  <li className="step">Detail</li>
                                  <li className="step">Varnish</li>
                                </ul>
                              </div>
                            </Sample>
                          </div>
              </>
            }
            html={`<div class="flex flex-col gap-8">
  <ul class="steps steps-vertical w-full md:steps-horizontal">
    <li class="step step-primary">Prep</li>
    <li class="step step-primary">Wash</li>
    <li class="step">Glaze</li>
    <li class="step">Finish</li>
  </ul>
  <div class="w-full max-w-full overflow-x-auto">
    <ul class="steps min-w-[36rem]">
      <li class="step step-info">Stretch</li>
      <li class="step step-info">Mask</li>
      <li class="step step-info">Wash A</li>
      <li class="step step-info">Wash B</li>
      <li class="step">Dry</li>
      <li class="step">Detail</li>
      <li class="step">Varnish</li>
    </ul>
  </div>
</div>`}
            jsx={`<div className="flex flex-col gap-8">
  <ul className="steps steps-vertical w-full md:steps-horizontal">
    <li className="step step-primary">Prep</li>
    <li className="step step-primary">Wash</li>
    <li className="step">Glaze</li>
    <li className="step">Finish</li>
  </ul>
  <div className="w-full max-w-full overflow-x-auto">
    <ul className="steps min-w-[36rem]">
      <li className="step step-info">Stretch</li>
      <li className="step step-info">Mask</li>
      <li className="step step-info">Wash A</li>
      <li className="step step-info">Wash B</li>
      <li className="step">Dry</li>
      <li className="step">Detail</li>
      <li className="step">Varnish</li>
    </ul>
  </div>
</div>`}
          />
        </Section>
      </div>
    </>
  )
}
