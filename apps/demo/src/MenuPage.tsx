import { useState, type ReactNode } from 'react'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  Droplets,
  Eraser,
  FolderOpen,
  Home,
  Image,
  Layers,
  Paintbrush,
  Palette,
  Pencil,
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

const menuShell =
  'menu rounded-box border border-ink-border/60 bg-base-100 shadow-[var(--shadow-paper-sm)]'

const sizes = [
  { name: 'XS', className: 'menu-xs' },
  { name: 'SM', className: 'menu-sm' },
  { name: 'MD', className: 'menu-md' },
  { name: 'LG', className: 'menu-lg' },
] as const

function JsDropdownMenu() {
  const [open, setOpen] = useState(false)

  return (
    <ShowcaseTabs
            preview={
              <>

              <ul className={`${menuShell} w-56`}>
                      <li>
                        <button type="button" className="cursor-pointer">
                          Home
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className={`menu-dropdown-toggle cursor-pointer ${open ? 'menu-dropdown-show' : ''}`}
                          onClick={() => setOpen((v) => !v)}
                        >
                          Pigments
                        </button>
                        <ul className={`menu-dropdown ${open ? 'menu-dropdown-show' : ''}`}>
                          <li>
                            <button type="button" className="cursor-pointer">
                              Ultramarine
                            </button>
                          </li>
                          <li>
                            <button type="button" className="cursor-pointer">
                              Yellow ochre
                            </button>
                          </li>
                        </ul>
                      </li>
                    </ul>
            
              </>
            }
            html={`<ul class=>
        <li>
          <button type="button" class="cursor-pointer">
            Home
          </button>
        </li>
        <li>
          <button
            type="button"
            class=
            
          >
            Pigments
          </button>
          <ul class=>
            <li>
              <button type="button" class="cursor-pointer">
                Ultramarine
              </button>
            </li>
            <li>
              <button type="button" class="cursor-pointer">
                Yellow ochre
              </button>
            </li>
          </ul>
        </li>
      </ul>`}
            jsx={`<ul className={\`\${menuShell} w-56\`}>
        <li>
          <button type="button" className="cursor-pointer">
            Home
          </button>
        </li>
        <li>
          <button
            type="button"
            className={\`menu-dropdown-toggle cursor-pointer \${open ? 'menu-dropdown-show' : ''}\`}
            onClick={() => setOpen((v) => !v)}
          >
            Pigments
          </button>
          <ul className={\`menu-dropdown \${open ? 'menu-dropdown-show' : ''}\`}>
            <li>
              <button type="button" className="cursor-pointer">
                Ultramarine
              </button>
            </li>
            <li>
              <button type="button" className="cursor-pointer">
                Yellow ochre
              </button>
            </li>
          </ul>
        </li>
      </ul>`}
          />
  )
}

function StudioToolsMenu() {
  const [active, setActive] = useState('brush')

  const items = [
    { id: 'brush', label: 'Round brush', Icon: Paintbrush },
    { id: 'pencil', label: 'Pencil', Icon: Pencil },
    { id: 'drop', label: 'Wash dropper', Icon: Droplets },
    { id: 'eraser', label: 'Kneaded eraser', Icon: Eraser },
    { id: 'layers', label: 'Layers', Icon: Layers },
    { id: 'palette', label: 'Palette', Icon: Palette },
  ] as const

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-6">
      <ul className={`${menuShell} w-full max-w-xs bg-base-100/90`}>
        <li className="menu-title">Studio tools</li>
        {items.map(({ id, label, Icon }) => (
          <li key={id}>
            <button
              type="button"
              className={`cursor-pointer ${active === id ? 'menu-active' : ''}`}
              onClick={() => setActive(id)}
            >
              <Icon className="size-4" strokeWidth={2} />
              {label}
            </button>
          </li>
        ))}
        <li className="menu-disabled">
          <button type="button" disabled className="cursor-not-allowed">
            Mask lock (soon)
          </button>
        </li>
      </ul>
      <div className="min-w-0 flex-1 rounded-box border border-ink-border/50 bg-base-200/40 p-4">
        <p className="label-ink">Active tool</p>
        <p className="mt-2 font-display text-lg font-semibold">
          {items.find((i) => i.id === active)?.label}
        </p>
        <p className="mt-1 text-sm text-ink-muted">
          Sidebar-style menu with titles, icons, active, and disabled states.
        </p>
        <ClassLabel value="menu + menu-title + menu-active + menu-disabled" />
      </div>
    </div>
  )
}

export default function MenuPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Menu
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">menu</span> lists: vertical and horizontal layouts, sizes, icons, titles, states, nested.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Vertical menu links"
          description="Default menu is vertical"
        >
          <ShowcaseTabs
            preview={
              <>

              <ul className={`${menuShell} w-56`}>
                            <li>
                              <button type="button" className="cursor-pointer">
                                Overview
                              </button>
                            </li>
                            <li>
                              <button type="button" className="cursor-pointer">
                                Palette
                              </button>
                            </li>
                            <li>
                              <button type="button" className="cursor-pointer">
                                Layers
                              </button>
                            </li>
                          </ul>
            
              </>
            }
            html={`<ul class=>
              <li>
                <button type="button" class="cursor-pointer">
                  Overview
                </button>
              </li>
              <li>
                <button type="button" class="cursor-pointer">
                  Palette
                </button>
              </li>
              <li>
                <button type="button" class="cursor-pointer">
                  Layers
                </button>
              </li>
            </ul>`}
            jsx={`<ul className={\`\${menuShell} w-56\`}>
              <li>
                <button type="button" className="cursor-pointer">
                  Overview
                </button>
              </li>
              <li>
                <button type="button" className="cursor-pointer">
                  Palette
                </button>
              </li>
              <li>
                <button type="button" className="cursor-pointer">
                  Layers
                </button>
              </li>
            </ul>`}
          />
        </Section>

        <Section
          eyebrow="02 · Horizontal"
          title="menu-horizontal"
          description="Lay items in a row for toolbars and compact nav strips"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>

              <ul className={`${menuShell} menu-horizontal flex-wrap`}>
                            <li>
                              <button type="button" className="cursor-pointer">
                                Plates
                              </button>
                            </li>
                            <li>
                              <button type="button" className="cursor-pointer">
                                Washes
                              </button>
                            </li>
                            <li>
                              <button type="button" className="cursor-pointer">
                                Series
                              </button>
                            </li>
                          </ul>
            
              </>
            }
            html={`<ul class=>
              <li>
                <button type="button" class="cursor-pointer">
                  Plates
                </button>
              </li>
              <li>
                <button type="button" class="cursor-pointer">
                  Washes
                </button>
              </li>
              <li>
                <button type="button" class="cursor-pointer">
                  Series
                </button>
              </li>
            </ul>`}
            jsx={`<ul className={\`\${menuShell} menu-horizontal flex-wrap\`}>
              <li>
                <button type="button" className="cursor-pointer">
                  Plates
                </button>
              </li>
              <li>
                <button type="button" className="cursor-pointer">
                  Washes
                </button>
              </li>
              <li>
                <button type="button" className="cursor-pointer">
                  Series
                </button>
              </li>
            </ul>`}
          />
        </Section>

        <Section
          eyebrow="03 · Sizes"
          title="From menu-xs to menu-lg"
          description="Size modifiers scale padding and type"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sizes.map(({ name, className }) => (
              <ShowcaseTabs
            preview={
              <>

              <ul className={`${menuShell} ${className} w-full`}>
                                <li>
                                  <button type="button" className="cursor-pointer">
                                    {name} item
                                  </button>
                                </li>
                                <li>
                                  <button type="button" className="cursor-pointer">
                                    Second
                                  </button>
                                </li>
                              </ul>
            
              </>
            }
            html={`<ul class=>
                  <li>
                    <button type="button" class="cursor-pointer">
                       item
                    </button>
                  </li>
                  <li>
                    <button type="button" class="cursor-pointer">
                      Second
                    </button>
                  </li>
                </ul>`}
            jsx={`<ul className={\`\${menuShell} \${className} w-full\`}>
                  <li>
                    <button type="button" className="cursor-pointer">
                      {name} item
                    </button>
                  </li>
                  <li>
                    <button type="button" className="cursor-pointer">
                      Second
                    </button>
                  </li>
                </ul>`}
          />
            ))}
          </div>
        </Section>

        <Section
          eyebrow="04 · Icons"
          title="Lucide icons in menu items"
          description="Pair Lucide 1.28.0 icons"
          panel="wash-panel-blue"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            <ShowcaseTabs
            preview={
              <>

              <ul className={`${menuShell} w-56`}>
                              <li>
                                <button type="button" className="cursor-pointer">
                                  <Home className="size-4" strokeWidth={2} />
                                  Home
                                </button>
                              </li>
                              <li>
                                <button type="button" className="cursor-pointer">
                                  <Palette className="size-4" strokeWidth={2} />
                                  Palette
                                </button>
                              </li>
                              <li>
                                <button type="button" className="cursor-pointer">
                                  <Layers className="size-4" strokeWidth={2} />
                                  Layers
                                  <span className="badge badge-xs badge-warning">New</span>
                                </button>
                              </li>
                            </ul>
            
              </>
            }
            html={`<ul class=>
                <li>
                  <button type="button" class="cursor-pointer">
                    <!-- Home -->
                    Home
                  </button>
                </li>
                <li>
                  <button type="button" class="cursor-pointer">
                    <!-- Palette -->
                    Palette
                  </button>
                </li>
                <li>
                  <button type="button" class="cursor-pointer">
                    <!-- Layers -->
                    Layers
                    <span class="badge badge-xs badge-warning">New</span>
                  </button>
                </li>
              </ul>`}
            jsx={`<ul className={\`\${menuShell} w-56\`}>
                <li>
                  <button type="button" className="cursor-pointer">
                    <Home className="size-4" strokeWidth={2} />
                    Home
                  </button>
                </li>
                <li>
                  <button type="button" className="cursor-pointer">
                    <Palette className="size-4" strokeWidth={2} />
                    Palette
                  </button>
                </li>
                <li>
                  <button type="button" className="cursor-pointer">
                    <Layers className="size-4" strokeWidth={2} />
                    Layers
                    <span className="badge badge-xs badge-warning">New</span>
                  </button>
                </li>
              </ul>`}
          />

            <ShowcaseTabs
            preview={
              <>

              <ul className={menuShell}>
                              <li>
                                <button
                                  type="button"
                                  className="tooltip tooltip-right cursor-pointer"
                                  data-tip="Home"
                                  aria-label="Home"
                                >
                                  <Home className="size-5" strokeWidth={2} />
                                </button>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  className="tooltip tooltip-right cursor-pointer"
                                  data-tip="Palette"
                                  aria-label="Palette"
                                >
                                  <Palette className="size-5" strokeWidth={2} />
                                </button>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  className="tooltip tooltip-right cursor-pointer"
                                  data-tip="Layers"
                                  aria-label="Layers"
                                >
                                  <Layers className="size-5" strokeWidth={2} />
                                </button>
                              </li>
                            </ul>
            
              </>
            }
            html={`<ul class=>
                <li>
                  <button
                    type="button"
                    class="tooltip tooltip-right cursor-pointer"
                    data-tip="Home"
                    aria-label="Home"
                  >
                    <!-- Home -->
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    class="tooltip tooltip-right cursor-pointer"
                    data-tip="Palette"
                    aria-label="Palette"
                  >
                    <!-- Palette -->
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    class="tooltip tooltip-right cursor-pointer"
                    data-tip="Layers"
                    aria-label="Layers"
                  >
                    <!-- Layers -->
                  </button>
                </li>
              </ul>`}
            jsx={`<ul className={menuShell}>
                <li>
                  <button
                    type="button"
                    className="tooltip tooltip-right cursor-pointer"
                    data-tip="Home"
                    aria-label="Home"
                  >
                    <Home className="size-5" strokeWidth={2} />
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="tooltip tooltip-right cursor-pointer"
                    data-tip="Palette"
                    aria-label="Palette"
                  >
                    <Palette className="size-5" strokeWidth={2} />
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="tooltip tooltip-right cursor-pointer"
                    data-tip="Layers"
                    aria-label="Layers"
                  >
                    <Layers className="size-5" strokeWidth={2} />
                  </button>
                </li>
              </ul>`}
          />

            <ShowcaseTabs
            preview={
              <>

              <ul className={`${menuShell} menu-horizontal`}>
                              <li>
                                <button
                                  type="button"
                                  className="tooltip cursor-pointer"
                                  data-tip="Home"
                                  aria-label="Home"
                                >
                                  <Home className="size-5" strokeWidth={2} />
                                </button>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  className="tooltip cursor-pointer"
                                  data-tip="Palette"
                                  aria-label="Palette"
                                >
                                  <Palette className="size-5" strokeWidth={2} />
                                </button>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  className="tooltip cursor-pointer"
                                  data-tip="Image"
                                  aria-label="Image"
                                >
                                  <Image className="size-5" strokeWidth={2} />
                                </button>
                              </li>
                            </ul>
            
              </>
            }
            html={`<ul class=>
                <li>
                  <button
                    type="button"
                    class="tooltip cursor-pointer"
                    data-tip="Home"
                    aria-label="Home"
                  >
                    <!-- Home -->
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    class="tooltip cursor-pointer"
                    data-tip="Palette"
                    aria-label="Palette"
                  >
                    <!-- Palette -->
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    class="tooltip cursor-pointer"
                    data-tip="Image"
                    aria-label="Image"
                  >
                    <!-- Image -->
                  </button>
                </li>
              </ul>`}
            jsx={`<ul className={\`\${menuShell} menu-horizontal\`}>
                <li>
                  <button
                    type="button"
                    className="tooltip cursor-pointer"
                    data-tip="Home"
                    aria-label="Home"
                  >
                    <Home className="size-5" strokeWidth={2} />
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="tooltip cursor-pointer"
                    data-tip="Palette"
                    aria-label="Palette"
                  >
                    <Palette className="size-5" strokeWidth={2} />
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="tooltip cursor-pointer"
                    data-tip="Image"
                    aria-label="Image"
                  >
                    <Image className="size-5" strokeWidth={2} />
                  </button>
                </li>
              </ul>`}
          />
          </div>
        </Section>

        <Section
          eyebrow="05 · States"
          title="Title, disabled, active, focus"
          description="menu-title for section labels"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:flex-wrap">
            <ShowcaseTabs
            preview={
              <>

              <ul className={`${menuShell} w-56`}>
                              <li className="menu-title">Pigments</li>
                              <li>
                                <button type="button" className="cursor-pointer">
                                  Ultramarine
                                </button>
                              </li>
                              <li>
                                <button type="button" className="cursor-pointer">
                                  Alizarin
                                </button>
                              </li>
                            </ul>
            
              </>
            }
            html={`<ul class=>
                <li class="menu-title">Pigments</li>
                <li>
                  <button type="button" class="cursor-pointer">
                    Ultramarine
                  </button>
                </li>
                <li>
                  <button type="button" class="cursor-pointer">
                    Alizarin
                  </button>
                </li>
              </ul>`}
            jsx={`<ul className={\`\${menuShell} w-56\`}>
                <li className="menu-title">Pigments</li>
                <li>
                  <button type="button" className="cursor-pointer">
                    Ultramarine
                  </button>
                </li>
                <li>
                  <button type="button" className="cursor-pointer">
                    Alizarin
                  </button>
                </li>
              </ul>`}
          />

            <ShowcaseTabs
            preview={
              <>

              <ul className={`${menuShell} w-56`}>
                              <li>
                                <h2 className="menu-title">Washes</h2>
                                <ul>
                                  <li>
                                    <button type="button" className="cursor-pointer">
                                      Flat wash
                                    </button>
                                  </li>
                                  <li>
                                    <button type="button" className="cursor-pointer">
                                      Graded wash
                                    </button>
                                  </li>
                                </ul>
                              </li>
                            </ul>
            
              </>
            }
            html={`<ul class=>
                <li>
                  <h2 class="menu-title">Washes</h2>
                  <ul>
                    <li>
                      <button type="button" class="cursor-pointer">
                        Flat wash
                      </button>
                    </li>
                    <li>
                      <button type="button" class="cursor-pointer">
                        Graded wash
                      </button>
                    </li>
                  </ul>
                </li>
              </ul>`}
            jsx={`<ul className={\`\${menuShell} w-56\`}>
                <li>
                  <h2 className="menu-title">Washes</h2>
                  <ul>
                    <li>
                      <button type="button" className="cursor-pointer">
                        Flat wash
                      </button>
                    </li>
                    <li>
                      <button type="button" className="cursor-pointer">
                        Graded wash
                      </button>
                    </li>
                  </ul>
                </li>
              </ul>`}
          />

            <ShowcaseTabs
            preview={
              <>

              <ul className={`${menuShell} w-56`}>
                              <li>
                                <button type="button" className="menu-active cursor-pointer">
                                  Active item
                                </button>
                              </li>
                              <li>
                                <button type="button" className="menu-focus cursor-pointer">
                                  Focus style
                                </button>
                              </li>
                              <li className="menu-disabled">
                                <button type="button" disabled className="cursor-not-allowed">
                                  Disabled button
                                </button>
                              </li>
                              <li className="menu-disabled">
                                <a role="link" aria-disabled="true" className="cursor-not-allowed">
                                  Disabled link
                                </a>
                              </li>
                            </ul>
            
              </>
            }
            html={`<ul class=>
                <li>
                  <button type="button" class="menu-active cursor-pointer">
                    Active item
                  </button>
                </li>
                <li>
                  <button type="button" class="menu-focus cursor-pointer">
                    Focus style
                  </button>
                </li>
                <li class="menu-disabled">
                  <button type="button" disabled class="cursor-not-allowed">
                    Disabled button
                  </button>
                </li>
                <li class="menu-disabled">
                  <a role="link" aria-disabled="true" class="cursor-not-allowed">
                    Disabled link
                  </a>
                </li>
              </ul>`}
            jsx={`<ul className={\`\${menuShell} w-56\`}>
                <li>
                  <button type="button" className="menu-active cursor-pointer">
                    Active item
                  </button>
                </li>
                <li>
                  <button type="button" className="menu-focus cursor-pointer">
                    Focus style
                  </button>
                </li>
                <li className="menu-disabled">
                  <button type="button" disabled className="cursor-not-allowed">
                    Disabled button
                  </button>
                </li>
                <li className="menu-disabled">
                  <a role="link" aria-disabled="true" className="cursor-not-allowed">
                    Disabled link
                  </a>
                </li>
              </ul>`}
          />
          </div>
        </Section>

        <Section
          eyebrow="06 · Submenus"
          title="Nested, details, and JS toggle"
          description="Nested ul for always-open trees"
          panel="wash-panel-rose"
        >
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            <ShowcaseTabs
            preview={
              <>

              <ul className={`${menuShell} w-56`}>
                              <li>
                                <button type="button" className="cursor-pointer">
                                  Item 1
                                </button>
                              </li>
                              <li>
                                <button type="button" className="cursor-pointer">
                                  Parent
                                </button>
                                <ul>
                                  <li>
                                    <button type="button" className="cursor-pointer">
                                      Submenu 1
                                    </button>
                                  </li>
                                  <li>
                                    <button type="button" className="cursor-pointer">
                                      Submenu 2
                                    </button>
                                  </li>
                                  <li>
                                    <button type="button" className="cursor-pointer">
                                      Nested parent
                                    </button>
                                    <ul>
                                      <li>
                                        <button type="button" className="cursor-pointer">
                                          Leaf A
                                        </button>
                                      </li>
                                      <li>
                                        <button type="button" className="cursor-pointer">
                                          Leaf B
                                        </button>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                              </li>
                              <li>
                                <button type="button" className="cursor-pointer">
                                  Item 3
                                </button>
                              </li>
                            </ul>
            
              </>
            }
            html={`<ul class=>
                <li>
                  <button type="button" class="cursor-pointer">
                    Item 1
                  </button>
                </li>
                <li>
                  <button type="button" class="cursor-pointer">
                    Parent
                  </button>
                  <ul>
                    <li>
                      <button type="button" class="cursor-pointer">
                        Submenu 1
                      </button>
                    </li>
                    <li>
                      <button type="button" class="cursor-pointer">
                        Submenu 2
                      </button>
                    </li>
                    <li>
                      <button type="button" class="cursor-pointer">
                        Nested parent
                      </button>
                      <ul>
                        <li>
                          <button type="button" class="cursor-pointer">
                            Leaf A
                          </button>
                        </li>
                        <li>
                          <button type="button" class="cursor-pointer">
                            Leaf B
                          </button>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  <button type="button" class="cursor-pointer">
                    Item 3
                  </button>
                </li>
              </ul>`}
            jsx={`<ul className={\`\${menuShell} w-56\`}>
                <li>
                  <button type="button" className="cursor-pointer">
                    Item 1
                  </button>
                </li>
                <li>
                  <button type="button" className="cursor-pointer">
                    Parent
                  </button>
                  <ul>
                    <li>
                      <button type="button" className="cursor-pointer">
                        Submenu 1
                      </button>
                    </li>
                    <li>
                      <button type="button" className="cursor-pointer">
                        Submenu 2
                      </button>
                    </li>
                    <li>
                      <button type="button" className="cursor-pointer">
                        Nested parent
                      </button>
                      <ul>
                        <li>
                          <button type="button" className="cursor-pointer">
                            Leaf A
                          </button>
                        </li>
                        <li>
                          <button type="button" className="cursor-pointer">
                            Leaf B
                          </button>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  <button type="button" className="cursor-pointer">
                    Item 3
                  </button>
                </li>
              </ul>`}
          />

            <ShowcaseTabs
            preview={
              <>

              <ul className={`${menuShell} w-56`}>
                              <li>
                                <button type="button" className="cursor-pointer">
                                  Item 1
                                </button>
                              </li>
                              <li>
                                <details open>
                                  <summary className="cursor-pointer">Parent</summary>
                                  <ul>
                                    <li>
                                      <button type="button" className="cursor-pointer">
                                        Submenu 1
                                      </button>
                                    </li>
                                    <li>
                                      <button type="button" className="cursor-pointer">
                                        Submenu 2
                                      </button>
                                    </li>
                                    <li>
                                      <details>
                                        <summary className="cursor-pointer">Nested</summary>
                                        <ul>
                                          <li>
                                            <button type="button" className="cursor-pointer">
                                              Leaf A
                                            </button>
                                          </li>
                                          <li>
                                            <button type="button" className="cursor-pointer">
                                              Leaf B
                                            </button>
                                          </li>
                                        </ul>
                                      </details>
                                    </li>
                                  </ul>
                                </details>
                              </li>
                              <li>
                                <button type="button" className="cursor-pointer">
                                  Item 3
                                </button>
                              </li>
                            </ul>
            
              </>
            }
            html={`<ul class=>
                <li>
                  <button type="button" class="cursor-pointer">
                    Item 1
                  </button>
                </li>
                <li>
                  <details open>
                    <summary class="cursor-pointer">Parent</summary>
                    <ul>
                      <li>
                        <button type="button" class="cursor-pointer">
                          Submenu 1
                        </button>
                      </li>
                      <li>
                        <button type="button" class="cursor-pointer">
                          Submenu 2
                        </button>
                      </li>
                      <li>
                        <details>
                          <summary class="cursor-pointer">Nested</summary>
                          <ul>
                            <li>
                              <button type="button" class="cursor-pointer">
                                Leaf A
                              </button>
                            </li>
                            <li>
                              <button type="button" class="cursor-pointer">
                                Leaf B
                              </button>
                            </li>
                          </ul>
                        </details>
                      </li>
                    </ul>
                  </details>
                </li>
                <li>
                  <button type="button" class="cursor-pointer">
                    Item 3
                  </button>
                </li>
              </ul>`}
            jsx={`<ul className={\`\${menuShell} w-56\`}>
                <li>
                  <button type="button" className="cursor-pointer">
                    Item 1
                  </button>
                </li>
                <li>
                  <details open>
                    <summary className="cursor-pointer">Parent</summary>
                    <ul>
                      <li>
                        <button type="button" className="cursor-pointer">
                          Submenu 1
                        </button>
                      </li>
                      <li>
                        <button type="button" className="cursor-pointer">
                          Submenu 2
                        </button>
                      </li>
                      <li>
                        <details>
                          <summary className="cursor-pointer">Nested</summary>
                          <ul>
                            <li>
                              <button type="button" className="cursor-pointer">
                                Leaf A
                              </button>
                            </li>
                            <li>
                              <button type="button" className="cursor-pointer">
                                Leaf B
                              </button>
                            </li>
                          </ul>
                        </details>
                      </li>
                    </ul>
                  </details>
                </li>
                <li>
                  <button type="button" className="cursor-pointer">
                    Item 3
                  </button>
                </li>
              </ul>`}
          />

            <JsDropdownMenu />

            <ShowcaseTabs
            preview={
              <>

              <ul className={`${menuShell} menu-paged menu-vertical w-56`}>
                              <li>
                                <button type="button" className="cursor-pointer">
                                  Home
                                </button>
                              </li>
                              <li>
                                <button type="button" className="cursor-pointer">
                                  About
                                </button>
                              </li>
                              <li>
                                <details>
                                  <summary className="cursor-pointer">Products</summary>
                                  <ul>
                                    <li>
                                      <button type="button" className="cursor-pointer">
                                        All products
                                      </button>
                                    </li>
                                    <li>
                                      <button type="button" className="cursor-pointer">
                                        Brushes
                                      </button>
                                    </li>
                                    <li>
                                      <button type="button" className="cursor-pointer">
                                        Papers
                                      </button>
                                    </li>
                                  </ul>
                                </details>
                              </li>
                            </ul>
            
              </>
            }
            html={`<ul class=>
                <li>
                  <button type="button" class="cursor-pointer">
                    Home
                  </button>
                </li>
                <li>
                  <button type="button" class="cursor-pointer">
                    About
                  </button>
                </li>
                <li>
                  <details>
                    <summary class="cursor-pointer">Products</summary>
                    <ul>
                      <li>
                        <button type="button" class="cursor-pointer">
                          All products
                        </button>
                      </li>
                      <li>
                        <button type="button" class="cursor-pointer">
                          Brushes
                        </button>
                      </li>
                      <li>
                        <button type="button" class="cursor-pointer">
                          Papers
                        </button>
                      </li>
                    </ul>
                  </details>
                </li>
              </ul>`}
            jsx={`<ul className={\`\${menuShell} menu-paged menu-vertical w-56\`}>
                <li>
                  <button type="button" className="cursor-pointer">
                    Home
                  </button>
                </li>
                <li>
                  <button type="button" className="cursor-pointer">
                    About
                  </button>
                </li>
                <li>
                  <details>
                    <summary className="cursor-pointer">Products</summary>
                    <ul>
                      <li>
                        <button type="button" className="cursor-pointer">
                          All products
                        </button>
                      </li>
                      <li>
                        <button type="button" className="cursor-pointer">
                          Brushes
                        </button>
                      </li>
                      <li>
                        <button type="button" className="cursor-pointer">
                          Papers
                        </button>
                      </li>
                    </ul>
                  </details>
                </li>
              </ul>`}
          />

            <ShowcaseTabs
            preview={
              <>

              <ul className={`${menuShell} menu-xs w-full max-w-xs`}>
                              <li>
                                <button type="button" className="cursor-pointer">
                                  <Image className="size-4" strokeWidth={2} />
                                  plate-01.png
                                </button>
                              </li>
                              <li>
                                <details open>
                                  <summary className="cursor-pointer">
                                    <FolderOpen className="size-4" strokeWidth={2} />
                                    Harbor series
                                  </summary>
                                  <ul>
                                    <li>
                                      <button type="button" className="cursor-pointer">
                                        <Image className="size-4" strokeWidth={2} />
                                        dawn-wash.png
                                      </button>
                                    </li>
                                    <li>
                                      <button type="button" className="cursor-pointer">
                                        <Image className="size-4" strokeWidth={2} />
                                        mist-bank.png
                                      </button>
                                    </li>
                                    <li>
                                      <details>
                                        <summary className="cursor-pointer">
                                          <FolderOpen className="size-4" strokeWidth={2} />
                                          Studies
                                        </summary>
                                        <ul>
                                          <li>
                                            <button type="button" className="cursor-pointer">
                                              <Image className="size-4" strokeWidth={2} />
                                              edge-test.png
                                            </button>
                                          </li>
                                        </ul>
                                      </details>
                                    </li>
                                  </ul>
                                </details>
                              </li>
                            </ul>
            
              </>
            }
            html={`<ul class=>
                <li>
                  <button type="button" class="cursor-pointer">
                    <!-- Image -->
                    plate-01.png
                  </button>
                </li>
                <li>
                  <details open>
                    <summary class="cursor-pointer">
                      <!-- FolderOpen -->
                      Harbor series
                    </summary>
                    <ul>
                      <li>
                        <button type="button" class="cursor-pointer">
                          <!-- Image -->
                          dawn-wash.png
                        </button>
                      </li>
                      <li>
                        <button type="button" class="cursor-pointer">
                          <!-- Image -->
                          mist-bank.png
                        </button>
                      </li>
                      <li>
                        <details>
                          <summary class="cursor-pointer">
                            <!-- FolderOpen -->
                            Studies
                          </summary>
                          <ul>
                            <li>
                              <button type="button" class="cursor-pointer">
                                <!-- Image -->
                                edge-test.png
                              </button>
                            </li>
                          </ul>
                        </details>
                      </li>
                    </ul>
                  </details>
                </li>
              </ul>`}
            jsx={`<ul className={\`\${menuShell} menu-xs w-full max-w-xs\`}>
                <li>
                  <button type="button" className="cursor-pointer">
                    <Image className="size-4" strokeWidth={2} />
                    plate-01.png
                  </button>
                </li>
                <li>
                  <details open>
                    <summary className="cursor-pointer">
                      <FolderOpen className="size-4" strokeWidth={2} />
                      Harbor series
                    </summary>
                    <ul>
                      <li>
                        <button type="button" className="cursor-pointer">
                          <Image className="size-4" strokeWidth={2} />
                          dawn-wash.png
                        </button>
                      </li>
                      <li>
                        <button type="button" className="cursor-pointer">
                          <Image className="size-4" strokeWidth={2} />
                          mist-bank.png
                        </button>
                      </li>
                      <li>
                        <details>
                          <summary className="cursor-pointer">
                            <FolderOpen className="size-4" strokeWidth={2} />
                            Studies
                          </summary>
                          <ul>
                            <li>
                              <button type="button" className="cursor-pointer">
                                <Image className="size-4" strokeWidth={2} />
                                edge-test.png
                              </button>
                            </li>
                          </ul>
                        </details>
                      </li>
                    </ul>
                  </details>
                </li>
              </ul>`}
          />
          </div>
        </Section>

        <Section
          eyebrow="07 · Studio"
          title="Watercolor tools sidebar"
          description="A compact pigment-desk menu: titles, Lucide tools, active selection"
        >
          <ShowcaseTabs
            preview={
              <>

              <StudioToolsMenu />
            
              </>
            }
            html={`<!-- StudioToolsMenu -->`}
            jsx={`<StudioToolsMenu />`}
          />
        
        </Section>

        <Section
          eyebrow="08 · Responsive"
          title="Vertical on small, horizontal on large"
          description="Use menu-vertical lg:menu-horizontal so nav stacks on phones"
          panel="wash-panel-blue"
        >
          <ShowcaseTabs
            preview={
              <>

              <ul
                            className={`${menuShell} menu-vertical w-full max-w-md lg:menu-horizontal lg:max-w-none`}
                          >
                            <li>
                              <button type="button" className="cursor-pointer">
                                <Home className="size-4" strokeWidth={2} />
                                Desk
                              </button>
                            </li>
                            <li>
                              <button type="button" className="cursor-pointer">
                                <Palette className="size-4" strokeWidth={2} />
                                Pigments
                                <span className="badge badge-xs">12</span>
                              </button>
                            </li>
                            <li>
                              <button type="button" className="cursor-pointer">
                                <Layers className="size-4" strokeWidth={2} />
                                Layers
                                <span className="badge badge-xs badge-warning">New</span>
                              </button>
                            </li>
                            <li>
                              <button type="button" className="cursor-pointer">
                                Stats
                                <span className="badge badge-xs badge-info" />
                              </button>
                            </li>
                          </ul>
            
              </>
            }
            html={`<ul
              class=
            >
              <li>
                <button type="button" class="cursor-pointer">
                  <!-- Home -->
                  Desk
                </button>
              </li>
              <li>
                <button type="button" class="cursor-pointer">
                  <!-- Palette -->
                  Pigments
                  <span class="badge badge-xs">12</span>
                </button>
              </li>
              <li>
                <button type="button" class="cursor-pointer">
                  <!-- Layers -->
                  Layers
                  <span class="badge badge-xs badge-warning">New</span>
                </button>
              </li>
              <li>
                <button type="button" class="cursor-pointer">
                  Stats
                  <span class="badge badge-xs badge-info" />
                </button>
              </li>
            </ul>`}
            jsx={`<ul
              className={\`\${menuShell} menu-vertical w-full max-w-md lg:menu-horizontal lg:max-w-none\`}
            >
              <li>
                <button type="button" className="cursor-pointer">
                  <Home className="size-4" strokeWidth={2} />
                  Desk
                </button>
              </li>
              <li>
                <button type="button" className="cursor-pointer">
                  <Palette className="size-4" strokeWidth={2} />
                  Pigments
                  <span className="badge badge-xs">12</span>
                </button>
              </li>
              <li>
                <button type="button" className="cursor-pointer">
                  <Layers className="size-4" strokeWidth={2} />
                  Layers
                  <span className="badge badge-xs badge-warning">New</span>
                </button>
              </li>
              <li>
                <button type="button" className="cursor-pointer">
                  Stats
                  <span className="badge badge-xs badge-info" />
                </button>
              </li>
            </ul>`}
          />
          <p className="mt-4 text-sm text-ink-muted">
            Resize the viewport: items stack vertically below the large
            breakpoint, then run horizontally.
          </p>
        </Section>
      </div>
    </>
  )
}
