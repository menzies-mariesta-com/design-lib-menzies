import { useState, type ReactNode } from 'react'
import { Droplets, Palette, Star } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import { ShowcaseTabs } from './components/ShowcaseTabs'
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
    <article className={`wash-panel wash-panel-flush paper-grain soak-in ${panel}`}>
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

const basicHtml = `<div class="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
  <div>
    <p class="label-ink mb-2">Plate score</p>
<div class="rating">
  <input type="radio" name="rating-basic" class="mask mask-star cursor-pointer bg-primary" aria-label="1 star" />
  <input type="radio" name="rating-basic" class="mask mask-star cursor-pointer bg-primary" aria-label="2 star" />
  <input type="radio" name="rating-basic" class="mask mask-star cursor-pointer bg-primary" aria-label="3 star" checked />
  <input type="radio" name="rating-basic" class="mask mask-star cursor-pointer bg-primary" aria-label="4 star" />
  <input type="radio" name="rating-basic" class="mask mask-star cursor-pointer bg-primary" aria-label="5 star" />
</div>
  </div>
  <span class="badge badge-primary badge-outline font-mono">3 / 5</span>
</div>`

const basicJsx = `<div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
  <div>
    <p className="label-ink mb-2">Plate score</p>
<div className="rating">
  <input type="radio" name="rating-basic" className="mask mask-star cursor-pointer bg-primary" aria-label="1 star" />
  <input type="radio" name="rating-basic" className="mask mask-star cursor-pointer bg-primary" aria-label="2 star" />
  <input type="radio" name="rating-basic" className="mask mask-star cursor-pointer bg-primary" aria-label="3 star" defaultChecked />
  <input type="radio" name="rating-basic" className="mask mask-star cursor-pointer bg-primary" aria-label="4 star" />
  <input type="radio" name="rating-basic" className="mask mask-star cursor-pointer bg-primary" aria-label="5 star" />
</div>
  </div>
  <span className="badge badge-primary badge-outline font-mono">3 / 5</span>
</div>`

const sizesHtml = `<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
  <div class="min-w-0">
    <div class="mb-2 flex flex-wrap items-center justify-between gap-2">
      <span class="label-ink">XS</span>
    </div>
    <div class="rating rating-xs">
      <input type="radio" name="rating-size-XS" class="mask mask-star-2 cursor-pointer bg-warning" aria-label="1 star XS" />
      <input type="radio" name="rating-size-XS" class="mask mask-star-2 cursor-pointer bg-warning" aria-label="2 star XS" checked />
      <input type="radio" name="rating-size-XS" class="mask mask-star-2 cursor-pointer bg-warning" aria-label="3 star XS" />
      <input type="radio" name="rating-size-XS" class="mask mask-star-2 cursor-pointer bg-warning" aria-label="4 star XS" />
      <input type="radio" name="rating-size-XS" class="mask mask-star-2 cursor-pointer bg-warning" aria-label="5 star XS" />
    </div>
  </div>
  <div class="min-w-0">
    <div class="mb-2 flex flex-wrap items-center justify-between gap-2">
      <span class="label-ink">SM</span>
    </div>
    <div class="rating rating-sm">
      <input type="radio" name="rating-size-SM" class="mask mask-star-2 cursor-pointer bg-warning" aria-label="1 star SM" />
      <input type="radio" name="rating-size-SM" class="mask mask-star-2 cursor-pointer bg-warning" aria-label="2 star SM" checked />
      <input type="radio" name="rating-size-SM" class="mask mask-star-2 cursor-pointer bg-warning" aria-label="3 star SM" />
      <input type="radio" name="rating-size-SM" class="mask mask-star-2 cursor-pointer bg-warning" aria-label="4 star SM" />
      <input type="radio" name="rating-size-SM" class="mask mask-star-2 cursor-pointer bg-warning" aria-label="5 star SM" />
    </div>
  </div>
  <div class="min-w-0">
    <div class="mb-2 flex flex-wrap items-center justify-between gap-2">
      <span class="label-ink">MD</span>
    </div>
    <div class="rating rating-md">
      <input type="radio" name="rating-size-MD" class="mask mask-star-2 cursor-pointer bg-warning" aria-label="1 star MD" />
      <input type="radio" name="rating-size-MD" class="mask mask-star-2 cursor-pointer bg-warning" aria-label="2 star MD" checked />
      <input type="radio" name="rating-size-MD" class="mask mask-star-2 cursor-pointer bg-warning" aria-label="3 star MD" />
      <input type="radio" name="rating-size-MD" class="mask mask-star-2 cursor-pointer bg-warning" aria-label="4 star MD" />
      <input type="radio" name="rating-size-MD" class="mask mask-star-2 cursor-pointer bg-warning" aria-label="5 star MD" />
    </div>
  </div>
  <div class="min-w-0">
    <div class="mb-2 flex flex-wrap items-center justify-between gap-2">
      <span class="label-ink">LG</span>
    </div>
    <div class="rating rating-lg">
      <input type="radio" name="rating-size-LG" class="mask mask-star-2 cursor-pointer bg-warning" aria-label="1 star LG" />
      <input type="radio" name="rating-size-LG" class="mask mask-star-2 cursor-pointer bg-warning" aria-label="2 star LG" checked />
      <input type="radio" name="rating-size-LG" class="mask mask-star-2 cursor-pointer bg-warning" aria-label="3 star LG" />
      <input type="radio" name="rating-size-LG" class="mask mask-star-2 cursor-pointer bg-warning" aria-label="4 star LG" />
      <input type="radio" name="rating-size-LG" class="mask mask-star-2 cursor-pointer bg-warning" aria-label="5 star LG" />
    </div>
  </div>
  <div class="min-w-0">
    <div class="mb-2 flex flex-wrap items-center justify-between gap-2">
      <span class="label-ink">XL</span>
    </div>
    <div class="rating rating-xl">
      <input type="radio" name="rating-size-XL" class="mask mask-star-2 cursor-pointer bg-warning" aria-label="1 star XL" />
      <input type="radio" name="rating-size-XL" class="mask mask-star-2 cursor-pointer bg-warning" aria-label="2 star XL" checked />
      <input type="radio" name="rating-size-XL" class="mask mask-star-2 cursor-pointer bg-warning" aria-label="3 star XL" />
      <input type="radio" name="rating-size-XL" class="mask mask-star-2 cursor-pointer bg-warning" aria-label="4 star XL" />
      <input type="radio" name="rating-size-XL" class="mask mask-star-2 cursor-pointer bg-warning" aria-label="5 star XL" />
    </div>
  </div>
</div>`

const sizesJsx = `<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
  <div className="min-w-0">
    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
      <span className="label-ink">XS</span>
    </div>
    <div className="rating rating-xs">
      <input type="radio" name="rating-size-XS" className="mask mask-star-2 cursor-pointer bg-warning" aria-label="1 star XS" />
      <input type="radio" name="rating-size-XS" className="mask mask-star-2 cursor-pointer bg-warning" aria-label="2 star XS" defaultChecked />
      <input type="radio" name="rating-size-XS" className="mask mask-star-2 cursor-pointer bg-warning" aria-label="3 star XS" />
      <input type="radio" name="rating-size-XS" className="mask mask-star-2 cursor-pointer bg-warning" aria-label="4 star XS" />
      <input type="radio" name="rating-size-XS" className="mask mask-star-2 cursor-pointer bg-warning" aria-label="5 star XS" />
    </div>
  </div>
  <div className="min-w-0">
    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
      <span className="label-ink">SM</span>
    </div>
    <div className="rating rating-sm">
      <input type="radio" name="rating-size-SM" className="mask mask-star-2 cursor-pointer bg-warning" aria-label="1 star SM" />
      <input type="radio" name="rating-size-SM" className="mask mask-star-2 cursor-pointer bg-warning" aria-label="2 star SM" defaultChecked />
      <input type="radio" name="rating-size-SM" className="mask mask-star-2 cursor-pointer bg-warning" aria-label="3 star SM" />
      <input type="radio" name="rating-size-SM" className="mask mask-star-2 cursor-pointer bg-warning" aria-label="4 star SM" />
      <input type="radio" name="rating-size-SM" className="mask mask-star-2 cursor-pointer bg-warning" aria-label="5 star SM" />
    </div>
  </div>
  <div className="min-w-0">
    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
      <span className="label-ink">MD</span>
    </div>
    <div className="rating rating-md">
      <input type="radio" name="rating-size-MD" className="mask mask-star-2 cursor-pointer bg-warning" aria-label="1 star MD" />
      <input type="radio" name="rating-size-MD" className="mask mask-star-2 cursor-pointer bg-warning" aria-label="2 star MD" defaultChecked />
      <input type="radio" name="rating-size-MD" className="mask mask-star-2 cursor-pointer bg-warning" aria-label="3 star MD" />
      <input type="radio" name="rating-size-MD" className="mask mask-star-2 cursor-pointer bg-warning" aria-label="4 star MD" />
      <input type="radio" name="rating-size-MD" className="mask mask-star-2 cursor-pointer bg-warning" aria-label="5 star MD" />
    </div>
  </div>
  <div className="min-w-0">
    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
      <span className="label-ink">LG</span>
    </div>
    <div className="rating rating-lg">
      <input type="radio" name="rating-size-LG" className="mask mask-star-2 cursor-pointer bg-warning" aria-label="1 star LG" />
      <input type="radio" name="rating-size-LG" className="mask mask-star-2 cursor-pointer bg-warning" aria-label="2 star LG" defaultChecked />
      <input type="radio" name="rating-size-LG" className="mask mask-star-2 cursor-pointer bg-warning" aria-label="3 star LG" />
      <input type="radio" name="rating-size-LG" className="mask mask-star-2 cursor-pointer bg-warning" aria-label="4 star LG" />
      <input type="radio" name="rating-size-LG" className="mask mask-star-2 cursor-pointer bg-warning" aria-label="5 star LG" />
    </div>
  </div>
  <div className="min-w-0">
    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
      <span className="label-ink">XL</span>
    </div>
    <div className="rating rating-xl">
      <input type="radio" name="rating-size-XL" className="mask mask-star-2 cursor-pointer bg-warning" aria-label="1 star XL" />
      <input type="radio" name="rating-size-XL" className="mask mask-star-2 cursor-pointer bg-warning" aria-label="2 star XL" defaultChecked />
      <input type="radio" name="rating-size-XL" className="mask mask-star-2 cursor-pointer bg-warning" aria-label="3 star XL" />
      <input type="radio" name="rating-size-XL" className="mask mask-star-2 cursor-pointer bg-warning" aria-label="4 star XL" />
      <input type="radio" name="rating-size-XL" className="mask mask-star-2 cursor-pointer bg-warning" aria-label="5 star XL" />
    </div>
  </div>
</div>`

const colorsHtml = `<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
  <div class="min-w-0">
    <div class="mb-2 flex flex-wrap items-center justify-between gap-2">
      <span class="label-ink">Primary</span>
    </div>
    <div class="rating">
      <input type="radio" name="rating-color-Primary" class="mask mask-star-2 cursor-pointer bg-primary" aria-label="1 star Primary" />
      <input type="radio" name="rating-color-Primary" class="mask mask-star-2 cursor-pointer bg-primary" aria-label="2 star Primary" />
      <input type="radio" name="rating-color-Primary" class="mask mask-star-2 cursor-pointer bg-primary" aria-label="3 star Primary" checked />
      <input type="radio" name="rating-color-Primary" class="mask mask-star-2 cursor-pointer bg-primary" aria-label="4 star Primary" />
      <input type="radio" name="rating-color-Primary" class="mask mask-star-2 cursor-pointer bg-primary" aria-label="5 star Primary" />
    </div>
  </div>
  <div class="min-w-0">
    <div class="mb-2 flex flex-wrap items-center justify-between gap-2">
      <span class="label-ink">Secondary</span>
    </div>
    <div class="rating">
      <input type="radio" name="rating-color-Secondary" class="mask mask-star-2 cursor-pointer bg-secondary" aria-label="1 star Secondary" />
      <input type="radio" name="rating-color-Secondary" class="mask mask-star-2 cursor-pointer bg-secondary" aria-label="2 star Secondary" />
      <input type="radio" name="rating-color-Secondary" class="mask mask-star-2 cursor-pointer bg-secondary" aria-label="3 star Secondary" checked />
      <input type="radio" name="rating-color-Secondary" class="mask mask-star-2 cursor-pointer bg-secondary" aria-label="4 star Secondary" />
      <input type="radio" name="rating-color-Secondary" class="mask mask-star-2 cursor-pointer bg-secondary" aria-label="5 star Secondary" />
    </div>
  </div>
  <div class="min-w-0">
    <div class="mb-2 flex flex-wrap items-center justify-between gap-2">
      <span class="label-ink">Accent</span>
    </div>
    <div class="rating">
      <input type="radio" name="rating-color-Accent" class="mask mask-star-2 cursor-pointer bg-accent" aria-label="1 star Accent" />
      <input type="radio" name="rating-color-Accent" class="mask mask-star-2 cursor-pointer bg-accent" aria-label="2 star Accent" />
      <input type="radio" name="rating-color-Accent" class="mask mask-star-2 cursor-pointer bg-accent" aria-label="3 star Accent" checked />
      <input type="radio" name="rating-color-Accent" class="mask mask-star-2 cursor-pointer bg-accent" aria-label="4 star Accent" />
      <input type="radio" name="rating-color-Accent" class="mask mask-star-2 cursor-pointer bg-accent" aria-label="5 star Accent" />
    </div>
  </div>
  <div class="min-w-0">
    <div class="mb-2 flex flex-wrap items-center justify-between gap-2">
      <span class="label-ink">Neutral</span>
    </div>
    <div class="rating">
      <input type="radio" name="rating-color-Neutral" class="mask mask-star-2 cursor-pointer bg-neutral" aria-label="1 star Neutral" />
      <input type="radio" name="rating-color-Neutral" class="mask mask-star-2 cursor-pointer bg-neutral" aria-label="2 star Neutral" />
      <input type="radio" name="rating-color-Neutral" class="mask mask-star-2 cursor-pointer bg-neutral" aria-label="3 star Neutral" checked />
      <input type="radio" name="rating-color-Neutral" class="mask mask-star-2 cursor-pointer bg-neutral" aria-label="4 star Neutral" />
      <input type="radio" name="rating-color-Neutral" class="mask mask-star-2 cursor-pointer bg-neutral" aria-label="5 star Neutral" />
    </div>
  </div>
  <div class="min-w-0">
    <div class="mb-2 flex flex-wrap items-center justify-between gap-2">
      <span class="label-ink">Success</span>
    </div>
    <div class="rating">
      <input type="radio" name="rating-color-Success" class="mask mask-star-2 cursor-pointer bg-success" aria-label="1 star Success" />
      <input type="radio" name="rating-color-Success" class="mask mask-star-2 cursor-pointer bg-success" aria-label="2 star Success" />
      <input type="radio" name="rating-color-Success" class="mask mask-star-2 cursor-pointer bg-success" aria-label="3 star Success" checked />
      <input type="radio" name="rating-color-Success" class="mask mask-star-2 cursor-pointer bg-success" aria-label="4 star Success" />
      <input type="radio" name="rating-color-Success" class="mask mask-star-2 cursor-pointer bg-success" aria-label="5 star Success" />
    </div>
  </div>
  <div class="min-w-0">
    <div class="mb-2 flex flex-wrap items-center justify-between gap-2">
      <span class="label-ink">Warning</span>
    </div>
    <div class="rating">
      <input type="radio" name="rating-color-Warning" class="mask mask-star-2 cursor-pointer bg-warning" aria-label="1 star Warning" />
      <input type="radio" name="rating-color-Warning" class="mask mask-star-2 cursor-pointer bg-warning" aria-label="2 star Warning" />
      <input type="radio" name="rating-color-Warning" class="mask mask-star-2 cursor-pointer bg-warning" aria-label="3 star Warning" checked />
      <input type="radio" name="rating-color-Warning" class="mask mask-star-2 cursor-pointer bg-warning" aria-label="4 star Warning" />
      <input type="radio" name="rating-color-Warning" class="mask mask-star-2 cursor-pointer bg-warning" aria-label="5 star Warning" />
    </div>
  </div>
  <div class="min-w-0">
    <div class="mb-2 flex flex-wrap items-center justify-between gap-2">
      <span class="label-ink">Info</span>
    </div>
    <div class="rating">
      <input type="radio" name="rating-color-Info" class="mask mask-star-2 cursor-pointer bg-info" aria-label="1 star Info" />
      <input type="radio" name="rating-color-Info" class="mask mask-star-2 cursor-pointer bg-info" aria-label="2 star Info" />
      <input type="radio" name="rating-color-Info" class="mask mask-star-2 cursor-pointer bg-info" aria-label="3 star Info" checked />
      <input type="radio" name="rating-color-Info" class="mask mask-star-2 cursor-pointer bg-info" aria-label="4 star Info" />
      <input type="radio" name="rating-color-Info" class="mask mask-star-2 cursor-pointer bg-info" aria-label="5 star Info" />
    </div>
  </div>
  <div class="min-w-0">
    <div class="mb-2 flex flex-wrap items-center justify-between gap-2">
      <span class="label-ink">Error</span>
    </div>
    <div class="rating">
      <input type="radio" name="rating-color-Error" class="mask mask-star-2 cursor-pointer bg-error" aria-label="1 star Error" />
      <input type="radio" name="rating-color-Error" class="mask mask-star-2 cursor-pointer bg-error" aria-label="2 star Error" />
      <input type="radio" name="rating-color-Error" class="mask mask-star-2 cursor-pointer bg-error" aria-label="3 star Error" checked />
      <input type="radio" name="rating-color-Error" class="mask mask-star-2 cursor-pointer bg-error" aria-label="4 star Error" />
      <input type="radio" name="rating-color-Error" class="mask mask-star-2 cursor-pointer bg-error" aria-label="5 star Error" />
    </div>
  </div>
</div>
<div class="mt-6 border-t border-ink-border/60 pt-5">
  <div class="mb-2 flex flex-wrap items-center justify-between gap-2">
    <span class="label-ink">Hearts</span>
  </div>
  <div class="rating gap-1">
    <input type="radio" name="rating-hearts" class="mask mask-heart cursor-pointer bg-error" aria-label="1 heart" />
    <input type="radio" name="rating-hearts" class="mask mask-heart cursor-pointer bg-warning" aria-label="2 heart" checked />
    <input type="radio" name="rating-hearts" class="mask mask-heart cursor-pointer bg-warning" aria-label="3 heart" />
    <input type="radio" name="rating-hearts" class="mask mask-heart cursor-pointer bg-success" aria-label="4 heart" />
    <input type="radio" name="rating-hearts" class="mask mask-heart cursor-pointer bg-success" aria-label="5 heart" />
  </div>
</div>`

const colorsJsx = `<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
  <div className="min-w-0">
    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
      <span className="label-ink">Primary</span>
    </div>
    <div className="rating">
      <input type="radio" name="rating-color-Primary" className="mask mask-star-2 cursor-pointer bg-primary" aria-label="1 star Primary" />
      <input type="radio" name="rating-color-Primary" className="mask mask-star-2 cursor-pointer bg-primary" aria-label="2 star Primary" />
      <input type="radio" name="rating-color-Primary" className="mask mask-star-2 cursor-pointer bg-primary" aria-label="3 star Primary" defaultChecked />
      <input type="radio" name="rating-color-Primary" className="mask mask-star-2 cursor-pointer bg-primary" aria-label="4 star Primary" />
      <input type="radio" name="rating-color-Primary" className="mask mask-star-2 cursor-pointer bg-primary" aria-label="5 star Primary" />
    </div>
  </div>
  <div className="min-w-0">
    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
      <span className="label-ink">Secondary</span>
    </div>
    <div className="rating">
      <input type="radio" name="rating-color-Secondary" className="mask mask-star-2 cursor-pointer bg-secondary" aria-label="1 star Secondary" />
      <input type="radio" name="rating-color-Secondary" className="mask mask-star-2 cursor-pointer bg-secondary" aria-label="2 star Secondary" />
      <input type="radio" name="rating-color-Secondary" className="mask mask-star-2 cursor-pointer bg-secondary" aria-label="3 star Secondary" defaultChecked />
      <input type="radio" name="rating-color-Secondary" className="mask mask-star-2 cursor-pointer bg-secondary" aria-label="4 star Secondary" />
      <input type="radio" name="rating-color-Secondary" className="mask mask-star-2 cursor-pointer bg-secondary" aria-label="5 star Secondary" />
    </div>
  </div>
  <div className="min-w-0">
    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
      <span className="label-ink">Accent</span>
    </div>
    <div className="rating">
      <input type="radio" name="rating-color-Accent" className="mask mask-star-2 cursor-pointer bg-accent" aria-label="1 star Accent" />
      <input type="radio" name="rating-color-Accent" className="mask mask-star-2 cursor-pointer bg-accent" aria-label="2 star Accent" />
      <input type="radio" name="rating-color-Accent" className="mask mask-star-2 cursor-pointer bg-accent" aria-label="3 star Accent" defaultChecked />
      <input type="radio" name="rating-color-Accent" className="mask mask-star-2 cursor-pointer bg-accent" aria-label="4 star Accent" />
      <input type="radio" name="rating-color-Accent" className="mask mask-star-2 cursor-pointer bg-accent" aria-label="5 star Accent" />
    </div>
  </div>
  <div className="min-w-0">
    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
      <span className="label-ink">Neutral</span>
    </div>
    <div className="rating">
      <input type="radio" name="rating-color-Neutral" className="mask mask-star-2 cursor-pointer bg-neutral" aria-label="1 star Neutral" />
      <input type="radio" name="rating-color-Neutral" className="mask mask-star-2 cursor-pointer bg-neutral" aria-label="2 star Neutral" />
      <input type="radio" name="rating-color-Neutral" className="mask mask-star-2 cursor-pointer bg-neutral" aria-label="3 star Neutral" defaultChecked />
      <input type="radio" name="rating-color-Neutral" className="mask mask-star-2 cursor-pointer bg-neutral" aria-label="4 star Neutral" />
      <input type="radio" name="rating-color-Neutral" className="mask mask-star-2 cursor-pointer bg-neutral" aria-label="5 star Neutral" />
    </div>
  </div>
  <div className="min-w-0">
    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
      <span className="label-ink">Success</span>
    </div>
    <div className="rating">
      <input type="radio" name="rating-color-Success" className="mask mask-star-2 cursor-pointer bg-success" aria-label="1 star Success" />
      <input type="radio" name="rating-color-Success" className="mask mask-star-2 cursor-pointer bg-success" aria-label="2 star Success" />
      <input type="radio" name="rating-color-Success" className="mask mask-star-2 cursor-pointer bg-success" aria-label="3 star Success" defaultChecked />
      <input type="radio" name="rating-color-Success" className="mask mask-star-2 cursor-pointer bg-success" aria-label="4 star Success" />
      <input type="radio" name="rating-color-Success" className="mask mask-star-2 cursor-pointer bg-success" aria-label="5 star Success" />
    </div>
  </div>
  <div className="min-w-0">
    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
      <span className="label-ink">Warning</span>
    </div>
    <div className="rating">
      <input type="radio" name="rating-color-Warning" className="mask mask-star-2 cursor-pointer bg-warning" aria-label="1 star Warning" />
      <input type="radio" name="rating-color-Warning" className="mask mask-star-2 cursor-pointer bg-warning" aria-label="2 star Warning" />
      <input type="radio" name="rating-color-Warning" className="mask mask-star-2 cursor-pointer bg-warning" aria-label="3 star Warning" defaultChecked />
      <input type="radio" name="rating-color-Warning" className="mask mask-star-2 cursor-pointer bg-warning" aria-label="4 star Warning" />
      <input type="radio" name="rating-color-Warning" className="mask mask-star-2 cursor-pointer bg-warning" aria-label="5 star Warning" />
    </div>
  </div>
  <div className="min-w-0">
    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
      <span className="label-ink">Info</span>
    </div>
    <div className="rating">
      <input type="radio" name="rating-color-Info" className="mask mask-star-2 cursor-pointer bg-info" aria-label="1 star Info" />
      <input type="radio" name="rating-color-Info" className="mask mask-star-2 cursor-pointer bg-info" aria-label="2 star Info" />
      <input type="radio" name="rating-color-Info" className="mask mask-star-2 cursor-pointer bg-info" aria-label="3 star Info" defaultChecked />
      <input type="radio" name="rating-color-Info" className="mask mask-star-2 cursor-pointer bg-info" aria-label="4 star Info" />
      <input type="radio" name="rating-color-Info" className="mask mask-star-2 cursor-pointer bg-info" aria-label="5 star Info" />
    </div>
  </div>
  <div className="min-w-0">
    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
      <span className="label-ink">Error</span>
    </div>
    <div className="rating">
      <input type="radio" name="rating-color-Error" className="mask mask-star-2 cursor-pointer bg-error" aria-label="1 star Error" />
      <input type="radio" name="rating-color-Error" className="mask mask-star-2 cursor-pointer bg-error" aria-label="2 star Error" />
      <input type="radio" name="rating-color-Error" className="mask mask-star-2 cursor-pointer bg-error" aria-label="3 star Error" defaultChecked />
      <input type="radio" name="rating-color-Error" className="mask mask-star-2 cursor-pointer bg-error" aria-label="4 star Error" />
      <input type="radio" name="rating-color-Error" className="mask mask-star-2 cursor-pointer bg-error" aria-label="5 star Error" />
    </div>
  </div>
</div>
<div className="mt-6 border-t border-ink-border/60 pt-5">
  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
    <span className="label-ink">Hearts</span>
  </div>
  <div className="rating gap-1">
    <input type="radio" name="rating-hearts" className="mask mask-heart cursor-pointer bg-error" aria-label="1 heart" />
    <input type="radio" name="rating-hearts" className="mask mask-heart cursor-pointer bg-warning" aria-label="2 heart" defaultChecked />
    <input type="radio" name="rating-hearts" className="mask mask-heart cursor-pointer bg-warning" aria-label="3 heart" />
    <input type="radio" name="rating-hearts" className="mask mask-heart cursor-pointer bg-success" aria-label="4 heart" />
    <input type="radio" name="rating-hearts" className="mask mask-heart cursor-pointer bg-success" aria-label="5 heart" />
  </div>
</div>`

const halfHtml = `<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
  <div class="min-w-0 overflow-x-auto">
    <p class="label-ink mb-2">Wash depth</p>
<div class="rating rating-half rating-lg">
  <input type="radio" name="rating-half" class="rating-hidden cursor-pointer" aria-label="Clear rating" />
  <input type="radio" name="rating-half" class="mask mask-star-2 cursor-pointer mask-half-1 bg-success" aria-label="0.5 star" />
  <input type="radio" name="rating-half" class="mask mask-star-2 cursor-pointer mask-half-2 bg-success" aria-label="1 star" />
  <input type="radio" name="rating-half" class="mask mask-star-2 cursor-pointer mask-half-1 bg-success" aria-label="1.5 star" />
  <input type="radio" name="rating-half" class="mask mask-star-2 cursor-pointer mask-half-2 bg-success" aria-label="2 star" />
  <input type="radio" name="rating-half" class="mask mask-star-2 cursor-pointer mask-half-1 bg-success" aria-label="2.5 star" />
  <input type="radio" name="rating-half" class="mask mask-star-2 cursor-pointer mask-half-2 bg-success" aria-label="3 star" />
  <input type="radio" name="rating-half" class="mask mask-star-2 cursor-pointer mask-half-1 bg-success" aria-label="3.5 star" checked />
  <input type="radio" name="rating-half" class="mask mask-star-2 cursor-pointer mask-half-2 bg-success" aria-label="4 star" />
  <input type="radio" name="rating-half" class="mask mask-star-2 cursor-pointer mask-half-1 bg-success" aria-label="4.5 star" />
  <input type="radio" name="rating-half" class="mask mask-star-2 cursor-pointer mask-half-2 bg-success" aria-label="5 star" />
</div>
  </div>
  <span class="badge badge-success badge-outline shrink-0 font-mono">3.5 / 5</span>
</div>`

const halfJsx = `<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
  <div className="min-w-0 overflow-x-auto">
    <p className="label-ink mb-2">Wash depth</p>
<div className="rating rating-half rating-lg">
  <input type="radio" name="rating-half" className="rating-hidden cursor-pointer" aria-label="Clear rating" />
  <input type="radio" name="rating-half" className="mask mask-star-2 cursor-pointer mask-half-1 bg-success" aria-label="0.5 star" />
  <input type="radio" name="rating-half" className="mask mask-star-2 cursor-pointer mask-half-2 bg-success" aria-label="1 star" />
  <input type="radio" name="rating-half" className="mask mask-star-2 cursor-pointer mask-half-1 bg-success" aria-label="1.5 star" />
  <input type="radio" name="rating-half" className="mask mask-star-2 cursor-pointer mask-half-2 bg-success" aria-label="2 star" />
  <input type="radio" name="rating-half" className="mask mask-star-2 cursor-pointer mask-half-1 bg-success" aria-label="2.5 star" />
  <input type="radio" name="rating-half" className="mask mask-star-2 cursor-pointer mask-half-2 bg-success" aria-label="3 star" />
  <input type="radio" name="rating-half" className="mask mask-star-2 cursor-pointer mask-half-1 bg-success" aria-label="3.5 star" defaultChecked />
  <input type="radio" name="rating-half" className="mask mask-star-2 cursor-pointer mask-half-2 bg-success" aria-label="4 star" />
  <input type="radio" name="rating-half" className="mask mask-star-2 cursor-pointer mask-half-1 bg-success" aria-label="4.5 star" />
  <input type="radio" name="rating-half" className="mask mask-star-2 cursor-pointer mask-half-2 bg-success" aria-label="5 star" />
</div>
  </div>
  <span className="badge badge-success badge-outline shrink-0 font-mono">3.5 / 5</span>
</div>`

const interactiveHtml = `<div class="mx-auto grid w-full max-w-xl gap-6 md:grid-cols-[1fr_auto] md:items-center">
  <div>
    <div class="mb-2 flex items-center justify-between gap-3">
      <span class="label-ink">Series rating</span>
      <span class="badge badge-secondary badge-outline font-mono">4 / 5</span>
    </div>
<div class="rating rating-lg">
  <input type="radio" name="rating-live" class="mask mask-star-2 cursor-pointer bg-secondary" aria-label="1 star" />
  <input type="radio" name="rating-live" class="mask mask-star-2 cursor-pointer bg-secondary" aria-label="2 star" />
  <input type="radio" name="rating-live" class="mask mask-star-2 cursor-pointer bg-secondary" aria-label="3 star" />
  <input type="radio" name="rating-live" class="mask mask-star-2 cursor-pointer bg-secondary" aria-label="4 star" checked />
  <input type="radio" name="rating-live" class="mask mask-star-2 cursor-pointer bg-secondary" aria-label="5 star" />
</div>
    <progress class="progress progress-secondary mt-4 h-2 w-full" value="4" max="5" aria-label="Series rating progress"></progress>
  </div>
  <div class="flex flex-col items-center gap-2 rounded-box border border-ink-border/60 bg-base-200/30 px-5 py-4">
    <svg class="size-8 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>
    <p class="font-display text-2xl font-semibold tabular-nums">4</p>
    <p class="text-xs text-ink-muted">of 5</p>
  </div>
</div>`

const interactiveJsx = `<div className="mx-auto grid w-full max-w-xl gap-6 md:grid-cols-[1fr_auto] md:items-center">
  <div>
    <div className="mb-2 flex items-center justify-between gap-3">
      <span className="label-ink">Series rating</span>
      <span className="badge badge-secondary badge-outline font-mono">4 / 5</span>
    </div>
<div className="rating rating-lg">
  <input type="radio" name="rating-live" className="mask mask-star-2 cursor-pointer bg-secondary" aria-label="1 star" />
  <input type="radio" name="rating-live" className="mask mask-star-2 cursor-pointer bg-secondary" aria-label="2 star" />
  <input type="radio" name="rating-live" className="mask mask-star-2 cursor-pointer bg-secondary" aria-label="3 star" />
  <input type="radio" name="rating-live" className="mask mask-star-2 cursor-pointer bg-secondary" aria-label="4 star" defaultChecked />
  <input type="radio" name="rating-live" className="mask mask-star-2 cursor-pointer bg-secondary" aria-label="5 star" />
</div>
    <progress className="progress progress-secondary mt-4 h-2 w-full" value="4" max="5" aria-label="Series rating progress"></progress>
  </div>
  <div className="flex flex-col items-center gap-2 rounded-box border border-ink-border/60 bg-base-200/30 px-5 py-4">
    <svg className="size-8 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>
    <p className="font-display text-2xl font-semibold tabular-nums">4</p>
    <p className="text-xs text-ink-muted">of 5</p>
  </div>
</div>`

const studioHtml = `<div class="mb-5 flex flex-wrap items-center gap-2">
  <svg class="size-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/></svg>
  <p class="text-sm font-medium">Active plate review</p>
</div>
<div class="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
  <div class="space-y-5">
    <div>
      <div class="mb-2 flex items-center justify-between gap-2">
        <span class="label-ink">Critique score</span>
        <span class="font-mono text-xs text-ink-muted">4 / 5</span>
      </div>
<div class="rating rating-md">
  <input type="radio" name="rating-critique" class="mask mask-star cursor-pointer bg-primary" aria-label="1 star" />
  <input type="radio" name="rating-critique" class="mask mask-star cursor-pointer bg-primary" aria-label="2 star" />
  <input type="radio" name="rating-critique" class="mask mask-star cursor-pointer bg-primary" aria-label="3 star" />
  <input type="radio" name="rating-critique" class="mask mask-star cursor-pointer bg-primary" aria-label="4 star" checked />
  <input type="radio" name="rating-critique" class="mask mask-star cursor-pointer bg-primary" aria-label="5 star" />
</div>
    </div>
    <div>
      <div class="mb-2 flex items-center justify-between gap-2">
        <span class="label-ink">Pigment quality</span>
        <span class="font-mono text-xs text-ink-muted">3.5 / 5</span>
      </div>
      <div class="overflow-x-auto">
<div class="rating rating-half rating-md">
  <input type="radio" name="rating-pigment" class="rating-hidden cursor-pointer" aria-label="Clear rating" />
  <input type="radio" name="rating-pigment" class="mask mask-star-2 cursor-pointer mask-half-1 bg-accent" aria-label="0.5 star" />
  <input type="radio" name="rating-pigment" class="mask mask-star-2 cursor-pointer mask-half-2 bg-accent" aria-label="1 star" />
  <input type="radio" name="rating-pigment" class="mask mask-star-2 cursor-pointer mask-half-1 bg-accent" aria-label="1.5 star" />
  <input type="radio" name="rating-pigment" class="mask mask-star-2 cursor-pointer mask-half-2 bg-accent" aria-label="2 star" />
  <input type="radio" name="rating-pigment" class="mask mask-star-2 cursor-pointer mask-half-1 bg-accent" aria-label="2.5 star" />
  <input type="radio" name="rating-pigment" class="mask mask-star-2 cursor-pointer mask-half-2 bg-accent" aria-label="3 star" />
  <input type="radio" name="rating-pigment" class="mask mask-star-2 cursor-pointer mask-half-1 bg-accent" aria-label="3.5 star" checked />
  <input type="radio" name="rating-pigment" class="mask mask-star-2 cursor-pointer mask-half-2 bg-accent" aria-label="4 star" />
  <input type="radio" name="rating-pigment" class="mask mask-star-2 cursor-pointer mask-half-1 bg-accent" aria-label="4.5 star" />
  <input type="radio" name="rating-pigment" class="mask mask-star-2 cursor-pointer mask-half-2 bg-accent" aria-label="5 star" />
</div>
      </div>
    </div>
    <div>
      <div class="mb-2 flex items-center justify-between gap-2">
        <span class="label-ink">Paper feel</span>
        <span class="font-mono text-xs text-ink-muted">5 / 5</span>
      </div>
<div class="rating rating-sm">
  <input type="radio" name="rating-paper" class="mask mask-star-2 cursor-pointer bg-info" aria-label="1 star" />
  <input type="radio" name="rating-paper" class="mask mask-star-2 cursor-pointer bg-info" aria-label="2 star" />
  <input type="radio" name="rating-paper" class="mask mask-star-2 cursor-pointer bg-info" aria-label="3 star" />
  <input type="radio" name="rating-paper" class="mask mask-star-2 cursor-pointer bg-info" aria-label="4 star" />
  <input type="radio" name="rating-paper" class="mask mask-star-2 cursor-pointer bg-info" aria-label="5 star" checked />
</div>
    </div>
  </div>
  <div class="flex flex-col justify-between gap-4 rounded-box border border-ink-border/70 bg-base-100/60 p-4">
    <div>
      <div class="mb-3 flex items-center gap-2">
        <svg class="size-4 text-info" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/></svg>
        <p class="text-sm font-medium">Review summary</p>
      </div>
      <ul class="space-y-1.5 text-sm text-ink-muted">
        <li>Critique: <span class="text-base-content">4 / 5</span></li>
        <li>Pigment: <span class="text-base-content">3.5 / 5</span></li>
        <li>Paper: <span class="text-base-content">5 / 5</span></li>
      </ul>
    </div>
    <div>
      <p class="label-ink mb-2">Average</p>
      <p class="font-display text-3xl font-semibold tabular-nums">4.2</p>
    </div>
  </div>
</div>`

const studioJsx = `<div className="mb-5 flex flex-wrap items-center gap-2">
  <svg className="size-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/></svg>
  <p className="text-sm font-medium">Active plate review</p>
</div>
<div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
  <div className="space-y-5">
    <div>
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="label-ink">Critique score</span>
        <span className="font-mono text-xs text-ink-muted">4 / 5</span>
      </div>
<div className="rating rating-md">
  <input type="radio" name="rating-critique" className="mask mask-star cursor-pointer bg-primary" aria-label="1 star" />
  <input type="radio" name="rating-critique" className="mask mask-star cursor-pointer bg-primary" aria-label="2 star" />
  <input type="radio" name="rating-critique" className="mask mask-star cursor-pointer bg-primary" aria-label="3 star" />
  <input type="radio" name="rating-critique" className="mask mask-star cursor-pointer bg-primary" aria-label="4 star" defaultChecked />
  <input type="radio" name="rating-critique" className="mask mask-star cursor-pointer bg-primary" aria-label="5 star" />
</div>
    </div>
    <div>
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="label-ink">Pigment quality</span>
        <span className="font-mono text-xs text-ink-muted">3.5 / 5</span>
      </div>
      <div className="overflow-x-auto">
<div className="rating rating-half rating-md">
  <input type="radio" name="rating-pigment" className="rating-hidden cursor-pointer" aria-label="Clear rating" />
  <input type="radio" name="rating-pigment" className="mask mask-star-2 cursor-pointer mask-half-1 bg-accent" aria-label="0.5 star" />
  <input type="radio" name="rating-pigment" className="mask mask-star-2 cursor-pointer mask-half-2 bg-accent" aria-label="1 star" />
  <input type="radio" name="rating-pigment" className="mask mask-star-2 cursor-pointer mask-half-1 bg-accent" aria-label="1.5 star" />
  <input type="radio" name="rating-pigment" className="mask mask-star-2 cursor-pointer mask-half-2 bg-accent" aria-label="2 star" />
  <input type="radio" name="rating-pigment" className="mask mask-star-2 cursor-pointer mask-half-1 bg-accent" aria-label="2.5 star" />
  <input type="radio" name="rating-pigment" className="mask mask-star-2 cursor-pointer mask-half-2 bg-accent" aria-label="3 star" />
  <input type="radio" name="rating-pigment" className="mask mask-star-2 cursor-pointer mask-half-1 bg-accent" aria-label="3.5 star" defaultChecked />
  <input type="radio" name="rating-pigment" className="mask mask-star-2 cursor-pointer mask-half-2 bg-accent" aria-label="4 star" />
  <input type="radio" name="rating-pigment" className="mask mask-star-2 cursor-pointer mask-half-1 bg-accent" aria-label="4.5 star" />
  <input type="radio" name="rating-pigment" className="mask mask-star-2 cursor-pointer mask-half-2 bg-accent" aria-label="5 star" />
</div>
      </div>
    </div>
    <div>
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="label-ink">Paper feel</span>
        <span className="font-mono text-xs text-ink-muted">5 / 5</span>
      </div>
<div className="rating rating-sm">
  <input type="radio" name="rating-paper" className="mask mask-star-2 cursor-pointer bg-info" aria-label="1 star" />
  <input type="radio" name="rating-paper" className="mask mask-star-2 cursor-pointer bg-info" aria-label="2 star" />
  <input type="radio" name="rating-paper" className="mask mask-star-2 cursor-pointer bg-info" aria-label="3 star" />
  <input type="radio" name="rating-paper" className="mask mask-star-2 cursor-pointer bg-info" aria-label="4 star" />
  <input type="radio" name="rating-paper" className="mask mask-star-2 cursor-pointer bg-info" aria-label="5 star" defaultChecked />
</div>
    </div>
  </div>
  <div className="flex flex-col justify-between gap-4 rounded-box border border-ink-border/70 bg-base-100/60 p-4">
    <div>
      <div className="mb-3 flex items-center gap-2">
        <svg className="size-4 text-info" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/></svg>
        <p className="text-sm font-medium">Review summary</p>
      </div>
      <ul className="space-y-1.5 text-sm text-ink-muted">
        <li>Critique: <span className="text-base-content">4 / 5</span></li>
        <li>Pigment: <span className="text-base-content">3.5 / 5</span></li>
        <li>Paper: <span className="text-base-content">5 / 5</span></li>
      </ul>
    </div>
    <div>
      <p className="label-ink mb-2">Average</p>
      <p className="font-display text-3xl font-semibold tabular-nums">4.2</p>
    </div>
  </div>
</div>`

const clearHtml = `<div class="grid gap-6 md:grid-cols-2">
  <div>
    <p class="label-ink mb-2">Published score</p>
<div class="rating rating-md" aria-label="4 of 5 stars">
  <div class="mask mask-star bg-warning" aria-label="1 star"></div>
  <div class="mask mask-star bg-warning" aria-label="2 star"></div>
  <div class="mask mask-star bg-warning" aria-label="3 star"></div>
  <div class="mask mask-star bg-warning" aria-label="4 star" aria-current="true"></div>
  <div class="mask mask-star bg-warning" aria-label="5 star"></div>
</div>
    <p class="mt-3 text-sm text-ink-muted">Non-interactive display for locked critique results.</p>
  </div>
  <div>
    <div class="mb-2 flex items-center justify-between gap-2">
      <span class="label-ink">Clearable rating</span>
      <span class="font-mono text-xs text-ink-muted">2 / 5</span>
    </div>
<div class="rating rating-lg">
  <input type="radio" name="rating-clearable" class="rating-hidden cursor-pointer" aria-label="Clear rating" />
  <input type="radio" name="rating-clearable" class="mask mask-star-2 cursor-pointer bg-primary" aria-label="1 star" />
  <input type="radio" name="rating-clearable" class="mask mask-star-2 cursor-pointer bg-primary" aria-label="2 star" checked />
  <input type="radio" name="rating-clearable" class="mask mask-star-2 cursor-pointer bg-primary" aria-label="3 star" />
  <input type="radio" name="rating-clearable" class="mask mask-star-2 cursor-pointer bg-primary" aria-label="4 star" />
  <input type="radio" name="rating-clearable" class="mask mask-star-2 cursor-pointer bg-primary" aria-label="5 star" />
</div>
    <p class="mt-3 text-sm text-ink-muted">First radio uses rating-hidden so the score can be cleared.</p>
  </div>
</div>`

const clearJsx = `<div className="grid gap-6 md:grid-cols-2">
  <div>
    <p className="label-ink mb-2">Published score</p>
<div className="rating rating-md" aria-label="4 of 5 stars">
  <div className="mask mask-star bg-warning" aria-label="1 star"></div>
  <div className="mask mask-star bg-warning" aria-label="2 star"></div>
  <div className="mask mask-star bg-warning" aria-label="3 star"></div>
  <div className="mask mask-star bg-warning" aria-label="4 star" aria-current="true"></div>
  <div className="mask mask-star bg-warning" aria-label="5 star"></div>
</div>
    <p className="mt-3 text-sm text-ink-muted">Non-interactive display for locked critique results.</p>
  </div>
  <div>
    <div className="mb-2 flex items-center justify-between gap-2">
      <span className="label-ink">Clearable rating</span>
      <span className="font-mono text-xs text-ink-muted">2 / 5</span>
    </div>
<div className="rating rating-lg">
  <input type="radio" name="rating-clearable" className="rating-hidden cursor-pointer" aria-label="Clear rating" />
  <input type="radio" name="rating-clearable" className="mask mask-star-2 cursor-pointer bg-primary" aria-label="1 star" />
  <input type="radio" name="rating-clearable" className="mask mask-star-2 cursor-pointer bg-primary" aria-label="2 star" defaultChecked />
  <input type="radio" name="rating-clearable" className="mask mask-star-2 cursor-pointer bg-primary" aria-label="3 star" />
  <input type="radio" name="rating-clearable" className="mask mask-star-2 cursor-pointer bg-primary" aria-label="4 star" />
  <input type="radio" name="rating-clearable" className="mask mask-star-2 cursor-pointer bg-primary" aria-label="5 star" />
</div>
    <p className="mt-3 text-sm text-ink-muted">First radio uses rating-hidden so the score can be cleared.</p>
  </div>
</div>`

const responsiveHtml = `<div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
  <div class="rounded-box border border-ink-border/60 bg-base-100/50 p-4">
    <p class="label-ink mb-3">Morning wash</p>
<div class="rating rating-md" aria-label="5 of 5 stars">
  <div class="mask mask-star bg-primary" aria-label="1 star"></div>
  <div class="mask mask-star bg-primary" aria-label="2 star"></div>
  <div class="mask mask-star bg-primary" aria-label="3 star"></div>
  <div class="mask mask-star bg-primary" aria-label="4 star"></div>
  <div class="mask mask-star bg-primary" aria-label="5 star" aria-current="true"></div>
</div>
    <p class="mt-3 font-mono text-xs text-ink-muted">5 / 5</p>
  </div>
  <div class="rounded-box border border-ink-border/60 bg-base-100/50 p-4">
    <p class="label-ink mb-3">Edge control</p>
<div class="rating rating-md" aria-label="3 of 5 stars">
  <div class="mask mask-star bg-secondary" aria-label="1 star"></div>
  <div class="mask mask-star bg-secondary" aria-label="2 star"></div>
  <div class="mask mask-star bg-secondary" aria-label="3 star" aria-current="true"></div>
  <div class="mask mask-star bg-secondary" aria-label="4 star"></div>
  <div class="mask mask-star bg-secondary" aria-label="5 star"></div>
</div>
    <p class="mt-3 font-mono text-xs text-ink-muted">3 / 5</p>
  </div>
  <div class="rounded-box border border-ink-border/60 bg-base-100/50 p-4">
    <p class="label-ink mb-3">Granulation</p>
<div class="rating rating-md" aria-label="4 of 5 stars">
  <div class="mask mask-star bg-accent" aria-label="1 star"></div>
  <div class="mask mask-star bg-accent" aria-label="2 star"></div>
  <div class="mask mask-star bg-accent" aria-label="3 star"></div>
  <div class="mask mask-star bg-accent" aria-label="4 star" aria-current="true"></div>
  <div class="mask mask-star bg-accent" aria-label="5 star"></div>
</div>
    <p class="mt-3 font-mono text-xs text-ink-muted">4 / 5</p>
  </div>
</div>`

const responsiveJsx = `<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
  <div className="rounded-box border border-ink-border/60 bg-base-100/50 p-4">
    <p className="label-ink mb-3">Morning wash</p>
<div className="rating rating-md" aria-label="5 of 5 stars">
  <div className="mask mask-star bg-primary" aria-label="1 star"></div>
  <div className="mask mask-star bg-primary" aria-label="2 star"></div>
  <div className="mask mask-star bg-primary" aria-label="3 star"></div>
  <div className="mask mask-star bg-primary" aria-label="4 star"></div>
  <div className="mask mask-star bg-primary" aria-label="5 star" aria-current="true"></div>
</div>
    <p className="mt-3 font-mono text-xs text-ink-muted">5 / 5</p>
  </div>
  <div className="rounded-box border border-ink-border/60 bg-base-100/50 p-4">
    <p className="label-ink mb-3">Edge control</p>
<div className="rating rating-md" aria-label="3 of 5 stars">
  <div className="mask mask-star bg-secondary" aria-label="1 star"></div>
  <div className="mask mask-star bg-secondary" aria-label="2 star"></div>
  <div className="mask mask-star bg-secondary" aria-label="3 star" aria-current="true"></div>
  <div className="mask mask-star bg-secondary" aria-label="4 star"></div>
  <div className="mask mask-star bg-secondary" aria-label="5 star"></div>
</div>
    <p className="mt-3 font-mono text-xs text-ink-muted">3 / 5</p>
  </div>
  <div className="rounded-box border border-ink-border/60 bg-base-100/50 p-4">
    <p className="label-ink mb-3">Granulation</p>
<div className="rating rating-md" aria-label="4 of 5 stars">
  <div className="mask mask-star bg-accent" aria-label="1 star"></div>
  <div className="mask mask-star bg-accent" aria-label="2 star"></div>
  <div className="mask mask-star bg-accent" aria-label="3 star"></div>
  <div className="mask mask-star bg-accent" aria-label="4 star" aria-current="true"></div>
  <div className="mask mask-star bg-accent" aria-label="5 star"></div>
</div>
    <p className="mt-3 font-mono text-xs text-ink-muted">4 / 5</p>
  </div>
</div>`

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
          daisyUI <span className="font-mono text-xs">rating</span> star sets for critique scores, pigment quality, and desk feedback.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Default stars"
          description="Radio inputs with mask-star for a five-point score"
        >
          <ShowcaseTabs
            preview={
              <>
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
              </>
            }
            html={basicHtml}
            jsx={basicJsx}
          />
        </Section>

        <Section
          eyebrow="02 · Sizes"
          title="Size scale"
          description="Extra small through extra large star tracks"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
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
              </>
            }
            html={sizesHtml}
            jsx={sizesJsx}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <input
                      key={n}
                      type="radio"
                      name={\`rating-size-\${s.name}\`}
                      className="mask mask-star-2 cursor-pointer bg-warning"
                      aria-label={\`\${n} star \${s.name}\`}
                      defaultChecked={n === 2}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>`}
          />
        </Section>

        <Section
          eyebrow="03 · Colors"
          title="Semantic fills"
          description="Theme-aware bg colors on mask-star-2, plus heart masks"
        >
          <ShowcaseTabs
            preview={
              <>
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
              </>
            }
            html={colorsHtml}
            jsx={colorsJsx}
                      className={\`mask mask-star-2 cursor-pointer \${c.bg}\`}
                      aria-label={\`\${n} star \${c.name}\`}
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
          </div>`}
          />
        </Section>

        <Section
          eyebrow="04 · Half stars"
          title="Half-step scores"
          description="rating-half with mask-half-1 and mask-half-2 on mask-star-2"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
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
              </>
            }
            html={halfHtml}
            jsx={halfJsx}
          />
        </Section>

        <Section
          eyebrow="05 · Interactive"
          title="Controlled value"
          description="React state drives the stars and a live badge readout"
        >
          <ShowcaseTabs
            preview={
              <>
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
              </>
            }
            html={interactiveHtml}
            jsx={interactiveJsx}
          />
        </Section>

        <Section
          eyebrow="06 · Studio"
          title="Critique desk"
          description="Plate critique, pigment quality, and paper feel in one wash panel"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
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
              </>
            }
            html={studioHtml}
            jsx={studioJsx}
          />
        </Section>

        <Section
          eyebrow="07 · Read-only and clear"
          title="Display and reset"
          description="Div-based read-only stars, plus rating-hidden to clear a choice"
        >
          <ShowcaseTabs
            preview={
              <>
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
              </>
            }
            html={clearHtml}
            jsx={clearJsx}
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
                
              </p>
              <p className="mt-3 text-sm text-ink-muted">
                First radio uses rating-hidden so the score can be cleared.
              </p>
            </div>
          </div>`}
          />
        </Section>

        <Section
          eyebrow="08 · Responsive"
          title="Narrow and wide"
          description="Stacks on small screens; side-by-side score cards from md up"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
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
              </>
            }
          
            html={responsiveHtml}
            jsx={responsiveJsx}
          />
        </Section>
      </div>
    </>
  )
}
