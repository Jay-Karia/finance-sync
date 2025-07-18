import { z } from 'zod';
import { expenseSchema } from '@/schema/expense';

export type Expense = z.infer<typeof expenseSchema>;
