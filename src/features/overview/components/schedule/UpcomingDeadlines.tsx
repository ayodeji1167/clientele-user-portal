import { Button, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNow } from "@/hooks/useNow";
import { RouteConstants } from "@/shared/constants/routes";
import { useGetUpcomingDeadlinesQuery } from "../../api";
import type { Deadline } from "../../interface";
import { deadlineBadge } from "../../utils/countdown";
import { SectionHeading } from "../shared/SectionHeading";
import { SectionEmpty, SectionSkeleton } from "../shared/SectionState";
import { ExtendDeadlineModal } from "./ExtendDeadlineModal";
import { ScheduleRow } from "./ScheduleRow";

const actionStyles = { h: "2rem", w: "5rem", fontSize: "0.9375rem" } as const;

export function UpcomingDeadlines() {
  const now = useNow();
  const { data: deadlines, isPending } = useGetUpcomingDeadlinesQuery();
  const [extending, setExtending] = useState<Deadline | null>(null);

  return (
    <Stack as="section" gap="0.75rem" minW="0">
      <SectionHeading>Upcoming deadlines</SectionHeading>
      {isPending ? (
        <SectionSkeleton rowH="4.375rem" />
      ) : deadlines?.length ? (
        <Stack gap="0.375rem">
          {deadlines.map((deadline) => (
            <ScheduleRow
              key={deadline.id}
              date={deadline.milestone.dueAt}
              title={deadline.milestone.name}
              badge={deadlineBadge(deadline.milestone.dueAt, now)}
              meta={[deadline.clientName, deadline.project]}
              actions={
                <>
                  <Button
                    variant="tertiary"
                    {...actionStyles}
                    onClick={() => setExtending(deadline)}
                  >
                    Extend
                  </Button>
                  <Button asChild {...actionStyles}>
                    <Link
                      to={RouteConstants.portals.deliverable.generate({
                        id: deadline.portalId,
                        deliverableId: deadline.milestone.id,
                      })}
                    >
                      View
                    </Link>
                  </Button>
                </>
              }
            />
          ))}
        </Stack>
      ) : (
        <SectionEmpty>No deadlines coming up.</SectionEmpty>
      )}

      {extending && (
        <ExtendDeadlineModal
          deadline={extending}
          onClose={() => setExtending(null)}
        />
      )}
    </Stack>
  );
}
