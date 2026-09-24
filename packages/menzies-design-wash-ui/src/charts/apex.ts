/**
 * Framework-free ApexCharts entry for Svelte / vanilla apps.
 * Re-exports the `apexcharts` dependency so consumers do not need a separate install
 * or hoisted bare `apexcharts` resolve (important with `file:` / monorepo links).
 */
import ApexCharts from 'apexcharts'

export default ApexCharts
export type { ApexOptions } from 'apexcharts'
