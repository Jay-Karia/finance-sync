"use client";

import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface SplitProps {
  users: string[];
  splitType: "percentage" | "fraction" | "amount" | "equally";
}

export default function Split({ users, splitType }: SplitProps) {
  // Percentage
  if (splitType === "percentage") {
    return (
      <div className="flex flex-col gap-4">
        <Label className="text-gray-700 dark:text-gray-300 font-medium">
          Percentage Split <span className="text-red-500">*</span>
        </Label>
        {users.map((user) => (
          <div key={user} className="flex items-center gap-2">
            <Label className="text-gray-700 dark:text-gray-300">{user}</Label>
            <Input
              type="number"
              placeholder="Percentage"
              className="focus-visible:ring-gray-300 border-gray-300 dark:border-gray-600 w-max"
            />
          </div>
        ))}
      </div>
    );
  }

  // Amount
  if (splitType === "amount") {
    return (
      <div className="flex flex-col gap-4">
        <Label className="text-gray-700 dark:text-gray-300 font-medium">
          Amount Split <span className="text-red-500">*</span>
        </Label>
        {users.map((user) => (
          <div key={user} className="flex items-center gap-2">
            <Label className="text-gray-700 dark:text-gray-300">{user}</Label>
            <Input
              type="number"
              placeholder="Amount"
              className="focus-visible:ring-gray-300 border-gray-300 dark:border-gray-600 w-max"
            />
          </div>
        ))}
      </div>
    );
  }

  // Fraction
  if (splitType === "fraction") {
    return (
      <div className="flex flex-col gap-4">
        <Label className="text-gray-700 dark:text-gray-300 font-medium">
          Fraction Split <span className="text-red-500">*</span>
        </Label>
        {users.map((user) => (
          <div key={user} className="flex items-center gap-2">
            <Label className="text-gray-700 dark:text-gray-300">{user}</Label>
            <Input
              type="text"
              placeholder="Fraction (e.g., 1/2)"
              className="focus-visible:ring-gray-300 border-gray-300 dark:border-gray-600 w-max"
            />
          </div>
        ))}
      </div>
    );
  }
}
