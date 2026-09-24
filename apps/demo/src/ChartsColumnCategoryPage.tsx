import { ColumnChart } from '#plain/charts'
import {
  ColumnDistributedDemo,
  ColumnDrilldownAsyncDemo,
  ColumnDrilldownDemo,
  ColumnDrilldownZoomDemo,
  ColumnDumbbellDemo,
  ColumnDynamicLoadDemo,
  ColumnGroupLabelDemo,
  ColumnGroupedStackedDemo,
  ColumnMarkersDemo,
  ColumnRangeDemo,
} from './chart-demos/cartesian-demos'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  chartHtml,
  chartJsx,
  chartSvelteFiles,
} from './snippets/svelte/charts'
import {
  monthlyPigmentUsage,
  monthlyPlates,
  seriesPlateCounts,
  seriesPlateCountsLongLabels,
  studioBudgetDelta,
} from './data/chart-samples'

export default function ChartsColumnCategoryPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Column charts
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Vertical column charts for studio series counts, stacked pigment usage, grouped.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Column"
          title="Basic column"
          description="Single-series vertical columns grouped by studio series name"
        >
          <ShowcaseTabs
            preview={
              <ColumnChart
                height={300}
                categories={seriesPlateCounts.map((s) => s.series)}
                series={[{ name: 'Plates', data: seriesPlateCounts.map((s) => s.plates) }]}
              />
            }
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="02 · Column labels"
          title="Column with data labels"
          description="Compact value labels above each column for at-a-glance plate counts"
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
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="03 · Stacked"
          title="Stacked column"
          description="Pigment families stacked per month to show total wash volume"
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
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="04 · Stacked 100"
          title="Stacked column 100"
          description="Each month normalized to 100% so pigment share is easy to compare"
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
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="05 · Grouped"
          title="Grouped column"
          description="Plates and washes side by side for month-over-month comparison"
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
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="06 · Negative"
          title="Column with negative"
          description="Budget surplus and deficit columns extend below zero"
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
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="07 · Rotated labels"
          title="Column with rotated labels"
          description="Long series names on the x-axis"
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
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="08 · Group label"
          title="Column with group label"
          description="Category groups with a shared parent label spanning multiple"
        >
          <ShowcaseTabs
            preview={<ColumnGroupLabelDemo />}
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="09 · Markers"
          title="Column with markers"
          description="Point markers overlaid on column tops"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={<ColumnMarkersDemo />}
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="10 · Grouped stacked"
          title="Grouped stacked column"
          description="Multiple stacked series clusters side by side within each category"
        >
          <ShowcaseTabs
            preview={<ColumnGroupedStackedDemo />}
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="11 · Distributed"
          title="Distributed columns"
          description="Each column receives a unique color from the Wash pigment palette"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={<ColumnDistributedDemo />}
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="12 · Range"
          title="Range column"
          description="Floating columns between low and high values for batch yield ranges"
        >
          <ShowcaseTabs
            preview={<ColumnRangeDemo />}
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="13 · Drilldown"
          title="Column with drilldown"
          description="Click a column to reveal a detail breakdown for that studio series"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={<ColumnDrilldownDemo />}
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="14 · Drilldown async"
          title="Column drilldown async"
          description="Lazy-loaded detail columns fetched when the user drills into a"
        >
          <ShowcaseTabs
            preview={<ColumnDrilldownAsyncDemo />}
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="15 · Drilldown zoom"
          title="Column drilldown zoom"
          description="Animated zoom transition when expanding a column into its drilldown"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={<ColumnDrilldownZoomDemo />}
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="16 · Dynamic load"
          title="Dynamic loaded chart"
          description="Columns loaded on demand as the user scrolls or changes the date"
        >
          <ShowcaseTabs
            preview={<ColumnDynamicLoadDemo />}
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="17 · Dumbbell"
          title="Dumbbell chart"
          description="Paired low/high markers connected by a line segment between two"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={<ColumnDumbbellDemo />}
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>
      </div>
    </>
  )
}
