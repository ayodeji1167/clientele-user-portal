const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

/** "2m ago", "3h ago", "12d ago" */
export function timeAgo(iso: string, now: number) {
  const elapsed = Math.max(0, now - new Date(iso).getTime());
  if (elapsed < MINUTE) return "Just now";
  if (elapsed < HOUR) return `${Math.floor(elapsed / MINUTE)}m ago`;
  if (elapsed < DAY) return `${Math.floor(elapsed / HOUR)}h ago`;
  return `${Math.floor(elapsed / DAY)}d ago`;
}

/** The local calendar day of an ISO timestamp, as "YYYY-MM-DD". */
export function localDay(iso: string) {
  return new Date(iso).toLocaleDateString("en-CA");
}
