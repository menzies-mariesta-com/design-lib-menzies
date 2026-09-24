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
            html={`<ul class="menu rounded-box border border-ink-border/60 bg-base-100 shadow-[var(--shadow-paper-sm)] w-56">
        <li>
          <button type="button" class="cursor-pointer">
            Home
          </button>
        </li>
        <li>
          <button
            type="button"
            class="menu-dropdown-toggle cursor-pointer menu-dropdown-show"
          >
            Pigments
          </button>
          <ul class="menu-dropdown menu-dropdown-show">
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
            jsx={`<ul className="menu rounded-box border border-ink-border/60 bg-base-100 shadow-[var(--shadow-paper-sm)] w-56">
        <li>
          <button type="button" className="cursor-pointer">
            Home
          </button>
        </li>
        <li>
          <button
            type="button"
            className="menu-dropdown-toggle cursor-pointer menu-dropdown-show"
          >
            Pigments
          </button>
          <ul className="menu-dropdown menu-dropdown-show">
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
            html={`<ul class="menu rounded-box border border-ink-border/60 bg-base-100 shadow-[var(--shadow-paper-sm)] w-56">
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
            jsx={`<ul className="menu rounded-box border border-ink-border/60 bg-base-100 shadow-[var(--shadow-paper-sm)] w-56">
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
            html={`<ul class="menu rounded-box border border-ink-border/60 bg-base-100 shadow-[var(--shadow-paper-sm)] menu-horizontal flex-wrap">
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
            jsx={`<ul className="menu rounded-box border border-ink-border/60 bg-base-100 shadow-[var(--shadow-paper-sm)] menu-horizontal flex-wrap">
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

              <ul className={`menu rounded-box border border-ink-border/60 bg-base-100 shadow-[var(--shadow-paper-sm)] ${className} w-full`}>
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
            html={`<ul class="menu rounded-box border border-ink-border/60 bg-base-100 shadow-[var(--shadow-paper-sm)] ${className} w-full">
                  <li>
                    <button type="button" class="cursor-pointer">
                      {name} item
                    </button>
                  </li>
                  <li>
                    <button type="button" class="cursor-pointer">
                      Second
                    </button>
                  </li>
                </ul>`}
            jsx={`<ul className="menu rounded-box border border-ink-border/60 bg-base-100 shadow-[var(--shadow-paper-sm)] ${className} w-full">
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
            html={`<ul class="menu rounded-box border border-ink-border/60 bg-base-100 shadow-[var(--shadow-paper-sm)] w-56">
                <li>
                  <button type="button" class="cursor-pointer">
                    <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                    Home
                  </button>
                </li>
                <li>
                  <button type="button" class="cursor-pointer">
                    <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/></svg>
                    Palette
                  </button>
                </li>
                <li>
                  <button type="button" class="cursor-pointer">
                    <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/></svg>
                    Layers
                    <span class="badge badge-xs badge-warning">New</span>
                  </button>
                </li>
              </ul>`}
            jsx={`<ul className="menu rounded-box border border-ink-border/60 bg-base-100 shadow-[var(--shadow-paper-sm)] w-56">
                <li>
                  <button type="button" className="cursor-pointer">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                    Home
                  </button>
                </li>
                <li>
                  <button type="button" className="cursor-pointer">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/></svg>
                    Palette
                  </button>
                </li>
                <li>
                  <button type="button" className="cursor-pointer">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/></svg>
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
            html={`<ul class="menu rounded-box border border-ink-border/60 bg-base-100 shadow-[var(--shadow-paper-sm)]">
                <li>
                  <button
                    type="button"
                    class="tooltip tooltip-right cursor-pointer"
                    data-tip="Home"
                    aria-label="Home"
                  >
                    <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    class="tooltip tooltip-right cursor-pointer"
                    data-tip="Palette"
                    aria-label="Palette"
                  >
                    <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/></svg>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    class="tooltip tooltip-right cursor-pointer"
                    data-tip="Layers"
                    aria-label="Layers"
                  >
                    <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/></svg>
                  </button>
                </li>
              </ul>`}
            jsx={`<ul className="menu rounded-box border border-ink-border/60 bg-base-100 shadow-[var(--shadow-paper-sm)]">
                <li>
                  <button
                    type="button"
                    className="tooltip tooltip-right cursor-pointer"
                    data-tip="Home"
                    aria-label="Home"
                  >
                    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="tooltip tooltip-right cursor-pointer"
                    data-tip="Palette"
                    aria-label="Palette"
                  >
                    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/></svg>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="tooltip tooltip-right cursor-pointer"
                    data-tip="Layers"
                    aria-label="Layers"
                  >
                    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/></svg>
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
            html={`<ul class="menu rounded-box border border-ink-border/60 bg-base-100 shadow-[var(--shadow-paper-sm)] menu-horizontal">
                <li>
                  <button
                    type="button"
                    class="tooltip cursor-pointer"
                    data-tip="Home"
                    aria-label="Home"
                  >
                    <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    class="tooltip cursor-pointer"
                    data-tip="Palette"
                    aria-label="Palette"
                  >
                    <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/></svg>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    class="tooltip cursor-pointer"
                    data-tip="Image"
                    aria-label="Image"
                  >
                    <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                  </button>
                </li>
              </ul>`}
            jsx={`<ul className="menu rounded-box border border-ink-border/60 bg-base-100 shadow-[var(--shadow-paper-sm)] menu-horizontal">
                <li>
                  <button
                    type="button"
                    className="tooltip cursor-pointer"
                    data-tip="Home"
                    aria-label="Home"
                  >
                    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="tooltip cursor-pointer"
                    data-tip="Palette"
                    aria-label="Palette"
                  >
                    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/></svg>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="tooltip cursor-pointer"
                    data-tip="Image"
                    aria-label="Image"
                  >
                    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
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
            html={`<ul class="menu rounded-box border border-ink-border/60 bg-base-100 shadow-[var(--shadow-paper-sm)] w-56">
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
            jsx={`<ul className="menu rounded-box border border-ink-border/60 bg-base-100 shadow-[var(--shadow-paper-sm)] w-56">
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
            html={`<ul class="menu rounded-box border border-ink-border/60 bg-base-100 shadow-[var(--shadow-paper-sm)] w-56">
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
            jsx={`<ul className="menu rounded-box border border-ink-border/60 bg-base-100 shadow-[var(--shadow-paper-sm)] w-56">
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
            html={`<ul class="menu rounded-box border border-ink-border/60 bg-base-100 shadow-[var(--shadow-paper-sm)] w-56">
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
            jsx={`<ul className="menu rounded-box border border-ink-border/60 bg-base-100 shadow-[var(--shadow-paper-sm)] w-56">
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
            html={`<ul class="menu rounded-box border border-ink-border/60 bg-base-100 shadow-[var(--shadow-paper-sm)] w-56">
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
            jsx={`<ul className="menu rounded-box border border-ink-border/60 bg-base-100 shadow-[var(--shadow-paper-sm)] w-56">
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
            html={`<ul class="menu rounded-box border border-ink-border/60 bg-base-100 shadow-[var(--shadow-paper-sm)] w-56">
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
            jsx={`<ul className="menu rounded-box border border-ink-border/60 bg-base-100 shadow-[var(--shadow-paper-sm)] w-56">
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
            html={`<ul class="menu rounded-box border border-ink-border/60 bg-base-100 shadow-[var(--shadow-paper-sm)] menu-paged menu-vertical w-56">
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
            jsx={`<ul className="menu rounded-box border border-ink-border/60 bg-base-100 shadow-[var(--shadow-paper-sm)] menu-paged menu-vertical w-56">
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
            html={`<ul class="menu rounded-box border border-ink-border/60 bg-base-100 shadow-[var(--shadow-paper-sm)] menu-xs w-full max-w-xs">
                <li>
                  <button type="button" class="cursor-pointer">
                    <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                    plate-01.png
                  </button>
                </li>
                <li>
                  <details open>
                    <summary class="cursor-pointer">
                      <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"/></svg>
                      Harbor series
                    </summary>
                    <ul>
                      <li>
                        <button type="button" class="cursor-pointer">
                          <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                          dawn-wash.png
                        </button>
                      </li>
                      <li>
                        <button type="button" class="cursor-pointer">
                          <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                          mist-bank.png
                        </button>
                      </li>
                      <li>
                        <details>
                          <summary class="cursor-pointer">
                            <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"/></svg>
                            Studies
                          </summary>
                          <ul>
                            <li>
                              <button type="button" class="cursor-pointer">
                                <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
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
            jsx={`<ul className="menu rounded-box border border-ink-border/60 bg-base-100 shadow-[var(--shadow-paper-sm)] menu-xs w-full max-w-xs">
                <li>
                  <button type="button" className="cursor-pointer">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                    plate-01.png
                  </button>
                </li>
                <li>
                  <details open>
                    <summary className="cursor-pointer">
                      <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"/></svg>
                      Harbor series
                    </summary>
                    <ul>
                      <li>
                        <button type="button" className="cursor-pointer">
                          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                          dawn-wash.png
                        </button>
                      </li>
                      <li>
                        <button type="button" className="cursor-pointer">
                          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                          mist-bank.png
                        </button>
                      </li>
                      <li>
                        <details>
                          <summary className="cursor-pointer">
                            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"/></svg>
                            Studies
                          </summary>
                          <ul>
                            <li>
                              <button type="button" className="cursor-pointer">
                                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
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
            html={`<div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-6">
  <ul class="menu rounded-box border border-ink-border/60 bg-base-100 shadow-[var(--shadow-paper-sm)] w-full max-w-xs bg-base-100/90">
    <li class="menu-title">Studio tools</li>
    <li><button type="button" class="cursor-pointer menu-active"><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m14.622 17.897-10.68-2.913"/><path d="M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z"/><path d="M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15"/></svg> Round brush</button></li>
    <li><button type="button" class="cursor-pointer"><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg> Pencil</button></li>
    <li><button type="button" class="cursor-pointer"><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/></svg> Wash dropper</button></li>
    <li><button type="button" class="cursor-pointer"><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 21H8a2 2 0 0 1-1.42-.587l-3.994-3.999a2 2 0 0 1 0-2.828l10-10a2 2 0 0 1 2.829 0l5.999 6a2 2 0 0 1 0 2.828L12.834 21"/><path d="m5.082 11.09 8.828 8.828"/></svg> Kneaded eraser</button></li>
    <li><button type="button" class="cursor-pointer"><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/></svg> Layers</button></li>
    <li><button type="button" class="cursor-pointer"><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/></svg> Palette</button></li>
    <li class="menu-disabled"><button type="button" disabled class="cursor-not-allowed">Mask lock (soon)</button></li>
  </ul>
  <div class="min-w-0 flex-1 rounded-box border border-ink-border/50 bg-base-200/40 p-4">
    <p class="label-ink">Active tool</p>
    <p class="mt-2 font-display text-lg font-semibold">Round brush</p>
    <p class="mt-1 text-sm text-ink-muted">Sidebar-style menu with titles, icons, active, and disabled states.</p>
  </div>
</div>`}
            jsx={`<div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-6">
  <ul className="menu rounded-box border border-ink-border/60 bg-base-100 shadow-[var(--shadow-paper-sm)] w-full max-w-xs bg-base-100/90">
    <li className="menu-title">Studio tools</li>
    <li><button type="button" className="cursor-pointer menu-active"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m14.622 17.897-10.68-2.913"/><path d="M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z"/><path d="M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15"/></svg> Round brush</button></li>
    <li><button type="button" className="cursor-pointer"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg> Pencil</button></li>
    <li><button type="button" className="cursor-pointer"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/></svg> Wash dropper</button></li>
    <li><button type="button" className="cursor-pointer"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 21H8a2 2 0 0 1-1.42-.587l-3.994-3.999a2 2 0 0 1 0-2.828l10-10a2 2 0 0 1 2.829 0l5.999 6a2 2 0 0 1 0 2.828L12.834 21"/><path d="m5.082 11.09 8.828 8.828"/></svg> Kneaded eraser</button></li>
    <li><button type="button" className="cursor-pointer"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/></svg> Layers</button></li>
    <li><button type="button" className="cursor-pointer"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/></svg> Palette</button></li>
    <li className="menu-disabled"><button type="button" disabled className="cursor-not-allowed">Mask lock (soon)</button></li>
  </ul>
  <div className="min-w-0 flex-1 rounded-box border border-ink-border/50 bg-base-200/40 p-4">
    <p className="label-ink">Active tool</p>
    <p className="mt-2 font-display text-lg font-semibold">Round brush</p>
    <p className="mt-1 text-sm text-ink-muted">Sidebar-style menu with titles, icons, active, and disabled states.</p>
  </div>
</div>`}
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
              class="menu rounded-box border border-ink-border/60 bg-base-100 shadow-[var(--shadow-paper-sm)] menu-vertical w-full max-w-md lg:menu-horizontal lg:max-w-none"
            >
              <li>
                <button type="button" class="cursor-pointer">
                  <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                  Desk
                </button>
              </li>
              <li>
                <button type="button" class="cursor-pointer">
                  <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/></svg>
                  Pigments
                  <span class="badge badge-xs">12</span>
                </button>
              </li>
              <li>
                <button type="button" class="cursor-pointer">
                  <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/></svg>
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
              className="menu rounded-box border border-ink-border/60 bg-base-100 shadow-[var(--shadow-paper-sm)] menu-vertical w-full max-w-md lg:menu-horizontal lg:max-w-none"
            >
              <li>
                <button type="button" className="cursor-pointer">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                  Desk
                </button>
              </li>
              <li>
                <button type="button" className="cursor-pointer">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/></svg>
                  Pigments
                  <span className="badge badge-xs">12</span>
                </button>
              </li>
              <li>
                <button type="button" className="cursor-pointer">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/></svg>
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
