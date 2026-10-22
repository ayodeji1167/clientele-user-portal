import { Button, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { useNow } from "@/hooks/useNow";
import { useGetUpcomingMeetingsQuery } from "../../api";
import type { Meeting } from "../../interface";
import { meetingBadge } from "../../utils/countdown";
import { formatDuration, formatTime } from "../../utils/format";
import { SectionHeading } from "../shared/SectionHeading";
import { SectionEmpty, SectionSkeleton } from "../shared/SectionState";
import { RescheduleMeetingModal } from "./RescheduleMeetingModal";
import { ScheduleRow } from "./ScheduleRow";

const actionStyles = { h: "2rem", fontSize: "0.9375rem" } as const;

export function UpcomingMeetings() {
  const now = useNow();
  const { data: meetings, isPending } = useGetUpcomingMeetingsQuery();
  const [rescheduling, setRescheduling] = useState<Meeting | null>(null);

  return (
    <Stack as="section" gap="0.75rem" minW="0">
      <SectionHeading>Upcoming meetings</SectionHeading>
      {isPending ? (
        <SectionSkeleton rowH="4.375rem" />
      ) : meetings?.length ? (
        <Stack gap="0.3125rem">
          {meetings.map((meeting) => (
            <ScheduleRow
              key={meeting.id}
              date={meeting.startsAt}
              title={meeting.title}
              badge={meetingBadge(meeting.startsAt, now)}
              meta={[
                meeting.clientName,
                formatTime(meeting.startsAt),
                formatDuration(meeting.durationMinutes),
              ]}
              actions={
                <>
                  <Button
                    variant="tertiary"
                    {...actionStyles}
                    px="0.6875rem"
                    onClick={() => setRescheduling(meeting)}
                  >
                    Reschedule
                  </Button>
                  <Button asChild {...actionStyles} w="5rem">
                    <a href={meeting.link} target="_blank" rel="noreferrer">
                      Join
                    </a>
                  </Button>
                </>
              }
            />
          ))}
        </Stack>
      ) : (
        <SectionEmpty>No meetings scheduled.</SectionEmpty>
      )}

      {rescheduling && (
        <RescheduleMeetingModal
          meeting={rescheduling}
          onClose={() => setRescheduling(null)}
        />
      )}
    </Stack>
  );
}
