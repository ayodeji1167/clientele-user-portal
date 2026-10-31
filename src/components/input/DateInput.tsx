import {
  DatePicker,
  parseDate,
  Portal,
  type SystemStyleObject,
} from "@chakra-ui/react";
import { CalendarIcon } from "@/components/icons";
import { fieldSurface } from "./styles";

type DateInputProps = {
  /** "YYYY-MM-DD", or "" when empty. */
  value: string;
  onChange: (value: string) => void;
  /** Earliest selectable day, "YYYY-MM-DD". */
  min?: string;
  name?: string;
  invalid?: boolean;
  disabled?: boolean;
  portalled?: boolean;
  placeholder?: string;
  /** Field height; defaults to the form size. */
  h?: string;
  /** Overrides merged into the field surface (e.g. text style). */
  inputCss?: SystemStyleObject;
};

/** Day/month/year field (DD/MM/YYYY) with a calendar popover. */
export function DateInput({
  value,
  onChange,
  min,
  name,
  invalid,
  disabled,
  portalled = true,
  placeholder = "DD/MM/YYYY",
  h = "2.5rem",
  inputCss,
}: DateInputProps) {
  const content = (
    <DatePicker.Positioner>
      <DatePicker.Content>
        <DatePicker.View view="day">
          <DatePicker.Header />
          <DatePicker.DayTable />
        </DatePicker.View>
        <DatePicker.View view="month">
          <DatePicker.Header />
          <DatePicker.MonthTable />
        </DatePicker.View>
        <DatePicker.View view="year">
          <DatePicker.Header />
          <DatePicker.YearTable />
        </DatePicker.View>
      </DatePicker.Content>
    </DatePicker.Positioner>
  );

  return (
    <DatePicker.Root
      locale="en-GB"
      name={name}
      invalid={invalid}
      disabled={disabled}
      value={value ? [parseDate(value)] : []}
      min={min ? parseDate(min) : undefined}
      onValueChange={(details) => onChange(details.value[0]?.toString() ?? "")}
      positioning={{ placement: "bottom-end", gutter: 4 }}
    >
      <DatePicker.Control position="relative">
        <DatePicker.Input
          placeholder={placeholder}
          h={h}
          px="0.75rem"
          pe="2.75rem"
          css={{ ...fieldSurface, ...inputCss }}
        />
        <DatePicker.IndicatorGroup
          position="absolute"
          insetEnd="0.75rem"
          top="50%"
          transform="translateY(-50%)"
        >
          <DatePicker.Trigger
            aria-label="Open calendar"
            color="text.tertiary"
            _hover={{ color: "text.primary" }}
            cursor="pointer"
          >
            <CalendarIcon />
          </DatePicker.Trigger>
        </DatePicker.IndicatorGroup>
      </DatePicker.Control>
      {portalled ? <Portal>{content}</Portal> : content}
    </DatePicker.Root>
  );
}
