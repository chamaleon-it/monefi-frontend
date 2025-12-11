import { z } from "zod";

export const ChangePasswordZod = z
  .object({
    currentPassword: z
      .string( "Password is required" )
      .min(8, "Password must be at least 8 characters long"),
    password: z
      .string( "Password is required" )
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string( "Confirm Password is required" )
      .min(8, "Confirm Password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Attach error to the confirmPassword field
  });
