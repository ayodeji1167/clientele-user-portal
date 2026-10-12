import { useMutation, useQuery, useQueryClient } from "@/lib/react-query";
import { queryKey } from "@/shared/constants/query-keys";
import {
  clearStoredToken,
  getStoredToken,
  setStoredToken,
} from "@/utils/storage";
import type { AuthSession } from "../types";
import { authApi } from "./auth.api";

const meKey = [queryKey.auth.me];

function useStartSession() {
  const queryClient = useQueryClient();
  return (session: AuthSession) => {
    setStoredToken(session.token);
    queryClient.setQueryData(meKey, session.user);
  };
}

export function useCurrentUser() {
  return useQuery({
    queryKey: meKey,
    queryFn: authApi.getMe,
    enabled: Boolean(getStoredToken()),
  });
}

export function useLogin() {
  const startSession = useStartSession();
  return useMutation({ mutationFn: authApi.login, onSuccess: startSession });
}

export function useRegister() {
  return useMutation({ mutationFn: authApi.register });
}

export function useVerifyEmail() {
  const startSession = useStartSession();
  return useMutation({
    mutationFn: authApi.verifyEmail,
    onSuccess: startSession,
  });
}

export function useResendVerification() {
  return useMutation({
    mutationFn: authApi.resendVerification,
    meta: { successMessage: "We sent a new code to your email" },
  });
}

export function useRequestMagicLink() {
  return useMutation({ mutationFn: authApi.requestMagicLink });
}

export function useVerifyMagicLink() {
  const startSession = useStartSession();
  return useMutation({
    mutationFn: authApi.verifyMagicLink,
    onSuccess: startSession,
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: authApi.forgotPassword,
    meta: { successMessage: "Check your email for a reset link" },
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: authApi.resetPassword,
    meta: {
      successMessage: "Password updated. Sign in with your new password",
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return () => {
    clearStoredToken();
    queryClient.clear();
  };
}
