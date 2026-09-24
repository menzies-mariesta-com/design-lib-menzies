<script lang="ts">
	/**
	 * SvelteKit usage: `$lib/components/TimeClockDial.svelte`.
	 */
	import TimeClockDial from '$lib/components/TimeClockDial.svelte'

	let time = $state('09:00:00')
</script>

<section class="mx-auto flex w-full max-w-sm flex-col gap-4 p-6">
	<header class="space-y-1">
		<h1 class="font-display text-2xl font-bold text-primary">Time clock</h1>
		<p class="text-sm text-base-content/70">
			Analog-style wash-time dial for HH:mm:ss. Use with calendar for datetime.
		</p>
	</header>

	<TimeClockDial bind:value={time} />

	<p class="font-mono text-xs text-base-content/60">{time}</p>
</section>
