import {
  Button,
  Flex,
  Field,
  Image,
  Stack,
  Text,
  Heading,
  NativeSelect,
  Input,
  IconButton,
} from "@chakra-ui/react";
import onboardingTwo from "@/assets/illustrations/onboarding-step-two.png";
import { useState } from "react";
import { EyeIcon } from "@/components/icons";
// import { LuArrowLeft } from "react-icons/lu";

const industries = [
  "Design & Creative",
  "Writing & Content",
  "Marketing & Communications",
  "Photography & Videography",
  "Other",
];

export function OnboardingIndustryPage() {
  const [industry, setIndustry] = useState("");

  return (
    <Flex h="100dvh" pt="4rem" p="3rem" gap="1rem" bg="white">
      {/* Left: form */}
      <Flex flex="1" justify="center" pt="3rem">
        <Stack gap="1.5rem" w="full" maxW="23.5rem">
          <Stack gap="0.25rem">
            <Heading as="h1" fontSize="1rem" fontWeight="600">
              A little about you
            </Heading>
            <Text fontSize="0.8125rem" color="text.muted">
              Let's start with a few details about you.
            </Text>
          </Stack>

          <Stack gap="1rem">
            <Field.Root>
              <Field.Label>Full name</Field.Label>
              <Input placeholder="Valerie Izuagbe" />
            </Field.Root>

            <Field.Root>
              <Field.Label>
                What should we call you?
                <Text as="span" color="text.muted" fontWeight="400">
                  (optional)
                </Text>
              </Field.Label>
              <Input />
            </Field.Root>

            <Field.Root required>
              <Field.Label>
                What's your industry? <Field.RequiredIndicator />
              </Field.Label>
              <NativeSelect.Root>
                <NativeSelect.Field
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                >
                  <option value="" disabled />
                  {industries.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            </Field.Root>

            {industry === "Other" && (
              <Field.Root required>
                <Field.Label>
                  Tell us your specific industry <Field.RequiredIndicator />
                </Field.Label>
                <Input />
              </Field.Root>
            )}

            <Field.Root required>
              <Field.Label>
                Name your workspace <Field.RequiredIndicator />
              </Field.Label>
              <Input />
            </Field.Root>
          </Stack>

          <Flex gap="0.75rem">
            <IconButton variant="outline" aria-label="Back">
              <EyeIcon />
            </IconButton>
            <Button flex="1">Continue</Button>
          </Flex>
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
        <Image src={onboardingTwo} alt="Onboarding Step Two" w={"34.75rem"} />
      </Flex>
    </Flex>
  );
}
