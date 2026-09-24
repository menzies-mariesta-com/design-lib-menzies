import { GanttChart } from '#plain/charts'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  chartHtml,
  chartJsx,
  chartSvelteFiles,
} from './snippets/svelte/charts'
import { TimelineDumbbellDemo, TimelineGroupRowsDemo } from './components/chartAdvancedDemos'
import {
  coloredPlateTasks,
  milestoneReviewWindows,
  pigmentBatchTracks,
  plateProductionTasks,
} from './data/chart-samples'

export default function ChartsTimelineCategoryPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Timeline
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Plan plate production, pigment batches, and review windows on a datetime axis.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Timeline"
          title="Simple timeline"
          description="Single-track rangeBar for sketch, wash, and archive phases on one"
        >
          <ShowcaseTabs
            preview={
              <GanttChart
                height={320}
                title="Atlantic Studies · Plate 14"
                tasks={plateProductionTasks}
                showLegend={false}
              />
            }
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="02 · Multi series"
          title="Multi series timeline"
          description="Grouped rangeBar rows for parallel cerulean, ochre"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <GanttChart
                height={360}
                title="August pigment batches"
                series={pigmentBatchTracks}
                showLegend
                options={{ legend: { position: 'top' } }}
              />
            }
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="03 · Lanes"
          title="Advanced multi-track lanes"
          description="Short milestone-style ranges"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <GanttChart
                height={300}
                title="Critique week"
                subtitle="Compact ranges for studio review slots"
                tasks={milestoneReviewWindows}
                showLegend={false}
                options={{
                  plotOptions: {
                    bar: {
                      borderRadius: 4,
                      barHeight: '48%',
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
          eyebrow="04 · Colors"
          title="Controlling colors"
          description="Per-task fillColor overrides and a custom palette"
        >
          <ShowcaseTabs
            preview={
              <GanttChart
                height={320}
                title="Plate 14 · Phase colors"
                tasks={coloredPlateTasks}
                showLegend={false}
                colors={['#3d7a8c', '#c49a3c', '#9a4d6a', '#4a7a5c', '#5c5a8a']}
              />
            }
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="05 · Group rows"
          title="Multi series group rows"
          description="rangeBarGroupRows stacks multiple series on shared y-axis rows"
        >
          <ShowcaseTabs
            preview={<TimelineGroupRowsDemo />}
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="06 · Dumbbell"
          title="Dumbbell horizontal"
          description="Horizontal dumbbell range bars"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={<TimelineDumbbellDemo />}
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>
      </div>
    </>
  )
}
