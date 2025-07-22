import {z} from "zod";

export const expenseSchema = z.object({
  id: z.string().optional(),
  groupId: z.string().optional(),
  name: z.string().min(1, "Expense name is required"),
  amount: z.number("Expected a number").min(0.01, "Amount must be greater than 0"),
  date: z.string().optional(),
  paidBy: z.array(z.string()).min(1, "At least one person must pay the expense"),
  splitBetween: z.array(z.string()).min(1, "At least one person must split the expense"),
  splitType: z.enum(["equally", "percentage", "amount", "fraction"]),
  userShares: z.record(z.string(), z.number().min(0, "Share must be non-negative")),
  notes: z.string().optional(),
  createdBy: z.string().optional(),
});

export const newExpenseSchema = expenseSchema.omit({
  id: true,
  groupId: true,
}).extend({
  percentages: z.array(z.number("Expected Number")).optional().refine(
    (percentages) => {
      if (!percentages) return true;
      const sum = percentages.reduce((acc, percentage) => acc + percentage, 0);
      return Math.abs(sum - 100) < 0.0001; // Allow small floating point errors
    },
    { message: "Percentages must sum to 100" }
  ),
  amounts: z.array(z.number()).optional(),
});
