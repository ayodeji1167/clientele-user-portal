import { Heading, Skeleton, Stack, Text } from "@chakra-ui/react";
import { useGetWorkspaceSummaryQuery } from "@/features/workspace/api";
import { greeting } from "../utils/format";

export function Greeting() {
  const { data: workspace, isPending } = useGetWorkspaceSummaryQuery();
  const firstName = workspace?.member.fullName.trim().split(/\s+/)[0];

  return (
    <Stack gap="0.875rem" pt="0.25rem">
      <Skeleton loading={isPending} w="fit-content" borderRadius="0.5rem">
        <Heading
          as="h1"
          textStyle="h2Serif"
          fontWeight="600"
          fontStyle="italic"
          color="text.primary"
          css={{ textBox: "trim-both cap alphabetic" }}
        >
          {greeting()}
          {firstName ? `, ${firstName}` : ""}
        </Heading>
      </Skeleton>
      <Text textStyle="p2" color="text.tertiary" fontWeight={500}>
        Here's what's happening in your workspace today.
      </Text>
    </Stack>
  );
}
