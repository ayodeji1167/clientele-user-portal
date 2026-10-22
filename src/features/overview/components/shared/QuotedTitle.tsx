import { Text } from "@chakra-ui/react";

/** “Milestone 2” — deliverable names set in the italic display serif. */
export function QuotedTitle({ children }: { children: string }) {
  return (
    <Text as="span" whiteSpace="nowrap">
      “
      <Text
        as="span"
        fontFamily="display"
        fontStyle="italic"
        letterSpacing="-0.02em"
      >
        {children}
      </Text>
      ”
    </Text>
  );
}
