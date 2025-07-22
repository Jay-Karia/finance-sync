import { z } from "zod";

export const moneyGivenSchema = z.object({
  id: z.string().optional(),
  groupId: z.string().optional(),
  givenBy: z.string().min(1, { message: "Given by is required" }),
  amount: z
    .number("Expected a number")
    .min(0.01, { message: "Amount must be greater than 0" }),
  forWhat: z.string().min(1, { message: "For what is required" }),
  date: z.string().optional(),
  givenTo: z
    .array(z.string())
    .min(1, { message: "At least one recipient is required" }),
});

export const newMoneyGivenSchema = moneyGivenSchema.omit({
  id: true,
  groupId: true,
});
