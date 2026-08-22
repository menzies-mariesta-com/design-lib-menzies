import { BoxPlotChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
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
          lanes. BoxPlotChart wraps WashChart with Apex boxPlot types, pigment upper/lower fills, and
          optional horizontal orientation.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Basic"
          title="Basic box plot"
          description="Vertical whiskers show min, quartiles, median, and max dry times per pigment family."
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
            html={`<!-- BoxPlotChart canvas -->
<div class="wash-chart"></div>`}
            jsx={`import { BoxPlotChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<BoxPlotChart
  height={360}
  title="Pigment dry time distribution"
  yaxisTitle="Dry time (min)"
  series={[
    {
      name: 'Dry time',
      data: [{ x: 'Cerulean', y: [18, 24, 28, 34, 42] }],
    },
  ]}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="02 · Horizontal"
          title="Horizontal box plot"
          description="Flip whiskers sideways to compare critique score spreads across studio lanes."
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
            html={`<!-- BoxPlotChart horizontal -->
<div class="wash-chart"></div>`}
            jsx={`import { BoxPlotChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<BoxPlotChart
  height={380}
  horizontal
  title="Critique score spread by studio lane"
  xaxisTitle="Critique score"
  series={[
    {
      name: 'Score spread',
      data: [{ x: 'Atlantic Studies', y: [62, 71, 78, 86, 94] }],
    },
  ]}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="03 · Outliers"
          title="Box plot with points"
          description="Overlay scatter outliers on each whisker group for sessions outside the IQR."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={<BoxPlotWithPointsDemo />}
            html={`<!-- BoxPlotChart with points -->
<div class="wash-chart"></div>`}
            jsx={`import { BoxPlotChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<BoxPlotChart
  height={380}
  title="Dry time with session outliers"
  yaxisTitle="Dry time (min)"
  showPoints
  whiskers="tukey"
  series={[
    {
      name: 'Dry time',
      data: [{ x: 'Cerulean', y: [18, 24, 28, 34, 42], points: [18, 22, 28, 34, 58] }],
    },
  ]}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="04 · Scatter combo"
          title="Box plot scatter"
          description="Dedicated scatter layer for outlier points on vertical box plots."
        >
          <ShowcaseTabs
            preview={<BoxPlotScatterComboDemo />}
            html={`<!-- BoxPlotChart scatter combo -->
<div class="wash-chart"></div>`}
            jsx={`import { WashChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<WashChart
  type="boxPlot"
  height={380}
  series={[
    { name: 'Dry time', type: 'boxPlot', data: [{ x: 'Cerulean', y: [18, 24, 28, 34, 42] }] },
    { name: 'Outliers', type: 'scatter', data: [{ x: 'Cerulean', y: 58 }] },
  ]}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="05 · Horizontal points"
          title="Horizontal box plot with points"
          description="Outlier markers on horizontal whiskers with Tukey fences and jitter."
          panel="wash-panel-slate"
        >
          <ShowcaseTabs
            preview={<HorizontalBoxPlotWithPointsDemo />}
            html={`<!-- Horizontal BoxPlotChart with points -->
<div class="wash-chart"></div>`}
            jsx={`import { BoxPlotChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<BoxPlotChart
  height={380}
  horizontal
  title="Critique scores with outlier sessions"
  xaxisTitle="Critique score"
  showPoints
  whiskers="tukey"
  series={[
    {
      name: 'Score spread',
      data: [{ x: 'Atlantic Studies', y: [62, 71, 78, 86, 94], points: [62, 78, 94, 98] }],
    },
  ]}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="06 · Raw observations"
          title="Box plot from raw observations"
          description="Compute five-number summaries from raw observation arrays at render time."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={<BoxPlotFromObservationsDemo />}
            html={`<!-- BoxPlotChart from raw observations -->
<div class="wash-chart"></div>`}
            jsx={`import { BoxPlotChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<BoxPlotChart
  height={380}
  title="Dry time from raw observations"
  showPoints
  whiskers="tukey"
  series={[
    {
      name: 'Dry time',
      data: [{ x: 'Cerulean', points: [18, 22, 28, 34, 42, 58] }],
    },
  ]}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="07 · Shared scale"
          title="Same box, different data"
          description="Align multiple box plot series on one category axis with distinct pigment fills."
        >
          <ShowcaseTabs
            preview={<SameBoxDifferentDataDemo />}
            html={`<!-- Same box different data -->
<div class="wash-chart"></div>`}
            jsx={`import { BoxPlotChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<BoxPlotChart
  height={400}
  title="Morning vs evening dry time"
  showLegend
  series={[
    { name: 'Morning batch', data: [{ x: 'Cerulean', y: [16, 22, 26, 32, 38] }] },
    { name: 'Evening batch', data: [{ x: 'Cerulean', y: [22, 28, 32, 38, 46] }] },
  ]}
/>`}
          />
        </GallerySection>
      </div>
    </>
  )
}
