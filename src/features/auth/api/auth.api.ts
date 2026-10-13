import { axios } from "@/lib/axios";
import { env } from "@/shared/constants/env";
import type {
  AuthSession,
  EmailPayload,
  LoginPayload,
  OAuthProvider,
  SignupPayload,
  ResetPasswordPayload,
  User,
  VerifyEmailPayload,
} from "../interface";

// Assumed backend contract — the backend doesn't exist yet. Responses are
// wrapped as { message, data }, matching what utils/handle-error expects.
type ApiResponse<T> = { message: string; data: T };

async function post<T>(url: string, body: unknown): Promise<T> {
  const res = await axios.post<ApiResponse<T>>(url, body);
  return res.data.data;
}

export const authApi = {
  login: (payload: LoginPayload) => post<AuthSession>("/auth/login", payload),

  /** Creates the account and emails a 6-digit verification code. */
  signup: (payload: SignupPayload) => post<null>("/auth/signup", payload),

  verifyEmail: (payload: VerifyEmailPayload) =>
    post<AuthSession>("/auth/verify-email", payload),

  resendVerification: (payload: EmailPayload) =>
    post<null>("/auth/verify-email/resend", payload),

  /** Emails a one-time sign-in link pointing at /auth/magic-link?token=… */
  requestMagicLink: (payload: EmailPayload) =>
    post<null>("/auth/magic-link", payload),

  verifyMagicLink: (token: string) =>
    post<AuthSession>("/auth/magic-link/verify", { token }),

  /** Emails a reset link pointing at /reset-password?token=… */
  forgotPassword: (payload: EmailPayload) =>
    post<null>("/auth/forgot-password", payload),

  resetPassword: (payload: ResetPasswordPayload) =>
    post<null>("/auth/reset-password", payload),

  getMe: async () => {
    const res = await axios.get<ApiResponse<User>>("/auth/me");
    return res.data.data;
  },

  /**
   * OAuth is a full-page redirect: the backend runs the provider flow and
   * sends the browser back to /auth/callback?token=… (or ?error=…).
   */
  oauthUrl: (provider: OAuthProvider) =>
    `${env.API_BASE_URL}/auth/oauth/${provider}`,
};
