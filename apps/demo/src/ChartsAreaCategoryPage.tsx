import {
  AreaChart,
  GithubStyleAreaChart,
  MissingValuesAreaChart,
  ZoomableTimeSeriesChart,
} from '@menzies-mariesta-com/menzies-design-wash-ui/charts'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  ceruleanTankLevelsWithGaps,
  humiditySensorReadings,
  irregularHumidityReadings,
  ochreTankLevelsWithGaps,
  pigmentLoadDatetimeSeries,
  pigmentLoadTrend,
  pigmentUsageTimeSeries,
  plateArchiveNetChange,
  studioBudgetDelta,
  studioHourLabels,
  washWeekLabels,
} from './data/chart-samples'

export default function ChartsAreaCategoryPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Area charts
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Filled area charts for pigment load, stacked wash layers, and datetime studio metrics.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Area"
          title="Basic area"
          description="AreaChart fills under the curve with a soft pigment gradient"
        >
          <ShowcaseTabs
            preview={
              <AreaChart
                height={300}
                curved={false}
                categories={[...washWeekLabels]}
                series={[{ name: 'Load %', data: pigmentLoadTrend }]}
              />
            }
            html={`<!-- AreaChart canvas -->
<div class="wash-chart"></div>`}
            jsx={`import { AreaChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<AreaChart
  height={300}
  curved={false}
  categories={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
  series={[{ name: 'Load %', data: [32, 38, 35, 44, 41, 48, 52] }]}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="02 · Stacked area"
          title="Stacked wash layers"
          description="Two area series stacked to show glaze vs base wash volume"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <AreaChart
                height={320}
                stacked
                categories={[...washWeekLabels]}
                series={[
                  { name: 'Base wash', data: [8, 10, 9, 12, 11, 6, 7] },
                  { name: 'Glaze', data: [4, 8, 5, 10, 8, 2, 4] },
                ]}
                options={{
                  legend: { position: 'top' },
                  fill: { opacity: 0.75 },
                }}
              />
            }
            html={`<!-- AreaChart stacked -->
<div class="wash-chart"></div>`}
            jsx={`import { AreaChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<AreaChart
  height={320}
  stacked
  categories={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
  series={[
    { name: 'Base wash', data: [8, 10, 9, 12, 11, 6, 7] },
    { name: 'Glaze', data: [4, 8, 5, 10, 8, 2, 4] },
  ]}
  options={{ legend: { position: 'top' }, fill: { opacity: 0.75 } }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="03 · Area spline"
          title="Smooth spline area"
          description="AreaChart with a smooth spline curve under the fill (curved"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <AreaChart
                height={300}
                categories={[...washWeekLabels]}
                series={[{ name: 'Load %', data: pigmentLoadTrend }]}
              />
            }
            html={`<!-- AreaChart spline -->
<div class="wash-chart"></div>`}
            jsx={`import { AreaChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<AreaChart
  height={300}
  categories={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
  series={[{ name: 'Load %', data: [32, 38, 35, 44, 41, 48, 52] }]}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="04 · Datetime area"
          title="Pigment load over days"
          description="AreaChart with a datetime x-axis and ISO date series points"
        >
          <ShowcaseTabs
            preview={
              <AreaChart
                height={320}
                datetime
                yaxisTitle="Load %"
                series={[{ name: 'Pigment load', data: pigmentLoadDatetimeSeries }]}
                options={{
                  xaxis: { labels: { format: 'MMM d' } },
                }}
              />
            }
            html={`<!-- AreaChart datetime -->
<div class="wash-chart"></div>`}
            jsx={`import { AreaChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<AreaChart
  height={320}
  datetime
  yaxisTitle="Load %"
  series={[{
    name: 'Pigment load',
    data: [
      { x: '2026-08-01', y: 32 },
      { x: '2026-08-10', y: 44 },
      { x: '2026-08-22', y: 49 },
    ],
  }]}
  options={{ xaxis: { labels: { format: 'MMM d' } } }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="05 · Missing values"
          title="Humidity sensor gaps"
          description="MissingValuesAreaChart breaks the fill at null sensor outages"
          panel="wash-panel-slate"
        >
          <ShowcaseTabs
            preview={
              <MissingValuesAreaChart
                height={300}
                categories={[...studioHourLabels]}
                yaxisTitle="Humidity %"
                series={[{ name: 'Humidity', data: humiditySensorReadings }]}
              />
            }
            html={`<!-- MissingValuesAreaChart sensor gaps -->
<div class="wash-chart"></div>`}
            jsx={`import { MissingValuesAreaChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<MissingValuesAreaChart
  height={300}
  categories={['8a', '10a', '12p', '2p', '4p', '6p']}
  yaxisTitle="Humidity %"
  series={[{ name: 'Humidity', data: [62, null, 58, null, 55, 51] }]}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="06 · Missing values"
          title="Pigment tank outages"
          description="Cerulean and Ochre tank levels"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <MissingValuesAreaChart
                height={320}
                categories={[...washWeekLabels]}
                yaxisTitle="Tank level %"
                series={[
                  { name: 'Cerulean', data: ceruleanTankLevelsWithGaps },
                  { name: 'Ochre', data: ochreTankLevelsWithGaps },
                ]}
                options={{ legend: { position: 'top' } }}
              />
            }
            html={`<!-- MissingValuesAreaChart pigment outages -->
<div class="wash-chart"></div>`}
            jsx={`import { MissingValuesAreaChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<MissingValuesAreaChart
  height={320}
  categories={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
  yaxisTitle="Tank level %"
  series={[
    { name: 'Cerulean', data: [68, 72, null, null, 75, 82, 79] },
    { name: 'Ochre', data: [64, null, 70, 73, null, 78, 76] },
  ]}
  options={{ legend: { position: 'top' } }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="07 · Negative area"
          title="Budget surplus and deficit"
          description="AreaChart with negative values below the baseline"
        >
          <ShowcaseTabs
            preview={
              <AreaChart
                height={300}
                categories={studioBudgetDelta.map((row) => row.month)}
                yaxisTitle="USD"
                series={[
                  {
                    name: 'Net budget',
                    data: studioBudgetDelta.map((row) => row.delta),
                  },
                ]}
                options={{
                  yaxis: {
                    labels: {
                      formatter: (value: number) => `$${value}`,
                    },
                  },
                }}
              />
            }
            html={`<!-- AreaChart negative values -->
<div class="wash-chart"></div>`}
            jsx={`import { AreaChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<AreaChart
  height={300}
  categories={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
  yaxisTitle="USD"
  series={[{ name: 'Net budget', data: [420, -180, 310, -95, 540, 260] }]}
  options={{
    yaxis: { labels: { formatter: (value) => \`$\${value}\` } },
  }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="08 · Github style"
          title="Archive net change"
          description="GithubStyleAreaChart fills gains in success green and losses in"
          panel="wash-panel-slate"
        >
          <ShowcaseTabs
            preview={
              <GithubStyleAreaChart
                height={320}
                xaxisTitle="Day"
                yaxisTitle="Plates"
                series={[{ name: 'Net archive', data: plateArchiveNetChange }]}
                options={{
                  xaxis: { labels: { format: 'MMM d' } },
                }}
              />
            }
            html={`<!-- GithubStyleAreaChart canvas -->
<div class="wash-chart wash-chart-timeseries"></div>`}
            jsx={`import { GithubStyleAreaChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<GithubStyleAreaChart
  height={320}
  xaxisTitle="Day"
  yaxisTitle="Plates"
  series={[{ name: 'Net archive', data: plateArchiveNetChange }]}
  options={{ xaxis: { labels: { format: 'MMM d' } } }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="09 · Time series"
          title="Pigment usage over months"
          description="Multi-series datetime area chart comparing Cerulean and Ochre ml"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <ZoomableTimeSeriesChart
                height={340}
                chartType="area"
                series={[
                  { name: 'Cerulean', data: pigmentUsageTimeSeries.cerulean },
                  { name: 'Ochre', data: pigmentUsageTimeSeries.ochre },
                ]}
                xaxisTitle="Month"
                yaxisTitle="ml used"
                options={{
                  xaxis: {
                    labels: { format: 'MMM yyyy' },
                  },
                  legend: { position: 'top' },
                }}
              />
            }
            html={`<!-- ZoomableTimeSeriesChart area -->
<div class="wash-chart wash-chart-timeseries"></div>`}
            jsx={`import { ZoomableTimeSeriesChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<ZoomableTimeSeriesChart
  height={340}
  chartType="area"
  series={[
    { name: 'Cerulean', data: pigmentUsageTimeSeries.cerulean },
    { name: 'Ochre', data: pigmentUsageTimeSeries.ochre },
  ]}
  xaxisTitle="Month"
  yaxisTitle="ml used"
  options={{
    xaxis: { labels: { format: 'MMM yyyy' } },
    legend: { position: 'top' },
  }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="10 · Irregular data"
          title="Humidity with uneven sampling"
          description="Datetime area chart with irregular timestamp gaps between studio"
        >
          <ShowcaseTabs
            preview={
              <ZoomableTimeSeriesChart
                height={340}
                chartType="area"
                series={[{ name: 'Humidity %', data: irregularHumidityReadings }]}
                xaxisTitle="Studio day"
                yaxisTitle="Humidity %"
                options={{
                  xaxis: {
                    labels: { format: 'MMM d HH:mm' },
                  },
                }}
              />
            }
            html={`<!-- ZoomableTimeSeriesChart irregular -->
<div class="wash-chart wash-chart-timeseries"></div>`}
            jsx={`import { ZoomableTimeSeriesChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<ZoomableTimeSeriesChart
  height={340}
  chartType="area"
  series={[{ name: 'Humidity %', data: irregularHumidityReadings }]}
  xaxisTitle="Studio day"
  yaxisTitle="Humidity %"
  options={{ xaxis: { labels: { format: 'MMM d HH:mm' } } }}
/>`}
          />
        </GallerySection>
      </div>
    </>
  )
}
