import { Button, Stack } from "@chakra-ui/react";
import { useFormik } from "formik";
import { FormField, TextInput } from "@/components/input";
import { RouteConstants } from "@/shared/constants/routes";
import { fieldError } from "@/utils/form";
import { useForgotPassword } from "../api/auth.hooks";
import {
  AuthHeader,
  AuthLayout,
  AuthPrompt,
  AuthPromptLine,
  TextLink,
} from "../components";
import { emailSchema } from "../utils/validation";

export function ForgotPasswordPage() {
  const forgotPassword = useForgotPassword();

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: emailSchema,
    onSubmit: ({ email }) => forgotPassword.mutate({ email: email.trim() }),
  });

  return (
    <AuthLayout>
      <Stack gap="2rem">
        <AuthHeader
          title="Reset your password"
          subtitle="We’ll send a reset link to the email associated with your Clientele account"
        />

        <Stack gap="0.875rem">
          <form noValidate onSubmit={formik.handleSubmit}>
            <Stack gap="2rem">
              <FormField
                label="Email address"
                required
                error={fieldError(formik, "email")}
              >
                <TextInput
                  type="email"
                  autoComplete="email"
                  autoFocus
                  {...formik.getFieldProps("email")}
                />
              </FormField>

              <Button type="submit" w="full" loading={forgotPassword.isPending}>
                Request link
              </Button>
            </Stack>
          </form>

          <AuthPrompt>
            <AuthPromptLine question="Didn’t receive the link?">
              <TextLink
                disabled={forgotPassword.isPending}
                onClick={formik.submitForm}
              >
                Resend email
              </TextLink>
            </AuthPromptLine>
            <TextLink tone="neutral" to={RouteConstants.auth.secureLink.path}>
              Sign in with a secure link instead
            </TextLink>
          </AuthPrompt>
        </Stack>
      </Stack>
    </AuthLayout>
  );
}
