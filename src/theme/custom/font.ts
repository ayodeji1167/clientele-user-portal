import { defineTextStyles } from "@chakra-ui/react";

// Overused Grotesk is self-hosted (public/fonts, loaded in src/index.css).
// Benton Modern Display is a licensed font — serif stack falls back until
// the font files are purchased and added.
export const fonts = {
  heading: { value: `'Overused Grotesk', system-ui, sans-serif` },
  body: { value: `'Overused Grotesk', system-ui, sans-serif` },
  display: {
    value: `'BentonModDisp', 'Benton Modern Display', Georgia, 'Times New Roman', serif`,
  },
};

// Type scale from design/figma/TOKENS.md — all styles ship at weight 300
// (light) with -3% letter-spacing; bump fontWeight per usage (500 UI
// emphasis, 600 section titles, 700 headings).
export const textStyles = defineTextStyles({
  display: {
    description: "Hero sections, marketing banners, high-impact statements",
    value: {
      fontFamily: "body",
      fontSize: "70px",
      fontWeight: "300",
      lineHeight: "0.97",
      letterSpacing: "-0.03em",
    },
  },
  displaySerif: {
    description: "Marketing display in Benton Modern Display",
    value: {
      fontFamily: "display",
      fontSize: "80px",
      fontWeight: "300",
      lineHeight: "0.82",
      letterSpacing: "-0.03em",
    },
  },
  h2Serif: {
    description: "Benton Modern Display H2 (50px) — page greetings",
    value: {
      fontFamily: "display",
      fontSize: "50px",
      fontWeight: "300",
      lineHeight: "0.82",
      letterSpacing: "-0.03em",
    },
  },
  h1: {
    description: "Page titles, primary screen headings",
    value: {
      fontFamily: "body",
      fontSize: "50px",
      fontWeight: "300",
      lineHeight: "0.97",
      letterSpacing: "-0.03em",
    },
  },
  h2: {
    description: "Section headers, major content divisions",
    value: {
      fontFamily: "body",
      fontSize: "40px",
      fontWeight: "300",
      lineHeight: "1.05",
      letterSpacing: "-0.03em",
    },
  },
  h3: {
    description: "Subsection headers within sections",
    value: {
      fontFamily: "body",
      fontSize: "32px",
      fontWeight: "300",
      lineHeight: "1.05",
      letterSpacing: "-0.03em",
    },
  },
  h4: {
    description: "Card titles, grouped content headings",
    value: {
      fontFamily: "body",
      fontSize: "28px",
      fontWeight: "300",
      lineHeight: "1.05",
      letterSpacing: "-0.03em",
    },
  },
  h5: {
    description: "Small section headers, list titles",
    value: {
      fontFamily: "body",
      fontSize: "24px",
      fontWeight: "300",
      lineHeight: "1.05",
      letterSpacing: "-0.03em",
    },
  },
  h6: {
    description: "Labels, minor headings, UI group titles",
    value: {
      fontFamily: "body",
      fontSize: "20px",
      fontWeight: "300",
      lineHeight: "1.05",
      letterSpacing: "-0.03em",
    },
  },
  p1: {
    description: "Large body text",
    value: {
      fontFamily: "body",
      fontSize: "18px",
      fontWeight: "400",
      lineHeight: "1.1",
      letterSpacing: "-0.03em",
    },
  },
  p2: {
    description: "Default body text",
    value: {
      fontFamily: "body",
      fontSize: "16px",
      fontWeight: "400",
      lineHeight: "1.1",
      letterSpacing: "-0.03em",
    },
  },
  p3: {
    description: "Secondary body text, inputs",
    value: {
      fontFamily: "body",
      fontSize: "14px",
      fontWeight: "400",
      lineHeight: "1.1",
      letterSpacing: "-0.03em",
    },
  },
  p4: {
    description: "Metadata, helper text, timestamps",
    value: {
      fontFamily: "body",
      fontSize: "12px",
      fontWeight: "400",
      lineHeight: "1.1",
      letterSpacing: "-0.03em",
    },
  },
});
