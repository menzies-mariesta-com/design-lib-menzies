# MCP downloads

| File | Contents |
|------|----------|
| `wash-ui-web.zip` | `@menzies-mariesta-com/wash-ui-mcp` (web) source + `dist` |
| `mcp.json` | Sample Cursor `.cursor/mcp.json` (npx) |

## Preferred (any repo)

Publish consumers do **not** need this monorepo. Use the sample `mcp.json`:

```json
{
  "mcpServers": {
    "wash-ui-web": {
      "command": "npx",
      "args": ["-y", "@menzies-mariesta-com/wash-ui-mcp@1.4.0"]
    }
  }
}
```

## Optional local zip / monorepo

After unzipping a package into your monorepo `packages/` folder:

```bash
npm install
npm run mcp:build
```

Then point Cursor at `node packages/wash-ui-mcp/dist/index.js` if you prefer a local build over `npx`.
