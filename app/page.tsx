import prisma from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";
import IssueChart from "./IssueChart";
import IssueSummery from "./IssueSummery";
import LatestIssues from "./LatestIssues";

const Home = async () => {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });
  return (
    <Grid align="center" columns={{ initial: "1", md: "2" }} gap="5">
      <Flex justify="center" direction="column" gap="5">
        <IssueSummery closed={closed} inProgress={inProgress} open={open} />
        <IssueChart closed={closed} inProgress={inProgress} open={open} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
};

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "Here is the summery of issue details",
};

export default Home;
