import type { InternalAxiosRequestConfig } from "axios";
import { getStoredToken } from "@/utils/storage";

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
