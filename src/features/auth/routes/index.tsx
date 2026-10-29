import { redirect, type RouteObject } from "react-router-dom";
import { RouteError } from "@/components/error";
import { GuestOnly } from "@/components/hoc";
import { RouteConstants } from "@/shared/constants/routes";
import { setStoredToken } from "@/utils/storage";

const { auth, onboarding, overview } = RouteConstants;

// Screens only signed-out users should see.
export const AuthRouteList: RouteObject[] = [
  {
    path: auth.login.path,
    lazy: () =>
      import("../pages/LoginPage").then((m) => ({ Component: m.LoginPage })),
  },
  {
    path: auth.secureLink.path,
    lazy: () =>
      import("../pages/MagicLinkPage").then((m) => ({
        Component: m.MagicLinkPage,
      })),
  },
  {
    path: auth.signup.path,
    lazy: () =>
      import("../pages/SignupPage").then((m) => ({ Component: m.SignupPage })),
  },
  {
    path: auth.verifyEmail.path,
    lazy: () =>
      import("../pages/VerifyEmailPage").then((m) => ({
        Component: m.VerifyEmailPage,
      })),
  },
  {
    path: auth.forgotPassword.path,
    lazy: () =>
      import("../pages/ForgotPasswordPage").then((m) => ({
        Component: m.ForgotPasswordPage,
      })),
  },
  {
    path: auth.resetPassword.path,
    lazy: () =>
      import("../pages/ResetPasswordPage").then((m) => ({
        Component: m.ResetPasswordPage,
      })),
  },
];

// Email and OAuth redirect landings — reachable with or without a session.
const AuthCallbackRouteList: RouteObject[] = [
  {
    path: auth.magicLink.path,
    lazy: () =>
      import("../pages/MagicLinkCallbackPage").then((m) => ({
        Component: m.MagicLinkCallbackPage,
      })),
  },
  {
    path: auth.oauthCallback.path,
    loader: ({ request }) => {
      const token = new URL(request.url).searchParams.get("token");
      if (!token) return null;
      setStoredToken(token);
      return redirect(overview.base.path);
    },
    lazy: () =>
      import("../pages/OAuthCallbackPage").then((m) => ({
        Component: m.OAuthCallbackPage,
      })),
  },
];

export const AuthRoutes: RouteObject = {
  path: "auth",
  errorElement: <RouteError />,
  children: [
    { element: <GuestOnly />, children: AuthRouteList },
    ...AuthCallbackRouteList,
  ],
};

// Signed-in screens owned by auth — mount these under RequireAuth.
export const OnboardingRouteList: RouteObject[] = [
  {
    path: onboarding.welcome.path,
    lazy: () =>
      import("../pages/WelcomePage").then((m) => ({
        Component: m.WelcomePage,
      })),
  },
  {
    path: onboarding.start.path,
    lazy: () =>
      import("../pages/OnboardingStartPage").then((m) => ({
        Component: m.OnboardingStartPage,
      })),
  },
  {
    path: onboarding.industry.path,
    lazy: () =>
      import("../pages/OnboardingIndustryPage").then((m) => ({
        Component: m.OnboardingIndustryPage,
      })),
  },
  {
    path: onboarding.services.path,
    lazy: () =>
      import("../pages/OnboardingServicesPage").then((m) => ({
        Component: m.OnboardingServicesPage,
      })),
  },
  {
    path: onboarding.payment.path,
    lazy: () =>
      import("../pages/OnboardingPaymentPage").then((m) => ({
        Component: m.OnboardingPaymentPage,
      })),
  },
  {
    path: onboarding.studio.path,
    lazy: () =>
      import("../pages/OnboardingStudioPage").then((m) => ({
        Component: m.OnboardingStudioPage,
      })),
  },
  {
    path: onboarding.business.path,
    lazy: () =>
      import("../pages/OnboardingBusinessPage").then((m) => ({
        Component: m.OnboardingBusinessPage,
      })),
  },
];
