import { type RouteObject } from "react-router-dom";
import { BaseApp } from "./BaseApp";
import { NotFound, RouteError } from "@/components/error";
import { RequireAuth } from "@/components/hoc";
import { AuthRoutes, OnboardingRouteList } from "../features/auth/routes";

const protectedRoutes: RouteObject = {
  element: <RequireAuth />,
  errorElement: <RouteError />,
  children: [
    {
      index: true,
      lazy: () =>
        import("@/features/dashboard/pages/HomePage").then((m) => ({
          Component: m.HomePage,
        })),
    },
    ...OnboardingRouteList,
  ],
};

export const RoutesList: RouteObject[] = [
  {
    path: "",
    element: <BaseApp />,
    errorElement: <RouteError />,
    children: [protectedRoutes, AuthRoutes],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
