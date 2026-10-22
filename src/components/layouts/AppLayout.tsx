import { Box, Drawer, Flex, Portal, Spinner } from "@chakra-ui/react";
import { Suspense, useState, type ReactNode } from "react";
import { NavBar } from "./NavBar";
import { SideBar } from "./SideBar";

/** Signed-in shell: fixed sidebar, top bar, scrolling content column. */
export function AppLayout({ children }: { children: ReactNode }) {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <Flex h="100dvh" bg="bg.primary" overflow="hidden">
      <Box display={{ base: "none", lg: "block" }} h="full" flexShrink={0}>
        <SideBar />
      </Box>

      <Flex direction="column" flex="1" minW="0">
        <NavBar onMenuOpen={() => setMobileNavOpen(true)} />
        <Box as="main" flex="1" overflowY="auto" overscrollBehavior="contain">
          <Box
            maxW="71.875rem"
            px={{ base: "1rem", md: "2.5rem" }}
            pt={{ base: "1rem", md: "1.5rem" }}
            pb="4rem"
          >
            <Suspense
              fallback={
                <Flex justify="center" pt="6rem">
                  <Spinner color="sandal.700" />
                </Flex>
              }
            >
              {children}
            </Suspense>
          </Box>
        </Box>
      </Flex>

      <Drawer.Root
        open={isMobileNavOpen}
        onOpenChange={(details) => setMobileNavOpen(details.open)}
        placement="start"
      >
        <Portal>
          <Drawer.Backdrop bg="overlay" />
          <Drawer.Positioner>
            <Drawer.Content w="auto" maxW="none" p="0">
              <Drawer.Body p="0" h="full">
                <SideBar onNavigate={() => setMobileNavOpen(false)} />
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </Flex>
  );
}
