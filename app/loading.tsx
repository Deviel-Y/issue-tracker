import { Skeleton } from "@/app/components";
import { Card, Flex, Grid, Table } from "@radix-ui/themes";

const LoadingDashboardPage = () => {
  const skeletonRow: number[] = [1, 2, 3, 4, 5];
  return (
    <Grid mt="3" align="center" columns={{ initial: "1", md: "2" }} gap="5">
      <Flex justify="center" direction="column" gap="5">
        <Flex justify="center" gap="5" align="center">
          <Skeleton width="7rem" height="4rem" />
          <Skeleton width="9rem" height="4rem" />
          <Skeleton width="7rem" height="4rem" />
        </Flex>
        <Skeleton width="35rem" height="20rem" />
      </Flex>
      <Card className="shadow-md">
        <Skeleton width="8rem" height="2rem" className="mb-6" />
        <Table.Root>
          <Table.Body>
            {skeletonRow.map((skeleton) => (
              <Table.Row key={skeleton}>
                <Table.Cell>
                  <Flex align="center" justify="between">
                    <Flex direction="column" gap="3" align="start">
                      <Skeleton width="8rem" />
                      <Skeleton width="4rem" />
                    </Flex>
                    <Skeleton borderRadius="100%" width="3rem" height="3rem" />
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Card>
    </Grid>
  );
};

export default LoadingDashboardPage;
