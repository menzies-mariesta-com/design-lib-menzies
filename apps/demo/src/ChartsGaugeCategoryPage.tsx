import { RadialBarChart, WashChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'

type GaugeStubSectionProps = {
  eyebrow: string
  title: string
  description: string
  panel?: string
}

function GaugeStubSection({ eyebrow, title, description, panel }: GaugeStubSectionProps) {
  return (
    <GallerySection eyebrow={eyebrow} title={title} description={description} panel={panel}>
      <div className="flex min-h-[140px] flex-col items-center justify-center gap-3 rounded-box border border-dashed border-ink-border/60 bg-base-100/40 p-8 text-center">
        <span className="badge badge-outline badge-sm">Coming soon</span>
        <p className="max-w-md text-sm text-ink-muted">
          This ApexCharts gauge variant is planned for a future Wash UI release.
        </p>
      </div>
    </GallerySection>
  )
}

const semiGaugeOptions = {
  labels: ['Critiques done'],
  plotOptions: {
    radialBar: {
      startAngle: -135,
      endAngle: 135,
      hollow: { size: '65%' },
      dataLabels: {
        name: { offsetY: -8, fontSize: '12px' },
        value: { offsetY: 4, fontSize: '22px', fontWeight: '600' },
      },
    },
  },
}

const basicGaugeOptions = {
  labels: ['Wash progress'],
  plotOptions: {
    radialBar: {
      hollow: { size: '58%' },
      track: { background: 'color-mix(in oklab, var(--color-base-content) 12%, transparent)' },
      dataLabels: {
        name: { fontSize: '13px' },
        value: {
          fontSize: '24px',
          fontWeight: '600',
          formatter: (val: number) => `${Math.round(val)}%`,
        },
      },
    },
  },
}

const tickGaugeOptions = {
  labels: ['Studio humidity'],
  plotOptions: {
    radialBar: {
      startAngle: -135,
      endAngle: 135,
      track: {
        show: true,
        background: 'color-mix(in oklab, var(--color-base-content) 10%, transparent)',
        strokeWidth: '100%',
        margin: 6,
      },
      dataLabels: {
        name: { offsetY: -10, fontSize: '12px' },
        value: {
          offsetY: 6,
          fontSize: '22px',
          fontWeight: '600',
          formatter: (val: number) => `${Math.round(val)}%`,
        },
      },
    },
  },
  stroke: { lineCap: 'round' as const },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      type: 'horizontal',
      shadeIntensity: 0.45,
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 0.85,
      stops: [0, 50, 100],
    },
  },
}

export default function ChartsGaugeCategoryPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Gauge charts
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Radial gauges for studio throughput, wash progress, and environmental KPIs. Built on
          RadialBarChart and WashChart with partial arcs, gradient fills, and tick-style tracks.
          Needle and band gauges are planned for a later Wash UI release.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Semi circle"
          title="Semi circle gauge"
          description="Partial radial arc for critique completion and other capped studio metrics."
        >
          <ShowcaseTabs
            preview={
              <div className="mx-auto w-full max-w-xs">
                <WashChart
                  type="radialBar"
                  height={280}
                  series={[73]}
                  options={semiGaugeOptions}
                />
              </div>
            }
            html={`<!-- Semi circle radial gauge -->
<div class="wash-chart"></div>`}
            jsx={`import { WashChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<WashChart
  type="radialBar"
  height={280}
  series={[73]}
  options={{
    labels: ['Critiques done'],
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: { size: '65%' },
        dataLabels: {
          name: { offsetY: -8, fontSize: '12px' },
          value: { offsetY: 4, fontSize: '22px', fontWeight: '600' },
        },
      },
    },
  }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="02 · Progress"
          title="Basic gauge"
          description="Full radial progress ring for wash completion and batch status."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <div className="mx-auto w-full max-w-xs">
                <RadialBarChart
                  height={300}
                  series={[68]}
                  labels={['Wash progress']}
                  options={basicGaugeOptions}
                />
              </div>
            }
            html={`<!-- Basic radial progress gauge -->
<div class="wash-chart"></div>`}
            jsx={`import { RadialBarChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<RadialBarChart
  height={300}
  series={[68]}
  labels={['Wash progress']}
  options={{
    plotOptions: {
      radialBar: {
        hollow: { size: '58%' },
        dataLabels: {
          value: {
            fontSize: '24px',
            fontWeight: '600',
            formatter: (val) => \`\${Math.round(val)}%\`,
          },
        },
      },
    },
  }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="03 · Ticks"
          title="Gauge with ticks"
          description="Semi-circle track with gradient fill and percent formatter for humidity-style KPIs."
        >
          <ShowcaseTabs
            preview={
              <div className="mx-auto w-full max-w-sm">
                <WashChart
                  type="radialBar"
                  height={300}
                  series={[54]}
                  options={tickGaugeOptions}
                />
              </div>
            }
            html={`<!-- Gauge with tick-style track -->
<div class="wash-chart"></div>`}
            jsx={`import { WashChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<WashChart
  type="radialBar"
  height={300}
  series={[54]}
  options={{
    labels: ['Studio humidity'],
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        track: { show: true, strokeWidth: '100%', margin: 6 },
        dataLabels: {
          value: { formatter: (val) => \`\${Math.round(val)}%\` },
        },
      },
    },
    fill: { type: 'gradient', gradient: { shade: 'dark', type: 'horizontal', stops: [0, 50, 100] } },
  }}
/>`}
          />
        </GallerySection>

        <GaugeStubSection
          eyebrow="04 · Needle"
          title="Needle gauge"
          description="Classic needle pointer over a radial scale for precise studio instrument readouts."
        />

        <GaugeStubSection
          eyebrow="05 · Live"
          title="Live needle gauge"
          description="Streaming needle updates for realtime humidity, pressure, or flow sensors."
          panel="wash-panel-rose"
        />

        <GaugeStubSection
          eyebrow="06 · Bands"
          title="Gauge with bands"
          description="Color bands for safe, caution, and critical ranges on environmental KPIs."
        />

        <GaugeStubSection
          eyebrow="07 · Label"
          title="Gauge with custom label"
          description="Center label formatters and secondary captions for desk stat blocks."
          panel="wash-panel-ochre"
        />
      </div>
    </>
  )
}
