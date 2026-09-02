import { ExternalLink, Heart } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import { WashUiBrand } from '@menzies-mariesta-com/menzies-design-wash-ui'
import {
  librarySupportLinks,
  washUiSupportLink,
  type SupportLink,
} from './data/support-links'

function SupportLinkCard({ item }: { item: SupportLink }) {
  return (
    <li>
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-full cursor-pointer items-start gap-3 rounded-box border border-ink-border/70 bg-base-100/80 px-4 py-3 transition-colors hover:border-primary/50 hover:bg-primary/5"
      >
        <span
          className={`flex size-9 shrink-0 items-center justify-center rounded-box ${item.accentClass}`}
        >
          <item.icon className="size-4" strokeWidth={2} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-medium">{item.name}</span>
          <span className="mt-0.5 block text-xs text-ink-muted">{item.description}</span>
          <span className="text-primary mt-1 inline-flex items-center gap-1 text-xs font-medium">
            {item.supportLabel}
            <ExternalLink className="size-3 opacity-70" strokeWidth={2} aria-hidden="true" />
          </span>
        </span>
      </a>
    </li>
  )
}

export default function SupportPage() {
  return (
    <>
      <section className="wash-panel paper-grain mb-6 overflow-hidden soak-in">
        <div className="relative px-5 py-8 md:px-8 md:py-10">
          <div
            className="pointer-events-none absolute inset-0 -z-0 opacity-90"
            aria-hidden
          >
            <span className="absolute -left-10 -top-12 size-56 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--wash-a)_65%,transparent)_0%,transparent_70%)] blur-2xl" />
            <span className="absolute -bottom-16 right-0 size-48 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--wash-b)_55%,transparent)_0%,transparent_70%)] blur-2xl" />
          </div>

          <div className="relative z-10 max-w-2xl">
            <p className="label-ink mb-2">Community</p>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-base-content md:text-4xl">
              Support open libraries
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted md:text-base">
              <WashUiBrand as="span" /> depends on a stack of open-source projects.
              Sponsor or donate to the libraries below first, then star the Wash UI
              repo to help the design system grow.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="badge badge-soft badge-primary gap-1.5 px-3 py-3">
                <Heart className="size-3.5" strokeWidth={2} />
                Libraries first
              </span>
              <span className="badge badge-ghost gap-1.5 px-3 py-3">
                Official sponsor links
              </span>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="support-libraries-heading" className="mb-6">
        <article className="wash-panel paper-grain soak-in soak-delay-1 overflow-hidden">
          <div className="border-b border-ink-border/70 px-5 py-4">
            <p className="label-ink">Open libraries</p>
            <h2
              id="support-libraries-heading"
              className="font-display text-xl font-semibold md:text-2xl"
            >
              Sponsor the stack
            </h2>
            <p className="mt-1 text-sm text-ink-muted">
              React, TypeScript, Tailwind CSS, daisyUI, Simple Icons, Lucide, Vite,
              and ApexCharts power pigments, components, icons, and charts in this
              studio.
            </p>
          </div>

          <ul className="grid gap-3 p-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {librarySupportLinks.map((item) => (
              <SupportLinkCard key={item.name} item={item} />
            ))}
          </ul>
        </article>
      </section>

      <section aria-labelledby="support-wash-ui-heading">
        <article className="wash-panel wash-panel-rose paper-grain soak-in soak-delay-2 overflow-hidden">
          <div className="border-b border-ink-border/70 px-5 py-4">
            <p className="label-ink">Wash UI</p>
            <h2
              id="support-wash-ui-heading"
              className="font-display text-xl font-semibold md:text-2xl"
            >
              Support this design system
            </h2>
            <p className="mt-1 text-sm text-ink-muted">
              Star the monorepo, open issues, or share feedback as the watercolor
              library evolves.
            </p>
          </div>

          <ul className="grid gap-3 p-5 sm:grid-cols-2">
            <SupportLinkCard item={washUiSupportLink} />
          </ul>
        </article>
      </section>
    </>
  )
}
