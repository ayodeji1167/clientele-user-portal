import type { SystemStyleObject } from "@chakra-ui/react";

// The field surface from "Text Input_med" on the Inputs page
// (design/figma/1336-13498-inputs.yaml), shared by every text-like control.
export const fieldSurface: SystemStyleObject = {
  bg: "bg.primary",
  borderWidth: "0.0625rem",
  borderColor: "border.primary",
  borderRadius: "0.5rem",
  color: "text.primary",
  fontSize: "1rem",
  letterSpacing: "-0.015em",
  focusVisibleRing: "none",
  _placeholder: { color: "text.placeholder" },
  _focusVisible: {
    outline: "none",
    borderColor: "border.primary",
    boxShadow: "ring.focusNeutral",
  },
  _invalid: {
    borderColor: "border.primary",
    boxShadow: "ring.error",
  },
  _disabled: {
    opacity: 1,
    cursor: "not-allowed",
    color: "text.subtle",
    borderColor: "border.secondary",
  },
};

/** Dropdown panels (select options, period menu): white card, divided rows. */
export const dropdownPanel: SystemStyleObject = {
  bg: "bg.secondary",
  borderRadius: "0.75rem",
  boxShadow: "large.2",
  p: "0",
  overflow: "hidden",
  minW: "var(--reference-width)",
};

export const dropdownItem: SystemStyleObject = {
  px: "1.5rem",
  py: "0.75rem",
  fontSize: "1rem",
  color: "text.secondary",
  borderRadius: "0",
  cursor: "pointer",
  "&:not(:last-of-type)": {
    borderBottomWidth: "0.0625rem",
    borderColor: "border.secondary",
  },
  _highlighted: { bg: "bg.primary" },
  _checked: { color: "text.primary", fontWeight: "500" },
};
