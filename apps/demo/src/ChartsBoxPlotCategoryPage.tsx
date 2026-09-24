import { BoxPlotChart } from '#plain/charts'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  chartHtml,
  chartJsx,
  chartSvelteFiles,
} from './snippets/svelte/charts'
import {
  BoxPlotFromObservationsDemo,
  BoxPlotScatterComboDemo,
  BoxPlotWithPointsDemo,
  HorizontalBoxPlotWithPointsDemo,
  SameBoxDifferentDataDemo,
} from './components/chartDistributionDemos'
import {
  horizontalStudioLaneBoxPlot,
  pigmentDryTimeBoxPlot,
} from './data/chart-samples'

export default function ChartsBoxPlotCategoryPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          BoxPlot Charts
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Box-and-whisker charts summarize five-number distributions across pigment families or studio
          lanes.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Basic"
          title="Basic box plot"
          description="Vertical whiskers show min, quartiles, median, and max dry times per"
        >
          <ShowcaseTabs
            preview={
              <BoxPlotChart
                height={360}
                title={pigmentDryTimeBoxPlot.title}
                yaxisTitle="Dry time (min)"
                series={[
                  {
                    name: 'Dry time',
                    data: pigmentDryTimeBoxPlot.data.map((point) => ({
                      x: point.x,
                      y: [...point.y] as [number, number, number, number, number],
                    })),
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
          eyebrow="02 · Horizontal"
          title="Horizontal box plot"
          description="Flip whiskers sideways to compare critique score spreads"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <BoxPlotChart
                height={380}
                horizontal
                title={horizontalStudioLaneBoxPlot.title}
                xaxisTitle="Critique score"
                series={[
                  {
                    name: 'Score spread',
                    data: horizontalStudioLaneBoxPlot.data.map((point) => ({
                      x: point.x,
                      y: [...point.y] as [number, number, number, number, number],
                    })),
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
          eyebrow="03 · Outliers"
          title="Box plot with points"
          description="Overlay scatter outliers on each whisker group"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={<BoxPlotWithPointsDemo />}
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="04 · Scatter combo"
          title="Box plot scatter"
          description="Dedicated scatter layer for outlier points on vertical box plots"
        >
          <ShowcaseTabs
            preview={<BoxPlotScatterComboDemo />}
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="05 · Horizontal points"
          title="Horizontal box plot with points"
          description="Outlier markers on horizontal whiskers with Tukey fences and jitter"
          panel="wash-panel-slate"
        >
          <ShowcaseTabs
            preview={<HorizontalBoxPlotWithPointsDemo />}
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="06 · Raw observations"
          title="Box plot from raw observations"
          description="Compute five-number summaries from raw observation arrays at render"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={<BoxPlotFromObservationsDemo />}
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="07 · Shared scale"
          title="Same box, different data"
          description="Align multiple box plot series on one category axis"
        >
          <ShowcaseTabs
            preview={<SameBoxDifferentDataDemo />}
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>
      </div>
    </>
  )
}
