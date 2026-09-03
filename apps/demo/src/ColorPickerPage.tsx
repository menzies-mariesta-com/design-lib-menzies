import { useState } from 'react'
import { ColorPickerWheel } from '@menzies-mariesta-com/menzies-design-wash-ui/react'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'

const defaultHex = '#276c8e'

const standaloneHtml = `<div class="inline-flex flex-col items-center gap-2">
  <div
    role="group"
    aria-label="Color picker"
    tabindex="0"
    class="relative size-[200px] touch-none select-none rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
  >
    <!-- Hue wheel + inner saturation/lightness canvas -->
  </div>
  <div class="flex w-full max-w-xs items-center gap-2">
    <span class="size-9 rounded-box border border-ink-border" style="background:#276c8e"></span>
    <input
      type="text"
      class="input input-bordered input-sm w-full font-mono cursor-text"
      value="#276c8e"
      aria-label="Hex color value"
    />
  </div>
</div>`

const standaloneJsx = `import { ColorPickerWheel } from '@menzies-mariesta-com/menzies-design-wash-ui/react'

export function StudioColorField() {
  const [hex, setHex] = useState('#276c8e')

  return (
    <ColorPickerWheel
      value={hex}
      onChange={setHex}
      size={200}
      showSwatch
      showHexInput
      aria-label="Studio pigment color"
    />
  )
}`

function CompactDemo() {
  const [hex, setHex] = useState('#b87524')

  return (
    <div className="flex flex-wrap items-end gap-4">
      <ColorPickerWheel
        value={hex}
        onChange={setHex}
        size={140}
        showSwatch={false}
        showHexInput={false}
        aria-label="Compact splash color"
      />
      <label className="form-control min-w-[8rem] flex-1 cursor-default" htmlFor="compact-hex">
        <span className="label py-1">
          <span className="label-text text-sm">Hex</span>
        </span>
        <input
          id="compact-hex"
          type="text"
          className="input input-bordered input-sm w-full font-mono cursor-text"
          value={hex}
          spellCheck={false}
          onChange={(event) => {
            const next = event.target.value
            if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(next.trim())) {
              setHex(next.trim())
            } else {
              setHex(next)
            }
          }}
        />
      </label>
      <span
        className="size-10 shrink-0 rounded-box border border-ink-border shadow-sm"
        style={{ backgroundColor: hex }}
        aria-hidden="true"
      />
    </div>
  )
}

function StandaloneDemo() {
  const [hex, setHex] = useState(defaultHex)

  return (
    <ColorPickerWheel
      value={hex}
      onChange={setHex}
      size={220}
      showSwatch
      showHexInput
      aria-label="Full color picker"
    />
  )
}

export default function ColorPickerPage() {
  const preview = (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-box border border-ink-border/70 bg-base-100/70 p-4">
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-ink-muted">
          Full picker
        </p>
        <StandaloneDemo />
      </div>
      <div className="rounded-box border border-ink-border/70 bg-base-100/70 p-4">
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-ink-muted">
          Compact (paint splash layout)
        </p>
        <CompactDemo />
      </div>
    </div>
  )

  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Color picker wheel
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted">
          Pick pigment with a canvas hue ring and saturation/lightness square. Sync
          hex values, keyboard nudge with arrows, and reuse the compact layout in
          the paint splash studio.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Control"
          title="Wash color wheel"
          description="No third-party picker dependency"
          panel="wash-panel-blue"
        >
          <ShowcaseTabs preview={preview} html={standaloneHtml} jsx={standaloneJsx} />
        </GallerySection>

        <GallerySection
          eyebrow="02 · API"
          title="Props"
          description="Controlled hex value with optional swatch and built-in hex field"
        >
          <div className="overflow-x-auto">
            <table className="table table-zebra [&_tbody_tr]:hover:bg-primary/40">
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code className="font-mono text-xs">value</code></td>
                  <td><code className="font-mono text-xs">string</code></td>
                  <td>required</td>
                  <td>Hex color, e.g. <code className="font-mono text-xs">#276c8e</code></td>
                </tr>
                <tr>
                  <td><code className="font-mono text-xs">onChange</code></td>
                  <td><code className="font-mono text-xs">(hex) =&gt; void</code></td>
                  <td>required</td>
                  <td>Fires on wheel, square, or hex edits</td>
                </tr>
                <tr>
                  <td><code className="font-mono text-xs">size</code></td>
                  <td><code className="font-mono text-xs">number</code></td>
                  <td>200</td>
                  <td>Wheel diameter in px</td>
                </tr>
                <tr>
                  <td><code className="font-mono text-xs">showHexInput</code></td>
                  <td><code className="font-mono text-xs">boolean</code></td>
                  <td>false</td>
                  <td>Built-in hex text field</td>
                </tr>
                <tr>
                  <td><code className="font-mono text-xs">showSwatch</code></td>
                  <td><code className="font-mono text-xs">boolean</code></td>
                  <td>true</td>
                  <td>Current color preview chip</td>
                </tr>
                <tr>
                  <td><code className="font-mono text-xs">disabled</code></td>
                  <td><code className="font-mono text-xs">boolean</code></td>
                  <td>false</td>
                  <td>Disables interaction</td>
                </tr>
              </tbody>
            </table>
          </div>
        </GallerySection>
      </div>
    </>
  )
}
