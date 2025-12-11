// src/validator/create-bond.zod.ts
import { z } from "zod";
import { CouponFrequency } from "@/enum/coupon-frequency.enum";
import { CouponType } from "@/enum/coupon-type.enum";

export const CreateBondZod = z.object({
  name: z.string().nonempty("Bond name is required."),
  annualCouponRate: z
    .number()
    .min(0, "Annual coupon rate cannot be negative."),
  isin: z.string().nonempty("ISIN is required."),
  couponFrequency: z.nativeEnum(CouponFrequency, {
  
  }),
  unitPrice: z
    .number()
    .positive("Unit price must be greater than zero."),
  couponType: z.nativeEnum(CouponType, {
    
  }),
  meturityDate: z.string().optional(),
  isPublic: z.boolean().optional(),
});

export type CreateBondInput = z.infer<typeof CreateBondZod>;
