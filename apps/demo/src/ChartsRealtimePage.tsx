import { useCallback, useState } from 'react'
import { RealtimeLineChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'
import { Pause, Play } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'

function PigmentSensorDemo() {
  const [paused, setPaused] = useState(false)

  const valueGenerator = useCallback(() => {
    const noise = (Math.random() - 0.5) * 14
    return Math.round(Math.max(40, Math.min(95, 72 + noise)))
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink-muted">
          Live pigment sensor stream. New readings append every second; the window keeps the last
          20 points.
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
      <RealtimeLineChart
        height={320}
        seriesName="Pigment load %"
        yaxisTitle="Load %"
        paused={paused}
        valueGenerator={valueGenerator}
        intervalMs={1000}
        maxPoints={20}
        options={{ xaxis: { labels: { format: 'HH:mm:ss' } } }}
      />
    </div>
  )
}

function PlateCounterDemo() {
  const [paused, setPaused] = useState(false)

  const valueGenerator = useCallback(() => (Math.random() > 0.35 ? 1 : 0), [])

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink-muted">Plate counter pulse simulation (0 or 1 per tick).</p>
        <button
          type="button"
          className={`btn btn-sm cursor-pointer ${paused ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setPaused((current) => !current)}
        >
          {paused ? 'Resume counter' : 'Pause counter'}
        </button>
      </div>
      <RealtimeLineChart
        height={280}
        seriesName="Plates / tick"
        yaxisTitle="Count"
        paused={paused}
        valueGenerator={valueGenerator}
        intervalMs={800}
        maxPoints={24}
        options={{
          stroke: { curve: 'stepline' },
          yaxis: { min: 0, max: 1, tickAmount: 1 },
          xaxis: { labels: { format: 'HH:mm:ss' } },
        }}
      />
    </div>
  )
}

export default function ChartsRealtimePage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Realtime line charts
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          RealtimeLineChart streams datetime points on an interval with ApexCharts dynamic
          animation. Use the pause toggle to freeze the feed, or pass your own value generator.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Realtime"
          title="Live pigment sensor"
          description="Rolling window line chart with smooth dynamic animation and datetime x-axis labels."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={<PigmentSensorDemo />}
            html={'<div class="wash-chart wash-chart-realtime"></div>'}
            jsx={`import { RealtimeLineChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<RealtimeLineChart
  height={320}
  seriesName="Pigment load %"
  intervalMs={1000}
  maxPoints={20}
  paused={false}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="02 · Realtime"
          title="Plate counter pulse"
          description="Stepline realtime feed for discrete plate-finish events."
        >
          <ShowcaseTabs
            preview={<PlateCounterDemo />}
            html={'<div class="wash-chart wash-chart-realtime"></div>'}
            jsx={`import { RealtimeLineChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<RealtimeLineChart
  height={280}
  seriesName="Plates / tick"
  intervalMs={800}
  maxPoints={24}
  valueGenerator={() => (Math.random() > 0.35 ? 1 : 0)}
/>`}
          />
        </GallerySection>
      </div>
    </>
  )
}
