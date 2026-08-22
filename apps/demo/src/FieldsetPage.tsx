import type { ReactNode } from 'react'

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

function RequiredMark() {
  return (
    <span className="text-error align-top text-sm leading-none" aria-hidden="true">
      *
    </span>
  )
}

export default function FieldsetPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Fieldset
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">fieldset</span>,{' '}
          <span className="font-mono text-xs">fieldset-legend</span>, and{' '}
          <span className="font-mono text-xs">label</span> groupings for related
          form controls.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Legend and input"
          description="Minimal fieldset with legend, a single input, and a helper label."
        >
          <fieldset className="fieldset max-w-md">
            <legend className="fieldset-legend">Plate title</legend>
            <input
              type="text"
              className="input w-full cursor-text border-ink-border"
              placeholder="Coastal fog"
            />
            <p className="label">You can edit the title later from settings</p>
          </fieldset>
          <p className="mt-3">
            <ClassLabel value="fieldset + fieldset-legend + label" />
          </p>
        </Section>

        <Section
          eyebrow="02 · Background"
          title="Bordered wash panel"
          description="Background, border, and rounded-box utilities around the fieldset."
          panel="wash-panel-ochre"
        >
          <fieldset className="fieldset max-w-md rounded-box border border-base-300 bg-base-200 p-4">
            <legend className="fieldset-legend">Series name</legend>
            <input
              type="text"
              className="input w-full cursor-text"
              placeholder="Atlantic Studies"
            />
            <p className="label">Stored with the plate ledger</p>
          </fieldset>
          <p className="mt-3">
            <ClassLabel value="fieldset bg-base-200 border-base-300 rounded-box border p-4" />
          </p>
        </Section>

        <Section
          eyebrow="03 · Multiple fields"
          title="Name, tags, status"
          description="Several labeled controls in one fieldset with unique ids."
        >
          <fieldset className="fieldset max-w-lg rounded-box border border-ink-border bg-base-100/80 p-4">
            <legend className="fieldset-legend">Plate details</legend>

            <label className="label" htmlFor="fs-name">
              Name
            </label>
            <input
              id="fs-name"
              type="text"
              className="input w-full cursor-text border-ink-border"
              placeholder="Mist over harbor"
            />

            <label className="label" htmlFor="fs-tags">
              Tags
            </label>
            <input
              id="fs-tags"
              type="text"
              className="input w-full cursor-text border-ink-border"
              placeholder="coastal, fog, cool"
            />

            <label className="label" htmlFor="fs-status">
              Status
            </label>
            <select
              id="fs-status"
              className="select w-full cursor-pointer border-ink-border"
              defaultValue="draft"
            >
              <option value="draft">Draft</option>
              <option value="drying">Drying</option>
              <option value="varnished">Varnished</option>
              <option value="archived">Archived</option>
            </select>
          </fieldset>
          <p className="mt-3">
            <ClassLabel value="fieldset + label + input + select" />
          </p>
        </Section>

        <Section
          eyebrow="04 · Join"
          title="Joined input and action"
          description="Fieldset wrapping a join group for inline save."
          panel="wash-panel-rose"
        >
          <fieldset className="fieldset max-w-lg rounded-box border border-base-300 bg-base-200 p-4">
            <legend className="fieldset-legend">Quick rename</legend>
            <div className="join w-full">
              <input
                type="text"
                className="input join-item min-w-0 grow cursor-text"
                placeholder="Product name"
                aria-label="Product name"
              />
              <button type="button" className="btn join-item cursor-pointer">
                Save
              </button>
            </div>
          </fieldset>
          <p className="mt-3">
            <ClassLabel value="fieldset + join + input.join-item + btn.join-item" />
          </p>
        </Section>

        <Section
          eyebrow="05 · Disabled"
          title="Locked fieldset"
          description="Native disabled attribute greys out every control inside."
        >
          <fieldset
            className="fieldset max-w-md rounded-box border border-ink-border bg-base-100/80 p-4"
            disabled
          >
            <legend className="fieldset-legend">Archived plate</legend>
            <label className="label" htmlFor="fs-disabled-title">
              Title
            </label>
            <input
              id="fs-disabled-title"
              type="text"
              className="input w-full border-ink-border"
              defaultValue="WS-088 · Evening tide"
            />
            <label className="label" htmlFor="fs-disabled-notes">
              Notes
            </label>
            <input
              id="fs-disabled-notes"
              type="text"
              className="input w-full border-ink-border"
              defaultValue="Locked after archive"
            />
            <p className="label">Restore the plate to edit these fields</p>
          </fieldset>
          <p className="mt-3">
            <ClassLabel value='fieldset disabled' />
          </p>
        </Section>

        <Section
          eyebrow="06 · Studio form"
          title="Pigment wash settings"
          description="Create form with required asterisks and a primary title."
          panel="wash-panel-ochre"
        >
          <div className="mx-auto w-full max-w-xl">
            <div className="card bg-base-100/90 shadow-sm">
              <div className="card-body gap-4">
                <h2 className="card-title text-primary font-bold">Add wash recipe</h2>
                <fieldset className="fieldset rounded-box border border-ink-border p-4">
                  <legend className="fieldset-legend">Wash settings</legend>

                  <label className="label" htmlFor="fs-pigment">
                    Pigment
                    <RequiredMark />
                  </label>
                  <input
                    id="fs-pigment"
                    type="text"
                    className="input input-primary w-full cursor-text"
                    placeholder="Ultramarine"
                    required
                  />

                  <label className="label" htmlFor="fs-dilution">
                    Dilution
                    <RequiredMark />
                  </label>
                  <select
                    id="fs-dilution"
                    className="select select-primary w-full cursor-pointer"
                    defaultValue=""
                    required
                  >
                    <option disabled value="">
                      Pick dilution…
                    </option>
                    <option value="glaze">Glaze</option>
                    <option value="wash">Wash</option>
                    <option value="body">Body color</option>
                  </select>

                  <label className="label" htmlFor="fs-paper">
                    Paper weight
                  </label>
                  <input
                    id="fs-paper"
                    type="text"
                    className="input w-full cursor-text border-ink-border"
                    placeholder="300 gsm cold press"
                  />

                  <label className="label cursor-pointer justify-start gap-3">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary cursor-pointer"
                      defaultChecked
                    />
                    <span className="label-text">Allow wet-on-wet bloom</span>
                  </label>

                  <p className="label">Asterisk marks required fields</p>
                </fieldset>
                <div className="card-actions justify-end">
                  <button type="button" className="btn btn-ghost cursor-pointer">
                    Cancel
                  </button>
                  <button type="button" className="btn btn-primary cursor-pointer">
                    Save recipe
                  </button>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-3">
            <ClassLabel value="fieldset + required labels + card-title text-primary" />
          </p>
        </Section>

        <Section
          eyebrow="07 · Responsive"
          title="Side by side on desktop"
          description="Stacks on small screens; two columns from md up."
          panel="wash-panel-rose"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <fieldset className="fieldset rounded-box border border-base-300 bg-base-200 p-4">
              <legend className="fieldset-legend">Login</legend>
              <label className="label" htmlFor="fs-email">
                Email
                <RequiredMark />
              </label>
              <input
                id="fs-email"
                type="email"
                className="input w-full cursor-text"
                placeholder="studio@menzies.design"
                required
              />
              <label className="label" htmlFor="fs-password">
                Password
                <RequiredMark />
              </label>
              <input
                id="fs-password"
                type="password"
                className="input w-full cursor-text"
                placeholder="Passphrase"
                required
              />
              <button type="button" className="btn btn-neutral mt-4 cursor-pointer">
                Login
              </button>
            </fieldset>

            <fieldset className="fieldset rounded-box border border-ink-border bg-base-100/80 p-4">
              <legend className="fieldset-legend">Studio profile</legend>
              <label className="label" htmlFor="fs-display">
                Display name
              </label>
              <input
                id="fs-display"
                type="text"
                className="input w-full cursor-text border-ink-border"
                placeholder="M. Kline"
              />
              <label className="label" htmlFor="fs-locale">
                Locale
              </label>
              <select
                id="fs-locale"
                className="select w-full cursor-pointer border-ink-border"
                defaultValue="en"
              >
                <option value="en">English</option>
                <option value="ja">Japanese</option>
                <option value="fr">French</option>
              </select>
              <p className="label">Shown on shared plate sheets</p>
            </fieldset>
          </div>
          <p className="mt-3">
            <ClassLabel value="grid gap-4 md:grid-cols-2 + fieldset" />
          </p>
        </Section>
      </div>
    </>
  )
}
