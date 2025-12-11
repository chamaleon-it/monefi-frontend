import { z } from "zod";

export const ResetPasswordZod = z
  .object({
    token:z.string().min(1,"Token is required for password reset."),
    password: z
      .string( "Password is required" )
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string( "Confirm Password is required")
      .min(8, "Confirm Password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Attach error to the confirmPassword field
  });
