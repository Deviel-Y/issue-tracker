"use client";

import { Issue, Status } from "@prisma/client";
import { Select, Text } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

interface Props {
  issues: Issue[];
  issueId: number;
}

const ChangeStatusSelect = ({ issues, issueId }: Props) => {
  const router = useRouter();
  const statuses: { label: string; value: Status }[] = [
    { label: "Open", value: "OPEN" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "CLOSED" },
  ];

  const issue = issues.find((issue) => issue.id === issueId);

  return (
    <>
      <Select.Root
        defaultValue={issue?.status}
        onValueChange={(data) => {
          axios
            .patch("/api/issues/" + issueId, { status: data })
            .then(() => {
              router.refresh();
              toast.success("Status changed successfully!");
            })
            .catch(() => toast.error("An unexpented error occured"));
        }}
      >
        <Select.Trigger placeholder="Change Status" />
        <Select.Content>
          <Select.Group>
            <Select.Label>Status Select</Select.Label>
            {statuses?.map((status) => (
              <Select.Item value={status.value} key={status.value}>
                {status.label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default ChangeStatusSelect;
