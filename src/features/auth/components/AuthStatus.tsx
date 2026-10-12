import { Button, Spinner, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { appRoutes } from "@/shared/constants/routes";
import { AuthHeader } from "./AuthHeader";
import { AuthLayout } from "./AuthLayout";

type AuthStatusProps =
  | { state: "loading"; title: string }
  | { state: "error"; title: string; message: string };

/** Full-page status for redirect landings (magic link, OAuth callback). */
export function AuthStatus(props: AuthStatusProps) {
  return (
    <AuthLayout centered>
      <Stack gap="32px" align="center">
        {props.state === "loading" ? (
          <>
            <Spinner size="lg" color="sandal.700" borderWidth="3px" />
            <AuthHeader title={props.title} />
          </>
        ) : (
          <>
            <AuthHeader title={props.title} subtitle={props.message} />
            <Button asChild w="full">
              <Link to={appRoutes.auth.login} replace>
                Back to sign in
              </Link>
            </Button>
          </>
        )}
      </Stack>
    </AuthLayout>
  );
}
