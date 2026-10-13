import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { RouteConstants } from "@/shared/constants/routes";
import { getErrorMessage } from "@/utils/handle-error";
import { useVerifyMagicLink } from "../api/auth.hooks";
import { AuthStatus } from "../components/AuthStatus";

export function MagicLinkCallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const verify = useVerifyMagicLink();

  // Links are single-use, so StrictMode's double effect must not spend the
  // token twice.
  const attempted = useRef(false);
  useEffect(() => {
    if (!token || attempted.current) return;
    attempted.current = true;
    verify.mutate(token, {
      onSuccess: () =>
        navigate(RouteConstants.overview.base.path, { replace: true }),
    });
  }, [token, verify, navigate]);

  if (!token || verify.isError) {
    return (
      <AuthStatus
        state="error"
        title="This link has expired"
        message={
          verify.isError
            ? getErrorMessage(verify.error)
            : "Sign-in links can only be used once. Request a new one to continue."
        }
      />
    );
  }

  return <AuthStatus state="loading" title="Signing you in…" />;
}
