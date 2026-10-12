import type { FormikProps } from "formik";

/**
 * The field's validation message, once the form has been submitted.
 * Showing errors on blur instead would insert messages above the submit
 * button mid-click, shifting it out from under the cursor.
 */
export function fieldError<T>(
  formik: FormikProps<T>,
  name: keyof T & string,
): string | undefined {
  const error = formik.errors[name];
  return formik.submitCount > 0 && typeof error === "string"
    ? error
    : undefined;
}
