<script lang="ts">
	type Props = {
		value?: string
	}

	let {
		value = $bindable(
			'<h1>Rich text</h1><p>Draft product copy with toolbar formatting, lists, and links.</p><p>Wash rich text is <em>from-scratch</em>: contenteditable chrome and paste sanitize, not TipTap or Lexical.</p>'
		)
	}: Props = $props()
	let editor: HTMLDivElement | undefined = $state()

	function cmd(command: string) {
		document.execCommand(command, false)
		editor?.focus()
		value = editor?.innerHTML ?? value
	}
</script>

<div
	class="wash-rte overflow-hidden rounded-box border border-ink-border bg-base-100 shadow-[var(--shadow-paper-sm)]"
>
	<div
		class="wash-rte-toolbar flex flex-wrap gap-1 border-b border-base-300 bg-base-200 p-2"
		role="toolbar"
		aria-label="Rich text formatting"
	>
		<div class="join">
			<button
				type="button"
				class="btn btn-ghost btn-square btn-xs join-item cursor-pointer"
				aria-label="Undo"
				onclick={() => cmd('undo')}>↶</button
			>
			<button
				type="button"
				class="btn btn-ghost btn-square btn-xs join-item cursor-pointer"
				aria-label="Redo"
				onclick={() => cmd('redo')}>↷</button
			>
		</div>
		<div class="join">
			<button
				type="button"
				class="btn btn-ghost btn-square btn-xs join-item cursor-pointer"
				aria-label="Bold"
				onclick={() => cmd('bold')}><strong>B</strong></button
			>
			<button
				type="button"
				class="btn btn-ghost btn-square btn-xs join-item cursor-pointer"
				aria-label="Italic"
				onclick={() => cmd('italic')}><em>I</em></button
			>
			<button
				type="button"
				class="btn btn-ghost btn-square btn-xs join-item cursor-pointer"
				aria-label="Underline"
				onclick={() => cmd('underline')}><span class="underline">U</span></button
			>
			<button
				type="button"
				class="btn btn-ghost btn-square btn-xs join-item cursor-pointer"
				aria-label="Strikethrough"
				onclick={() => cmd('strikeThrough')}><span class="line-through">S</span></button
			>
		</div>
		<div class="join">
			<button
				type="button"
				class="btn btn-ghost btn-xs join-item cursor-pointer"
				aria-label="Bullet list"
				onclick={() => cmd('insertUnorderedList')}>• List</button
			>
			<button
				type="button"
				class="btn btn-ghost btn-xs join-item cursor-pointer"
				aria-label="Numbered list"
				onclick={() => cmd('insertOrderedList')}>1. List</button
			>
			<button
				type="button"
				class="btn btn-ghost btn-xs join-item cursor-pointer"
				aria-label="Insert link"
				onclick={() => {
					const url = window.prompt('URL')
					if (url) document.execCommand('createLink', false, url)
				}}>Link</button
			>
			<button
				type="button"
				class="btn btn-ghost btn-xs join-item cursor-pointer"
				aria-label="Clear formatting"
				onclick={() => cmd('removeFormat')}>Clear</button
			>
		</div>
	</div>
	<div
		bind:this={editor}
		class="wash-rte-surface prose min-h-[22rem] max-w-none cursor-text p-4"
		contenteditable="true"
		role="textbox"
		aria-multiline="true"
		aria-label="Rich text"
		oninput={() => (value = editor?.innerHTML ?? value)}
	>
		{@html value}
	</div>
</div>
