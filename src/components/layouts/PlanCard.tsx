import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import type { WorkspacePlan } from "@/features/workspace/interface";
import { RouteConstants } from "@/shared/constants/routes";

function UsageLine({ label, value }: { label: string; value: string }) {
  return (
    <Text fontSize="0.8125rem" lineHeight="1rem" color="text.subtle">
      {label}:{" "}
      <Text as="span" color="white" fontWeight="500">
        {value}
      </Text>
    </Text>
  );
}

/** Dark usage card pinned to the bottom of the sidebar. */
export function PlanCard({ plan }: { plan: WorkspacePlan }) {
  if (!plan.usage) return null;
  const { clients, templates, storageGb } = plan.usage;

  return (
    <Box bg="westar.950" borderRadius="0.75rem" p="0.75rem">
      <Text
        fontSize="0.875rem"
        lineHeight="1.1"
        fontWeight="600"
        letterSpacing="-0.03em"
        textTransform="uppercase"
        color="white"
      >
        {plan.name} plan
      </Text>
      <Stack gap="0" mt="0.4375rem">
        <UsageLine label="Clients" value={`${clients.used}/${clients.limit}`} />
        <UsageLine
          label="Templates"
          value={`${templates.used}/${templates.limit}`}
        />
        <UsageLine
          label="Storage"
          value={`${storageGb.used} / ${storageGb.limit}GB`}
        />
      </Stack>
      <Button asChild variant="muted" w="full" h="2rem" mt="0.625rem">
        <Link to={RouteConstants.settings.subscription.path}>Upgrade plan</Link>
      </Button>
    </Box>
  );
}
