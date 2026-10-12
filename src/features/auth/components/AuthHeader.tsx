import { Heading, Stack, Text } from "@chakra-ui/react";
import type { ReactNode } from "react";

type AuthHeaderProps = {
  title: ReactNode;
  subtitle?: ReactNode;
};

export function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <Stack gap="6px" textAlign="center">
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
        <Text fontSize="16px" lineHeight="18px" color="text.muted" pb="4px">
          {subtitle}
        </Text>
      )}
    </Stack>
  );
}
