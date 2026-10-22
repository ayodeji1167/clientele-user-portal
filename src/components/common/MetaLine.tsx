import { Box, Flex, type FlexProps } from "@chakra-ui/react";
import { Children, Fragment, type ReactNode } from "react";

/** Inline items separated by small grey dots: "5 files • 2 links • 3". */
export function MetaLine({
  children,
  ...rest
}: FlexProps & { children: ReactNode }) {
  const items = Children.toArray(children).filter(Boolean);

  return (
    <Flex align="center" gap="0.3125rem" minW="0" wrap="wrap" {...rest}>
      {items.map((item, index) => (
        <Fragment key={index}>
          {index > 0 && (
            <Box
              as="span"
              aria-hidden
              boxSize="0.1875rem"
              borderRadius="full"
              bg="neutral.300"
              flexShrink={0}
            />
          )}
          {item}
        </Fragment>
      ))}
    </Flex>
  );
}
