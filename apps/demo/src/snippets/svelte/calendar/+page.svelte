<script lang="ts">
	/**
	 * SvelteKit usage: place WashCalendar.svelte + calendar-month.ts under $lib,
	 * then import from a route page.
	 *
	 * Paths used in this kit:
	 *   $lib/components/WashCalendar.svelte
	 *   $lib/tool/calendar-month.ts
	 */
	import WashCalendar from '$lib/components/WashCalendar.svelte';

	let scheduleValue = $state('2026-03-15T09:00:00');
</script>

<section class="mx-auto flex w-full max-w-lg flex-col gap-4 p-6">
	<header class="space-y-1">
		<h1 class="font-display text-2xl font-bold text-primary">Studio schedule</h1>
		<p class="text-sm text-base-content/70">
			WashCalendar with includeTime. Pick a day, then open the analog clock.
		</p>
	</header>

	<WashCalendar bind:value={scheduleValue} includeTime ariaLabel="Studio schedule month" />

	<p class="font-mono text-xs text-base-content/60">{scheduleValue}</p>
</section>
