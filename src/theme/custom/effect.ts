// Elevation and focus-ring tokens from design/figma/TOKENS.md.
// Four elevation tiers, four spread profiles each; `.1` is the default
// profile for a tier.
export const shadows = {
  small: {
    1: { value: "0 1px 4px 0 rgba(0, 0, 0, 0.05)" },
    2: { value: "0 1px 6px 0 rgba(0, 0, 0, 0.05)" },
    3: { value: "1px 1px 6px 0 rgba(0, 0, 0, 0.05)" },
    4: { value: "0 0 6px 1px rgba(0, 0, 0, 0.05)" },
  },
  medium: {
    1: { value: "0 1px 6px 0 rgba(0, 0, 0, 0.08)" },
    2: { value: "0 1px 8px 0 rgba(0, 0, 0, 0.08)" },
    3: { value: "1px 1px 10px 0 rgba(0, 0, 0, 0.08)" },
    4: { value: "0 0 10px 2px rgba(0, 0, 0, 0.08)" },
  },
  large: {
    1: { value: "0 4px 12px 0 rgba(0, 0, 0, 0.1)" },
    2: { value: "0 4px 16px 0 rgba(0, 0, 0, 0.1)" },
    3: { value: "4px 4px 16px 0 rgba(0, 0, 0, 0.1)" },
    4: { value: "0 0 16px 4px rgba(0, 0, 0, 0.1)" },
  },
  xlarge: {
    1: { value: "0 6px 20px 0 rgba(0, 0, 0, 0.12)" },
    2: { value: "0 8px 24px 0 rgba(0, 0, 0, 0.12)" },
    3: { value: "8px 8px 24px 0 rgba(0, 0, 0, 0.12)" },
    4: { value: "0 0 28px 6px rgba(0, 0, 0, 0.12)" },
  },
  // Figma lists effect layers bottom-first; CSS paints the first shadow on
  // top, so the 2px white gap must come before the 3px colored ring.
  ring: {
    focusPrimary: {
      value:
        "0 0 0 2px rgba(255, 255, 255, 1), 0 0 0 3px rgba(54, 45, 166, 1), inset 0 0 0 1px rgba(54, 45, 166, 1)",
    },
    error: {
      value: "0 0 0 2px rgba(255, 255, 255, 1), 0 0 0 3px rgba(183, 30, 30, 1)",
    },
    focusNeutral: {
      value:
        "0 0 0 2px rgba(255, 255, 255, 1), 0 0 0 3px rgba(118, 118, 118, 1), inset 0 0 0 1px rgba(230, 230, 230, 1)",
    },
    success: {
      value:
        "0 0 0 2px rgba(255, 255, 255, 1), 0 0 0 3px rgba(45, 140, 47, 1), inset 0 0 0 1px rgba(230, 230, 230, 1)",
    },
  },
};

export const blurs = {
  sm: { value: "2px" },
  med: { value: "4px" },
  lg: { value: "6px" },
  xl: { value: "8px" },
};
