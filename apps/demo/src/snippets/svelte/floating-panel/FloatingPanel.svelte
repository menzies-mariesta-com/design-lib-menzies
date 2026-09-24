<script lang="ts">
	/**
	 * Floating panel chrome. Drop into `$lib/components/FloatingPanel.svelte`.
	 * Title-bar drag uses window pointer listeners + setPointerCapture (touch-safe).
	 */
	import { onMount } from 'svelte'
	import type { Snippet } from 'svelte'

	type Props = {
		title?: string
		open?: boolean
		panelClass?: string
		draggable?: boolean
		left?: number
		top?: number
		width?: number
		height?: number
		children?: Snippet
	}

	let {
		title = 'Notes',
		open = $bindable(true),
		panelClass = '',
		draggable = true,
		left = 16,
		top = 16,
		width = 260,
		height = 168,
		children,
	}: Props = $props()

	let x = $state(16)
	let y = $state(16)
	let dragging = $state(false)

	type DragSession = {
		pointerId: number
		startX: number
		startY: number
		origX: number
		origY: number
	}

	let drag: DragSession | null = null

	function isNoDrag(target: EventTarget | null) {
		if (!(target instanceof Element)) return false
		return Boolean(
			target.closest('button, a, input, select, textarea, label, [data-no-drag], [role="button"]'),
		)
	}

	function onTitlePointerDown(e: PointerEvent) {
		if (!draggable || e.button !== 0) return
		if (isNoDrag(e.target)) return
		e.preventDefault()
		drag = {
			pointerId: e.pointerId,
			startX: e.clientX,
			startY: e.clientY,
			origX: x,
			origY: y,
		}
		dragging = true
		try {
			;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
		} catch {
			/* window listeners still track */
		}
	}

	onMount(() => {
		x = left
		y = top

		function onMove(e: PointerEvent) {
			if (!drag || drag.pointerId !== e.pointerId) return
			e.preventDefault()
			x = Math.max(0, drag.origX + (e.clientX - drag.startX))
			y = Math.max(0, drag.origY + (e.clientY - drag.startY))
		}

		function onUp(e: PointerEvent) {
			if (!drag || drag.pointerId !== e.pointerId) return
			drag = null
			dragging = false
		}

		function onKey(e: KeyboardEvent) {
			if (e.key !== 'Escape') return
			if (!open) return
			open = false
		}

		window.addEventListener('pointermove', onMove, { passive: false })
		window.addEventListener('pointerup', onUp)
		window.addEventListener('pointercancel', onUp)
		window.addEventListener('keydown', onKey)
		return () => {
			window.removeEventListener('pointermove', onMove)
			window.removeEventListener('pointerup', onUp)
			window.removeEventListener('pointercancel', onUp)
			window.removeEventListener('keydown', onKey)
		}
	})
</script>

{#if open}
	<div
		class="floating-panel absolute z-20 flex flex-col overflow-hidden shadow-lg outline-none"
		style:left="{x}px"
		style:top="{y}px"
		style:width="{width}px"
		style:height="{height}px"
		role="dialog"
		aria-label={title}
	>
		<div
			class="wash-panel paper-grain flex h-full min-h-0 w-full flex-col overflow-hidden {panelClass}"
		>
			<div
				class="flex shrink-0 touch-none items-center gap-1 border-b border-ink-border/70 px-2 py-1.5 select-none {draggable
					? dragging
						? 'cursor-grabbing'
						: 'cursor-grab'
					: ''}"
				role="toolbar"
				tabindex="-1"
				aria-label="Drag to move"
				onpointerdown={onTitlePointerDown}
			>
				<p class="min-w-0 flex-1 truncate px-1 text-sm font-semibold">{title}</p>
				<div class="flex shrink-0 items-center gap-0.5" data-no-drag>
					<div class="tooltip tooltip-left tooltip-error" data-tip="Close">
						<button
							type="button"
							class="btn btn-ghost btn-square btn-error btn-xs cursor-pointer"
							aria-label="Close"
							onclick={() => (open = false)}
							onpointerdown={(e) => e.stopPropagation()}
						>
							✕
						</button>
					</div>
				</div>
			</div>
			<div class="min-h-0 flex-1 overflow-auto p-3 text-sm" data-no-drag>
				{#if children}
					{@render children()}
				{:else}
					<p class="text-ink-muted">Absolute within the frame. Soft wash edge, no modal lock.</p>
					<p class="mt-2 text-xs text-ink-muted">Esc closes this panel. Drag the title bar to move.</p>
				{/if}
			</div>
		</div>
	</div>
{/if}
