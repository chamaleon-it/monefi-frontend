import { z } from "zod";

export const ForgotPassswordZod = z.object({
  email: z
    .string("Email is required")
    .email("Please enter a valid email address"),
  
});
