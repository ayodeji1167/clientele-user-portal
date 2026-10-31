import { Box, chakra, Flex, Skeleton, Stack, Text } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { UserAvatar } from "@/components/common";
import { useGetWorkspaceSummaryQuery } from "@/features/workspace/api";
import { RouteConstants } from "@/shared/constants/routes";
import { sideBarItems } from "@/shared/data/sidebar";
import { matchPath } from "@/utils/navigation";
import { PlanCard } from "./PlanCard";
import { ProfileMenu } from "./ProfileMenu";

function SectionLabel({ children }: { children: string }) {
  return (
    <Text
      px="1rem"
      textStyle="p4"
      fontWeight="600"
      textTransform="uppercase"
      color="neutral.400"
    >
      {children}
    </Text>
  );
}

type SideBarProps = {
  /** Called after any navigation, so the mobile drawer can close. */
  onNavigate?: () => void;
};

export function SideBar({ onNavigate }: SideBarProps) {
  const { pathname } = useLocation();
  const { data: workspace } = useGetWorkspaceSummaryQuery();

  return (
    <Flex
      as="nav"
      aria-label="Main"
      direction="column"
      w="14.375rem"
      h="full"
      bg="bg.secondary"
      borderRightWidth="0.0625rem"
      borderColor="border.secondary"
      overflowY="auto"
      overscrollBehavior="contain"
      css={{
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
      }}
      pt="1.75rem"
      pb="1rem"
    >
      {workspace ? (
        <ProfileMenu workspace={workspace}>
          <chakra.button
            display="flex"
            alignItems="center"
            gap="0.5rem"
            mx="0.5rem"
            px="0.5rem"
            py="0"
            borderRadius="0.5rem"
            textAlign="start"
            cursor="pointer"
            _hover={{ bg: "bg.primary" }}
            _focusVisible={{ outline: "none", boxShadow: "ring.focusNeutral" }}
            // bg={"red"}
          >
            <UserAvatar
              name={workspace.name}
              src={workspace.avatarUrl}
              size="2.5rem"
            />
            <Stack
              gap="0"
              minW="0"
              // bg={"blue"}
              h={"100%"}
              justifyContent={"space-between"}
              py={".05rem"}
            >
              <Text
                // fontSize="1rem"
                // fontWeight="600"
                // letterSpacing="-0.03em"
                // color="text.primary"
                truncate
                textStyle={"p1"}
                fontWeight={"semibold"}
              >
                {workspace.name}
              </Text>
              <Text textStyle={"p3"} color="text.muted">
                {workspace.workspaceCount}{" "}
                {workspace.workspaceCount === 1 ? "workspace" : "workspaces"}
              </Text>
            </Stack>
          </chakra.button>
        </ProfileMenu>
      ) : (
        <Flex align="center" gap="0.5rem" px="1rem">
          <Skeleton boxSize="2.5rem" borderRadius="full" />
          <Skeleton h="1rem" w="6rem" />
        </Flex>
      )}

      <Stack gap="0.75rem" mt="2rem">
        <SectionLabel>Workspace</SectionLabel>
        <Stack gap="0.25rem" px="0.5rem">
          {sideBarItems.map((item) => {
            const active = matchPath(pathname, item.href, item.paths);
            const unread = item.unreadKey
              ? (workspace?.unread[item.unreadKey] ?? 0)
              : 0;

            return (
              <chakra.a
                key={item.name}
                asChild
                display="flex"
                alignItems="center"
                gap="0.5625rem"
                h="2.125rem"
                px="0.75rem"
                borderRadius="0.5rem"
                textStyle="p2"
                fontWeight={active ? "500" : "400"}
                color={active ? "neutral.800" : "text.muted"}
                bg={active ? "bg.tertiary" : "transparent"}
                _hover={{ bg: active ? "bg.tertiary" : "bg.primary" }}
                _focusVisible={{
                  outline: "none",
                  boxShadow: "ring.focusNeutral",
                }}
              >
                <Link
                  to={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={onNavigate}
                >
                  <item.icon color={active ? "neutral.800" : "neutral.400"} />
                  {item.name}
                  {unread > 0 && (
                    <Box
                      as="span"
                      aria-label={`${unread} unread`}
                      boxSize="0.375rem"
                      borderRadius="full"
                      bg="error.600"
                    />
                  )}
                </Link>
              </chakra.a>
            );
          })}
        </Stack>
      </Stack>

      {workspace && workspace.recents.length > 0 && (
        <Stack gap="0.375rem" mt="2.1875rem">
          <SectionLabel>Recents</SectionLabel>
          <Stack gap="0.25rem" px="0.5rem">
            {workspace.recents.map((client) => (
              <chakra.a
                key={client.id}
                asChild
                display="flex"
                alignItems="center"
                gap="0.375rem"
                h="2.3125rem"
                px="0.5rem"
                borderRadius="0.5rem"
                textStyle="p2"
                color="text.secondary"
                _hover={{ bg: "bg.primary" }}
                _focusVisible={{
                  outline: "none",
                  boxShadow: "ring.focusNeutral",
                }}
              >
                <Link
                  to={RouteConstants.portals.detail.generate({
                    id: client.portalId,
                  })}
                  onClick={onNavigate}
                >
                  <UserAvatar
                    name={client.name}
                    src={client.avatarUrl}
                    size="1.8125rem"
                  />
                  <Text as="span" truncate>
                    {client.name}
                  </Text>
                </Link>
              </chakra.a>
            ))}
          </Stack>
        </Stack>
      )}

      <Box mt="5.5rem" pt="0" px="1rem">
        {workspace && <PlanCard plan={workspace.plan} />}
      </Box>
    </Flex>
  );
}
