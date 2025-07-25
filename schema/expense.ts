import { z } from "zod";

export const expenseSchema = z.object({
  id: z.string().optional(),
  groupId: z.string().optional(),
  name: z.string().min(1, { message: "Expense name is required" }),
  amount: z
    .number("Expected a number")
    .min(0.01, { message: "Amount must be greater than 0" }),
  date: z.string().optional(),
  paidBy: z
    .array(z.string())
    .min(1, { message: "At least one payer is required" }),
  splitBetween: z
    .array(z.string())
    .min(1, { message: "At least one split participant is required" }),
  splitType: z.enum(["equally", "percentage", "amount"]),
  payAmount: z.array(z.number()),
});

export const newExpenseSchema = expenseSchema
  .omit({ id: true, groupId: true })
  .extend({
    splitPercentages: z.array(z.number("Expected a number")).optional(),
    splitAmounts: z.array(z.number("Expected a number")).optional(),
  })
  .superRefine((data, ctx) => {
    const {
      splitType,
      splitBetween,
      splitPercentages: percentages,
      splitAmounts: amounts,
      amount,
      payAmount,
      paidBy,
    } = data;

    if (
      Math.abs(payAmount.reduce((a, b) => a + b, 0) - amount) > 0.01 &&
      paidBy.length > 1
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["paidBy"],
        message: "Pay amounts must sum to total amount",
      });
    }

    if (splitType === "percentage") {
      if (!percentages) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["percentages"],
          message: "Percentages are required",
        });
      } else if (percentages.length !== splitBetween.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["percentages"],
          message: "Must provide one percentage per participant",
        });
      } else if (
        Math.abs(percentages.reduce((a, b) => a + b, 0) - 100) > 0.01
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["percentages"],
          message: "Percentages must sum to 100",
        });
      }
    }

    if (splitType === "amount") {
      if (!amounts) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["amounts"],
          message: "Amounts are required",
        });
      } else if (amounts.length !== splitBetween.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["amounts"],
          message: "Must provide one amount per participant",
        });
      } else if (Math.abs(amounts.reduce((a, b) => a + b, 0) - amount) > 0.01) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["amounts"],
          message: "Amounts must sum to total amount",
        });
      }
    }
  });
