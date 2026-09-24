import type { ReactNode } from 'react'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import { daisyToJsx } from './snippets/markup/daisyGalleryDefaults'
import { Check } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'

const styles = [
  { name: 'Default', className: '' },
  { name: 'Dual', className: 'aura-dual' },
  { name: 'Rainbow', className: 'aura-rainbow' },
  { name: 'Holo', className: 'aura-holo' },
  { name: 'Gold', className: 'aura-gold' },
  { name: 'Silver', className: 'aura-silver' },
  { name: 'Glow', className: 'aura-glow' },
] as const

const sizes = [
  { name: 'XS', className: 'aura-xs' },
  { name: 'SM', className: 'aura-sm' },
  { name: 'MD', className: 'aura-md' },
  { name: 'LG', className: 'aura-lg' },
  { name: 'XL', className: 'aura-xl' },
] as const

const themeColors = [
  { name: 'Primary', className: 'text-primary' },
  { name: 'Secondary', className: 'text-secondary' },
  { name: 'Accent', className: 'text-accent' },
  { name: 'Info', className: 'text-info' },
  { name: 'Success', className: 'text-success' },
  { name: 'Warning', className: 'text-warning' },
  { name: 'Error', className: 'text-error' },
] as const

const checkSvg = `<svg class="mt-0.5 size-4 shrink-0 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>`
const checkMutedSvg = `<svg class="mt-0.5 size-4 shrink-0 text-base-content/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>`

const cardHtml = `<div class="aura">
  <div class="card w-full max-w-sm bg-base-100 shadow-sm">
    <div class="card-body">
      <h2 class="card-title font-display">Coastal fog plate</h2>
      <p class="text-sm text-ink-muted">Soft rotating light around the card surface.</p>
    </div>
  </div>
</div>`

const buttonsHtml = `<div class="flex flex-wrap items-end gap-6">
  <div class="aura">
    <button type="button" class="btn cursor-pointer">Button with aura</button>
  </div>
  <div class="aura text-primary">
    <button type="button" class="btn btn-primary cursor-pointer">Primary highlight</button>
  </div>
  <div class="aura aura-glow text-accent">
    <button type="button" class="btn btn-accent cursor-pointer">Glow accent</button>
  </div>
</div>`

const stylesHtml = `<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
  <div class="aura">
    <div class="card w-full bg-base-100 shadow-sm">
      <div class="card-body py-4">
        <p class="font-display text-lg font-semibold">Default</p>
        <p class="text-sm text-ink-muted">Default rotating border</p>
      </div>
    </div>
  </div>
  <div class="aura aura-dual">
    <div class="card w-full bg-base-100 shadow-sm">
      <div class="card-body py-4">
        <p class="font-display text-lg font-semibold">Dual</p>
        <p class="text-sm text-ink-muted">aura-dual</p>
      </div>
    </div>
  </div>
  <div class="aura aura-rainbow">
    <div class="card w-full bg-base-100 shadow-sm">
      <div class="card-body py-4">
        <p class="font-display text-lg font-semibold">Rainbow</p>
        <p class="text-sm text-ink-muted">aura-rainbow</p>
      </div>
    </div>
  </div>
  <div class="aura aura-holo">
    <div class="card w-full bg-base-100 shadow-sm">
      <div class="card-body py-4">
        <p class="font-display text-lg font-semibold">Holo</p>
        <p class="text-sm text-ink-muted">aura-holo</p>
      </div>
    </div>
  </div>
  <div class="aura aura-gold">
    <div class="card w-full bg-base-100 shadow-sm">
      <div class="card-body py-4">
        <p class="font-display text-lg font-semibold">Gold</p>
        <p class="text-sm text-ink-muted">aura-gold</p>
      </div>
    </div>
  </div>
  <div class="aura aura-silver">
    <div class="card w-full bg-base-100 shadow-sm">
      <div class="card-body py-4">
        <p class="font-display text-lg font-semibold">Silver</p>
        <p class="text-sm text-ink-muted">aura-silver</p>
      </div>
    </div>
  </div>
  <div class="aura aura-glow">
    <div class="card w-full bg-base-100 shadow-sm">
      <div class="card-body py-4">
        <p class="font-display text-lg font-semibold">Glow</p>
        <p class="text-sm text-ink-muted">aura-glow</p>
      </div>
    </div>
  </div>
</div>`

const sizesHtml = `<div class="flex flex-wrap items-end gap-5">
  <div class="aura aura-xs">
    <button type="button" class="btn cursor-pointer">XS</button>
  </div>
  <div class="aura aura-sm">
    <button type="button" class="btn cursor-pointer">SM</button>
  </div>
  <div class="aura aura-md">
    <button type="button" class="btn cursor-pointer">MD</button>
  </div>
  <div class="aura aura-lg">
    <button type="button" class="btn cursor-pointer">LG</button>
  </div>
  <div class="aura aura-xl">
    <button type="button" class="btn cursor-pointer">XL</button>
  </div>
</div>`

const themeColorsHtml = `<div class="flex flex-wrap items-end gap-5">
  <div class="aura text-primary">
    <button type="button" class="btn cursor-pointer">Primary</button>
  </div>
  <div class="aura text-secondary">
    <button type="button" class="btn cursor-pointer">Secondary</button>
  </div>
  <div class="aura text-accent">
    <button type="button" class="btn cursor-pointer">Accent</button>
  </div>
  <div class="aura text-info">
    <button type="button" class="btn cursor-pointer">Info</button>
  </div>
  <div class="aura text-success">
    <button type="button" class="btn cursor-pointer">Success</button>
  </div>
  <div class="aura text-warning">
    <button type="button" class="btn cursor-pointer">Warning</button>
  </div>
  <div class="aura text-error">
    <button type="button" class="btn cursor-pointer">Error</button>
  </div>
</div>`

const customColorHtml = `<div class="grid gap-6 sm:grid-cols-2">
  <div class="aura text-orange-600">
    <div class="card w-full bg-base-100 text-base-content shadow-sm">
      <div class="card-body">
        <p class="font-display text-lg font-semibold">Custom color</p>
        <p class="text-sm text-ink-muted">Orange rotating border from text-orange-600.</p>
      </div>
    </div>
  </div>
  <div class="aura text-orange-600 bg-yellow-200">
    <div class="card w-full bg-base-100 text-base-content shadow-sm">
      <div class="card-body">
        <p class="font-display text-lg font-semibold">Color + background</p>
        <p class="text-sm text-ink-muted">Yellow pad behind the light ring.</p>
      </div>
    </div>
  </div>
</div>`

const avatarsHtml = `<div class="flex flex-wrap items-end gap-6">
  <div class="aura">
    <div class="avatar avatar-placeholder">
      <div class="w-16 rounded-full bg-neutral text-neutral-content">
        <span class="text-xl">MK</span>
      </div>
    </div>
  </div>
  <div class="aura aura-rainbow">
    <div class="avatar avatar-placeholder">
      <div class="w-16 rounded-full bg-primary text-primary-content">
        <span class="text-xl">WR</span>
      </div>
    </div>
  </div>
  <div class="aura aura-gold">
    <div class="avatar avatar-placeholder">
      <div class="w-16 rounded-full bg-wash-blue text-base-content">
        <span class="text-xl">GL</span>
      </div>
    </div>
  </div>
  <div class="aura aura-glow text-info">
    <div class="avatar avatar-placeholder">
      <div class="w-16 rounded-full bg-info text-info-content">
        <span class="text-xl">AO</span>
      </div>
    </div>
  </div>
</div>`

const durationHtml = `<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
  <div class="aura aura-rainbow duration-1000">
    <div class="card w-full bg-base-100 shadow-sm">
      <div class="card-body py-4">
        <p class="text-sm">1000ms spin</p>
      </div>
    </div>
  </div>
  <div class="aura aura-rainbow duration-2000">
    <div class="card w-full bg-base-100 shadow-sm">
      <div class="card-body py-4">
        <p class="text-sm">2000ms spin</p>
      </div>
    </div>
  </div>
  <div class="aura aura-rainbow">
    <div class="card w-full bg-base-100 shadow-sm">
      <div class="card-body py-4">
        <p class="text-sm">Default duration</p>
      </div>
    </div>
  </div>
</div>`

const showcaseHtml = `<div class="aura aura-rainbow">
  <div class="card w-full max-w-sm bg-base-100 shadow-sm">
    <div class="card-body">
      <span class="badge badge-xs badge-warning">Most popular</span>
      <div class="flex justify-between gap-2">
        <h2 class="font-display text-3xl font-bold">Premium</h2>
        <span class="text-xl">$29/mo</span>
      </div>
      <ul class="mt-4 flex flex-col gap-2 text-xs">
        <li class="flex items-start gap-2">${checkSvg}<span>High-resolution plate scans</span></li>
        <li class="flex items-start gap-2">${checkSvg}<span>Custom wash templates</span></li>
        <li class="flex items-start gap-2">${checkSvg}<span>Batch pigment processing</span></li>
        <li class="flex items-start gap-2">${checkSvg}<span>AI-driven enhancements</span></li>
        <li class="flex items-start gap-2 opacity-50">${checkMutedSvg}<span class="line-through">Cloud collaboration</span></li>
      </ul>
      <div class="mt-4">
        <button type="button" class="btn btn-primary btn-block cursor-pointer">Subscribe</button>
      </div>
    </div>
  </div>
</div>`

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
    <code className="font-mono text-[0.65rem] text-ink-muted">
      {value || 'aura'}
    </code>
  )
}

function Sample({
  label,
  children,
  className = '',
}: {
  label: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`flex flex-col items-start gap-2 ${className}`}>
      {children}
      <ClassLabel value={label} />
    </div>
  )
}

function auraLabel(...parts: string[]) {
  return ['aura', ...parts.filter(Boolean)].join(' ')
}

export default function AuraPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Aura
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Decorative border light that wraps one child (card, button, avatar).
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Default"
          title="Aura around a card"
          description="Base rotating border"
        >
          <ShowcaseTabs
            preview={
              <Sample label="aura">
                <div className="aura">
                  <div className="card w-full max-w-sm bg-base-100 shadow-sm">
                    <div className="card-body">
                      <h2 className="card-title font-display">Coastal fog plate</h2>
                      <p className="text-sm text-ink-muted">
                        Soft rotating light around the card surface.
                      </p>
                    </div>
                  </div>
                </div>
              </Sample>
            }
            html={cardHtml}
            jsx={daisyToJsx(cardHtml)}
          />
        </Section>

        <Section
          eyebrow="02 · Buttons"
          title="Aura around a button"
          description="Highlight a primary CTA with a light ring"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <div className="flex flex-wrap items-end gap-6">
                <Sample label="aura + btn">
                  <div className="aura">
                    <button type="button" className="btn cursor-pointer">
                      Button with aura
                    </button>
                  </div>
                </Sample>
                <Sample label="aura text-primary + btn-primary">
                  <div className="aura text-primary">
                    <button type="button" className="btn btn-primary cursor-pointer">
                      Primary highlight
                    </button>
                  </div>
                </Sample>
                <Sample label="aura aura-glow text-accent + btn-accent">
                  <div className="aura aura-glow text-accent">
                    <button type="button" className="btn btn-accent cursor-pointer">
                      Glow accent
                    </button>
                  </div>
                </Sample>
              </div>
            }
            html={buttonsHtml}
            jsx={daisyToJsx(buttonsHtml)}
          />
        </Section>

        <Section
          eyebrow="03 · Styles"
          title="Style modifiers"
          description="dual, rainbow, holo, gold, silver, and glow variants"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {styles.map((s) => (
                  <Sample key={s.name} label={auraLabel(s.className)}>
                    <div className={`aura ${s.className}`}>
                      <div className="card w-full bg-base-100 shadow-sm">
                        <div className="card-body py-4">
                          <p className="font-display text-lg font-semibold">{s.name}</p>
                          <p className="text-sm text-ink-muted">
                            {s.className || 'Default rotating border'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Sample>
                ))}
              </div>
            }
            html={stylesHtml}
            jsx={daisyToJsx(stylesHtml)}
          />
        </Section>

        <Section
          eyebrow="04 · Sizes"
          title="Aura sizes"
          description="Padding thickness from aura-xs through aura-xl (md is default)"
        >
          <ShowcaseTabs
            preview={
              <div className="flex flex-wrap items-end gap-5">
                {sizes.map((s) => (
                  <Sample
                    key={s.name}
                    label={s.className === 'aura-md' ? 'aura (md)' : auraLabel(s.className)}
                  >
                    <div className={`aura ${s.className}`}>
                      <button type="button" className="btn cursor-pointer">
                        {s.name}
                      </button>
                    </div>
                  </Sample>
                ))}
              </div>
            }
            html={sizesHtml}
            jsx={daisyToJsx(sizesHtml)}
          />
        </Section>

        <Section
          eyebrow="05 · Theme colors"
          title="text-* color classes"
          description="Aura inherits currentColor"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <div className="flex flex-wrap items-end gap-5">
                {themeColors.map((c) => (
                  <Sample key={c.name} label={auraLabel(c.className)}>
                    <div className={`aura ${c.className}`}>
                      <button type="button" className="btn cursor-pointer">
                        {c.name}
                      </button>
                    </div>
                  </Sample>
                ))}
              </div>
            }
            html={themeColorsHtml}
            jsx={daisyToJsx(themeColorsHtml)}
          />
        </Section>

        <Section
          eyebrow="06 · Custom color"
          title="Arbitrary text and background"
          description="Custom aura pigment via text-*, and optional bg-* for the aura pad"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <div className="grid gap-6 sm:grid-cols-2">
                <Sample label="aura text-orange-600">
                  <div className="aura text-orange-600">
                    <div className="card w-full bg-base-100 text-base-content shadow-sm">
                      <div className="card-body">
                        <p className="font-display text-lg font-semibold">Custom color</p>
                        <p className="text-sm text-ink-muted">
                          Orange rotating border from text-orange-600.
                        </p>
                      </div>
                    </div>
                  </div>
                </Sample>
                <Sample label="aura text-orange-600 bg-yellow-200">
                  <div className="aura text-orange-600 bg-yellow-200">
                    <div className="card w-full bg-base-100 text-base-content shadow-sm">
                      <div className="card-body">
                        <p className="font-display text-lg font-semibold">Color + background</p>
                        <p className="text-sm text-ink-muted">
                          Yellow pad behind the light ring.
                        </p>
                      </div>
                    </div>
                  </div>
                </Sample>
              </div>
            }
            html={customColorHtml}
            jsx={daisyToJsx(customColorHtml)}
          />
        </Section>

        <Section
          eyebrow="07 · Avatars"
          title="Aura around avatars"
          description="Same wrapper pattern on avatar placeholders and image rings"
        >
          <ShowcaseTabs
            preview={
              <div className="flex flex-wrap items-end gap-6">
                <Sample label="aura + avatar">
                  <div className="aura">
                    <div className="avatar avatar-placeholder">
                      <div className="w-16 rounded-full bg-neutral text-neutral-content">
                        <span className="text-xl">MK</span>
                      </div>
                    </div>
                  </div>
                </Sample>
                <Sample label="aura aura-rainbow + avatar">
                  <div className="aura aura-rainbow">
                    <div className="avatar avatar-placeholder">
                      <div className="w-16 rounded-full bg-primary text-primary-content">
                        <span className="text-xl">WR</span>
                      </div>
                    </div>
                  </div>
                </Sample>
                <Sample label="aura aura-gold text-warning + avatar">
                  <div className="aura aura-gold">
                    <div className="avatar avatar-placeholder">
                      <div className="w-16 rounded-full bg-wash-blue text-base-content">
                        <span className="text-xl">GL</span>
                      </div>
                    </div>
                  </div>
                </Sample>
                <Sample label="aura aura-glow text-info + avatar">
                  <div className="aura aura-glow text-info">
                    <div className="avatar avatar-placeholder">
                      <div className="w-16 rounded-full bg-info text-info-content">
                        <span className="text-xl">AO</span>
                      </div>
                    </div>
                  </div>
                </Sample>
              </div>
            }
            html={avatarsHtml}
            jsx={daisyToJsx(avatarsHtml)}
          />
        </Section>

        <Section
          eyebrow="08 · Duration"
          title="Custom animation duration"
          description="Override spin speed with duration-* utilities"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Sample label="aura aura-rainbow duration-1000">
                  <div className="aura aura-rainbow duration-1000">
                    <div className="card w-full bg-base-100 shadow-sm">
                      <div className="card-body py-4">
                        <p className="text-sm">1000ms spin</p>
                      </div>
                    </div>
                  </div>
                </Sample>
                <Sample label="aura aura-rainbow duration-2000">
                  <div className="aura aura-rainbow duration-2000">
                    <div className="card w-full bg-base-100 shadow-sm">
                      <div className="card-body py-4">
                        <p className="text-sm">2000ms spin</p>
                      </div>
                    </div>
                  </div>
                </Sample>
                <Sample label="aura aura-rainbow (default 6s)">
                  <div className="aura aura-rainbow">
                    <div className="card w-full bg-base-100 shadow-sm">
                      <div className="card-body py-4">
                        <p className="text-sm">Default duration</p>
                      </div>
                    </div>
                  </div>
                </Sample>
              </div>
            }
            html={durationHtml}
            jsx={daisyToJsx(durationHtml)}
          />
        </Section>

        <Section
          eyebrow="09 · Showcase"
          title="Rainbow pricing card"
          description="Docs pattern: highlight a featured plan with aura-rainbow"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <Sample label="aura aura-rainbow + card">
                <div className="aura aura-rainbow">
                  <div className="card w-full max-w-sm bg-base-100 shadow-sm">
                    <div className="card-body">
                      <span className="badge badge-xs badge-warning">Most popular</span>
                      <div className="flex justify-between gap-2">
                        <h2 className="font-display text-3xl font-bold">Premium</h2>
                        <span className="text-xl">$29/mo</span>
                      </div>
                      <ul className="mt-4 flex flex-col gap-2 text-xs">
                        {[
                          'High-resolution plate scans',
                          'Custom wash templates',
                          'Batch pigment processing',
                          'AI-driven enhancements',
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <Check
                              className="mt-0.5 size-4 shrink-0 text-success"
                              strokeWidth={2}
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                        <li className="flex items-start gap-2 opacity-50">
                          <Check
                            className="mt-0.5 size-4 shrink-0 text-base-content/50"
                            strokeWidth={2}
                          />
                          <span className="line-through">Cloud collaboration</span>
                        </li>
                      </ul>
                      <div className="mt-4">
                        <button
                          type="button"
                          className="btn btn-primary btn-block cursor-pointer"
                        >
                          Subscribe
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Sample>
            }
            html={showcaseHtml}
            jsx={daisyToJsx(showcaseHtml)}
          />
        </Section>
      </div>
    </>
  )
}
