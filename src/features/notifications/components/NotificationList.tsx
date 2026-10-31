import { Skeleton, Stack, Text } from "@chakra-ui/react";
import { useNow } from "@/hooks/useNow";
import { useMarkNotificationReadMutation } from "../api";
import type { AppNotification } from "../interface";
import { NotificationRow } from "./NotificationRow";

type NotificationListProps = {
  id: string;
  notifications?: AppNotification[];
  isPending: boolean;
  /** A newer result is loading while the previous one stays on screen. */
  isRefreshing: boolean;
  emptyMessage: string;
};

export function NotificationList({
  id,
  notifications,
  isPending,
  isRefreshing,
  emptyMessage,
}: NotificationListProps) {
  const now = useNow(60_000);
  const { mutate: markRead } = useMarkNotificationReadMutation();

  if (isPending) {
    return (
      <Stack id={id} role="tabpanel" gap="0.375rem" aria-busy>
        {Array.from({ length: 6 }, (_, i) => (
          <Skeleton key={i} h="5.125rem" borderRadius="1rem" />
        ))}
      </Stack>
    );
  }

  if (!notifications?.length) {
    return (
      <Text
        id={id}
        role="tabpanel"
        py="2.5rem"
        px="1rem"
        textAlign="center"
        textStyle="p3"
        color="text.muted"
        bg="bg.secondary"
        borderWidth="0.0625rem"
        borderColor="border.secondary"
        borderRadius="1rem"
      >
        {emptyMessage}
      </Text>
    );
  }

  return (
    <Stack
      id={id}
      role="tabpanel"
      as="ul"
      gap="0.375rem"
      listStyleType="none"
      opacity={isRefreshing ? 0.6 : 1}
      transition="opacity 0.15s"
      aria-busy={isRefreshing}
    >
      {notifications.map((notification) => (
        <li key={notification.id}>
          <NotificationRow
            notification={notification}
            now={now}
            onOpen={(n) => !n.isRead && markRead(n.id)}
          />
        </li>
      ))}
    </Stack>
  );
}
