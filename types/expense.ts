export type Transaction = {
  id: string; // base64 or uuid
  groupId: string; // which group this belongs to
  name: string; // “For What?”
  amount: number; // total amount
  date?: string; // ISO string
  paidBy: string[]; // who fronted the cash
  participants: string[]; // same as splitBetween
  splitType: "equally" | "percentage" | "amount" | "fraction";
  expenseType: "expense" | "given" | "received";
  notes?: string;
};
