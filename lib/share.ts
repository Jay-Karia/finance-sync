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

  // handle a simple equal‐split expense
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

    // First, add what each payer paid
    paidBy.forEach((payer, idx) => {
      const paid = payments[idx] || 0;
      updatedGroup.userShares[payer] =
        (updatedGroup.userShares[payer] || 0) + paid;
    });

    // Then, subtract what each participant owes
    participants.forEach((member) => {
      updatedGroup.userShares[member] =
        (updatedGroup.userShares[member] || 0) - share;
    });
  }

  // handle amount-split expense
  if (
    transaction.expenseType === "expense" &&
    transaction.splitType === "amount"
  ) {
    const { amount, participants, paidBy, paidAmounts, splitAmounts } =
      transaction;
    if (!splitAmounts || splitAmounts.length !== participants.length) {
      throw new Error(
        "Exact split requires splitAmounts array matching participants length"
      );
    }
    const payments =
      paidAmounts && paidAmounts.length === paidBy.length
        ? paidAmounts
        : paidBy.map(() => amount / paidBy.length);
    // Update shares for all payers first
    paidBy.forEach((payer, payerIdx) => {
      const paid = payments[payerIdx];
      updatedGroup.userShares[payer] =
        (updatedGroup.userShares[payer] || 0) + paid;
    });

    // Then subtract what each participant owes
    participants.forEach((member, idx) => {
      const owed = splitAmounts[idx];
      updatedGroup.userShares[member] =
        (updatedGroup.userShares[member] || 0) - owed;
    });
  }

  // handle percentage-split expense
  if (
    transaction.expenseType === "expense" &&
    transaction.splitType === "percentage"
  ) {
    const { amount, participants, paidBy, paidAmounts, splitPercentages } =
      transaction;
    if (!splitPercentages || splitPercentages.length !== participants.length) {
      throw new Error(
        "Percentage split requires splitPercentages array matching participants length"
      );
    }
    const payments =
      paidAmounts && paidAmounts.length === paidBy.length
        ? paidAmounts
        : paidBy.map(() => amount / paidBy.length);
    // Update shares for all payers first
    paidBy.forEach((payer, payerIdx) => {
      const paid = payments[payerIdx];
      updatedGroup.userShares[payer] =
        (updatedGroup.userShares[payer] || 0) + paid;
    });

    // Then subtract what each participant owes based on percentage
    participants.forEach((member, idx) => {
      const owed = (splitPercentages[idx] / 100) * amount;
      updatedGroup.userShares[member] =
        (updatedGroup.userShares[member] || 0) - owed;
    });
  }

  // handle money given
  if (transaction.expenseType === "given") {
    const { amount, participants, paidBy } = transaction;
    const share = amount / participants.length;

    // First, add what each payer gave
    paidBy.forEach((payer) => {
      updatedGroup.userShares[payer] =
        (updatedGroup.userShares[payer] || 0) + amount;
    });

    // Then, subtract what each participant owes
    participants.forEach((member) => {
      updatedGroup.userShares[member] =
        (updatedGroup.userShares[member] || 0) - share;
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

  // handle amount-split expense in revert
  if (
    transaction.expenseType === "expense" &&
    transaction.splitType === "amount"
  ) {
    const { amount, participants, paidBy, paidAmounts, splitAmounts } =
      transaction;
    if (!splitAmounts || splitAmounts.length !== participants.length) {
      throw new Error(
        "Exact split requires splitAmounts array matching participants length"
      );
    }
    const payments =
      paidAmounts && paidAmounts.length === paidBy.length
        ? paidAmounts
        : paidBy.map(() => amount / paidBy.length);
    // Update shares for all payers first
    paidBy.forEach((payer, payerIdx) => {
      const paid = payments[payerIdx];
      updatedGroup.userShares[payer] =
        (updatedGroup.userShares[payer] || 0) - paid;
    });

    // Then add back what each participant owed
    participants.forEach((member, idx) => {
      const owed = splitAmounts[idx];
      updatedGroup.userShares[member] =
        (updatedGroup.userShares[member] || 0) + owed;
    });
  }

  // handle percentage-split expense in revert
  if (
    transaction.expenseType === "expense" &&
    transaction.splitType === "percentage"
  ) {
    const { amount, participants, paidBy, paidAmounts, splitPercentages } =
      transaction;
    if (!splitPercentages || splitPercentages.length !== participants.length) {
      throw new Error(
        "Percentage split requires splitPercentages array matching participants length"
      );
    }
    const payments =
      paidAmounts && paidAmounts.length === paidBy.length
        ? paidAmounts
        : paidBy.map(() => amount / paidBy.length);
    // Update shares for all payers first
    paidBy.forEach((payer, payerIdx) => {
      const paid = payments[payerIdx];
      updatedGroup.userShares[payer] =
        (updatedGroup.userShares[payer] || 0) - paid;
    });

    // Then add back what each participant owed based on percentage
    participants.forEach((member, idx) => {
      const owed = (splitPercentages[idx] / 100) * amount;
      updatedGroup.userShares[member] =
        (updatedGroup.userShares[member] || 0) + owed;
    });
  }

  // handle money given in revert
  if (transaction.expenseType === "given") {
    const { amount, participants, paidBy } = transaction;
    const share = amount / participants.length;

    // First, subtract what each payer gave
    paidBy.forEach((payer) => {
      updatedGroup.userShares[payer] =
        (updatedGroup.userShares[payer] || 0) - amount;
    });

    // Then, add back what each participant owed
    participants.forEach((member) => {
      updatedGroup.userShares[member] =
        (updatedGroup.userShares[member] || 0) + share;
    });
  }

  // update settlements
  updatedGroup.settlements = updateSettlements(updatedGroup);

  return updatedGroup;
}
