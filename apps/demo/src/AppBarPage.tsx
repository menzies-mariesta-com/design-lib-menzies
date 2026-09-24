import type { ReactNode } from 'react'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import { daisyToJsx } from './snippets/markup/daisyGalleryDefaults'
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

function toJsxSvg(html: string): string {
  return html
    .replace(/class=/g, 'className=')
    .replace(/stroke-width=/g, 'strokeWidth=')
    .replace(/tabindex=/g, 'tabIndex=')
}

const icon = (paths: string, size = 'size-5') =>
  `<svg class="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`

const iArrowLeft = icon('<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>')
const iShare2 = icon(
  '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/>',
)
const iMore = icon(
  '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
)
const iMenu = icon('<path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/>')
const iSave = icon(
  '<path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"/><path d="M7 3v4a1 1 0 0 0 1 1h7"/>',
)
const iBell = icon(
  '<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>',
)
const iSearch = icon('<path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/>', 'size-4')
const iLayers = icon(
  '<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/>',
  'size-4',
)
const iPalette = icon(
  '<path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>',
  'size-4',
)
const iEllipsisV = icon(
  '<circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>',
)
const iPaintbrush = icon(
  '<path d="m14.622 17.897-10.68-2.913"/><path d="M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z"/><path d="M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15"/>',
  'size-4',
)
const iPencil = icon(
  '<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/>',
  'size-4',
)
const iDroplets = icon(
  '<path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/>',
  'size-4',
)
const iEraser = icon(
  '<path d="M21 21H8a2 2 0 0 1-1.42-.587l-3.994-3.999a2 2 0 0 1 0-2.828l10-10a2 2 0 0 1 2.829 0l5.999 6a2 2 0 0 1 0 2.828L12.834 21"/><path d="m5.082 11.09 8.828 8.828"/>',
  'size-4',
)
const iArrowLeftSm = icon('<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>', 'size-4')

const basicHtml = `<div class="space-y-4">
  <div class="${barShell}">
    <div class="flex-none">
      <div class="tooltip tooltip-right tooltip-primary" data-tip="Back">
        <button type="button" class="btn btn-ghost btn-square btn-primary cursor-pointer" aria-label="Back">
          ${iArrowLeft}
        </button>
      </div>
    </div>
    <div class="flex-1 px-1">
      <span class="font-display text-lg font-semibold tracking-tight">Plate detail</span>
    </div>
    <div class="flex-none flex items-center gap-1">
      <div class="tooltip tooltip-left tooltip-secondary" data-tip="Share">
        <button type="button" class="btn btn-ghost btn-square btn-secondary cursor-pointer" aria-label="Share">
          ${iShare2}
        </button>
      </div>
      <div class="tooltip tooltip-left" data-tip="More">
        <button type="button" class="btn btn-ghost btn-square cursor-pointer" aria-label="More">
          ${iMore}
        </button>
      </div>
    </div>
  </div>
  <div class="${barShell}">
    <div class="navbar-start gap-1">
      <div class="tooltip tooltip-right" data-tip="Open menu">
        <button type="button" class="btn btn-ghost btn-square cursor-pointer" aria-label="Open menu">
          ${iMenu}
        </button>
      </div>
      <span class="font-display text-lg font-semibold tracking-tight">Wash series</span>
    </div>
    <div class="navbar-end gap-1">
      <div class="tooltip tooltip-left tooltip-primary" data-tip="Save">
        <button type="button" class="btn btn-ghost btn-square btn-primary cursor-pointer" aria-label="Save">
          ${iSave}
        </button>
      </div>
      <div class="tooltip tooltip-left tooltip-secondary" data-tip="Alerts">
        <button type="button" class="btn btn-ghost btn-square btn-secondary cursor-pointer" aria-label="Alerts">
          ${iBell}
        </button>
      </div>
    </div>
  </div>
</div>`

const searchHtml = `<div class="${barShell}">
  <div class="navbar-start">
    <span class="font-display text-lg font-semibold tracking-tight px-2">Find plates</span>
  </div>
  <div class="navbar-end">
    <div class="join">
      <input type="search" placeholder="Search washes…" class="input join-item input-bordered w-28 cursor-text sm:w-44" />
      <button type="button" class="btn btn-primary join-item cursor-pointer">
        ${iSearch}
        <span class="hidden sm:inline">Search</span>
      </button>
    </div>
  </div>
</div>`

const densityHtml = `<div class="space-y-4">
  <div class="${barShell} min-h-0 py-0">
    <div class="navbar-start gap-1">
      <div class="tooltip tooltip-right tooltip-primary" data-tip="Back">
        <button type="button" class="btn btn-ghost btn-square btn-sm btn-primary cursor-pointer" aria-label="Back">
          ${iArrowLeftSm}
        </button>
      </div>
      <span class="text-sm font-semibold">Dense toolbar</span>
    </div>
    <div class="navbar-end gap-0.5">
      <div class="tooltip tooltip-left" data-tip="Layers">
        <button type="button" class="btn btn-ghost btn-square btn-sm cursor-pointer" aria-label="Layers">
          ${iLayers}
        </button>
      </div>
      <div class="tooltip tooltip-left tooltip-secondary" data-tip="Palette">
        <button type="button" class="btn btn-ghost btn-square btn-sm btn-secondary cursor-pointer" aria-label="Palette">
          ${iPalette}
        </button>
      </div>
    </div>
  </div>
  <div class="${barShell} min-h-16 py-3">
    <div class="navbar-start gap-2 px-1">
      <div class="tooltip tooltip-right" data-tip="Open menu">
        <button type="button" class="btn btn-ghost btn-square cursor-pointer" aria-label="Open menu">
          ${iMenu}
        </button>
      </div>
      <div class="flex flex-col leading-tight">
        <span class="font-display text-xl font-semibold tracking-tight">Tall bar</span>
        <span class="label-ink">Extra vertical room</span>
      </div>
    </div>
    <div class="navbar-end">
      <button type="button" class="btn btn-sm cursor-pointer">Open plate</button>
    </div>
  </div>
</div>`

const colorsHtml = `<div class="space-y-3">
  <div class="navbar rounded-box border border-ink-border/40 shadow-[var(--shadow-paper-sm)] bg-base-200 text-base-content">
    <div class="navbar-start gap-1">
      <button type="button" class="btn btn-ghost btn-square cursor-pointer" aria-label="Back">${iArrowLeft}</button>
      <span class="font-display text-lg font-semibold tracking-tight">Menzies Design</span>
    </div>
    <div class="navbar-end">
      <button type="button" class="btn btn-ghost btn-sm cursor-pointer">Action</button>
    </div>
  </div>
  <div class="navbar rounded-box border border-ink-border/40 shadow-[var(--shadow-paper-sm)] bg-base-300 text-base-content">
    <div class="navbar-start gap-1">
      <button type="button" class="btn btn-ghost btn-square cursor-pointer" aria-label="Back">${iArrowLeft}</button>
      <span class="font-display text-lg font-semibold tracking-tight">Menzies Design</span>
    </div>
    <div class="navbar-end">
      <button type="button" class="btn btn-ghost btn-sm cursor-pointer">Action</button>
    </div>
  </div>
  <div class="navbar rounded-box border border-ink-border/40 shadow-[var(--shadow-paper-sm)] bg-neutral text-neutral-content">
    <div class="navbar-start gap-1">
      <button type="button" class="btn btn-ghost btn-square cursor-pointer" aria-label="Back">${iArrowLeft}</button>
      <span class="font-display text-lg font-semibold tracking-tight">Menzies Design</span>
    </div>
    <div class="navbar-end">
      <button type="button" class="btn btn-ghost btn-sm cursor-pointer">Action</button>
    </div>
  </div>
  <div class="navbar rounded-box border border-ink-border/40 shadow-[var(--shadow-paper-sm)] bg-primary text-primary-content">
    <div class="navbar-start gap-1">
      <button type="button" class="btn btn-ghost btn-square cursor-pointer" aria-label="Back">${iArrowLeft}</button>
      <span class="font-display text-lg font-semibold tracking-tight">Menzies Design</span>
    </div>
    <div class="navbar-end">
      <button type="button" class="btn btn-ghost btn-sm cursor-pointer">Action</button>
    </div>
  </div>
</div>`

const studioHtml = `<div class="${barShell} wash-panel-blue bg-base-100/90">
  <div class="navbar-start gap-2">
    <button type="button" class="btn btn-ghost cursor-pointer px-2">
      <span class="font-display text-xl font-semibold tracking-tight">Menzies Design</span>
    </button>
    <span class="label-ink hidden sm:inline">Pigment desk</span>
  </div>
  <div class="navbar-center hidden md:flex">
    <div class="join">
      <div class="tooltip tooltip-bottom" data-tip="Round brush">
        <button type="button" class="btn btn-ghost btn-square join-item cursor-pointer" aria-label="Round brush">${iPaintbrush}</button>
      </div>
      <div class="tooltip tooltip-bottom" data-tip="Pencil">
        <button type="button" class="btn btn-ghost btn-square join-item cursor-pointer" aria-label="Pencil">${iPencil}</button>
      </div>
      <div class="tooltip tooltip-bottom" data-tip="Wash dropper">
        <button type="button" class="btn btn-ghost btn-square join-item cursor-pointer" aria-label="Wash dropper">${iDroplets}</button>
      </div>
      <div class="tooltip tooltip-bottom" data-tip="Kneaded eraser">
        <button type="button" class="btn btn-ghost btn-square join-item cursor-pointer" aria-label="Kneaded eraser">${iEraser}</button>
      </div>
    </div>
  </div>
  <div class="navbar-end gap-1">
    <div class="tooltip tooltip-bottom tooltip-primary" data-tip="Layers">
      <button type="button" class="btn btn-ghost btn-square btn-primary cursor-pointer" aria-label="Layers">${iLayers}</button>
    </div>
    <div class="tooltip tooltip-bottom tooltip-secondary" data-tip="Palette">
      <button type="button" class="btn btn-ghost btn-square btn-secondary cursor-pointer" aria-label="Palette">${iPalette}</button>
    </div>
    <div class="avatar avatar-placeholder ml-1">
      <div class="w-9 rounded-full bg-wash-ochre text-sm font-semibold text-base-content">
        <span>WF</span>
      </div>
    </div>
  </div>
</div>`

const stickyHtml = `<div class="h-56 overflow-auto rounded-box border border-ink-border/60 bg-base-200/40">
  <div class="${barShell} sticky top-0 z-10 rounded-none border-x-0 border-t-0 bg-base-100/95 backdrop-blur-sm">
    <div class="navbar-start px-1">
      <span class="font-display text-base font-semibold tracking-tight">Sticky note</span>
    </div>
    <div class="navbar-end">
      <span class="label-ink pr-2">Scroll the frame</span>
    </div>
  </div>
  <div class="space-y-3 p-4 text-sm text-ink-muted">
    <p>This bar stays pinned while you scroll this panel only. The Menzies Design app header above remains separate.</p>
    <p>Layer washes from light to dark. Keep edges soft where paper grain should show through.</p>
    <p>Dense toolbars belong in the content scroll region when the shell already owns the viewport top.</p>
    <p>When you need full-page sticky chrome, give that page its own scroll owner instead of nesting under the studio drawer header.</p>
    <p>More plate notes fill the frame so sticky behavior is easy to feel.</p>
  </div>
</div>`

const responsiveHtml = `<div class="${barShell}">
  <div class="navbar-start gap-1">
    <div class="tooltip tooltip-right tooltip-primary" data-tip="Back">
      <button type="button" class="btn btn-ghost btn-square btn-primary cursor-pointer" aria-label="Back">${iArrowLeft}</button>
    </div>
    <span class="font-display text-lg font-semibold tracking-tight">Responsive bar</span>
  </div>
  <div class="navbar-end">
    <div class="hidden items-center gap-1 sm:flex">
      <div class="tooltip tooltip-left tooltip-secondary" data-tip="Share">
        <button type="button" class="btn btn-ghost btn-square btn-secondary cursor-pointer" aria-label="Share">${iShare2}</button>
      </div>
      <div class="tooltip tooltip-left tooltip-primary" data-tip="Save">
        <button type="button" class="btn btn-ghost btn-square btn-primary cursor-pointer" aria-label="Save">${iSave}</button>
      </div>
      <div class="tooltip tooltip-left" data-tip="Alerts">
        <button type="button" class="btn btn-ghost btn-square cursor-pointer" aria-label="Alerts">${iBell}</button>
      </div>
    </div>
    <div class="dropdown dropdown-end sm:hidden">
      <div class="tooltip tooltip-left" data-tip="More actions">
        <div tabindex="0" role="button" class="btn btn-ghost btn-square cursor-pointer" aria-label="More actions">
          ${iEllipsisV}
        </div>
      </div>
      <ul tabindex="-1" class="${menuPanel}">
        <li><button type="button" class="cursor-pointer">Share</button></li>
        <li><button type="button" class="cursor-pointer">Save</button></li>
        <li><button type="button" class="cursor-pointer">Alerts</button></li>
      </ul>
    </div>
  </div>
</div>`

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
            html={basicHtml}
            jsx={toJsxSvg(basicHtml)}
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
            html={searchHtml}
            jsx={toJsxSvg(searchHtml)}
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
            html={densityHtml}
            jsx={toJsxSvg(densityHtml)}
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
            html={colorsHtml}
            jsx={toJsxSvg(colorsHtml)}
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
            html={studioHtml}
            jsx={toJsxSvg(studioHtml)}
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
            html={stickyHtml}
            jsx={daisyToJsx(stickyHtml)}
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
            html={responsiveHtml}
            jsx={toJsxSvg(responsiveHtml)}
          />
        </Section>
      </div>
    </>
  )
}
