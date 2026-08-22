import { ViolinChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import { horizontalServiceLatencyViolin, pigmentLoadViolin } from './data/chart-samples'

function ComingSoonPreview({ label }: { label: string }) {
  return (
    <div className="flex h-[320px] flex-col items-center justify-center gap-2 rounded-box border border-dashed border-ink-border/60 bg-base-200/30">
      <span className="badge badge-outline badge-sm">Coming soon</span>
      <p className="max-w-sm px-4 text-center text-sm text-ink-muted">{label}</p>
    </div>
  )
}

export default function ChartsViolinCategoryPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">Violin Charts</h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Violin plots combine kernel density curves with optional jittered observations. ViolinChart wraps WashChart with Apex violin types, horizontal layout, bandwidth scaling, and group normalization controls.
        </p>
      </div>
      <div className="space-y-6">
        <GallerySection eyebrow="01 · Basic" title="Basic violin" description="Vertical density silhouettes compare pigment load distributions per colour family.">
          <ShowcaseTabs
            preview={<ViolinChart height={360} title={pigmentLoadViolin.title} yaxisTitle="Pigment load %" showPoints series={[{ name: 'Pigment load', data: pigmentLoadViolin.data.map((point) => ({ x: point.x, y: point.y })) }]} />}
            html={'<!-- ViolinChart canvas -->\n<div class="wash-chart"></div>'}
            jsx={`import { ViolinChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'\n\n<ViolinChart height={360} title="Pigment load distribution" yaxisTitle="Pigment load %" showPoints series={[{ name: 'Pigment load', data: [{ x: 'Cerulean', y: { density: [[40, 0.2]], points: [48, 52] } }] }]} />`}
          />
        </GallerySection>
        <GallerySection eyebrow="02 · Horizontal" title="Horizontal violin" description="Flip violins sideways to compare service latency spreads across API lanes." panel="wash-panel-ochre">
          <ShowcaseTabs
            preview={<ViolinChart height={380} horizontal title={horizontalServiceLatencyViolin.title} xaxisTitle="Latency (ms)" showPoints jitter={0.55} series={[{ name: 'Latency', data: horizontalServiceLatencyViolin.data.map((point) => ({ x: point.x, y: point.y })) }]} />}
            html={'<!-- ViolinChart horizontal -->\n<div class="wash-chart"></div>'}
            jsx={`import { ViolinChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'\n\n<ViolinChart height={380} horizontal title="Service latency by lane" xaxisTitle="Latency (ms)" showPoints series={[{ name: 'Latency', data: [{ x: 'Auth', y: { density: [[100, 0.3]], points: [120, 118] } }] }]} />`}
          />
        </GallerySection>
        <GallerySection eyebrow="03 · Jitter" title="Violin with jitter" description="Tune jitter spread so overlapping session scores remain readable inside each violin." panel="wash-panel-rose">
          <ShowcaseTabs preview={<ComingSoonPreview label="Interactive jitter slider and density-only mode coming soon." />} html={'<!-- ViolinChart jitter (coming soon) -->'} jsx="// ViolinChart jitter controls — coming soon" />
        </GallerySection>
        <GallerySection eyebrow="04 · Group normalize" title="Group-normalized violins" description="Share one density scale across categories so relative widths stay proportional.">
          <ShowcaseTabs preview={<ComingSoonPreview label="Group normalize violin comparison across studio cohorts coming soon." />} html={'<!-- Group normalize violins (coming soon) -->'} jsx="// Group-normalized violins — coming soon" />
        </GallerySection>
        <GallerySection eyebrow="05 · Constrained jitter" title="Constrain jitter to violin" description="Clip observation markers to the violin silhouette for dense pigment load buckets." panel="wash-panel-slate">
          <ShowcaseTabs preview={<ComingSoonPreview label="constrainToViolin jitter clipping demo coming soon." />} html={'<!-- Constrained jitter violins (coming soon) -->'} jsx="// constrainToViolin jitter — coming soon" />
        </GallerySection>
        <GallerySection eyebrow="06 · Distributed" title="Distributed colour violins" description="Assign a distinct pigment fill to each category violin on a shared axis." panel="wash-panel-ochre">
          <ShowcaseTabs preview={<ComingSoonPreview label="Distributed multi-colour violin gallery coming soon." />} html={'<!-- Distributed violins (coming soon) -->'} jsx="// Distributed violins — coming soon" />
        </GallerySection>
      </div>
    </>
  )
}
