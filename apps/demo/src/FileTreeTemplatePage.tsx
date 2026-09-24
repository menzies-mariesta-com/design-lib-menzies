import { useMemo, useState, type ReactNode } from 'react'
import {
  Braces,
  ChevronRight,
  FileCode,
  FileJson,
  FileType,
  Folder,
  FolderOpen,
} from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  fileTreeHtml as kitFileTreeHtml,
  fileTreeJsx as kitFileTreeJsx,
  fileTreeSvelteFiles as kitFileTreeSvelteFiles,
} from './snippets/svelte/templates/file-tree'

type TreeKind = 'folder' | 'file'

type TreeNode = {
  id: string
  name: string
  kind: TreeKind
  /** Short design note shown when selected. */
  blurb?: string
  /** Optional path hint under the monorepo root. */
  path?: string
  children?: TreeNode[]
}

const designTree: TreeNode = {
  id: 'root',
  name: 'design-lib-menzies',
  kind: 'folder',
  blurb: 'Wash UI monorepo: web library, Compose library, demos, and MCP packs.',
  path: '/',
  children: [
    {
      id: 'packages',
      name: 'packages',
      kind: 'folder',
      blurb: 'Publishable design system packages.',
      path: '/packages',
      children: [
        {
          id: 'wash-ui',
          name: 'menzies-design-wash-ui',
          kind: 'folder',
          blurb: 'Web design system: CSS tokens, React adapter, charts, editors.',
          path: '/packages/menzies-design-wash-ui',
          children: [
            {
              id: 'wash-ui-src',
              name: 'src',
              kind: 'folder',
              path: '/packages/menzies-design-wash-ui/src',
              children: [
                {
                  id: 'styles',
                  name: 'styles',
                  kind: 'folder',
                  blurb: 'Pigment tokens, utilities, editor chrome, fonts.',
                  path: '/packages/menzies-design-wash-ui/src/styles',
                  children: [
                    {
                      id: 'index-css',
                      name: 'index.css',
                      kind: 'file',
                      path: '/packages/menzies-design-wash-ui/src/styles/index.css',
                      blurb: 'Entry that pulls tokens, pigments, utilities, and editor CSS.',
                    },
                    {
                      id: 'fonts-css',
                      name: 'fonts.css',
                      kind: 'file',
                      path: '/packages/menzies-design-wash-ui/src/styles/fonts.css',
                      blurb: 'Fraunces + Maple Mono latin woff2 faces.',
                    },
                    {
                      id: 'editor-css',
                      name: 'editor.css',
                      kind: 'file',
                      path: '/packages/menzies-design-wash-ui/src/styles/editor.css',
                      blurb: 'Rich text and code editor chrome under .wash-rte / .wash-code-editor.',
                    },
                    {
                      id: 'fonts-dir',
                      name: 'fonts',
                      kind: 'folder',
                      path: '/packages/menzies-design-wash-ui/src/fonts',
                      children: [
                        {
                          id: 'fraunces-dir',
                          name: 'fraunces',
                          kind: 'folder',
                          path: '/packages/menzies-design-wash-ui/src/fonts/fraunces',
                          children: [
                            {
                              id: 'fraunces-700',
                              name: 'fraunces-latin-700-normal.woff2',
                              kind: 'file',
                              blurb: 'Display weight for font-display headings.',
                            },
                          ],
                        },
                        {
                          id: 'maple-dir',
                          name: 'maple-mono',
                          kind: 'folder',
                          path: '/packages/menzies-design-wash-ui/src/fonts/maple-mono',
                          children: [
                            {
                              id: 'maple-400',
                              name: 'maple-mono-latin-400-normal.woff2',
                              kind: 'file',
                              blurb: 'Body / mono UI face for font-sans and font-mono.',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: 'theme',
                  name: 'theme',
                  kind: 'folder',
                  path: '/packages/menzies-design-wash-ui/src/theme',
                  children: [
                    {
                      id: 'themes-ts',
                      name: 'themes.ts',
                      kind: 'file',
                      blurb: 'Pigment definitions: mineral, ultramarine, ochre, rose, and dark pairs.',
                    },
                  ],
                },
                {
                  id: 'components',
                  name: 'components',
                  kind: 'folder',
                  path: '/packages/menzies-design-wash-ui/src/components',
                  children: [
                    {
                      id: 'editor-dir',
                      name: 'editor',
                      kind: 'folder',
                      path: '/packages/menzies-design-wash-ui/src/components/editor',
                      children: [
                        {
                          id: 'languages-dir',
                          name: 'languages',
                          kind: 'folder',
                          path: '/packages/menzies-design-wash-ui/src/components/editor/languages',
                          children: [
                            {
                              id: 'registry-ts',
                              name: 'registry.ts',
                              kind: 'file',
                              blurb: 'Grammar pack registry for CodeEditor (not real LSP).',
                            },
                            {
                              id: 'typescript-pack',
                              name: 'typescript.ts',
                              kind: 'file',
                              blurb: 'TypeScript keywords, snippets, and light validators.',
                            },
                          ],
                        },
                        {
                          id: 'tokenize-ts',
                          name: 'tokenize.ts',
                          kind: 'file',
                          blurb: 'Highlight overlay tokenizer for .wash-code-tok-* classes.',
                        },
                      ],
                    },
                    {
                      id: 'code-editor-tsx',
                      name: 'CodeEditor.tsx',
                      kind: 'file',
                      blurb: 'From-scratch IDE chrome: tabs, find, gutter, completions.',
                    },
                    {
                      id: 'rte-tsx',
                      name: 'RichTextEditor.tsx',
                      kind: 'file',
                      blurb: 'From-scratch contenteditable document editor.',
                    },
                  ],
                },
                {
                  id: 'charts',
                  name: 'charts',
                  kind: 'folder',
                  path: '/packages/menzies-design-wash-ui/src/charts',
                  children: [
                    {
                      id: 'theme-charts',
                      name: 'theme.ts',
                      kind: 'file',
                      blurb: 'ApexCharts theme bridge to Wash pigments.',
                    },
                  ],
                },
              ],
            },
            {
              id: 'package-json',
              name: 'package.json',
              kind: 'file',
              blurb: '@menzies-mariesta-com/menzies-design-wash-ui publish manifest.',
            },
          ],
        },
      ],
    },
    {
      id: 'apps',
      name: 'apps',
      kind: 'folder',
      blurb: 'Gallery demo for Wash UI (web).',
      path: '/apps',
      children: [
        {
          id: 'demo',
          name: 'demo',
          kind: 'folder',
          path: '/apps/demo',
          children: [
            {
              id: 'demo-src',
              name: 'src',
              kind: 'folder',
              children: [
                {
                  id: 'fonts-page',
                  name: 'FontsPage.tsx',
                  kind: 'file',
                  blurb: 'Brand kit fonts in a planned bento grid.',
                },
                {
                  id: 'file-tree-page',
                  name: 'FileTreeTemplatePage.tsx',
                  kind: 'file',
                  blurb: 'This template: deep design file tree with selection detail.',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

function fileIcon(name: string) {
  if (name.endsWith('.json')) return FileJson
  if (name.endsWith('.css') || name.endsWith('.woff2')) return FileType
  if (
    name.endsWith('.ts') ||
    name.endsWith('.tsx') ||
    name.endsWith('.kt') ||
    name.endsWith('.js')
  ) {
    return FileCode
  }
  if (name.endsWith('.svelte') || name.endsWith('.vue')) return Braces
  return FileType
}

function collectFolderIds(node: TreeNode, into: Set<string> = new Set()) {
  if (node.kind === 'folder') {
    into.add(node.id)
    node.children?.forEach((child) => collectFolderIds(child, into))
  }
  return into
}

function findNode(node: TreeNode, id: string): TreeNode | null {
  if (node.id === id) return node
  for (const child of node.children ?? []) {
    const hit = findNode(child, id)
    if (hit) return hit
  }
  return null
}

function buildPathLabels(node: TreeNode, id: string, trail: string[] = []): string[] | null {
  const next = [...trail, node.name]
  if (node.id === id) return next
  for (const child of node.children ?? []) {
    const hit = buildPathLabels(child, id, next)
    if (hit) return hit
  }
  return null
}

function TreeRows({
  node,
  depth,
  openIds,
  selectedId,
  onToggle,
  onSelect,
}: {
  node: TreeNode
  depth: number
  openIds: Set<string>
  selectedId: string
  onToggle: (id: string) => void
  onSelect: (id: string) => void
}) {
  const isFolder = node.kind === 'folder'
  const open = openIds.has(node.id)
  const selected = selectedId === node.id
  const Icon = isFolder ? (open ? FolderOpen : Folder) : fileIcon(node.name)
  const pad = { paddingLeft: `${0.5 + depth * 0.85}rem` }

  return (
    <>
      <li>
        <button
          type="button"
          className={`flex w-full cursor-pointer items-center gap-1.5 rounded-btn px-2 py-1.5 text-left text-sm transition-colors hover:bg-base-200 ${
            selected ? 'bg-primary/20 text-primary' : ''
          }`}
          style={pad}
          aria-expanded={isFolder ? open : undefined}
          aria-current={selected ? 'true' : undefined}
          onClick={() => {
            onSelect(node.id)
            if (isFolder) onToggle(node.id)
          }}
        >
          {isFolder ? (
            <ChevronRight
              className={`size-3.5 shrink-0 text-base-content/50 transition-transform ${
                open ? 'rotate-90' : ''
              }`}
              aria-hidden="true"
            />
          ) : (
            <span className="inline-block size-3.5 shrink-0" aria-hidden="true" />
          )}
          <Icon className="size-4 shrink-0" strokeWidth={2} aria-hidden="true" />
          <span className="min-w-0 truncate font-mono text-xs sm:text-sm">{node.name}</span>
        </button>
      </li>
      {isFolder && open
        ? (node.children ?? []).map((child) => (
            <TreeRows
              key={child.id}
              node={child}
              depth={depth + 1}
              openIds={openIds}
              selectedId={selectedId}
              onToggle={onToggle}
              onSelect={onSelect}
            />
          ))
        : null}
    </>
  )
}

function FileTreeDesk() {
  const defaultOpen = useMemo(() => collectFolderIds(designTree), [])
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set(defaultOpen))
  const [selectedId, setSelectedId] = useState('registry-ts')

  const selected = findNode(designTree, selectedId) ?? designTree
  const crumbs = buildPathLabels(designTree, selectedId) ?? [designTree.name]

  const onToggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="grid min-h-[28rem] overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-sm lg:grid-cols-[minmax(16rem,22rem)_minmax(0,1fr)]">
      <aside className="flex min-h-0 flex-col border-b border-base-300 lg:border-b-0 lg:border-r">
        <header className="flex shrink-0 items-center gap-2 border-b border-base-300 bg-base-200/70 px-3 py-2.5">
          <FolderOpen className="size-4 text-primary" strokeWidth={2} aria-hidden="true" />
          <h2 className="font-display text-sm font-semibold">Design tree</h2>
        </header>
        <nav
          className="min-h-0 flex-1 overflow-auto py-2"
          aria-label="Design library file tree"
        >
          <ul className="menu menu-sm w-full bg-transparent p-0">
            <TreeRows
              node={designTree}
              depth={0}
              openIds={openIds}
              selectedId={selectedId}
              onToggle={onToggle}
              onSelect={setSelectedId}
            />
          </ul>
        </nav>
      </aside>

      <section className="flex min-h-0 flex-col">
        <header className="shrink-0 border-b border-base-300 bg-base-200/50 px-4 py-2.5">
          <p className="label-ink text-xs">Selected path</p>
          <nav aria-label="Breadcrumb" className="mt-1">
            <ol className="flex flex-wrap items-center gap-1 font-mono text-xs text-ink-muted">
              {crumbs.map((part, index) => (
                <li key={`${part}-${index}`} className="flex items-center gap-1">
                  {index > 0 ? (
                    <ChevronRight className="size-3 opacity-50" aria-hidden="true" />
                  ) : null}
                  <span
                    className={
                      index === crumbs.length - 1
                        ? 'font-semibold text-base-content'
                        : undefined
                    }
                  >
                    {part}
                  </span>
                </li>
              ))}
            </ol>
          </nav>
        </header>

        <div className="flex flex-1 flex-col gap-4 overflow-auto p-4 sm:p-5">
          <div>
            <p className="label-ink">
              {selected.kind === 'folder' ? 'Folder' : 'File'}
            </p>
            <h3 className="font-display mt-1 text-xl font-semibold sm:text-2xl">
              {selected.name}
            </h3>
            {selected.path ? (
              <p className="mt-1 font-mono text-xs text-ink-muted">{selected.path}</p>
            ) : null}
          </div>

          <div className="wash-panel paper-grain wash-panel-blue">
            <p className="label-ink">Deep dive</p>
            <p className="mt-2 text-sm text-base-content/90">
              {selected.blurb ??
                'Part of the Wash design tree. Open nested folders to walk tokens, editors, Compose, and demos.'}
            </p>
          </div>

          {selected.kind === 'folder' && (selected.children?.length ?? 0) > 0 ? (
            <div>
              <p className="label-ink mb-2">Children</p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {selected.children!.map((child) => {
                  const ChildIcon =
                    child.kind === 'folder' ? Folder : fileIcon(child.name)
                  return (
                    <li key={child.id}>
                      <button
                        type="button"
                        className="flex w-full cursor-pointer items-center gap-2 rounded-box border border-ink-border/70 bg-base-100/80 px-3 py-2 text-left text-sm hover:bg-base-200"
                        onClick={() => {
                          setSelectedId(child.id)
                          if (child.kind === 'folder') {
                            setOpenIds((prev) => new Set(prev).add(child.id))
                          }
                        }}
                      >
                        <ChildIcon
                          className="size-4 shrink-0"
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                        <span className="min-w-0 truncate font-mono text-xs">
                          {child.name}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  )
}

function PreviewShell({ children }: { children: ReactNode }) {
  return <div className="rounded-box bg-base-200/50 p-3 sm:p-4">{children}</div>
}

export default function FileTreeTemplatePage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Template gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          File tree
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Nested explorer that walks deep into the Wash design monorepo: tokens,
          fonts, editors, Compose, and demos. Select a node for the deep-dive panel.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Design explorer"
          title="Deep design file tree"
          description="Expand folders, select files, and read the design note for each node"
        >
          <ShowcaseTabs
            preview={
              <PreviewShell>
                <FileTreeDesk />
              </PreviewShell>
            }
            html={kitFileTreeHtml}
            jsx={kitFileTreeJsx}
            svelteFiles={kitFileTreeSvelteFiles}
          />
        </GallerySection>
      </div>
    </>
  )
}
