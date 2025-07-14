import { z } from "zod";

export const ForgotPassswordZod = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Please enter a valid email address"),
  
});
