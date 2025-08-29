import { InvestmentType } from "@/enum/investment-type.enum";
import { z } from "zod";

export const InvestmentZod = z.object({
  investmentType: z.nativeEnum(InvestmentType, {
    required_error: "Investment type is required",
    invalid_type_error: "Invalid investment type selected",
  }),
  user: z
    .string({
      required_error: "User ID is required",
      invalid_type_error: "User ID must be a string",
    })
    .min(1, "User ID cannot be empty"),
  symbol: z
    .string({
      required_error: "Symbol is required",
      invalid_type_error: "Symbol must be a string",
    })
    .min(1, "Symbol cannot be empty"),
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(1, "Name cannot be empty"),
  unitPrice: z.coerce
    .number({
      required_error: "Unit price is required",
      invalid_type_error: "Unit price must be a number",
    })
    .positive("Unit price must be a positive number"),
  quantity: z.coerce
    .number({
      required_error: "Quantity is required",
      invalid_type_error: "Quantity must be a number",
    })
    .positive("Quantity must be a positive number"),
  buyBackDate: z.string().optional(),
});
