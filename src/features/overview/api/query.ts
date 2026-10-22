import { useMutation, useQuery } from "@/lib/react-query";
import { queryKey } from "@/shared/constants/query-keys";
import type { StatKey, StatPeriod } from "../interface";
import {
  extendDeadline,
  getOverviewStat,
  getPendingRevisions,
  getPortalMilestones,
  getRecentActivity,
  getUpcomingDeadlines,
  getUpcomingMeetings,
  rescheduleMeeting,
} from "./service";

const { overview } = queryKey;

export const useGetOverviewStatQuery = (key: StatKey, period: StatPeriod) =>
  useQuery({
    queryKey: [overview.stat, key, period],
    queryFn: () => getOverviewStat(key, period),
    placeholderData: (previous) => previous,
  });

export const useGetPendingRevisionsQuery = () =>
  useQuery({
    queryKey: [overview.pendingRevisions],
    queryFn: getPendingRevisions,
  });

export const useGetUpcomingDeadlinesQuery = () =>
  useQuery({
    queryKey: [overview.deadlines],
    queryFn: getUpcomingDeadlines,
  });

export const useGetPortalMilestonesQuery = (portalId: string | undefined) =>
  useQuery({
    queryKey: [overview.deadlines, "milestones", portalId],
    queryFn: () => getPortalMilestones(portalId!),
    enabled: Boolean(portalId),
  });

export const useGetUpcomingMeetingsQuery = () =>
  useQuery({
    queryKey: [overview.meetings],
    queryFn: getUpcomingMeetings,
  });

export const useGetRecentActivityQuery = () =>
  useQuery({
    queryKey: [overview.activity],
    queryFn: getRecentActivity,
  });

export const useExtendDeadlineMutation = () =>
  useMutation({
    mutationFn: extendDeadline,
    meta: {
      successMessage: "Deadline extended",
      invalidatesQueryKeys: [[overview.deadlines]],
    },
  });

export const useRescheduleMeetingMutation = () =>
  useMutation({
    mutationFn: rescheduleMeeting,
    meta: {
      successMessage: "Meeting rescheduled",
      invalidatesQueryKeys: [[overview.meetings]],
    },
  });
