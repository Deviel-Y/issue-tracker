import { patchUserSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (request: NextRequest) => {
  const body = await request.json();

  const validation = patchUserSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const user = await prisma.user.findUnique({ where: { email: body.email } });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const updatedUser = await prisma.user.update({
    where: { email: body.email },
    data: { hashedPassword },
  });

  return NextResponse.json(updatedUser.email);
};
