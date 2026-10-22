import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MetaLine, StatusBadge, UserAvatar } from "@/components/common";
import { CommentIcon, WithUnreadDot } from "@/components/icons";
import { RouteConstants } from "@/shared/constants/routes";
import { useGetPendingRevisionsQuery } from "../../api";
import type { PendingRevision } from "../../interface";
import { ListCard } from "../shared/ListCard";
import { SectionHeading } from "../shared/SectionHeading";
import { SectionEmpty, SectionSkeleton } from "../shared/SectionState";

const plural = (count: number, word: string) =>
  `${count} ${word}${count === 1 ? "" : "s"}`;

function RevisionRow({ revision }: { revision: PendingRevision }) {
  return (
    <ListCard
      py="0.75rem"
      actions={
        <Button asChild h="2rem" px="1rem" fontSize="0.9375rem">
          <Link
            to={RouteConstants.portals.revisions.generate({
              id: revision.portalId,
            })}
          >
            View requests
          </Link>
        </Button>
      }
    >
      <Flex align="flex-start" gap="0.75rem" minW="0">
        <UserAvatar
          name={revision.client.name}
          src={revision.client.avatarUrl}
          size="1.875rem"
        />
        <Stack gap="0.125rem" minW="0" lineHeight="1.25">
          <Flex align="center" gap="0.625rem" minW="0">
            <Text fontSize="1rem" color="text.primary" truncate>
              {revision.client.name}
            </Text>
            {revision.portalStatus === "active" && (
              <StatusBadge tone="success">Active</StatusBadge>
            )}
          </Flex>
          <MetaLine fontSize="0.9375rem" color="text.tertiary">
            <span>{revision.project}</span>
            <span>{revision.milestone}</span>
            <span>{plural(revision.revisionCount, "revision")}</span>
          </MetaLine>
          <MetaLine fontSize="0.875rem" color="text.muted">
            <span>{plural(revision.fileCount, "file")}</span>
            <span>{plural(revision.linkCount, "link")}</span>
            <Flex
              as="span"
              align="center"
              gap="0.1875rem"
              aria-label={`${plural(revision.commentCount, "comment")}${
                revision.hasUnreadComments ? ", some unread" : ""
              }`}
            >
              <WithUnreadDot show={revision.hasUnreadComments}>
                <CommentIcon boxSize="0.875rem" />
              </WithUnreadDot>
              {revision.commentCount}
            </Flex>
          </MetaLine>
        </Stack>
      </Flex>
    </ListCard>
  );
}

export function PendingRevisions() {
  const { data: revisions, isPending } = useGetPendingRevisionsQuery();

  return (
    <Stack as="section" gap="0.75rem">
      <SectionHeading>Pending revisions</SectionHeading>
      {isPending ? (
        <SectionSkeleton rowH="5.375rem" />
      ) : revisions?.length ? (
        <Stack gap="0.3125rem">
          {revisions.map((revision) => (
            <RevisionRow key={revision.id} revision={revision} />
          ))}
        </Stack>
      ) : (
        <SectionEmpty>No revision requests waiting on you.</SectionEmpty>
      )}
    </Stack>
  );
}
