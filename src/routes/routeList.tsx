import { type RouteObject } from "react-router-dom";
import { BaseApp } from "./BaseApp";
import { NotFound, RouteError } from "@/components/error";

// Feature routes (e.g. auth, dashboard) get added as children here as the
// features are built.
export const RoutesList: RouteObject[] = [
  {
    path: "",
    element: <BaseApp />,
    errorElement: <RouteError />,
    children: [],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
