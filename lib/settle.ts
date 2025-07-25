import { Group } from "@/types/group";
import { SettleType } from "@/types/settle";

export default function updateSettlements(group: Group): SettleType[] {
  return [
    {
      id: "1",
      amount: 10,
      paidBy: "test1",
      paidTo: "test2",
      groupId: group.id,
    },
    {
      id: "2",
      amount: 30,
      paidBy: "test3",
      paidTo: "test2",
      groupId: group.id,
    },
  ];
}
  