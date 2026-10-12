import { useSearchParams } from "react-router-dom";
import { AuthStatus } from "../components/AuthStatus";

/**
 * Shown only when the Google/Apple sign-in fails — a successful callback is
 * handled by the route loader before this renders.
 */
export function OAuthCallbackPage() {
  const [searchParams] = useSearchParams();

  return (
    <AuthStatus
      state="error"
      title="We couldn’t sign you in"
      message={
        searchParams.get("error") ??
        "The sign-in was cancelled or didn’t complete. Please try again."
      }
    />
  );
}
