import { Group } from "@/types/group";
import { SettleType } from "@/types/settle";

export default function updateSettlements(group: Group): SettleType[] {
  const useShares = group.userShares;

  return [
    {
      id: "1",
      amount: 10,
      paidBy: "test1",
      paidTo: "test2",
      groupId: group.id,
      settled: false,
    },
    {
      id: "2",
      amount: 30,
      paidBy: "test3",
      paidTo: "test2",
      groupId: group.id,
      settled: false,
    },
    {
      id: "3",
      amount: 30,
      paidBy: "test3",
      paidTo: "test2",
      groupId: group.id,
      settled: false,
    },
    {
      id: "4",
      amount: 30,
      paidBy: "test3",
      paidTo: "test2",
      groupId: group.id,
      settled: false,
    },
  ];
}
