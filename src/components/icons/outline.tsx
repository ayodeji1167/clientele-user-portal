import { Box, Icon, type IconProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

// Outline icons follow the design system: 1.5px stroke, round caps, drawn on
// a 24px grid and sized with boxSize (1.125rem by default).
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function OutlineIcon({
  children,
  ...props
}: IconProps & { children: ReactNode }) {
  return (
    <Icon boxSize="1.125rem" {...props}>
      <svg viewBox="0 0 24 24" {...stroke}>
        {children}
      </svg>
    </Icon>
  );
}

export function EyeIcon(props: IconProps) {
  return (
    <OutlineIcon {...props}>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </OutlineIcon>
  );
}

export function EyeOffIcon(props: IconProps) {
  return (
    <OutlineIcon {...props}>
      <path d="M9.9 5.8A9.8 9.8 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a17 17 0 0 1-2.7 3.6M6.6 6.6C4 8.4 2.5 12 2.5 12s3.5 6.5 9.5 6.5c1.9 0 3.5-.6 4.9-1.5" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
      <path d="M3 3l18 18" />
    </OutlineIcon>
  );
}

export function OverviewIcon(props: IconProps) {
  return (
    <OutlineIcon {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
      <path d="M9 3.5v17M12.5 8.5h4.5M12.5 12h4.5M12.5 15.5h3" />
    </OutlineIcon>
  );
}

export function DocumentIcon(props: IconProps) {
  return (
    <OutlineIcon {...props}>
      <path d="M14 3.5H7.5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V8Z" />
      <path d="M14 3.5V8h4.5M9 12.5h6M9 16h4" />
    </OutlineIcon>
  );
}

export function PortalIcon(props: IconProps) {
  return (
    <OutlineIcon {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <circle cx="12" cy="10" r="3" />
      <path d="M6.8 20.2a5.8 5.8 0 0 1 10.4 0" />
    </OutlineIcon>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <OutlineIcon {...props}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </OutlineIcon>
  );
}

export function EarningsIcon(props: IconProps) {
  return (
    <OutlineIcon {...props}>
      <rect x="2.5" y="6" width="19" height="12" rx="2" />
      <circle cx="12" cy="12" r="2.25" />
      <path d="M6.5 10.5v3M17.5 10.5v3" />
    </OutlineIcon>
  );
}

export function TemplateIcon(props: IconProps) {
  return (
    <OutlineIcon {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
      <path d="M3.5 9h17M9.5 9v11.5" />
    </OutlineIcon>
  );
}

export function PlusCircleIcon(props: IconProps) {
  return (
    <OutlineIcon {...props}>
      <circle cx="12" cy="12" r="8.75" />
      <path d="M12 8.5v7M8.5 12h7" />
    </OutlineIcon>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <OutlineIcon {...props}>
      <path d="m6.5 9.5 5.5 5.5 5.5-5.5" />
    </OutlineIcon>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <OutlineIcon {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </OutlineIcon>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <OutlineIcon {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </OutlineIcon>
  );
}

export function BellIcon(props: IconProps) {
  return (
    <OutlineIcon {...props}>
      <path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 1.5h-15Z" />
      <path d="M10 20.5a2 2 0 0 0 4 0" />
    </OutlineIcon>
  );
}

export function SettingsIcon(props: IconProps) {
  return (
    <OutlineIcon {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
    </OutlineIcon>
  );
}

export function ArrowUpCircleIcon(props: IconProps) {
  return (
    <OutlineIcon {...props}>
      <circle cx="12" cy="12" r="8.75" />
      <path d="M12 16V8.5M8.75 11.5 12 8.25l3.25 3.25" />
    </OutlineIcon>
  );
}

export function CommentIcon(props: IconProps) {
  return (
    <OutlineIcon {...props}>
      <path d="M12 4.5c4.4 0 8 3 8 6.75S16.4 18 12 18c-.9 0-1.8-.1-2.6-.4L5 19.5l1.2-3.6A6.4 6.4 0 0 1 4 11.25C4 7.5 7.6 4.5 12 4.5Z" />
    </OutlineIcon>
  );
}

/** Wraps an icon with the red "unread" dot the design puts on its corner. */
export function WithUnreadDot({
  children,
  show = true,
}: {
  children: ReactNode;
  show?: boolean;
}) {
  return (
    <Box as="span" position="relative" display="inline-flex">
      {children}
      {show && (
        <Box
          as="span"
          position="absolute"
          top="0"
          right="-0.0625rem"
          boxSize="0.375rem"
          borderRadius="full"
          bg="error.600"
        />
      )}
    </Box>
  );
}
