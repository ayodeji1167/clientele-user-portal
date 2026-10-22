import { Heading, Stack, Text } from "@chakra-ui/react";
import { Head } from "@/components/seo/Head";

/** Placeholder for sections whose screens haven't been designed yet. */
export function ComingSoon({ title }: { title: string }) {
  return (
    <>
      <Head title={title} />
      <Stack gap="0.5rem" pt="4rem" align="center" textAlign="center">
        <Heading textStyle="h5" fontWeight="600" color="text.primary">
          {title}
        </Heading>
        <Text textStyle="p2" color="text.muted">
          This section is on its way.
        </Text>
      </Stack>
    </>
  );
}
