import { Input, type InputProps } from "@chakra-ui/react";
import { forwardRef } from "react";
import { fieldSurface } from "./styles";

export const TextInput = forwardRef<HTMLInputElement, InputProps>(
  function TextInput(props, ref) {
    return (
      <Input ref={ref} h="2.25rem" px="0.75rem" css={fieldSurface} {...props} />
    );
  },
);
