import { Heading, Stack, Text } from "@chakra-ui/react";
import type { ReactNode } from "react";

type AuthHeaderProps = {
  title: ReactNode;
  subtitle?: ReactNode;
};

export function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <Stack gap="0.375rem" textAlign="center">
      <Heading
        as="h1"
        textStyle="h5"
        fontWeight="600"
        color="text.primary"
        lineHeight="1.2"
      >
        {title}
      </Heading>
      {subtitle && (
        <Text textStyle="p2" color="text.muted" pb="0.25rem">
          {subtitle}
        </Text>
      )}
    </Stack>
  );
}
