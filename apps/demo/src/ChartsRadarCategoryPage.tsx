import { RadarChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
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
            html={`<!-- RadarChart basic -->\n<div class="wash-chart"></div>`}
            jsx={`import { RadarChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'\n\n<RadarChart\n  height={360}\n  title="Cerulean wash profile"\n  categories={['Saturation', 'Contrast', 'Texture', 'Flow', 'Edge control', 'Blend']}\n  series={[{ name: 'Cerulean wash', data: [78, 65, 82, 70, 88, 74] }]}\n  showLegend={false}\n/>`}
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
            html={`<!-- RadarChart multiple series -->\n<div class="wash-chart"></div>`}
            jsx={`import { RadarChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'\n\n<RadarChart\n  height={380}\n  title="Pigment skill comparison"\n  categories={['Saturation', 'Contrast', 'Texture', 'Flow', 'Edge control', 'Blend']}\n  series={[\n    { name: 'Cerulean', data: [78, 65, 82, 70, 88, 74] },\n    { name: 'Ochre', data: [62, 88, 58, 75, 52, 80] },\n    { name: 'Madder', data: [85, 72, 68, 82, 76, 65] },\n  ]}\n  showLegend\n  options={{ legend: { position: 'bottom' } }}\n/>`}
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
            html={`<!-- RadarChart polygon fill -->\n<div class="wash-chart"></div>`}
            jsx={`import { RadarChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'\n\n<RadarChart\n  height={380}\n  title="Session skill overlay"\n  categories={['Saturation', 'Contrast', 'Texture', 'Flow', 'Edge control', 'Blend']}\n  series={[\n    { name: 'Morning session', data: [72, 68, 75, 80, 65, 70] },\n    { name: 'Evening session', data: [58, 82, 62, 70, 78, 85] },\n  ]}\n  polygonFill\n  fillOpacity={0.35}\n  showLegend\n  options={{ legend: { position: 'bottom' } }}\n/>`}
          />
        </GallerySection>
      </div>
    </>
  )
}
