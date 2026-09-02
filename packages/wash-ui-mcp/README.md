# Wash UI MCP Server

Model Context Protocol server for [@menzies-mariesta-com/menzies-design-wash-ui](https://github.com/menzies-mariesta-com/wash-ui-design-lib-menzies). Gives AI assistants structured access to component exports, chart categories, theming APIs, and install docs.

## Tools

| Tool | Description |
|------|-------------|
| `list_components` | Browse library exports by category |
| `search_components` | Search by name, keyword, or description |
| `get_component_docs` | Usage, props, import path, and examples |
| `list_chart_types` | Chart categories and components |
| `get_theme_tokens` | Theme CSS variables and API |
| `get_install_guide` | Install, exports, peer dependencies |
| `search_docs` | Search documentation sections |

## Resources

- `wash-ui://components/index` - Full component index JSON
- `wash-ui://docs/install` - Install guide excerpt

## Build

From monorepo root:

```bash
npm run mcp:build
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
    "wash-ui": {
      "type": "stdio",
      "command": "node",
      "args": ["/absolute/path/to/watercolor-dashboard/packages/wash-ui-mcp/dist/index.js"]
    }
  }
}
```

After cloning, run `npm run mcp:build` once so `dist/index.js` exists.

## Claude Desktop config

Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "wash-ui": {
      "command": "node",
      "args": ["/absolute/path/to/watercolor-dashboard/packages/wash-ui-mcp/dist/index.js"]
    }
  }
}
```

On macOS the config file is typically:

`~/Library/Application Support/Claude/claude_desktop_config.json`

On Windows:

`%APPDATA%\Claude\claude_desktop_config.json`

## License

GPL-3.0-or-later (same as the Wash UI library)
