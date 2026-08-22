import { useCallback, useMemo, useState } from 'react'
import type { ApexChartEventOpts, ApexOptions } from 'apexcharts'
import {
  DonutChart,
  PieChart,
} from '@menzies-mariesta-com/menzies-design-wash-ui/charts'
import { RotateCw } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import { pigmentShare, pigmentSubShare } from './data/chart-samples'

const pigmentSeries = pigmentShare.map((p) => p.value)
const pigmentLabels = pigmentShare.map((p) => p.name)

const patternStyles = [
  'horizontalLines',
  'verticalLines',
  'slantedLines',
  'squares',
  'circles',
  'horizontalLines',
] as const

const patternFillOptions: ApexOptions = {
  fill: {
    type: 'pattern',
    opacity: 1,
    pattern: {
      style: [...patternStyles],
      width: 6,
      height: 6,
      strokeWidth: 2,
    },
  },
  legend: { position: 'bottom' },
}

const spacedRoundedOptions: ApexOptions = {
  plotOptions: {
    pie: {
      spacing: 5,
      borderRadius: 6,
    },
  },
  stroke: { width: 4, lineCap: 'round' },
  legend: { position: 'bottom' },
}

function pigmentWashImage(hue: string, label: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
  <defs>
    <radialGradient id="g" cx="38%" cy="32%" r="72%">
      <stop offset="0%" stop-color="${hue}" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="${hue}" stop-opacity="0.3"/>
    </radialGradient>
  </defs>
  <rect width="120" height="120" fill="url(#g)"/>
  <text x="60" y="68" text-anchor="middle" font-family="Georgia, serif" font-size="13" fill="#2a2622" opacity="0.75">${label}</text>
</svg>`
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

const pigmentImageFills = [
  pigmentWashImage('#4a90a4', 'Cerulean'),
  pigmentWashImage('#c4a35a', 'Ochre'),
  pigmentWashImage('#b85c5c', 'Madder'),
  pigmentWashImage('#4a5080', 'Indigo'),
  pigmentWashImage('#4a8060', 'Viridian'),
  pigmentWashImage('#8a8580', 'Other'),
]

const pieImageOptions: ApexOptions = {
  fill: {
    type: 'image',
    opacity: 0.92,
    image: {
      src: pigmentImageFills,
      width: 120,
      height: 120,
    },
  },
  legend: { position: 'bottom' },
}

function DonutDrilldownDemo() {
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null)

  const innerItems = selectedLabel ? pigmentSubShare[selectedLabel] ?? [] : pigmentShare
  const innerSeries = innerItems.map((item) => item.value)
  const innerLabels = innerItems.map((item) => item.name)

  const handleOuterSelection = useCallback(
    (_event: MouseEvent, _chartContext?: unknown, config?: ApexChartEventOpts) => {
      const index = config?.dataPointIndex
      if (index == null || index < 0) return
      const label = pigmentLabels[index]
      setSelectedLabel((current) => (current === label ? null : label))
    },
    [],
  )

  const outerOptions = useMemo(
    (): ApexOptions => ({
      chart: {
        events: {
          dataPointSelection: handleOuterSelection,
        },
        selection: { enabled: false },
      },
      states: {
        active: { filter: { type: 'none' } },
      },
      legend: { position: 'bottom' },
    }),
    [handleOuterSelection],
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink-muted">
          Click an outer segment to filter the inner ring to pigment sub-families. Click again to
          clear.
        </p>
        <button
          type="button"
          className="btn btn-ghost btn-sm cursor-pointer"
          disabled={selectedLabel === null}
          onClick={() => setSelectedLabel(null)}
        >
          Clear filter
        </button>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="mx-auto w-full max-w-sm">
          <DonutChart
            height={300}
            series={pigmentSeries}
            labels={pigmentLabels}
            showLegend
            donutSize="62%"
            options={outerOptions}
          />
        </div>
        <div className="mx-auto w-full max-w-sm">
          <DonutChart
            height={300}
            series={innerSeries}
            labels={innerLabels}
            showLegend
            donutSize="58%"
            title={selectedLabel ? `${selectedLabel} sub-families` : 'All pigment families'}
            options={{ legend: { position: 'bottom' } }}
          />
        </div>
      </div>
    </div>
  )
}

function DonutUpdateDemo() {
  const [series, setSeries] = useState(() => [...pigmentSeries])

  const refreshShare = () => {
    setSeries((current) =>
      current.map((value) => Math.max(6, value + Math.round((Math.random() - 0.5) * 10))),
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink-muted">
          Simulates live studio share updates. ApexCharts animates segment transitions when React
          state pushes new series values.
        </p>
        <button
          type="button"
          className="btn btn-secondary btn-sm cursor-pointer"
          onClick={refreshShare}
        >
          <RotateCw className="size-4" strokeWidth={1.75} aria-hidden="true" />
          Simulate update
        </button>
      </div>
      <div className="mx-auto w-full max-w-md">
        <DonutChart
          height={300}
          series={series}
          labels={pigmentLabels}
          showLegend
          donutSize="68%"
          options={{
            legend: { position: 'bottom' },
            plotOptions: {
              pie: {
                donut: {
                  labels: {
                    total: {
                      label: 'Washes',
                      formatter: (w) =>
                        `${Math.round(
                          w.globals.seriesTotals.reduce(
                            (sum: number, value: number) => sum + value,
                            0,
                          ),
                        )}`,
                    },
                  },
                },
              },
            },
          }}
        />
      </div>
    </div>
  )
}

export default function ChartsPieCategoryPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Pie / Donut charts
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Circular charts for pigment share, portfolio breakdowns, and studio composition.
          PieChart and DonutChart apply Wash pigment tokens, optional monochrome shades,
          gradient fills, and rounded segment caps. Radial gauges live on other gallery pages.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Pie"
          title="Simple pie"
          description="Classic pie chart showing relative wash volume by pigment family."
        >
          <ShowcaseTabs
            preview={
              <div className="mx-auto w-full max-w-md">
                <PieChart
                  height={300}
                  series={pigmentSeries}
                  labels={pigmentLabels}
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
          title="Simple donut"
          description="DonutChart with a hollow center and total label."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <div className="mx-auto w-full max-w-md">
                <DonutChart
                  height={300}
                  series={pigmentSeries}
                  labels={pigmentLabels}
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
          eyebrow="03 · Monochrome"
          title="Monochrome pie"
          description="Single-hue pigment shades for print-friendly or minimal studio reports."
        >
          <ShowcaseTabs
            preview={
              <div className="mx-auto w-full max-w-md">
                <PieChart
                  height={300}
                  series={pigmentSeries}
                  labels={pigmentLabels}
                  showLegend
                  monochrome
                  options={{ legend: { position: 'bottom' } }}
                />
              </div>
            }
            html={`<!-- PieChart monochrome -->
<div class="wash-chart"></div>`}
            jsx={`import { PieChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<PieChart
  height={300}
  series={[24, 18, 16, 14, 12, 16]}
  labels={['Cerulean', 'Ochre', 'Madder', 'Indigo', 'Viridian', 'Other']}
  showLegend
  monochrome
  options={{ legend: { position: 'bottom' } }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="04 · Gradient"
          title="Gradient donut"
          description="Soft vertical gradient fill on each donut segment."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <div className="mx-auto w-full max-w-md">
                <DonutChart
                  height={300}
                  series={pigmentSeries}
                  labels={pigmentLabels}
                  showLegend
                  gradientFill
                  options={{ legend: { position: 'bottom' } }}
                />
              </div>
            }
            html={`<!-- DonutChart gradient fill -->
<div class="wash-chart"></div>`}
            jsx={`import { DonutChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<DonutChart
  height={300}
  series={[24, 18, 16, 14, 12, 16]}
  labels={['Cerulean', 'Ochre', 'Madder', 'Indigo', 'Viridian', 'Other']}
  showLegend
  gradientFill
  options={{ legend: { position: 'bottom' } }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="05 · Rounded"
          title="Rounded donut"
          description="Round stroke caps on each segment for a softer circular breakdown."
        >
          <ShowcaseTabs
            preview={
              <div className="mx-auto w-full max-w-md">
                <DonutChart
                  height={300}
                  series={pigmentSeries}
                  labels={pigmentLabels}
                  showLegend
                  rounded
                  donutSize="72%"
                  options={{ legend: { position: 'bottom' } }}
                />
              </div>
            }
            html={`<!-- DonutChart rounded caps -->
<div class="wash-chart"></div>`}
            jsx={`import { DonutChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<DonutChart
  height={300}
  series={[24, 18, 16, 14, 12, 16]}
  labels={['Cerulean', 'Ochre', 'Madder', 'Indigo', 'Viridian', 'Other']}
  showLegend
  rounded
  donutSize="72%"
  options={{ legend: { position: 'bottom' } }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="06 · Pattern"
          title="Donut with pattern"
          description="SVG fill patterns on donut segments for accessible color-blind studio views."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <div className="mx-auto w-full max-w-md">
                <DonutChart
                  height={300}
                  series={pigmentSeries}
                  labels={pigmentLabels}
                  showLegend
                  donutSize="66%"
                  options={patternFillOptions}
                />
              </div>
            }
            html={`<!-- DonutChart pattern fill -->
<div class="wash-chart"></div>`}
            jsx={`import { DonutChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<DonutChart
  height={300}
  series={[24, 18, 16, 14, 12, 16]}
  labels={['Cerulean', 'Ochre', 'Madder', 'Indigo', 'Viridian', 'Other']}
  showLegend
  options={{
    fill: {
      type: 'pattern',
      pattern: {
        style: ['horizontalLines', 'verticalLines', 'slantedLines', 'squares', 'circles', 'horizontalLines'],
        width: 6,
        height: 6,
        strokeWidth: 2,
      },
    },
    legend: { position: 'bottom' },
  }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="07 · Spaced"
          title="Rounded spaced donut"
          description="Rounded caps with gap spacing between segments for a gauge-like breakdown."
        >
          <ShowcaseTabs
            preview={
              <div className="mx-auto w-full max-w-md">
                <DonutChart
                  height={300}
                  series={pigmentSeries}
                  labels={pigmentLabels}
                  showLegend
                  rounded
                  donutSize="70%"
                  options={spacedRoundedOptions}
                />
              </div>
            }
            html={`<!-- DonutChart spaced rounded -->
<div class="wash-chart"></div>`}
            jsx={`import { DonutChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<DonutChart
  height={300}
  series={[24, 18, 16, 14, 12, 16]}
  labels={['Cerulean', 'Ochre', 'Madder', 'Indigo', 'Viridian', 'Other']}
  showLegend
  rounded
  donutSize="70%"
  options={{
    plotOptions: { pie: { spacing: 5, borderRadius: 6 } },
    stroke: { width: 4, lineCap: 'round' },
    legend: { position: 'bottom' },
  }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="08 · Image"
          title="Pie with image"
          description="Pattern or image fill inside pie slices for branded pigment portfolios."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <div className="mx-auto w-full max-w-md">
                <PieChart
                  height={300}
                  series={pigmentSeries}
                  labels={pigmentLabels}
                  showLegend
                  options={pieImageOptions}
                />
              </div>
            }
            html={`<!-- PieChart image fill -->
<div class="wash-chart"></div>`}
            jsx={`import { PieChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<PieChart
  height={300}
  series={[24, 18, 16, 14, 12, 16]}
  labels={['Cerulean', 'Ochre', 'Madder', 'Indigo', 'Viridian', 'Other']}
  showLegend
  options={{
    fill: {
      type: 'image',
      opacity: 0.92,
      image: { src: pigmentWashImages, width: 120, height: 120 },
    },
    legend: { position: 'bottom' },
  }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="09 · Drilldown"
          title="Donut with drilldown"
          description="Click a segment to drill into nested pigment sub-families."
        >
          <ShowcaseTabs
            preview={<DonutDrilldownDemo />}
            html={`<!-- Donut drilldown pair -->
<div class="wash-chart"></div>`}
            jsx={`import { useCallback, useMemo, useState } from 'react'
import { DonutChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

const [selectedLabel, setSelectedLabel] = useState<string | null>(null)

<DonutChart
  series={[24, 18, 16, 14, 12, 16]}
  labels={['Cerulean', 'Ochre', 'Madder', 'Indigo', 'Viridian', 'Other']}
  options={{
    chart: {
      events: {
        dataPointSelection: (_e, _ctx, config) => {
          const label = labels[config.dataPointIndex]
          setSelectedLabel((current) => (current === label ? null : label))
        },
      },
    },
  }}
/>
<DonutChart series={innerSeries} labels={innerLabels} title={selectedLabel ?? 'All families'} />`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="10 · Update"
          title="Donut update"
          description="Animated segment updates when live studio share data changes."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={<DonutUpdateDemo />}
            html={`<!-- Donut update demo -->
<div class="wash-chart"></div>`}
            jsx={`import { useState } from 'react'
import { DonutChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

const [series, setSeries] = useState([24, 18, 16, 14, 12, 16])

<button type="button" onClick={() => setSeries((s) => s.map((v) => v + 2))}>
  Simulate update
</button>

<DonutChart series={series} labels={labels} showLegend />`}
          />
        </GallerySection>
      </div>
    </>
  )
}
