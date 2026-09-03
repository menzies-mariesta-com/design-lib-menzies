import { useMemo } from 'react'
import type { ApexOptions } from 'apexcharts'
import {
  CandlestickChart,
  WashChart,
  buildTimeSeriesOptions,
  mergeApexOptions,
  readWashChartTokens,
  useWashChartTheme,
} from '@menzies-mariesta-com/menzies-design-wash-ui/charts'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  ceruleanCloseMovingAverage,
  ceruleanInventoryOhlc,
  ceruleanRestockVolume,
} from './data/chart-samples'

function CandlestickBarComboPreview() {
  const themeKey = useWashChartTheme()
  const options: ApexOptions = useMemo(() => {
    void themeKey
    const tokens = readWashChartTokens()
    return mergeApexOptions(
      buildTimeSeriesOptions({
        title: 'Cerulean inventory and restock volume',
        xaxisTitle: 'Studio day',
        yaxisTitle: 'Inventory (ml)',
        showLegend: true,
        showToolbar: true,
      }),
      {
        chart: { type: 'candlestick' },
        plotOptions: {
          bar: { columnWidth: '40%' },
          candlestick: {
            colors: { upward: tokens.success, downward: tokens.error },
            wick: { useFillColor: true },
          },
        },
        stroke: { width: [1, 0] },
        yaxis: [
          { title: { text: 'Inventory (ml)' }, tooltip: { enabled: true } },
          { opposite: true, title: { text: 'Restock volume (ml)' }, max: 60 },
        ],
      },
    )
  }, [themeKey])

  const series = useMemo(
    () => [
      {
        name: 'Cerulean inventory',
        type: 'candlestick' as const,
        data: ceruleanInventoryOhlc.map((point) => ({ ...point, y: [...point.y] })),
      },
      {
        name: 'Restock volume',
        type: 'column' as const,
        data: ceruleanRestockVolume.map((point) => ({ ...point })),
      },
    ],
    [],
  )

  return <WashChart type="candlestick" series={series} options={options} height={360} />
}

function CandlestickLineComboPreview() {
  const themeKey = useWashChartTheme()
  const options: ApexOptions = useMemo(() => {
    void themeKey
    const tokens = readWashChartTokens()
    return mergeApexOptions(
      buildTimeSeriesOptions({
        title: 'Cerulean inventory with 5-day average',
        xaxisTitle: 'Studio day',
        yaxisTitle: 'Inventory (ml)',
        showLegend: true,
        showToolbar: true,
      }),
      {
        chart: { type: 'candlestick' },
        plotOptions: {
          candlestick: {
            colors: { upward: tokens.success, downward: tokens.error },
            wick: { useFillColor: true },
          },
        },
        stroke: { width: [1, 3], curve: 'smooth' },
        markers: { size: [0, 0] },
      },
    )
  }, [themeKey])

  const series = useMemo(
    () => [
      {
        name: 'Cerulean inventory',
        type: 'candlestick' as const,
        data: ceruleanInventoryOhlc.map((point) => ({ ...point, y: [...point.y] })),
      },
      {
        name: '5-day close average',
        type: 'line' as const,
        data: ceruleanCloseMovingAverage.map((point) => ({ ...point })),
      },
    ],
    [],
  )

  return <WashChart type="candlestick" series={series} options={options} height={360} />
}

export default function ChartsCandlestickCategoryPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Candlestick Charts
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Plot open, high, low, and close readings on datetime axes for pigment inventory swings.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Basic"
          title="Basic candlestick"
          description="Daily cerulean inventory OHLC bands across August studio days"
        >
          <ShowcaseTabs
            preview={
              <CandlestickChart
                height={360}
                title="Cerulean inventory OHLC"
                xaxisTitle="Studio day"
                yaxisTitle="Inventory (ml)"
                series={[
                  {
                    name: 'Cerulean inventory',
                    data: ceruleanInventoryOhlc.map((point) => ({
                      x: point.x,
                      y: [...point.y],
                    })),
                  },
                ]}
              />
            }
            html={`<!-- CandlestickChart canvas -->
<div class="wash-chart"></div>`}
            jsx={`import { CandlestickChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<CandlestickChart
  height={360}
  title="Cerulean inventory OHLC"
  xaxisTitle="Studio day"
  yaxisTitle="Inventory (ml)"
  series={[
    {
      name: 'Cerulean inventory',
      data: [
        { x: new Date('2026-08-01').getTime(), y: [420, 445, 410, 438] },
        { x: new Date('2026-08-02').getTime(), y: [438, 452, 425, 430] },
      ],
    },
  ]}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="02 · Combo"
          title="Candlestick bar"
          description="Column volume bars on a secondary axis track daily restock"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={<CandlestickBarComboPreview />}
            html={`<!-- Candlestick + column volume combo -->
<div class="wash-chart"></div>`}
            jsx={`import { WashChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<WashChart
  type="candlestick"
  height={360}
  series={[
    { name: 'Cerulean inventory', type: 'candlestick', data: [{ x: timestamp, y: [open, high, low, close] }] },
    { name: 'Restock volume', type: 'column', data: [{ x: timestamp, y: 28 }] },
  ]}
  options={{
    yaxis: [
      { title: { text: 'Inventory (ml)' } },
      { opposite: true, title: { text: 'Restock volume (ml)' } },
    ],
  }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="03 · Combo"
          title="Candlestick line"
          description="Smoothed line overlay shows a 5-day moving average of close"
        >
          <ShowcaseTabs
            preview={<CandlestickLineComboPreview />}
            html={`<!-- Candlestick + line moving average -->
<div class="wash-chart"></div>`}
            jsx={`import { WashChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<WashChart
  type="candlestick"
  height={360}
  series={[
    { name: 'Cerulean inventory', type: 'candlestick', data: [{ x: timestamp, y: [open, high, low, close] }] },
    { name: '5-day close average', type: 'line', data: [{ x: timestamp, y: 431 }] },
  ]}
  options={{ stroke: { width: [1, 3], curve: 'smooth' } }}
/>`}
          />
        </GallerySection>
      </div>
    </>
  )
}
