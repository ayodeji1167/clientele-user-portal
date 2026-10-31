import { RouteConstants } from "@/shared/constants/routes";
import type { AppNotification } from "../interface";

const { inquiries, portals, earnings, calendar } = RouteConstants;

/** Where clicking a notification takes you. */
export function notificationHref({ type, refs }: AppNotification): string {
  const portal = refs.portalId
    ? portals.detail.generate({ id: refs.portalId })
    : portals.base.path;

  switch (type) {
    case "inquiry_received":
      return inquiries.base.path;
    case "deliverable_submitted":
    case "deliverable_approved":
    case "deliverable_changes_requested":
      return refs.portalId && refs.deliverableId
        ? portals.deliverable.generate({
            id: refs.portalId,
            deliverableId: refs.deliverableId,
          })
        : portal;
    case "payment_received":
    case "invoice_sent":
    case "invoice_overdue":
    case "reminder_payment":
      return earnings.base.path;
    case "reminder_meeting":
      return calendar.base.path;
    case "portal_created":
    case "portal_comment":
    case "portal_completed":
    case "reminder_deadline":
      return portal;
  }
}
