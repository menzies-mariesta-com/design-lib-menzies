<script lang="ts">
	type Row = {
		name: string
		tags: string[]
		status: string
		statusClass: string
		created: string
		updated: string
		series: string
		washes: number
	}

	type Props = {
		title?: string
		description?: string
		rows?: Row[]
		empty?: boolean
	}

	let {
		title = 'Studio plates',
		description = 'Plate ledger for wash studio work',
		empty = false,
		rows = [
			{
				name: 'Coastal fog plate',
				tags: ['coastal', 'mist'],
				status: 'Review',
				statusClass: 'badge badge-soft badge-primary',
				created: 'Aug 4, 10:18',
				updated: 'Aug 21, 09:14',
				series: 'Atlantic Studies',
				washes: 7
			},
			{
				name: 'Ochre cliff margin',
				tags: ['mineral', 'earth'],
				status: 'In wash',
				statusClass: 'badge badge-soft badge-warning',
				created: 'Aug 2, 14:05',
				updated: 'Aug 20, 16:42',
				series: 'Mineral Notes',
				washes: 4
			},
			{
				name: 'Rose field bloom',
				tags: ['botanical', 'rose'],
				status: 'Review',
				statusClass: 'badge badge-soft badge-primary',
				created: 'Jul 28, 11:40',
				updated: 'Aug 19, 11:05',
				series: 'Botanical Index',
				washes: 9
			}
		]
	}: Props = $props()

	let page = $state(1)
	const pageSize = 5
	const total = $derived(empty ? 0 : rows.length)
	const pageCount = $derived(Math.max(1, Math.ceil(Math.max(total, 1) / pageSize)))
	const pageRows = $derived(empty ? [] : rows.slice((page - 1) * pageSize, page * pageSize))
</script>

<div
	class="wash-table-chrome flex h-[360px] min-h-0 flex-col overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-sm transition-[box-shadow,transform,background-color,border-color] duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5 hover:shadow-md focus-within:-translate-y-0.5 focus-within:border-primary/40 focus-within:bg-primary/5 focus-within:shadow-md"
>
	<div class="flex shrink-0 items-start justify-between gap-3 border-b border-base-300 px-3 py-2.5">
		<div class="min-w-0 flex-1">
			<h2 class="text-base font-bold leading-tight">{title}</h2>
			{#if description}
				<p class="mt-0.5 text-xs text-ink-muted">{description}</p>
			{/if}
		</div>
		<div class="flex shrink-0 flex-wrap items-center justify-end gap-0.5">
			<div class="dropdown dropdown-end dropdown-bottom dropdown-no-hover wash-dropdown-contained">
				<div class="tooltip tooltip-secondary" data-tip="Export">
					<div
						tabindex="0"
						role="button"
						class="btn btn-ghost btn-square btn-sm btn-secondary cursor-pointer"
						aria-label="Export"
						aria-haspopup="menu"
					>
						↓
					</div>
				</div>
				<ul
					tabindex="-1"
					role="menu"
					class="dropdown-content menu z-50 mt-1 w-40 rounded-box border border-ink-border bg-base-100 p-2 shadow-[var(--shadow-paper-md)]"
				>
					<li role="none">
						<button type="button" role="menuitem" class="cursor-pointer">Excel</button>
					</li>
					<li role="none">
						<button type="button" role="menuitem" class="cursor-pointer">CSV</button>
					</li>
					<li role="none">
						<button type="button" role="menuitem" class="cursor-pointer">ODS</button>
					</li>
				</ul>
			</div>
			<div class="tooltip tooltip-secondary" data-tip="Refresh">
				<button
					type="button"
					class="btn btn-ghost btn-square btn-sm btn-secondary cursor-pointer"
					aria-label="Refresh">↻</button
				>
			</div>
			<div class="tooltip tooltip-primary" data-tip="Add">
				<button
					type="button"
					class="btn btn-ghost btn-square btn-sm btn-primary cursor-pointer"
					aria-label="Add">+</button
				>
			</div>
		</div>
	</div>

	<div class="min-h-0 flex-1 overflow-auto">
		<table class="table table-zebra w-full">
			<thead class="sticky top-0 z-10 bg-base-100">
				<tr>
					<th>Actions</th>
					<th>No</th>
					<th>Name</th>
					<th>Tags</th>
					<th>Status</th>
					<th>Created</th>
					<th>Updated</th>
					<th>Series</th>
					<th>Washes</th>
				</tr>
				<tr class="font-normal">
					<th aria-hidden="true"></th>
					<th aria-hidden="true"></th>
					<th>
						<input
							type="text"
							class="input input-xs input-bordered w-full max-w-[10rem] cursor-text"
							placeholder="Filter…"
							aria-label="Filter by name"
						/>
					</th>
					<th>
						<input
							type="text"
							class="input input-xs input-bordered w-full max-w-[8rem] cursor-text"
							placeholder="Filter…"
							aria-label="Filter by tags"
						/>
					</th>
					<th>
						<select
							class="select select-xs select-bordered w-full max-w-[7rem] cursor-pointer"
							aria-label="Filter by status"
						>
							<option value="">All</option>
							<option>Draft</option>
							<option>In wash</option>
							<option>Review</option>
							<option>Archived</option>
						</select>
					</th>
					<th>
						<button
							type="button"
							class="btn btn-ghost btn-xs h-7 min-h-7 w-full max-w-[9.5rem] cursor-pointer justify-start border border-base-300 px-2 font-normal"
						>
							Any dates
						</button>
					</th>
					<th>
						<button
							type="button"
							class="btn btn-ghost btn-xs h-7 min-h-7 w-full max-w-[9.5rem] cursor-pointer justify-start border border-base-300 px-2 font-normal"
						>
							Any dates
						</button>
					</th>
					<th aria-hidden="true"></th>
					<th aria-hidden="true"></th>
				</tr>
			</thead>
			<tbody>
				{#if pageRows.length === 0}
					<tr>
						<td colspan="9" class="py-10 text-center text-sm text-ink-muted">
							No plates match these filters.
						</td>
					</tr>
				{:else}
					{#each pageRows as row, index}
						<tr>
							<td>
								<div class="flex items-center gap-0.5">
									<div class="tooltip tooltip-primary tooltip-right" data-tip="View">
										<button
											type="button"
											class="btn btn-ghost btn-square btn-xs btn-primary cursor-pointer"
											aria-label="View">View</button
										>
									</div>
									<div class="tooltip tooltip-secondary tooltip-right" data-tip="Edit">
										<button
											type="button"
											class="btn btn-ghost btn-square btn-xs btn-secondary cursor-pointer"
											aria-label="Edit">Edit</button
										>
									</div>
									<div class="tooltip tooltip-error tooltip-right" data-tip="Delete">
										<button
											type="button"
											class="btn btn-ghost btn-square btn-xs btn-error cursor-pointer"
											aria-label="Delete">Delete</button
										>
									</div>
								</div>
							</td>
							<td>{(page - 1) * pageSize + index + 1}</td>
							<td class="font-medium">{row.name}</td>
							<td>
								{#each row.tags as tag}
									<span class="badge badge-ghost badge-sm">{tag}</span>
								{/each}
							</td>
							<td><span class={row.statusClass}>{row.status}</span></td>
							<td class="whitespace-nowrap text-sm text-ink-muted">{row.created}</td>
							<td class="whitespace-nowrap text-sm text-ink-muted">{row.updated}</td>
							<td>{row.series}</td>
							<td>{row.washes}</td>
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>
	</div>

	<div
		class="grid shrink-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-2 border-t border-base-300 px-3 py-2 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]"
	>
		<label class="flex min-w-0 items-center gap-1.5 justify-self-start text-xs text-ink-muted">
			<span>Per page</span>
			<select class="select select-sm select-bordered cursor-pointer" aria-label="Rows per page">
				<option selected>auto</option>
				<option>5</option>
				<option>10</option>
				<option>25</option>
				<option>50</option>
			</select>
		</label>
		<p class="hidden justify-self-center text-center font-mono text-xs text-ink-muted sm:block">
			{#if total === 0}
				Showing 0-0 of 0
			{:else}
				Showing {(page - 1) * pageSize + 1}-{Math.min(page * pageSize, total)} of {total}
			{/if}
		</p>
		<div class="join col-start-2 justify-self-end sm:col-start-3">
			{#each Array.from({ length: pageCount }, (_, i) => i + 1) as p (p)}
				<button
					type="button"
					class="btn btn-sm join-item cursor-pointer {p === page ? 'btn-active' : ''}"
					onclick={() => (page = p)}
				>
					{p}
				</button>
			{/each}
		</div>
	</div>

	<div class="flex justify-center gap-3 border-t border-base-300 px-3 pb-2 pt-3">
		<span class="inline-flex items-center gap-1.5 text-xs text-ink-muted">
			<span class="size-2.5 rounded-sm bg-base-300" aria-hidden="true"></span>Tags
		</span>
		<span class="inline-flex items-center gap-1.5 text-xs text-ink-muted">
			<span class="size-2.5 rounded-sm bg-primary" aria-hidden="true"></span>Status
		</span>
	</div>
</div>
