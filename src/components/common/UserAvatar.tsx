import { Avatar, type AvatarFallbackProps } from "@chakra-ui/react";

type UserAvatarProps = {
  name: string;
  src?: string;
  /** Diameter, e.g. "1.875rem". */
  size: string;
  fontSize?: string;
  avatarFallBackProps?: AvatarFallbackProps;
};

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase();
}

/** Photo when we have one, otherwise initials on a grey disc. */
export function UserAvatar({
  name,
  src,
  size,
  fontSize = "0.75rem",
  avatarFallBackProps,
}: UserAvatarProps) {
  return (
    <Avatar.Root boxSize={size} flexShrink={0} bg="neutral.200">
      <Avatar.Fallback
        fontWeight="600"
        color="text.secondary"
        letterSpacing="0"
        {...avatarFallBackProps}
      >
        {initials(name)}
      </Avatar.Fallback>
      {src && <Avatar.Image src={src} alt={name} />}
    </Avatar.Root>
  );
}
