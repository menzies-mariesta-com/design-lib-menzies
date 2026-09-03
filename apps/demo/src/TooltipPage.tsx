import type { ReactNode } from 'react'
import { Eye, Heart, Info, Pencil, Trash2 } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import { ShowcaseTabs } from './components/ShowcaseTabs'

const colors = [
  { name: 'Default', tip: 'tooltip', btn: '', tipClass: '' },
  { name: 'Primary', tip: 'tooltip-primary', btn: 'btn-primary', tipClass: 'tooltip-primary' },
  { name: 'Secondary', tip: 'tooltip-secondary', btn: 'btn-secondary', tipClass: 'tooltip-secondary' },
  { name: 'Accent', tip: 'tooltip-accent', btn: 'btn-accent', tipClass: 'tooltip-accent' },
  { name: 'Info', tip: 'tooltip-info', btn: 'btn-info', tipClass: 'tooltip-info' },
  { name: 'Success', tip: 'tooltip-success', btn: 'btn-success', tipClass: 'tooltip-success' },
  { name: 'Warning', tip: 'tooltip-warning', btn: 'btn-warning', tipClass: 'tooltip-warning' },
  { name: 'Error', tip: 'tooltip-error', btn: 'btn-error', tipClass: 'tooltip-error' },
] as const

const placements = [
  { name: 'Top', className: 'tooltip-top' },
  { name: 'Bottom', className: 'tooltip-bottom' },
  { name: 'Left', className: 'tooltip-left' },
  { name: 'Right', className: 'tooltip-right' },
] as const

const alignments = [
  { name: 'Start', className: 'tooltip-start' },
  { name: 'Center', className: 'tooltip-center' },
  { name: 'End', className: 'tooltip-end' },
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
      {value || 'tooltip'}
    </code>
  )
}

export default function TooltipPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Tooltip
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Every daisyUI <span className="font-mono text-xs">tooltip</span>{' '}
          color, placement, and alignment.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Default"
          title="Base tooltip"
          description="data-tip on a wrapper around any control"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap items-center gap-4">
                            <div className="tooltip" data-tip="hello">
                              <button type="button" className="btn cursor-pointer">
                                Hover me
                              </button>
                            </div>
                            <ClassLabel value='tooltip + data-tip="…"' />
                          </div>
              </>
            }
            html={`<div class="flex flex-wrap items-center gap-4">
            <div class="tooltip" data-tip="hello">
              <button type="button" class="btn cursor-pointer">
                Hover me
              </button>
            </div>
            
          </div>`}
            jsx={`<div className="flex flex-wrap items-center gap-4">
            <div className="tooltip" data-tip="hello">
              <button type="button" className="btn cursor-pointer">
                Hover me
              </button>
            </div>
            
          </div>`}
          />
        </Section>

        <Section
          eyebrow="02 · Force open"
          title="Always visible"
          description="tooltip-open keeps the tip on for demos"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap items-end gap-8 pt-8">
                            <div
                              className="tooltip tooltip-open"
                              data-tip="Always on"
                              data-tooltip-smart="off"
                            >
                              <button type="button" className="btn btn-primary cursor-pointer">
                                Open
                              </button>
                            </div>
                            <ClassLabel value='tooltip tooltip-open data-tooltip-smart="off"' />
                          </div>
              </>
            }
            html={`<div class="flex flex-wrap items-end gap-8 pt-8">
            <div
              class="tooltip tooltip-open"
              data-tip="Always on"
              data-tooltip-smart="off"
            >
              <button type="button" class="btn btn-primary cursor-pointer">
                Open
              </button>
            </div>
            
          </div>`}
            jsx={`<div className="flex flex-wrap items-end gap-8 pt-8">
            <div
              className="tooltip tooltip-open"
              data-tip="Always on"
              data-tooltip-smart="off"
            >
              <button type="button" className="btn btn-primary cursor-pointer">
                Open
              </button>
            </div>
            
          </div>`}
          />
        </Section>

        <Section
          eyebrow="03 · Colors"
          title="Semantic colors"
          description="Match tip color to the button's semantic role"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap items-end gap-4 pt-10">
                            {colors.map((c) => (
                              <div key={c.name} className="flex flex-col items-center gap-2">
                                <div className={`tooltip ${c.tipClass}`} data-tip={c.name}>
                                  <button type="button" className={`btn cursor-pointer ${c.btn}`}>
                                    {c.name}
                                  </button>
                                </div>
                                <ClassLabel
                                  value={c.tipClass ? `tooltip ${c.tipClass}` : 'tooltip'}
                                />
                              </div>
                            ))}
                          </div>
              </>
            }
            html={`<div class="flex flex-wrap items-end gap-4 pt-10">
            <!-- repeat for each item -->
          </div>`}
            jsx={`<div className="flex flex-wrap items-end gap-4 pt-10">
            {colors.map((c) => (
              <div key={c.name} className="flex flex-col items-center gap-2">
                <div className={\`tooltip \${c.tipClass}\`} data-tip={c.name}>
                  <button type="button" className={\`btn cursor-pointer \${c.btn}\`}>
                    {c.name}
                  </button>
                </div>
                
              </div>
            ))}
          </div>`}
          />
        </Section>

        <Section
          eyebrow="04 · Placement"
          title="Top · bottom · left · right"
          description="Forced sides for reference"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap items-center justify-center gap-10 py-12">
                            {placements.map((p) => (
                              <div key={p.name} className="flex flex-col items-center gap-2">
                                <div
                                  className={`tooltip tooltip-open tooltip-primary ${p.className}`}
                                  data-tip={p.name}
                                  data-tooltip-smart="off"
                                >
                                  <button type="button" className="btn btn-primary cursor-pointer">
                                    {p.name}
                                  </button>
                                </div>
                                <ClassLabel value={`tooltip ${p.className}`} />
                              </div>
                            ))}
                          </div>
              </>
            }
            html={`<div class="flex flex-wrap items-center justify-center gap-10 py-12">
            <!-- repeat for each item -->
          </div>`}
            jsx={`<div className="flex flex-wrap items-center justify-center gap-10 py-12">
            {placements.map((p) => (
              <div key={p.name} className="flex flex-col items-center gap-2">
                <div
                  className={\`tooltip tooltip-open tooltip-primary \${p.className}\`}
                  data-tip={p.name}
                  data-tooltip-smart="off"
                >
                  <button type="button" className="btn btn-primary cursor-pointer">
                    {p.name}
                  </button>
                </div>
                
              </div>
            ))}
          </div>`}
          />
        </Section>

        <Section
          eyebrow="05 · Alignment"
          title="Start · center · end"
          description="Align the tip along the edge for wide triggers"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-col items-stretch gap-14 py-10">
                            {alignments.map((a) => (
                              <div key={a.name} className="flex flex-col items-center gap-2">
                                <div
                                  className={`tooltip tooltip-open tooltip-secondary tooltip-bottom ${a.className}`}
                                  data-tip={`Aligned ${a.name.toLowerCase()}`}
                                  data-tooltip-smart="off"
                                >
                                  <button
                                    type="button"
                                    className="btn btn-secondary w-48 cursor-pointer"
                                  >
                                    {a.name}
                                  </button>
                                </div>
                                <ClassLabel value={`tooltip ${a.className}`} />
                              </div>
                            ))}
                          </div>
              </>
            }
            html={`<div class="flex flex-col items-stretch gap-14 py-10">
            <!-- repeat for each item -->\`}
                  data-tooltip-smart="off"
                >
                  <button
                    type="button"
                    class="btn btn-secondary w-48 cursor-pointer"
                  >
                    
                  </button>
                </div>
                
              </div>
            ))}
          </div>`}
            jsx={`<div className="flex flex-col items-stretch gap-14 py-10">
            {alignments.map((a) => (
              <div key={a.name} className="flex flex-col items-center gap-2">
                <div
                  className={\`tooltip tooltip-open tooltip-secondary tooltip-bottom \${a.className}\`}
                  data-tip={\`Aligned \${a.name.toLowerCase()}\`}
                  data-tooltip-smart="off"
                >
                  <button
                    type="button"
                    className="btn btn-secondary w-48 cursor-pointer"
                  >
                    {a.name}
                  </button>
                </div>
                
              </div>
            ))}
          </div>`}
          />
        </Section>

        <Section
          eyebrow="06 · Content slot"
          title="Rich tooltip-content"
          description="Use tooltip-content for multi-line or custom markup"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap items-center gap-6 pt-16">
                            <div className="tooltip">
                              <div className="tooltip-content">
                                <div className="text-sm font-medium">Plate WS-214</div>
                                <div className="text-xs opacity-80">7 washes · Atlantic Studies</div>
                              </div>
                              <button type="button" className="btn cursor-pointer">
                                Rich tip
                              </button>
                            </div>
                            <ClassLabel value="tooltip + tooltip-content" />
                          </div>
              </>
            }
            html={`<div class="flex flex-wrap items-center gap-6 pt-16">
            <div class="tooltip">
              <div class="tooltip-content">
                <div class="text-sm font-medium">Plate WS-214</div>
                <div class="text-xs opacity-80">7 washes · Atlantic Studies</div>
              </div>
              <button type="button" class="btn cursor-pointer">
                Rich tip
              </button>
            </div>
            
          </div>`}
            jsx={`<div className="flex flex-wrap items-center gap-6 pt-16">
            <div className="tooltip">
              <div className="tooltip-content">
                <div className="text-sm font-medium">Plate WS-214</div>
                <div className="text-xs opacity-80">7 washes · Atlantic Studies</div>
              </div>
              <button type="button" className="btn cursor-pointer">
                Rich tip
              </button>
            </div>
            
          </div>`}
          />
        </Section>

        <Section
          eyebrow="07 · Icon buttons"
          title="Matched tip + button color"
          description="Icon-only actions: tooltip color matches btn color"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap items-center gap-3 pt-8">
                            <div className="tooltip tooltip-primary" data-tip="View">
                              <button
                                type="button"
                                className="btn btn-ghost btn-square btn-primary cursor-pointer"
                                aria-label="View"
                              >
                                <Eye className="size-4" strokeWidth={2} />
                              </button>
                            </div>
                            <div className="tooltip tooltip-secondary" data-tip="Edit">
                              <button
                                type="button"
                                className="btn btn-ghost btn-square btn-secondary cursor-pointer"
                                aria-label="Edit"
                              >
                                <Pencil className="size-4" strokeWidth={2} />
                              </button>
                            </div>
                            <div className="tooltip tooltip-error" data-tip="Delete">
                              <button
                                type="button"
                                className="btn btn-ghost btn-square btn-error cursor-pointer"
                                aria-label="Delete"
                              >
                                <Trash2 className="size-4" strokeWidth={2} />
                              </button>
                            </div>
                            <div className="tooltip tooltip-info" data-tip="Info">
                              <button
                                type="button"
                                className="btn btn-ghost btn-square btn-info cursor-pointer"
                                aria-label="Info"
                              >
                                <Info className="size-4" strokeWidth={2} />
                              </button>
                            </div>
                            <div className="tooltip tooltip-accent tooltip-right" data-tip="Favorite">
                              <button
                                type="button"
                                className="btn btn-ghost btn-square btn-accent cursor-pointer"
                                aria-label="Favorite"
                              >
                                <Heart className="size-4" strokeWidth={2} />
                              </button>
                            </div>
                          </div>
                          <p className="mt-4">
                            <ClassLabel value="tooltip-{color} + btn-{color}" />
                          </p>
              </>
            }
            html={`<div class="flex flex-wrap items-center gap-3 pt-8">
            <div class="tooltip tooltip-primary" data-tip="View">
              <button
                type="button"
                class="btn btn-ghost btn-square btn-primary cursor-pointer"
                aria-label="View"
              >
                <Eye class="size-4" strokeWidth= />
              </button>
            </div>
            <div class="tooltip tooltip-secondary" data-tip="Edit">
              <button
                type="button"
                class="btn btn-ghost btn-square btn-secondary cursor-pointer"
                aria-label="Edit"
              >
                <Pencil class="size-4" strokeWidth= />
              </button>
            </div>
            <div class="tooltip tooltip-error" data-tip="Delete">
              <button
                type="button"
                class="btn btn-ghost btn-square btn-error cursor-pointer"
                aria-label="Delete"
              >
                <Trash2 class="size-4" strokeWidth= />
              </button>
            </div>
            <div class="tooltip tooltip-info" data-tip="Info">
              <button
                type="button"
                class="btn btn-ghost btn-square btn-info cursor-pointer"
                aria-label="Info"
              >
                <Info class="size-4" strokeWidth= />
              </button>
            </div>
            <div class="tooltip tooltip-accent tooltip-right" data-tip="Favorite">
              <button
                type="button"
                class="btn btn-ghost btn-square btn-accent cursor-pointer"
                aria-label="Favorite"
              >
                <Heart class="size-4" strokeWidth= />
              </button>
            </div>
          </div>
          <p class="mt-4">
            
          </p>`}
            jsx={`<div className="flex flex-wrap items-center gap-3 pt-8">
            <div className="tooltip tooltip-primary" data-tip="View">
              <button
                type="button"
                className="btn btn-ghost btn-square btn-primary cursor-pointer"
                aria-label="View"
              >
                <Eye className="size-4" strokeWidth={2} />
              </button>
            </div>
            <div className="tooltip tooltip-secondary" data-tip="Edit">
              <button
                type="button"
                className="btn btn-ghost btn-square btn-secondary cursor-pointer"
                aria-label="Edit"
              >
                <Pencil className="size-4" strokeWidth={2} />
              </button>
            </div>
            <div className="tooltip tooltip-error" data-tip="Delete">
              <button
                type="button"
                className="btn btn-ghost btn-square btn-error cursor-pointer"
                aria-label="Delete"
              >
                <Trash2 className="size-4" strokeWidth={2} />
              </button>
            </div>
            <div className="tooltip tooltip-info" data-tip="Info">
              <button
                type="button"
                className="btn btn-ghost btn-square btn-info cursor-pointer"
                aria-label="Info"
              >
                <Info className="size-4" strokeWidth={2} />
              </button>
            </div>
            <div className="tooltip tooltip-accent tooltip-right" data-tip="Favorite">
              <button
                type="button"
                className="btn btn-ghost btn-square btn-accent cursor-pointer"
                aria-label="Favorite"
              >
                <Heart className="size-4" strokeWidth={2} />
              </button>
            </div>
          </div>
          <p className="mt-4">
            
          </p>`}
          />
        </Section>

        <Section
          eyebrow="08 · Smart placement"
          title="Flips inside overflow shells"
          description="Scroll the pane and hover icons near the top, bottom"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="overflow-auto rounded-box border border-ink-border bg-base-100/80 h-40">
                            <div className="flex min-h-[280px] flex-col justify-between p-3">
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-sm font-medium">Near top edge</span>
                                <div className="flex items-center gap-0.5">
                                  <div
                                    className="tooltip tooltip-primary tooltip-top"
                                    data-tip="Preview plate"
                                  >
                                    <button
                                      type="button"
                                      className="btn btn-ghost btn-square btn-sm btn-primary cursor-pointer"
                                      aria-label="Preview plate"
                                    >
                                      <Eye className="size-4" strokeWidth={2} />
                                    </button>
                                  </div>
                                  <div
                                    className="tooltip tooltip-error tooltip-top"
                                    data-tip="Delete plate"
                                  >
                                    <button
                                      type="button"
                                      className="btn btn-ghost btn-square btn-sm btn-error cursor-pointer"
                                      aria-label="Delete plate"
                                    >
                                      <Trash2 className="size-4" strokeWidth={2} />
                                    </button>
                                  </div>
                                </div>
                              </div>
                
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-sm font-medium">Actions column preference</span>
                                <div className="flex items-center gap-0.5">
                                  <div
                                    className="tooltip tooltip-primary tooltip-right"
                                    data-tip="View"
                                  >
                                    <button
                                      type="button"
                                      className="btn btn-ghost btn-square btn-sm btn-primary cursor-pointer"
                                      aria-label="View"
                                    >
                                      <Eye className="size-4" strokeWidth={2} />
                                    </button>
                                  </div>
                                  <div
                                    className="tooltip tooltip-secondary tooltip-right"
                                    data-tip="Edit"
                                  >
                                    <button
                                      type="button"
                                      className="btn btn-ghost btn-square btn-sm btn-secondary cursor-pointer"
                                      aria-label="Edit"
                                    >
                                      <Pencil className="size-4" strokeWidth={2} />
                                    </button>
                                  </div>
                                </div>
                              </div>
                
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-sm font-medium">Near bottom edge</span>
                                <div className="flex items-center gap-0.5">
                                  <div
                                    className="tooltip tooltip-info tooltip-bottom"
                                    data-tip="Plate info"
                                  >
                                    <button
                                      type="button"
                                      className="btn btn-ghost btn-square btn-sm btn-info cursor-pointer"
                                      aria-label="Plate info"
                                    >
                                      <Info className="size-4" strokeWidth={2} />
                                    </button>
                                  </div>
                                  <div
                                    className="tooltip tooltip-accent tooltip-bottom"
                                    data-tip="Favorite wash"
                                  >
                                    <button
                                      type="button"
                                      className="btn btn-ghost btn-square btn-sm btn-accent cursor-pointer"
                                      aria-label="Favorite wash"
                                    >
                                      <Heart className="size-4" strokeWidth={2} />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <p className="mt-3">
                            <ClassLabel value="attachSmartTooltips() · prefers tooltip-{side} when space allows" />
                          </p>
              </>
            }
            html={`<div class="overflow-auto rounded-box border border-ink-border bg-base-100/80 h-40">
            <div class="flex min-h-[280px] flex-col justify-between p-3">
              <div class="flex items-center justify-between gap-2">
                <span class="text-sm font-medium">Near top edge</span>
                <div class="flex items-center gap-0.5">
                  <div
                    class="tooltip tooltip-primary tooltip-top"
                    data-tip="Preview plate"
                  >
                    <button
                      type="button"
                      class="btn btn-ghost btn-square btn-sm btn-primary cursor-pointer"
                      aria-label="Preview plate"
                    >
                      <Eye class="size-4" strokeWidth= />
                    </button>
                  </div>
                  <div
                    class="tooltip tooltip-error tooltip-top"
                    data-tip="Delete plate"
                  >
                    <button
                      type="button"
                      class="btn btn-ghost btn-square btn-sm btn-error cursor-pointer"
                      aria-label="Delete plate"
                    >
                      <Trash2 class="size-4" strokeWidth= />
                    </button>
                  </div>
                </div>
              </div>

              <div class="flex items-center justify-between gap-2">
                <span class="text-sm font-medium">Actions column preference</span>
                <div class="flex items-center gap-0.5">
                  <div
                    class="tooltip tooltip-primary tooltip-right"
                    data-tip="View"
                  >
                    <button
                      type="button"
                      class="btn btn-ghost btn-square btn-sm btn-primary cursor-pointer"
                      aria-label="View"
                    >
                      <Eye class="size-4" strokeWidth= />
                    </button>
                  </div>
                  <div
                    class="tooltip tooltip-secondary tooltip-right"
                    data-tip="Edit"
                  >
                    <button
                      type="button"
                      class="btn btn-ghost btn-square btn-sm btn-secondary cursor-pointer"
                      aria-label="Edit"
                    >
                      <Pencil class="size-4" strokeWidth= />
                    </button>
                  </div>
                </div>
              </div>

              <div class="flex items-center justify-between gap-2">
                <span class="text-sm font-medium">Near bottom edge</span>
                <div class="flex items-center gap-0.5">
                  <div
                    class="tooltip tooltip-info tooltip-bottom"
                    data-tip="Plate info"
                  >
                    <button
                      type="button"
                      class="btn btn-ghost btn-square btn-sm btn-info cursor-pointer"
                      aria-label="Plate info"
                    >
                      <Info class="size-4" strokeWidth= />
                    </button>
                  </div>
                  <div
                    class="tooltip tooltip-accent tooltip-bottom"
                    data-tip="Favorite wash"
                  >
                    <button
                      type="button"
                      class="btn btn-ghost btn-square btn-sm btn-accent cursor-pointer"
                      aria-label="Favorite wash"
                    >
                      <Heart class="size-4" strokeWidth= />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p class="mt-3">
            
          </p>`}
            jsx={`<div className="overflow-auto rounded-box border border-ink-border bg-base-100/80 h-40">
            <div className="flex min-h-[280px] flex-col justify-between p-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium">Near top edge</span>
                <div className="flex items-center gap-0.5">
                  <div
                    className="tooltip tooltip-primary tooltip-top"
                    data-tip="Preview plate"
                  >
                    <button
                      type="button"
                      className="btn btn-ghost btn-square btn-sm btn-primary cursor-pointer"
                      aria-label="Preview plate"
                    >
                      <Eye className="size-4" strokeWidth={2} />
                    </button>
                  </div>
                  <div
                    className="tooltip tooltip-error tooltip-top"
                    data-tip="Delete plate"
                  >
                    <button
                      type="button"
                      className="btn btn-ghost btn-square btn-sm btn-error cursor-pointer"
                      aria-label="Delete plate"
                    >
                      <Trash2 className="size-4" strokeWidth={2} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium">Actions column preference</span>
                <div className="flex items-center gap-0.5">
                  <div
                    className="tooltip tooltip-primary tooltip-right"
                    data-tip="View"
                  >
                    <button
                      type="button"
                      className="btn btn-ghost btn-square btn-sm btn-primary cursor-pointer"
                      aria-label="View"
                    >
                      <Eye className="size-4" strokeWidth={2} />
                    </button>
                  </div>
                  <div
                    className="tooltip tooltip-secondary tooltip-right"
                    data-tip="Edit"
                  >
                    <button
                      type="button"
                      className="btn btn-ghost btn-square btn-sm btn-secondary cursor-pointer"
                      aria-label="Edit"
                    >
                      <Pencil className="size-4" strokeWidth={2} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium">Near bottom edge</span>
                <div className="flex items-center gap-0.5">
                  <div
                    className="tooltip tooltip-info tooltip-bottom"
                    data-tip="Plate info"
                  >
                    <button
                      type="button"
                      className="btn btn-ghost btn-square btn-sm btn-info cursor-pointer"
                      aria-label="Plate info"
                    >
                      <Info className="size-4" strokeWidth={2} />
                    </button>
                  </div>
                  <div
                    className="tooltip tooltip-accent tooltip-bottom"
                    data-tip="Favorite wash"
                  >
                    <button
                      type="button"
                      className="btn btn-ghost btn-square btn-sm btn-accent cursor-pointer"
                      aria-label="Favorite wash"
                    >
                      <Heart className="size-4" strokeWidth={2} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-3">
            
          </p>`}
          />
        </Section>
      </div>
    </>
  )
}
