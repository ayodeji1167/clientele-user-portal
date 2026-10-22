import { SimpleGrid, Stack } from "@chakra-ui/react";
import { RecentActivity } from "../components/activity/RecentActivity";
import { Greeting } from "../components/Greeting";
import { PendingRevisions } from "../components/revisions/PendingRevisions";
import { UpcomingDeadlines } from "../components/schedule/UpcomingDeadlines";
import { UpcomingMeetings } from "../components/schedule/UpcomingMeetings";
import { StatsGrid } from "../components/stats/StatsGrid";

export function OverviewTemplate() {
  return (
    <Stack gap="2.875rem" maxW="66.875rem">
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
