import type { AppPage } from './nav'
import {
  ArrowRight,
  ChartBar,
  ChartGantt,
  ChartLine,
  ChartNoAxesColumn,
  ChartPie,
  Combine,
  CircleGauge,
  Gauge,
  Grid2x2,
  ChartScatter,
  Layers,
  TrendingUp,
} from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import { DonutChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import { chartNavLinks, pigmentShare } from './data/chart-samples'

type ChartsOverviewPageProps = {
  onNavigate: (page: AppPage) => void
}

const navIcons = {
  'charts-line': ChartLine,
  'charts-area': ChartLine,
  'charts-range-area': Layers,
  'charts-column': ChartNoAxesColumn,
  'charts-bar': ChartBar,
  'charts-mixed': Combine,
  'charts-timeline': ChartGantt,
  'charts-pie': ChartPie,
  'charts-radialbar': CircleGauge,
  'charts-gauge': Gauge,
  'charts-sparklines': TrendingUp,
  'charts-heatmap': Grid2x2,
  'charts-scatter': ChartScatter,
} as const

export default function ChartsOverviewPage({ onNavigate }: ChartsOverviewPageProps) {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Charts
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Wash chart components from{' '}
          <span className="font-mono text-xs">@menzies-mariesta-com/menzies-design-wash-ui/charts</span>.
          Pigment-aware defaults and full chart types for studio analytics, KPIs, and desk stat blocks.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Quick preview"
          title="Pigment share donut"
          description="DonutChart reads Wash pigment tokens and updates when theme or mode changes."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <div className="mx-auto w-full max-w-md">
                <DonutChart
                  height={280}
                  series={pigmentShare.map((p) => p.value)}
                  labels={pigmentShare.map((p) => p.name)}
                  showLegend
                  options={{
                    legend: { position: 'bottom' },
                  }}
                />
              </div>
            }
            html={`<!-- DonutChart renders Wash chart canvas -->
<div class="wash-chart"></div>`}
            jsx={`import { DonutChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<DonutChart
  height={280}
  series={[24, 18, 16, 14, 12, 16]}
  labels={['Cerulean', 'Ochre', 'Madder', 'Indigo', 'Viridian', 'Other']}
  showLegend
  options={{ legend: { position: 'bottom' } }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="02 · Chart types"
          title="Browse by family"
          description="Line, area, range area, column, bar, mixed, pie, radial bar, gauge, sparklines, timeline, heatmap, and scatter charts each have a dedicated gallery page."
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {chartNavLinks.map((link) => {
              const Icon = navIcons[link.page]
              return (
                <button
                  key={link.page}
                  type="button"
                  className="wash-panel cursor-pointer rounded-box border border-ink-border/70 p-5 text-left transition hover:border-primary/40"
                  onClick={() => onNavigate(link.page)}
                >
                  <div className="mb-3 flex items-center gap-2 text-primary">
                    <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                    <span className="font-medium">{link.label}</span>
                  </div>
                  <p className="text-sm text-ink-muted">{link.description}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm text-primary">
                    Open gallery
                    <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                </button>
              )
            })}
          </div>
        </GallerySection>
      </div>
    </>
  )
}
