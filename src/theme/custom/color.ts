// Base palettes from the Clientele design system (design/figma/TOKENS.md).
// Base tokens are building blocks only — components should use the semantic
// tokens below or component recipes, never these scales directly.
export const colors = {
  neutral: {
    50: { value: "#FAFAFA" },
    100: { value: "#F5F5F5" },
    200: { value: "#E6E6E6" },
    300: { value: "#D6D6D6" },
    400: { value: "#A5A5A5" },
    500: { value: "#767676" },
    600: { value: "#575757" },
    700: { value: "#434343" },
    800: { value: "#2E2E2E" },
    900: { value: "#1A1A1A" },
    950: { value: "#0A0A0A" },
  },
  // Brand / primary scale ("sandal" in Figma)
  sandal: {
    50: { value: "#EEF2FF" },
    100: { value: "#DFE6FF" },
    200: { value: "#C6D1FF" },
    300: { value: "#A3B2FE" },
    400: { value: "#7E88FB" },
    500: { value: "#6062F4" },
    600: { value: "#4D42E9" },
    700: { value: "#5044D1" },
    800: { value: "#362DA6" },
    900: { value: "#302C83" },
    950: { value: "#1E1A4C" },
  },
  // Secondary scale ("westar" in Figma)
  westar: {
    50: { value: "#F5F5F8" },
    100: { value: "#E8E9EF" },
    200: { value: "#DEDFE7" },
    300: { value: "#C9CAD8" },
    400: { value: "#B2B2C7" },
    500: { value: "#9F9DB7" },
    600: { value: "#8B87A4" },
    700: { value: "#78748E" },
    800: { value: "#625F74" },
    900: { value: "#52505F" },
    950: { value: "#302F37" },
  },
  success: {
    50: { value: "#F2FBF2" },
    100: { value: "#E1F7E1" },
    200: { value: "#C5EDC5" },
    300: { value: "#97DE98" },
    400: { value: "#56C258" },
    500: { value: "#3CAB3E" },
    600: { value: "#2D8C2F" },
    700: { value: "#266F28" },
  },
  warning: {
    50: { value: "#FBF9EB" },
    100: { value: "#F6F0CB" },
    200: { value: "#EEDF9A" },
    300: { value: "#E3C661" },
    400: { value: "#DAAF35" },
    500: { value: "#CA9928" },
    600: { value: "#A3701E" },
    700: { value: "#8B571D" },
  },
  error: {
    50: { value: "#FEF2F2" },
    100: { value: "#FEE2E2" },
    200: { value: "#FECACA" },
    300: { value: "#FBA6A6" },
    400: { value: "#F77272" },
    500: { value: "#ED4646" },
    600: { value: "#CD2323" },
    700: { value: "#B71E1E" },
  },
  info: {
    50: { value: "#FAFAFA" },
    100: { value: "#F5F5F5" },
    200: { value: "#E0E0E0" },
    300: { value: "#D3D3D3" },
    400: { value: "#A3A3A3" },
    500: { value: "#727272" },
    600: { value: "#535353" },
    700: { value: "#404040" },
  },
};

// Semantic layer — what components should reference (e.g. color="text.secondary").
export const semanticColors = {
  text: {
    primary: { value: "{colors.neutral.900}" },
    secondary: { value: "{colors.neutral.700}" },
    tertiary: { value: "{colors.neutral.600}" },
    inverse: { value: "{colors.neutral.100}" },
    placeholder: { value: "{colors.neutral.500}" },
    // Subdued text group from the Color page (#767676 / #A5A5A5), used for
    // subtitles, secondary copy and fine print.
    muted: { value: "{colors.neutral.500}" },
    subtle: { value: "{colors.neutral.400}" },
    error: { value: "{colors.error.600}" },
  },
  bg: {
    primary: { value: "{colors.neutral.50}" },
    secondary: { value: "#FFFFFF" },
    tertiary: { value: "{colors.neutral.100}" },
  },
  // Border tokens are unfinished in Figma (swatches render white);
  // interim mapping agreed in design/figma/TOKENS.md.
  border: {
    primary: { value: "{colors.neutral.200}" },
    secondary: { value: "{colors.neutral.100}" },
  },
  overlay: { value: "rgba(0, 0, 0, 0.3)" },
};
