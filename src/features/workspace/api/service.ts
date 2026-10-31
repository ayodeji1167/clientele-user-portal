import { mockDelay } from "@/shared/data/mock/delay";
import { mockNotifications } from "@/shared/data/mock/notifications";
import { mockWorkspaceSummary } from "@/shared/data/mock/workspace";
import type { WorkspaceSummary } from "../interface";

// Backed by mock data until the workspace API exists; swap the body for an
// axios call (GET /workspaces/current) without touching the hooks.
export const getWorkspaceSummary = async (): Promise<WorkspaceSummary> =>
  mockDelay({
    ...mockWorkspaceSummary,
    unread: {
      ...mockWorkspaceSummary.unread,
      notifications: mockNotifications.filter((n) => !n.isRead).length,
    },
  });
