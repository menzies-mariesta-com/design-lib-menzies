<script lang="ts">
	/**
	 * Analog clock time dial (details + wash-time classes).
	 * Drop into `$lib/components/TimeClockDial.svelte`.
	 * Pair with calendar-month helpers for full datetime; this kit is time-only.
	 */
	type TimeView = 'hour' | 'minute' | 'second'

	type Props = {
		/** `HH:mm:ss` */
		value?: string
		ariaLabel?: string
	}

	let { value = $bindable('09:00:00'), ariaLabel = 'Time' }: Props = $props()

	let open = $state(false)
	let view = $state<TimeView>('hour')

	const parts = $derived.by(() => {
		const [h = '09', m = '00', s = '00'] = value.split(':')
		return {
			hour: Number(h) || 0,
			minute: Number(m) || 0,
			second: Number(s) || 0
		}
	})

	function pad2(n: number) {
		return String(n).padStart(2, '0')
	}

	function setPart(next: Partial<typeof parts>) {
		const h = next.hour ?? parts.hour
		const m = next.minute ?? parts.minute
		const s = next.second ?? parts.second
		value = `${pad2(h)}:${pad2(m)}:${pad2(s)}`
	}
</script>

<details class="dropdown wash-time w-full" bind:open>
	<summary
		class="wash-time__trigger input input-bordered flex w-full cursor-pointer items-center justify-between gap-2 [&::-webkit-details-marker]:hidden"
		aria-label="{ariaLabel}: {value}"
		aria-haspopup="dialog"
	>
		<span class="min-w-0 truncate font-mono text-sm tabular-nums">{value}</span>
	</summary>
	<div
		class="dropdown-content wash-time__panel z-50 mt-1 rounded-box border border-ink-border bg-base-100 p-3 shadow-[var(--shadow-paper-md)]"
		role="dialog"
		aria-label="Choose time"
	>
		<div class="wash-time__readout" role="group" aria-label="Time parts">
			<button
				type="button"
				class="wash-time__part cursor-pointer font-mono {view === 'hour'
					? 'wash-time__part--active'
					: ''}"
				aria-pressed={view === 'hour'}
				onclick={() => (view = 'hour')}
			>
				{pad2(parts.hour)}
			</button>
			<span class="wash-time__sep" aria-hidden="true">:</span>
			<button
				type="button"
				class="wash-time__part cursor-pointer font-mono {view === 'minute'
					? 'wash-time__part--active'
					: ''}"
				aria-pressed={view === 'minute'}
				onclick={() => (view = 'minute')}
			>
				{pad2(parts.minute)}
			</button>
			<span class="wash-time__sep" aria-hidden="true">:</span>
			<button
				type="button"
				class="wash-time__part cursor-pointer font-mono {view === 'second'
					? 'wash-time__part--active'
					: ''}"
				aria-pressed={view === 'second'}
				onclick={() => (view = 'second')}
			>
				{pad2(parts.second)}
			</button>
		</div>
		<div class="wash-time__dial mt-3 flex flex-wrap justify-center gap-1" role="listbox" aria-label={view}>
			{#if view === 'hour'}
				{#each Array.from({ length: 24 }, (_, i) => i) as h}
					<button
						type="button"
						class="btn btn-ghost btn-xs cursor-pointer {parts.hour === h ? 'btn-active' : ''}"
						onclick={() => setPart({ hour: h })}
					>
						{pad2(h)}
					</button>
				{/each}
			{:else if view === 'minute'}
				{#each Array.from({ length: 12 }, (_, i) => i * 5) as m}
					<button
						type="button"
						class="btn btn-ghost btn-xs cursor-pointer {parts.minute === m ? 'btn-active' : ''}"
						onclick={() => setPart({ minute: m })}
					>
						{pad2(m)}
					</button>
				{/each}
			{:else}
				{#each Array.from({ length: 12 }, (_, i) => i * 5) as s}
					<button
						type="button"
						class="btn btn-ghost btn-xs cursor-pointer {parts.second === s ? 'btn-active' : ''}"
						onclick={() => setPart({ second: s })}
					>
						{pad2(s)}
					</button>
				{/each}
			{/if}
		</div>
	</div>
</details>
