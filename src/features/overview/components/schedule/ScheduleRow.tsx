import { Flex, Stack, Text } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { MetaLine, StatusBadge, type StatusTone } from "@/components/common";
import { DateBlock } from "../shared/DateBlock";
import { ListCard } from "../shared/ListCard";

type ScheduleRowProps = {
  date: string;
  title: string;
  badge: { label: string; tone: StatusTone };
  meta: string[];
  actions: ReactNode;
};

/** Shared row for upcoming deadlines and meetings: date tile, title, badge. */
export function ScheduleRow({
  date,
  title,
  badge,
  meta,
  actions,
}: ScheduleRowProps) {
  return (
    <ListCard py="0.6875rem" actions={actions}>
      <DateBlock iso={date} />
      <Stack gap="0.125rem" minW="0">
        <Flex align="center" gap="0.625rem" minW="0">
          <Text fontSize="1rem" color="text.primary" truncate title={title}>
            {title}
          </Text>
          <StatusBadge tone={badge.tone}>{badge.label}</StatusBadge>
        </Flex>
        <MetaLine fontSize="0.875rem" color="text.tertiary" wrap="nowrap">
          {meta.map((item) => (
            <Text as="span" key={item} truncate>
              {item}
            </Text>
          ))}
        </MetaLine>
      </Stack>
    </ListCard>
  );
}
