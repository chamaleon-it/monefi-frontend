import { z } from "zod";

export const UserLoginZod = z.object({
  email: z
    .string("Email is required" )
    .email("Please enter a valid email address"),
  password: z
    .string("Password is required" )
    .min(8, "Password must be at least 8 characters long"),
});
