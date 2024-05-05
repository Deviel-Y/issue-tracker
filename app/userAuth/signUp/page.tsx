import Signup from "@/public/signup.jpg";
import { Grid } from "@radix-ui/themes";
import Image from "next/image";
import SignUpForm from "./SignUpForm";
import { getServerSession } from "next-auth";
import authOption from "@/app/api/auth/AuthOptions";
import { permanentRedirect } from "next/navigation";

const SignUpPage = async () => {
  const session = await getServerSession(authOption);
  if (session) permanentRedirect("/");

  return (
    <Grid align="center" columns={{ initial: "1", sm: "2" }}>
      <Image
        className="max-md:hidden"
        src={Signup}
        alt="SignUp form vector image"
      />
      <SignUpForm />
    </Grid>
  );
};

export default SignUpPage;
