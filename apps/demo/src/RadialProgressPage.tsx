import { useState, type CSSProperties, type ReactNode } from 'react'
import { Droplets, RotateCcw } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'

const basicValues = [0, 20, 60, 70, 80, 100] as const

const sizes = [
  { name: '3rem', size: '3rem', text: 'text-xs' },
  { name: '4rem', size: '4rem', text: 'text-sm' },
  { name: '5rem', size: '5rem', text: 'text-base' },
  { name: '7rem', size: '7rem', text: 'text-xl' },
  { name: '9rem', size: '9rem', text: 'text-2xl' },
] as const

const colors = [
  { name: 'Primary', className: 'text-primary' },
  { name: 'Secondary', className: 'text-secondary' },
  { name: 'Accent', className: 'text-accent' },
  { name: 'Neutral', className: 'text-neutral' },
  { name: 'Info', className: 'text-info' },
  { name: 'Success', className: 'text-success' },
  { name: 'Warning', className: 'text-warning' },
  { name: 'Error', className: 'text-error' },
] as const

const thicknesses = [
  { name: '2px', thickness: '2px', size: '6rem' },
  { name: '4px', thickness: '4px', size: '6rem' },
  { name: '8px', thickness: '8px', size: '6rem' },
  { name: '1rem', thickness: '1rem', size: '6rem' },
  { name: '2rem', thickness: '2rem', size: '8rem' },
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
    <code className="font-mono text-[0.65rem] text-ink-muted">{value}</code>
  )
}

function Sample({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      {children}
      <ClassLabel value={label} />
    </div>
  )
}

function Radial({
  value,
  className = '',
  size,
  thickness,
  children,
}: {
  value: number
  className?: string
  size?: string
  thickness?: string
  children?: ReactNode
}) {
  const style = {
    '--value': value,
    ...(size ? { '--size': size } : {}),
    ...(thickness ? { '--thickness': thickness } : {}),
  } as CSSProperties

  return (
    <div
      className={`radial-progress ${className}`.trim()}
      style={style}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {children ?? `${value}%`}
    </div>
  )
}

function InteractiveDemo() {
  const [value, setValue] = useState(62)

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex flex-col items-center gap-2">
        <Radial
          value={value}
          className="text-primary"
          size="8rem"
          thickness="10px"
        >
          <span className="font-display text-2xl font-semibold">{value}%</span>
        </Radial>
        <ClassLabel value="--value (live)" />
      </div>

      <label className="flex w-full max-w-sm flex-col gap-2">
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-medium">Wash progress</span>
          <span className="font-mono text-xs text-ink-muted">{value}%</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="range range-primary range-sm cursor-pointer"
          aria-label="Radial progress value"
        />
        <div className="flex justify-between px-0.5 text-[0.65rem] text-ink-muted">
          <span>0</span>
          <span>50</span>
          <span>100</span>
        </div>
      </label>
    </div>
  )
}

function StudioMeters() {
  const [pigment, setPigment] = useState(78)
  const [water, setWater] = useState(42)
  const [flow, setFlow] = useState(65)
  const load = Math.round(pigment * 0.45 + water * 0.3 + flow * 0.25)

  function reset() {
    setPigment(78)
    setWater(42)
    setFlow(65)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        <Sample label="text-primary · pigment">
          <Radial
            value={pigment}
            className="text-primary"
            size="5.5rem"
            thickness="6px"
          />
          <p className="label-ink">Pigment</p>
        </Sample>
        <Sample label="text-secondary · water">
          <Radial
            value={water}
            className="text-secondary"
            size="5.5rem"
            thickness="6px"
          />
          <p className="label-ink">Water</p>
        </Sample>
        <Sample label="text-info · flow">
          <Radial
            value={flow}
            className="text-info"
            size="5.5rem"
            thickness="6px"
          />
          <p className="label-ink">Flow</p>
        </Sample>
        <Sample label="text-accent · load">
          <Radial
            value={load}
            className="text-accent"
            size="5.5rem"
            thickness="6px"
          />
          <p className="label-ink">Load</p>
        </Sample>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-medium">Pigment</span>
            <span className="font-mono text-xs text-ink-muted">{pigment}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={pigment}
            onChange={(e) => setPigment(Number(e.target.value))}
            className="range range-primary range-sm cursor-pointer"
            aria-label="Pigment load"
          />
        </label>
        <label className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-medium">Water</span>
            <span className="font-mono text-xs text-ink-muted">{water}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={water}
            onChange={(e) => setWater(Number(e.target.value))}
            className="range range-secondary range-sm cursor-pointer"
            aria-label="Water load"
          />
        </label>
        <label className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-medium">Flow</span>
            <span className="font-mono text-xs text-ink-muted">{flow}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={flow}
            onChange={(e) => setFlow(Number(e.target.value))}
            className="range range-info range-sm cursor-pointer"
            aria-label="Flow rate"
          />
        </label>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-box border border-ink-border/70 bg-base-100/60 p-4">
        <div className="flex items-start gap-2">
          <Droplets className="mt-0.5 size-4 shrink-0 text-info" strokeWidth={1.75} />
          <div>
            <p className="text-sm font-medium">Desk read</p>
            <p className="mt-1 text-sm text-ink-muted">
              Combined load is a weighted mix of pigment, water, and flow. Keep
              water below pigment for sharper edges.
            </p>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-ghost btn-sm cursor-pointer gap-2"
          onClick={reset}
        >
          <RotateCcw className="size-4" strokeWidth={2} />
          Reset meters
        </button>
      </div>
    </div>
  )
}

export default function RadialProgressPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Radial progress
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">radial-progress</span>{' '}
          rings for circular task and wash meters. Drive with{' '}
          <span className="font-mono text-xs">--value</span>, size with{' '}
          <span className="font-mono text-xs">--size</span>, and weight with{' '}
          <span className="font-mono text-xs">--thickness</span>.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Values and a11y"
          description="Set --value and expose role plus aria-valuenow for screen readers."
        >
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {basicValues.map((v) => (
              <Sample key={v} label={`--value:${v}`}>
                <Radial value={v} className="text-primary" />
              </Sample>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="02 · Sizes"
          title="Width and type"
          description="--size defaults to 5rem. Pair with text utilities for readable centers."
          panel="wash-panel-ochre"
        >
          <div className="flex flex-wrap items-end justify-center gap-6 sm:justify-start">
            {sizes.map((s) => (
              <Sample key={s.name} label={`--size:${s.size} ${s.text}`}>
                <Radial
                  value={70}
                  className={`text-secondary ${s.text}`}
                  size={s.size}
                />
              </Sample>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="03 · Colors"
          title="Semantic and filled"
          description="Color via text-* utilities. Optional bg and border fill the center."
        >
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {colors.map((c) => (
              <Sample key={c.name} label={`radial-progress ${c.className}`}>
                <Radial value={72} className={c.className} />
              </Sample>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <Sample label="bg-primary text-primary-content border-4">
              <Radial
                value={70}
                className="border-4 border-primary bg-primary text-primary-content"
              />
            </Sample>
            <Sample label="bg-secondary text-secondary-content border-4">
              <Radial
                value={55}
                className="border-4 border-secondary bg-secondary text-secondary-content"
              />
            </Sample>
            <Sample label="bg-accent text-accent-content border-4">
              <Radial
                value={88}
                className="border-4 border-accent bg-accent text-accent-content"
              />
            </Sample>
          </div>
        </Section>

        <Section
          eyebrow="04 · Thickness"
          title="Ring weight"
          description="--thickness defaults to 10% of size. Thin hairlines or bold bands."
          panel="wash-panel-rose"
        >
          <div className="flex flex-wrap items-end justify-center gap-6 sm:justify-start">
            {thicknesses.map((t) => (
              <Sample
                key={t.name}
                label={`--thickness:${t.thickness} --size:${t.size}`}
              >
                <Radial
                  value={70}
                  className="text-primary"
                  size={t.size}
                  thickness={t.thickness}
                />
              </Sample>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="05 · Interactive"
          title="Live value"
          description="A range input drives --value so the ring and label stay in sync."
        >
          <InteractiveDemo />
        </Section>

        <Section
          eyebrow="06 · Studio"
          title="Pigment meters"
          description="Wash desk readouts for pigment, water, flow, and combined load."
          panel="wash-panel-ochre"
        >
          <StudioMeters />
        </Section>
      </div>
    </>
  )
}
