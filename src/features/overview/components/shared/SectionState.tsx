import { Skeleton, Stack, Text } from "@chakra-ui/react";

/** Placeholder rows while a section loads. */
export function SectionSkeleton({
  rows = 3,
  rowH,
}: {
  rows?: number;
  rowH: string;
}) {
  return (
    <Stack gap="0.3125rem">
      {Array.from({ length: rows }, (_, i) => (
        <Skeleton key={i} h={rowH} borderRadius="1rem" />
      ))}
    </Stack>
  );
}

/** Quiet message for a section with nothing to show. */
export function SectionEmpty({ children }: { children: string }) {
  return (
    <Text
      py="1.5rem"
      px="1rem"
      textAlign="center"
      textStyle="p3"
      color="text.muted"
      bg="bg.secondary"
      borderWidth="0.0625rem"
      borderColor="border.secondary"
      borderRadius="1rem"
    >
      {children}
    </Text>
  );
}
