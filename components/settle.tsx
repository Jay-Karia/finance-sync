import getSettlements from "@/lib/settle";
import { Group } from "@/types/group";
import { SettleType } from "@/types/settle";
import { useEffect, useState } from "react";
import {Button} from "./ui/button";

export default function Settle({ group }: { group: Group }) {
  const [settlements, setSettlements] = useState<SettleType[]>([]);

  useEffect(() => {
    setSettlements(getSettlements(group));
  }, [group]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-2">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Settle Up
      </h2>
      {settlements.length > 0 ? (
        settlements.map((settlement, index) => (
          <div
            key={index}
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <div className="mb-4 sm:mb-0">
                <p className="text-gray-800 dark:text-gray-200 font-medium">
                  {settlement.paidBy} owes {settlement.paidTo}
                </p>
                <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                  {settlement.amount.toFixed(2)}
                </p>
              </div>
              <Button className="px-4 py- text-white rounded-lg transition-colors">
                Mark as Settled
              </Button>
            </div>
          </div>
        ))
      ) : (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4 sm:mb-0">
            All settled up! No outstanding balances.
          </p>
        </div>
      )}
    </div>
  );
}
