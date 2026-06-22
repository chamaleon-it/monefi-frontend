import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword"
];

export const CareersZod = z.object({
  name: z.string("Name is required").min(1, "Name cannot be empty"),
  email: z.string("Email is required").email("Please enter a valid email address"),
  message: z.string().optional(),
  file: z.any()
    .refine((files) => files && files.length >= 1, "Resume is required.")
    .refine((files) => files && files[0]?.size <= MAX_FILE_SIZE, "Max file size is 10MB.")
    .refine(
      (files) => files && ACCEPTED_FILE_TYPES.includes(files[0]?.type),
      "Only .pdf, .doc, and .docx formats are supported."
    )
});
