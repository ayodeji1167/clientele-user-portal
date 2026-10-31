import { SimpleGrid, Stack } from "@chakra-ui/react";
import { PAGE_PADDING_X } from "@/components/layouts/constants";
import { RecentActivity } from "../components/activity/RecentActivity";
import { Greeting } from "../components/Greeting";
import { PendingRevisions } from "../components/revisions/PendingRevisions";
import { UpcomingDeadlines } from "../components/schedule/UpcomingDeadlines";
import { UpcomingMeetings } from "../components/schedule/UpcomingMeetings";
import { StatsGrid } from "../components/stats/StatsGrid";

export function OverviewTemplate() {
  return (
    <Stack
      gap="2.875rem"
      px={PAGE_PADDING_X}
      pt={{ base: "1rem", md: "1.5rem" }}
      pb="4rem"
    >
      <Stack gap="2.8rem">
        <Greeting />
        <StatsGrid />
      </Stack>
      <PendingRevisions />
      <SimpleGrid
        columns={{ base: 1, xl: 2 }}
        columnGap="3.8125rem"
        rowGap="3rem"
      >
        <UpcomingDeadlines />
        <UpcomingMeetings />
      </SimpleGrid>
      <RecentActivity />
    </Stack>
  );
}
