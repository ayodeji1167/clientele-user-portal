import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import { RouteConstants } from "@/shared/constants/routes";
import { clearStoredToken, getStoredToken } from "@/utils/storage";

export function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = getStoredToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}

export function rejectErrorInterceptor(error: unknown) {
  return Promise.reject(error);
}

/**
 * A 401 on an authenticated request means the session expired or was
 * revoked. 401s on sign-in itself (wrong password) carry no token and are
 * left for the form to report.
 */
export function expiredSessionInterceptor(error: AxiosError) {
  if (error.response?.status === 401 && error.config?.headers?.Authorization) {
    clearStoredToken();
    window.location.replace(RouteConstants.auth.login.path);
  }
  return Promise.reject(error);
}
