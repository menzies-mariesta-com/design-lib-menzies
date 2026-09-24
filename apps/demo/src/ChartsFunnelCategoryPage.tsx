import { FunnelChart } from '#plain/charts'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  chartHtml,
  chartJsx,
  chartSvelteFiles,
} from './snippets/svelte/charts'
import {
  plateConversionFunnel,
  studioEnrollmentPyramid,
  trapezoidFunnelSample,
} from './data/chart-samples'

export default function ChartsFunnelCategoryPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Funnel Charts
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Funnel and pyramid charts visualize stage-by-stage volume reduction or hierarchy growth.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Funnel"
          title="Plate conversion funnel"
          description="Descending stage counts from studio inquiries through completed"
        >
          <ShowcaseTabs
            preview={
              <FunnelChart
                height={360}
                title={plateConversionFunnel.title}
                series={[
                  {
                    name: 'Conversion',
                    data: plateConversionFunnel.data.map((point) => ({ ...point })),
                  },
                ]}
                showDataLabels
                options={{
                  tooltip: { y: { formatter: (val: number) => `${val} plates` } },
                }}
              />
            }
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="02 · Pyramid"
          title="Studio enrollment pyramid"
          description="Pyramid charts widen from a narrow top tier to a broad base"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <FunnelChart
                height={380}
                title={studioEnrollmentPyramid.title}
                variant="pyramid"
                series={[
                  {
                    name: 'Enrollment',
                    data: studioEnrollmentPyramid.data.map((point) => ({ ...point })),
                  },
                ]}
                showDataLabels
              />
            }
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="03 · Trapezoid tapered"
          title="Trapezoid funnel with tapered base"
          description="Continuous sloped sides between stages with a pointed final tier"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <FunnelChart
                height={360}
                title={trapezoidFunnelSample.title}
                shape="trapezoid"
                lastShape="taper"
                series={[
                  {
                    name: 'Wash pipeline',
                    data: trapezoidFunnelSample.data.map((point) => ({ ...point })),
                  },
                ]}
                showDataLabels
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
