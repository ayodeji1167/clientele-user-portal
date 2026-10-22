import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { StatusBadge } from "@/components/common";
import { useNow } from "@/hooks/useNow";
import { useGetRecentActivityQuery } from "../../api";
import type { Activity } from "../../interface";
import { timeAgo } from "../../utils/format";
import { QuotedTitle } from "../shared/QuotedTitle";
import { SectionHeading } from "../shared/SectionHeading";
import { SectionEmpty, SectionSkeleton } from "../shared/SectionState";

function Name({ children }: { children: string }) {
  return (
    <Text as="span" fontWeight="600" letterSpacing="-0.03em">
      {children}
    </Text>
  );
}

/** The sentence for each activity type. */
function message(activity: Activity): ReactNode {
  switch (activity.type) {
    case "deliverable_commented":
      return (
        <>
          <Name>{activity.actor}</Name> commented on{" "}
          <QuotedTitle>{activity.deliverable}</QuotedTitle> deliverable
        </>
      );
    case "portal_created":
      return (
        <>
          New portal created – <Name>{activity.client}</Name>
        </>
      );
    case "deliverable_submitted":
      return (
        <>
          <QuotedTitle>{activity.deliverable}</QuotedTitle> deliverable has been
          submitted to <Name>{activity.client}</Name> for review
        </>
      );
    case "inquiry_submitted":
      return (
        <>
          <Name>{activity.actor}</Name> submitted an inquiry form
        </>
      );
    case "invoice_due":
      return (
        <>
          {activity.invoiceNumber} for{" "}
          <QuotedTitle>{activity.milestones}</QuotedTitle> of{" "}
          <Name>{activity.client}</Name>
          {activity.dueToday && (
            <StatusBadge tone="warning" ms="0.375rem" verticalAlign="middle">
              Due today
            </StatusBadge>
          )}
        </>
      );
    case "payment_reminder_sent":
      return (
        <>
          Payment reminder sent to <Name>{activity.client}</Name>
        </>
      );
    case "invoice_sent":
      return (
        <>
          Payment invoice for <QuotedTitle>{activity.milestones}</QuotedTitle>{" "}
          sent to <Name>{activity.client}</Name>
        </>
      );
  }
}

export function RecentActivity() {
  const now = useNow(60_000);
  const { data: activity, isPending } = useGetRecentActivityQuery();

  return (
    <Stack as="section" gap="0.75rem">
      <SectionHeading>Recent activity</SectionHeading>
      {isPending ? (
        <SectionSkeleton rows={5} rowH="2.9375rem" />
      ) : activity?.length ? (
        <Stack as="ul" gap="0.3125rem" listStyleType="none">
          {activity.map((item) => (
            <Flex
              as="li"
              key={item.id}
              align="center"
              gap="1rem"
              minH="2.9375rem"
              px="0.75rem"
              py="0.5rem"
              bg="bg.secondary"
              borderWidth="0.0625rem"
              borderColor="border.secondary"
              borderRadius="0.75rem"
            >
              <Box flex="1" minW="0" fontSize="1rem" color="text.primary">
                {message(item)}
              </Box>
              <Text
                asChild
                flexShrink={0}
                fontSize="0.8125rem"
                color="text.subtle"
              >
                <time dateTime={item.occurredAt}>
                  {timeAgo(item.occurredAt, now)}
                </time>
              </Text>
            </Flex>
          ))}
        </Stack>
      ) : (
        <SectionEmpty>
          Activity from your portals will show up here.
        </SectionEmpty>
      )}
    </Stack>
  );
}
