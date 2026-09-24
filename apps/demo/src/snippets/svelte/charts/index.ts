import type { ShowcaseSvelteFile } from '../../../components/showcaseTypes'
import { kitFiles } from '../../../components/kitFiles'
import washChart from './WashChart.svelte?raw'
import chartOptions from './chart-options.ts?raw'
import chartPage from './+page.svelte?raw'

export const chartSvelteFiles: ShowcaseSvelteFile[] = kitFiles([
  { name: 'WashChart.svelte', code: washChart },
  { name: 'chart-options.ts', code: chartOptions },
  { name: '+page.svelte', code: chartPage },
])

export const chartHtml = `<div class="wash-chart rounded-box border border-base-300 bg-base-100 p-3 shadow-[var(--shadow-paper-sm)]" style="height:320px">
  <!-- Mount ApexCharts on the inner node (see WashChart.svelte kit). -->
  <div class="h-full w-full min-h-[12rem]" role="img" aria-label="Chart"></div>
</div>`

export const chartJsx = `<div
  className="wash-chart rounded-box border border-base-300 bg-base-100 p-3 shadow-[var(--shadow-paper-sm)]"
  style={{ height: 320 }}
>
  {/* Mount ApexCharts on the inner node (see WashChart.svelte kit). */}
  <div className="h-full w-full min-h-[12rem]" role="img" aria-label="Chart" />
</div>`
