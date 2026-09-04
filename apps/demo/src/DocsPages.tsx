import { useEffect, useState, type ReactNode } from 'react'
import {
  BookOpen,
  Download,
  Network,
  Palette,
  Settings2,
} from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
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
import {
  PigmentThemeCompactRow,
  PigmentThemeDialog,
  type PigmentTheme,
} from './components/PigmentThemeDialog'
import {
  applyTheme,
  readStoredMode,
  readStoredTheme,
  THEME_CHANGE_EVENT,
  type ThemeChangeDetail,
  type ThemeMode,
  type WatercolorThemeId,
} from './themes'

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
  const [activePigment, setActivePigment] = useState<WatercolorThemeId>(() =>
    readStoredTheme(),
  )
  const [mode, setMode] = useState<ThemeMode>(() => readStoredMode())
  const [selected, setSelected] = useState<PigmentTheme | null>(null)

  useEffect(() => {
    function onThemeChange(event: Event) {
      const detail = (event as CustomEvent<ThemeChangeDetail>).detail
      if (!detail) return
      setActivePigment(detail.pigment)
      setMode(detail.mode)
    }

    window.addEventListener(THEME_CHANGE_EVENT, onThemeChange)
    return () => window.removeEventListener(THEME_CHANGE_EVENT, onThemeChange)
  }, [])

  function applyPigment(id: WatercolorThemeId) {
    setActivePigment(id)
    applyTheme(id, readStoredMode())
  }

  return (
    <div>
      <p className="label-ink mb-2">Documentation</p>
      <h1 className="font-display mb-2 text-3xl font-semibold">Theming</h1>
      <p className="mb-6 max-w-2xl text-ink-muted">
        {watercolorThemes.length} pigments, each with light and dark paper modes.
        Click a pigment to copy its theme CSS.
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
            <PigmentThemeCompactRow
              key={t.id}
              theme={t}
              active={t.id === activePigment}
              onOpen={() => setSelected(t)}
            />
          ))}
        </div>
      </DocSection>

      <PigmentThemeDialog
        theme={selected}
        activePigment={activePigment}
        mode={mode}
        onClose={() => setSelected(null)}
        onApply={applyPigment}
      />
    </div>
  )
}

export function DocsTokensPage() {
  return (
    <div>
      <p className="label-ink mb-2">Documentation</p>
      <h1 className="font-display mb-2 text-3xl font-semibold">Design tokens</h1>
      <p className="mb-6 max-w-2xl text-ink-muted">
        Paper, wash, ink, and motion tokens power every surface.
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
            (prefer <code className="font-mono text-xs">WashBackground</code>)
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
          Install only{' '}
          <code className="font-mono text-xs">@menzies-mariesta-com/menzies-design-wash-ui</code>
          . Import Lucide UI icons from{' '}
          <code className="font-mono text-xs">@menzies-mariesta-com/menzies-design-wash-ui/icons</code>
          {' '}(named exports or <code className="font-mono text-xs">DynamicIcon</code>
          ) and brand marks from{' '}
          <code className="font-mono text-xs">@menzies-mariesta-com/menzies-design-wash-ui/icons/brands</code>
          {' '}(named exports or <code className="font-mono text-xs">BrandIcon</code>
          {' '}from <code className="font-mono text-xs">/icons/brands/catalog</code>
          ). Lucide and Simple Icons stay internal to Wash; do not import them in app code.
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
    "wash-ui-web": {
      "type": "stdio",
      "command": "node",
      "args": ["packages/wash-ui-mcp/dist/index.js"]
    },
    "wash-compose-android": {
      "type": "stdio",
      "command": "node",
      "args": ["packages/wash-compose-mcp/dist/index.js"]
    }
  }
}`

const CLAUDE_DESKTOP_JSON = `{
  "mcpServers": {
    "wash-ui-web": {
      "command": "node",
      "args": ["/absolute/path/to/design-lib-menzies/packages/wash-ui-mcp/dist/index.js"]
    },
    "wash-compose-android": {
      "command": "node",
      "args": ["/absolute/path/to/design-lib-menzies/packages/wash-compose-mcp/dist/index.js"]
    }
  }
}`

const MCP_DOWNLOADS = [
  {
    href: '/mcp/wash-ui-web.zip',
    filename: 'wash-ui-web.zip',
    label: 'Download web MCP',
    hint: '@menzies/wash-ui-mcp source + dist',
  },
  {
    href: '/mcp/wash-compose-android.zip',
    filename: 'wash-compose-android.zip',
    label: 'Download Android MCP',
    hint: '@menzies/wash-compose-mcp source + dist',
  },
  {
    href: '/mcp/mcp.json',
    filename: 'mcp.json',
    label: 'Download Cursor mcp.json',
    hint: 'Sample .cursor/mcp.json for both servers',
  },
] as const

export function DocsMcpServerPage() {
  return (
    <div>
      <p className="label-ink mb-2">Documentation</p>
      <h1 className="font-display mb-2 text-3xl font-semibold">MCP server</h1>
      <p className="mb-6 max-w-2xl text-ink-muted">
        Wash MCP packages expose design-system docs and APIs to AI assistants via the
        Model Context Protocol. Use the web server for Wash UI, and the Android server
        for Wash Compose.
      </p>

      <DocSection title="Downloads">
        <p className="mb-4 text-ink-muted">
          Zip each package (source + built <code className="font-mono text-xs">dist</code>
          ), or grab a sample Cursor config.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {MCP_DOWNLOADS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              download={item.filename}
              className="btn btn-primary btn-sm cursor-pointer gap-2 self-start"
            >
              <Download className="size-4" aria-hidden="true" />
              {item.label}
            </a>
          ))}
        </div>
        <ul className="mt-4 list-disc space-y-1 pl-5 text-xs text-ink-muted">
          {MCP_DOWNLOADS.map((item) => (
            <li key={`${item.href}-hint`}>
              <code className="font-mono">{item.filename}</code>
              <span>: {item.hint}</span>
            </li>
          ))}
        </ul>
      </DocSection>

      <DocSection title="What it provides">
        <Alert tone="info" soft>
          <Network className="size-5 shrink-0" strokeWidth={1.75} />
          <span>
            Web MCP tools plus resources, built from the library README, demo docs,
            and export index in this monorepo. Android MCP covers Compose APIs
            separately.
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
npm run mcp:build:all

# Smoke test (stdio server, Ctrl+C to exit)
node packages/wash-ui-mcp/dist/index.js
node packages/wash-compose-mcp/dist/index.js`}</Code>
      </DocSection>

      <DocSection title="Cursor configuration">
        <p className="mb-4">
          Add <code className="font-mono text-xs">.cursor/mcp.json</code> in the project
          root (paths are relative to the workspace). Run{' '}
          <code className="font-mono text-xs">npm run mcp:build:all</code> once so each{' '}
          <code className="font-mono text-xs">dist/index.js</code> exists. Or download the
          sample file above.
        </p>
        <ShowcaseTabs
          preview={
            <div className="rounded-box border border-ink-border bg-base-200/60 p-4 font-mono text-xs">
              <p className="text-ink-muted">wash-ui-web + wash-compose-android</p>
              <p className="mt-2">node packages/wash-ui-mcp/dist/index.js</p>
              <p className="mt-1">node packages/wash-compose-mcp/dist/index.js</p>
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
              <p className="mt-2">wash-ui-web + wash-compose-android</p>
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
