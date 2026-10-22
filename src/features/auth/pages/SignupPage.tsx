import { Button, Link, Stack, Text } from "@chakra-ui/react";
import { useFormik } from "formik";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { FormField, PasswordInput, TextInput } from "@/components/input";
import { legalLinks } from "@/shared/constants/legal";
import { RouteConstants } from "@/shared/constants/routes";
import { fieldError } from "@/utils/form";
import { useSignup } from "../api/auth.hooks";
import {
  AuthHeader,
  AuthLayout,
  AuthPrompt,
  AuthPromptLine,
  SocialAuthButtons,
  TextLink,
} from "../components";
import { signupSchema } from "../utils/validation";

function LegalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      display="inline"
      color="inherit"
      textDecoration="underline"
      textUnderlineOffset="0.125rem"
      _hover={{ color: "text.tertiary" }}
    >
      {children}
    </Link>
  );
}

export function SignupPage() {
  const navigate = useNavigate();
  const signup = useSignup();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      const email = values.email.trim();
      signup.mutate(
        { fullName: values.fullName.trim(), email, password: values.password },
        {
          onSuccess: () =>
            navigate(RouteConstants.auth.verifyEmail.generate({}, { email })),
        },
      );
    },
  });

  return (
    <AuthLayout>
      <Stack gap="2rem">
        <AuthHeader title="Create a new account" />

        <Stack gap="0.875rem">
          <form noValidate onSubmit={formik.handleSubmit}>
            <Stack gap="1.75rem">
              <Stack gap="1.375rem">
                <Stack gap="0.6875rem">
                  <FormField
                    label="Full name"
                    required
                    error={fieldError(formik, "fullName")}
                  >
                    <TextInput
                      autoComplete="name"
                      {...formik.getFieldProps("fullName")}
                    />
                  </FormField>
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
                  <FormField
                    label="Password"
                    required
                    error={fieldError(formik, "password")}
                  >
                    <PasswordInput
                      autoComplete="new-password"
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

                <Text
                  textStyle="p3"
                  color="text.subtle"
                  textAlign="center"
                  px="1.25rem"
                >
                  By signing up you agree to the{" "}
                  <LegalLink href={legalLinks.terms}>Terms of Use</LegalLink>,{" "}
                  <LegalLink href={legalLinks.privacy}>
                    Privacy Notice
                  </LegalLink>
                  , and{" "}
                  <LegalLink href={legalLinks.cookies}>Cookie Notice</LegalLink>
                  .
                </Text>
              </Stack>

              <Button type="submit" w="full" loading={signup.isPending}>
                Create account
              </Button>
            </Stack>
          </form>

          <AuthPrompt>
            <AuthPromptLine question="Already have an account?">
              <TextLink to={RouteConstants.auth.login.path}>Sign in</TextLink>
            </AuthPromptLine>
          </AuthPrompt>
        </Stack>

        <SocialAuthButtons />
      </Stack>
    </AuthLayout>
  );
}
