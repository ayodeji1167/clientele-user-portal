import { Flex, Span, Stack, Text } from "@chakra-ui/react";
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
      <Stack gap="0.4rem" minW="0">
        <Flex align="center" gap="0.625rem" minW="0">
          <Text
            textStyle={"p2"}
            color="text.primary"
            fontWeight={500}
            truncate
            title={title}
          >
            {title}
          </Text>
          <StatusBadge
            tone={badge.tone}
            h={"1.125rem"}
            textStyle={"p4"}
            fontWeight={"500"}
          >
            {badge.label}
          </StatusBadge>
        </Flex>
        <MetaLine color="text.secondary" wrap="nowrap">
          {meta.map((item) => (
            <Span textStyle={"p3"} key={item} truncate>
              {item}
            </Span>
          ))}
        </MetaLine>
      </Stack>
    </ListCard>
  );
}
