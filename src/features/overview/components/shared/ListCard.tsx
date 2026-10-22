import { Flex, type FlexProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

type ListCardProps = FlexProps & {
  children: ReactNode;
  /** Revealed on hover/focus; always shown on touch screens. */
  actions?: ReactNode;
};

/** A row card in the overview lists (revisions, deadlines, meetings…). */
export function ListCard({ children, actions, ...rest }: ListCardProps) {
  return (
    <Flex
      className="group"
      align="center"
      gap="0.75rem"
      bg="bg.secondary"
      borderWidth="0.0625rem"
      borderColor="border.secondary"
      borderRadius="1rem"
      px="0.75rem"
      transition="border-color 0.15s"
      _hover={{ borderColor: "border.primary" }}
      _focusWithin={{ borderColor: "border.primary" }}
      {...rest}
    >
      <Flex align="center" gap="0.75rem" flex="1" minW="0">
        {children}
      </Flex>
      {actions && (
        <Flex
          gap="0.5rem"
          flexShrink={0}
          opacity="0"
          visibility="hidden"
          transition="opacity 0.15s"
          _groupHover={{ opacity: 1, visibility: "visible" }}
          _groupFocusWithin={{ opacity: 1, visibility: "visible" }}
          css={{
            "@media (hover: none)": { opacity: 1, visibility: "visible" },
          }}
        >
          {actions}
        </Flex>
      )}
    </Flex>
  );
}
