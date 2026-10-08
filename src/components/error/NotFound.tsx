import { Button, Heading, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { appRoutes } from "@/shared/constants/routes";

export function NotFound() {
  return (
    <Stack minH="100vh" align="center" justify="center" gap="4" px="4">
      <Heading size="2xl">404</Heading>
      <Text color="gray.500">The page you are looking for does not exist.</Text>
      <Button asChild>
        <Link to={appRoutes.home}>Go home</Link>
      </Button>
    </Stack>
  );
}
