import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  Check,
  ChevronDown,
  Droplets,
  Eraser,
  Info,
  Paintbrush,
  Pencil,
} from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import {
  DROPDOWN_PANEL_OVERFLOW,
  dropdownPlacementClassName,
  useDetailsDropdownPlacement,
  useDropdownPlacement,
} from './dropdownPlacement'

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

const menuPanel = `menu dropdown-content z-50 mt-1 w-52 rounded-box border border-ink-border bg-base-100 p-2 shadow-[var(--shadow-paper-md)] ${DROPDOWN_PANEL_OVERFLOW}`

function blurActive() {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur()
  }
}

function MenuItems({ onPick }: { onPick?: () => void }) {
  return (
    <>
      <li>
        <button type="button" className="cursor-pointer" onClick={onPick}>
          Ultramarine
        </button>
      </li>
      <li>
        <button type="button" className="cursor-pointer" onClick={onPick}>
          Yellow ochre
        </button>
      </li>
      <li>
        <button type="button" className="cursor-pointer" onClick={onPick}>
          Alizarin
        </button>
      </li>
      <li>
        <button type="button" className="cursor-pointer" onClick={onPick}>
          Viridian
        </button>
      </li>
      <li>
        <button type="button" className="cursor-pointer" onClick={onPick}>
          Burnt sienna
        </button>
      </li>
      <li>
        <button type="button" className="cursor-pointer" onClick={onPick}>
          Payne&apos;s gray
        </button>
      </li>
    </>
  )
}

/** Vertical-first placements for product UI */
const verticalAlignments = [
  { name: 'end', className: 'dropdown-end', tip: 'Align end' },
  { name: 'top', className: 'dropdown-top', tip: 'Open top' },
  { name: 'bottom', className: 'dropdown-bottom', tip: 'Open bottom' },
] as const

/** Left/right open beside the trigger; demos only (can cause horizontal overflow). */
const horizontalDemoAlignments = [
  { name: 'left', className: 'dropdown-left', tip: 'Open left' },
  { name: 'right', className: 'dropdown-right', tip: 'Open right' },
] as const

const pigments = [
  { id: 'ultramarine', label: 'Ultramarine', swatch: '#2F4A9B' },
  { id: 'ochre', label: 'Yellow ochre', swatch: '#C48A28' },
  { id: 'alizarin', label: 'Alizarin', swatch: '#B8432F' },
  { id: 'viridian', label: 'Viridian', swatch: '#2F7A68' },
] as const

const tools = [
  { id: 'brush', label: 'Round brush', Icon: Paintbrush },
  { id: 'pencil', label: 'Pencil', Icon: Pencil },
  { id: 'drop', label: 'Wash dropper', Icon: Droplets },
  { id: 'eraser', label: 'Kneaded eraser', Icon: Eraser },
] as const

function DetailsDropdown() {
  const detailsRef = useRef<HTMLDetailsElement>(null)
  const { className: dropdownClass, onToggle } =
    useDetailsDropdownPlacement(detailsRef)

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      const el = detailsRef.current
      if (!el?.open) return
      if (event.target instanceof Node && !el.contains(event.target)) {
        el.open = false
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && detailsRef.current?.open) {
        detailsRef.current.open = false
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  function close() {
    if (detailsRef.current) detailsRef.current.open = false
  }

  return (
    <ShowcaseTabs
            preview={
              <>

              <details
                      ref={detailsRef}
                      className={dropdownClass}
                      onToggle={onToggle}
                    >
                      <summary className="btn m-1 cursor-pointer border-ink-border [&::-webkit-details-marker]:hidden">
                        Open details
                        <ChevronDown className="size-4 opacity-70" strokeWidth={2} />
                      </summary>
                      <ul className={menuPanel}>
                        <MenuItems onPick={close} />
                      </ul>
                    </details>
            
              </>
            }
            html={`<details
        
        class=
        
      >
        <summary class="btn m-1 cursor-pointer border-ink-border [&::-webkit-details-marker]:hidden">
          Open details
          <!-- ChevronDown -->
        </summary>
        <ul class=>
          <!-- MenuItems -->
        </ul>
      </details>`}
            jsx={`<details
        ref={detailsRef}
        className={dropdownClass}
        onToggle={onToggle}
      >
        <summary className="btn m-1 cursor-pointer border-ink-border [&::-webkit-details-marker]:hidden">
          Open details
          <ChevronDown className="size-4 opacity-70" strokeWidth={2} />
        </summary>
        <ul className={menuPanel}>
          <MenuItems onPick={close} />
        </ul>
      </details>`}
          />
  )
}

/** Focus dropdown that flips top / end from viewport measurement on open. */
function EdgeSafeFocusDropdown() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const placement = useDropdownPlacement(rootRef, open, {
    panelWidth: 208,
    panelHeight: 280,
  })

  useEffect(() => {
    if (!open) return

    function onPointerDown(event: PointerEvent) {
      const el = rootRef.current
      if (!el) return
      if (event.target instanceof Node && !el.contains(event.target)) {
        setOpen(false)
        blurActive()
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
        blurActive()
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <ShowcaseTabs
            preview={
              <>

              <div
                      ref={rootRef}
                      className={`${dropdownPlacementClassName(placement)}${open ? ' dropdown-open' : ''}`}
                    >
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-sm cursor-pointer border-ink-border"
                        aria-expanded={open}
                        onClick={() => setOpen((prev) => !prev)}
                        onFocus={() => setOpen(true)}
                      >
                        Edge-safe menu
                        <ChevronDown className="size-4 opacity-70" strokeWidth={2} />
                      </div>
                      <ul tabIndex={-1} className={menuPanel}>
                        <MenuItems
                          onPick={() => {
                            setOpen(false)
                            blurActive()
                          }}
                        />
                      </ul>
                    </div>
            
              </>
            }
            html={`<div
        
        class=
      >
        <div
          tabindex="0"
          role="button"
          class="btn btn-sm cursor-pointer border-ink-border"
          aria-expanded=
          
          onFocus={() => setOpen(true)}
        >
          Edge-safe menu
          <!-- ChevronDown -->
        </div>
        <ul tabindex="0" class=>
          <MenuItems
            onPick={() => {
              setOpen(false)
              blurActive()
            }} />
        </ul>
      </div>`}
            jsx={`<div
        ref={rootRef}
        className={\`\${dropdownPlacementClassName(placement)}\${open ? ' dropdown-open' : ''}\`}
      >
        <div
          tabIndex={0}
          role="button"
          className="btn btn-sm cursor-pointer border-ink-border"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
          onFocus={() => setOpen(true)}
        >
          Edge-safe menu
          <ChevronDown className="size-4 opacity-70" strokeWidth={2} />
        </div>
        <ul tabIndex={-1} className={menuPanel}>
          <MenuItems
            onPick={() => {
              setOpen(false)
              blurActive()
            }}
          />
        </ul>
      </div>`}
          />
  )
}

function StudioPicker() {
  const detailsRef = useRef<HTMLDetailsElement>(null)
  const [pigment, setPigment] = useState<(typeof pigments)[number]['id']>('ultramarine')
  const [tool, setTool] = useState<(typeof tools)[number]['id']>('brush')
  const listId = useId()
  const { placement, className: dropdownClass, onToggle } =
    useDetailsDropdownPlacement(detailsRef, { panelWidth: 288, panelHeight: 360 }, true)

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      const el = detailsRef.current
      if (!el?.open) return
      if (event.target instanceof Node && !el.contains(event.target)) {
        el.open = false
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && detailsRef.current?.open) {
        detailsRef.current.open = false
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  const currentPigment = pigments.find((p) => p.id === pigment) ?? pigments[0]
  const currentTool = tools.find((t) => t.id === tool) ?? tools[0]
  const ToolIcon = currentTool.Icon

  function close() {
    if (detailsRef.current) detailsRef.current.open = false
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <details
        ref={detailsRef}
        className={dropdownClass}
        onToggle={onToggle}
      >
        <summary
          className="btn cursor-pointer gap-2 border border-ink-border px-3 [&::-webkit-details-marker]:hidden"
          aria-label={`Studio tools: ${currentPigment.label}, ${currentTool.label}`}
        >
          <span
            className="size-3.5 shrink-0 rounded-full border border-ink-border"
            style={{
              background: `radial-gradient(circle at 35% 30%, color-mix(in oklab, white 70%, transparent) 0%, ${currentPigment.swatch} 60%, color-mix(in oklab, ${currentPigment.swatch} 70%, black) 100%)`,
            }}
            aria-hidden
          />
          <ToolIcon className="size-4" strokeWidth={2} />
          <span className="text-sm font-medium">{currentPigment.label}</span>
          <ChevronDown className="size-4 opacity-70" strokeWidth={2} />
        </summary>

        <div
          id={listId}
          className={`dropdown-content absolute z-50 w-72 max-w-[min(100vw-1rem,18rem)] rounded-2xl border border-ink-border bg-base-100 p-3 shadow-[var(--shadow-paper-md)] ${DROPDOWN_PANEL_OVERFLOW} ${
            placement.top ? 'bottom-full mb-2 mt-0' : 'mt-2'
          } ${placement.end ? 'right-0' : 'left-0'}`}
          role="dialog"
          aria-label="Pigment and tool picker"
        >
          <p className="label-ink mb-2 px-1">Pigment</p>
          <ul className="menu menu-sm w-full gap-0.5 p-0">
            {pigments.map((item) => {
              const active = item.id === pigment
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`cursor-pointer ${active ? 'menu-wash-active' : ''}`}
                    onClick={() => {
                      setPigment(item.id)
                      close()
                    }}
                  >
                    <span
                      className="size-4 shrink-0 rounded-full border border-ink-border"
                      style={{
                        background: `radial-gradient(circle at 35% 30%, color-mix(in oklab, white 70%, transparent) 0%, ${item.swatch} 60%, color-mix(in oklab, ${item.swatch} 70%, black) 100%)`,
                      }}
                      aria-hidden
                    />
                    <span className="flex-1 text-start font-medium">{item.label}</span>
                    {active ? (
                      <Check className="size-4 shrink-0 text-primary" strokeWidth={2} />
                    ) : null}
                  </button>
                </li>
              )
            })}
          </ul>

          <div className="divider my-2" />

          <p className="label-ink mb-2 px-1">Tool</p>
          <ul className="menu menu-sm w-full gap-0.5 p-0">
            {tools.map(({ id, label, Icon }) => {
              const active = id === tool
              return (
                <li key={id}>
                  <button
                    type="button"
                    className={`cursor-pointer ${active ? 'menu-wash-active' : ''}`}
                    onClick={() => {
                      setTool(id)
                      close()
                    }}
                  >
                    <Icon className="size-4" strokeWidth={2} />
                    <span className="flex-1 text-start font-medium">{label}</span>
                    {active ? (
                      <Check className="size-4 shrink-0 text-primary" strokeWidth={2} />
                    ) : null}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </details>

      <p className="max-w-sm text-sm text-ink-muted">
        Active wash:{' '}
        <span className="font-medium text-base-content">{currentPigment.label}</span>
        {' · '}
        <span className="font-medium text-base-content">{currentTool.label}</span>
      </p>
    </div>
  )
}

export default function DropdownPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Dropdown
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">dropdown</span> menus and
          panels. Prefer vertical overflow ({' '}
          <span className="font-mono text-xs">dropdown-top</span> /{' '}
          <span className="font-mono text-xs">dropdown-end</span>
          ), never horizontal page scroll.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Button and menu"
          description="CSS focus dropdown: open with the trigger, dismiss by clicking outside or pressing Escape."
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="dropdown">
                            <div
                              tabIndex={0}
                              role="button"
                              className="btn m-1 cursor-pointer border-ink-border"
                            >
                              Open menu
                              <ChevronDown className="size-4 opacity-70" strokeWidth={2} />
                            </div>
                            <ul tabIndex={-1} className={menuPanel}>
                              <MenuItems onPick={blurActive} />
                            </ul>
                          </div>
            
              </>
            }
            html={`<div class="dropdown">
              <div
                tabindex="0"
                role="button"
                class="btn m-1 cursor-pointer border-ink-border"
              >
                Open menu
                <!-- ChevronDown -->
              </div>
              <ul tabindex="0" class=>
                <!-- MenuItems -->
              </ul>
            </div>`}
            jsx={`<div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn m-1 cursor-pointer border-ink-border"
              >
                Open menu
                <ChevronDown className="size-4 opacity-70" strokeWidth={2} />
              </div>
              <ul tabIndex={-1} className={menuPanel}>
                <MenuItems onPick={blurActive} />
              </ul>
            </div>`}
          />
        </Section>

        <Section
          eyebrow="02 · Alignments"
          title="Vertical-first placement"
          description="Prefer dropdown-bottom / dropdown-top and dropdown-end near edges. Long menus scroll with overflow-y, not sideways."
          panel="wash-panel-ochre"
        >
          <div className="flex flex-wrap items-center gap-6 py-2">
            {verticalAlignments.map(({ name: _name, className, tip }) => (
              <ShowcaseTabs
            preview={
              <>

              <div className={`dropdown ${className}`}>
                                <div
                                  tabIndex={0}
                                  role="button"
                                  className="btn btn-sm m-1 cursor-pointer border-ink-border"
                                >
                                  {tip}
                                </div>
                                <ul tabIndex={-1} className={menuPanel}>
                                  <MenuItems onPick={blurActive} />
                                </ul>
                              </div>
            
              </>
            }
            html={`<div class=>
                  <div
                    tabindex="0"
                    role="button"
                    class="btn btn-sm m-1 cursor-pointer border-ink-border"
                  >
                    
                  </div>
                  <ul tabindex="0" class=>
                    <!-- MenuItems -->
                  </ul>
                </div>`}
            jsx={`<div className={\`dropdown \${className}\`}>
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-sm m-1 cursor-pointer border-ink-border"
                  >
                    {tip}
                  </div>
                  <ul tabIndex={-1} className={menuPanel}>
                    <MenuItems onPick={blurActive} />
                  </ul>
                </div>`}
          />
            ))}
          </div>
          <div className="mt-6 border-t border-ink-border/50 pt-4">
            <p className="mb-3 text-xs text-ink-muted">
              Demo only: <span className="font-mono">dropdown-left</span> /{' '}
              <span className="font-mono">dropdown-right</span> open beside the
              trigger and can force horizontal overflow. Prefer top/bottom in
              product UI.
            </p>
            <div className="flex flex-wrap items-center gap-6 py-2">
              {horizontalDemoAlignments.map(({ name: _name, className, tip }) => (
                <ShowcaseTabs
            preview={
              <>

              <div className={`dropdown ${className}`}>
                                  <div
                                    tabIndex={0}
                                    role="button"
                                    className="btn btn-sm m-1 cursor-pointer border-ink-border"
                                  >
                                    {tip}
                                  </div>
                                  <ul tabIndex={-1} className={menuPanel}>
                                    <MenuItems onPick={blurActive} />
                                  </ul>
                                </div>
            
              </>
            }
            html={`<div class=>
                    <div
                      tabindex="0"
                      role="button"
                      class="btn btn-sm m-1 cursor-pointer border-ink-border"
                    >
                      
                    </div>
                    <ul tabindex="0" class=>
                      <!-- MenuItems -->
                    </ul>
                  </div>`}
            jsx={`<div className={\`dropdown \${className}\`}>
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-sm m-1 cursor-pointer border-ink-border"
                    >
                      {tip}
                    </div>
                    <ul tabIndex={-1} className={menuPanel}>
                      <MenuItems onPick={blurActive} />
                    </ul>
                  </div>`}
          />
              ))}
            </div>
          </div>
        </Section>

        <Section
          eyebrow="03 · Hover"
          title="Open on hover"
          description="dropdown-hover opens the menu on pointer hover as well as focus."
          panel="wash-panel-blue"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="dropdown dropdown-hover">
                            <div
                              tabIndex={0}
                              role="button"
                              className="btn m-1 cursor-pointer border-ink-border"
                            >
                              Hover me
                            </div>
                            <ul tabIndex={-1} className={menuPanel}>
                              <MenuItems onPick={blurActive} />
                            </ul>
                          </div>
            
              </>
            }
            html={`<div class="dropdown dropdown-hover">
              <div
                tabindex="0"
                role="button"
                class="btn m-1 cursor-pointer border-ink-border"
              >
                Hover me
              </div>
              <ul tabindex="0" class=>
                <!-- MenuItems -->
              </ul>
            </div>`}
            jsx={`<div className="dropdown dropdown-hover">
              <div
                tabIndex={0}
                role="button"
                className="btn m-1 cursor-pointer border-ink-border"
              >
                Hover me
              </div>
              <ul tabIndex={-1} className={menuPanel}>
                <MenuItems onPick={blurActive} />
              </ul>
            </div>`}
          />
        </Section>

        <Section
          eyebrow="04 · Card content"
          title="Non-menu panel"
          description="Any element can be dropdown-content. Useful for short notes or helper text."
          panel="wash-panel-rose"
        >
          <div className="flex flex-wrap items-start gap-6">
            <ShowcaseTabs
            preview={
              <>

              <div className="dropdown">
                              <div
                                tabIndex={0}
                                role="button"
                                className="btn m-1 cursor-pointer border-ink-border"
                              >
                                Wash tip
                              </div>
                              <div
                                tabIndex={0}
                                className={`card card-sm dropdown-content z-50 mt-1 w-64 border border-ink-border bg-base-100 shadow-[var(--shadow-paper-md)] ${DROPDOWN_PANEL_OVERFLOW}`}
                              >
                                <div className="card-body gap-2">
                                  <h3 className="card-title text-base">Layering washes</h3>
                                  <p className="text-sm text-ink-muted">
                                    Let each wash dry before the next pass so pigments stay
                                    luminous instead of muddy.
                                  </p>
                                </div>
                              </div>
                            </div>
            
              </>
            }
            html={`<div class="dropdown">
                <div
                  tabindex="0"
                  role="button"
                  class="btn m-1 cursor-pointer border-ink-border"
                >
                  Wash tip
                </div>
                <div
                  tabindex="0"
                  class=
                >
                  <div class="card-body gap-2">
                    <h3 class="card-title text-base">Layering washes</h3>
                    <p class="text-sm text-ink-muted">
                      Let each wash dry before the next pass so pigments stay
                      luminous instead of muddy.
                    </p>
                  </div>
                </div>
              </div>`}
            jsx={`<div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn m-1 cursor-pointer border-ink-border"
                >
                  Wash tip
                </div>
                <div
                  tabIndex={0}
                  className={\`card card-sm dropdown-content z-50 mt-1 w-64 border border-ink-border bg-base-100 shadow-[var(--shadow-paper-md)] \${DROPDOWN_PANEL_OVERFLOW}\`}
                >
                  <div className="card-body gap-2">
                    <h3 className="card-title text-base">Layering washes</h3>
                    <p className="text-sm text-ink-muted">
                      Let each wash dry before the next pass so pigments stay
                      luminous instead of muddy.
                    </p>
                  </div>
                </div>
              </div>`}
          />

            <ShowcaseTabs
            preview={
              <>

              <div className="flex items-center gap-2 text-sm">
                              <span>Paper tooth</span>
                              <div className="dropdown dropdown-end">
                                <div
                                  className="tooltip tooltip-left tooltip-info"
                                  data-tip="More about paper"
                                >
                                  <div
                                    tabIndex={0}
                                    role="button"
                                    className="btn btn-circle btn-ghost btn-xs btn-info cursor-pointer"
                                    aria-label="More about paper"
                                  >
                                    <Info className="size-3.5" strokeWidth={2} />
                                  </div>
                                </div>
                                <div
                                  tabIndex={0}
                                  className={`card card-sm dropdown-content z-50 w-64 border border-ink-border bg-base-100 shadow-[var(--shadow-paper-md)] ${DROPDOWN_PANEL_OVERFLOW}`}
                                >
                                  <div className="card-body gap-1">
                                    <h3 className="card-title text-sm">Cold press</h3>
                                    <p className="text-xs text-ink-muted">
                                      Slight tooth holds pigment without fighting soft edges.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
            
              </>
            }
            html={`<div class="flex items-center gap-2 text-sm">
                <span>Paper tooth</span>
                <div class="dropdown dropdown-end">
                  <div
                    class="tooltip tooltip-left tooltip-info"
                    data-tip="More about paper"
                  >
                    <div
                      tabindex="0"
                      role="button"
                      class="btn btn-circle btn-ghost btn-xs btn-info cursor-pointer"
                      aria-label="More about paper"
                    >
                      <!-- Info -->
                    </div>
                  </div>
                  <div
                    tabindex="0"
                    class=
                  >
                    <div class="card-body gap-1">
                      <h3 class="card-title text-sm">Cold press</h3>
                      <p class="text-xs text-ink-muted">
                        Slight tooth holds pigment without fighting soft edges.
                      </p>
                    </div>
                  </div>
                </div>
              </div>`}
            jsx={`<div className="flex items-center gap-2 text-sm">
                <span>Paper tooth</span>
                <div className="dropdown dropdown-end">
                  <div
                    className="tooltip tooltip-left tooltip-info"
                    data-tip="More about paper"
                  >
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-circle btn-ghost btn-xs btn-info cursor-pointer"
                      aria-label="More about paper"
                    >
                      <Info className="size-3.5" strokeWidth={2} />
                    </div>
                  </div>
                  <div
                    tabIndex={0}
                    className={\`card card-sm dropdown-content z-50 w-64 border border-ink-border bg-base-100 shadow-[var(--shadow-paper-md)] \${DROPDOWN_PANEL_OVERFLOW}\`}
                  >
                    <div className="card-body gap-1">
                      <h3 className="card-title text-sm">Cold press</h3>
                      <p className="text-xs text-ink-muted">
                        Slight tooth holds pigment without fighting soft edges.
                      </p>
                    </div>
                  </div>
                </div>
              </div>`}
          />
          </div>
        </Section>

        <Section
          eyebrow="05 · Details"
          title="Native details pattern"
          description="details and summary toggle without focus tricks. Outside click and Escape close via a small listener. Placement flips vertically when space below is tight."
        >
          <ShowcaseTabs
            preview={
              <>

              <DetailsDropdown />
            
              </>
            }
            html={`<!-- DetailsDropdown -->`}
            jsx={`<DetailsDropdown />`}
          />
        
        </Section>

        <Section
          eyebrow="06 · Studio"
          title="Pigment and tool picker"
          description="ThemeSwitcher-style details dropdown for studio pigment and tool choice. Absolute panel so the trigger row never stretches."
          panel="wash-panel-blue"
        >
          <ShowcaseTabs
            preview={
              <>

              <StudioPicker />
                        <div className="mt-3">
                          <ClassLabel value="details · dropdown-top/end from measure · pigment + tool" />
                        </div>
            
              </>
            }
            html={`<!-- StudioPicker -->
          <div class="mt-3">
            <!-- ClassLabel -->
          </div>`}
            jsx={`<StudioPicker />
          <div className="mt-3">
            <ClassLabel value="details · dropdown-top/end from measure · pigment + tool" />
          </div>`}
          />
        
        </Section>

        <Section
          eyebrow="07 · Overflow"
          title="Vertical overflow near edges"
          description="Measure the viewport on open: apply dropdown-end near the right edge and dropdown-top when there is not enough space below. Cap panel width; scroll long menus with overflow-y."
          panel="wash-panel-ochre"
        >
          <div className="overflow-hidden rounded-box border border-ink-border/60 bg-base-200/30 p-4">
            <div className="flex items-start justify-between gap-4">
              <ShowcaseTabs
            preview={
              <>

              <div className="dropdown dropdown-end">
                                <div
                                  tabIndex={0}
                                  role="button"
                                  className="btn btn-sm cursor-pointer border-ink-border"
                                >
                                  Near right
                                </div>
                                <ul tabIndex={-1} className={menuPanel}>
                                  <MenuItems onPick={blurActive} />
                                </ul>
                              </div>
            
              </>
            }
            html={`<div class="dropdown dropdown-end">
                  <div
                    tabindex="0"
                    role="button"
                    class="btn btn-sm cursor-pointer border-ink-border"
                  >
                    Near right
                  </div>
                  <ul tabindex="0" class=>
                    <!-- MenuItems -->
                  </ul>
                </div>`}
            jsx={`<div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-sm cursor-pointer border-ink-border"
                  >
                    Near right
                  </div>
                  <ul tabIndex={-1} className={menuPanel}>
                    <MenuItems onPick={blurActive} />
                  </ul>
                </div>`}
          />

              <EdgeSafeFocusDropdown />
            </div>
            <div className="mt-6 flex justify-end">
              <ShowcaseTabs
            preview={
              <>

              <div className="mt-16 dropdown dropdown-top dropdown-end sm:mt-24">
                                <div
                                  tabIndex={0}
                                  role="button"
                                  className="btn btn-sm cursor-pointer border-ink-border"
                                >
                                  Near bottom
                                </div>
                                <ul
                                  tabIndex={-1}
                                  className={`${menuPanel} mb-1 mt-0 max-h-40`}
                                >
                                  <MenuItems onPick={blurActive} />
                                </ul>
                              </div>
            
              </>
            }
            html={`<div class="mt-16 dropdown dropdown-top dropdown-end sm:mt-24">
                  <div
                    tabindex="0"
                    role="button"
                    class="btn btn-sm cursor-pointer border-ink-border"
                  >
                    Near bottom
                  </div>
                  <ul
                    tabindex="0"
                    class=
                  >
                    <!-- MenuItems -->
                  </ul>
                </div>`}
            jsx={`<div className="mt-16 dropdown dropdown-top dropdown-end sm:mt-24">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-sm cursor-pointer border-ink-border"
                  >
                    Near bottom
                  </div>
                  <ul
                    tabIndex={-1}
                    className={\`\${menuPanel} mb-1 mt-0 max-h-40\`}
                  >
                    <MenuItems onPick={blurActive} />
                  </ul>
                </div>`}
          />
            </div>
            <p className="mt-4 text-xs text-ink-muted">
              Demo shell uses overflow-hidden. Edge-safe menu measures the
              viewport and flips vertically instead of growing sideways.
            </p>
          </div>
        </Section>

        <Section
          eyebrow="08 · Responsive"
          title="Stack on small screens"
          description="Triggers wrap and stretch on narrow viewports; menus stay full-width friendly with a viewport max-width cap."
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                          <div className="dropdown w-full sm:w-auto">
                            <div
                              tabIndex={0}
                              role="button"
                              className="btn w-full cursor-pointer border-ink-border sm:w-auto"
                            >
                              Series
                              <ChevronDown className="size-4 opacity-70" strokeWidth={2} />
                            </div>
                            <ul tabIndex={-1} className={`${menuPanel} w-full sm:w-52`}>
                              <MenuItems onPick={blurActive} />
                            </ul>
                          </div>

                          <div className="dropdown dropdown-end w-full sm:w-auto">
                            <div
                              tabIndex={0}
                              role="button"
                              className="btn btn-ghost w-full cursor-pointer border border-ink-border sm:w-auto"
                            >
                              Format
                            </div>
                            <ul tabIndex={-1} className={`${menuPanel} w-full sm:w-52`}>
                              <li>
                                <button type="button" className="cursor-pointer" onClick={blurActive}>
                                  Portrait plate
                                </button>
                              </li>
                              <li>
                                <button type="button" className="cursor-pointer" onClick={blurActive}>
                                  Landscape wash
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="mt-3">
                          <ClassLabel value="w-full sm:w-auto · dropdown-end · max-w viewport" />
                        </div>
            
              </>
            }
            html={`<div class="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <div class="dropdown w-full sm:w-auto">
              <div
                tabindex="0"
                role="button"
                class="btn w-full cursor-pointer border-ink-border sm:w-auto"
              >
                Series
                <!-- ChevronDown -->
              </div>
              <ul tabindex="0" class=>
                <!-- MenuItems -->
              </ul>
            </div>

            <div class="dropdown dropdown-end w-full sm:w-auto">
              <div
                tabindex="0"
                role="button"
                class="btn btn-ghost w-full cursor-pointer border border-ink-border sm:w-auto"
              >
                Format
              </div>
              <ul tabindex="0" class=>
                <li>
                  <button type="button" class="cursor-pointer" >
                    Portrait plate
                  </button>
                </li>
                <li>
                  <button type="button" class="cursor-pointer" >
                    Landscape wash
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div class="mt-3">
            <!-- ClassLabel -->
          </div>`}
            jsx={`<div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <div className="dropdown w-full sm:w-auto">
              <div
                tabIndex={0}
                role="button"
                className="btn w-full cursor-pointer border-ink-border sm:w-auto"
              >
                Series
                <ChevronDown className="size-4 opacity-70" strokeWidth={2} />
              </div>
              <ul tabIndex={-1} className={\`\${menuPanel} w-full sm:w-52\`}>
                <MenuItems onPick={blurActive} />
              </ul>
            </div>

            <div className="dropdown dropdown-end w-full sm:w-auto">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost w-full cursor-pointer border border-ink-border sm:w-auto"
              >
                Format
              </div>
              <ul tabIndex={-1} className={\`\${menuPanel} w-full sm:w-52\`}>
                <li>
                  <button type="button" className="cursor-pointer" onClick={blurActive}>
                    Portrait plate
                  </button>
                </li>
                <li>
                  <button type="button" className="cursor-pointer" onClick={blurActive}>
                    Landscape wash
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-3">
            <ClassLabel value="w-full sm:w-auto · dropdown-end · max-w viewport" />
          </div>`}
          />
        
        </Section>

        <Section
          eyebrow="09 · Forced open (demo)"
          title="dropdown-open labeled"
          description="Force-open is for demos only. Do not leave sticky open menus in product UI."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="dropdown dropdown-open">
                            <div
                              tabIndex={0}
                              role="button"
                              className="btn m-1 cursor-not-allowed border-ink-border opacity-80"
                              aria-disabled="true"
                            >
                              Forced open
                            </div>
                            <ul tabIndex={-1} className={menuPanel}>
                              <li>
                                <span className="text-ink-muted">Demo item A</span>
                              </li>
                              <li>
                                <span className="text-ink-muted">Demo item B</span>
                              </li>
                            </ul>
                          </div>
            
              </>
            }
            html={`<div class="dropdown dropdown-open">
              <div
                tabindex="0"
                role="button"
                class="btn m-1 cursor-not-allowed border-ink-border opacity-80"
                aria-disabled="true"
              >
                Forced open
              </div>
              <ul tabindex="0" class=>
                <li>
                  <span class="text-ink-muted">Demo item A</span>
                </li>
                <li>
                  <span class="text-ink-muted">Demo item B</span>
                </li>
              </ul>
            </div>`}
            jsx={`<div className="dropdown dropdown-open">
              <div
                tabIndex={0}
                role="button"
                className="btn m-1 cursor-not-allowed border-ink-border opacity-80"
                aria-disabled="true"
              >
                Forced open
              </div>
              <ul tabIndex={-1} className={menuPanel}>
                <li>
                  <span className="text-ink-muted">Demo item A</span>
                </li>
                <li>
                  <span className="text-ink-muted">Demo item B</span>
                </li>
              </ul>
            </div>`}
          />
        </Section>
      </div>
    </>
  )
}
