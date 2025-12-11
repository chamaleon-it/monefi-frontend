import { z } from "zod";

export const ContactUsZod = z.object({
    email: z
        .string( "Email is required" )
        .email("Please enter a valid email address"),
    firstName: z.string( "First name is required" )
        .nonempty({ message: "First name cannot be empty" }),
    lastName: z.string( "Last name is required" )
        .nonempty({ message: "Last name cannot be empty" }),
    phoneNumber: z.string( "Phone number is required" )
        .nonempty({ message: "Phone number cannot be empty" }),
    message: z.string( "Message is required" )
        .nonempty({ message: "Message cannot be empty" }),
});
