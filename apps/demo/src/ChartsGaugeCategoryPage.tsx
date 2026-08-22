import { useEffect, useState } from 'react'
import type { ApexOptions } from 'apexcharts'
import { RadialBarChart, WashChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'
import { Pause, Play } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'

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

const needleGaugeOptions: ApexOptions = {
  labels: ['Paper moisture'],
  plotOptions: {
    radialBar: {
      startAngle: -135,
      endAngle: 135,
      shape: 'needle',
      min: 0,
      max: 100,
      hollow: { size: '58%' },
      needle: {
        color: 'var(--color-primary)',
        length: '72%',
        baseWidth: 6,
        tipWidth: 2,
      },
      ticks: {
        show: true,
        major: { count: 5, length: 8, width: 2 },
        labels: {
          show: true,
          formatter: (value: number) => `${Math.round(value)}%`,
        },
      },
      dataLabels: {
        name: { offsetY: -10, fontSize: '12px' },
        value: {
          offsetY: 8,
          fontSize: '22px',
          fontWeight: '600',
          formatter: (val: number) => `${Math.round(val)}%`,
        },
      },
    },
  },
}

const bandGaugeOptions: ApexOptions = {
  labels: ['Studio humidity'],
  plotOptions: {
    radialBar: {
      startAngle: -135,
      endAngle: 135,
      min: 0,
      max: 100,
      hollow: { size: '60%' },
      bands: [
        { from: 0, to: 40, color: '#22c55e', label: 'Dry' },
        { from: 40, to: 70, color: '#eab308', label: 'Ideal' },
        { from: 70, to: 100, color: '#ef4444', label: 'Humid' },
      ],
      bandsStyle: {
        strokeWidth: '14',
        gap: 2,
        hideTrackWhenPresent: true,
        linecap: 'round',
      },
      dataLabels: {
        name: { offsetY: -10, fontSize: '12px' },
        value: {
          offsetY: 8,
          fontSize: '22px',
          fontWeight: '600',
          formatter: (val: number) => `${Math.round(val)}%`,
        },
      },
    },
  },
}

const customLabelGaugeOptions: ApexOptions = {
  labels: ['Studio temperature'],
  plotOptions: {
    radialBar: {
      startAngle: -135,
      endAngle: 135,
      hollow: { size: '62%' },
      dataLabels: {
        name: {
          show: true,
          offsetY: -14,
          fontSize: '13px',
          formatter: () => 'Studio temp',
        },
        value: {
          show: true,
          offsetY: 10,
          fontSize: '26px',
          fontWeight: '600',
          formatter: (val: number) => `${Math.round(val)}°C`,
        },
        total: {
          show: true,
          label: 'Target',
          fontSize: '11px',
          formatter: () => '21°C',
        },
      },
    },
  },
}

function LiveNeedleGaugeDemo() {
  const [value, setValue] = useState(54)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const timer = window.setInterval(() => {
      setValue((current) =>
        Math.round(Math.max(18, Math.min(92, current + (Math.random() - 0.5) * 8))),
      )
    }, 1400)
    return () => window.clearInterval(timer)
  }, [paused])

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink-muted">
          Streaming needle updates every 1.4s for humidity-style studio sensors.
        </p>
        <button
          type="button"
          className={`btn btn-sm cursor-pointer ${paused ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setPaused((current) => !current)}
        >
          {paused ? (
            <Play className="size-4" strokeWidth={1.75} aria-hidden="true" />
          ) : (
            <Pause className="size-4" strokeWidth={1.75} aria-hidden="true" />
          )}
          {paused ? 'Resume stream' : 'Pause stream'}
        </button>
      </div>
      <div className="mx-auto w-full max-w-sm">
        <WashChart type="radialBar" height={300} series={[value]} options={needleGaugeOptions} />
      </div>
    </div>
  )
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
          RadialBarChart and WashChart with partial arcs, gradient fills, tick-style tracks,
          needle pointers, threshold bands, and custom center labels.
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

        <GallerySection
          eyebrow="04 · Needle"
          title="Needle gauge"
          description="Classic needle pointer over a radial scale for precise studio instrument readouts."
        >
          <ShowcaseTabs
            preview={
              <div className="mx-auto w-full max-w-sm">
                <WashChart
                  type="radialBar"
                  height={300}
                  series={[62]}
                  options={needleGaugeOptions}
                />
              </div>
            }
            html={`<!-- Needle radial gauge -->
<div class="wash-chart"></div>`}
            jsx={`import { WashChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<WashChart
  type="radialBar"
  height={300}
  series={[62]}
  options={{
    labels: ['Paper moisture'],
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        shape: 'needle',
        min: 0,
        max: 100,
        needle: { color: 'var(--color-primary)', length: '72%' },
        ticks: { show: true, major: { count: 5 } },
      },
    },
  }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="05 · Live"
          title="Live needle gauge"
          description="Streaming needle updates for realtime humidity, pressure, or flow sensors."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={<LiveNeedleGaugeDemo />}
            html={`<!-- Live needle gauge -->
<div class="wash-chart"></div>`}
            jsx={`import { useEffect, useState } from 'react'
import { WashChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

const [value, setValue] = useState(54)

useEffect(() => {
  const timer = setInterval(() => {
    setValue((v) => Math.round(Math.max(0, Math.min(100, v + (Math.random() - 0.5) * 8))))
  }, 1400)
  return () => clearInterval(timer)
}, [])

<WashChart type="radialBar" series={[value]} options={needleGaugeOptions} />`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="06 · Bands"
          title="Gauge with bands"
          description="Color bands for safe, caution, and critical ranges on environmental KPIs."
        >
          <ShowcaseTabs
            preview={
              <div className="mx-auto w-full max-w-sm">
                <RadialBarChart
                  height={300}
                  series={[58]}
                  labels={['Studio humidity']}
                  startAngle={-135}
                  endAngle={135}
                  hollowSize="60%"
                  options={bandGaugeOptions}
                />
              </div>
            }
            html={`<!-- Gauge with threshold bands -->
<div class="wash-chart"></div>`}
            jsx={`import { RadialBarChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<RadialBarChart
  height={300}
  series={[58]}
  labels={['Studio humidity']}
  startAngle={-135}
  endAngle={135}
  options={{
    plotOptions: {
      radialBar: {
        bands: [
          { from: 0, to: 40, color: '#22c55e', label: 'Dry' },
          { from: 40, to: 70, color: '#eab308', label: 'Ideal' },
          { from: 70, to: 100, color: '#ef4444', label: 'Humid' },
        ],
      },
    },
  }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="07 · Label"
          title="Gauge with custom label"
          description="Center label formatters and secondary captions for desk stat blocks."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <div className="mx-auto w-full max-w-sm">
                <WashChart
                  type="radialBar"
                  height={300}
                  series={[22]}
                  options={customLabelGaugeOptions}
                />
              </div>
            }
            html={`<!-- Gauge with custom center labels -->
<div class="wash-chart"></div>`}
            jsx={`import { WashChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<WashChart
  type="radialBar"
  height={300}
  series={[22]}
  options={{
    labels: ['Studio temperature'],
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        dataLabels: {
          name: { formatter: () => 'Studio temp' },
          value: { formatter: (val) => \`\${Math.round(val)}°C\` },
          total: { show: true, label: 'Target', formatter: () => '21°C' },
        },
      },
    },
  }}
/>`}
          />
        </GallerySection>
      </div>
    </>
  )
}
