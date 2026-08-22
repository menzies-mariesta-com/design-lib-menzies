import {
  AreaChart,
  LineChart,
} from '@menzies-mariesta-com/menzies-design-wash-ui/charts'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  monthlyPlates,
  pigmentLoadTrend,
  washWeekLabels,
  weeklyWashCounts,
} from './data/chart-samples'

export default function ChartsLinePage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Line and area charts
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Track washes, pigment load, and plate output over time. LineChart and AreaChart apply
          smooth curves, token colors, and reduced-motion aware animations.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Line"
          title="Weekly wash trend"
          description="Single-series line chart for daily wash counts across the studio week."
        >
          <ShowcaseTabs
            preview={
              <LineChart
                height={300}
                categories={[...washWeekLabels]}
                series={[{ name: 'Washes', data: weeklyWashCounts }]}
                options={{
                  stroke: { width: 3 },
                  markers: { size: 4, hover: { size: 6 } },
                }}
              />
            }
            html={`<!-- LineChart canvas -->
<div class="wash-chart"></div>`}
            jsx={`import { LineChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<LineChart
  height={300}
  categories={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
  series={[{ name: 'Washes', data: [12, 18, 14, 22, 19, 8, 11] }]}
  options={{
    stroke: { width: 3 },
    markers: { size: 4, hover: { size: 6 } },
  }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="02 · Area"
          title="Pigment load gradient"
          description="AreaChart fills under the curve with a soft pigment gradient."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <AreaChart
                height={300}
                categories={[...washWeekLabels]}
                series={[{ name: 'Load %', data: pigmentLoadTrend }]}
              />
            }
            html={`<!-- AreaChart canvas -->
<div class="wash-chart"></div>`}
            jsx={`import { AreaChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<AreaChart
  height={300}
  categories={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
  series={[{ name: 'Load %', data: [32, 38, 35, 44, 41, 48, 52] }]}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="03 · Multi-series"
          title="Plates and washes"
          description="Compare new plates against total washes per month with two line series."
        >
          <ShowcaseTabs
            preview={
              <LineChart
                height={320}
                categories={monthlyPlates.map((m) => m.month)}
                series={[
                  { name: 'Plates', data: monthlyPlates.map((m) => m.plates) },
                  { name: 'Washes', data: monthlyPlates.map((m) => m.washes) },
                ]}
                options={{
                  legend: { position: 'top' },
                  stroke: { width: [3, 2], dashArray: [0, 4] },
                }}
              />
            }
            html={`<!-- LineChart multi-series -->
<div class="wash-chart"></div>`}
            jsx={`import { LineChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<LineChart
  height={320}
  categories={['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']}
  series={[
    { name: 'Plates', data: [18, 22, 26, 24, 31, 28] },
    { name: 'Washes', data: [42, 58, 64, 61, 78, 72] },
  ]}
  options={{
    legend: { position: 'top' },
    stroke: { width: [3, 2], dashArray: [0, 4] },
  }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="04 · Stacked area"
          title="Stacked wash layers"
          description="Two area series stacked to show glaze vs base wash volume."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <AreaChart
                height={320}
                stacked
                categories={[...washWeekLabels]}
                series={[
                  { name: 'Base wash', data: [8, 10, 9, 12, 11, 6, 7] },
                  { name: 'Glaze', data: [4, 8, 5, 10, 8, 2, 4] },
                ]}
                options={{
                  legend: { position: 'top' },
                  fill: { opacity: 0.75 },
                }}
              />
            }
            html={`<!-- AreaChart stacked -->
<div class="wash-chart"></div>`}
            jsx={`import { AreaChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<AreaChart
  height={320}
  stacked
  categories={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
  series={[
    { name: 'Base wash', data: [8, 10, 9, 12, 11, 6, 7] },
    { name: 'Glaze', data: [4, 8, 5, 10, 8, 2, 4] },
  ]}
  options={{ legend: { position: 'top' }, fill: { opacity: 0.75 } }}
/>`}
          />
        </GallerySection>
      </div>
    </>
  )
}
