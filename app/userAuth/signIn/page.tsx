import signIn from "@/public/SignIn.jpg";
import { Grid } from "@radix-ui/themes";
import Image from "next/image";
import LogInForm from "./LogInForm";
import authOption from "@/app/api/auth/AuthOptions";
import { getServerSession } from "next-auth";
import { permanentRedirect } from "next/navigation";

const CustomSignInPage = async () => {
  const session = await getServerSession(authOption);
  if (session) permanentRedirect("/");

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
