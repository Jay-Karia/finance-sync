"use client";

import { groupsAtom } from "@/atoms";
import { Group } from "@/types/group";
import { useAtomValue } from "jotai";
import { useState, useEffect, use } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Expense from "@/components/layouts/expense";
import MoneyGiven from "@/components/layouts/money-given";

export default function AddExpensePage({
  params,
}: {
  params: Promise<{ groupId: string }>;
}) {
  const { groupId } = use(params);
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

  return (
    <div className="w-full flex justify-center items-center">
      <Tabs defaultValue="expense" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="expense">Expense</TabsTrigger>
          <TabsTrigger value="given">Money Given</TabsTrigger>
        </TabsList>
        <TabsContent value="expense">
          <Expense group={group} />
        </TabsContent>
        <TabsContent value="given">
          <MoneyGiven group={group} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
