# Wash UI v2 architecture

Wash UI v2 is split into three layers.

## 1) Framework-agnostic base

- `@menzies-mariesta-com/menzies-design-wash-ui/styles.css`
- `@menzies-mariesta-com/menzies-design-wash-ui/core`
- `@menzies-mariesta-com/menzies-design-wash-ui/theme`

This layer is designed for vanilla HTML, SvelteKit, Vue, Astro, and any stack
that can consume CSS and ESM.

## 2) Optional React adapter

- `@menzies-mariesta-com/menzies-design-wash-ui/react`

The React adapter composes Wash primitives and components with `@ui-sdk/react`.
`@ui-sdk/core` and `@ui-sdk/react` are peer dependencies so they are never
bundled into the published package.

## 3) Recipe-first composition

- `washRecipes` from `core`
- behavioral helpers under `core`

Recipes keep class contracts stable while behavior helpers remain framework
neutral and testable.

## Install paths

### Core + styles only

```bash
npm i @menzies-mariesta-com/menzies-design-wash-ui
```

```ts
import "@menzies-mariesta-com/menzies-design-wash-ui/styles.css"
import { initWash, washRecipes } from "@menzies-mariesta-com/menzies-design-wash-ui/core"
```

### React adapter

```bash
npm i @menzies-mariesta-com/menzies-design-wash-ui @ui-sdk/core @ui-sdk/react
```

```ts
import "@menzies-mariesta-com/menzies-design-wash-ui/styles.css"
import { WashProvider } from "@menzies-mariesta-com/menzies-design-wash-ui/react"
```
