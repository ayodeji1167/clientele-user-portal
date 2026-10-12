import { chakra, InputGroup, type InputProps } from "@chakra-ui/react";
import { forwardRef, useState } from "react";
import { EyeIcon, EyeOffIcon } from "@/components/icons";
import { TextInput } from "./TextInput";

export const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  function PasswordInput(props, ref) {
    const [visible, setVisible] = useState(false);

    return (
      <InputGroup
        w="full"
        endElement={
          <chakra.button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? "Hide password" : "Show password"}
            display="flex"
            alignItems="center"
            color="text.tertiary"
            cursor="pointer"
            borderRadius="4px"
            _hover={{ color: "text.primary" }}
            _focusVisible={{ outline: "none", boxShadow: "ring.focusNeutral" }}
          >
            {visible ? <EyeOffIcon /> : <EyeIcon />}
          </chakra.button>
        }
      >
        <TextInput
          ref={ref}
          type={visible ? "text" : "password"}
          pe="40px"
          {...props}
        />
      </InputGroup>
    );
  },
);
