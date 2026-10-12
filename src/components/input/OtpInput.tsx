import { PinInput } from "@chakra-ui/react";

type OtpInputProps = {
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  length?: number;
  invalid?: boolean;
  disabled?: boolean;
};

export function OtpInput({
  value,
  onChange,
  onComplete,
  length = 6,
  invalid,
  disabled,
}: OtpInputProps) {
  return (
    <PinInput.Root
      otp
      type="numeric"
      count={length}
      placeholder="0"
      autoFocus
      blurOnComplete
      invalid={invalid}
      disabled={disabled}
      value={value.split("")}
      onValueChange={(details) => onChange(details.valueAsString)}
      onValueComplete={(details) => onComplete?.(details.valueAsString)}
      w="full"
    >
      <PinInput.HiddenInput />
      <PinInput.Control display="flex" gap="4px" w="full">
        {Array.from({ length }, (_, index) => (
          <PinInput.Input
            key={index}
            index={index}
            flex="1"
            minW="0"
            h="70px"
            bg="bg.secondary"
            borderWidth="1px"
            borderColor="neutral.300"
            borderRadius="8px"
            textAlign="center"
            fontSize="40px"
            fontWeight="300"
            color="text.primary"
            focusVisibleRing="none"
            _placeholder={{ color: "neutral.300" }}
            _focusVisible={{ outline: "none", boxShadow: "ring.focusNeutral" }}
            _invalid={{ borderColor: "neutral.300", boxShadow: "ring.error" }}
          />
        ))}
      </PinInput.Control>
    </PinInput.Root>
  );
}
