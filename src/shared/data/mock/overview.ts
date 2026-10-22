import type {
  Activity,
  Deadline,
  Meeting,
  Milestone,
  PendingRevision,
  StatKey,
  StatPeriod,
} from "@/features/overview/interface";

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

// Times are relative to page load so the countdown badges render the same
// states as the mockups ("Overdue by 4:45:44", "Due in 3:02", …).
const at = (offsetMs: number) => new Date(Date.now() + offsetMs).toISOString();

export const mockStats: Record<StatKey, Record<StatPeriod, number>> = {
  unreadInquiries: { today: 8, this_week: 14, this_month: 31, last_month: 27 },
  activePortals: { today: 5, this_week: 5, this_month: 5, last_month: 4 },
  outstandingPayments: {
    today: 4650,
    this_week: 7200,
    this_month: 12850,
    last_month: 9400,
  },
  totalEarnings: {
    today: 1200,
    this_week: 40500,
    this_month: 86300,
    last_month: 74900,
  },
};

export const mockCurrency = "USD";

const revision = (
  id: string,
  name: string,
  hasUnreadComments: boolean,
): PendingRevision => ({
  id,
  portalId: `pt_${id}`,
  client: { id: `cl_${id}`, name },
  portalStatus: "active",
  project: "Discovery & Strategy",
  milestone: "Milestone 1",
  revisionCount: 2,
  fileCount: 5,
  linkCount: 2,
  commentCount: 3,
  hasUnreadComments,
});

export const mockPendingRevisions: PendingRevision[] = [
  revision("kemi", "Kemi Owolabi", true),
  revision("aisha", "Aisha Kamara", false),
  revision("janine", "Janine Johnson", false),
];

/** Milestones per portal, for the Extend deadline milestone picker. */
export const mockMilestones: Record<string, Milestone[]> = {
  pt_ashley: [
    { id: "ms_ashley_4", name: "Milestone 4", dueAt: at(-6 * DAY) },
    {
      id: "ms_ashley_5",
      name: "Milestone 5",
      dueAt: at(-(4 * HOUR + 45 * MINUTE + 44 * SECOND)),
    },
    { id: "ms_ashley_6", name: "Milestone 6", dueAt: at(9 * DAY) },
  ],
  pt_aisha: [
    {
      id: "ms_aisha_3",
      name: "Milestone 3",
      dueAt: at(3 * MINUTE + 2 * SECOND),
    },
    { id: "ms_aisha_4", name: "Milestone 4", dueAt: at(12 * DAY) },
  ],
  pt_rotimi: [
    { id: "ms_rotimi_2", name: "Milestone 2", dueAt: at(3 * DAY + HOUR) },
    { id: "ms_rotimi_3", name: "Milestone 3", dueAt: at(16 * DAY) },
  ],
};

export const mockDeadlines: Deadline[] = [
  {
    id: "dl_ashley",
    portalId: "pt_ashley",
    milestone: mockMilestones.pt_ashley[1],
    clientName: "Ashley Leighton",
    project: "Discovery & Strategy",
  },
  {
    id: "dl_aisha",
    portalId: "pt_aisha",
    milestone: mockMilestones.pt_aisha[0],
    clientName: "Aisha Kamara",
    project: "Discovery & Strategy",
  },
  {
    id: "dl_rotimi",
    portalId: "pt_rotimi",
    milestone: mockMilestones.pt_rotimi[0],
    clientName: "Rotimi Akanni",
    project: "Discovery & Strategy",
  },
];

export const mockMeetings: Meeting[] = [
  {
    id: "mt_vera",
    title: "Brand direction kickoff",
    clientName: "Vera Sun",
    startsAt: at(4 * MINUTE + SECOND),
    durationMinutes: 90,
    link: "https://meet.google.com/yek-qtrf-ffj",
  },
  {
    id: "mt_aisha",
    title: "Milestone 3 review",
    clientName: "Aisha Kamara",
    startsAt: at(20 * MINUTE + 22 * SECOND),
    durationMinutes: 30,
    link: "https://meet.google.com/abc-defg-hij",
  },
  {
    id: "mt_pauline",
    title: "Inquiry call",
    clientName: "Pauline Grey",
    startsAt: at(3 * DAY + HOUR),
    durationMinutes: 60,
    link: "https://meet.google.com/pqr-stuv-wxy",
  },
];

export const mockActivity: Activity[] = [
  {
    id: "ac1",
    occurredAt: at(-2 * MINUTE),
    type: "deliverable_commented",
    actor: "Pauline Grey",
    deliverable: "Milestone 2",
  },
  {
    id: "ac2",
    occurredAt: at(-3 * HOUR),
    type: "portal_created",
    client: "Ashley Leighton",
  },
  {
    id: "ac3",
    occurredAt: at(-3 * HOUR - 10 * MINUTE),
    type: "deliverable_submitted",
    deliverable: "Design System",
    client: "Rotimi Akanni",
  },
  {
    id: "ac4",
    occurredAt: at(-5 * HOUR),
    type: "inquiry_submitted",
    actor: "Kemi Owolabi",
  },
  {
    id: "ac5",
    occurredAt: at(-23 * HOUR),
    type: "invoice_due",
    invoiceNumber: "INV-2026-024",
    milestones: "Milestones 5 & 6",
    client: "Vera Sun",
    dueToday: true,
  },
  {
    id: "ac6",
    occurredAt: at(-4 * DAY),
    type: "payment_reminder_sent",
    client: "Kemi Owolabi",
  },
  {
    id: "ac7",
    occurredAt: at(-12 * DAY),
    type: "deliverable_commented",
    actor: "Aisha Kamara",
    deliverable: "Brand Identity",
  },
  {
    id: "ac8",
    occurredAt: at(-16 * DAY),
    type: "inquiry_submitted",
    actor: "Harris Huntley",
  },
  {
    id: "ac9",
    occurredAt: at(-22 * DAY),
    type: "inquiry_submitted",
    actor: "Kemi Owolabi",
  },
  {
    id: "ac10",
    occurredAt: at(-32 * DAY),
    type: "invoice_sent",
    milestones: "Milestones 5 & 6",
    client: "Pauline Grey",
  },
];
