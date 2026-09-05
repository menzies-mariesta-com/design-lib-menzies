# Wash Compose MCP Server (Android / KMP)

Model Context Protocol server for [`menzies-design-wash-compose`](../menzies-design-wash-compose/). Gives AI assistants structured access to Compose primitives, shell APIs, LucideIcons / BrandIcons, pigment themes, and Kotlin usage snippets.

Published to **GitHub Packages** as `@menzies-mariesta-com/wash-compose-mcp`. Pair with **`@menzies-mariesta-com/wash-ui-mcp`** (web) when you need HTML / JSX / Svelte Wash UI guidance.

The published package embeds a build-time snapshot of pigments, icon names, and composable signatures. It works from the `npx` cache with no local design-lib clone. When the monorepo is present (or `WASH_UI_REPO_ROOT` is set), live Kotlin sources are preferred.

## Tools

| Tool | Description |
|------|-------------|
| `list_components` | Browse Compose APIs by category |
| `search_components` | Search by name, keyword, or web equivalent |
| `get_component_docs` | Params, example, optional Kotlin source signature |
| `list_pigment_themes` | `WashPigment` values from source |
| `get_theme_tokens` | `WashTheme.colors` fields and theme access |
| `list_icons` | Lucide + brand icon names from Kotlin sources |
| `get_icon_usage` | Import + `WashIcon` snippet for one icon |
| `get_usage_snippet` | Kotlin patterns (provider, button, icon, theme) |
| `get_web_equivalent` | Map web Wash names ↔ Compose |
| `get_install_guide` | Gradle / module / build commands |
| `search_docs` | Search Compose docs sections |

## Resources

- `wash-compose://components/index`
- `wash-compose://icons/index`
- `wash-compose://docs/install`

## Cursor / Claude (any repo)

```ini
# ~/.npmrc or project .npmrc
@menzies-mariesta-com:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_PAT
```

```json
{
  "mcpServers": {
    "wash-compose-android": {
      "command": "npx",
      "args": ["-y", "@menzies-mariesta-com/wash-compose-mcp@1.0.5"]
    }
  }
}
```

## Monorepo contributors (optional)

```bash
npm run mcp:compose:build
# or both MCPs:
npm run mcp:build:all
```

```json
{
  "mcpServers": {
    "wash-compose-android": {
      "command": "node",
      "args": ["packages/wash-compose-mcp/dist/index.js"]
    }
  }
}
```

Optional: set `WASH_UI_REPO_ROOT` for live Kotlin resolution from a custom checkout.

## Build / publish

```bash
npm run build
npm publish
```

`build` regenerates `src/data/embedded-snapshot.ts` from Compose sources, then compiles to `dist/`.

## License

GPL-3.0-or-later (same as the Wash Compose library)
