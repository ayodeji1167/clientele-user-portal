import { Button, Stack } from "@chakra-ui/react";
import { useFormik } from "formik";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { FormField, PasswordInput } from "@/components/input";
import { RouteConstants } from "@/shared/constants/routes";
import { fieldError } from "@/utils/form";
import { useResetPassword } from "../api/auth.hooks";
import { AuthHeader, AuthLayout, AuthPrompt, TextLink } from "../components";
import { resetPasswordSchema } from "../utils/validation";

// No mockup exists for this step; it reuses the forgot-password layout.
export function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const resetPassword = useResetPassword();

  const formik = useFormik({
    initialValues: { password: "", confirmPassword: "" },
    validationSchema: resetPasswordSchema,
    onSubmit: ({ password }) =>
      resetPassword.mutate(
        { token: token ?? "", password },
        {
          onSuccess: () =>
            navigate(RouteConstants.auth.login.path, {
              replace: true,
            }),
        },
      ),
  });

  if (!token) {
    return <Navigate to={RouteConstants.auth.forgotPassword.path} replace />;
  }

  return (
    <AuthLayout>
      <Stack gap="2rem">
        <AuthHeader
          title="Set a new password"
          subtitle="Use at least 8 characters"
        />

        <Stack gap="0.875rem">
          <form noValidate onSubmit={formik.handleSubmit}>
            <Stack gap="1.75rem">
              <Stack gap="0.6875rem">
                <FormField
                  label="New password"
                  required
                  error={fieldError(formik, "password")}
                >
                  <PasswordInput
                    autoComplete="new-password"
                    autoFocus
                    {...formik.getFieldProps("password")}
                  />
                </FormField>
                <FormField
                  label="Confirm password"
                  required
                  error={fieldError(formik, "confirmPassword")}
                >
                  <PasswordInput
                    autoComplete="new-password"
                    {...formik.getFieldProps("confirmPassword")}
                  />
                </FormField>
              </Stack>

              <Button type="submit" w="full" loading={resetPassword.isPending}>
                Update password
              </Button>
            </Stack>
          </form>

          <AuthPrompt>
            <TextLink
              tone="neutral"
              to={RouteConstants.auth.forgotPassword.path}
            >
              Request a new link
            </TextLink>
          </AuthPrompt>
        </Stack>
      </Stack>
    </AuthLayout>
  );
}
