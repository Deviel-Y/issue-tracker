"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  currentPage: number;
  itemCount: number;
  pageSize: number;
}

const Pagination = ({ currentPage, itemCount, pageSize }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalPages: number = Math.ceil(itemCount / pageSize);
  if (totalPages <= 1) return null;

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("pageNumber", page.toString());
    router.push("?" + params.toString());
  };

  return (
    <Flex align="center" gap="3">
      <Text size="2" className="font-medium">
        Page {currentPage} of {totalPages}
      </Text>

      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => changePage(1)}
      >
        <DoubleArrowLeftIcon />
      </Button>

      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        <ChevronLeftIcon />
      </Button>

      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === totalPages}
        onClick={() => changePage(currentPage + 1)}
      >
        <ChevronRightIcon />
      </Button>

      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === totalPages}
        onClick={() => changePage(totalPages)}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
