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
  industry: defineRoute("/welcome/industry" as const),
  services: defineRoute("/welcome/services" as const),
  payment: defineRoute("welcome/payment" as const),
  studio: defineRoute("/welcome/studio" as const),
  business: defineRoute("/welcome/business" as const),
} as const;

const overview = {
  base: defineRoute("/" as const),
} as const;

const inquiries = {
  base: defineRoute("/inquiries" as const),
  form: defineRoute("/inquiries/form" as const),
} as const;

const portals = {
  base: defineRoute("/portals" as const),
  create: defineRoute("/portals/create" as const),
  detail: defineRoute("/portals/:id" as const),
  revisions: defineRoute("/portals/:id/revisions" as const),
  deliverable: defineRoute("/portals/:id/deliverables/:deliverableId" as const),
} as const;

const calendar = {
  base: defineRoute("/calendar" as const),
} as const;

const earnings = {
  base: defineRoute("/earnings" as const),
} as const;

const templates = {
  base: defineRoute("/templates" as const),
} as const;

const notifications = {
  base: defineRoute("/notifications" as const),
} as const;

const settings = {
  base: defineRoute("/settings" as const),
  // Notification preferences; the notification feed is notifications.base.
  notifications: defineRoute("/settings/notifications" as const),
  subscription: defineRoute("/settings/subscription" as const),
} as const;

const workspaces = {
  create: defineRoute("/workspaces/create" as const),
} as const;

export const RouteConstants = {
  auth,
  onboarding,
  overview,
  inquiries,
  portals,
  calendar,
  earnings,
  templates,
  notifications,
  settings,
  workspaces,
} as const;
