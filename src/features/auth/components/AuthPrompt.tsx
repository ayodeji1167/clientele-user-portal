import { Stack, Text } from "@chakra-ui/react";
import type { ReactNode } from "react";

/** The centered footer lines under an auth form's primary button. */
export function AuthPrompt({ children }: { children: ReactNode }) {
  return (
    <Stack gap="0.6875rem" align="center" textStyle="p3">
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
    <Text textStyle={"p2"} color="text.muted" textAlign="center">
      {question}&nbsp; {children}
    </Text>
  );
}
