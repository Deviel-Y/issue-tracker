"use client";

import { Link, Spinner } from "@/app/components";
import { useUsers } from "@/app/issues/[id]/AssigneeSelect";
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  IconButton,
  Popover,
  Separator,
  Text,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  AiFillEyeInvisible,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLock,
  AiOutlineMail,
} from "react-icons/ai";
import { BsGithub, BsGoogle } from "react-icons/bs";

const LogInForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  return (
    <>
      <form onSubmit={handleSubmit((data) => signIn("credentials", data))}>
        <Card className="max-w-lg shadow-lg bg-slate-100 rounded-lg !p-5">
          <Flex direction="column" gap="5">
            <Flex direction="column" gap="3">
              <Heading size="8" as="h1">
                Login
              </Heading>
              <Text>
                Don&apos;t have an account yet?{" "}
                <Link href="/userAuth/signUp">Sign Up</Link>
              </Text>
            </Flex>

            <Box>
              <Text className="text-[15px]" as="label">
                Email
              </Text>
              <TextField.Root
                {...register("email")}
                type="email"
                className="transition-all mt-1"
                size="3"
                radius="large"
              >
                <TextField.Slot>
                  <AiOutlineMail />
                </TextField.Slot>
              </TextField.Root>
            </Box>

            <Box>
              <Flex justify="between">
                <Text className="text-[15px]" as="label">
                  Password
                </Text>
                <ForgotPasswordPopOver />
              </Flex>
              <TextField.Root
                {...register("password")}
                type={showPassword ? "text" : "password"}
                className="transition-all mt-1"
                size="3"
                radius="large"
              >
                <TextField.Slot>
                  <AiOutlineLock />
                </TextField.Slot>
                <TextField.Slot>
                  <IconButton
                    radius="full"
                    size="1"
                    color="gray"
                    variant="soft"
                    onClick={(event) => event.preventDefault()}
                    onMouseEnter={() => setShowPassword(true)}
                    onMouseLeave={() => setShowPassword(false)}
                  >
                    {!showPassword ? <AiOutlineEye /> : <AiFillEyeInvisible />}
                  </IconButton>
                </TextField.Slot>
              </TextField.Root>
            </Box>

            <Button
              onClick={(event) => event.preventDefault()}
              disabled={isSubmitting}
              size="3"
              color="iris"
              className="!transition-all !cursor-pointer"
            >
              Log In {isSubmitting && <Spinner />}
            </Button>

            <Flex my="2" gap="3" justify="center" align="center">
              <Separator orientation="horizontal" size="3" />
              <Text color="gray">or login with</Text>
              <Separator orientation="horizontal" size="3" />
            </Flex>

            <Flex
              gapY={{ initial: "3" }}
              justify="between"
              direction={{ initial: "column", md: "row" }}
              px={{ initial: "0", sm: "7" }}
            >
              <Button
                onClick={(event) => {
                  event.preventDefault(), signIn("google");
                }}
                color="tomato"
                variant="surface"
                size="4"
                className="hover:bg-red-600 hover:text-white !transition-all !cursor-pointer !px-11"
              >
                <BsGoogle /> Google
              </Button>

              <Button
                onClick={(event) => {
                  event.preventDefault(), signIn("github");
                }}
                highContrast
                variant="surface"
                size="4"
                color="gray"
                className="hover:bg-gray-700 hover:text-white !transition-all !cursor-pointer !px-11"
              >
                <BsGithub />
                GitHub
              </Button>
            </Flex>
          </Flex>
        </Card>
      </form>
    </>
  );
};

const ForgotPasswordPopOver = () => {
  const { data: users } = useUsers();

  const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false);
  const [isEmailChecked, setEmailChecked] = useState<boolean>(false);

  const { register, watch } = useForm();

  const insertedEmail: string = watch("email", "");
  const insertedPassword = watch("password", "");

  const user = users?.find(
    (user) => user.email === insertedEmail.toLowerCase()
  );

  return (
    <Popover.Root>
      <Popover.Trigger>
        <Text className="text-[15px] cursor-pointer" color="iris" as="span">
          Forgot Password?
        </Text>
      </Popover.Trigger>
      <Popover.Content width="350px">
        <Flex direction="column" gap="4">
          <Heading size="5" align="center">
            Reset Password
          </Heading>

          <TextField.Root
            {...register("email")}
            className="!transition-all"
            type="email"
          >
            <TextField.Slot>
              <AiOutlineMail />
            </TextField.Slot>
          </TextField.Root>

          <TextField.Root
            disabled={!isEmailChecked}
            className="!transition-all"
            type={isPasswordVisible ? "text" : "password"}
            {...register("password")}
          >
            <TextField.Slot>
              <AiOutlineLock />
            </TextField.Slot>

            <TextField.Slot>
              <IconButton
                size="1"
                color="gray"
                variant="ghost"
                onClick={(event) => event.preventDefault()}
                onMouseEnter={() => setPasswordVisible(true)}
                onMouseLeave={() => setPasswordVisible(false)}
              >
                {isPasswordVisible ? (
                  <AiOutlineEyeInvisible />
                ) : (
                  <AiOutlineEye />
                )}
              </IconButton>
            </TextField.Slot>
          </TextField.Root>

          <Flex justify="center" gap="3">
            <Button
              onClick={(event) => {
                event.preventDefault();
                user?.email && user.hashedPassword
                  ? setEmailChecked(true)
                  : setEmailChecked(false);
              }}
              radius="full"
              className="!transition-all !cursor-pointer"
              color="iris"
            >
              Check Email
            </Button>
            <Button
              onClick={(event) => {
                event.preventDefault;
                axios
                  .patch("/api/user/" + user?.id, {
                    email: insertedEmail,
                    password: insertedPassword,
                  })
                  .then(() => {
                    signIn("credentials", {
                      email: insertedEmail,
                      password: insertedPassword,
                    });
                  });
              }}
              disabled={!isEmailChecked}
              radius="full"
              className="!transition-all !cursor-pointer"
              color="red"
            >
              Change Password
            </Button>
          </Flex>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
};

export default LogInForm;
