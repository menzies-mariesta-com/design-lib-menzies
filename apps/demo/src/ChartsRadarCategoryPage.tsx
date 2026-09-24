import { RadarChart } from '#plain/charts'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  chartHtml,
  chartJsx,
  chartSvelteFiles,
} from './snippets/svelte/charts'
import {
  basicRadarSample,
  multiRadarSeries,
  polygonRadarSeries,
  studioSkillDimensions,
} from './data/chart-samples'

export default function ChartsRadarCategoryPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Radar Charts
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Multi-axis spider charts for comparing studio skill dimensions across pigments or sessions.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Basic"
          title="Basic radar"
          description="Single-series skill profile across saturation, contrast, texture"
        >
          <ShowcaseTabs
            preview={
              <div className="mx-auto w-full max-w-lg">
                <RadarChart
                  height={360}
                  title="Cerulean wash profile"
                  categories={[...studioSkillDimensions]}
                  series={[{ name: basicRadarSample.name, data: [...basicRadarSample.data] }]}
                  showLegend={false}
                />
              </div>
            }
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="02 · Multiple"
          title="Radar multiple series"
          description="Overlay pigment families on one spider grid to compare studio"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <div className="mx-auto w-full max-w-xl">
                <RadarChart
                  height={380}
                  title="Pigment skill comparison"
                  categories={[...studioSkillDimensions]}
                  series={multiRadarSeries.map((item) => ({
                    name: item.name,
                    data: [...item.data],
                  }))}
                  showLegend
                  options={{ legend: { position: 'bottom' } }}
                />
              </div>
            }
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="03 · Polygon fill"
          title="Radar with polygon fill"
          description="Filled polygons with adjustable opacity"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <div className="mx-auto w-full max-w-xl">
                <RadarChart
                  height={380}
                  title="Session skill overlay"
                  categories={[...studioSkillDimensions]}
                  series={polygonRadarSeries.map((item) => ({
                    name: item.name,
                    data: [...item.data],
                  }))}
                  polygonFill
                  fillOpacity={0.35}
                  showLegend
                  options={{ legend: { position: 'bottom' } }}
                />
              </div>
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
