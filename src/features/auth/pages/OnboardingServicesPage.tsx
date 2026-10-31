import {
  Button,
  Flex,
  Field,
  Image,
  Stack,
  Text,
  Heading,
  Input,
  IconButton,
  Checkbox,
} from "@chakra-ui/react";
import onboardingThree from "@/assets/illustrations/onboarding-step-three.png";
import { useState } from "react";
import { EyeIcon } from "@/components/icons";
// import { LuArrowLeft } from "react-icons/lu";

const INDUSTRY = "Design & Creative";

const defaultServices = [
  "Product design",
  "UI/UX design",
  "Motion design",
  "Brand design",
  "Graphic design",
  "Copywriting",
  "Illustration",
];

export function OnboardingServicesPage() {
  const [services, setServices] = useState(defaultServices);
  const [selected, setSelected] = useState<string[]>([]);
  const [adding, setAdding] = useState(false);
  const [customName, setCustomName] = useState("");

  const toggle = (service: string) => {
    setSelected((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service],
    );
  };

  const saveCustom = () => {
    const name = customName.trim();
    if (!name) return;

    if (!services.includes(name)) {
      setServices((prev) => [...prev, name]);
      setSelected((prev) => [...prev, name]);
    }
    setCustomName("");
    setAdding(false);
  };

  return (
    <Flex h="100dvh" pt="4rem" p="3rem" gap="1rem" bg="white">
      {/* Left: form */}
      <Flex flex="1" justify="center" pt="2rem">
        <Stack gap="1rem" w="full" maxW="23.5rem">
          <Stack gap="0.25rem">
            <Heading as="h1" fontSize="1rem" fontWeight="600">
              What services do you offer?
            </Heading>
            <Text fontSize="0.8125rem" color="text.muted">
              We'll tailor your workspace and recommend the right tools for your
              business.
            </Text>
          </Stack>

          <Stack gap=".5rem">
            <Field.Root>
              <Field.Label>Your industry</Field.Label>
              <Input value={INDUSTRY} readOnly disabled />
            </Field.Root>

            <Stack gap="0.5rem" w="full">
              <Text fontSize="0.8125rem" fontWeight="500">
                Select all that apply{" "}
                <Text as="span" color="red.500">
                  *
                </Text>
              </Text>

              {services.map((service) => (
                <Checkbox.Root
                  key={service}
                  checked={selected.includes(service)}
                  onCheckedChange={() => toggle(service)}
                  w="full"
                  justifyContent="space-between"
                  px="0.75rem"
                  py="0.625rem"
                  borderWidth="1px"
                  borderRadius="0.5rem"
                  cursor="pointer"
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Label>{service}</Checkbox.Label>
                  <Checkbox.Control />
                </Checkbox.Root>
              ))}

              {adding ? (
                <Flex gap="0.5rem">
                  <Input
                    autoFocus
                    placeholder="Enter service name"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && saveCustom()}
                  />
                  <Button onClick={saveCustom}>Save</Button>
                </Flex>
              ) : (
                <Button
                  variant="outline"
                  justifyContent="flex-start"
                  color="text.muted"
                  onClick={() => setAdding(true)}
                >
                  + Add custom service
                </Button>
              )}
            </Stack>
          </Stack>

          <Flex gap="0.75rem">
            <IconButton variant="outline" aria-label="Back">
              <EyeIcon />
            </IconButton>
            <Button flex="1" disabled={selected.length === 0}>
              Continue
            </Button>
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
        <Image
          src={onboardingThree}
          alt="Onboarding Step Three"
          w={"34.75rem"}
        />
      </Flex>
    </Flex>
  );
}
