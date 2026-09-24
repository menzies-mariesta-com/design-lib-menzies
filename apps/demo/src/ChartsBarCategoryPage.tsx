import { BarChart } from '#plain/charts'
import {
  BarCustomLabelsDemo,
  BarGroupedStackedDemo,
  BarPatternedDemo,
  BarRaceDemo,
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
  plateStatusCounts,
  studioBudgetDelta,
} from './data/chart-samples'

const plateStatusWithTargets = plateStatusCounts.map((row) => ({
  x: row.status,
  y: row.count,
  goals: [
    {
      name: 'Target',
      value: row.count + 6,
      strokeWidth: 3,
      strokeHeight: 14,
    },
  ],
}))

export default function ChartsBarCategoryPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Bar charts
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Horizontal bar charts for plate status rows, grouped studio metrics, stacked pigment.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Bar"
          title="Basic bar"
          description="Single-series horizontal bars suited to longer workflow status"
        >
          <ShowcaseTabs
            preview={
              <BarChart
                height={280}
                categories={plateStatusCounts.map((s) => s.status)}
                series={[{ name: 'Plates', data: plateStatusCounts.map((s) => s.count) }]}
              />
            }
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="02 · Negative"
          title="Bar with negative"
          description="Budget surplus and deficit bars extend left of zero"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <BarChart
                height={300}
                categories={studioBudgetDelta.map((m) => m.month)}
                series={[{ name: 'Budget delta ($)', data: studioBudgetDelta.map((m) => m.delta) }]}
                xaxisTitle="USD"
              />
            }
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="03 · Grouped"
          title="Grouped bar"
          description="Plates and washes side by side"
        >
          <ShowcaseTabs
            preview={
              <BarChart
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
          eyebrow="04 · Stacked"
          title="Stacked bar"
          description="Pigment families stacked per month to show total wash volume"
        >
          <ShowcaseTabs
            preview={
              <BarChart
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
          eyebrow="05 · Stacked 100"
          title="Stacked bar 100"
          description="Each month normalized to 100% so pigment share is easy to compare"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <BarChart
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
          eyebrow="06 · Reversed"
          title="Reversed bar"
          description="Categories read bottom to top with reversed y-axis order"
        >
          <ShowcaseTabs
            preview={
              <BarChart
                height={280}
                reversed
                categories={plateStatusCounts.map((s) => s.status)}
                series={[{ name: 'Plates', data: plateStatusCounts.map((s) => s.count) }]}
              />
            }
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="07 · Markers"
          title="Bar with markers"
          description="Goal markers at target plate counts overlay each status bar"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <BarChart
                height={300}
                series={[
                  {
                    name: 'Plates',
                    data: plateStatusWithTargets,
                  },
                ]}
                options={{ legend: { show: false } }}
              />
            }
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="08 · Custom labels"
          title="Bar with custom data labels"
          description="Per-bar label formatters and conditional colors"
        >
          <ShowcaseTabs
            preview={<BarCustomLabelsDemo />}
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="09 · Grouped stacked"
          title="Grouped stacked bar"
          description="Multiple stacked series clusters side by side within each category"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={<BarGroupedStackedDemo />}
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="10 · Patterned"
          title="Patterned bar"
          description="SVG fill patterns on bars to distinguish pigment families in"
        >
          <ShowcaseTabs
            preview={<BarPatternedDemo />}
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="11 · Bar race"
          title="Horizontal bar race"
          description="Animated ranking bars that reorder as studio leaderboard values"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={<BarRaceDemo />}
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>
      </div>
    </>
  )
}
