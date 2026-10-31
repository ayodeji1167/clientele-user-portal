import { Box, Button, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import welcomeIllustration from "@/assets/illustrations/welcome-workspace.webp";
import { RouteConstants } from "@/shared/constants/routes";
import { useCurrentUser } from "../api/auth.hooks";
import { AuthHeader, AuthLayout } from "../components";

export function WelcomePage() {
  const navigate = useNavigate();
  const { data: user } = useCurrentUser();
  const firstName = user?.fullName.trim().split(/\s+/)[0];

  // The personalisation flow isn't designed yet, so both actions land on the
  // dashboard for now.
  const goToApp = () =>
    navigate(RouteConstants.overview.base.path, { replace: true });

  return (
    <AuthLayout centered showLogo={false} maxW="23.5rem">
      <Stack gap="2rem" align="center">
        <Box maxW="19.625rem">
          <AuthHeader
            title={
              firstName
                ? `Welcome to Clientele, ${firstName}`
                : "Welcome to Clientele"
            }
            subtitle="Let's tailor your workspace and personalise your experience."
          />
        </Box>

        <Image
          src={welcomeIllustration}
          alt=""
          w="18.375rem"
          h="10.1875rem"
          draggable={false}
        />

        <Stack gap="2.125rem" w="full" pt="0.1875rem">
          <Flex
            justify="center"
            align="center"
            gap="0.375rem"
            textStyle="p3"
            color="text.subtle"
            wrap="wrap"
            textAlign="center"
          >
            <Text>Takes about 2 minutes</Text>
            <Box boxSize="0.25rem" borderRadius="full" bg="neutral.300" />
            <Text>Update your preferences anytime</Text>
          </Flex>

          <Stack gap="0.5rem">
            <Button w="full" onClick={goToApp}>
              Get started
            </Button>
            <Button w="full" variant="tertiary" onClick={goToApp}>
              Skip for now
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </AuthLayout>
  );
}
