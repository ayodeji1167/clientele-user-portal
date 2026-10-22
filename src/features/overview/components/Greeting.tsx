import { Heading, Skeleton, Stack, Text } from "@chakra-ui/react";
import { useGetWorkspaceSummaryQuery } from "@/features/workspace/api";
import { greeting } from "../utils/format";

export function Greeting() {
  const { data: workspace, isPending } = useGetWorkspaceSummaryQuery();
  const firstName = workspace?.member.fullName.trim().split(/\s+/)[0];

  return (
    <Stack gap="0.625rem" pt="0.25rem">
      <Skeleton loading={isPending} w="fit-content" borderRadius="0.5rem">
        <Heading
          as="h1"
          fontFamily="display"
          fontSize={{ base: "2.25rem", md: "3.125rem" }}
          fontWeight="600"
          fontStyle="italic"
          lineHeight="0.82"
          letterSpacing="-0.03em"
          color="text.primary"
          css={{ textBox: "trim-both cap alphabetic" }}
        >
          {greeting()}
          {firstName ? `, ${firstName}` : ""}
        </Heading>
      </Skeleton>
      <Text fontSize="1rem" color="text.muted">
        Here’s what’s happening in your workspace today.
      </Text>
    </Stack>
  );
}
