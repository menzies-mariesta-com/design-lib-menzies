import { useState, type ReactNode } from 'react'
import { Droplets, Paintbrush, RotateCcw } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import { ShowcaseTabs } from './components/ShowcaseTabs'

const colors = [
  { name: 'Default', className: '' },
  { name: 'Neutral', className: 'range-neutral' },
  { name: 'Primary', className: 'range-primary' },
  { name: 'Secondary', className: 'range-secondary' },
  { name: 'Accent', className: 'range-accent' },
  { name: 'Success', className: 'range-success' },
  { name: 'Warning', className: 'range-warning' },
  { name: 'Info', className: 'range-info' },
  { name: 'Error', className: 'range-error' },
] as const

const sizes = [
  { name: 'XS', className: 'range-xs', value: 30 },
  { name: 'SM', className: 'range-sm', value: 40 },
  { name: 'MD', className: 'range-md', value: 50 },
  { name: 'LG', className: 'range-lg', value: 60 },
  { name: 'XL', className: 'range-xl', value: 70 },
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
        <h2 className="font-display text-xl font-semibold md:text-2xl">{title}</h2>
        <p className="mt-1 text-sm text-ink-muted">{description}</p>
      </div>
      <div className="p-5">{children}</div>
    </article>
  )
}

function ClassLabel({ value }: { value: string }) {
  return (
    <code className="font-mono text-[0.65rem] text-ink-muted">
      {value || 'range'}
    </code>
  )
}

export default function RangePage() {
  const [basicValue, setBasicValue] = useState(40)
  const [liveValue, setLiveValue] = useState(55)
  const [stepValue, setStepValue] = useState(25)
  const [brushSize, setBrushSize] = useState(18)
  const [water, setWater] = useState(45)
  const [opacity, setOpacity] = useState(78)
  const [hardness, setHardness] = useState(62)

  function resetStudio() {
    setBrushSize(18)
    setWater(45)
    setOpacity(78)
    setHardness(62)
  }

  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Range
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">range</span> sliders for
          wash strength, brush size, and desk controls. Always set{' '}
          <span className="font-mono text-xs">min</span> and{' '}
          <span className="font-mono text-xs">max</span>.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Default range"
          description="Simple slider with a live value readout."
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="mx-auto w-full max-w-md">
                            <div className="mb-2 flex items-center justify-between">
                              <span className="label-ink">Wash strength</span>
                              <span className="font-mono text-xs text-ink-muted">{basicValue}</span>
                            </div>
                            <input
                              type="range"
                              min={0}
                              max={100}
                              value={basicValue}
                              onChange={(e) => setBasicValue(Number(e.target.value))}
                              className="range w-full cursor-pointer"
                              aria-label="Wash strength"
                            />
                            <p className="mt-2">
                              <ClassLabel value="range" />
                            </p>
                          </div>
              </>
            }
            html={`<div class="mx-auto w-full max-w-md">
            <div class="mb-2 flex items-center justify-between">
              <span class="label-ink">Wash strength</span>
              <span class="font-mono text-xs text-ink-muted"></span>
            </div>
            <input
              type="range"
              min=
              max=
              value=
              onChange=
              class="range w-full cursor-pointer"
              aria-label="Wash strength"
            />
            <p class="mt-2">
              
            </p>
          </div>`}
            jsx={`<div className="mx-auto w-full max-w-md">
            <div className="mb-2 flex items-center justify-between">
              <span className="label-ink">Wash strength</span>
              <span className="font-mono text-xs text-ink-muted">{basicValue}</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={basicValue}
              onChange={(e) => setBasicValue(Number(e.target.value))}
              className="range w-full cursor-pointer"
              aria-label="Wash strength"
            />
            <p className="mt-2">
              
            </p>
          </div>`}
          />
        </Section>

        <Section
          eyebrow="02 · Sizes"
          title="Size scale"
          description="Extra small through extra large track and thumb."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="mx-auto grid w-full max-w-lg gap-5">
                            {sizes.map((s) => (
                              <label key={s.name} className="block">
                                <div className="mb-2 flex items-center justify-between gap-3">
                                  <span className="label-ink">{s.name}</span>
                                  <ClassLabel value={`range ${s.className}`} />
                                </div>
                                <input
                                  type="range"
                                  min={0}
                                  max={100}
                                  defaultValue={s.value}
                                  className={`range w-full cursor-pointer ${s.className}`}
                                  aria-label={`Range size ${s.name}`}
                                />
                              </label>
                            ))}
                          </div>
              </>
            }
            html={`<div class="mx-auto grid w-full max-w-lg gap-5">
            <!-- repeat for each item -->
          </div>`}
            jsx={`<div className="mx-auto grid w-full max-w-lg gap-5">
            {sizes.map((s) => (
              <label key={s.name} className="block">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="label-ink">{s.name}</span>
                  
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  defaultValue={s.value}
                  className={\`range w-full cursor-pointer \${s.className}\`}
                  aria-label={\`Range size \${s.name}\`}
                />
              </label>
            ))}
          </div>`}
          />
        </Section>

        <Section
          eyebrow="03 · Colors"
          title="Semantic colors"
          description="Neutral through error fill accents."
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {colors.map((c) => (
                              <label key={c.name} className="block">
                                <div className="mb-2 flex items-center justify-between gap-2">
                                  <span className="label-ink">{c.name}</span>
                                  <ClassLabel
                                    value={c.className ? `range ${c.className}` : 'range'}
                                  />
                                </div>
                                <input
                                  type="range"
                                  min={0}
                                  max={100}
                                  defaultValue={40}
                                  className={`range w-full cursor-pointer ${c.className}`}
                                  aria-label={`Range color ${c.name}`}
                                />
                              </label>
                            ))}
                          </div>
              </>
            }
            html={`<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <!-- repeat for each item -->
          </div>`}
            jsx={`<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {colors.map((c) => (
              <label key={c.name} className="block">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="label-ink">{c.name}</span>
                  
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  defaultValue={40}
                  className={\`range w-full cursor-pointer \${c.className}\`}
                  aria-label={\`Range color \${c.name}\`}
                />
              </label>
            ))}
          </div>`}
          />
        </Section>

        <Section
          eyebrow="04 · Steps"
          title="Steps and measure"
          description="Stepped values with tick marks and numbered measure labels."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="mx-auto w-full max-w-xs">
                            <div className="mb-2 flex items-center justify-between">
                              <span className="label-ink">Dilution steps</span>
                              <span className="font-mono text-xs text-ink-muted">
                                {stepValue}
                              </span>
                            </div>
                            <input
                              type="range"
                              min={0}
                              max={100}
                              step={25}
                              value={stepValue}
                              onChange={(e) => setStepValue(Number(e.target.value))}
                              className="range range-primary w-full cursor-pointer"
                              aria-label="Dilution steps"
                            />
                            <div className="mt-2 flex justify-between px-2.5 text-xs text-ink-muted">
                              <span>|</span>
                              <span>|</span>
                              <span>|</span>
                              <span>|</span>
                              <span>|</span>
                            </div>
                            <div className="mt-2 flex justify-between px-2.5 text-xs text-ink-muted">
                              <span>1</span>
                              <span>2</span>
                              <span>3</span>
                              <span>4</span>
                              <span>5</span>
                            </div>
                            <p className="mt-3">
                              <ClassLabel value="range step=25 + measure" />
                            </p>
                          </div>
              </>
            }
            html={`<div class="mx-auto w-full max-w-xs">
            <div class="mb-2 flex items-center justify-between">
              <span class="label-ink">Dilution steps</span>
              <span class="font-mono text-xs text-ink-muted">
                
              </span>
            </div>
            <input
              type="range"
              min=
              max=
              step=
              value=
              onChange=
              class="range range-primary w-full cursor-pointer"
              aria-label="Dilution steps"
            />
            <div class="mt-2 flex justify-between px-2.5 text-xs text-ink-muted">
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
            </div>
            <div class="mt-2 flex justify-between px-2.5 text-xs text-ink-muted">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
            </div>
            <p class="mt-3">
              
            </p>
          </div>`}
            jsx={`<div className="mx-auto w-full max-w-xs">
            <div className="mb-2 flex items-center justify-between">
              <span className="label-ink">Dilution steps</span>
              <span className="font-mono text-xs text-ink-muted">
                {stepValue}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              step={25}
              value={stepValue}
              onChange={(e) => setStepValue(Number(e.target.value))}
              className="range range-primary w-full cursor-pointer"
              aria-label="Dilution steps"
            />
            <div className="mt-2 flex justify-between px-2.5 text-xs text-ink-muted">
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
            </div>
            <div className="mt-2 flex justify-between px-2.5 text-xs text-ink-muted">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
            </div>
            <p className="mt-3">
              
            </p>
          </div>`}
          />
        </Section>

        <Section
          eyebrow="05 · Interactive"
          title="Controlled value"
          description="React state drives the slider and a matching progress bar."
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="mx-auto grid w-full max-w-xl gap-6 md:grid-cols-[1fr_auto] md:items-center">
                            <div>
                              <div className="mb-2 flex items-center justify-between">
                                <span className="label-ink">Pigment load</span>
                                <span className="badge badge-primary badge-outline font-mono">
                                  {liveValue}%
                                </span>
                              </div>
                              <input
                                type="range"
                                min={0}
                                max={100}
                                value={liveValue}
                                onChange={(e) => setLiveValue(Number(e.target.value))}
                                className="range range-secondary w-full cursor-pointer"
                                aria-label="Pigment load"
                              />
                              <progress
                                className="progress progress-secondary mt-4 h-2 w-full"
                                value={liveValue}
                                max={100}
                                aria-label="Pigment load progress"
                              />
                              <p className="mt-2">
                                <ClassLabel value="range range-secondary (controlled)" />
                              </p>
                            </div>
                            <div className="flex justify-center gap-6 rounded-box border border-ink-border/60 bg-base-200/30 px-4 py-5">
                              <label className="flex h-36 flex-col items-center gap-2">
                                <input
                                  type="range"
                                  min={0}
                                  max={100}
                                  value={liveValue}
                                  onChange={(e) => setLiveValue(Number(e.target.value))}
                                  className="range range-vertical range-secondary range-sm cursor-pointer"
                                  aria-label="Vertical pigment load"
                                />
                                <span className="label-ink">Load</span>
                              </label>
                            </div>
                          </div>
              </>
            }
            html={`<div class="mx-auto grid w-full max-w-xl gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div class="mb-2 flex items-center justify-between">
                <span class="label-ink">Pigment load</span>
                <span class="badge badge-primary badge-outline font-mono">
                  %
                </span>
              </div>
              <input
                type="range"
                min=
                max=
                value=
                onChange=
                class="range range-secondary w-full cursor-pointer"
                aria-label="Pigment load"
              />
              <progress
                class="progress progress-secondary mt-4 h-2 w-full"
                value=
                max=
                aria-label="Pigment load progress"
              />
              <p class="mt-2">
                
              </p>
            </div>
            <div class="flex justify-center gap-6 rounded-box border border-ink-border/60 bg-base-200/30 px-4 py-5">
              <label class="flex h-36 flex-col items-center gap-2">
                <input
                  type="range"
                  min=
                  max=
                  value=
                  onChange=
                  class="range range-vertical range-secondary range-sm cursor-pointer"
                  aria-label="Vertical pigment load"
                />
                <span class="label-ink">Load</span>
              </label>
            </div>
          </div>`}
            jsx={`<div className="mx-auto grid w-full max-w-xl gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="label-ink">Pigment load</span>
                <span className="badge badge-primary badge-outline font-mono">
                  {liveValue}%
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={liveValue}
                onChange={(e) => setLiveValue(Number(e.target.value))}
                className="range range-secondary w-full cursor-pointer"
                aria-label="Pigment load"
              />
              <progress
                className="progress progress-secondary mt-4 h-2 w-full"
                value={liveValue}
                max={100}
                aria-label="Pigment load progress"
              />
              <p className="mt-2">
                
              </p>
            </div>
            <div className="flex justify-center gap-6 rounded-box border border-ink-border/60 bg-base-200/30 px-4 py-5">
              <label className="flex h-36 flex-col items-center gap-2">
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={liveValue}
                  onChange={(e) => setLiveValue(Number(e.target.value))}
                  className="range range-vertical range-secondary range-sm cursor-pointer"
                  aria-label="Vertical pigment load"
                />
                <span className="label-ink">Load</span>
              </label>
            </div>
          </div>`}
          />
        </Section>

        <Section
          eyebrow="06 · Studio"
          title="Brush desk"
          description="Brush size, water, opacity, and hardness in one restrained wash panel."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <Paintbrush className="size-4 text-primary" strokeWidth={1.75} />
                              <p className="text-sm font-medium">Active tip</p>
                            </div>
                            <div className="tooltip tooltip-left" data-tip="Reset desk">
                              <button
                                type="button"
                                className="btn btn-ghost btn-square btn-sm cursor-pointer"
                                aria-label="Reset desk"
                                onClick={resetStudio}
                              >
                                <RotateCcw className="size-4" strokeWidth={2} />
                              </button>
                            </div>
                          </div>
                
                          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                            <div className="space-y-5">
                              <label className="block">
                                <div className="mb-2 flex items-center justify-between">
                                  <span className="label-ink">Brush size</span>
                                  <span className="font-mono text-xs text-ink-muted">
                                    {brushSize}px
                                  </span>
                                </div>
                                <input
                                  type="range"
                                  min={2}
                                  max={64}
                                  value={brushSize}
                                  onChange={(e) => setBrushSize(Number(e.target.value))}
                                  className="range range-primary range-sm w-full cursor-pointer"
                                  aria-label="Brush size"
                                />
                                <ClassLabel value="range range-primary range-sm" />
                              </label>
                
                              <label className="block">
                                <div className="mb-2 flex items-center justify-between">
                                  <span className="label-ink">Water</span>
                                  <span className="font-mono text-xs text-ink-muted">
                                    {water}%
                                  </span>
                                </div>
                                <input
                                  type="range"
                                  min={0}
                                  max={100}
                                  value={water}
                                  onChange={(e) => setWater(Number(e.target.value))}
                                  className="range range-accent range-sm w-full cursor-pointer"
                                  aria-label="Water load"
                                />
                                <ClassLabel value="range range-accent range-sm" />
                              </label>
                
                              <label className="block">
                                <div className="mb-2 flex items-center justify-between">
                                  <span className="label-ink">Opacity</span>
                                  <span className="font-mono text-xs text-ink-muted">
                                    {opacity}%
                                  </span>
                                </div>
                                <input
                                  type="range"
                                  min={5}
                                  max={100}
                                  value={opacity}
                                  onChange={(e) => setOpacity(Number(e.target.value))}
                                  className="range range-info range-sm w-full cursor-pointer"
                                  aria-label="Brush opacity"
                                />
                                <ClassLabel value="range range-info range-sm" />
                              </label>
                
                              <label className="block">
                                <div className="mb-2 flex items-center justify-between">
                                  <span className="label-ink">Hardness</span>
                                  <span className="font-mono text-xs text-ink-muted">
                                    {hardness}%
                                  </span>
                                </div>
                                <input
                                  type="range"
                                  min={0}
                                  max={100}
                                  value={hardness}
                                  onChange={(e) => setHardness(Number(e.target.value))}
                                  className="range range-neutral range-sm w-full cursor-pointer"
                                  aria-label="Brush hardness"
                                />
                                <ClassLabel value="range range-neutral range-sm" />
                              </label>
                            </div>
                
                            <div className="flex flex-col justify-between gap-4 rounded-box border border-ink-border/70 bg-base-100/60 p-4">
                              <div>
                                <div className="mb-3 flex items-center gap-2">
                                  <Droplets className="size-4 text-info" strokeWidth={1.75} />
                                  <p className="text-sm font-medium">Stroke preview</p>
                                </div>
                                <div className="flex h-24 items-center justify-center rounded-box border border-ink-border/50 bg-base-200/40 px-4">
                                  <div
                                    className="rounded-full bg-primary"
                                    style={{
                                      width: `${Math.max(8, brushSize * 1.4)}px`,
                                      height: `${Math.max(4, Math.round(brushSize * 0.35))}px`,
                                      opacity: opacity / 100,
                                      filter: `blur(${Math.max(0, (100 - hardness) / 28)}px)`,
                                      boxShadow: `0 0 ${Math.round(water / 8)}px color-mix(in oklab, var(--color-primary) ${Math.max(20, water)}%, transparent)`,
                                    }}
                                    aria-hidden="true"
                                  />
                                </div>
                              </div>
                              <ul className="space-y-1.5 text-sm text-ink-muted">
                                <li>
                                  Size:{' '}
                                  <span className="text-base-content">{brushSize}px</span>
                                </li>
                                <li>
                                  Water: <span className="text-base-content">{water}%</span>
                                </li>
                                <li>
                                  Opacity:{' '}
                                  <span className="text-base-content">{opacity}%</span>
                                </li>
                                <li>
                                  Hardness:{' '}
                                  <span className="text-base-content">{hardness}%</span>
                                </li>
                              </ul>
                            </div>
                          </div>
              </>
            }
            html={`<div class="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div class="flex items-center gap-2">
              <Paintbrush class="size-4 text-primary" strokeWidth= />
              <p class="text-sm font-medium">Active tip</p>
            </div>
            <div class="tooltip tooltip-left" data-tip="Reset desk">
              <button
                type="button"
                class="btn btn-ghost btn-square btn-sm cursor-pointer"
                aria-label="Reset desk"
                onClick=
              >
                <RotateCcw class="size-4" strokeWidth= />
              </button>
            </div>
          </div>

          <div class="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div class="space-y-5">
              <label class="block">
                <div class="mb-2 flex items-center justify-between">
                  <span class="label-ink">Brush size</span>
                  <span class="font-mono text-xs text-ink-muted">
                    px
                  </span>
                </div>
                <input
                  type="range"
                  min=
                  max=
                  value=
                  onChange=
                  class="range range-primary range-sm w-full cursor-pointer"
                  aria-label="Brush size"
                />
                
              </label>

              <label class="block">
                <div class="mb-2 flex items-center justify-between">
                  <span class="label-ink">Water</span>
                  <span class="font-mono text-xs text-ink-muted">
                    %
                  </span>
                </div>
                <input
                  type="range"
                  min=
                  max=
                  value=
                  onChange=
                  class="range range-accent range-sm w-full cursor-pointer"
                  aria-label="Water load"
                />
                
              </label>

              <label class="block">
                <div class="mb-2 flex items-center justify-between">
                  <span class="label-ink">Opacity</span>
                  <span class="font-mono text-xs text-ink-muted">
                    %
                  </span>
                </div>
                <input
                  type="range"
                  min=
                  max=
                  value=
                  onChange=
                  class="range range-info range-sm w-full cursor-pointer"
                  aria-label="Brush opacity"
                />
                
              </label>

              <label class="block">
                <div class="mb-2 flex items-center justify-between">
                  <span class="label-ink">Hardness</span>
                  <span class="font-mono text-xs text-ink-muted">
                    %
                  </span>
                </div>
                <input
                  type="range"
                  min=
                  max=
                  value=
                  onChange=
                  class="range range-neutral range-sm w-full cursor-pointer"
                  aria-label="Brush hardness"
                />
                
              </label>
            </div>

            <div class="flex flex-col justify-between gap-4 rounded-box border border-ink-border/70 bg-base-100/60 p-4">
              <div>
                <div class="mb-3 flex items-center gap-2">
                  <Droplets class="size-4 text-info" strokeWidth= />
                  <p class="text-sm font-medium">Stroke preview</p>
                </div>
                <div class="flex h-24 items-center justify-center rounded-box border border-ink-border/50 bg-base-200/40 px-4">
                  <div
                    class="rounded-full bg-primary"
                    style=px\`,
                      height: \`$px\`,
                      opacity: opacity / 100,
                      filter: \`blur($px)\`,
                      boxShadow: \`0 0 $px color-mix(in oklab, var(--color-primary) $%, transparent)\`,
                    }}
                    aria-hidden="true"
                  />
                </div>
              </div>
              <ul class="space-y-1.5 text-sm text-ink-muted">
                <li>
                  Size:
                  <span class="text-base-content">px</span>
                </li>
                <li>
                  Water: <span class="text-base-content">%</span>
                </li>
                <li>
                  Opacity:
                  <span class="text-base-content">%</span>
                </li>
                <li>
                  Hardness:
                  <span class="text-base-content">%</span>
                </li>
              </ul>
            </div>
          </div>`}
            jsx={`<div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Paintbrush className="size-4 text-primary" strokeWidth={1.75} />
              <p className="text-sm font-medium">Active tip</p>
            </div>
            <div className="tooltip tooltip-left" data-tip="Reset desk">
              <button
                type="button"
                className="btn btn-ghost btn-square btn-sm cursor-pointer"
                aria-label="Reset desk"
                onClick={resetStudio}
              >
                <RotateCcw className="size-4" strokeWidth={2} />
              </button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-5">
              <label className="block">
                <div className="mb-2 flex items-center justify-between">
                  <span className="label-ink">Brush size</span>
                  <span className="font-mono text-xs text-ink-muted">
                    {brushSize}px
                  </span>
                </div>
                <input
                  type="range"
                  min={2}
                  max={64}
                  value={brushSize}
                  onChange={(e) => setBrushSize(Number(e.target.value))}
                  className="range range-primary range-sm w-full cursor-pointer"
                  aria-label="Brush size"
                />
                
              </label>

              <label className="block">
                <div className="mb-2 flex items-center justify-between">
                  <span className="label-ink">Water</span>
                  <span className="font-mono text-xs text-ink-muted">
                    {water}%
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={water}
                  onChange={(e) => setWater(Number(e.target.value))}
                  className="range range-accent range-sm w-full cursor-pointer"
                  aria-label="Water load"
                />
                
              </label>

              <label className="block">
                <div className="mb-2 flex items-center justify-between">
                  <span className="label-ink">Opacity</span>
                  <span className="font-mono text-xs text-ink-muted">
                    {opacity}%
                  </span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={100}
                  value={opacity}
                  onChange={(e) => setOpacity(Number(e.target.value))}
                  className="range range-info range-sm w-full cursor-pointer"
                  aria-label="Brush opacity"
                />
                
              </label>

              <label className="block">
                <div className="mb-2 flex items-center justify-between">
                  <span className="label-ink">Hardness</span>
                  <span className="font-mono text-xs text-ink-muted">
                    {hardness}%
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={hardness}
                  onChange={(e) => setHardness(Number(e.target.value))}
                  className="range range-neutral range-sm w-full cursor-pointer"
                  aria-label="Brush hardness"
                />
                
              </label>
            </div>

            <div className="flex flex-col justify-between gap-4 rounded-box border border-ink-border/70 bg-base-100/60 p-4">
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <Droplets className="size-4 text-info" strokeWidth={1.75} />
                  <p className="text-sm font-medium">Stroke preview</p>
                </div>
                <div className="flex h-24 items-center justify-center rounded-box border border-ink-border/50 bg-base-200/40 px-4">
                  <div
                    className="rounded-full bg-primary"
                    style={{
                      width: \`\${Math.max(8, brushSize * 1.4)}px\`,
                      height: \`\${Math.max(4, Math.round(brushSize * 0.35))}px\`,
                      opacity: opacity / 100,
                      filter: \`blur(\${Math.max(0, (100 - hardness) / 28)}px)\`,
                      boxShadow: \`0 0 \${Math.round(water / 8)}px color-mix(in oklab, var(--color-primary) \${Math.max(20, water)}%, transparent)\`,
                    }}
                    aria-hidden="true"
                  />
                </div>
              </div>
              <ul className="space-y-1.5 text-sm text-ink-muted">
                <li>
                  Size:{' '}
                  <span className="text-base-content">{brushSize}px</span>
                </li>
                <li>
                  Water: <span className="text-base-content">{water}%</span>
                </li>
                <li>
                  Opacity:{' '}
                  <span className="text-base-content">{opacity}%</span>
                </li>
                <li>
                  Hardness:{' '}
                  <span className="text-base-content">{hardness}%</span>
                </li>
              </ul>
            </div>
          </div>`}
          />
        </Section>
      </div>
    </>
  )
}
