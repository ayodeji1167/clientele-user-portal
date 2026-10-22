import { Dialog, Portal, Stack } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { CloseIcon } from "@/components/icons";

type AppModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  /** Wrap body + footer in a <form> so Enter submits. */
  onSubmit?: () => void;
};

/** The design system's modal: 429px card, close button, title + description. */
export function AppModal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  onSubmit,
}: AppModalProps) {
  const body = (
    <>
      {children && <Dialog.Body p="0">{children}</Dialog.Body>}
      {footer && (
        <Dialog.Footer p="0" pt="2rem" gap="0.5rem">
          {footer}
        </Dialog.Footer>
      )}
    </>
  );

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(details) => !details.open && onClose()}
      placement="center"
      motionPreset="slide-in-bottom"
    >
      <Portal>
        <Dialog.Backdrop bg="overlay" backdropFilter="blur(0.25rem)" />
        <Dialog.Positioner px="1rem">
          <Dialog.Content
            w="full"
            maxW="26.8125rem"
            borderRadius="1rem"
            px="1rem"
            pt="2.5rem"
            pb="1.5rem"
            boxShadow="xlarge.2"
          >
            <Dialog.CloseTrigger
              top="0.875rem"
              insetEnd="0.875rem"
              boxSize="1.75rem"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="0.375rem"
              color="text.secondary"
              cursor="pointer"
              _hover={{ bg: "bg.tertiary" }}
            >
              <CloseIcon boxSize="1.25rem" />
            </Dialog.CloseTrigger>

            <Dialog.Header p="0" pb="2rem">
              <Stack gap="0.5rem">
                <Dialog.Title
                  textStyle="h6"
                  fontWeight="600"
                  lineHeight="1.2"
                  color="text.primary"
                >
                  {title}
                </Dialog.Title>
                {description && (
                  <Dialog.Description
                    textStyle="p2"
                    lineHeight="1.15"
                    color="text.muted"
                  >
                    {description}
                  </Dialog.Description>
                )}
              </Stack>
            </Dialog.Header>

            {onSubmit ? (
              <form
                noValidate
                onSubmit={(event) => {
                  event.preventDefault();
                  onSubmit();
                }}
              >
                {body}
              </form>
            ) : (
              body
            )}
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
