import { ScatterChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  critiqueScoreJitter,
  pigmentViscosityScatter,
  plateMoistureScatter,
} from './data/chart-samples'

function ComingSoonPreview({ label }: { label: string }) {
  return (
    <div className="flex h-[280px] flex-col items-center justify-center gap-2 rounded-box border border-dashed border-ink-border/60 bg-base-200/30">
      <span className="badge badge-outline badge-sm">Coming soon</span>
      <p className="max-w-sm px-4 text-center text-sm text-ink-muted">{label}</p>
    </div>
  )
}

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
          buckets. ScatterChart wraps WashChart with pigment markers, datetime axes, and studio
          sample data. Image markers and canvas renderer variants are planned for a future release.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Basic"
          title="Basic scatter"
          description="Numeric x/y pairs across pigment families."
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
            html={`<!-- ScatterChart canvas -->
<div class="wash-chart"></div>`}
            jsx={`import { ScatterChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<ScatterChart
  height={360}
  title="Viscosity vs wash intensity"
  xaxisTitle="Wash intensity %"
  yaxisTitle="Viscosity (cP)"
  series={[
    { name: 'Cerulean', data: [{ x: 18, y: 38 }, { x: 22, y: 45 }] },
    { name: 'Ochre', data: [{ x: 24, y: 62 }, { x: 28, y: 68 }] },
  ]}
  options={{ legend: { position: 'top' } }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="02 · Datetime"
          title="Datetime scatter"
          description="ISO timestamps track plate moisture over drying cycles."
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
            html={`<!-- ScatterChart datetime -->
<div class="wash-chart"></div>`}
            jsx={`import { ScatterChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<ScatterChart
  height={360}
  datetime
  title="Plate moisture readings"
  xaxisTitle="Reading time"
  yaxisTitle="Moisture %"
  series={[
    {
      name: 'Plate A',
      data: [
        { x: '2026-08-01T08:00:00', y: 92 },
        { x: '2026-08-02T08:00:00', y: 54 },
      ],
    },
  ]}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="03 · Jitter"
          title="Scatter with jitter"
          description="Horizontal jitter separates overlapping session buckets on the x-axis."
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
            html={`<!-- ScatterChart jitter -->
<div class="wash-chart"></div>`}
            jsx={`import { ScatterChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<ScatterChart
  height={360}
  title="Critique scores by session"
  jitterX={0.18}
  series={[
    { name: 'Atlantic Studies', data: [{ x: 1, y: 72 }, { x: 1, y: 74 }] },
  ]}
  options={{
    xaxis: {
      tickAmount: 4,
      labels: { formatter: (value) => \`S\${value}\` },
    },
  }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="04 · Images"
          title="Scatter images"
          description="Image markers on scatter points coming soon."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={<ComingSoonPreview label="Image markers on scatter points coming soon." />}
            html=""
            jsx=""
          />
        </GallerySection>

        <GallerySection
          eyebrow="05 · Canvas"
          title="Scatter canvas renderer"
          description="Canvas renderer for large scatter datasets coming soon."
        >
          <ShowcaseTabs
            preview={
              <ComingSoonPreview label="Canvas renderer for large scatter datasets coming soon." />
            }
            html=""
            jsx=""
          />
        </GallerySection>
      </div>
    </>
  )
}
