import { Group } from "@/types/group";
import { SettleType } from "@/types/settle";

export default function getSettlements(group: Group): SettleType[] {
  return [
    { amount: 10, paidBy: "test1", paidTo: "test2", groupId: group.id },
    { amount: 30, paidBy: "test3", paidTo: "test2", groupId: group.id },
  ];
}
