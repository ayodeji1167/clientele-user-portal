import { Button, Spinner, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { RouteConstants } from "@/shared/constants/routes";
import { AuthHeader } from "./AuthHeader";
import { AuthLayout } from "./AuthLayout";

type AuthStatusProps =
  | { state: "loading"; title: string }
  | { state: "error"; title: string; message: string };

/** Full-page status for redirect landings (magic link, OAuth callback). */
export function AuthStatus(props: AuthStatusProps) {
  return (
    <AuthLayout centered>
      <Stack gap="2rem" align="center">
        {props.state === "loading" ? (
          <>
            <Spinner size="lg" color="sandal.700" borderWidth="0.1875rem" />
            <AuthHeader title={props.title} />
          </>
        ) : (
          <>
            <AuthHeader title={props.title} subtitle={props.message} />
            <Button asChild w="full">
              <Link to={RouteConstants.auth.login.path} replace>
                Back to sign in
              </Link>
            </Button>
          </>
        )}
      </Stack>
    </AuthLayout>
  );
}
