import { useMemo, useState, type ReactNode } from 'react'

import { ShowcaseTabs } from './components/ShowcaseTabs'
type OrgNode = {
  id: string
  name: string
  role?: string
  initials?: string
  wash?: string
  children?: OrgNode[]
}

const basicTree: OrgNode = {
  id: 'root',
  name: 'Studio',
  children: [
    { id: 'a', name: 'Sketch' },
    { id: 'b', name: 'Wash' },
    { id: 'c', name: 'Glaze' },
  ],
}

const menziesTree: OrgNode = {
  id: 'director',
  name: 'Mira Kline',
  role: 'Director',
  initials: 'MK',
  wash: 'bg-wash-blue',
  children: [
    {
      id: 'color-lead',
      name: 'Jonah Reed',
      role: 'Color lead',
      initials: 'JR',
      wash: 'bg-wash-ochre',
      children: [
        {
          id: 'wash-tech',
          name: 'Ava Chen',
          role: 'Wash tech',
          initials: 'AC',
          wash: 'bg-wash-rose',
        },
      ],
    },
    {
      id: 'critique-host',
      name: 'Ellis Park',
      role: 'Critique host',
      initials: 'EP',
      wash: 'bg-secondary/40',
    },
  ],
}

const densityTree: OrgNode = {
  id: 'desk',
  name: 'Pigment desk',
  role: 'Lead',
  initials: 'PD',
  wash: 'bg-wash-blue',
  children: [
    {
      id: 'series',
      name: 'Series A',
      role: 'Plate lead',
      initials: 'SA',
      wash: 'bg-wash-ochre',
      children: [
        { id: 'p1', name: 'Plate 1', role: 'Artist', initials: 'P1', wash: 'bg-wash-rose' },
        { id: 'p2', name: 'Plate 2', role: 'Artist', initials: 'P2', wash: 'bg-wash-rose' },
      ],
    },
    {
      id: 'series-b',
      name: 'Series B',
      role: 'Plate lead',
      initials: 'SB',
      wash: 'bg-secondary/40',
      children: [
        { id: 'p3', name: 'Plate 3', role: 'Artist', initials: 'P3', wash: 'bg-wash-blue' },
      ],
    },
  ],
}

function Section({
  eyebrow,
  title,
  description,
  children,
  panel = '',
}: {
  eyebrow: string
  title: string
  description: string
  children: ReactNode
  panel?: string
}) {
  return (
    <article className={`wash-panel wash-panel-flush paper-grain soak-in ${panel}`}>
      <div className="border-b border-ink-border/70 px-5 py-4">
        <p className="label-ink">{eyebrow}</p>
        <h2 className="font-display text-xl font-semibold md:text-2xl">{title}</h2>
        <p className="mt-1 text-sm text-ink-muted">{description}</p>
      </div>
      <div className="p-5">{children}</div>
    </article>
  )
}

function ClassLabel({ value }: { value: string }) {
  return (
    <code className="font-mono text-[0.65rem] text-ink-muted">{value}</code>
  )
}

function ScrollFrame({ children }: { children: ReactNode }) {
  return (
    <div className="w-full overflow-x-auto pb-1">
      <div className="inline-block min-w-max">{children}</div>
    </div>
  )
}

function collectDescendants(node: OrgNode): Set<string> {
  const ids = new Set<string>([node.id])
  for (const child of node.children ?? []) {
    for (const id of collectDescendants(child)) ids.add(id)
  }
  return ids
}

function findNode(node: OrgNode, id: string): OrgNode | null {
  if (node.id === id) return node
  for (const child of node.children ?? []) {
    const found = findNode(child, id)
    if (found) return found
  }
  return null
}

type Density = 'compact' | 'expanded'

function OrgCard({
  node,
  density = 'expanded',
  selected = false,
  highlighted = false,
  interactive = false,
  onSelect,
}: {
  node: OrgNode
  density?: Density
  selected?: boolean
  highlighted?: boolean
  interactive?: boolean
  onSelect?: (id: string) => void
}) {
  const compact = density === 'compact'
  const showAvatar = Boolean(node.initials)
  const ring = selected
    ? 'ring-2 ring-primary'
    : highlighted
      ? 'ring-2 ring-primary/40'
      : 'ring-1 ring-ink-border/70'

  const body = (
    <>
      {showAvatar ? (
        <div className="avatar avatar-placeholder">
          <div
            className={`${compact ? 'w-8 text-xs' : 'w-10 text-sm'} rounded-full font-semibold text-base-content ${node.wash ?? 'bg-base-200'}`}
          >
            <span>{node.initials}</span>
          </div>
        </div>
      ) : null}
      <div className={`min-w-0 text-left ${showAvatar ? '' : 'text-center'}`}>
        <p
          className={`font-medium leading-tight ${compact ? 'text-xs' : 'text-sm'}`}
        >
          {node.name}
        </p>
        {node.role ? (
          <p className={`text-ink-muted ${compact ? 'text-[0.65rem]' : 'text-xs'}`}>
            {node.role}
          </p>
        ) : null}
      </div>
    </>
  )

  const shellClass = `card card-border bg-base-100 ${ring} ${
    compact ? 'min-w-[7.5rem]' : 'min-w-[9.5rem]'
  } ${interactive ? 'cursor-pointer transition-shadow hover:bg-primary/10' : ''}`

  if (interactive && onSelect) {
    return (
      <button
        type="button"
        className={`${shellClass} text-inherit`}
        aria-pressed={selected}
        aria-label={`${node.name}${node.role ? `, ${node.role}` : ''}`}
        onClick={() => onSelect(node.id)}
      >
        <div
          className={`card-body items-center gap-2 ${compact ? 'p-2' : 'p-3'} ${showAvatar ? 'flex-row' : ''}`}
        >
          {body}
        </div>
      </button>
    )
  }

  return (
    <div className={shellClass}>
      <div
        className={`card-body items-center gap-2 ${compact ? 'p-2' : 'p-3'} ${showAvatar ? 'flex-row' : ''}`}
      >
        {body}
      </div>
    </div>
  )
}

function VerticalTree({
  node,
  density = 'expanded',
  interactive = false,
  selectedId,
  highlightIds,
  onSelect,
}: {
  node: OrgNode
  density?: Density
  interactive?: boolean
  selectedId?: string | null
  highlightIds?: Set<string>
  onSelect?: (id: string) => void
}) {
  const kids = node.children ?? []
  const selected = selectedId === node.id
  const highlighted = Boolean(highlightIds?.has(node.id) && !selected)

  return (
    <div className="flex flex-col items-center">
      <OrgCard
        node={node}
        density={density}
        interactive={interactive}
        selected={selected}
        highlighted={highlighted}
        onSelect={onSelect}
      />
      {kids.length > 0 ? (
        <>
          <div className="h-5 w-px bg-base-300" aria-hidden />
          <div className="relative flex items-start justify-center gap-6 pt-0">
            {kids.length > 1 ? (
              <div
                className="absolute top-0 left-[12.5%] right-[12.5%] h-px bg-base-300"
                aria-hidden
              />
            ) : null}
            {kids.map((child) => (
              <div key={child.id} className="flex flex-col items-center">
                <div className="h-5 w-px bg-base-300" aria-hidden />
                <VerticalTree
                  node={child}
                  density={density}
                  interactive={interactive}
                  selectedId={selectedId}
                  highlightIds={highlightIds}
                  onSelect={onSelect}
                />
              </div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  )
}

function HorizontalTree({
  node,
  density = 'expanded',
}: {
  node: OrgNode
  density?: Density
}) {
  const kids = node.children ?? []

  return (
    <div className="flex items-center">
      <OrgCard node={node} density={density} />
      {kids.length > 0 ? (
        <>
          <div className="h-px w-5 bg-base-300" aria-hidden />
          <div className="relative flex flex-col justify-center gap-4 pl-0">
            {kids.length > 1 ? (
              <div
                className="absolute top-[12.5%] bottom-[12.5%] left-0 w-px bg-base-300"
                aria-hidden
              />
            ) : null}
            {kids.map((child) => (
              <div key={child.id} className="flex items-center">
                <div className="h-px w-5 bg-base-300" aria-hidden />
                <HorizontalTree node={child} density={density} />
              </div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  )
}

function InteractiveOrg() {
  const [selectedId, setSelectedId] = useState<string>('director')

  const selectedNode = useMemo(
    () => findNode(menziesTree, selectedId),
    [selectedId],
  )

  const highlightIds = useMemo(() => {
    if (!selectedNode) return new Set<string>()
    return collectDescendants(selectedNode)
  }, [selectedNode])

  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
      <ScrollFrame>
        <VerticalTree
          node={menziesTree}
          interactive
          selectedId={selectedId}
          highlightIds={highlightIds}
          onSelect={setSelectedId}
        />
      </ScrollFrame>

      <aside className="wash-panel wash-panel-ochre w-full shrink-0 lg:max-w-xs">
        <p className="label-ink">Selected</p>
        {selectedNode ? (
          <>
            <div className="mt-3 flex items-center gap-3">
              <div className="avatar avatar-placeholder">
                <div
                  className={`w-12 rounded-full text-sm font-semibold text-base-content ${selectedNode.wash ?? 'bg-base-200'}`}
                >
                  <span>{selectedNode.initials ?? selectedNode.name.slice(0, 2)}</span>
                </div>
              </div>
              <div>
                <p className="font-display text-lg font-semibold leading-tight">
                  {selectedNode.name}
                </p>
                {selectedNode.role ? (
                  <p className="text-sm text-ink-muted">{selectedNode.role}</p>
                ) : null}
              </div>
            </div>
            <p className="mt-3 text-sm text-ink-muted">
              Highlight covers this node and{' '}
              {Math.max(0, highlightIds.size - 1)} descendant
              {highlightIds.size === 2 ? '' : 's'}.
            </p>
            <ClassLabel value="card + avatar + ring-primary" />
          </>
        ) : (
          <p className="mt-2 text-sm text-ink-muted">Select a node to inspect.</p>
        )}
      </aside>
    </div>
  )
}

function DensityToggle() {
  const [density, setDensity] = useState<Density>('expanded')

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="join">
        <button
          type="button"
          className={`btn join-item btn-sm cursor-pointer ${density === 'compact' ? 'btn-primary' : 'btn-ghost'}`}
          aria-pressed={density === 'compact'}
          onClick={() => setDensity('compact')}
        >
          Compact
        </button>
        <button
          type="button"
          className={`btn join-item btn-sm cursor-pointer ${density === 'expanded' ? 'btn-primary' : 'btn-ghost'}`}
          aria-pressed={density === 'expanded'}
          onClick={() => setDensity('expanded')}
        >
          Expanded
        </button>
      </div>
      <ScrollFrame>
        <VerticalTree node={densityTree} density={density} />
      </ScrollFrame>
      <ClassLabel
        value={
          density === 'compact'
            ? 'org-tree compact (p-2, text-xs)'
            : 'org-tree expanded (p-3, text-sm)'
        }
      />
    </div>
  )
}

export default function OrgChartPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Org chart
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Pure CSS hierarchy trees with daisyUI{' '}
          <span className="font-mono text-xs">card</span> and{' '}
          <span className="font-mono text-xs">avatar</span>.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Basic tree"
          description="Root to children with border connectors"
        >
          <ShowcaseTabs
            preview={
              <>

              <ScrollFrame>
                            <VerticalTree node={basicTree} />
                          </ScrollFrame>
            
              </>
            }
          
            html={`<div class="w-full overflow-x-auto pb-1"><div class="inline-block min-w-max"><div class="flex flex-col items-center"><div class="card card-border bg-base-100 ring-1 ring-ink-border/70 min-w-[9.5rem]"><div class="card-body items-center gap-2 p-3 "><div class="min-w-0 text-left text-center"><p class="font-medium leading-tight text-sm">Studio</p></div></div></div><div class="h-5 w-px bg-base-300" aria-hidden="true"></div><div class="relative flex items-start justify-center gap-6 pt-0"><div class="absolute top-0 left-[12.5%] right-[12.5%] h-px bg-base-300" aria-hidden="true"></div><div class="flex flex-col items-center"><div class="h-5 w-px bg-base-300" aria-hidden="true"></div><div class="card card-border bg-base-100 ring-1 ring-ink-border/70 min-w-[9.5rem]"><div class="card-body items-center gap-2 p-3 "><div class="min-w-0 text-left text-center"><p class="font-medium leading-tight text-sm">Sketch</p></div></div></div></div><div class="flex flex-col items-center"><div class="h-5 w-px bg-base-300" aria-hidden="true"></div><div class="card card-border bg-base-100 ring-1 ring-ink-border/70 min-w-[9.5rem]"><div class="card-body items-center gap-2 p-3 "><div class="min-w-0 text-left text-center"><p class="font-medium leading-tight text-sm">Wash</p></div></div></div></div><div class="flex flex-col items-center"><div class="h-5 w-px bg-base-300" aria-hidden="true"></div><div class="card card-border bg-base-100 ring-1 ring-ink-border/70 min-w-[9.5rem]"><div class="card-body items-center gap-2 p-3 "><div class="min-w-0 text-left text-center"><p class="font-medium leading-tight text-sm">Glaze</p></div></div></div></div></div></div></div></div>`}
            jsx={`<div className="w-full overflow-x-auto pb-1"><div className="inline-block min-w-max"><div className="flex flex-col items-center"><div className="card card-border bg-base-100 ring-1 ring-ink-border/70 min-w-[9.5rem]"><div className="card-body items-center gap-2 p-3 "><div className="min-w-0 text-left text-center"><p className="font-medium leading-tight text-sm">Studio</p></div></div></div><div className="h-5 w-px bg-base-300" aria-hidden="true"></div><div className="relative flex items-start justify-center gap-6 pt-0"><div className="absolute top-0 left-[12.5%] right-[12.5%] h-px bg-base-300" aria-hidden="true"></div><div className="flex flex-col items-center"><div className="h-5 w-px bg-base-300" aria-hidden="true"></div><div className="card card-border bg-base-100 ring-1 ring-ink-border/70 min-w-[9.5rem]"><div className="card-body items-center gap-2 p-3 "><div className="min-w-0 text-left text-center"><p className="font-medium leading-tight text-sm">Sketch</p></div></div></div></div><div className="flex flex-col items-center"><div className="h-5 w-px bg-base-300" aria-hidden="true"></div><div className="card card-border bg-base-100 ring-1 ring-ink-border/70 min-w-[9.5rem]"><div className="card-body items-center gap-2 p-3 "><div className="min-w-0 text-left text-center"><p className="font-medium leading-tight text-sm">Wash</p></div></div></div></div><div className="flex flex-col items-center"><div className="h-5 w-px bg-base-300" aria-hidden="true"></div><div className="card card-border bg-base-100 ring-1 ring-ink-border/70 min-w-[9.5rem]"><div className="card-body items-center gap-2 p-3 "><div className="min-w-0 text-left text-center"><p className="font-medium leading-tight text-sm">Glaze</p></div></div></div></div></div></div></div></div>`}
          />
        </Section>

        <Section
          eyebrow="02 · Direction"
          title="Horizontal and vertical"
          description="Same Menzies Design branch rendered top-down and left-to-right"
          panel="wash-panel-blue"
        >
          <div className="flex flex-col gap-8">
            <ShowcaseTabs
            preview={
              <>

              <ScrollFrame>
                              <VerticalTree
                                node={{
                                  id: 'v-root',
                                  name: 'Director',
                                  children: [
                                    { id: 'v-a', name: 'Color lead' },
                                    { id: 'v-b', name: 'Critique host' },
                                  ],
                                }}
                              />
                            </ScrollFrame>
            
              </>
            }
          
            html={`<div class="w-full overflow-x-auto pb-1"><div class="inline-block min-w-max"><div class="flex flex-col items-center"><div class="card card-border bg-base-100 ring-1 ring-ink-border/70 min-w-[9.5rem]"><div class="card-body items-center gap-2 p-3 "><div class="min-w-0 text-left text-center"><p class="font-medium leading-tight text-sm">Director</p></div></div></div><div class="h-5 w-px bg-base-300" aria-hidden="true"></div><div class="relative flex items-start justify-center gap-6 pt-0"><div class="absolute top-0 left-[12.5%] right-[12.5%] h-px bg-base-300" aria-hidden="true"></div><div class="flex flex-col items-center"><div class="h-5 w-px bg-base-300" aria-hidden="true"></div><div class="card card-border bg-base-100 ring-1 ring-ink-border/70 min-w-[9.5rem]"><div class="card-body items-center gap-2 p-3 "><div class="min-w-0 text-left text-center"><p class="font-medium leading-tight text-sm">Color lead</p></div></div></div></div><div class="flex flex-col items-center"><div class="h-5 w-px bg-base-300" aria-hidden="true"></div><div class="card card-border bg-base-100 ring-1 ring-ink-border/70 min-w-[9.5rem]"><div class="card-body items-center gap-2 p-3 "><div class="min-w-0 text-left text-center"><p class="font-medium leading-tight text-sm">Critique host</p></div></div></div></div></div></div></div></div>`}
            jsx={`<div className="w-full overflow-x-auto pb-1"><div className="inline-block min-w-max"><div className="flex flex-col items-center"><div className="card card-border bg-base-100 ring-1 ring-ink-border/70 min-w-[9.5rem]"><div className="card-body items-center gap-2 p-3 "><div className="min-w-0 text-left text-center"><p className="font-medium leading-tight text-sm">Director</p></div></div></div><div className="h-5 w-px bg-base-300" aria-hidden="true"></div><div className="relative flex items-start justify-center gap-6 pt-0"><div className="absolute top-0 left-[12.5%] right-[12.5%] h-px bg-base-300" aria-hidden="true"></div><div className="flex flex-col items-center"><div className="h-5 w-px bg-base-300" aria-hidden="true"></div><div className="card card-border bg-base-100 ring-1 ring-ink-border/70 min-w-[9.5rem]"><div className="card-body items-center gap-2 p-3 "><div className="min-w-0 text-left text-center"><p className="font-medium leading-tight text-sm">Color lead</p></div></div></div></div><div className="flex flex-col items-center"><div className="h-5 w-px bg-base-300" aria-hidden="true"></div><div className="card card-border bg-base-100 ring-1 ring-ink-border/70 min-w-[9.5rem]"><div className="card-body items-center gap-2 p-3 "><div className="min-w-0 text-left text-center"><p className="font-medium leading-tight text-sm">Critique host</p></div></div></div></div></div></div></div></div>`}
          />
            <ShowcaseTabs
            preview={
              <>

              <ScrollFrame>
                              <HorizontalTree
                                node={{
                                  id: 'h-root',
                                  name: 'Director',
                                  children: [
                                    { id: 'h-a', name: 'Color lead' },
                                    { id: 'h-b', name: 'Critique host' },
                                  ],
                                }}
                              />
                            </ScrollFrame>
            
              </>
            }
          
            html={`<div class="w-full overflow-x-auto pb-1"><div class="inline-block min-w-max"><div class="flex items-center"><div class="card card-border bg-base-100 ring-1 ring-ink-border/70 min-w-[9.5rem]"><div class="card-body items-center gap-2 p-3 "><div class="min-w-0 text-left text-center"><p class="font-medium leading-tight text-sm">Director</p></div></div></div><div class="h-px w-5 bg-base-300" aria-hidden="true"></div><div class="relative flex flex-col justify-center gap-4 pl-0"><div class="absolute top-[12.5%] bottom-[12.5%] left-0 w-px bg-base-300" aria-hidden="true"></div><div class="flex items-center"><div class="h-px w-5 bg-base-300" aria-hidden="true"></div><div class="card card-border bg-base-100 ring-1 ring-ink-border/70 min-w-[9.5rem]"><div class="card-body items-center gap-2 p-3 "><div class="min-w-0 text-left text-center"><p class="font-medium leading-tight text-sm">Color lead</p></div></div></div></div><div class="flex items-center"><div class="h-px w-5 bg-base-300" aria-hidden="true"></div><div class="card card-border bg-base-100 ring-1 ring-ink-border/70 min-w-[9.5rem]"><div class="card-body items-center gap-2 p-3 "><div class="min-w-0 text-left text-center"><p class="font-medium leading-tight text-sm">Critique host</p></div></div></div></div></div></div></div></div>`}
            jsx={`<div className="w-full overflow-x-auto pb-1"><div className="inline-block min-w-max"><div className="flex items-center"><div className="card card-border bg-base-100 ring-1 ring-ink-border/70 min-w-[9.5rem]"><div className="card-body items-center gap-2 p-3 "><div className="min-w-0 text-left text-center"><p className="font-medium leading-tight text-sm">Director</p></div></div></div><div className="h-px w-5 bg-base-300" aria-hidden="true"></div><div className="relative flex flex-col justify-center gap-4 pl-0"><div className="absolute top-[12.5%] bottom-[12.5%] left-0 w-px bg-base-300" aria-hidden="true"></div><div className="flex items-center"><div className="h-px w-5 bg-base-300" aria-hidden="true"></div><div className="card card-border bg-base-100 ring-1 ring-ink-border/70 min-w-[9.5rem]"><div className="card-body items-center gap-2 p-3 "><div className="min-w-0 text-left text-center"><p className="font-medium leading-tight text-sm">Color lead</p></div></div></div></div><div className="flex items-center"><div className="h-px w-5 bg-base-300" aria-hidden="true"></div><div className="card card-border bg-base-100 ring-1 ring-ink-border/70 min-w-[9.5rem]"><div className="card-body items-center gap-2 p-3 "><div className="min-w-0 text-left text-center"><p className="font-medium leading-tight text-sm">Critique host</p></div></div></div></div></div></div></div></div>`}
          />
          </div>
        </Section>

        <Section
          eyebrow="03 · Roles"
          title="Avatars and roles"
          description="Menzies Design studio: Director, Color lead, Wash tech"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>

              <ScrollFrame>
                            <VerticalTree node={menziesTree} />
                          </ScrollFrame>
            
              </>
            }
          
            html={`<div class="w-full overflow-x-auto pb-1"><div class="inline-block min-w-max"><div class="flex flex-col items-center"><div class="card card-border bg-base-100 ring-1 ring-ink-border/70 min-w-[9.5rem]"><div class="card-body items-center gap-2 p-3 flex-row"><div class="avatar avatar-placeholder"><div class="w-10 text-sm rounded-full font-semibold text-base-content bg-wash-blue"><span>MK</span></div></div><div class="min-w-0 text-left "><p class="font-medium leading-tight text-sm">Mira Kline</p><p class="text-ink-muted text-xs">Director</p></div></div></div><div class="h-5 w-px bg-base-300" aria-hidden="true"></div><div class="relative flex items-start justify-center gap-6 pt-0"><div class="absolute top-0 left-[12.5%] right-[12.5%] h-px bg-base-300" aria-hidden="true"></div><div class="flex flex-col items-center"><div class="h-5 w-px bg-base-300" aria-hidden="true"></div><div class="card card-border bg-base-100 ring-1 ring-ink-border/70 min-w-[9.5rem]"><div class="card-body items-center gap-2 p-3 flex-row"><div class="avatar avatar-placeholder"><div class="w-10 text-sm rounded-full font-semibold text-base-content bg-wash-ochre"><span>JR</span></div></div><div class="min-w-0 text-left "><p class="font-medium leading-tight text-sm">Jonah Reed</p><p class="text-ink-muted text-xs">Color lead</p></div></div></div><div class="h-5 w-px bg-base-300" aria-hidden="true"></div><div class="relative flex items-start justify-center gap-6 pt-0"><div class="flex flex-col items-center"><div class="h-5 w-px bg-base-300" aria-hidden="true"></div><div class="card card-border bg-base-100 ring-1 ring-ink-border/70 min-w-[9.5rem]"><div class="card-body items-center gap-2 p-3 flex-row"><div class="avatar avatar-placeholder"><div class="w-10 text-sm rounded-full font-semibold text-base-content bg-wash-rose"><span>AC</span></div></div><div class="min-w-0 text-left "><p class="font-medium leading-tight text-sm">Ava Chen</p><p class="text-ink-muted text-xs">Wash tech</p></div></div></div></div></div></div><div class="flex flex-col items-center"><div class="h-5 w-px bg-base-300" aria-hidden="true"></div><div class="card card-border bg-base-100 ring-1 ring-ink-border/70 min-w-[9.5rem]"><div class="card-body items-center gap-2 p-3 flex-row"><div class="avatar avatar-placeholder"><div class="w-10 text-sm rounded-full font-semibold text-base-content bg-secondary/40"><span>EP</span></div></div><div class="min-w-0 text-left "><p class="font-medium leading-tight text-sm">Ellis Park</p><p class="text-ink-muted text-xs">Critique host</p></div></div></div></div></div></div></div></div>`}
            jsx={`<div className="w-full overflow-x-auto pb-1"><div className="inline-block min-w-max"><div className="flex flex-col items-center"><div className="card card-border bg-base-100 ring-1 ring-ink-border/70 min-w-[9.5rem]"><div className="card-body items-center gap-2 p-3 flex-row"><div className="avatar avatar-placeholder"><div className="w-10 text-sm rounded-full font-semibold text-base-content bg-wash-blue"><span>MK</span></div></div><div className="min-w-0 text-left "><p className="font-medium leading-tight text-sm">Mira Kline</p><p className="text-ink-muted text-xs">Director</p></div></div></div><div className="h-5 w-px bg-base-300" aria-hidden="true"></div><div className="relative flex items-start justify-center gap-6 pt-0"><div className="absolute top-0 left-[12.5%] right-[12.5%] h-px bg-base-300" aria-hidden="true"></div><div className="flex flex-col items-center"><div className="h-5 w-px bg-base-300" aria-hidden="true"></div><div className="card card-border bg-base-100 ring-1 ring-ink-border/70 min-w-[9.5rem]"><div className="card-body items-center gap-2 p-3 flex-row"><div className="avatar avatar-placeholder"><div className="w-10 text-sm rounded-full font-semibold text-base-content bg-wash-ochre"><span>JR</span></div></div><div className="min-w-0 text-left "><p className="font-medium leading-tight text-sm">Jonah Reed</p><p className="text-ink-muted text-xs">Color lead</p></div></div></div><div className="h-5 w-px bg-base-300" aria-hidden="true"></div><div className="relative flex items-start justify-center gap-6 pt-0"><div className="flex flex-col items-center"><div className="h-5 w-px bg-base-300" aria-hidden="true"></div><div className="card card-border bg-base-100 ring-1 ring-ink-border/70 min-w-[9.5rem]"><div className="card-body items-center gap-2 p-3 flex-row"><div className="avatar avatar-placeholder"><div className="w-10 text-sm rounded-full font-semibold text-base-content bg-wash-rose"><span>AC</span></div></div><div className="min-w-0 text-left "><p className="font-medium leading-tight text-sm">Ava Chen</p><p className="text-ink-muted text-xs">Wash tech</p></div></div></div></div></div></div><div className="flex flex-col items-center"><div className="h-5 w-px bg-base-300" aria-hidden="true"></div><div className="card card-border bg-base-100 ring-1 ring-ink-border/70 min-w-[9.5rem]"><div className="card-body items-center gap-2 p-3 flex-row"><div className="avatar avatar-placeholder"><div className="w-10 text-sm rounded-full font-semibold text-base-content bg-secondary/40"><span>EP</span></div></div><div className="min-w-0 text-left "><p className="font-medium leading-tight text-sm">Ellis Park</p><p className="text-ink-muted text-xs">Critique host</p></div></div></div></div></div></div></div></div>`}
          />
        </Section>

        <Section
          eyebrow="04 · Interactive"
          title="Select a node"
          description="Click a card to highlight descendants and open a detail panel"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>

              <InteractiveOrg />
            
              </>
            }
          
            html={`<div class="flex flex-col gap-5 lg:flex-row lg:items-start"><div class="w-full overflow-x-auto pb-1"><div class="inline-block min-w-max"><div class="flex flex-col items-center"><button type="button" class="card card-border bg-base-100 ring-2 ring-primary min-w-[9.5rem] cursor-pointer transition-shadow hover:bg-primary/10 text-inherit" aria-pressed="true" aria-label="Mira Kline, Director"><div class="card-body items-center gap-2 p-3 flex-row"><div class="avatar avatar-placeholder"><div class="w-10 text-sm rounded-full font-semibold text-base-content bg-wash-blue"><span>MK</span></div></div><div class="min-w-0 text-left "><p class="font-medium leading-tight text-sm">Mira Kline</p><p class="text-ink-muted text-xs">Director</p></div></div></button><div class="h-5 w-px bg-base-300" aria-hidden="true"></div><div class="relative flex items-start justify-center gap-6 pt-0"><div class="absolute top-0 left-[12.5%] right-[12.5%] h-px bg-base-300" aria-hidden="true"></div><div class="flex flex-col items-center"><div class="h-5 w-px bg-base-300" aria-hidden="true"></div><button type="button" class="card card-border bg-base-100 ring-2 ring-primary/40 min-w-[9.5rem] cursor-pointer transition-shadow hover:bg-primary/10 text-inherit" aria-pressed="false" aria-label="Jonah Reed, Color lead"><div class="card-body items-center gap-2 p-3 flex-row"><div class="avatar avatar-placeholder"><div class="w-10 text-sm rounded-full font-semibold text-base-content bg-wash-ochre"><span>JR</span></div></div><div class="min-w-0 text-left "><p class="font-medium leading-tight text-sm">Jonah Reed</p><p class="text-ink-muted text-xs">Color lead</p></div></div></button><div class="h-5 w-px bg-base-300" aria-hidden="true"></div><div class="relative flex items-start justify-center gap-6 pt-0"><div class="flex flex-col items-center"><div class="h-5 w-px bg-base-300" aria-hidden="true"></div><button type="button" class="card card-border bg-base-100 ring-2 ring-primary/40 min-w-[9.5rem] cursor-pointer transition-shadow hover:bg-primary/10 text-inherit" aria-pressed="false" aria-label="Ava Chen, Wash tech"><div class="card-body items-center gap-2 p-3 flex-row"><div class="avatar avatar-placeholder"><div class="w-10 text-sm rounded-full font-semibold text-base-content bg-wash-rose"><span>AC</span></div></div><div class="min-w-0 text-left "><p class="font-medium leading-tight text-sm">Ava Chen</p><p class="text-ink-muted text-xs">Wash tech</p></div></div></button></div></div></div><div class="flex flex-col items-center"><div class="h-5 w-px bg-base-300" aria-hidden="true"></div><button type="button" class="card card-border bg-base-100 ring-2 ring-primary/40 min-w-[9.5rem] cursor-pointer transition-shadow hover:bg-primary/10 text-inherit" aria-pressed="false" aria-label="Ellis Park, Critique host"><div class="card-body items-center gap-2 p-3 flex-row"><div class="avatar avatar-placeholder"><div class="w-10 text-sm rounded-full font-semibold text-base-content bg-secondary/40"><span>EP</span></div></div><div class="min-w-0 text-left "><p class="font-medium leading-tight text-sm">Ellis Park</p><p class="text-ink-muted text-xs">Critique host</p></div></div></button></div></div></div></div></div><aside class="wash-panel wash-panel-ochre w-full shrink-0 lg:max-w-xs"><p class="label-ink">Selected</p><div class="mt-3 flex items-center gap-3"><div class="avatar avatar-placeholder"><div class="w-12 rounded-full text-sm font-semibold text-base-content bg-wash-blue"><span>MK</span></div></div><div><p class="font-display text-lg font-semibold leading-tight">Mira Kline</p><p class="text-sm text-ink-muted">Director</p></div></div><p class="mt-3 text-sm text-ink-muted">Highlight covers this node and 3 descendants.</p></aside></div>`}
            jsx={`<div className="flex flex-col gap-5 lg:flex-row lg:items-start"><div className="w-full overflow-x-auto pb-1"><div className="inline-block min-w-max"><div className="flex flex-col items-center"><button type="button" className="card card-border bg-base-100 ring-2 ring-primary min-w-[9.5rem] cursor-pointer transition-shadow hover:bg-primary/10 text-inherit" aria-pressed="true" aria-label="Mira Kline, Director"><div className="card-body items-center gap-2 p-3 flex-row"><div className="avatar avatar-placeholder"><div className="w-10 text-sm rounded-full font-semibold text-base-content bg-wash-blue"><span>MK</span></div></div><div className="min-w-0 text-left "><p className="font-medium leading-tight text-sm">Mira Kline</p><p className="text-ink-muted text-xs">Director</p></div></div></button><div className="h-5 w-px bg-base-300" aria-hidden="true"></div><div className="relative flex items-start justify-center gap-6 pt-0"><div className="absolute top-0 left-[12.5%] right-[12.5%] h-px bg-base-300" aria-hidden="true"></div><div className="flex flex-col items-center"><div className="h-5 w-px bg-base-300" aria-hidden="true"></div><button type="button" className="card card-border bg-base-100 ring-2 ring-primary/40 min-w-[9.5rem] cursor-pointer transition-shadow hover:bg-primary/10 text-inherit" aria-pressed="false" aria-label="Jonah Reed, Color lead"><div className="card-body items-center gap-2 p-3 flex-row"><div className="avatar avatar-placeholder"><div className="w-10 text-sm rounded-full font-semibold text-base-content bg-wash-ochre"><span>JR</span></div></div><div className="min-w-0 text-left "><p className="font-medium leading-tight text-sm">Jonah Reed</p><p className="text-ink-muted text-xs">Color lead</p></div></div></button><div className="h-5 w-px bg-base-300" aria-hidden="true"></div><div className="relative flex items-start justify-center gap-6 pt-0"><div className="flex flex-col items-center"><div className="h-5 w-px bg-base-300" aria-hidden="true"></div><button type="button" className="card card-border bg-base-100 ring-2 ring-primary/40 min-w-[9.5rem] cursor-pointer transition-shadow hover:bg-primary/10 text-inherit" aria-pressed="false" aria-label="Ava Chen, Wash tech"><div className="card-body items-center gap-2 p-3 flex-row"><div className="avatar avatar-placeholder"><div className="w-10 text-sm rounded-full font-semibold text-base-content bg-wash-rose"><span>AC</span></div></div><div className="min-w-0 text-left "><p className="font-medium leading-tight text-sm">Ava Chen</p><p className="text-ink-muted text-xs">Wash tech</p></div></div></button></div></div></div><div className="flex flex-col items-center"><div className="h-5 w-px bg-base-300" aria-hidden="true"></div><button type="button" className="card card-border bg-base-100 ring-2 ring-primary/40 min-w-[9.5rem] cursor-pointer transition-shadow hover:bg-primary/10 text-inherit" aria-pressed="false" aria-label="Ellis Park, Critique host"><div className="card-body items-center gap-2 p-3 flex-row"><div className="avatar avatar-placeholder"><div className="w-10 text-sm rounded-full font-semibold text-base-content bg-secondary/40"><span>EP</span></div></div><div className="min-w-0 text-left "><p className="font-medium leading-tight text-sm">Ellis Park</p><p className="text-ink-muted text-xs">Critique host</p></div></div></button></div></div></div></div></div><aside className="wash-panel wash-panel-ochre w-full shrink-0 lg:max-w-xs"><p className="label-ink">Selected</p><div className="mt-3 flex items-center gap-3"><div className="avatar avatar-placeholder"><div className="w-12 rounded-full text-sm font-semibold text-base-content bg-wash-blue"><span>MK</span></div></div><div><p className="font-display text-lg font-semibold leading-tight">Mira Kline</p><p className="text-sm text-ink-muted">Director</p></div></div><p className="mt-3 text-sm text-ink-muted">Highlight covers this node and 3 descendants.</p></aside></div>`}
          />
        
        </Section>

        <Section
          eyebrow="05 · Density"
          title="Compact and expanded"
          description="Toggle padding and type size while keeping connectors readable"
        >
          <ShowcaseTabs
            preview={
              <>

              <DensityToggle />
            
              </>
            }
          
            html={`<div class="flex w-full flex-col gap-4"><div class="join"><button type="button" class="btn join-item btn-sm cursor-pointer btn-ghost" aria-pressed="false">Compact</button><button type="button" class="btn join-item btn-sm cursor-pointer btn-primary" aria-pressed="true">Expanded</button></div><div class="w-full overflow-x-auto pb-1"><div class="inline-block min-w-max"><div class="flex flex-col items-center"><div class="card card-border bg-base-100 ring-1 ring-ink-border/70 min-w-[9.5rem]"><div class="card-body items-center gap-2 p-3 flex-row"><div class="avatar avatar-placeholder"><div class="w-10 text-sm rounded-full font-semibold text-base-content bg-wash-blue"><span>PD</span></div></div><div class="min-w-0 text-left "><p class="font-medium leading-tight text-sm">Pigment desk</p><p class="text-ink-muted text-xs">Lead</p></div></div></div><div class="h-5 w-px bg-base-300" aria-hidden="true"></div><div class="relative flex items-start justify-center gap-6 pt-0"><div class="absolute top-0 left-[12.5%] right-[12.5%] h-px bg-base-300" aria-hidden="true"></div><div class="flex flex-col items-center"><div class="h-5 w-px bg-base-300" aria-hidden="true"></div><div class="card card-border bg-base-100 ring-1 ring-ink-border/70 min-w-[9.5rem]"><div class="card-body items-center gap-2 p-3 flex-row"><div class="avatar avatar-placeholder"><div class="w-10 text-sm rounded-full font-semibold text-base-content bg-wash-ochre"><span>SA</span></div></div><div class="min-w-0 text-left "><p class="font-medium leading-tight text-sm">Series A</p><p class="text-ink-muted text-xs">Plate lead</p></div></div></div><div class="h-5 w-px bg-base-300" aria-hidden="true"></div><div class="relative flex items-start justify-center gap-6 pt-0"><div class="absolute top-0 left-[12.5%] right-[12.5%] h-px bg-base-300" aria-hidden="true"></div><div class="flex flex-col items-center"><div class="h-5 w-px bg-base-300" aria-hidden="true"></div><div class="card card-border bg-base-100 ring-1 ring-ink-border/70 min-w-[9.5rem]"><div class="card-body items-center gap-2 p-3 flex-row"><div class="avatar avatar-placeholder"><div class="w-10 text-sm rounded-full font-semibold text-base-content bg-wash-rose"><span>P1</span></div></div><div class="min-w-0 text-left "><p class="font-medium leading-tight text-sm">Plate 1</p><p class="text-ink-muted text-xs">Artist</p></div></div></div></div><div class="flex flex-col items-center"><div class="h-5 w-px bg-base-300" aria-hidden="true"></div><div class="card card-border bg-base-100 ring-1 ring-ink-border/70 min-w-[9.5rem]"><div class="card-body items-center gap-2 p-3 flex-row"><div class="avatar avatar-placeholder"><div class="w-10 text-sm rounded-full font-semibold text-base-content bg-wash-rose"><span>P2</span></div></div><div class="min-w-0 text-left "><p class="font-medium leading-tight text-sm">Plate 2</p><p class="text-ink-muted text-xs">Artist</p></div></div></div></div></div></div><div class="flex flex-col items-center"><div class="h-5 w-px bg-base-300" aria-hidden="true"></div><div class="card card-border bg-base-100 ring-1 ring-ink-border/70 min-w-[9.5rem]"><div class="card-body items-center gap-2 p-3 flex-row"><div class="avatar avatar-placeholder"><div class="w-10 text-sm rounded-full font-semibold text-base-content bg-secondary/40"><span>SB</span></div></div><div class="min-w-0 text-left "><p class="font-medium leading-tight text-sm">Series B</p><p class="text-ink-muted text-xs">Plate lead</p></div></div></div><div class="h-5 w-px bg-base-300" aria-hidden="true"></div><div class="relative flex items-start justify-center gap-6 pt-0"><div class="flex flex-col items-center"><div class="h-5 w-px bg-base-300" aria-hidden="true"></div><div class="card card-border bg-base-100 ring-1 ring-ink-border/70 min-w-[9.5rem]"><div class="card-body items-center gap-2 p-3 flex-row"><div class="avatar avatar-placeholder"><div class="w-10 text-sm rounded-full font-semibold text-base-content bg-wash-blue"><span>P3</span></div></div><div class="min-w-0 text-left "><p class="font-medium leading-tight text-sm">Plate 3</p><p class="text-ink-muted text-xs">Artist</p></div></div></div></div></div></div></div></div></div></div></div>`}
            jsx={`<div className="flex w-full flex-col gap-4"><div className="join"><button type="button" className="btn join-item btn-sm cursor-pointer btn-ghost" aria-pressed="false">Compact</button><button type="button" className="btn join-item btn-sm cursor-pointer btn-primary" aria-pressed="true">Expanded</button></div><div className="w-full overflow-x-auto pb-1"><div className="inline-block min-w-max"><div className="flex flex-col items-center"><div className="card card-border bg-base-100 ring-1 ring-ink-border/70 min-w-[9.5rem]"><div className="card-body items-center gap-2 p-3 flex-row"><div className="avatar avatar-placeholder"><div className="w-10 text-sm rounded-full font-semibold text-base-content bg-wash-blue"><span>PD</span></div></div><div className="min-w-0 text-left "><p className="font-medium leading-tight text-sm">Pigment desk</p><p className="text-ink-muted text-xs">Lead</p></div></div></div><div className="h-5 w-px bg-base-300" aria-hidden="true"></div><div className="relative flex items-start justify-center gap-6 pt-0"><div className="absolute top-0 left-[12.5%] right-[12.5%] h-px bg-base-300" aria-hidden="true"></div><div className="flex flex-col items-center"><div className="h-5 w-px bg-base-300" aria-hidden="true"></div><div className="card card-border bg-base-100 ring-1 ring-ink-border/70 min-w-[9.5rem]"><div className="card-body items-center gap-2 p-3 flex-row"><div className="avatar avatar-placeholder"><div className="w-10 text-sm rounded-full font-semibold text-base-content bg-wash-ochre"><span>SA</span></div></div><div className="min-w-0 text-left "><p className="font-medium leading-tight text-sm">Series A</p><p className="text-ink-muted text-xs">Plate lead</p></div></div></div><div className="h-5 w-px bg-base-300" aria-hidden="true"></div><div className="relative flex items-start justify-center gap-6 pt-0"><div className="absolute top-0 left-[12.5%] right-[12.5%] h-px bg-base-300" aria-hidden="true"></div><div className="flex flex-col items-center"><div className="h-5 w-px bg-base-300" aria-hidden="true"></div><div className="card card-border bg-base-100 ring-1 ring-ink-border/70 min-w-[9.5rem]"><div className="card-body items-center gap-2 p-3 flex-row"><div className="avatar avatar-placeholder"><div className="w-10 text-sm rounded-full font-semibold text-base-content bg-wash-rose"><span>P1</span></div></div><div className="min-w-0 text-left "><p className="font-medium leading-tight text-sm">Plate 1</p><p className="text-ink-muted text-xs">Artist</p></div></div></div></div><div className="flex flex-col items-center"><div className="h-5 w-px bg-base-300" aria-hidden="true"></div><div className="card card-border bg-base-100 ring-1 ring-ink-border/70 min-w-[9.5rem]"><div className="card-body items-center gap-2 p-3 flex-row"><div className="avatar avatar-placeholder"><div className="w-10 text-sm rounded-full font-semibold text-base-content bg-wash-rose"><span>P2</span></div></div><div className="min-w-0 text-left "><p className="font-medium leading-tight text-sm">Plate 2</p><p className="text-ink-muted text-xs">Artist</p></div></div></div></div></div></div><div className="flex flex-col items-center"><div className="h-5 w-px bg-base-300" aria-hidden="true"></div><div className="card card-border bg-base-100 ring-1 ring-ink-border/70 min-w-[9.5rem]"><div className="card-body items-center gap-2 p-3 flex-row"><div className="avatar avatar-placeholder"><div className="w-10 text-sm rounded-full font-semibold text-base-content bg-secondary/40"><span>SB</span></div></div><div className="min-w-0 text-left "><p className="font-medium leading-tight text-sm">Series B</p><p className="text-ink-muted text-xs">Plate lead</p></div></div></div><div className="h-5 w-px bg-base-300" aria-hidden="true"></div><div className="relative flex items-start justify-center gap-6 pt-0"><div className="flex flex-col items-center"><div className="h-5 w-px bg-base-300" aria-hidden="true"></div><div className="card card-border bg-base-100 ring-1 ring-ink-border/70 min-w-[9.5rem]"><div className="card-body items-center gap-2 p-3 flex-row"><div className="avatar avatar-placeholder"><div className="w-10 text-sm rounded-full font-semibold text-base-content bg-wash-blue"><span>P3</span></div></div><div className="min-w-0 text-left "><p className="font-medium leading-tight text-sm">Plate 3</p><p className="text-ink-muted text-xs">Artist</p></div></div></div></div></div></div></div></div></div></div></div>`}
          />
        
        </Section>

        <Section
          eyebrow="06 · Responsive"
          title="Narrow viewport scroll"
          description="Trees keep natural width"
          panel="wash-panel-blue"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="max-w-xs rounded-box border border-ink-border/60 bg-base-100/50 p-3 sm:max-w-sm">
                            <ScrollFrame>
                              <VerticalTree node={menziesTree} density="compact" />
                            </ScrollFrame>
                          </div>
            
              </>
            }
            html={`<div class="max-w-xs rounded-box border border-ink-border/60 bg-base-100/50 p-3 sm:max-w-sm"><div class="w-full overflow-x-auto pb-1"><div class="inline-block min-w-max"><div class="flex flex-col items-center"><div class="card card-border bg-base-100 ring-2 ring-primary min-w-[7.5rem]"><div class="card-body items-center gap-2 p-2 flex-row"><div class="avatar avatar-placeholder"><div class="w-8 text-xs rounded-full font-semibold text-base-content bg-wash-blue"><span>MK</span></div></div><div class="min-w-0 text-left "><p class="font-medium leading-tight text-xs">Mira Kline</p><p class="text-ink-muted text-[0.65rem]">Director</p></div></div></div><div class="h-5 w-px bg-base-300" aria-hidden="true"></div><div class="relative flex items-start justify-center gap-6 pt-0"><div class="absolute top-0 left-[12.5%] right-[12.5%] h-px bg-base-300" aria-hidden="true"></div><div class="flex flex-col items-center"><div class="h-5 w-px bg-base-300" aria-hidden="true"></div><div class="card card-border bg-base-100 ring-1 ring-ink-border/70 min-w-[7.5rem]"><div class="card-body items-center gap-2 p-2 flex-row"><div class="avatar avatar-placeholder"><div class="w-8 text-xs rounded-full font-semibold text-base-content bg-wash-ochre"><span>JR</span></div></div><div class="min-w-0 text-left "><p class="font-medium leading-tight text-xs">Jonah Reed</p><p class="text-ink-muted text-[0.65rem]">Color lead</p></div></div></div><div class="h-5 w-px bg-base-300" aria-hidden="true"></div><div class="relative flex items-start justify-center gap-6 pt-0"><div class="flex flex-col items-center"><div class="h-5 w-px bg-base-300" aria-hidden="true"></div><div class="card card-border bg-base-100 ring-1 ring-ink-border/70 min-w-[7.5rem]"><div class="card-body items-center gap-2 p-2 flex-row"><div class="avatar avatar-placeholder"><div class="w-8 text-xs rounded-full font-semibold text-base-content bg-wash-rose"><span>AC</span></div></div><div class="min-w-0 text-left "><p class="font-medium leading-tight text-xs">Ava Chen</p><p class="text-ink-muted text-[0.65rem]">Wash tech</p></div></div></div></div></div></div><div class="flex flex-col items-center"><div class="h-5 w-px bg-base-300" aria-hidden="true"></div><div class="card card-border bg-base-100 ring-1 ring-ink-border/70 min-w-[7.5rem]"><div class="card-body items-center gap-2 p-2 flex-row"><div class="avatar avatar-placeholder"><div class="w-8 text-xs rounded-full font-semibold text-base-content bg-secondary/40"><span>EP</span></div></div><div class="min-w-0 text-left "><p class="font-medium leading-tight text-xs">Ellis Park</p><p class="text-ink-muted text-[0.65rem]">Critique host</p></div></div></div></div></div></div></div></div></div>`}
            jsx={`<div className="max-w-xs rounded-box border border-ink-border/60 bg-base-100/50 p-3 sm:max-w-sm"><div className="w-full overflow-x-auto pb-1"><div className="inline-block min-w-max"><div className="flex flex-col items-center"><div className="card card-border bg-base-100 ring-2 ring-primary min-w-[7.5rem]"><div className="card-body items-center gap-2 p-2 flex-row"><div className="avatar avatar-placeholder"><div className="w-8 text-xs rounded-full font-semibold text-base-content bg-wash-blue"><span>MK</span></div></div><div className="min-w-0 text-left "><p className="font-medium leading-tight text-xs">Mira Kline</p><p className="text-ink-muted text-[0.65rem]">Director</p></div></div></div><div className="h-5 w-px bg-base-300" aria-hidden="true"></div><div className="relative flex items-start justify-center gap-6 pt-0"><div className="absolute top-0 left-[12.5%] right-[12.5%] h-px bg-base-300" aria-hidden="true"></div><div className="flex flex-col items-center"><div className="h-5 w-px bg-base-300" aria-hidden="true"></div><div className="card card-border bg-base-100 ring-1 ring-ink-border/70 min-w-[7.5rem]"><div className="card-body items-center gap-2 p-2 flex-row"><div className="avatar avatar-placeholder"><div className="w-8 text-xs rounded-full font-semibold text-base-content bg-wash-ochre"><span>JR</span></div></div><div className="min-w-0 text-left "><p className="font-medium leading-tight text-xs">Jonah Reed</p><p className="text-ink-muted text-[0.65rem]">Color lead</p></div></div></div><div className="h-5 w-px bg-base-300" aria-hidden="true"></div><div className="relative flex items-start justify-center gap-6 pt-0"><div className="flex flex-col items-center"><div className="h-5 w-px bg-base-300" aria-hidden="true"></div><div className="card card-border bg-base-100 ring-1 ring-ink-border/70 min-w-[7.5rem]"><div className="card-body items-center gap-2 p-2 flex-row"><div className="avatar avatar-placeholder"><div className="w-8 text-xs rounded-full font-semibold text-base-content bg-wash-rose"><span>AC</span></div></div><div className="min-w-0 text-left "><p className="font-medium leading-tight text-xs">Ava Chen</p><p className="text-ink-muted text-[0.65rem]">Wash tech</p></div></div></div></div></div></div><div className="flex flex-col items-center"><div className="h-5 w-px bg-base-300" aria-hidden="true"></div><div className="card card-border bg-base-100 ring-1 ring-ink-border/70 min-w-[7.5rem]"><div className="card-body items-center gap-2 p-2 flex-row"><div className="avatar avatar-placeholder"><div className="w-8 text-xs rounded-full font-semibold text-base-content bg-secondary/40"><span>EP</span></div></div><div className="min-w-0 text-left "><p className="font-medium leading-tight text-xs">Ellis Park</p><p className="text-ink-muted text-[0.65rem]">Critique host</p></div></div></div></div></div></div></div></div></div>`}
          />
        </Section>
      </div>
    </>
  )
}
