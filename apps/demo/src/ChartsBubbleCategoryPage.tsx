import type { ApexOptions } from 'apexcharts'
import { BubbleChart } from '#plain/charts'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  chartHtml,
  chartJsx,
  chartSvelteFiles,
} from './snippets/svelte/charts'
import { bubble3dSeries, simpleBubbleSeries } from './data/chart-samples'

const bubble3dOptions: ApexOptions = {
  plotOptions: {
    bubble: { minBubbleRadius: 8, maxBubbleRadius: 48 },
  },
  dataLabels: {
    enabled: true,
    formatter(_val, opts) {
      const rawSeries = opts?.w?.config?.series?.[opts?.seriesIndex ?? 0]
      if (rawSeries && typeof rawSeries === 'object' && 'data' in rawSeries) {
        const point = (rawSeries.data as { z?: number }[])[opts?.dataPointIndex ?? 0]
        return point?.z !== undefined ? String(point.z) : ''
      }
      return ''
    },
    style: { fontSize: '10px' },
  },
  tooltip: {
    z: { formatter: (value: number) => `${value} plates`, title: 'Batch size' },
  },
}

export default function ChartsBubbleCategoryPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Bubble Charts
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Plot numeric x/y pairs with z controlling bubble size.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Simple"
          title="Simple bubble"
          description="Two-axis studio batches with z as batch size"
        >
          <ShowcaseTabs
            preview={
              <BubbleChart
                height={360}
                title="Pigment batch load"
                xaxisTitle="Dry time (min)"
                yaxisTitle="Pigment load %"
                series={simpleBubbleSeries.map((item) => ({
                  name: item.name,
                  data: [...item.data],
                }))}
                options={{ legend: { position: 'top' } }}
              />
            }
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="02 · 3D-style"
          title="3D bubble (z as size)"
          description="Plate series complexity vs hours logged"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <BubbleChart
                height={380}
                title="Plate series effort"
                xaxisTitle="Complexity score"
                yaxisTitle="Hours logged"
                series={bubble3dSeries.map((item) => ({
                  name: item.name,
                  data: [...item.data],
                }))}
                options={bubble3dOptions}
              />
            }
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>
      </div>
    </>
  )
}
