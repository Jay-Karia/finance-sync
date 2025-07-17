"use client";

import { Group } from "@/types/group";

// When the expense is given by the group.

/*
  Description: for the expense
  Date: when is expense was given
  Amount: how much was given
  Paid by: who paid the expense (could be multiple people)
  Pay Share: how much each person paid
  Split Between: who the expense is split between (could be multiple people)
  Split: how the expense is split among the group members (equally, by percentage, by amount, by fraction)
  Notes: any additional notes about the expense (optional)
*/

/*
  Description: Dinner at restaurant
  Date: 2023-10-01
  Amount: 1700
  Paid By: [Mahil, Deep, Rudra]
  Pay Share: [100, 200, 500]
  Split Between: all
  Split: fraction
*/

export default function Expense({ group }: { group: Group }) {
  return <>{group.name}</>;
}
