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
    content: `Published to GitHub Packages as @menzies-mariesta-com/menzies-design-wash-ui.

.npmrc:
@menzies-mariesta-com:registry=https://npm.pkg.github.com

Any framework:
npm i @menzies-mariesta-com/menzies-design-wash-ui

React apps also need:
npm i @menzies-mariesta-com/menzies-design-wash-ui react react-dom`,
  },
  {
    id: 'entrypoints',
    title: 'Entrypoints',
    keywords: ['import', 'exports', 'core', 'react', 'charts', 'email', 'icons'],
    content: `@menzies-mariesta-com/menzies-design-wash-ui/styles.css - required stylesheet
@menzies-mariesta-com/menzies-design-wash-ui/core - framework-free: theme, ripple, initWash
@menzies-mariesta-com/menzies-design-wash-ui/react - React components and providers
@menzies-mariesta-com/menzies-design-wash-ui - React adapter alias (backward compatible)
@menzies-mariesta-com/menzies-design-wash-ui/theme - theme helpers only
@menzies-mariesta-com/menzies-design-wash-ui/icons - full Lucide UI icons + DynamicIcon / iconNames (React)
@menzies-mariesta-com/menzies-design-wash-ui/icons/brands - curated brand marks (Simple Icons inside Wash; do not import simple-icons in apps)
@menzies-mariesta-com/menzies-design-wash-ui/icons/brands/catalog - full brand catalog + BrandIcon by slug
@menzies-mariesta-com/menzies-design-wash-ui/charts - ApexCharts components
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
<table class="table table-zebra [&_tbody_tr]:hover:bg-primary/40">...</table>`,
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
page-wash for page atmosphere (WashBackground / WashShell)`,
  },
  {
    id: 'charts',
    title: 'Charts',
    keywords: ['apexcharts', 'analytics', 'WashChart', 'pigment'],
    content: `Import from @menzies-mariesta-com/menzies-design-wash-ui/charts

31 chart categories in the demo gallery. Components read Wash CSS tokens and update on pigment/mode changes.

<LineChart height={300} categories={['Mon','Tue']} series={[{ name: 'Washes', data: [12,18,14] }]} />

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
    content: `Two MCP servers published to GitHub Packages:

Web: @menzies-mariesta-com/wash-ui-mcp (Cursor server name wash-ui-web)
Android: @menzies-mariesta-com/wash-compose-mcp (Cursor server name wash-compose-android)

Preferred Cursor mcp.json (any repo):
npx -y @menzies-mariesta-com/wash-ui-mcp@1.0.2
npx -y @menzies-mariesta-com/wash-compose-mcp@1.0.2

Requires .npmrc: @menzies-mariesta-com:registry=https://npm.pkg.github.com

Web tools: list_components, search_components, get_component_docs, list_chart_types, get_theme_tokens, list_pigment_themes, get_theme_css, get_icon_usage, get_usage_snippet, get_install_guide, search_docs

Monorepo contributors (optional): npm run mcp:build:all then node packages/wash-ui-mcp/dist/index.js`,
  },
  {
    id: 'demo',
    title: 'Demo gallery',
    keywords: ['demo', 'gallery', 'components', 'templates'],
    content: `Monorepo demo app (apps/demo):
115 component pages
31 chart category pages
10 template pages
5 documentation pages (including MCP server)

Run: npm run dev from repo root`,
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
