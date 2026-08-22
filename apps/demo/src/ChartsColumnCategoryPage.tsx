import { ColumnChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  monthlyPigmentUsage,
  monthlyPlates,
  seriesPlateCounts,
  seriesPlateCountsLongLabels,
  studioBudgetDelta,
} from './data/chart-samples'

type ColumnStubSectionProps = {
  eyebrow: string
  title: string
  description: string
  panel?: string
}

function ColumnStubSection({ eyebrow, title, description, panel }: ColumnStubSectionProps) {
  return (
    <GallerySection eyebrow={eyebrow} title={title} description={description} panel={panel}>
      <div className="flex min-h-[140px] flex-col items-center justify-center gap-3 rounded-box border border-dashed border-ink-border/60 bg-base-100/40 p-8 text-center">
        <span className="badge badge-outline badge-sm">Coming soon</span>
        <p className="max-w-md text-sm text-ink-muted">
          This ApexCharts column variant is planned for a future Wash UI release.
        </p>
      </div>
    </GallerySection>
  )
}

export default function ChartsColumnCategoryPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Column charts
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Vertical column charts for studio series counts, stacked pigment usage, grouped
          comparisons, and budget deltas. ColumnChart applies Wash pigment tokens, rounded tops,
          and optional data labels, stacking, and rotated category labels.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Column"
          title="Basic column"
          description="Single-series vertical columns grouped by studio series name."
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
          eyebrow="02 · Column labels"
          title="Column with data labels"
          description="Compact value labels above each column for at-a-glance plate counts."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <ColumnChart
                height={300}
                showDataLabels
                categories={seriesPlateCounts.map((s) => s.series)}
                series={[{ name: 'Plates', data: seriesPlateCounts.map((s) => s.plates) }]}
              />
            }
            html={`<!-- ColumnChart with data labels -->
<div class="wash-chart"></div>`}
            jsx={`import { ColumnChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<ColumnChart
  height={300}
  showDataLabels
  categories={['Atlantic Studies', 'Mineral Notes', 'Botanical Index', 'Coastal Sketches']}
  series={[{ name: 'Plates', data: [42, 28, 34, 19] }]}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="03 · Stacked"
          title="Stacked column"
          description="Pigment families stacked per month to show total wash volume composition."
        >
          <ShowcaseTabs
            preview={
              <ColumnChart
                height={320}
                stacked
                categories={monthlyPigmentUsage.map((m) => m.month)}
                series={[
                  { name: 'Cerulean', data: monthlyPigmentUsage.map((m) => m.cerulean) },
                  { name: 'Ochre', data: monthlyPigmentUsage.map((m) => m.ochre) },
                  { name: 'Madder', data: monthlyPigmentUsage.map((m) => m.madder) },
                ]}
                options={{ legend: { position: 'top' } }}
              />
            }
            html={`<!-- ColumnChart stacked -->
<div class="wash-chart"></div>`}
            jsx={`import { ColumnChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<ColumnChart
  height={320}
  stacked
  categories={['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']}
  series={[
    { name: 'Cerulean', data: [12, 14, 16, 15, 18, 17] },
    { name: 'Ochre', data: [8, 10, 11, 10, 12, 11] },
    { name: 'Madder', data: [6, 7, 8, 7, 9, 8] },
  ]}
  options={{ legend: { position: 'top' } }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="04 · Stacked 100"
          title="Stacked column 100"
          description="Each month normalized to 100% so pigment share is easy to compare."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <ColumnChart
                height={320}
                stacked100
                categories={monthlyPigmentUsage.map((m) => m.month)}
                series={[
                  { name: 'Cerulean', data: monthlyPigmentUsage.map((m) => m.cerulean) },
                  { name: 'Ochre', data: monthlyPigmentUsage.map((m) => m.ochre) },
                  { name: 'Madder', data: monthlyPigmentUsage.map((m) => m.madder) },
                ]}
                options={{ legend: { position: 'top' } }}
              />
            }
            html={`<!-- ColumnChart stacked 100% -->
<div class="wash-chart"></div>`}
            jsx={`import { ColumnChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<ColumnChart
  height={320}
  stacked100
  categories={['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']}
  series={[
    { name: 'Cerulean', data: [12, 14, 16, 15, 18, 17] },
    { name: 'Ochre', data: [8, 10, 11, 10, 12, 11] },
    { name: 'Madder', data: [6, 7, 8, 7, 9, 8] },
  ]}
  options={{ legend: { position: 'top' } }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="05 · Grouped"
          title="Grouped column"
          description="Plates and washes side by side for month-over-month comparison."
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
          eyebrow="06 · Negative"
          title="Column with negative"
          description="Budget surplus and deficit columns extend below zero for monthly studio P&amp;L."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <ColumnChart
                height={300}
                categories={studioBudgetDelta.map((m) => m.month)}
                series={[{ name: 'Budget delta ($)', data: studioBudgetDelta.map((m) => m.delta) }]}
                yaxisTitle="USD"
              />
            }
            html={`<!-- ColumnChart with negative values -->
<div class="wash-chart"></div>`}
            jsx={`import { ColumnChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<ColumnChart
  height={300}
  categories={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
  series={[{ name: 'Budget delta ($)', data: [420, -180, 310, -95, 540, 260] }]}
  yaxisTitle="USD"
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="07 · Rotated labels"
          title="Column with rotated labels"
          description="Long series names on the x-axis with -45 degree rotation to avoid overlap."
        >
          <ShowcaseTabs
            preview={
              <ColumnChart
                height={320}
                categories={seriesPlateCountsLongLabels.map((s) => s.series)}
                series={[
                  { name: 'Plates', data: seriesPlateCountsLongLabels.map((s) => s.plates) },
                ]}
                options={{
                  xaxis: {
                    labels: {
                      rotate: -45,
                      rotateAlways: true,
                    },
                  },
                }}
              />
            }
            html={`<!-- ColumnChart rotated x-axis labels -->
<div class="wash-chart"></div>`}
            jsx={`import { ColumnChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<ColumnChart
  height={320}
  categories={[
    'Atlantic Studies Collection',
    'Mineral Notes Archive',
    'Botanical Index Series',
    'Coastal Sketches Vol. II',
    'Urban Watercolor Studies',
  ]}
  series={[{ name: 'Plates', data: [42, 28, 34, 19, 31] }]}
  options={{
    xaxis: {
      labels: {
        rotate: -45,
        rotateAlways: true,
      },
    },
  }}
/>`}
          />
        </GallerySection>

        <ColumnStubSection
          eyebrow="08 · Group label"
          title="Column with group label"
          description="Category groups with a shared parent label spanning multiple columns."
        />

        <ColumnStubSection
          eyebrow="09 · Markers"
          title="Column with markers"
          description="Point markers overlaid on column tops for threshold or target highlights."
          panel="wash-panel-ochre"
        />

        <ColumnStubSection
          eyebrow="10 · Grouped stacked"
          title="Grouped stacked column"
          description="Multiple stacked series clusters side by side within each category group."
        />

        <ColumnStubSection
          eyebrow="11 · Distributed"
          title="Distributed columns"
          description="Each column receives a unique color from the Wash pigment palette."
          panel="wash-panel-rose"
        />

        <ColumnStubSection
          eyebrow="12 · Range"
          title="Range column"
          description="Floating columns between low and high values for batch yield ranges."
        />

        <ColumnStubSection
          eyebrow="13 · Drilldown"
          title="Column with drilldown"
          description="Click a column to reveal a detail breakdown for that studio series."
          panel="wash-panel-ochre"
        />

        <ColumnStubSection
          eyebrow="14 · Drilldown async"
          title="Column drilldown async"
          description="Lazy-loaded detail columns fetched when the user drills into a category."
        />

        <ColumnStubSection
          eyebrow="15 · Drilldown zoom"
          title="Column drilldown zoom"
          description="Animated zoom transition when expanding a column into its drilldown view."
          panel="wash-panel-rose"
        />

        <ColumnStubSection
          eyebrow="16 · Dynamic load"
          title="Dynamic loaded chart"
          description="Columns loaded on demand as the user scrolls or changes the date window."
        />

        <ColumnStubSection
          eyebrow="17 · Dumbbell"
          title="Dumbbell chart"
          description="Paired low/high markers connected by a line segment between two column values."
          panel="wash-panel-ochre"
        />
      </div>
    </>
  )
}
