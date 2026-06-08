import { z } from "zod";

export const CreateIpoZod = z.object({
  name: z.string().min(1, "Name is required"),
  companyName: z.string().min(1, "Company Name is required"),
  stockSymbol: z.string().min(1, "Stock Symbol is required"),
  openDate: z.string().min(1, "Open Date is required"),
  closeDate: z.string().min(1, "Close Date is required"),
  listingDate: z.string().min(1, "Listing Date is required"),
  priceBandMin: z.number().min(0, "Must be greater than or equal to 0"),
  priceBandMax: z.number().min(0, "Must be greater than or equal to 0"),
  lotSize: z.number().min(1, "Must be at least 1"),
  issueSize: z.number().min(1, "Must be at least 1"),
  price: z.number().min(0, "Must be greater than or equal to 0"),
  companyDescription: z.string().optional(),
  officialWebsite: z.string().optional(),
  status: z.enum(["Upcoming", "Open", "Closed", "Listed"]).optional(),
  isPublic: z.boolean().optional(),
});

export type CreateIpoInput = z.infer<typeof CreateIpoZod>;
