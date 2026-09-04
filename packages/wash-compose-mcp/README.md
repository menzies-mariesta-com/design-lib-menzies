# Wash Compose MCP Server (Android / KMP)

Model Context Protocol server for [`menzies-design-wash-compose`](../menzies-design-wash-compose/). Gives AI assistants structured access to Compose primitives, shell APIs, LucideIcons / BrandIcons, pigment themes, and Kotlin usage snippets.

Pair with **`@menzies/wash-ui-mcp`** (web) when you need HTML / JSX / Svelte Wash UI guidance.

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

## Build

From monorepo root:

```bash
npm run mcp:compose:build
# or both MCPs:
npm run mcp:build:all
```

Or from this package:

```bash
npm run build -w @menzies/wash-compose-mcp
npm start -w @menzies/wash-compose-mcp
```

## Cursor config

Add to `.cursor/mcp.json` (project) or `~/.cursor/mcp.json` (global):

```json
{
  "mcpServers": {
    "wash-compose-android": {
      "type": "stdio",
      "command": "node",
      "args": [
        "/absolute/path/to/design-lib-menzies/packages/wash-compose-mcp/dist/index.js"
      ]
    }
  }
}
```

Optional: set `WASH_UI_REPO_ROOT` if the server cannot resolve the monorepo from its install path.

## Claude Desktop

```json
{
  "mcpServers": {
    "wash-compose-android": {
      "command": "node",
      "args": [
        "/absolute/path/to/design-lib-menzies/packages/wash-compose-mcp/dist/index.js"
      ]
    }
  }
}
```

## Cursor Settings → MCP

1. Open **Cursor Settings → MCP**
2. Ensure the project `.cursor/mcp.json` (or user config) lists both `wash-ui-web` and `wash-compose-android`
3. Run `npm run mcp:build:all` so both `dist/index.js` files exist
4. Reload MCP servers / restart Cursor if the tools do not appear
5. Confirm tools show under each server in the MCP panel

## License

GPL-3.0-or-later (same as the Wash Compose library)
