import { Box, type BoxProps } from "@chakra-ui/react";

export type StatusTone = "success" | "warning" | "error" | "neutral";

const tones: Record<StatusTone, { bg: string; color: string }> = {
  success: { bg: "success.100", color: "success.600" },
  warning: { bg: "warning.100", color: "warning.700" },
  error: { bg: "error.50", color: "error.600" },
  neutral: { bg: "bg.tertiary", color: "text.tertiary" },
};

type StatusBadgeProps = BoxProps & { tone: StatusTone };

/** Small rounded label: "Active", "Overdue by 4:45:44", "Due today"… */
export function StatusBadge({ tone, children, ...rest }: StatusBadgeProps) {
  return (
    <Box
      as="span"
      display="inline-flex"
      alignItems="center"
      flexShrink={0}
      h="1.25rem"
      px="0.4375rem"
      borderRadius="full"
      fontSize="0.8125rem"
      fontWeight="500"
      lineHeight="1"
      whiteSpace="nowrap"
      fontVariantNumeric="tabular-nums"
      {...tones[tone]}
      {...rest}
    >
      {children}
    </Box>
  );
}
