import { mockDelay } from "@/shared/data/mock/delay";
import {
  mockActivity,
  mockCurrency,
  mockDeadlines,
  mockMeetings,
  mockMilestones,
  mockPendingRevisions,
  mockStats,
} from "@/shared/data/mock/overview";
import type {
  Activity,
  Deadline,
  ExtendDeadlinePayload,
  Meeting,
  Milestone,
  OverviewStat,
  PendingRevision,
  RescheduleMeetingPayload,
  StatKey,
  StatPeriod,
} from "../interface";

// Backed by in-memory mock data until the overview API exists. Each function
// maps to one endpoint, so swapping in axios calls doesn't touch the hooks.

const MONEY_STATS: StatKey[] = ["outstandingPayments", "totalEarnings"];

export const getOverviewStat = async (
  key: StatKey,
  period: StatPeriod,
): Promise<OverviewStat> =>
  mockDelay({
    key,
    period,
    value: mockStats[key][period],
    currency: MONEY_STATS.includes(key) ? mockCurrency : undefined,
  });

export const getPendingRevisions = async (): Promise<PendingRevision[]> =>
  mockDelay(mockPendingRevisions);

export const getUpcomingDeadlines = async (): Promise<Deadline[]> =>
  mockDelay(
    [...mockDeadlines].sort((a, b) =>
      a.milestone.dueAt.localeCompare(b.milestone.dueAt),
    ),
  );

export const getPortalMilestones = async (
  portalId: string,
): Promise<Milestone[]> => mockDelay(mockMilestones[portalId] ?? [], 150);

export const getUpcomingMeetings = async (): Promise<Meeting[]> =>
  mockDelay(
    [...mockMeetings].sort((a, b) => a.startsAt.localeCompare(b.startsAt)),
  );

export const getRecentActivity = async (): Promise<Activity[]> =>
  mockDelay(mockActivity);

export const extendDeadline = async ({
  deadlineId,
  milestoneId,
  newDeadline,
}: ExtendDeadlinePayload): Promise<Deadline> => {
  const deadline = mockDeadlines.find((d) => d.id === deadlineId);
  const milestone = deadline
    ? mockMilestones[deadline.portalId]?.find((m) => m.id === milestoneId)
    : undefined;
  if (!deadline || !milestone) throw new Error("Milestone not found");

  milestone.dueAt = newDeadline;
  deadline.milestone = milestone;
  return mockDelay(deadline);
};

export const rescheduleMeeting = async ({
  meetingId,
  title,
  startsAt,
  durationMinutes,
  link,
}: RescheduleMeetingPayload): Promise<Meeting> => {
  const meeting = mockMeetings.find((m) => m.id === meetingId);
  if (!meeting) throw new Error("Meeting not found");

  Object.assign(meeting, { title, startsAt, durationMinutes, link });
  return mockDelay(meeting);
};
