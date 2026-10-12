import { createSystem, defaultConfig } from "@chakra-ui/react";
import { fonts, textStyles } from "./custom/font";
import { colors, semanticColors } from "./custom/color";
import { shadows, blurs } from "./custom/effect";
import { buttonRecipe } from "./recipe";

export const system = createSystem(defaultConfig, {
  cssVarsPrefix: "clientelle",

  globalCss: {
    "html, body": {
      margin: 0,
      padding: 0,
      fontFamily: "body",
      // Regular-weight copy in the mockups tracks at -1.5%; medium and
      // heavier text (headings, labels, buttons) sets -3% itself.
      letterSpacing: "-0.015em",
      color: "text.primary",
      background: "bg.secondary",
      scrollBehavior: "smooth",
      overscrollBehaviorY: "none",
    },
  },
  theme: {
    textStyles: textStyles,
    tokens: {
      fonts: fonts,
      colors: colors,
      shadows: shadows,
      blurs: blurs,
    },
    semanticTokens: {
      colors: semanticColors,
    },
    recipes: {
      button: buttonRecipe,
    },
  },
});
