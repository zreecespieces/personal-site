/** Calendar dates must not shift with the server or reader's time zone. */
export function formatCalendarDate(
  value: string,
  options: Intl.DateTimeFormatOptions = { month: "long", day: "numeric", year: "numeric" }
): string {
  // Avoid implementation-dependent parsing of non-ISO date strings.
  if (!/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:?\d{2})?)?$/.test(value)) {
    return value;
  }
  const dateOnly = /^\d{4}-\d{2}-\d{2}$/.test(value);
  const normalized = dateOnly
    ? `${value}T00:00:00Z`
    : /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d+)?)?$/.test(value)
      ? `${value}Z`
      : value;
  const date = new Date(normalized);
  if (!Number.isFinite(date.getTime())) return value;
  if (dateOnly && date.toISOString().slice(0, 10) !== value) return value;
  return new Intl.DateTimeFormat("en-US", { ...options, timeZone: "UTC" }).format(date);
}
