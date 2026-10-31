import {
  Button,
  Flex,
  Heading,
  IconButton,
  Image,
  RadioCard,
  Stack,
  Text,
} from "@chakra-ui/react";
import onboardingFour from "@/assets/illustrations/onboarding-step-four.png";
import { useState } from "react";
import { EyeIcon } from "@/components/icons";

const payoutMethods = [
  "Bank account",
  "Stripe",
  "Payoneer",
  "Paystack",
  "Flutterwave",
  "Wise",
];

export function OnboardingPaymentPage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Flex h="100dvh" pt="4rem" p="3rem" gap="1rem" bg="white">
      {/* Left: form */}
      <Flex flex="1" justify="center" pt="3rem">
        <Stack gap="1.5rem" w="full" maxW="23.5rem">
          <Stack gap="0.25rem">
            <Heading as="h1" fontSize="1rem" fontWeight="600">
              How do you want to get paid?
            </Heading>
            <Text fontSize="0.8125rem" color="text.muted">
              Get paid faster by connecting your preferred payment method.
            </Text>
          </Stack>

          <Stack gap="0.5rem">
            <Text fontSize="0.8125rem" fontWeight="500">
              Select a payout method{" "}
              <Text as="span" color="red.500">
                *
              </Text>
            </Text>

            <RadioCard.Root
              value={selected}
              onValueChange={(e) => setSelected(e.value)}
              variant="outline"
              size="sm"
            >
              <Stack gap="0.5rem">
                {payoutMethods.map((method) => (
                  <RadioCard.Item key={method} value={method}>
                    <RadioCard.ItemHiddenInput />
                    <RadioCard.ItemControl>
                      <RadioCard.ItemText>{method}</RadioCard.ItemText>
                      <RadioCard.ItemIndicator />
                    </RadioCard.ItemControl>
                  </RadioCard.Item>
                ))}
              </Stack>
            </RadioCard.Root>
          </Stack>

          <Stack gap="0.5rem">
            <Flex gap="0.75rem">
              <IconButton variant="outline" aria-label="Back">
                <EyeIcon />
              </IconButton>
              <Button flex="1" disabled={!selected}>
                Finish
              </Button>
            </Flex>

            <Button variant="outline" w="full">
              Set up payment later
            </Button>
          </Stack>
        </Stack>
      </Flex>

      {/* Right: image */}
      <Flex
        display={{ base: "none", lg: "flex" }}
        flex="1"
        maxW="34.75rem"
        bg="#F6F6F6"
        borderRadius="1.5rem"
        p="3rem"
        align="center"
        justify="center"
        overflow="hidden"
      >
        <Image src={onboardingFour} alt="Onboarding Step Four" w="34.75rem" />
      </Flex>
    </Flex>
  );
}
