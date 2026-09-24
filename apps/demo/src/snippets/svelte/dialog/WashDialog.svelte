<script lang="ts">
	/**
	 * Modal dialog recipe.
	 * Drop into `$lib/components/WashDialog.svelte`.
	 * Closes via Escape, backdrop click, and explicit action buttons that set `open = false`.
	 */
	import type { Snippet } from 'svelte'

	type Tone = 'primary' | 'secondary' | 'error' | 'warning' | 'info'

	type CloseFn = () => void

	type Props = {
		open?: boolean
		/** When false, Escape / backdrop do not dismiss (e.g. while submit is in flight). */
		dismissible?: boolean
		tone?: Tone
		header?: string
		desc?: string
		ariaLabel?: string
		children?: Snippet
		/** Action row. Prefer `close` for Cancel / X so the native dialog syncs immediately. */
		actions?: Snippet<[{ close: CloseFn }]>
	}

	let {
		open = $bindable(false),
		dismissible = true,
		tone = 'primary',
		header = 'Dialog',
		desc = '',
		ariaLabel = 'Dialog',
		children,
		actions
	}: Props = $props()

	let dialogEl: HTMLDialogElement | undefined = $state()

	$effect(() => {
		const el = dialogEl
		if (!el) return
		if (open) {
			if (!el.open) el.showModal()
		} else if (el.open) {
			el.close()
		}
	})

	/** Close from an action button (Cancel / OK). Always allowed; callers disable while saving. */
	function close(): void {
		open = false
		dialogEl?.close()
	}

	/** Escape / backdrop: respect `dismissible`. */
	function requestDismiss() {
		if (!dismissible) return
		close()
	}

	function onCancel(e: Event) {
		e.preventDefault()
		requestDismiss()
	}

	function onClose() {
		open = false
	}

	function onBackdropSubmit(e: Event) {
		e.preventDefault()
		requestDismiss()
	}

	const titleClass = $derived(
		tone === 'error'
			? 'card-title text-error font-bold'
			: tone === 'secondary'
				? 'card-title text-secondary font-bold'
				: tone === 'warning'
					? 'card-title text-warning font-bold'
					: tone === 'info'
						? 'card-title text-info font-bold'
						: 'card-title text-primary font-bold'
	)
</script>

<dialog
	bind:this={dialogEl}
	class="modal"
	aria-label={ariaLabel}
	oncancel={onCancel}
	onclose={onClose}
>
	<div class="modal-box">
		<h3 class={titleClass}>{header}</h3>
		{#if desc}
			<p class="py-2 text-sm text-base-content/70">{desc}</p>
		{/if}
		<div class="py-2">
			{#if children}{@render children()}{/if}
		</div>
		<div class="modal-action">
			{#if actions}
				{@render actions({ close })}
			{:else}
				<button type="button" class="btn cursor-pointer" onclick={close}>Close</button>
			{/if}
		</div>
	</div>
	<form method="dialog" class="modal-backdrop" onsubmit={onBackdropSubmit}>
		<button type="submit" class="cursor-pointer" aria-label="Close">close</button>
	</form>
</dialog>
