import { Navigate, Outlet, useLocation } from "react-router-dom";
import { appRoutes } from "@/shared/constants/routes";
import { getStoredToken } from "@/utils/storage";

/** Signed-out users are sent to sign in, then returned here afterwards. */
export function RequireAuth() {
  const location = useLocation();

  if (!getStoredToken()) {
    return (
      <Navigate
        to={appRoutes.auth.login}
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  }

  return <Outlet />;
}

/** Keeps signed-in users out of the sign-in and sign-up screens. */
export function GuestOnly() {
  if (getStoredToken()) {
    return <Navigate to={appRoutes.home} replace />;
  }

  return <Outlet />;
}
