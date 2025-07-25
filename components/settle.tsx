import { Group } from "@/types/group";
import { SettleType } from "@/types/settle";
import { Button } from "./ui/button";
import { useSetAtom } from "jotai";
import { groupsAtom } from "@/atoms";
import { CiUndo } from "react-icons/ci";

export default function Settle({ group }: { group: Group }) {
  const setGroups = useSetAtom(groupsAtom);

  function updateSettlement(settlement: SettleType, settled = true) {
    // Update the group's settlements by removing the settled transaction
    const updatedGroup = {
      ...group,
      settlements: group.settlements.map((s) => {
        if (s.id === settlement.id) {
          return { ...s, settled };
        }
        return s;
      }),
    };

    // Update the global state with the modified group
    setGroups((prevGroups) =>
      prevGroups.map((g) => (g.id === group.id ? updatedGroup : g))
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-2">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Settle Up
      </h2>
      {group.settlements.length > 0 ? (
        <>
          {group.settlements.filter((s) => !s.settled).length > 0 && (
            <div className="space-y-6">
              {group.settlements
                .filter((s) => !s.settled)
                .map((settlement, index) => (
                  <div
                    key={index}
                    className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <div className="mb-4 sm:mb-0">
                        <p className="text-gray-800 dark:text-gray-200 font-medium">
                          {settlement.paidBy} --&gt; {settlement.paidTo}
                        </p>
                        <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                          {settlement.amount.toFixed(2)}
                        </p>
                      </div>
                      <Button
                        className="px-4 py- text-white rounded-lg transition-colors"
                        onClick={() => updateSettlement(settlement)}
                      >
                        Mark as Settled
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {group.settlements.filter((s) => s.settled).length > 0 && (
            <div className="space-y-6">
              {group.settlements
                .filter((s) => s.settled)
                .map((settlement, index) => (
                  <div
                    key={index}
                    className="p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow opacity-85"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <div className="mb-4 sm:mb-0">
                        <p className="text-gray-600 dark:text-gray-400 font-medium">
                          {settlement.paidBy} --&gt; {settlement.paidTo}
                        </p>
                        <p className="text-lg font-semibold text-gray-500 dark:text-gray-500">
                          {settlement.amount.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <span className="text-green-600 dark:text-green-400 font-medium">
                          ✓ Settled
                        </span>
                        <Button
                          variant="ghost"
                          onClick={() => updateSettlement(settlement, false)}
                          className="ml-4"
                        >
                          <CiUndo className="text-xl" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </>
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
