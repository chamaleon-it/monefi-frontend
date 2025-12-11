import { InvestmentType } from "@/enum/investment-type.enum";
import { z } from "zod";

export const InvestmentZod = z.object({
  investmentType: z.nativeEnum(InvestmentType, "Investment type is required"),
  user: z
    .string(
       "User ID is required",
      )
    .min(1, "User ID cannot be empty"),
  symbol: z
    .string(
       "Symbol is required"
    )
    .min(1, "Symbol cannot be empty"),
  name: z
    .string(
       "Name is required"
      
    )
    .min(1, "Name cannot be empty"),
  unitPrice: z.coerce
    .number()
    .positive("Unit price must be a positive number"),
  quantity: z.coerce
    .number()
    .positive("Quantity must be a positive number"),
    annualCouponRate: z.coerce
    .number()
    .positive("Quantity must be a positive number"),
  buyBackDate: z.string().optional(),
});
