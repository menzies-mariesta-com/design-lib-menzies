import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'

function ComingSoonPreview({ label }: { label: string }) {
  return (
    <div className="flex h-[320px] flex-col items-center justify-center gap-2 rounded-box border border-dashed border-ink-border/60 bg-base-200/30">
      <span className="badge badge-outline badge-sm">Coming soon</span>
      <p className="max-w-sm px-4 text-center text-sm text-ink-muted">{label}</p>
    </div>
  )
}

const unitDemos = [
  {
    eyebrow: '01 · Pictogram',
    title: 'Pictogram population',
    description:
      'Human pictogram grid where each icon represents a fixed population unit. Compare regions or cohorts at a glance without axis clutter.',
    panel: undefined,
    previewLabel:
      'Pictogram population grid with configurable unit size, row wrap, and pigment-aware icon fills.',
    slug: 'pictogram-population',
  },
  {
    eyebrow: '02 · Donors',
    title: 'Heart donors',
    description:
      'Heart-shaped unit marks for donor counts and registration milestones. Ideal for health and community KPI panels.',
    panel: 'wash-panel-ochre' as const,
    previewLabel:
      'Heart donor pictogram with animated fill tiers and tooltip readouts per registration band.',
    slug: 'heart-donors',
  },
  {
    eyebrow: '03 · Globe',
    title: 'Globe population',
    description:
      'World map unit overlay plotting population density as clustered marks on a simplified globe projection.',
    panel: undefined,
    previewLabel:
      'Globe population map with lat/long anchored unit clusters and zoom-to-region drilldown.',
    slug: 'globe-population',
  },
  {
    eyebrow: '04 · Cities',
    title: 'City bubbles',
    description:
      'Bubble map of major cities sized by studio footprint or enrollment, with unit marks anchored to map coordinates.',
    panel: 'wash-panel-slate' as const,
    previewLabel:
      'City bubble map combining geo anchors, proportional bubbles, and unit count labels.',
    slug: 'city-bubbles',
  },
  {
    eyebrow: '05 · Parliament',
    title: 'Parliament',
    description:
      'Semicircle seat layout for proportional representation. Each dot or icon is one seat colored by party or studio lane.',
    panel: 'wash-panel-rose' as const,
    previewLabel:
      'Parliament hemicycle with seat dots, party color legend, and hover focus on bloc totals.',
    slug: 'parliament',
  },
  {
    eyebrow: '06 · Explorer',
    title: 'Population explorer',
    description:
      'Interactive unit explorer with brush filters, age band toggles, and linked summary stats for demographic slices.',
    panel: undefined,
    previewLabel:
      'Population explorer with linked filters, unit grid, and summary stat strip.',
    slug: 'population-explorer',
  },
  {
    eyebrow: '07 · Clusters',
    title: 'Workforce clusters',
    description:
      'Force-directed or gridded unit clusters for team composition, role mix, and headcount by department.',
    panel: 'wash-panel-ochre' as const,
    previewLabel:
      'Workforce cluster layout with role-colored unit groups and department totals.',
    slug: 'workforce-clusters',
  },
] as const

export default function ChartsUnitCategoryPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Unit Charts
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Pictogram, map, and parliament-style unit marks for population and workforce storytelling.
          ApexCharts v6 Marks API ({' '}
          <span className="font-mono text-xs">registerSeriesType</span> unit geometry) is not in Wash
          UI yet (Apex 5.16). Each demo below is stubbed until the Marks upgrade lands.
        </p>
      </div>

      <div className="space-y-6">
        {unitDemos.map((demo) => (
          <GallerySection
            key={demo.slug}
            eyebrow={demo.eyebrow}
            title={demo.title}
            description={demo.description}
            panel={demo.panel}
          >
            <ShowcaseTabs
              preview={<ComingSoonPreview label={demo.previewLabel} />}
              html={`<!-- ${demo.title} (coming soon) -->
<div class="wash-chart wash-chart-unit"></div>`}
              jsx={`// ${demo.title} — Apex v6 unit marks, coming soon`}
            />
          </GallerySection>
        ))}
      </div>
    </>
  )
}
