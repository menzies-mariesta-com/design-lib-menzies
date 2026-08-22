import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import {
  Droplets,
  Eye,
  EyeOff,
  Menu,
  Moon,
  Paintbrush,
  Sun,
  Volume2,
  VolumeX,
  X,
} from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import { ShowcaseTabs } from './components/ShowcaseTabs'

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
    <code className="font-mono text-[0.65rem] text-ink-muted">{value}</code>
  )
}

function IndeterminateSwap() {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const el = inputRef.current
    if (el) el.indeterminate = true
  }, [])

  return (
    <div className="flex flex-col items-center gap-2">
      <label className="swap cursor-pointer">
        <input ref={inputRef} type="checkbox" aria-label="Indeterminate swap demo" />
        <span className="swap-on font-display text-2xl font-semibold text-success">
          On
        </span>
        <span className="swap-off font-display text-2xl font-semibold text-error">
          Off
        </span>
        <span className="swap-indeterminate font-display text-2xl font-semibold text-warning">
          Mixed
        </span>
      </label>
      <ClassLabel value="swap-indeterminate" />
      <span className="text-xs text-ink-muted">Checkbox indeterminate</span>
    </div>
  )
}

function ControlledStudioSwaps() {
  const [wetBrush, setWetBrush] = useState(true)
  const [layerVisible, setLayerVisible] = useState(true)
  const [previewOn, setPreviewOn] = useState(false)

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div className="flex flex-col items-center gap-3 rounded-box border border-ink-border/50 bg-base-100/50 p-4">
        <label className="swap swap-flip cursor-pointer text-primary">
          <input
            type="checkbox"
            checked={wetBrush}
            onChange={(e) => setWetBrush(e.target.checked)}
            aria-label="Toggle wet or dry brush"
          />
          <Droplets className="swap-on size-10" strokeWidth={2} />
          <Paintbrush className="swap-off size-10" strokeWidth={2} />
        </label>
        <p className="text-sm font-medium">{wetBrush ? 'Wet brush' : 'Dry brush'}</p>
        <ClassLabel value="swap swap-flip (controlled)" />
        <button
          type="button"
          className="btn btn-sm btn-outline cursor-pointer"
          onClick={() => setWetBrush((v) => !v)}
        >
          Flip from button
        </button>
      </div>

      <div className="flex flex-col items-center gap-3 rounded-box border border-ink-border/50 bg-base-100/50 p-4">
        <div
          className={`tooltip tooltip-primary ${layerVisible ? 'tooltip-success' : 'tooltip-warning'}`}
          data-tip={layerVisible ? 'Hide layer' : 'Show layer'}
        >
          <label className="swap swap-rotate cursor-pointer">
            <input
              type="checkbox"
              checked={layerVisible}
              onChange={(e) => setLayerVisible(e.target.checked)}
              aria-label={layerVisible ? 'Hide layer' : 'Show layer'}
            />
            <Eye className="swap-on size-10 text-success" strokeWidth={2} />
            <EyeOff className="swap-off size-10 text-warning" strokeWidth={2} />
          </label>
        </div>
        <p className="text-sm font-medium">
          {layerVisible ? 'Layer visible' : 'Layer hidden'}
        </p>
        <ClassLabel value="swap swap-rotate (controlled)" />
      </div>

      <div className="flex flex-col items-center gap-3 rounded-box border border-ink-border/50 bg-base-100/50 p-4 sm:col-span-2 lg:col-span-1">
        <label
          className={`swap text-4xl cursor-pointer ${previewOn ? 'swap-active' : ''}`}
        >
          <span className="swap-on" aria-hidden="true">
            ▣
          </span>
          <span className="swap-off" aria-hidden="true">
            ▢
          </span>
        </label>
        <p className="text-sm font-medium">
          {previewOn ? 'Preview active' : 'Preview idle'}
        </p>
        <ClassLabel value="swap-active (class toggle)" />
        <button
          type="button"
          className="btn btn-sm btn-primary cursor-pointer"
          onClick={() => setPreviewOn((v) => !v)}
          aria-pressed={previewOn}
        >
          Toggle swap-active
        </button>
      </div>
    </div>
  )
}

export default function SwapPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Swap
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">swap</span> toggles for
          text, icons, and studio controls. Local demos only; ThemeSwitcher stays
          untouched.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Text and icon pairs"
          description="swap-on shows when checked. swap-off shows when unchecked."
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap items-end gap-8">
                            <div className="flex flex-col items-center gap-2">
                              <label className="swap cursor-pointer">
                                <input type="checkbox" aria-label="Text swap ON OFF" />
                                <div className="swap-on font-display text-2xl font-semibold text-primary">
                                  ON
                                </div>
                                <div className="swap-off font-display text-2xl font-semibold text-ink-muted">
                                  OFF
                                </div>
                              </label>
                              <ClassLabel value="swap" />
                              <span className="text-xs text-ink-muted">Text</span>
                            </div>
                
                            <div className="flex flex-col items-center gap-2">
                              <label className="swap cursor-pointer text-secondary">
                                <input type="checkbox" defaultChecked aria-label="Yes no text swap" />
                                <div className="swap-on text-lg font-semibold">Yes</div>
                                <div className="swap-off text-lg font-semibold">No</div>
                              </label>
                              <ClassLabel value="swap (default checked)" />
                              <span className="text-xs text-ink-muted">Checked start</span>
                            </div>
                
                            <div className="flex flex-col items-center gap-2">
                              <label className="swap cursor-pointer">
                                <input type="checkbox" aria-label="Heart outline filled swap" />
                                <svg
                                  className="swap-on size-10 fill-error"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  aria-hidden="true"
                                >
                                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                </svg>
                                <svg
                                  className="swap-off size-10 fill-none stroke-current"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  strokeWidth={2}
                                  aria-hidden="true"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                                  />
                                </svg>
                              </label>
                              <ClassLabel value="swap + swap-on / swap-off" />
                              <span className="text-xs text-ink-muted">Icon pair</span>
                            </div>
                          </div>
              </>
            }
            html={`<div class="flex flex-wrap items-end gap-8">
            <div class="flex flex-col items-center gap-2">
              <label class="swap cursor-pointer">
                <input type="checkbox" aria-label="Text swap ON OFF" />
                <div class="swap-on font-display text-2xl font-semibold text-primary">
                  ON
                </div>
                <div class="swap-off font-display text-2xl font-semibold text-ink-muted">
                  OFF
                </div>
              </label>
              
              <span class="text-xs text-ink-muted">Text</span>
            </div>

            <div class="flex flex-col items-center gap-2">
              <label class="swap cursor-pointer text-secondary">
                <input type="checkbox" checked aria-label="Yes no text swap" />
                <div class="swap-on text-lg font-semibold">Yes</div>
                <div class="swap-off text-lg font-semibold">No</div>
              </label>
              
              <span class="text-xs text-ink-muted">Checked start</span>
            </div>

            <div class="flex flex-col items-center gap-2">
              <label class="swap cursor-pointer">
                <input type="checkbox" aria-label="Heart outline filled swap" />
                <svg
                  class="swap-on size-10 fill-error"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <svg
                  class="swap-off size-10 fill-none stroke-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeWidth=
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                  />
                </svg>
              </label>
              
              <span class="text-xs text-ink-muted">Icon pair</span>
            </div>
          </div>`}
            jsx={`<div className="flex flex-wrap items-end gap-8">
            <div className="flex flex-col items-center gap-2">
              <label className="swap cursor-pointer">
                <input type="checkbox" aria-label="Text swap ON OFF" />
                <div className="swap-on font-display text-2xl font-semibold text-primary">
                  ON
                </div>
                <div className="swap-off font-display text-2xl font-semibold text-ink-muted">
                  OFF
                </div>
              </label>
              
              <span className="text-xs text-ink-muted">Text</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <label className="swap cursor-pointer text-secondary">
                <input type="checkbox" defaultChecked aria-label="Yes no text swap" />
                <div className="swap-on text-lg font-semibold">Yes</div>
                <div className="swap-off text-lg font-semibold">No</div>
              </label>
              
              <span className="text-xs text-ink-muted">Checked start</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <label className="swap cursor-pointer">
                <input type="checkbox" aria-label="Heart outline filled swap" />
                <svg
                  className="swap-on size-10 fill-error"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <svg
                  className="swap-off size-10 fill-none stroke-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                  />
                </svg>
              </label>
              
              <span className="text-xs text-ink-muted">Icon pair</span>
            </div>
          </div>`}
          />
        </Section>

        <Section
          eyebrow="02 · Motion"
          title="Rotate and flip"
          description="Modifiers add transition: swap-rotate turns, swap-flip flips on the Y axis."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap items-end gap-10">
                            <div className="flex flex-col items-center gap-2">
                              <label className="swap swap-rotate cursor-pointer">
                                <input type="checkbox" aria-label="Rotate sun moon demo" />
                                <Sun className="swap-on size-10 text-warning" strokeWidth={2} />
                                <Moon className="swap-off size-10 text-info" strokeWidth={2} />
                              </label>
                              <ClassLabel value="swap swap-rotate" />
                              <span className="text-xs text-ink-muted">Rotate</span>
                            </div>
                
                            <div className="flex flex-col items-center gap-2">
                              <label className="swap swap-flip cursor-pointer text-5xl">
                                <input type="checkbox" aria-label="Flip faces demo" />
                                <div className="swap-on">A</div>
                                <div className="swap-off">B</div>
                              </label>
                              <ClassLabel value="swap swap-flip" />
                              <span className="text-xs text-ink-muted">Flip</span>
                            </div>
                
                            <div className="flex flex-col items-center gap-2">
                              <label className="swap swap-flip cursor-pointer">
                                <input type="checkbox" defaultChecked aria-label="Flip wet dry icons" />
                                <Droplets className="swap-on size-10 text-info" strokeWidth={2} />
                                <Paintbrush className="swap-off size-10 text-secondary" strokeWidth={2} />
                              </label>
                              <ClassLabel value="swap swap-flip (icons)" />
                              <span className="text-xs text-ink-muted">Icon flip</span>
                            </div>
                          </div>
              </>
            }
            html={`<div class="flex flex-wrap items-end gap-10">
            <div class="flex flex-col items-center gap-2">
              <label class="swap swap-rotate cursor-pointer">
                <input type="checkbox" aria-label="Rotate sun moon demo" />
                <Sun class="swap-on size-10 text-warning" strokeWidth= />
                <Moon class="swap-off size-10 text-info" strokeWidth= />
              </label>
              
              <span class="text-xs text-ink-muted">Rotate</span>
            </div>

            <div class="flex flex-col items-center gap-2">
              <label class="swap swap-flip cursor-pointer text-5xl">
                <input type="checkbox" aria-label="Flip faces demo" />
                <div class="swap-on">A</div>
                <div class="swap-off">B</div>
              </label>
              
              <span class="text-xs text-ink-muted">Flip</span>
            </div>

            <div class="flex flex-col items-center gap-2">
              <label class="swap swap-flip cursor-pointer">
                <input type="checkbox" checked aria-label="Flip wet dry icons" />
                <Droplets class="swap-on size-10 text-info" strokeWidth= />
                <Paintbrush class="swap-off size-10 text-secondary" strokeWidth= />
              </label>
              
              <span class="text-xs text-ink-muted">Icon flip</span>
            </div>
          </div>`}
            jsx={`<div className="flex flex-wrap items-end gap-10">
            <div className="flex flex-col items-center gap-2">
              <label className="swap swap-rotate cursor-pointer">
                <input type="checkbox" aria-label="Rotate sun moon demo" />
                <Sun className="swap-on size-10 text-warning" strokeWidth={2} />
                <Moon className="swap-off size-10 text-info" strokeWidth={2} />
              </label>
              
              <span className="text-xs text-ink-muted">Rotate</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <label className="swap swap-flip cursor-pointer text-5xl">
                <input type="checkbox" aria-label="Flip faces demo" />
                <div className="swap-on">A</div>
                <div className="swap-off">B</div>
              </label>
              
              <span className="text-xs text-ink-muted">Flip</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <label className="swap swap-flip cursor-pointer">
                <input type="checkbox" defaultChecked aria-label="Flip wet dry icons" />
                <Droplets className="swap-on size-10 text-info" strokeWidth={2} />
                <Paintbrush className="swap-off size-10 text-secondary" strokeWidth={2} />
              </label>
              
              <span className="text-xs text-ink-muted">Icon flip</span>
            </div>
          </div>`}
          />
        </Section>

        <Section
          eyebrow="03 · Indeterminate"
          title="Three-state swap"
          description="swap-indeterminate appears when the controlling checkbox is indeterminate."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap items-end gap-8">
                            <IndeterminateSwap />
                            <div className="max-w-xs text-sm text-ink-muted">
                              Unchecked shows Off. Checked shows On. Indeterminate shows Mixed via{' '}
                              <span className="font-mono text-xs">swap-indeterminate</span>.
                            </div>
                          </div>
              </>
            }
            html={`<div class="flex flex-wrap items-end gap-8">
            <IndeterminateSwap />
            <div class="max-w-xs text-sm text-ink-muted">
              Unchecked shows Off. Checked shows On. Indeterminate shows Mixed via
              <span class="font-mono text-xs">swap-indeterminate</span>.
            </div>
          </div>`}
            jsx={`<div className="flex flex-wrap items-end gap-8">
            <IndeterminateSwap />
            <div className="max-w-xs text-sm text-ink-muted">
              Unchecked shows Off. Checked shows On. Indeterminate shows Mixed via{' '}
              <span className="font-mono text-xs">swap-indeterminate</span>.
            </div>
          </div>`}
          />
        </Section>

        <Section
          eyebrow="04 · Icon toggles"
          title="Volume, menu, and theme-ish"
          description="Common icon swaps. Sun and moon here are local only; they do not drive ThemeSwitcher."
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="flex flex-col items-center gap-2">
                              <div className="tooltip tooltip-primary tooltip-right" data-tip="Mute">
                                <label className="swap cursor-pointer text-primary">
                                  <input type="checkbox" aria-label="Mute volume" />
                                  <VolumeX className="swap-on size-10" strokeWidth={2} />
                                  <Volume2 className="swap-off size-10" strokeWidth={2} />
                                </label>
                              </div>
                              <ClassLabel value="swap (volume)" />
                              <span className="text-xs text-ink-muted">Volume</span>
                            </div>
                
                            <div className="flex flex-col items-center gap-2">
                              <div className="tooltip tooltip-secondary" data-tip="Menu">
                                <label className="btn btn-circle btn-secondary swap swap-rotate cursor-pointer">
                                  <input type="checkbox" aria-label="Open or close menu" />
                                  <Menu className="swap-off size-6" strokeWidth={2} />
                                  <X className="swap-on size-6" strokeWidth={2} />
                                </label>
                              </div>
                              <ClassLabel value="btn btn-circle swap swap-rotate" />
                              <span className="text-xs text-ink-muted">Hamburger</span>
                            </div>
                
                            <div className="flex flex-col items-center gap-2 sm:col-span-2 lg:col-span-1">
                              <div className="tooltip tooltip-accent" data-tip="Local day night">
                                <label className="swap swap-rotate cursor-pointer text-accent">
                                  <input type="checkbox" aria-label="Local day night preview" />
                                  <Sun className="swap-on size-10" strokeWidth={2} />
                                  <Moon className="swap-off size-10" strokeWidth={2} />
                                </label>
                              </div>
                              <ClassLabel value="swap swap-rotate (local theme-ish)" />
                              <span className="text-xs text-ink-muted">Day / night preview</span>
                            </div>
                          </div>
              </>
            }
            html={`<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div class="flex flex-col items-center gap-2">
              <div class="tooltip tooltip-primary tooltip-right" data-tip="Mute">
                <label class="swap cursor-pointer text-primary">
                  <input type="checkbox" aria-label="Mute volume" />
                  <VolumeX class="swap-on size-10" strokeWidth= />
                  <Volume2 class="swap-off size-10" strokeWidth= />
                </label>
              </div>
              
              <span class="text-xs text-ink-muted">Volume</span>
            </div>

            <div class="flex flex-col items-center gap-2">
              <div class="tooltip tooltip-secondary" data-tip="Menu">
                <label class="btn btn-circle btn-secondary swap swap-rotate cursor-pointer">
                  <input type="checkbox" aria-label="Open or close menu" />
                  <Menu class="swap-off size-6" strokeWidth= />
                  <X class="swap-on size-6" strokeWidth= />
                </label>
              </div>
              
              <span class="text-xs text-ink-muted">Hamburger</span>
            </div>

            <div class="flex flex-col items-center gap-2 sm:col-span-2 lg:col-span-1">
              <div class="tooltip tooltip-accent" data-tip="Local day night">
                <label class="swap swap-rotate cursor-pointer text-accent">
                  <input type="checkbox" aria-label="Local day night preview" />
                  <Sun class="swap-on size-10" strokeWidth= />
                  <Moon class="swap-off size-10" strokeWidth= />
                </label>
              </div>
              
              <span class="text-xs text-ink-muted">Day / night preview</span>
            </div>
          </div>`}
            jsx={`<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center gap-2">
              <div className="tooltip tooltip-primary tooltip-right" data-tip="Mute">
                <label className="swap cursor-pointer text-primary">
                  <input type="checkbox" aria-label="Mute volume" />
                  <VolumeX className="swap-on size-10" strokeWidth={2} />
                  <Volume2 className="swap-off size-10" strokeWidth={2} />
                </label>
              </div>
              
              <span className="text-xs text-ink-muted">Volume</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="tooltip tooltip-secondary" data-tip="Menu">
                <label className="btn btn-circle btn-secondary swap swap-rotate cursor-pointer">
                  <input type="checkbox" aria-label="Open or close menu" />
                  <Menu className="swap-off size-6" strokeWidth={2} />
                  <X className="swap-on size-6" strokeWidth={2} />
                </label>
              </div>
              
              <span className="text-xs text-ink-muted">Hamburger</span>
            </div>

            <div className="flex flex-col items-center gap-2 sm:col-span-2 lg:col-span-1">
              <div className="tooltip tooltip-accent" data-tip="Local day night">
                <label className="swap swap-rotate cursor-pointer text-accent">
                  <input type="checkbox" aria-label="Local day night preview" />
                  <Sun className="swap-on size-10" strokeWidth={2} />
                  <Moon className="swap-off size-10" strokeWidth={2} />
                </label>
              </div>
              
              <span className="text-xs text-ink-muted">Day / night preview</span>
            </div>
          </div>`}
          />
        </Section>

        <Section
          eyebrow="05 · Studio"
          title="Brush and layer eyes"
          description="Wet versus dry brush, and show versus hide layer visibility."
          panel="wash-panel-blue"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap items-end justify-center gap-10 md:justify-start">
                            <div className="flex flex-col items-center gap-2">
                              <label className="swap swap-flip cursor-pointer">
                                <input type="checkbox" defaultChecked aria-label="Wet or dry brush" />
                                <div className="swap-on flex flex-col items-center gap-1 text-info">
                                  <Droplets className="size-9" strokeWidth={2} />
                                  <span className="text-xs font-medium">Wet</span>
                                </div>
                                <div className="swap-off flex flex-col items-center gap-1 text-secondary">
                                  <Paintbrush className="size-9" strokeWidth={2} />
                                  <span className="text-xs font-medium">Dry</span>
                                </div>
                              </label>
                              <ClassLabel value="swap swap-flip (wet / dry)" />
                            </div>
                
                            <div className="flex flex-col items-center gap-2">
                              <div className="tooltip tooltip-success tooltip-right" data-tip="Layer eye">
                                <label className="swap cursor-pointer">
                                  <input type="checkbox" defaultChecked aria-label="Show or hide layer" />
                                  <Eye className="swap-on size-9 text-success" strokeWidth={2} />
                                  <EyeOff className="swap-off size-9 text-warning" strokeWidth={2} />
                                </label>
                              </div>
                              <ClassLabel value="swap (Eye / EyeOff)" />
                            </div>
                
                            <div className="flex flex-col items-center gap-2">
                              <label className="swap swap-rotate cursor-pointer">
                                <input type="checkbox" aria-label="Layer stack visibility" />
                                <div className="swap-on badge badge-success badge-lg gap-1">
                                  <Eye className="size-4" strokeWidth={2} />
                                  Shown
                                </div>
                                <div className="swap-off badge badge-ghost badge-lg gap-1">
                                  <EyeOff className="size-4" strokeWidth={2} />
                                  Hidden
                                </div>
                              </label>
                              <ClassLabel value="swap swap-rotate + badge" />
                            </div>
                          </div>
              </>
            }
            html={`<div class="flex flex-wrap items-end justify-center gap-10 md:justify-start">
            <div class="flex flex-col items-center gap-2">
              <label class="swap swap-flip cursor-pointer">
                <input type="checkbox" checked aria-label="Wet or dry brush" />
                <div class="swap-on flex flex-col items-center gap-1 text-info">
                  <Droplets class="size-9" strokeWidth= />
                  <span class="text-xs font-medium">Wet</span>
                </div>
                <div class="swap-off flex flex-col items-center gap-1 text-secondary">
                  <Paintbrush class="size-9" strokeWidth= />
                  <span class="text-xs font-medium">Dry</span>
                </div>
              </label>
              
            </div>

            <div class="flex flex-col items-center gap-2">
              <div class="tooltip tooltip-success tooltip-right" data-tip="Layer eye">
                <label class="swap cursor-pointer">
                  <input type="checkbox" checked aria-label="Show or hide layer" />
                  <Eye class="swap-on size-9 text-success" strokeWidth= />
                  <EyeOff class="swap-off size-9 text-warning" strokeWidth= />
                </label>
              </div>
              
            </div>

            <div class="flex flex-col items-center gap-2">
              <label class="swap swap-rotate cursor-pointer">
                <input type="checkbox" aria-label="Layer stack visibility" />
                <div class="swap-on badge badge-success badge-lg gap-1">
                  <Eye class="size-4" strokeWidth= />
                  Shown
                </div>
                <div class="swap-off badge badge-ghost badge-lg gap-1">
                  <EyeOff class="size-4" strokeWidth= />
                  Hidden
                </div>
              </label>
              
            </div>
          </div>`}
            jsx={`<div className="flex flex-wrap items-end justify-center gap-10 md:justify-start">
            <div className="flex flex-col items-center gap-2">
              <label className="swap swap-flip cursor-pointer">
                <input type="checkbox" defaultChecked aria-label="Wet or dry brush" />
                <div className="swap-on flex flex-col items-center gap-1 text-info">
                  <Droplets className="size-9" strokeWidth={2} />
                  <span className="text-xs font-medium">Wet</span>
                </div>
                <div className="swap-off flex flex-col items-center gap-1 text-secondary">
                  <Paintbrush className="size-9" strokeWidth={2} />
                  <span className="text-xs font-medium">Dry</span>
                </div>
              </label>
              
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="tooltip tooltip-success tooltip-right" data-tip="Layer eye">
                <label className="swap cursor-pointer">
                  <input type="checkbox" defaultChecked aria-label="Show or hide layer" />
                  <Eye className="swap-on size-9 text-success" strokeWidth={2} />
                  <EyeOff className="swap-off size-9 text-warning" strokeWidth={2} />
                </label>
              </div>
              
            </div>

            <div className="flex flex-col items-center gap-2">
              <label className="swap swap-rotate cursor-pointer">
                <input type="checkbox" aria-label="Layer stack visibility" />
                <div className="swap-on badge badge-success badge-lg gap-1">
                  <Eye className="size-4" strokeWidth={2} />
                  Shown
                </div>
                <div className="swap-off badge badge-ghost badge-lg gap-1">
                  <EyeOff className="size-4" strokeWidth={2} />
                  Hidden
                </div>
              </label>
              
            </div>
          </div>`}
          />
        </Section>

        <Section
          eyebrow="06 · Controlled"
          title="Interactive demos"
          description="React state drives checked and swap-active. Buttons flip state without breaking ThemeSwitcher."
        >
          <ShowcaseTabs
            preview={
              <>
                <ControlledStudioSwaps />
              </>
            }
            html={`<ControlledStudioSwaps />`}
            jsx={`<ControlledStudioSwaps />`}
          />
        </Section>

        <Section
          eyebrow="07 · Responsive"
          title="Stack to row"
          description="Swaps reflow from a vertical stack on narrow viewports to a horizontal row on larger screens."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-col items-center gap-6 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between md:gap-8">
                            <div className="flex flex-col items-center gap-2">
                              <label className="swap cursor-pointer">
                                <input type="checkbox" aria-label="Compact text swap" />
                                <span className="swap-on text-sm font-semibold text-primary">Open</span>
                                <span className="swap-off text-sm font-semibold text-ink-muted">
                                  Closed
                                </span>
                              </label>
                              <ClassLabel value="swap (sm text)" />
                            </div>
                
                            <div className="flex flex-col items-center gap-2">
                              <label className="swap swap-rotate cursor-pointer">
                                <input type="checkbox" aria-label="Responsive rotate swap" />
                                <Sun className="swap-on size-7 sm:size-9 md:size-10" strokeWidth={2} />
                                <Moon className="swap-off size-7 sm:size-9 md:size-10" strokeWidth={2} />
                              </label>
                              <ClassLabel value="swap swap-rotate (fluid size)" />
                            </div>
                
                            <div className="flex w-full flex-col items-center gap-2 sm:w-auto">
                              <label className="btn btn-outline btn-block swap cursor-pointer sm:btn-wide sm:w-auto">
                                <input type="checkbox" aria-label="Wide button swap" />
                                <span className="swap-on">Listening</span>
                                <span className="swap-off">Muted</span>
                              </label>
                              <ClassLabel value="btn swap (full width on mobile)" />
                            </div>
                          </div>
              </>
            }
            html={`<div class="flex flex-col items-center gap-6 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between md:gap-8">
            <div class="flex flex-col items-center gap-2">
              <label class="swap cursor-pointer">
                <input type="checkbox" aria-label="Compact text swap" />
                <span class="swap-on text-sm font-semibold text-primary">Open</span>
                <span class="swap-off text-sm font-semibold text-ink-muted">
                  Closed
                </span>
              </label>
              
            </div>

            <div class="flex flex-col items-center gap-2">
              <label class="swap swap-rotate cursor-pointer">
                <input type="checkbox" aria-label="Responsive rotate swap" />
                <Sun class="swap-on size-7 sm:size-9 md:size-10" strokeWidth= />
                <Moon class="swap-off size-7 sm:size-9 md:size-10" strokeWidth= />
              </label>
              
            </div>

            <div class="flex w-full flex-col items-center gap-2 sm:w-auto">
              <label class="btn btn-outline btn-block swap cursor-pointer sm:btn-wide sm:w-auto">
                <input type="checkbox" aria-label="Wide button swap" />
                <span class="swap-on">Listening</span>
                <span class="swap-off">Muted</span>
              </label>
              
            </div>
          </div>`}
            jsx={`<div className="flex flex-col items-center gap-6 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between md:gap-8">
            <div className="flex flex-col items-center gap-2">
              <label className="swap cursor-pointer">
                <input type="checkbox" aria-label="Compact text swap" />
                <span className="swap-on text-sm font-semibold text-primary">Open</span>
                <span className="swap-off text-sm font-semibold text-ink-muted">
                  Closed
                </span>
              </label>
              
            </div>

            <div className="flex flex-col items-center gap-2">
              <label className="swap swap-rotate cursor-pointer">
                <input type="checkbox" aria-label="Responsive rotate swap" />
                <Sun className="swap-on size-7 sm:size-9 md:size-10" strokeWidth={2} />
                <Moon className="swap-off size-7 sm:size-9 md:size-10" strokeWidth={2} />
              </label>
              
            </div>

            <div className="flex w-full flex-col items-center gap-2 sm:w-auto">
              <label className="btn btn-outline btn-block swap cursor-pointer sm:btn-wide sm:w-auto">
                <input type="checkbox" aria-label="Wide button swap" />
                <span className="swap-on">Listening</span>
                <span className="swap-off">Muted</span>
              </label>
              
            </div>
          </div>`}
          />
        </Section>
      </div>
    </>
  )
}
