import { IssueStatusBadge } from "@/app/components";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import NextLink from "next/link";
import { Issue, Status } from "@prisma/client";

export interface IssueQuery {
  statusFilter: Status;
  orderByFilter: keyof Issue;
  pageNumber: string;
  search?: string;
}

interface Props {
  issues: Issue[];
  searchParams: IssueQuery;
}

const IssueTable = ({
  issues,
  searchParams: { orderByFilter, pageNumber, statusFilter, search },
}: Props) => {
  return (
    <>
      {issues.length !== 0 && (
        <Table.Root variant="surface">
          <Table.Header className="text-center">
            <Table.Row>
              {columns.map((column) => (
                <Table.ColumnHeaderCell
                  key={column.value}
                  className={column.classname}
                >
                  <NextLink
                    href={{
                      query: {
                        orderByFilter: column.value,
                        statusFilter,
                        pageNumber,
                        search,
                      },
                    }}
                  >
                    {column.label}
                    {column.value === orderByFilter && (
                      <ArrowUpIcon className="inline" />
                    )}
                  </NextLink>
                </Table.ColumnHeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body className="text-center">
            {issues.map((issue) => (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                  <div className="md:hidden mt-2">
                    <IssueStatusBadge status={issue.status} />
                  </div>
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  <IssueStatusBadge status={issue.status} />
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {issue.createdAt.toDateString()}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </>
  );
};

const columns: { label: string; value: keyof Issue; classname?: string }[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", classname: "hidden md:table-cell" },
  {
    label: "Created At",
    value: "createdAt",
    classname: "hidden md:table-cell",
  },
];

export const columnName = columns.map((column) => column.value);

export default IssueTable;
