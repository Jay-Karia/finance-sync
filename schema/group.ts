import { Transaction } from "@/types/expense";
import { SettleType } from "@/types/settle";
import { z } from "zod";

export const newGroupSchema = z.object({
  name: z.string().min(1, "Group name is required"),
  description: z.string().optional(),
  members: z.array(z.string()),
  date: z.string().optional(),
  createdBy: z.string().min(1, "Created by is required"),
  userShares: z.record(z.string(), z.number()),
  settlements: z.array(z.custom<SettleType>()),
});

export const groupSchema = newGroupSchema.extend({
  id: z.string(),
  transactions: z.array(z.custom<Transaction>()),
  totalSpent: z.number(),
});
