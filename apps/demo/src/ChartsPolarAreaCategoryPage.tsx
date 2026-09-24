import { PolarAreaChart } from '#plain/charts'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  chartHtml,
  chartJsx,
  chartSvelteFiles,
} from './snippets/svelte/charts'
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
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Polar Area"
          title="Basic polar area"
          description="Wind frequency by compass direction"
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
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="02 · Monochrome"
          title="Polar area monochrome"
          description="Single-hue pigment shades"
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
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>
      </div>
    </>
  )
}
