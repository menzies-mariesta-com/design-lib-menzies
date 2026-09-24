<script lang="ts">
	import OverflowMarquee from '$lib/components/OverflowMarquee.svelte'
</script>

<div class="grid gap-8 md:grid-cols-2">
	<div class="flex flex-col gap-2">
		<div class="w-full max-w-[11rem] rounded-field border border-ink-border/70 bg-base-100 px-3 py-2">
			<p class="truncate text-sm">Ultramarine glaze over warm ochre underpainting for depth</p>
		</div>
		<p class="text-xs text-ink-muted">Hover the truncated line. Non-overflowing text stays still.</p>
		<code class="font-mono text-[0.65rem] text-ink-muted">truncate (auto-attach)</code>
	</div>

	<div class="flex flex-col gap-2">
		<div class="w-full max-w-[11rem] rounded-field border border-ink-border/70 bg-base-100 px-3 py-2">
			<OverflowMarquee class="text-sm" text="Wet-on-wet bloom edges need a clean sponge and patience" />
		</div>
		<p class="text-xs text-ink-muted">Explicit host when you own the markup.</p>
		<code class="font-mono text-[0.65rem] text-ink-muted">overflow-marquee-host</code>
	</div>

	<div class="flex flex-col gap-2 md:col-span-2">
		<div class="w-full max-w-xl rounded-field border border-ink-border/70 bg-base-100 px-3 py-2">
			<p class="truncate text-sm">Short label</p>
		</div>
		<code class="font-mono text-[0.65rem] text-ink-muted">truncate (fits: no marquee)</code>
	</div>
</div>
