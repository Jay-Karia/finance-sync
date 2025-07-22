"use client";

import { useAtomValue } from "jotai/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { groupsAtom } from "@/atoms";
import { Group } from "@/types/group";
import { Button } from "@/components/ui/button";
import { FaUsers, FaReceipt, FaCoins } from "react-icons/fa6";
import GroupHeader from "@/components/layouts/group-header";

export default function GroupPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const groups = useAtomValue(groupsAtom);
  const [group, setGroup] = useState<Group | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const found = groups.find((g) => g.id === id) || null;
    setGroup(found);
    setLoading(false);
  }, [groups, id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full py-20">
        <p className="text-gray-500 dark:text-gray-400">Loading group…</p>
      </div>
    );
  }
  if (!group) {
    return (
      <div className="flex items-center justify-center h-full py-20">
        <p className="text-gray-600 dark:text-gray-400">
          Group not found. Please check the URL.
        </p>
      </div>
    );
  }

  // compute totals
  const totalExpenses =
    group.expenses?.reduce((sum, x) => sum + x.amount, 0) || 0;
  const memberCount = group.members.length;

  return (
    <div className="min-h-screen dark:bg-gray-900">
      {/* Group Header */}
      <GroupHeader group={group} />

      {/* Metrics */}
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
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
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Members
              </p>
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

        {/* Transactions List */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Transactions
          </h2>
          <div className="space-y-4">
            {group.expenses && group.expenses.length > 0 ? (
              group.expenses.map((exp) => (
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
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {exp.amount.toFixed(2)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-600 dark:text-gray-400">
                No transactions yet.
              </p>
            )}
          </div>
        </section>

        {/* Settle Up */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Settle Up
          </h2>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4 sm:mb-0">
              Calculate and settle balances with your group.
            </p>
            <Button onClick={() => router.push(`/groups/${group.id}/settle`)}>
              Go to Settle
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
