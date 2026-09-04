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
            <!-- repeat for each item -->
          </div>`}
            jsx={`<div className="grid gap-6 sm:grid-cols-2">
            {colors.map((c) => (
              
                <div className="flex w-full flex-col gap-2">
                  <span className="text-sm font-medium">{c.name}</span>
                  <ul className="steps w-full">
                    <li className={\`step \${c.className}\`}>Start</li>
                    <li className={\`step \${c.className}\`}>Mid</li>
                    <li className="step">End</li>
                  </ul>
                </div>
              
            ))}
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
                <li class="step step-primary" data-content="✓">
                  Checked
                </li>
                <li class="step step-primary" data-content="!">
                  Alert
                </li>
                <li class="step" data-content="?">
                  Question
                </li>
                <li class="step" data-content="★">
                  Star
                </li>
              </ul>
            
            
              <ul class="steps w-full">
                <li class="step step-primary">
                  <span class="step-icon">
                    <Check class="size-4" strokeWidth= aria-hidden />
                  </span>
                  Done
                </li>
                <li class="step step-secondary">
                  <span class="step-icon">
                    <Droplets class="size-4" strokeWidth= aria-hidden />
                  </span>
                  Wash
                </li>
                <li class="step step-accent">
                  <span class="step-icon">
                    <Sun class="size-4" strokeWidth= aria-hidden />
                  </span>
                  Dry
                </li>
                <li class="step">
                  <span class="step-icon">
                    <Sparkles class="size-4" strokeWidth= aria-hidden />
                  </span>
                  Finish
                </li>
              </ul>
            
          </div>`}
            jsx={`<div className="flex flex-col gap-8">
            
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
            html={`<InteractiveSteps />`}
            jsx={`<InteractiveSteps />`}
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
              <!-- repeat for each item -->
            </ul>
            <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              <!-- repeat for each item -->
            </div>
            
          </div>`}
            jsx={`<div className="flex flex-col gap-6">
            <ul className="steps w-full" aria-label="Studio workflow">
              {studioStages.map((stage, index) => {
                const Icon = stage.icon
                const done = index < 3
                return (
                  <li
                    key={stage.label}
                    className={\`step \${done ? 'step-primary' : index === 3 ? 'step-secondary' : ''}\`}
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
