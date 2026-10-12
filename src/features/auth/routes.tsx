import { redirect, type RouteObject } from "react-router-dom";
import { appRoutes } from "@/shared/constants/routes";
import { setStoredToken } from "@/utils/storage";

const { auth } = appRoutes;

/** Screens only signed-out users should see (wrap in GuestOnly). */
export const guestAuthRoutes: RouteObject[] = [
  {
    path: auth.login,
    lazy: () =>
      import("./pages/MagicLinkPage").then((m) => ({
        Component: m.MagicLinkPage,
      })),
  },
  {
    path: auth.loginWithPassword,
    lazy: () =>
      import("./pages/LoginPage").then((m) => ({ Component: m.LoginPage })),
  },
  {
    path: auth.register,
    lazy: () =>
      import("./pages/RegisterPage").then((m) => ({
        Component: m.RegisterPage,
      })),
  },
  {
    path: auth.verifyEmail,
    lazy: () =>
      import("./pages/VerifyEmailPage").then((m) => ({
        Component: m.VerifyEmailPage,
      })),
  },
  {
    path: auth.forgotPassword,
    lazy: () =>
      import("./pages/ForgotPasswordPage").then((m) => ({
        Component: m.ForgotPasswordPage,
      })),
  },
  {
    path: auth.resetPassword,
    lazy: () =>
      import("./pages/ResetPasswordPage").then((m) => ({
        Component: m.ResetPasswordPage,
      })),
  },
];

/** Redirect landings — reachable whether or not a session exists. */
export const authCallbackRoutes: RouteObject[] = [
  {
    path: auth.magicLinkCallback,
    lazy: () =>
      import("./pages/MagicLinkCallbackPage").then((m) => ({
        Component: m.MagicLinkCallbackPage,
      })),
  },
  {
    path: auth.oauthCallback,
    loader: ({ request }) => {
      const token = new URL(request.url).searchParams.get("token");
      if (!token) return null;
      setStoredToken(token);
      return redirect(appRoutes.home);
    },
    lazy: () =>
      import("./pages/OAuthCallbackPage").then((m) => ({
        Component: m.OAuthCallbackPage,
      })),
  },
];

/** Screens that need a session (wrap in RequireAuth). */
export const protectedAuthRoutes: RouteObject[] = [
  {
    path: appRoutes.welcome,
    lazy: () =>
      import("./pages/WelcomePage").then((m) => ({
        Component: m.WelcomePage,
      })),
  },
];
