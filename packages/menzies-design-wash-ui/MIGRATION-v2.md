# MIGRATION v2.0

## Breaking changes

1. Wash UI `1.7.0+` ships the v2 architecture (ui-sdk peers, behaviours layer); semver stays on the `1.x` line.
2. React consumers must install `@ui-sdk/core` and `@ui-sdk/react`.
3. `styles.css` now declares `@layer ui-sdk;` and should be loaded once globally.

## Peer dependencies

Install peers in React apps:

```bash
npm i @ui-sdk/core @ui-sdk/react
```

## Core-first consumption

Non-React consumers should prefer:

- `@menzies-mariesta-com/menzies-design-wash-ui/styles.css`
- `@menzies-mariesta-com/menzies-design-wash-ui/core`

without importing the `react` entry.

## Initialization

Use `initWash` from the `core` entry to attach global behavior helpers:

```ts
import { initWash } from "@menzies-mariesta-com/menzies-design-wash-ui/core"

const runtime = initWash()
```

## Validation checklist

- [ ] `npm run test:lib`
- [ ] `npm run build:lib`
- [ ] `npm run build:demo`
- [ ] `npm run mcp:build`
