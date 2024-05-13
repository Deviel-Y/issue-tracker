"use client";

import { signUpSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  IconButton,
  Text,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import {
  AiFillEyeInvisible,
  AiFillLock,
  AiOutlineEye,
  AiOutlineLock,
  AiOutlineMail,
  AiOutlineUser,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { z } from "zod";

interface PasswordVisibility {
  mainPassword: boolean;
  confirmationPassword: boolean;
}

const SignUpForm = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState<PasswordVisibility>({
    mainPassword: false,
    confirmationPassword: false,
  });

  type FormData = z.infer<typeof signUpSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(signUpSchema) });

  const onFormSumittion = handleSubmit(
    async (data) =>
      await axios
        .post("/api/user", data)
        .then(async () => {
          await signIn("credentials", data);
        })
        .catch(() => toast.error("User with this email exists"))
  );

  return (
    <>
      <form onSubmit={onFormSumittion}>
        <Card className="max-w-md shadow-lg bg-slate-100 rounded-lg !p-5">
          <Flex gap="4" align="center" direction="column">
            <Heading as="h1" size="8">
              Sign Up
            </Heading>

            <Flex
              className="w-full"
              gap="3"
              direction={{ initial: "column", md: "row" }}
            >
              <Box>
                <Text className="text-[15px]" as="label">
                  First Name
                </Text>
                <TextField.Root
                  {...register("firstname")}
                  className="transition-all"
                  type="text"
                  size="3"
                  radius="large"
                >
                  <TextField.Slot>
                    <AiOutlineUser />
                  </TextField.Slot>
                </TextField.Root>
                {errors.firstname && (
                  <Text color="red">{errors.firstname.message}</Text>
                )}
              </Box>

              <Box>
                <Text className="text-[15px]" as="label">
                  Last Name
                </Text>
                <TextField.Root
                  {...register("lastname")}
                  className="transition-all"
                  type="text"
                  size="3"
                  radius="large"
                >
                  <TextField.Slot>
                    <AiOutlineUserAdd />
                  </TextField.Slot>
                </TextField.Root>
                {errors.lastname && (
                  <Text color="red">{errors.lastname.message}</Text>
                )}
              </Box>
            </Flex>

            <Box className="w-full">
              <Text className="text-[15px]" as="label">
                Email
              </Text>
              <TextField.Root
                {...register("email")}
                className="transition-all"
                type="email"
                size="3"
                radius="large"
              >
                <TextField.Slot>
                  <AiOutlineMail />
                </TextField.Slot>
              </TextField.Root>
              {errors.email && <Text color="red">{errors.email.message}</Text>}
            </Box>

            <Box className="w-full">
              <Text className="text-[15px]" as="label">
                Password
              </Text>
              <TextField.Root
                {...register("password")}
                className="transition-all"
                type={showPassword.mainPassword ? "text" : "password"}
                size="3"
                radius="large"
              >
                <TextField.Slot>
                  <AiOutlineLock />
                </TextField.Slot>
                <TextField.Slot>
                  <IconButton
                    variant="ghost"
                    onClick={(event) => event.preventDefault()}
                    onMouseEnter={(event) => {
                      event.preventDefault(),
                        setShowPassword({
                          ...showPassword,
                          mainPassword: true,
                        });
                    }}
                    onMouseLeave={(event) => {
                      event.preventDefault(),
                        setShowPassword({
                          ...showPassword,
                          mainPassword: false,
                        });
                    }}
                  >
                    {!showPassword.mainPassword ? (
                      <AiOutlineEye />
                    ) : (
                      <AiFillEyeInvisible />
                    )}
                  </IconButton>
                </TextField.Slot>
              </TextField.Root>
              {errors.password && (
                <Text color="red">{errors.password.message}</Text>
              )}
            </Box>

            <Box className="w-full">
              <Text className="text-[15px]" as="label">
                Confirm Password
              </Text>
              <TextField.Root
                {...register("confirmPassword")}
                className="transition-all"
                type={showPassword.confirmationPassword ? "text" : "password"}
                size="3"
                radius="large"
              >
                <TextField.Slot>
                  <AiFillLock />
                </TextField.Slot>
                <TextField.Slot>
                  <IconButton
                    variant="ghost"
                    onClick={(event) => event.preventDefault()}
                    onMouseEnter={(event) => {
                      event.preventDefault(),
                        setShowPassword({
                          ...showPassword,
                          confirmationPassword: true,
                        });
                    }}
                    onMouseLeave={(event) => {
                      event.preventDefault(),
                        setShowPassword({
                          ...showPassword,
                          confirmationPassword: false,
                        });
                    }}
                  >
                    {!showPassword.confirmationPassword ? (
                      <AiOutlineEye />
                    ) : (
                      <AiFillEyeInvisible />
                    )}
                  </IconButton>
                </TextField.Slot>
              </TextField.Root>
              {errors?.confirmPassword?.message && (
                <Text color="red">{errors.confirmPassword.message}</Text>
              )}
            </Box>

            <Grid gap="6" columns="2" align="center" justify="between">
              <Button
                className="!cursor-pointer  !transition-all col-span-3"
                variant="solid"
                color="iris"
                size="3"
                radius="full"
              >
                Register
              </Button>
              <Button
                className="!cursor-pointer !max-w-20 !transition-all "
                size="3"
                radius="full"
                color="gray"
                variant="ghost"
                onClick={(event) => {
                  event.preventDefault(), router.push("/");
                }}
              >
                Cancel
              </Button>
            </Grid>

            <Text size="2">
              You have an account?
              <Link className="text-blue-500 ml-1" href="/api/auth/signin">
                Log In
              </Link>
            </Text>
          </Flex>
        </Card>
      </form>
      <Toaster />
    </>
  );
};

export default SignUpForm;
