import { type RouteObject } from "react-router-dom";
import { BaseApp } from "./BaseApp";
import { NotFound, RouteError } from "@/components/error";
import { GuestOnly, RequireAuth } from "@/components/hoc";
import {
  authCallbackRoutes,
  guestAuthRoutes,
  protectedAuthRoutes,
} from "@/features/auth/routes";

export const RoutesList: RouteObject[] = [
  {
    path: "",
    element: <BaseApp />,
    errorElement: <RouteError />,
    children: [
      {
        element: <GuestOnly />,
        children: guestAuthRoutes,
      },
      ...authCallbackRoutes,
      {
        element: <RequireAuth />,
        children: [
          {
            index: true,
            lazy: () =>
              import("@/features/dashboard/pages/HomePage").then((m) => ({
                Component: m.HomePage,
              })),
          },
          ...protectedAuthRoutes,
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
