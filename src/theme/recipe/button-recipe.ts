import { defineRecipe } from "@chakra-ui/react";

// Button spec from the Clientele design system (design/figma/TOKENS.md §6):
// 5 variants × 5 sizes × states. All sizes share gap 5px, T/B padding 14px,
// radius 8px; only L/R padding scales.
export const buttonRecipe = defineRecipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "5px",
    borderRadius: "8px",
    fontFamily: "body",
    fontWeight: "500",
    letterSpacing: "-0.03em",
    cursor: "pointer",
    transitionProperty: "background, border-color, color, box-shadow",
    transitionDuration: "fast",
    _disabled: {
      cursor: "not-allowed",
    },
  },
  variants: {
    variant: {
      primary: {
        bg: "sandal.600",
        color: "white",
        _hover: { bg: "sandal.800" },
        _active: { bg: "sandal.900" },
        _focusVisible: { boxShadow: "ring.focusPrimary", outline: "none" },
        _disabled: {
          bg: "sandal.200",
          _hover: { bg: "sandal.200" },
        },
      },
      secondary: {
        bg: "bg.tertiary",
        color: "text.primary",
        _hover: { bg: "neutral.200" },
        _active: { bg: "neutral.300" },
        _focusVisible: { boxShadow: "ring.focusNeutral", outline: "none" },
        _disabled: {
          bg: "neutral.100",
          color: "neutral.400",
          _hover: { bg: "neutral.100" },
        },
      },
      tertiary: {
        bg: "transparent",
        color: "text.secondary",
        borderWidth: "1px",
        borderColor: "border.primary",
        _hover: { bg: "bg.primary" },
        _active: { bg: "bg.tertiary" },
        _focusVisible: { boxShadow: "ring.focusNeutral", outline: "none" },
        _disabled: {
          color: "neutral.400",
          borderColor: "border.secondary",
          _hover: { bg: "transparent" },
        },
      },
      danger: {
        bg: "error.100",
        color: "error.600",
        _hover: { bg: "error.200" },
        _active: { bg: "error.300" },
        _focusVisible: { boxShadow: "ring.error", outline: "none" },
        _disabled: {
          bg: "error.50",
          color: "error.300",
          _hover: { bg: "error.50" },
        },
      },
      social: {
        bg: "bg.secondary",
        color: "text.primary",
        borderWidth: "1px",
        borderColor: "border.primary",
        _hover: { bg: "bg.primary" },
        _active: { bg: "bg.tertiary" },
        _focusVisible: { boxShadow: "ring.focusNeutral", outline: "none" },
        _disabled: {
          color: "neutral.400",
          _hover: { bg: "bg.secondary" },
        },
      },
    },
    size: {
      xs: { px: "8px", py: "14px", fontSize: "12px" },
      sm: { px: "10px", py: "14px", fontSize: "14px" },
      md: { px: "16px", py: "14px", fontSize: "15px" },
      lg: { px: "20px", py: "14px", fontSize: "16px" },
      xl: { px: "24px", py: "14px", fontSize: "18px" },
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});
