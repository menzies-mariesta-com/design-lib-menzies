import { RadialBarChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  critiqueCompletionGauge,
  pigmentRadialScores,
  studioPigmentLoad,
} from './data/chart-samples'

export default function ChartsRadialBarCategoryPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          RadialBar charts
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Circular progress rings., multi-track pigment scores, and partial gauges.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · RadialBar"
          title="Circle chart"
          description="Single radial bar for compact studio load or completion metrics"
        >
          <ShowcaseTabs
            preview={
              <div className="mx-auto w-full max-w-xs">
                <RadialBarChart
                  height={300}
                  series={[studioPigmentLoad.value]}
                  labels={[studioPigmentLoad.label]}
                  showLegend={false}
                  hollowSize="65%"
                  options={{
                    plotOptions: {
                      radialBar: {
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
            html={`<!-- RadialBarChart single circle -->
<div class="wash-chart"></div>`}
            jsx={`import { RadialBarChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<RadialBarChart
  height={300}
  series={[73]}
  labels={['Pigment load']}
  showLegend={false}
  hollowSize="65%"
  options={{
    plotOptions: {
      radialBar: {
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

        <GallerySection
          eyebrow="02 · Multiple"
          title="Circle chart multiple"
          description="Concentric radial tracks for side-by-side pigment quality scores"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <div className="mx-auto w-full max-w-lg">
                <RadialBarChart
                  height={340}
                  series={pigmentRadialScores.map((p) => p.score)}
                  labels={pigmentRadialScores.map((p) => p.pigment)}
                  showLegend
                  hollowSize="30%"
                  options={{
                    legend: { position: 'bottom' },
                  }}
                />
              </div>
            }
            html={`<!-- RadialBarChart multiple tracks -->
<div class="wash-chart"></div>`}
            jsx={`import { RadialBarChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<RadialBarChart
  height={340}
  series={[82, 68, 74, 61]}
  labels={['Cerulean', 'Ochre', 'Madder', 'Indigo']}
  showLegend
  hollowSize="30%"
  options={{ legend: { position: 'bottom' } }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="03 · Custom angle"
          title="Circle custom angle"
          description="Partial radial arc via startAngle and endAngle"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <div className="mx-auto w-full max-w-xs">
                <RadialBarChart
                  height={280}
                  series={[critiqueCompletionGauge.value]}
                  labels={[critiqueCompletionGauge.label]}
                  showLegend={false}
                  startAngle={critiqueCompletionGauge.startAngle}
                  endAngle={critiqueCompletionGauge.endAngle}
                  hollowSize="65%"
                  options={{
                    plotOptions: {
                      radialBar: {
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
            html={`<!-- RadialBarChart custom arc -->
<div class="wash-chart"></div>`}
            jsx={`import { RadialBarChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<RadialBarChart
  height={280}
  series={[73]}
  labels={['Critiques done']}
  showLegend={false}
  startAngle={-135}
  endAngle={135}
  hollowSize="65%"
  options={{
    plotOptions: {
      radialBar: {
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
