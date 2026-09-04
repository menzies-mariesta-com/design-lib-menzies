const PKG = '@menzies-mariesta-com/menzies-design-wash-ui'

export type SnippetFramework = 'html' | 'jsx' | 'svelte' | 'vanilla'

export type UsageSnippet = {
  id: string
  title: string
  frameworks: SnippetFramework[]
  keywords: string[]
  code: Record<string, string>
}

export const usageSnippets: UsageSnippet[] = [
  {
    id: 'boot-react',
    title: 'Boot Wash in React',
    frameworks: ['jsx'],
    keywords: ['provider', 'init', 'theme', 'styles'],
    code: {
      jsx: `import '${PKG}/styles.css'
import { WashProvider, WashShell, WashPanel, Button } from '${PKG}/react'

export function App() {
  return (
    <WashProvider defaultPigment="mineral" defaultMode="light">
      <WashShell>
        <WashPanel>
          <Button variant="primary" ripple>Save</Button>
        </WashPanel>
      </WashShell>
    </WashProvider>
  )
}`,
    },
  },
  {
    id: 'boot-vanilla',
    title: 'Boot Wash without React',
    frameworks: ['html', 'vanilla', 'svelte'],
    keywords: ['initWash', 'core', 'classes'],
    code: {
      vanilla: `import '${PKG}/styles.css'
import { initWash, washRecipes } from '${PKG}/core'

const wash = initWash({ defaultPigment: 'mineral', defaultMode: 'light' })
// wash.destroy() on SPA teardown`,
      html: `<link rel="stylesheet" href="node_modules/${PKG}/dist/styles.css" />
<div class="page-wash paper-grain wash-shell">
  <main class="wash-shell-main">
    <article class="wash-panel paper-grain">Save plate</article>
  </main>
</div>`,
      svelte: `<script lang="ts">
  import '${PKG}/styles.css'
  import { onMount, onDestroy } from 'svelte'
  import { initWash, washRecipes } from '${PKG}/core'

  let wash: ReturnType<typeof initWash> | undefined
  onMount(() => {
    wash = initWash({ defaultPigment: 'mineral', defaultMode: 'light' })
  })
  onDestroy(() => wash?.destroy())
</script>

<div class={washRecipes.washShell}>
  <main class={washRecipes.washShellMain}>
    <article class={washRecipes.washPanel}>
      <button class="btn btn-primary ripple cursor-pointer">Save</button>
    </article>
  </main>
</div>`,
    },
  },
  {
    id: 'button',
    title: 'Button variants',
    frameworks: ['html', 'jsx', 'svelte'],
    keywords: ['button', 'btn', 'loading', 'ripple'],
    code: {
      jsx: `import { Button } from '${PKG}/react'

<Button variant="primary" size="md" ripple loading={false}>
  Save changes
</Button>`,
      html: `<button type="button" class="btn btn-primary ripple cursor-pointer">Save</button>
<button type="button" class="btn btn-ghost btn-square btn-error cursor-pointer" aria-label="Delete">…</button>`,
      svelte: `<button type="button" class="btn btn-primary ripple cursor-pointer">Save</button>`,
    },
  },
  {
    id: 'icons-lucide',
    title: 'Lucide icons via Wash',
    frameworks: ['jsx'],
    keywords: ['icon', 'lucide', 'palette'],
    code: {
      jsx: `import { Palette, DynamicIcon } from '${PKG}/icons'

<Palette className="size-5" aria-hidden="true" />
<DynamicIcon name="heart" className="size-5" />`,
    },
  },
  {
    id: 'icons-brands',
    title: 'Brand icons via Wash',
    frameworks: ['jsx'],
    keywords: ['brand', 'github', 'simple icons'],
    code: {
      jsx: `import { GitHub, Svelte } from '${PKG}/icons/brands'
import { BrandIcon } from '${PKG}/icons/brands/catalog'

<GitHub size={24} />
<BrandIcon slug="discord" size={24} />`,
    },
  },
  {
    id: 'theme',
    title: 'Apply pigment theme',
    frameworks: ['jsx', 'vanilla'],
    keywords: ['theme', 'pigment', 'dark', 'applyTheme'],
    code: {
      jsx: `import { useWash } from '${PKG}/react'

function ThemeControls() {
  const { pigment, mode, setPigment, setMode } = useWash()
  return (
    <button type="button" className="btn btn-ghost cursor-pointer" onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
      Toggle {mode}
    </button>
  )
}`,
      vanilla: `import { applyTheme, watercolorThemes } from '${PKG}/theme'

applyTheme('cerulean', 'dark')
console.log(watercolorThemes.map((t) => t.id))`,
    },
  },
  {
    id: 'chart',
    title: 'Line chart',
    frameworks: ['jsx'],
    keywords: ['chart', 'apex', 'line'],
    code: {
      jsx: `import { LineChart } from '${PKG}/charts'

<LineChart
  height={300}
  categories={['Mon', 'Tue', 'Wed']}
  series={[{ name: 'Washes', data: [12, 18, 14] }]}
/>`,
    },
  },
]

export function findSnippets(query?: string, framework?: SnippetFramework): UsageSnippet[] {
  const q = query?.toLowerCase().trim()
  const tokens = q ? q.split(/\s+/).filter(Boolean) : []
  return usageSnippets.filter((s) => {
    if (framework && !s.frameworks.includes(framework) && !(framework in s.code)) {
      return false
    }
    if (!tokens.length) return true
    const hay = [s.id, s.title, ...s.keywords, ...Object.keys(s.code)].join(' ').toLowerCase()
    return tokens.every((t) => hay.includes(t))
  })
}
