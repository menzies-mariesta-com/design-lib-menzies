<script lang="ts">
	/**
	 * ApexCharts chart shell.
	 * Drop into `$lib/components/WashChart.svelte`.
	 * ApexCharts ships with Wash UI (`apexcharts` is a dependency of
	 * `@menzies-mariesta-com/menzies-design-wash-ui`). No separate `npm i apexcharts`.
	 * Prefer `@menzies-mariesta-com/menzies-design-wash-ui/charts` in React apps.
	 */
	import { onMount } from 'svelte'
	import { lineChartOptions } from './chart-options'

	type Props = {
		options?: typeof lineChartOptions
		height?: number | string
		class?: string
	}

	let {
		options = lineChartOptions,
		height = 320,
		class: className = ''
	}: Props = $props()

	let host: HTMLDivElement | undefined = $state()

	onMount(() => {
		let chart: { destroy: () => void } | undefined
		let cancelled = false
		void import('apexcharts').then(({ default: ApexCharts }) => {
			if (cancelled || !host) return
			chart = new ApexCharts(host, {
				...options,
				chart: {
					...(options.chart ?? {}),
					height,
					width: '100%',
					fontFamily: 'inherit'
				}
			})
			void chart.render()
		})
		return () => {
			cancelled = true
			chart?.destroy()
		}
	})
</script>

<div
	class="wash-chart rounded-box border border-base-300 bg-base-100 p-3 shadow-[var(--shadow-paper-sm)] {className}"
	style:height={typeof height === 'number' ? `${height}px` : height}
>
	<div bind:this={host} class="h-full w-full min-h-[12rem]" role="img" aria-label="Chart"></div>
</div>
