import {
  DonutChart,
  PieChart,
} from '@menzies-mariesta-com/menzies-design-wash-ui/charts'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import { pigmentShare } from './data/chart-samples'

type PieStubSectionProps = {
  eyebrow: string
  title: string
  description: string
  panel?: string
}

function PieStubSection({ eyebrow, title, description, panel }: PieStubSectionProps) {
  return (
    <GallerySection eyebrow={eyebrow} title={title} description={description} panel={panel}>
      <div className="flex min-h-[140px] flex-col items-center justify-center gap-3 rounded-box border border-dashed border-ink-border/60 bg-base-100/40 p-8 text-center">
        <span className="badge badge-outline badge-sm">Coming soon</span>
        <p className="max-w-md text-sm text-ink-muted">
          This ApexCharts pie or donut variant is planned for a future Wash UI release.
        </p>
      </div>
    </GallerySection>
  )
}

const pigmentSeries = pigmentShare.map((p) => p.value)
const pigmentLabels = pigmentShare.map((p) => p.name)

export default function ChartsPieCategoryPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Pie / Donut charts
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Circular charts for pigment share, portfolio breakdowns, and studio composition.
          PieChart and DonutChart apply Wash pigment tokens, optional monochrome shades,
          gradient fills, and rounded segment caps. Radial gauges live on other gallery pages.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Pie"
          title="Simple pie"
          description="Classic pie chart showing relative wash volume by pigment family."
        >
          <ShowcaseTabs
            preview={
              <div className="mx-auto w-full max-w-md">
                <PieChart
                  height={300}
                  series={pigmentSeries}
                  labels={pigmentLabels}
                  showLegend
                  options={{ legend: { position: 'bottom' } }}
                />
              </div>
            }
            html={`<!-- PieChart canvas -->
<div class="wash-chart"></div>`}
            jsx={`import { PieChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<PieChart
  height={300}
  series={[24, 18, 16, 14, 12, 16]}
  labels={['Cerulean', 'Ochre', 'Madder', 'Indigo', 'Viridian', 'Other']}
  showLegend
  options={{ legend: { position: 'bottom' } }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="02 · Donut"
          title="Simple donut"
          description="DonutChart with a hollow center and total label."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <div className="mx-auto w-full max-w-md">
                <DonutChart
                  height={300}
                  series={pigmentSeries}
                  labels={pigmentLabels}
                  showLegend
                  donutSize="68%"
                  options={{
                    legend: { position: 'bottom' },
                    plotOptions: {
                      pie: {
                        donut: {
                          labels: {
                            total: { label: 'Washes' },
                          },
                        },
                      },
                    },
                  }}
                />
              </div>
            }
            html={`<!-- DonutChart canvas -->
<div class="wash-chart"></div>`}
            jsx={`import { DonutChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<DonutChart
  height={300}
  series={[24, 18, 16, 14, 12, 16]}
  labels={['Cerulean', 'Ochre', 'Madder', 'Indigo', 'Viridian', 'Other']}
  showLegend
  donutSize="68%"
  options={{
    legend: { position: 'bottom' },
    plotOptions: { pie: { donut: { labels: { total: { label: 'Washes' } } } } },
  }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="03 · Monochrome"
          title="Monochrome pie"
          description="Single-hue pigment shades for print-friendly or minimal studio reports."
        >
          <ShowcaseTabs
            preview={
              <div className="mx-auto w-full max-w-md">
                <PieChart
                  height={300}
                  series={pigmentSeries}
                  labels={pigmentLabels}
                  showLegend
                  monochrome
                  options={{ legend: { position: 'bottom' } }}
                />
              </div>
            }
            html={`<!-- PieChart monochrome -->
<div class="wash-chart"></div>`}
            jsx={`import { PieChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<PieChart
  height={300}
  series={[24, 18, 16, 14, 12, 16]}
  labels={['Cerulean', 'Ochre', 'Madder', 'Indigo', 'Viridian', 'Other']}
  showLegend
  monochrome
  options={{ legend: { position: 'bottom' } }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="04 · Gradient"
          title="Gradient donut"
          description="Soft vertical gradient fill on each donut segment."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <div className="mx-auto w-full max-w-md">
                <DonutChart
                  height={300}
                  series={pigmentSeries}
                  labels={pigmentLabels}
                  showLegend
                  gradientFill
                  options={{ legend: { position: 'bottom' } }}
                />
              </div>
            }
            html={`<!-- DonutChart gradient fill -->
<div class="wash-chart"></div>`}
            jsx={`import { DonutChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<DonutChart
  height={300}
  series={[24, 18, 16, 14, 12, 16]}
  labels={['Cerulean', 'Ochre', 'Madder', 'Indigo', 'Viridian', 'Other']}
  showLegend
  gradientFill
  options={{ legend: { position: 'bottom' } }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="05 · Rounded"
          title="Rounded donut"
          description="Round stroke caps on each segment for a softer circular breakdown."
        >
          <ShowcaseTabs
            preview={
              <div className="mx-auto w-full max-w-md">
                <DonutChart
                  height={300}
                  series={pigmentSeries}
                  labels={pigmentLabels}
                  showLegend
                  rounded
                  donutSize="72%"
                  options={{ legend: { position: 'bottom' } }}
                />
              </div>
            }
            html={`<!-- DonutChart rounded caps -->
<div class="wash-chart"></div>`}
            jsx={`import { DonutChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<DonutChart
  height={300}
  series={[24, 18, 16, 14, 12, 16]}
  labels={['Cerulean', 'Ochre', 'Madder', 'Indigo', 'Viridian', 'Other']}
  showLegend
  rounded
  donutSize="72%"
  options={{ legend: { position: 'bottom' } }}
/>`}
          />
        </GallerySection>

        <PieStubSection
          eyebrow="06 · Pattern"
          title="Donut with pattern"
          description="SVG fill patterns on donut segments for accessible color-blind studio views."
          panel="wash-panel-rose"
        />

        <PieStubSection
          eyebrow="07 · Spaced"
          title="Rounded spaced donut"
          description="Rounded caps with gap spacing between segments for a gauge-like breakdown."
        />

        <PieStubSection
          eyebrow="08 · Image"
          title="Pie with image"
          description="Pattern or image fill inside pie slices for branded pigment portfolios."
          panel="wash-panel-ochre"
        />

        <PieStubSection
          eyebrow="09 · Drilldown"
          title="Donut with drilldown"
          description="Click a segment to drill into nested pigment sub-families."
        />

        <PieStubSection
          eyebrow="10 · Update"
          title="Donut update"
          description="Animated segment updates when live studio share data changes."
          panel="wash-panel-rose"
        />
      </div>
    </>
  )
}
