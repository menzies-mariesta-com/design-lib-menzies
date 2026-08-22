import { GanttChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  coloredPlateTasks,
  milestoneReviewWindows,
  pigmentBatchTracks,
  plateProductionTasks,
} from './data/chart-samples'

function ComingSoonPreview({ label }: { label: string }) {
  return (
    <div className="flex h-[280px] flex-col items-center justify-center gap-2 rounded-box border border-dashed border-ink-border/60 bg-base-200/30">
      <span className="badge badge-outline badge-sm">Coming soon</span>
      <p className="max-w-sm px-4 text-center text-sm text-ink-muted">{label}</p>
    </div>
  )
}

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
          GanttChart uses ApexCharts rangeBar (timeline) with Wash pigment tokens, multi-series
          lanes, and responsive row height.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Timeline"
          title="Simple timeline"
          description="Single-track rangeBar for sketch, wash, and archive phases on one plate series."
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
            html={`<!-- GanttChart rangeBar canvas -->
<div class="wash-chart"></div>`}
            jsx={`import { GanttChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<GanttChart
  height={320}
  title="Atlantic Studies · Plate 14"
  tasks={[
    { name: 'Sketch layout', start: '2026-08-01', end: '2026-08-04' },
    { name: 'First wash', start: '2026-08-04', end: '2026-08-08' },
    { name: 'Glaze layer', start: '2026-08-07', end: '2026-08-11' },
    { name: 'Dry and scan', start: '2026-08-11', end: '2026-08-13' },
    { name: 'Archive', start: '2026-08-13', end: '2026-08-15' },
  ]}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="02 · Multi series"
          title="Multi series timeline"
          description="Grouped rangeBar rows for parallel cerulean, ochre, and madder batches in the studio."
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
            html={`<!-- GanttChart multi-series timeline -->
<div class="wash-chart"></div>`}
            jsx={`import { GanttChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<GanttChart
  height={360}
  title="August pigment batches"
  showLegend
  series={[
    {
      name: 'Cerulean',
      tasks: [
        { name: 'Grind', start: '2026-08-02', end: '2026-08-04' },
        { name: 'Mull', start: '2026-08-04', end: '2026-08-07' },
      ],
    },
    {
      name: 'Ochre',
      tasks: [
        { name: 'Grind', start: '2026-08-05', end: '2026-08-07' },
        { name: 'Mull', start: '2026-08-07', end: '2026-08-10' },
      ],
    },
  ]}
  options={{ legend: { position: 'top' } }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="03 · Lanes"
          title="Advanced multi-track lanes"
          description="Short milestone-style ranges with compact bar height for critique slots and sign-off checkpoints."
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
            html={`<!-- GanttChart milestone ranges -->
<div class="wash-chart"></div>`}
            jsx={`import { GanttChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<GanttChart
  height={300}
  title="Critique week"
  tasks={[
    { name: 'Plate 12 review', start: '2026-08-10', end: '2026-08-11' },
    { name: 'Pigment sign-off', start: '2026-08-12', end: '2026-08-13' },
    { name: 'Series wrap', start: '2026-08-14', end: '2026-08-15' },
  ]}
  options={{
    plotOptions: { bar: { borderRadius: 4, barHeight: '48%' } },
  }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="04 · Colors"
          title="Controlling colors"
          description="Per-task fillColor overrides and a custom palette for phase-specific pigment tones."
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
            html={`<!-- GanttChart with per-task colors -->
<div class="wash-chart"></div>`}
            jsx={`import { GanttChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<GanttChart
  height={320}
  title="Plate 14 · Phase colors"
  colors={['#3d7a8c', '#c49a3c', '#9a4d6a', '#4a7a5c', '#5c5a8a']}
  tasks={[
    { name: 'Sketch layout', start: '2026-08-01', end: '2026-08-04', color: '#3d7a8c' },
    { name: 'First wash', start: '2026-08-04', end: '2026-08-08', color: '#c49a3c' },
    { name: 'Glaze layer', start: '2026-08-07', end: '2026-08-11', color: '#9a4d6a' },
    { name: 'Dry and scan', start: '2026-08-11', end: '2026-08-13', color: '#4a7a5c' },
    { name: 'Archive', start: '2026-08-13', end: '2026-08-15', color: '#5c5a8a' },
  ]}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="05 · Group rows"
          title="Multi series group rows"
          description="rangeBarGroupRows stacks multiple series on shared y-axis rows for overlapping schedules."
        >
          <ShowcaseTabs
            preview={
              <ComingSoonPreview label="Grouped row layout for overlapping series on shared task rows." />
            }
            html={`<!-- Multi series group rows (coming soon) -->
<div class="wash-chart"></div>`}
            jsx={`// Multi series group rows — coming soon`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="06 · Dumbbell"
          title="Dumbbell horizontal"
          description="Horizontal dumbbell range bars for start/end markers on the same category row."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <ComingSoonPreview label="Horizontal dumbbell timeline for paired start and end markers." />
            }
            html={`<!-- Dumbbell horizontal timeline (coming soon) -->
<div class="wash-chart"></div>`}
            jsx={`// Dumbbell horizontal timeline — coming soon`}
          />
        </GallerySection>
      </div>
    </>
  )
}
