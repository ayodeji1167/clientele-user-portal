import { Button, Stack } from "@chakra-ui/react";
import { useFormik } from "formik";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { FormField, PasswordInput } from "@/components/input";
import { appRoutes } from "@/shared/constants/routes";
import { fieldError } from "@/utils/form";
import { useResetPassword } from "../api/auth.hooks";
import { AuthHeader, AuthLayout, AuthPrompt, TextLink } from "../components";
import { resetPasswordSchema } from "../validation";

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
            navigate(appRoutes.auth.loginWithPassword, { replace: true }),
        },
      ),
  });

  if (!token) {
    return <Navigate to={appRoutes.auth.forgotPassword} replace />;
  }

  return (
    <AuthLayout>
      <Stack gap="32px">
        <AuthHeader
          title="Set a new password"
          subtitle="Use at least 8 characters"
        />

        <Stack gap="14px">
          <form noValidate onSubmit={formik.handleSubmit}>
            <Stack gap="28px">
              <Stack gap="11px">
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
            <TextLink tone="neutral" to={appRoutes.auth.forgotPassword}>
              Request a new link
            </TextLink>
          </AuthPrompt>
        </Stack>
      </Stack>
    </AuthLayout>
  );
}
