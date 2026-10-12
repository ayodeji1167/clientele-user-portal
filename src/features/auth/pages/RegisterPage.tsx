import { Button, Link, Stack, Text } from "@chakra-ui/react";
import { useFormik } from "formik";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { FormField, PasswordInput, TextInput } from "@/components/input";
import { legalLinks } from "@/shared/constants/legal";
import { appRoutes } from "@/shared/constants/routes";
import { fieldError } from "@/utils/form";
import { useRegister } from "../api/auth.hooks";
import {
  AuthHeader,
  AuthLayout,
  AuthPrompt,
  AuthPromptLine,
  SocialAuthButtons,
  TextLink,
} from "../components";
import { registerSchema } from "../validation";

function LegalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      display="inline"
      color="inherit"
      textDecoration="underline"
      textUnderlineOffset="2px"
      _hover={{ color: "text.tertiary" }}
    >
      {children}
    </Link>
  );
}

export function RegisterPage() {
  const navigate = useNavigate();
  const register = useRegister();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      const email = values.email.trim();
      register.mutate(
        { fullName: values.fullName.trim(), email, password: values.password },
        {
          onSuccess: () =>
            navigate(
              `${appRoutes.auth.verifyEmail}?email=${encodeURIComponent(email)}`,
            ),
        },
      );
    },
  });

  return (
    <AuthLayout>
      <Stack gap="32px">
        <AuthHeader title="Create a new account" />

        <Stack gap="14px">
          <form noValidate onSubmit={formik.handleSubmit}>
            <Stack gap="28px">
              <Stack gap="22px">
                <Stack gap="11px">
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
                  fontSize="14px"
                  lineHeight="15px"
                  color="text.subtle"
                  textAlign="center"
                  px="20px"
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

              <Button type="submit" w="full" loading={register.isPending}>
                Create account
              </Button>
            </Stack>
          </form>

          <AuthPrompt>
            <AuthPromptLine question="Already have an account?">
              <TextLink to={appRoutes.auth.login}>Sign in</TextLink>
            </AuthPromptLine>
          </AuthPrompt>
        </Stack>

        <SocialAuthButtons />
      </Stack>
    </AuthLayout>
  );
}
