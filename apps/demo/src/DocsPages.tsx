import type { ReactNode } from 'react'
import { BookOpen, Network, Palette, Settings2 } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardTitle,
  Input,
  WashPanel,
  watercolorThemes,
} from '@menzies-mariesta-com/menzies-design-wash-ui'
import { ShowcaseTabs } from './components/ShowcaseTabs'

function DocSection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <WashPanel className="mb-6">
      <div className="border-b border-ink-border/70 px-5 py-4">
        <h2 className="font-display text-xl font-semibold">{title}</h2>
      </div>
      <div className="space-y-4 p-5 text-sm leading-relaxed text-base-content">
        {children}
      </div>
    </WashPanel>
  )
}

function Code({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-box border border-ink-border bg-base-200/80 p-4 font-mono text-xs">
      <code>{children}</code>
    </pre>
  )
}

export function DocsThemingPage() {
  return (
    <div>
      <p className="label-ink mb-2">Documentation</p>
      <h1 className="font-display mb-2 text-3xl font-semibold">Theming</h1>
      <p className="mb-6 max-w-2xl text-ink-muted">
        {watercolorThemes.length} pigments, each with light and dark paper modes.
        Customize with CSS variables or <code className="font-mono text-xs">applyTheme</code>.
      </p>
      <DocSection title="Apply a pigment">
        <Code>{`import { applyTheme } from '@menzies-mariesta-com/menzies-design-wash-ui/theme'

applyTheme('cerulean', 'dark')`}</Code>
      </DocSection>
      <DocSection title="CSS variables to override">
        <Code>{`:root {
  --wash-a: #d9eef5;
  --wash-b: #f2e1c6;
  --wash-c: #e8c9c3;
  --paper-fiber: #e8e1d4;
  --ink-muted: /* muted copy */;
  --ink-border: /* hairlines */;
}`}</Code>
        <p>
          Themes set <code className="font-mono text-xs">data-theme</code> on{' '}
          <code className="font-mono text-xs">&lt;html&gt;</code> (for example{' '}
          <code className="font-mono text-xs">mineral</code> or{' '}
          <code className="font-mono text-xs">mineral-dark</code>).
        </p>
      </DocSection>
      <DocSection title="Pigment gallery">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {watercolorThemes.map((t) => (
            <div
              key={t.id}
              className="flex items-center gap-2 rounded-box border border-ink-border p-2"
            >
              <span
                className="size-8 rounded-full border border-ink-border"
                style={{ background: t.swatch }}
                aria-hidden
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{t.label}</p>
                <p className="truncate font-mono text-[0.65rem] text-ink-muted">
                  {t.id}
                </p>
              </div>
            </div>
          ))}
        </div>
      </DocSection>
    </div>
  )
}

export function DocsTokensPage() {
  return (
    <div>
      <p className="label-ink mb-2">Documentation</p>
      <h1 className="font-display mb-2 text-3xl font-semibold">Design tokens</h1>
      <p className="mb-6 max-w-2xl text-ink-muted">
        Paper, wash, ink, and motion tokens power every surface. Override at{' '}
        <code className="font-mono text-xs">:root</code> or a scoped ancestor.
      </p>
      <DocSection title="Core tokens">
        <ul className="list-disc space-y-2 pl-5 font-mono text-xs">
          <li>--wash-a / --wash-b / --wash-c</li>
          <li>--paper-fiber / --pigment-grain</li>
          <li>--ink-muted / --ink-border</li>
          <li>--ease-absorb</li>
          <li>--shadow-paper-md</li>
          <li>--font-display / --font-sans / --font-mono</li>
        </ul>
      </DocSection>
      <DocSection title="Utility classes">
        <ul className="list-disc space-y-2 pl-5 text-sm">
          <li>
            <code className="font-mono text-xs">wash-panel</code>,{' '}
            <code className="font-mono text-xs">paper-grain</code>,{' '}
            <code className="font-mono text-xs">soak-in</code>
          </li>
          <li>
            <code className="font-mono text-xs">ripple</code> on interactive hosts
          </li>
          <li>
            <code className="font-mono text-xs">label-ink</code> for small caps labels
          </li>
          <li>
            <code className="font-mono text-xs">page-wash</code> for page atmosphere
          </li>
        </ul>
      </DocSection>
    </div>
  )
}

export function DocsCustomizePage() {
  return (
    <div>
      <p className="label-ink mb-2">Documentation</p>
      <h1 className="font-display mb-2 text-3xl font-semibold">
        Customize components
      </h1>
      <p className="mb-6 max-w-2xl text-ink-muted">
        Every component accepts className slots, semantic variants, and CSS variables.
        Prefer props for variants; prefer tokens for brand-wide look.
      </p>

      <div className="mb-6 grid gap-6 md:grid-cols-2">
        <Card>
          <CardBody>
            <CardTitle>
              <Palette className="me-2 inline size-5" /> Button
            </CardTitle>
            <p className="text-sm text-ink-muted">
              Variants, sizes, ripple, loading. Keyboard and disabled states built in.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="primary">Primary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
            <Code>{`<Button variant="primary" size="sm" ripple>
  Save
</Button>`}</Code>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <CardTitle tone="secondary">
              <Settings2 className="me-2 inline size-5" /> Input
            </CardTitle>
            <p className="text-sm text-ink-muted">
              Labels, required mark, error and hint text, aria-invalid wiring.
            </p>
            <div className="mt-4">
              <Input label="Plate name" required placeholder="Coastal fog" />
            </div>
          </CardBody>
        </Card>
      </div>

      <DocSection title="Accessibility checklist">
        <ul className="list-disc space-y-2 pl-5">
          <li>Visible or aria-label name on every control</li>
          <li>Focus visible styles (do not remove outline without replacement)</li>
          <li>Dialog and drawer: focus trap + Escape</li>
          <li>Toast and Loading: live regions</li>
          <li>Respect prefers-reduced-motion</li>
        </ul>
      </DocSection>

      <DocSection title="Icons">
        <p>
          Import only what you need from{' '}
          <code className="font-mono text-xs">@menzies-mariesta-com/menzies-design-wash-ui/icons</code> or{' '}
          <code className="font-mono text-xs">/icons/brands</code> for tree-shaking.
        </p>
        <div className="flex gap-3">
          <BookOpen className="size-6" />
          <Palette className="size-6" />
        </div>
      </DocSection>
    </div>
  )
}

const MCP_TOOLS = [
  { name: 'list_components', desc: 'Browse exports by category (primitive, core, chart, etc.)' },
  { name: 'search_components', desc: 'Search by name, keyword, or description' },
  { name: 'get_component_docs', desc: 'Usage, props, import path, and examples' },
  { name: 'list_chart_types', desc: 'Chart categories and components per category' },
  { name: 'get_theme_tokens', desc: 'Theme CSS variables and applyTheme API' },
  { name: 'get_install_guide', desc: 'Install steps, exports, peer dependencies' },
  { name: 'search_docs', desc: 'Search documentation sections' },
] as const

const CURSOR_MCP_JSON = `{
  "mcpServers": {
    "wash-ui": {
      "type": "stdio",
      "command": "node",
      "args": ["packages/wash-ui-mcp/dist/index.js"]
    }
  }
}`

const CLAUDE_DESKTOP_JSON = `{
  "mcpServers": {
    "wash-ui": {
      "command": "node",
      "args": ["/absolute/path/to/watercolor-dashboard/packages/wash-ui-mcp/dist/index.js"]
    }
  }
}`

export function DocsMcpServerPage() {
  return (
    <div>
      <p className="label-ink mb-2">Documentation</p>
      <h1 className="font-display mb-2 text-3xl font-semibold">MCP server</h1>
      <p className="mb-6 max-w-2xl text-ink-muted">
        The <code className="font-mono text-xs">@menzies/wash-ui-mcp</code> package
        exposes Wash UI docs and APIs to AI assistants via the Model Context Protocol.
        Connect it in Cursor or Claude Desktop so agents can look up components, charts,
        theming, and install steps without guessing.
      </p>

      <DocSection title="What it provides">
        <Alert tone="info" soft>
          <Network className="size-5 shrink-0" strokeWidth={1.75} />
          <span>
            Seven tools plus two resources. Built from the library README, demo docs,
            and export index in this monorepo.
          </span>
        </Alert>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          {MCP_TOOLS.map((t) => (
            <li key={t.name}>
              <code className="font-mono text-xs">{t.name}</code>
              <span className="text-ink-muted">: {t.desc}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-ink-muted">
          Resources: <code className="font-mono text-xs">wash-ui://components/index</code>{' '}
          (JSON index) and{' '}
          <code className="font-mono text-xs">wash-ui://docs/install</code> (install excerpt).
        </p>
      </DocSection>

      <DocSection title="Build from monorepo">
        <Code>{`# From repo root
npm run mcp:build

# Smoke test (stdio server, Ctrl+C to exit)
node packages/wash-ui-mcp/dist/index.js`}</Code>
      </DocSection>

      <DocSection title="Cursor configuration">
        <p className="mb-4">
          Add <code className="font-mono text-xs">.cursor/mcp.json</code> in the project
          root (paths are relative to the workspace). Run{' '}
          <code className="font-mono text-xs">npm run mcp:build</code> once so{' '}
          <code className="font-mono text-xs">dist/index.js</code> exists.
        </p>
        <ShowcaseTabs
          preview={
            <div className="rounded-box border border-ink-border bg-base-200/60 p-4 font-mono text-xs">
              <p className="text-ink-muted">wash-ui MCP server</p>
              <p className="mt-2">node packages/wash-ui-mcp/dist/index.js</p>
            </div>
          }
          html={CURSOR_MCP_JSON}
          jsx={CURSOR_MCP_JSON}
        />
      </DocSection>

      <DocSection title="Claude Desktop configuration">
        <p className="mb-4">
          Use an absolute path to <code className="font-mono text-xs">dist/index.js</code>.
          macOS config:{' '}
          <code className="font-mono text-xs">
            ~/Library/Application Support/Claude/claude_desktop_config.json
          </code>
        </p>
        <ShowcaseTabs
          preview={
            <div className="rounded-box border border-ink-border bg-base-200/60 p-4 font-mono text-xs">
              <p className="text-ink-muted">Claude Desktop mcpServers</p>
              <p className="mt-2">wash-ui via node dist/index.js</p>
            </div>
          }
          html={CLAUDE_DESKTOP_JSON}
          jsx={CLAUDE_DESKTOP_JSON}
        />
      </DocSection>

      <DocSection title="Example agent prompts">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            &quot;Use wash-ui MCP: how do I install and boot initWash in vanilla
            JS?&quot;
          </li>
          <li>
            &quot;Search wash-ui components for table and show import path.&quot;
          </li>
          <li>
            &quot;List chart types and give a LineChart example with Wash
            theming.&quot;
          </li>
        </ul>
      </DocSection>
    </div>
  )
}
