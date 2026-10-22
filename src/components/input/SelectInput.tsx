import { createListCollection, Portal, Select } from "@chakra-ui/react";
import { useMemo } from "react";
import { ChevronDownIcon } from "@/components/icons";
import { dropdownItem, dropdownPanel, fieldSurface } from "./styles";

export type SelectOption = { label: string; value: string };

type SelectInputProps = {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  name?: string;
  invalid?: boolean;
  disabled?: boolean;
  /** Inside a dialog the menu must render in place, not in a body portal. */
  portalled?: boolean;
};

export function SelectInput({
  options,
  value,
  onChange,
  placeholder,
  name,
  invalid,
  disabled,
  portalled = true,
}: SelectInputProps) {
  const collection = useMemo(
    () => createListCollection({ items: options }),
    [options],
  );

  const content = (
    <Select.Positioner>
      <Select.Content css={dropdownPanel} maxH="15rem" overflowY="auto">
        {options.map((option) => (
          <Select.Item key={option.value} item={option} css={dropdownItem}>
            {option.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Positioner>
  );

  return (
    <Select.Root
      collection={collection}
      value={value ? [value] : []}
      onValueChange={(details) => onChange(details.value[0] ?? "")}
      name={name}
      invalid={invalid}
      disabled={disabled}
      positioning={{ sameWidth: true, gutter: 4 }}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger h="2.5rem" px="0.75rem" css={fieldSurface}>
          <Select.ValueText placeholder={placeholder} />
        </Select.Trigger>
        <Select.IndicatorGroup pe="0.75rem">
          <ChevronDownIcon color="text.tertiary" />
        </Select.IndicatorGroup>
      </Select.Control>
      {portalled ? <Portal>{content}</Portal> : content}
    </Select.Root>
  );
}
