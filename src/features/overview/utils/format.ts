const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export function formatMoney(value: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
}

export function formatCount(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

/** "2m ago", "3h ago", "12d ago" */
export function timeAgo(iso: string, now: number) {
  const elapsed = Math.max(0, now - new Date(iso).getTime());
  if (elapsed < MINUTE) return "Just now";
  if (elapsed < HOUR) return `${Math.floor(elapsed / MINUTE)}m ago`;
  if (elapsed < DAY) return `${Math.floor(elapsed / HOUR)}h ago`;
  return `${Math.floor(elapsed / DAY)}d ago`;
}

/** Day of month and short month for the date block: { day: "25", month: "AUG" } */
export function dateParts(iso: string) {
  const date = new Date(iso);
  return {
    day: String(date.getDate()),
    month: date.toLocaleString("en-US", { month: "short" }).toUpperCase(),
  };
}

/** "10:00 AM" */
export function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

/** "90mins" — the meeting rows always show minutes. */
export function formatDuration(minutes: number) {
  return `${minutes}mins`;
}

/** "Good morning" / "Good afternoon" / "Good evening" for the local time. */
export function greeting(date = new Date()) {
  const hour = date.getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}
