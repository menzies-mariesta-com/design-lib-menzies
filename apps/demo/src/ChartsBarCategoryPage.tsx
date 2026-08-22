import { BarChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  monthlyPigmentUsage,
  monthlyPlates,
  plateStatusCounts,
  studioBudgetDelta,
} from './data/chart-samples'

type BarStubSectionProps = {
  eyebrow: string
  title: string
  description: string
  panel?: string
}

function BarStubSection({ eyebrow, title, description, panel }: BarStubSectionProps) {
  return (
    <GallerySection eyebrow={eyebrow} title={title} description={description} panel={panel}>
      <div className="flex min-h-[140px] flex-col items-center justify-center gap-3 rounded-box border border-dashed border-ink-border/60 bg-base-100/40 p-8 text-center">
        <span className="badge badge-outline badge-sm">Coming soon</span>
        <p className="max-w-md text-sm text-ink-muted">
          This ApexCharts bar variant is planned for a future Wash UI release.
        </p>
      </div>
    </GallerySection>
  )
}

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
          Horizontal bar charts for plate status rows, grouped studio metrics, stacked pigment
          usage, budget deltas, and target markers. BarChart applies Wash pigment tokens, rounded
          ends, and optional stacking, data labels, and reversed category order. Line, column,
          and area combos live on the Mixed charts gallery page.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Bar"
          title="Basic bar"
          description="Single-series horizontal bars suited to longer workflow status labels."
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
          eyebrow="02 · Negative"
          title="Bar with negative"
          description="Budget surplus and deficit bars extend left of zero for monthly studio P&amp;L."
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
            html={`<!-- BarChart with negative values -->
<div class="wash-chart"></div>`}
            jsx={`import { BarChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<BarChart
  height={300}
  categories={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
  series={[{ name: 'Budget delta ($)', data: [420, -180, 310, -95, 540, 260] }]}
  xaxisTitle="USD"
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="03 · Grouped"
          title="Grouped bar"
          description="Plates and washes side by side for month-over-month horizontal comparison."
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
            html={`<!-- BarChart grouped -->
<div class="wash-chart"></div>`}
            jsx={`import { BarChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<BarChart
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
          eyebrow="04 · Stacked"
          title="Stacked bar"
          description="Pigment families stacked per month to show total wash volume composition."
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
            html={`<!-- BarChart stacked -->
<div class="wash-chart"></div>`}
            jsx={`import { BarChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<BarChart
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
          eyebrow="05 · Stacked 100"
          title="Stacked bar 100"
          description="Each month normalized to 100% so pigment share is easy to compare."
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
            html={`<!-- BarChart stacked 100% -->
<div class="wash-chart"></div>`}
            jsx={`import { BarChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<BarChart
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
          eyebrow="06 · Reversed"
          title="Reversed bar"
          description="Categories read bottom to top with reversed y-axis order."
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
            html={`<!-- BarChart reversed y-axis -->
<div class="wash-chart"></div>`}
            jsx={`import { BarChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<BarChart
  height={280}
  reversed
  categories={['Draft', 'In wash', 'Review', 'Archived']}
  series={[{ name: 'Plates', data: [8, 14, 11, 22] }]}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="07 · Markers"
          title="Bar with markers"
          description="Goal markers at target plate counts overlay each status bar."
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
            html={`<!-- BarChart with goal markers -->
<div class="wash-chart"></div>`}
            jsx={`import { BarChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<BarChart
  height={300}
  series={[{
    name: 'Plates',
    data: [
      { x: 'Draft', y: 8, goals: [{ name: 'Target', value: 14, strokeWidth: 3 }] },
      { x: 'In wash', y: 14, goals: [{ name: 'Target', value: 20, strokeWidth: 3 }] },
    ],
  }]}
  options={{ legend: { show: false } }}
/>`}
          />
        </GallerySection>

        <BarStubSection
          eyebrow="08 · Custom labels"
          title="Bar with custom data labels"
          description="Per-bar label formatters and conditional colors for studio KPI callouts."
        />

        <BarStubSection
          eyebrow="09 · Grouped stacked"
          title="Grouped stacked bar"
          description="Multiple stacked series clusters side by side within each category group."
          panel="wash-panel-ochre"
        />

        <BarStubSection
          eyebrow="10 · Patterned"
          title="Patterned bar"
          description="SVG fill patterns on bars to distinguish pigment families in print-friendly views."
        />

        <BarStubSection
          eyebrow="11 · Bar race"
          title="Horizontal bar race"
          description="Animated ranking bars that reorder as studio leaderboard values change over time."
          panel="wash-panel-rose"
        />
      </div>
    </>
  )
}
