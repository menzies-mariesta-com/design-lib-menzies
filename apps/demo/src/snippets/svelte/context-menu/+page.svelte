<script lang="ts">
	import ContextMenu from './ContextMenu.svelte'

	let pos = $state<{ x: number; y: number } | null>(null)
	let lastAction = $state('None yet')
	let longPressTimer: number | null = null
	let longPressOrigin: { x: number; y: number } | null = null

	const LONG_PRESS_MS = 520

	function clearLongPress() {
		if (longPressTimer != null) {
			window.clearTimeout(longPressTimer)
			longPressTimer = null
		}
		longPressOrigin = null
	}

	function openAt(x: number, y: number) {
		pos = { x, y }
	}

	function close() {
		pos = null
	}

	function pick(label: string) {
		lastAction = label
		close()
	}

	function onContextMenu(e: MouseEvent) {
		e.preventDefault()
		clearLongPress()
		openAt(e.clientX, e.clientY)
	}

	function onPointerDown(e: PointerEvent) {
		if (e.button === 2) return
		if (e.pointerType === 'touch' || e.pointerType === 'pen') {
			clearLongPress()
			longPressOrigin = { x: e.clientX, y: e.clientY }
			longPressTimer = window.setTimeout(() => {
				if (longPressOrigin) openAt(longPressOrigin.x, longPressOrigin.y)
				clearLongPress()
			}, LONG_PRESS_MS)
		}
	}

	function onPointerMove(e: PointerEvent) {
		if (!longPressOrigin) return
		const dx = e.clientX - longPressOrigin.x
		const dy = e.clientY - longPressOrigin.y
		if (dx * dx + dy * dy > 36) clearLongPress()
	}

	function onKeyDown(e: KeyboardEvent) {
		if (e.key === 'ContextMenu' || (e.shiftKey && e.key === 'F10')) {
			e.preventDefault()
			const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
			openAt(rect.left + rect.width / 2, rect.top + rect.height / 2)
		}
		if (e.key === 'Escape') close()
	}
</script>

<div class="flex flex-col gap-3">
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<div
		role="application"
		tabindex="0"
		class="flex min-h-36 cursor-context-menu flex-col items-center justify-center rounded-box border border-dashed border-ink-border/70 bg-base-200/30 px-4 py-8 text-center outline-none focus-visible:dry-brush"
		aria-label="Right-click or long-press for basic context menu"
		oncontextmenu={onContextMenu}
		onpointerdown={onPointerDown}
		onpointermove={onPointerMove}
		onpointerup={clearLongPress}
		onpointercancel={clearLongPress}
		onkeydown={onKeyDown}
	>
		<p class="text-sm font-medium">Right-click this surface</p>
		<p class="mt-1 text-xs text-ink-muted">Touch: long-press. Keyboard: Shift+F10 when focused.</p>
	</div>
	<p class="text-sm text-ink-muted">
		Last action: <span class="font-medium text-base-content">{lastAction}</span>
	</p>
	<ContextMenu {pos} ariaLabel="Basic context menu" onClose={close}>
		<li role="none">
			<button type="button" role="menuitem" class="cursor-pointer" onclick={() => pick('Open')}>
				Open
			</button>
		</li>
		<li role="none">
			<button type="button" role="menuitem" class="cursor-pointer" onclick={() => pick('Rename')}>
				Rename
			</button>
		</li>
		<li role="none">
			<button
				type="button"
				role="menuitem"
				class="cursor-pointer"
				onclick={() => pick('Inspect wash')}
			>
				Inspect wash
			</button>
		</li>
	</ContextMenu>
</div>
