import type { ReactNode } from 'react'
import { AtSign, Eye, Lock, Mail, Search } from 'menzies-design-wash-ui/icons'

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
        <Section
          eyebrow="01 · Default"
          title="Base input"
          description="Simple text field with placeholder."
        >
          <div className="flex max-w-md flex-col gap-2">
            <input
              type="text"
              placeholder="Plate title…"
              className="input w-full cursor-text border-ink-border"
            />
            <ClassLabel value="input" />
          </div>
        </Section>

        <Section
          eyebrow="02 · Ghost"
          title="Ghost style"
          description="Borderless field for quiet UI surfaces."
          panel="wash-panel-ochre"
        >
          <div className="flex max-w-md flex-col gap-2">
            <input
              type="text"
              placeholder="Ghost input…"
              className="input input-ghost w-full cursor-text"
            />
            <ClassLabel value="input input-ghost" />
          </div>
        </Section>

        <Section
          eyebrow="03 · Colors"
          title="Semantic colors"
          description="Neutral through error border accents."
        >
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
        </Section>

        <Section
          eyebrow="04 · Sizes"
          title="Size scale"
          description="From compact fields to XL."
          panel="wash-panel-rose"
        >
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
        </Section>

        <Section
          eyebrow="05 · Types"
          title="HTML input types"
          description="Text, email, password, number, date, search, and more."
        >
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
        </Section>

        <Section
          eyebrow="06 · With icons"
          title="Composite input"
          description="Wrap children in an input container for icons and addons."
          panel="wash-panel-ochre"
        >
          <div className="grid max-w-lg gap-4">
            <div className="flex flex-col gap-2">
              <label className="input w-full cursor-text border-ink-border">
                <Search className="size-4 opacity-60" strokeWidth={2} />
                <input type="search" placeholder="Search washes…" className="cursor-text grow" />
              </label>
              <ClassLabel value="input + icon child" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="input input-primary w-full cursor-text">
                <Mail className="size-4 opacity-60" strokeWidth={2} />
                <input type="email" placeholder="studio@menzies.design" className="cursor-text grow" />
              </label>
              <ClassLabel value="input input-primary + icon" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="input w-full cursor-text border-ink-border">
                <Lock className="size-4 opacity-60" strokeWidth={2} />
                <input type="password" placeholder="Passphrase" className="cursor-text grow" />
                <Eye className="size-4 opacity-60" strokeWidth={2} aria-hidden />
              </label>
              <ClassLabel value="input + leading & trailing icons" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="input w-full cursor-text border-ink-border">
                <AtSign className="size-4 opacity-60" strokeWidth={2} />
                <span className="label-text text-ink-muted">@</span>
                <input type="text" placeholder="handle" className="cursor-text grow" />
              </label>
              <ClassLabel value="input + text addon" />
            </div>
          </div>
        </Section>

        <Section
          eyebrow="07 · States"
          title="Disabled & readonly"
          description="Non-editable fields for locked plate metadata."
        >
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
        </Section>

        <Section
          eyebrow="08 · Form layout"
          title="Labeled fields"
          description="Fieldset with required-style labels on paper."
          panel="wash-panel-rose"
        >
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
        </Section>

        <Section
          eyebrow="09 · Join"
          title="Input + button"
          description="Joined search field and action."
        >
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
          <p className="mt-3">
            <ClassLabel value="join + input.join-item + btn.join-item" />
          </p>
        </Section>
      </div>
    </>
  )
}
