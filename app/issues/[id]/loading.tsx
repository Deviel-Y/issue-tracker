import { Box, Card, Flex } from "@radix-ui/themes";
import { Skeleton } from "../../components";

const LoadingIssueDetailPage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton height="1.5rem" className="mb-3" />
      <Flex className="space-x-4" mb="3">
        <Skeleton width="4rem" />
        <Skeleton width="7rem" />
      </Flex>
      <Card className="prose">
        <Skeleton height="20rem" />
      </Card>
    </Box>
  );
};

export default LoadingIssueDetailPage;
