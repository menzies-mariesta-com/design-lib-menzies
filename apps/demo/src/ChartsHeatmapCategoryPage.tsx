import { HeatmapChart } from '#plain/charts'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  chartHtml,
  chartJsx,
  chartSvelteFiles,
} from './snippets/svelte/charts'
import {
  CalendarHeatmapDemo,
  CanvasHeatmapDemo,
  ContinuousDatetimeHeatmapDemo,
  GradientLegendHeatmapDemo,
  HeatmapDrilldownDemo,
} from './components/chartAdvancedDemos'
import {
  pigmentUsageByHour,
  plateActivityGrid,
  studioHours,
  studioWeekdays,
  washIntensityMatrix,
} from './data/chart-samples'

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
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Basic"
          title="Basic heatmap"
          description="Flat grid data converted to a heatmap"
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
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="02 · Color range"
          title="Color range heatmap"
          description="Custom colorScale ranges highlight light, medium, and heavy wash"
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
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="03 · Multiple series"
          title="Multiple series heatmap"
          description="Pre-built series rows map each plate collection to workflow status"
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
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="04 · Rounded"
          title="Rounded heatmap cells"
          description="plotOptions.heatmap.radius softens cell corners"
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
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="05 · Calendar"
          title="Calendar heatmap"
          description="GitHub-style calendar grid"
        >
          <ShowcaseTabs
            preview={<CalendarHeatmapDemo />}
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="06 · Datetime"
          title="Continuous datetime heatmap"
          description="Datetime x-axis buckets for pigment load sampled across continuous"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={<ContinuousDatetimeHeatmapDemo />}
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="07 · Legend"
          title="Gradient legend heatmap"
          description="Horizontal gradient legend bar instead of discrete color range"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={<GradientLegendHeatmapDemo />}
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="08 · Drilldown"
          title="Heatmap drilldown"
          description="Click a cell to drill into plate batches or pigment lot detail"
          panel="wash-panel-slate"
        >
          <ShowcaseTabs
            preview={<HeatmapDrilldownDemo />}
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="09 · Canvas"
          title="Canvas renderer heatmap"
          description="Canvas-backed heatmap renderer for large studio grids"
        >
          <ShowcaseTabs
            preview={<CanvasHeatmapDemo />}
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>
      </div>
    </>
  )
}
