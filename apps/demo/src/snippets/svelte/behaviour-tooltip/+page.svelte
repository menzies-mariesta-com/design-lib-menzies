<script lang="ts">
	import SmartTooltip from '$lib/components/SmartTooltip.svelte'
</script>

<section class="mx-auto flex w-full max-w-2xl flex-col gap-6 p-6">
	<header class="space-y-1">
		<h1 class="font-display text-2xl font-bold text-primary">Auto tooltip</h1>
		<p class="text-sm text-base-content/70">
			Pick left/right from viewport room so tips stay visible in overflow panes.
		</p>
	</header>

	<div class="flex w-full justify-between gap-4">
		<SmartTooltip tip="Opens right: more room that way" tone="primary">
			{#snippet children()}
				<button type="button" class="btn btn-primary cursor-pointer">Near left edge</button>
			{/snippet}
		</SmartTooltip>
		<SmartTooltip tip="Opens left: more room that way" tone="secondary">
			{#snippet children()}
				<button type="button" class="btn btn-secondary cursor-pointer">Near right edge</button>
			{/snippet}
		</SmartTooltip>
	</div>
</section>
