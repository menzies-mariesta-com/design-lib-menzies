import { ArrowRight, Heart, Shirt } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import { WashUiBrand } from '@menzies-mariesta-com/menzies-design-wash-ui'
import type { AppPage } from './nav'
import StoreSupportRibbon from './StoreSupportRibbon'

type StoreMerchPageProps = {
  onNavigate: (page: AppPage) => void
}

export default function StoreMerchPage({ onNavigate }: StoreMerchPageProps) {
  return (
    <div className="relative space-y-6">
      <StoreSupportRibbon />
      <section className="wash-panel wash-panel-flush paper-grain overflow-hidden soak-in">
        <div className="relative px-5 py-8 md:px-8 md:py-10">
          <div
            className="pointer-events-none absolute inset-0 -z-0 opacity-90"
            aria-hidden
          >
            <span className="absolute -left-10 -top-12 size-56 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--wash-a)_65%,transparent)_0%,transparent_70%)] blur-2xl" />
            <span className="absolute -bottom-16 right-0 size-48 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--wash-b)_55%,transparent)_0%,transparent_70%)] blur-2xl" />
          </div>

          <div className="relative z-10 max-w-2xl">
            <p className="label-ink mb-2">Store</p>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-base-content md:text-4xl">
              Merch
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted md:text-base">
              Support the open libraries that help this project exist first, then
              support us.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="badge badge-soft badge-primary gap-1.5 px-3 py-3">
                <Heart className="size-3.5" strokeWidth={2} />
                Libraries first
              </span>
              <span className="badge badge-ghost gap-1.5 px-3 py-3">
                <Shirt className="size-3.5" strokeWidth={2} />
                Studio goods
              </span>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="merch-libraries-heading">
        <article className="wash-panel wash-panel-flush paper-grain soak-in soak-delay-1 overflow-hidden">
          <div className="border-b border-ink-border/70 px-5 py-4">
            <p className="label-ink">1. Open libraries</p>
            <h2
              id="merch-libraries-heading"
              className="font-display text-xl font-semibold md:text-2xl"
            >
              Support the stack that makes this possible
            </h2>
            <p className="mt-1 text-sm text-ink-muted">
              React, Tailwind CSS, daisyUI, Lucide, and the rest of the open stack
              keep <WashUiBrand as="span" /> alive. Sponsor them before anything
              with our name on it.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 p-5">
            <button
              type="button"
              className="btn btn-primary cursor-pointer"
              onClick={() => onNavigate('support')}
            >
              Open Support
              <ArrowRight className="size-4" strokeWidth={2} />
            </button>
            <p className="text-sm text-ink-muted">
              Official sponsor links live under Docs, Support.
            </p>
          </div>
        </article>
      </section>

      <section aria-labelledby="merch-studio-heading">
        <article className="wash-panel wash-panel-flush wash-panel-rose paper-grain soak-in soak-delay-2 overflow-hidden">
          <div className="border-b border-ink-border/70 px-5 py-4">
            <p className="label-ink">2. Then us</p>
            <h2
              id="merch-studio-heading"
              className="font-display text-xl font-semibold md:text-2xl"
            >
              Support <WashUiBrand as="span" /> merch
            </h2>
            <p className="mt-1 text-sm text-ink-muted">
              After the stack is covered, studio shirts, prints, and desk goods
              will land here as a second thank-you path.
            </p>
          </div>
          <div className="p-5 text-sm text-ink-muted">
            Product cards, variants, and checkout stay stubbed until the commerce
            templates ship. The order of gratitude will not change.
          </div>
        </article>
      </section>
    </div>
  )
}
