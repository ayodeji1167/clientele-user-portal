import { chakra, Menu, Portal } from "@chakra-ui/react";
import { ChevronDownIcon } from "@/components/icons";
import { dropdownItem, dropdownPanel } from "@/components/input/styles";
import type { StatPeriod } from "../../interface";

const PERIOD_LABELS: Record<StatPeriod, string> = {
  today: "Today",
  this_week: "This week",
  this_month: "This month",
  last_month: "Last month",
};

const periods = Object.keys(PERIOD_LABELS) as StatPeriod[];

type PeriodMenuProps = {
  value: StatPeriod;
  onChange: (period: StatPeriod) => void;
  /** Names the menu for screen readers, e.g. "Unread inquiries period". */
  label: string;
};

export function PeriodMenu({ value, onChange, label }: PeriodMenuProps) {
  return (
    <Menu.Root
      positioning={{ placement: "bottom-start", gutter: 4 }}
      onSelect={(details) => onChange(details.value as StatPeriod)}
    >
      <Menu.Trigger asChild>
        <chakra.button
          aria-label={`${label}: ${PERIOD_LABELS[value]}`}
          display="inline-flex"
          alignItems="center"
          gap="0.375rem"
          h="1.8125rem"
          ps="0.625rem"
          pe="0.5rem"
          borderWidth="0.0625rem"
          borderColor="border.primary"
          borderRadius="full"
          fontSize="0.9375rem"
          color="text.secondary"
          cursor="pointer"
          _hover={{ bg: "bg.primary" }}
          _expanded={{ bg: "bg.primary" }}
          _focusVisible={{ outline: "none", boxShadow: "ring.focusNeutral" }}
        >
          {PERIOD_LABELS[value]}
          <ChevronDownIcon boxSize="1rem" />
        </chakra.button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content css={dropdownPanel} minW="8.125rem">
            {periods.map((period) => (
              <Menu.Item
                key={period}
                value={period}
                css={
                  period === value
                    ? {
                        ...dropdownItem,
                        color: "text.primary",
                        fontWeight: "500",
                      }
                    : dropdownItem
                }
              >
                {PERIOD_LABELS[period]}
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
