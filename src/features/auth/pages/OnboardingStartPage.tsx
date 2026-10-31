import {
  Box,
  Button,
  Flex,
  Image,
  Stack,
  Text,
  Heading,
  RadioCard,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import onboardingOne from "@/assets/illustrations/onboarding-step-one.png";
import { RouteConstants } from "@/shared/constants/routes";
import { useCurrentUser } from "../api/auth.hooks";
import { useState } from "react";

export function OnboardingStartPage() {
  const navigate = useNavigate();
  const { data: user } = useCurrentUser();
  const firstName = user?.fullName.trim().split(/\s+/)[0];

  // The personalisation flow isn't designed yet, so both actions land on the
  // dashboard for now.
  const goToApp = () =>
    navigate(RouteConstants.overview.base.path, { replace: true });

  const [selected, setSelected] = useState<string | null>(null);

  const options = [
    {
      value: "solo",
      title: "Solo Freelancer",
      description: "I work independently and manage my own clients.",
    },
    {
      value: "studio",
      title: "Studio / Agency",
      description: "We work as a team and manage clients together.",
    },
    {
      value: "business",
      title: "Business",
      description: "We provide services under an established company.",
    },
  ];

  return (
    <Flex h="100dvh" pt={"4rem"} p="3rem" gap="1rem" bg="white">
      {/* Left: form */}
      <Flex flex="1" justify="center" pt={"3rem"}>
        <Stack gap="1.5rem" w="full" maxW="23.5rem">
          <Stack gap="0.25rem">
            <Heading as="h1" fontSize="1rem" fontWeight="600">
              How do you work?
            </Heading>
            <Text fontSize="0.8125rem" color="text.muted">
              Choose the workspace that best describes you.
            </Text>
          </Stack>

          <RadioCard.Root
            value={selected}
            onValueChange={(e) => setSelected(e.value)}
            variant="outline"
            size="sm"
          >
            <Stack gap="0.5rem">
              {options.map((item) => (
                <RadioCard.Item key={item.value} value={item.value}>
                  <RadioCard.ItemHiddenInput />
                  <RadioCard.ItemControl>
                    <RadioCard.ItemContent>
                      <RadioCard.ItemText>{item.title}</RadioCard.ItemText>
                      <RadioCard.ItemDescription>
                        {item.description}
                      </RadioCard.ItemDescription>
                    </RadioCard.ItemContent>
                    <RadioCard.ItemIndicator />
                  </RadioCard.ItemControl>
                </RadioCard.Item>
              ))}
            </Stack>
          </RadioCard.Root>

          <Button w="full">Continue</Button>
        </Stack>
      </Flex>

      {/* Right: image */}
      <Flex
        display={{ base: "none", lg: "flex" }}
        flex="1"
        maxW={"34.75rem"}
        bg="#F6F6F6"
        borderRadius="1.5rem"
        p="3rem"
        align={"center"}
        justify={"center"}
        overflow={"hidden"}
      >
        <Image src={onboardingOne} alt="Onboarding Step One" w={"34.75rem"} />
      </Flex>
    </Flex>
  );
}
