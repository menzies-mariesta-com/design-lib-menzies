import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'
import {
  Paintbrush,
  RotateCcw,
  Copy,
  Droplets,
  Bookmark,
  Search,
} from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import {
  applyBrush,
  applyBrushPreset,
  BRUSH_CHANGE_EVENT,
  brushGroups,
  brushPresets,
  filterBrushPresets,
  getBrushPreset,
  groupLabels,
  readStoredBrush,
  tipLabels,
  type BrushChangeDetail,
  type BrushGroup,
  type BrushState,
  type TipShape,
} from './brushes'
import BrushShowcase from './BrushShowcase'

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
        <h2 className="font-display text-xl font-semibold md:text-2xl">{title}</h2>
        <p className="mt-1 text-sm text-ink-muted">{description}</p>
      </div>
      <div className="p-5">{children}</div>
    </article>
  )
}

function StrokePreview({
  tip,
  size,
  hardness,
  opacity,
  flow,
  water,
}: {
  tip: TipShape
  size: number
  hardness: number
  opacity: number
  flow: number
  water: number
}) {
  const height = Math.max(6, Math.round(size * 0.48))
  const blur = Math.max(0, (100 - hardness) / 22)
  const alpha = opacity / 100
  const wetSpread = water / 35
  const taper = tip === 'rigger' ? 0.32 : tip === 'flat' ? 1.45 : tip === 'mop' ? 1.95 : 1
  const roughness =
    tip === 'dry'
      ? 'repeating-linear-gradient(90deg, transparent 0 2px, color-mix(in oklab, var(--color-base-100) 55%, transparent) 2px 4px)'
      : tip === 'fan'
        ? 'repeating-linear-gradient(18deg, transparent 0 3px, color-mix(in oklab, var(--color-base-100) 40%, transparent) 3px 5px)'
        : undefined

  const strokeStyle: CSSProperties = {
    height: `${height * taper}px`,
    opacity: Math.max(0.25, alpha),
    filter: `blur(${blur}px)`,
    background:
      tip === 'mop'
        ? `radial-gradient(ellipse at center, color-mix(in oklab, var(--color-primary) ${55 + flow / 4}%, transparent), transparent 72%)`
        : `linear-gradient(90deg, transparent 0%, color-mix(in oklab, var(--color-primary) ${50 + flow / 3}%, var(--color-secondary)) 12%, color-mix(in oklab, var(--color-primary) ${40 + water / 2}%, transparent) 88%, transparent 100%)`,
    borderRadius: tip === 'flat' ? '2px' : tip === 'rigger' ? '999px' : '40%',
    boxShadow:
      tip === 'mop' || water > 55
        ? `0 0 ${8 + wetSpread}px color-mix(in oklab, var(--color-primary) 35%, transparent)`
        : undefined,
    maskImage: roughness,
    WebkitMaskImage: roughness,
  }

  return (
    <div
      className="relative flex h-20 w-full items-center overflow-hidden rounded-box border border-ink-border/60 bg-base-200/40 px-3"
      aria-hidden="true"
    >
      <div className="w-full" style={strokeStyle} />
    </div>
  )
}

export default function BrushesPage() {
  const [brush, setBrush] = useState<BrushState>(() => readStoredBrush())
  const [query, setQuery] = useState('')
  const [group, setGroup] = useState<BrushGroup | 'all'>('all')

  const filteredPresets = useMemo(
    () => filterBrushPresets(query, group),
    [query, group],
  )

  useEffect(() => {
    function onBrushChange(event: Event) {
      const detail = (event as CustomEvent<BrushChangeDetail>).detail
      if (!detail) return
      setBrush(detail)
    }

    window.addEventListener(BRUSH_CHANGE_EVENT, onBrushChange)
    return () => window.removeEventListener(BRUSH_CHANGE_EVENT, onBrushChange)
  }, [])

  const selected = getBrushPreset(brush.id)
  const {
    tip,
    size,
    flow,
    water,
    hardness,
    opacity,
    wetEdges,
    pressure,
    family,
  } = brush

  function patchBrush(partial: Partial<BrushState>) {
    setBrush(applyBrush(partial))
  }

  function selectPreset(id: string) {
    setBrush(applyBrushPreset(id))
  }

  function resetActive() {
    setBrush(applyBrushPreset(brush.id))
  }

  const loadValue = Math.round(flow * 0.45 + water * 0.35 + opacity * 0.2)

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between soak-in">
        <div>
          <p className="label-ink mb-2">Studio tools</p>
          <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Brushes
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
            Thirty studio brushes for Menzies Design. Use the live showcase to see tip,
            size, water, and hardness jump, then tune the desk so washes and ripples
            follow site-wide.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="tooltip tooltip-secondary" data-tip="Reset brush">
            <button
              type="button"
              className="btn btn-ghost btn-square btn-secondary cursor-pointer border border-ink-border"
              aria-label="Reset brush"
              onClick={resetActive}
            >
              <RotateCcw className="size-4" strokeWidth={1.75} />
            </button>
          </div>
          <div className="tooltip tooltip-primary" data-tip="Duplicate preset">
            <button
              type="button"
              className="btn btn-ghost btn-square btn-primary cursor-pointer border border-ink-border"
              aria-label="Duplicate preset"
            >
              <Copy className="size-4" strokeWidth={1.75} />
            </button>
          </div>
          <div className="tooltip tooltip-accent" data-tip="Save preset">
            <button
              type="button"
              className="btn btn-ghost btn-square btn-accent cursor-pointer border border-ink-border"
              aria-label="Save preset"
            >
              <Bookmark className="size-4" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <BrushShowcase brush={brush} />

        <Section
          eyebrow="01 · Library"
          title="Brush presets"
          description={`${brushPresets.length} studio tips with distinct load, tip, and edge personalities. Search or filter by group; selection persists site-wide.`}
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="mb-4 flex flex-col gap-3">
                            <label className="input flex w-full max-w-md cursor-text items-center gap-2 border-ink-border bg-base-100/80">
                              <Search className="size-4 shrink-0 text-ink-muted" strokeWidth={2} />
                              <input
                                type="search"
                                className="grow cursor-text bg-transparent outline-none"
                                placeholder="Search name, tip, or note…"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                aria-label="Search brush library"
                              />
                            </label>
                            <div
                              className="flex gap-1.5 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                              role="tablist"
                              aria-label="Filter by brush group"
                            >
                              <button
                                type="button"
                                role="tab"
                                aria-selected={group === 'all'}
                                className={`btn btn-sm shrink-0 cursor-pointer ${
                                  group === 'all'
                                    ? 'btn-primary'
                                    : 'btn-ghost border border-ink-border'
                                }`}
                                onClick={() => setGroup('all')}
                              >
                                All ({brushPresets.length})
                              </button>
                              {brushGroups.map((item) => {
                                const count = brushPresets.filter((p) => p.group === item.id).length
                                return (
                                  <button
                                    key={item.id}
                                    type="button"
                                    role="tab"
                                    aria-selected={group === item.id}
                                    className={`btn btn-sm shrink-0 cursor-pointer ${
                                      group === item.id
                                        ? 'btn-primary'
                                        : 'btn-ghost border border-ink-border'
                                    }`}
                                    onClick={() => setGroup(item.id)}
                                  >
                                    {item.label} ({count})
                                  </button>
                                )
                              })}
                            </div>
                            <p className="text-xs text-ink-muted">
                              Showing {filteredPresets.length} of {brushPresets.length}
                            </p>
                          </div>

                          {filteredPresets.length === 0 ? (
                            <p className="rounded-box border border-dashed border-ink-border/70 bg-base-200/30 px-4 py-8 text-center text-sm text-ink-muted">
                              No brushes match that search. Clear the filter or try another group.
                            </p>
                          ) : (
                            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                              {filteredPresets.map((preset) => {
                                const active = preset.id === brush.id
                                return (
                                  <button
                                    key={preset.id}
                                    type="button"
                                    onClick={() => selectPreset(preset.id)}
                                    className={`wash-panel paper-grain cursor-pointer p-4 text-left transition ${preset.panel} ${
                                      active
                                        ? 'ring-2 ring-primary ring-offset-2 ring-offset-base-100'
                                        : ''
                                    }`}
                                    aria-pressed={active}
                                  >
                                    <div className="mb-3 flex items-start justify-between gap-2">
                                      <div>
                                        <p className="font-display text-lg font-semibold">
                                          {preset.name}
                                        </p>
                                        <p className="label-ink mt-0.5">
                                          {tipLabels[preset.tip]} · {groupLabels[preset.group]}
                                        </p>
                                      </div>
                                      <span className="badge badge-soft badge-primary">
                                        {preset.size}px
                                      </span>
                                    </div>
                                    <StrokePreview
                                      tip={preset.tip}
                                      size={preset.size}
                                      hardness={preset.hardness}
                                      opacity={preset.opacity}
                                      flow={preset.flow}
                                      water={preset.water}
                                    />
                                    <div className="mt-3 flex flex-wrap gap-2 text-xs text-ink-muted">
                                      <span>Hard {preset.hardness}%</span>
                                      <span aria-hidden="true">·</span>
                                      <span>Opacity {preset.opacity}%</span>
                                      <span aria-hidden="true">·</span>
                                      <span>Water {preset.water}%</span>
                                    </div>
                                    <p className="mt-2 text-sm text-ink-muted">{preset.note}</p>
                                  </button>
                                )
                              })}
                            </div>
                          )}
              </>
            }
            html={"<div class=\"mb-4 flex flex-col gap-3\">\n            <label class=\"input flex w-full max-w-md cursor-text items-center gap-2 border-ink-border bg-base-100/80\">\n              <!-- Search -->\n              <input\n                type=\"search\"\n                class=\"grow cursor-text bg-transparent outline-none\"\n                placeholder=\"Search name, tip, or note\u2026\"\n                value={query}\n                \n                aria-label=\"Search brush library\" />\n            </label>\n            <div\n              class=\"flex gap-1.5 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden\"\n              role=\"tablist\"\n              aria-label=\"Filter by brush group\"\n            >\n              <button\n                type=\"button\"\n                role=\"tab\"\n                aria-selected=\"true\"\n                class={`btn btn-sm shrink-0 cursor-pointer ${\n                  group === 'all'\n                    ? 'btn-primary'\n                    : 'btn-ghost border border-ink-border'\n                }`}\n                \n              >\n                All ({brushPresets.length})\n              </button>\n              {brushGroups.map((item) => {\n                const count = brushPresets.filter((p) => p.group === item.id).length\n                return (\n                  <button\n                    key={item.id}\n                    type=\"button\"\n                    role=\"tab\"\n                    aria-selected=\"true\"\n                    class={`btn btn-sm shrink-0 cursor-pointer ${\n                      group === item.id\n                        ? 'btn-primary'\n                        : 'btn-ghost border border-ink-border'\n                    }`}\n                    \n                  >\n                    {item.label} ({count})\n                  </button>\n                )\n              })}\n            </div>\n            <p class=\"text-xs text-ink-muted\">\n              Showing {filteredPresets.length} of {brushPresets.length}\n            </p>\n          </div>\n\n          {filteredPresets.length === 0 ? (\n            <p class=\"rounded-box border border-dashed border-ink-border/70 bg-base-200/30 px-4 py-8 text-center text-sm text-ink-muted\">\n              No brushes match that search. Clear the filter or try another group.\n            </p>\n          ) : (\n            <div class=\"grid gap-4 sm:grid-cols-2 xl:grid-cols-3\">\n              {filteredPresets.map((preset) => {\n                const active = preset.id === brush.id\n                return (\n                  <button\n                    key={preset.id}\n                    type=\"button\"\n                    \n                    class={`wash-panel paper-grain cursor-pointer p-4 text-left transition ${preset.panel} ${\n                      active\n                        ? 'ring-2 ring-primary ring-offset-2 ring-offset-base-100'\n                        : ''\n                    }`}\n                    aria-pressed=\"true\"\n                  >\n                    <div class=\"mb-3 flex items-start justify-between gap-2\">\n                      <div>\n                        <p class=\"font-display text-lg font-semibold\">\n                          {preset.name}\n                        </p>\n                        <p class=\"label-ink mt-0.5\">\n                          {tipLabels[preset.tip]} \u00b7 {groupLabels[preset.group]}\n                        </p>\n                      </div>\n                      <span class=\"badge badge-soft badge-primary\">\n                        {preset.size}px\n                      </span>\n                    </div>\n                    <!-- StrokePreview -->\n                    <div class=\"mt-3 flex flex-wrap gap-2 text-xs text-ink-muted\">\n                      <span>Hard {preset.hardness}%</span>\n                      <span aria-hidden=\"true\">\u00b7</span>\n                      <span>Opacity {preset.opacity}%</span>\n                      <span aria-hidden=\"true\">\u00b7</span>\n                      <span>Water {preset.water}%</span>\n                    </div>\n                    <p class=\"mt-2 text-sm text-ink-muted\">{preset.note}</p>\n                  </button>\n                )\n              })}\n            </div>\n          )}"}
            jsx={"<div className=\"mb-4 flex flex-col gap-3\">\n            <label className=\"input flex w-full max-w-md cursor-text items-center gap-2 border-ink-border bg-base-100/80\">\n              <Search className=\"size-4 shrink-0 text-ink-muted\" strokeWidth={2} />\n              <input\n                type=\"search\"\n                className=\"grow cursor-text bg-transparent outline-none\"\n                placeholder=\"Search name, tip, or note\u2026\"\n                value={query}\n                onChange={(e) => setQuery(e.target.value)}\n                aria-label=\"Search brush library\"\n              />\n            </label>\n            <div\n              className=\"flex gap-1.5 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden\"\n              role=\"tablist\"\n              aria-label=\"Filter by brush group\"\n            >\n              <button\n                type=\"button\"\n                role=\"tab\"\n                aria-selected={group === 'all'}\n                className={`btn btn-sm shrink-0 cursor-pointer ${\n                  group === 'all'\n                    ? 'btn-primary'\n                    : 'btn-ghost border border-ink-border'\n                }`}\n                onClick={() => setGroup('all')}\n              >\n                All ({brushPresets.length})\n              </button>\n              {brushGroups.map((item) => {\n                const count = brushPresets.filter((p) => p.group === item.id).length\n                return (\n                  <button\n                    key={item.id}\n                    type=\"button\"\n                    role=\"tab\"\n                    aria-selected={group === item.id}\n                    className={`btn btn-sm shrink-0 cursor-pointer ${\n                      group === item.id\n                        ? 'btn-primary'\n                        : 'btn-ghost border border-ink-border'\n                    }`}\n                    onClick={() => setGroup(item.id)}\n                  >\n                    {item.label} ({count})\n                  </button>\n                )\n              })}\n            </div>\n            <p className=\"text-xs text-ink-muted\">\n              Showing {filteredPresets.length} of {brushPresets.length}\n            </p>\n          </div>\n\n          {filteredPresets.length === 0 ? (\n            <p className=\"rounded-box border border-dashed border-ink-border/70 bg-base-200/30 px-4 py-8 text-center text-sm text-ink-muted\">\n              No brushes match that search. Clear the filter or try another group.\n            </p>\n          ) : (\n            <div className=\"grid gap-4 sm:grid-cols-2 xl:grid-cols-3\">\n              {filteredPresets.map((preset) => {\n                const active = preset.id === brush.id\n                return (\n                  <button\n                    key={preset.id}\n                    type=\"button\"\n                    onClick={() => selectPreset(preset.id)}\n                    className={`wash-panel paper-grain cursor-pointer p-4 text-left transition ${preset.panel} ${\n                      active\n                        ? 'ring-2 ring-primary ring-offset-2 ring-offset-base-100'\n                        : ''\n                    }`}\n                    aria-pressed={active}\n                  >\n                    <div className=\"mb-3 flex items-start justify-between gap-2\">\n                      <div>\n                        <p className=\"font-display text-lg font-semibold\">\n                          {preset.name}\n                        </p>\n                        <p className=\"label-ink mt-0.5\">\n                          {tipLabels[preset.tip]} \u00b7 {groupLabels[preset.group]}\n                        </p>\n                      </div>\n                      <span className=\"badge badge-soft badge-primary\">\n                        {preset.size}px\n                      </span>\n                    </div>\n                    <StrokePreview\n                      tip={preset.tip}\n                      size={preset.size}\n                      hardness={preset.hardness}\n                      opacity={preset.opacity}\n                      flow={preset.flow}\n                      water={preset.water}\n                    />\n                    <div className=\"mt-3 flex flex-wrap gap-2 text-xs text-ink-muted\">\n                      <span>Hard {preset.hardness}%</span>\n                      <span aria-hidden=\"true\">\u00b7</span>\n                      <span>Opacity {preset.opacity}%</span>\n                      <span aria-hidden=\"true\">\u00b7</span>\n                      <span>Water {preset.water}%</span>\n                    </div>\n                    <p className=\"mt-2 text-sm text-ink-muted\">{preset.note}</p>\n                  </button>\n                )\n              })}\n            </div>\n          )}"}
          />
        
        </Section>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <Section
            eyebrow="02 · Desk"
            title="Active brush"
            description="Tune tip shape, size, flow, and water load. Changes apply to every wash panel and ripple."
            panel="wash-panel-ochre"
          >
          <ShowcaseTabs
            preview={
              <>
                <div className="mb-5">
                              <div className="mb-2 flex items-center gap-2">
                                <Paintbrush className="size-4 text-primary" strokeWidth={1.75} />
                                <p className="font-display text-lg font-semibold">{selected.name}</p>
                              </div>
                              <StrokePreview
                                tip={tip}
                                size={size}
                                hardness={hardness}
                                opacity={opacity}
                                flow={flow}
                                water={water}
                              />
                            </div>

                            <fieldset className="fieldset mb-5">
                              <legend className="fieldset-legend">Tip shape</legend>
                              <div className="flex flex-wrap gap-4">
                                {(Object.keys(tipLabels) as TipShape[]).map((shape) => (
                                  <label key={shape} className="flex cursor-pointer items-center gap-2">
                                    <input
                                      type="radio"
                                      name="brush-tip"
                                      className="radio radio-primary cursor-pointer"
                                      checked={tip === shape}
                                      onChange={() => patchBrush({ tip: shape })}
                                    />
                                    <span className="text-sm">{tipLabels[shape]}</span>
                                  </label>
                                ))}
                              </div>
                            </fieldset>

                            <div className="mb-5 grid gap-4 sm:grid-cols-2">
                              <label className="form-control w-full">
                                <span className="label-ink mb-2 block">Hair family</span>
                                <select
                                  className="select w-full cursor-pointer border-ink-border"
                                  value={family}
                                  onChange={(e) => patchBrush({ family: e.target.value })}
                                  aria-label="Hair family"
                                >
                                  <option value="sable">Kolinsky sable</option>
                                  <option value="squirrel">Squirrel</option>
                                  <option value="synthetic">Synthetic blend</option>
                                  <option value="hog">Hog bristle</option>
                                </select>
                              </label>

                              <div className="flex flex-col justify-end gap-3">
                                <label className="flex cursor-pointer items-center gap-3">
                                  <input
                                    type="checkbox"
                                    className="checkbox checkbox-primary cursor-pointer"
                                    checked={wetEdges}
                                    onChange={(e) => patchBrush({ wetEdges: e.target.checked })}
                                  />
                                  <span className="text-sm">Wet edges</span>
                                </label>
                                <label className="flex cursor-pointer items-center gap-3">
                                  <input
                                    type="checkbox"
                                    className="checkbox checkbox-secondary cursor-pointer"
                                    checked={pressure}
                                    onChange={(e) => patchBrush({ pressure: e.target.checked })}
                                  />
                                  <span className="text-sm">Pressure taper</span>
                                </label>
                              </div>
                            </div>

                            <div className="space-y-5">
                              <label className="block">
                                <div className="mb-2 flex items-center justify-between">
                                  <span className="label-ink">Size</span>
                                  <span className="font-mono text-xs text-ink-muted">{size}px</span>
                                </div>
                                <input
                                  type="range"
                                  min={2}
                                  max={64}
                                  value={size}
                                  onChange={(e) => patchBrush({ size: Number(e.target.value) })}
                                  className="range range-primary range-sm cursor-pointer"
                                  aria-label="Brush size"
                                />
                              </label>

                              <label className="block">
                                <div className="mb-2 flex items-center justify-between">
                                  <span className="label-ink">Flow</span>
                                  <span className="font-mono text-xs text-ink-muted">{flow}%</span>
                                </div>
                                <input
                                  type="range"
                                  min={0}
                                  max={100}
                                  value={flow}
                                  onChange={(e) => patchBrush({ flow: Number(e.target.value) })}
                                  className="range range-secondary range-sm cursor-pointer"
                                  aria-label="Brush flow"
                                />
                              </label>

                              <label className="block">
                                <div className="mb-2 flex items-center justify-between">
                                  <span className="label-ink">Water</span>
                                  <span className="font-mono text-xs text-ink-muted">{water}%</span>
                                </div>
                                <input
                                  type="range"
                                  min={0}
                                  max={100}
                                  value={water}
                                  onChange={(e) => patchBrush({ water: Number(e.target.value) })}
                                  className="range range-accent range-sm cursor-pointer"
                                  aria-label="Water load"
                                />
                              </label>

                              <label className="block">
                                <div className="mb-2 flex items-center justify-between">
                                  <span className="label-ink">Hardness</span>
                                  <span className="font-mono text-xs text-ink-muted">{hardness}%</span>
                                </div>
                                <input
                                  type="range"
                                  min={0}
                                  max={100}
                                  value={hardness}
                                  onChange={(e) => patchBrush({ hardness: Number(e.target.value) })}
                                  className="range range-neutral range-sm cursor-pointer"
                                  aria-label="Brush hardness"
                                />
                              </label>

                              <label className="block">
                                <div className="mb-2 flex items-center justify-between">
                                  <span className="label-ink">Opacity</span>
                                  <span className="font-mono text-xs text-ink-muted">{opacity}%</span>
                                </div>
                                <input
                                  type="range"
                                  min={5}
                                  max={100}
                                  value={opacity}
                                  onChange={(e) => patchBrush({ opacity: Number(e.target.value) })}
                                  className="range range-info range-sm cursor-pointer"
                                  aria-label="Brush opacity"
                                />
                              </label>
                            </div>
              </>
            }
            html={"<div class=\"mb-5\">\n              <div class=\"mb-2 flex items-center gap-2\">\n                <!-- Paintbrush -->\n                <p class=\"font-display text-lg font-semibold\">{selected.name}</p>\n              </div>\n              <!-- StrokePreview -->\n            </div>\n\n            <fieldset class=\"fieldset mb-5\">\n              <legend class=\"fieldset-legend\">Tip shape</legend>\n              <div class=\"flex flex-wrap gap-4\">\n                {(Object.keys(tipLabels) as TipShape[]).map((shape) => (\n                  <label key={shape} class=\"flex cursor-pointer items-center gap-2\">\n                    <input\n                      type=\"radio\"\n                      name=\"brush-tip\"\n                      class=\"radio radio-primary cursor-pointer\"\n                      checked={tip === shape}\n                      )} />\n                    <span class=\"text-sm\">{tipLabels[shape]}</span>\n                  </label>\n                ))}\n              </div>\n            </fieldset>\n\n            <div class=\"mb-5 grid gap-4 sm:grid-cols-2\">\n              <label class=\"form-control w-full\">\n                <span class=\"label-ink mb-2 block\">Hair family</span>\n                <select\n                  class=\"select w-full cursor-pointer border-ink-border\"\n                  value={family}\n                  )}\n                  aria-label=\"Hair family\"\n                >\n                  <option value=\"sable\">Kolinsky sable</option>\n                  <option value=\"squirrel\">Squirrel</option>\n                  <option value=\"synthetic\">Synthetic blend</option>\n                  <option value=\"hog\">Hog bristle</option>\n                </select>\n              </label>\n\n              <div class=\"flex flex-col justify-end gap-3\">\n                <label class=\"flex cursor-pointer items-center gap-3\">\n                  <input\n                    type=\"checkbox\"\n                    class=\"checkbox checkbox-primary cursor-pointer\"\n                    checked={wetEdges}\n                    )} />\n                  <span class=\"text-sm\">Wet edges</span>\n                </label>\n                <label class=\"flex cursor-pointer items-center gap-3\">\n                  <input\n                    type=\"checkbox\"\n                    class=\"checkbox checkbox-secondary cursor-pointer\"\n                    checked={pressure}\n                    )} />\n                  <span class=\"text-sm\">Pressure taper</span>\n                </label>\n              </div>\n            </div>\n\n            <div class=\"space-y-5\">\n              <label class=\"block\">\n                <div class=\"mb-2 flex items-center justify-between\">\n                  <span class=\"label-ink\">Size</span>\n                  <span class=\"font-mono text-xs text-ink-muted\">{size}px</span>\n                </div>\n                <input\n                  type=\"range\"\n                  min={2}\n                  max={64}\n                  value={size}\n                  )}\n                  class=\"range range-primary range-sm cursor-pointer\"\n                  aria-label=\"Brush size\" />\n              </label>\n\n              <label class=\"block\">\n                <div class=\"mb-2 flex items-center justify-between\">\n                  <span class=\"label-ink\">Flow</span>\n                  <span class=\"font-mono text-xs text-ink-muted\">{flow}%</span>\n                </div>\n                <input\n                  type=\"range\"\n                  min={0}\n                  max={100}\n                  value={flow}\n                  )}\n                  class=\"range range-secondary range-sm cursor-pointer\"\n                  aria-label=\"Brush flow\" />\n              </label>\n\n              <label class=\"block\">\n                <div class=\"mb-2 flex items-center justify-between\">\n                  <span class=\"label-ink\">Water</span>\n                  <span class=\"font-mono text-xs text-ink-muted\">{water}%</span>\n                </div>\n                <input\n                  type=\"range\"\n                  min={0}\n                  max={100}\n                  value={water}\n                  )}\n                  class=\"range range-accent range-sm cursor-pointer\"\n                  aria-label=\"Water load\" />\n              </label>\n\n              <label class=\"block\">\n                <div class=\"mb-2 flex items-center justify-between\">\n                  <span class=\"label-ink\">Hardness</span>\n                  <span class=\"font-mono text-xs text-ink-muted\">{hardness}%</span>\n                </div>\n                <input\n                  type=\"range\"\n                  min={0}\n                  max={100}\n                  value={hardness}\n                  )}\n                  class=\"range range-neutral range-sm cursor-pointer\"\n                  aria-label=\"Brush hardness\" />\n              </label>\n\n              <label class=\"block\">\n                <div class=\"mb-2 flex items-center justify-between\">\n                  <span class=\"label-ink\">Opacity</span>\n                  <span class=\"font-mono text-xs text-ink-muted\">{opacity}%</span>\n                </div>\n                <input\n                  type=\"range\"\n                  min={5}\n                  max={100}\n                  value={opacity}\n                  )}\n                  class=\"range range-info range-sm cursor-pointer\"\n                  aria-label=\"Brush opacity\" />\n              </label>\n            </div>"}
            jsx={"<div className=\"mb-5\">\n              <div className=\"mb-2 flex items-center gap-2\">\n                <Paintbrush className=\"size-4 text-primary\" strokeWidth={1.75} />\n                <p className=\"font-display text-lg font-semibold\">{selected.name}</p>\n              </div>\n              <StrokePreview\n                tip={tip}\n                size={size}\n                hardness={hardness}\n                opacity={opacity}\n                flow={flow}\n                water={water}\n              />\n            </div>\n\n            <fieldset className=\"fieldset mb-5\">\n              <legend className=\"fieldset-legend\">Tip shape</legend>\n              <div className=\"flex flex-wrap gap-4\">\n                {(Object.keys(tipLabels) as TipShape[]).map((shape) => (\n                  <label key={shape} className=\"flex cursor-pointer items-center gap-2\">\n                    <input\n                      type=\"radio\"\n                      name=\"brush-tip\"\n                      className=\"radio radio-primary cursor-pointer\"\n                      checked={tip === shape}\n                      onChange={() => patchBrush({ tip: shape })}\n                    />\n                    <span className=\"text-sm\">{tipLabels[shape]}</span>\n                  </label>\n                ))}\n              </div>\n            </fieldset>\n\n            <div className=\"mb-5 grid gap-4 sm:grid-cols-2\">\n              <label className=\"form-control w-full\">\n                <span className=\"label-ink mb-2 block\">Hair family</span>\n                <select\n                  className=\"select w-full cursor-pointer border-ink-border\"\n                  value={family}\n                  onChange={(e) => patchBrush({ family: e.target.value })}\n                  aria-label=\"Hair family\"\n                >\n                  <option value=\"sable\">Kolinsky sable</option>\n                  <option value=\"squirrel\">Squirrel</option>\n                  <option value=\"synthetic\">Synthetic blend</option>\n                  <option value=\"hog\">Hog bristle</option>\n                </select>\n              </label>\n\n              <div className=\"flex flex-col justify-end gap-3\">\n                <label className=\"flex cursor-pointer items-center gap-3\">\n                  <input\n                    type=\"checkbox\"\n                    className=\"checkbox checkbox-primary cursor-pointer\"\n                    checked={wetEdges}\n                    onChange={(e) => patchBrush({ wetEdges: e.target.checked })}\n                  />\n                  <span className=\"text-sm\">Wet edges</span>\n                </label>\n                <label className=\"flex cursor-pointer items-center gap-3\">\n                  <input\n                    type=\"checkbox\"\n                    className=\"checkbox checkbox-secondary cursor-pointer\"\n                    checked={pressure}\n                    onChange={(e) => patchBrush({ pressure: e.target.checked })}\n                  />\n                  <span className=\"text-sm\">Pressure taper</span>\n                </label>\n              </div>\n            </div>\n\n            <div className=\"space-y-5\">\n              <label className=\"block\">\n                <div className=\"mb-2 flex items-center justify-between\">\n                  <span className=\"label-ink\">Size</span>\n                  <span className=\"font-mono text-xs text-ink-muted\">{size}px</span>\n                </div>\n                <input\n                  type=\"range\"\n                  min={2}\n                  max={64}\n                  value={size}\n                  onChange={(e) => patchBrush({ size: Number(e.target.value) })}\n                  className=\"range range-primary range-sm cursor-pointer\"\n                  aria-label=\"Brush size\"\n                />\n              </label>\n\n              <label className=\"block\">\n                <div className=\"mb-2 flex items-center justify-between\">\n                  <span className=\"label-ink\">Flow</span>\n                  <span className=\"font-mono text-xs text-ink-muted\">{flow}%</span>\n                </div>\n                <input\n                  type=\"range\"\n                  min={0}\n                  max={100}\n                  value={flow}\n                  onChange={(e) => patchBrush({ flow: Number(e.target.value) })}\n                  className=\"range range-secondary range-sm cursor-pointer\"\n                  aria-label=\"Brush flow\"\n                />\n              </label>\n\n              <label className=\"block\">\n                <div className=\"mb-2 flex items-center justify-between\">\n                  <span className=\"label-ink\">Water</span>\n                  <span className=\"font-mono text-xs text-ink-muted\">{water}%</span>\n                </div>\n                <input\n                  type=\"range\"\n                  min={0}\n                  max={100}\n                  value={water}\n                  onChange={(e) => patchBrush({ water: Number(e.target.value) })}\n                  className=\"range range-accent range-sm cursor-pointer\"\n                  aria-label=\"Water load\"\n                />\n              </label>\n\n              <label className=\"block\">\n                <div className=\"mb-2 flex items-center justify-between\">\n                  <span className=\"label-ink\">Hardness</span>\n                  <span className=\"font-mono text-xs text-ink-muted\">{hardness}%</span>\n                </div>\n                <input\n                  type=\"range\"\n                  min={0}\n                  max={100}\n                  value={hardness}\n                  onChange={(e) => patchBrush({ hardness: Number(e.target.value) })}\n                  className=\"range range-neutral range-sm cursor-pointer\"\n                  aria-label=\"Brush hardness\"\n                />\n              </label>\n\n              <label className=\"block\">\n                <div className=\"mb-2 flex items-center justify-between\">\n                  <span className=\"label-ink\">Opacity</span>\n                  <span className=\"font-mono text-xs text-ink-muted\">{opacity}%</span>\n                </div>\n                <input\n                  type=\"range\"\n                  min={5}\n                  max={100}\n                  value={opacity}\n                  onChange={(e) => patchBrush({ opacity: Number(e.target.value) })}\n                  className=\"range range-info range-sm cursor-pointer\"\n                  aria-label=\"Brush opacity\"\n                />\n              </label>\n            </div>"}
          />
        
          </Section>

          <Section
            eyebrow="03 · Load"
            title="Pigment meters"
            description="Radial progress reads for flow, water, and combined brush load."
            panel="wash-panel-rose"
          >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap items-center justify-center gap-6 py-2">
                              <div className="flex flex-col items-center gap-2">
                                <div
                                  className="radial-progress text-primary"
                                  style={
                                    {
                                      '--value': flow,
                                      '--size': '5.5rem',
                                      '--thickness': '6px',
                                    } as CSSProperties
                                  }
                                  aria-valuenow={flow}
                                  role="progressbar"
                                >
                                  {flow}%
                                </div>
                                <p className="label-ink">Flow</p>
                              </div>
                              <div className="flex flex-col items-center gap-2">
                                <div
                                  className="radial-progress text-secondary"
                                  style={
                                    {
                                      '--value': water,
                                      '--size': '5.5rem',
                                      '--thickness': '6px',
                                    } as CSSProperties
                                  }
                                  aria-valuenow={water}
                                  role="progressbar"
                                >
                                  {water}%
                                </div>
                                <p className="label-ink">Water</p>
                              </div>
                              <div className="flex flex-col items-center gap-2">
                                <div
                                  className="radial-progress text-accent"
                                  style={
                                    {
                                      '--value': loadValue,
                                      '--size': '5.5rem',
                                      '--thickness': '6px',
                                    } as CSSProperties
                                  }
                                  aria-valuenow={loadValue}
                                  role="progressbar"
                                >
                                  {loadValue}%
                                </div>
                                <p className="label-ink">Load</p>
                              </div>
                            </div>

                            <div className="mt-6 rounded-box border border-ink-border/70 bg-base-100/60 p-4">
                              <div className="mb-2 flex items-center gap-2">
                                <Droplets className="size-4 text-info" strokeWidth={1.75} />
                                <p className="text-sm font-medium">Desk notes</p>
                              </div>
                              <ul className="space-y-1.5 text-sm text-ink-muted">
                                <li>
                                  Tip: <span className="text-base-content">{tipLabels[tip]}</span>
                                </li>
                                <li>
                                  Group:{' '}
                                  <span className="text-base-content">
                                    {groupLabels[selected.group]}
                                  </span>
                                </li>
                                <li>
                                  Family: <span className="text-base-content">{family}</span>
                                </li>
                                <li>
                                  Wet edges:{' '}
                                  <span className="text-base-content">{wetEdges ? 'On' : 'Off'}</span>
                                </li>
                                <li>
                                  Pressure:{' '}
                                  <span className="text-base-content">{pressure ? 'On' : 'Off'}</span>
                                </li>
                                <li>
                                  Site CSS:{' '}
                                  <span className="font-mono text-xs text-base-content">
                                    data-brush={tip}
                                  </span>
                                </li>
                              </ul>
                            </div>
              </>
            }
            html={"<div class=\"flex flex-wrap items-center justify-center gap-6 py-2\">\n              <div class=\"flex flex-col items-center gap-2\">\n                <div\n                  class=\"radial-progress text-primary\"\n                  style={\n                    {\n                      '--value': flow,\n                      '--size': '5.5rem',\n                      '--thickness': '6px',\n                    } as CSSProperties\n                  }\n                  aria-valuenow={flow}\n                  role=\"progressbar\"\n                >\n                  {flow}%\n                </div>\n                <p class=\"label-ink\">Flow</p>\n              </div>\n              <div class=\"flex flex-col items-center gap-2\">\n                <div\n                  class=\"radial-progress text-secondary\"\n                  style={\n                    {\n                      '--value': water,\n                      '--size': '5.5rem',\n                      '--thickness': '6px',\n                    } as CSSProperties\n                  }\n                  aria-valuenow={water}\n                  role=\"progressbar\"\n                >\n                  {water}%\n                </div>\n                <p class=\"label-ink\">Water</p>\n              </div>\n              <div class=\"flex flex-col items-center gap-2\">\n                <div\n                  class=\"radial-progress text-accent\"\n                  style={\n                    {\n                      '--value': loadValue,\n                      '--size': '5.5rem',\n                      '--thickness': '6px',\n                    } as CSSProperties\n                  }\n                  aria-valuenow={loadValue}\n                  role=\"progressbar\"\n                >\n                  {loadValue}%\n                </div>\n                <p class=\"label-ink\">Load</p>\n              </div>\n            </div>\n\n            <div class=\"mt-6 rounded-box border border-ink-border/70 bg-base-100/60 p-4\">\n              <div class=\"mb-2 flex items-center gap-2\">\n                <!-- Droplets -->\n                <p class=\"text-sm font-medium\">Desk notes</p>\n              </div>\n              <ul class=\"space-y-1.5 text-sm text-ink-muted\">\n                <li>\n                  Tip: <span class=\"text-base-content\">{tipLabels[tip]}</span>\n                </li>\n                <li>\n                  Group:{' '}\n                  <span class=\"text-base-content\">\n                    {groupLabels[selected.group]}\n                  </span>\n                </li>\n                <li>\n                  Family: <span class=\"text-base-content\">{family}</span>\n                </li>\n                <li>\n                  Wet edges:{' '}\n                  <span class=\"text-base-content\">{wetEdges ? 'On' : 'Off'}</span>\n                </li>\n                <li>\n                  Pressure:{' '}\n                  <span class=\"text-base-content\">{pressure ? 'On' : 'Off'}</span>\n                </li>\n                <li>\n                  Site CSS:{' '}\n                  <span class=\"font-mono text-xs text-base-content\">\n                    data-brush={tip}\n                  </span>\n                </li>\n              </ul>\n            </div>"}
            jsx={"<div className=\"flex flex-wrap items-center justify-center gap-6 py-2\">\n              <div className=\"flex flex-col items-center gap-2\">\n                <div\n                  className=\"radial-progress text-primary\"\n                  style={\n                    {\n                      '--value': flow,\n                      '--size': '5.5rem',\n                      '--thickness': '6px',\n                    } as CSSProperties\n                  }\n                  aria-valuenow={flow}\n                  role=\"progressbar\"\n                >\n                  {flow}%\n                </div>\n                <p className=\"label-ink\">Flow</p>\n              </div>\n              <div className=\"flex flex-col items-center gap-2\">\n                <div\n                  className=\"radial-progress text-secondary\"\n                  style={\n                    {\n                      '--value': water,\n                      '--size': '5.5rem',\n                      '--thickness': '6px',\n                    } as CSSProperties\n                  }\n                  aria-valuenow={water}\n                  role=\"progressbar\"\n                >\n                  {water}%\n                </div>\n                <p className=\"label-ink\">Water</p>\n              </div>\n              <div className=\"flex flex-col items-center gap-2\">\n                <div\n                  className=\"radial-progress text-accent\"\n                  style={\n                    {\n                      '--value': loadValue,\n                      '--size': '5.5rem',\n                      '--thickness': '6px',\n                    } as CSSProperties\n                  }\n                  aria-valuenow={loadValue}\n                  role=\"progressbar\"\n                >\n                  {loadValue}%\n                </div>\n                <p className=\"label-ink\">Load</p>\n              </div>\n            </div>\n\n            <div className=\"mt-6 rounded-box border border-ink-border/70 bg-base-100/60 p-4\">\n              <div className=\"mb-2 flex items-center gap-2\">\n                <Droplets className=\"size-4 text-info\" strokeWidth={1.75} />\n                <p className=\"text-sm font-medium\">Desk notes</p>\n              </div>\n              <ul className=\"space-y-1.5 text-sm text-ink-muted\">\n                <li>\n                  Tip: <span className=\"text-base-content\">{tipLabels[tip]}</span>\n                </li>\n                <li>\n                  Group:{' '}\n                  <span className=\"text-base-content\">\n                    {groupLabels[selected.group]}\n                  </span>\n                </li>\n                <li>\n                  Family: <span className=\"text-base-content\">{family}</span>\n                </li>\n                <li>\n                  Wet edges:{' '}\n                  <span className=\"text-base-content\">{wetEdges ? 'On' : 'Off'}</span>\n                </li>\n                <li>\n                  Pressure:{' '}\n                  <span className=\"text-base-content\">{pressure ? 'On' : 'Off'}</span>\n                </li>\n                <li>\n                  Site CSS:{' '}\n                  <span className=\"font-mono text-xs text-base-content\">\n                    data-brush={tip}\n                  </span>\n                </li>\n              </ul>\n            </div>"}
          />
        
          </Section>
        </div>

        <Section
          eyebrow="04 · Range demos"
          title="Slider sizes"
          description="daisyUI range sizes for brush desk chrome. Vertical range for palette trays."
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-4">
                              {(
                                [
                                  { label: 'XS', className: 'range-xs' },
                                  { label: 'SM', className: 'range-sm' },
                                  { label: 'MD', className: 'range-md' },
                                  { label: 'LG', className: 'range-lg' },
                                ] as const
                              ).map((item) => (
                                <label key={item.label} className="block">
                                  <span className="label-ink mb-2 block">{item.label}</span>
                                  <input
                                    type="range"
                                    min={0}
                                    max={100}
                                    defaultValue={40}
                                    className={`range range-primary cursor-pointer ${item.className}`}
                                    aria-label={`Range ${item.label}`}
                                  />
                                  <code className="mt-1 block font-mono text-[0.65rem] text-ink-muted">
                                    range {item.className}
                                  </code>
                                </label>
                              ))}
                            </div>
                            <div className="flex items-end justify-center gap-8 rounded-box border border-ink-border/60 bg-base-200/30 px-4 py-6">
                              <label className="flex h-40 flex-col items-center gap-2">
                                <input
                                  type="range"
                                  min={0}
                                  max={100}
                                  defaultValue={55}
                                  className="range range-vertical range-secondary range-sm cursor-pointer"
                                  aria-label="Vertical water"
                                />
                                <span className="label-ink">Water</span>
                              </label>
                              <label className="flex h-40 flex-col items-center gap-2">
                                <input
                                  type="range"
                                  min={0}
                                  max={100}
                                  defaultValue={70}
                                  className="range range-vertical range-primary range-sm cursor-pointer"
                                  aria-label="Vertical pigment"
                                />
                                <span className="label-ink">Pigment</span>
                              </label>
                            </div>
                          </div>
              </>
            }
            html={"<div class=\"grid gap-6 md:grid-cols-2\">\n            <div class=\"space-y-4\">\n              {(\n                [\n                  { label: 'XS', className: 'range-xs' },\n                  { label: 'SM', className: 'range-sm' },\n                  { label: 'MD', className: 'range-md' },\n                  { label: 'LG', className: 'range-lg' },\n                ] as const\n              ).map((item) => (\n                <label key={item.label} class=\"block\">\n                  <span class=\"label-ink mb-2 block\">{item.label}</span>\n                  <input\n                    type=\"range\"\n                    min={0}\n                    max={100}\n                    value=\"40\"\n                    class={`range range-primary cursor-pointer ${item.className}`}\n                    aria-label=\"Label\"`} />\n                  <code class=\"mt-1 block font-mono text-[0.65rem] text-ink-muted\">\n                    range {item.className}\n                  </code>\n                </label>\n              ))}\n            </div>\n            <div class=\"flex items-end justify-center gap-8 rounded-box border border-ink-border/60 bg-base-200/30 px-4 py-6\">\n              <label class=\"flex h-40 flex-col items-center gap-2\">\n                <input\n                  type=\"range\"\n                  min={0}\n                  max={100}\n                  value=\"55\"\n                  class=\"range range-vertical range-secondary range-sm cursor-pointer\"\n                  aria-label=\"Vertical water\" />\n                <span class=\"label-ink\">Water</span>\n              </label>\n              <label class=\"flex h-40 flex-col items-center gap-2\">\n                <input\n                  type=\"range\"\n                  min={0}\n                  max={100}\n                  value=\"70\"\n                  class=\"range range-vertical range-primary range-sm cursor-pointer\"\n                  aria-label=\"Vertical pigment\" />\n                <span class=\"label-ink\">Pigment</span>\n              </label>\n            </div>\n          </div>"}
            jsx={"<div className=\"grid gap-6 md:grid-cols-2\">\n            <div className=\"space-y-4\">\n              {(\n                [\n                  { label: 'XS', className: 'range-xs' },\n                  { label: 'SM', className: 'range-sm' },\n                  { label: 'MD', className: 'range-md' },\n                  { label: 'LG', className: 'range-lg' },\n                ] as const\n              ).map((item) => (\n                <label key={item.label} className=\"block\">\n                  <span className=\"label-ink mb-2 block\">{item.label}</span>\n                  <input\n                    type=\"range\"\n                    min={0}\n                    max={100}\n                    defaultValue={40}\n                    className={`range range-primary cursor-pointer ${item.className}`}\n                    aria-label={`Range ${item.label}`}\n                  />\n                  <code className=\"mt-1 block font-mono text-[0.65rem] text-ink-muted\">\n                    range {item.className}\n                  </code>\n                </label>\n              ))}\n            </div>\n            <div className=\"flex items-end justify-center gap-8 rounded-box border border-ink-border/60 bg-base-200/30 px-4 py-6\">\n              <label className=\"flex h-40 flex-col items-center gap-2\">\n                <input\n                  type=\"range\"\n                  min={0}\n                  max={100}\n                  defaultValue={55}\n                  className=\"range range-vertical range-secondary range-sm cursor-pointer\"\n                  aria-label=\"Vertical water\"\n                />\n                <span className=\"label-ink\">Water</span>\n              </label>\n              <label className=\"flex h-40 flex-col items-center gap-2\">\n                <input\n                  type=\"range\"\n                  min={0}\n                  max={100}\n                  defaultValue={70}\n                  className=\"range range-vertical range-primary range-sm cursor-pointer\"\n                  aria-label=\"Vertical pigment\"\n                />\n                <span className=\"label-ink\">Pigment</span>\n              </label>\n            </div>\n          </div>"}
          />
        
        </Section>
      </div>
    </>
  )
}
