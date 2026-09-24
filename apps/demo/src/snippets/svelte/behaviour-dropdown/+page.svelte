<script lang="ts">
	import SmartDetailsDropdown from '$lib/components/SmartDetailsDropdown.svelte'
</script>

<section class="mx-auto flex w-full max-w-lg flex-col gap-4 p-6">
	<header class="space-y-1">
		<h1 class="font-display text-2xl font-bold text-primary">Auto dropdown</h1>
		<p class="text-sm text-base-content/70">
			details.dropdown flips end/top from viewport space. Hover open for fine pointers.
		</p>
	</header>

	<SmartDetailsDropdown label="Pigment menu">
		{#snippet children()}
			<ul class="menu p-0">
				<li><button type="button" class="cursor-pointer">Ultramarine</button></li>
				<li><button type="button" class="cursor-pointer">Viridian</button></li>
				<li><button type="button" class="cursor-pointer">Ochre</button></li>
			</ul>
		{/snippet}
	</SmartDetailsDropdown>
</section>
