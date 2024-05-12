"use client";

import {
  AlertDialog,
  Avatar,
  Button,
  Flex,
  HoverCard,
  Popover,
  Text,
} from "@radix-ui/themes";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { AiOutlineUser } from "react-icons/ai";
import { useUsers } from "../[id]/AssigneeSelect";

const Status = () => {
  return (
    <>
      <ShowHoverCard />
      <SmallScreenUserCard />
    </>
  );
};

const SmallScreenUserCard = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const currentPath = usePathname();

  const { data: users } = useUsers();

  const user = users?.find((user) => user.email === session?.user?.email);

  return (
    <Text className="lg:hidden">
      Hi{" "}
      <Popover.Root>
        <Popover.Trigger>
          <Text className="cursor-pointer" style={{ color: "var(--accent-9)" }}>
            {session?.user?.name}
          </Text>
        </Popover.Trigger>
        <Popover.Content>
          <Flex direction="column" gap="5">
            <Flex gap="3" align="center">
              <Avatar
                src={session?.user?.image!}
                fallback={<AiOutlineUser />}
                radius="full"
              />
              <Flex gap="1" direction="column">
                <Text>{session?.user?.name}</Text>
                <Text className="text-gray-500" size="2">
                  {session?.user?.email}
                </Text>
              </Flex>
            </Flex>

            <SignOutConfirmation />
          </Flex>
        </Popover.Content>
      </Popover.Root>
    </Text>
  );
};

const ShowHoverCard = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const currentPath = usePathname();

  const { data: users } = useUsers();

  const user = users?.find((user) => user.email === session?.user?.email);

  return (
    <Text className="max-lg:hidden">
      Hi{" "}
      <HoverCard.Root>
        <HoverCard.Trigger>
          <Text style={{ color: "var(--accent-9)" }}>
            {session?.user?.name || "User"}
          </Text>
        </HoverCard.Trigger>
        <HoverCard.Content>
          <Flex direction="column" gap="5">
            <Flex gap="3" align="center">
              <Avatar
                src={session?.user?.image!}
                fallback={<AiOutlineUser />}
                radius="full"
              />
              <Flex gap="1" direction="column">
                <Text>{session?.user?.name || "User"}</Text>
                <Text className="text-gray-500" size="2">
                  {session?.user?.email}
                </Text>
              </Flex>
            </Flex>
            {currentPath !== `/userAuth/userInfo/${user?.id}` && (
              <Button
                color="cyan"
                onClick={() => router.push(`/userAuth/userInfo/${user?.id}`)}
                className="!cursor-pointer"
              >
                User Info
              </Button>
            )}
            <SignOutConfirmation />
          </Flex>
        </HoverCard.Content>
      </HoverCard.Root>
    </Text>
  );
};

const SignOutConfirmation = () => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button
          color="red"
          variant="ghost"
          className="!transition-all !cursor-pointer !font-medium"
        >
          Sign Out
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirm Signing-Out</AlertDialog.Title>
        <AlertDialog.Description mt="-1">
          Are you sure you want to sign out?
        </AlertDialog.Description>
        <Flex mt="5" gap="3">
          <AlertDialog.Cancel>
            <Button
              className="!transition-all !cursor-pointer"
              color="gray"
              variant="soft"
            >
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              className="!transition-all !cursor-pointer"
              color="red"
              onClick={() => signOut()}
            >
              Sign Out
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default Status;
