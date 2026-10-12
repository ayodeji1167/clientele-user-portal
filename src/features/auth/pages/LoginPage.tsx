import { Button, Flex, Stack } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { FormField, PasswordInput, TextInput } from "@/components/input";
import { appRoutes } from "@/shared/constants/routes";
import { fieldError } from "@/utils/form";
import { useLogin } from "../api/auth.hooks";
import {
  AuthHeader,
  AuthLayout,
  AuthPrompt,
  AuthPromptLine,
  SocialAuthButtons,
  TextLink,
} from "../components";
import { loginSchema } from "../validation";

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const login = useLogin();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: (values) =>
      login.mutate(
        { email: values.email.trim(), password: values.password },
        {
          onSuccess: () => {
            const from = (location.state as { from?: string } | null)?.from;
            navigate(from ?? appRoutes.home, { replace: true });
          },
        },
      ),
  });

  return (
    <AuthLayout>
      <Stack gap="32px">
        <AuthHeader title="Sign in to your account" />

        <Stack gap="14px">
          <form noValidate onSubmit={formik.handleSubmit}>
            <Stack gap="30px">
              <Stack gap="11px">
                <FormField
                  label="Email address"
                  required
                  error={fieldError(formik, "email")}
                >
                  <TextInput
                    type="email"
                    autoComplete="email"
                    {...formik.getFieldProps("email")}
                  />
                </FormField>

                <Stack gap="2px">
                  <FormField
                    label="Password"
                    required
                    error={fieldError(formik, "password")}
                  >
                    <PasswordInput
                      autoComplete="current-password"
                      {...formik.getFieldProps("password")}
                    />
                  </FormField>
                  <Flex justify="flex-end" lineHeight="1">
                    <TextLink tone="muted" to={appRoutes.auth.forgotPassword}>
                      Forgot password?
                    </TextLink>
                  </Flex>
                </Stack>
              </Stack>

              <Button type="submit" w="full" loading={login.isPending}>
                Sign in
              </Button>
            </Stack>
          </form>

          <AuthPrompt>
            <AuthPromptLine question="Don’t have an account?">
              <TextLink to={appRoutes.auth.register}>
                Create an account
              </TextLink>
            </AuthPromptLine>
            <TextLink tone="neutral" to={appRoutes.auth.login}>
              Sign in with a secure link
            </TextLink>
          </AuthPrompt>
        </Stack>

        <SocialAuthButtons />
      </Stack>
    </AuthLayout>
  );
}
