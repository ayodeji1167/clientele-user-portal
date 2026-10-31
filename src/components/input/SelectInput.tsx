import {
  createListCollection,
  Portal,
  Select,
  type SystemStyleObject,
} from "@chakra-ui/react";
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
  /** Field height; defaults to the form size. */
  h?: string;
  /** Size the field to its selected label instead of filling the row. */
  fitContent?: boolean;
  /** Overrides merged into the field surface (e.g. text style). */
  triggerCss?: SystemStyleObject;
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
  h = "2.5rem",
  fitContent = false,
  triggerCss,
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
      positioning={{ sameWidth: !fitContent, gutter: 4 }}
      w={fitContent ? "auto" : undefined}
      flexShrink={fitContent ? 0 : undefined}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger
          h={h}
          minH={h}
          px="0.75rem"
          pe={fitContent ? "2.25rem" : undefined}
          css={{ ...fieldSurface, ...triggerCss }}
        >
          <Select.ValueText
            placeholder={placeholder}
            // The recipe's 80% max width and one-line clamp have nothing to
            // resolve against in a content-sized field, which then collapses
            // to "All…".
            css={
              fitContent
                ? {
                    display: "block",
                    maxW: "none",
                    WebkitLineClamp: "unset",
                    whiteSpace: "nowrap",
                  }
                : undefined
            }
          />
        </Select.Trigger>
        <Select.IndicatorGroup pe="0.75rem">
          <ChevronDownIcon color="text.tertiary" />
        </Select.IndicatorGroup>
      </Select.Control>
      {portalled ? <Portal>{content}</Portal> : content}
    </Select.Root>
  );
}
