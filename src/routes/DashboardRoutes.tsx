import { Outlet, type RouteObject } from "react-router-dom";
import { ComingSoon } from "@/components/common";
import { RouteError } from "@/components/error";
import { AppLayout } from "@/components/layouts";
import { RouteConstants } from "@/shared/constants/routes";

const {
  inquiries,
  portals,
  calendar,
  earnings,
  templates,
  settings,
  workspaces,
} = RouteConstants;

// Sections reachable from the shell whose screens aren't designed yet.
const placeholders: [path: string, title: string][] = [
  [inquiries.base.path, "Inquiries"],
  [inquiries.form.path, "Inquiry form"],
  [portals.base.path, "Portals"],
  [portals.create.path, "New portal"],
  [portals.detail.path, "Portal"],
  [portals.revisions.path, "Revision requests"],
  [portals.deliverable.path, "Deliverable"],
  [calendar.base.path, "Calendar"],
  [earnings.base.path, "Earnings"],
  [templates.base.path, "Templates"],
  [settings.base.path, "Settings"],
  [settings.notifications.path, "Notifications"],
  [settings.subscription.path, "Subscription"],
  [workspaces.create.path, "New workspace"],
];

export const DashboardRouteList: RouteObject[] = [
  {
    index: true,
    lazy: () =>
      import("@/features/overview/pages/OverviewPage").then((m) => ({
        Component: m.OverviewPage,
      })),
  },
  ...placeholders.map(([path, title]) => ({
    path,
    element: <ComingSoon title={title} />,
  })),
];

export const DashboardRoutes: RouteObject = {
  element: (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ),
  errorElement: <RouteError />,
  children: DashboardRouteList,
};
