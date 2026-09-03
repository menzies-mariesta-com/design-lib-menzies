import type { ReactNode } from 'react'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  AppWindow,
  Brush,
  Calendar,
  Droplets,
  Eraser,
  Layers,
  Paintbrush,
  Palette,
  Pencil,
  SquareStack,
} from '@menzies-mariesta-com/menzies-design-wash-ui/icons'

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

function DemoLink({ children }: { children: ReactNode }) {
  return (
    <a
      href="#megamenu-demo"
      className="cursor-pointer"
      onClick={(e) => e.preventDefault()}
    >
      {children}
    </a>
  )
}

function IconLink({
  icon: Icon,
  children,
}: {
  icon: typeof Palette
  children: ReactNode
}) {
  return (
    <a
      href="#megamenu-demo"
      className="cursor-pointer"
      onClick={(e) => e.preventDefault()}
    >
      <Icon className="size-4" strokeWidth={2} />
      {children}
    </a>
  )
}

const shell =
  'rounded-box border border-ink-border/60 bg-base-200/20 p-3 sm:p-4'

export default function MegamenuPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Megamenu
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">megamenu</span> panels: wide multi-column links, icons, Menzies Design studio columns.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Wide multi-column panel"
          description="megamenu-wide with nested menu columns"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className={shell}>
                          <button
                            type="button"
                            className="btn btn-sm cursor-pointer sm:hidden"
                            popoverTarget="mm-basic"
                          >
                            Menu
                          </button>
                          <div
                            className="megamenu megamenu-wide max-sm:megamenu-vertical w-full border border-base-300 p-2"
                            id="mm-basic"
                            popover="auto"
                          >
                            <span className="megamenu-active" />
                            <button type="button" className="cursor-pointer" popoverTarget="mm-basic-pigments">
                              Pigments
                            </button>
                            <div id="mm-basic-pigments" popover="auto">
                              <div className="flex max-sm:flex-col items-start">
                                <ul className="menu w-full md:menu-horizontal">
                                  <li>
                                    <DemoLink>Blues</DemoLink>
                                    <ul>
                                      <li>
                                        <DemoLink>Ultramarine</DemoLink>
                                      </li>
                                      <li>
                                        <DemoLink>Cerulean</DemoLink>
                                      </li>
                                      <li>
                                        <DemoLink>Indigo</DemoLink>
                                      </li>
                                    </ul>
                                  </li>
                                  <li>
                                    <DemoLink>Earths</DemoLink>
                                    <ul>
                                      <li>
                                        <DemoLink>Yellow ochre</DemoLink>
                                      </li>
                                      <li>
                                        <DemoLink>Burnt sienna</DemoLink>
                                      </li>
                                      <li>
                                        <DemoLink>Raw umber</DemoLink>
                                      </li>
                                    </ul>
                                  </li>
                                  <li>
                                    <DemoLink>Reds</DemoLink>
                                    <ul>
                                      <li>
                                        <DemoLink>Alizarin</DemoLink>
                                      </li>
                                      <li>
                                        <DemoLink>Cadmium red</DemoLink>
                                      </li>
                                      <li>
                                        <DemoLink>Rose madder</DemoLink>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                              </div>
                            </div>

                            <button type="button" className="cursor-pointer" popoverTarget="mm-basic-tools">
                              Tools
                            </button>
                            <div id="mm-basic-tools" popover="auto">
                              <div className="flex max-sm:flex-col items-start">
                                <ul className="menu w-full md:menu-horizontal">
                                  <li>
                                    <DemoLink>Brushes</DemoLink>
                                    <ul>
                                      <li>
                                        <DemoLink>Round 6</DemoLink>
                                      </li>
                                      <li>
                                        <DemoLink>Flat 12</DemoLink>
                                      </li>
                                      <li>
                                        <DemoLink>Rigger</DemoLink>
                                      </li>
                                    </ul>
                                  </li>
                                  <li>
                                    <DemoLink>Paper</DemoLink>
                                    <ul>
                                      <li>
                                        <DemoLink>Cold press</DemoLink>
                                      </li>
                                      <li>
                                        <DemoLink>Hot press</DemoLink>
                                      </li>
                                      <li>
                                        <DemoLink>Rough</DemoLink>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                              </div>
                            </div>

                            <button type="button" className="cursor-pointer" popoverTarget="mm-basic-series">
                              Series
                            </button>
                            <div id="mm-basic-series" popover="auto">
                              <ul className="menu">
                                <li>
                                  <DemoLink>Harbor light</DemoLink>
                                </li>
                                <li>
                                  <DemoLink>Mist meadow</DemoLink>
                                </li>
                                <li>
                                  <DemoLink>Ink study</DemoLink>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3">
                          <ClassLabel value="megamenu megamenu-wide max-sm:megamenu-vertical" />
                        </div>
            
              </>
            }
            html={`<div class=>
            <button
              type="button"
              class="btn btn-sm cursor-pointer sm:hidden"
              popoverTarget="mm-basic"
            >
              Menu
            </button>
            <div
              class="megamenu megamenu-wide max-sm:megamenu-vertical w-full border border-base-300 p-2"
              id="mm-basic"
              popover="auto"
            >
              <span class="megamenu-active" />
              <button type="button" class="cursor-pointer" popoverTarget="mm-basic-pigments">
                Pigments
              </button>
              <div id="mm-basic-pigments" popover="auto">
                <div class="flex max-sm:flex-col items-start">
                  <ul class="menu w-full md:menu-horizontal">
                    <li>
                      <!-- DemoLink -->
                      <ul>
                        <li>
                          <!-- DemoLink -->
                        </li>
                        <li>
                          <!-- DemoLink -->
                        </li>
                        <li>
                          <!-- DemoLink -->
                        </li>
                      </ul>
                    </li>
                    <li>
                      <!-- DemoLink -->
                      <ul>
                        <li>
                          <!-- DemoLink -->
                        </li>
                        <li>
                          <!-- DemoLink -->
                        </li>
                        <li>
                          <!-- DemoLink -->
                        </li>
                      </ul>
                    </li>
                    <li>
                      <!-- DemoLink -->
                      <ul>
                        <li>
                          <!-- DemoLink -->
                        </li>
                        <li>
                          <!-- DemoLink -->
                        </li>
                        <li>
                          <!-- DemoLink -->
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>

              <button type="button" class="cursor-pointer" popoverTarget="mm-basic-tools">
                Tools
              </button>
              <div id="mm-basic-tools" popover="auto">
                <div class="flex max-sm:flex-col items-start">
                  <ul class="menu w-full md:menu-horizontal">
                    <li>
                      <!-- DemoLink -->
                      <ul>
                        <li>
                          <!-- DemoLink -->
                        </li>
                        <li>
                          <!-- DemoLink -->
                        </li>
                        <li>
                          <!-- DemoLink -->
                        </li>
                      </ul>
                    </li>
                    <li>
                      <!-- DemoLink -->
                      <ul>
                        <li>
                          <!-- DemoLink -->
                        </li>
                        <li>
                          <!-- DemoLink -->
                        </li>
                        <li>
                          <!-- DemoLink -->
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>

              <button type="button" class="cursor-pointer" popoverTarget="mm-basic-series">
                Series
              </button>
              <div id="mm-basic-series" popover="auto">
                <ul class="menu">
                  <li>
                    <!-- DemoLink -->
                  </li>
                  <li>
                    <!-- DemoLink -->
                  </li>
                  <li>
                    <!-- DemoLink -->
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="mt-3">
            <!-- ClassLabel -->
          </div>`}
            jsx={`<div className={shell}>
            <button
              type="button"
              className="btn btn-sm cursor-pointer sm:hidden"
              popoverTarget="mm-basic"
            >
              Menu
            </button>
            <div
              className="megamenu megamenu-wide max-sm:megamenu-vertical w-full border border-base-300 p-2"
              id="mm-basic"
              popover="auto"
            >
              <span className="megamenu-active" />
              <button type="button" className="cursor-pointer" popoverTarget="mm-basic-pigments">
                Pigments
              </button>
              <div id="mm-basic-pigments" popover="auto">
                <div className="flex max-sm:flex-col items-start">
                  <ul className="menu w-full md:menu-horizontal">
                    <li>
                      <DemoLink>Blues</DemoLink>
                      <ul>
                        <li>
                          <DemoLink>Ultramarine</DemoLink>
                        </li>
                        <li>
                          <DemoLink>Cerulean</DemoLink>
                        </li>
                        <li>
                          <DemoLink>Indigo</DemoLink>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <DemoLink>Earths</DemoLink>
                      <ul>
                        <li>
                          <DemoLink>Yellow ochre</DemoLink>
                        </li>
                        <li>
                          <DemoLink>Burnt sienna</DemoLink>
                        </li>
                        <li>
                          <DemoLink>Raw umber</DemoLink>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <DemoLink>Reds</DemoLink>
                      <ul>
                        <li>
                          <DemoLink>Alizarin</DemoLink>
                        </li>
                        <li>
                          <DemoLink>Cadmium red</DemoLink>
                        </li>
                        <li>
                          <DemoLink>Rose madder</DemoLink>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>

              <button type="button" className="cursor-pointer" popoverTarget="mm-basic-tools">
                Tools
              </button>
              <div id="mm-basic-tools" popover="auto">
                <div className="flex max-sm:flex-col items-start">
                  <ul className="menu w-full md:menu-horizontal">
                    <li>
                      <DemoLink>Brushes</DemoLink>
                      <ul>
                        <li>
                          <DemoLink>Round 6</DemoLink>
                        </li>
                        <li>
                          <DemoLink>Flat 12</DemoLink>
                        </li>
                        <li>
                          <DemoLink>Rigger</DemoLink>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <DemoLink>Paper</DemoLink>
                      <ul>
                        <li>
                          <DemoLink>Cold press</DemoLink>
                        </li>
                        <li>
                          <DemoLink>Hot press</DemoLink>
                        </li>
                        <li>
                          <DemoLink>Rough</DemoLink>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>

              <button type="button" className="cursor-pointer" popoverTarget="mm-basic-series">
                Series
              </button>
              <div id="mm-basic-series" popover="auto">
                <ul className="menu">
                  <li>
                    <DemoLink>Harbor light</DemoLink>
                  </li>
                  <li>
                    <DemoLink>Mist meadow</DemoLink>
                  </li>
                  <li>
                    <DemoLink>Ink study</DemoLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <ClassLabel value="megamenu megamenu-wide max-sm:megamenu-vertical" />
          </div>`}
          />
        
        </Section>

        <Section
          eyebrow="02 · Icons"
          title="Lucide icons in link rows"
          description="Same megamenu structure with icons beside each link"
          panel="wash-panel-blue"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className={shell}>
                          <button
                            type="button"
                            className="btn btn-sm cursor-pointer sm:hidden"
                            popoverTarget="mm-icons"
                          >
                            Menu
                          </button>
                          <div
                            className="megamenu megamenu-wide max-sm:megamenu-vertical w-full border border-base-300 p-2"
                            id="mm-icons"
                            popover="auto"
                          >
                            <span className="megamenu-active" />
                            <button type="button" className="cursor-pointer" popoverTarget="mm-icons-kit">
                              Kit
                            </button>
                            <div id="mm-icons-kit" popover="auto">
                              <ul className="menu w-full md:menu-horizontal">
                                <li>
                                  <span className="menu-title">Media</span>
                                  <ul>
                                    <li>
                                      <IconLink icon={Paintbrush}>Round brush</IconLink>
                                    </li>
                                    <li>
                                      <IconLink icon={Pencil}>Graphite pencil</IconLink>
                                    </li>
                                    <li>
                                      <IconLink icon={Droplets}>Wash dropper</IconLink>
                                    </li>
                                    <li>
                                      <IconLink icon={Eraser}>Kneaded eraser</IconLink>
                                    </li>
                                  </ul>
                                </li>
                                <li>
                                  <span className="menu-title">Surface</span>
                                  <ul>
                                    <li>
                                      <IconLink icon={Palette}>Palette plate</IconLink>
                                    </li>
                                    <li>
                                      <IconLink icon={Layers}>Layer stack</IconLink>
                                    </li>
                                    <li>
                                      <IconLink icon={Brush}>Dry brush</IconLink>
                                    </li>
                                  </ul>
                                </li>
                              </ul>
                            </div>

                            <button type="button" className="cursor-pointer" popoverTarget="mm-icons-desk">
                              Desk
                            </button>
                            <div id="mm-icons-desk" popover="auto">
                              <ul className="menu">
                                <li>
                                  <IconLink icon={Calendar}>Studio calendar</IconLink>
                                </li>
                                <li>
                                  <IconLink icon={SquareStack}>Component shelf</IconLink>
                                </li>
                                <li>
                                  <IconLink icon={AppWindow}>Dock preview</IconLink>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3">
                          <ClassLabel value="menu + Lucide size-4 in links" />
                        </div>
            
              </>
            }
            html={`<div class=>
            <button
              type="button"
              class="btn btn-sm cursor-pointer sm:hidden"
              popoverTarget="mm-icons"
            >
              Menu
            </button>
            <div
              class="megamenu megamenu-wide max-sm:megamenu-vertical w-full border border-base-300 p-2"
              id="mm-icons"
              popover="auto"
            >
              <span class="megamenu-active" />
              <button type="button" class="cursor-pointer" popoverTarget="mm-icons-kit">
                Kit
              </button>
              <div id="mm-icons-kit" popover="auto">
                <ul class="menu w-full md:menu-horizontal">
                  <li>
                    <span class="menu-title">Media</span>
                    <ul>
                      <li>
                        <!-- IconLink -->
                      </li>
                      <li>
                        <!-- IconLink -->
                      </li>
                      <li>
                        <!-- IconLink -->
                      </li>
                      <li>
                        <!-- IconLink -->
                      </li>
                    </ul>
                  </li>
                  <li>
                    <span class="menu-title">Surface</span>
                    <ul>
                      <li>
                        <!-- IconLink -->
                      </li>
                      <li>
                        <!-- IconLink -->
                      </li>
                      <li>
                        <!-- IconLink -->
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>

              <button type="button" class="cursor-pointer" popoverTarget="mm-icons-desk">
                Desk
              </button>
              <div id="mm-icons-desk" popover="auto">
                <ul class="menu">
                  <li>
                    <!-- IconLink -->
                  </li>
                  <li>
                    <!-- IconLink -->
                  </li>
                  <li>
                    <!-- IconLink -->
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="mt-3">
            <!-- ClassLabel -->
          </div>`}
            jsx={`<div className={shell}>
            <button
              type="button"
              className="btn btn-sm cursor-pointer sm:hidden"
              popoverTarget="mm-icons"
            >
              Menu
            </button>
            <div
              className="megamenu megamenu-wide max-sm:megamenu-vertical w-full border border-base-300 p-2"
              id="mm-icons"
              popover="auto"
            >
              <span className="megamenu-active" />
              <button type="button" className="cursor-pointer" popoverTarget="mm-icons-kit">
                Kit
              </button>
              <div id="mm-icons-kit" popover="auto">
                <ul className="menu w-full md:menu-horizontal">
                  <li>
                    <span className="menu-title">Media</span>
                    <ul>
                      <li>
                        <IconLink icon={Paintbrush}>Round brush</IconLink>
                      </li>
                      <li>
                        <IconLink icon={Pencil}>Graphite pencil</IconLink>
                      </li>
                      <li>
                        <IconLink icon={Droplets}>Wash dropper</IconLink>
                      </li>
                      <li>
                        <IconLink icon={Eraser}>Kneaded eraser</IconLink>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <span className="menu-title">Surface</span>
                    <ul>
                      <li>
                        <IconLink icon={Palette}>Palette plate</IconLink>
                      </li>
                      <li>
                        <IconLink icon={Layers}>Layer stack</IconLink>
                      </li>
                      <li>
                        <IconLink icon={Brush}>Dry brush</IconLink>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>

              <button type="button" className="cursor-pointer" popoverTarget="mm-icons-desk">
                Desk
              </button>
              <div id="mm-icons-desk" popover="auto">
                <ul className="menu">
                  <li>
                    <IconLink icon={Calendar}>Studio calendar</IconLink>
                  </li>
                  <li>
                    <IconLink icon={SquareStack}>Component shelf</IconLink>
                  </li>
                  <li>
                    <IconLink icon={AppWindow}>Dock preview</IconLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <ClassLabel value="menu + Lucide size-4 in links" />
          </div>`}
          />
        
        </Section>

        <Section
          eyebrow="03 · Studio"
          title="Menzies Design section columns"
          description="One open panel with Palette, Layers, Brushes, Calendar"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className={shell}>
                          <button
                            type="button"
                            className="btn btn-sm cursor-pointer sm:hidden"
                            popoverTarget="mm-studio"
                          >
                            Menu
                          </button>
                          <div
                            className="megamenu megamenu-wide max-sm:megamenu-vertical w-full border border-base-300 p-2"
                            id="mm-studio"
                            popover="auto"
                          >
                            <span className="megamenu-active" />
                            <button type="button" className="cursor-pointer" popoverTarget="mm-studio-explore">
                              Explore
                            </button>
                            <div id="mm-studio-explore" popover="auto">
                              <div className="flex max-sm:flex-col items-start">
                                <ul className="menu w-full md:menu-horizontal">
                                  <li>
                                    <ul>
                                      <li className="menu-title">Palette</li>
                                      <li>
                                        <IconLink icon={Palette}>Pigment chart</IconLink>
                                      </li>
                                      <li>
                                        <DemoLink>Mix notes</DemoLink>
                                      </li>
                                      <li>
                                        <DemoLink>Swatch racks</DemoLink>
                                      </li>
                                    </ul>
                                  </li>
                                  <li>
                                    <ul>
                                      <li className="menu-title">Layers</li>
                                      <li>
                                        <IconLink icon={Layers}>Wash stack</IconLink>
                                      </li>
                                      <li>
                                        <DemoLink>Masking film</DemoLink>
                                      </li>
                                      <li>
                                        <DemoLink>Glaze order</DemoLink>
                                      </li>
                                    </ul>
                                  </li>
                                  <li>
                                    <ul>
                                      <li className="menu-title">Brushes</li>
                                      <li>
                                        <IconLink icon={Paintbrush}>Round set</IconLink>
                                      </li>
                                      <li>
                                        <DemoLink>Flat wash</DemoLink>
                                      </li>
                                      <li>
                                        <DemoLink>Detail tips</DemoLink>
                                      </li>
                                    </ul>
                                  </li>
                                  <li>
                                    <ul>
                                      <li className="menu-title">Calendar</li>
                                      <li>
                                        <IconLink icon={Calendar}>Session plan</IconLink>
                                      </li>
                                      <li>
                                        <DemoLink>Drying windows</DemoLink>
                                      </li>
                                      <li>
                                        <DemoLink>Critique dates</DemoLink>
                                      </li>
                                    </ul>
                                  </li>
                                  <li>
                                    <ul>
                                      <li className="menu-title">Components</li>
                                      <li>
                                        <IconLink icon={SquareStack}>Gallery pages</IconLink>
                                      </li>
                                      <li>
                                        <DemoLink>Form controls</DemoLink>
                                      </li>
                                      <li>
                                        <DemoLink>Feedback chrome</DemoLink>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                              </div>
                            </div>

                            <button type="button" className="cursor-pointer" popoverTarget="mm-studio-guides">
                              Guides
                            </button>
                            <div id="mm-studio-guides" popover="auto">
                              <ul className="menu">
                                <li>
                                  <DemoLink>Wet on wet</DemoLink>
                                </li>
                                <li>
                                  <DemoLink>Dry brush edges</DemoLink>
                                </li>
                                <li>
                                  <DemoLink>Granulation tips</DemoLink>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3">
                          <ClassLabel value="menu-title columns: Palette, Layers, Brushes, Calendar, Components" />
                        </div>
            
              </>
            }
            html={`<div class=>
            <button
              type="button"
              class="btn btn-sm cursor-pointer sm:hidden"
              popoverTarget="mm-studio"
            >
              Menu
            </button>
            <div
              class="megamenu megamenu-wide max-sm:megamenu-vertical w-full border border-base-300 p-2"
              id="mm-studio"
              popover="auto"
            >
              <span class="megamenu-active" />
              <button type="button" class="cursor-pointer" popoverTarget="mm-studio-explore">
                Explore
              </button>
              <div id="mm-studio-explore" popover="auto">
                <div class="flex max-sm:flex-col items-start">
                  <ul class="menu w-full md:menu-horizontal">
                    <li>
                      <ul>
                        <li class="menu-title">Palette</li>
                        <li>
                          <!-- IconLink -->
                        </li>
                        <li>
                          <!-- DemoLink -->
                        </li>
                        <li>
                          <!-- DemoLink -->
                        </li>
                      </ul>
                    </li>
                    <li>
                      <ul>
                        <li class="menu-title">Layers</li>
                        <li>
                          <!-- IconLink -->
                        </li>
                        <li>
                          <!-- DemoLink -->
                        </li>
                        <li>
                          <!-- DemoLink -->
                        </li>
                      </ul>
                    </li>
                    <li>
                      <ul>
                        <li class="menu-title">Brushes</li>
                        <li>
                          <!-- IconLink -->
                        </li>
                        <li>
                          <!-- DemoLink -->
                        </li>
                        <li>
                          <!-- DemoLink -->
                        </li>
                      </ul>
                    </li>
                    <li>
                      <ul>
                        <li class="menu-title">Calendar</li>
                        <li>
                          <!-- IconLink -->
                        </li>
                        <li>
                          <!-- DemoLink -->
                        </li>
                        <li>
                          <!-- DemoLink -->
                        </li>
                      </ul>
                    </li>
                    <li>
                      <ul>
                        <li class="menu-title">Components</li>
                        <li>
                          <!-- IconLink -->
                        </li>
                        <li>
                          <!-- DemoLink -->
                        </li>
                        <li>
                          <!-- DemoLink -->
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>

              <button type="button" class="cursor-pointer" popoverTarget="mm-studio-guides">
                Guides
              </button>
              <div id="mm-studio-guides" popover="auto">
                <ul class="menu">
                  <li>
                    <!-- DemoLink -->
                  </li>
                  <li>
                    <!-- DemoLink -->
                  </li>
                  <li>
                    <!-- DemoLink -->
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="mt-3">
            <!-- ClassLabel -->
          </div>`}
            jsx={`<div className={shell}>
            <button
              type="button"
              className="btn btn-sm cursor-pointer sm:hidden"
              popoverTarget="mm-studio"
            >
              Menu
            </button>
            <div
              className="megamenu megamenu-wide max-sm:megamenu-vertical w-full border border-base-300 p-2"
              id="mm-studio"
              popover="auto"
            >
              <span className="megamenu-active" />
              <button type="button" className="cursor-pointer" popoverTarget="mm-studio-explore">
                Explore
              </button>
              <div id="mm-studio-explore" popover="auto">
                <div className="flex max-sm:flex-col items-start">
                  <ul className="menu w-full md:menu-horizontal">
                    <li>
                      <ul>
                        <li className="menu-title">Palette</li>
                        <li>
                          <IconLink icon={Palette}>Pigment chart</IconLink>
                        </li>
                        <li>
                          <DemoLink>Mix notes</DemoLink>
                        </li>
                        <li>
                          <DemoLink>Swatch racks</DemoLink>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <ul>
                        <li className="menu-title">Layers</li>
                        <li>
                          <IconLink icon={Layers}>Wash stack</IconLink>
                        </li>
                        <li>
                          <DemoLink>Masking film</DemoLink>
                        </li>
                        <li>
                          <DemoLink>Glaze order</DemoLink>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <ul>
                        <li className="menu-title">Brushes</li>
                        <li>
                          <IconLink icon={Paintbrush}>Round set</IconLink>
                        </li>
                        <li>
                          <DemoLink>Flat wash</DemoLink>
                        </li>
                        <li>
                          <DemoLink>Detail tips</DemoLink>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <ul>
                        <li className="menu-title">Calendar</li>
                        <li>
                          <IconLink icon={Calendar}>Session plan</IconLink>
                        </li>
                        <li>
                          <DemoLink>Drying windows</DemoLink>
                        </li>
                        <li>
                          <DemoLink>Critique dates</DemoLink>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <ul>
                        <li className="menu-title">Components</li>
                        <li>
                          <IconLink icon={SquareStack}>Gallery pages</IconLink>
                        </li>
                        <li>
                          <DemoLink>Form controls</DemoLink>
                        </li>
                        <li>
                          <DemoLink>Feedback chrome</DemoLink>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>

              <button type="button" className="cursor-pointer" popoverTarget="mm-studio-guides">
                Guides
              </button>
              <div id="mm-studio-guides" popover="auto">
                <ul className="menu">
                  <li>
                    <DemoLink>Wet on wet</DemoLink>
                  </li>
                  <li>
                    <DemoLink>Dry brush edges</DemoLink>
                  </li>
                  <li>
                    <DemoLink>Granulation tips</DemoLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <ClassLabel value="menu-title columns: Palette, Layers, Brushes, Calendar, Components" />
          </div>`}
          />
        
        </Section>

        <Section
          eyebrow="04 · Navbar"
          title="Mini navbar host"
          description="A self-contained navbar inside the wash-panel hosts megamenu-full in"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className={`${shell} overflow-visible`}>
                          <div className="navbar rounded-box border border-ink-border/70 bg-base-100 px-2 shadow-sm sm:px-3">
                            <div className="navbar-start">
                              <a
                                href="#megamenu-demo"
                                className="btn btn-ghost cursor-pointer text-lg font-display"
                                onClick={(e) => e.preventDefault()}
                              >
                                Menzies Design
                              </a>
                            </div>
                            <div className="navbar-center hidden sm:flex">
                              <div
                                className="megamenu megamenu-full max-sm:megamenu-vertical p-1"
                                id="mm-nav"
                                popover="auto"
                              >
                                <span className="megamenu-active" />
                                <button type="button" className="cursor-pointer" popoverTarget="mm-nav-studio">
                                  Studio
                                </button>
                                <div id="mm-nav-studio" popover="auto">
                                  <div className="flex max-sm:flex-col items-start">
                                    <ul className="menu w-full md:menu-horizontal">
                                      <li>
                                        <DemoLink>Workspace</DemoLink>
                                        <ul>
                                          <li>
                                            <IconLink icon={Palette}>Palette</IconLink>
                                          </li>
                                          <li>
                                            <IconLink icon={Layers}>Layers</IconLink>
                                          </li>
                                          <li>
                                            <IconLink icon={Paintbrush}>Brushes</IconLink>
                                          </li>
                                        </ul>
                                      </li>
                                      <li>
                                        <DemoLink>Schedule</DemoLink>
                                        <ul>
                                          <li>
                                            <IconLink icon={Calendar}>Calendar</IconLink>
                                          </li>
                                          <li>
                                            <DemoLink>Critiques</DemoLink>
                                          </li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                <button type="button" className="cursor-pointer" popoverTarget="mm-nav-library">
                                  Library
                                </button>
                                <div id="mm-nav-library" popover="auto">
                                  <ul className="menu">
                                    <li>
                                      <DemoLink>Reference plates</DemoLink>
                                    </li>
                                    <li>
                                      <DemoLink>Wash recipes</DemoLink>
                                    </li>
                                    <li>
                                      <DemoLink>Paper grades</DemoLink>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="navbar-end gap-1">
                              <button type="button" className="btn btn-sm cursor-pointer hidden sm:inline-flex">
                                Sign in
                              </button>
                              <button
                                type="button"
                                className="btn btn-sm cursor-pointer sm:hidden"
                                popoverTarget="mm-nav"
                              >
                                Menu
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3">
                          <ClassLabel value="navbar + megamenu megamenu-full" />
                        </div>
            
              </>
            }
            html={`<div class=>
            <div class="navbar rounded-box border border-ink-border/70 bg-base-100 px-2 shadow-sm sm:px-3">
              <div class="navbar-start">
                <a
                  href="#megamenu-demo"
                  class="btn btn-ghost cursor-pointer text-lg font-display"
                  
                >
                  Menzies Design
                </a>
              </div>
              <div class="navbar-center hidden sm:flex">
                <div
                  class="megamenu megamenu-full max-sm:megamenu-vertical p-1"
                  id="mm-nav"
                  popover="auto"
                >
                  <span class="megamenu-active" />
                  <button type="button" class="cursor-pointer" popoverTarget="mm-nav-studio">
                    Studio
                  </button>
                  <div id="mm-nav-studio" popover="auto">
                    <div class="flex max-sm:flex-col items-start">
                      <ul class="menu w-full md:menu-horizontal">
                        <li>
                          <!-- DemoLink -->
                          <ul>
                            <li>
                              <!-- IconLink -->
                            </li>
                            <li>
                              <!-- IconLink -->
                            </li>
                            <li>
                              <!-- IconLink -->
                            </li>
                          </ul>
                        </li>
                        <li>
                          <!-- DemoLink -->
                          <ul>
                            <li>
                              <!-- IconLink -->
                            </li>
                            <li>
                              <!-- DemoLink -->
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <button type="button" class="cursor-pointer" popoverTarget="mm-nav-library">
                    Library
                  </button>
                  <div id="mm-nav-library" popover="auto">
                    <ul class="menu">
                      <li>
                        <!-- DemoLink -->
                      </li>
                      <li>
                        <!-- DemoLink -->
                      </li>
                      <li>
                        <!-- DemoLink -->
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="navbar-end gap-1">
                <button type="button" class="btn btn-sm cursor-pointer hidden sm:inline-flex">
                  Sign in
                </button>
                <button
                  type="button"
                  class="btn btn-sm cursor-pointer sm:hidden"
                  popoverTarget="mm-nav"
                >
                  Menu
                </button>
              </div>
            </div>
          </div>
          <div class="mt-3">
            <!-- ClassLabel -->
          </div>`}
            jsx={`<div className={\`\${shell} overflow-visible\`}>
            <div className="navbar rounded-box border border-ink-border/70 bg-base-100 px-2 shadow-sm sm:px-3">
              <div className="navbar-start">
                <a
                  href="#megamenu-demo"
                  className="btn btn-ghost cursor-pointer text-lg font-display"
                  onClick={(e) => e.preventDefault()}
                >
                  Menzies Design
                </a>
              </div>
              <div className="navbar-center hidden sm:flex">
                <div
                  className="megamenu megamenu-full max-sm:megamenu-vertical p-1"
                  id="mm-nav"
                  popover="auto"
                >
                  <span className="megamenu-active" />
                  <button type="button" className="cursor-pointer" popoverTarget="mm-nav-studio">
                    Studio
                  </button>
                  <div id="mm-nav-studio" popover="auto">
                    <div className="flex max-sm:flex-col items-start">
                      <ul className="menu w-full md:menu-horizontal">
                        <li>
                          <DemoLink>Workspace</DemoLink>
                          <ul>
                            <li>
                              <IconLink icon={Palette}>Palette</IconLink>
                            </li>
                            <li>
                              <IconLink icon={Layers}>Layers</IconLink>
                            </li>
                            <li>
                              <IconLink icon={Paintbrush}>Brushes</IconLink>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <DemoLink>Schedule</DemoLink>
                          <ul>
                            <li>
                              <IconLink icon={Calendar}>Calendar</IconLink>
                            </li>
                            <li>
                              <DemoLink>Critiques</DemoLink>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <button type="button" className="cursor-pointer" popoverTarget="mm-nav-library">
                    Library
                  </button>
                  <div id="mm-nav-library" popover="auto">
                    <ul className="menu">
                      <li>
                        <DemoLink>Reference plates</DemoLink>
                      </li>
                      <li>
                        <DemoLink>Wash recipes</DemoLink>
                      </li>
                      <li>
                        <DemoLink>Paper grades</DemoLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="navbar-end gap-1">
                <button type="button" className="btn btn-sm cursor-pointer hidden sm:inline-flex">
                  Sign in
                </button>
                <button
                  type="button"
                  className="btn btn-sm cursor-pointer sm:hidden"
                  popoverTarget="mm-nav"
                >
                  Menu
                </button>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <ClassLabel value="navbar + megamenu megamenu-full" />
          </div>`}
          />
        
        </Section>

        <Section
          eyebrow="05 · Responsive"
          title="Small screen notes"
          description="Megamenu prefers large screens"
        >
          <ShowcaseTabs
            preview={
              <>

              <ul className="list space-y-2 text-sm text-ink-muted">
                          <li className="list-row items-start gap-3 px-0">
                            <span className="font-mono text-[0.7rem] text-base-content">sm:hidden</span>
                            <span>
                              Show a single Menu button that targets the megamenu popover on
                              phones.
                            </span>
                          </li>
                          <li className="list-row items-start gap-3 px-0">
                            <span className="font-mono text-[0.7rem] text-base-content">
                              max-sm:megamenu-vertical
                            </span>
                            <span>
                              Collapse the bar into a vertical sheet when the popover opens.
                            </span>
                          </li>
                          <li className="list-row items-start gap-3 px-0">
                            <span className="font-mono text-[0.7rem] text-base-content">
                              max-sm:flex-col
                            </span>
                            <span>
                              Stack multi-column panels so titles and links remain readable.
                            </span>
                          </li>
                          <li className="list-row items-start gap-3 px-0">
                            <span className="font-mono text-[0.7rem] text-base-content">popover</span>
                            <span>
                              Item panels use the Popover API, so outside click and Escape
                              dismiss without sticky open classes.
                            </span>
                          </li>
                        </ul>
                        <div className="mt-3">
                          <ClassLabel value="responsive: button + max-sm:megamenu-vertical + stacked columns" />
                        </div>
            
              </>
            }
            html={`<ul class="list space-y-2 text-sm text-ink-muted">
            <li class="list-row items-start gap-3 px-0">
              <span class="font-mono text-[0.7rem] text-base-content">sm:hidden</span>
              <span>
                Show a single Menu button that targets the megamenu popover on
                phones.
              </span>
            </li>
            <li class="list-row items-start gap-3 px-0">
              <span class="font-mono text-[0.7rem] text-base-content">
                max-sm:megamenu-vertical
              </span>
              <span>
                Collapse the bar into a vertical sheet when the popover opens.
              </span>
            </li>
            <li class="list-row items-start gap-3 px-0">
              <span class="font-mono text-[0.7rem] text-base-content">
                max-sm:flex-col
              </span>
              <span>
                Stack multi-column panels so titles and links remain readable.
              </span>
            </li>
            <li class="list-row items-start gap-3 px-0">
              <span class="font-mono text-[0.7rem] text-base-content">popover</span>
              <span>
                Item panels use the Popover API, so outside click and Escape
                dismiss without sticky open classes.
              </span>
            </li>
          </ul>
          <div class="mt-3">
            <!-- ClassLabel -->
          </div>`}
            jsx={`<ul className="list space-y-2 text-sm text-ink-muted">
            <li className="list-row items-start gap-3 px-0">
              <span className="font-mono text-[0.7rem] text-base-content">sm:hidden</span>
              <span>
                Show a single Menu button that targets the megamenu popover on
                phones.
              </span>
            </li>
            <li className="list-row items-start gap-3 px-0">
              <span className="font-mono text-[0.7rem] text-base-content">
                max-sm:megamenu-vertical
              </span>
              <span>
                Collapse the bar into a vertical sheet when the popover opens.
              </span>
            </li>
            <li className="list-row items-start gap-3 px-0">
              <span className="font-mono text-[0.7rem] text-base-content">
                max-sm:flex-col
              </span>
              <span>
                Stack multi-column panels so titles and links remain readable.
              </span>
            </li>
            <li className="list-row items-start gap-3 px-0">
              <span className="font-mono text-[0.7rem] text-base-content">popover</span>
              <span>
                Item panels use the Popover API, so outside click and Escape
                dismiss without sticky open classes.
              </span>
            </li>
          </ul>
          <div className="mt-3">
            <ClassLabel value="responsive: button + max-sm:megamenu-vertical + stacked columns" />
          </div>`}
          />
        
        </Section>
      </div>
    </>
  )
}
