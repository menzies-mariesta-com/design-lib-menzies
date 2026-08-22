import { FunnelChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  plateConversionFunnel,
  studioEnrollmentPyramid,
  trapezoidFunnelSample,
} from './data/chart-samples'

function ComingSoonPreview({ label }: { label: string }) {
  return (
    <div className="flex h-[320px] flex-col items-center justify-center gap-2 rounded-box border border-dashed border-ink-border/60 bg-base-200/30">
      <span className="badge badge-outline badge-sm">Coming soon</span>
      <p className="max-w-sm px-4 text-center text-sm text-ink-muted">{label}</p>
    </div>
  )
}

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
          FunnelChart wraps WashChart with Apex funnel and pyramid types, pigment-aware defaults, and
          optional trapezoid tapering between stages.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Funnel"
          title="Plate conversion funnel"
          description="Descending stage counts from studio inquiries through completed plates. Sort values largest first for a classic funnel silhouette."
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
            html={`<!-- FunnelChart canvas -->
<div class="wash-chart"></div>`}
            jsx={`import { FunnelChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<FunnelChart
  height={360}
  title="Plate conversion funnel"
  series={[{ name: 'Conversion', data: [{ x: 'Inquiries', y: 1380 }] }]}
  showDataLabels
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="02 · Pyramid"
          title="Studio enrollment pyramid"
          description="Pyramid charts widen from a narrow top tier to a broad base. List stages in ascending order with distributed pigment colors per band."
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
            html={`<!-- FunnelChart pyramid canvas -->
<div class="wash-chart"></div>`}
            jsx={`import { FunnelChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<FunnelChart height={380} title="Studio enrollment pyramid" variant="pyramid" showDataLabels />`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="03 · Trapezoid tapered"
          title="Trapezoid funnel with tapered base"
          description="Continuous sloped sides between stages with a pointed final tier. Uses plotOptions.funnel.shape trapezoid and lastShape taper on Apex 5.12+."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              trapezoidFunnelSample.enabled ? (
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
              ) : (
                <ComingSoonPreview label="Trapezoid funnel tapering requires ApexCharts 5.12+ funnel shape options." />
              )
            }
            html={`<!-- FunnelChart trapezoid canvas -->
<div class="wash-chart"></div>`}
            jsx={`import { FunnelChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<FunnelChart height={360} shape="trapezoid" lastShape="taper" showDataLabels />`}
          />
        </GallerySection>
      </div>
    </>
  )
}
