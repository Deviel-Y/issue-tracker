"use client";

import { issueSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Callout, Spinner, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AiFillWarning } from "react-icons/ai";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";
import { ErrorMessage } from "../../components";
import { useSession } from "next-auth/react";
import { useUsers } from "../[id]/AssigneeSelect";

interface Props {
  issue?: Issue;
}

const IssueForm = ({ issue }: Props) => {
  const { data: userList } = useUsers();
  const { data: session } = useSession();
  const user = userList?.find((user) => user.email === session?.user?.email);

  const [error, setError] = useState<string>();
  const [isLoading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  type IssueFormData = z.infer<typeof issueSchema>;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      if (issue)
        await axios.patch(`/api/issues/${issue.id}`, {
          ...data,
          assignedToUserId: user?.id,
        });
      else
        await axios.post("/api/issues", {
          ...data,
          assignedToUserId: user?.id,
        });
      router.push("/");
      router.refresh();
    } catch (error) {
      setLoading(false);
      setError("An unexpected error occured");
    }
  });

  return (
    <div className="max-w-xl space-y-3">
      {error && (
        <Callout.Root color="red">
          <Callout.Icon>
            <AiFillWarning size={23} />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={onSubmit} className=" space-y-3">
        <TextField.Root
          placeholder="Title"
          {...register("title")}
          defaultValue={issue?.title}
        />
        {<ErrorMessage>{errors.title?.message}</ErrorMessage>}
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        {<ErrorMessage>{errors.description?.message}</ErrorMessage>}

        <Button disabled={isLoading}>
          {issue ? "Edit Issue" : "Submit New Issue"}
          {isLoading && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
