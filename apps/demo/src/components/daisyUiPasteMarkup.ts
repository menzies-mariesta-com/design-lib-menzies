/**
 * Gallery copy tabs: expand Wash/plain component tags into daisyUI class markup.
 * Safety net for unmigrated pages only. Prefer full paste kits under
 * `apps/demo/src/snippets/` (calendar philosophy). Live previews may still
 * mount demo-local modules; paste path is classes only.
 *
 * Skips expansion when the snippet already looks like a full kit (multi-line
 * markup without Wash/#plain component tags).
 */

function cn(jsx: boolean, classes: string): string {
  return jsx ? `className="${classes}"` : `class="${classes}"`
}

/** Weekday + day cells must be direct children of `.wash-calendar__grid` (7-col CSS grid). */
function daisyCalendarDays(jsx: boolean): string {
  const c = (s: string) => cn(jsx, s)
  const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
    .map(
      (label) =>
        `<div ${c('wash-calendar__weekday')} role="columnheader" aria-label="${label}">${label}</div>`,
    )
    .join('\n    ')
  // Sample: March 2026 starts on Sunday (firstDayOfWeek=0). Day 15 selected.
  const days: string[] = []
  for (let d = 1; d <= 31; d++) {
    const selected = d === 15 ? ' wash-calendar__day--selected' : ''
    const today = d === 23 ? ' wash-calendar__day--today' : ''
    days.push(
      `<button type="button" ${c(`wash-calendar__day${selected}${today} cursor-pointer`)} role="gridcell">${d}</button>`,
    )
  }
  // Trailing empties so the last row fills 7 columns (31 days from Sun → ends Tue).
  for (let i = 0; i < 4; i++) {
    days.push(`<div ${c('wash-calendar__day-empty')} aria-hidden="true"></div>`)
  }
  return `${weekdays}
    ${days.join('\n    ')}`
}

export function daisyCalendar(jsx: boolean): string {
  const c = (s: string) => cn(jsx, s)
  return `<div ${c('wash-calendar wash-calendar--with-time rounded-box border border-base-300 bg-base-100 p-3 shadow-[var(--shadow-paper-sm)]')} role="application" aria-label="Month calendar">
  <div ${c('wash-calendar__header')}>
    <div ${c('tooltip tooltip-primary tooltip-bottom')} data-tip="Previous month">
      <button type="button" ${c('btn btn-ghost btn-square btn-sm btn-primary cursor-pointer')} aria-label="Previous month">Prev</button>
    </div>
    <details ${c('dropdown wash-calendar__nav-dropdown')}>
      <summary ${c('btn btn-ghost btn-sm wash-calendar__nav-trigger cursor-pointer')} aria-label="Month: March">
        <span ${c('min-w-0 truncate')}>March</span>
        <svg ${c('wash-calendar__nav-chevron size-3.5 shrink-0')} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg>
      </summary>
      <ul ${c('menu menu-sm dropdown-content wash-calendar__nav-menu z-50 mt-1 rounded-box border border-ink-border bg-base-100 p-2 shadow-[var(--shadow-paper-md)]')} role="listbox" aria-label="Month" tabindex="-1">
        <li><button type="button" role="option" ${c('cursor-pointer')}>February</button></li>
        <li><button type="button" role="option" ${c('cursor-pointer menu-wash-active font-semibold')} aria-selected="true">March</button></li>
        <li><button type="button" role="option" ${c('cursor-pointer')}>April</button></li>
      </ul>
    </details>
    <details ${c('dropdown wash-calendar__nav-dropdown wash-calendar__nav-dropdown--year')}>
      <summary ${c('btn btn-ghost btn-sm wash-calendar__nav-trigger cursor-pointer')} aria-label="Year: 2026">
        <span ${c('min-w-0 truncate')}>2026</span>
        <svg ${c('wash-calendar__nav-chevron size-3.5 shrink-0')} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg>
      </summary>
      <ul ${c('menu menu-sm dropdown-content wash-calendar__nav-menu z-50 mt-1 rounded-box border border-ink-border bg-base-100 p-2 shadow-[var(--shadow-paper-md)]')} role="listbox" aria-label="Year" tabindex="-1">
        <li><button type="button" role="option" ${c('cursor-pointer')}>2025</button></li>
        <li><button type="button" role="option" ${c('cursor-pointer menu-wash-active font-semibold')} aria-selected="true">2026</button></li>
        <li><button type="button" role="option" ${c('cursor-pointer')}>2027</button></li>
      </ul>
    </details>
    <div ${c('tooltip tooltip-primary tooltip-bottom')} data-tip="Next month">
      <button type="button" ${c('btn btn-ghost btn-square btn-sm btn-primary cursor-pointer')} aria-label="Next month">Next</button>
    </div>
    <button type="button" ${c('wash-calendar__today btn btn-ghost btn-sm cursor-pointer')}>Today</button>
  </div>
  <div ${c('wash-calendar__grid')} role="grid">
    ${daisyCalendarDays(jsx)}
  </div>
  <div ${c('wash-calendar__time')}>
    <span ${c('wash-calendar__time-label')}>Time</span>
    ${daisyTime(jsx)}
  </div>
</div>`
}

/** Static dial snapshot at 09:00:00 (hour view). Dual-ring 24h face. */
function daisyTimeDial(jsx: boolean): string {
  const c = (s: string) => cn(jsx, s)
  const point = (value: number, steps: number, radius: number) => {
    const deg = (value / steps) * 360 - 90
    const rad = (deg * Math.PI) / 180
    return { x: 100 + Math.cos(rad) * radius, y: 100 + Math.sin(rad) * radius }
  }
  const outer = Array.from({ length: 12 }, (_, i) => {
    const pos = point(i, 12, 78)
    const selected = i === 9 ? ' wash-time__label--selected' : ''
    return `<span ${c(`wash-time__label font-mono${selected}`)} style="left:${((pos.x / 200) * 100).toFixed(2)}%;top:${((pos.y / 200) * 100).toFixed(2)}%">${String(i).padStart(2, '0')}</span>`
  }).join('\n    ')
  const inner = Array.from({ length: 12 }, (_, i) => {
    const v = i === 0 ? 12 : i + 12
    const pos = point(i, 12, 52)
    return `<span ${c('wash-time__label font-mono')} style="left:${((pos.x / 200) * 100).toFixed(2)}%;top:${((pos.y / 200) * 100).toFixed(2)}%">${String(v).padStart(2, '0')}</span>`
  }).join('\n    ')
  // Hour 9 on outer ring → 270° from 12; SVG uses angle-90: left.
  return `<div ${c('wash-time__dial')} role="slider" aria-valuemin="0" aria-valuemax="23" aria-valuenow="9" aria-label="Hour (outer 0-11, inner 12-23)" tabindex="0">
    <svg ${c('wash-time__svg')} viewBox="0 0 200 200" aria-hidden="true">
      <circle ${c('wash-time__face')} cx="100" cy="100" r="96"></circle>
      <line ${c('wash-time__hand wash-time__hand--hour wash-time__hand--active')} x1="100" y1="100" x2="52" y2="100"></line>
      <line ${c('wash-time__hand wash-time__hand--minute')} x1="100" y1="100" x2="100" y2="32"></line>
      <line ${c('wash-time__hand wash-time__hand--second')} x1="100" y1="100" x2="100" y2="22"></line>
      <line ${c('wash-time__pointer')} x1="100" y1="100" x2="28" y2="100"></line>
      <circle ${c('wash-time__pointer-knob')} cx="28" cy="100" r="11"></circle>
      <circle ${c('wash-time__hub')} cx="100" cy="100" r="4"></circle>
    </svg>
    ${outer}
    ${inner}
  </div>
  <p ${c('wash-time__hint')}>Outer ring 0-11, inner 12-23, then minutes</p>`
}

export function daisyTime(jsx: boolean): string {
  const c = (s: string) => cn(jsx, s)
  return `<details ${c('dropdown wash-time w-full')} open>
  <summary ${c('wash-time__trigger input input-bordered flex w-full cursor-pointer items-center justify-between gap-2')}>
    <span ${c('min-w-0 truncate font-mono text-sm tabular-nums')}>09:00:00</span>
  </summary>
  <div ${c('dropdown-content wash-time__panel z-50 mt-1 rounded-box border border-ink-border bg-base-100 shadow-[var(--shadow-paper-md)]')} role="dialog" aria-label="Choose time">
    <div ${c('wash-time__readout')} role="group" aria-label="Time parts">
      <button type="button" ${c('wash-time__part wash-time__part--active cursor-pointer font-mono')}>09</button>
      <span ${c('wash-time__sep')} aria-hidden="true">:</span>
      <button type="button" ${c('wash-time__part cursor-pointer font-mono')}>00</button>
      <span ${c('wash-time__sep')} aria-hidden="true">:</span>
      <button type="button" ${c('wash-time__part cursor-pointer font-mono')}>00</button>
      <div ${c('wash-time__ampm join')} role="group" aria-label="AM or PM">
        <button type="button" ${c('btn btn-xs join-item btn-primary cursor-pointer')} aria-pressed="true">AM</button>
        <button type="button" ${c('btn btn-xs join-item btn-ghost cursor-pointer')} aria-pressed="false">PM</button>
      </div>
    </div>
    ${daisyTimeDial(jsx)}
  </div>
</details>`
}

export function daisySelect(jsx: boolean): string {
  const c = (s: string) => cn(jsx, s)
  return `<div ${c('dropdown w-full')}>
  <button type="button" ${c('select select-bordered w-full cursor-pointer justify-between')} role="combobox" aria-expanded="false" aria-haspopup="listbox">
    <span ${c('min-w-0 flex-1 truncate text-base-content/50')}>Pick a pigment...</span>
  </button>
  <div ${c('dropdown-content z-50 mt-1 w-full overflow-y-auto rounded-box border border-ink-border bg-base-100 p-2 shadow-[var(--shadow-paper-md)]')}>
    <ul ${c('menu w-full rounded-box p-0')} role="listbox">
      <li role="option"><button type="button" ${c('cursor-pointer')}>Ultramarine</button></li>
      <li role="option"><button type="button" ${c('cursor-pointer')}>Yellow ochre</button></li>
      <li role="option"><button type="button" ${c('cursor-pointer active')}>Viridian</button></li>
    </ul>
  </div>
</div>`
}

export function daisySearchSelect(jsx: boolean): string {
  const c = (s: string) => cn(jsx, s)
  return `<div ${c('dropdown dropdown-no-hover w-full')}>
  <label ${c('input input-bordered flex w-full cursor-text items-center gap-2')}>
    <input type="search" ${c('grow cursor-text bg-transparent outline-none')} placeholder="Search mediums..." aria-autocomplete="list" />
  </label>
  <div ${c('dropdown-content z-50 mt-1 w-full overflow-y-auto rounded-box border border-ink-border bg-base-100 p-2 shadow-[var(--shadow-paper-md)]')}>
    <ul ${c('menu w-full rounded-box p-0')} role="listbox">
      <li role="option"><button type="button" ${c('cursor-pointer')}>Ultramarine</button></li>
      <li role="option"><button type="button" ${c('cursor-pointer')}>Viridian</button></li>
    </ul>
  </div>
</div>`
}

export function daisyTooltip(jsx: boolean): string {
  const c = (s: string) => cn(jsx, s)
  return `<div ${c('tooltip tooltip-primary')} data-tip="Opens toward available space">
  <button type="button" ${c('btn btn-primary cursor-pointer')}>Near edge</button>
</div>`
}

export function daisyDialog(jsx: boolean): string {
  const c = (s: string) => cn(jsx, s)
  return `<div ${c('flex flex-wrap items-center gap-4')}>
  <button type="button" ${c('btn btn-error cursor-pointer')}>Delete plate</button>
</div>
<dialog ${c('modal')} open>
  <div ${c('modal-box')}>
    <h3 ${c('card-title text-error font-bold')}>Delete plate</h3>
    <p ${c('py-2 text-sm text-base-content/70')}>This cannot be undone. The plate and its wash history will be removed.</p>
    <div ${c('py-2')}>
      <p ${c('text-sm')}>Plate <span ${c('font-mono text-xs')}>coastal-fog-12</span> is linked to 3 review comments.</p>
    </div>
    <div ${c('modal-action')}>
      <button type="button" ${c('btn cursor-pointer')}>Cancel</button>
      <button type="button" ${c('btn btn-error cursor-pointer')}>Delete</button>
    </div>
  </div>
  <form method="dialog" ${c('modal-backdrop')}>
    <button type="submit" ${c('cursor-pointer')}>close</button>
  </form>
</dialog>`
}

export function daisyTable(jsx: boolean): string {
  const c = (s: string) => cn(jsx, s)
  return `<div ${c('wash-table-chrome flex min-h-[22rem] flex-col overflow-hidden rounded-box border border-ink-border bg-base-100')}>
  <div ${c('flex shrink-0 items-start justify-between gap-3 border-b border-base-300 px-3 py-2.5')}>
    <div>
      <h2 ${c('text-base font-bold')}>Studio plates</h2>
      <p ${c('mt-0.5 text-xs text-ink-muted')}>Plate ledger for wash studio work</p>
    </div>
    <div ${c('flex shrink-0 flex-wrap items-center justify-end gap-0.5')}>
      <div ${c('dropdown dropdown-end dropdown-bottom dropdown-no-hover wash-dropdown-contained')}>
        <div ${c('tooltip tooltip-secondary')} data-tip="Export">
          <div tabindex="0" role="button" ${c('btn btn-ghost btn-square btn-sm btn-secondary cursor-pointer')} aria-label="Export" aria-haspopup="menu">↓</div>
        </div>
        <ul tabindex="-1" role="menu" ${c('dropdown-content menu z-50 mt-1 w-40 rounded-box border border-ink-border bg-base-100 p-2')}>
          <li role="none"><button type="button" role="menuitem" ${c('cursor-pointer')}>Excel</button></li>
          <li role="none"><button type="button" role="menuitem" ${c('cursor-pointer')}>CSV</button></li>
          <li role="none"><button type="button" role="menuitem" ${c('cursor-pointer')}>ODS</button></li>
        </ul>
      </div>
      <div ${c('tooltip tooltip-secondary')} data-tip="Refresh">
        <button type="button" ${c('btn btn-ghost btn-square btn-sm btn-secondary cursor-pointer')} aria-label="Refresh">↻</button>
      </div>
      <div ${c('tooltip tooltip-primary')} data-tip="Add">
        <button type="button" ${c('btn btn-ghost btn-square btn-sm btn-primary cursor-pointer')} aria-label="Add">+</button>
      </div>
    </div>
  </div>
  <div ${c('min-h-0 flex-1 overflow-auto')}>
    <table ${c('table table-zebra')}>
      <thead>
        <tr><th>Actions</th><th>No</th><th>Name</th><th>Status</th></tr>
        <tr>
          <th></th><th></th>
          <th><input ${c('input input-bordered input-xs w-full cursor-text')} placeholder="Filter name" /></th>
          <th>
            <select ${c('select select-bordered select-xs w-full cursor-pointer')}>
              <option>All</option>
              <option>Draft</option>
              <option>In wash</option>
              <option>Review</option>
            </select>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><button type="button" ${c('btn btn-ghost btn-square btn-xs btn-primary cursor-pointer')} aria-label="View">View</button></td>
          <td>1</td>
          <td>Coastal fog plate</td>
          <td><span ${c('badge badge-soft badge-primary')}>Review</span></td>
        </tr>
        <tr>
          <td><button type="button" ${c('btn btn-ghost btn-square btn-xs btn-primary cursor-pointer')} aria-label="View">View</button></td>
          <td>2</td>
          <td>Ochre cliff margin</td>
          <td><span ${c('badge badge-soft badge-warning')}>In wash</span></td>
        </tr>
      </tbody>
    </table>
  </div>
  <div ${c('grid shrink-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-2 border-t border-base-300 px-3 py-2 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]')}>
    <label ${c('flex min-w-0 items-center gap-1.5 justify-self-start text-xs text-ink-muted')}>
      <span>Per page</span>
      <select ${c('select select-sm select-bordered cursor-pointer')} aria-label="Rows per page">
        <option selected>auto</option>
        <option>5</option>
        <option>10</option>
      </select>
    </label>
    <p ${c('hidden justify-self-center text-center font-mono text-xs text-ink-muted sm:block')}>Showing 1-2 of 2</p>
    <div ${c('join col-start-2 justify-self-end sm:col-start-3')}>
      <button type="button" ${c('btn btn-sm join-item btn-active cursor-pointer')}>1</button>
      <button type="button" ${c('btn btn-sm join-item cursor-pointer')}>2</button>
    </div>
  </div>
</div>`
}

export function daisyChart(jsx: boolean): string {
  const c = (s: string) => cn(jsx, s)
  return `<div ${c('rounded-box border border-ink-border bg-base-100 p-4')}>
  <div id="chart" ${c('min-h-80 w-full')}></div>
</div>`
}

export function daisyEditor(jsx: boolean, kind: 'rich' | 'code'): string {
  const c = (s: string) => cn(jsx, s)
  if (kind === 'code') {
    return `<div ${c('wash-code-editor overflow-hidden rounded-box border border-ink-border bg-base-100')}>
  <div ${c('wash-code-titlebar flex items-center justify-between border-b border-base-300 bg-base-200 px-3 py-2')}>
    <span ${c('font-mono text-xs')}>app.ts</span>
    <select ${c('select select-bordered select-xs cursor-pointer')}><option>TypeScript</option></select>
  </div>
  <pre ${c('max-h-96 overflow-auto p-4 font-mono text-sm')}><code>export function boot() { return true }</code></pre>
</div>`
  }
  return `<div ${c('wash-rte overflow-hidden rounded-box border border-ink-border bg-base-100')}>
  <div ${c('wash-rte-toolbar flex flex-wrap gap-1 border-b border-base-300 bg-base-200 p-2')}>
    <button type="button" ${c('btn btn-ghost btn-square btn-xs cursor-pointer')} aria-label="Bold">B</button>
    <button type="button" ${c('btn btn-ghost btn-square btn-xs cursor-pointer')} aria-label="Italic">I</button>
  </div>
  <div ${c('wash-rte-surface min-h-40 cursor-text p-4')} contenteditable="true" role="textbox" aria-multiline="true">
    <p>Draft copy...</p>
  </div>
</div>`
}

export function daisyMarquee(jsx: boolean): string {
  const c = (s: string) => cn(jsx, s)
  return `<div ${c('grid gap-8 md:grid-cols-2')}>
  <div ${c('flex flex-col gap-2')}>
    <div ${c('w-full max-w-[11rem] rounded-field border border-ink-border/70 bg-base-100 px-3 py-2')}>
      <p ${c('truncate text-sm')}>Ultramarine glaze over warm ochre underpainting for depth</p>
    </div>
    <p ${c('text-xs text-ink-muted')}>Hover the truncated line. Non-overflowing text stays still.</p>
    <code ${c('font-mono text-[0.65rem] text-ink-muted')}>truncate (auto-attach)</code>
  </div>
  <div ${c('flex flex-col gap-2')}>
    <div ${c('w-full max-w-[11rem] rounded-field border border-ink-border/70 bg-base-100 px-3 py-2')}>
      <div ${c('overflow-marquee-host overflow-marquee text-sm')} data-overflow="true" data-overflow-marquee="" tabindex="0">
        <span ${c('overflow-marquee-label')}>Wet-on-wet bloom edges need a clean sponge and patience</span>
      </div>
    </div>
    <p ${c('text-xs text-ink-muted')}>Explicit host when you own the markup.</p>
    <code ${c('font-mono text-[0.65rem] text-ink-muted')}>overflow-marquee-host</code>
  </div>
  <div ${c('flex flex-col gap-2 md:col-span-2')}>
    <div ${c('w-full max-w-xl rounded-field border border-ink-border/70 bg-base-100 px-3 py-2')}>
      <p ${c('truncate text-sm')}>Short label</p>
    </div>
    <code ${c('font-mono text-[0.65rem] text-ink-muted')}>truncate (fits: no marquee)</code>
  </div>
</div>`
}

export function daisyPanel(jsx: boolean): string {
  const c = (s: string) => cn(jsx, s)
  return `<div ${c('wash-panel paper-grain')}>
  <p>Panel content</p>
</div>`
}

export function daisyCard(jsx: boolean): string {
  const c = (s: string) => cn(jsx, s)
  return `<div ${c('card border border-ink-border bg-base-100')}>
  <div ${c('card-body')}>
    <h2 ${c('card-title')}>Title</h2>
    <p>Body</p>
  </div>
</div>`
}

export function daisyButton(jsx: boolean): string {
  const c = (s: string) => cn(jsx, s)
  return `<button type="button" ${c('btn btn-primary ripple cursor-pointer')}>Save</button>`
}

export function daisyAlert(jsx: boolean): string {
  const c = (s: string) => cn(jsx, s)
  return `<div role="alert" ${c('alert alert-info border border-ink-border')}>
  <span>Message</span>
</div>`
}

export function daisyInput(jsx: boolean): string {
  const c = (s: string) => cn(jsx, s)
  return `<label ${c('form-control w-full')}>
  <span ${c('label')}><span ${c('label-text')}>Name</span></span>
  <input type="text" ${c('input input-bordered w-full cursor-text')} />
</label>`
}

const CHART_TAG =
  '(?:Line|Area|Bar|Column|Mixed|Radar|Pie|Donut|Sparkline|Treemap|Gantt|Wash|Brush|Bubble|BoxPlot|Candlestick|Funnel|Heatmap|Histogram|PolarArea|RadialBar|RangeArea|Scatter|Slope|Sunburst|Violin|RealtimeLine|GradientLine|DashedLine|Stepline|MissingValuesLine|MissingValuesArea|ZoomableTimeSeries|LineChartWithAnnotations|GithubStyleArea|DownsampledLine|RangeAreaLineCombo|SyncedChartPanel|SyncedCharts)Chart'

type Expander = { re: RegExp; html: string; jsx: string }

function tagPair(name: string): RegExp {
  return new RegExp(
    `<${name}\\b[^>]*\\/>|<${name}\\b[^>]*>[\\s\\S]*?<\\/${name}>`,
    'g',
  )
}

function buildExpanders(): Expander[] {
  return [
    { re: tagPair('CalendarMonth'), html: daisyCalendar(false), jsx: daisyCalendar(true) },
    { re: tagPair('WashCalendar'), html: daisyCalendar(false), jsx: daisyCalendar(true) },
    { re: tagPair('TimeClockDial'), html: daisyTime(false), jsx: daisyTime(true) },
    { re: tagPair('WashTimePicker'), html: daisyTime(false), jsx: daisyTime(true) },
    { re: tagPair('SearchSelect'), html: daisySearchSelect(false), jsx: daisySearchSelect(true) },
    { re: tagPair('Select'), html: daisySelect(false), jsx: daisySelect(true) },
    { re: tagPair('WashTooltip'), html: daisyTooltip(false), jsx: daisyTooltip(true) },
    { re: tagPair('DialogTemplate'), html: daisyDialog(false), jsx: daisyDialog(true) },
    { re: tagPair('Dialog'), html: daisyDialog(false), jsx: daisyDialog(true) },
    {
      re: /<DataTable(?:Header|FooterBar|LegendsRow|ExportMenu)\b[^>]*\/>|<DataTable(?:Header|FooterBar|LegendsRow|ExportMenu)\b[^>]*>[\s\S]*?<\/DataTable(?:Header|FooterBar|LegendsRow|ExportMenu)>/g,
      html: daisyTable(false),
      jsx: daisyTable(true),
    },
    {
      re: new RegExp(
        `<${CHART_TAG}\\b[^>]*\\/>|<${CHART_TAG}\\b[^>]*>[\\s\\S]*?<\\/${CHART_TAG}>`,
        'g',
      ),
      html: daisyChart(false),
      jsx: daisyChart(true),
    },
    { re: tagPair('RichTextEditor'), html: daisyEditor(false, 'rich'), jsx: daisyEditor(true, 'rich') },
    { re: tagPair('CodeEditor'), html: daisyEditor(false, 'code'), jsx: daisyEditor(true, 'code') },
    { re: tagPair('OverflowMarquee'), html: daisyMarquee(false), jsx: daisyMarquee(true) },
    { re: tagPair('WashPanel'), html: daisyPanel(false), jsx: daisyPanel(true) },
    { re: tagPair('WashBackground'), html: daisyPanel(false), jsx: daisyPanel(true) },
    { re: tagPair('WashShell'), html: daisyPanel(false), jsx: daisyPanel(true) },
    {
      re: /<(?:CardBody|CardTitle|Card)\b[^>]*\/>|<(?:CardBody|CardTitle|Card)\b[^>]*>[\s\S]*?<\/(?:CardBody|CardTitle|Card)>/g,
      html: daisyCard(false),
      jsx: daisyCard(true),
    },
    { re: tagPair('Button'), html: daisyButton(false), jsx: daisyButton(true) },
    { re: tagPair('Alert'), html: daisyAlert(false), jsx: daisyAlert(true) },
    { re: tagPair('Input'), html: daisyInput(false), jsx: daisyInput(true) },
    { re: tagPair('ColorPickerWheel'), html: daisyPanel(false), jsx: daisyPanel(true) },
    { re: tagPair('FloatingPanel'), html: daisyPanel(false), jsx: daisyPanel(true) },
    { re: tagPair('ThemeSwitcher'), html: daisySelect(false), jsx: daisySelect(true) },
    { re: tagPair('WashUiBrand'), html: '<span class="font-display">Wash UI</span>', jsx: '<span className="font-display">Wash UI</span>' },
  ]
}

const EXPANDERS = buildExpanders()

function stripFrameworkImports(code: string): string {
  return code
    .replace(/^import\s+['"][^'"]*styles\.css['"]\s*;?\s*\n+/gm, '')
    .replace(/^import\s+\{[^}]*\}\s+from\s+['"]#plain[^'"]*['"]\s*;?\s*\n+/gm, '')
    .replace(
      /^import\s+\{[^}]*\}\s+from\s+['"]@menzies-mariesta-com\/menzies-design-wash-ui(?!\/icons)[^'"]*['"]\s*;?\s*\n+/gm,
      '',
    )
    .replace(/^import\s+type\s+\{[^}]*\}\s+from\s+['"]#plain[^'"]*['"]\s*;?\s*\n+/gm, '')
    .replace(
      /^import\s+\{[^}]*\}\s+from\s+['"]@menzies-mariesta-com\/menzies-design-wash-ui\/(?:charts|editors|react|theme|core)['"]\s*;?\s*\n+/gm,
      '',
    )
    .replace(/^\s*\n+/, '')
}

const COMPONENT_TAG_HINT =
  /<(?:CalendarMonth|WashCalendar|TimeClockDial|WashTimePicker|SearchSelect|Select|WashTooltip|DialogTemplate|Dialog|DataTable(?:Header|FooterBar|LegendsRow|ExportMenu)|RichTextEditor|CodeEditor|OverflowMarquee|WashPanel|WashBackground|WashShell|Card(?:Body|Title)?|Button|Alert|Input|ColorPickerWheel|FloatingPanel|ThemeSwitcher|WashUiBrand|(?:Line|Area|Bar|Column|Mixed|Radar|Pie|Donut|Sparkline|Treemap|Gantt|Wash)Chart)\b/

/**
 * Turn gallery snippet source into daisyUI class markup for HTML or JSX tabs.
 * Full paste kits (no component tags) pass through unchanged after import strip.
 */
export function expandToDaisyUiMarkup(
  code: string,
  mode: 'html' | 'jsx',
): string {
  let out = stripFrameworkImports(code)
  // Drop HTML comments that push the package/component paste path
  out = out.replace(
    /<!--\s*Prefer the React Select primitive[\s\S]*?-->\s*/gi,
    '',
  )
  out = out.replace(/<!--\s*Ghost trigger via[\s\S]*?-->\s*/gi, '')
  out = out.replace(/<!--\s*Paste into[\s\S]*?-->\s*/gi, '')
  out = out.replace(/<!--\s*Empty snippet:[\s\S]*?-->\s*/gi, '')
  out = out.replace(
    /<!--\s*DaisyUI paste markup[\s\S]*?-->\s*/gi,
    '',
  )

  // Already a full kit / daisyUI paste: do not replace with abbreviated stubs.
  if (!COMPONENT_TAG_HINT.test(out)) {
    return out.trim()
  }

  for (const { re, html, jsx } of EXPANDERS) {
    out = out.replace(re, mode === 'jsx' ? jsx : html)
  }

  if (/select-ghost/.test(code)) {
    out = out.replace(
      /select select-bordered w-full cursor-pointer justify-between/g,
      'select select-ghost w-full cursor-pointer justify-between',
    )
  }

  return out.trim()
}
