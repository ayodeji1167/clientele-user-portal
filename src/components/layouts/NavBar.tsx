import { Box, Button, chakra, Flex, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import logoUrl from "@/assets/logo.svg";
import { DocumentIcon, MenuIcon, PlusCircleIcon } from "@/components/icons";
import { RouteConstants } from "@/shared/constants/routes";

const actionStyles = {
  h: "2.0625rem",
  px: "0.625rem",
  gap: "0.375rem",
  fontSize: "0.9375rem",
} as const;

export function NavBar({ onMenuOpen }: { onMenuOpen: () => void }) {
  return (
    <Flex
      as="header"
      align="center"
      gap="0.5rem"
      h="3.5rem"
      flexShrink={0}
      px={{ base: "1rem", md: "1.5rem" }}
    >
      <Flex align="center" gap="0.75rem" display={{ base: "flex", lg: "none" }}>
        <chakra.button
          aria-label="Open navigation"
          onClick={onMenuOpen}
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxSize="2.25rem"
          borderRadius="0.5rem"
          color="text.secondary"
          cursor="pointer"
          _hover={{ bg: "bg.tertiary" }}
          _focusVisible={{ outline: "none", boxShadow: "ring.focusNeutral" }}
        >
          <MenuIcon boxSize="1.375rem" />
        </chakra.button>
        <Image src={logoUrl} alt="Clientele" h="1.375rem" />
      </Flex>

      <Flex ms="auto" gap="0.5625rem">
        <Button asChild variant="muted" {...actionStyles}>
          <Link
            to={RouteConstants.inquiries.form.path}
            aria-label="Inquiry form"
          >
            <DocumentIcon />
            <Box
              textStyle={"p3"}
              fontWeight={"500"}
              as="span"
              display={{ base: "none", sm: "inline" }}
            >
              Inquiry form
            </Box>
          </Link>
        </Button>
        <Button
          asChild
          {...actionStyles}
          textStyle={"p3"}
          fontWeight={"semibold"}
        >
          <Link to={RouteConstants.portals.create.path}>
            <PlusCircleIcon />
            New portal
          </Link>
        </Button>
      </Flex>
    </Flex>
  );
}
