# Menzies Design Wash UI

Framework-free pigment themes, CSS utilities, and DOM helpers. Optional React adapter for components, hooks, ApexCharts analytics, and transactional email builders.

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

Import the stylesheet and core APIs. Compose UI from documented HTML classes (see the demo Components gallery). **`styles.css` is gallery-complete:** daisyUI component classes used in the demo (`.btn`, `.fab`, `.fieldset`, `.avatar`, `.dock`, `.chat`, `.carousel`, `.file-input`, `.radial-progress`, and peers) ship in the published CSS. Svelte and other class-name consumers do not need a separate daisyUI Tailwind plugin for those styles. Pagination in the gallery is daisyUI `join` + `btn` (there is no `.pagination` class). Mockups use `.mockup-browser` / `.mockup-code` / `.mockup-phone` / `.mockup-window`.

```html
<link rel="stylesheet" href="/node_modules/@menzies-mariesta-com/menzies-design-wash-ui/dist/styles.css" />
```

```js
import '@menzies-mariesta-com/menzies-design-wash-ui/styles.css'
import {
  initWash,
  applyTheme,
  attachGlobalRipple,
  washRecipes,
} from '@menzies-mariesta-com/menzies-design-wash-ui/core'

// Boot once: theme, ripple, smart tooltips, overflow hover marquee
const wash = initWash({ defaultPigment: 'mineral', defaultMode: 'light' })

// Or wire pieces manually
applyTheme('cerulean', 'dark')
attachGlobalRipple()
```

### With your own Tailwind (SvelteKit, Vite, etc.)

Wash `styles.css` already includes a compiled Tailwind utilities layer. If the app also runs Tailwind, import Wash inside `@layer components` so app utilities keep correct cascade (for example `hidden lg:flex` must not lose to Wash's plain `.hidden`):

```css
@import 'tailwindcss';
@import '@menzies-mariesta-com/menzies-design-wash-ui/styles.css' layer(components);
```

Wash already restores daisyUI accordion `.collapse` visibility when layered under components (so Tailwind's `visibility: collapse` utility does not hide panels). No app-side override is required.

Do not import Wash as an unlayered stylesheet after app Tailwind, or display utilities from Wash can override responsive variants.

### Ink border hairlines

`--color-ink-border` (from `--ink-border`) ships with a full opacity scale in `styles.css`: `border-ink-border`, side variants (`border-t-ink-border`, …), and `/0` `/5` … `/100` (including soft hairlines `/10` and `/15`). Values use `color-mix` against the pigment token, not `currentColor`.

```html
<header class="border-b border-ink-border/15">…</header>
<footer class="border-t border-ink-border/10">…</footer>
```

```html
<button class="btn btn-primary ripple cursor-pointer">Save plate</button>
<div class="page-wash paper-grain wash-shell">
  <main class="wash-shell-main">
    <article class="wash-panel paper-grain">Content sits padded by default.</article>
  </main>
</div>
<table class="table table-zebra">…</table>
<p class="truncate max-w-[12rem]">Long sidebar label marquees on hover when clipped</p>
```

### Overflow hover marquee

Truncated / line-clamped text stays ellipsized until hover or keyboard focus. Then a looping marquee shows the full string. Non-overflowing text never animates. Decorative always-on `.marquee` bands are separate.

- Auto: `initWash` / `WashProvider` call `attachOverflowMarquee()` for `.truncate`, `[class*="line-clamp-"]`, and `[data-overflow-marquee]`
- Explicit React: `<OverflowMarquee>…</OverflowMarquee>`
- Opt out: `.no-overflow-marquee` (also skips inputs, textareas, contenteditable, Wash editors)
- `prefers-reduced-motion: reduce`: expand / `title` instead of infinite scroll

```tsx
import { OverflowMarquee } from '@menzies-mariesta-com/menzies-design-wash-ui'

<div className="max-w-[11rem]">
  <OverflowMarquee className="text-sm">
    Wet-on-wet bloom edges need a clean sponge and patience
  </OverflowMarquee>
</div>
```

Use `washRecipes` for stable class strings shared with the React adapter:

```js
import { washRecipes } from '@menzies-mariesta-com/menzies-design-wash-ui/core'

element.className = washRecipes.btnRipple
```

## React (default entry)

Backward-compatible main import. Same as `@menzies-mariesta-com/menzies-design-wash-ui/react`.

Recommended path: styles → `WashProvider` → **`WashShell`** → content. The shell ships atmosphere, page gutters, and a content max-width so you do not copy demo padding classes.

```tsx
import '@menzies-mariesta-com/menzies-design-wash-ui/styles.css'
import {
  WashProvider,
  WashShell,
  WashPanel,
  Button,
} from '@menzies-mariesta-com/menzies-design-wash-ui'

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
```

`WashPanel` / `wash-panel` include `1rem` padding by default (Compose parity). Use `flush` / `wash-panel-flush` / `data-flush` for edge-to-edge headers or dense grids.

Vanilla shell classes (no React): `washRecipes.washShell` on the root and `washRecipes.washShellMain` on `<main>`.

## Editors (React, from scratch, optional)

Import from `@menzies-mariesta-com/menzies-design-wash-ui/editors` only when you need them. They are **not** on the default `/react` barrel, so unused apps do not pull editor JS into the main React chunk. No TipTap, Lexical, Monaco, or CodeMirror. Editor chrome CSS (`.wash-rte`, `.wash-code-editor`) stays in `styles.css` (small; OK for all web consumers).

**Code editor is not LSP.** Languages ship as in-package **grammar packs** (tokenize, comments, keywords/snippets, light validators). IDE chrome (find/replace, go-to-line, undo/redo, completions, diagnostics gutter, multi-tab) runs from scratch on a textarea + highlight overlay.

```tsx
import {
  RichTextEditor,
  CodeEditor,
  listLanguages,
  resolveLanguageFromFileName,
  sanitizeRichHtml,
} from '@menzies-mariesta-com/menzies-design-wash-ui/editors'

<RichTextEditor value={html} onChange={setHtml} placeholder="Write…" />
<CodeEditor
  language="typescript"
  fileName="main.ts"
  value={source}
  onChange={setSource}
/>

// Manageable registry
listLanguages().map((pack) => pack.id)
resolveLanguageFromFileName('App.svelte') // => 'svelte'
```

Broad IDE packs (add/edit under `src/components/editor/languages/`): TypeScript, JavaScript, JSON, CSS, HTML, Markdown, plain text, YAML, TOML, XML, SQL, GraphQL, Shell, Python, Go, Rust, Java, C, C++, Kotlin, Svelte, Vue.

Rich text: toolbar formatting, lists, links, undo/redo, paste sanitize, shortcuts. Code editor: multi-tab, language picker, gutter + diagnostics, find/replace, go-to-line, comment toggle, bracket pairing, soft wrap, keyword/snippet completions. See the demo Templates → **Rich text** and Templates → **Code editor** pages.

## Entrypoints

| Import | Use |
|--------|-----|
| `@menzies-mariesta-com/menzies-design-wash-ui/styles.css` | Required stylesheet (tokens, pigments, full daisyUI/Wash component classes, utilities, default fonts) |
| `@menzies-mariesta-com/menzies-design-wash-ui/core` | Framework-free: theme, ripple, tooltips, overflow marquee, recipes, `initWash` |
| `@menzies-mariesta-com/menzies-design-wash-ui/react` | React components, provider, hooks |
| `@menzies-mariesta-com/menzies-design-wash-ui` | React adapter (alias of `/react`, backward compatible) |
| `@menzies-mariesta-com/menzies-design-wash-ui/theme` | Theme helpers only |
| `@menzies-mariesta-com/menzies-design-wash-ui/icons` | Full Lucide set + `DynamicIcon` / `iconNames` (React; lucide-react 1.28.0 inside Wash) |
| `@menzies-mariesta-com/menzies-design-wash-ui/icons/brands` | Curated named brands (Simple Icons inside Wash) |
| `@menzies-mariesta-com/menzies-design-wash-ui/icons/brands/catalog` | Full catalog + `BrandIcon` / `brandCatalog` / `getBrand` |
| `@menzies-mariesta-com/menzies-design-wash-ui/charts` | Pigment-aware ApexCharts components (apexcharts bundled; no separate install) |
| `@menzies-mariesta-com/menzies-design-wash-ui/editors` | Optional `RichTextEditor`, `CodeEditor`, sanitize helpers (web React only) |
| `@menzies-mariesta-com/menzies-design-wash-ui/email` | Transactional email HTML builders and pigment-aware colors |

## Charts (React)

Import from `@menzies-mariesta-com/menzies-design-wash-ui/charts` for pigment-aware analytics built on ApexCharts. Components read Wash CSS tokens and update when pigment or mode changes. `apexcharts` and `react-apexcharts` ship as Wash dependencies (and are bundled into the `/charts` entry); apps do not need a separate `npm i apexcharts`.

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

## Icons

One package covers Lucide UI icons and Simple Icons brands. Import from Wash only; `lucide-react` (1.28.0) and `simple-icons` stay internal dependencies.

```tsx
import {
  Palette,
  DynamicIcon,
  iconNames,
} from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import { GitHub } from '@menzies-mariesta-com/menzies-design-wash-ui/icons/brands'
import {
  BrandIcon,
  brandCatalog,
} from '@menzies-mariesta-com/menzies-design-wash-ui/icons/brands/catalog'

<Palette className="size-5" strokeWidth={1.75} aria-hidden="true" />
<DynamicIcon name="heart" className="size-5" strokeWidth={1.75} />

<GitHub size={24} title="GitHub" />
<BrandIcon slug="discord" size={24} />
```

Use named exports for static icons (tree-shakeable). Use `DynamicIcon` + `iconNames` or `BrandIcon` + `brandCatalog` for pickers and full catalogs.

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

## Fonts

`styles.css` embeds the Wash default typefaces as latin **woff2** with `font-display: swap`. No separate Fontsource install is required for the library look.

| Role | Family | Weights |
|------|--------|---------|
| Display (`--font-display`, `.font-display`) | Fraunces | 500, 600, 700 |
| UI / sans / mono (`--font-sans`, `--font-mono`) | Maple Mono | 400, 500, 600, 700 |

Font files resolve next to the stylesheet (`dist/assets/*.woff2`). Both faces are SIL OFL 1.1; see package `NOTICE` and `dist/fonts/*/OFL.txt`.

## Customize

- **Pigment:** `applyTheme('cerulean', 'dark')` or React `useWash().setPigment`
- **Tokens:** override `--wash-a`, `--wash-b`, `--wash-c`, `--ink-muted`, `--ink-border`, `--paper-fiber`
- **Hairlines:** prefer `border-ink-border/10` or `/15` (full `/0`–`/100` scale ships in `styles.css`)
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

Bundled Fraunces and Maple Mono font files are licensed under the SIL Open Font License 1.1. See [NOTICE](./NOTICE) and `dist/fonts/*/OFL.txt`.
