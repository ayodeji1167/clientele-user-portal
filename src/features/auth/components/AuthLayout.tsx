import { Box, Flex, Image, Stack } from "@chakra-ui/react";
import type { ReactNode } from "react";
import logoUrl from "@/assets/logo.svg";

type AuthLayoutProps = {
  children: ReactNode;
  /**
   * Form screens sit near the top of the page; confirmation screens (check
   * your mailbox, verify email) are vertically centered.
   */
  centered?: boolean;
  showLogo?: boolean;
  maxW?: string;
};

export function AuthLayout({
  children,
  centered = false,
  showLogo = true,
  maxW = "21.25rem",
}: AuthLayoutProps) {
  return (
    <Flex
      minH="100dvh"
      bg="bg.secondary"
      direction="column"
      align="center"
      justify={centered ? "center" : "flex-start"}
      px="1rem"
      pt={centered ? "2.5rem" : { base: "3rem", md: "5rem" }}
      pb="2.5rem"
    >
      <Stack w="full" maxW={maxW} gap={{ base: "2.5rem", md: "3.375rem" }}>
        {showLogo && (
          <Box display="flex" justifyContent="center">
            <Image src={logoUrl} alt="Clientele" w="6.6875rem" h="1.8125rem" />
          </Box>
        )}
        {children}
      </Stack>
    </Flex>
  );
}
