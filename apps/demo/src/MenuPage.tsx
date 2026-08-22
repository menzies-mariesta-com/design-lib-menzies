import { useState, type ReactNode } from 'react'
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
    <Sample label="menu-dropdown-toggle + menu-dropdown-show">
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
    </Sample>
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
          daisyUI <span className="font-mono text-xs">menu</span> lists:
          vertical and horizontal layouts, sizes, icons, titles, states,
          nested and collapsible submenus, plus a watercolor studio sidebar.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Vertical menu links"
          description="Default menu is vertical. Prefer buttons for in-app actions with cursor-pointer."
        >
          <Sample label="menu">
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
          </Sample>
        </Section>

        <Section
          eyebrow="02 · Horizontal"
          title="menu-horizontal"
          description="Lay items in a row for toolbars and compact nav strips."
          panel="wash-panel-ochre"
        >
          <Sample label="menu menu-horizontal">
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
          </Sample>
        </Section>

        <Section
          eyebrow="03 · Sizes"
          title="From menu-xs to menu-lg"
          description="Size modifiers scale padding and type. Class labels sit under each sample."
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sizes.map(({ name, className }) => (
              <Sample key={className} label={`menu ${className}`}>
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
              </Sample>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="04 · Icons"
          title="Lucide icons in menu items"
          description="Pair Lucide 1.28.0 icons with labels, or show icon-only rows with tooltips."
          panel="wash-panel-blue"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            <Sample label="menu + Lucide icons">
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
            </Sample>

            <Sample label="menu + icon only + tooltip-right">
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
            </Sample>

            <Sample label="menu menu-horizontal + icons">
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
            </Sample>
          </div>
        </Section>

        <Section
          eyebrow="05 · States"
          title="Title, disabled, active, focus"
          description="menu-title for section labels. menu-disabled, menu-active, and menu-focus style the interactive child."
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:flex-wrap">
            <Sample label="menu-title">
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
            </Sample>

            <Sample label="menu-title as parent">
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
            </Sample>

            <Sample label="menu-disabled / menu-active / menu-focus">
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
            </Sample>
          </div>
        </Section>

        <Section
          eyebrow="06 · Submenus"
          title="Nested, details, and JS toggle"
          description="Nested ul for always-open trees. details for collapsible groups. menu-dropdown with JS for class-driven open state. menu-paged shows one level at a time."
          panel="wash-panel-rose"
        >
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            <Sample label="nested submenu">
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
            </Sample>

            <Sample label="details collapsible">
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
            </Sample>

            <JsDropdownMenu />

            <Sample label="menu-paged" className="lg:col-span-2 xl:col-span-1">
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
            </Sample>

            <Sample label="file tree (menu-xs + details)" className="lg:col-span-2">
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
            </Sample>
          </div>
        </Section>

        <Section
          eyebrow="07 · Studio"
          title="Watercolor tools sidebar"
          description="A compact pigment-desk menu: titles, Lucide tools, active selection, and a disabled lock."
        >
          <StudioToolsMenu />
        </Section>

        <Section
          eyebrow="08 · Responsive"
          title="Vertical on small, horizontal on large"
          description="Use menu-vertical lg:menu-horizontal so nav stacks on phones and spreads on desktop."
          panel="wash-panel-blue"
        >
          <Sample label="menu menu-vertical lg:menu-horizontal">
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
          </Sample>
          <p className="mt-4 text-sm text-ink-muted">
            Resize the viewport: items stack vertically below the large
            breakpoint, then run horizontally.
          </p>
        </Section>
      </div>
    </>
  )
}
