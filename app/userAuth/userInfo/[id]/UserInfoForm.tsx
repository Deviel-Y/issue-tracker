"use client";

import { UploadButton as UserImageUploadButton } from "@/app/utils/uploadthing";
import {
  Avatar,
  Box,
  Card,
  Flex,
  Heading,
  Text,
  TextField,
  Checkbox,
  Button,
  IconButton,
} from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  AiFillCheckCircle,
  AiFillLock,
  AiOutlineLock,
  AiOutlineUser,
  AiOutlineUserSwitch,
} from "react-icons/ai";

const UserInfoForm = () => {
  const [imageURL, setImageURL] = useState<string>();
  const [changePassword, setChangePassword] = useState<boolean>(true);

  const { data: session } = useSession();

  return (
    <>
      <form>
        <Card className="bg-slate-100 shadow-lg !p-10">
          <Flex align="center" direction="column" gap="2">
            <Heading as="h1">User Info</Heading>

            <Avatar
              src={imageURL || session?.user?.image || imageURL}
              fallback={<AiOutlineUser />}
              size="9"
              radius="full"
            />

            <UserImageUploadButton
              className="inline"
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                toast.success("User profile has been changed");
                setImageURL(res[0].url);
              }}
              onUploadError={(error: Error) => {
                toast.error("Unexpected error occured");
              }}
            />

            <Flex gap="6" mt="6">
              <Box>
                <Text size="2">First Name</Text>
                <TextField.Root className="!transition-all" placeholder="John">
                  <TextField.Slot>
                    <AiOutlineUser />
                  </TextField.Slot>
                </TextField.Root>
              </Box>

              <Box>
                <Text size="2">Last Name</Text>
                <TextField.Root className="!transition-all" placeholder="Doe">
                  <TextField.Slot>
                    <AiOutlineUserSwitch />
                  </TextField.Slot>
                </TextField.Root>
              </Box>
            </Flex>

            <Text mt="5" as="label" size="2">
              <Flex gap="2">
                <Checkbox
                  onCheckedChange={() => setChangePassword(!changePassword)}
                />
                I'd like to change my password
              </Flex>
            </Text>

            <Flex gap="6">
              <Box>
                <Text size="2">Current Password</Text>
                <TextField.Root
                  radius="large"
                  className="!transition-all"
                  disabled={changePassword}
                >
                  <IconButton
                    disabled={changePassword}
                    className="!transition-all !cursor-pointer"
                    color="cyan"
                  >
                    <AiFillCheckCircle size="1.2rem" />
                  </IconButton>
                  <TextField.Slot>
                    <AiOutlineLock />
                  </TextField.Slot>
                </TextField.Root>
              </Box>

              <Box>
                <Text size="2">New Password</Text>
                <TextField.Root
                  className="!transition-all"
                  disabled={changePassword}
                >
                  <TextField.Slot>
                    <AiFillLock />
                  </TextField.Slot>
                </TextField.Root>
              </Box>
            </Flex>

            <Flex align="center" gap="9" mt="7">
              <Button
                size="3"
                className="!transition-all !cursor-pointer"
                color="cyan"
              >
                Submit
              </Button>
              <Button
                size="3"
                className="!transition-all !cursor-pointer"
                color="red"
                variant="outline"
              >
                Cancel
              </Button>
            </Flex>
          </Flex>
        </Card>
      </form>
      <Toaster />
    </>
  );
};

export default UserInfoForm;
