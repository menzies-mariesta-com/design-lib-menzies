# Menzies Design Wash UI

Framework-free pigment themes, brush atmosphere, CSS utilities, and DOM helpers. Optional React adapter for components and hooks.

## Install

```bash
# Any framework (vanilla, Vue, Svelte, etc.)
npm i menzies-design-wash-ui

# React apps also need peer dependencies
npm i menzies-design-wash-ui react react-dom
```

## Vanilla / any framework

Import the stylesheet and core APIs. Compose UI from documented HTML classes (see demo gallery).

```html
<link rel="stylesheet" href="/node_modules/menzies-design-wash-ui/dist/styles.css" />
```

```js
import 'menzies-design-wash-ui/styles.css'
import {
  initWash,
  applyTheme,
  applyBrushPreset,
  attachGlobalRipple,
  washRecipes,
} from 'menzies-design-wash-ui/core'

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
import { washRecipes } from 'menzies-design-wash-ui/core'

element.className = washRecipes.btnRipple
```

## React (default entry)

Backward-compatible main import. Same as `menzies-design-wash-ui/react`.

```tsx
import 'menzies-design-wash-ui/styles.css'
import { WashProvider, Button } from 'menzies-design-wash-ui'
// or explicitly:
// import { WashProvider, Button } from 'menzies-design-wash-ui/react'

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
| `menzies-design-wash-ui/styles.css` | Required stylesheet (tokens, pigments, utilities) |
| `menzies-design-wash-ui/core` | Framework-free: theme, brush, ripple, tooltips, recipes, `initWash` |
| `menzies-design-wash-ui/react` | React components, provider, hooks |
| `menzies-design-wash-ui` | React adapter (alias of `/react`, backward compatible) |
| `menzies-design-wash-ui/theme` | Theme helpers only |
| `menzies-design-wash-ui/brush` | Brush helpers only |
| `menzies-design-wash-ui/icons` | UI icons (React, tree-shakeable) |
| `menzies-design-wash-ui/icons/brands` | Brand marks (React, tree-shakeable) |

## Customize

- **Pigment:** `applyTheme('cerulean', 'dark')` or React `useWash().setPigment`
- **Brush:** `applyBrushPreset('cloud-mop')` or CSS vars `--brush-*` on `:root`
- **Tokens:** override `--wash-a`, `--wash-b`, `--wash-c`, `--ink-muted`, `--ink-border`, `--paper-fiber`
- **Components:** prefer props + documented CSS variables on each docs page in the demo site

## Accessibility

Interactive React exports ship with keyboard support, focus management for overlays, and live regions for toasts and loading. Core exports `trapFocus` and `createLiveAnnouncer` for vanilla overlays. Respect `prefers-reduced-motion`.

## License

MIT
