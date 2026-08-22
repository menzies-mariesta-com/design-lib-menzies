import { HistogramChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
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
          Histograms bin raw observations into frequency counts. HistogramChart wraps WashChart with
          column bins, shared edges for multi-series comparison, and pigment-aware defaults. Explode
          to observations uses Apex rowSeries when available.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Distribution"
          title="Latency distribution"
          description="Raw API latency observations binned with Freedman-Diaconis auto edges. Each bar counts requests in that millisecond range."
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
            html={`<!-- HistogramChart canvas -->
<div class="wash-chart"></div>`}
            jsx={`import { HistogramChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<HistogramChart
  height={360}
  title="Studio API latency"
  xaxisTitle="Latency (ms)"
  yaxisTitle="Requests"
  bins="auto"
  series={[{ name: 'Latency', data: [102, 87, 143, 91, 118, 96] }]}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="02 · Compare"
          title="Comparing distributions"
          description="Morning and evening latency samples share one set of bin edges with overlapping semi-transparent columns."
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
            html={`<!-- HistogramChart compare -->
<div class="wash-chart"></div>`}
            jsx={`import { HistogramChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<HistogramChart
  height={380}
  title="Morning vs evening latency"
  xaxisTitle="Latency (ms)"
  showLegend
  overlap
  series={[
    { name: 'Morning', data: [82, 94, 101, 88, 76, 112] },
    { name: 'Evening', data: [118, 132, 145, 128, 156, 141] },
  ]}
  options={{ legend: { position: 'top' } }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="03 · Explode"
          title="Explode to observations"
          description="Row-level drilldown from histogram bins to raw scatter points via Apex rowSeries."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={<HistogramExplodeDemo />}
            html={`<!-- HistogramChart explode drilldown -->
<div class="wash-chart"></div>`}
            jsx={`import { HistogramChart, ScatterChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

// Click a bin, then render ScatterChart with filtered observations for that range.`}
          />
        </GallerySection>
      </div>
    </>
  )
}
