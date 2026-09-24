import { ViolinChart } from '#plain/charts'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  chartHtml,
  chartJsx,
  chartSvelteFiles,
} from './snippets/svelte/charts'
import {
  ViolinConstrainedJitterDemo,
  ViolinDistributedDemo,
  ViolinGroupNormalizeDemo,
  ViolinJitterDemo,
} from './components/chartAdvancedDemos'
import { horizontalServiceLatencyViolin, pigmentLoadViolin } from './data/chart-samples'

export default function ChartsViolinCategoryPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">Violin Charts</h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Violin plots combine kernel density curves with optional jittered observations.
        </p>
      </div>
      <div className="space-y-6">
        <GallerySection eyebrow="01 · Basic" title="Basic violin" description="Vertical density silhouettes compare pigment load distributions per">
          <ShowcaseTabs
            preview={<ViolinChart height={360} title={pigmentLoadViolin.title} yaxisTitle="Pigment load %" showPoints series={[{ name: 'Pigment load', data: pigmentLoadViolin.data.map((point) => ({ x: point.x, y: point.y })) }]} />}
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>
        <GallerySection eyebrow="02 · Horizontal" title="Horizontal violin" description="Flip violins sideways to compare service latency spreads across API" panel="wash-panel-ochre">
          <ShowcaseTabs
            preview={<ViolinChart height={380} horizontal title={horizontalServiceLatencyViolin.title} xaxisTitle="Latency (ms)" showPoints jitter={0.55} series={[{ name: 'Latency', data: horizontalServiceLatencyViolin.data.map((point) => ({ x: point.x, y: point.y })) }]} />}
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>
        <GallerySection eyebrow="03 · Jitter" title="Violin with jitter" description="Tune jitter spread so overlapping session scores remain readable" panel="wash-panel-rose">
          <ShowcaseTabs
            preview={<ViolinJitterDemo />}
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>
        <GallerySection eyebrow="04 · Group normalize" title="Group-normalized violins" description="Share one density scale across categories so relative widths stay">
          <ShowcaseTabs
            preview={<ViolinGroupNormalizeDemo />}
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>
        <GallerySection eyebrow="05 · Constrained jitter" title="Constrain jitter to violin" description="Clip observation markers to the violin silhouette" panel="wash-panel-slate">
          <ShowcaseTabs
            preview={<ViolinConstrainedJitterDemo />}
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>
        <GallerySection eyebrow="06 · Distributed" title="Distributed colour violins" description="Assign a distinct pigment fill to each category violin on a shared" panel="wash-panel-ochre">
          <ShowcaseTabs
            preview={<ViolinDistributedDemo />}
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>
      </div>
    </>
  )
}
