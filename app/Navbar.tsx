"use client";

import { Container, Flex } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import { Skeleton } from "./components";
import Status from "./issues/_components/Status";

const Navbar = () => {
  return (
    <nav className="border-b py-5 px-5">
      <Container>
        <Flex justify="between" align="center">
          <Flex align="center" gap="4">
            <Link href="/">
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "issues",
      href: "/issues/list",
    },
  ];

  return (
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={classNames({
              "nav-link": true,
              "!text-zinc-900 font-medium": currentPath === link.href,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status } = useSession();
  const currentPath = usePathname();

  if (status === "loading") return <Skeleton width="3rem" />;

  if (
    status === "unauthenticated" &&
    currentPath !== "/userAuth/signUp" &&
    currentPath !== "/userAuth/signIn"
  )
    return (
      <Flex gap="8">
        <Link className="nav-link" href="/userAuth/signUp">
          Sign Up
        </Link>

        <Link className="nav-link" href="/api/auth/signin">
          Log In
        </Link>
      </Flex>
    );

  return <>{status === "authenticated" && <Status />}</>;
};

export default Navbar;
