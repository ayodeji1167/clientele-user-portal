import { Heading } from "@chakra-ui/react";

export function SectionHeading({ children }: { children: string }) {
  return (
    <Heading
      textStyle={"p1"}
      as="h2"
      fontWeight="600"
      letterSpacing="-0.03em"
      lineHeight="1.2"
      color="text.primary"
    >
      {children}
    </Heading>
  );
}
