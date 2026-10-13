import { Button, Flex, Stack } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { FormField, PasswordInput, TextInput } from "@/components/input";
import { RouteConstants } from "@/shared/constants/routes";
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
import { loginSchema } from "../utils/validation";

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
            navigate(from ?? RouteConstants.overview.base.path, {
              replace: true,
            });
          },
        },
      ),
  });

  return (
    <AuthLayout>
      <Stack gap="2rem">
        <AuthHeader title="Sign in to your account" />

        <Stack gap="0.875rem">
          <form noValidate onSubmit={formik.handleSubmit}>
            <Stack gap="1.875rem">
              <Stack gap="0.6875rem">
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

                <Stack gap="0.125rem">
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
                    <TextLink
                      tone="muted"
                      to={RouteConstants.auth.forgotPassword.path}
                    >
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
              <TextLink to={RouteConstants.auth.signup.path}>
                Create an account
              </TextLink>
            </AuthPromptLine>
            <TextLink
              tone="neutral"
              to={RouteConstants.auth.secureLink.path}
              state={location.state}
            >
              Sign in with a secure link
            </TextLink>
          </AuthPrompt>
        </Stack>

        <SocialAuthButtons />
      </Stack>
    </AuthLayout>
  );
}
