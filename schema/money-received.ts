import { z } from "zod";

export const moneyReceivedSchema = z.object({
  id: z.string().optional(),
  groupId: z.string().optional(),
  receivedBy: z.string().min(1, { message: "Received by is required" }),
  forWhat: z.string().min(1, { message: "For what is required" }),
  amount: z
    .number("Expected a number")
    .min(0.01, { message: "Amount must be greater than 0" }),
  date: z.string().optional(),
  receivedFrom: z.string()
    .min(1, { message: "At least one sender is required" }),
});

export const newMoneyReceivedSchema = moneyReceivedSchema.omit({
  id: true,
  groupId: true,
});
