import { Box, chakra, Flex } from "@chakra-ui/react";
import type { NotificationCounts, NotificationTab } from "../interface";
import { CATEGORY_LABELS, TABS } from "../utils/filters";

type NotificationTabsProps = {
  value: NotificationTab;
  onChange: (tab: NotificationTab) => void;
  counts?: NotificationCounts;
  /** id of the list the tabs control. */
  controls: string;
};

/** Pill chips: "Unread ③", "Inquiries (12)", … */
export function NotificationTabs({
  value,
  onChange,
  counts,
  controls,
}: NotificationTabsProps) {
  return (
    <Flex
      role="tablist"
      aria-label="Notification type"
      wrap="wrap"
      gap="0.4375rem"
    >
      {TABS.map((tab) => {
        const selected = tab === value;
        const count = counts?.[tab];

        return (
          <chakra.button
            key={tab}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls={controls}
            onClick={() => onChange(tab)}
            display="inline-flex"
            alignItems="center"
            gap="0.375rem"
            h="1.6875rem"
            px="0.75rem"
            borderWidth="0.0625rem"
            borderRadius="full"
            textStyle="p3"
            letterSpacing="-0.015em"
            whiteSpace="nowrap"
            cursor="pointer"
            transition="background 0.15s, border-color 0.15s"
            borderColor={selected ? "westar.950" : "neutral.400/75"}
            bg={selected ? "westar.50" : "transparent"}
            color={selected ? "westar.950" : "text.muted"}
            fontWeight={selected ? "500" : "400"}
            _hover={selected ? undefined : { bg: "bg.tertiary" }}
            _focusVisible={{ outline: "none", boxShadow: "ring.focusNeutral" }}
          >
            {tab === "unread" ? (
              <>
                Unread
                {count ? (
                  <Box
                    as="span"
                    display="inline-flex"
                    alignItems="center"
                    justifyContent="center"
                    minW="1rem"
                    h="1rem"
                    px="0.25rem"
                    borderRadius="full"
                    bg="error.700"
                    color="white"
                    textStyle="p4"
                    fontWeight="500"
                    letterSpacing="0"
                    fontVariantNumeric="tabular-nums"
                  >
                    {count > 99 ? "99+" : count}
                  </Box>
                ) : null}
              </>
            ) : (
              `${CATEGORY_LABELS[tab]}${count === undefined ? "" : ` (${count})`}`
            )}
          </chakra.button>
        );
      })}
    </Flex>
  );
}
