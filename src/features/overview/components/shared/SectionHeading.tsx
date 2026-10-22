import { Heading } from "@chakra-ui/react";

export function SectionHeading({ children }: { children: string }) {
  return (
    <Heading
      as="h2"
      fontSize="1.25rem"
      fontWeight="600"
      letterSpacing="-0.03em"
      lineHeight="1.2"
      color="text.primary"
    >
      {children}
    </Heading>
  );
}
