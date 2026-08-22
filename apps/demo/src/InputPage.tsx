import { Eye, Lock, Mail, Search } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'

const colors = [
  { name: 'Default', className: '' },
  { name: 'Neutral', className: 'input-neutral' },
  { name: 'Primary', className: 'input-primary' },
  { name: 'Secondary', className: 'input-secondary' },
  { name: 'Accent', className: 'input-accent' },
  { name: 'Info', className: 'input-info' },
  { name: 'Success', className: 'input-success' },
  { name: 'Warning', className: 'input-warning' },
  { name: 'Error', className: 'input-error' },
] as const

const sizes = [
  { name: 'XS', className: 'input-xs' },
  { name: 'SM', className: 'input-sm' },
  { name: 'MD', className: 'input-md' },
  { name: 'LG', className: 'input-lg' },
  { name: 'XL', className: 'input-xl' },
] as const

const baseInputHtml = `<input
  type="text"
  placeholder="Plate title…"
  class="input w-full cursor-text border-ink-border"
/>`

const baseInputJsx = `<input
  type="text"
  placeholder="Plate title…"
  className="input w-full cursor-text border-ink-border"
/>`

const compositeInputHtml = `<label class="input w-full cursor-text border-ink-border">
  <svg><!-- Search --></svg>
  <input type="search" placeholder="Search washes…" class="cursor-text grow" />
</label>
<label class="input input-primary w-full cursor-text">
  <svg><!-- Mail --></svg>
  <input type="email" placeholder="studio@menzies.design" class="cursor-text grow" />
</label>
<label class="input w-full cursor-text border-ink-border">
  <svg><!-- Lock --></svg>
  <input type="password" placeholder="Passphrase" class="cursor-text grow" />
  <svg><!-- Eye --></svg>
</label>`

const compositeInputJsx = `<label className="input w-full cursor-text border-ink-border">
  <Search className="size-4 opacity-60" strokeWidth={2} />
  <input type="search" placeholder="Search washes…" className="cursor-text grow" />
</label>
<label className="input input-primary w-full cursor-text">
  <Mail className="size-4 opacity-60" strokeWidth={2} />
  <input type="email" placeholder="studio@menzies.design" className="cursor-text grow" />
</label>
<label className="input w-full cursor-text border-ink-border">
  <Lock className="size-4 opacity-60" strokeWidth={2} />
  <input type="password" placeholder="Passphrase" className="cursor-text grow" />
  <Eye className="size-4 opacity-60" strokeWidth={2} aria-hidden />
</label>`

const joinInputHtml = `<div class="join max-w-lg w-full">
  <label class="input join-item min-w-0 grow cursor-text">
    <svg><!-- Search --></svg>
    <input type="search" placeholder="Filter ledger…" class="min-w-0 grow cursor-text" />
  </label>
  <button type="button" class="btn btn-primary join-item cursor-pointer">Search</button>
</div>`

const joinInputJsx = `<div className="join max-w-lg w-full">
  <label className="input join-item min-w-0 grow cursor-text">
    <Search className="size-4 shrink-0 opacity-60" strokeWidth={2} />
    <input type="search" placeholder="Filter ledger…" className="min-w-0 grow cursor-text" />
  </label>
  <button type="button" className="btn btn-primary join-item cursor-pointer">
    Search
  </button>
</div>`

const ghostInputHtml = `<input
  type="text"
  placeholder="Ghost input…"
  class="input input-ghost w-full cursor-text"
/>`

const ghostInputJsx = `<input
  type="text"
  placeholder="Ghost input…"
  className="input input-ghost w-full cursor-text"
/>`

const semanticColorsHtml = `<input type="text" placeholder="Default" class="input w-full cursor-text" />
<input type="text" placeholder="Primary" class="input input-primary w-full cursor-text" />
<input type="text" placeholder="Secondary" class="input input-secondary w-full cursor-text" />
<input type="text" placeholder="Error" class="input input-error w-full cursor-text" />`

const semanticColorsJsx = `{colors.map((c) => (
  <input
    key={c.name}
    type="text"
    placeholder={c.name}
    className={\`input w-full cursor-text \${c.className}\`}
    aria-label={c.name}
  />
))}`

const inputSizesHtml = `<input type="text" placeholder="XS input" class="input input-primary input-xs w-full cursor-text" />
<input type="text" placeholder="SM input" class="input input-primary input-sm w-full cursor-text" />
<input type="text" placeholder="MD input" class="input input-primary input-md w-full cursor-text" />
<input type="text" placeholder="LG input" class="input input-primary input-lg w-full cursor-text" />
<input type="text" placeholder="XL input" class="input input-primary input-xl w-full cursor-text" />`

const inputSizesJsx = `{sizes.map((s) => (
  <input
    key={s.name}
    type="text"
    placeholder={\`\${s.name} input\`}
    className={\`input input-primary w-full cursor-text \${s.className}\`}
  />
))}`

const inputTypesHtml = `<input type="text" placeholder="Text" class="input w-full cursor-text border-ink-border" />
<input type="email" placeholder="you@studio.test" class="input w-full cursor-text border-ink-border" />
<input type="password" placeholder="Password" class="input w-full cursor-text border-ink-border" />
<input type="number" placeholder="42" class="input w-full cursor-text border-ink-border" />
<input type="search" placeholder="Search plates…" class="input w-full cursor-text border-ink-border" />
<input type="date" class="input w-full cursor-text border-ink-border" />`

const inputTypesJsx = `{[
  { type: 'text', placeholder: 'Text' },
  { type: 'email', placeholder: 'you@studio.test' },
  { type: 'password', placeholder: 'Password' },
  { type: 'number', placeholder: '42' },
  { type: 'search', placeholder: 'Search plates…' },
  { type: 'date', placeholder: '' },
].map((item) => (
  <input
    key={item.type}
    type={item.type}
    placeholder={item.placeholder || undefined}
    className="input w-full cursor-text border-ink-border"
  />
))}`

const inputStatesHtml = `<input type="text" placeholder="Disabled…" class="input w-full border-ink-border" disabled />
<input type="text" value="WS-214 · Coastal fog" class="input w-full cursor-default border-ink-border" readonly />`

const inputStatesJsx = `<input type="text" placeholder="Disabled…" className="input w-full border-ink-border" disabled />
<input
  type="text"
  className="input w-full cursor-default border-ink-border"
  defaultValue="WS-214 · Coastal fog"
  readOnly
/>`

const labeledFieldsHtml = `<fieldset class="fieldset max-w-lg rounded-box border border-ink-border bg-base-100/80 p-4">
  <legend class="fieldset-legend">New plate</legend>
  <label class="label" for="plate-name">
    <span class="label-text">Name<span class="text-error align-top text-sm leading-none" aria-hidden="true">*</span></span>
  </label>
  <input id="plate-name" type="text" class="input input-primary w-full cursor-text" placeholder="Coastal fog plate" required />
  <label class="label" for="plate-series">
    <span class="label-text">Series</span>
  </label>
  <input id="plate-series" type="text" class="input w-full cursor-text border-ink-border" placeholder="Atlantic Studies" />
</fieldset>`

const labeledFieldsJsx = `<fieldset className="fieldset max-w-lg rounded-box border border-ink-border bg-base-100/80 p-4">
  <legend className="fieldset-legend">New plate</legend>
  <label className="label" htmlFor="plate-name">
    <span className="label-text">
      Name
      <span className="text-error align-top text-sm leading-none" aria-hidden="true">*</span>
    </span>
  </label>
  <input
    id="plate-name"
    type="text"
    className="input input-primary w-full cursor-text"
    placeholder="Coastal fog plate"
    required
  />
  <label className="label" htmlFor="plate-series">
    <span className="label-text">Series</span>
  </label>
  <input
    id="plate-series"
    type="text"
    className="input w-full cursor-text border-ink-border"
    placeholder="Atlantic Studies"
  />
</fieldset>`

function ClassLabel({ value }: { value: string }) {
  return (
    <code className="font-mono text-[0.65rem] text-ink-muted">
      {value || 'input'}
    </code>
  )
}

export default function InputPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Input
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Every daisyUI <span className="font-mono text-xs">input</span> color,
          size, and composition, printed on watercolor paper.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Default"
          title="Base input"
          description="Simple text field with placeholder."
        >
          <ShowcaseTabs
            preview={
              <input
                type="text"
                placeholder="Plate title…"
                className="input w-full max-w-md cursor-text border-ink-border"
              />
            }
            html={baseInputHtml}
            jsx={baseInputJsx}
          />
        </GallerySection>

        <GallerySection
          eyebrow="02 · Ghost"
          title="Ghost style"
          description="Borderless field for quiet UI surfaces."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <div className="flex max-w-md flex-col gap-2">
                <input
                  type="text"
                  placeholder="Ghost input…"
                  className="input input-ghost w-full cursor-text"
                />
                <ClassLabel value="input input-ghost" />
              </div>
            }
            html={ghostInputHtml}
            jsx={ghostInputJsx}
          />
        </GallerySection>

        <GallerySection
          eyebrow="03 · Colors"
          title="Semantic colors"
          description="Neutral through error border accents."
        >
          <ShowcaseTabs
            preview={
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {colors.map((c) => (
                  <div key={c.name} className="flex flex-col gap-2">
                    <input
                      type="text"
                      placeholder={c.name}
                      className={`input w-full cursor-text ${c.className}`}
                      aria-label={c.name}
                    />
                    <ClassLabel
                      value={c.className ? `input ${c.className}` : 'input'}
                    />
                  </div>
                ))}
              </div>
            }
            html={semanticColorsHtml}
            jsx={semanticColorsJsx}
          />
        </GallerySection>

        <GallerySection
          eyebrow="04 · Sizes"
          title="Size scale"
          description="From compact fields to XL."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <div className="flex max-w-lg flex-col gap-4">
                {sizes.map((s) => (
                  <div key={s.name} className="flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                      <span className="label-ink w-8 shrink-0">{s.name}</span>
                      <input
                        type="text"
                        placeholder={`${s.name} input`}
                        className={`input input-primary w-full cursor-text ${s.className}`}
                      />
                    </div>
                    <ClassLabel value={`input ${s.className}`} />
                  </div>
                ))}
              </div>
            }
            html={inputSizesHtml}
            jsx={inputSizesJsx}
          />
        </GallerySection>

        <GallerySection
          eyebrow="05 · Types"
          title="HTML input types"
          description="Text, email, password, number, date, search, and more."
        >
          <ShowcaseTabs
            preview={
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { type: 'text', placeholder: 'Text', label: 'type="text"' },
                  { type: 'email', placeholder: 'you@studio.test', label: 'type="email"' },
                  { type: 'password', placeholder: 'Password', label: 'type="password"' },
                  { type: 'number', placeholder: '42', label: 'type="number"' },
                  { type: 'search', placeholder: 'Search plates…', label: 'type="search"' },
                  { type: 'url', placeholder: 'https://…', label: 'type="url"' },
                  { type: 'tel', placeholder: '+1 555…', label: 'type="tel"' },
                  { type: 'date', placeholder: '', label: 'type="date"' },
                  { type: 'time', placeholder: '', label: 'type="time"' },
                  { type: 'file', placeholder: '', label: 'type="file"' },
                ].map((item) => (
                  <div key={item.type} className="flex flex-col gap-2">
                    <input
                      type={item.type}
                      placeholder={item.placeholder || undefined}
                      className="input w-full cursor-text border-ink-border"
                    />
                    <ClassLabel value={item.label} />
                  </div>
                ))}
              </div>
            }
            html={inputTypesHtml}
            jsx={inputTypesJsx}
          />
        </GallerySection>

        <GallerySection
          eyebrow="06 · With icons"
          title="Composite input"
          description="Wrap children in an input container for icons and addons."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <div className="grid max-w-lg gap-4">
                <label className="input w-full cursor-text border-ink-border">
                  <Search className="size-4 opacity-60" strokeWidth={2} />
                  <input type="search" placeholder="Search washes…" className="cursor-text grow" />
                </label>
                <label className="input input-primary w-full cursor-text">
                  <Mail className="size-4 opacity-60" strokeWidth={2} />
                  <input type="email" placeholder="studio@menzies.design" className="cursor-text grow" />
                </label>
                <label className="input w-full cursor-text border-ink-border">
                  <Lock className="size-4 opacity-60" strokeWidth={2} />
                  <input type="password" placeholder="Passphrase" className="cursor-text grow" />
                  <Eye className="size-4 opacity-60" strokeWidth={2} aria-hidden />
                </label>
              </div>
            }
            html={compositeInputHtml}
            jsx={compositeInputJsx}
          />
        </GallerySection>

        <GallerySection
          eyebrow="07 · States"
          title="Disabled & readonly"
          description="Non-editable fields for locked plate metadata."
        >
          <ShowcaseTabs
            preview={
              <div className="grid max-w-lg gap-4">
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    placeholder="Disabled…"
                    className="input w-full border-ink-border"
                    disabled
                  />
                  <ClassLabel value="disabled" />
                </div>
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    className="input w-full cursor-default border-ink-border"
                    defaultValue="WS-214 · Coastal fog"
                    readOnly
                  />
                  <ClassLabel value="readOnly" />
                </div>
              </div>
            }
            html={inputStatesHtml}
            jsx={inputStatesJsx}
          />
        </GallerySection>

        <GallerySection
          eyebrow="08 · Form layout"
          title="Labeled fields"
          description="Fieldset with required-style labels on paper."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <fieldset className="fieldset max-w-lg rounded-box border border-ink-border bg-base-100/80 p-4">
                <legend className="fieldset-legend">New plate</legend>
                <label className="label" htmlFor="plate-name">
                  <span className="label-text">
                    Name
                    <span className="text-error align-top text-sm leading-none" aria-hidden="true">
                      *
                    </span>
                  </span>
                </label>
                <input
                  id="plate-name"
                  type="text"
                  className="input input-primary w-full cursor-text"
                  placeholder="Coastal fog plate"
                  required
                />
                <label className="label" htmlFor="plate-series">
                  <span className="label-text">Series</span>
                </label>
                <input
                  id="plate-series"
                  type="text"
                  className="input w-full cursor-text border-ink-border"
                  placeholder="Atlantic Studies"
                />
                <label className="label" htmlFor="plate-notes">
                  <span className="label-text">Notes</span>
                </label>
                <input
                  id="plate-notes"
                  type="text"
                  className="input input-ghost w-full cursor-text"
                  placeholder="Optional wash notes…"
                />
                <p className="label">Asterisk marks required fields</p>
              </fieldset>
            }
            html={labeledFieldsHtml}
            jsx={labeledFieldsJsx}
          />
        </GallerySection>

        <GallerySection
          eyebrow="09 · Join"
          title="Input + button"
          description="Joined search field and action."
        >
          <ShowcaseTabs
            preview={
              <div className="join max-w-lg w-full">
                <label className="input join-item min-w-0 grow cursor-text">
                  <Search className="size-4 shrink-0 opacity-60" strokeWidth={2} />
                  <input
                    type="search"
                    placeholder="Filter ledger…"
                    className="min-w-0 grow cursor-text"
                  />
                </label>
                <button type="button" className="btn btn-primary join-item cursor-pointer">
                  Search
                </button>
              </div>
            }
            html={joinInputHtml}
            jsx={joinInputJsx}
          />
        </GallerySection>
      </div>
    </>
  )
}
