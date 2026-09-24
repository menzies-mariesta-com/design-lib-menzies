import {
  RangeAreaChart,
  RangeAreaLineComboChart,
} from '#plain/charts'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  chartHtml,
  chartJsx,
  chartSvelteFiles,
} from './snippets/svelte/charts'
import {
  pigmentLoadRangeCombo,
  studioHumidityRange,
} from './data/chart-samples'

export default function ChartsRangeAreaCategoryPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Range area charts
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Shaded bands between low and high studio readings.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Range area"
          title="Studio humidity spread"
          description="RangeAreaChart shades the gap between minimum and maximum humidity"
        >
          <ShowcaseTabs
            preview={
              <RangeAreaChart
                height={320}
                yaxisTitle="Humidity %"
                categories={[...studioHumidityRange.categories]}
                series={[
                  {
                    name: 'Humidity range',
                    data: studioHumidityRange.low.map(
                      (low, index): [number, number] => [
                        low,
                        studioHumidityRange.high[index] ?? low,
                      ],
                    ),
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
          eyebrow="02 · Range area + line"
          title="Pigment load band with average"
          description="RangeAreaLineComboChart fills the expected load spread and draws a"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <RangeAreaLineComboChart
                height={320}
                title="Pigment load forecast"
                yaxisTitle="Load %"
                categories={[...pigmentLoadRangeCombo.categories]}
                rangeSeries={{
                  name: 'Expected range',
                  low: [...pigmentLoadRangeCombo.low],
                  high: [...pigmentLoadRangeCombo.high],
                }}
                lineSeries={{
                  name: 'Average load',
                  data: [...pigmentLoadRangeCombo.average],
                }}
                options={{ legend: { position: 'top' } }}
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
