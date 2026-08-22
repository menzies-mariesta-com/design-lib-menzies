import {
  DonutChart,
  PieChart,
  RadialBarChart,
  WashChart,
} from '@menzies-mariesta-com/menzies-design-wash-ui/charts'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import { pigmentRadialScores, pigmentShare } from './data/chart-samples'

export default function ChartsPiePage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Pie, donut, and radial
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Circular charts for pigment share, portfolio breakdowns, and radial progress-style scores.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Pie"
          title="Pigment usage share"
          description="Classic pie chart showing relative wash volume by pigment family."
        >
          <ShowcaseTabs
            preview={
              <div className="mx-auto w-full max-w-md">
                <PieChart
                  height={300}
                  series={pigmentShare.map((p) => p.value)}
                  labels={pigmentShare.map((p) => p.name)}
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
          title="Studio pigment donut"
          description="DonutChart with a hollow center and total label."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <div className="mx-auto w-full max-w-md">
                <DonutChart
                  height={300}
                  series={pigmentShare.map((p) => p.value)}
                  labels={pigmentShare.map((p) => p.name)}
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
          eyebrow="03 · Radial bar"
          title="Pigment quality scores"
          description="RadialBarChart for compact score comparison across pigment families."
        >
          <ShowcaseTabs
            preview={
              <div className="mx-auto w-full max-w-lg">
                <RadialBarChart
                  height={340}
                  series={pigmentRadialScores.map((p) => p.score)}
                  labels={pigmentRadialScores.map((p) => p.pigment)}
                  showLegend
                  options={{
                    legend: { position: 'bottom' },
                    plotOptions: {
                      radialBar: {
                        hollow: { size: '30%' },
                      },
                    },
                  }}
                />
              </div>
            }
            html={`<!-- RadialBarChart canvas -->
<div class="wash-chart"></div>`}
            jsx={`import { RadialBarChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<RadialBarChart
  height={340}
  series={[82, 68, 74, 61]}
  labels={['Cerulean', 'Ochre', 'Madder', 'Indigo']}
  showLegend
  options={{
    legend: { position: 'bottom' },
    plotOptions: { radialBar: { hollow: { size: '30%' } } },
  }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="04 · Semi donut"
          title="Critique completion gauge"
          description="Partial radial bar as a gauge for studio critique throughput."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <div className="mx-auto w-full max-w-xs">
                <WashChart
                  type="radialBar"
                  height={280}
                  series={[73]}
                  options={{
                    labels: ['Critiques done'],
                    plotOptions: {
                      radialBar: {
                        startAngle: -135,
                        endAngle: 135,
                        hollow: { size: '65%' },
                        dataLabels: {
                          name: { offsetY: -8, fontSize: '12px' },
                          value: { offsetY: 4, fontSize: '22px', fontWeight: '600' },
                        },
                      },
                    },
                  }}
                />
              </div>
            }
            html={`<!-- Radial gauge -->
<div class="wash-chart"></div>`}
            jsx={`import { WashChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<WashChart
  type="radialBar"
  height={280}
  series={[73]}
  options={{
    labels: ['Critiques done'],
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: { size: '65%' },
        dataLabels: {
          name: { offsetY: -8, fontSize: '12px' },
          value: { offsetY: 4, fontSize: '22px', fontWeight: '600' },
        },
      },
    },
  }}
/>`}
          />
        </GallerySection>
      </div>
    </>
  )
}
