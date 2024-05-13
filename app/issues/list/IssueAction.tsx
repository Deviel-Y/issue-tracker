import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueStatusFilter from "./IssueStatusFilter";
import IssueSearch from "./IssueSearch";

const IssueAction = () => {
  return (
    <Flex justify="between">
      <IssueStatusFilter />
      <IssueSearch />
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueAction;
