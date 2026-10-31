import {
  Button,
  Field,
  Flex,
  Heading,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import onboardingBusiness from "@/assets/illustrations/onboarding-business.png";

export function OnboardingBusinessPage() {
  return (
    <Flex minH="100dvh" p="5rem" justify="center" align="center" bg="white">
      <Stack
        gap="2.5rem"
        align="center"
        w="full"
        maxW="38rem"
        textAlign="center"
      >
        <Image
          src={onboardingBusiness}
          alt="Clientele for Agency illustration"
          w="100%"
          maxW="20rem"
        />

        <Stack gap="0.5rem">
          <Heading as="h1" fontSize="1.75rem" fontWeight="600">
            Clientele for Busiess is on the way!
          </Heading>
          <Text fontSize="1rem" color="text.muted">
            We're building tools designed for teams, shared workflows, and
            managing clients together.
          </Text>
        </Stack>

        <Stack gap="0.5rem" w="full" maxW="24rem">
          <Field.Root>
            <Input type="email" placeholder="Enter your email" />
          </Field.Root>
          <Text fontSize="0.875rem" color="text.muted">
            We'll notify you when it's ready.
          </Text>
        </Stack>

        <Button variant="plain" textDecoration="underline" fontWeight="400">
          Continue as a Solo Freelancer
        </Button>
      </Stack>
    </Flex>
  );
}
