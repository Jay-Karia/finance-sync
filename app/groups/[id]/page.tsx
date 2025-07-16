"use client";

import { groupsAtom } from "@/atoms";
import { Group } from "@/types/group";
import { useAtomValue } from "jotai";
import { use, useEffect, useState } from "react";

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
    // Check the groups array for the specific one
    function getGroup(id: string) {
      const filteredGroup = groups.filter((group) => group.id === id);
      setGroup(filteredGroup[0]);
      setLoading(false);
    }

    getGroup(id);
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
    <div className="flex flex-col items-center w-full max-w-7xl px-4 pb-12">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
        {group.name}
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mt-2">
        Group ID: {group.id}
      </p>
      {/* …more group details here… */}
    </div>
  );
}
