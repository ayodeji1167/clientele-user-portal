import { Icon, type IconProps } from "@chakra-ui/react";

// Outline icons follow the design system: 1.5px stroke, round caps.
const outline = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function EyeIcon(props: IconProps) {
  return (
    <Icon boxSize="18px" {...props}>
      <svg viewBox="0 0 24 24">
        <path
          {...outline}
          d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"
        />
        <circle {...outline} cx="12" cy="12" r="3" />
      </svg>
    </Icon>
  );
}

export function EyeOffIcon(props: IconProps) {
  return (
    <Icon boxSize="18px" {...props}>
      <svg viewBox="0 0 24 24">
        <path
          {...outline}
          d="M9.9 5.8A9.8 9.8 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a17 17 0 0 1-2.7 3.6M6.6 6.6C4 8.4 2.5 12 2.5 12s3.5 6.5 9.5 6.5c1.9 0 3.5-.6 4.9-1.5"
        />
        <path {...outline} d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
        <path {...outline} d="M3 3l18 18" />
      </svg>
    </Icon>
  );
}

export function GoogleIcon(props: IconProps) {
  return (
    <Icon boxSize="17px" {...props}>
      <svg viewBox="0 0 24 24">
        <path
          fill="#4285F4"
          d="M23.5 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.56-5.17 3.56-8.81Z"
        />
        <path
          fill="#34A853"
          d="M12 24c3.24 0 5.96-1.07 7.94-2.9l-3.88-3.02c-1.07.72-2.45 1.15-4.06 1.15-3.13 0-5.78-2.11-6.72-4.95H1.27v3.11A12 12 0 0 0 12 24Z"
        />
        <path
          fill="#FBBC05"
          d="M5.28 14.28a7.2 7.2 0 0 1 0-4.56V6.61H1.27a12 12 0 0 0 0 10.78l4.01-3.11Z"
        />
        <path
          fill="#EA4335"
          d="M12 4.77c1.76 0 3.34.61 4.59 1.8l3.44-3.44A11.53 11.53 0 0 0 12 0 12 12 0 0 0 1.27 6.61l4.01 3.11C6.22 6.88 8.87 4.77 12 4.77Z"
        />
      </svg>
    </Icon>
  );
}

export function AppleIcon(props: IconProps) {
  return (
    <Icon boxSize="23px" {...props}>
      <svg viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M16.37 12.62c-.02-2.33 1.9-3.45 1.99-3.5a4.3 4.3 0 0 0-3.38-1.83c-1.43-.15-2.8.85-3.53.85-.74 0-1.85-.83-3.05-.8a4.5 4.5 0 0 0-3.8 2.32c-1.63 2.82-.42 6.98 1.16 9.27.78 1.12 1.7 2.37 2.9 2.33 1.17-.05 1.6-.75 3.02-.75 1.4 0 1.8.75 3.03.73 1.25-.02 2.04-1.14 2.8-2.27a9.7 9.7 0 0 0 1.27-2.6 4.05 4.05 0 0 1-2.4-3.75ZM14.06 5.77a4.05 4.05 0 0 0 .93-2.92 4.13 4.13 0 0 0-2.68 1.38 3.86 3.86 0 0 0-.95 2.8 3.42 3.42 0 0 0 2.7-1.26Z"
        />
      </svg>
    </Icon>
  );
}
