/** Representative Apex options for gallery demos (studio wash metrics). */

const week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const

/** Wash pigment CSS vars (daisyUI 5 / Wash tokens), not legacy `oklch(var(--p))`. */
const washColors = ['var(--color-primary)', 'var(--color-secondary)', 'var(--color-accent)']

export const lineChartOptions = {
	chart: {
		type: 'line' as const,
		toolbar: { show: false },
		zoom: { enabled: false }
	},
	stroke: { curve: 'smooth' as const, width: 3 },
	colors: washColors.slice(0, 2),
	dataLabels: { enabled: false },
	xaxis: {
		categories: [...week]
	},
	yaxis: {
		labels: { formatter: (v: number) => `${Math.round(v)}` }
	},
	legend: { position: 'top' as const },
	grid: {
		borderColor: 'color-mix(in oklab, var(--color-base-content) 12%, transparent)'
	},
	series: [
		{ name: 'Wash plates', data: [12, 18, 15, 22, 19, 24, 21] },
		{ name: 'Pigment mix', data: [8, 11, 14, 13, 17, 16, 20] }
	]
}

export const barChartOptions = {
	chart: {
		type: 'bar' as const,
		toolbar: { show: false }
	},
	plotOptions: {
		bar: { borderRadius: 4, columnWidth: '55%' }
	},
	colors: washColors.slice(0, 1),
	dataLabels: { enabled: false },
	xaxis: { categories: [...week] },
	yaxis: {
		labels: { formatter: (v: number) => `${Math.round(v)}` }
	},
	legend: { show: false },
	grid: {
		borderColor: 'color-mix(in oklab, var(--color-base-content) 12%, transparent)'
	},
	series: [{ name: 'Wash plates', data: [12, 18, 15, 22, 19, 24, 21] }]
}

export const areaChartOptions = {
	chart: {
		type: 'area' as const,
		toolbar: { show: false },
		zoom: { enabled: false }
	},
	stroke: { curve: 'smooth' as const, width: 2 },
	fill: {
		type: 'gradient' as const,
		gradient: { shadeIntensity: 0.35, opacityFrom: 0.45, opacityTo: 0.05 }
	},
	colors: washColors.slice(0, 1),
	dataLabels: { enabled: false },
	xaxis: { categories: [...week] },
	yaxis: {
		labels: { formatter: (v: number) => `${Math.round(v)}` }
	},
	legend: { show: false },
	grid: {
		borderColor: 'color-mix(in oklab, var(--color-base-content) 12%, transparent)'
	},
	series: [{ name: 'Wash plates', data: [12, 18, 15, 22, 19, 24, 21] }]
}

export const pieChartOptions = {
	chart: {
		type: 'pie' as const,
		toolbar: { show: false }
	},
	colors: washColors,
	labels: ['Vermilion', 'Indigo', 'Ochre'],
	legend: { position: 'bottom' as const },
	dataLabels: { enabled: true },
	series: [44, 33, 23]
}
