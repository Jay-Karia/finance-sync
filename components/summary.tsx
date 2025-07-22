import { Group } from "@/types/group";
import { FaCoins, FaReceipt, FaUsers } from "react-icons/fa6";

export default function Summary({ group }: { group: Group }) {
  const totalExpenses =
    group.expenses?.reduce((sum, x) => sum + x.amount, 0) || 0;
  const memberCount = group.members.length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-2">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="flex items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <FaReceipt className="h-6 w-6 text-yellow-500" />
          <div className="ml-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Spent
            </p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {totalExpenses.toFixed(2)}
            </p>
          </div>
        </div>
        <div className="flex items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <FaUsers className="h-6 w-6 text-yellow-500" />
          <div className="ml-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Members</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {memberCount}
            </p>
          </div>
        </div>
        <div className="flex items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <FaCoins className="h-6 w-6 text-yellow-500" />
          <div className="ml-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Expenses
            </p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {group.expenses?.length || 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
