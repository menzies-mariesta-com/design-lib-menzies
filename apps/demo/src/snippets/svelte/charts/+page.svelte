<script lang="ts">
	/**
	 * SvelteKit usage: copy WashChart.svelte + chart-options.ts into `$lib/components/`.
	 */
	import WashChart from '$lib/components/WashChart.svelte'
	import {
		areaChartOptions,
		barChartOptions,
		lineChartOptions,
		pieChartOptions
	} from '$lib/components/chart-options'
</script>

<section class="mx-auto flex w-full max-w-3xl flex-col gap-6 p-6">
	<header class="space-y-1">
		<h1 class="font-display text-2xl font-bold text-primary">Charts</h1>
		<p class="text-sm text-base-content/70">
			ApexCharts in a card shell via
			<code class="font-mono text-xs">@menzies-mariesta-com/menzies-design-wash-ui/charts/apex</code>.
			Swap options from <code class="font-mono text-xs">chart-options.ts</code> (line, bar, area, pie).
		</p>
	</header>

	<div class="flex flex-col gap-2">
		<h2 class="font-mono text-xs text-base-content/60">Line</h2>
		<WashChart options={lineChartOptions} height={280} />
	</div>

	<div class="flex flex-col gap-2">
		<h2 class="font-mono text-xs text-base-content/60">Bar</h2>
		<WashChart options={barChartOptions} height={280} />
	</div>

	<div class="flex flex-col gap-2">
		<h2 class="font-mono text-xs text-base-content/60">Area</h2>
		<WashChart options={areaChartOptions} height={280} />
	</div>

	<div class="flex flex-col gap-2">
		<h2 class="font-mono text-xs text-base-content/60">Pie</h2>
		<WashChart options={pieChartOptions} height={320} />
	</div>
</section>
