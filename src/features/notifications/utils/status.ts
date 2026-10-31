import type { StatusTone } from "@/components/common";
import type { NotificationStatus } from "../interface";

export const STATUS_BADGES: Record<
  NotificationStatus,
  { label: string; tone: StatusTone; color?: string }
> = {
  call_scheduled: { label: "Call scheduled", tone: "warning" },
  // Notification badges use the darker green from the mockups.
  converted: { label: "Converted", tone: "success", color: "success.700" },
  dismissed: { label: "Dismissed", tone: "neutral" },
  approved: { label: "Approved", tone: "success", color: "success.700" },
  changes_requested: { label: "Changes requested", tone: "warning" },
  paid: { label: "Paid", tone: "success", color: "success.700" },
  overdue: { label: "Overdue", tone: "error" },
};
