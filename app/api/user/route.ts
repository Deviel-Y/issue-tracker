import { signInBodySchema, signUpSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
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
  type signInBodyType = z.infer<typeof signInBodySchema>;
  const body: signInBodyType = await request.json();

  const validation = signUpSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const user = await prisma.user.findUnique({ where: { email: body.email } });

  if (user)
    return NextResponse.json(
      { error: "User is already exist" },
      { status: 400 }
    );

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const newUser = await prisma.user.create({
    data: { email: body.email.toLowerCase(), hashedPassword },
  });

  return NextResponse.json(newUser.email);
};
