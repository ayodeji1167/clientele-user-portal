import { defineRecipe } from "@chakra-ui/react";

// Button spec from the Clientele design system (design/figma/TOKENS.md §6):
// 5 variants × 5 sizes × states. All sizes share gap 5px and radius 8px.
// Heights are explicit because the screen mockups (40px at md) don't match
// the spec sheet's 14px vertical padding; the mockups win.
export const buttonRecipe = defineRecipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "5px",
    borderRadius: "8px",
    fontFamily: "body",
    fontWeight: "600",
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
        bg: "sandal.700",
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
        color: "text.secondary",
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
      xs: { h: "32px", px: "8px", py: "0", fontSize: "13px" },
      sm: { h: "36px", px: "10px", py: "0", fontSize: "14px" },
      md: { h: "40px", px: "16px", py: "0", fontSize: "15px" },
      lg: { h: "44px", px: "20px", py: "0", fontSize: "16px" },
      xl: { h: "48px", px: "24px", py: "0", fontSize: "18px" },
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});
