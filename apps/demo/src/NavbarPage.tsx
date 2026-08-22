import { useEffect, useId, useRef, type ReactNode, type RefObject } from 'react'
import {
  Bell,
  Droplets,
  Eraser,
  Layers,
  Menu,
  Paintbrush,
  Palette,
  Pencil,
  Search,
  ShoppingBag,
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

const navShell =
  'navbar rounded-box border border-ink-border/60 bg-base-100 shadow-[var(--shadow-paper-sm)]'

const menuPanel =
  'menu menu-sm dropdown-content z-50 mt-3 w-52 max-w-[min(100vw-1rem,13rem)] max-h-[min(70vh,24rem)] overflow-x-hidden overflow-y-auto rounded-box border border-ink-border bg-base-100 p-2 shadow-[var(--shadow-paper-md)]'

function blurActive() {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur()
  }
}

function useDetailsOutsideClose(ref: RefObject<HTMLDetailsElement | null>) {
  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      const el = ref.current
      if (!el?.open) return
      if (event.target instanceof Node && !el.contains(event.target)) {
        el.open = false
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && ref.current?.open) {
        ref.current.open = false
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [ref])
}

function MenuWithDetails() {
  const detailsRef = useRef<HTMLDetailsElement>(null)
  useDetailsOutsideClose(detailsRef)

  function close() {
    if (detailsRef.current) detailsRef.current.open = false
  }

  return (
    <Sample label="navbar + menu-horizontal + details">
      <div className={navShell}>
        <div className="flex-1">
          <button type="button" className="btn btn-ghost cursor-pointer text-xl font-display">
            Menzies Design
          </button>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <button type="button" className="cursor-pointer">
                Plates
              </button>
            </li>
            <li>
              <details ref={detailsRef}>
                <summary className="cursor-pointer">Pigments</summary>
                <ul className="rounded-t-none border border-ink-border bg-base-100 p-2 z-50">
                  <li>
                    <button type="button" className="cursor-pointer" onClick={close}>
                      Ultramarine
                    </button>
                  </li>
                  <li>
                    <button type="button" className="cursor-pointer" onClick={close}>
                      Yellow ochre
                    </button>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <button type="button" className="cursor-pointer">
                Series
              </button>
            </li>
          </ul>
        </div>
      </div>
    </Sample>
  )
}

function AvatarDropdownNavbar() {
  return (
    <Sample label="navbar + dropdown-end + avatar">
      <div className={navShell}>
        <div className="flex-1">
          <button type="button" className="btn btn-ghost cursor-pointer text-xl font-display">
            Menzies Design
          </button>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="search"
            placeholder="Search plates…"
            className="input input-bordered w-24 cursor-text md:w-auto"
          />
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar cursor-pointer"
              aria-label="Account menu"
            >
              <div className="w-10 rounded-full bg-wash-blue text-sm font-semibold text-base-content">
                <span className="flex h-full items-center justify-center">MK</span>
              </div>
            </div>
            <ul tabIndex={-1} className={menuPanel}>
              <li>
                <button
                  type="button"
                  className="justify-between cursor-pointer"
                  onClick={blurActive}
                >
                  Profile
                  <span className="badge badge-sm">New</span>
                </button>
              </li>
              <li>
                <button type="button" className="cursor-pointer" onClick={blurActive}>
                  Studio prefs
                </button>
              </li>
              <li>
                <button type="button" className="cursor-pointer" onClick={blurActive}>
                  Sign out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Sample>
  )
}

function IconButtonsNavbar() {
  return (
    <Sample label="navbar-start / center / end + tooltip icons">
      <div className={navShell}>
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-square cursor-pointer"
              aria-label="Open menu"
            >
              <Menu className="size-5" strokeWidth={2} />
            </div>
            <ul tabIndex={-1} className={menuPanel}>
              <li>
                <button type="button" className="cursor-pointer" onClick={blurActive}>
                  Desk
                </button>
              </li>
              <li>
                <button type="button" className="cursor-pointer" onClick={blurActive}>
                  Palette
                </button>
              </li>
              <li>
                <button type="button" className="cursor-pointer" onClick={blurActive}>
                  Layers
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <button type="button" className="btn btn-ghost cursor-pointer text-xl font-display">
            Menzies Design
          </button>
        </div>
        <div className="navbar-end gap-1">
          <div className="tooltip tooltip-bottom tooltip-primary" data-tip="Search">
            <button
              type="button"
              className="btn btn-ghost btn-square btn-primary cursor-pointer"
              aria-label="Search"
            >
              <Search className="size-5" strokeWidth={2} />
            </button>
          </div>
          <div className="tooltip tooltip-bottom tooltip-secondary" data-tip="Notifications">
            <button
              type="button"
              className="btn btn-ghost btn-square btn-secondary cursor-pointer"
              aria-label="Notifications"
            >
              <span className="indicator">
                <Bell className="size-5" strokeWidth={2} />
                <span className="badge badge-xs badge-primary indicator-item" />
              </span>
            </button>
          </div>
          <div className="tooltip tooltip-bottom tooltip-accent" data-tip="Cart">
            <button
              type="button"
              className="btn btn-ghost btn-square btn-accent cursor-pointer"
              aria-label="Cart"
            >
              <span className="indicator">
                <ShoppingBag className="size-5" strokeWidth={2} />
                <span className="badge badge-sm indicator-item">3</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </Sample>
  )
}

function StudioMenziesNavbar() {
  const tools = [
    { id: 'brush', label: 'Round brush', Icon: Paintbrush },
    { id: 'pencil', label: 'Pencil', Icon: Pencil },
    { id: 'drop', label: 'Wash dropper', Icon: Droplets },
    { id: 'eraser', label: 'Kneaded eraser', Icon: Eraser },
    { id: 'layers', label: 'Layers', Icon: Layers },
    { id: 'palette', label: 'Palette', Icon: Palette },
  ] as const

  return (
    <Sample label="Studio Menzies Design pigment tools">
      <div className={`${navShell} wash-panel-blue bg-base-100/90`}>
        <div className="navbar-start gap-2">
          <button type="button" className="btn btn-ghost cursor-pointer px-2">
            <span className="font-display text-xl font-semibold tracking-tight">Menzies Design</span>
          </button>
          <span className="label-ink hidden sm:inline">Pigment desk</span>
        </div>
        <div className="navbar-center hidden md:flex">
          <div className="join">
            {tools.slice(0, 4).map(({ id, label, Icon }) => (
              <div key={id} className="tooltip tooltip-bottom" data-tip={label}>
                <button
                  type="button"
                  className="btn btn-ghost btn-square join-item cursor-pointer"
                  aria-label={label}
                >
                  <Icon className="size-4" strokeWidth={2} />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="navbar-end gap-1">
          <div className="tooltip tooltip-bottom tooltip-primary" data-tip="Layers">
            <button
              type="button"
              className="btn btn-ghost btn-square btn-primary cursor-pointer"
              aria-label="Layers"
            >
              <Layers className="size-4" strokeWidth={2} />
            </button>
          </div>
          <div className="tooltip tooltip-bottom tooltip-secondary" data-tip="Palette">
            <button
              type="button"
              className="btn btn-ghost btn-square btn-secondary cursor-pointer"
              aria-label="Palette"
            >
              <Palette className="size-4" strokeWidth={2} />
            </button>
          </div>
          <div className="avatar avatar-placeholder ml-1">
            <div className="w-9 rounded-full bg-wash-ochre text-sm font-semibold text-base-content">
              <span>WF</span>
            </div>
          </div>
        </div>
      </div>
    </Sample>
  )
}

function ResponsiveDropdownNavbar() {
  const detailsRef = useRef<HTMLDetailsElement>(null)
  useDetailsOutsideClose(detailsRef)

  function closeDetails() {
    if (detailsRef.current) detailsRef.current.open = false
  }

  return (
    <Sample label="lg:hidden hamburger + lg:flex center menu">
      <div className={navShell}>
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-square cursor-pointer lg:hidden"
              aria-label="Open navigation"
            >
              <Menu className="size-5" strokeWidth={2} />
            </div>
            <ul tabIndex={-1} className={`${menuPanel} lg:hidden`}>
              <li>
                <button type="button" className="cursor-pointer" onClick={blurActive}>
                  Item 1
                </button>
              </li>
              <li>
                <button type="button" className="cursor-pointer" onClick={blurActive}>
                  Parent
                </button>
                <ul className="p-2">
                  <li>
                    <button type="button" className="cursor-pointer" onClick={blurActive}>
                      Submenu 1
                    </button>
                  </li>
                  <li>
                    <button type="button" className="cursor-pointer" onClick={blurActive}>
                      Submenu 2
                    </button>
                  </li>
                </ul>
              </li>
              <li>
                <button type="button" className="cursor-pointer" onClick={blurActive}>
                  Item 3
                </button>
              </li>
            </ul>
          </div>
          <button type="button" className="btn btn-ghost cursor-pointer text-xl font-display">
            Menzies Design
          </button>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <button type="button" className="cursor-pointer">
                Item 1
              </button>
            </li>
            <li>
              <details ref={detailsRef}>
                <summary className="cursor-pointer">Parent</summary>
                <ul className="z-50 w-40 rounded-box border border-ink-border bg-base-100 p-2">
                  <li>
                    <button type="button" className="cursor-pointer" onClick={closeDetails}>
                      Submenu 1
                    </button>
                  </li>
                  <li>
                    <button type="button" className="cursor-pointer" onClick={closeDetails}>
                      Submenu 2
                    </button>
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
        </div>
        <div className="navbar-end">
          <button type="button" className="btn cursor-pointer">
            Open plate
          </button>
        </div>
      </div>
    </Sample>
  )
}

function ResponsiveCollapseNavbar() {
  const toggleId = useId()

  return (
    <Sample label="max-lg:collapse + peer overlay (panel-local)">
      <div className="relative max-lg:collapse w-full rounded-box border border-ink-border/60 bg-base-200 shadow-[var(--shadow-paper-sm)]">
        <input id={toggleId} className="peer hidden" type="checkbox" />
        <label
          htmlFor={toggleId}
          className="absolute inset-0 z-10 hidden cursor-pointer max-lg:peer-checked:block"
          aria-label="Close menu overlay"
        />
        <div className="collapse-title navbar relative z-20 min-h-0 p-2 after:hidden!">
          <div className="navbar-start gap-1">
            <label
              htmlFor={toggleId}
              className="btn btn-ghost btn-square cursor-pointer lg:hidden"
              aria-label="Toggle menu"
            >
              <Menu className="size-5" strokeWidth={2} />
            </label>
            <button type="button" className="btn btn-ghost cursor-pointer text-xl font-display">
              Menzies Design
            </button>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <button type="button" className="cursor-pointer">
                  Item 1
                </button>
              </li>
              <li>
                <button type="button" className="cursor-pointer">
                  Item 2
                </button>
              </li>
              <li>
                <button type="button" className="cursor-pointer">
                  Item 3
                </button>
              </li>
            </ul>
          </div>
          <div className="navbar-end">
            <input
              type="search"
              placeholder="Search"
              className="input input-sm w-28 cursor-text sm:w-40 lg:w-auto"
            />
          </div>
        </div>
        <div className="collapse-content relative z-20 lg:hidden">
          <ul className="menu rounded-box border border-ink-border/50 bg-base-100">
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
              </ul>
            </li>
            <li>
              <button type="button" className="cursor-pointer">
                Item 3
              </button>
            </li>
          </ul>
        </div>
      </div>
    </Sample>
  )
}

const colorBars = [
  { label: 'bg-base-200', className: 'bg-base-200 text-base-content' },
  { label: 'bg-base-300', className: 'bg-base-300 text-base-content' },
  { label: 'bg-neutral text-neutral-content', className: 'bg-neutral text-neutral-content' },
  { label: 'bg-primary text-primary-content', className: 'bg-primary text-primary-content' },
  { label: 'bg-secondary text-secondary-content', className: 'bg-secondary text-secondary-content' },
  { label: 'bg-accent text-accent-content', className: 'bg-accent text-accent-content' },
] as const

export default function NavbarPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Navbar
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">navbar</span> patterns:
          start, center, and end sections, menus, search joins, avatar dropdowns,
          icon tooltips, studio tools, color variants, and responsive collapse.
          Demos stay inside wash panels (not the app shell header).
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Start, center, and end"
          description="Use navbar-start, navbar-center, and navbar-end to place brand, title, and actions."
        >
          <div className="space-y-4">
            <Sample label="navbar (title only)">
              <div className={`${navShell} bg-base-200`}>
                <button type="button" className="btn btn-ghost cursor-pointer text-xl font-display">
                  Menzies Design
                </button>
              </div>
            </Sample>

            <Sample label="navbar-start + navbar-center + navbar-end">
              <div className={navShell}>
                <div className="navbar-start">
                  <button type="button" className="btn btn-ghost cursor-pointer font-display">
                    Brand
                  </button>
                </div>
                <div className="navbar-center">
                  <span className="text-sm font-medium text-ink-muted">Center title</span>
                </div>
                <div className="navbar-end">
                  <button type="button" className="btn btn-sm cursor-pointer">
                    Action
                  </button>
                </div>
              </div>
            </Sample>

            <Sample label="flex-1 + flex-none (title and icon)">
              <div className={navShell}>
                <div className="flex-1">
                  <button type="button" className="btn btn-ghost cursor-pointer text-xl font-display">
                    Menzies Design
                  </button>
                </div>
                <div className="flex-none">
                  <div className="tooltip tooltip-left" data-tip="More">
                    <button
                      type="button"
                      className="btn btn-ghost btn-square cursor-pointer"
                      aria-label="More"
                    >
                      <Menu className="size-5" strokeWidth={2} />
                    </button>
                  </div>
                </div>
              </div>
            </Sample>
          </div>
        </Section>

        <Section
          eyebrow="02 · With menu"
          title="Horizontal menu links"
          description="Pair navbar with menu-horizontal. details submenus close on outside click and Escape."
          panel="wash-panel-ochre"
        >
          <MenuWithDetails />
        </Section>

        <Section
          eyebrow="03 · With search"
          title="Join input and button"
          description="Search fields use join so input and button are direct siblings sharing radius."
          panel="wash-panel-blue"
        >
          <Sample label="navbar + join + input.join-item + btn.join-item">
            <div className={navShell}>
              <div className="navbar-start">
                <button type="button" className="btn btn-ghost cursor-pointer text-xl font-display">
                  Menzies Design
                </button>
              </div>
              <div className="navbar-end">
                <div className="join">
                  <input
                    type="search"
                    placeholder="Search washes…"
                    className="input join-item input-bordered w-32 cursor-text sm:w-48"
                  />
                  <button type="button" className="btn btn-primary join-item cursor-pointer">
                    <Search className="size-4" strokeWidth={2} />
                    Search
                  </button>
                </div>
              </div>
            </div>
          </Sample>
        </Section>

        <Section
          eyebrow="04 · Dropdown / avatar"
          title="Account menu"
          description="Focus dropdown with dropdown-end closes when focus leaves (click outside). Avatar trigger opens profile actions. Panels cap to the viewport and scroll vertically."
          panel="wash-panel-rose"
        >
          <AvatarDropdownNavbar />
        </Section>

        <Section
          eyebrow="05 · Icon buttons"
          title="Tooltips on icon-only actions"
          description="Icon-only controls wrap in matching tooltip colors. hamburger opens a focus dropdown."
        >
          <IconButtonsNavbar />
        </Section>

        <Section
          eyebrow="06 · Studio Menzies Design"
          title="Brand and pigment tools"
          description="A watercolor desk bar: brand, tool join strip, and semantic icon actions."
          panel="wash-panel-blue"
        >
          <StudioMenziesNavbar />
        </Section>

        <Section
          eyebrow="07 · Colors"
          title="Background variants"
          description="Semantic fills inside the panel. sticky is noted only: avoid viewport sticky here so it does not fight the app shell."
        >
          <div className="space-y-3">
            {colorBars.map(({ label, className }) => (
              <Sample key={label} label={`navbar ${label}`}>
                <div
                  className={`navbar rounded-box border border-ink-border/40 shadow-[var(--shadow-paper-sm)] ${className}`}
                >
                  <button type="button" className="btn btn-ghost cursor-pointer text-xl font-display">
                    Menzies Design
                  </button>
                </div>
              </Sample>
            ))}
            <p className="text-sm text-ink-muted">
              Sticky tip: use <span className="font-mono text-xs">sticky top-0</span> in a
              page that owns its scroll, not inside this gallery under the fixed app header.
            </p>
          </div>
        </Section>

        <Section
          eyebrow="08 · Responsive"
          title="Hamburger and collapse"
          description="Small screens: dropdown or collapse menu. Large screens: horizontal menu in navbar-center."
          panel="wash-panel-ochre"
        >
          <div className="space-y-6">
            <ResponsiveDropdownNavbar />
            <ResponsiveCollapseNavbar />
            <p className="text-sm text-ink-muted">
              Resize below the large breakpoint to see the hamburger and collapse panel.
            </p>
          </div>
        </Section>
      </div>
    </>
  )
}
