"use client";

import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

interface Props {
  issue: Issue;
}

const AssigneeSelect = ({ issue }: Props) => {
  const { data: users, error } = useUsers();
  const router = useRouter();

  if (error) return null;

  return (
    <>
      <Select.Root
        defaultValue={issue?.assignedToUserId || "unassigned"}
        onValueChange={(userId) => {
          axios
            .patch(`/api/issues/${issue?.id}`, {
              assignedToUserId: userId === "unassigned" ? null : userId,
            })
            .then(() => {
              toast.success("Changes saved Successfully"), router.refresh();
            })
            .catch(() => toast.error("Changes could not be apllied"));
        }}
      >
        <Select.Trigger placeholder="Assign issue to..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Assign to...</Select.Label>

            <Select.Item value="unassigned">Unassigne</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => {
      return axios.get<User[]>("/api/user").then((res) => res.data);
    },
  });

export default AssigneeSelect;
