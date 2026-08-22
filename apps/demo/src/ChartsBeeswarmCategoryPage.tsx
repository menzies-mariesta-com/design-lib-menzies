import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'

function PremiumComingSoonPreview({ label }: { label: string }) {
  return (
    <div className="flex h-[320px] flex-col items-center justify-center gap-2 rounded-box border border-dashed border-warning/40 bg-warning/5">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="badge badge-warning badge-sm">Premium</span>
        <span className="badge badge-outline badge-sm">Coming soon</span>
      </div>
      <p className="max-w-sm px-4 text-center text-sm text-ink-muted">{label}</p>
    </div>
  )
}

export default function ChartsBeeswarmCategoryPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Beeswarm Charts
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Beeswarm plots jitter observations along a categorical axis without overlap, revealing
          density and outliers in one view. BeeswarmChart will wrap WashChart with Apex Premium
          beeswarm types once the Premium license tier is available in the design system.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Species"
          title="Body mass by species"
          description="Classic penguin body-mass swarms grouped by species. Each dot is one observation, spread horizontally to avoid overlap."
        >
          <ShowcaseTabs
            preview={
              <PremiumComingSoonPreview label="Body mass by species beeswarm requires Apex Premium. Demo coming soon." />
            }
            html={'<!-- BeeswarmChart body mass by species (Premium, coming soon) -->\n<div class="wash-chart"></div>'}
            jsx={`// BeeswarmChart body mass by species — Apex Premium, coming soon
// import { BeeswarmChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="02 · Department"
          title="Salary by department"
          description="Compare compensation spreads across departments with one dot per employee, jittered into readable lanes."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <PremiumComingSoonPreview label="Salary by department beeswarm requires Apex Premium. Demo coming soon." />
            }
            html={'<!-- BeeswarmChart salary by department (Premium, coming soon) -->\n<div class="wash-chart"></div>'}
            jsx={`// BeeswarmChart salary by department — Apex Premium, coming soon`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="03 · Bubble"
          title="Game scores bubble"
          description="Combine beeswarm jitter with bubble radius encoding for score magnitude across game categories."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <PremiumComingSoonPreview label="Game scores bubble beeswarm requires Apex Premium. Demo coming soon." />
            }
            html={'<!-- BeeswarmChart game scores bubble (Premium, coming soon) -->\n<div class="wash-chart"></div>'}
            jsx={`// BeeswarmChart game scores bubble — Apex Premium, coming soon`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="04 · Expectancy"
          title="Life expectancy swarm"
          description="Multi-series beeswarm comparing life expectancy distributions by region over time."
          panel="wash-panel-slate"
        >
          <ShowcaseTabs
            preview={
              <PremiumComingSoonPreview label="Life expectancy swarm beeswarm requires Apex Premium. Demo coming soon." />
            }
            html={'<!-- BeeswarmChart life expectancy swarm (Premium, coming soon) -->\n<div class="wash-chart"></div>'}
            jsx={`// BeeswarmChart life expectancy swarm — Apex Premium, coming soon`}
          />
        </GallerySection>
      </div>
    </>
  )
}
