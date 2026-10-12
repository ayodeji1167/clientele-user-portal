import { Box, Button, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import welcomeIllustration from "@/assets/illustrations/welcome-workspace.webp";
import { appRoutes } from "@/shared/constants/routes";
import { useCurrentUser } from "../api/auth.hooks";
import { AuthHeader, AuthLayout } from "../components";

export function WelcomePage() {
  const navigate = useNavigate();
  const { data: user } = useCurrentUser();
  const firstName = user?.fullName.trim().split(/\s+/)[0];

  // The personalisation flow isn't designed yet, so both actions land on the
  // dashboard for now.
  const goToApp = () => navigate(appRoutes.home, { replace: true });

  return (
    <AuthLayout centered showLogo={false} maxW="376px">
      <Stack gap="32px" align="center">
        <Box maxW="314px">
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
          w="294px"
          h="163px"
          draggable={false}
        />

        <Stack gap="34px" w="full" pt="3px">
          <Flex
            justify="center"
            align="center"
            gap="6px"
            fontSize="14px"
            color="text.subtle"
            wrap="wrap"
            textAlign="center"
          >
            <Text>Takes about 2 minutes</Text>
            <Box boxSize="4px" borderRadius="full" bg="neutral.300" />
            <Text>Update your preferences anytime</Text>
          </Flex>

          <Stack gap="8px">
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
