import { useState, type ReactNode } from 'react'
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
    <article className={`wash-panel paper-grain soak-in ${panel}`}>
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

function Sample({
  label,
  children,
  className = '',
}: {
  label: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      {children}
      <ClassLabel value={label} />
    </div>
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
          daisyUI <span className="font-mono text-xs">stack</span> placements
          plus a wash layer desk: opacity, visibility, and lock for pigment
          hierarchy.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Base"
          title="stack"
          description="Elements layered on top of each other. Width and height utilities size every plate the same."
        >
          <Sample label="stack + w-* + h-*">
            <StackCards />
          </Sample>
        </Section>

        <Section
          eyebrow="02 · Placement"
          title="Alignment modifiers"
          description="Every stack placement: top, bottom, start, and end."
          panel="wash-panel-ochre"
        >
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-5">
            {stackPlacements.map((p) => (
              <Sample
                key={p.name}
                label={p.className ? `stack ${p.className}` : 'stack'}
              >
                <StackCards className={p.className} />
              </Sample>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="03 · Scale"
          title="Sized stacks"
          description="Shared dimensions keep stacked plates aligned for studio previews."
        >
          <div className="flex flex-wrap items-end justify-center gap-10">
            <Sample label="stack w-20 h-14">
              <StackCards size="w-20 h-14" />
            </Sample>
            <Sample label="stack w-32 h-24">
              <StackCards size="w-32 h-24" />
            </Sample>
            <Sample label="stack w-40 h-28">
              <StackCards size="w-40 h-28" />
            </Sample>
          </div>
        </Section>

        <Section
          eyebrow="04 · Wash desk"
          title="Pigment layer stack"
          description="Reorderable-looking list with opacity, visibility, and lock. Locked layers keep their glaze."
          panel="wash-panel-rose"
        >
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
        </Section>

        <Section
          eyebrow="05 · Composite"
          title="Plate preview"
          description="Visible washes stacked as a living stack, opacity mirrored from the desk."
        >
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
        </Section>
      </div>
    </>
  )
}
