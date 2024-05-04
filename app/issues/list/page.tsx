import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import IssueAction from "./IssueAction";
import IssueTable, { columnName, IssueQuery } from "./IssueTable";
import Pagination from "./Pagination";

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({
  searchParams: { statusFilter, orderByFilter, pageNumber },
}: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(statusFilter) ? statusFilter : undefined;

  const orderBy = columnName.includes(orderByFilter)
    ? { [orderByFilter]: "asc" }
    : undefined;

  const pageSize: number = 10;
  const page = parseInt(pageNumber) || 1;

  const issues: Issue[] = await prisma.issue.findMany({
    where: { status },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where: { status } });

  return (
    <Flex gap="3" direction="column">
      <IssueAction />
      <IssueTable
        issues={issues}
        searchParams={{ orderByFilter, pageNumber, statusFilter }}
      />
      <Pagination
        currentPage={page}
        itemCount={issueCount}
        pageSize={pageSize}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "Here is the list of all issues",
};

export default IssuesPage;
