<script lang="ts">
	/**
	 * Auth card template. `$lib/components/AuthCard.svelte`
	 */
	type Props = {
		title?: string
	}

	let { title = 'Sign in' }: Props = $props()
	let email = $state('')
	let password = $state('')
	let submitting = $state(false)

	async function onSubmit(e: Event) {
		e.preventDefault()
		submitting = true
		await new Promise((r) => setTimeout(r, 600))
		submitting = false
	}
</script>

<div class="card mx-auto w-full max-w-md bg-base-100 shadow-[var(--shadow-paper-md)]">
	<form class="card-body gap-3" onsubmit={onSubmit}>
		<h2 class="card-title text-primary font-bold">{title}</h2>
		<label class="form-control w-full">
			<span class="label"><span class="label-text">Email<span class="text-error align-top text-sm" aria-hidden="true">*</span></span></span>
			<input class="input input-bordered w-full cursor-text" type="email" required bind:value={email} />
		</label>
		<label class="form-control w-full">
			<span class="label"><span class="label-text">Password<span class="text-error align-top text-sm" aria-hidden="true">*</span></span></span>
			<input class="input input-bordered w-full cursor-text" type="password" required bind:value={password} />
		</label>
		<button
			type="submit"
			class="btn btn-primary cursor-pointer"
			class:loading={submitting}
			class:btn-disabled={submitting}
			disabled={submitting}
			aria-busy={submitting}
		>
			Continue
		</button>
	</form>
</div>
