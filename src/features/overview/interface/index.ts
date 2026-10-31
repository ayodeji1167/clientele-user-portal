export type StatPeriod = "today" | "this_week" | "this_month" | "last_month";

export type StatKey =
  "unreadInquiries" | "activePortals" | "outstandingPayments" | "totalEarnings";

export type OverviewStat = {
  key: StatKey;
  period: StatPeriod;
  value: number;
  /** ISO 4217 code for money stats; absent for counts. */
  currency?: string;
};

export type ClientRef = {
  id: string;
  name: string;
  avatarUrl?: string;
};

export type PendingRevision = {
  id: string;
  portalId: string;
  client: ClientRef;
  portalStatus: "active" | "paused" | "completed";
  project: string;
  milestone: string;
  revisionCount: number;
  fileCount: number;
  linkCount: number;
  commentCount: number;
  hasUnreadComments: boolean;
};

export type Milestone = {
  id: string;
  name: string;
  dueAt: string;
};

export type Deadline = {
  id: string;
  portalId: string;
  milestone: Milestone;
  clientName: string;
  project: string;
};

export type Meeting = {
  id: string;
  title: string;
  clientName: string;
  startsAt: string;
  durationMinutes: number;
  link: string;
};

type ActivityBase = { id: string; occurredAt: string };

/** One row of the activity feed; each type renders its own sentence. */
export type Activity = ActivityBase &
  (
    | { type: "deliverable_commented"; actor: string; deliverable: string }
    | { type: "portal_created"; client: string }
    | { type: "deliverable_submitted"; deliverable: string; client: string }
    | { type: "inquiry_submitted"; actor: string }
    | {
        type: "invoice_due";
        invoiceNumber: string;
        milestones: string;
        client: string;
        dueToday: boolean;
      }
    | { type: "payment_reminder_sent"; client: string }
    | { type: "invoice_sent"; milestones: string; client: string }
  );

export type ExtendDeadlinePayload = {
  deadlineId: string;
  milestoneId: string;
  newDeadline: string;
  reason?: string;
  notifyClient: boolean;
};

export type RescheduleMeetingPayload = {
  meetingId: string;
  title: string;
  startsAt: string;
  durationMinutes: number;
  link: string;
  sendInvite: boolean;
};
