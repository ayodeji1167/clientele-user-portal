import { defineRoute } from "@/utils/route";

const auth = {
  login: defineRoute("/auth/login" as const),
  secureLink: defineRoute("/auth/login/secure-link" as const),
  signup: defineRoute("/auth/signup" as const),
  verifyEmail: defineRoute("/auth/verify-email" as const),
  forgotPassword: defineRoute("/auth/forgot-password" as const),
  // Linked from emails as /auth/reset-password?token=… and
  // /auth/magic-link?token=…; the backend's OAuth flow redirects to
  // /auth/callback?token=….
  resetPassword: defineRoute("/auth/reset-password" as const),
  magicLink: defineRoute("/auth/magic-link" as const),
  oauthCallback: defineRoute("/auth/callback" as const),
} as const;

const onboarding = {
  welcome: defineRoute("/welcome" as const),
  start: defineRoute("/welcome/start" as const),
} as const;

const overview = {
  base: defineRoute("/" as const),
} as const;

export const RouteConstants = {
  auth,
  onboarding,
  overview,
} as const;
