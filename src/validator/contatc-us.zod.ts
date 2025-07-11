import { z } from "zod";

export const ContactUsZod = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .email("Please enter a valid email address"),
    firstName: z.string({ required_error: "First name is required" })
        .nonempty({ message: "First name cannot be empty" }),
    lastName: z.string({ required_error: "Last name is required" })
        .nonempty({ message: "Last name cannot be empty" }),
    phoneNumber: z.string({ required_error: "Phone number is required" })
        .nonempty({ message: "Phone number cannot be empty" }),
    message: z.string({ required_error: "Message is required" })
        .nonempty({ message: "Message cannot be empty" }),
});
