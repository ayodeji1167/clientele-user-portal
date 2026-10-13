import { Button, Heading, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useCurrentUser, useLogout } from "@/features/auth/api/auth.hooks";
import { RouteConstants } from "@/shared/constants/routes";

// Placeholder until the dashboard is designed.
export function HomePage() {
  const navigate = useNavigate();
  const { data: user } = useCurrentUser();
  const logout = useLogout();

  return (
    <Stack minH="100dvh" align="center" justify="center" gap="16px" px="16px">
      <Heading textStyle="h5" fontWeight="600">
        Dashboard
      </Heading>
      {user && <Text color="text.muted">Signed in as {user.email}</Text>}
      <Button
        variant="tertiary"
        onClick={() => {
          logout();
          navigate(RouteConstants.auth.login.path, { replace: true });
        }}
      >
        Sign out
      </Button>
    </Stack>
  );
}
