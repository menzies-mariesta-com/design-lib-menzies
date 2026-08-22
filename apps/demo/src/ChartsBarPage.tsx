import {
  BarChart,
  ColumnChart,
  MixedChart,
} from '@menzies-mariesta-com/menzies-design-wash-ui/charts'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  monthlyPlates,
  plateStatusCounts,
  seriesPlateCounts,
} from './data/chart-samples'

export default function ChartsBarPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Bar and column charts
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          ColumnChart for vertical counts, BarChart for horizontal status rows, and MixedChart for
          plates vs washes.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Column"
          title="Plates by series"
          description="Vertical column chart grouped by studio series name."
        >
          <ShowcaseTabs
            preview={
              <ColumnChart
                height={300}
                categories={seriesPlateCounts.map((s) => s.series)}
                series={[{ name: 'Plates', data: seriesPlateCounts.map((s) => s.plates) }]}
              />
            }
            html={`<!-- ColumnChart canvas -->
<div class="wash-chart"></div>`}
            jsx={`import { ColumnChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<ColumnChart
  height={300}
  categories={['Atlantic Studies', 'Mineral Notes', 'Botanical Index', 'Coastal Sketches']}
  series={[{ name: 'Plates', data: [42, 28, 34, 19] }]}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="02 · Horizontal bar"
          title="Plate status breakdown"
          description="BarChart renders horizontal bars suited to longer status labels."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <BarChart
                height={280}
                categories={plateStatusCounts.map((s) => s.status)}
                series={[{ name: 'Plates', data: plateStatusCounts.map((s) => s.count) }]}
              />
            }
            html={`<!-- BarChart horizontal -->
<div class="wash-chart"></div>`}
            jsx={`import { BarChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<BarChart
  height={280}
  categories={['Draft', 'In wash', 'Review', 'Archived']}
  series={[{ name: 'Plates', data: [8, 14, 11, 22] }]}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="03 · Grouped column"
          title="Monthly plates and washes"
          description="Two column series side by side for month-over-month comparison."
        >
          <ShowcaseTabs
            preview={
              <ColumnChart
                height={320}
                categories={monthlyPlates.map((m) => m.month)}
                series={[
                  { name: 'Plates', data: monthlyPlates.map((m) => m.plates) },
                  { name: 'Washes', data: monthlyPlates.map((m) => m.washes) },
                ]}
                options={{ legend: { position: 'top' } }}
              />
            }
            html={`<!-- ColumnChart grouped -->
<div class="wash-chart"></div>`}
            jsx={`import { ColumnChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<ColumnChart
  height={320}
  categories={['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']}
  series={[
    { name: 'Plates', data: [18, 22, 26, 24, 31, 28] },
    { name: 'Washes', data: [42, 58, 64, 61, 78, 72] },
  ]}
  options={{ legend: { position: 'top' } }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="04 · Mixed"
          title="Plates (column) + washes (line)"
          description="MixedChart combines column bars with a smooth line overlay."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <MixedChart
                height={320}
                title="Plates and washes"
                categories={monthlyPlates.map((m) => m.month)}
                series={[
                  {
                    name: 'Plates',
                    type: 'column',
                    data: monthlyPlates.map((m) => m.plates),
                  },
                  {
                    name: 'Washes',
                    type: 'line',
                    data: monthlyPlates.map((m) => m.washes),
                  },
                ]}
              />
            }
            html={`<!-- MixedChart canvas -->
<div class="wash-chart"></div>`}
            jsx={`import { MixedChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<MixedChart
  height={320}
  title="Plates and washes"
  categories={['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']}
  series={[
    { name: 'Plates', type: 'column', data: [18, 22, 26, 24, 31, 28] },
    { name: 'Washes', type: 'line', data: [42, 58, 64, 61, 78, 72] },
  ]}
/>`}
          />
        </GallerySection>
      </div>
    </>
  )
}
