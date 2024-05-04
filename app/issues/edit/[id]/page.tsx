import prisma from "@/prisma/client";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { cache } from "react";
import IssueFormSkeleton from "../../_components/IssueFormSkeleton";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

interface Props {
  params: { id: string };
}

const fetchIssue = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const EditIssuePage = async ({ params: { id } }: Props) => {
  const issue = await fetchIssue(parseInt(id));

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
};

export const generateMetadata = async ({ params: { id } }: Props) => {
  const issue = await fetchIssue(parseInt(id));

  return await {
    title: "Edit Issue",
    description: "Description of issue : " + issue?.description,
  };
};

export default EditIssuePage;
