import { chakra, Flex, Skeleton, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "@/components/icons";
import { useGetOverviewStatQuery } from "../../api";
import type { OverviewStat, StatKey, StatPeriod } from "../../interface";
import { formatCount, formatMoney } from "../../utils/format";
import { PeriodMenu } from "./PeriodMenu";

type StatCardProps = {
  statKey: StatKey;
  label: string;
  defaultPeriod: StatPeriod;
  hidden: boolean;
  onToggleHidden: () => void;
};

function display(stat: OverviewStat) {
  return stat.currency
    ? formatMoney(stat.value, stat.currency)
    : formatCount(stat.value);
}

export function StatCard({
  statKey,
  label,
  defaultPeriod,
  hidden,
  onToggleHidden,
}: StatCardProps) {
  const [period, setPeriod] = useState(defaultPeriod);
  const { data: stat, isPending } = useGetOverviewStatQuery(statKey, period);

  return (
    <Stack
      justify="space-between"
      minH="10.75rem"
      bg="bg.secondary"
      borderRadius="1rem"
      px="1rem"
      pt="1rem"
      pb="0.75rem"
    >
      <Stack gap="2.25rem">
        <Text
          fontSize="0.875rem"
          fontWeight="600"
          lineHeight="1.1"
          letterSpacing="-0.015em"
          textTransform="uppercase"
          color="text.subtle"
        >
          {label}
        </Text>
        <Skeleton loading={isPending} w="fit-content" minW="4rem">
          <Text
            fontSize="2rem"
            fontWeight="600"
            lineHeight="1"
            letterSpacing="-0.03em"
            color="text.primary"
            fontVariantNumeric="tabular-nums"
            aria-live="polite"
          >
            {stat ? (hidden ? "••••" : display(stat)) : "—"}
          </Text>
        </Skeleton>
      </Stack>

      <Flex align="center" justify="space-between" mt="1.5rem">
        <PeriodMenu value={period} onChange={setPeriod} label={label} />
        <chakra.button
          onClick={onToggleHidden}
          aria-label={hidden ? `Show ${label}` : `Hide ${label}`}
          aria-pressed={hidden}
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxSize="1.75rem"
          borderRadius="0.375rem"
          color="text.secondary"
          cursor="pointer"
          _hover={{ bg: "bg.primary" }}
          _focusVisible={{ outline: "none", boxShadow: "ring.focusNeutral" }}
        >
          {hidden ? <EyeIcon /> : <EyeOffIcon />}
        </chakra.button>
      </Flex>
    </Stack>
  );
}
