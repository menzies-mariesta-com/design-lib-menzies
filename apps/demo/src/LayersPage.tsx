import { useState, type ReactNode } from 'react'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import { daisyToJsx } from './snippets/markup/daisyGalleryDefaults'

function toJsxMarkup(html: string): string {
  return daisyToJsx(html)
    .replace(/stroke-width=/g, 'strokeWidth=')
    .replace(/\sstyle="([^"]*)"/g, (_m, style) => {
      const obj = style
        .split(';')
        .map((p: string) => p.trim())
        .filter(Boolean)
        .map((p: string) => {
          const [k, ...rest] = p.split(':')
          const key = k.trim().replace(/-([a-z])/g, (_: string, c: string) => c.toUpperCase())
          const val = rest.join(':').trim()
          const num = Number(val)
          if (val !== '' && !Number.isNaN(num) && /^-?\d+(\.\d+)?$/.test(val)) {
            return `${key}: ${val}`
          }
          return `${key}: '${val}'`
        })
        .join(', ')
      return ` style={{ ${obj} }}`
    })
}

const stackCardsHtml = `<div class="stack w-28 h-20">\n  <div class="flex items-center justify-center rounded-box border border-ink-border bg-wash-blue text-xs font-medium text-base-content shadow-sm">
    Sky
  </div>
  <div class="flex items-center justify-center rounded-box border border-ink-border bg-wash-ochre text-xs font-medium text-base-content shadow-sm">
    Earth
  </div>
  <div class="flex items-center justify-center rounded-box border border-ink-border bg-wash-rose text-xs font-medium text-base-content shadow-sm">
    Bloom
  </div>\n</div>`

const stackPlacementHtml = {
  'Default': `<div class="stack w-28 h-20">\n  <div class="flex items-center justify-center rounded-box border border-ink-border bg-wash-blue text-xs font-medium text-base-content shadow-sm">
    Sky
  </div>
  <div class="flex items-center justify-center rounded-box border border-ink-border bg-wash-ochre text-xs font-medium text-base-content shadow-sm">
    Earth
  </div>
  <div class="flex items-center justify-center rounded-box border border-ink-border bg-wash-rose text-xs font-medium text-base-content shadow-sm">
    Bloom
  </div>\n</div>`,
  'Top': `<div class="stack stack-top w-28 h-20">\n  <div class="flex items-center justify-center rounded-box border border-ink-border bg-wash-blue text-xs font-medium text-base-content shadow-sm">
    Sky
  </div>
  <div class="flex items-center justify-center rounded-box border border-ink-border bg-wash-ochre text-xs font-medium text-base-content shadow-sm">
    Earth
  </div>
  <div class="flex items-center justify-center rounded-box border border-ink-border bg-wash-rose text-xs font-medium text-base-content shadow-sm">
    Bloom
  </div>\n</div>`,
  'Bottom': `<div class="stack stack-bottom w-28 h-20">\n  <div class="flex items-center justify-center rounded-box border border-ink-border bg-wash-blue text-xs font-medium text-base-content shadow-sm">
    Sky
  </div>
  <div class="flex items-center justify-center rounded-box border border-ink-border bg-wash-ochre text-xs font-medium text-base-content shadow-sm">
    Earth
  </div>
  <div class="flex items-center justify-center rounded-box border border-ink-border bg-wash-rose text-xs font-medium text-base-content shadow-sm">
    Bloom
  </div>\n</div>`,
  'Start': `<div class="stack stack-start w-28 h-20">\n  <div class="flex items-center justify-center rounded-box border border-ink-border bg-wash-blue text-xs font-medium text-base-content shadow-sm">
    Sky
  </div>
  <div class="flex items-center justify-center rounded-box border border-ink-border bg-wash-ochre text-xs font-medium text-base-content shadow-sm">
    Earth
  </div>
  <div class="flex items-center justify-center rounded-box border border-ink-border bg-wash-rose text-xs font-medium text-base-content shadow-sm">
    Bloom
  </div>\n</div>`,
  'End': `<div class="stack stack-end w-28 h-20">\n  <div class="flex items-center justify-center rounded-box border border-ink-border bg-wash-blue text-xs font-medium text-base-content shadow-sm">
    Sky
  </div>
  <div class="flex items-center justify-center rounded-box border border-ink-border bg-wash-ochre text-xs font-medium text-base-content shadow-sm">
    Earth
  </div>
  <div class="flex items-center justify-center rounded-box border border-ink-border bg-wash-rose text-xs font-medium text-base-content shadow-sm">
    Bloom
  </div>\n</div>`,
} as const

const stackSizeHtml = {
  'w-20 h-14': `<div class="stack w-20 h-14">\n  <div class="flex items-center justify-center rounded-box border border-ink-border bg-wash-blue text-xs font-medium text-base-content shadow-sm">
    Sky
  </div>
  <div class="flex items-center justify-center rounded-box border border-ink-border bg-wash-ochre text-xs font-medium text-base-content shadow-sm">
    Earth
  </div>
  <div class="flex items-center justify-center rounded-box border border-ink-border bg-wash-rose text-xs font-medium text-base-content shadow-sm">
    Bloom
  </div>\n</div>`,
  'w-32 h-24': `<div class="stack w-32 h-24">\n  <div class="flex items-center justify-center rounded-box border border-ink-border bg-wash-blue text-xs font-medium text-base-content shadow-sm">
    Sky
  </div>
  <div class="flex items-center justify-center rounded-box border border-ink-border bg-wash-ochre text-xs font-medium text-base-content shadow-sm">
    Earth
  </div>
  <div class="flex items-center justify-center rounded-box border border-ink-border bg-wash-rose text-xs font-medium text-base-content shadow-sm">
    Bloom
  </div>\n</div>`,
  'w-40 h-28': `<div class="stack w-40 h-28">\n  <div class="flex items-center justify-center rounded-box border border-ink-border bg-wash-blue text-xs font-medium text-base-content shadow-sm">
    Sky
  </div>
  <div class="flex items-center justify-center rounded-box border border-ink-border bg-wash-ochre text-xs font-medium text-base-content shadow-sm">
    Earth
  </div>
  <div class="flex items-center justify-center rounded-box border border-ink-border bg-wash-rose text-xs font-medium text-base-content shadow-sm">
    Bloom
  </div>\n</div>`,
} as const

const washDeskHtml = `<div class="mb-4 flex flex-wrap items-center justify-between gap-3">
  <p class="text-sm text-ink-muted">4 of 4 washes visible</p>
  <button type="button" class="btn btn-primary btn-sm cursor-pointer gap-1.5">
    <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
    Add wash
  </button>
</div>
<ul class="list rounded-box border border-ink-border bg-base-100/90 shadow-sm">
  <li class="list-row items-center gap-2">
    <div class="tooltip tooltip-right" data-tip="Reorder">
      <button type="button" class="btn btn-ghost btn-square btn-xs cursor-grab active:cursor-grabbing" aria-label="Reorder">
        <svg class="size-4 text-ink-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>
      </button>
    </div>
    <div class="size-9 shrink-0 rounded-box border border-ink-border bg-wash-blue" style="opacity: 0.72" aria-hidden></div>
    <div class="list-col-grow min-w-0 space-y-2">
      <div class="flex flex-wrap items-center gap-2">
        <span class="font-medium truncate">Sky glaze</span>
      </div>
      <div class="flex max-w-xs items-center gap-3">
        <input type="range" min="0" max="100" value="72" class="range range-xs range-primary flex-1 cursor-pointer" aria-label="Sky glaze opacity" />
        <span class="font-mono w-10 text-right text-xs text-ink-muted">72%</span>
      </div>
    </div>
    <div class="flex shrink-0 items-center gap-0.5">
      <div class="tooltip tooltip-right tooltip-primary" data-tip="Hide">
        <button type="button" class="btn btn-ghost btn-square btn-sm btn-primary cursor-pointer" aria-label="Hide">
          <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
        </button>
      </div>
      <div class="tooltip tooltip-right tooltip-secondary" data-tip="Lock">
        <button type="button" class="btn btn-ghost btn-square btn-sm btn-secondary cursor-pointer" aria-label="Lock">
          <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>
        </button>
      </div>
      <div class="tooltip tooltip-right tooltip-error" data-tip="Delete">
        <button type="button" class="btn btn-ghost btn-square btn-sm btn-error cursor-pointer" aria-label="Delete">
          <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
        </button>
      </div>
    </div>
  </li>
  <li class="list-row items-center gap-2">
    <div class="tooltip tooltip-right" data-tip="Reorder">
      <button type="button" class="btn btn-ghost btn-square btn-xs cursor-grab active:cursor-grabbing" aria-label="Reorder">
        <svg class="size-4 text-ink-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>
      </button>
    </div>
    <div class="size-9 shrink-0 rounded-box border border-ink-border bg-wash-ochre" style="opacity: 0.55" aria-hidden></div>
    <div class="list-col-grow min-w-0 space-y-2">
      <div class="flex flex-wrap items-center gap-2">
        <span class="font-medium truncate">Ochre cliff</span>
      </div>
      <div class="flex max-w-xs items-center gap-3">
        <input type="range" min="0" max="100" value="55" class="range range-xs range-primary flex-1 cursor-pointer" aria-label="Ochre cliff opacity" />
        <span class="font-mono w-10 text-right text-xs text-ink-muted">55%</span>
      </div>
    </div>
    <div class="flex shrink-0 items-center gap-0.5">
      <div class="tooltip tooltip-right tooltip-primary" data-tip="Hide">
        <button type="button" class="btn btn-ghost btn-square btn-sm btn-primary cursor-pointer" aria-label="Hide">
          <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
        </button>
      </div>
      <div class="tooltip tooltip-right tooltip-secondary" data-tip="Lock">
        <button type="button" class="btn btn-ghost btn-square btn-sm btn-secondary cursor-pointer" aria-label="Lock">
          <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>
        </button>
      </div>
      <div class="tooltip tooltip-right tooltip-error" data-tip="Delete">
        <button type="button" class="btn btn-ghost btn-square btn-sm btn-error cursor-pointer" aria-label="Delete">
          <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
        </button>
      </div>
    </div>
  </li>
  <li class="list-row items-center gap-2">
    <div class="tooltip tooltip-right" data-tip="Reorder">
      <button type="button" class="btn btn-ghost btn-square btn-xs cursor-grab active:cursor-grabbing" aria-label="Reorder">
        <svg class="size-4 text-ink-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>
      </button>
    </div>
    <div class="size-9 shrink-0 rounded-box border border-ink-border bg-wash-rose" style="opacity: 0.4" aria-hidden></div>
    <div class="list-col-grow min-w-0 space-y-2">
      <div class="flex flex-wrap items-center gap-2">
        <span class="font-medium truncate">Rose bloom</span>\n                  <span class="badge badge-sm badge-ghost">Locked</span>
      </div>
      <div class="flex max-w-xs items-center gap-3">
        <input type="range" min="0" max="100" value="40" disabled class="range range-xs range-primary flex-1 cursor-not-allowed" aria-label="Rose bloom opacity" />
        <span class="font-mono w-10 text-right text-xs text-ink-muted">40%</span>
      </div>
    </div>
    <div class="flex shrink-0 items-center gap-0.5">
      <div class="tooltip tooltip-right tooltip-primary" data-tip="Hide">
        <button type="button" class="btn btn-ghost btn-square btn-sm btn-primary cursor-pointer btn-disabled cursor-not-allowed" aria-label="Hide" disabled>
          <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
        </button>
      </div>
      <div class="tooltip tooltip-right tooltip-secondary" data-tip="Unlock">
        <button type="button" class="btn btn-ghost btn-square btn-sm btn-secondary cursor-pointer" aria-label="Unlock">
          <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </button>
      </div>
      <div class="tooltip tooltip-right tooltip-error" data-tip="Delete">
        <button type="button" class="btn btn-ghost btn-square btn-sm btn-error cursor-pointer btn-disabled cursor-not-allowed" aria-label="Delete" disabled>
          <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
        </button>
      </div>
    </div>
  </li>
  <li class="list-row items-center gap-2">
    <div class="tooltip tooltip-right" data-tip="Reorder">
      <button type="button" class="btn btn-ghost btn-square btn-xs cursor-grab active:cursor-grabbing" aria-label="Reorder">
        <svg class="size-4 text-ink-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>
      </button>
    </div>
    <div class="size-9 shrink-0 rounded-box border border-ink-border bg-base-200" style="opacity: 1.0" aria-hidden></div>
    <div class="list-col-grow min-w-0 space-y-2">
      <div class="flex flex-wrap items-center gap-2">
        <span class="font-medium truncate">Paper tooth</span>\n                  <span class="badge badge-sm badge-ghost">Locked</span>
      </div>
      <div class="flex max-w-xs items-center gap-3">
        <input type="range" min="0" max="100" value="100" disabled class="range range-xs range-primary flex-1 cursor-not-allowed" aria-label="Paper tooth opacity" />
        <span class="font-mono w-10 text-right text-xs text-ink-muted">100%</span>
      </div>
    </div>
    <div class="flex shrink-0 items-center gap-0.5">
      <div class="tooltip tooltip-right tooltip-primary" data-tip="Hide">
        <button type="button" class="btn btn-ghost btn-square btn-sm btn-primary cursor-pointer btn-disabled cursor-not-allowed" aria-label="Hide" disabled>
          <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
        </button>
      </div>
      <div class="tooltip tooltip-right tooltip-secondary" data-tip="Unlock">
        <button type="button" class="btn btn-ghost btn-square btn-sm btn-secondary cursor-pointer" aria-label="Unlock">
          <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </button>
      </div>
      <div class="tooltip tooltip-right tooltip-error" data-tip="Delete">
        <button type="button" class="btn btn-ghost btn-square btn-sm btn-error cursor-pointer btn-disabled cursor-not-allowed" aria-label="Delete" disabled>
          <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
        </button>
      </div>
    </div>
  </li>
</ul>
<p class="mt-3 font-mono text-[0.65rem] text-ink-muted">
  list + list-row · checkbox-style toggles via icons · range range-xs range-primary
</p>`

const compositeHtml = `<div class="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-12">
  <div class="stack h-36 w-48">
    <div class="rounded-box border border-ink-border shadow-sm bg-wash-blue" style="opacity: 0.72"></div>
    <div class="rounded-box border border-ink-border shadow-sm bg-wash-ochre" style="opacity: 0.55"></div>
    <div class="rounded-box border border-ink-border shadow-sm bg-wash-rose" style="opacity: 0.4"></div>
    <div class="rounded-box border border-ink-border shadow-sm bg-base-200" style="opacity: 1.0"></div>
  </div>
  <div class="max-w-xs text-sm text-ink-muted">
    <p class="font-display text-lg font-semibold text-base-content">Composite plate</p>
    <p class="mt-1">Toggle visibility or drag opacity on the wash desk. Locked layers stay put until unlocked.</p>
    <code class="font-mono text-[0.65rem] text-ink-muted">stack (live wash preview)</code>
  </div>
</div>`


import {
  Eye,
  EyeOff,
  GripVertical,
  Lock,
  Plus,
  Trash2,
  Unlock,
} from '@menzies-mariesta-com/menzies-design-wash-ui/icons'

type WashLayer = {
  id: string
  name: string
  opacity: number
  visible: boolean
  locked: boolean
  wash: string
}

const initialLayers: WashLayer[] = [
  {
    id: '1',
    name: 'Sky glaze',
    opacity: 72,
    visible: true,
    locked: false,
    wash: 'bg-wash-blue',
  },
  {
    id: '2',
    name: 'Ochre cliff',
    opacity: 55,
    visible: true,
    locked: false,
    wash: 'bg-wash-ochre',
  },
  {
    id: '3',
    name: 'Rose bloom',
    opacity: 40,
    visible: true,
    locked: true,
    wash: 'bg-wash-rose',
  },
  {
    id: '4',
    name: 'Paper tooth',
    opacity: 100,
    visible: true,
    locked: true,
    wash: 'bg-base-200',
  },
]

const stackPlacements = [
  { name: 'Default', className: '' },
  { name: 'Top', className: 'stack-top' },
  { name: 'Bottom', className: 'stack-bottom' },
  { name: 'Start', className: 'stack-start' },
  { name: 'End', className: 'stack-end' },
] as const

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
        <h2 className="font-display text-xl font-semibold md:text-2xl">
          {title}
        </h2>
        <p className="mt-1 text-sm text-ink-muted">{description}</p>
      </div>
      <div className="p-5">{children}</div>
    </article>
  )
}

function ClassLabel({ value }: { value: string }) {
  return (
    <code className="font-mono text-[0.65rem] text-ink-muted">
      {value || 'stack'}
    </code>
  )
}

function StackCards({
  className = '',
  size = 'w-28 h-20',
}: {
  className?: string
  size?: string
}) {
  return (
    <div className={`stack ${className} ${size}`}>
      <div className="flex items-center justify-center rounded-box border border-ink-border bg-wash-blue text-xs font-medium text-base-content shadow-sm">
        Sky
      </div>
      <div className="flex items-center justify-center rounded-box border border-ink-border bg-wash-ochre text-xs font-medium text-base-content shadow-sm">
        Earth
      </div>
      <div className="flex items-center justify-center rounded-box border border-ink-border bg-wash-rose text-xs font-medium text-base-content shadow-sm">
        Bloom
      </div>
    </div>
  )
}

export default function LayersPage() {
  const [layers, setLayers] = useState<WashLayer[]>(initialLayers)

  function updateLayer(id: string, patch: Partial<WashLayer>) {
    setLayers((prev) =>
      prev.map((layer) => {
        if (layer.id !== id) return layer
        if (layer.locked && (patch.opacity !== undefined || patch.visible !== undefined)) {
          return layer
        }
        return { ...layer, ...patch }
      }),
    )
  }

  function toggleVisible(id: string) {
    setLayers((prev) =>
      prev.map((layer) => {
        if (layer.id !== id || layer.locked) return layer
        return { ...layer, visible: !layer.visible }
      }),
    )
  }

  function toggleLocked(id: string) {
    setLayers((prev) =>
      prev.map((layer) =>
        layer.id === id ? { ...layer, locked: !layer.locked } : layer,
      ),
    )
  }

  function removeLayer(id: string) {
    setLayers((prev) => prev.filter((layer) => layer.id !== id || layer.locked))
  }

  function addLayer() {
    const n = layers.length + 1
    setLayers((prev) => [
      {
        id: String(Date.now()),
        name: `Fresh wash ${n}`,
        opacity: 65,
        visible: true,
        locked: false,
        wash: 'bg-wash-blue',
      },
      ...prev,
    ])
  }

  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Studio tool</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Layers
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">stack</span> placements.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Base"
          title="stack"
          description="Elements layered on top of each other"
        >
          <ShowcaseTabs
            preview={
              <>

              <StackCards />
            
              </>
            }
          
            html={stackCardsHtml}
            jsx={toJsxMarkup(stackCardsHtml)}
          />
        </Section>

        <Section
          eyebrow="02 · Placement"
          title="Alignment modifiers"
          description="Every stack placement: top, bottom, start"
          panel="wash-panel-ochre"
        >
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-5">
            {stackPlacements.map((p) => (
              <ShowcaseTabs
                key={p.name}
                preview={
                  <>
                    <StackCards className={p.className} />
                  </>
                }
                html={stackPlacementHtml[p.name]}
                jsx={toJsxMarkup(stackPlacementHtml[p.name])}
              />
            ))}
          </div>
        </Section>

        <Section
          eyebrow="03 · Scale"
          title="Sized stacks"
          description="Shared dimensions keep stacked plates aligned for studio previews"
        >
          <div className="flex flex-wrap items-end justify-center gap-10">
            <ShowcaseTabs
              preview={
                <>
                  <StackCards size="w-20 h-14" />
                </>
              }
              html={stackSizeHtml['w-20 h-14']}
              jsx={toJsxMarkup(stackSizeHtml['w-20 h-14'])}
            />
            <ShowcaseTabs
              preview={
                <>
                  <StackCards size="w-32 h-24" />
                </>
              }
              html={stackSizeHtml['w-32 h-24']}
              jsx={toJsxMarkup(stackSizeHtml['w-32 h-24'])}
            />
            <ShowcaseTabs
              preview={
                <>
                  <StackCards size="w-40 h-28" />
                </>
              }
              html={stackSizeHtml['w-40 h-28']}
              jsx={toJsxMarkup(stackSizeHtml['w-40 h-28'])}
            />
          </div>
        </Section>

        <Section
          eyebrow="04 · Wash desk"
          title="Pigment layer stack"
          description="Reorderable-looking list with opacity, visibility"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                          <p className="text-sm text-ink-muted">
                            {layers.filter((l) => l.visible).length} of {layers.length} washes
                            visible
                          </p>
                          <button
                            type="button"
                            className="btn btn-primary btn-sm cursor-pointer gap-1.5"
                            onClick={addLayer}
                          >
                            <Plus className="size-4" strokeWidth={2} />
                            Add wash
                          </button>
                        </div>

                        <ul className="list rounded-box border border-ink-border bg-base-100/90 shadow-sm">
                          {layers.map((layer) => (
                            <li
                              key={layer.id}
                              className={`list-row items-center gap-2 ${
                                layer.visible ? '' : 'opacity-50'
                              }`}
                            >
                              <div className="tooltip tooltip-right" data-tip="Reorder">
                                <button
                                  type="button"
                                  className="btn btn-ghost btn-square btn-xs cursor-grab active:cursor-grabbing"
                                  aria-label="Reorder"
                                >
                                  <GripVertical
                                    className="size-4 text-ink-muted"
                                    strokeWidth={2}
                                  />
                                </button>
                              </div>

                              <div
                                className={`size-9 shrink-0 rounded-box border border-ink-border ${layer.wash}`}
                                style={{ opacity: layer.opacity / 100 }}
                                aria-hidden
                              />

                              <div className="list-col-grow min-w-0 space-y-2">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="font-medium truncate">{layer.name}</span>
                                  {layer.locked ? (
                                    <span className="badge badge-sm badge-ghost">Locked</span>
                                  ) : null}
                                </div>
                                <div className="flex max-w-xs items-center gap-3">
                                  <input
                                    type="range"
                                    min={0}
                                    max={100}
                                    value={layer.opacity}
                                    disabled={layer.locked}
                                    className={`range range-xs range-primary flex-1 ${
                                      layer.locked ? 'cursor-not-allowed' : 'cursor-pointer'
                                    }`}
                                    aria-label={`${layer.name} opacity`}
                                    onChange={(e) =>
                                      updateLayer(layer.id, {
                                        opacity: Number(e.target.value),
                                      })
                                    }
                                  />
                                  <span className="font-mono w-10 text-right text-xs text-ink-muted">
                                    {layer.opacity}%
                                  </span>
                                </div>
                              </div>

                              <div className="flex shrink-0 items-center gap-0.5">
                                <div
                                  className="tooltip tooltip-right tooltip-primary"
                                  data-tip={layer.visible ? 'Hide' : 'Show'}
                                >
                                  <button
                                    type="button"
                                    className={`btn btn-ghost btn-square btn-sm btn-primary cursor-pointer ${
                                      layer.locked ? 'btn-disabled cursor-not-allowed' : ''
                                    }`}
                                    aria-label={layer.visible ? 'Hide' : 'Show'}
                                    disabled={layer.locked}
                                    onClick={() => toggleVisible(layer.id)}
                                  >
                                    {layer.visible ? (
                                      <Eye className="size-4" strokeWidth={2} />
                                    ) : (
                                      <EyeOff className="size-4" strokeWidth={2} />
                                    )}
                                  </button>
                                </div>

                                <div
                                  className="tooltip tooltip-right tooltip-secondary"
                                  data-tip={layer.locked ? 'Unlock' : 'Lock'}
                                >
                                  <button
                                    type="button"
                                    className="btn btn-ghost btn-square btn-sm btn-secondary cursor-pointer"
                                    aria-label={layer.locked ? 'Unlock' : 'Lock'}
                                    onClick={() => toggleLocked(layer.id)}
                                  >
                                    {layer.locked ? (
                                      <Lock className="size-4" strokeWidth={2} />
                                    ) : (
                                      <Unlock className="size-4" strokeWidth={2} />
                                    )}
                                  </button>
                                </div>

                                <div
                                  className="tooltip tooltip-right tooltip-error"
                                  data-tip="Delete"
                                >
                                  <button
                                    type="button"
                                    className={`btn btn-ghost btn-square btn-sm btn-error cursor-pointer ${
                                      layer.locked ? 'btn-disabled cursor-not-allowed' : ''
                                    }`}
                                    aria-label="Delete"
                                    disabled={layer.locked}
                                    onClick={() => removeLayer(layer.id)}
                                  >
                                    <Trash2 className="size-4" strokeWidth={2} />
                                  </button>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>

                        <p className="mt-3 font-mono text-[0.65rem] text-ink-muted">
                          list + list-row · checkbox-style toggles via icons · range
                          range-xs range-primary
                        </p>
            
              </>
            }

            html={washDeskHtml}
            jsx={toJsxMarkup(washDeskHtml)}
          />
        
        </Section>

        <Section
          eyebrow="05 · Composite"
          title="Plate preview"
          description="Visible washes stacked as a living stack, opacity mirrored from the"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-12">
                          <div className="stack h-36 w-48">
                            {layers
                              .filter((l) => l.visible)
                              .map((layer) => (
                                <div
                                  key={layer.id}
                                  className={`rounded-box border border-ink-border shadow-sm ${layer.wash}`}
                                  style={{ opacity: layer.opacity / 100 }}
                                />
                              ))}
                          </div>
                          <div className="max-w-xs text-sm text-ink-muted">
                            <p className="font-display text-lg font-semibold text-base-content">
                              Composite plate
                            </p>
                            <p className="mt-1">
                              Toggle visibility or drag opacity on the wash desk. Locked
                              layers stay put until unlocked.
                            </p>
                            <ClassLabel value="stack (live wash preview)" />
                          </div>
                        </div>
            
              </>
            }

            html={compositeHtml}
            jsx={toJsxMarkup(compositeHtml)}
          />
        
        </Section>
      </div>
    </>
  )
}
