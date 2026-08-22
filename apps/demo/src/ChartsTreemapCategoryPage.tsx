import { TreemapChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  ColorScaleTreemapDemo,
  DistributedTreemapDemo,
  MarketMapTreemapDemo,
  SunburstMorphTreemapDemo,
  TreemapDrilldownDemo,
} from './components/chartAdvancedDemos'
import {
  pigmentCollectionTreemap,
  studioHierarchyTreemap,
} from './data/chart-samples'

export default function ChartsTreemapCategoryPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Treemap Charts
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Tile-sized rectangles show pigment collection share and nested studio hierarchy.
          TreemapChart applies Wash pigment palettes, shaded parent groups, and nested children
          for multi-dimensional layouts. Distributed tiles, color scale legends, drilldown,
          nested market maps, and sunburst morph variants are shown below.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Basic"
          title="Basic treemap"
          description="Flat leaf nodes sized by plate count. Each tile label shows the collection name and relative area."
        >
          <ShowcaseTabs
            preview={
              <TreemapChart
                height={360}
                title={pigmentCollectionTreemap.title}
                data={pigmentCollectionTreemap.data.map((point) => ({ ...point }))}
              />
            }
            html={`<!-- TreemapChart canvas -->
<div class="wash-chart"></div>`}
            jsx={`import { TreemapChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<TreemapChart
  height={360}
  title="Pigment collection share"
  data={[
    { x: 'Cerulean plates', y: 42 },
    { x: 'Ochre studies', y: 28 },
    // ...
  ]}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="02 · Multi-dimensional"
          title="Multi-dimensional hierarchical treemap"
          description="Nested children under parent collections reveal pigment breakdown within each studio series."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <TreemapChart
                height={380}
                title={studioHierarchyTreemap.title}
                data={studioHierarchyTreemap.data.map((group) => ({
                  ...group,
                  children: group.children.map((leaf) => ({ ...leaf })),
                }))}
                enableShades
              />
            }
            html={`<!-- TreemapChart hierarchical canvas -->
<div class="wash-chart"></div>`}
            jsx={`import { TreemapChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<TreemapChart
  height={380}
  title="Studio hierarchy treemap"
  data={[
    {
      x: 'Atlantic Studies',
      y: 48,
      children: [
        { x: 'Cerulean', y: 22 },
        { x: 'Indigo', y: 16 },
        { x: 'Prussian', y: 10 },
      ],
    },
    // ...
  ]}
  enableShades
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="03 · Distributed"
          title="Distributed treemap"
          description="One Wash pigment color per tile with plotOptions.treemap.distributed for flat categorical maps."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={<DistributedTreemapDemo />}
            html={`<!-- Distributed treemap -->
<div class="wash-chart"></div>`}
            jsx={`import { DistributedTreemapDemo } from './components/chartAdvancedDemos'

<DistributedTreemapDemo />`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="04 · Color scale"
          title="Color scale treemap"
          description="Continuous colorScale ranges map tile fill to inventory level or wash intensity bands."
          panel="wash-panel-slate"
        >
          <ShowcaseTabs
            preview={<ColorScaleTreemapDemo />}
            html={`<!-- Color scale treemap -->
<div class="wash-chart"></div>`}
            jsx={`import { ColorScaleTreemapDemo } from './components/chartAdvancedDemos'

<ColorScaleTreemapDemo />`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="05 · Drilldown"
          title="Treemap drilldown"
          description="Click a parent tile to zoom into nested pigment batches or edition detail."
        >
          <ShowcaseTabs
            preview={<TreemapDrilldownDemo />}
            html={`<!-- Treemap drilldown -->
<div class="wash-chart"></div>`}
            jsx={`import { TreemapDrilldownDemo } from './components/chartAdvancedDemos'

<TreemapDrilldownDemo />`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="06 · Market map"
          title="Nested market map"
          description="Multi-level geographic or market hierarchy with nested treemap tiles for regional studio revenue."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={<MarketMapTreemapDemo />}
            html={`<!-- Nested market map treemap -->
<div class="wash-chart"></div>`}
            jsx={`import { MarketMapTreemapDemo } from './components/chartAdvancedDemos'

<MarketMapTreemapDemo />`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="07 · Sunburst"
          title="Sunburst morph treemap"
          description="Animated morph between treemap tiles and radial sunburst rings for the same hierarchy."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={<SunburstMorphTreemapDemo />}
            html={`<!-- Sunburst morph treemap -->
<div class="wash-chart"></div>`}
            jsx={`import { SunburstMorphTreemapDemo } from './components/chartAdvancedDemos'

<SunburstMorphTreemapDemo />`}
          />
        </GallerySection>
      </div>
    </>
  )
}
