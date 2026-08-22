import { SparklineChart, WashChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  dryTimeTrend,
  heroSparklines,
  pigmentLoadTrend,
  weeklyWashCounts,
} from './data/chart-samples'

const lineSparklineOptions = {
  fill: { opacity: 0 },
  stroke: { curve: 'smooth' as const, width: 2 },
}

const barSparklineOptions = {
  chart: {
    type: 'bar' as const,
    sparkline: { enabled: true },
    animations: { enabled: false },
    toolbar: { show: false },
    zoom: { enabled: false },
  },
  plotOptions: {
    bar: {
      columnWidth: '70%',
      borderRadius: 2,
    },
  },
  tooltip: { enabled: false },
}

function StatBlock({
  title,
  value,
  desc,
  data,
}: {
  title: string
  value: string
  desc: string
  data: readonly number[]
}) {
  return (
    <div className="rounded-box border border-ink-border/70 bg-base-100/80 p-4">
      <p className="text-xs text-ink-muted">{title}</p>
      <p className="font-display text-2xl font-semibold">{value}</p>
      <p className="mb-2 text-xs text-ink-muted">{desc}</p>
      <SparklineChart data={[...data]} height={48} />
    </div>
  )
}

export default function ChartsSparklinesCategoryPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Sparklines
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Compact trend charts for desk KPIs and stat blocks. SparklineChart ships as a gradient area
          sparkline; pass options for line-style fills or use WashChart for bar micro charts.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Line"
          title="Basic sparkline"
          description="Smooth line sparkline with fill disabled. Ideal for minimal stat row trends."
        >
          <ShowcaseTabs
            preview={
              <div className="mx-auto w-full max-w-md">
                <SparklineChart
                  data={[...weeklyWashCounts]}
                  height={56}
                  options={lineSparklineOptions}
                />
              </div>
            }
            html={`<!-- Line-style sparkline -->
<div class="wash-chart"></div>`}
            jsx={`import { SparklineChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<SparklineChart
  data={[12, 18, 14, 22, 19, 8, 11]}
  height={56}
  options={{
    fill: { opacity: 0 },
    stroke: { curve: 'smooth', width: 2 },
  }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="02 · Area"
          title="Area sparkline"
          description="Default SparklineChart gradient fill for pigment load and wash volume pulses."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <div className="mx-auto w-full max-w-md">
                <SparklineChart data={[...pigmentLoadTrend]} height={56} />
              </div>
            }
            html={`<!-- Area sparkline -->
<div class="wash-chart"></div>`}
            jsx={`import { SparklineChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<SparklineChart data={[32, 38, 35, 44, 41, 48, 52]} height={56} />`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="03 · Bar"
          title="Bar sparkline"
          description="SparklineChart renders area type. Bar micro charts use WashChart with sparkline mode enabled."
        >
          <ShowcaseTabs
            preview={
              <div className="mx-auto w-full max-w-md">
                <WashChart
                  type="bar"
                  height={56}
                  series={[{ data: [...dryTimeTrend] }]}
                  options={barSparklineOptions}
                />
              </div>
            }
            html={`<!-- Bar sparkline via WashChart -->
<div class="wash-chart"></div>`}
            jsx={`import { WashChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<WashChart
  type="bar"
  height={56}
  series={[{ data: [28, 24, 31, 26, 22, 19, 25] }]}
  options={{
    chart: {
      sparkline: { enabled: true },
      animations: { enabled: false },
      toolbar: { show: false },
    },
    plotOptions: { bar: { columnWidth: '70%', borderRadius: 2 } },
    tooltip: { enabled: false },
  }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="04 · Desk KPIs"
          title="Hero stats with sparklines"
          description="Mini area charts beside stat blocks for quick studio pulse checks."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {heroSparklines.map((item) => (
                  <StatBlock
                    key={item.title}
                    title={item.title}
                    value={item.value}
                    desc={item.desc}
                    data={item.data}
                  />
                ))}
              </div>
            }
            html={`<div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
  <div class="rounded-box border border-ink-border/70 bg-base-100/80 p-4">
    <p class="text-xs text-ink-muted">Washes this week</p>
    <p class="font-display text-2xl font-semibold">104</p>
    <p class="mb-2 text-xs text-ink-muted">Up 12% from last week</p>
    <!-- SparklineChart -->
  </div>
</div>`}
            jsx={`import { SparklineChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<div className="rounded-box border border-ink-border/70 bg-base-100/80 p-4">
  <p className="text-xs text-ink-muted">Washes this week</p>
  <p className="font-display text-2xl font-semibold">104</p>
  <p className="mb-2 text-xs text-ink-muted">Up 12% from last week</p>
  <SparklineChart data={[12, 18, 14, 22, 19, 8, 11]} height={48} />
</div>`}
          />
        </GallerySection>
      </div>
    </>
  )
}
