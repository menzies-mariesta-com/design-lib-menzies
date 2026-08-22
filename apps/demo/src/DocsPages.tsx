import type { ReactNode } from 'react'
import { BookOpen, Brush, Palette, Settings2, Sparkles } from 'menzies-design-wash-ui/icons'
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardTitle,
  Input,
  WashPanel,
  watercolorThemes,
  brushPresets,
} from 'menzies-design-wash-ui'

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

export function DocsGettingStartedPage() {
  return (
    <div className="space-y-2">
      <p className="label-ink mb-2">Documentation</p>
      <h1 className="font-display text-3xl font-semibold tracking-tight">
        Getting started
      </h1>
      <p className="mb-6 max-w-2xl text-ink-muted">
        One package for any stack: import the stylesheet, boot the core with{' '}
        <code className="font-mono text-xs">initWash</code>, or use the React
        adapter with <code className="font-mono text-xs">WashProvider</code>.
      </p>

      <DocSection title="Install">
        <p className="mb-3">Any framework (vanilla, Vue, Svelte, etc.):</p>
        <Code>{`npm i menzies-design-wash-ui`}</Code>
        <p className="mb-3 mt-4">React apps also need peer dependencies:</p>
        <Code>{`npm i menzies-design-wash-ui react react-dom`}</Code>
      </DocSection>

      <DocSection title="Vanilla / any framework">
        <Code>{`import 'menzies-design-wash-ui/styles.css'
import { initWash, washRecipes } from 'menzies-design-wash-ui/core'

// Boot once: theme, brush, ripple, smart tooltips
const wash = initWash({ defaultPigment: 'mineral', defaultMode: 'light' })

// Compose UI from documented HTML classes (see Components gallery)
document.querySelector('button')!.className = washRecipes.btnRipple`}</Code>
        <Alert tone="info" soft>
          <Sparkles className="size-5 shrink-0" strokeWidth={1.75} />
          <span>
            <code className="font-mono text-xs">initWash</code> is the
            framework-free equivalent of{' '}
            <code className="font-mono text-xs">WashProvider</code>. Call{' '}
            <code className="font-mono text-xs">wash.destroy()</code> on teardown
            in SPAs.
          </span>
        </Alert>
      </DocSection>

      <DocSection title="React app">
        <Code>{`import 'menzies-design-wash-ui/styles.css'
import { WashProvider, Button } from 'menzies-design-wash-ui'
// explicit adapter: from 'menzies-design-wash-ui/react'

export function App() {
  return (
    <WashProvider defaultPigment="mineral" defaultMode="light">
      <Button variant="primary">Save plate</Button>
    </WashProvider>
  )
}`}</Code>
      </DocSection>

      <DocSection title="Entrypoints">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <code className="font-mono text-xs">menzies-design-wash-ui/styles.css</code>{' '}
            required stylesheet
          </li>
          <li>
            <code className="font-mono text-xs">menzies-design-wash-ui/core</code>{' '}
            framework-free: theme, brush, ripple, tooltips, recipes,{' '}
            <code className="font-mono text-xs">initWash</code>
          </li>
          <li>
            <code className="font-mono text-xs">menzies-design-wash-ui</code> or{' '}
            <code className="font-mono text-xs">/react</code> React components
            and providers
          </li>
          <li>
            <code className="font-mono text-xs">menzies-design-wash-ui/theme</code> and{' '}
            <code className="font-mono text-xs">/brush</code> deep imports
          </li>
          <li>
            <code className="font-mono text-xs">menzies-design-wash-ui/icons</code> and{' '}
            <code className="font-mono text-xs">/icons/brands</code> (React)
          </li>
        </ul>
      </DocSection>
    </div>
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
        <Code>{`import { applyTheme } from 'menzies-design-wash-ui/theme'

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

export function DocsBrushPage() {
  return (
    <div>
      <p className="label-ink mb-2">Documentation</p>
      <h1 className="font-display mb-2 text-3xl font-semibold">Brush system</h1>
      <p className="mb-6 max-w-2xl text-ink-muted">
        {brushPresets.length} studio presets drive site-wide wash atmosphere via CSS
        variables. Not a drawing canvas: a global &quot;load&quot; for the desk.
      </p>
      <DocSection title="Apply a preset">
        <Code>{`import { applyBrushPreset } from 'menzies-design-wash-ui/brush'

applyBrushPreset('cloud-mop')`}</Code>
      </DocSection>
      <DocSection title="Brush CSS variables">
        <Code>{`:root {
  --brush-size: /* px */;
  --brush-opacity: /* 0-1 */;
  --brush-water: /* 0-1 */;
  --brush-hardness: /* 0-1 */;
  --brush-flow: /* 0-1 */;
  --brush-ripple-scale: /* unitless */;
  --brush-soak-duration: /* time */;
}`}</Code>
        <p>
          Also set <code className="font-mono text-xs">data-brush</code> and{' '}
          <code className="font-mono text-xs">data-brush-id</code> on{' '}
          <code className="font-mono text-xs">&lt;html&gt;</code>.
        </p>
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
          <code className="font-mono text-xs">menzies-design-wash-ui/icons</code> or{' '}
          <code className="font-mono text-xs">/icons/brands</code> for tree-shaking.
        </p>
        <div className="flex gap-3">
          <BookOpen className="size-6" />
          <Brush className="size-6" />
          <Palette className="size-6" />
        </div>
      </DocSection>
    </div>
  )
}
