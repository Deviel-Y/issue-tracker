import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "../../validationSchema";
import { getServerSession } from "next-auth";
import AuthOptions from "../auth/AuthOptions";
import prisma from "@/prisma/client";
import { Issue } from "@prisma/client";

export const GET = async (request: NextRequest) => {
  const issues = await prisma.issue.findMany();
  if (!issues)
    return NextResponse.json({ error: "No issue found" }, { status: 404 });

  return NextResponse.json(issues);
};

export const POST = async (request: NextRequest) => {
  const session = await getServerSession(AuthOptions);
  if (!session)
    return NextResponse.json("You are not authorized", { status: 401 });

  const body: Issue = await request.json();
  const { title, description, assignedToUserId } = body;

  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const newIssue = await prisma.issue.create({
    data: {
      title,
      description,
      assignedToUserId,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
};
