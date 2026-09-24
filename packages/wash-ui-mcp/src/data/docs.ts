export type DocSection = {
  id: string
  title: string
  content: string
  keywords: string[]
}

export const docSections: DocSection[] = [
  {
    id: 'install',
    title: 'Install',
    keywords: ['npm', 'install', 'peer', 'dependencies', 'github packages'],
    content: `Published to npm as @menzies-mariesta-com/menzies-design-wash-ui (registry.npmjs.org). No scoped .npmrc required for public installs.

Any framework:
npm i @menzies-mariesta-com/menzies-design-wash-ui

React apps also need:
npm i @menzies-mariesta-com/menzies-design-wash-ui react react-dom`,
  },
  {
    id: 'entrypoints',
    title: 'Entrypoints',
    keywords: ['import', 'exports', 'core', 'react', 'charts', 'editors', 'email', 'icons'],
    content: `@menzies-mariesta-com/menzies-design-wash-ui/styles.css - required stylesheet
@menzies-mariesta-com/menzies-design-wash-ui/core - framework-free: theme, ripple, initWash
@menzies-mariesta-com/menzies-design-wash-ui/react - React components and providers
@menzies-mariesta-com/menzies-design-wash-ui - React adapter alias (backward compatible)
@menzies-mariesta-com/menzies-design-wash-ui/theme - theme helpers only
@menzies-mariesta-com/menzies-design-wash-ui/icons - full Lucide UI icons + DynamicIcon / iconNames (React)
@menzies-mariesta-com/menzies-design-wash-ui/icons/brands - curated brand marks (Simple Icons inside Wash; do not import simple-icons in apps)
@menzies-mariesta-com/menzies-design-wash-ui/icons/brands/catalog - full brand catalog + BrandIcon by slug
@menzies-mariesta-com/menzies-design-wash-ui/charts - ApexCharts components (apexcharts bundled; no separate install)
@menzies-mariesta-com/menzies-design-wash-ui/editors - optional RichTextEditor + CodeEditor (grammar packs, not LSP; not on /react barrel)
@menzies-mariesta-com/menzies-design-wash-ui/email - transactional email builders`,
  },
  {
    id: 'vanilla',
    title: 'Vanilla / any framework',
    keywords: ['initWash', 'vanilla', 'svelte', 'vue', 'html classes'],
    content: `import '@menzies-mariesta-com/menzies-design-wash-ui/styles.css'
import { initWash, washRecipes } from '@menzies-mariesta-com/menzies-design-wash-ui/core'

const wash = initWash({ defaultPigment: 'mineral', defaultMode: 'light' })
// wash.destroy() on SPA teardown

Compose UI from documented HTML classes:
<div class="page-wash paper-grain wash-shell">
  <main class="wash-shell-main">
    <article class="wash-panel paper-grain">…</article>
  </main>
</div>
<button class="btn btn-primary ripple cursor-pointer">Save</button>
<table class="table table-zebra">...</table>`,
  },
  {
    id: 'react',
    title: 'React app',
    keywords: ['WashProvider', 'WashShell', 'react', 'components', 'full shell'],
    content: `import '@menzies-mariesta-com/menzies-design-wash-ui/styles.css'
import { WashProvider, WashShell, WashPanel, Button } from '@menzies-mariesta-com/menzies-design-wash-ui'

export function App() {
  return (
    <WashProvider defaultPigment="mineral" defaultMode="light">
      <WashShell>
        <WashPanel>
          <Button variant="primary">Save plate</Button>
        </WashPanel>
      </WashShell>
    </WashProvider>
  )
}

Full shell path: styles → WashProvider → WashShell → content.
WashPanel / wash-panel pad by default (1rem). Use flush / wash-panel-flush / data-flush for edge-to-edge layouts.`,
  },
  {
    id: 'theming',
    title: 'Theming',
    keywords: ['pigment', 'theme', 'dark', 'light', 'applyTheme', 'css variables'],
    content: `import { applyTheme, watercolorThemes } from '@menzies-mariesta-com/menzies-design-wash-ui/theme'

applyTheme('cerulean', 'dark')

CSS variables to override on :root:
--wash-a, --wash-b, --wash-c
--paper-fiber, --pigment-grain
--ink-muted, --ink-border
--ease-absorb, --shadow-paper-md
--font-display, --font-sans, --font-mono

Themes set data-theme on html (e.g. mineral or mineral-dark).`,
  },
  {
    id: 'tokens',
    title: 'Design tokens',
    keywords: ['tokens', 'wash', 'paper', 'ink', 'utility classes'],
    content: `Core tokens: --wash-a/b/c, --paper-fiber, --ink-muted, --ink-border

Utility classes:
wash-panel (default 1rem padding), wash-panel-flush / data-flush
wash-shell, wash-shell-main (page gutters + max-width)
paper-grain, soak-in
ripple on interactive hosts
label-ink for small caps labels
page-wash for page atmosphere (WashBackground / WashShell)

Ink borders: border-ink-border and side variants with opacity /0,/5..100
(including /10 and /15 hairlines). Uses pigment --ink-border via color-mix.

When the app also runs Tailwind, import styles.css with layer(components)
so Wash utilities do not override app responsive display classes
(e.g. hidden lg:flex).`,
  },
  {
    id: 'charts',
    title: 'Charts',
    keywords: ['apexcharts', 'analytics', 'WashChart', 'pigment'],
    content: `Import from @menzies-mariesta-com/menzies-design-wash-ui/charts (React) or charts/apex (Svelte / vanilla ApexCharts constructor).

apexcharts and react-apexcharts ship inside Wash (dependencies + bundled /charts and /charts/apex entries). No separate npm i apexcharts.

31 chart categories in the demo gallery. Components read Wash CSS tokens and update on pigment/mode changes.

React: <LineChart height={300} categories={['Mon','Tue']} series={[{ name: 'Washes', data: [12,18,14] }]} />
Svelte: dynamic-import charts/apex in onMount and new ApexCharts(host, options).

Theme utilities: buildWashApexOptions, useWashChartTheme, subscribeWashChartTheme
Specialized: SyncedCharts, BrushChart, ZoomableTimeSeriesChart, RealtimeLineChart`,
  },
  {
    id: 'email',
    title: 'Email',
    keywords: ['otp', 'transactional', 'html email'],
    content: `import { buildOtpVerificationEmail, WASH_EMAIL_COLORS } from '@menzies-mariesta-com/menzies-design-wash-ui/email'

const { subject, html, text } = buildOtpVerificationEmail({
  code: '482913',
  recipientName: 'Studio artist',
  pigment: 'cerulean',
})`,
  },
  {
    id: 'accessibility',
    title: 'Accessibility',
    keywords: ['a11y', 'keyboard', 'focus', 'aria', 'reduced motion'],
    content: `Interactive React exports include keyboard support, focus management for overlays, and live regions for toasts/loading.
Core exports trapFocus and createLiveAnnouncer for vanilla overlays.
Respect prefers-reduced-motion.`,
  },
  {
    id: 'mcp',
    title: 'MCP server',
    keywords: ['mcp', 'cursor', 'claude', 'ai', 'model context protocol'],
    content: `MCP server published to npm (registry.npmjs.org):

Web: @menzies-mariesta-com/wash-ui-mcp (Cursor server name wash-ui-web)

Preferred Cursor mcp.json (any repo):
npx -y @menzies-mariesta-com/wash-ui-mcp@1.3.0

No GitHub Packages .npmrc required for public npx installs.

Web tools: list_components, search_components, get_component_docs, list_chart_types, get_theme_tokens, list_pigment_themes, get_theme_css, get_icon_usage, get_usage_snippet, get_install_guide, search_docs

Monorepo contributors (optional): npm run mcp:build then node packages/wash-ui-mcp/dist/index.js`,
  },
  {
    id: 'editors',
    title: 'Editors (from scratch)',
    keywords: [
      'code editor',
      'rich text',
      'lsp',
      'language pack',
      'monaco',
      'typescript',
      'python',
      'template-rich-text',
      'template-code-editor',
    ],
    content: `Import from @menzies-mariesta-com/menzies-design-wash-ui/editors (not on /react).

CodeEditor is from-scratch (no Monaco/CodeMirror) and is NOT real LSP.
Languages are manageable in-package grammar packs under components/editor/languages:
typescript, javascript, json, css, html, markdown, plaintext, yaml, toml, xml, sql, graphql, shell, python, go, rust, java, c, cpp, kotlin, svelte, vue.

Helpers: listLanguages(), getLanguagePack(id), resolveLanguageFromFileName(name).

Features: multi-tab, language select, find/replace, go-to-line, undo/redo, indent, line/block comment, bracket pairing, soft wrap, keyword/snippet completions, light diagnostics.

Demo: Templates → Rich text and Templates → Code editor.`,
  },
  {
    id: 'demo',
    title: 'Demo gallery',
    keywords: ['demo', 'gallery', 'components', 'templates', 'plain', 'paste'],
    content: `Monorepo demo app (apps/demo):
115 component pages
31 chart category pages
10 template pages
5 documentation pages (including MCP server)

Gallery paste path: ShowcaseTabs HTML/JSX/Svelte show daisyUI class markup only (no Wash or #plain component props). Live previews may still mount demo-local reference modules under apps/demo/src/plain. The published npm package (@menzies-mariesta-com/menzies-design-wash-ui) remains the maintained consumer API.

Run: npm run dev from repo root`,
  },
  {
    id: 'data-table',
    title: 'Data table template',
    keywords: [
      'crud',
      'datagrid',
      'paginator',
      'legend',
      'per page',
      'Showing',
      'TableShell',
      'DataTableHeader',
      'DataTableExportMenu',
      'export',
      'csv',
      'excel',
      'ods',
      'resolveColumnLegends',
    ],
    content: `Demo: Templates → Data table.

Chrome layout:
1. Header section: DataTableHeader (bold title + optional muted description; actions slot for Export, Refresh, Add side by side)
2. Thead row 1: column headers; thead row 2: per-column filters
3. Body scroll only (sticky thead); zebra striping via table table-zebra (no tbody row hover tint)
4. Outer chrome uses washRecipes.tableChrome (lift + primary wash on hover / focus-within). Body rows use opaque zebra and do not change color on row hover (wash-table-chrome CSS).
5. Footer bar (grid 1fr auto 1fr on sm+): Per page on the left; Showing X-Y of Z centered (hidden below sm); join paginator on the right (optional controls after paginator; toolbar lives in the header)
6. Legends row under the footer (optional, top border divider): only columns marked with legend; content centered

Export:
- Place <DataTableExportMenu onExport={…} /> in DataTableHeader actions with Refresh and Add beside it (order: Export, Refresh, Add). Gap between actions is gap-0.5; buttons use btn-sm.
- Click / focus opens formats (dropdown-no-hover); icon tooltip shows while closed and hides while open. wash-dropdown-contained keeps the menu from unlocking rounded chrome overflow.
- Export the filtered row set (all matching rows across pages), not the unfiltered dataset and not only the current page.
- Disable when filtered length is 0; show exporting busy state while generating the file.

Legends API:
import {
  resolveColumnLegends,
  DataTableHeader,
  DataTableExportMenu,
  DataTableLegendsRow,
  DataTableFooterBar,
  type DataTableColumnDef,
} from '@menzies-mariesta-com/menzies-design-wash-ui'

const columns: DataTableColumnDef[] = [
  { id: 'name', header: 'Name' },
  { id: 'tags', header: 'Tags', legend: true },
  { id: 'status', header: 'Status', legend: { swatch: 'bg-primary' } },
]
const legends = resolveColumnLegends(columns)
// Only marked columns appear in <DataTableLegendsRow legends={legends} />

<DataTableHeader
  title="Studio plates"
  description="Plate ledger for wash studio work"
  actions={
    <>
      <DataTableExportMenu onExport={(format) => exportFiltered(format)} />
      {/* Refresh + Add icon buttons beside Export */}
    </>
  }
/>

Per page Auto uses ResizeObserver on the body pane; fixed sizes (5/10/25/50) override it.
Range text uses a regular hyphen: Showing 1-5 of 10.`,
  },
  {
    id: 'dropdown-placement',
    title: 'Space aware dropdown behaviour',
    keywords: [
      'dropdown',
      'placement',
      'space',
      'aware',
      'dropdown-top',
      'dropdown-bottom',
      'dropdown-end',
      'SearchSelect',
      'measureDropdownPlacement',
      'viewport',
      'flip',
    ],
    content: `Wash menus measure free space with measureDropdownPlacement / useDropdownPlacement.

Rules:
1. Prefer bottom (dropdown-bottom) when space below meets a minimum height.
2. Flip to dropdown-top when below is tight and above has more room.
3. Use dropdown-end near the right edge.
4. Cap panel maxHeight to the chosen side so the list scrolls inside the viewport.

React:
import { Select, SearchSelect, useDropdownPlacement, useDetailsDropdownPlacement } from '@menzies-mariesta-com/menzies-design-wash-ui'

Select, SearchSelect, and ThemeSwitcher use placement automatically. Data table date filters use useDetailsDropdownPlacement (absolute daisyUI dropdown-content from the trigger; wash-allow-dropdown-overflow unlocks header overflow while open).

Demo: behaviour-auto-dropdown (Space aware dropdown), select, and search-select.`,
  },
  {
    id: 'dropdown-on-hover',
    title: 'Dropdown on hover behaviour',
    keywords: [
      'dropdown',
      'hover',
      'dropdown-hover',
      'dropdown-no-hover',
      'pointer',
      'menu',
      'useDetailsDropdownPlacement',
    ],
    content: `Wash menu dropdowns open on hover for fine pointers (Wash CSS on .dropdown; details menus via useDetailsDropdownPlacement). Close delay ~200ms so the pointer can reach the panel; short opacity/scale fade (honors prefers-reduced-motion). Touch keeps focus/tap. Opt out typeaheads with dropdown-no-hover (SearchSelect does this).

Demo: behaviour-dropdown-on-hover and dropdown. Select and SearchSelect use dropdown-no-hover (click to open).`,
  },
  {
    id: 'calendar',
    title: 'WashCalendar',
    keywords: [
      'calendar',
      'date',
      'time',
      'datetime',
      'range',
      'multi',
      'month',
      'year',
      'WashCalendar',
      'includeTime',
      'select',
      'template',
    ],
    content: `Published package API (npm consumers):

import { WashCalendar } from '@menzies-mariesta-com/menzies-design-wash-ui'

<WashCalendar mode="single" value={iso} onChange={setIso} />
<WashCalendar mode="single" includeTime value="YYYY-MM-DDTHH:mm:ss" onChange={…} />
<WashCalendar mode="range" value="YYYY-MM-DD/YYYY-MM-DD" onChange={…} />
<WashCalendar mode="multi" value="YYYY-MM-DD YYYY-MM-DD" onChange={…} />

Demo gallery paste path: CalendarMonth / TimeClockDial from #plain (apps/demo/src/plain). Showcase HTML/JSX tabs show that plain source; package APIs above remain for apps that depend on the published library.

Native Wash month calendar (no Cally). Month and year daisyUI details dropdowns in the header, plus single / range / multi modes. Optional time footer via includeTime (single mode only).

Props: min, max, isDateDisallowed, markedDates, getDayMeta, showOutsideDays, firstDayOfWeek, size ("md"|"sm"), bordered (false inside popovers), maxYears, includeTime (single only; value YYYY-MM-DDTHH:mm:ss), defaultTime ("09:00:00"), timeStep (unused; kept for compatibility).

When includeTime is true, a Material-style analog clock picker opens (hour / minute / second views with three hands). Click or drag the dial; minutes and seconds are every value 0-59 (not 5-minute steps). Value shape is YYYY-MM-DDTHH:mm:ss. Day selection keeps the current time; changing time keeps the selected day. Today sets today plus the current local clock. includeTime is ignored for range and multi.

Keyboard: arrows move focus; Enter/Space selects; Escape clears a tentative range.

Demo template: calendar. Also used by date-time fields and data-table date filters.`,
  },
  {
    id: 'time-picker',
    title: 'WashTimePicker',
    keywords: [
      'time',
      'clock',
      'picker',
      'analog',
      'hour',
      'minute',
      'second',
      'WashTimePicker',
    ],
    content: `Analog clock time picker shared by WashCalendar includeTime and the date-time gallery.

import { WashTimePicker } from '@menzies-mariesta-com/menzies-design-wash-ui'

<WashTimePicker value={time} onChange={setTime} />
<WashTimePicker size="sm" triggerClassName="input-primary" />

Value is HH:mm:ss (HH:mm accepted and normalized). Dial flow: hour → minute → second. The hour face is always a dual-ring 24-hour clock (outer 0-11, inner 12-23) so morning and afternoon can be picked on the dial; 12-hour locales also show an AM/PM toggle that stays in sync with the dial and with WashCalendar includeTime. Minutes and seconds are every 0-59. Three hands stay visible; active unit is emphasized.

Demo: date-time.`,
  },
]

export function searchDocs(query: string): DocSection[] {
  const q = query.toLowerCase().trim()
  if (!q) return docSections
  const tokens = q.split(/\s+/).filter(Boolean)

  return docSections.filter((s) => {
    const haystack = [s.id, s.title, s.content, ...s.keywords].join(' ').toLowerCase()
    return tokens.every((t) => haystack.includes(t))
  })
}
