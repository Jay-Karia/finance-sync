"use client";

import { useAtomValue } from "jotai";
import { use, useEffect, useState } from "react";
import { groupsAtom } from "@/atoms";
import { Group } from "@/types/group";
import Transactions from "@/components/transactions";
import Summary from "@/components/summary";
import GroupHeader from "@/components/layouts/group-header";
import Settle from "@/components/settle";

export default function GroupPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
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

  return (
    <div className="dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        {/* Group Header */}
        <GroupHeader group={group} />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Summary Card */}
          <Summary />

          {/* Transactions Card */}
          <Transactions />

          {/* Settle */}
          <Settle />
        </div>
      </div>
    </div>
  );
}
