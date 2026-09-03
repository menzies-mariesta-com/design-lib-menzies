import { useCallback, useMemo, useState } from 'react'
import type { ApexChartEventOpts, ApexOptions } from 'apexcharts'
import {
  ColumnChart,
  DonutChart,
  LineChart,
} from '@menzies-mariesta-com/menzies-design-wash-ui/charts'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  AnnotationAuthoringDemoEnhanced,
  MeasureRulerDemo,
} from './components/chartAdvancedDemos'
import {
  washWeekLabels,
  weeklyPigmentLevels,
  weeklyPlateCounts,
  weeklyWashCounts,
} from './data/chart-samples'

const weekLabels = [...washWeekLabels]

function CrossfilterCategoricalDemo() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const filteredIndices = useMemo(
    () =>
      selectedIndex === null
        ? weekLabels.map((_, index) => index)
        : [selectedIndex],
    [selectedIndex],
  )

  const filteredCategories = filteredIndices.map((index) => weekLabels[index])
  const filteredWash = filteredIndices.map((index) => weeklyWashCounts[index])
  const filteredPigment = filteredIndices.map((index) => weeklyPigmentLevels[index])

  const handleBarSelection = useCallback(
    (_event: MouseEvent, _chartContext?: unknown, config?: ApexChartEventOpts) => {
      const index = config?.dataPointIndex
      if (index == null || index < 0) return
      setSelectedIndex((current) => (current === index ? null : index))
    },
    [],
  )

  const barOptions = useMemo(
    (): ApexOptions => ({
      chart: {
        events: {
          dataPointSelection: handleBarSelection,
        },
        selection: { enabled: false },
      },
      plotOptions: {
        bar: {
          distributed: true,
        },
      },
      states: {
        active: {
          filter: { type: 'none' },
        },
      },
      tooltip: {
        intersect: true,
        shared: false,
      },
    }),
    [handleBarSelection],
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink-muted">
          Click a wash count bar to filter the pigment trend line. Click again to clear the filter.
        </p>
        <button
          type="button"
          className="btn btn-ghost btn-sm cursor-pointer"
          disabled={selectedIndex === null}
          onClick={() => setSelectedIndex(null)}
        >
          Clear filter
        </button>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <ColumnChart
          height={280}
          title="Washes per day"
          categories={weekLabels}
          yaxisTitle="Washes"
          series={[{ name: 'Washes', data: weeklyWashCounts }]}
          options={barOptions}
        />
        <LineChart
          height={280}
          title={
            selectedIndex === null
              ? 'Pigment load trend'
              : `Pigment load · ${weekLabels[selectedIndex]}`
          }
          categories={filteredCategories}
          yaxisTitle="Load %"
          series={[{ name: 'Pigment load', data: filteredPigment }]}
          options={{
            markers: { size: selectedIndex === null ? 0 : 5 },
          }}
        />
      </div>
      <p className="text-xs text-ink-muted">
        Filtered washes: {filteredWash.reduce((sum, value) => sum + value, 0)} · Filtered pigment
        avg:{' '}
        {filteredPigment.length
          ? Math.round(
              filteredPigment.reduce((sum, value) => sum + value, 0) / filteredPigment.length,
            )
          : 0}
        %
      </p>
    </div>
  )
}

function CrossfilterDashboardDemo() {
  const [activeDays, setActiveDays] = useState<Set<number>>(
    () => new Set(weekLabels.map((_, index) => index)),
  )

  const toggleDay = (index: number) => {
    setActiveDays((current) => {
      const next = new Set(current)
      if (next.has(index)) {
        if (next.size === 1) return current
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  const activeIndices = weekLabels
    .map((_, index) => index)
    .filter((index) => activeDays.has(index))

  const filteredCategories = activeIndices.map((index) => weekLabels[index])
  const filteredPlates = activeIndices.map((index) => weeklyPlateCounts[index])
  const filteredWash = activeIndices.map((index) => weeklyWashCounts[index])

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {weekLabels.map((label, index) => {
          const active = activeDays.has(index)
          return (
            <button
              key={label}
              type="button"
              className={[
                'btn btn-xs cursor-pointer',
                active ? 'btn-primary' : 'btn-ghost',
              ].join(' ')}
              onClick={() => toggleDay(index)}
            >
              {label}
            </button>
          )
        })}
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <ColumnChart
          height={220}
          title="Plate output"
          categories={filteredCategories}
          yaxisTitle="Plates"
          series={[{ name: 'Plates', data: filteredPlates }]}
        />
        <LineChart
          height={220}
          title="Wash volume"
          categories={filteredCategories}
          yaxisTitle="Washes"
          series={[{ name: 'Washes', data: filteredWash }]}
        />
        <div className="md:col-span-2 xl:col-span-1">
          <DonutChart
            height={220}
            series={filteredPlates}
            labels={filteredCategories}
            showLegend
            options={{ legend: { position: 'bottom' } }}
          />
        </div>
      </div>
      <p className="text-xs text-ink-muted">
        Simplified crossfilter dashboard: day toggles drive plate, wash, and share donuts together.
        Full treemap and heatmap crossfilter wiring is planned.
      </p>
    </div>
  )
}

export default function ChartsInteractivityCategoryPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Interactivity
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Linked filters, crossfilter dashboards, measure rulers, and annotation authoring for
          studio analytics.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Crossfilter"
          title="Crossfilter categorical"
          description="Linked column and line charts share one category filter"
        >
          <ShowcaseTabs
            preview={<CrossfilterCategoricalDemo />}
            html={`<!-- Crossfilter categorical (shared filter state) -->
<div class="wash-crossfilter">
  <div class="wash-chart wash-chart-column"></div>
  <div class="wash-chart wash-chart-line"></div>
</div>`}
            jsx={`import { useState } from 'react'
import { ColumnChart, LineChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

<ColumnChart
  categories={['Mon', 'Tue', 'Wed']}
  series={[{ name: 'Washes', data: [12, 18, 14] }]}
  options={{
    chart: {
      events: {
        dataPointSelection: (_e, _ctx, config) => {
          setSelectedIndex(config.dataPointIndex)
        },
      },
    },
  }}
/>
<LineChart
  categories={filteredCategories}
  series={[{ name: 'Pigment load', data: filteredPigment }]}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="02 · Dashboard"
          title="Crossfilter dashboard"
          description="Day toggles drive multiple chart types from one shared filter set"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={<CrossfilterDashboardDemo />}
            html={`<!-- Crossfilter dashboard grid -->
<div class="wash-crossfilter-dashboard">
  <div class="wash-chart"></div>
  <div class="wash-chart"></div>
  <div class="wash-chart"></div>
</div>`}
            jsx={`import { ColumnChart, DonutChart, LineChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

const [activeDays, setActiveDays] = useState(new Set([0, 1, 2, 3, 4, 5, 6]))

// Toggle day chips, then pass filtered categories to each chart.`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="03 · Measure"
          title="Measure ruler"
          description="Drag a ruler across chart axes to read delta values, slopes"
          panel="wash-panel-slate"
        >
          <ShowcaseTabs
            preview={<MeasureRulerDemo />}
            html={`<!-- Measure ruler -->
<div class="wash-chart wash-chart-measure"></div>`}
            jsx={`import { MeasureRulerDemo } from './components/chartAdvancedDemos'

<MeasureRulerDemo />`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="04 · Annotations"
          title="Annotation authoring"
          description="Click data points to append vertical x annotations"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={<AnnotationAuthoringDemoEnhanced />}
            html={`<!-- LineChartWithAnnotations + annotation authoring -->
<div class="wash-chart wash-chart-annotations"></div>
<div class="wash-annotation-authoring"></div>`}
            jsx={`import { AnnotationAuthoringDemoEnhanced } from './components/chartAdvancedDemos'

<AnnotationAuthoringDemoEnhanced />`}
          />
        </GallerySection>
      </div>
    </>
  )
}
