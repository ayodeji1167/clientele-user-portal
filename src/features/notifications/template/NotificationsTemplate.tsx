import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PAGE_PADDING_X } from "@/components/layouts/constants";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import {
  useGetNotificationCountsQuery,
  useGetNotificationsQuery,
} from "../api";
import { NotificationFilters } from "../components/NotificationFilters";
import { NotificationList } from "../components/NotificationList";
import { NotificationTabs } from "../components/NotificationTabs";
import type { NotificationTab } from "../interface";
import { CATEGORY_LABELS, DEFAULT_FILTER, isTab } from "../utils/filters";

const LIST_ID = "notification-list";

export function NotificationsTemplate() {
  // The tab lives in the URL (?tab=reminders) so it survives reloads and can
  // be linked to; the narrower filters reset with each visit.
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");
  const tab: NotificationTab = isTab(tabParam) ? tabParam : "unread";

  const [filter, setFilter] = useState(DEFAULT_FILTER);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const debouncedSearch = useDebouncedValue(search);

  const { data: counts } = useGetNotificationCountsQuery();
  const { data, isPending, isPlaceholderData, isFetching } =
    useGetNotificationsQuery({ tab, filter, search: debouncedSearch, date });

  const changeTab = (next: NotificationTab) => {
    setFilter(DEFAULT_FILTER);
    setSearchParams(next === "unread" ? {} : { tab: next }, { replace: true });
  };

  const filtered = filter !== DEFAULT_FILTER || debouncedSearch.trim() || date;
  const emptyMessage = filtered
    ? "No notifications match your filters."
    : tab === "unread"
      ? "You’re all caught up."
      : `No ${CATEGORY_LABELS[tab].toLowerCase()} notifications yet.`;

  return (
    <Box px={PAGE_PADDING_X} pb="4rem">
      <Stack gap="0" maxW={{ base: "full", xl: "50.25rem" }}>
        <Stack gap="0.25rem">
          <Heading as="h1" textStyle="h4" fontWeight="600" color="text.primary">
            Notifications
          </Heading>
          <Text textStyle="p2" letterSpacing="-0.015em" color="text.secondary">
            Stay up to date on your client activity, project updates, and
            payments.
          </Text>
        </Stack>

        <Stack gap="0.9375rem" mt="2.1875rem" mb="2.125rem">
          <NotificationTabs
            value={tab}
            onChange={changeTab}
            counts={counts}
            controls={LIST_ID}
          />
          <NotificationFilters
            tab={tab}
            search={search}
            onSearchChange={setSearch}
            date={date}
            onDateChange={setDate}
            filter={filter}
            onFilterChange={setFilter}
          />
        </Stack>

        <NotificationList
          id={LIST_ID}
          notifications={data}
          isPending={isPending}
          isRefreshing={isPlaceholderData && isFetching}
          emptyMessage={emptyMessage}
        />
      </Stack>
    </Box>
  );
}
