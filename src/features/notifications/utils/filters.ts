import type {
  AppNotification,
  NotificationCategory,
  NotificationStatus,
  NotificationTab,
  NotificationType,
} from "../interface";

export const CATEGORY_LABELS: Record<NotificationCategory, string> = {
  inquiries: "Inquiries",
  portals: "Portals",
  deliverables: "Deliverables",
  transactions: "Transactions",
  reminders: "Reminders",
};

export const TABS: NotificationTab[] = [
  "unread",
  "inquiries",
  "portals",
  "deliverables",
  "transactions",
  "reminders",
];

export const DEFAULT_FILTER = "all";

type FilterOption = {
  value: string;
  label: string;
  matches: (notification: AppNotification) => boolean;
};

const all = (label: string): FilterOption => ({
  value: DEFAULT_FILTER,
  label,
  matches: () => true,
});

const byType = (value: NotificationType, label: string): FilterOption => ({
  value,
  label,
  matches: (n) => n.type === value,
});

const byStatus = (value: NotificationStatus, label: string): FilterOption => ({
  value,
  label,
  matches: (n) => n.status === value,
});

/** The dropdown next to the date: narrows the active tab further. */
export const TAB_FILTERS: Record<NotificationTab, FilterOption[]> = {
  unread: [
    all("All types"),
    ...(Object.keys(CATEGORY_LABELS) as NotificationCategory[]).map(
      (category) => ({
        value: category,
        label: CATEGORY_LABELS[category],
        matches: (n: AppNotification) => n.category === category,
      }),
    ),
  ],
  inquiries: [
    all("All inquiries"),
    { value: "new", label: "New", matches: (n) => !n.status },
    byStatus("call_scheduled", "Call scheduled"),
    byStatus("converted", "Converted"),
    byStatus("dismissed", "Dismissed"),
  ],
  portals: [
    all("All updates"),
    byType("portal_created", "New portals"),
    byType("portal_comment", "Comments"),
    byType("portal_completed", "Completed"),
  ],
  deliverables: [
    all("All deliverables"),
    byType("deliverable_submitted", "Submitted"),
    byType("deliverable_approved", "Approved"),
    byType("deliverable_changes_requested", "Changes requested"),
  ],
  transactions: [
    all("All transactions"),
    byType("payment_received", "Payments"),
    byType("invoice_sent", "Invoices sent"),
    byType("invoice_overdue", "Overdue"),
  ],
  reminders: [
    all("All reminders"),
    byType("reminder_deadline", "Deadlines"),
    byType("reminder_meeting", "Meetings"),
    byType("reminder_payment", "Payments due"),
  ],
};

export function isTab(value: string | null): value is NotificationTab {
  return TABS.includes(value as NotificationTab);
}
