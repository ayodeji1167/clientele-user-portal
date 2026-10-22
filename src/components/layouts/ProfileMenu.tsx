import { Box, Flex, Menu, Portal, Stack, Text } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { UserAvatar } from "@/components/common";
import {
  ArrowUpCircleIcon,
  BellIcon,
  PlusCircleIcon,
  SettingsIcon,
  WithUnreadDot,
} from "@/components/icons";
import { useLogout } from "@/features/auth/api/auth.hooks";
import type { WorkspaceSummary } from "@/features/workspace/interface";
import { RouteConstants } from "@/shared/constants/routes";

const itemStyles = {
  gap: "0.5rem",
  px: "1rem",
  py: "0.5rem",
  fontSize: "1rem",
  color: "text.secondary",
  borderRadius: "0",
  cursor: "pointer",
  _highlighted: { bg: "bg.primary" },
} as const;

type ProfileMenuProps = {
  workspace: WorkspaceSummary;
  /** The element that opens the menu (the sidebar's workspace header). */
  children: ReactNode;
};

export function ProfileMenu({ workspace, children }: ProfileMenuProps) {
  const navigate = useNavigate();
  const logout = useLogout();
  const { member, plan, unread } = workspace;

  return (
    <Menu.Root
      positioning={{ placement: "bottom-start", gutter: 4 }}
      onSelect={({ value }) => {
        if (value === "logout") {
          logout();
          navigate(RouteConstants.auth.login.path, { replace: true });
          return;
        }
        navigate(value);
      }}
    >
      <Menu.Trigger asChild>{children}</Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content
            w="15.375rem"
            p="0"
            py="0.25rem"
            borderRadius="0.75rem"
            boxShadow="large.2"
          >
            <Flex
              align="center"
              gap="0.5rem"
              px="1rem"
              pt="0.5rem"
              pb="0.75rem"
            >
              <UserAvatar
                name={member.fullName}
                src={member.avatarUrl}
                size="2.5rem"
              />
              <Stack gap="0.125rem" minW="0">
                <Text
                  fontSize="1.0625rem"
                  fontWeight="600"
                  letterSpacing="-0.03em"
                  color="text.primary"
                  truncate
                >
                  {member.fullName}
                </Text>
                <Text fontSize="0.9375rem" color="text.muted">
                  {plan.name} plan
                </Text>
              </Stack>
            </Flex>

            {plan.canCreateWorkspaces && (
              <>
                <Menu.Separator borderColor="border.secondary" mx="0.5rem" />
                <Menu.Item
                  value={RouteConstants.workspaces.create.path}
                  {...itemStyles}
                  color="sandal.700"
                >
                  <PlusCircleIcon />
                  New workspace
                </Menu.Item>
              </>
            )}

            <Menu.Separator borderColor="border.secondary" mx="0.5rem" />
            <Menu.Item
              value={RouteConstants.settings.notifications.path}
              {...itemStyles}
            >
              <WithUnreadDot show={unread.notifications > 0}>
                <BellIcon />
              </WithUnreadDot>
              Notifications
            </Menu.Item>
            <Menu.Item
              value={RouteConstants.settings.base.path}
              {...itemStyles}
            >
              <SettingsIcon />
              Settings
            </Menu.Item>
            <Menu.Item
              value={RouteConstants.settings.subscription.path}
              {...itemStyles}
            >
              <ArrowUpCircleIcon />
              Manage subscription
            </Menu.Item>

            <Menu.Separator borderColor="border.secondary" mx="0.5rem" />
            <Menu.Item value="logout" {...itemStyles} color="error.600">
              <Box as="span">Log out</Box>
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
