/** Toggle a value in a multi-select; order follows `optionOrder`. */
export function toggleSelectValues(
  current: readonly string[],
  optionValue: string,
  optionOrder: readonly string[],
): string[] {
  const selected = new Set(current)
  if (selected.has(optionValue)) selected.delete(optionValue)
  else selected.add(optionValue)
  return optionOrder.filter((v) => selected.has(v))
}

export function formatMultiSelectTrigger(
  values: readonly string[],
  resolveLabel: (value: string) => string,
  placeholder: string,
  maxVisible = 2,
): string {
  if (values.length === 0) return placeholder
  const labels = values.map(resolveLabel)
  if (labels.length <= maxVisible) return labels.join(', ')
  const head = labels.slice(0, maxVisible).join(', ')
  return `${head} +${labels.length - maxVisible}`
}
