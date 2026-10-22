import { Textarea, type TextareaProps } from "@chakra-ui/react";
import { forwardRef } from "react";
import { fieldSurface } from "./styles";

export const TextArea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function TextArea(props, ref) {
    return (
      <Textarea
        ref={ref}
        minH="6.5rem"
        px="0.75rem"
        py="0.625rem"
        resize="vertical"
        css={fieldSurface}
        {...props}
      />
    );
  },
);
