<script lang="ts">
	/**
	 * ApexCharts chart shell.
	 * Drop into `$lib/components/WashChart.svelte` (keep `chart-options.ts` beside it).
	 * Import ApexCharts via Wash UI so no separate `npm i apexcharts` is required:
	 * `@menzies-mariesta-com/menzies-design-wash-ui/charts/apex`.
	 * Prefer `@menzies-mariesta-com/menzies-design-wash-ui/charts` in React apps.
	 */
	import { onMount } from 'svelte'
	import { lineChartOptions } from './chart-options'

	/** Loose Apex options bag (line / bar / area / pie presets from chart-options). */
	type ChartOptions = {
		chart?: Record<string, unknown>
		series?: unknown
		[key: string]: unknown
	}

	type Props = {
		options?: ChartOptions
		height?: number | string
		class?: string
	}

	let {
		options = lineChartOptions,
		height = 320,
		class: className = ''
	}: Props = $props()

	let host: HTMLDivElement | undefined = $state()
	let loadError = $state<string | null>(null)

	onMount(() => {
		let chart: { destroy: () => void; render: () => Promise<void> } | undefined
		let cancelled = false

		void import('@menzies-mariesta-com/menzies-design-wash-ui/charts/apex')
			.then(({ default: ApexCharts }) => {
				if (cancelled || !host) return
				chart = new ApexCharts(host, {
					...options,
					chart: {
						...(options.chart ?? {}),
						height,
						width: '100%',
						fontFamily: 'inherit',
						background: 'transparent'
					}
				})
				void chart.render()
			})
			.catch((err: unknown) => {
				if (cancelled) return
				loadError = err instanceof Error ? err.message : 'Failed to load ApexCharts'
				console.error('[WashChart]', err)
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
	{#if loadError}
		<p class="text-sm text-error">{loadError}</p>
	{:else}
		<div bind:this={host} class="h-full w-full min-h-[12rem]" role="img" aria-label="Chart"></div>
	{/if}
</div>
