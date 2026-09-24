<script lang="ts">
	type LogLevel = 'info' | 'success' | 'warn' | 'error'
	type LogLine = { time: string; level: LogLevel; message: string }

	const levelClass: Record<LogLevel, string> = {
		info: 'text-info',
		success: 'text-success',
		warn: 'text-warning',
		error: 'text-error'
	}

	const filterLevels = ['all', 'info', 'success', 'warn', 'error'] as const
	type FilterLevel = (typeof filterLevels)[number]

	const sampleLogs: LogLine[] = [
		{ time: 'Aug 1, 16:02', level: 'info', message: 'Starting studio build for wash-demo…' },
		{
			time: 'Aug 1, 16:02',
			level: 'info',
			message: 'Resolving pigment tokens from @menzies/design-wash-ui'
		},
		{
			time: 'Aug 1, 16:03',
			level: 'success',
			message: 'Pigment mix complete: ultramarine, ochre, rose'
		},
		{
			time: 'Aug 1, 16:04',
			level: 'warn',
			message: 'Plate #1842 dry time extended (+12s humidity offset)'
		},
		{
			time: 'Aug 1, 16:06',
			level: 'error',
			message: 'Thumbnail export failed: missing og-image asset'
		},
		{
			time: 'Aug 1, 16:07',
			level: 'success',
			message: 'Preview URL ready: https://studio.menzies.design/preview/1842'
		}
	]

	let paused = $state(false)
	let filter = $state<FilterLevel>('all')
	let logs = $state<LogLine[]>([...sampleLogs])

	const visibleLogs = $derived(
		filter === 'all' ? logs : logs.filter((line) => line.level === filter)
	)
</script>

<div
	class="flex min-h-[280px] w-full flex-col overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-sm"
>
	<header
		class="flex shrink-0 flex-wrap items-center gap-3 border-b border-base-300 bg-base-200/70 px-3 py-2.5 sm:px-4"
	>
		<div class="flex min-w-0 flex-1 items-center gap-2">
			<h2 class="truncate font-display text-sm font-semibold sm:text-base">Studio terminal</h2>
			<span class="flex items-center gap-1.5 text-xs text-ink-muted">
				<span
					class="status status-xs {paused ? 'status-warning' : 'status-success'}"
					aria-hidden="true"
				></span>
				{paused ? 'Paused' : 'Live'}
			</span>
		</div>
		<div class="flex flex-wrap items-center gap-1">
			<button
				type="button"
				class="btn btn-ghost btn-xs cursor-pointer gap-1"
				aria-label="Clear log"
				onclick={() => (logs = [])}>Clear</button
			>
			<button
				type="button"
				class="btn btn-ghost btn-xs cursor-pointer gap-1"
				aria-label={paused ? 'Resume stream' : 'Pause stream'}
				onclick={() => (paused = !paused)}>{paused ? 'Resume' : 'Pause'}</button
			>
			<button type="button" class="btn btn-ghost btn-xs cursor-pointer gap-1" aria-label="Copy log"
				>Copy</button
			>
		</div>
	</header>

	<div class="flex shrink-0 flex-wrap gap-1.5 border-b border-base-300 bg-base-200/40 px-3 py-2 sm:px-4">
		{#each filterLevels as level}
			<button
				type="button"
				class="btn btn-xs cursor-pointer capitalize {filter === level ? 'btn-primary' : 'btn-ghost'}"
				onclick={() => (filter = level)}
			>
				{level === 'all' ? 'All' : level}
			</button>
		{/each}
	</div>

	<div
		class="min-h-0 flex-1 overflow-auto bg-neutral px-3 py-3 font-mono text-xs leading-relaxed text-neutral-content sm:px-4 sm:text-sm"
		role="log"
		aria-live="polite"
		aria-relevant="additions"
	>
		{#each visibleLogs as line, index (line.time + index)}
			<div class="flex flex-wrap gap-x-2 gap-y-0.5 py-0.5">
				<span class="shrink-0 text-neutral-content/50">{line.time}</span>
				<span class="shrink-0 uppercase {levelClass[line.level]}">{line.level}</span>
				<span class="min-w-0 break-words">{line.message}</span>
			</div>
		{/each}
	</div>
</div>
