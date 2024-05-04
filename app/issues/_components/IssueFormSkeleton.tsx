import { Box } from "@radix-ui/themes";
import Skeleton from "@/app/components/Skeleton";

const IssueFormSkeleton = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton className="mb-5" />
      <Skeleton count={10} />
      <Skeleton className="mt-5" width="8rem" height="2rem" />
    </Box>
  );
};

export default IssueFormSkeleton;
