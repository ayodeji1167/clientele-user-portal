import { Box, chakra, Flex, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MetaLine, StatusBadge, UserAvatar } from "@/components/common";
import { timeAgo } from "@/utils/time";
import type { AppNotification } from "../interface";
import { notificationHref } from "../utils/link";
import { STATUS_BADGES } from "../utils/status";

type NotificationRowProps = {
  notification: AppNotification;
  now: number;
  onOpen: (notification: AppNotification) => void;
};

export function NotificationRow({
  notification,
  now,
  onOpen,
}: NotificationRowProps) {
  const { client, status, summary, details, isRead, createdAt } = notification;
  const badge = status ? STATUS_BADGES[status] : undefined;

  return (
    <chakra.a
      asChild
      display="flex"
      gap="0.625rem"
      px="0.75rem"
      pt="0.6875rem"
      pb="0.5625rem"
      bg="bg.secondary"
      borderWidth="0.0625rem"
      borderColor="border.secondary"
      borderRadius="1rem"
      transition="border-color 0.15s"
      _hover={{ borderColor: "border.primary" }}
      _focusVisible={{ outline: "none", boxShadow: "ring.focusNeutral" }}
    >
      <Link
        to={notificationHref(notification)}
        onClick={() => onOpen(notification)}
      >
        <UserAvatar
          name={client.name}
          src={client.avatarUrl}
          size="2rem"
          avatarFallBackProps={{ textStyle: "p3" }}
        />

        <Stack gap="0" flex="1" minW="0">
          <Flex align="center" gap="0.5rem" minW="0" minH="1.125rem">
            <Text
              textStyle="p2"
              fontWeight="500"
              letterSpacing="-0.015em"
              color="text.primary"
              truncate
            >
              {client.name}
            </Text>
            {badge && (
              <StatusBadge
                tone={badge.tone}
                {...(badge.color && { color: badge.color })}
              >
                {badge.label}
              </StatusBadge>
            )}
          </Flex>
          <MetaLine
            mt="0.5rem"
            textStyle="p2"
            fontWeight="300"
            color="text.secondary"
            dotColor="neutral.400"
          >
            {summary.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </MetaLine>
          <MetaLine
            mt="0.0625rem"
            textStyle="p3"
            fontWeight="300"
            color="text.muted"
            dotColor="neutral.400"
          >
            {details.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </MetaLine>
        </Stack>

        <Flex
          direction="column"
          justify="space-between"
          align="flex-end"
          flexShrink={0}
        >
          {isRead ? (
            <span />
          ) : (
            <Box
              as="span"
              role="img"
              aria-label="Unread"
              boxSize="0.375rem"
              borderRadius="full"
              bg="error.600"
            />
          )}
          <Text asChild textStyle="p4" color="text.subtle" whiteSpace="nowrap">
            <time dateTime={createdAt}>{timeAgo(createdAt, now)}</time>
          </Text>
        </Flex>
      </Link>
    </chakra.a>
  );
}
