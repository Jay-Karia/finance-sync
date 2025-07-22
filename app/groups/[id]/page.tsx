"use client";

import { useAtomValue } from "jotai/react";
import { use, useEffect, useState } from "react";
import { groupsAtom } from "@/atoms";
import { Group } from "@/types/group";
import GroupHeader from "@/components/layouts/group-header";
import Summary from "@/components/summary";
import Transactions from "@/components/transactions";
import Settle from "@/components/settle";

export default function GroupPage({ params }: {params: Promise<{ id: string }>;}) {
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
    <div className="min-h-screen dark:bg-gray-900">
      {/* Group Header */}
      <GroupHeader group={group} />

      {/* Summary */}
      <Summary group={group} />

      {/* Transactions List */}
      <Transactions group={group} />

      {/* Settle Up */}
      <Settle />
    </div>
  );
}
