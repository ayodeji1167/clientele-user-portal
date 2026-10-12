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
  maxW = "340px",
}: AuthLayoutProps) {
  return (
    <Flex
      minH="100dvh"
      bg="bg.secondary"
      direction="column"
      align="center"
      justify={centered ? "center" : "flex-start"}
      px="16px"
      pt={centered ? "40px" : { base: "48px", md: "80px" }}
      pb="40px"
    >
      <Stack w="full" maxW={maxW} gap={{ base: "40px", md: "54px" }}>
        {showLogo && (
          <Box display="flex" justifyContent="center">
            <Image src={logoUrl} alt="Clientele" w="107px" h="29px" />
          </Box>
        )}
        {children}
      </Stack>
    </Flex>
  );
}
