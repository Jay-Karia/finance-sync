"use client";
import { use } from "react";

export default function GroupPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return (
    <div className="flex items-center justify-center">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
        Group Page
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mt-2">Group ID: {id}</p>
    </div>
  );
}
