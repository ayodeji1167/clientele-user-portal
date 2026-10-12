import { Stack, Text } from "@chakra-ui/react";
import type { ReactNode } from "react";

/** The centered footer lines under an auth form's primary button. */
export function AuthPrompt({ children }: { children: ReactNode }) {
  return (
    <Stack gap="11px" align="center" fontSize="15px" lineHeight="1.1">
      {children}
    </Stack>
  );
}

/** "Don't have an account? Create an account" */
export function AuthPromptLine({
  question,
  children,
}: {
  question: string;
  children: ReactNode;
}) {
  return (
    <Text color="text.muted" textAlign="center">
      {question}&nbsp; {children}
    </Text>
  );
}
