import { chakra, type HTMLChakraProps } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";

type Tone = "brand" | "neutral" | "muted";

const toneStyles = {
  brand: {
    color: "sandal.700",
    fontWeight: "600",
    letterSpacing: "-0.03em",
    textDecoration: "underline",
    textDecorationColor: "sandal.200",
    _hover: { textDecorationColor: "sandal.700" },
  },
  neutral: {
    color: "text.primary",
    textDecoration: "underline",
    textDecorationColor: "neutral.300",
    _hover: { textDecorationColor: "text.primary" },
  },
  muted: {
    color: "text.tertiary",
    fontSize: "14px",
    _hover: { color: "text.primary" },
  },
} satisfies Record<Tone, HTMLChakraProps<"a">>;

const baseStyles = {
  textUnderlineOffset: "3px",
  borderRadius: "2px",
  cursor: "pointer",
  _focusVisible: { outline: "none", boxShadow: "ring.focusNeutral" },
  _disabled: { opacity: 0.5, cursor: "not-allowed" },
} satisfies HTMLChakraProps<"a">;

type TextLinkProps = {
  children: ReactNode;
  tone?: Tone;
} & (
  | { to: string; state?: unknown; onClick?: never; disabled?: never }
  | { to?: never; onClick: () => void; disabled?: boolean }
);

/** Inline link styled per the auth mockups; renders a button for actions. */
export function TextLink({ children, tone = "brand", ...rest }: TextLinkProps) {
  const styles = { ...baseStyles, ...toneStyles[tone] };

  if (rest.to !== undefined) {
    return (
      <chakra.a asChild {...styles}>
        <RouterLink to={rest.to} state={rest.state}>
          {children}
        </RouterLink>
      </chakra.a>
    );
  }

  return (
    <chakra.button
      type="button"
      onClick={rest.onClick}
      disabled={rest.disabled}
      fontSize="inherit"
      {...styles}
    >
      {children}
    </chakra.button>
  );
}
