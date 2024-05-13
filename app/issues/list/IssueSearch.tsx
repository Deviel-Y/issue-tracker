"use client";

import { TextField } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";
import { AiOutlineSearch } from "react-icons/ai";

const IssueSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const param = new URLSearchParams(searchParams);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value;
    if (searchQuery) param.set("search", searchQuery);

    if (!searchQuery) param.delete("search");

    const query = param.size && "?" + param.toString();
    router.push("/issues/list" + query);
  };

  return (
    <TextField.Root
      radius="full"
      placeholder="Issue Search"
      className="!transition-all !w-96"
      onChange={onChangeHandler}
    >
      <TextField.Slot>
        <AiOutlineSearch />
      </TextField.Slot>
    </TextField.Root>
  );
};

export default IssueSearch;
