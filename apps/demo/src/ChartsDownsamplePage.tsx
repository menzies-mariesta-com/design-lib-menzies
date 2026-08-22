import { useMemo, useState } from 'react'
import {
  DownsampledLineChart,
  type DownsampleMethod,
} from '@menzies-mariesta-com/menzies-design-wash-ui/charts'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  generateStudioSensorNoise,
  studioSensorNoise20k,
} from './data/chart-samples'

const TARGET_POINTS = 400

export default function ChartsDownsamplePage() {
  const [method, setMethod] = useState<DownsampleMethod>('lttb')
  const [useRaw, setUseRaw] = useState(false)

  const pigmentDrift = useMemo(
    () => generateStudioSensorNoise(12_000, studioSensorNoise20k[0]?.[0] ?? Date.now(), 90_000),
    [],
  )

  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Downsampled line chart
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Performance-friendly line charts for large studio sensor streams. DownsampledLineChart
          applies LTTB or min-max bucket reduction before ApexCharts render, keeps zoom enabled,
          and shows point counts before and after reduction.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Studio humidity"
          title="20k sensor points → 400"
          description="Default LTTB downsampling preserves the humidity curve shape while keeping the chart responsive. Toggle raw data to compare render cost."
        >
          <ShowcaseTabs
            preview={
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="join">
                    <button
                      type="button"
                      className={[
                        'btn btn-sm join-item cursor-pointer',
                        method === 'lttb' ? 'btn-primary' : 'btn-ghost',
                      ].join(' ')}
                      onClick={() => setMethod('lttb')}
                    >
                      LTTB
                    </button>
                    <button
                      type="button"
                      className={[
                        'btn btn-sm join-item cursor-pointer',
                        method === 'minmax' ? 'btn-primary' : 'btn-ghost',
                      ].join(' ')}
                      onClick={() => setMethod('minmax')}
                    >
                      Min-max
                    </button>
                  </div>
                  <label className="label cursor-pointer gap-2">
                    <input
                      type="checkbox"
                      className="toggle toggle-sm toggle-primary"
                      checked={useRaw}
                      onChange={(event) => setUseRaw(event.target.checked)}
                    />
                    <span className="label-text text-sm">Show raw data (20k points)</span>
                  </label>
                  <span className="badge badge-outline badge-sm">
                    {useRaw ? '20,000 points' : `${TARGET_POINTS} target · ${method.toUpperCase()}`}
                  </span>
                </div>
                <DownsampledLineChart
                  data={studioSensorNoise20k}
                  name="Humidity %"
                  targetPoints={TARGET_POINTS}
                  downsampleMethod={method}
                  useRawData={useRaw}
                  height={340}
                  xaxisTitle="Studio time"
                  yaxisTitle="Humidity %"
                  subtitle="North light room sensor"
                  options={{
                    xaxis: { labels: { format: 'MMM d HH:mm' } },
                  }}
                />
              </div>
            }
            html={`<!-- DownsampledLineChart -->
<div class="wash-chart wash-chart-downsampled"></div>`}
            jsx={`import { DownsampledLineChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'
import { studioSensorNoise20k } from './data/chart-samples'

<DownsampledLineChart
  data={studioSensorNoise20k}
  name="Humidity %"
  targetPoints={400}
  downsampleMethod="lttb"
  height={340}
  xaxisTitle="Studio time"
  yaxisTitle="Humidity %"
  subtitle="North light room sensor"
  options={{ xaxis: { labels: { format: 'MMM d HH:mm' } } }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="02 · Pigment bench"
          title="Min-max for spike retention"
          description="Min-max bucket downsampling keeps per-bucket extrema so brief humidity spikes remain visible in dense streams."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <DownsampledLineChart
                data={pigmentDrift}
                name="Bench humidity"
                targetPoints={500}
                downsampleMethod="minmax"
                height={320}
                xaxisTitle="Studio time"
                yaxisTitle="Humidity %"
                subtitle="Pigment prep bench"
                options={{
                  xaxis: { labels: { format: 'MMM d' } },
                  colors: ['#b87524'],
                }}
              />
            }
            html={`<!-- DownsampledLineChart min-max -->
<div class="wash-chart wash-chart-downsampled"></div>`}
            jsx={`import { DownsampledLineChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<DownsampledLineChart
  data={pigmentDrift}
  name="Bench humidity"
  targetPoints={500}
  downsampleMethod="minmax"
  xaxisTitle="Studio time"
  yaxisTitle="Humidity %"
  subtitle="Pigment prep bench"
/>`}
          />
        </GallerySection>
      </div>
    </>
  )
}
