import { TreemapChart } from '#plain/charts'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  chartHtml,
  chartJsx,
  chartSvelteFiles,
} from './snippets/svelte/charts'
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
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Basic"
          title="Basic treemap"
          description="Flat leaf nodes sized by plate count"
        >
          <ShowcaseTabs
            preview={
              <TreemapChart
                height={360}
                title={pigmentCollectionTreemap.title}
                data={pigmentCollectionTreemap.data.map((point) => ({ ...point }))}
              />
            }
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="02 · Multi-dimensional"
          title="Multi-dimensional hierarchical treemap"
          description="Nested children under parent collections reveal pigment breakdown"
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
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="03 · Distributed"
          title="Distributed treemap"
          description="One Wash pigment color per tile"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={<DistributedTreemapDemo />}
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="04 · Color scale"
          title="Color scale treemap"
          description="Continuous colorScale ranges map tile fill to inventory level"
          panel="wash-panel-slate"
        >
          <ShowcaseTabs
            preview={<ColorScaleTreemapDemo />}
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="05 · Drilldown"
          title="Treemap drilldown"
          description="Click a parent tile to zoom into nested pigment batches or edition"
        >
          <ShowcaseTabs
            preview={<TreemapDrilldownDemo />}
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="06 · Market map"
          title="Nested market map"
          description="Multi-level geographic or market hierarchy"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={<MarketMapTreemapDemo />}
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="07 · Sunburst"
          title="Sunburst morph treemap"
          description="Animated morph between treemap tiles and radial sunburst rings"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={<SunburstMorphTreemapDemo />}
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>
      </div>
    </>
  )
}
