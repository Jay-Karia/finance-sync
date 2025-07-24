import { Transaction } from "@/types/expense";
import { Group } from "@/types/group";

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
    const { amount, participants, paidBy } = transaction;
    const share = amount / participants.length;
    const payer = paidBy[0]; // assume single payer for simplicity

    participants.forEach((member) => {
      if (member === payer) {
        // payer fronted money but also consumed one share,
        // so net they should receive (amount − share)
        const net = amount - share;
        updatedGroup.userShares[member] =
          (updatedGroup.userShares[member] || 0) + net;
      } else {
        // other members owe their share → negative balance
        updatedGroup.userShares[member] =
          (updatedGroup.userShares[member] || 0) - share;
      }
    });
  }

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
    const { amount, participants, paidBy } = transaction;
    const share = amount / participants.length;
    const payer = paidBy[0]; // assume single payer for simplicity

    participants.forEach((member) => {
      if (member === payer) {
        // payer fronted money but also consumed one share,
        // so net they should receive (amount − share)
        const net = amount - share;
        updatedGroup.userShares[member] =
          (updatedGroup.userShares[member] || 0) - net;
      } else {
        // other members owe their share → negative balance
        updatedGroup.userShares[member] =
          (updatedGroup.userShares[member] || 0) + share;
      }
    });
  }

  return updatedGroup;
}
