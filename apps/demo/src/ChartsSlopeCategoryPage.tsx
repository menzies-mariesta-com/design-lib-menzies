import { SlopeChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import { basicSlopeSample, multiGroupSlopeSample } from './data/chart-samples'

export default function ChartsSlopeCategoryPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Slope charts
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Slope charts compare change between two or more points on a shared axis.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Basic slope"
          title="Plate throughput: Jan to Feb"
          description="Basic Slope compares pigment families between two periods on one"
        >
          <ShowcaseTabs
            preview={
              <SlopeChart
                height={320}
                title={basicSlopeSample.title}
                series={basicSlopeSample.series.map((item) => ({
                  name: item.name,
                  data: item.data.map((point) => ({ ...point })),
                }))}
                options={{ legend: { position: 'top' } }}
              />
            }
            html={`<!-- SlopeChart canvas -->
<div class="wash-chart"></div>`}
            jsx={`import { SlopeChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<SlopeChart
  height={320}
  title="Plate throughput: Jan to Feb"
  series={[
    {
      name: 'Cerulean',
      data: [
        { x: 'Jan', y: 43 },
        { x: 'Feb', y: 58 },
      ],
    },
  ]}
  options={{ legend: { position: 'top' } }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="02 · Multi group slope"
          title="Studio desk rank by quarter"
          description="Multi Group Slope tracks four studio wings across Q1 to Q3"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <SlopeChart
                height={360}
                title={multiGroupSlopeSample.title}
                series={multiGroupSlopeSample.series.map((item) => ({
                  name: item.name,
                  data: item.data.map((point) => ({ ...point })),
                }))}
                showDataLabels
                options={{
                  legend: { show: false },
                  tooltip: { shared: true, intersect: false },
                  stroke: {
                    width: [2, 3, 4, 2],
                    dashArray: [0, 0, 5, 2],
                  },
                }}
              />
            }
            html={`<!-- SlopeChart multi-group canvas -->
<div class="wash-chart"></div>`}
            jsx={`import { SlopeChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<SlopeChart
  height={360}
  title="Studio desk rank by quarter"
  showDataLabels
  options={{
    legend: { show: false },
    tooltip: { shared: true, intersect: false },
    stroke: { width: [2, 3, 4, 2], dashArray: [0, 0, 5, 2] },
  }}
/>`}
          />
        </GallerySection>
      </div>
    </>
  )
}
