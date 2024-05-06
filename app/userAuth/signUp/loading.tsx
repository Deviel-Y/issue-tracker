import { Skeleton } from "@/app/components";
import { Grid } from "@radix-ui/themes";
import FormSkeleton from "../_components/FormSkeleton";

const SignUpPage = async () => {
  return (
    <Grid
      align="center"
      mt="2rem"
      gap="2rem"
      columns={{ initial: "1", sm: "2" }}
    >
      <Skeleton height="30rem" />
      <FormSkeleton />
    </Grid>
  );
};

export default SignUpPage;
