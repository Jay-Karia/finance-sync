export type Transaction = {
  id: string; // base64 or uuid
  groupId: string; // which group this belongs to
  name: string; // “For What?”
  amount: number; // total amount
  date?: string; // ISO string
  paidBy: string[]; // who fronted the cash
  paidAmounts?: number[]; // amounts paid by each participant, if different
  participants: string[]; // same as splitBetween
  splitType: "equally" | "percentage" | "amount";
  expenseType: "expense" | "given" | "received";
  splitAmounts: number[],
  splitPercentages: number[]; // percentages for each participant, if splitType is "percentage"
  notes?: string;
};
