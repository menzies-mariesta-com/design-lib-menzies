import { PolarAreaChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import { pigmentShare, windDirectionFrequency } from './data/chart-samples'

const pigmentSeries = pigmentShare.map((p) => p.value)
const pigmentLabels = pigmentShare.map((p) => p.name)

const windSeries = windDirectionFrequency.map((d) => d.value)
const windLabels = windDirectionFrequency.map((d) => d.label)

export default function ChartsPolarAreaCategoryPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Polar Area charts
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Radial sector charts for directional studio metrics and pigment share breakdowns.
          PolarAreaChart applies Wash pigment tokens, optional monochrome shades, and soft fill opacity.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Polar Area"
          title="Basic polar area"
          description="Wind frequency by compass direction. Each sector radius reflects relative share."
        >
          <ShowcaseTabs
            preview={
              <div className="mx-auto w-full max-w-md">
                <PolarAreaChart
                  height={360}
                  series={windSeries}
                  labels={windLabels}
                  title="Wind frequency by direction (%)"
                  showLegend
                  options={{ legend: { position: 'bottom' } }}
                />
              </div>
            }
            html={`<!-- PolarAreaChart canvas -->
<div class="wash-chart"></div>`}
            jsx={`import { PolarAreaChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<PolarAreaChart
  height={360}
  series={[12, 8, 15, 23, 18, 9, 6, 11]}
  labels={['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']}
  title="Wind frequency by direction (%)"
  showLegend
  options={{ legend: { position: 'bottom' } }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="02 · Monochrome"
          title="Polar area monochrome"
          description="Single-hue pigment shades for print-friendly or minimal studio composition reports."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <div className="mx-auto w-full max-w-md">
                <PolarAreaChart
                  height={360}
                  series={pigmentSeries}
                  labels={pigmentLabels}
                  showLegend
                  monochrome
                  options={{ legend: { position: 'bottom' } }}
                />
              </div>
            }
            html={`<!-- PolarAreaChart monochrome -->
<div class="wash-chart"></div>`}
            jsx={`import { PolarAreaChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<PolarAreaChart
  height={360}
  series={[24, 18, 16, 14, 12, 16]}
  labels={['Cerulean', 'Ochre', 'Madder', 'Indigo', 'Viridian', 'Other']}
  showLegend
  monochrome
  options={{ legend: { position: 'bottom' } }}
/>`}
          />
        </GallerySection>
      </div>
    </>
  )
}
