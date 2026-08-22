import { GanttChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  milestoneReviewWindows,
  pigmentBatchTracks,
  plateProductionTasks,
} from './data/chart-samples'

export default function ChartsGanttPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Gantt charts
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Plan plate production, pigment batches, and review windows on a datetime axis.
          GanttChart uses ApexCharts rangeBar with Wash pigment tokens and responsive layout.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Production"
          title="Plate production timeline"
          description="Single-track Gantt for sketch, wash, and archive phases on one plate series."
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
          eyebrow="02 · Multi-track"
          title="Pigment batch lanes"
          description="Grouped rangeBar rows for parallel cerulean and ochre batches in the studio."
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
            html={`<!-- GanttChart multi-track -->
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
          eyebrow="03 · Milestones"
          title="Review and critique windows"
          description="Short milestone-style ranges for critique slots and sign-off checkpoints."
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
      </div>
    </>
  )
}
