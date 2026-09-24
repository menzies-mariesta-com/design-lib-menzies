import type { ReactNode } from 'react'
import { OverflowMarquee } from '#plain'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import { daisyToJsx } from './snippets/markup/daisyGalleryDefaults'
import {
  behaviourMarqueeHtml,
  behaviourMarqueeJsx,
  behaviourMarqueeSvelteFiles,
} from './snippets/svelte/behaviour-marquee'

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

const badgeItems = [
  { name: 'Ultramarine', cls: 'badge-primary' },
  { name: 'Rose', cls: 'badge-secondary' },
  { name: 'Ochre', cls: 'badge-accent' },
  { name: 'Teal', cls: 'badge-info' },
  { name: 'Sap', cls: 'badge-success' },
  { name: 'Sienna', cls: 'badge-warning' },
  { name: 'Indigo', cls: 'badge-neutral' },
] as const

function toJsxMarkup(html: string): string {
  return daisyToJsx(html).replace(/stroke-width=/g, 'strokeWidth=')
}

function marqueeShell(inner: string, className = ''): string {
  const cls = className ? `marquee ${className}` : 'marquee'
  return `<div class="${cls}">
  <div class="marquee-track">
    <div class="marquee-content">
${inner}
    </div>
    <div class="marquee-content" aria-hidden="true">
${inner}
    </div>
  </div>
</div>`
}

function pill(text: string): string {
  return `      <span class="rounded-field border border-ink-border/80 bg-base-100 px-3 py-1.5 text-sm whitespace-nowrap shadow-sm">${text}</span>`
}

const basicHtml = `<div class="flex flex-col gap-2">
${marqueeShell(pigments.map((n) => pill(n)).join('\n'))}
  <code class="font-mono text-[0.65rem] text-ink-muted">marquee &gt; marquee-track &gt; marquee-content ×2</code>
</div>`

const directionsHtml = `<div class="grid gap-8 lg:grid-cols-2">
  <div class="flex flex-col gap-2">
${marqueeShell(
  studioLabels
    .map(
      (label) =>
        `      <span class="font-display text-lg font-semibold whitespace-nowrap">${label}</span>`,
    )
    .join('\n'),
)}
    <code class="font-mono text-[0.65rem] text-ink-muted">marquee (default left)</code>
  </div>
  <div class="flex flex-col gap-2">
${marqueeShell(
  studioLabels
    .map(
      (label) =>
        `      <span class="font-display text-lg font-semibold whitespace-nowrap">${label}</span>`,
    )
    .join('\n'),
  'marquee-reverse',
)}
    <code class="font-mono text-[0.65rem] text-ink-muted">marquee marquee-reverse</code>
  </div>
  <div class="flex flex-col gap-2 lg:col-span-2 items-stretch">
    <div class="mx-auto w-full max-w-xs">
${marqueeShell(
  washTips
    .map(
      (tip) =>
        `      <span class="rounded-field border border-ink-border/70 bg-base-200/60 px-3 py-2 text-center text-sm">${tip}</span>`,
    )
    .join('\n'),
  'marquee-vertical',
)}
    </div>
    <code class="font-mono text-[0.65rem] text-ink-muted">marquee marquee-vertical</code>
  </div>
</div>`

const speedsHtml = `<div class="grid gap-8">
  <div class="flex flex-col gap-2">
${marqueeShell(washTips.map((t) => pill(t)).join('\n'), 'marquee-slow marquee-hover-pause')}
    <code class="font-mono text-[0.65rem] text-ink-muted">marquee marquee-slow marquee-hover-pause</code>
  </div>
  <div class="flex flex-col gap-2">
${marqueeShell(pigments.map((n) => pill(n)).join('\n'), 'marquee-fast marquee-hover-pause')}
    <code class="font-mono text-[0.65rem] text-ink-muted">marquee marquee-fast marquee-hover-pause</code>
  </div>
</div>`

const badgesHtml = `<div class="flex flex-col gap-2">
${marqueeShell(
  badgeItems
    .map(
      (item) =>
        `      <span class="badge badge-soft badge-lg ${item.cls}">${item.name}</span>`,
    )
    .join('\n'),
  'marquee-hover-pause',
)}
  <code class="font-mono text-[0.65rem] text-ink-muted">marquee + badge badge-soft</code>
</div>`

const studioHtml = `<div class="flex flex-col gap-2">
${marqueeShell(
  washTips
    .map(
      (tip) =>
        `      <span class="font-display text-base whitespace-nowrap text-ink-muted md:text-lg">${tip}<span class="mx-4 text-base-content/30" aria-hidden="true">·</span></span>`,
    )
    .join('\n'),
  'marquee-slow',
)}
  <code class="font-mono text-[0.65rem] text-ink-muted">marquee marquee-slow</code>
</div>`

const reducedHtml = `<div class="grid gap-8 lg:grid-cols-2">
  <div class="flex flex-col gap-2">
    <p class="mb-3 text-sm text-ink-muted">System preference pauses every live marquee automatically. No JS required.</p>
${marqueeShell(pigments.slice(0, 4).map((n) => pill(n)).join('\n'))}
    <code class="font-mono text-[0.65rem] text-ink-muted">prefers-reduced-motion: reduce (CSS)</code>
  </div>
  <div class="flex flex-col gap-2">
${marqueeShell(pigments.slice(0, 4).map((n) => pill(n)).join('\n'), 'marquee-static')}
    <code class="font-mono text-[0.65rem] text-ink-muted">marquee marquee-static</code>
  </div>
</div>`

const responsiveHtml = `<div class="grid gap-8 md:grid-cols-[minmax(0,14rem)_1fr]">
  <div class="flex flex-col gap-2">
${marqueeShell(studioLabels.map((l) => pill(l)).join('\n'), 'marquee-fast marquee-hover-pause')}
    <code class="font-mono text-[0.65rem] text-ink-muted">marquee (max-w constrained)</code>
  </div>
  <div class="flex flex-col gap-2">
${marqueeShell(
  pigments
    .map(
      (name) =>
        `      <span class="rounded-field bg-wash-blue/50 px-3 py-1.5 text-sm whitespace-nowrap">${name}</span>`,
    )
    .join('\n'),
  'marquee-hover-pause',
)}
    <code class="font-mono text-[0.65rem] text-ink-muted">marquee (fluid width)</code>
  </div>
</div>`

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
            html={basicHtml}
            jsx={toJsxMarkup(basicHtml)}
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
            html={directionsHtml}
            jsx={toJsxMarkup(directionsHtml)}
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
            html={speedsHtml}
            jsx={toJsxMarkup(speedsHtml)}
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
                    {badgeItems.map((item) => (
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
            html={badgesHtml}
            jsx={toJsxMarkup(badgesHtml)}
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
            html={studioHtml}
            jsx={toJsxMarkup(studioHtml)}
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
            html={reducedHtml}
            jsx={toJsxMarkup(reducedHtml)}
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
            html={responsiveHtml}
            jsx={toJsxMarkup(responsiveHtml)}
          />
        </Section>

        <Section
          eyebrow="08 · Overflow on hover"
          title="Truncated text that marquees"
          description="Only clipped labels animate. Hover or focus to loop the full string; leave to restore ellipsis. Full Behaviour gallery: Overflow marquee in the sidebar."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-8 md:grid-cols-2">
                  <Sample label="truncate (auto-attach)">
                    <div className="w-full max-w-[11rem] rounded-field border border-ink-border/70 bg-base-100 px-3 py-2">
                      <p className="truncate text-sm">
                        Ultramarine glaze over warm ochre underpainting for depth
                      </p>
                    </div>
                    <p className="text-xs text-ink-muted">
                      Hover the truncated line. Non-overflowing text stays still.
                    </p>
                  </Sample>

                  <Sample label="<OverflowMarquee>">
                    <div className="w-full max-w-[11rem] rounded-field border border-ink-border/70 bg-base-100 px-3 py-2">
                      <OverflowMarquee className="text-sm">
                        Wet-on-wet bloom edges need a clean sponge and patience
                      </OverflowMarquee>
                    </div>
                    <p className="text-xs text-ink-muted">
                      Explicit React wrapper when you own the markup.
                    </p>
                  </Sample>

                  <Sample label="truncate (fits: no marquee)" className="md:col-span-2">
                    <div className="w-full max-w-xl rounded-field border border-ink-border/70 bg-base-100 px-3 py-2">
                      <p className="truncate text-sm">Short label</p>
                    </div>
                  </Sample>
                </div>
              </>
            }
            html={behaviourMarqueeHtml}
            jsx={behaviourMarqueeJsx}
            svelteFiles={behaviourMarqueeSvelteFiles}
          />
        </Section>
      </div>
    </>
  )
}
