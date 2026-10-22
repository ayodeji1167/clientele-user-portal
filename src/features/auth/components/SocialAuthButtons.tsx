import { Button, Separator, Stack } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { AppleIcon, GoogleIcon } from "@/components/icons";
import { authApi } from "../api/auth.api";
import type { OAuthProvider } from "../interface";

const providers: {
  id: OAuthProvider;
  label: string;
  icon: ReactNode;
}[] = [
  { id: "google", label: "Continue with Google", icon: <GoogleIcon /> },
  {
    id: "apple",
    label: "Continue with Apple",
    icon: <AppleIcon color="text.primary" />,
  },
];

export function SocialAuthButtons() {
  return (
    <Stack gap="1.5rem" pt="0.125rem">
      <Separator borderColor="border.primary" />
      <Stack gap="0.5rem">
        {providers.map((provider) => (
          <Button
            key={provider.id}
            variant="social"
            w="full"
            gap="0.3125rem"
            onClick={() =>
              window.location.assign(authApi.oauthUrl(provider.id))
            }
          >
            {provider.icon}
            {provider.label}
          </Button>
        ))}
      </Stack>
    </Stack>
  );
}
