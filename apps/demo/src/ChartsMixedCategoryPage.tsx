import { MixedChart } from '#plain/charts'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  chartHtml,
  chartJsx,
  chartSvelteFiles,
} from './snippets/svelte/charts'
import {
  mixedDualAxisSample,
  mixedLineAreaSample,
  mixedLineColumnSample,
  mixedTripleComboSample,
} from './data/chart-samples'

export default function ChartsMixedCategoryPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Mixed charts
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Combo charts that overlay line, column, and area series on one canvas.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Line column"
          title="Plates (column) + washes (line)"
          description="MixedChart combines column bars"
        >
          <ShowcaseTabs
            preview={
              <MixedChart
                height={320}
                title="Plates and washes"
                categories={mixedLineColumnSample.categories}
                series={[
                  {
                    name: 'Plates',
                    type: 'column',
                    data: mixedLineColumnSample.plates,
                  },
                  {
                    name: 'Washes',
                    type: 'line',
                    data: mixedLineColumnSample.washes,
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
          eyebrow="02 · Line area"
          title="Pigment load (area) + plate output (line)"
          description="Area fill under pigment load"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <MixedChart
                height={320}
                title="Load vs output"
                categories={mixedLineAreaSample.categories}
                series={[
                  {
                    name: 'Pigment load %',
                    type: 'area',
                    data: mixedLineAreaSample.pigmentLoad,
                  },
                  {
                    name: 'Plate output',
                    type: 'line',
                    data: mixedLineAreaSample.plateOutput,
                  },
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
          eyebrow="03 · Line column area"
          title="Plates, washes, and dry time"
          description="Triple combo: column plates"
        >
          <ShowcaseTabs
            preview={
              <MixedChart
                height={340}
                title="Studio throughput"
                categories={mixedTripleComboSample.categories}
                series={[
                  {
                    name: 'Plates',
                    type: 'column',
                    data: mixedTripleComboSample.plates,
                  },
                  {
                    name: 'Washes',
                    type: 'area',
                    data: mixedTripleComboSample.washes,
                  },
                  {
                    name: 'Avg dry time (min)',
                    type: 'line',
                    data: mixedTripleComboSample.dryTime,
                  },
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
          eyebrow="04 · Multiple y-axes"
          title="Plate output vs dry time"
          description="Dual y-axis layout via Apex options: columns on the left axis, line"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <MixedChart
                height={320}
                title="Output and dry time"
                categories={mixedDualAxisSample.categories}
                series={[
                  {
                    name: 'Plate output',
                    type: 'column',
                    data: mixedDualAxisSample.plateOutput,
                  },
                  {
                    name: 'Dry time (min)',
                    type: 'line',
                    data: mixedDualAxisSample.dryTime,
                  },
                ]}
                options={{
                  legend: { position: 'top' },
                  yaxis: [
                    {
                      title: { text: 'Plates' },
                      min: 0,
                    },
                    {
                      opposite: true,
                      title: { text: 'Dry time (min)' },
                      min: 0,
                    },
                  ],
                }}
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
