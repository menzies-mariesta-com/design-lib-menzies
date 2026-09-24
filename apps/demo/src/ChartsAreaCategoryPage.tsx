import {
  AreaChart,
  GithubStyleAreaChart,
  MissingValuesAreaChart,
  ZoomableTimeSeriesChart,
} from '#plain/charts'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  chartHtml,
  chartJsx,
  chartSvelteFiles,
} from './snippets/svelte/charts'
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
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
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
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
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
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
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
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
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
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
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
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
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
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
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
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
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
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
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
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>
      </div>
    </>
  )
}
