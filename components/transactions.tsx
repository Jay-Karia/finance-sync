import { Group } from "@/types/group";
import { CiUndo } from "react-icons/ci";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { FaTriangleExclamation } from "react-icons/fa6";
import { useSetAtom } from "jotai";
import { groupsAtom } from "@/atoms";
import { ERROR_TOAST_STYLE, SUCCESS_TOAST_STYLE } from "@/constants";
import {toast} from "sonner";

export default function Transactions({ group }: { group: Group }) {
  const setGroups = useSetAtom(groupsAtom);

  function handleRemoveTransaction(id: string) {
    try {
      // Find the transaction to remove
      const transactionIndex = group.transactions.findIndex((t) => t.id === id);
      if (transactionIndex === -1) return;

      // Update the total transaction amount
      const expenseType = group.transactions[transactionIndex].expenseType;
      if (expenseType === "expense") {
        group.totalSpent -= group.transactions[transactionIndex].amount;
      }

      // Create a new array without the removed transaction
      const updatedTransactions = [
        ...group.transactions.slice(0, transactionIndex),
        ...group.transactions.slice(transactionIndex + 1),
      ];

      // Update the group with the new transactions array
      group.transactions = updatedTransactions;

      // Update the state
      setGroups((prevGroups) =>
        prevGroups.map((g) => (g.id === group.id ? group : g))
      );
      toast.success("Transaction removed successfully.", SUCCESS_TOAST_STYLE);
    } catch (error) {
      console.error("Failed to remove transaction:", error);
      toast.error(
        "Failed to remove transaction. Please try again.",
        ERROR_TOAST_STYLE
      );
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-2">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Transactions
      </h2>
      <div className="space-y-4">
        {group.transactions && group.transactions.length > 0 ? (
          group.transactions.map((exp) => (
            <div
              key={exp.id}
              className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-md shadow-sm"
            >
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {exp.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Paid by: {exp.paidBy.join(", ")} on{" "}
                  <time dateTime={exp.date}>{exp.date}</time>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <p className="font-semibold text-gray-900 dark:text-gray-100">
                  {exp.amount.toFixed(2)}
                </p>
                <Dialog>
                  <form onSubmit={() => handleRemoveTransaction(exp.id)}>
                    <DialogTrigger asChild>
                      <Button variant="ghost">
                        <CiUndo className="text-xl" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center">
                            <FaTriangleExclamation className="text-yellow-600 dark:text-yellow-400 text-[24px]" />
                          </div>
                          <DialogTitle>Remove Transaction</DialogTitle>
                        </div>
                      </DialogHeader>
                      <div className="grid gap-4">
                        <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
                          This action cannot be undone.
                        </p>
                      </div>
                      <DialogFooter className="mt-8">
                        <DialogClose asChild>
                          <Button variant="outline" className="w-1/2">
                            Cancel
                          </Button>
                        </DialogClose>
                        <Button
                          type="submit"
                          className="bg-yellow-600 hover:bg-yellow-700 text-white w-1/2"
                          onClick={() => handleRemoveTransaction(exp.id)}
                        >
                          Yes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </form>
                </Dialog>
              </div>
            </div>
          ))
        ) : (
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <p className="text-gray-600 dark:text-gray-400">
              No transactions yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
