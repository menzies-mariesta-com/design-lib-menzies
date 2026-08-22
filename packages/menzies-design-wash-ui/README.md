# Menzies Design Wash UI

Framework-free pigment themes, brush atmosphere, CSS utilities, and DOM helpers. Optional React adapter for components, hooks, ApexCharts analytics, and transactional email builders.

**Package name:** `@menzies-mariesta-com/menzies-design-wash-ui`

## Install

Published to [GitHub Packages](https://npm.pkg.github.com). Point the scope at the registry (project `.npmrc`):

```ini
@menzies-mariesta-com:registry=https://npm.pkg.github.com
```

```bash
# Any framework (vanilla, Vue, Svelte, etc.)
npm i @menzies-mariesta-com/menzies-design-wash-ui

# React apps also need peer dependencies
npm i @menzies-mariesta-com/menzies-design-wash-ui react react-dom
```

## Vanilla / any framework

Import the stylesheet and core APIs. Compose UI from documented HTML classes (see the demo Components gallery).

```html
<link rel="stylesheet" href="/node_modules/@menzies-mariesta-com/menzies-design-wash-ui/dist/styles.css" />
```

```js
import '@menzies-mariesta-com/menzies-design-wash-ui/styles.css'
import {
  initWash,
  applyTheme,
  applyBrushPreset,
  attachGlobalRipple,
  washRecipes,
} from '@menzies-mariesta-com/menzies-design-wash-ui/core'

// Boot once: theme, brush, ripple, smart tooltips
const wash = initWash({ defaultPigment: 'mineral', defaultMode: 'light' })

// Or wire pieces manually
applyTheme('cerulean', 'dark')
applyBrushPreset('cloud-mop')
attachGlobalRipple()
```

```html
<button class="btn btn-primary ripple cursor-pointer">Save plate</button>
<table class="table table-zebra [&_tbody_tr]:hover:bg-primary/40">…</table>
```

Use `washRecipes` for stable class strings shared with the React adapter:

```js
import { washRecipes } from '@menzies-mariesta-com/menzies-design-wash-ui/core'

element.className = washRecipes.btnRipple
```

## React (default entry)

Backward-compatible main import. Same as `@menzies-mariesta-com/menzies-design-wash-ui/react`.

```tsx
import '@menzies-mariesta-com/menzies-design-wash-ui/styles.css'
import { WashProvider, Button } from '@menzies-mariesta-com/menzies-design-wash-ui'
// or explicitly:
// import { WashProvider, Button } from '@menzies-mariesta-com/menzies-design-wash-ui/react'

export function App() {
  return (
    <WashProvider defaultPigment="mineral" defaultMode="light">
      <Button variant="primary">Save plate</Button>
    </WashProvider>
  )
}
```

## Entrypoints

| Import | Use |
|--------|-----|
| `@menzies-mariesta-com/menzies-design-wash-ui/styles.css` | Required stylesheet (tokens, pigments, utilities) |
| `@menzies-mariesta-com/menzies-design-wash-ui/core` | Framework-free: theme, brush, ripple, tooltips, recipes, `initWash` |
| `@menzies-mariesta-com/menzies-design-wash-ui/react` | React components, provider, hooks |
| `@menzies-mariesta-com/menzies-design-wash-ui` | React adapter (alias of `/react`, backward compatible) |
| `@menzies-mariesta-com/menzies-design-wash-ui/theme` | Theme helpers only |
| `@menzies-mariesta-com/menzies-design-wash-ui/brush` | Brush helpers only |
| `@menzies-mariesta-com/menzies-design-wash-ui/icons` | UI icons (React, tree-shakeable, Lucide-based) |
| `@menzies-mariesta-com/menzies-design-wash-ui/icons/brands` | Brand marks (React, tree-shakeable, Simple Icons) |
| `@menzies-mariesta-com/menzies-design-wash-ui/charts` | Pigment-aware ApexCharts components and theme helpers |
| `@menzies-mariesta-com/menzies-design-wash-ui/email` | Transactional email HTML builders and pigment-aware colors |

## Charts (React)

Import from `@menzies-mariesta-com/menzies-design-wash-ui/charts` for pigment-aware analytics built on ApexCharts. Components read Wash CSS tokens and update when pigment or mode changes.

The demo gallery covers **31 chart categories** (line, area, range area, slope, column, bar, mixed, timeline, pie, radial bar, polar area, gauge, sparklines, dashboards, heatmap, treemap, sunburst, scatter, bubble, funnel, radar, box plot, violin, beeswarm, waffle, candlestick, histogram, custom series, interactivity, narrative, and unit charts).

```tsx
import '@menzies-mariesta-com/menzies-design-wash-ui/styles.css'
import {
  WashChart,
  LineChart,
  AreaChart,
  BarChart,
  ColumnChart,
  PieChart,
  DonutChart,
  SparklineChart,
  HeatmapChart,
  TreemapChart,
  SunburstChart,
  BoxPlotChart,
  ViolinChart,
  CandlestickChart,
  HistogramChart,
  SyncedCharts,
  useWashChartTheme,
} from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<LineChart
  height={300}
  categories={['Mon', 'Tue', 'Wed']}
  series={[{ name: 'Washes', data: [12, 18, 14] }]}
/>

<SparklineChart data={[12, 18, 14, 22, 19]} height={44} />
```

Use `WashChart` for full control over chart type and options. Typed helpers apply Wash defaults for common layouts. Theme utilities (`buildWashApexOptions`, `useWashChartTheme`, `subscribeWashChartTheme`) keep charts in sync with pigment changes.

Specialized variants include synced chart groups, brush/zoom time series, realtime lines, downsampled series, and annotation helpers.

## Email

Import from `@menzies-mariesta-com/menzies-design-wash-ui/email` for pigment-aware transactional HTML.

```ts
import {
  buildOtpVerificationEmail,
  OTP_VERIFICATION_EMAIL_SAMPLE,
  WASH_EMAIL_COLORS,
} from '@menzies-mariesta-com/menzies-design-wash-ui/email'

const { subject, html, text } = buildOtpVerificationEmail({
  code: '482913',
  recipientName: 'Studio artist',
  pigment: 'cerulean',
})
```

See the demo **Templates > Auth > OTP email** page for a live preview.

## Customize

- **Pigment:** `applyTheme('cerulean', 'dark')` or React `useWash().setPigment`
- **Brush:** `applyBrushPreset('cloud-mop')` or CSS vars `--brush-*` on `:root`
- **Tokens:** override `--wash-a`, `--wash-b`, `--wash-c`, `--ink-muted`, `--ink-border`, `--paper-fiber`
- **Components:** prefer props + documented CSS variables on each gallery page in the demo site

## Demo gallery

The monorepo demo app (`apps/demo`) ships a full gallery:

- **115** component pages (alphabetized sidebar)
- **31** chart category pages plus overview
- **10** template pages (Auth, Commerce, Data, Studio, Layout groups)
- **5** in-app documentation pages

Run from the repo root: `npm run dev`

## Accessibility

Interactive React exports ship with keyboard support, focus management for overlays, and live regions for toasts and loading. Core exports `trapFocus` and `createLiveAnnouncer` for vanilla overlays. Respect `prefers-reduced-motion`.

## License

This package is licensed under the [GNU General Public License v3.0 or later](../../LICENSE) (GPL-3.0-or-later).
