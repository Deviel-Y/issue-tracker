import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(5),
});

export const issueSchemaPatch = z.object({
  title: z.string().min(3).max(255).optional(),
  description: z.string().min(5).max(60_000).optional(),
  status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"]).optional(),
  assignedToUserId: z
    .string()
    .min(1, "assignedToUserId is required")
    .max(255)
    .optional()
    .nullable(),
});

export const signUpSchema = z
  .object({
    email: z.string().min(2).max(50).email(),
    password: z
      .string()
      .min(3)
      .max(200)
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" }),
    confirmPassword: z
      .string()
      .min(3)
      .max(200)
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const patchUserSchema = z.object({
  email: z.string().min(2).max(50).email().optional(),
  name: z.string().min(3).max(100).optional(),
  password: z
    .string()
    .min(3)
    .max(200)
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
});

export const signInBodySchema = z.object({
  email: z.string().email().max(50),
  password: z.string().max(200).min(3),
});
