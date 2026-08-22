import { useState, type ReactNode } from 'react'
import { Droplets, Palette, Star } from 'menzies-design-wash-ui/icons'

const sizes = [
  { name: 'XS', className: 'rating-xs' },
  { name: 'SM', className: 'rating-sm' },
  { name: 'MD', className: 'rating-md' },
  { name: 'LG', className: 'rating-lg' },
  { name: 'XL', className: 'rating-xl' },
] as const

const colors = [
  { name: 'Primary', bg: 'bg-primary' },
  { name: 'Secondary', bg: 'bg-secondary' },
  { name: 'Accent', bg: 'bg-accent' },
  { name: 'Neutral', bg: 'bg-neutral' },
  { name: 'Success', bg: 'bg-success' },
  { name: 'Warning', bg: 'bg-warning' },
  { name: 'Info', bg: 'bg-info' },
  { name: 'Error', bg: 'bg-error' },
] as const

const halfSteps = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5] as const

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

function StarRadios({
  name,
  value,
  onChange,
  maskClass = 'mask-star',
  bgClass = 'bg-primary',
  sizeClass = '',
  withClear = false,
}: {
  name: string
  value: number
  onChange: (next: number) => void
  maskClass?: string
  bgClass?: string
  sizeClass?: string
  withClear?: boolean
}) {
  return (
    <div className={`rating ${sizeClass}`.trim()}>
      {withClear ? (
        <input
          type="radio"
          name={name}
          className="rating-hidden cursor-pointer"
          aria-label="Clear rating"
          checked={value === 0}
          onChange={() => onChange(0)}
        />
      ) : null}
      {[1, 2, 3, 4, 5].map((n) => (
        <input
          key={n}
          type="radio"
          name={name}
          className={`mask ${maskClass} cursor-pointer ${bgClass}`}
          aria-label={`${n} star`}
          checked={value === n}
          onChange={() => onChange(n)}
        />
      ))}
    </div>
  )
}

function HalfStarRadios({
  name,
  value,
  onChange,
  bgClass = 'bg-success',
  sizeClass = 'rating-lg',
}: {
  name: string
  value: number
  onChange: (next: number) => void
  bgClass?: string
  sizeClass?: string
}) {
  return (
    <div className={`rating rating-half ${sizeClass}`.trim()}>
      <input
        type="radio"
        name={name}
        className="rating-hidden cursor-pointer"
        aria-label="Clear rating"
        checked={value === 0}
        onChange={() => onChange(0)}
      />
      {halfSteps.map((step, i) => {
        const isFirstHalf = i % 2 === 0
        return (
          <input
            key={step}
            type="radio"
            name={name}
            className={`mask mask-star-2 cursor-pointer ${isFirstHalf ? 'mask-half-1' : 'mask-half-2'} ${bgClass}`}
            aria-label={`${step} star`}
            checked={value === step}
            onChange={() => onChange(step)}
          />
        )
      })}
    </div>
  )
}

function ReadOnlyStars({
  value,
  sizeClass = '',
  bgClass = 'bg-primary',
}: {
  value: number
  sizeClass?: string
  bgClass?: string
}) {
  return (
    <div className={`rating ${sizeClass}`.trim()} aria-label={`${value} of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <div
          key={n}
          className={`mask mask-star ${bgClass}`}
          aria-label={`${n} star`}
          aria-current={n === value ? 'true' : undefined}
        />
      ))}
    </div>
  )
}

export default function RatingPage() {
  const [basicValue, setBasicValue] = useState(3)
  const [liveValue, setLiveValue] = useState(4)
  const [halfValue, setHalfValue] = useState(3.5)
  const [clearableValue, setClearableValue] = useState(2)
  const [critique, setCritique] = useState(4)
  const [pigment, setPigment] = useState(3.5)
  const [paper, setPaper] = useState(5)

  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Rating
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">rating</span> star sets
          for critique scores, pigment quality, and desk feedback. Use unique{' '}
          <span className="font-mono text-xs">name</span> attributes per group.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Default stars"
          description="Radio inputs with mask-star for a five-point score."
        >
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="label-ink mb-2">Plate score</p>
              <StarRadios
                name="rating-basic"
                value={basicValue}
                onChange={setBasicValue}
                maskClass="mask-star"
                bgClass="bg-primary"
              />
              <p className="mt-2">
                <ClassLabel value="rating + mask mask-star" />
              </p>
            </div>
            <span className="badge badge-primary badge-outline font-mono">
              {basicValue} / 5
            </span>
          </div>
        </Section>

        <Section
          eyebrow="02 · Sizes"
          title="Size scale"
          description="Extra small through extra large star tracks."
          panel="wash-panel-ochre"
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sizes.map((s) => (
              <div key={s.name} className="min-w-0">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <span className="label-ink">{s.name}</span>
                  <ClassLabel value={`rating ${s.className}`} />
                </div>
                <div className={`rating ${s.className}`}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <input
                      key={n}
                      type="radio"
                      name={`rating-size-${s.name}`}
                      className="mask mask-star-2 cursor-pointer bg-warning"
                      aria-label={`${n} star ${s.name}`}
                      defaultChecked={n === 2}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="03 · Colors"
          title="Semantic fills"
          description="Theme-aware bg colors on mask-star-2, plus heart masks."
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {colors.map((c) => (
              <div key={c.name} className="min-w-0">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <span className="label-ink">{c.name}</span>
                  <ClassLabel value={`mask-star-2 ${c.bg}`} />
                </div>
                <div className="rating">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <input
                      key={n}
                      type="radio"
                      name={`rating-color-${c.name}`}
                      className={`mask mask-star-2 cursor-pointer ${c.bg}`}
                      aria-label={`${n} star ${c.name}`}
                      defaultChecked={n === 3}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-ink-border/60 pt-5">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <span className="label-ink">Hearts</span>
              <ClassLabel value="rating gap-1 + mask-heart" />
            </div>
            <div className="rating gap-1">
              <input
                type="radio"
                name="rating-hearts"
                className="mask mask-heart cursor-pointer bg-error"
                aria-label="1 heart"
              />
              <input
                type="radio"
                name="rating-hearts"
                className="mask mask-heart cursor-pointer bg-warning"
                aria-label="2 heart"
                defaultChecked
              />
              <input
                type="radio"
                name="rating-hearts"
                className="mask mask-heart cursor-pointer bg-warning"
                aria-label="3 heart"
              />
              <input
                type="radio"
                name="rating-hearts"
                className="mask mask-heart cursor-pointer bg-success"
                aria-label="4 heart"
              />
              <input
                type="radio"
                name="rating-hearts"
                className="mask mask-heart cursor-pointer bg-success"
                aria-label="5 heart"
              />
            </div>
          </div>
        </Section>

        <Section
          eyebrow="04 · Half stars"
          title="Half-step scores"
          description="rating-half with mask-half-1 and mask-half-2 on mask-star-2."
          panel="wash-panel-rose"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0 overflow-x-auto">
              <p className="label-ink mb-2">Wash depth</p>
              <HalfStarRadios
                name="rating-half"
                value={halfValue}
                onChange={setHalfValue}
                bgClass="bg-success"
                sizeClass="rating-lg"
              />
              <p className="mt-2">
                <ClassLabel value="rating rating-lg rating-half" />
              </p>
            </div>
            <span className="badge badge-success badge-outline shrink-0 font-mono">
              {halfValue.toFixed(1)} / 5
            </span>
          </div>
        </Section>

        <Section
          eyebrow="05 · Interactive"
          title="Controlled value"
          description="React state drives the stars and a live badge readout."
        >
          <div className="mx-auto grid w-full max-w-xl gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="label-ink">Series rating</span>
                <span className="badge badge-secondary badge-outline font-mono">
                  {liveValue} / 5
                </span>
              </div>
              <StarRadios
                name="rating-live"
                value={liveValue}
                onChange={setLiveValue}
                maskClass="mask-star-2"
                bgClass="bg-secondary"
                sizeClass="rating-lg"
              />
              <progress
                className="progress progress-secondary mt-4 h-2 w-full"
                value={liveValue}
                max={5}
                aria-label="Series rating progress"
              />
              <p className="mt-2">
                <ClassLabel value="rating rating-lg (controlled)" />
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-box border border-ink-border/60 bg-base-200/30 px-5 py-4">
              <Star className="size-8 text-secondary" strokeWidth={1.75} />
              <p className="font-display text-2xl font-semibold tabular-nums">
                {liveValue}
              </p>
              <p className="text-xs text-ink-muted">of 5</p>
            </div>
          </div>
        </Section>

        <Section
          eyebrow="06 · Studio"
          title="Critique desk"
          description="Plate critique, pigment quality, and paper feel in one wash panel."
          panel="wash-panel-ochre"
        >
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <Palette className="size-4 text-primary" strokeWidth={1.75} />
            <p className="text-sm font-medium">Active plate review</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-5">
              <div>
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="label-ink">Critique score</span>
                  <span className="font-mono text-xs text-ink-muted">
                    {critique} / 5
                  </span>
                </div>
                <StarRadios
                  name="rating-critique"
                  value={critique}
                  onChange={setCritique}
                  maskClass="mask-star"
                  bgClass="bg-primary"
                  sizeClass="rating-md"
                />
                <ClassLabel value="rating rating-md + mask-star" />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="label-ink">Pigment quality</span>
                  <span className="font-mono text-xs text-ink-muted">
                    {pigment.toFixed(1)} / 5
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <HalfStarRadios
                    name="rating-pigment"
                    value={pigment}
                    onChange={setPigment}
                    bgClass="bg-accent"
                    sizeClass="rating-md"
                  />
                </div>
                <ClassLabel value="rating rating-md rating-half" />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="label-ink">Paper feel</span>
                  <span className="font-mono text-xs text-ink-muted">
                    {paper} / 5
                  </span>
                </div>
                <StarRadios
                  name="rating-paper"
                  value={paper}
                  onChange={setPaper}
                  maskClass="mask-star-2"
                  bgClass="bg-info"
                  sizeClass="rating-sm"
                />
                <ClassLabel value="rating rating-sm + mask-star-2" />
              </div>
            </div>

            <div className="flex flex-col justify-between gap-4 rounded-box border border-ink-border/70 bg-base-100/60 p-4">
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <Droplets className="size-4 text-info" strokeWidth={1.75} />
                  <p className="text-sm font-medium">Review summary</p>
                </div>
                <ul className="space-y-1.5 text-sm text-ink-muted">
                  <li>
                    Critique:{' '}
                    <span className="text-base-content">{critique} / 5</span>
                  </li>
                  <li>
                    Pigment:{' '}
                    <span className="text-base-content">
                      {pigment.toFixed(1)} / 5
                    </span>
                  </li>
                  <li>
                    Paper:{' '}
                    <span className="text-base-content">{paper} / 5</span>
                  </li>
                </ul>
              </div>
              <div>
                <p className="label-ink mb-2">Average</p>
                <p className="font-display text-3xl font-semibold tabular-nums">
                  {((critique + pigment + paper) / 3).toFixed(1)}
                </p>
              </div>
            </div>
          </div>
        </Section>

        <Section
          eyebrow="07 · Read-only and clear"
          title="Display and reset"
          description="Div-based read-only stars, plus rating-hidden to clear a choice."
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="label-ink mb-2">Published score</p>
              <ReadOnlyStars value={4} sizeClass="rating-md" bgClass="bg-warning" />
              <p className="mt-2">
                <ClassLabel value="rating (div + aria-current)" />
              </p>
              <p className="mt-3 text-sm text-ink-muted">
                Non-interactive display for locked critique results.
              </p>
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className="label-ink">Clearable rating</span>
                <span className="font-mono text-xs text-ink-muted">
                  {clearableValue === 0 ? 'cleared' : `${clearableValue} / 5`}
                </span>
              </div>
              <StarRadios
                name="rating-clearable"
                value={clearableValue}
                onChange={setClearableValue}
                maskClass="mask-star-2"
                bgClass="bg-primary"
                sizeClass="rating-lg"
                withClear
              />
              <p className="mt-2">
                <ClassLabel value="rating rating-lg + rating-hidden" />
              </p>
              <p className="mt-3 text-sm text-ink-muted">
                First radio uses rating-hidden so the score can be cleared.
              </p>
            </div>
          </div>
        </Section>

        <Section
          eyebrow="08 · Responsive"
          title="Narrow and wide"
          description="Stacks on small screens; side-by-side score cards from md up."
          panel="wash-panel-rose"
        >
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {[
              { label: 'Morning wash', value: 5, bg: 'bg-primary' },
              { label: 'Edge control', value: 3, bg: 'bg-secondary' },
              { label: 'Granulation', value: 4, bg: 'bg-accent' },
            ].map((card) => (
              <div
                key={card.label}
                className="rounded-box border border-ink-border/60 bg-base-100/50 p-4"
              >
                <p className="label-ink mb-3">{card.label}</p>
                <ReadOnlyStars
                  value={card.value}
                  sizeClass="rating-md"
                  bgClass={card.bg}
                />
                <p className="mt-3 font-mono text-xs text-ink-muted">
                  {card.value} / 5
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4">
            <ClassLabel value="grid sm:grid-cols-2 xl:grid-cols-3" />
          </p>
        </Section>
      </div>
    </>
  )
}
