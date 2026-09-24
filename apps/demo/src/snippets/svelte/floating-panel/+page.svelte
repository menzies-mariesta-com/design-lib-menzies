<script lang="ts">
	import FloatingPanel from '$lib/components/FloatingPanel.svelte'

	let open = $state(true)
</script>

<div class="relative h-72 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/30 sm:h-80">
	<div class="pointer-events-none absolute inset-0 p-4 sm:p-6">
		<div class="h-full rounded-box border border-dashed border-ink-border/50 bg-base-100/40 p-4">
			<p class="label-ink">Canvas</p>
			<p class="mt-2 max-w-xs text-sm text-ink-muted">
				Sketch area behind a wash panel. Toggle the panel, or press Esc when it is open.
			</p>
		</div>
	</div>

	{#if open}
		<FloatingPanel bind:open title="Notes" />
	{:else}
		<button
			type="button"
			class="btn btn-sm absolute right-3 top-3 z-10 cursor-pointer sm:right-5 sm:top-5"
			onclick={() => (open = true)}
		>
			Show panel
		</button>
	{/if}
</div>
