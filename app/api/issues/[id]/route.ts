import { issueSchemaPatch } from "@/app/validationSchema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import AuthOptions from "../../auth/AuthOptions";
import prisma from "@/prisma/client";
import { Issue } from "@prisma/client";

interface Props {
  params: { id: string };
}

export const PATCH = async (
  request: NextRequest,
  { params: { id } }: Props
) => {
  const session = await getServerSession(AuthOptions);
  if (!session)
    return NextResponse.json("You are not authorized", { status: 401 });

  const body: Issue = await request.json();
  const { title, description, assignedToUserId, status } = body;

  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });

    if (!user)
      return NextResponse.json({ error: "Invalid user" }, { status: 400 });
  }

  const validation = issueSchemaPatch.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });
  if (!issue) return NextResponse.json("Issue does not exist", { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: parseInt(id) },
    data: { title, description, assignedToUserId, status },
  });

  return NextResponse.json(updatedIssue);
};

export const DELETE = async (
  request: NextRequest,
  { params: { id } }: Props
) => {
  const session = await getServerSession(AuthOptions);
  if (!session)
    return NextResponse.json("You are not authorized", { status: 401 });

  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });
  if (!issue) return NextResponse.json("Issue does not exist", { status: 404 });

  await prisma.issue.delete({ where: { id: parseInt(id) } });

  return NextResponse.json(issue);
};
