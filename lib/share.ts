import { Transaction } from "@/types/expense";
import { Group } from "@/types/group";
import updateSettlements from "./settle";

export function updateUserShares(
  group: Group,
  transaction: Transaction
): Group {
  // clone group and its balances
  const updatedGroup: Group = {
    ...group,
    userShares: { ...(group.userShares || {}) },
  };

  // only handle a simple equal‐split expense
  if (
    transaction.expenseType === "expense" &&
    transaction.splitType === "equally"
  ) {
    const { amount, participants, paidBy, paidAmounts } = transaction;
    const share = amount / participants.length;

    // determine how much each payer actually paid, fallback to equal split among payers
    const payments =
      paidAmounts && paidAmounts.length === paidBy.length
        ? paidAmounts
        : paidBy.map(() => amount / paidBy.length);

    participants.forEach((member) => {
      const payIndex = paidBy.indexOf(member);
      if (payIndex !== -1) {
        const paid = payments[payIndex] || 0;
        const net = paid - share;
        updatedGroup.userShares[member] =
          (updatedGroup.userShares[member] || 0) + net;
      } else {
        updatedGroup.userShares[member] =
          (updatedGroup.userShares[member] || 0) - share;
      }
    });
  }

  // update settlements
  updatedGroup.settlements = updateSettlements(updatedGroup);

  return updatedGroup;
}

export function revertUserShares(
  group: Group,
  transaction: Transaction
): Group {
  // clone group and its balances
  const updatedGroup: Group = {
    ...group,
    userShares: { ...(group.userShares || {}) },
  };

  // only handle a simple equal‐split expense
  if (
    transaction.expenseType === "expense" &&
    transaction.splitType === "equally"
  ) {
    const { amount, participants, paidBy, paidAmounts } = transaction;
    const share = amount / participants.length;

    // determine how much each payer actually paid, fallback to equal split among payers
    const payments =
      paidAmounts && paidAmounts.length === paidBy.length
        ? paidAmounts
        : paidBy.map(() => amount / paidBy.length);

    participants.forEach((member) => {
      const payIndex = paidBy.indexOf(member);
      if (payIndex !== -1) {
        const paid = payments[payIndex] || 0;
        const net = paid - share;
        updatedGroup.userShares[member] =
          (updatedGroup.userShares[member] || 0) - net;
      } else {
        updatedGroup.userShares[member] =
          (updatedGroup.userShares[member] || 0) + share;
      }
    });
  }

  // update settlements
  updatedGroup.settlements = updateSettlements(updatedGroup);

  return updatedGroup;
}
