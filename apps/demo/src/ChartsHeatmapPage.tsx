import { HeatmapChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  pigmentUsageByHour,
  plateActivityGrid,
  studioHours,
  studioWeekdays,
  washIntensityMatrix,
} from './data/chart-samples'

export default function ChartsHeatmapPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Heatmap charts
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Visualize pigment usage, plate activity, and wash intensity across studio grids.
          HeatmapChart applies Wash pigment color scales and syncs with light and dark mode.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Usage grid"
          title="Pigment usage by day and hour"
          description="Flat grid data converted to a heatmap with weekday rows and studio hour columns."
        >
          <ShowcaseTabs
            preview={
              <HeatmapChart
                height={320}
                data={pigmentUsageByHour}
                xCategories={[...studioHours]}
                yCategories={[...studioWeekdays]}
                title="Studio pigment load"
              />
            }
            html={`<!-- HeatmapChart canvas -->
<div class="wash-chart"></div>`}
            jsx={`import { HeatmapChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<HeatmapChart
  height={320}
  data={[
    { x: '8a', y: 'Mon', value: 12 },
    { x: '10a', y: 'Mon', value: 28 },
    // ...
  ]}
  xCategories={['8a', '10a', '12p', '2p', '4p', '6p']}
  yCategories={['Mon', 'Tue', 'Wed', 'Thu', 'Fri']}
  title="Studio pigment load"
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="02 · Plate activity"
          title="Series activity by status"
          description="Pre-built series rows map each plate collection to workflow status columns."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <HeatmapChart
                height={340}
                series={plateActivityGrid}
                options={{
                  plotOptions: {
                    heatmap: {
                      shadeIntensity: 0.55,
                    },
                  },
                }}
              />
            }
            html={`<!-- HeatmapChart series grid -->
<div class="wash-chart"></div>`}
            jsx={`import { HeatmapChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<HeatmapChart
  height={340}
  series={[
    {
      name: 'Atlantic Studies',
      data: [
        { x: 'Draft', y: 8 },
        { x: 'In wash', y: 14 },
        { x: 'Review', y: 6 },
        { x: 'Archived', y: 22 },
      ],
    },
    // ...
  ]}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="03 · Intensity matrix"
          title="Wash intensity by pigment"
          description="Custom colorScale ranges highlight light, medium, and heavy wash layers."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <HeatmapChart
                height={300}
                data={washIntensityMatrix}
                xCategories={['Light', 'Medium', 'Heavy']}
                yCategories={['Cerulean', 'Ochre', 'Madder', 'Indigo']}
                colorScale={{
                  ranges: [
                    { from: 0, to: 35, color: '#276c8e', name: 'Light' },
                    { from: 36, to: 55, color: '#4a7a8e', name: 'Medium' },
                    { from: 56, to: 75, color: '#b87524', name: 'Heavy' },
                    { from: 76, to: 100, color: '#a33a32', name: 'Deep' },
                  ],
                }}
                options={{
                  legend: { position: 'bottom' },
                }}
              />
            }
            html={`<!-- HeatmapChart with custom colorScale -->
<div class="wash-chart"></div>`}
            jsx={`import { HeatmapChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<HeatmapChart
  height={300}
  data={[
    { x: 'Light', y: 'Cerulean', value: 72 },
    { x: 'Medium', y: 'Cerulean', value: 48 },
    // ...
  ]}
  xCategories={['Light', 'Medium', 'Heavy']}
  yCategories={['Cerulean', 'Ochre', 'Madder', 'Indigo']}
  colorScale={{
    ranges: [
      { from: 0, to: 35, color: '#276c8e', name: 'Light' },
      { from: 36, to: 55, color: '#4a7a8e', name: 'Medium' },
      { from: 56, to: 75, color: '#b87524', name: 'Heavy' },
      { from: 76, to: 100, color: '#a33a32', name: 'Deep' },
    ],
  }}
/>`}
          />
        </GallerySection>
      </div>
    </>
  )
}
