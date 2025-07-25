import { Group } from "@/types/group";
import { SettleType } from "@/types/settle";

export default function updateSettlements(group: Group): SettleType[] {
  const useShares = group.userShares;

  // preserve only already settled entries
  const preserved = group.settlements.filter((s) => s.settled);

  // Calculate net balances for each user
  const netBalances: { [userId: string]: number } = {};
  // start from current share balances
  Object.keys(useShares).forEach((userId) => {
    netBalances[userId] = useShares[userId];
  });

  // Generate new settlements to minimize transactions
  const newSettlements: SettleType[] = [];
  const debtors = Object.entries(netBalances).filter(
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    ([_, balance]) => balance < 0
  );
  const creditors = Object.entries(netBalances).filter(
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    ([_, balance]) => balance > 0
  );

  let i = 0,
    j = 0;
  while (i < debtors.length && j < creditors.length) {
    const [debtorId, debtAmount] = debtors[i];
    const [creditorId, creditAmount] = creditors[j];

    const settleAmount = Math.min(Math.abs(debtAmount), creditAmount);

    if (settleAmount > 0) {
      newSettlements.push({
        id: crypto.randomUUID(),
        groupId: group.id,
        from: debtorId,
        to: creditorId,
        amount: settleAmount,
        settled: false,
      });
    }

    debtors[i][1] += settleAmount;
    creditors[j][1] -= settleAmount;

    if (debtors[i][1] === 0) i++;
    if (creditors[j][1] === 0) j++;
  }

  // Return preserved settled entries plus new unsettled ones
  return [...preserved, ...newSettlements].map((settlement) => ({
    ...settlement,
    groupId: group.id,
  }));
}
