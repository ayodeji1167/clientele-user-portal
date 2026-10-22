import type { StatusTone } from "@/components/common";

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Compact countdown text that scales with distance:
 * under an hour → "M:SS", under a day → "H:MM:SS", otherwise "N days".
 */
export function formatCountdown(ms: number): string {
  const abs = Math.abs(ms);
  if (abs >= DAY) {
    const days = Math.floor(abs / DAY);
    return `${days} ${days === 1 ? "day" : "days"}`;
  }
  const totalSeconds = Math.floor(abs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return hours > 0
    ? `${hours}:${pad(minutes)}:${pad(seconds)}`
    : `${minutes}:${pad(seconds)}`;
}

/** Overdue → red, due within a day → amber, later → neutral. */
export function deadlineBadge(dueAt: string, now: number) {
  const remaining = new Date(dueAt).getTime() - now;
  if (remaining < 0) {
    return {
      label: `Overdue by ${formatCountdown(remaining)}`,
      tone: "error" as StatusTone,
    };
  }
  return {
    label: `Due in ${formatCountdown(remaining)}`,
    tone: (remaining < DAY ? "warning" : "neutral") as StatusTone,
  };
}

const STARTING_SOON = 10 * MINUTE;

/** Starting within 10 minutes → red, within a day → amber, later → neutral. */
export function meetingBadge(startsAt: string, now: number) {
  const remaining = new Date(startsAt).getTime() - now;
  if (remaining <= 0) {
    return { label: "In progress", tone: "success" as StatusTone };
  }
  const tone: StatusTone =
    remaining < STARTING_SOON
      ? "error"
      : remaining < DAY
        ? "warning"
        : "neutral";
  return { label: `Starts in ${formatCountdown(remaining)}`, tone };
}
