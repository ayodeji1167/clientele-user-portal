import type { IconProps } from "@chakra-ui/react";
import type { ComponentType } from "react";
import {
  CalendarIcon,
  DocumentIcon,
  EarningsIcon,
  OverviewIcon,
  PortalIcon,
  TemplateIcon,
} from "@/components/icons";
import { RouteConstants } from "@/shared/constants/routes";

export type SideBarItem = {
  name: string;
  icon: ComponentType<IconProps>;
  href: string;
  paths: string[];
  /** Key into the workspace's unread counts; shows a red dot when > 0. */
  unreadKey?: "inquiries";
};

export const sideBarItems: SideBarItem[] = [
  {
    name: "Overview",
    icon: OverviewIcon,
    href: RouteConstants.overview.base.path,
    paths: [RouteConstants.overview.base.path],
  },
  {
    name: "Inquiries",
    icon: DocumentIcon,
    href: RouteConstants.inquiries.base.path,
    paths: [RouteConstants.inquiries.base.path],
    unreadKey: "inquiries",
  },
  {
    name: "Portals",
    icon: PortalIcon,
    href: RouteConstants.portals.base.path,
    paths: [RouteConstants.portals.base.path],
  },
  {
    name: "Calendar",
    icon: CalendarIcon,
    href: RouteConstants.calendar.base.path,
    paths: [RouteConstants.calendar.base.path],
  },
  {
    name: "Earnings",
    icon: EarningsIcon,
    href: RouteConstants.earnings.base.path,
    paths: [RouteConstants.earnings.base.path],
  },
  {
    name: "Templates",
    icon: TemplateIcon,
    href: RouteConstants.templates.base.path,
    paths: [RouteConstants.templates.base.path],
  },
];
