<script lang="ts">
	/**
	 * SvelteKit usage: copy WashChart.svelte + chart-options.ts under `$lib/`.
	 */
	import WashChart from '$lib/components/WashChart.svelte'
</script>

<section class="mx-auto flex w-full max-w-3xl flex-col gap-4 p-6">
	<header class="space-y-1">
		<h1 class="font-display text-2xl font-bold text-primary">Charts</h1>
		<p class="text-sm text-base-content/70">
			ApexCharts in a card shell. Swap <code class="font-mono text-xs">chart-options.ts</code> for
			each series type (line, bar, area, pie).
		</p>
	</header>

	<WashChart height={320} />
</section>
