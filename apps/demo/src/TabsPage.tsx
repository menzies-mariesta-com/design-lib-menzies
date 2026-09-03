import { useState, type ReactNode } from 'react'
import {
  Droplets,
  Heart,
  Layers,
  Palette,
  Play,
  Smile,
} from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import { ShowcaseTabs } from './components/ShowcaseTabs'

const styles = [
  { name: 'Default', className: '' },
  { name: 'Border', className: 'tabs-border' },
  { name: 'Lift', className: 'tabs-lift' },
  { name: 'Box', className: 'tabs-box' },
] as const

const sizes = [
  { name: 'xs', className: 'tabs-xs' },
  { name: 'sm', className: 'tabs-sm' },
  { name: 'md', className: 'tabs-md' },
  { name: 'lg', className: 'tabs-lg' },
  { name: 'xl', className: 'tabs-xl' },
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

function ButtonTabs({
  className = '',
  labels = ['Pigment', 'Wash', 'Glaze'],
  active = 1,
}: {
  className?: string
  labels?: string[]
  active?: number
}) {
  return (
    <div role="tablist" className={`tabs ${className}`}>
      {labels.map((label, i) => (
        <button
          key={label}
          type="button"
          role="tab"
          className={`tab cursor-pointer ${i === active ? 'tab-active' : ''}`}
          aria-selected={i === active}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

function ButtonTabsInteractive({ className = '' }: { className?: string }) {
  const [active, setActive] = useState(0)
  const panels = [
    'Cadmium yellow underpainting on cold-press.',
    'Two thin ultramarine washes for sky depth.',
    'Final glaze to unify warm and cool edges.',
  ]

  return (
    <div className="w-full max-w-lg">
      <div role="tablist" className={`tabs ${className}`}>
        {['Underpaint', 'Wash', 'Glaze'].map((label, i) => (
          <button
            key={label}
            type="button"
            role="tab"
            className={`tab cursor-pointer ${i === active ? 'tab-active' : ''}`}
            aria-selected={i === active}
            onClick={() => setActive(i)}
          >
            {label}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        className="mt-3 rounded-box border border-base-300 bg-base-100 p-5 text-sm"
      >
        {panels[active]}
      </div>
    </div>
  )
}

export default function TabsPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Tabs
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Every daisyUI <span className="font-mono text-xs">tabs</span> style,
          size, placement, and radio content pattern.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Default"
          title="Base tabs"
          description="Plain tabs container with button parts and one active tab"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-col gap-3">
                            <ButtonTabs />
                            <ClassLabel value="tabs + tab + tab-active" />
                          </div>
              </>
            }
            html={`<div class="flex flex-col gap-3">
            <ButtonTabs />
            
          </div>`}
            jsx={`<div className="flex flex-col gap-3">
            <ButtonTabs />
            
          </div>`}
          />
        </Section>

        <Section
          eyebrow="02 · Styles"
          title="Border · lift · box"
          description="Style modifiers on the tabs container"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-col gap-8">
                            {styles.map((s) => (
                              <div key={s.name} className="flex flex-col gap-2">
                                <p className="text-sm font-medium">{s.name}</p>
                                <ButtonTabs className={s.className} />
                                <ClassLabel
                                  value={s.className ? `tabs ${s.className}` : 'tabs'}
                                />
                              </div>
                            ))}
                          </div>
              </>
            }
            html={`<div class="flex flex-col gap-8">
            <!-- repeat for each item -->
          </div>`}
            jsx={`<div className="flex flex-col gap-8">
            {styles.map((s) => (
              <div key={s.name} className="flex flex-col gap-2">
                <p className="text-sm font-medium">{s.name}</p>
                <ButtonTabs className={s.className} />
                
              </div>
            ))}
          </div>`}
          />
        </Section>

        <Section
          eyebrow="03 · Sizes"
          title="xs through xl"
          description="Size modifiers on tabs-lift for a clear visual scale"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-col gap-6">
                            {sizes.map((s) => (
                              <div key={s.name} className="flex flex-col gap-2">
                                <ButtonTabs
                                  className={`tabs-lift ${s.className}`}
                                  labels={[s.name, s.name, s.name]}
                                />
                                <ClassLabel value={`tabs tabs-lift ${s.className}`} />
                              </div>
                            ))}
                          </div>
              </>
            }
            html={`<div class="flex flex-col gap-6">
            <!-- repeat for each item -->
          </div>`}
            jsx={`<div className="flex flex-col gap-6">
            {sizes.map((s) => (
              <div key={s.name} className="flex flex-col gap-2">
                <ButtonTabs
                  className={\`tabs-lift \${s.className}\`}
                  labels={[s.name, s.name, s.name]}
                />
                
              </div>
            ))}
          </div>`}
          />
        </Section>

        <Section
          eyebrow="04 · Buttons"
          title="Interactive button tabs"
          description="Buttons with React state drive tab-active and a panel"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-col gap-3">
                            <ButtonTabsInteractive className="tabs-border" />
                            <ClassLabel value="tabs tabs-border + button.tab + tabpanel" />
                          </div>
              </>
            }
            html={`<div class="flex flex-col gap-3">
            <ButtonTabsInteractive class="tabs-border" />
            
          </div>`}
            jsx={`<div className="flex flex-col gap-3">
            <ButtonTabsInteractive className="tabs-border" />
            
          </div>`}
          />
        </Section>

        <Section
          eyebrow="05 · Radio"
          title="Radio input tabs"
          description="Radio inputs as tabs. Unique name per group"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-col gap-3">
                            <div className="tabs tabs-box">
                              <input
                                type="radio"
                                name="wash_tabs_radio"
                                className="tab cursor-pointer"
                                aria-label="Pigment"
                              />
                              <input
                                type="radio"
                                name="wash_tabs_radio"
                                className="tab cursor-pointer"
                                aria-label="Wash"
                                defaultChecked
                              />
                              <input
                                type="radio"
                                name="wash_tabs_radio"
                                className="tab cursor-pointer"
                                aria-label="Glaze"
                              />
                            </div>
                            <ClassLabel value='tabs tabs-box + input.tab[type="radio"]' />
                          </div>
              </>
            }
            html={`<div class="flex flex-col gap-3">
            <div class="tabs tabs-box">
              <input
                type="radio"
                name="wash_tabs_radio"
                class="tab cursor-pointer"
                aria-label="Pigment"
              />
              <input
                type="radio"
                name="wash_tabs_radio"
                class="tab cursor-pointer"
                aria-label="Wash"
                checked
              />
              <input
                type="radio"
                name="wash_tabs_radio"
                class="tab cursor-pointer"
                aria-label="Glaze"
              />
            </div>
            
          </div>`}
            jsx={`<div className="flex flex-col gap-3">
            <div className="tabs tabs-box">
              <input
                type="radio"
                name="wash_tabs_radio"
                className="tab cursor-pointer"
                aria-label="Pigment"
              />
              <input
                type="radio"
                name="wash_tabs_radio"
                className="tab cursor-pointer"
                aria-label="Wash"
                defaultChecked
              />
              <input
                type="radio"
                name="wash_tabs_radio"
                className="tab cursor-pointer"
                aria-label="Glaze"
              />
            </div>
            
          </div>`}
          />
        </Section>

        <Section
          eyebrow="06 · Content · border"
          title="Radio tabs-border + panels"
          description="Each radio is followed by its tab-content sibling"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="tabs tabs-border">
                            <input
                              type="radio"
                              name="wash_tabs_border_content"
                              className="tab cursor-pointer"
                              aria-label="Series"
                            />
                            <div className="tab-content border-base-300 bg-base-100 p-6 text-sm">
                              Atlantic Studies: coastal washes and cool greys.
                            </div>
                
                            <input
                              type="radio"
                              name="wash_tabs_border_content"
                              className="tab cursor-pointer"
                              aria-label="Palette"
                              defaultChecked
                            />
                            <div className="tab-content border-base-300 bg-base-100 p-6 text-sm">
                              Ultramarine, burnt sienna, and raw umber for earth mixes.
                            </div>
                
                            <input
                              type="radio"
                              name="wash_tabs_border_content"
                              className="tab cursor-pointer"
                              aria-label="Notes"
                            />
                            <div className="tab-content border-base-300 bg-base-100 p-6 text-sm">
                              Keep edges soft until the final glaze pass.
                            </div>
                          </div>
                          <div className="mt-3">
                            <ClassLabel value="tabs tabs-border + tab-content" />
                          </div>
              </>
            }
            html={`<div class="tabs tabs-border">
            <input
              type="radio"
              name="wash_tabs_border_content"
              class="tab cursor-pointer"
              aria-label="Series"
            />
            <div class="tab-content border-base-300 bg-base-100 p-6 text-sm">
              Atlantic Studies: coastal washes and cool greys.
            </div>

            <input
              type="radio"
              name="wash_tabs_border_content"
              class="tab cursor-pointer"
              aria-label="Palette"
              checked
            />
            <div class="tab-content border-base-300 bg-base-100 p-6 text-sm">
              Ultramarine, burnt sienna, and raw umber for earth mixes.
            </div>

            <input
              type="radio"
              name="wash_tabs_border_content"
              class="tab cursor-pointer"
              aria-label="Notes"
            />
            <div class="tab-content border-base-300 bg-base-100 p-6 text-sm">
              Keep edges soft until the final glaze pass.
            </div>
          </div>
          <div class="mt-3">
            
          </div>`}
            jsx={`<div className="tabs tabs-border">
            <input
              type="radio"
              name="wash_tabs_border_content"
              className="tab cursor-pointer"
              aria-label="Series"
            />
            <div className="tab-content border-base-300 bg-base-100 p-6 text-sm">
              Atlantic Studies: coastal washes and cool greys.
            </div>

            <input
              type="radio"
              name="wash_tabs_border_content"
              className="tab cursor-pointer"
              aria-label="Palette"
              defaultChecked
            />
            <div className="tab-content border-base-300 bg-base-100 p-6 text-sm">
              Ultramarine, burnt sienna, and raw umber for earth mixes.
            </div>

            <input
              type="radio"
              name="wash_tabs_border_content"
              className="tab cursor-pointer"
              aria-label="Notes"
            />
            <div className="tab-content border-base-300 bg-base-100 p-6 text-sm">
              Keep edges soft until the final glaze pass.
            </div>
          </div>
          <div className="mt-3">
            
          </div>`}
          />
        </Section>

        <Section
          eyebrow="07 · Content · lift"
          title="Radio tabs-lift + panels"
          description="Lift style with bordered content panels"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="tabs tabs-lift">
                            <input
                              type="radio"
                              name="wash_tabs_lift_content"
                              className="tab cursor-pointer"
                              aria-label="Wet"
                            />
                            <div className="tab-content border-base-300 bg-base-100 p-6 text-sm">
                              Flood the paper while it still holds a sheen.
                            </div>
                
                            <input
                              type="radio"
                              name="wash_tabs_lift_content"
                              className="tab cursor-pointer"
                              aria-label="Damp"
                              defaultChecked
                            />
                            <div className="tab-content border-base-300 bg-base-100 p-6 text-sm">
                              Soft blooms without full runs. Ideal for clouds.
                            </div>
                
                            <input
                              type="radio"
                              name="wash_tabs_lift_content"
                              className="tab cursor-pointer"
                              aria-label="Dry"
                            />
                            <div className="tab-content border-base-300 bg-base-100 p-6 text-sm">
                              Dry-brush texture for rocks and bark.
                            </div>
                          </div>
                          <div className="mt-3">
                            <ClassLabel value="tabs tabs-lift + tab-content" />
                          </div>
              </>
            }
            html={`<div class="tabs tabs-lift">
            <input
              type="radio"
              name="wash_tabs_lift_content"
              class="tab cursor-pointer"
              aria-label="Wet"
            />
            <div class="tab-content border-base-300 bg-base-100 p-6 text-sm">
              Flood the paper while it still holds a sheen.
            </div>

            <input
              type="radio"
              name="wash_tabs_lift_content"
              class="tab cursor-pointer"
              aria-label="Damp"
              checked
            />
            <div class="tab-content border-base-300 bg-base-100 p-6 text-sm">
              Soft blooms without full runs. Ideal for clouds.
            </div>

            <input
              type="radio"
              name="wash_tabs_lift_content"
              class="tab cursor-pointer"
              aria-label="Dry"
            />
            <div class="tab-content border-base-300 bg-base-100 p-6 text-sm">
              Dry-brush texture for rocks and bark.
            </div>
          </div>
          <div class="mt-3">
            
          </div>`}
            jsx={`<div className="tabs tabs-lift">
            <input
              type="radio"
              name="wash_tabs_lift_content"
              className="tab cursor-pointer"
              aria-label="Wet"
            />
            <div className="tab-content border-base-300 bg-base-100 p-6 text-sm">
              Flood the paper while it still holds a sheen.
            </div>

            <input
              type="radio"
              name="wash_tabs_lift_content"
              className="tab cursor-pointer"
              aria-label="Damp"
              defaultChecked
            />
            <div className="tab-content border-base-300 bg-base-100 p-6 text-sm">
              Soft blooms without full runs. Ideal for clouds.
            </div>

            <input
              type="radio"
              name="wash_tabs_lift_content"
              className="tab cursor-pointer"
              aria-label="Dry"
            />
            <div className="tab-content border-base-300 bg-base-100 p-6 text-sm">
              Dry-brush texture for rocks and bark.
            </div>
          </div>
          <div className="mt-3">
            
          </div>`}
          />
        </Section>

        <Section
          eyebrow="08 · Icons"
          title="Lift tabs with Lucide icons"
          description="Label wrappers hold radio + icon + text"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="tabs tabs-lift">
                            <label className="tab cursor-pointer">
                              <input type="radio" name="wash_tabs_icons" />
                              <Play className="me-2 size-4" strokeWidth={2} />
                              Live
                            </label>
                            <div className="tab-content border-base-300 bg-base-100 p-6 text-sm">
                              Live session: wet-in-wet sky demo.
                            </div>
                
                            <label className="tab cursor-pointer">
                              <input type="radio" name="wash_tabs_icons" defaultChecked />
                              <Smile className="me-2 size-4" strokeWidth={2} />
                              Study
                            </label>
                            <div className="tab-content border-base-300 bg-base-100 p-6 text-sm">
                              Gesture studies with limited palette.
                            </div>
                
                            <label className="tab cursor-pointer">
                              <input type="radio" name="wash_tabs_icons" />
                              <Heart className="me-2 size-4" strokeWidth={2} />
                              Favorites
                            </label>
                            <div className="tab-content border-base-300 bg-base-100 p-6 text-sm">
                              Saved plates and pigment recipes.
                            </div>
                          </div>
                          <div className="mt-3">
                            <ClassLabel value="tabs tabs-lift + label.tab + Lucide icons" />
                          </div>
              </>
            }
            html={`<div class="tabs tabs-lift">
            <label class="tab cursor-pointer">
              <input type="radio" name="wash_tabs_icons" />
              <Play class="me-2 size-4" strokeWidth= />
              Live
            </label>
            <div class="tab-content border-base-300 bg-base-100 p-6 text-sm">
              Live session: wet-in-wet sky demo.
            </div>

            <label class="tab cursor-pointer">
              <input type="radio" name="wash_tabs_icons" checked />
              <Smile class="me-2 size-4" strokeWidth= />
              Study
            </label>
            <div class="tab-content border-base-300 bg-base-100 p-6 text-sm">
              Gesture studies with limited palette.
            </div>

            <label class="tab cursor-pointer">
              <input type="radio" name="wash_tabs_icons" />
              <Heart class="me-2 size-4" strokeWidth= />
              Favorites
            </label>
            <div class="tab-content border-base-300 bg-base-100 p-6 text-sm">
              Saved plates and pigment recipes.
            </div>
          </div>
          <div class="mt-3">
            
          </div>`}
            jsx={`<div className="tabs tabs-lift">
            <label className="tab cursor-pointer">
              <input type="radio" name="wash_tabs_icons" />
              <Play className="me-2 size-4" strokeWidth={2} />
              Live
            </label>
            <div className="tab-content border-base-300 bg-base-100 p-6 text-sm">
              Live session: wet-in-wet sky demo.
            </div>

            <label className="tab cursor-pointer">
              <input type="radio" name="wash_tabs_icons" defaultChecked />
              <Smile className="me-2 size-4" strokeWidth={2} />
              Study
            </label>
            <div className="tab-content border-base-300 bg-base-100 p-6 text-sm">
              Gesture studies with limited palette.
            </div>

            <label className="tab cursor-pointer">
              <input type="radio" name="wash_tabs_icons" />
              <Heart className="me-2 size-4" strokeWidth={2} />
              Favorites
            </label>
            <div className="tab-content border-base-300 bg-base-100 p-6 text-sm">
              Saved plates and pigment recipes.
            </div>
          </div>
          <div className="mt-3">
            
          </div>`}
          />
        </Section>

        <Section
          eyebrow="09 · Placement"
          title="tabs-top and tabs-bottom"
          description="Default top placement vs content above the tab strip"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-col gap-10 lg:flex-row lg:gap-8">
                            <div className="flex min-w-0 flex-1 flex-col gap-2">
                              <p className="text-sm font-medium">Top (default)</p>
                              <div className="tabs tabs-lift tabs-top">
                                <input
                                  type="radio"
                                  name="wash_tabs_top"
                                  className="tab cursor-pointer"
                                  aria-label="Sky"
                                />
                                <div className="tab-content border-base-300 bg-base-100 p-6 text-sm">
                                  Cerulean and cobalt for open sky.
                                </div>
                                <input
                                  type="radio"
                                  name="wash_tabs_top"
                                  className="tab cursor-pointer"
                                  aria-label="Sea"
                                  defaultChecked
                                />
                                <div className="tab-content border-base-300 bg-base-100 p-6 text-sm">
                                  Phthalo green with a touch of indigo.
                                </div>
                                <input
                                  type="radio"
                                  name="wash_tabs_top"
                                  className="tab cursor-pointer"
                                  aria-label="Shore"
                                />
                                <div className="tab-content border-base-300 bg-base-100 p-6 text-sm">
                                  Warm sand: yellow ochre and white.
                                </div>
                              </div>
                              <ClassLabel value="tabs tabs-lift tabs-top" />
                            </div>
                
                            <div className="flex min-w-0 flex-1 flex-col gap-2">
                              <p className="text-sm font-medium">Bottom</p>
                              <div className="tabs tabs-lift tabs-bottom">
                                <input
                                  type="radio"
                                  name="wash_tabs_bottom"
                                  className="tab cursor-pointer"
                                  aria-label="Sky"
                                />
                                <div className="tab-content border-base-300 bg-base-100 p-6 text-sm">
                                  Cerulean and cobalt for open sky.
                                </div>
                                <input
                                  type="radio"
                                  name="wash_tabs_bottom"
                                  className="tab cursor-pointer"
                                  aria-label="Sea"
                                  defaultChecked
                                />
                                <div className="tab-content border-base-300 bg-base-100 p-6 text-sm">
                                  Phthalo green with a touch of indigo.
                                </div>
                                <input
                                  type="radio"
                                  name="wash_tabs_bottom"
                                  className="tab cursor-pointer"
                                  aria-label="Shore"
                                />
                                <div className="tab-content border-base-300 bg-base-100 p-6 text-sm">
                                  Warm sand: yellow ochre and white.
                                </div>
                              </div>
                              <ClassLabel value="tabs tabs-lift tabs-bottom" />
                            </div>
                          </div>
              </>
            }
            html={`<div class="flex flex-col gap-10 lg:flex-row lg:gap-8">
            <div class="flex min-w-0 flex-1 flex-col gap-2">
              <p class="text-sm font-medium">Top (default)</p>
              <div class="tabs tabs-lift tabs-top">
                <input
                  type="radio"
                  name="wash_tabs_top"
                  class="tab cursor-pointer"
                  aria-label="Sky"
                />
                <div class="tab-content border-base-300 bg-base-100 p-6 text-sm">
                  Cerulean and cobalt for open sky.
                </div>
                <input
                  type="radio"
                  name="wash_tabs_top"
                  class="tab cursor-pointer"
                  aria-label="Sea"
                  checked
                />
                <div class="tab-content border-base-300 bg-base-100 p-6 text-sm">
                  Phthalo green with a touch of indigo.
                </div>
                <input
                  type="radio"
                  name="wash_tabs_top"
                  class="tab cursor-pointer"
                  aria-label="Shore"
                />
                <div class="tab-content border-base-300 bg-base-100 p-6 text-sm">
                  Warm sand: yellow ochre and white.
                </div>
              </div>
              
            </div>

            <div class="flex min-w-0 flex-1 flex-col gap-2">
              <p class="text-sm font-medium">Bottom</p>
              <div class="tabs tabs-lift tabs-bottom">
                <input
                  type="radio"
                  name="wash_tabs_bottom"
                  class="tab cursor-pointer"
                  aria-label="Sky"
                />
                <div class="tab-content border-base-300 bg-base-100 p-6 text-sm">
                  Cerulean and cobalt for open sky.
                </div>
                <input
                  type="radio"
                  name="wash_tabs_bottom"
                  class="tab cursor-pointer"
                  aria-label="Sea"
                  checked
                />
                <div class="tab-content border-base-300 bg-base-100 p-6 text-sm">
                  Phthalo green with a touch of indigo.
                </div>
                <input
                  type="radio"
                  name="wash_tabs_bottom"
                  class="tab cursor-pointer"
                  aria-label="Shore"
                />
                <div class="tab-content border-base-300 bg-base-100 p-6 text-sm">
                  Warm sand: yellow ochre and white.
                </div>
              </div>
              
            </div>
          </div>`}
            jsx={`<div className="flex flex-col gap-10 lg:flex-row lg:gap-8">
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <p className="text-sm font-medium">Top (default)</p>
              <div className="tabs tabs-lift tabs-top">
                <input
                  type="radio"
                  name="wash_tabs_top"
                  className="tab cursor-pointer"
                  aria-label="Sky"
                />
                <div className="tab-content border-base-300 bg-base-100 p-6 text-sm">
                  Cerulean and cobalt for open sky.
                </div>
                <input
                  type="radio"
                  name="wash_tabs_top"
                  className="tab cursor-pointer"
                  aria-label="Sea"
                  defaultChecked
                />
                <div className="tab-content border-base-300 bg-base-100 p-6 text-sm">
                  Phthalo green with a touch of indigo.
                </div>
                <input
                  type="radio"
                  name="wash_tabs_top"
                  className="tab cursor-pointer"
                  aria-label="Shore"
                />
                <div className="tab-content border-base-300 bg-base-100 p-6 text-sm">
                  Warm sand: yellow ochre and white.
                </div>
              </div>
              
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <p className="text-sm font-medium">Bottom</p>
              <div className="tabs tabs-lift tabs-bottom">
                <input
                  type="radio"
                  name="wash_tabs_bottom"
                  className="tab cursor-pointer"
                  aria-label="Sky"
                />
                <div className="tab-content border-base-300 bg-base-100 p-6 text-sm">
                  Cerulean and cobalt for open sky.
                </div>
                <input
                  type="radio"
                  name="wash_tabs_bottom"
                  className="tab cursor-pointer"
                  aria-label="Sea"
                  defaultChecked
                />
                <div className="tab-content border-base-300 bg-base-100 p-6 text-sm">
                  Phthalo green with a touch of indigo.
                </div>
                <input
                  type="radio"
                  name="wash_tabs_bottom"
                  className="tab cursor-pointer"
                  aria-label="Shore"
                />
                <div className="tab-content border-base-300 bg-base-100 p-6 text-sm">
                  Warm sand: yellow ochre and white.
                </div>
              </div>
              
            </div>
          </div>`}
          />
        </Section>

        <Section
          eyebrow="10 · Content · box"
          title="Radio tabs-box + panels"
          description="Boxed tabs with matching content panels"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="tabs tabs-box">
                            <input
                              type="radio"
                              name="wash_tabs_box_content"
                              className="tab cursor-pointer"
                              aria-label="Layers"
                            />
                            <div className="tab-content border-base-300 bg-base-100 p-6 text-sm">
                              Build from lightest wash to darkest accents.
                            </div>
                
                            <input
                              type="radio"
                              name="wash_tabs_box_content"
                              className="tab cursor-pointer"
                              aria-label="Edges"
                              defaultChecked
                            />
                            <div className="tab-content border-base-300 bg-base-100 p-6 text-sm">
                              Soften one edge; keep the other crisp for form.
                            </div>
                
                            <input
                              type="radio"
                              name="wash_tabs_box_content"
                              className="tab cursor-pointer"
                              aria-label="Values"
                            />
                            <div className="tab-content border-base-300 bg-base-100 p-6 text-sm">
                              Squint to check value hierarchy before detail.
                            </div>
                          </div>
                          <div className="mt-3">
                            <ClassLabel value="tabs tabs-box + tab-content" />
                          </div>
              </>
            }
            html={`<div class="tabs tabs-box">
            <input
              type="radio"
              name="wash_tabs_box_content"
              class="tab cursor-pointer"
              aria-label="Layers"
            />
            <div class="tab-content border-base-300 bg-base-100 p-6 text-sm">
              Build from lightest wash to darkest accents.
            </div>

            <input
              type="radio"
              name="wash_tabs_box_content"
              class="tab cursor-pointer"
              aria-label="Edges"
              checked
            />
            <div class="tab-content border-base-300 bg-base-100 p-6 text-sm">
              Soften one edge; keep the other crisp for form.
            </div>

            <input
              type="radio"
              name="wash_tabs_box_content"
              class="tab cursor-pointer"
              aria-label="Values"
            />
            <div class="tab-content border-base-300 bg-base-100 p-6 text-sm">
              Squint to check value hierarchy before detail.
            </div>
          </div>
          <div class="mt-3">
            
          </div>`}
            jsx={`<div className="tabs tabs-box">
            <input
              type="radio"
              name="wash_tabs_box_content"
              className="tab cursor-pointer"
              aria-label="Layers"
            />
            <div className="tab-content border-base-300 bg-base-100 p-6 text-sm">
              Build from lightest wash to darkest accents.
            </div>

            <input
              type="radio"
              name="wash_tabs_box_content"
              className="tab cursor-pointer"
              aria-label="Edges"
              defaultChecked
            />
            <div className="tab-content border-base-300 bg-base-100 p-6 text-sm">
              Soften one edge; keep the other crisp for form.
            </div>

            <input
              type="radio"
              name="wash_tabs_box_content"
              className="tab cursor-pointer"
              aria-label="Values"
            />
            <div className="tab-content border-base-300 bg-base-100 p-6 text-sm">
              Squint to check value hierarchy before detail.
            </div>
          </div>
          <div className="mt-3">
            
          </div>`}
          />
        </Section>

        <Section
          eyebrow="11 · Disabled"
          title="tab-disabled"
          description="A disabled tab stays visible but is not interactive"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-col gap-3">
                            <div role="tablist" className="tabs tabs-lift">
                              <button type="button" role="tab" className="tab cursor-pointer">
                                Open
                              </button>
                              <button
                                type="button"
                                role="tab"
                                className="tab tab-active cursor-pointer"
                                aria-selected
                              >
                                Active
                              </button>
                              <button
                                type="button"
                                role="tab"
                                className="tab tab-disabled cursor-not-allowed"
                                disabled
                                aria-disabled
                              >
                                Locked
                              </button>
                            </div>
                            <ClassLabel value="tab tab-disabled" />
                          </div>
              </>
            }
            html={`<div class="flex flex-col gap-3">
            <div role="tablist" class="tabs tabs-lift">
              <button type="button" role="tab" class="tab cursor-pointer">
                Open
              </button>
              <button
                type="button"
                role="tab"
                class="tab tab-active cursor-pointer"
                aria-selected
              >
                Active
              </button>
              <button
                type="button"
                role="tab"
                class="tab tab-disabled cursor-not-allowed"
                disabled
                aria-disabled
              >
                Locked
              </button>
            </div>
            
          </div>`}
            jsx={`<div className="flex flex-col gap-3">
            <div role="tablist" className="tabs tabs-lift">
              <button type="button" role="tab" className="tab cursor-pointer">
                Open
              </button>
              <button
                type="button"
                role="tab"
                className="tab tab-active cursor-pointer"
                aria-selected
              >
                Active
              </button>
              <button
                type="button"
                role="tab"
                className="tab tab-disabled cursor-not-allowed"
                disabled
                aria-disabled
              >
                Locked
              </button>
            </div>
            
          </div>`}
          />
        </Section>

        <Section
          eyebrow="12 · Icon strip"
          title="Box tabs with palette icons"
          description="Compact studio tools as icon-labeled radio tabs"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="tabs tabs-box">
                            <label className="tab cursor-pointer">
                              <input type="radio" name="wash_tabs_tools" />
                              <Palette className="me-2 size-4" strokeWidth={2} />
                              Palette
                            </label>
                            <div className="tab-content border-base-300 bg-base-100 p-6 text-sm">
                              Mix two primaries plus one earth for the plate.
                            </div>
                
                            <label className="tab cursor-pointer">
                              <input type="radio" name="wash_tabs_tools" defaultChecked />
                              <Droplets className="me-2 size-4" strokeWidth={2} />
                              Water
                            </label>
                            <div className="tab-content border-base-300 bg-base-100 p-6 text-sm">
                              Change water often to keep washes clean.
                            </div>
                
                            <label className="tab cursor-pointer">
                              <input type="radio" name="wash_tabs_tools" />
                              <Layers className="me-2 size-4" strokeWidth={2} />
                              Layers
                            </label>
                            <div className="tab-content border-base-300 bg-base-100 p-6 text-sm">
                              Let each layer dry fully before the next.
                            </div>
                          </div>
                          <div className="mt-3">
                            <ClassLabel value="tabs tabs-box + label.tab + icons" />
                          </div>
              </>
            }
            html={`<div class="tabs tabs-box">
            <label class="tab cursor-pointer">
              <input type="radio" name="wash_tabs_tools" />
              <Palette class="me-2 size-4" strokeWidth= />
              Palette
            </label>
            <div class="tab-content border-base-300 bg-base-100 p-6 text-sm">
              Mix two primaries plus one earth for the plate.
            </div>

            <label class="tab cursor-pointer">
              <input type="radio" name="wash_tabs_tools" checked />
              <Droplets class="me-2 size-4" strokeWidth= />
              Water
            </label>
            <div class="tab-content border-base-300 bg-base-100 p-6 text-sm">
              Change water often to keep washes clean.
            </div>

            <label class="tab cursor-pointer">
              <input type="radio" name="wash_tabs_tools" />
              <Layers class="me-2 size-4" strokeWidth= />
              Layers
            </label>
            <div class="tab-content border-base-300 bg-base-100 p-6 text-sm">
              Let each layer dry fully before the next.
            </div>
          </div>
          <div class="mt-3">
            
          </div>`}
            jsx={`<div className="tabs tabs-box">
            <label className="tab cursor-pointer">
              <input type="radio" name="wash_tabs_tools" />
              <Palette className="me-2 size-4" strokeWidth={2} />
              Palette
            </label>
            <div className="tab-content border-base-300 bg-base-100 p-6 text-sm">
              Mix two primaries plus one earth for the plate.
            </div>

            <label className="tab cursor-pointer">
              <input type="radio" name="wash_tabs_tools" defaultChecked />
              <Droplets className="me-2 size-4" strokeWidth={2} />
              Water
            </label>
            <div className="tab-content border-base-300 bg-base-100 p-6 text-sm">
              Change water often to keep washes clean.
            </div>

            <label className="tab cursor-pointer">
              <input type="radio" name="wash_tabs_tools" />
              <Layers className="me-2 size-4" strokeWidth={2} />
              Layers
            </label>
            <div className="tab-content border-base-300 bg-base-100 p-6 text-sm">
              Let each layer dry fully before the next.
            </div>
          </div>
          <div className="mt-3">
            
          </div>`}
          />
        </Section>

        <Section
          eyebrow="13 · Overflow"
          title="Horizontal scroll"
          description="Narrow viewport scrolls when tab titles exceed the width"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="max-w-60 overflow-x-auto">
                            <div className="tabs tabs-lift min-w-max">
                              <input
                                type="radio"
                                name="wash_tabs_scroll"
                                className="tab z-1 cursor-pointer"
                                aria-label="Morning wash"
                              />
                              <div className="tab-content sticky start-0 max-w-60 border-base-300 bg-base-100 p-6 text-sm">
                                Cool grey underpainting.
                              </div>
                              <input
                                type="radio"
                                name="wash_tabs_scroll"
                                className="tab z-1 cursor-pointer"
                                aria-label="Midday glaze"
                                defaultChecked
                              />
                              <div className="tab-content sticky start-0 max-w-60 border-base-300 bg-base-100 p-6 text-sm">
                                Warm light across the plane.
                              </div>
                              <input
                                type="radio"
                                name="wash_tabs_scroll"
                                className="tab z-1 cursor-pointer"
                                aria-label="Evening shadow"
                              />
                              <div className="tab-content sticky start-0 max-w-60 border-base-300 bg-base-100 p-6 text-sm">
                                Violet-grey for long shadows.
                              </div>
                              <input
                                type="radio"
                                name="wash_tabs_scroll"
                                className="tab z-1 cursor-pointer"
                                aria-label="Final accents"
                              />
                              <div className="tab-content sticky start-0 max-w-60 border-base-300 bg-base-100 p-6 text-sm">
                                Dry-brush highlights only.
                              </div>
                            </div>
                          </div>
                          <div className="mt-3">
                            <ClassLabel value="overflow-x-auto + tabs tabs-lift min-w-max" />
                          </div>
              </>
            }
            html={`<div class="max-w-60 overflow-x-auto">
            <div class="tabs tabs-lift min-w-max">
              <input
                type="radio"
                name="wash_tabs_scroll"
                class="tab z-1 cursor-pointer"
                aria-label="Morning wash"
              />
              <div class="tab-content sticky start-0 max-w-60 border-base-300 bg-base-100 p-6 text-sm">
                Cool grey underpainting.
              </div>
              <input
                type="radio"
                name="wash_tabs_scroll"
                class="tab z-1 cursor-pointer"
                aria-label="Midday glaze"
                checked
              />
              <div class="tab-content sticky start-0 max-w-60 border-base-300 bg-base-100 p-6 text-sm">
                Warm light across the plane.
              </div>
              <input
                type="radio"
                name="wash_tabs_scroll"
                class="tab z-1 cursor-pointer"
                aria-label="Evening shadow"
              />
              <div class="tab-content sticky start-0 max-w-60 border-base-300 bg-base-100 p-6 text-sm">
                Violet-grey for long shadows.
              </div>
              <input
                type="radio"
                name="wash_tabs_scroll"
                class="tab z-1 cursor-pointer"
                aria-label="Final accents"
              />
              <div class="tab-content sticky start-0 max-w-60 border-base-300 bg-base-100 p-6 text-sm">
                Dry-brush highlights only.
              </div>
            </div>
          </div>
          <div class="mt-3">
            
          </div>`}
            jsx={`<div className="max-w-60 overflow-x-auto">
            <div className="tabs tabs-lift min-w-max">
              <input
                type="radio"
                name="wash_tabs_scroll"
                className="tab z-1 cursor-pointer"
                aria-label="Morning wash"
              />
              <div className="tab-content sticky start-0 max-w-60 border-base-300 bg-base-100 p-6 text-sm">
                Cool grey underpainting.
              </div>
              <input
                type="radio"
                name="wash_tabs_scroll"
                className="tab z-1 cursor-pointer"
                aria-label="Midday glaze"
                defaultChecked
              />
              <div className="tab-content sticky start-0 max-w-60 border-base-300 bg-base-100 p-6 text-sm">
                Warm light across the plane.
              </div>
              <input
                type="radio"
                name="wash_tabs_scroll"
                className="tab z-1 cursor-pointer"
                aria-label="Evening shadow"
              />
              <div className="tab-content sticky start-0 max-w-60 border-base-300 bg-base-100 p-6 text-sm">
                Violet-grey for long shadows.
              </div>
              <input
                type="radio"
                name="wash_tabs_scroll"
                className="tab z-1 cursor-pointer"
                aria-label="Final accents"
              />
              <div className="tab-content sticky start-0 max-w-60 border-base-300 bg-base-100 p-6 text-sm">
                Dry-brush highlights only.
              </div>
            </div>
          </div>
          <div className="mt-3">
            
          </div>`}
          />
        </Section>
      </div>
    </>
  )
}
