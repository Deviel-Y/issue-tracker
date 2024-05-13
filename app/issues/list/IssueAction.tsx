import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import IssueSearch from "./IssueSearch";
import IssueStatusFilter from "./IssueStatusFilter";

const IssueAction = () => {
  return (
    <Flex justify="between" gap="2">
      <IssueStatusFilter />
      <IssueSearch />
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueAction;
