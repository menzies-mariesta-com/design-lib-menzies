<script lang="ts">
	import {
		MONTH_LABELS,
		WEEKDAY_LABELS,
		addMonths,
		angleFromPointer,
		buildMonthCells,
		clockPoint,
		normalizeTime,
		pad2,
		parseISODate,
		splitTime,
		startOfMonth,
		toISODate,
		valueFromAngle,
		type MonthCell
	} from '$lib/tool/calendar-month';

	type TimeView = 'hour' | 'minute' | 'second';

	type Props = {
		/** `YYYY-MM-DD` or `YYYY-MM-DDTHH:mm:ss` */
		value?: string;
		includeTime?: boolean;
		ariaLabel?: string;
	};

	let {
		value = $bindable(''),
		includeTime = true,
		ariaLabel = 'Month calendar'
	}: Props = $props();

	const todayISO = toISODate(new Date());

	let viewMonth = $state(startOfMonth(parseISODate(value.split('T')[0] ?? '') ?? new Date()));
	let timeOpen = $state(false);
	let timeView = $state<TimeView>('hour');
	let monthOpen = $state(false);
	let yearOpen = $state(false);
	let dialDragging = $state(false);
	let dialEl: HTMLDivElement | undefined = $state();

	const selectedDate = $derived.by(() => {
		const raw = value.trim();
		if (!raw) return todayISO;
		const datePart = raw.includes('T') ? raw.split('T')[0] : raw;
		return datePart || todayISO;
	});

	const selectedTime = $derived.by(() => {
		const raw = value.trim();
		if (!raw || !raw.includes('T')) return '09:00:00';
		return normalizeTime(raw.split('T')[1] ?? '09:00:00');
	});

	const cells: MonthCell[] = $derived(buildMonthCells(viewMonth, false));
	const monthLabel = $derived(MONTH_LABELS[viewMonth.getMonth()] ?? 'Month');
	const yearLabel = $derived(String(viewMonth.getFullYear()));
	const yearOptions = $derived(
		Array.from({ length: 21 }, (_, i) => viewMonth.getFullYear() - 10 + i)
	);

	const parts = $derived(splitTime(selectedTime));
	const hourHand = $derived(
		clockPoint((parts.h % 12) + parts.m / 60 + parts.s / 3600, 12, 48)
	);
	const minuteHand = $derived(clockPoint(parts.m + parts.s / 60, 60, 68));
	const secondHand = $derived(clockPoint(parts.s, 60, 78));
	const activeValue = $derived(
		timeView === 'hour' ? parts.h % 12 || 12 : timeView === 'minute' ? parts.m : parts.s
	);
	const pointer = $derived.by(() => {
		if (timeView === 'hour') {
			return clockPoint(parts.h % 12, 12, 78);
		}
		const v = timeView === 'minute' ? parts.m : parts.s;
		return clockPoint(v, 60, 78);
	});
	const dialLabels = $derived(
		timeView === 'hour'
			? [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((n, i) => ({
					value: n,
					label: String(n),
					pos: clockPoint(i, 12, 78),
					selected: (parts.h % 12 || 12) === n
				}))
			: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map((n) => ({
					value: n,
					label: pad2(n),
					pos: clockPoint(n, 60, 78),
					selected: activeValue === n
				}))
	);

	function emit(date: string, time: string) {
		value = includeTime ? `${date}T${normalizeTime(time)}` : date;
	}

	function selectDay(iso: string) {
		emit(iso, selectedTime);
	}

	function goToday() {
		const now = new Date();
		viewMonth = startOfMonth(now);
		emit(
			toISODate(now),
			`${pad2(now.getHours())}:${pad2(now.getMinutes())}:${pad2(now.getSeconds())}`
		);
	}

	function setMonth(month: number) {
		viewMonth = new Date(viewMonth.getFullYear(), month, 1);
		monthOpen = false;
	}

	function setYear(year: number) {
		viewMonth = new Date(year, viewMonth.getMonth(), 1);
		yearOpen = false;
	}

	function setTimePart(next: { h?: number; m?: number; s?: number }) {
		const h = next.h ?? parts.h;
		const m = next.m ?? parts.m;
		const s = next.s ?? parts.s;
		emit(selectedDate || todayISO, `${pad2(h)}:${pad2(m)}:${pad2(s)}`);
	}

	function applyDial(clientX: number, clientY: number) {
		if (!dialEl) return;
		const rect = dialEl.getBoundingClientRect();
		const deg = angleFromPointer(clientX, clientY, rect);
		if (timeView === 'hour') {
			const hour12 = valueFromAngle(deg, 12);
			const base = parts.h >= 12 ? 12 : 0;
			const h = hour12 === 0 ? base : base + hour12;
			setTimePart({ h: h === 24 ? 12 : h });
			return;
		}
		if (timeView === 'minute') {
			setTimePart({ m: valueFromAngle(deg, 60) });
			return;
		}
		setTimePart({ s: valueFromAngle(deg, 60) });
	}

	function onDialPointerDown(e: PointerEvent & { currentTarget: HTMLDivElement }) {
		e.preventDefault();
		dialDragging = true;
		try {
			e.currentTarget.setPointerCapture(e.pointerId);
		} catch {
			// Window listeners still track the drag.
		}
		applyDial(e.clientX, e.clientY);
	}

	function onDialPointerMove(e: PointerEvent) {
		if (!dialDragging) return;
		e.preventDefault();
		applyDial(e.clientX, e.clientY);
	}

	function onDialPointerUp() {
		if (!dialDragging) return;
		dialDragging = false;
		if (timeView === 'hour') timeView = 'minute';
		else if (timeView === 'minute') timeView = 'second';
	}

	function onWindowPointerMove(e: PointerEvent) {
		if (!dialDragging) return;
		e.preventDefault();
		applyDial(e.clientX, e.clientY);
	}

	function onWindowPointerUp() {
		onDialPointerUp();
	}

	$effect(() => {
		window.addEventListener('pointermove', onWindowPointerMove, { passive: false });
		window.addEventListener('pointerup', onWindowPointerUp);
		window.addEventListener('pointercancel', onWindowPointerUp);
		return () => {
			window.removeEventListener('pointermove', onWindowPointerMove);
			window.removeEventListener('pointerup', onWindowPointerUp);
			window.removeEventListener('pointercancel', onWindowPointerUp);
		};
	});

	function onDialKeydown(e: KeyboardEvent) {
		const step = 1;
		if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
			e.preventDefault();
			if (timeView === 'hour') {
				setTimePart({ h: (parts.h + step) % 24 });
			} else if (timeView === 'minute') {
				setTimePart({ m: (parts.m + step) % 60 });
			} else {
				setTimePart({ s: (parts.s + step) % 60 });
			}
		} else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
			e.preventDefault();
			if (timeView === 'hour') {
				setTimePart({ h: (parts.h - step + 24) % 24 });
			} else if (timeView === 'minute') {
				setTimePart({ m: (parts.m - step + 60) % 60 });
			} else {
				setTimePart({ s: (parts.s - step + 60) % 60 });
			}
		} else if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			if (timeView === 'hour') timeView = 'minute';
			else if (timeView === 'minute') timeView = 'second';
		}
	}
</script>

<div
	class="wash-calendar rounded-box border border-base-300 bg-base-100 p-3 shadow-[var(--shadow-paper-sm)]"
	class:wash-calendar--with-time={includeTime}
	role="application"
	aria-label={ariaLabel}
>
	<div class="wash-calendar__header">
		<div class="tooltip tooltip-primary tooltip-bottom" data-tip="Previous month">
			<button
				type="button"
				class="btn btn-ghost btn-square btn-sm btn-primary cursor-pointer"
				aria-label="Previous month"
				onclick={() => (viewMonth = addMonths(viewMonth, -1))}
			>
				<svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"
					><path d="m15 18-6-6 6-6" /></svg
				>
			</button>
		</div>

		<details class="dropdown wash-calendar__nav-dropdown" bind:open={monthOpen}>
			<summary
				class="btn btn-ghost btn-sm wash-calendar__nav-trigger cursor-pointer"
				aria-label="Month: {monthLabel}"
			>
				<span class="min-w-0 truncate">{monthLabel}</span>
				<svg
					class="wash-calendar__nav-chevron size-3.5 shrink-0"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					aria-hidden="true"
				>
					<path d="m6 9 6 6 6-6" />
				</svg>
			</summary>
			<ul
				class="menu menu-sm dropdown-content wash-calendar__nav-menu z-50 mt-1 rounded-box border border-ink-border bg-base-100 p-2 shadow-[var(--shadow-paper-md)]"
				role="listbox"
				aria-label="Month"
				tabindex="-1"
			>
				{#each MONTH_LABELS as label, i}
					<li>
						<button
							type="button"
							role="option"
							class="cursor-pointer"
							class:menu-wash-active={i === viewMonth.getMonth()}
							class:font-semibold={i === viewMonth.getMonth()}
							aria-selected={i === viewMonth.getMonth()}
							onclick={() => setMonth(i)}>{label}</button
						>
					</li>
				{/each}
			</ul>
		</details>

		<details class="dropdown wash-calendar__nav-dropdown wash-calendar__nav-dropdown--year" bind:open={yearOpen}>
			<summary
				class="btn btn-ghost btn-sm wash-calendar__nav-trigger cursor-pointer"
				aria-label="Year: {yearLabel}"
			>
				<span class="min-w-0 truncate">{yearLabel}</span>
				<svg
					class="wash-calendar__nav-chevron size-3.5 shrink-0"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					aria-hidden="true"
				>
					<path d="m6 9 6 6 6-6" />
				</svg>
			</summary>
			<ul
				class="menu menu-sm dropdown-content wash-calendar__nav-menu z-50 mt-1 rounded-box border border-ink-border bg-base-100 p-2 shadow-[var(--shadow-paper-md)]"
				role="listbox"
				aria-label="Year"
				tabindex="-1"
			>
				{#each yearOptions as year}
					<li>
						<button
							type="button"
							role="option"
							class="cursor-pointer"
							class:menu-wash-active={year === viewMonth.getFullYear()}
							class:font-semibold={year === viewMonth.getFullYear()}
							aria-selected={year === viewMonth.getFullYear()}
							onclick={() => setYear(year)}>{year}</button
						>
					</li>
				{/each}
			</ul>
		</details>

		<div class="tooltip tooltip-primary tooltip-bottom" data-tip="Next month">
			<button
				type="button"
				class="btn btn-ghost btn-square btn-sm btn-primary cursor-pointer"
				aria-label="Next month"
				onclick={() => (viewMonth = addMonths(viewMonth, 1))}
			>
				<svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"
					><path d="m9 18 6-6-6-6" /></svg
				>
			</button>
		</div>

		<button
			type="button"
			class="wash-calendar__today btn btn-ghost btn-sm cursor-pointer"
			onclick={goToday}>Today</button
		>
	</div>

	<div class="wash-calendar__grid" role="grid" aria-label="{monthLabel} {yearLabel}">
		{#each WEEKDAY_LABELS as label}
			<div class="wash-calendar__weekday" role="columnheader" aria-label={label}>{label}</div>
		{/each}
		{#each cells as cell (cell.key)}
			{#if cell.kind === 'empty'}
				<div class="wash-calendar__day-empty" aria-hidden="true"></div>
			{:else}
				<button
					type="button"
					role="gridcell"
					class="wash-calendar__day cursor-pointer"
					class:wash-calendar__day--outside={!cell.inMonth}
					class:wash-calendar__day--today={cell.iso === todayISO && cell.iso !== selectedDate}
					class:wash-calendar__day--selected={cell.iso === selectedDate}
					aria-selected={cell.iso === selectedDate}
					aria-current={cell.iso === todayISO ? 'date' : undefined}
					onclick={() => selectDay(cell.iso)}
				>
					<span>{cell.day}</span>
				</button>
			{/if}
		{/each}
	</div>

	{#if includeTime}
		<div class="wash-calendar__time">
			<span class="wash-calendar__time-label">Time</span>
			<details class="dropdown dropdown-no-hover wash-time w-full" bind:open={timeOpen}>
				<summary
					class="wash-time__trigger input input-bordered flex w-full cursor-pointer items-center justify-between gap-2"
				>
					<span class="min-w-0 truncate font-mono text-sm tabular-nums">{selectedTime}</span>
					<svg class="size-4 shrink-0 opacity-55" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"
						><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg
					>
				</summary>
				<div
					class="dropdown-content wash-time__panel z-50 mt-1 rounded-box border border-ink-border bg-base-100 shadow-[var(--shadow-paper-md)]"
					role="dialog"
					aria-label="Choose time"
				>
					<div class="wash-time__readout" role="group" aria-label="Time parts">
						<button
							type="button"
							class="wash-time__part cursor-pointer font-mono"
							class:wash-time__part--active={timeView === 'hour'}
							aria-pressed={timeView === 'hour'}
							onclick={() => (timeView = 'hour')}>{pad2(parts.h)}</button
						>
						<span class="wash-time__sep" aria-hidden="true">:</span>
						<button
							type="button"
							class="wash-time__part cursor-pointer font-mono"
							class:wash-time__part--active={timeView === 'minute'}
							aria-pressed={timeView === 'minute'}
							onclick={() => (timeView = 'minute')}>{pad2(parts.m)}</button
						>
						<span class="wash-time__sep" aria-hidden="true">:</span>
						<button
							type="button"
							class="wash-time__part cursor-pointer font-mono"
							class:wash-time__part--active={timeView === 'second'}
							aria-pressed={timeView === 'second'}
							onclick={() => (timeView = 'second')}>{pad2(parts.s)}</button
						>
					</div>

					<div
						bind:this={dialEl}
						class="wash-time__dial"
						class:wash-time__dial--dragging={dialDragging}
						role="slider"
						aria-valuemin={0}
						aria-valuemax={timeView === 'hour' ? 12 : 59}
						aria-valuenow={activeValue}
						aria-label={timeView === 'hour' ? 'Hour' : timeView === 'minute' ? 'Minute' : 'Second'}
						tabindex="0"
						onpointerdown={onDialPointerDown}
						onpointermove={onDialPointerMove}
						onpointerup={onDialPointerUp}
						onpointercancel={onDialPointerUp}
						onkeydown={onDialKeydown}
					>
						<svg class="wash-time__svg" viewBox="0 0 200 200" aria-hidden="true">
							<circle class="wash-time__face" cx="100" cy="100" r="96"></circle>
							<line
								class="wash-time__hand wash-time__hand--hour"
								class:wash-time__hand--active={timeView === 'hour'}
								x1="100"
								y1="100"
								x2={hourHand.x}
								y2={hourHand.y}
							></line>
							<line
								class="wash-time__hand wash-time__hand--minute"
								class:wash-time__hand--active={timeView === 'minute'}
								x1="100"
								y1="100"
								x2={minuteHand.x}
								y2={minuteHand.y}
							></line>
							<line
								class="wash-time__hand wash-time__hand--second"
								class:wash-time__hand--active={timeView === 'second'}
								x1="100"
								y1="100"
								x2={secondHand.x}
								y2={secondHand.y}
							></line>
							<line class="wash-time__pointer" x1="100" y1="100" x2={pointer.x} y2={pointer.y}></line>
							<circle class="wash-time__pointer-knob" cx={pointer.x} cy={pointer.y} r="11"></circle>
							<circle class="wash-time__hub" cx="100" cy="100" r="4"></circle>
						</svg>
						{#each dialLabels as item}
							<span
								class="wash-time__label font-mono"
								class:wash-time__label--selected={item.selected}
								style:left="{(item.pos.x / 200) * 100}%"
								style:top="{(item.pos.y / 200) * 100}%"
							>
								{item.label}
							</span>
						{/each}
					</div>
					<p class="wash-time__hint">
						{timeView === 'hour'
							? 'Select hour, then minutes'
							: timeView === 'minute'
								? 'Select minute (0-59), then seconds'
								: 'Select second (0-59)'}
					</p>
				</div>
			</details>
		</div>
	{/if}
</div>
