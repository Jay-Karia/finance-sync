import { Group } from "@/types/group";
import { SettleType } from "@/types/settle";

export default function updateSettlements(group: Group): SettleType[] {
  const useShares = group.userShares;

  const unsettled = group.settlements.filter(
    (settlement) => !settlement.settled
  );
  const settled = group.settlements.filter((settlement) => settlement.settled);

  // Calculate net balances for each user
  const netBalances: { [userId: string]: number } = {};
  Object.keys(useShares).forEach((userId) => {
    netBalances[userId] = useShares[userId];
  });

  // Apply existing unsettled settlements to balances
  unsettled.forEach((settlement) => {
    netBalances[settlement.from] =
      (netBalances[settlement.from] || 0) - settlement.amount;
    netBalances[settlement.to] =
      (netBalances[settlement.to] || 0) + settlement.amount;
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

  // Return only settled settlements plus new settlements (remove old unsettled ones)
  const allSettlements = [...settled, ...newSettlements];
  return allSettlements.map((settlement) => ({
    ...settlement,
    groupId: group.id,
  }));
}
