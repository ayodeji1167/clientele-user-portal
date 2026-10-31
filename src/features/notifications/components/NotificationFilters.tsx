import { Box, Flex } from "@chakra-ui/react";
import { useMemo } from "react";
import { SearchIcon } from "@/components/icons";
import { DateInput, SelectInput, TextInput } from "@/components/input";
import { fieldSurface } from "@/components/input/styles";
import type { NotificationTab } from "../interface";
import { TAB_FILTERS } from "../utils/filters";

// The filter row is a size down from form fields, with lighter placeholders.
const filterField = {
  textStyle: "p3",
  _placeholder: { color: "text.subtle" },
} as const;

type NotificationFiltersProps = {
  tab: NotificationTab;
  search: string;
  onSearchChange: (value: string) => void;
  date: string;
  onDateChange: (value: string) => void;
  filter: string;
  onFilterChange: (value: string) => void;
};

export function NotificationFilters({
  tab,
  search,
  onSearchChange,
  date,
  onDateChange,
  filter,
  onFilterChange,
}: NotificationFiltersProps) {
  const options = useMemo(
    () => TAB_FILTERS[tab].map(({ value, label }) => ({ value, label })),
    [tab],
  );

  return (
    <Flex wrap="wrap" gap="0.4375rem">
      <Box position="relative" w={{ base: "full", md: "21.875rem" }}>
        <SearchIcon
          position="absolute"
          left="0.75rem"
          top="50%"
          transform="translateY(-50%)"
          boxSize="1rem"
          color="text.subtle"
          pointerEvents="none"
          zIndex="1"
        />
        <TextInput
          type="search"
          aria-label="Search notifications"
          placeholder="Search clients, services, budgets..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          ps="2rem"
          css={{ ...fieldSurface, ...filterField }}
        />
      </Box>
      <Box w="8.4375rem">
        <DateInput
          value={date}
          onChange={onDateChange}
          placeholder="dd/mm/yyyy"
          h="2.25rem"
          inputCss={{ ...filterField, pe: "2.25rem" }}
        />
      </Box>
      <SelectInput
        options={options}
        value={filter}
        onChange={(value) => onFilterChange(value || options[0].value)}
        h="2.25rem"
        fitContent
        triggerCss={filterField}
      />
    </Flex>
  );
}
