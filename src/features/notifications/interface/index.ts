export type NotificationCategory =
  "inquiries" | "portals" | "deliverables" | "transactions" | "reminders";

/** The chips above the list: unread across categories, then each category. */
export type NotificationTab = "unread" | NotificationCategory;

export type NotificationType =
  | "inquiry_received"
  | "portal_created"
  | "portal_comment"
  | "portal_completed"
  | "deliverable_submitted"
  | "deliverable_approved"
  | "deliverable_changes_requested"
  | "payment_received"
  | "invoice_sent"
  | "invoice_overdue"
  | "reminder_deadline"
  | "reminder_meeting"
  | "reminder_payment";

/** Current state of the thing the notification is about, shown as a badge. */
export type NotificationStatus =
  | "call_scheduled"
  | "converted"
  | "dismissed"
  | "approved"
  | "changes_requested"
  | "paid"
  | "overdue";

export type AppNotification = {
  id: string;
  category: NotificationCategory;
  type: NotificationType;
  status?: NotificationStatus;
  client: { id: string; name: string; avatarUrl?: string };
  /** First line under the name, e.g. the services an inquiry asks for. */
  summary: string[];
  /** Second line, e.g. location and budget. */
  details: string[];
  /** Records the notification points at, used to build its link. */
  refs: { inquiryId?: string; portalId?: string; deliverableId?: string };
  isRead: boolean;
  createdAt: string;
};

export type NotificationCounts = Record<NotificationTab, number>;

export type NotificationListParams = {
  tab: NotificationTab;
  /** A value from the tab's filter options; "all" for no filter. */
  filter: string;
  search: string;
  /** "YYYY-MM-DD", or "" for any day. */
  date: string;
};
