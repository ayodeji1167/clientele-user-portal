import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  // Backend the dev/preview server proxies `/api` to. Defaults to the local
  // backend; override with VITE_PROXY_TARGET to point at staging, etc.
  const proxyTarget = env.VITE_PROXY_TARGET || "http://localhost:8080";
  // Same-origin proxy: the browser only ever talks to this Vite server, which
  // forwards /api server-side to the backend — so CORS never applies.
  const apiProxy = {
    "/api": { target: proxyTarget, changeOrigin: true, secure: false },
  };

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    server: {
      port: 3000,
      host: true,
      allowedHosts: true,
      proxy: apiProxy,
    },
    preview: {
      port: 4173,
      host: true,
      allowedHosts: true,
      proxy: apiProxy,
    },
  };
});
