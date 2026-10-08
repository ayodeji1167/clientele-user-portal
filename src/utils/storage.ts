import { storageKeys } from "@/shared/constants/storage";

export function getStoredToken(): string | null {
  try {
    return localStorage.getItem(storageKeys.token);
  } catch {
    return null;
  }
}

export function setStoredToken(token: string) {
  try {
    localStorage.setItem(storageKeys.token, token);
  } catch {
    // Storage unavailable (private mode) — session simply won't persist.
  }
}

export function clearStoredToken() {
  try {
    localStorage.removeItem(storageKeys.token);
  } catch {
    // Nothing to clear.
  }
}
