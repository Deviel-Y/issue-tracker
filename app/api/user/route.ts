import { signUpSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const GET = async (request: NextRequest) => {
  const users = await prisma.user.findMany({
    orderBy: { name: "asc" },
  });

  if (!users)
    return NextResponse.json({ error: "No user found" }, { status: 404 });

  return NextResponse.json(users);
};

export const POST = async (request: NextRequest) => {
  type SignUpSchema = z.infer<typeof signUpSchema>;

  const body: SignUpSchema = await request.json();
  const { email, password, firstname, lastname } = body;

  const validation = signUpSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const user = await prisma.user.findUnique({ where: { email } });

  if (user)
    return NextResponse.json(
      { error: "User is already exist" },
      { status: 400 }
    );

  const hashedPassword = await bcrypt.hash(password, 10);

  const fullname = `${firstname} ${lastname}`;

  const newUser = await prisma.user.create({
    data: { email: email.toLowerCase(), hashedPassword, name: fullname },
  });

  return NextResponse.json(newUser.email);
};
