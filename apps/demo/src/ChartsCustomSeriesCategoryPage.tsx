import {
  BarChart,
  WashChart,
  buildCartesianOptions,
  mergeApexOptions,
} from '@menzies-mariesta-com/menzies-design-wash-ui/charts'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  pigmentLollipop,
  studioKpiBullet,
  throughputDumbbell,
} from './data/chart-samples'

function ComingSoonPreview({ label }: { label: string }) {
  return (
    <div className="flex h-[320px] flex-col items-center justify-center gap-2 rounded-box border border-dashed border-ink-border/60 bg-base-200/30">
      <span className="badge badge-outline badge-sm">Coming soon</span>
      <p className="max-w-sm px-4 text-center text-sm text-ink-muted">{label}</p>
    </div>
  )
}

const bulletSeries = [
  {
    name: 'Target range',
    type: 'rangeBar' as const,
    data: studioKpiBullet.rows.map((row) => ({
      x: row.metric,
      y: [row.rangeMin, row.rangeMax] as [number, number],
    })),
  },
  {
    name: 'Actual',
    type: 'bar' as const,
    data: studioKpiBullet.rows.map((row) => ({
      x: row.metric,
      y: row.value,
      goals: [
        {
          name: 'Target',
          value: row.target,
          strokeWidth: 4,
          strokeHeight: 14,
        },
      ],
    })),
  },
]

const bulletOptions = mergeApexOptions(
  buildCartesianOptions({
    title: studioKpiBullet.title,
    xaxisTitle: 'Score',
    showLegend: false,
  }),
  {
    chart: { type: 'bar' },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '42%',
        rangeBarOverlap: false,
        colors: {
          backgroundBarColors: ['#94a3b833'],
          backgroundBarOpacity: 0.35,
          backgroundBarRadius: 4,
        },
      },
    },
    colors: ['#cbd5e1', '#6366f1'],
    fill: {
      opacity: [0.45, 1],
    },
    xaxis: {
      min: 0,
      max: 100,
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
  },
)

const lollipopCategories = pigmentLollipop.rows.map((row) => row.label)
const lollipopValues = pigmentLollipop.rows.map((row) => row.value)

const lollipopSeries = [
  {
    name: 'Stem',
    type: 'column' as const,
    data: lollipopValues,
  },
  {
    name: 'Head',
    type: 'scatter' as const,
    data: lollipopValues.map((value, index) => [index, value]),
  },
]

const lollipopOptions = mergeApexOptions(
  buildCartesianOptions({
    title: pigmentLollipop.title,
    categories: lollipopCategories,
    yaxisTitle: 'Load (kg)',
    showLegend: false,
  }),
  {
    chart: { type: 'line', stacked: false },
    plotOptions: {
      bar: {
        columnWidth: '6%',
        borderRadius: 0,
      },
    },
    stroke: {
      width: [0, 0],
    },
    markers: {
      size: [0, 11],
      strokeWidth: 2,
      strokeColors: '#fff',
      hover: { sizeOffset: 2 },
    },
    tooltip: {
      shared: false,
      intersect: true,
    },
  },
)

const dumbbellOptions = mergeApexOptions(
  buildCartesianOptions({
    title: throughputDumbbell.title,
    categories: throughputDumbbell.rows.map((row) => row.period),
    yaxisTitle: 'Plates / day',
    showLegend: false,
  }),
  {
    chart: { type: 'rangeBar' },
    plotOptions: {
      bar: {
        isDumbbell: true,
        columnWidth: '42%',
        dumbbellColors: [['#008FFB', '#00E396']],
      },
    },
    tooltip: {
      custom({ seriesIndex, dataPointIndex, w }) {
        const row = throughputDumbbell.rows[dataPointIndex]
        if (!row) return ''
        const low = w.globals.series[seriesIndex][dataPointIndex]
        const high = w.globals.seriesRangeEnd?.[seriesIndex]?.[dataPointIndex] ?? low
        return `<div class="apexcharts-tooltip-title">${row.period}</div>
<div class="apexcharts-tooltip-series-group apexcharts-active">
<span class="apexcharts-tooltip-marker" style="background-color: #008FFB;"></span>
<div class="apexcharts-tooltip-text">
<div class="apexcharts-tooltip-y-group">
<span class="apexcharts-tooltip-text-y-label">Range: </span>
<span class="apexcharts-tooltip-text-y-value">${low} – ${high}</span>
</div>
</div>
</div>`
      },
    },
  },
)

export default function ChartsCustomSeriesCategoryPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Custom Series Charts
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Bullet, lollipop, and dumbbell marks for studio KPIs. ApexCharts v6{' '}
          <span className="font-mono text-xs">registerSeriesType</span> Marks API is not in Wash UI
          yet (Apex 5.16). These demos simulate the layouts with horizontal bar, column plus scatter,
          and rangeBar dumbbell options on WashChart.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Bullet"
          title="Bullet chart"
          description="Horizontal bar with qualitative performance bands, a shaded target range (rangeBar), and goal marker for the KPI target."
        >
          <ShowcaseTabs
            preview={
              <WashChart
                type="bar"
                height={360}
                series={bulletSeries}
                options={bulletOptions}
              />
            }
            html={`<!-- Bullet chart via WashChart bar + rangeBar -->
<div class="wash-chart"></div>`}
            jsx={`import { WashChart, buildCartesianOptions, mergeApexOptions } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<WashChart
  type="bar"
  height={360}
  series={[
    {
      name: 'Target range',
      type: 'rangeBar',
      data: [{ x: 'Plate throughput', y: [65, 90] }],
    },
    {
      name: 'Actual',
      type: 'bar',
      data: [{
        x: 'Plate throughput',
        y: 72,
        goals: [{ name: 'Target', value: 80, strokeWidth: 4 }],
      }],
    },
  ]}
  options={mergeApexOptions(buildCartesianOptions({ xaxisTitle: 'Score' }), {
    plotOptions: { bar: { horizontal: true, rangeBarOverlap: false } },
  })}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="02 · Lollipop"
          title="Lollipop chart"
          description="Thin column stems with scatter marker heads for pigment load by family."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <WashChart
                type="line"
                height={340}
                series={lollipopSeries}
                options={lollipopOptions}
              />
            }
            html={`<!-- Lollipop via column + scatter -->
<div class="wash-chart"></div>`}
            jsx={`import { WashChart, buildCartesianOptions, mergeApexOptions } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<WashChart
  type="line"
  height={340}
  series={[
    { name: 'Stem', type: 'column', data: [42, 58, 36, 51, 47] },
    { name: 'Head', type: 'scatter', data: [[0, 42], [1, 58], [2, 36], [3, 51], [4, 47]] },
  ]}
  options={mergeApexOptions(buildCartesianOptions({ categories: ['Cerulean', 'Ochre'] }), {
    plotOptions: { bar: { columnWidth: '6%' } },
    markers: { size: [0, 11] },
  })}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="03 · Dumbbell"
          title="Dumbbell chart"
          description="Vertical rangeBar with isDumbbell markers connecting low and high throughput per month."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <WashChart
                type="rangeBar"
                height={340}
                series={[
                  {
                    name: 'Throughput',
                    data: throughputDumbbell.rows.map((row) => ({
                      x: row.period,
                      y: [row.low, row.high] as [number, number],
                    })),
                  },
                ]}
                options={dumbbellOptions}
              />
            }
            html={`<!-- Dumbbell via rangeBar isDumbbell -->
<div class="wash-chart"></div>`}
            jsx={`import { WashChart, buildCartesianOptions, mergeApexOptions } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<WashChart
  type="rangeBar"
  height={340}
  series={[{ data: [{ x: 'Jan', y: [42, 58] }] }]}
  options={mergeApexOptions(buildCartesianOptions({ yaxisTitle: 'Plates / day' }), {
    plotOptions: { bar: { isDumbbell: true, columnWidth: '42%' } },
  })}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="04 · Marks API"
          title="registerSeriesType marks"
          description="Apex v6 custom series marks (renderItem API) for arbitrary mark geometry beyond bar and rangeBar shims."
        >
          <ShowcaseTabs
            preview={
              <ComingSoonPreview label="Apex v6 Marks API registerSeriesType demos will ship when Wash UI upgrades beyond Apex 5.16." />
            }
            html={`<!-- Custom series marks (coming soon) -->
<div class="wash-chart"></div>`}
            jsx={`// Apex v6 registerSeriesType marks — coming soon`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="05 · Bar goals"
          title="Bar with goal markers"
          description="Simpler bullet-style KPI row using BarChart goals without a rangeBar background layer."
          panel="wash-panel-slate"
        >
          <ShowcaseTabs
            preview={
              <BarChart
                height={300}
                title="Critique KPI bullets"
                xaxisTitle="Score"
                series={[
                  {
                    name: 'Actual',
                    data: studioKpiBullet.rows.map((row) => ({
                      x: row.metric,
                      y: row.value,
                      goals: [
                        {
                          name: 'Target',
                          value: row.target,
                          strokeWidth: 3,
                          strokeHeight: 12,
                        },
                      ],
                    })),
                  },
                ]}
                options={{
                  plotOptions: {
                    bar: {
                      horizontal: true,
                      barHeight: '48%',
                      colors: {
                        ranges: [
                          { from: 0, to: 60, color: '#f87171' },
                          { from: 61, to: 80, color: '#fbbf24' },
                          { from: 81, to: 100, color: '#34d399' },
                        ],
                      },
                    },
                  },
                  xaxis: { min: 0, max: 100 },
                  legend: { show: false },
                }}
              />
            }
            html={`<!-- BarChart goal markers -->
<div class="wash-chart"></div>`}
            jsx={`import { BarChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<BarChart
  height={300}
  xaxisTitle="Score"
  series={[{
    name: 'Actual',
    data: [{ x: 'Plate throughput', y: 72, goals: [{ name: 'Target', value: 80 }] }],
  }]}
  options={{
    plotOptions: {
      bar: {
        horizontal: true,
        colors: { ranges: [{ from: 0, to: 60, color: '#f87171' }] },
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
