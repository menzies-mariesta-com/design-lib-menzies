import type { ReactNode } from 'react'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import { Droplets, Lock, MessageSquareText } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'

const statusColors = [
  { name: 'Primary', className: 'status-primary' },
  { name: 'Secondary', className: 'status-secondary' },
  { name: 'Accent', className: 'status-accent' },
  { name: 'Info', className: 'status-info' },
  { name: 'Success', className: 'status-success' },
  { name: 'Warning', className: 'status-warning' },
  { name: 'Error', className: 'status-error' },
] as const

const badgeColors = [
  { name: 'Primary', className: 'badge-primary' },
  { name: 'Secondary', className: 'badge-secondary' },
  { name: 'Accent', className: 'badge-accent' },
  { name: 'Info', className: 'badge-info' },
  { name: 'Success', className: 'badge-success' },
  { name: 'Warning', className: 'badge-warning' },
  { name: 'Error', className: 'badge-error' },
] as const

const positions = [
  {
    name: 'Top start',
    className: 'indicator-item indicator-top indicator-start',
  },
  {
    name: 'Top center',
    className: 'indicator-item indicator-top indicator-center',
  },
  {
    name: 'Top end',
    className: 'indicator-item indicator-top indicator-end',
  },
  {
    name: 'Middle start',
    className: 'indicator-item indicator-middle indicator-start',
  },
  {
    name: 'Middle center',
    className: 'indicator-item indicator-middle indicator-center',
  },
  {
    name: 'Middle end',
    className: 'indicator-item indicator-middle indicator-end',
  },
  {
    name: 'Bottom start',
    className: 'indicator-item indicator-bottom indicator-start',
  },
  {
    name: 'Bottom center',
    className: 'indicator-item indicator-bottom indicator-center',
  },
  {
    name: 'Bottom end',
    className: 'indicator-item indicator-bottom indicator-end',
  },
] as const

const basicBadgeHtml = `<div class="indicator">
  <span class="indicator-item badge badge-primary cursor-default">New</span>
  <div class="grid h-24 w-24 place-items-center rounded-box bg-base-300 text-sm sm:h-28 sm:w-28">
  content
</div>
</div>`
const basicBadgeJsx = `<div className="indicator">
  <span className="indicator-item badge badge-primary cursor-default">New</span>
  <div className="grid h-24 w-24 place-items-center rounded-box bg-base-300 text-sm sm:h-28 sm:w-28">
  content
</div>
</div>`

const basicStatusHtml = `<div class="indicator">
  <span class="indicator-item status status-success cursor-default" aria-label="Online"></span>
  <div class="grid h-24 w-24 place-items-center rounded-box bg-base-300 text-sm sm:h-28 sm:w-28">
  content
</div>
</div>`
const basicStatusJsx = `<div className="indicator">
  <span className="indicator-item status status-success cursor-default" aria-label="Online" />
  <div className="grid h-24 w-24 place-items-center rounded-box bg-base-300 text-sm sm:h-28 sm:w-28">
  content
</div>
</div>`

const basicInboxHtml = `<div class="indicator">
  <span class="indicator-item badge badge-secondary cursor-default">12</span>
  <button type="button" class="btn cursor-pointer">Inbox</button>
</div>`
const basicInboxJsx = `<div className="indicator">
  <span className="indicator-item badge badge-secondary cursor-default">12</span>
  <button type="button" className="btn cursor-pointer">Inbox</button>
</div>`

const cornersHtml = `<div class="indicator">
  <span class="indicator-item indicator-top indicator-start badge cursor-default">NW</span>
  <span class="indicator-item indicator-top indicator-center badge cursor-default">N</span>
  <span class="indicator-item indicator-top indicator-end badge cursor-default">NE</span>
  <span class="indicator-item indicator-middle indicator-start badge cursor-default">W</span>
  <span class="indicator-item indicator-middle indicator-center badge cursor-default">·</span>
  <span class="indicator-item indicator-middle indicator-end badge cursor-default">E</span>
  <span class="indicator-item indicator-bottom indicator-start badge cursor-default">SW</span>
  <span class="indicator-item indicator-bottom indicator-center badge cursor-default">S</span>
  <span class="indicator-item indicator-bottom indicator-end badge cursor-default">SE</span>
  <div class="grid h-32 w-full max-w-xs place-items-center rounded-box bg-base-300 text-sm sm:w-60">Box</div>
</div>`
const cornersJsx = `<div className="indicator">
  <span className="indicator-item indicator-top indicator-start badge cursor-default">NW</span>
  <span className="indicator-item indicator-top indicator-center badge cursor-default">N</span>
  <span className="indicator-item indicator-top indicator-end badge cursor-default">NE</span>
  <span className="indicator-item indicator-middle indicator-start badge cursor-default">W</span>
  <span className="indicator-item indicator-middle indicator-center badge cursor-default">·</span>
  <span className="indicator-item indicator-middle indicator-end badge cursor-default">E</span>
  <span className="indicator-item indicator-bottom indicator-start badge cursor-default">SW</span>
  <span className="indicator-item indicator-bottom indicator-center badge cursor-default">S</span>
  <span className="indicator-item indicator-bottom indicator-end badge cursor-default">SE</span>
  <div className="grid h-32 w-full max-w-xs place-items-center rounded-box bg-base-300 text-sm sm:w-60">Box</div>
</div>`

const avatarLeadHtml = `<div class="avatar indicator">
  <span class="indicator-item badge badge-secondary cursor-default">Lead</span>
  <div class="h-20 w-20 rounded-lg">
    <img src="https://picsum.photos/id/64/160/160" alt="Studio artist portrait with role badge" />
  </div>
</div>`
const avatarLeadJsx = `<div className="avatar indicator">
  <span className="indicator-item badge badge-secondary cursor-default">Lead</span>
  <div className="h-20 w-20 rounded-lg">
    <img src="https://picsum.photos/id/64/160/160" alt="Studio artist portrait with role badge" />
  </div>
</div>`

const avatarOnlineHtml = `<div class="avatar indicator">
  <span class="indicator-item status status-success cursor-default" aria-label="Online"></span>
  <div class="w-20 rounded-full">
    <img src="https://picsum.photos/id/65/160/160" alt="Studio artist portrait, online status" />
  </div>
</div>`
const avatarOnlineJsx = `<div className="avatar indicator">
  <span className="indicator-item status status-success cursor-default" aria-label="Online" />
  <div className="w-20 rounded-full">
    <img src="https://picsum.photos/id/65/160/160" alt="Studio artist portrait, online status" />
  </div>
</div>`

const avatarAlertHtml = `<div class="avatar indicator">
  <span class="indicator-item badge badge-error badge-xs cursor-default">!</span>
  <div class="w-16 rounded-full">
    <img src="https://picsum.photos/id/91/160/160" alt="Studio artist portrait with alert badge" />
  </div>
</div>`
const avatarAlertJsx = `<div className="avatar indicator">
  <span className="indicator-item badge badge-error badge-xs cursor-default">!</span>
  <div className="w-16 rounded-full">
    <img src="https://picsum.photos/id/91/160/160" alt="Studio artist portrait with alert badge" />
  </div>
</div>`

const btnCritiquesHtml = `<div class="indicator">
  <span class="indicator-item badge badge-secondary cursor-default">12</span>
  <button type="button" class="btn cursor-pointer">Critiques</button>
</div>`
const btnCritiquesJsx = `<div className="indicator">
  <span className="indicator-item badge badge-secondary cursor-default">12</span>
  <button type="button" className="btn cursor-pointer">Critiques</button>
</div>`

const btnSeriesHtml = `<div class="indicator">
  <span class="indicator-item badge badge-accent cursor-default">3</span>
  <button type="button" class="btn btn-primary cursor-pointer">Series</button>
</div>`
const btnSeriesJsx = `<div className="indicator">
  <span className="indicator-item badge badge-accent cursor-default">3</span>
  <button type="button" className="btn btn-primary cursor-pointer">Series</button>
</div>`

const btnMessagesHtml = `<div class="tooltip tooltip-primary" data-tip="Messages">
  <div class="indicator">
    <span class="indicator-item badge badge-error badge-xs cursor-default">5</span>
    <button type="button" class="btn btn-ghost btn-square btn-primary cursor-pointer" aria-label="Messages">
      <svg class="size-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/><path d="M7 11h10"/><path d="M7 15h6"/><path d="M7 7h8"/></svg>
    </button>
  </div>
</div>`
const btnMessagesJsx = `<div className="tooltip tooltip-primary" data-tip="Messages">
  <div className="indicator">
    <span className="indicator-item badge badge-error badge-xs cursor-default">5</span>
    <button type="button" className="btn btn-ghost btn-square btn-primary cursor-pointer" aria-label="Messages">
      <svg className="size-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/><path d="M7 11h10"/><path d="M7 15h6"/><path d="M7 7h8"/></svg>
    </button>
  </div>
</div>`

const inputRequiredHtml = `<div class="indicator w-full max-w-xs">
  <span class="indicator-item badge cursor-default">Required</span>
  <input type="email" placeholder="Studio email" class="input w-full cursor-text" />
</div>`
const inputRequiredJsx = `<div className="indicator w-full max-w-xs">
  <span className="indicator-item badge cursor-default">Required</span>
  <input type="email" placeholder="Studio email" className="input w-full cursor-text" />
</div>`

const inputHintHtml = `<div class="indicator w-full max-w-xs">
  <span class="indicator-item indicator-bottom badge badge-info badge-sm cursor-default">Hint</span>
  <input type="text" placeholder="Plate title" class="input w-full cursor-text" />
</div>`
const inputHintJsx = `<div className="indicator w-full max-w-xs">
  <span className="indicator-item indicator-bottom badge badge-info badge-sm cursor-default">Hint</span>
  <input type="text" placeholder="Plate title" className="input w-full cursor-text" />
</div>`

const studioCritiquesHtml = `<div class="indicator">
  <span class="indicator-item badge badge-error cursor-default">4</span>
  <button type="button" class="btn cursor-pointer gap-2">
    <svg class="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/><path d="M7 11h10"/><path d="M7 15h6"/><path d="M7 7h8"/></svg>
    Critiques
  </button>
</div>`
const studioCritiquesJsx = `<div className="indicator">
  <span className="indicator-item badge badge-error cursor-default">4</span>
  <button type="button" className="btn cursor-pointer gap-2">
    <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/><path d="M7 11h10"/><path d="M7 15h6"/><path d="M7 7h8"/></svg>
    Critiques
  </button>
</div>`

const studioLockHtml = `<div class="indicator">
  <span class="indicator-item status status-warning cursor-default" aria-label="Locked"></span>
  <div class="flex items-center gap-3 rounded-box border border-ink-border bg-base-200 px-4 py-3">
    <div class="tooltip tooltip-warning" data-tip="Layer locked">
      <button type="button" class="btn btn-ghost btn-square btn-warning btn-sm cursor-pointer" aria-label="Layer locked">
        <svg class="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
      </button>
    </div>
    <div>
      <p class="text-sm font-medium">Wash layer B</p>
      <p class="text-xs text-ink-muted">Locked for export</p>
    </div>
  </div>
</div>`
const studioLockJsx = `<div className="indicator">
  <span className="indicator-item status status-warning cursor-default" aria-label="Locked" />
  <div className="flex items-center gap-3 rounded-box border border-ink-border bg-base-200 px-4 py-3">
    <div className="tooltip tooltip-warning" data-tip="Layer locked">
      <button type="button" className="btn btn-ghost btn-square btn-warning btn-sm cursor-pointer" aria-label="Layer locked">
        <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
      </button>
    </div>
    <div>
      <p className="text-sm font-medium">Wash layer B</p>
      <p className="text-xs text-ink-muted">Locked for export</p>
    </div>
  </div>
</div>`

const studioWetHtml = `<div class="indicator">
  <span class="indicator-item badge badge-info badge-sm cursor-default">Wet</span>
  <div class="flex items-center gap-3 rounded-box border border-ink-border bg-base-200 px-4 py-3">
    <div class="tooltip tooltip-info" data-tip="Brush wetness">
      <button type="button" class="btn btn-ghost btn-square btn-info btn-sm cursor-pointer" aria-label="Brush wetness">
        <svg class="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 1 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/></svg>
      </button>
    </div>
    <div>
      <p class="text-sm font-medium">Round 6</p>
      <p class="text-xs text-ink-muted">Keep tip damp</p>
    </div>
  </div>
</div>`
const studioWetJsx = `<div className="indicator">
  <span className="indicator-item badge badge-info badge-sm cursor-default">Wet</span>
  <div className="flex items-center gap-3 rounded-box border border-ink-border bg-base-200 px-4 py-3">
    <div className="tooltip tooltip-info" data-tip="Brush wetness">
      <button type="button" className="btn btn-ghost btn-square btn-info btn-sm cursor-pointer" aria-label="Brush wetness">
        <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 1 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/></svg>
      </button>
    </div>
    <div>
      <p className="text-sm font-medium">Round 6</p>
      <p className="text-xs text-ink-muted">Keep tip damp</p>
    </div>
  </div>
</div>`

const responsiveHtml = `<div class="indicator">
  <span class="indicator-item indicator-start badge badge-secondary sm:indicator-middle md:indicator-bottom lg:indicator-center xl:indicator-end cursor-default" aria-hidden></span>
  <div class="grid h-28 w-full max-w-xs place-items-center rounded-box bg-base-300 px-4 text-center text-sm sm:h-32">
    Resize to move the badge
  </div>
</div>`
const responsiveJsx = `<div className="indicator">
  <span className="indicator-item indicator-start badge badge-secondary sm:indicator-middle md:indicator-bottom lg:indicator-center xl:indicator-end cursor-default" aria-hidden />
  <div className="grid h-28 w-full max-w-xs place-items-center rounded-box bg-base-300 px-4 text-center text-sm sm:h-32">
    Resize to move the badge
  </div>
</div>`

const positionSnippets = [
  { html: `<div class="indicator">
  <span class="indicator-item indicator-top indicator-start badge badge-secondary cursor-default" aria-hidden></span>
  <div class="grid h-24 w-24 place-items-center rounded-box bg-base-300 text-sm sm:h-28 sm:w-28">
  Top start
</div>
</div>`, jsx: `<div className="indicator">
  <span className="indicator-item indicator-top indicator-start badge badge-secondary cursor-default" aria-hidden />
  <div className="grid h-24 w-24 place-items-center rounded-box bg-base-300 text-sm sm:h-28 sm:w-28">
  Top start
</div>
</div>` },
  { html: `<div class="indicator">
  <span class="indicator-item indicator-top indicator-center badge badge-secondary cursor-default" aria-hidden></span>
  <div class="grid h-24 w-24 place-items-center rounded-box bg-base-300 text-sm sm:h-28 sm:w-28">
  Top center
</div>
</div>`, jsx: `<div className="indicator">
  <span className="indicator-item indicator-top indicator-center badge badge-secondary cursor-default" aria-hidden />
  <div className="grid h-24 w-24 place-items-center rounded-box bg-base-300 text-sm sm:h-28 sm:w-28">
  Top center
</div>
</div>` },
  { html: `<div class="indicator">
  <span class="indicator-item indicator-top indicator-end badge badge-secondary cursor-default" aria-hidden></span>
  <div class="grid h-24 w-24 place-items-center rounded-box bg-base-300 text-sm sm:h-28 sm:w-28">
  Top end
</div>
</div>`, jsx: `<div className="indicator">
  <span className="indicator-item indicator-top indicator-end badge badge-secondary cursor-default" aria-hidden />
  <div className="grid h-24 w-24 place-items-center rounded-box bg-base-300 text-sm sm:h-28 sm:w-28">
  Top end
</div>
</div>` },
  { html: `<div class="indicator">
  <span class="indicator-item indicator-middle indicator-start badge badge-secondary cursor-default" aria-hidden></span>
  <div class="grid h-24 w-24 place-items-center rounded-box bg-base-300 text-sm sm:h-28 sm:w-28">
  Middle start
</div>
</div>`, jsx: `<div className="indicator">
  <span className="indicator-item indicator-middle indicator-start badge badge-secondary cursor-default" aria-hidden />
  <div className="grid h-24 w-24 place-items-center rounded-box bg-base-300 text-sm sm:h-28 sm:w-28">
  Middle start
</div>
</div>` },
  { html: `<div class="indicator">
  <span class="indicator-item indicator-middle indicator-center badge badge-secondary cursor-default" aria-hidden></span>
  <div class="grid h-24 w-24 place-items-center rounded-box bg-base-300 text-sm sm:h-28 sm:w-28">
  Middle center
</div>
</div>`, jsx: `<div className="indicator">
  <span className="indicator-item indicator-middle indicator-center badge badge-secondary cursor-default" aria-hidden />
  <div className="grid h-24 w-24 place-items-center rounded-box bg-base-300 text-sm sm:h-28 sm:w-28">
  Middle center
</div>
</div>` },
  { html: `<div class="indicator">
  <span class="indicator-item indicator-middle indicator-end badge badge-secondary cursor-default" aria-hidden></span>
  <div class="grid h-24 w-24 place-items-center rounded-box bg-base-300 text-sm sm:h-28 sm:w-28">
  Middle end
</div>
</div>`, jsx: `<div className="indicator">
  <span className="indicator-item indicator-middle indicator-end badge badge-secondary cursor-default" aria-hidden />
  <div className="grid h-24 w-24 place-items-center rounded-box bg-base-300 text-sm sm:h-28 sm:w-28">
  Middle end
</div>
</div>` },
  { html: `<div class="indicator">
  <span class="indicator-item indicator-bottom indicator-start badge badge-secondary cursor-default" aria-hidden></span>
  <div class="grid h-24 w-24 place-items-center rounded-box bg-base-300 text-sm sm:h-28 sm:w-28">
  Bottom start
</div>
</div>`, jsx: `<div className="indicator">
  <span className="indicator-item indicator-bottom indicator-start badge badge-secondary cursor-default" aria-hidden />
  <div className="grid h-24 w-24 place-items-center rounded-box bg-base-300 text-sm sm:h-28 sm:w-28">
  Bottom start
</div>
</div>` },
  { html: `<div class="indicator">
  <span class="indicator-item indicator-bottom indicator-center badge badge-secondary cursor-default" aria-hidden></span>
  <div class="grid h-24 w-24 place-items-center rounded-box bg-base-300 text-sm sm:h-28 sm:w-28">
  Bottom center
</div>
</div>`, jsx: `<div className="indicator">
  <span className="indicator-item indicator-bottom indicator-center badge badge-secondary cursor-default" aria-hidden />
  <div className="grid h-24 w-24 place-items-center rounded-box bg-base-300 text-sm sm:h-28 sm:w-28">
  Bottom center
</div>
</div>` },
  { html: `<div class="indicator">
  <span class="indicator-item indicator-bottom indicator-end badge badge-secondary cursor-default" aria-hidden></span>
  <div class="grid h-24 w-24 place-items-center rounded-box bg-base-300 text-sm sm:h-28 sm:w-28">
  Bottom end
</div>
</div>`, jsx: `<div className="indicator">
  <span className="indicator-item indicator-bottom indicator-end badge badge-secondary cursor-default" aria-hidden />
  <div className="grid h-24 w-24 place-items-center rounded-box bg-base-300 text-sm sm:h-28 sm:w-28">
  Bottom end
</div>
</div>` },
] as const

const statusSnippets = [
  { html: `<div class="indicator">
  <span class="indicator-item status cursor-default status-primary" aria-label="Primary"></span>
  <div class="grid h-24 w-24 place-items-center rounded-box bg-base-300 text-sm sm:h-28 sm:w-28">
  Primary
</div>
</div>`, jsx: `<div className="indicator">
  <span className="indicator-item status cursor-default status-primary" aria-label="Primary" />
  <div className="grid h-24 w-24 place-items-center rounded-box bg-base-300 text-sm sm:h-28 sm:w-28">
  Primary
</div>
</div>` },
  { html: `<div class="indicator">
  <span class="indicator-item status cursor-default status-secondary" aria-label="Secondary"></span>
  <div class="grid h-24 w-24 place-items-center rounded-box bg-base-300 text-sm sm:h-28 sm:w-28">
  Secondary
</div>
</div>`, jsx: `<div className="indicator">
  <span className="indicator-item status cursor-default status-secondary" aria-label="Secondary" />
  <div className="grid h-24 w-24 place-items-center rounded-box bg-base-300 text-sm sm:h-28 sm:w-28">
  Secondary
</div>
</div>` },
  { html: `<div class="indicator">
  <span class="indicator-item status cursor-default status-accent" aria-label="Accent"></span>
  <div class="grid h-24 w-24 place-items-center rounded-box bg-base-300 text-sm sm:h-28 sm:w-28">
  Accent
</div>
</div>`, jsx: `<div className="indicator">
  <span className="indicator-item status cursor-default status-accent" aria-label="Accent" />
  <div className="grid h-24 w-24 place-items-center rounded-box bg-base-300 text-sm sm:h-28 sm:w-28">
  Accent
</div>
</div>` },
  { html: `<div class="indicator">
  <span class="indicator-item status cursor-default status-info" aria-label="Info"></span>
  <div class="grid h-24 w-24 place-items-center rounded-box bg-base-300 text-sm sm:h-28 sm:w-28">
  Info
</div>
</div>`, jsx: `<div className="indicator">
  <span className="indicator-item status cursor-default status-info" aria-label="Info" />
  <div className="grid h-24 w-24 place-items-center rounded-box bg-base-300 text-sm sm:h-28 sm:w-28">
  Info
</div>
</div>` },
  { html: `<div class="indicator">
  <span class="indicator-item status cursor-default status-success" aria-label="Success"></span>
  <div class="grid h-24 w-24 place-items-center rounded-box bg-base-300 text-sm sm:h-28 sm:w-28">
  Success
</div>
</div>`, jsx: `<div className="indicator">
  <span className="indicator-item status cursor-default status-success" aria-label="Success" />
  <div className="grid h-24 w-24 place-items-center rounded-box bg-base-300 text-sm sm:h-28 sm:w-28">
  Success
</div>
</div>` },
  { html: `<div class="indicator">
  <span class="indicator-item status cursor-default status-warning" aria-label="Warning"></span>
  <div class="grid h-24 w-24 place-items-center rounded-box bg-base-300 text-sm sm:h-28 sm:w-28">
  Warning
</div>
</div>`, jsx: `<div className="indicator">
  <span className="indicator-item status cursor-default status-warning" aria-label="Warning" />
  <div className="grid h-24 w-24 place-items-center rounded-box bg-base-300 text-sm sm:h-28 sm:w-28">
  Warning
</div>
</div>` },
  { html: `<div class="indicator">
  <span class="indicator-item status cursor-default status-error" aria-label="Error"></span>
  <div class="grid h-24 w-24 place-items-center rounded-box bg-base-300 text-sm sm:h-28 sm:w-28">
  Error
</div>
</div>`, jsx: `<div className="indicator">
  <span className="indicator-item status cursor-default status-error" aria-label="Error" />
  <div className="grid h-24 w-24 place-items-center rounded-box bg-base-300 text-sm sm:h-28 sm:w-28">
  Error
</div>
</div>` },
] as const

const badgeSnippets = [
  { html: `<div class="indicator">
  <span class="indicator-item badge cursor-default badge-primary">P</span>
  <div class="grid h-24 w-24 place-items-center rounded-box bg-base-300 text-sm sm:h-28 sm:w-28">
  content
</div>
</div>`, jsx: `<div className="indicator">
  <span className="indicator-item badge cursor-default badge-primary">P</span>
  <div className="grid h-24 w-24 place-items-center rounded-box bg-base-300 text-sm sm:h-28 sm:w-28">
  content
</div>
</div>` },
  { html: `<div class="indicator">
  <span class="indicator-item badge cursor-default badge-secondary">S</span>
  <div class="grid h-24 w-24 place-items-center rounded-box bg-base-300 text-sm sm:h-28 sm:w-28">
  content
</div>
</div>`, jsx: `<div className="indicator">
  <span className="indicator-item badge cursor-default badge-secondary">S</span>
  <div className="grid h-24 w-24 place-items-center rounded-box bg-base-300 text-sm sm:h-28 sm:w-28">
  content
</div>
</div>` },
  { html: `<div class="indicator">
  <span class="indicator-item badge cursor-default badge-accent">A</span>
  <div class="grid h-24 w-24 place-items-center rounded-box bg-base-300 text-sm sm:h-28 sm:w-28">
  content
</div>
</div>`, jsx: `<div className="indicator">
  <span className="indicator-item badge cursor-default badge-accent">A</span>
  <div className="grid h-24 w-24 place-items-center rounded-box bg-base-300 text-sm sm:h-28 sm:w-28">
  content
</div>
</div>` },
  { html: `<div class="indicator">
  <span class="indicator-item badge cursor-default badge-info">I</span>
  <div class="grid h-24 w-24 place-items-center rounded-box bg-base-300 text-sm sm:h-28 sm:w-28">
  content
</div>
</div>`, jsx: `<div className="indicator">
  <span className="indicator-item badge cursor-default badge-info">I</span>
  <div className="grid h-24 w-24 place-items-center rounded-box bg-base-300 text-sm sm:h-28 sm:w-28">
  content
</div>
</div>` },
  { html: `<div class="indicator">
  <span class="indicator-item badge cursor-default badge-success">S</span>
  <div class="grid h-24 w-24 place-items-center rounded-box bg-base-300 text-sm sm:h-28 sm:w-28">
  content
</div>
</div>`, jsx: `<div className="indicator">
  <span className="indicator-item badge cursor-default badge-success">S</span>
  <div className="grid h-24 w-24 place-items-center rounded-box bg-base-300 text-sm sm:h-28 sm:w-28">
  content
</div>
</div>` },
  { html: `<div class="indicator">
  <span class="indicator-item badge cursor-default badge-warning">W</span>
  <div class="grid h-24 w-24 place-items-center rounded-box bg-base-300 text-sm sm:h-28 sm:w-28">
  content
</div>
</div>`, jsx: `<div className="indicator">
  <span className="indicator-item badge cursor-default badge-warning">W</span>
  <div className="grid h-24 w-24 place-items-center rounded-box bg-base-300 text-sm sm:h-28 sm:w-28">
  content
</div>
</div>` },
  { html: `<div class="indicator">
  <span class="indicator-item badge cursor-default badge-error">E</span>
  <div class="grid h-24 w-24 place-items-center rounded-box bg-base-300 text-sm sm:h-28 sm:w-28">
  content
</div>
</div>`, jsx: `<div className="indicator">
  <span className="indicator-item badge cursor-default badge-error">E</span>
  <div className="grid h-24 w-24 place-items-center rounded-box bg-base-300 text-sm sm:h-28 sm:w-28">
  content
</div>
</div>` },
] as const


const picsum = (id: number, size = 160) =>
  `https://picsum.photos/id/${id}/${size}/${size}`

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

function ContentBox({ label = 'content' }: { label?: string }) {
  return (
    <div className="grid h-24 w-24 place-items-center rounded-box bg-base-300 text-sm sm:h-28 sm:w-28">
      {label}
    </div>
  )
}

export default function IndicatorPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Indicator
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">indicator</span> pins a badge or status dot on buttons, avatars, inputs, and studio.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Badge and status dots"
          description="Place indicator-item before the main content"
        >
          <div className="flex flex-wrap items-end justify-center gap-8 sm:justify-start">
            <ShowcaseTabs
            preview={
              <>

              <div className="indicator">
                              <span className="indicator-item badge badge-primary cursor-default">
                                New
                              </span>
                              <ContentBox />
                            </div>
            
              </>
            }
            html={basicBadgeHtml}
            jsx={basicBadgeJsx}
          />
            <ShowcaseTabs
            preview={
              <>

              <div className="indicator">
                              <span
                                className="indicator-item status status-success cursor-default"
                                aria-label="Online"
                              />
                              <ContentBox />
                            </div>
            
              </>
            }
            html={basicStatusHtml}
            jsx={basicStatusJsx}
          />
            <ShowcaseTabs
            preview={
              <>

              <div className="indicator">
                              <span className="indicator-item badge badge-secondary cursor-default">
                                12
                              </span>
                              <button type="button" className="btn cursor-pointer">
                                Inbox
                              </button>
                            </div>
            
              </>
            }
            html={basicInboxHtml}
            jsx={basicInboxJsx}
          />
          </div>
        </Section>

        <Section
          eyebrow="02 · Positions"
          title="Placement grid"
          description="Combine horizontal and vertical placement classes on indicator-item"
          panel="wash-panel-ochre"
        >
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {positions.map((p, i) => (
              <ShowcaseTabs
            key={p.name}
            preview={
              <>

              <div className="indicator">
                                <span
                                  className={`${p.className} badge badge-secondary cursor-default`}
                                  aria-hidden
                                />
                                <ContentBox label={p.name} />
                              </div>
            
              </>
            }
            html={positionSnippets[i].html}
            jsx={positionSnippets[i].jsx}
          />
            ))}
          </div>
        </Section>

        <Section
          eyebrow="03 · All corners"
          title="Multiple indicators"
          description="Stack several indicator-item nodes on one container"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="indicator">
                            <span className="indicator-item indicator-top indicator-start badge cursor-default">
                              NW
                            </span>
                            <span className="indicator-item indicator-top indicator-center badge cursor-default">
                              N
                            </span>
                            <span className="indicator-item indicator-top indicator-end badge cursor-default">
                              NE
                            </span>
                            <span className="indicator-item indicator-middle indicator-start badge cursor-default">
                              W
                            </span>
                            <span className="indicator-item indicator-middle indicator-center badge cursor-default">
                              ·
                            </span>
                            <span className="indicator-item indicator-middle indicator-end badge cursor-default">
                              E
                            </span>
                            <span className="indicator-item indicator-bottom indicator-start badge cursor-default">
                              SW
                            </span>
                            <span className="indicator-item indicator-bottom indicator-center badge cursor-default">
                              S
                            </span>
                            <span className="indicator-item indicator-bottom indicator-end badge cursor-default">
                              SE
                            </span>
                            <div className="grid h-32 w-full max-w-xs place-items-center rounded-box bg-base-300 text-sm sm:w-60">
                              Box
                            </div>
                          </div>
            
              </>
            }
            html={cornersHtml}
            jsx={cornersJsx}
          />
        </Section>

        <Section
          eyebrow="04 · Status colors"
          title="Semantic status dots"
          description="status with brand and feedback colors on the indicator corner"
          panel="wash-panel-rose"
        >
          <div className="flex flex-wrap items-end justify-center gap-6 sm:justify-start">
            {statusColors.map((c, i) => (
              <ShowcaseTabs
            key={c.name}
            preview={
              <>

              <div className="indicator">
                                <span
                                  className={`indicator-item status cursor-default ${c.className}`}
                                  aria-label={c.name}
                                />
                                <ContentBox label={c.name} />
                              </div>
            
              </>
            }
            html={statusSnippets[i].html}
            jsx={statusSnippets[i].jsx}
          />
            ))}
          </div>
        </Section>

        <Section
          eyebrow="05 · Badge colors"
          title="Semantic badge indicators"
          description="badge colors for counts and labels on the same placement"
        >
          <div className="flex flex-wrap items-end justify-center gap-6 sm:justify-start">
            {badgeColors.map((c, i) => (
              <ShowcaseTabs
            key={c.name}
            preview={
              <>

              <div className="indicator">
                                <span
                                  className={`indicator-item badge cursor-default ${c.className}`}
                                >
                                  {c.name.slice(0, 1)}
                                </span>
                                <ContentBox />
                              </div>
            
              </>
            }
            html={badgeSnippets[i].html}
            jsx={badgeSnippets[i].jsx}
          />
            ))}
          </div>
        </Section>

        <Section
          eyebrow="06 · With avatar"
          title="Avatar indicators"
          description="Combine avatar and indicator for presence or role labels"
          panel="wash-panel-ochre"
        >
          <div className="flex flex-wrap items-end justify-center gap-8 sm:justify-start">
            <ShowcaseTabs
            preview={
              <>

              <div className="avatar indicator">
                              <span className="indicator-item badge badge-secondary cursor-default">
                                Lead
                              </span>
                              <div className="h-20 w-20 rounded-lg">
                                <img
                                  src={picsum(64)}
                                  alt="Studio artist portrait with role badge"
                                />
                              </div>
                            </div>
            
              </>
            }
            html={avatarLeadHtml}
            jsx={avatarLeadJsx}
          />
            <ShowcaseTabs
            preview={
              <>

              <div className="avatar indicator">
                              <span
                                className="indicator-item status status-success cursor-default"
                                aria-label="Online"
                              />
                              <div className="w-20 rounded-full">
                                <img
                                  src={picsum(65)}
                                  alt="Studio artist portrait, online status"
                                />
                              </div>
                            </div>
            
              </>
            }
            html={avatarOnlineHtml}
            jsx={avatarOnlineJsx}
          />
            <ShowcaseTabs
            preview={
              <>

              <div className="avatar indicator">
                              <span className="indicator-item badge badge-error badge-xs cursor-default">
                                !
                              </span>
                              <div className="w-16 rounded-full">
                                <img
                                  src={picsum(91)}
                                  alt="Studio artist portrait with alert badge"
                                />
                              </div>
                            </div>
            
              </>
            }
            html={avatarAlertHtml}
            jsx={avatarAlertJsx}
          />
          </div>
        </Section>

        <Section
          eyebrow="07 · With button"
          title="Button indicators"
          description="Unread counts and soft badges on interactive controls"
        >
          <div className="flex flex-wrap items-end justify-center gap-6 sm:justify-start">
            <ShowcaseTabs
            preview={
              <>

              <div className="indicator">
                              <span className="indicator-item badge badge-secondary cursor-default">
                                12
                              </span>
                              <button type="button" className="btn cursor-pointer">
                                Critiques
                              </button>
                            </div>
            
              </>
            }
            html={btnCritiquesHtml}
            jsx={btnCritiquesJsx}
          />
            <ShowcaseTabs
            preview={
              <>

              <div className="indicator">
                              <span className="indicator-item badge badge-accent cursor-default">
                                3
                              </span>
                              <button type="button" className="btn btn-primary cursor-pointer">
                                Series
                              </button>
                            </div>
            
              </>
            }
            html={btnSeriesHtml}
            jsx={btnSeriesJsx}
          />
            <ShowcaseTabs
            preview={
              <>

              <div className="tooltip tooltip-primary" data-tip="Messages">
                              <div className="indicator">
                                <span className="indicator-item badge badge-error badge-xs cursor-default">
                                  5
                                </span>
                                <button
                                  type="button"
                                  className="btn btn-ghost btn-square btn-primary cursor-pointer"
                                  aria-label="Messages"
                                >
                                  <MessageSquareText className="size-5" strokeWidth={2} />
                                </button>
                              </div>
                            </div>
            
              </>
            }
            html={btnMessagesHtml}
            jsx={btnMessagesJsx}
          />
          </div>
        </Section>

        <Section
          eyebrow="08 · With input"
          title="Input indicators"
          description="Required or hint badges anchored to form fields"
          panel="wash-panel-rose"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-end">
            <ShowcaseTabs
            preview={
              <>

              <div className="indicator w-full max-w-xs">
                              <span className="indicator-item badge cursor-default">
                                Required
                              </span>
                              <input
                                type="email"
                                placeholder="Studio email"
                                className="input w-full cursor-text"
                              />
                            </div>
            
              </>
            }
            html={inputRequiredHtml}
            jsx={inputRequiredJsx}
          />
            <ShowcaseTabs
            preview={
              <>

              <div className="indicator w-full max-w-xs">
                              <span className="indicator-item indicator-bottom badge badge-info badge-sm cursor-default">
                                Hint
                              </span>
                              <input
                                type="text"
                                placeholder="Plate title"
                                className="input w-full cursor-text"
                              />
                            </div>
            
              </>
            }
            html={inputHintHtml}
            jsx={inputHintJsx}
          />
          </div>
        </Section>

        <Section
          eyebrow="09 · Studio"
          title="Menzies Design patterns"
          description="Unread critique count, layer lock, and brush wet state"
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ShowcaseTabs
            preview={
              <>

              <div className="indicator">
                              <span className="indicator-item badge badge-error cursor-default">
                                4
                              </span>
                              <button type="button" className="btn cursor-pointer gap-2">
                                <MessageSquareText className="size-4" strokeWidth={2} />
                                Critiques
                              </button>
                            </div>
            
              </>
            }
            html={studioCritiquesHtml}
            jsx={studioCritiquesJsx}
          />
            <ShowcaseTabs
            preview={
              <>

              <div className="indicator">
                              <span
                                className="indicator-item status status-warning cursor-default"
                                aria-label="Locked"
                              />
                              <div className="flex items-center gap-3 rounded-box border border-ink-border bg-base-200 px-4 py-3">
                                <div className="tooltip tooltip-warning" data-tip="Layer locked">
                                  <button
                                    type="button"
                                    className="btn btn-ghost btn-square btn-warning btn-sm cursor-pointer"
                                    aria-label="Layer locked"
                                  >
                                    <Lock className="size-4" strokeWidth={2} />
                                  </button>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Wash layer B</p>
                                  <p className="text-xs text-ink-muted">Locked for export</p>
                                </div>
                              </div>
                            </div>
            
              </>
            }
            html={studioLockHtml}
            jsx={studioLockJsx}
          />
            <ShowcaseTabs
            preview={
              <>

              <div className="indicator">
                              <span className="indicator-item badge badge-info badge-sm cursor-default">
                                Wet
                              </span>
                              <div className="flex items-center gap-3 rounded-box border border-ink-border bg-base-200 px-4 py-3">
                                <div className="tooltip tooltip-info" data-tip="Brush wetness">
                                  <button
                                    type="button"
                                    className="btn btn-ghost btn-square btn-info btn-sm cursor-pointer"
                                    aria-label="Brush wetness"
                                  >
                                    <Droplets className="size-4" strokeWidth={2} />
                                  </button>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Round 6</p>
                                  <p className="text-xs text-ink-muted">Keep tip damp</p>
                                </div>
                              </div>
                            </div>
            
              </>
            }
            html={studioWetHtml}
            jsx={studioWetJsx}
          />
          </div>
        </Section>

        <Section
          eyebrow="10 · Responsive"
          title="Breakpoint placement"
          description="Resize the viewport: start, then middle, bottom, center, end"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="indicator">
                            <span
                              className="indicator-item indicator-start badge badge-secondary sm:indicator-middle md:indicator-bottom lg:indicator-center xl:indicator-end cursor-default"
                              aria-hidden
                            />
                            <div className="grid h-28 w-full max-w-xs place-items-center rounded-box bg-base-300 px-4 text-center text-sm sm:h-32">
                              Resize to move the badge
                            </div>
                          </div>
            
              </>
            }
            html={responsiveHtml}
            jsx={responsiveJsx}
          />
        </Section>
      </div>
    </>
  )
}
