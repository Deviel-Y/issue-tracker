"use client";

import { TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { AiOutlineSearch } from "react-icons/ai";

const IssueSearch = () => {
  const router = useRouter();

  return (
    <TextField.Root
      radius="full"
      placeholder="Issue Search"
      className="!transition-all"
      onChange={(event) => {
        const searchQuery = event.target.value;
        const searchParam = searchQuery ? `search=${searchQuery}` : "";
        router.push(`/issues/list/?${searchParam}`);
      }}
    >
      <TextField.Slot>
        <AiOutlineSearch />
      </TextField.Slot>
    </TextField.Root>
  );
};

export default IssueSearch;
