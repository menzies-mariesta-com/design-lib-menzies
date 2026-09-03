import type { ReactNode } from 'react'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  ArrowLeft,
  Bell,
  Droplets,
  EllipsisVertical,
  Eraser,
  Layers,
  Menu,
  MoreHorizontal,
  Paintbrush,
  Palette,
  Pencil,
  Save,
  Search,
  Share2,
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

function blurActive() {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur()
  }
}

const barShell =
  'navbar rounded-box border border-ink-border/60 bg-base-100 shadow-[var(--shadow-paper-sm)]'

const menuPanel =
  'menu menu-sm dropdown-content z-50 mt-3 w-52 max-w-[min(100vw-1rem,13rem)] max-h-[min(70vh,24rem)] overflow-x-hidden overflow-y-auto rounded-box border border-ink-border bg-base-100 p-2 shadow-[var(--shadow-paper-md)]'

const colorBars = [
  { label: 'bg-base-200', className: 'bg-base-200 text-base-content' },
  { label: 'bg-base-300', className: 'bg-base-300 text-base-content' },
  { label: 'bg-neutral text-neutral-content', className: 'bg-neutral text-neutral-content' },
  { label: 'bg-primary text-primary-content', className: 'bg-primary text-primary-content' },
] as const

export default function AppBarPage() {
  const tools = [
    { id: 'brush', label: 'Round brush', Icon: Paintbrush },
    { id: 'pencil', label: 'Pencil', Icon: Pencil },
    { id: 'drop', label: 'Wash dropper', Icon: Droplets },
    { id: 'eraser', label: 'Kneaded eraser', Icon: Eraser },
  ] as const

  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          App bar
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Compact top bars for a screen title
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Leading icon, title, trailing actions"
          description="App bars lead with a back or menu control, a short title"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="space-y-4">
                            <Sample label="navbar + flex-none title + trailing icons">
                              <div className={barShell}>
                                <div className="flex-none">
                                  <div className="tooltip tooltip-right tooltip-primary" data-tip="Back">
                                    <button
                                      type="button"
                                      className="btn btn-ghost btn-square btn-primary cursor-pointer"
                                      aria-label="Back"
                                    >
                                      <ArrowLeft className="size-5" strokeWidth={2} />
                                    </button>
                                  </div>
                                </div>
                                <div className="flex-1 px-1">
                                  <span className="font-display text-lg font-semibold tracking-tight">
                                    Plate detail
                                  </span>
                                </div>
                                <div className="flex-none flex items-center gap-1">
                                  <div className="tooltip tooltip-left tooltip-secondary" data-tip="Share">
                                    <button
                                      type="button"
                                      className="btn btn-ghost btn-square btn-secondary cursor-pointer"
                                      aria-label="Share"
                                    >
                                      <Share2 className="size-5" strokeWidth={2} />
                                    </button>
                                  </div>
                                  <div className="tooltip tooltip-left" data-tip="More">
                                    <button
                                      type="button"
                                      className="btn btn-ghost btn-square cursor-pointer"
                                      aria-label="More"
                                    >
                                      <MoreHorizontal className="size-5" strokeWidth={2} />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </Sample>

                            <Sample label="navbar-start / end (menu + title + actions)">
                              <div className={barShell}>
                                <div className="navbar-start gap-1">
                                  <div className="tooltip tooltip-right" data-tip="Open menu">
                                    <button
                                      type="button"
                                      className="btn btn-ghost btn-square cursor-pointer"
                                      aria-label="Open menu"
                                    >
                                      <Menu className="size-5" strokeWidth={2} />
                                    </button>
                                  </div>
                                  <span className="font-display text-lg font-semibold tracking-tight">
                                    Wash series
                                  </span>
                                </div>
                                <div className="navbar-end gap-1">
                                  <div className="tooltip tooltip-left tooltip-primary" data-tip="Save">
                                    <button
                                      type="button"
                                      className="btn btn-ghost btn-square btn-primary cursor-pointer"
                                      aria-label="Save"
                                    >
                                      <Save className="size-5" strokeWidth={2} />
                                    </button>
                                  </div>
                                  <div className="tooltip tooltip-left tooltip-secondary" data-tip="Alerts">
                                    <button
                                      type="button"
                                      className="btn btn-ghost btn-square btn-secondary cursor-pointer"
                                      aria-label="Alerts"
                                    >
                                      <Bell className="size-5" strokeWidth={2} />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </Sample>
                          </div>
              </>
            }
            html={"<div class=\"space-y-4\">\n            <!-- Sample -->\n\n            <!-- Sample -->\n          </div>"}
            jsx={"<div className=\"space-y-4\">\n            <Sample label=\"navbar + flex-none title + trailing icons\">\n              <div className={barShell}>\n                <div className=\"flex-none\">\n                  <div className=\"tooltip tooltip-right tooltip-primary\" data-tip=\"Back\">\n                    <button\n                      type=\"button\"\n                      className=\"btn btn-ghost btn-square btn-primary cursor-pointer\"\n                      aria-label=\"Back\"\n                    >\n                      <ArrowLeft className=\"size-5\" strokeWidth={2} />\n                    </button>\n                  </div>\n                </div>\n                <div className=\"flex-1 px-1\">\n                  <span className=\"font-display text-lg font-semibold tracking-tight\">\n                    Plate detail\n                  </span>\n                </div>\n                <div className=\"flex-none flex items-center gap-1\">\n                  <div className=\"tooltip tooltip-left tooltip-secondary\" data-tip=\"Share\">\n                    <button\n                      type=\"button\"\n                      className=\"btn btn-ghost btn-square btn-secondary cursor-pointer\"\n                      aria-label=\"Share\"\n                    >\n                      <Share2 className=\"size-5\" strokeWidth={2} />\n                    </button>\n                  </div>\n                  <div className=\"tooltip tooltip-left\" data-tip=\"More\">\n                    <button\n                      type=\"button\"\n                      className=\"btn btn-ghost btn-square cursor-pointer\"\n                      aria-label=\"More\"\n                    >\n                      <MoreHorizontal className=\"size-5\" strokeWidth={2} />\n                    </button>\n                  </div>\n                </div>\n              </div>\n            </Sample>\n\n            <Sample label=\"navbar-start / end (menu + title + actions)\">\n              <div className={barShell}>\n                <div className=\"navbar-start gap-1\">\n                  <div className=\"tooltip tooltip-right\" data-tip=\"Open menu\">\n                    <button\n                      type=\"button\"\n                      className=\"btn btn-ghost btn-square cursor-pointer\"\n                      aria-label=\"Open menu\"\n                    >\n                      <Menu className=\"size-5\" strokeWidth={2} />\n                    </button>\n                  </div>\n                  <span className=\"font-display text-lg font-semibold tracking-tight\">\n                    Wash series\n                  </span>\n                </div>\n                <div className=\"navbar-end gap-1\">\n                  <div className=\"tooltip tooltip-left tooltip-primary\" data-tip=\"Save\">\n                    <button\n                      type=\"button\"\n                      className=\"btn btn-ghost btn-square btn-primary cursor-pointer\"\n                      aria-label=\"Save\"\n                    >\n                      <Save className=\"size-5\" strokeWidth={2} />\n                    </button>\n                  </div>\n                  <div className=\"tooltip tooltip-left tooltip-secondary\" data-tip=\"Alerts\">\n                    <button\n                      type=\"button\"\n                      className=\"btn btn-ghost btn-square btn-secondary cursor-pointer\"\n                      aria-label=\"Alerts\"\n                    >\n                      <Bell className=\"size-5\" strokeWidth={2} />\n                    </button>\n                  </div>\n                </div>\n              </div>\n            </Sample>\n          </div>"}
          />
        
        </Section>

        <Section
          eyebrow="02 · With search"
          title="Join search field"
          description="Search uses join so the input and button are direct siblings"
          panel="wash-panel-blue"
        >
          <ShowcaseTabs
            preview={
              <>
                <Sample label="navbar + join + input.join-item + btn.join-item">
                            <div className={barShell}>
                              <div className="navbar-start">
                                <span className="font-display text-lg font-semibold tracking-tight px-2">
                                  Find plates
                                </span>
                              </div>
                              <div className="navbar-end">
                                <div className="join">
                                  <input
                                    type="search"
                                    placeholder="Search washes…"
                                    className="input join-item input-bordered w-28 cursor-text sm:w-44"
                                  />
                                  <button type="button" className="btn btn-primary join-item cursor-pointer">
                                    <Search className="size-4" strokeWidth={2} />
                                    <span className="hidden sm:inline">Search</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </Sample>
              </>
            }
            html={"<!-- Sample -->"}
            jsx={"<Sample label=\"navbar + join + input.join-item + btn.join-item\">\n            <div className={barShell}>\n              <div className=\"navbar-start\">\n                <span className=\"font-display text-lg font-semibold tracking-tight px-2\">\n                  Find plates\n                </span>\n              </div>\n              <div className=\"navbar-end\">\n                <div className=\"join\">\n                  <input\n                    type=\"search\"\n                    placeholder=\"Search washes\u2026\"\n                    className=\"input join-item input-bordered w-28 cursor-text sm:w-44\"\n                  />\n                  <button type=\"button\" className=\"btn btn-primary join-item cursor-pointer\">\n                    <Search className=\"size-4\" strokeWidth={2} />\n                    <span className=\"hidden sm:inline\">Search</span>\n                  </button>\n                </div>\n              </div>\n            </div>\n          </Sample>"}
          />
        
        </Section>

        <Section
          eyebrow="03 · Density"
          title="Dense and tall bars"
          description="Tighten padding for tool-heavy desks, or raise min-height when the"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="space-y-4">
                            <Sample label="navbar min-h-0 py-0 (dense)">
                              <div className={`${barShell} min-h-0 py-0`}>
                                <div className="navbar-start gap-1">
                                  <div className="tooltip tooltip-right tooltip-primary" data-tip="Back">
                                    <button
                                      type="button"
                                      className="btn btn-ghost btn-square btn-sm btn-primary cursor-pointer"
                                      aria-label="Back"
                                    >
                                      <ArrowLeft className="size-4" strokeWidth={2} />
                                    </button>
                                  </div>
                                  <span className="text-sm font-semibold">Dense toolbar</span>
                                </div>
                                <div className="navbar-end gap-0.5">
                                  <div className="tooltip tooltip-left" data-tip="Layers">
                                    <button
                                      type="button"
                                      className="btn btn-ghost btn-square btn-sm cursor-pointer"
                                      aria-label="Layers"
                                    >
                                      <Layers className="size-4" strokeWidth={2} />
                                    </button>
                                  </div>
                                  <div className="tooltip tooltip-left tooltip-secondary" data-tip="Palette">
                                    <button
                                      type="button"
                                      className="btn btn-ghost btn-square btn-sm btn-secondary cursor-pointer"
                                      aria-label="Palette"
                                    >
                                      <Palette className="size-4" strokeWidth={2} />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </Sample>

                            <Sample label="navbar min-h-16 py-3 (tall)">
                              <div className={`${barShell} min-h-16 py-3`}>
                                <div className="navbar-start gap-2 px-1">
                                  <div className="tooltip tooltip-right" data-tip="Open menu">
                                    <button
                                      type="button"
                                      className="btn btn-ghost btn-square cursor-pointer"
                                      aria-label="Open menu"
                                    >
                                      <Menu className="size-5" strokeWidth={2} />
                                    </button>
                                  </div>
                                  <div className="flex flex-col leading-tight">
                                    <span className="font-display text-xl font-semibold tracking-tight">
                                      Tall bar
                                    </span>
                                    <span className="label-ink">Extra vertical room</span>
                                  </div>
                                </div>
                                <div className="navbar-end">
                                  <button type="button" className="btn btn-sm cursor-pointer">
                                    Open plate
                                  </button>
                                </div>
                              </div>
                            </Sample>
                          </div>
              </>
            }
            html={"<div class=\"space-y-4\">\n            <!-- Sample -->\n\n            <!-- Sample -->\n          </div>"}
            jsx={"<div className=\"space-y-4\">\n            <Sample label=\"navbar min-h-0 py-0 (dense)\">\n              <div className={`${barShell} min-h-0 py-0`}>\n                <div className=\"navbar-start gap-1\">\n                  <div className=\"tooltip tooltip-right tooltip-primary\" data-tip=\"Back\">\n                    <button\n                      type=\"button\"\n                      className=\"btn btn-ghost btn-square btn-sm btn-primary cursor-pointer\"\n                      aria-label=\"Back\"\n                    >\n                      <ArrowLeft className=\"size-4\" strokeWidth={2} />\n                    </button>\n                  </div>\n                  <span className=\"text-sm font-semibold\">Dense toolbar</span>\n                </div>\n                <div className=\"navbar-end gap-0.5\">\n                  <div className=\"tooltip tooltip-left\" data-tip=\"Layers\">\n                    <button\n                      type=\"button\"\n                      className=\"btn btn-ghost btn-square btn-sm cursor-pointer\"\n                      aria-label=\"Layers\"\n                    >\n                      <Layers className=\"size-4\" strokeWidth={2} />\n                    </button>\n                  </div>\n                  <div className=\"tooltip tooltip-left tooltip-secondary\" data-tip=\"Palette\">\n                    <button\n                      type=\"button\"\n                      className=\"btn btn-ghost btn-square btn-sm btn-secondary cursor-pointer\"\n                      aria-label=\"Palette\"\n                    >\n                      <Palette className=\"size-4\" strokeWidth={2} />\n                    </button>\n                  </div>\n                </div>\n              </div>\n            </Sample>\n\n            <Sample label=\"navbar min-h-16 py-3 (tall)\">\n              <div className={`${barShell} min-h-16 py-3`}>\n                <div className=\"navbar-start gap-2 px-1\">\n                  <div className=\"tooltip tooltip-right\" data-tip=\"Open menu\">\n                    <button\n                      type=\"button\"\n                      className=\"btn btn-ghost btn-square cursor-pointer\"\n                      aria-label=\"Open menu\"\n                    >\n                      <Menu className=\"size-5\" strokeWidth={2} />\n                    </button>\n                  </div>\n                  <div className=\"flex flex-col leading-tight\">\n                    <span className=\"font-display text-xl font-semibold tracking-tight\">\n                      Tall bar\n                    </span>\n                    <span className=\"label-ink\">Extra vertical room</span>\n                  </div>\n                </div>\n                <div className=\"navbar-end\">\n                  <button type=\"button\" className=\"btn btn-sm cursor-pointer\">\n                    Open plate\n                  </button>\n                </div>\n              </div>\n            </Sample>\n          </div>"}
          />
        
        </Section>

        <Section
          eyebrow="04 · Colors"
          title="Base, primary, and neutral"
          description="Semantic fills for app bars inside the panel"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="space-y-3">
                            {colorBars.map(({ label, className }) => (
                              <Sample key={label} label={`navbar ${label}`}>
                                <div
                                  className={`navbar rounded-box border border-ink-border/40 shadow-[var(--shadow-paper-sm)] ${className}`}
                                >
                                  <div className="navbar-start gap-1">
                                    <button
                                      type="button"
                                      className="btn btn-ghost btn-square cursor-pointer"
                                      aria-label="Back"
                                    >
                                      <ArrowLeft className="size-5" strokeWidth={2} />
                                    </button>
                                    <span className="font-display text-lg font-semibold tracking-tight">
                                      Menzies Design
                                    </span>
                                  </div>
                                  <div className="navbar-end">
                                    <button type="button" className="btn btn-ghost btn-sm cursor-pointer">
                                      Action
                                    </button>
                                  </div>
                                </div>
                              </Sample>
                            ))}
                          </div>
              </>
            }
            html={"<div class=\"space-y-3\">\n            {colorBars.map(({ label, className }) => (\n              <!-- Sample -->\n            ))}\n          </div>"}
            jsx={"<div className=\"space-y-3\">\n            {colorBars.map(({ label, className }) => (\n              <Sample key={label} label={`navbar ${label}`}>\n                <div\n                  className={`navbar rounded-box border border-ink-border/40 shadow-[var(--shadow-paper-sm)] ${className}`}\n                >\n                  <div className=\"navbar-start gap-1\">\n                    <button\n                      type=\"button\"\n                      className=\"btn btn-ghost btn-square cursor-pointer\"\n                      aria-label=\"Back\"\n                    >\n                      <ArrowLeft className=\"size-5\" strokeWidth={2} />\n                    </button>\n                    <span className=\"font-display text-lg font-semibold tracking-tight\">\n                      Menzies Design\n                    </span>\n                  </div>\n                  <div className=\"navbar-end\">\n                    <button type=\"button\" className=\"btn btn-ghost btn-sm cursor-pointer\">\n                      Action\n                    </button>\n                  </div>\n                </div>\n              </Sample>\n            ))}\n          </div>"}
          />
        
        </Section>

        <Section
          eyebrow="05 · Studio Menzies Design"
          title="Pigment desk app bar"
          description="Brand mark, tool join strip, and semantic icon actions"
          panel="wash-panel-blue"
        >
          <ShowcaseTabs
            preview={
              <>
                <Sample label="Studio Menzies Design pigment desk bar">
                            <div className={`${barShell} wash-panel-blue bg-base-100/90`}>
                              <div className="navbar-start gap-2">
                                <button type="button" className="btn btn-ghost cursor-pointer px-2">
                                  <span className="font-display text-xl font-semibold tracking-tight">
                                    Menzies Design
                                  </span>
                                </button>
                                <span className="label-ink hidden sm:inline">Pigment desk</span>
                              </div>
                              <div className="navbar-center hidden md:flex">
                                <div className="join">
                                  {tools.map(({ id, label, Icon }) => (
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
              </>
            }
            html={"<!-- Sample -->"}
            jsx={"<Sample label=\"Studio Menzies Design pigment desk bar\">\n            <div className={`${barShell} wash-panel-blue bg-base-100/90`}>\n              <div className=\"navbar-start gap-2\">\n                <button type=\"button\" className=\"btn btn-ghost cursor-pointer px-2\">\n                  <span className=\"font-display text-xl font-semibold tracking-tight\">\n                    Menzies Design\n                  </span>\n                </button>\n                <span className=\"label-ink hidden sm:inline\">Pigment desk</span>\n              </div>\n              <div className=\"navbar-center hidden md:flex\">\n                <div className=\"join\">\n                  {tools.map(({ id, label, Icon }) => (\n                    <div key={id} className=\"tooltip tooltip-bottom\" data-tip={label}>\n                      <button\n                        type=\"button\"\n                        className=\"btn btn-ghost btn-square join-item cursor-pointer\"\n                        aria-label={label}\n                      >\n                        <Icon className=\"size-4\" strokeWidth={2} />\n                      </button>\n                    </div>\n                  ))}\n                </div>\n              </div>\n              <div className=\"navbar-end gap-1\">\n                <div className=\"tooltip tooltip-bottom tooltip-primary\" data-tip=\"Layers\">\n                  <button\n                    type=\"button\"\n                    className=\"btn btn-ghost btn-square btn-primary cursor-pointer\"\n                    aria-label=\"Layers\"\n                  >\n                    <Layers className=\"size-4\" strokeWidth={2} />\n                  </button>\n                </div>\n                <div className=\"tooltip tooltip-bottom tooltip-secondary\" data-tip=\"Palette\">\n                  <button\n                    type=\"button\"\n                    className=\"btn btn-ghost btn-square btn-secondary cursor-pointer\"\n                    aria-label=\"Palette\"\n                  >\n                    <Palette className=\"size-4\" strokeWidth={2} />\n                  </button>\n                </div>\n                <div className=\"avatar avatar-placeholder ml-1\">\n                  <div className=\"w-9 rounded-full bg-wash-ochre text-sm font-semibold text-base-content\">\n                    <span>WF</span>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </Sample>"}
          />
        
        </Section>

        <Section
          eyebrow="06 · Scroll note"
          title="Sticky inside a demo frame"
          description="Sticky sticks to the scroll parent of this framed demo"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <Sample label="overflow-auto frame + sticky top-0 navbar">
                            <div className="h-56 overflow-auto rounded-box border border-ink-border/60 bg-base-200/40">
                              <div
                                className={`${barShell} sticky top-0 z-10 rounded-none border-x-0 border-t-0 bg-base-100/95 backdrop-blur-sm`}
                              >
                                <div className="navbar-start px-1">
                                  <span className="font-display text-base font-semibold tracking-tight">
                                    Sticky note
                                  </span>
                                </div>
                                <div className="navbar-end">
                                  <span className="label-ink pr-2">Scroll the frame</span>
                                </div>
                              </div>
                              <div className="space-y-3 p-4 text-sm text-ink-muted">
                                <p>
                                  This bar stays pinned while you scroll this panel only. The Menzies Design
                                  app header above remains separate.
                                </p>
                                <p>
                                  Layer washes from light to dark. Keep edges soft where paper grain
                                  should show through.
                                </p>
                                <p>
                                  Dense toolbars belong in the content scroll region when the shell
                                  already owns the viewport top.
                                </p>
                                <p>
                                  When you need full-page sticky chrome, give that page its own scroll
                                  owner instead of nesting under the studio drawer header.
                                </p>
                                <p>More plate notes fill the frame so sticky behavior is easy to feel.</p>
                              </div>
                            </div>
                          </Sample>
              </>
            }
            html={"<!-- Sample -->"}
            jsx={"<Sample label=\"overflow-auto frame + sticky top-0 navbar\">\n            <div className=\"h-56 overflow-auto rounded-box border border-ink-border/60 bg-base-200/40\">\n              <div\n                className={`${barShell} sticky top-0 z-10 rounded-none border-x-0 border-t-0 bg-base-100/95 backdrop-blur-sm`}\n              >\n                <div className=\"navbar-start px-1\">\n                  <span className=\"font-display text-base font-semibold tracking-tight\">\n                    Sticky note\n                  </span>\n                </div>\n                <div className=\"navbar-end\">\n                  <span className=\"label-ink pr-2\">Scroll the frame</span>\n                </div>\n              </div>\n              <div className=\"space-y-3 p-4 text-sm text-ink-muted\">\n                <p>\n                  This bar stays pinned while you scroll this panel only. The Menzies Design\n                  app header above remains separate.\n                </p>\n                <p>\n                  Layer washes from light to dark. Keep edges soft where paper grain\n                  should show through.\n                </p>\n                <p>\n                  Dense toolbars belong in the content scroll region when the shell\n                  already owns the viewport top.\n                </p>\n                <p>\n                  When you need full-page sticky chrome, give that page its own scroll\n                  owner instead of nesting under the studio drawer header.\n                </p>\n                <p>More plate notes fill the frame so sticky behavior is easy to feel.</p>\n              </div>\n            </div>\n          </Sample>"}
          />
        
        </Section>

        <Section
          eyebrow="07 · Responsive"
          title="Collapse trailing into a menu"
          description="On small widths, hide trailing actions and open them from a menu"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <Sample label="hidden sm:flex actions + sm:hidden dropdown">
                            <div className={barShell}>
                              <div className="navbar-start gap-1">
                                <div className="tooltip tooltip-right tooltip-primary" data-tip="Back">
                                  <button
                                    type="button"
                                    className="btn btn-ghost btn-square btn-primary cursor-pointer"
                                    aria-label="Back"
                                  >
                                    <ArrowLeft className="size-5" strokeWidth={2} />
                                  </button>
                                </div>
                                <span className="font-display text-lg font-semibold tracking-tight">
                                  Responsive bar
                                </span>
                              </div>
                              <div className="navbar-end">
                                <div className="hidden items-center gap-1 sm:flex">
                                  <div className="tooltip tooltip-left tooltip-secondary" data-tip="Share">
                                    <button
                                      type="button"
                                      className="btn btn-ghost btn-square btn-secondary cursor-pointer"
                                      aria-label="Share"
                                    >
                                      <Share2 className="size-5" strokeWidth={2} />
                                    </button>
                                  </div>
                                  <div className="tooltip tooltip-left tooltip-primary" data-tip="Save">
                                    <button
                                      type="button"
                                      className="btn btn-ghost btn-square btn-primary cursor-pointer"
                                      aria-label="Save"
                                    >
                                      <Save className="size-5" strokeWidth={2} />
                                    </button>
                                  </div>
                                  <div className="tooltip tooltip-left" data-tip="Alerts">
                                    <button
                                      type="button"
                                      className="btn btn-ghost btn-square cursor-pointer"
                                      aria-label="Alerts"
                                    >
                                      <Bell className="size-5" strokeWidth={2} />
                                    </button>
                                  </div>
                                </div>

                                <div className="dropdown dropdown-end sm:hidden">
                                  <div className="tooltip tooltip-left" data-tip="More actions">
                                    <div
                                      tabIndex={0}
                                      role="button"
                                      className="btn btn-ghost btn-square cursor-pointer"
                                      aria-label="More actions"
                                    >
                                      <EllipsisVertical className="size-5" strokeWidth={2} />
                                    </div>
                                  </div>
                                  <ul tabIndex={-1} className={menuPanel}>
                                    <li>
                                      <button type="button" className="cursor-pointer" onClick={blurActive}>
                                        Share
                                      </button>
                                    </li>
                                    <li>
                                      <button type="button" className="cursor-pointer" onClick={blurActive}>
                                        Save
                                      </button>
                                    </li>
                                    <li>
                                      <button type="button" className="cursor-pointer" onClick={blurActive}>
                                        Alerts
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </Sample>
                          <p className="mt-3 text-sm text-ink-muted">
                            Narrow the viewport below the small breakpoint to see trailing actions
                            collapse into the overflow menu.
                          </p>
              </>
            }
            html={"<!-- Sample -->\n          <p class=\"mt-3 text-sm text-ink-muted\">\n            Narrow the viewport below the small breakpoint to see trailing actions\n            collapse into the overflow menu.\n          </p>"}
            jsx={"<Sample label=\"hidden sm:flex actions + sm:hidden dropdown\">\n            <div className={barShell}>\n              <div className=\"navbar-start gap-1\">\n                <div className=\"tooltip tooltip-right tooltip-primary\" data-tip=\"Back\">\n                  <button\n                    type=\"button\"\n                    className=\"btn btn-ghost btn-square btn-primary cursor-pointer\"\n                    aria-label=\"Back\"\n                  >\n                    <ArrowLeft className=\"size-5\" strokeWidth={2} />\n                  </button>\n                </div>\n                <span className=\"font-display text-lg font-semibold tracking-tight\">\n                  Responsive bar\n                </span>\n              </div>\n              <div className=\"navbar-end\">\n                <div className=\"hidden items-center gap-1 sm:flex\">\n                  <div className=\"tooltip tooltip-left tooltip-secondary\" data-tip=\"Share\">\n                    <button\n                      type=\"button\"\n                      className=\"btn btn-ghost btn-square btn-secondary cursor-pointer\"\n                      aria-label=\"Share\"\n                    >\n                      <Share2 className=\"size-5\" strokeWidth={2} />\n                    </button>\n                  </div>\n                  <div className=\"tooltip tooltip-left tooltip-primary\" data-tip=\"Save\">\n                    <button\n                      type=\"button\"\n                      className=\"btn btn-ghost btn-square btn-primary cursor-pointer\"\n                      aria-label=\"Save\"\n                    >\n                      <Save className=\"size-5\" strokeWidth={2} />\n                    </button>\n                  </div>\n                  <div className=\"tooltip tooltip-left\" data-tip=\"Alerts\">\n                    <button\n                      type=\"button\"\n                      className=\"btn btn-ghost btn-square cursor-pointer\"\n                      aria-label=\"Alerts\"\n                    >\n                      <Bell className=\"size-5\" strokeWidth={2} />\n                    </button>\n                  </div>\n                </div>\n\n                <div className=\"dropdown dropdown-end sm:hidden\">\n                  <div className=\"tooltip tooltip-left\" data-tip=\"More actions\">\n                    <div\n                      tabIndex={0}\n                      role=\"button\"\n                      className=\"btn btn-ghost btn-square cursor-pointer\"\n                      aria-label=\"More actions\"\n                    >\n                      <EllipsisVertical className=\"size-5\" strokeWidth={2} />\n                    </div>\n                  </div>\n                  <ul tabIndex={-1} className={menuPanel}>\n                    <li>\n                      <button type=\"button\" className=\"cursor-pointer\" onClick={blurActive}>\n                        Share\n                      </button>\n                    </li>\n                    <li>\n                      <button type=\"button\" className=\"cursor-pointer\" onClick={blurActive}>\n                        Save\n                      </button>\n                    </li>\n                    <li>\n                      <button type=\"button\" className=\"cursor-pointer\" onClick={blurActive}>\n                        Alerts\n                      </button>\n                    </li>\n                  </ul>\n                </div>\n              </div>\n            </div>\n          </Sample>\n          <p className=\"mt-3 text-sm text-ink-muted\">\n            Narrow the viewport below the small breakpoint to see trailing actions\n            collapse into the overflow menu.\n          </p>"}
          />
        
        </Section>
      </div>
    </>
  )
}
