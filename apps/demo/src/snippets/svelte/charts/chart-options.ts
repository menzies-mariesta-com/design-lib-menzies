/** Representative line series for gallery demos (studio wash metrics). */
export const lineChartOptions = {
  chart: {
    type: 'line' as const,
    toolbar: { show: false },
    zoom: { enabled: false },
  },
  stroke: { curve: 'smooth' as const, width: 3 },
  colors: ['oklch(var(--p))', 'oklch(var(--s))'],
  dataLabels: { enabled: false },
  xaxis: {
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yaxis: {
    labels: { formatter: (v: number) => `${Math.round(v)}` },
  },
  legend: { position: 'top' as const },
  grid: { borderColor: 'color-mix(in oklab, oklch(var(--bc)) 12%, transparent)' },
  series: [
    { name: 'Wash plates', data: [12, 18, 15, 22, 19, 24, 21] },
    { name: 'Pigment mix', data: [8, 11, 14, 13, 17, 16, 20] },
  ],
}
