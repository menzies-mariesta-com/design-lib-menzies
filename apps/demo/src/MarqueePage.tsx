import type { ReactNode } from 'react'
import { ShowcaseTabs } from './components/ShowcaseTabs'

const pigments = [
  'Ultramarine',
  'Quinacridone rose',
  'Yellow ochre',
  'Sap green',
  'Burnt sienna',
  'Payne gray',
  'Cobalt teal',
  'Indigo',
] as const

const washTips = [
  'Wet the paper before the first wash',
  'Tilt the board for a graded sky',
  'Leave dry islands for bloom edges',
  'Lift while the glaze is still shiny',
  'Layer cool over warm for depth',
  'Keep a clean sponge for soft edges',
] as const

const studioLabels = [
  'Fog wash',
  'Soft edge',
  'Hard edge',
  'Dry brush',
  'Glaze',
  'Granulation',
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
  className = '',
}: {
  label: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {children}
      <ClassLabel value={label} />
    </div>
  )
}

function Marquee({
  className = '',
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div className={`marquee ${className}`.trim()}>
      <div className="marquee-track">
        <div className="marquee-content">{children}</div>
        <div className="marquee-content" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-field border border-ink-border/80 bg-base-100 px-3 py-1.5 text-sm whitespace-nowrap shadow-sm">
      {children}
    </span>
  )
}

export default function MarqueePage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Marquee
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Composed scroll bands for pigment names and studio tips.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Horizontal scroll"
          description="Duplicated marquee-content strips animate as one seamless loop"
        >
          <ShowcaseTabs
            preview={
              <>
                <Sample label="marquee > marquee-track > marquee-content ×2">
                  <Marquee>
                    {pigments.map((name) => (
                      <Pill key={name}>{name}</Pill>
                    ))}
                  </Marquee>
                </Sample>
              </>
            }
            html={'<div class="marquee">\n  <div class="marquee-track">\n    <div class="marquee-content">\n      <span class="rounded-field border border-ink-border/80 bg-base-100 px-3 py-1.5 text-sm whitespace-nowrap shadow-sm">Ultramarine</span>\n      <!-- repeat items -->\n    </div>\n    <div class="marquee-content" aria-hidden="true">\n      <!-- duplicate for seamless loop -->\n    </div>\n  </div>\n</div>'}
            jsx={'<div className="marquee">\n  <div className="marquee-track">\n    <div className="marquee-content">\n      {pigments.map((name) => (\n        <Pill key={name}>{name}</Pill>\n      ))}\n    </div>\n    <div className="marquee-content" aria-hidden="true">\n      {pigments.map((name) => (\n        <Pill key={name}>{name}</Pill>\n      ))}\n    </div>\n  </div>\n</div>'}
          />
        </Section>

        <Section
          eyebrow="02 · Directions"
          title="Left, right, and vertical"
          description="Default scrolls left"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-8 lg:grid-cols-2">
                  <Sample label="marquee (default left)">
                    <Marquee>
                      {studioLabels.map((label) => (
                        <span
                          key={label}
                          className="font-display text-lg font-semibold whitespace-nowrap"
                        >
                          {label}
                        </span>
                      ))}
                    </Marquee>
                  </Sample>

                  <Sample label="marquee marquee-reverse">
                    <Marquee className="marquee-reverse">
                      {studioLabels.map((label) => (
                        <span
                          key={label}
                          className="font-display text-lg font-semibold whitespace-nowrap"
                        >
                          {label}
                        </span>
                      ))}
                    </Marquee>
                  </Sample>

                  <Sample
                    label="marquee marquee-vertical"
                    className="lg:col-span-2 items-stretch"
                  >
                    <div className="mx-auto w-full max-w-xs">
                      <Marquee className="marquee-vertical">
                        {washTips.map((tip) => (
                          <span
                            key={tip}
                            className="rounded-field border border-ink-border/70 bg-base-200/60 px-3 py-2 text-center text-sm"
                          >
                            {tip}
                          </span>
                        ))}
                      </Marquee>
                    </div>
                  </Sample>
                </div>
              </>
            }
            html={'<div class="grid gap-8 lg:grid-cols-2">\n  <div class="marquee">\n    <div class="marquee-track">\n      <div class="marquee-content"><!-- default left --></div>\n      <div class="marquee-content" aria-hidden="true"></div>\n    </div>\n  </div>\n  <div class="marquee marquee-reverse">\n    <div class="marquee-track">\n      <div class="marquee-content"><!-- reverse --></div>\n      <div class="marquee-content" aria-hidden="true"></div>\n    </div>\n  </div>\n  <div class="marquee marquee-vertical">\n    <div class="marquee-track">\n      <div class="marquee-content"><!-- vertical --></div>\n      <div class="marquee-content" aria-hidden="true"></div>\n    </div>\n  </div>\n</div>'}
            jsx={'<div className="grid gap-8 lg:grid-cols-2">\n  <Marquee>\n    {studioLabels.map((label) => (\n      <span key={label} className="font-display text-lg font-semibold whitespace-nowrap">{label}</span>\n    ))}\n  </Marquee>\n  <Marquee className="marquee-reverse">\n    {studioLabels.map((label) => (\n      <span key={label} className="font-display text-lg font-semibold whitespace-nowrap">{label}</span>\n    ))}\n  </Marquee>\n  <Marquee className="marquee-vertical">\n    {washTips.map((tip) => (\n      <span key={tip} className="rounded-field border border-ink-border/70 bg-base-200/60 px-3 py-2 text-center text-sm">{tip}</span>\n    ))}\n  </Marquee>\n</div>'}
          />
        </Section>

        <Section
          eyebrow="03 · Speeds / pause"
          title="Slow, fast, and pause on hover"
          description="Duration tokens plus marquee-hover-pause"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-8">
                  <Sample label="marquee marquee-slow marquee-hover-pause">
                    <Marquee className="marquee-slow marquee-hover-pause">
                      {washTips.map((tip) => (
                        <Pill key={tip}>{tip}</Pill>
                      ))}
                    </Marquee>
                  </Sample>

                  <Sample label="marquee marquee-fast marquee-hover-pause">
                    <Marquee className="marquee-fast marquee-hover-pause">
                      {pigments.map((name) => (
                        <Pill key={name}>{name}</Pill>
                      ))}
                    </Marquee>
                  </Sample>
                </div>
              </>
            }
            html={'<div class="marquee marquee-slow marquee-hover-pause">\n  <div class="marquee-track">\n    <div class="marquee-content"><!-- slow band --></div>\n    <div class="marquee-content" aria-hidden="true"></div>\n  </div>\n</div>\n<div class="marquee marquee-fast marquee-hover-pause">\n  <div class="marquee-track">\n    <div class="marquee-content"><!-- fast band --></div>\n    <div class="marquee-content" aria-hidden="true"></div>\n  </div>\n</div>'}
            jsx={'<Marquee className="marquee-slow marquee-hover-pause">\n  {washTips.map((tip) => (\n    <Pill key={tip}>{tip}</Pill>\n  ))}\n</Marquee>\n<Marquee className="marquee-fast marquee-hover-pause">\n  {pigments.map((name) => (\n    <Pill key={name}>{name}</Pill>\n  ))}\n</Marquee>'}
          />
        </Section>

        <Section
          eyebrow="04 · Badges / chips"
          title="Pigment chips in motion"
          description="Official daisyUI badge chips ride inside the composed marquee track"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <Sample label="marquee + badge badge-soft">
                  <Marquee className="marquee-hover-pause">
                    {[
                      { name: 'Ultramarine', cls: 'badge-primary' },
                      { name: 'Rose', cls: 'badge-secondary' },
                      { name: 'Ochre', cls: 'badge-accent' },
                      { name: 'Teal', cls: 'badge-info' },
                      { name: 'Sap', cls: 'badge-success' },
                      { name: 'Sienna', cls: 'badge-warning' },
                      { name: 'Indigo', cls: 'badge-neutral' },
                    ].map((item) => (
                      <span
                        key={item.name}
                        className={`badge badge-soft badge-lg ${item.cls}`}
                      >
                        {item.name}
                      </span>
                    ))}
                  </Marquee>
                </Sample>
              </>
            }
            html={'<div class="marquee marquee-hover-pause">\n  <div class="marquee-track">\n    <div class="marquee-content">\n      <span class="badge badge-soft badge-lg badge-primary">Ultramarine</span>\n      <span class="badge badge-soft badge-lg badge-secondary">Rose</span>\n      <!-- more badges -->\n    </div>\n    <div class="marquee-content" aria-hidden="true"></div>\n  </div>\n</div>'}
            jsx={'<Marquee className="marquee-hover-pause">\n  {[\n    { name: \'Ultramarine\', cls: \'badge-primary\' },\n    { name: \'Rose\', cls: \'badge-secondary\' },\n    // .\n  ].map((item) => (\n    <span key={item.name} className={`badge badge-soft badge-lg ${item.cls}`}>\n      {item.name}\n    </span>\n  ))}\n</Marquee>'}
          />
        </Section>

        <Section
          eyebrow="05 · Studio"
          title="Scrolling wash tips"
          description="A quieter band of studio advice for the Menzies Design desk"
        >
          <ShowcaseTabs
            preview={
              <>
                <Sample label="marquee marquee-slow">
                  <Marquee className="marquee-slow">
                    {washTips.map((tip) => (
                      <span
                        key={tip}
                        className="font-display text-base whitespace-nowrap text-ink-muted md:text-lg"
                      >
                        {tip}
                        <span className="mx-4 text-base-content/30" aria-hidden="true">
                          ·
                        </span>
                      </span>
                    ))}
                  </Marquee>
                </Sample>
              </>
            }
            html={'<div class="marquee marquee-slow">\n  <div class="marquee-track">\n    <div class="marquee-content">\n      <span class="font-display text-base whitespace-nowrap text-ink-muted md:text-lg">\n        Wet the paper before the first wash\n        <span class="mx-4 text-base-content/30" aria-hidden="true">·</span>\n      </span>\n      <!-- more tips -->\n    </div>\n    <div class="marquee-content" aria-hidden="true"></div>\n  </div>\n</div>'}
            jsx={'<Marquee className="marquee-slow">\n  {washTips.map((tip) => (\n    <span key={tip} className="font-display text-base whitespace-nowrap text-ink-muted md:text-lg">\n      {tip}\n      <span className="mx-4 text-base-content/30" aria-hidden="true">·</span>\n    </span>\n  ))}\n</Marquee>'}
          />
        </Section>

        <Section
          eyebrow="06 · Reduced motion"
          title="Pause when motion is reduced"
          description="Under prefers-reduced-motion: reduce, tracks stop"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-8 lg:grid-cols-2">
                  <Sample label="prefers-reduced-motion: reduce (CSS)">
                    <p className="mb-3 text-sm text-ink-muted">
                      System preference pauses every live marquee automatically. No
                      JS required.
                    </p>
                    <Marquee>
                      {pigments.slice(0, 4).map((name) => (
                        <Pill key={name}>{name}</Pill>
                      ))}
                    </Marquee>
                  </Sample>

                  <Sample label="marquee marquee-static">
                    <Marquee className="marquee-static">
                      {pigments.slice(0, 4).map((name) => (
                        <Pill key={name}>{name}</Pill>
                      ))}
                    </Marquee>
                  </Sample>
                </div>
              </>
            }
            html={'<div class="grid gap-8 lg:grid-cols-2">\n  <div class="marquee">\n    <div class="marquee-track">\n      <div class="marquee-content"><!-- paused by prefers-reduced-motion --></div>\n      <div class="marquee-content" aria-hidden="true"></div>\n    </div>\n  </div>\n  <div class="marquee marquee-static">\n    <div class="marquee-track">\n      <div class="marquee-content"><!-- forced static --></div>\n      <div class="marquee-content" aria-hidden="true"></div>\n    </div>\n  </div>\n</div>'}
            jsx={'<Marquee>\n  {pigments.slice(0, 4).map((name) => (\n    <Pill key={name}>{name}</Pill>\n  ))}\n</Marquee>\n<Marquee className="marquee-static">\n  {pigments.slice(0, 4).map((name) => (\n    <Pill key={name}>{name}</Pill>\n  ))}\n</Marquee>'}
          />
        </Section>

        <Section
          eyebrow="07 · Responsive"
          title="Narrow and full-bleed bands"
          description="Same loop scales from a compact card width to the full paper pane"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-8 md:grid-cols-[minmax(0,14rem)_1fr]">
                  <Sample label="marquee (max-w constrained)">
                    <Marquee className="marquee-fast marquee-hover-pause">
                      {studioLabels.map((label) => (
                        <Pill key={label}>{label}</Pill>
                      ))}
                    </Marquee>
                  </Sample>

                  <Sample label="marquee (fluid width)">
                    <Marquee className="marquee-hover-pause">
                      {pigments.map((name) => (
                        <span
                          key={name}
                          className="rounded-field bg-wash-blue/50 px-3 py-1.5 text-sm whitespace-nowrap"
                        >
                          {name}
                        </span>
                      ))}
                    </Marquee>
                  </Sample>
                </div>
              </>
            }
            html={'<div class="grid gap-8 md:grid-cols-[minmax(0,14rem)_1fr]">\n  <div class="marquee marquee-fast marquee-hover-pause">\n    <div class="marquee-track">\n      <div class="marquee-content"><!-- constrained width --></div>\n      <div class="marquee-content" aria-hidden="true"></div>\n    </div>\n  </div>\n  <div class="marquee marquee-hover-pause">\n    <div class="marquee-track">\n      <div class="marquee-content"><!-- fluid width --></div>\n      <div class="marquee-content" aria-hidden="true"></div>\n    </div>\n  </div>\n</div>'}
            jsx={'<div className="grid gap-8 md:grid-cols-[minmax(0,14rem)_1fr]">\n  <Marquee className="marquee-fast marquee-hover-pause">\n    {studioLabels.map((label) => (\n      <Pill key={label}>{label}</Pill>\n    ))}\n  </Marquee>\n  <Marquee className="marquee-hover-pause">\n    {pigments.map((name) => (\n      <span key={name} className="rounded-field bg-wash-blue/50 px-3 py-1.5 text-sm whitespace-nowrap">{name}</span>\n    ))}\n  </Marquee>\n</div>'}
          />
        </Section>
      </div>
    </>
  )
}
