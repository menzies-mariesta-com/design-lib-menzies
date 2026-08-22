import { type ReactNode } from 'react'
import {
  CircleCheck,
  Droplets,
  Eye,
  Pencil,
  Sun,
  Waves,
} from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import { ShowcaseTabs } from './components/ShowcaseTabs'

const colorSamples = [
  { name: 'Primary', hr: 'bg-primary', icon: 'text-primary' },
  { name: 'Secondary', hr: 'bg-secondary', icon: 'text-secondary' },
  { name: 'Accent', hr: 'bg-accent', icon: 'text-accent' },
  { name: 'Info', hr: 'bg-info', icon: 'text-info' },
  { name: 'Success', hr: 'bg-success', icon: 'text-success' },
  { name: 'Warning', hr: 'bg-warning', icon: 'text-warning' },
  { name: 'Error', hr: 'bg-error', icon: 'text-error' },
] as const

const studioChronicle = [
  {
    time: '09:00',
    title: 'Sketch',
    tip: 'Light graphite underdrawing on stretched paper.',
    icon: Pencil,
    hr: 'bg-primary',
    iconColor: 'text-primary',
  },
  {
    time: '09:40',
    title: 'First wash',
    tip: 'Soft sky and ground washes while the plate is still damp.',
    icon: Waves,
    hr: 'bg-secondary',
    iconColor: 'text-secondary',
  },
  {
    time: '10:30',
    title: 'Dry',
    tip: 'Wait until the surface is fully dry before glazing.',
    icon: Sun,
    hr: 'bg-accent',
    iconColor: 'text-accent',
  },
  {
    time: '11:15',
    title: 'Glaze',
    tip: 'Transparent color over dry wash for depth.',
    icon: Droplets,
    hr: 'bg-info',
    iconColor: 'text-info',
  },
  {
    time: '12:00',
    title: 'Critique',
    tip: 'Step back, note edges, and plan the next pass.',
    icon: Eye,
    hr: 'bg-success',
    iconColor: 'text-success',
  },
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

function CheckIcon({ className = '' }: { className?: string }) {
  return (
    <CircleCheck
      className={`size-5 ${className}`}
      strokeWidth={2}
      aria-hidden
    />
  )
}

export default function TimelinePage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Timeline
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">timeline</span> for studio
          chronicles: vertical and horizontal layouts, icons, boxed content,
          snap and compact modifiers, and semantic colors on connectors.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Vertical timeline"
          description="Default gallery layout is vertical. Use timeline-start, timeline-middle, and timeline-end with hr connectors between items."
        >
          <ShowcaseTabs
            preview={
              <>
                <Sample label="timeline timeline-vertical">
                            <ul className="timeline timeline-vertical cursor-default">
                              <li>
                                <div className="timeline-start">09:00</div>
                                <div className="timeline-middle">
                                  <CheckIcon />
                                </div>
                                <div className="timeline-end timeline-box">Stretch paper</div>
                                <hr />
                              </li>
                              <li>
                                <hr />
                                <div className="timeline-start">09:30</div>
                                <div className="timeline-middle">
                                  <CheckIcon />
                                </div>
                                <div className="timeline-end timeline-box">Mix wash</div>
                                <hr />
                              </li>
                              <li>
                                <hr />
                                <div className="timeline-start">10:15</div>
                                <div className="timeline-middle">
                                  <CheckIcon />
                                </div>
                                <div className="timeline-end timeline-box">Lay glaze</div>
                              </li>
                            </ul>
                          </Sample>
              </>
            }
            html={`<ul class="timeline timeline-vertical cursor-default">
              <li>
                <div class="timeline-start">09:00</div>
                <div class="timeline-middle">
                  <CheckIcon />
                </div>
                <div class="timeline-end timeline-box">Stretch paper</div>
                <hr />
              </li>
              <li>
                <hr />
                <div class="timeline-start">09:30</div>
                <div class="timeline-middle">
                  <CheckIcon />
                </div>
                <div class="timeline-end timeline-box">Mix wash</div>
                <hr />
              </li>
              <li>
                <hr />
                <div class="timeline-start">10:15</div>
                <div class="timeline-middle">
                  <CheckIcon />
                </div>
                <div class="timeline-end timeline-box">Lay glaze</div>
              </li>
            </ul>`}
            jsx={`<ul className="timeline timeline-vertical cursor-default">
              <li>
                <div className="timeline-start">09:00</div>
                <div className="timeline-middle">
                  <CheckIcon />
                </div>
                <div className="timeline-end timeline-box">Stretch paper</div>
                <hr />
              </li>
              <li>
                <hr />
                <div className="timeline-start">09:30</div>
                <div className="timeline-middle">
                  <CheckIcon />
                </div>
                <div className="timeline-end timeline-box">Mix wash</div>
                <hr />
              </li>
              <li>
                <hr />
                <div className="timeline-start">10:15</div>
                <div className="timeline-middle">
                  <CheckIcon />
                </div>
                <div className="timeline-end timeline-box">Lay glaze</div>
              </li>
            </ul>`}
          />
        </Section>

        <Section
          eyebrow="02 · Horizontal"
          title="Horizontal timeline"
          description="timeline-horizontal lays events left to right. Scroll on narrow viewports when needed."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <Sample label="timeline timeline-horizontal">
                            <div className="w-full max-w-full overflow-x-auto">
                              <ul className="timeline timeline-horizontal min-w-[28rem] cursor-default">
                                <li>
                                  <div className="timeline-start">Prep</div>
                                  <div className="timeline-middle">
                                    <CheckIcon />
                                  </div>
                                  <div className="timeline-end timeline-box">Paper</div>
                                  <hr />
                                </li>
                                <li>
                                  <hr />
                                  <div className="timeline-start">Wash</div>
                                  <div className="timeline-middle">
                                    <CheckIcon />
                                  </div>
                                  <div className="timeline-end timeline-box">Sky</div>
                                  <hr />
                                </li>
                                <li>
                                  <hr />
                                  <div className="timeline-start">Detail</div>
                                  <div className="timeline-middle">
                                    <CheckIcon />
                                  </div>
                                  <div className="timeline-end timeline-box">Edges</div>
                                </li>
                              </ul>
                            </div>
                          </Sample>
              </>
            }
            html={`<div class="w-full max-w-full overflow-x-auto">
              <ul class="timeline timeline-horizontal min-w-[28rem] cursor-default">
                <li>
                  <div class="timeline-start">Prep</div>
                  <div class="timeline-middle">
                    <CheckIcon />
                  </div>
                  <div class="timeline-end timeline-box">Paper</div>
                  <hr />
                </li>
                <li>
                  <hr />
                  <div class="timeline-start">Wash</div>
                  <div class="timeline-middle">
                    <CheckIcon />
                  </div>
                  <div class="timeline-end timeline-box">Sky</div>
                  <hr />
                </li>
                <li>
                  <hr />
                  <div class="timeline-start">Detail</div>
                  <div class="timeline-middle">
                    <CheckIcon />
                  </div>
                  <div class="timeline-end timeline-box">Edges</div>
                </li>
              </ul>
            </div>`}
            jsx={`<div className="w-full max-w-full overflow-x-auto">
              <ul className="timeline timeline-horizontal min-w-[28rem] cursor-default">
                <li>
                  <div className="timeline-start">Prep</div>
                  <div className="timeline-middle">
                    <CheckIcon />
                  </div>
                  <div className="timeline-end timeline-box">Paper</div>
                  <hr />
                </li>
                <li>
                  <hr />
                  <div className="timeline-start">Wash</div>
                  <div className="timeline-middle">
                    <CheckIcon />
                  </div>
                  <div className="timeline-end timeline-box">Sky</div>
                  <hr />
                </li>
                <li>
                  <hr />
                  <div className="timeline-start">Detail</div>
                  <div className="timeline-middle">
                    <CheckIcon />
                  </div>
                  <div className="timeline-end timeline-box">Edges</div>
                </li>
              </ul>
            </div>`}
          />
        </Section>

        <Section
          eyebrow="03 · Icons"
          title="Lucide in timeline-middle"
          description="Place Lucide icons in timeline-middle for stage markers. Pair with timeline-box on the end content."
        >
          <ShowcaseTabs
            preview={
              <>
                <Sample label="timeline-middle · Lucide icons">
                            <ul className="timeline timeline-vertical cursor-default">
                              <li>
                                <div className="timeline-start">Sketch</div>
                                <div className="timeline-middle">
                                  <Pencil className="size-5" strokeWidth={2} aria-hidden />
                                </div>
                                <div className="timeline-end timeline-box">
                                  Graphite underdrawing
                                </div>
                                <hr />
                              </li>
                              <li>
                                <hr />
                                <div className="timeline-start">Wash</div>
                                <div className="timeline-middle">
                                  <Waves className="size-5" strokeWidth={2} aria-hidden />
                                </div>
                                <div className="timeline-end timeline-box">First soft wash</div>
                                <hr />
                              </li>
                              <li>
                                <hr />
                                <div className="timeline-start">Dry</div>
                                <div className="timeline-middle">
                                  <Sun className="size-5" strokeWidth={2} aria-hidden />
                                </div>
                                <div className="timeline-end timeline-box">Full air dry</div>
                                <hr />
                              </li>
                              <li>
                                <hr />
                                <div className="timeline-start">Glaze</div>
                                <div className="timeline-middle">
                                  <Droplets className="size-5" strokeWidth={2} aria-hidden />
                                </div>
                                <div className="timeline-end timeline-box">Transparent layers</div>
                              </li>
                            </ul>
                          </Sample>
              </>
            }
            html={`<ul class="timeline timeline-vertical cursor-default">
              <li>
                <div class="timeline-start">Sketch</div>
                <div class="timeline-middle">
                  <Pencil class="size-5" strokeWidth= aria-hidden />
                </div>
                <div class="timeline-end timeline-box">
                  Graphite underdrawing
                </div>
                <hr />
              </li>
              <li>
                <hr />
                <div class="timeline-start">Wash</div>
                <div class="timeline-middle">
                  <Waves class="size-5" strokeWidth= aria-hidden />
                </div>
                <div class="timeline-end timeline-box">First soft wash</div>
                <hr />
              </li>
              <li>
                <hr />
                <div class="timeline-start">Dry</div>
                <div class="timeline-middle">
                  <Sun class="size-5" strokeWidth= aria-hidden />
                </div>
                <div class="timeline-end timeline-box">Full air dry</div>
                <hr />
              </li>
              <li>
                <hr />
                <div class="timeline-start">Glaze</div>
                <div class="timeline-middle">
                  <Droplets class="size-5" strokeWidth= aria-hidden />
                </div>
                <div class="timeline-end timeline-box">Transparent layers</div>
              </li>
            </ul>`}
            jsx={`<ul className="timeline timeline-vertical cursor-default">
              <li>
                <div className="timeline-start">Sketch</div>
                <div className="timeline-middle">
                  <Pencil className="size-5" strokeWidth={2} aria-hidden />
                </div>
                <div className="timeline-end timeline-box">
                  Graphite underdrawing
                </div>
                <hr />
              </li>
              <li>
                <hr />
                <div className="timeline-start">Wash</div>
                <div className="timeline-middle">
                  <Waves className="size-5" strokeWidth={2} aria-hidden />
                </div>
                <div className="timeline-end timeline-box">First soft wash</div>
                <hr />
              </li>
              <li>
                <hr />
                <div className="timeline-start">Dry</div>
                <div className="timeline-middle">
                  <Sun className="size-5" strokeWidth={2} aria-hidden />
                </div>
                <div className="timeline-end timeline-box">Full air dry</div>
                <hr />
              </li>
              <li>
                <hr />
                <div className="timeline-start">Glaze</div>
                <div className="timeline-middle">
                  <Droplets className="size-5" strokeWidth={2} aria-hidden />
                </div>
                <div className="timeline-end timeline-box">Transparent layers</div>
              </li>
            </ul>`}
          />
        </Section>

        <Section
          eyebrow="04 · Boxed and snap"
          title="Box, snap, and compact"
          description="timeline-box styles content; timeline-snap-icon pins the icon; timeline-compact keeps items on one side (handy on small screens)."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-col gap-8">
                            <Sample label="timeline-box">
                              <ul className="timeline timeline-vertical cursor-default">
                                <li>
                                  <div className="timeline-start timeline-box">Pigment mix</div>
                                  <div className="timeline-middle">
                                    <CheckIcon />
                                  </div>
                                  <div className="timeline-end">Ready</div>
                                  <hr />
                                </li>
                                <li>
                                  <hr />
                                  <div className="timeline-start timeline-box">Test swatch</div>
                                  <div className="timeline-middle">
                                    <CheckIcon />
                                  </div>
                                  <div className="timeline-end">Checked</div>
                                </li>
                              </ul>
                            </Sample>
                
                            <Sample label="timeline-snap-icon timeline-vertical">
                              <ul className="timeline timeline-snap-icon timeline-vertical cursor-default">
                                <li>
                                  <div className="timeline-middle">
                                    <CheckIcon className="text-primary" />
                                  </div>
                                  <div className="timeline-end timeline-box">
                                    Snap icon to the start edge
                                  </div>
                                  <hr />
                                </li>
                                <li>
                                  <hr />
                                  <div className="timeline-middle">
                                    <CheckIcon className="text-primary" />
                                  </div>
                                  <div className="timeline-end timeline-box">
                                    Useful for long narrative blocks
                                  </div>
                                </li>
                              </ul>
                            </Sample>
                
                            <Sample label="timeline-compact timeline-vertical">
                              <ul className="timeline timeline-compact timeline-vertical cursor-default">
                                <li>
                                  <div className="timeline-middle">
                                    <CheckIcon />
                                  </div>
                                  <div className="timeline-end timeline-box">
                                    All items forced to one side
                                  </div>
                                  <hr />
                                </li>
                                <li>
                                  <hr />
                                  <div className="timeline-middle">
                                    <CheckIcon />
                                  </div>
                                  <div className="timeline-end timeline-box">
                                    Cleaner on narrow panels
                                  </div>
                                </li>
                              </ul>
                            </Sample>
                          </div>
              </>
            }
            html={`<div class="flex flex-col gap-8">
            
              <ul class="timeline timeline-vertical cursor-default">
                <li>
                  <div class="timeline-start timeline-box">Pigment mix</div>
                  <div class="timeline-middle">
                    <CheckIcon />
                  </div>
                  <div class="timeline-end">Ready</div>
                  <hr />
                </li>
                <li>
                  <hr />
                  <div class="timeline-start timeline-box">Test swatch</div>
                  <div class="timeline-middle">
                    <CheckIcon />
                  </div>
                  <div class="timeline-end">Checked</div>
                </li>
              </ul>
            

            
              <ul class="timeline timeline-snap-icon timeline-vertical cursor-default">
                <li>
                  <div class="timeline-middle">
                    <CheckIcon class="text-primary" />
                  </div>
                  <div class="timeline-end timeline-box">
                    Snap icon to the start edge
                  </div>
                  <hr />
                </li>
                <li>
                  <hr />
                  <div class="timeline-middle">
                    <CheckIcon class="text-primary" />
                  </div>
                  <div class="timeline-end timeline-box">
                    Useful for long narrative blocks
                  </div>
                </li>
              </ul>
            

            
              <ul class="timeline timeline-compact timeline-vertical cursor-default">
                <li>
                  <div class="timeline-middle">
                    <CheckIcon />
                  </div>
                  <div class="timeline-end timeline-box">
                    All items forced to one side
                  </div>
                  <hr />
                </li>
                <li>
                  <hr />
                  <div class="timeline-middle">
                    <CheckIcon />
                  </div>
                  <div class="timeline-end timeline-box">
                    Cleaner on narrow panels
                  </div>
                </li>
              </ul>
            
          </div>`}
            jsx={`<div className="flex flex-col gap-8">
            
              <ul className="timeline timeline-vertical cursor-default">
                <li>
                  <div className="timeline-start timeline-box">Pigment mix</div>
                  <div className="timeline-middle">
                    <CheckIcon />
                  </div>
                  <div className="timeline-end">Ready</div>
                  <hr />
                </li>
                <li>
                  <hr />
                  <div className="timeline-start timeline-box">Test swatch</div>
                  <div className="timeline-middle">
                    <CheckIcon />
                  </div>
                  <div className="timeline-end">Checked</div>
                </li>
              </ul>
            

            
              <ul className="timeline timeline-snap-icon timeline-vertical cursor-default">
                <li>
                  <div className="timeline-middle">
                    <CheckIcon className="text-primary" />
                  </div>
                  <div className="timeline-end timeline-box">
                    Snap icon to the start edge
                  </div>
                  <hr />
                </li>
                <li>
                  <hr />
                  <div className="timeline-middle">
                    <CheckIcon className="text-primary" />
                  </div>
                  <div className="timeline-end timeline-box">
                    Useful for long narrative blocks
                  </div>
                </li>
              </ul>
            

            
              <ul className="timeline timeline-compact timeline-vertical cursor-default">
                <li>
                  <div className="timeline-middle">
                    <CheckIcon />
                  </div>
                  <div className="timeline-end timeline-box">
                    All items forced to one side
                  </div>
                  <hr />
                </li>
                <li>
                  <hr />
                  <div className="timeline-middle">
                    <CheckIcon />
                  </div>
                  <div className="timeline-end timeline-box">
                    Cleaner on narrow panels
                  </div>
                </li>
              </ul>
            
          </div>`}
          />
        </Section>

        <Section
          eyebrow="05 · Colors"
          title="Colored connectors and icons"
          description="Color hr with bg-* and icons with text-* semantic utilities. Class labels show the pairing."
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {colorSamples.map((c) => (
                              <Sample
                                key={c.name}
                                label={`hr ${c.hr} · icon ${c.icon}`}
                              >
                                <div className="flex w-full flex-col gap-2">
                                  <span className="text-sm font-medium">{c.name}</span>
                                  <ul className="timeline timeline-vertical cursor-default">
                                    <li>
                                      <div className="timeline-middle">
                                        <CheckIcon className={c.icon} />
                                      </div>
                                      <div className="timeline-end timeline-box">Start</div>
                                      <hr className={c.hr} />
                                    </li>
                                    <li>
                                      <hr className={c.hr} />
                                      <div className="timeline-middle">
                                        <CheckIcon className={c.icon} />
                                      </div>
                                      <div className="timeline-end timeline-box">Next</div>
                                      <hr />
                                    </li>
                                    <li>
                                      <hr />
                                      <div className="timeline-middle">
                                        <CheckIcon />
                                      </div>
                                      <div className="timeline-end timeline-box">Pending</div>
                                    </li>
                                  </ul>
                                </div>
                              </Sample>
                            ))}
                          </div>
              </>
            }
            html={`<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <!-- repeat for each item -->
          </div>`}
            jsx={`<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {colorSamples.map((c) => (
              
                <div className="flex w-full flex-col gap-2">
                  <span className="text-sm font-medium">{c.name}</span>
                  <ul className="timeline timeline-vertical cursor-default">
                    <li>
                      <div className="timeline-middle">
                        <CheckIcon className={c.icon} />
                      </div>
                      <div className="timeline-end timeline-box">Start</div>
                      <hr className={c.hr} />
                    </li>
                    <li>
                      <hr className={c.hr} />
                      <div className="timeline-middle">
                        <CheckIcon className={c.icon} />
                      </div>
                      <div className="timeline-end timeline-box">Next</div>
                      <hr />
                    </li>
                    <li>
                      <hr />
                      <div className="timeline-middle">
                        <CheckIcon />
                      </div>
                      <div className="timeline-end timeline-box">Pending</div>
                    </li>
                  </ul>
                </div>
              
            ))}
          </div>`}
          />
        </Section>

        <Section
          eyebrow="06 · Studio chronicle"
          title="Menzies Design painting session"
          description="Sketch, first wash, dry, glaze, critique: a full studio session on a vertical timeline."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-col gap-6">
                            <ul
                              className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical cursor-default"
                              aria-label="Menzies Design painting session"
                            >
                              {studioChronicle.map((stage, index) => {
                                const Icon = stage.icon
                                const isLast = index === studioChronicle.length - 1
                                const isFirst = index === 0
                                return (
                                  <li key={stage.title}>
                                    {!isFirst ? <hr className={stage.hr} /> : null}
                                    <div className="timeline-middle">
                                      <Icon
                                        className={`size-5 ${stage.iconColor}`}
                                        strokeWidth={2}
                                        aria-hidden
                                      />
                                    </div>
                                    <div className="timeline-end mb-8 md:mb-10">
                                      <time className="font-mono text-xs italic text-ink-muted">
                                        {stage.time}
                                      </time>
                                      <p className="text-lg font-semibold">{stage.title}</p>
                                      <p className="mt-1 max-w-md text-sm text-ink-muted">
                                        {stage.tip}
                                      </p>
                                    </div>
                                    {!isLast ? <hr className={stage.hr} /> : null}
                                  </li>
                                )
                              })}
                            </ul>
                            <ClassLabel value="timeline-snap-icon max-md:timeline-compact timeline-vertical · studio" />
                          </div>
              </>
            }
            html={`<div class="flex flex-col gap-6">
            <ul
              class="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical cursor-default"
              aria-label="Menzies Design painting session"
            >
              <!-- repeat for each item -->
            </ul>
            
          </div>`}
            jsx={`<div className="flex flex-col gap-6">
            <ul
              className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical cursor-default"
              aria-label="Menzies Design painting session"
            >
              {studioChronicle.map((stage, index) => {
                const Icon = stage.icon
                const isLast = index === studioChronicle.length - 1
                const isFirst = index === 0
                return (
                  <li key={stage.title}>
                    {!isFirst ? <hr className={stage.hr} /> : null}
                    <div className="timeline-middle">
                      <Icon
                        className={\`size-5 \${stage.iconColor}\`}
                        strokeWidth={2}
                        aria-hidden
                      />
                    </div>
                    <div className="timeline-end mb-8 md:mb-10">
                      <time className="font-mono text-xs italic text-ink-muted">
                        {stage.time}
                      </time>
                      <p className="text-lg font-semibold">{stage.title}</p>
                      <p className="mt-1 max-w-md text-sm text-ink-muted">
                        {stage.tip}
                      </p>
                    </div>
                    {!isLast ? <hr className={stage.hr} /> : null}
                  </li>
                )
              })}
            </ul>
            
          </div>`}
          />
        </Section>

        <Section
          eyebrow="07 · Responsive"
          title="Adaptive direction"
          description="Vertical on small screens, horizontal from lg up. Horizontal trails can scroll when space is tight."
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-col gap-8">
                            <Sample label="timeline-vertical lg:timeline-horizontal">
                              <div className="w-full max-w-full overflow-x-auto">
                                <ul className="timeline timeline-vertical cursor-default lg:timeline-horizontal">
                                  <li>
                                    <div className="timeline-start">Stretch</div>
                                    <div className="timeline-middle">
                                      <CheckIcon className="text-primary" />
                                    </div>
                                    <div className="timeline-end timeline-box">Paper</div>
                                    <hr className="bg-primary" />
                                  </li>
                                  <li>
                                    <hr className="bg-primary" />
                                    <div className="timeline-start">Wash</div>
                                    <div className="timeline-middle">
                                      <CheckIcon className="text-primary" />
                                    </div>
                                    <div className="timeline-end timeline-box">Sky</div>
                                    <hr className="bg-primary" />
                                  </li>
                                  <li>
                                    <hr className="bg-primary" />
                                    <div className="timeline-start">Glaze</div>
                                    <div className="timeline-middle">
                                      <CheckIcon className="text-secondary" />
                                    </div>
                                    <div className="timeline-end timeline-box">Depth</div>
                                    <hr />
                                  </li>
                                  <li>
                                    <hr />
                                    <div className="timeline-start">Sign</div>
                                    <div className="timeline-middle">
                                      <CheckIcon />
                                    </div>
                                    <div className="timeline-end timeline-box">Finish</div>
                                  </li>
                                </ul>
                              </div>
                            </Sample>
                
                            <Sample label="timeline-snap-icon max-md:timeline-compact">
                              <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical cursor-default">
                                <li>
                                  <div className="timeline-middle">
                                    <CheckIcon className="text-info" />
                                  </div>
                                  <div className="timeline-end mb-6">
                                    <p className="font-medium">Compact on mobile</p>
                                    <p className="text-sm text-ink-muted">
                                      max-md:timeline-compact stacks content on one side below
                                      the md breakpoint.
                                    </p>
                                  </div>
                                  <hr className="bg-info" />
                                </li>
                                <li>
                                  <hr className="bg-info" />
                                  <div className="timeline-middle">
                                    <CheckIcon className="text-info" />
                                  </div>
                                  <div className="timeline-end">
                                    <p className="font-medium">Snap icons</p>
                                    <p className="text-sm text-ink-muted">
                                      timeline-snap-icon keeps markers aligned for longer copy.
                                    </p>
                                  </div>
                                </li>
                              </ul>
                            </Sample>
                          </div>
              </>
            }
            html={`<div class="flex flex-col gap-8">
            
              <div class="w-full max-w-full overflow-x-auto">
                <ul class="timeline timeline-vertical cursor-default lg:timeline-horizontal">
                  <li>
                    <div class="timeline-start">Stretch</div>
                    <div class="timeline-middle">
                      <CheckIcon class="text-primary" />
                    </div>
                    <div class="timeline-end timeline-box">Paper</div>
                    <hr class="bg-primary" />
                  </li>
                  <li>
                    <hr class="bg-primary" />
                    <div class="timeline-start">Wash</div>
                    <div class="timeline-middle">
                      <CheckIcon class="text-primary" />
                    </div>
                    <div class="timeline-end timeline-box">Sky</div>
                    <hr class="bg-primary" />
                  </li>
                  <li>
                    <hr class="bg-primary" />
                    <div class="timeline-start">Glaze</div>
                    <div class="timeline-middle">
                      <CheckIcon class="text-secondary" />
                    </div>
                    <div class="timeline-end timeline-box">Depth</div>
                    <hr />
                  </li>
                  <li>
                    <hr />
                    <div class="timeline-start">Sign</div>
                    <div class="timeline-middle">
                      <CheckIcon />
                    </div>
                    <div class="timeline-end timeline-box">Finish</div>
                  </li>
                </ul>
              </div>
            

            
              <ul class="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical cursor-default">
                <li>
                  <div class="timeline-middle">
                    <CheckIcon class="text-info" />
                  </div>
                  <div class="timeline-end mb-6">
                    <p class="font-medium">Compact on mobile</p>
                    <p class="text-sm text-ink-muted">
                      max-md:timeline-compact stacks content on one side below
                      the md breakpoint.
                    </p>
                  </div>
                  <hr class="bg-info" />
                </li>
                <li>
                  <hr class="bg-info" />
                  <div class="timeline-middle">
                    <CheckIcon class="text-info" />
                  </div>
                  <div class="timeline-end">
                    <p class="font-medium">Snap icons</p>
                    <p class="text-sm text-ink-muted">
                      timeline-snap-icon keeps markers aligned for longer copy.
                    </p>
                  </div>
                </li>
              </ul>
            
          </div>`}
            jsx={`<div className="flex flex-col gap-8">
            
              <div className="w-full max-w-full overflow-x-auto">
                <ul className="timeline timeline-vertical cursor-default lg:timeline-horizontal">
                  <li>
                    <div className="timeline-start">Stretch</div>
                    <div className="timeline-middle">
                      <CheckIcon className="text-primary" />
                    </div>
                    <div className="timeline-end timeline-box">Paper</div>
                    <hr className="bg-primary" />
                  </li>
                  <li>
                    <hr className="bg-primary" />
                    <div className="timeline-start">Wash</div>
                    <div className="timeline-middle">
                      <CheckIcon className="text-primary" />
                    </div>
                    <div className="timeline-end timeline-box">Sky</div>
                    <hr className="bg-primary" />
                  </li>
                  <li>
                    <hr className="bg-primary" />
                    <div className="timeline-start">Glaze</div>
                    <div className="timeline-middle">
                      <CheckIcon className="text-secondary" />
                    </div>
                    <div className="timeline-end timeline-box">Depth</div>
                    <hr />
                  </li>
                  <li>
                    <hr />
                    <div className="timeline-start">Sign</div>
                    <div className="timeline-middle">
                      <CheckIcon />
                    </div>
                    <div className="timeline-end timeline-box">Finish</div>
                  </li>
                </ul>
              </div>
            

            
              <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical cursor-default">
                <li>
                  <div className="timeline-middle">
                    <CheckIcon className="text-info" />
                  </div>
                  <div className="timeline-end mb-6">
                    <p className="font-medium">Compact on mobile</p>
                    <p className="text-sm text-ink-muted">
                      max-md:timeline-compact stacks content on one side below
                      the md breakpoint.
                    </p>
                  </div>
                  <hr className="bg-info" />
                </li>
                <li>
                  <hr className="bg-info" />
                  <div className="timeline-middle">
                    <CheckIcon className="text-info" />
                  </div>
                  <div className="timeline-end">
                    <p className="font-medium">Snap icons</p>
                    <p className="text-sm text-ink-muted">
                      timeline-snap-icon keeps markers aligned for longer copy.
                    </p>
                  </div>
                </li>
              </ul>
            
          </div>`}
          />
        </Section>
      </div>
    </>
  )
}
