import type { ShowcaseSvelteFile } from '../../../../components/showcaseTypes'
import { kitFiles } from '../../../../components/kitFiles'
import tree from './FileTree.svelte?raw'
import page from './+page.svelte?raw'

export const fileTreeSvelteFiles: ShowcaseSvelteFile[] = kitFiles([
  { name: 'FileTree.svelte', code: tree },
  { name: '+page.svelte', code: page },
])

export const fileTreeHtml = `<div class="grid min-h-[28rem] overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-sm lg:grid-cols-[minmax(16rem,22rem)_minmax(0,1fr)]">
  <aside class="flex min-h-0 flex-col border-b border-base-300 lg:border-b-0 lg:border-r">
    <header class="flex shrink-0 items-center gap-2 border-b border-base-300 bg-base-200/70 px-3 py-2.5">
      <svg class="size-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"/></svg>
      <h2 class="font-display text-sm font-semibold">Design tree</h2>
    </header>
    <nav class="min-h-0 flex-1 overflow-auto py-2" aria-label="Design library file tree">
      <ul class="menu menu-sm w-full bg-transparent p-0">
        <li>
          <details open>
            <summary class="cursor-pointer font-mono text-xs">design-lib-menzies</summary>
            <ul>
              <li>
                <details open>
                  <summary class="cursor-pointer font-mono text-xs">packages</summary>
                  <ul>
                    <li>
                      <details open>
                        <summary class="cursor-pointer font-mono text-xs">menzies-design-wash-ui</summary>
                        <ul>
                          <li>
                            <details open>
                              <summary class="cursor-pointer font-mono text-xs">src</summary>
                              <ul>
                                <li><button type="button" class="cursor-pointer bg-primary/30 font-mono text-xs font-medium">registry.ts</button></li>
                                <li><button type="button" class="cursor-pointer font-mono text-xs">index.css</button></li>
                                <li><button type="button" class="cursor-pointer font-mono text-xs">editor.css</button></li>
                              </ul>
                            </details>
                          </li>
                        </ul>
                      </details>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <details>
                  <summary class="cursor-pointer font-mono text-xs">apps</summary>
                  <ul>
                    <li><button type="button" class="cursor-pointer font-mono text-xs">demo</button></li>
                  </ul>
                </details>
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </nav>
  </aside>
  <section class="flex min-h-0 flex-col">
    <header class="shrink-0 border-b border-base-300 bg-base-200/50 px-4 py-2.5">
      <p class="label-ink text-xs">Selected path</p>
      <nav aria-label="Breadcrumb" class="mt-1">
        <ol class="flex flex-wrap items-center gap-1 font-mono text-xs text-ink-muted">
          <li>design-lib-menzies</li>
          <li class="opacity-50">/</li>
          <li>packages</li>
          <li class="opacity-50">/</li>
          <li>menzies-design-wash-ui</li>
          <li class="opacity-50">/</li>
          <li>src</li>
          <li class="opacity-50">/</li>
          <li class="font-semibold text-base-content">registry.ts</li>
        </ol>
      </nav>
    </header>
    <div class="flex flex-1 flex-col gap-4 overflow-auto p-4 sm:p-5">
      <div>
        <p class="label-ink">File</p>
        <h3 class="font-display mt-1 text-xl font-semibold sm:text-2xl">registry.ts</h3>
        <p class="mt-1 font-mono text-xs text-ink-muted">/packages/menzies-design-wash-ui/src/editors/registry.ts</p>
      </div>
      <div class="wash-panel paper-grain wash-panel-blue">
        <p class="label-ink">Deep dive</p>
        <p class="mt-2 text-sm text-base-content/90">Grammar pack registry for CodeEditor language packs and token themes.</p>
      </div>
    </div>
  </section>
</div>`

export const fileTreeJsx = fileTreeHtml.replace(/class=/g, 'className=')
