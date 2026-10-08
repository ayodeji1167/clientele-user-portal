import { useEffect } from "react";
import { Button, Heading, Stack, Text } from "@chakra-ui/react";
import { useRouteError } from "react-router-dom";
import { isChunkLoadError, reloadForNewDeploy } from "@/utils/chunk-reload";

export function RouteError() {
  const error = useRouteError();

  // A lazy chunk that 404s after a redeploy just needs a reload to pick up the
  // new build, not an error screen.
  useEffect(() => {
    if (isChunkLoadError(error)) {
      reloadForNewDeploy();
    }
  }, [error]);

  return (
    <Stack minH="100vh" align="center" justify="center" gap="4" px="4">
      <Heading size="lg">Something went wrong</Heading>
      <Text color="gray.500">An unexpected error occurred.</Text>
      <Button onClick={() => window.location.reload()}>Reload page</Button>
    </Stack>
  );
}
