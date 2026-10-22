import { Switch } from "@chakra-ui/react";

type SwitchRowProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  name?: string;
};

/** A full-width "label ··· toggle" row between dividers, as in the modals. */
export function SwitchRow({ label, checked, onChange, name }: SwitchRowProps) {
  return (
    <Switch.Root
      name={name}
      checked={checked}
      onCheckedChange={(details) => onChange(details.checked)}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      w="full"
      py="0.75rem"
      borderYWidth="0.0625rem"
      borderColor="border.primary"
      cursor="pointer"
    >
      <Switch.HiddenInput />
      <Switch.Label
        fontSize="1rem"
        fontWeight="400"
        color="text.primary"
        cursor="pointer"
      >
        {label}
      </Switch.Label>
      <Switch.Control
        w="2.375rem"
        h="1.125rem"
        p="0.0625rem"
        bg="bg.tertiary"
        borderWidth="0.0625rem"
        borderColor="border.primary"
        _checked={{ bg: "sandal.700", borderColor: "sandal.700" }}
        focusVisibleRing="none"
        _focusVisible={{ boxShadow: "ring.focusNeutral" }}
      >
        <Switch.Thumb boxSize="0.875rem" bg="white" boxShadow="small.1" />
      </Switch.Control>
    </Switch.Root>
  );
}
