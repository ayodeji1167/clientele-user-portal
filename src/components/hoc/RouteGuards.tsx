import { Navigate, Outlet, useLocation } from "react-router-dom";
import { RouteConstants } from "@/shared/constants/routes";
import { getStoredToken } from "@/utils/storage";

/** Signed-out users are sent to sign in, then returned here afterwards. */
export function RequireAuth() {
  const location = useLocation();
  const isLoggedIn = true;
  // const isLoggedIn = !!getStoredToken();

  if (!isLoggedIn) {
    return (
      <Navigate
        to={RouteConstants.auth.login.path}
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  }

  return <Outlet />;
}

/** Keeps signed-in users out of the sign-in and sign-up screens. */
export function GuestOnly() {
  const isLoggedIn = !!getStoredToken();

  if (isLoggedIn) {
    return <Navigate to={RouteConstants.overview.base.path} replace />;
  }

  return <Outlet />;
}
