/**
 * Pack MCP server packages + sample Cursor config into apps/demo/public/mcp/
 * for downloadable links on the Docs → MCP page. Runs on predev / prebuild.
 */
import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const demoRoot = resolve(__dirname, '..')
const repoRoot = resolve(demoRoot, '../..')
const outDir = join(demoRoot, 'public', 'mcp')

const packages = [
  {
    dir: 'wash-ui-mcp',
    zipName: 'wash-ui-web.zip',
  },
]

function fail(message, detail) {
  console.error(`[prepare-mcp-downloads] ${message}`)
  if (detail) console.error(detail)
  process.exit(1)
}

mkdirSync(outDir, { recursive: true })

const mcpJsonSrc = join(repoRoot, '.cursor', 'mcp.json')
const mcpJsonDest = join(outDir, 'mcp.json')
if (!existsSync(mcpJsonSrc)) {
  fail(`Missing sample config: ${mcpJsonSrc}`)
}
cpSync(mcpJsonSrc, mcpJsonDest)

for (const { dir, zipName } of packages) {
  const pkgPath = join(repoRoot, 'packages', dir)
  if (!existsSync(pkgPath)) {
    fail(`Missing package: ${pkgPath}`)
  }

  const zipPath = join(outDir, zipName)
  if (existsSync(zipPath)) rmSync(zipPath)

  // Zip from packages/ so the archive root is wash-*-mcp/ (source + dist + README).
  const result = spawnSync(
    'zip',
    [
      '-r',
      zipPath,
      dir,
      '-x',
      `${dir}/node_modules/*`,
      `${dir}/node_modules/**`,
      `${dir}/.DS_Store`,
    ],
    {
      cwd: join(repoRoot, 'packages'),
      encoding: 'utf8',
    },
  )

  if (result.status !== 0) {
    fail(`zip failed for ${dir}`, result.stderr || result.stdout)
  }
}

const readme = `# MCP downloads

| File | Contents |
|------|----------|
| \`wash-ui-web.zip\` | \`@menzies-mariesta-com/wash-ui-mcp\` (web) source + \`dist\` |
| \`mcp.json\` | Sample Cursor \`.cursor/mcp.json\` (npx) |

## Preferred (any repo)

Publish consumers do **not** need this monorepo. Use the sample \`mcp.json\`:

\`\`\`json
{
  "mcpServers": {
    "wash-ui-web": {
      "command": "npx",
      "args": ["-y", "@menzies-mariesta-com/wash-ui-mcp@1.3.0"]
    }
  }
}
\`\`\`

## Optional local zip / monorepo

After unzipping a package into your monorepo \`packages/\` folder:

\`\`\`bash
npm install
npm run mcp:build
\`\`\`

Then point Cursor at \`node packages/wash-ui-mcp/dist/index.js\` if you prefer a local build over \`npx\`.
`

writeFileSync(join(outDir, 'README.md'), readme)

console.log(
  `[prepare-mcp-downloads] Wrote ${packages.map((p) => p.zipName).join(', ')}, mcp.json → ${outDir}`,
)
