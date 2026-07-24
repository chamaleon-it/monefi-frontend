import { z } from "zod";

export const UserRegistrationZod = z
  .object({
    name: z.string().nonempty("Full name is required.").min(4, "Full name should contain at least 4 characters."),
    email: z
      .string()
      .nonempty("Email is required")
      .email("Please enter a valid email address"),
    password: z
      .string()
      .nonempty("Password is required")
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string()
      .nonempty("Confirm Password is required")
      .min(8, "Confirm Password must be at least 8 characters long"),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the Terms of Service and Privacy Policy",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Attach error to the confirmPassword field
  });

