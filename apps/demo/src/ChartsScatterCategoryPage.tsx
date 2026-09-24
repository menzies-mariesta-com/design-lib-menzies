import { ScatterChart } from '#plain/charts'
import { ScatterCanvasDemo, ScatterImagesDemo } from './chart-demos/cartesian-demos'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  chartHtml,
  chartJsx,
  chartSvelteFiles,
} from './snippets/svelte/charts'
import {
  critiqueScoreJitter,
  pigmentViscosityScatter,
  plateMoistureScatter,
} from './data/chart-samples'

export default function ChartsScatterCategoryPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Scatter Charts
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Plot numeric or datetime x/y pairs with optional horizontal jitter for overlapping
          buckets.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Basic"
          title="Basic scatter"
          description="Numeric x/y pairs across pigment families"
        >
          <ShowcaseTabs
            preview={
              <ScatterChart
                height={360}
                title="Viscosity vs wash intensity"
                xaxisTitle="Wash intensity %"
                yaxisTitle="Viscosity (cP)"
                series={pigmentViscosityScatter.map((item) => ({
                  name: item.name,
                  data: [...item.data],
                }))}
                options={{ legend: { position: 'top' } }}
              />
            }
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="02 · Datetime"
          title="Datetime scatter"
          description="ISO timestamps track plate moisture over drying cycles"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <ScatterChart
                height={360}
                datetime
                title="Plate moisture readings"
                xaxisTitle="Reading time"
                yaxisTitle="Moisture %"
                series={plateMoistureScatter.map((item) => ({
                  name: item.name,
                  data: [...item.data],
                }))}
              />
            }
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="03 · Jitter"
          title="Scatter with jitter"
          description="Horizontal jitter separates overlapping session buckets on the"
        >
          <ShowcaseTabs
            preview={
              <ScatterChart
                height={360}
                title="Critique scores by session"
                jitterX={0.18}
                series={critiqueScoreJitter.map((item) => ({
                  name: item.name,
                  data: [...item.data],
                }))}
                options={{
                  xaxis: {
                    tickAmount: 4,
                    labels: { formatter: (value: string) => `S${value}` },
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
          eyebrow="04 · Images"
          title="Scatter images"
          description="Image fill markers on scatter points"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={<ScatterImagesDemo />}
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="05 · Canvas"
          title="Scatter canvas renderer"
          description="Large scatter datasets with animations disabled"
        >
          <ShowcaseTabs
            preview={<ScatterCanvasDemo />}
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>
      </div>
    </>
  )
}
