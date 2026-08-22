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

function ComingSoonPreview({ label }: { label: string }) {
  return (
    <div className="flex h-[280px] flex-col items-center justify-center gap-2 rounded-box border border-dashed border-ink-border/60 bg-base-200/30">
      <span className="badge badge-outline badge-sm">Coming soon</span>
      <p className="max-w-sm px-4 text-center text-sm text-ink-muted">{label}</p>
    </div>
  )
}

export default function ChartsHeatmapCategoryPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Heatmap Charts
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Visualize pigment usage, plate activity, and wash intensity across studio grids.
          HeatmapChart applies Wash pigment color scales, custom range legends, multi-series
          matrices, and rounded cells. Calendar, datetime, gradient legend, drilldown, and canvas
          renderer variants are planned for a future release.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Basic"
          title="Basic heatmap"
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
          eyebrow="02 · Color range"
          title="Color range heatmap"
          description="Custom colorScale ranges highlight light, medium, and heavy wash layers by pigment."
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
  options={{ legend: { position: 'bottom' } }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="03 · Multiple series"
          title="Multiple series heatmap"
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
  options={{
    plotOptions: {
      heatmap: { shadeIntensity: 0.55 },
    },
  }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="04 · Rounded"
          title="Rounded heatmap cells"
          description="plotOptions.heatmap.radius softens cell corners for a tile-like studio usage grid."
          panel="wash-panel-slate"
        >
          <ShowcaseTabs
            preview={
              <HeatmapChart
                height={320}
                data={pigmentUsageByHour}
                xCategories={[...studioHours]}
                yCategories={[...studioWeekdays]}
                title="Rounded studio grid"
                options={{
                  plotOptions: {
                    heatmap: {
                      radius: 8,
                      shadeIntensity: 0.5,
                    },
                  },
                  stroke: {
                    width: 0,
                  },
                }}
              />
            }
            html={`<!-- HeatmapChart rounded cells -->
<div class="wash-chart"></div>`}
            jsx={`import { HeatmapChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<HeatmapChart
  height={320}
  data={pigmentUsageByHour}
  xCategories={['8a', '10a', '12p', '2p', '4p', '6p']}
  yCategories={['Mon', 'Tue', 'Wed', 'Thu', 'Fri']}
  title="Rounded studio grid"
  options={{
    plotOptions: {
      heatmap: {
        radius: 8,
        shadeIntensity: 0.5,
      },
    },
    stroke: { width: 0 },
  }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="05 · Calendar"
          title="Calendar heatmap"
          description="GitHub-style calendar grid for daily wash counts across the studio year."
        >
          <ShowcaseTabs
            preview={
              <ComingSoonPreview label="Year-long calendar heatmap with weekday columns and month labels." />
            }
            html={`<!-- Calendar heatmap (coming soon) -->
<div class="wash-chart"></div>`}
            jsx={`// Calendar heatmap — coming soon`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="06 · Datetime"
          title="Continuous datetime heatmap"
          description="Datetime x-axis buckets for pigment load sampled across continuous studio hours."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <ComingSoonPreview label="Continuous datetime axis with hour buckets and smooth color interpolation." />
            }
            html={`<!-- Continuous datetime heatmap (coming soon) -->
<div class="wash-chart"></div>`}
            jsx={`// Continuous datetime heatmap — coming soon`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="07 · Legend"
          title="Gradient legend heatmap"
          description="Horizontal gradient legend bar instead of discrete color range chips."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <ComingSoonPreview label="Gradient color legend with min and max pigment intensity labels." />
            }
            html={`<!-- Gradient legend heatmap (coming soon) -->
<div class="wash-chart"></div>`}
            jsx={`// Gradient legend heatmap — coming soon`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="08 · Drilldown"
          title="Heatmap drilldown"
          description="Click a cell to drill into plate batches or pigment lot detail for that time slot."
          panel="wash-panel-slate"
        >
          <ShowcaseTabs
            preview={
              <ComingSoonPreview label="Click-through drilldown from summary cell to batch detail." />
            }
            html={`<!-- Heatmap drilldown (coming soon) -->
<div class="wash-chart"></div>`}
            jsx={`// Heatmap drilldown — coming soon`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="09 · Canvas"
          title="Canvas renderer heatmap"
          description="Canvas-backed heatmap renderer for large studio grids with thousands of cells."
        >
          <ShowcaseTabs
            preview={
              <ComingSoonPreview label="High-density canvas renderer for large pigment usage matrices." />
            }
            html={`<!-- Canvas renderer heatmap (coming soon) -->
<div class="wash-chart"></div>`}
            jsx={`// Canvas renderer heatmap — coming soon`}
          />
        </GallerySection>
      </div>
    </>
  )
}
