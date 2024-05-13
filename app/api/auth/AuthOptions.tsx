import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";

const authOption: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  session: { strategy: "jwt", maxAge: 6 * 60 * 60 }, //1 Day

  callbacks: {
    async redirect({ url, baseUrl }) {
      url.startsWith("/") ? `${url}` : `${baseUrl}`;

      return baseUrl;
    },
  },

  pages: {
    signIn: "/userAuth/signIn",
  },

  providers: [
    CredentialsProvider({
      name: " Credencials",
      credentials: {
        email: {
          label: "Email",
          placeholder: "yourEmail@example.com",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        const isPasswordMatch: boolean = await bcrypt.compare(
          credentials.password,
          user.hashedPassword!
        );

        return isPasswordMatch ? user : null;
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
};

export default authOption;
