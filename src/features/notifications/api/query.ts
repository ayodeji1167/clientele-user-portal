import { useMutation, useQuery } from "@/lib/react-query";
import { queryKey } from "@/shared/constants/query-keys";
import type { NotificationListParams } from "../interface";
import {
  getNotificationCounts,
  getNotifications,
  markNotificationRead,
} from "./service";

const { notifications, workspace } = queryKey;

export const useGetNotificationsQuery = (params: NotificationListParams) =>
  useQuery({
    queryKey: [notifications.list, params],
    queryFn: () => getNotifications(params),
    // Keep the current rows on screen while a new filter loads.
    placeholderData: (previous) => previous,
    staleTime: 30_000,
  });

export const useGetNotificationCountsQuery = () =>
  useQuery({
    queryKey: [notifications.counts],
    queryFn: getNotificationCounts,
    staleTime: 30_000,
  });

export const useMarkNotificationReadMutation = () =>
  useMutation({
    mutationFn: markNotificationRead,
    meta: {
      invalidatesQueryKeys: [
        [notifications.list],
        [notifications.counts],
        // The profile menu's unread dot comes from the workspace summary.
        [workspace.summary],
      ],
    },
  });
