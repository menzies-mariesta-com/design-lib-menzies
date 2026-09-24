/** Local calendar helpers for Wash month grids (Sun-first). */

export const WEEKDAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] as const;

export const MONTH_LABELS = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
] as const;

export type MonthCell =
	| { kind: 'empty'; key: string }
	| {
			kind: 'day';
			key: string;
			iso: string;
			day: number;
			inMonth: boolean;
	  };

export function toISODate(d: Date): string {
	const y = d.getFullYear();
	const m = String(d.getMonth() + 1).padStart(2, '0');
	const day = String(d.getDate()).padStart(2, '0');
	return `${y}-${m}-${day}`;
}

export function parseISODate(iso: string): Date | null {
	const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
	if (!m) return null;
	const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
	return Number.isNaN(d.getTime()) ? null : d;
}

export function startOfMonth(d: Date): Date {
	return new Date(d.getFullYear(), d.getMonth(), 1);
}

export function addMonths(d: Date, delta: number): Date {
	return new Date(d.getFullYear(), d.getMonth() + delta, 1);
}

export function buildMonthCells(view: Date, showOutsideDays = false): MonthCell[] {
	const year = view.getFullYear();
	const month = view.getMonth();
	const first = new Date(year, month, 1);
	const daysInMonth = new Date(year, month + 1, 0).getDate();
	const lead = first.getDay(); // 0=Sun
	const cells: MonthCell[] = [];

	if (showOutsideDays) {
		const prevDays = new Date(year, month, 0).getDate();
		for (let i = 0; i < lead; i++) {
			const day = prevDays - lead + i + 1;
			const date = new Date(year, month - 1, day);
			cells.push({
				kind: 'day',
				key: toISODate(date),
				iso: toISODate(date),
				day,
				inMonth: false
			});
		}
	} else {
		for (let i = 0; i < lead; i++) {
			cells.push({ kind: 'empty', key: `e-${i}` });
		}
	}

	for (let day = 1; day <= daysInMonth; day++) {
		const date = new Date(year, month, day);
		const iso = toISODate(date);
		cells.push({ kind: 'day', key: iso, iso, day, inMonth: true });
	}

	const remainder = cells.length % 7;
	const trail = remainder === 0 ? 0 : 7 - remainder;
	if (showOutsideDays) {
		for (let i = 1; i <= trail; i++) {
			const date = new Date(year, month + 1, i);
			cells.push({
				kind: 'day',
				key: toISODate(date),
				iso: toISODate(date),
				day: i,
				inMonth: false
			});
		}
	} else {
		for (let i = 0; i < trail; i++) {
			cells.push({ kind: 'empty', key: `t-${i}` });
		}
	}

	return cells;
}

export function pad2(n: number): string {
	return String(n).padStart(2, '0');
}

export function normalizeTime(time: string): string {
	const m = /^([01]\d|2[0-3]):([0-5]\d)(?::([0-5]\d))?$/.exec(time.trim());
	if (!m) return '09:00:00';
	return `${m[1]}:${m[2]}:${m[3] ?? '00'}`;
}

export function splitTime(time: string): { h: number; m: number; s: number } {
	const [h, m, s] = normalizeTime(time).split(':').map(Number);
	return { h: h ?? 0, m: m ?? 0, s: s ?? 0 };
}

export function clockPoint(index: number, steps: number, radius: number): { x: number; y: number } {
	const angle = ((index / steps) * 360 - 90) * (Math.PI / 180);
	return { x: 100 + Math.cos(angle) * radius, y: 100 + Math.sin(angle) * radius };
}

/** Degrees clockwise from 12 o'clock for a pointer at (clientX, clientY). */
export function angleFromPointer(
	clientX: number,
	clientY: number,
	rect: DOMRect
): number {
	const cx = rect.left + rect.width / 2;
	const cy = rect.top + rect.height / 2;
	const dx = clientX - cx;
	const dy = clientY - cy;
	let deg = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
	if (deg < 0) deg += 360;
	return deg;
}

/** Snap an angle to a stepped clock value (0 … steps-1). */
export function valueFromAngle(deg: number, steps: number): number {
	const step = 360 / steps;
	return Math.round(deg / step) % steps;
}
