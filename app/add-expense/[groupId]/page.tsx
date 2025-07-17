"use client";

import { groupsAtom } from "@/atoms";
import { Group } from "@/types/group";
import { useAtomValue } from "jotai";
import { useState, useEffect } from "react";

export default function AddExpensePage({
  params,
}: {
  params: { groupId: string };
}) {
  const { groupId } = params;
  const groups = useAtomValue(groupsAtom);
  const [group, setGroup] = useState<Group | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const found = groups.find((g) => g.id === groupId) || null;
    setGroup(found);
    setLoading(false);
  }, [groups, groupId]);

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

  return <div>{JSON.stringify(group)}</div>;
}
