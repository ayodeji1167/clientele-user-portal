import { Button, Stack } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { FormField, TextInput } from "@/components/input";
import { toaster } from "@/components/ui";
import { appRoutes } from "@/shared/constants/routes";
import { fieldError } from "@/utils/form";
import { useRequestMagicLink } from "../api/auth.hooks";
import {
  AuthHeader,
  AuthLayout,
  AuthPrompt,
  AuthPromptLine,
  TextLink,
} from "../components";
import { emailSchema } from "../validation";

export function MagicLinkPage() {
  const location = useLocation();
  const requestLink = useRequestMagicLink();
  const [sentTo, setSentTo] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: emailSchema,
    onSubmit: ({ email }) => {
      const trimmed = email.trim();
      requestLink.mutate(
        { email: trimmed },
        { onSuccess: () => setSentTo(trimmed) },
      );
    },
  });

  if (sentTo) {
    return (
      <AuthLayout centered>
        <Stack gap="32px">
          <AuthHeader
            title="Check your mailbox"
            subtitle="We sent a secure link to the email you provided"
          />
          <Stack gap="28px">
            <FormField label="Email address" required disabled>
              <TextInput value={sentTo} disabled readOnly />
            </FormField>
            <AuthPrompt>
              <AuthPromptLine question="Didn’t get the link?">
                <TextLink
                  disabled={requestLink.isPending}
                  onClick={() =>
                    requestLink.mutate(
                      { email: sentTo },
                      {
                        onSuccess: () =>
                          toaster.create({
                            type: "success",
                            description: "We sent you another link",
                          }),
                      },
                    )
                  }
                >
                  Resend
                </TextLink>
              </AuthPromptLine>
              <TextLink tone="neutral" onClick={() => setSentTo(null)}>
                Use a different email address
              </TextLink>
            </AuthPrompt>
          </Stack>
        </Stack>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <Stack gap="32px">
        <AuthHeader
          title="Sign in to your account"
          subtitle="We’ll send a secure link to the email associated with your Clientele account"
        />

        <Stack gap="14px">
          <form noValidate onSubmit={formik.handleSubmit}>
            <Stack gap="32px">
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

              <Button type="submit" w="full" loading={requestLink.isPending}>
                Send me a link
              </Button>
            </Stack>
          </form>

          <AuthPrompt>
            <AuthPromptLine question="Don’t have an account?">
              <TextLink to={appRoutes.auth.register}>
                Create an account
              </TextLink>
            </AuthPromptLine>
            <TextLink
              tone="neutral"
              to={appRoutes.auth.loginWithPassword}
              state={location.state}
            >
              Sign in with password
            </TextLink>
          </AuthPrompt>
        </Stack>
      </Stack>
    </AuthLayout>
  );
}
