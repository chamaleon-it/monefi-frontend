// src/validator/create-bond.zod.ts
import { z } from "zod";
import { CouponFrequency } from "@/enum/coupon-frequency.enum";
import { CouponType } from "@/enum/coupon-type.enum";

export const CreateBondZod = z.object({
  name: z.string().nonempty("Bond name is required."),
  annualCouponRate: z
    .number({ invalid_type_error: "Annual coupon rate must be a number." })
    .min(0, "Annual coupon rate cannot be negative."),
  isin: z.string().nonempty("ISIN is required."),
  couponFrequency: z.nativeEnum(CouponFrequency, {
    errorMap: () => ({ message: "Select a valid coupon frequency." }),
  }),
  unitPrice: z
    .number({ invalid_type_error: "Unit price must be a number." })
    .positive("Unit price must be greater than zero."),
  couponType: z.nativeEnum(CouponType, {
    errorMap: () => ({ message: "Select a valid coupon type." }),
  }),
  meturityDate: z.string().optional(),
  isPublic: z.boolean().optional(),
});

export type CreateBondInput = z.infer<typeof CreateBondZod>;
