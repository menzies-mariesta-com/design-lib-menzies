import { MixedChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  mixedDualAxisSample,
  mixedLineAreaSample,
  mixedLineColumnSample,
  mixedTripleComboSample,
} from './data/chart-samples'

export default function ChartsMixedCategoryPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Mixed charts
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Combo charts that overlay line, column, and area series on one canvas.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Line column"
          title="Plates (column) + washes (line)"
          description="MixedChart combines column bars"
        >
          <ShowcaseTabs
            preview={
              <MixedChart
                height={320}
                title="Plates and washes"
                categories={mixedLineColumnSample.categories}
                series={[
                  {
                    name: 'Plates',
                    type: 'column',
                    data: mixedLineColumnSample.plates,
                  },
                  {
                    name: 'Washes',
                    type: 'line',
                    data: mixedLineColumnSample.washes,
                  },
                ]}
              />
            }
            html={`<!-- MixedChart line + column -->
<div class="wash-chart"></div>`}
            jsx={`import { MixedChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<MixedChart
  height={320}
  title="Plates and washes"
  categories={['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']}
  series={[
    { name: 'Plates', type: 'column', data: [18, 22, 26, 24, 31, 28] },
    { name: 'Washes', type: 'line', data: [42, 58, 64, 61, 78, 72] },
  ]}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="02 · Line area"
          title="Pigment load (area) + plate output (line)"
          description="Area fill under pigment load"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <MixedChart
                height={320}
                title="Load vs output"
                categories={mixedLineAreaSample.categories}
                series={[
                  {
                    name: 'Pigment load %',
                    type: 'area',
                    data: mixedLineAreaSample.pigmentLoad,
                  },
                  {
                    name: 'Plate output',
                    type: 'line',
                    data: mixedLineAreaSample.plateOutput,
                  },
                ]}
                options={{ legend: { position: 'top' } }}
              />
            }
            html={`<!-- MixedChart line + area -->
<div class="wash-chart"></div>`}
            jsx={`import { MixedChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<MixedChart
  height={320}
  title="Load vs output"
  categories={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
  series={[
    { name: 'Pigment load %', type: 'area', data: [32, 38, 35, 44, 41, 48, 52] },
    { name: 'Plate output', type: 'line', data: [6, 8, 7, 10, 9, 4, 5] },
  ]}
  options={{ legend: { position: 'top' } }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="03 · Line column area"
          title="Plates, washes, and dry time"
          description="Triple combo: column plates"
        >
          <ShowcaseTabs
            preview={
              <MixedChart
                height={340}
                title="Studio throughput"
                categories={mixedTripleComboSample.categories}
                series={[
                  {
                    name: 'Plates',
                    type: 'column',
                    data: mixedTripleComboSample.plates,
                  },
                  {
                    name: 'Washes',
                    type: 'area',
                    data: mixedTripleComboSample.washes,
                  },
                  {
                    name: 'Avg dry time (min)',
                    type: 'line',
                    data: mixedTripleComboSample.dryTime,
                  },
                ]}
                options={{ legend: { position: 'top' } }}
              />
            }
            html={`<!-- MixedChart line + column + area -->
<div class="wash-chart"></div>`}
            jsx={`import { MixedChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<MixedChart
  height={340}
  title="Studio throughput"
  categories={['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']}
  series={[
    { name: 'Plates', type: 'column', data: [18, 22, 26, 24, 31, 28] },
    { name: 'Washes', type: 'area', data: [42, 58, 64, 61, 78, 72] },
    { name: 'Avg dry time (min)', type: 'line', data: [28, 24, 22, 26, 19, 21] },
  ]}
  options={{ legend: { position: 'top' } }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="04 · Multiple y-axes"
          title="Plate output vs dry time"
          description="Dual y-axis layout via Apex options: columns on the left axis, line"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <MixedChart
                height={320}
                title="Output and dry time"
                categories={mixedDualAxisSample.categories}
                series={[
                  {
                    name: 'Plate output',
                    type: 'column',
                    data: mixedDualAxisSample.plateOutput,
                  },
                  {
                    name: 'Dry time (min)',
                    type: 'line',
                    data: mixedDualAxisSample.dryTime,
                  },
                ]}
                options={{
                  legend: { position: 'top' },
                  yaxis: [
                    {
                      title: { text: 'Plates' },
                      min: 0,
                    },
                    {
                      opposite: true,
                      title: { text: 'Dry time (min)' },
                      min: 0,
                    },
                  ],
                }}
              />
            }
            html={`<!-- MixedChart dual y-axis -->
<div class="wash-chart"></div>`}
            jsx={`import { MixedChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<MixedChart
  height={320}
  title="Output and dry time"
  categories={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
  series={[
    { name: 'Plate output', type: 'column', data: [6, 8, 7, 10, 9, 4, 5] },
    { name: 'Dry time (min)', type: 'line', data: [28, 24, 31, 26, 22, 19, 25] },
  ]}
  options={{
    legend: { position: 'top' },
    yaxis: [
      { title: { text: 'Plates' }, min: 0 },
      { opposite: true, title: { text: 'Dry time (min)' }, min: 0 },
    ],
  }}
/>`}
          />
        </GallerySection>
      </div>
    </>
  )
}
