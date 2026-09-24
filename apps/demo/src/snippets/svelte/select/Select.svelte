<script lang="ts">
	type Option = { value: string; label: string; disabled?: boolean }
	type OptionGroup = { label: string; options: Option[] }

	type Props = {
		options?: (Option | OptionGroup)[]
		value?: string
		placeholder?: string
		disabled?: boolean
		triggerClass?: string
		ariaLabel?: string
	}

	let {
		options = [
			{ value: 'ultramarine', label: 'Ultramarine' },
			{ value: 'ochre', label: 'Yellow ochre' },
			{ value: 'alizarin', label: 'Alizarin crimson' },
			{ value: 'viridian', label: 'Viridian' }
		],
		value = $bindable(''),
		placeholder = 'Pick a pigment…',
		disabled = false,
		triggerClass = '',
		ariaLabel = 'Select'
	}: Props = $props()

	let open = $state(false)
	let rootEl: HTMLDivElement | undefined = $state()

	function isGroup(item: Option | OptionGroup): item is OptionGroup {
		return 'options' in item
	}

	const flat = $derived.by(() => {
		const list: Option[] = []
		for (const item of options) {
			if (isGroup(item)) list.push(...item.options)
			else list.push(item)
		}
		return list
	})

	const selected = $derived(flat.find((o) => o.value === value))

	function commit(next: string) {
		if (disabled) return
		value = next
		open = false
	}

	function toggle() {
		if (disabled) return
		open = !open
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
	class="dropdown w-full {open ? 'dropdown-open' : ''} {disabled ? 'pointer-events-none opacity-60' : ''}"
>
	<button
		type="button"
		class="select select-bordered w-full cursor-pointer justify-between {triggerClass}"
		role="combobox"
		aria-expanded={open}
		aria-haspopup="listbox"
		aria-label={ariaLabel}
		{disabled}
		onclick={toggle}
	>
		<span
			class="min-w-0 flex-1 truncate {selected
				? ''
				: 'text-base-content/50'}">{selected?.label ?? placeholder}</span>
	</button>
	{#if open}
		<div
			class="dropdown-content z-50 mt-1 w-full overflow-y-auto rounded-box border border-ink-border bg-base-100 p-2 shadow-[var(--shadow-paper-md)]"
		>
			<ul class="menu w-full rounded-box p-0" role="listbox">
				{#each options as item}
					{#if isGroup(item)}
						<li class="menu-title">{item.label}</li>
						{#each item.options as opt}
							<li role="option" aria-selected={value === opt.value}>
								<button
									type="button"
									class="cursor-pointer {value === opt.value ? 'active' : ''} {opt.disabled
										? 'cursor-not-allowed opacity-50'
										: ''}"
									disabled={opt.disabled}
									onclick={() => commit(opt.value)}
								>
									{opt.label}
								</button>
							</li>
						{/each}
					{:else}
						<li role="option" aria-selected={value === item.value}>
							<button
								type="button"
								class="cursor-pointer {value === item.value ? 'active' : ''} {item.disabled
									? 'cursor-not-allowed opacity-50'
									: ''}"
								disabled={item.disabled}
								onclick={() => commit(item.value)}
							>
								{item.label}
							</button>
						</li>
					{/if}
				{/each}
			</ul>
		</div>
	{/if}
</div>
