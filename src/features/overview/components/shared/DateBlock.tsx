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
          textStyle={"h5"}
          fontWeight={"600"}
          color="text.primary"
          lineHeight={"100%"}
        >
          {day}
        </Text>
        <Text textStyle={"p4"} fontWeight={500} color={"text.tertiary"}>
          {month}
        </Text>
      </time>
    </Stack>
  );
}
