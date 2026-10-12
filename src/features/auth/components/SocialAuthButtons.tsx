import { Button, Separator, Stack } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { AppleIcon, GoogleIcon } from "@/components/icons";
import { authApi } from "../api/auth.api";
import type { OAuthProvider } from "../types";

const providers: {
  id: OAuthProvider;
  label: string;
  icon: ReactNode;
}[] = [
  { id: "google", label: "Continue with Google", icon: <GoogleIcon /> },
  {
    id: "apple",
    label: "Continue with Apple",
    icon: <AppleIcon color="black" />,
  },
];

export function SocialAuthButtons() {
  return (
    <Stack gap="24px" pt="2px">
      <Separator borderColor="border.primary" />
      <Stack gap="8px">
        {providers.map((provider) => (
          <Button
            key={provider.id}
            variant="social"
            w="full"
            gap="8px"
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
