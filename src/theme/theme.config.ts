import { createSystem, defaultConfig } from "@chakra-ui/react";
import { fonts, textStyles } from "./custom/font";
import { colors } from "./custom/color";
import { buttonRecipe } from "./recipe";

export const system = createSystem(defaultConfig, {
  cssVarsPrefix: "clientelle",

  globalCss: {
    "html, body": {
      margin: 0,
      padding: 0,
      fontFamily: "body",
      background: "rgba(255, 255, 255, 1)",
      scrollBehavior: "smooth",
      overscrollBehaviorY: "none",
    },
  },
  theme: {
    textStyles: textStyles,
    tokens: {
      fonts: fonts,
      colors: colors,
    },
    recipes: {
      button: buttonRecipe,
    },
  },
});
