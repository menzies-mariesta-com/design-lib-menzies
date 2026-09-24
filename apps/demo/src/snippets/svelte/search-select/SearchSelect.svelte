<script lang="ts">
	type Option = { value: string; label: string; disabled?: boolean }

	type Props = {
		options?: (string | Option)[]
		value?: string | null
		label?: string
		placeholder?: string
		filterPlaceholder?: string
		emptyMessage?: string
		/** Seeded into the filter when the menu opens (not forced open). */
		defaultQuery?: string
		disabled?: boolean
		required?: boolean
		triggerClass?: string
		inputClass?: string
	}

	let {
		options = [
			'Ultramarine',
			'Yellow ochre',
			'Alizarin crimson',
			'Viridian',
			'Burnt sienna',
			'Cobalt blue',
			'Cerulean',
			'Quinacridone rose'
		],
		value = $bindable<string | null>(null),
		label = 'Pigment',
		placeholder = 'Search pigments…',
		filterPlaceholder = 'Type to filter…',
		emptyMessage = 'No options match.',
		defaultQuery = '',
		disabled = false,
		required = false,
		triggerClass = '',
		inputClass = ''
	}: Props = $props()

	let open = $state(false)
	let query = $state('')
	let rootEl: HTMLDivElement | undefined = $state()
	const listboxId = `search-select-listbox-${Math.random().toString(36).slice(2, 9)}`

	const normalized = $derived(
		options.map((o) => (typeof o === 'string' ? { value: o, label: o } : o))
	)

	const filtered = $derived(
		normalized.filter((o) => o.label.toLowerCase().includes(query.trim().toLowerCase()))
	)

	const selected = $derived(normalized.find((o) => o.value === value))

	function commit(next: string) {
		if (disabled) return
		value = next
		open = false
		query = ''
	}

	function toggle() {
		if (disabled) return
		open = !open
		if (open) query = defaultQuery
		else query = ''
	}

	$effect(() => {
		if (!open) return
		function onDoc(e: MouseEvent) {
			if (rootEl && !rootEl.contains(e.target as Node)) open = false
		}
		function onKey(e: KeyboardEvent) {
			if (e.key === 'Escape') open = false
		}
		document.addEventListener('mousedown', onDoc)
		document.addEventListener('keydown', onKey)
		return () => {
			document.removeEventListener('mousedown', onDoc)
			document.removeEventListener('keydown', onKey)
		}
	})
</script>

<div
	bind:this={rootEl}
	class="dropdown dropdown-no-hover w-full max-w-md {open ? 'dropdown-open' : ''} {disabled
		? 'pointer-events-none opacity-60'
		: ''}"
>
	<label class="form-control w-full">
		{#if label}
			<span class="label">
				<span class="label-text">
					{label}
					{#if required}
						<span class="text-error align-top text-sm leading-none" aria-hidden="true">*</span>
					{/if}
				</span>
			</span>
		{/if}
		<button
			type="button"
			class="btn w-full justify-between border-ink-border font-normal cursor-pointer {triggerClass} {disabled
				? 'btn-disabled cursor-not-allowed'
				: ''}"
			role="combobox"
			aria-expanded={open}
			aria-controls={open ? listboxId : undefined}
			aria-haspopup="listbox"
			aria-required={required || undefined}
			{disabled}
			onclick={toggle}
		>
			<span class="min-w-0 flex-1 truncate {selected ? '' : 'text-base-content/50'}">
				{selected?.label ?? placeholder}
			</span>
			<svg
				class="size-4 shrink-0 opacity-60"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				aria-hidden="true"
			>
				<path d="m7 15 5 5 5-5" />
				<path d="m7 9 5-5 5 5" />
			</svg>
		</button>
	</label>
	{#if open}
		<div
			class="dropdown-content z-[80] mt-1 w-full max-w-[min(100vw-1rem,28rem)] overflow-y-auto overflow-x-hidden rounded-box border border-ink-border bg-base-100 p-2 shadow-[var(--shadow-paper-md)]"
		>
			<label class="input input-sm mb-2 w-full cursor-text border-ink-border">
				<svg
					class="size-3.5 shrink-0 opacity-60"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					aria-hidden="true"
				>
					<path d="m21 21-4.34-4.34" />
					<circle cx="11" cy="11" r="8" />
				</svg>
				<input
					type="search"
					class="grow cursor-text {inputClass}"
					placeholder={filterPlaceholder}
					bind:value={query}
					aria-label="Filter {label}"
				/>
			</label>
			<ul
				id={listboxId}
				class="menu max-h-52 w-full overflow-y-auto overflow-x-hidden rounded-box p-0"
				role="listbox"
				tabindex="-1"
			>
				{#if filtered.length === 0}
					<li class="px-3 py-2 text-sm text-ink-muted">{emptyMessage}</li>
				{:else}
					{#each filtered as opt (opt.value)}
						<li role="option" aria-selected={value === opt.value}>
							<button
								type="button"
								class="cursor-pointer {value === opt.value ? 'active' : ''} {opt.disabled
									? 'cursor-not-allowed opacity-50'
									: ''}"
								disabled={opt.disabled}
								onclick={() => commit(opt.value)}
							>
								<span class="truncate">{opt.label}</span>
								{#if value === opt.value}
									<svg
										class="size-4 opacity-70"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										aria-hidden="true"
									>
										<path d="M20 6 9 17l-5-5" />
									</svg>
								{/if}
							</button>
						</li>
					{/each}
				{/if}
			</ul>
		</div>
	{/if}
</div>
