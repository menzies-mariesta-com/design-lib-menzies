# Wash UI MCP Server (Web)

Model Context Protocol server for [`@menzies-mariesta-com/menzies-design-wash-ui`](../menzies-design-wash-ui/). Gives AI assistants structured access to web components, charts, pigment themes / CSS, Lucide + brand icons, and HTML / JSX / Svelte snippets.

Published to **GitHub Packages** as `@menzies-mariesta-com/wash-ui-mcp`. Pair with **`@menzies-mariesta-com/wash-compose-mcp`** for Android / Compose Multiplatform.

The published package embeds a build-time snapshot of themes, brands, and source excerpts. It works from the `npx` cache with no local design-lib clone. When the monorepo is present (or `WASH_UI_REPO_ROOT` is set), live sources are preferred.

## Tools

| Tool | Description |
|------|-------------|
| `list_components` | Browse library exports by category |
| `search_components` | Search by name, keyword, or description |
| `get_component_docs` | Usage, props, import path, examples (+ optional source) |
| `list_chart_types` | Chart categories and components |
| `get_theme_tokens` | Theme CSS variables and API |
| `list_pigment_themes` | Pigment ids from `themes.ts` (source of truth) |
| `get_theme_css` | CSS block for a pigment from `themes.css` |
| `get_icon_usage` | Lucide + brand import/usage patterns |
| `get_usage_snippet` | HTML / JSX / Svelte / vanilla snippets |
| `get_install_guide` | Install, exports, peer dependencies |
| `search_docs` | Search documentation sections |

## Resources

- `wash-ui://components/index` - Full component index JSON
- `wash-ui://docs/install` - Install guide excerpt
- `wash-ui://themes/index` - Pigment themes from source

## Cursor / Claude (any repo)

Add to `.cursor/mcp.json` or Claude Desktop config. Requires GitHub Packages auth for the `@menzies-mariesta-com` scope:

```ini
# ~/.npmrc or project .npmrc
@menzies-mariesta-com:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_PAT
```

```json
{
  "mcpServers": {
    "wash-ui-web": {
      "command": "npx",
      "args": ["-y", "@menzies-mariesta-com/wash-ui-mcp@1.0.3"]
    },
    "wash-compose-android": {
      "command": "npx",
      "args": ["-y", "@menzies-mariesta-com/wash-compose-mcp@1.0.3"]
    }
  }
}
```

## Monorepo contributors (optional)

From design-lib root:

```bash
npm run mcp:build
# or both:
npm run mcp:build:all
```

Local Cursor config alternative:

```json
{
  "mcpServers": {
    "wash-ui-web": {
      "command": "node",
      "args": ["packages/wash-ui-mcp/dist/index.js"]
    }
  }
}
```

Optional: `WASH_UI_REPO_ROOT=/absolute/path/to/design-lib-menzies` if you want live source reads from a custom checkout.

## Build / publish

```bash
npm run build
npm publish
```

`build` regenerates `src/data/embedded-snapshot.ts` from the Wash UI package sources, then compiles to `dist/`.

## License

GPL-3.0-or-later (same as the Wash UI library)
