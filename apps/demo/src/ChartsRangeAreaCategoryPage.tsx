import {
  RangeAreaChart,
  RangeAreaLineComboChart,
} from '@menzies-mariesta-com/menzies-design-wash-ui/charts'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
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
          Shaded bands between low and high studio readings. RangeAreaChart fills the spread between
          sensor bounds; RangeAreaLineComboChart overlays a line for averages or targets within the
          band.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Range area"
          title="Studio humidity spread"
          description="RangeAreaChart shades the gap between minimum and maximum humidity readings across studio hours."
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
                    data: studioHumidityRange.low.map((low, index) => [
                      low,
                      studioHumidityRange.high[index] ?? low,
                    ]),
                  },
                ]}
                options={{ legend: { position: 'top' } }}
              />
            }
            html={`<!-- RangeAreaChart canvas -->
<div class="wash-chart"></div>`}
            jsx={`import { RangeAreaChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<RangeAreaChart
  height={320}
  yaxisTitle="Humidity %"
  categories={['8a', '10a', '12p', '2p', '4p', '6p']}
  series={[
    {
      name: 'Humidity range',
      data: [
        [48, 68],
        [52, 72],
        [55, 75],
        [58, 78],
        [54, 74],
        [50, 62],
      ],
    },
  ]}
  options={{ legend: { position: 'top' } }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="02 · Range area + line"
          title="Pigment load band with average"
          description="RangeAreaLineComboChart fills the expected load spread and draws a line for the weekly average."
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
            html={`<!-- RangeAreaLineComboChart canvas -->
<div class="wash-chart"></div>`}
            jsx={`import { RangeAreaLineComboChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<RangeAreaLineComboChart
  height={320}
  title="Pigment load forecast"
  yaxisTitle="Load %"
  categories={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
  rangeSeries={{
    name: 'Expected range',
    low: [28, 32, 30, 38, 36, 42, 46],
    high: [36, 44, 40, 50, 46, 54, 58],
  }}
  lineSeries={{
    name: 'Average load',
    data: [32, 38, 35, 44, 41, 48, 52],
  }}
  options={{ legend: { position: 'top' } }}
/>`}
          />
        </GallerySection>
      </div>
    </>
  )
}
