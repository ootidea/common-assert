export function literalToString(value: unknown): string {
  if (typeof value === 'bigint') return `${value}n`
  if (typeof value === 'string') return JSON.stringify(value)
  return String(value)
}
