import { mockDelay } from "@/shared/data/mock/delay";
import { mockNotifications } from "@/shared/data/mock/notifications";
import { localDay } from "@/utils/time";
import type {
  AppNotification,
  NotificationCounts,
  NotificationListParams,
} from "../interface";
import { CATEGORY_LABELS, TAB_FILTERS } from "../utils/filters";

// Backed by in-memory mock data until the notifications API exists. Each
// function maps to one endpoint (GET /notifications?tab=&filter=&search=&date=,
// GET /notifications/counts, PATCH /notifications/:id/read), so swapping in
// axios calls doesn't touch the hooks. The filtering below is the backend's job.

const searchable = (n: AppNotification) =>
  [n.client.name, ...n.summary, ...n.details].join(" ").toLowerCase();

export const getNotifications = async ({
  tab,
  filter,
  search,
  date,
}: NotificationListParams): Promise<AppNotification[]> => {
  const query = search.trim().toLowerCase();
  const option = TAB_FILTERS[tab].find((o) => o.value === filter);

  const list = mockNotifications
    .filter((n) => (tab === "unread" ? !n.isRead : n.category === tab))
    .filter((n) => !option || option.matches(n))
    .filter((n) => !query || searchable(n).includes(query))
    .filter((n) => !date || localDay(n.createdAt) === date)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return mockDelay(list.map((n) => ({ ...n })));
};

export const getNotificationCounts = async (): Promise<NotificationCounts> => {
  const counts = { unread: 0 } as NotificationCounts;
  for (const category of Object.keys(CATEGORY_LABELS)) {
    counts[category as keyof typeof CATEGORY_LABELS] = 0;
  }
  for (const n of mockNotifications) {
    counts[n.category] += 1;
    if (!n.isRead) counts.unread += 1;
  }
  return mockDelay(counts, 200);
};

export const markNotificationRead = async (id: string): Promise<void> => {
  const notification = mockNotifications.find((n) => n.id === id);
  if (notification) notification.isRead = true;
  return mockDelay(undefined, 150);
};
