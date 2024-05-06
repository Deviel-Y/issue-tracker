import { Box, Card, Flex } from "@radix-ui/themes";
import React from "react";
import Skeleton from "react-loading-skeleton";

const FormSkeleton = () => {
  return (
    <Box>
      <Card className="max-w-md shadow-lg bg-slate-100 rounded-lg !p-5">
        <Flex gap="5" align="center" direction="column">
          <Skeleton width="8rem" height="2rem" />

          <Box className="w-full">
            <Skeleton height="2rem" />
          </Box>

          <Box className="w-full">
            <Skeleton height="2rem" />
          </Box>

          <Box className="w-full">
            <Skeleton height="2rem" />
          </Box>

          <Box className="w-full">
            <Skeleton height="2rem" />
          </Box>

          <Box className="w-full">
            <Skeleton height="2rem" />
          </Box>
        </Flex>
      </Card>
    </Box>
  );
};

export default FormSkeleton;
