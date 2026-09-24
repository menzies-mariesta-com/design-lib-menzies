import type { ReactNode } from 'react'

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

function WashBlock({ label }: { label: string }) {
  return (
    <div className="card rounded-box grid h-20 grow place-items-center bg-base-300 text-sm font-medium">
      {label}
    </div>
  )
}

const colorDividers = [
  { label: 'Default', className: 'divider' },
  { label: 'Neutral', className: 'divider divider-neutral' },
  { label: 'Primary', className: 'divider divider-primary' },
  { label: 'Secondary', className: 'divider divider-secondary' },
  { label: 'Accent', className: 'divider divider-accent' },
  { label: 'Success', className: 'divider divider-success' },
  { label: 'Warning', className: 'divider divider-warning' },
  { label: 'Info', className: 'divider divider-info' },
  { label: 'Error', className: 'divider divider-error' },
] as const

const horizOrHtml = `<div class="flex w-full flex-col">
  <div class="card rounded-box grid h-20 grow place-items-center bg-base-300 text-sm font-medium">Wet wash notes</div>
  <div class="divider">OR</div>
  <div class="card rounded-box grid h-20 grow place-items-center bg-base-300 text-sm font-medium">Dry brush notes</div>
</div>`

const horizOrJsx = `<div className="flex w-full flex-col">
  <div className="card rounded-box grid h-20 grow place-items-center bg-base-300 text-sm font-medium">Wet wash notes</div>
  <div className="divider">OR</div>
  <div className="card rounded-box grid h-20 grow place-items-center bg-base-300 text-sm font-medium">Dry brush notes</div>
</div>`

const horizPlainHtml = `<div class="flex w-full flex-col">
  <div class="card rounded-box grid h-20 grow place-items-center bg-base-300 text-sm font-medium">Plate A</div>
  <div class="divider"></div>
  <div class="card rounded-box grid h-20 grow place-items-center bg-base-300 text-sm font-medium">Plate B</div>
</div>`

const horizPlainJsx = `<div className="flex w-full flex-col">
  <div className="card rounded-box grid h-20 grow place-items-center bg-base-300 text-sm font-medium">Plate A</div>
  <div className="divider"></div>
  <div className="card rounded-box grid h-20 grow place-items-center bg-base-300 text-sm font-medium">Plate B</div>
</div>`

const vertHtml = `<div class="flex w-full">
  <div class="card rounded-box grid h-20 grow place-items-center bg-base-300 text-sm font-medium">Cerulean</div>
  <div class="divider divider-horizontal">OR</div>
  <div class="card rounded-box grid h-20 grow place-items-center bg-base-300 text-sm font-medium">Ultramarine</div>
</div>`

const vertJsx = `<div className="flex w-full">
  <div className="card rounded-box grid h-20 grow place-items-center bg-base-300 text-sm font-medium">Cerulean</div>
  <div className="divider divider-horizontal">OR</div>
  <div className="card rounded-box grid h-20 grow place-items-center bg-base-300 text-sm font-medium">Ultramarine</div>
</div>`

const color0Html = `<div class="divider">Default</div>`

const color0Jsx = `<div className="divider">Default</div>`

const color1Html = `<div class="divider divider-neutral">Neutral</div>`

const color1Jsx = `<div className="divider divider-neutral">Neutral</div>`

const color2Html = `<div class="divider divider-primary">Primary</div>`

const color2Jsx = `<div className="divider divider-primary">Primary</div>`

const color3Html = `<div class="divider divider-secondary">Secondary</div>`

const color3Jsx = `<div className="divider divider-secondary">Secondary</div>`

const color4Html = `<div class="divider divider-accent">Accent</div>`

const color4Jsx = `<div className="divider divider-accent">Accent</div>`

const color5Html = `<div class="divider divider-success">Success</div>`

const color5Jsx = `<div className="divider divider-success">Success</div>`

const color6Html = `<div class="divider divider-warning">Warning</div>`

const color6Jsx = `<div className="divider divider-warning">Warning</div>`

const color7Html = `<div class="divider divider-info">Info</div>`

const color7Jsx = `<div className="divider divider-info">Info</div>`

const color8Html = `<div class="divider divider-error">Error</div>`

const color8Jsx = `<div className="divider divider-error">Error</div>`

const posHHtml = `<div class="flex w-full flex-col">
  <div class="divider divider-start">Start</div>
  <div class="divider">Default</div>
  <div class="divider divider-end">End</div>
</div>`

const posHJsx = `<div className="flex w-full flex-col">
  <div className="divider divider-start">Start</div>
  <div className="divider">Default</div>
  <div className="divider divider-end">End</div>
</div>`

const posVHtml = `<div class="flex h-40 w-full">
  <div class="divider divider-horizontal divider-start">Start</div>
  <div class="divider divider-horizontal">Default</div>
  <div class="divider divider-horizontal divider-end">End</div>
</div>`

const posVJsx = `<div className="flex h-40 w-full">
  <div className="divider divider-horizontal divider-start">Start</div>
  <div className="divider divider-horizontal">Default</div>
  <div className="divider divider-horizontal divider-end">End</div>
</div>`

const studioHtml = `<div class="rounded-box border border-ink-border/60 bg-base-100/50 p-5">
  <div class="space-y-1">
    <p class="font-display text-lg font-semibold">Morning stretch</p>
    <p class="text-sm text-ink-muted">Soft cerulean across damp paper. Keep edges open for later lifts.</p>
  </div>
  <div class="divider divider-primary">Pigment mix</div>
  <div class="space-y-1">
    <p class="font-display text-lg font-semibold">Midday glaze</p>
    <p class="text-sm text-ink-muted">Thin ochre over the dry pass. Watch for blooms at the wet edge.</p>
  </div>
  <div class="divider divider-secondary">Drying pause</div>
  <div class="space-y-1">
    <p class="font-display text-lg font-semibold">Evening detail</p>
    <p class="text-sm text-ink-muted">Dry brush and ink weight for stems, shadows, and signature marks.</p>
  </div>
  <div class="divider divider-accent divider-end">Studio close</div>
  <p class="text-sm text-ink-muted">Cap the palette, rinse brushes, and leave plates flat overnight.</p>
</div>
<p class="mt-3">
  <code class="font-mono text-[0.65rem] text-ink-muted">divider-primary · divider-secondary · divider-accent divider-end</code>
</p>`

const studioJsx = `<div className="rounded-box border border-ink-border/60 bg-base-100/50 p-5">
  <div className="space-y-1">
    <p className="font-display text-lg font-semibold">Morning stretch</p>
    <p className="text-sm text-ink-muted">Soft cerulean across damp paper. Keep edges open for later lifts.</p>
  </div>
  <div className="divider divider-primary">Pigment mix</div>
  <div className="space-y-1">
    <p className="font-display text-lg font-semibold">Midday glaze</p>
    <p className="text-sm text-ink-muted">Thin ochre over the dry pass. Watch for blooms at the wet edge.</p>
  </div>
  <div className="divider divider-secondary">Drying pause</div>
  <div className="space-y-1">
    <p className="font-display text-lg font-semibold">Evening detail</p>
    <p className="text-sm text-ink-muted">Dry brush and ink weight for stems, shadows, and signature marks.</p>
  </div>
  <div className="divider divider-accent divider-end">Studio close</div>
  <p className="text-sm text-ink-muted">Cap the palette, rinse brushes, and leave plates flat overnight.</p>
</div>
<p className="mt-3">
  <code className="font-mono text-[0.65rem] text-ink-muted">divider-primary · divider-secondary · divider-accent divider-end</code>
</p>`

const responsiveHtml = `<div class="flex w-full flex-col lg:flex-row">
  <div class="card rounded-box grid h-32 grow place-items-center bg-base-300 text-sm font-medium">Wet wash plate</div>
  <div class="divider lg:divider-horizontal">OR</div>
  <div class="card rounded-box grid h-32 grow place-items-center bg-base-300 text-sm font-medium">Dry brush plate</div>
</div>`

const responsiveJsx = `<div className="flex w-full flex-col lg:flex-row">
  <div className="card rounded-box grid h-32 grow place-items-center bg-base-300 text-sm font-medium">Wet wash plate</div>
  <div className="divider lg:divider-horizontal">OR</div>
  <div className="card rounded-box grid h-32 grow place-items-center bg-base-300 text-sm font-medium">Dry brush plate</div>
</div>`

export default function DividerPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Divider
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">divider</span> lines that separate watercolor desk sections.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Horizontal"
          title="Default divider with and without text"
          description="Vertical stack is the default direction"
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <ShowcaseTabs
            preview={
              <>

              <div className="flex w-full flex-col">
                              <WashBlock label="Wet wash notes" />
                              <div className="divider">OR</div>
                              <WashBlock label="Dry brush notes" />
                            </div>
            
              </>
            }
            html={horizOrHtml}
            jsx={horizOrJsx}
          />
            <ShowcaseTabs
            preview={
              <>

              <div className="flex w-full flex-col">
                              <WashBlock label="Plate A" />
                              <div className="divider" />
                              <WashBlock label="Plate B" />
                            </div>
            
              </>
            }
            html={horizPlainHtml}
            jsx={horizPlainJsx}
          />
          </div>
        </Section>

        <Section
          eyebrow="02 · Vertical"
          title="Horizontal divider in a flex row"
          description="Use divider-horizontal when panels sit side by side"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="flex w-full">
                            <WashBlock label="Cerulean" />
                            <div className="divider divider-horizontal">OR</div>
                            <WashBlock label="Ultramarine" />
                          </div>
            
              </>
            }
            html={vertHtml}
            jsx={vertJsx}
          />
        </Section>

        <Section
          eyebrow="03 · Colors"
          title="Semantic divider colors"
          description="Color modifiers tint the rule and the optional label text"
        >
          <div className="flex w-full flex-col">
            {colorDividers.map((item, i) => {
              const colorPaste = [
                { html: color0Html, jsx: color0Jsx },
                { html: color1Html, jsx: color1Jsx },
                { html: color2Html, jsx: color2Jsx },
                { html: color3Html, jsx: color3Jsx },
                { html: color4Html, jsx: color4Jsx },
                { html: color5Html, jsx: color5Jsx },
                { html: color6Html, jsx: color6Jsx },
                { html: color7Html, jsx: color7Jsx },
                { html: color8Html, jsx: color8Jsx },
              ][i]
              return (
              <ShowcaseTabs
                key={item.label}
                preview={<div className={item.className}>{item.label}</div>}
                html={colorPaste.html}
                jsx={colorPaste.jsx}
              />
              )
            })}
          </div>
        </Section>

        <Section
          eyebrow="04 · Positions"
          title="Start, center, and end text"
          description="divider-start and divider-end push the label along the rule"
          panel="wash-panel-rose"
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <ShowcaseTabs
            preview={
              <>

              <div className="flex w-full flex-col">
                              <div className="divider divider-start">Start</div>
                              <div className="divider">Default</div>
                              <div className="divider divider-end">End</div>
                            </div>
            
              </>
            }
            html={posHHtml}
            jsx={posHJsx}
          />
            <ShowcaseTabs
            preview={
              <>

              <div className="flex h-40 w-full">
                              <div className="divider divider-horizontal divider-start">Start</div>
                              <div className="divider divider-horizontal">Default</div>
                              <div className="divider divider-horizontal divider-end">End</div>
                            </div>
            
              </>
            }
            html={posVHtml}
            jsx={posVJsx}
          />
          </div>
        </Section>

        <Section
          eyebrow="05 · Studio layout"
          title="Watercolor desk sections"
          description="Labeled dividers separate wash stages on a pigment desk narrative"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="rounded-box border border-ink-border/60 bg-base-100/50 p-5">
                          <div className="space-y-1">
                            <p className="font-display text-lg font-semibold">Morning stretch</p>
                            <p className="text-sm text-ink-muted">
                              Soft cerulean across damp paper. Keep edges open for later lifts.
                            </p>
                          </div>
                          <div className="divider divider-primary">Pigment mix</div>
                          <div className="space-y-1">
                            <p className="font-display text-lg font-semibold">Midday glaze</p>
                            <p className="text-sm text-ink-muted">
                              Thin ochre over the dry pass. Watch for blooms at the wet edge.
                            </p>
                          </div>
                          <div className="divider divider-secondary">Drying pause</div>
                          <div className="space-y-1">
                            <p className="font-display text-lg font-semibold">Evening detail</p>
                            <p className="text-sm text-ink-muted">
                              Dry brush and ink weight for stems, shadows, and signature marks.
                            </p>
                          </div>
                          <div className="divider divider-accent divider-end">Studio close</div>
                          <p className="text-sm text-ink-muted">
                            Cap the palette, rinse brushes, and leave plates flat overnight.
                          </p>
                        </div>
                        <p className="mt-3">
                          <ClassLabel value="divider-primary · divider-secondary · divider-accent divider-end" />
                        </p>
            
              </>
            }
            html={studioHtml}
            jsx={studioJsx}
          />
        
        </Section>

        <Section
          eyebrow="06 · Responsive"
          title="Stack on mobile, row on large screens"
          description="Combine flex direction with lg:divider-horizontal so the rule flips"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="flex w-full flex-col lg:flex-row">
                            <div className="card rounded-box grid h-32 grow place-items-center bg-base-300 text-sm font-medium">
                              Wet wash plate
                            </div>
                            <div className="divider lg:divider-horizontal">OR</div>
                            <div className="card rounded-box grid h-32 grow place-items-center bg-base-300 text-sm font-medium">
                              Dry brush plate
                            </div>
                          </div>
            
              </>
            }
            html={responsiveHtml}
            jsx={responsiveJsx}
          />
          <div className="mt-4 rounded-box border border-ink-border/60 bg-base-100/50 p-5">
            <p className="font-display text-lg font-semibold">Breakpoint behavior</p>
            <p className="mt-2 text-sm text-ink-muted">
              Below <span className="font-mono text-xs">lg</span>, panels stack and the
              divider stays horizontal across the column. At large widths, panels sit
              in a row and the divider becomes vertical between them.
            </p>
          </div>
        </Section>
      </div>
    </>
  )
}
