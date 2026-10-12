export type User = {
  id: string;
  fullName: string;
  email: string;
  emailVerified: boolean;
};

/** Every auth endpoint that signs the user in returns this. */
export type AuthSession = {
  token: string;
  user: User;
};

export type LoginPayload = { email: string; password: string };

export type RegisterPayload = {
  fullName: string;
  email: string;
  password: string;
};

export type VerifyEmailPayload = { email: string; code: string };

export type EmailPayload = { email: string };

export type ResetPasswordPayload = { token: string; password: string };

export type OAuthProvider = "google" | "apple";
