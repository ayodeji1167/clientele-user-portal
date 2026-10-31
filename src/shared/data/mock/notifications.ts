import annaDarryl from "@/assets/mock/anna-darryl.webp";
import lucyStreet from "@/assets/mock/lucy-street.webp";
import type {
  AppNotification,
  NotificationCategory,
  NotificationType,
} from "@/features/notifications/interface";

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const ago = (offsetMs: number) => new Date(Date.now() - offsetMs).toISOString();

const clients = {
  kemi: { id: "cl_kemi", name: "Kemi Owolabi" },
  anna: { id: "cl_anna", name: "Anna Darryl", avatarUrl: annaDarryl },
  lucy: { id: "cl_lucy", name: "Lucy Street", avatarUrl: lucyStreet },
  diane: { id: "cl_diane", name: "Diane Johnson" },
  tunde: { id: "cl_tunde", name: "Tunde Bakare" },
  aisha: { id: "cl_aisha", name: "Aisha Kamara" },
  marco: { id: "cl_marco", name: "Marco Rossi" },
};

const CATEGORY: Record<NotificationType, NotificationCategory> = {
  inquiry_received: "inquiries",
  portal_created: "portals",
  portal_comment: "portals",
  portal_completed: "portals",
  deliverable_submitted: "deliverables",
  deliverable_approved: "deliverables",
  deliverable_changes_requested: "deliverables",
  payment_received: "transactions",
  invoice_sent: "transactions",
  invoice_overdue: "transactions",
  reminder_deadline: "reminders",
  reminder_meeting: "reminders",
  reminder_payment: "reminders",
};

let nextId = 1;
const notification = (
  type: NotificationType,
  fields: Omit<AppNotification, "id" | "type" | "category" | "isRead"> & {
    isRead?: boolean;
  },
): AppNotification => ({
  id: `ntf_${nextId++}`,
  type,
  category: CATEGORY[type],
  isRead: true,
  ...fields,
});

const inquiry = (
  client: AppNotification["client"],
  createdAt: string,
  extra: Partial<AppNotification> = {},
) =>
  notification("inquiry_received", {
    client,
    summary: ["Brand design", "Product design", "Web design"],
    details: ["Lagos, Nigeria", "$2,000 – $5,000"],
    refs: { inquiryId: `inq_${client.id}` },
    createdAt,
    ...extra,
  });

// Mutable store: marking a notification read updates it in place.
export const mockNotifications: AppNotification[] = [
  inquiry(clients.kemi, ago(12 * MINUTE), { isRead: false }),
  notification("deliverable_changes_requested", {
    client: clients.anna,
    status: "changes_requested",
    summary: ["Requested changes on “Homepage v2”"],
    details: ["Website redesign", "Milestone 2"],
    refs: { portalId: "pt_anna", deliverableId: "dl_homepage_v2" },
    createdAt: ago(32 * MINUTE),
    isRead: false,
  }),
  notification("payment_received", {
    client: clients.lucy,
    status: "paid",
    summary: ["Paid INV-0042", "$1,500"],
    details: ["Brand identity", "Milestone 1"],
    refs: { portalId: "pt_lucy" },
    createdAt: ago(1 * HOUR),
    isRead: false,
  }),
  notification("reminder_meeting", {
    client: clients.diane,
    summary: ["Discovery call today at 4:00 PM"],
    details: ["Google Meet", "45mins"],
    refs: { portalId: "pt_diane" },
    createdAt: ago(3 * HOUR),
  }),
  notification("portal_comment", {
    client: clients.kemi,
    summary: ["2 new comments on “Logo concepts”"],
    details: ["Brand identity", "Milestone 2"],
    refs: { portalId: "pt_kemi" },
    createdAt: ago(5 * HOUR),
  }),
  inquiry(clients.tunde, ago(1 * DAY), {
    status: "dismissed",
    summary: ["Product design", "UX audit"],
    details: ["Abuja, Nigeria", "$800 – $1,500"],
  }),
  notification("reminder_deadline", {
    client: clients.anna,
    summary: ["“Homepage v2” is due tomorrow"],
    details: ["Website redesign", "Milestone 2"],
    refs: { portalId: "pt_anna" },
    createdAt: ago(1 * DAY + 2 * HOUR),
  }),
  notification("deliverable_submitted", {
    client: clients.diane,
    summary: ["“Moodboard” is waiting for their review"],
    details: ["Brand refresh", "Milestone 1"],
    refs: { portalId: "pt_diane", deliverableId: "dl_moodboard" },
    createdAt: ago(1 * DAY + 6 * HOUR),
  }),
  inquiry(clients.aisha, ago(2 * DAY), {
    status: "call_scheduled",
    summary: ["Brand design", "Packaging design"],
    details: ["Accra, Ghana", "$3,000 – $6,000"],
  }),
  notification("invoice_sent", {
    client: clients.kemi,
    summary: ["INV-0043 sent", "$2,000"],
    details: ["Brand identity", "Milestone 2"],
    refs: { portalId: "pt_kemi" },
    createdAt: ago(2 * DAY + 4 * HOUR),
  }),
  notification("reminder_payment", {
    client: clients.marco,
    summary: ["INV-0044 is due in 3 days", "$1,200"],
    details: ["Social media kit", "Milestone 1"],
    refs: { portalId: "pt_marco" },
    createdAt: ago(3 * DAY),
  }),
  notification("deliverable_approved", {
    client: clients.lucy,
    status: "approved",
    summary: ["Approved “Logo concepts”"],
    details: ["Brand identity", "Milestone 1"],
    refs: { portalId: "pt_lucy", deliverableId: "dl_logo_concepts" },
    createdAt: ago(4 * DAY),
  }),
  notification("portal_created", {
    client: clients.marco,
    summary: ["Portal created for “Social media kit”"],
    details: ["3 milestones", "$4,500"],
    refs: { portalId: "pt_marco" },
    createdAt: ago(6 * DAY),
  }),
  notification("invoice_overdue", {
    client: clients.tunde,
    status: "overdue",
    summary: ["INV-0039 is overdue", "$800"],
    details: ["UX audit", "Milestone 1"],
    refs: { portalId: "pt_tunde" },
    createdAt: ago(9 * DAY),
  }),
  inquiry(clients.marco, ago(16 * DAY), {
    status: "converted",
    summary: ["Social media design", "Brand design"],
    details: ["Milan, Italy", "$4,000 – $8,000"],
  }),
  notification("portal_completed", {
    client: clients.aisha,
    summary: ["All milestones on “Pitch deck” are complete"],
    details: ["4 milestones", "$3,200"],
    refs: { portalId: "pt_aisha" },
    createdAt: ago(18 * DAY),
  }),
  inquiry(clients.diane, ago(20 * DAY), { status: "dismissed" }),
  inquiry(clients.lucy, ago(24 * DAY), {
    status: "call_scheduled",
    summary: ["Brand design", "Illustration"],
    details: ["London, United Kingdom", "$5,000 – $10,000"],
  }),
];
