import { Button, Flex, Span, Stack, Text } from "@chakra-ui/react";
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
          size="2rem"
          avatarFallBackProps={{
            fontSize: "13.7px",
            fontWeight: 700,
          }}
        />
        <Stack gap="0.4rem" minW="0" lineHeight="1.25">
          <Flex align="center" gap="0.625rem" minW="0">
            <Text
              textStyle={"p2"}
              fontWeight={500}
              color="text.primary"
              truncate
            >
              {revision.client.name}
            </Text>
            {revision.portalStatus === "active" && (
              <StatusBadge
                textStyle={"p4"}
                h={"1.125rem"}
                tone="success"
                color={"success.700"}
              >
                Active
              </StatusBadge>
            )}
          </Flex>
          <MetaLine
            // fontSize="0.9375rem"
            color="text.secondary"
          >
            <Span textStyle={"p3"}>{revision.project}</Span>
            <Span textStyle={"p3"}>{revision.milestone}</Span>
            <Span textStyle={"p3"}>
              {plural(revision.revisionCount, "revision")}
            </Span>
          </MetaLine>
          <MetaLine
            // bg={"red.200"}
            fontSize="0.875rem"
            color="text.tertiary"
            lineHeight={"0rem"}
          >
            <Span textStyle={"p3"}>{plural(revision.fileCount, "file")}</Span>
            <Span textStyle={"p3"}>{plural(revision.linkCount, "link")}</Span>
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
        <Stack gap="0.375rem">
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
