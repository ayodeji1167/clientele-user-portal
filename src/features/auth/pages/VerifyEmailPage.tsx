import { Button, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { OtpInput } from "@/components/input";
import { RouteConstants } from "@/shared/constants/routes";
import { useResendVerification, useVerifyEmail } from "../api/auth.hooks";
import {
  AuthHeader,
  AuthLayout,
  AuthPrompt,
  AuthPromptLine,
  TextLink,
} from "../components";

const CODE_LENGTH = 6;

export function VerifyEmailPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const verify = useVerifyEmail();
  const resend = useResendVerification();
  const [code, setCode] = useState("");
  const [incomplete, setIncomplete] = useState(false);

  if (!email) {
    return <Navigate to={RouteConstants.auth.signup.path} replace />;
  }

  const submit = (value: string) => {
    if (verify.isPending) return;
    if (value.length !== CODE_LENGTH) {
      setIncomplete(true);
      return;
    }
    verify.mutate(
      { email, code: value },
      {
        onSuccess: () =>
          navigate(RouteConstants.onboarding.welcome.path, { replace: true }),
      },
    );
  };

  return (
    <AuthLayout>
      <Stack gap="2rem">
        <AuthHeader
          title="Verify your email"
          subtitle={
            <>
              Enter the {CODE_LENGTH}-digit verification code we just sent to{" "}
              <Text as="span" color="text.primary" fontWeight="600">
                {email}.
              </Text>{" "}
              This code expires in 15 minutes
            </>
          }
        />

        <form
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            submit(code);
          }}
        >
          <Stack gap="2rem">
            <OtpInput
              value={code}
              onChange={(value) => {
                setCode(value);
                setIncomplete(false);
                if (verify.isError) verify.reset();
              }}
              onComplete={submit}
              invalid={incomplete || verify.isError}
              disabled={verify.isPending}
            />

            <Stack gap="0.875rem">
              <Button type="submit" w="full" loading={verify.isPending}>
                Continue
              </Button>

              <AuthPrompt>
                <AuthPromptLine question="Didn’t receive a code?">
                  <TextLink
                    disabled={resend.isPending}
                    onClick={() => resend.mutate({ email })}
                  >
                    Resend email
                  </TextLink>
                </AuthPromptLine>
                <TextLink tone="neutral" to={RouteConstants.auth.signup.path}>
                  Go back
                </TextLink>
              </AuthPrompt>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </AuthLayout>
  );
}
