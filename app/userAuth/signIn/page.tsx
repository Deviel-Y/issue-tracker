import signIn from "@/public/SignIn.jpg";
import { Grid } from "@radix-ui/themes";
import Image from "next/image";
import LogInForm from "./LogInForm";

const CustomSignInPage = () => {
  return (
    <Grid columns={{ xl: "1", sm: "2" }} align="center" justify="between">
      <Image
        className="max-md:hidden"
        src={signIn}
        alt="vector image for sign in page"
      />
      <LogInForm />
    </Grid>
  );
};

export default CustomSignInPage;
