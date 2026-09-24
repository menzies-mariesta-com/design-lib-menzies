import type { ShowcaseSvelteFile } from '../../../../components/showcaseTypes'
import { kitFiles } from '../../../../components/kitFiles'
import layout from './DocsLayout.svelte?raw'
import page from './+page.svelte?raw'

export const docsLayoutSvelteFiles: ShowcaseSvelteFile[] = kitFiles([
  { name: 'DocsLayout.svelte', code: layout },
  { name: '+page.svelte', code: page },
])

export const docsLayoutHtml = `<div class="rounded-box border border-base-300 bg-base-100 shadow-sm">
  <div class="flex min-h-[22rem] flex-col lg:min-h-[28rem] lg:flex-row">
    <aside class="shrink-0 border-b border-base-300 bg-base-200/40 lg:sticky lg:top-0 lg:w-52 lg:self-start lg:border-b-0 lg:border-e">
      <div class="px-4 py-4 lg:max-h-[28rem] lg:overflow-y-auto">
        <div class="mb-3 flex items-center gap-2">
          <svg class="size-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/></svg>
          <h2 class="font-display text-sm font-semibold">Documentation</h2>
        </div>
        <ul class="menu menu-sm w-full gap-0.5 p-0">
          <li><button type="button" class="cursor-pointer rounded-btn bg-primary/40 px-3 font-medium" aria-current="true">Install</button></li>
          <li><button type="button" class="cursor-pointer rounded-btn px-3">Theming</button></li>
          <li><button type="button" class="cursor-pointer rounded-btn px-3">Components</button></li>
          <li><button type="button" class="cursor-pointer rounded-btn px-3">Charts</button></li>
          <li><button type="button" class="cursor-pointer rounded-btn px-3">API</button></li>
        </ul>
      </div>
    </aside>
    <div class="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6 lg:max-h-[28rem]">
      <article class="mx-auto max-w-prose space-y-8">
        <header>
          <p class="label-ink mb-1 text-xs">Wash UI</p>
          <h1 class="font-display text-xl font-semibold tracking-tight sm:text-2xl">Studio pigment tokens</h1>
          <p class="mt-2 text-sm leading-relaxed text-ink-muted">Map wash pigments to CSS variables and paper modes. Use this layout for long-form docs with a sticky sidebar and scroll-synced highlights.</p>
        </header>
        <section id="docs-install" class="scroll-mt-4 border-s-4 border-primary ps-4">
          <h2 class="font-display text-lg font-semibold">Install</h2>
          <p class="mt-2 text-sm leading-relaxed text-base-content/90">Add the package and import the stylesheet once at your app entry.</p>
          <pre class="mt-3 overflow-x-auto rounded-box bg-base-200 p-3 font-mono text-xs"><code>npm i @menzies-mariesta-com/menzies-design-wash-ui</code></pre>
          <div class="alert alert-info mt-3 text-sm shadow-sm">
            <span>React apps also need <code class="font-mono text-xs">react</code> and <code class="font-mono text-xs">react-dom</code> as peers.</span>
          </div>
        </section>
        <section id="docs-theming" class="scroll-mt-4 border-s-4 border-transparent ps-4">
          <h2 class="font-display text-lg font-semibold">Theming</h2>
          <p class="mt-2 text-sm leading-relaxed text-base-content/90">Each pigment ships light and dark paper modes. Override tokens on <code class="font-mono text-xs">:root</code>.</p>
          <pre class="mt-3 overflow-x-auto rounded-box bg-base-200 p-3 font-mono text-xs"><code>:root {
  --wash-a: #d9eef5;
  --wash-b: #f2e1c6;
  --wash-c: #e8c9c3;
  --paper-fiber: #e8e1d4;
}</code></pre>
        </section>
        <section id="docs-components" class="scroll-mt-4 border-s-4 border-transparent ps-4">
          <h2 class="font-display text-lg font-semibold">Components</h2>
          <p class="mt-2 text-sm leading-relaxed text-base-content/90">Compose buttons, cards, and form controls from documented HTML classes or React exports.</p>
        </section>
        <section id="docs-charts" class="scroll-mt-4 border-s-4 border-transparent ps-4">
          <h2 class="font-display text-lg font-semibold">Charts</h2>
          <p class="mt-2 text-sm leading-relaxed text-base-content/90">Watercolor chart presets inherit pigment washes for fills, grids, and tooltips.</p>
        </section>
        <section id="docs-api" class="scroll-mt-4 border-s-4 border-transparent ps-4">
          <h2 class="font-display text-lg font-semibold">API</h2>
          <p class="mt-2 text-sm leading-relaxed text-base-content/90">Deep imports for theme, icons, and core utilities.</p>
          <pre class="mt-3 overflow-x-auto rounded-box bg-base-200 p-3 font-mono text-xs"><code>import { applyTheme } from '@menzies-mariesta-com/menzies-design-wash-ui/theme'
import { initWash } from '@menzies-mariesta-com/menzies-design-wash-ui/brand'</code></pre>
        </section>
      </article>
    </div>
  </div>
</div>`

export const docsLayoutJsx = docsLayoutHtml.replace(/class=/g, 'className=')
