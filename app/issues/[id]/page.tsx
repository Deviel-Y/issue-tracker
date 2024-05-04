import authOption from "@/app/api/auth/AuthOptions";
import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { cache } from "react";
import AssigneeSelect from "./AssigneeSelect";
import IssueDeleteButton from "./IssueDeleteButton";
import IssueDetail from "./IssueDetail";
import IssueEditButton from "./IssueEditButton";
import ChangeStatusSelect from "./ChangeStatusSelect";

interface Props {
  params: { id: string };
}

const fetchIssue = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const IssueDetailPage = async ({ params: { id } }: Props) => {
  const issues = await prisma.issue.findMany();

  const session = await getServerSession(authOption);

  const issue = await fetchIssue(parseInt(id));

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap={"5"}>
      <Box className="md:col-span-4">
        <IssueDetail issue={issue} />
      </Box>
      {session && (
        <Flex gap="3" direction="column">
          <ChangeStatusSelect issues={issues} issueId={parseInt(id)} />
          <AssigneeSelect issue={issue} />
          <IssueEditButton issueId={parseInt(id)} />
          <IssueDeleteButton issueId={parseInt(id)} />
        </Flex>
      )}
    </Grid>
  );
};

export const generateMetadata = async ({ params: { id } }: Props) => {
  const issue = await fetchIssue(parseInt(id));

  return await {
    title: "Issue Tracker - Details",
    description: "Description of issue : " + issue?.description,
  };
};

export default IssueDetailPage;
