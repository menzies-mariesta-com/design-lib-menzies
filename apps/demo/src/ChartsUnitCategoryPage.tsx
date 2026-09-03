import type { ComponentType } from 'react'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  UnitCityBubblesDemo,
  UnitGlobePopulationDemo,
  UnitHeartDonorsDemo,
  UnitParliamentDemo,
  UnitPictogramDemo,
  UnitPopulationExplorerDemo,
  UnitWorkforceClustersDemo,
} from './components/chartAdvancedDemos'

const unitDemos: readonly {
  eyebrow: string
  title: string
  description: string
  panel?: 'wash-panel-ochre' | 'wash-panel-rose' | 'wash-panel-slate'
  slug: string
  Preview: ComponentType
}[] = [
  {
    eyebrow: '01 · Pictogram',
    title: 'Pictogram population',
    description: 'Human pictogram grid where each icon represents a fixed population unit. Compare regions or cohorts at a glance without axis clutter',
    slug: 'pictogram-population',
    Preview: UnitPictogramDemo,
  },
  {
    eyebrow: '02 · Donors',
    title: 'Heart donors',
    description: 'Heart-shaped unit marks for donor counts and registration milestones. Ideal for health and community KPI panels',
    panel: 'wash-panel-ochre',
    slug: 'heart-donors',
    Preview: UnitHeartDonorsDemo,
  },
  {
    eyebrow: '03 · Globe',
    title: 'Globe population',
    description: 'World map unit overlay plotting population density as clustered marks on a simplified globe projection',
    slug: 'globe-population',
    Preview: UnitGlobePopulationDemo,
  },
  {
    eyebrow: '04 · Cities',
    title: 'City bubbles',
    description: 'Bubble map of major cities sized by studio footprint or enrollment, with unit marks anchored to map coordinates',
    panel: 'wash-panel-slate',
    slug: 'city-bubbles',
    Preview: UnitCityBubblesDemo,
  },
  {
    eyebrow: '05 · Parliament',
    title: 'Parliament',
    description: 'Semicircle seat layout for proportional representation. Each dot or icon is one seat colored by party or studio lane',
    panel: 'wash-panel-rose',
    slug: 'parliament',
    Preview: UnitParliamentDemo,
  },
  {
    eyebrow: '06 · Explorer',
    title: 'Population explorer',
    description: 'Interactive unit explorer with brush filters, age band toggles, and linked summary stats for demographic slices',
    slug: 'population-explorer',
    Preview: UnitPopulationExplorerDemo,
  },
  {
    eyebrow: '07 · Clusters',
    title: 'Workforce clusters',
    description: 'Force-directed or gridded unit clusters for team composition, role mix, and headcount by department',
    panel: 'wash-panel-ochre',
    slug: 'workforce-clusters',
    Preview: UnitWorkforceClustersDemo,
  },
]

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
              preview={<demo.Preview />}
              html={`<!-- ${demo.title} -->
<div class="wash-chart wash-chart-unit"></div>`}
              jsx={`import { ${demo.Preview.name} } from './components/chartAdvancedDemos'

<${demo.Preview.name} />`}
            />
          </GallerySection>
        ))}
      </div>
    </>
  )
}
