"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const statuses: { label: string; value: Status }[] = [
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onValueChangeHandler = (status: string) => {
    const param = new URLSearchParams();

    if (status) param.append("statusFilter", status);

    if (searchParams.get("orderByFilter"))
      param.append("orderByFilter", searchParams.get("orderByFilter")!);

    if (searchParams.get("search"))
      param.append("search", searchParams.get("search")!);

    const query = param.size && "?" + param.toString();
    router.push("/issues/list" + query);
  };

  return (
    <Select.Root
      defaultValue={searchParams.get("statusFilter") || "ALL_ISSUES"}
      onValueChange={onValueChangeHandler}
    >
      <Select.Trigger placeholder="Filter by..." />
      <Select.Content>
        <Select.Item value="ALL_ISSUES">All Issues</Select.Item>
        {statuses.map((status) => (
          <Select.Item key={status.value} value={status.value}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
