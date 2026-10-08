import { Outlet } from "react-router-dom";

/** Root layout shell — global concerns (analytics, modals, etc.) live here. */
export function BaseApp() {
  return <Outlet />;
}
