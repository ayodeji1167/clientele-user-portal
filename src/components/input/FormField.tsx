import { Field } from "@chakra-ui/react";
import type { ReactNode } from "react";

type FormFieldProps = {
  label: string;
  required?: boolean;
  disabled?: boolean;
  /** Shown (and marks the field invalid) when truthy. */
  error?: string | false;
  helperText?: ReactNode;
  children: ReactNode;
};

export function FormField({
  label,
  required,
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
      gap="4px"
    >
      <Field.Label
        fontSize="14px"
        fontWeight="500"
        lineHeight="1.1"
        letterSpacing="-0.03em"
        color="text.primary"
        gap="4px"
        _disabled={{ opacity: 1, color: "text.muted" }}
      >
        {label}
        <Field.RequiredIndicator
          color="error.500"
          fontSize="10px"
          fontWeight="400"
          alignSelf="flex-start"
        />
      </Field.Label>
      {children}
      {error ? (
        <Field.ErrorText fontSize="14px" color="text.error">
          {error}
        </Field.ErrorText>
      ) : (
        helperText && (
          <Field.HelperText fontSize="14px" color="text.tertiary">
            {helperText}
          </Field.HelperText>
        )
      )}
    </Field.Root>
  );
}
