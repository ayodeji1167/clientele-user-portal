import { Field, Text } from "@chakra-ui/react";
import type { ReactNode } from "react";

type FormFieldProps = {
  label: string;
  required?: boolean;
  /** Adds a muted "(optional)" after the label. */
  optional?: boolean;
  disabled?: boolean;
  /** Shown (and marks the field invalid) when truthy. */
  error?: string | false;
  helperText?: ReactNode;
  children: ReactNode;
};

export function FormField({
  label,
  required,
  optional,
  disabled,
  error,
  helperText,
  children,
}: FormFieldProps) {
  return (
    <Field.Root
      required={required}
      disabled={disabled}
      invalid={Boolean(error)}
      gap="0.25rem"
    >
      <Field.Label
        fontSize="0.875rem"
        fontWeight="500"
        lineHeight="1.1"
        letterSpacing="-0.03em"
        color="text.primary"
        gap="0.25rem"
        _disabled={{ opacity: 1, color: "text.subtle" }}
      >
        {label}
        {optional && (
          <Text as="span" fontWeight="400" color="text.muted">
            (optional)
          </Text>
        )}
        <Field.RequiredIndicator
          color="error.500"
          fontSize="0.625rem"
          fontWeight="400"
          alignSelf="flex-start"
        />
      </Field.Label>
      {children}
      {error ? (
        <Field.ErrorText fontSize="0.875rem" color="text.error">
          {error}
        </Field.ErrorText>
      ) : (
        helperText && (
          <Field.HelperText fontSize="0.875rem" color="text.tertiary">
            {helperText}
          </Field.HelperText>
        )
      )}
    </Field.Root>
  );
}
