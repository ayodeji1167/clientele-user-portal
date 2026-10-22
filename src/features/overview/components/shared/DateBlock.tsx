import { Stack, Text } from "@chakra-ui/react";
import { dateParts } from "../../utils/format";

/** The grey "25 / AUG" tile at the start of deadline and meeting rows. */
export function DateBlock({ iso }: { iso: string }) {
  const { day, month } = dateParts(iso);

  return (
    <Stack
      asChild
      gap="0"
      align="center"
      justify="center"
      flexShrink={0}
      w="3.125rem"
      h="2.875rem"
      bg="bg.primary"
      borderRadius="0.375rem"
    >
      <time dateTime={iso}>
        <Text
          fontSize="1.5rem"
          fontWeight="600"
          lineHeight="1"
          letterSpacing="-0.03em"
          color="text.primary"
        >
          {day}
        </Text>
        <Text fontSize="0.75rem" lineHeight="1.1" color="text.muted">
          {month}
        </Text>
      </time>
    </Stack>
  );
}
