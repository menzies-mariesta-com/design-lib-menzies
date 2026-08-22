# Menzies Design Wash UI

Monorepo for **menzies-design-wash-ui** (publishable) and the Wash UI demo/docs site.

## Structure

```text
apps/demo/                      # Gallery + documentation (private)
packages/menzies-design-wash-ui # npm package
```

## Develop

```bash
npm install
npm run dev          # demo site
npm run build:lib    # package only
npm run build        # package + demo
```

## Package usage

```bash
npm i menzies-design-wash-ui
```

```tsx
import 'menzies-design-wash-ui/styles.css'
import { WashProvider, Button } from 'menzies-design-wash-ui'
```

See package README and demo **Docs:** pages for theming, brush, tokens, and customization.
