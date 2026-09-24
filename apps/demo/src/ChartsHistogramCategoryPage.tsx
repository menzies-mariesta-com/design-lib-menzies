import { HistogramChart } from '#plain/charts'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  chartHtml,
  chartJsx,
  chartSvelteFiles,
} from './snippets/svelte/charts'
import { HistogramExplodeDemo } from './components/chartDistributionDemos'
import {
  comparingLatencyDistributions,
  latencyDistributionObservations,
} from './data/chart-samples'

export default function ChartsHistogramCategoryPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Histogram Charts
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Histograms bin raw observations into frequency counts.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Distribution"
          title="Latency distribution"
          description="Raw API latency observations binned"
        >
          <ShowcaseTabs
            preview={
              <HistogramChart
                height={360}
                title="Studio API latency"
                xaxisTitle="Latency (ms)"
                yaxisTitle="Requests"
                bins="auto"
                series={[
                  {
                    name: 'Latency',
                    data: [...latencyDistributionObservations],
                  },
                ]}
              />
            }
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="02 · Compare"
          title="Comparing distributions"
          description="Morning and evening latency samples share one set of bin edges"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <HistogramChart
                height={380}
                title="Morning vs evening latency"
                xaxisTitle="Latency (ms)"
                yaxisTitle="Requests"
                showLegend
                overlap
                series={comparingLatencyDistributions.map((item) => ({
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
          eyebrow="03 · Explode"
          title="Explode to observations"
          description="Row-level drilldown from histogram bins to raw scatter points via"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={<HistogramExplodeDemo />}
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>
      </div>
    </>
  )
}
