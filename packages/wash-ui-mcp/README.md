# Wash UI MCP Server (Web)

Model Context Protocol server for [`@menzies-mariesta-com/menzies-design-wash-ui`](../menzies-design-wash-ui/). Gives AI assistants structured access to web components, charts, pigment themes / CSS, Lucide + brand icons, and HTML / JSX / Svelte snippets.

Pair with **`@menzies/wash-compose-mcp`** for Android / Compose Multiplatform.

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

## Build

From monorepo root:

```bash
npm run mcp:build
# or both MCPs:
npm run mcp:build:all
```

Or from this package:

```bash
npm run build
npm start
```

## Cursor config

Add to `.cursor/mcp.json` in your project (or `~/.cursor/mcp.json` globally):

```json
{
  "mcpServers": {
    "wash-ui-web": {
      "type": "stdio",
      "command": "node",
      "args": [
        "/absolute/path/to/design-lib-menzies/packages/wash-ui-mcp/dist/index.js"
      ]
    }
  }
}
```

After cloning, run `npm run mcp:build` once so `dist/index.js` exists.

Optional: `WASH_UI_REPO_ROOT=/absolute/path/to/design-lib-menzies` if source resolution fails.

## Both web + Android

```json
{
  "mcpServers": {
    "wash-ui-web": {
      "type": "stdio",
      "command": "node",
      "args": [
        "/absolute/path/to/design-lib-menzies/packages/wash-ui-mcp/dist/index.js"
      ]
    },
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

## Cursor Settings → MCP

1. Open **Cursor Settings → MCP**
2. Add the servers above (project `.cursor/mcp.json` is enough for this repo)
3. Run `npm run mcp:build:all`
4. Reload MCP / restart Cursor if needed

## Claude Desktop config

Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "wash-ui-web": {
      "command": "node",
      "args": [
        "/absolute/path/to/design-lib-menzies/packages/wash-ui-mcp/dist/index.js"
      ]
    }
  }
}
```

On macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`

On Windows: `%APPDATA%\Claude\claude_desktop_config.json`

## License

GPL-3.0-or-later (same as the Wash UI library)
