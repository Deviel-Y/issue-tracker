import authOption from "@/app/api/auth/AuthOptions";
import Signup from "@/public/signup.jpg";
import { Flex, Grid, Text } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import Image from "next/image";
import SignUpForm from "./SignUpForm";

const SignUpPage = async () => {
  const session = await getServerSession(authOption);
  if (session)
    return (
      <Flex justify="center" align="center">
        <Text className="font-medium text-4xl">
          You have logged-in so you cannot access this page
        </Text>
      </Flex>
    );

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
