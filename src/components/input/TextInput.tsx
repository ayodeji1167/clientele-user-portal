import { Input, type InputProps } from "@chakra-ui/react";
import { forwardRef } from "react";

// "Text Input_med" from the Inputs page (design/figma/1336-13498-inputs.yaml).
const textInputStyles: InputProps = {
  h: "36px",
  px: "12px",
  bg: "bg.primary",
  borderWidth: "1px",
  borderColor: "border.primary",
  borderRadius: "8px",
  color: "text.primary",
  fontSize: "16px",
  letterSpacing: "-0.015em",
  focusVisibleRing: "none",
  _placeholder: { color: "text.placeholder" },
  _focusVisible: {
    outline: "none",
    borderColor: "border.primary",
    boxShadow: "ring.focusNeutral",
  },
  _invalid: {
    borderColor: "border.primary",
    boxShadow: "ring.error",
  },
  _disabled: {
    opacity: 1,
    cursor: "not-allowed",
    color: "text.subtle",
    borderColor: "border.secondary",
  },
};

export const TextInput = forwardRef<HTMLInputElement, InputProps>(
  function TextInput(props, ref) {
    return <Input ref={ref} {...textInputStyles} {...props} />;
  },
);
