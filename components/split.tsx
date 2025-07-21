"use client";

import { Input } from "./ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { Control } from "react-hook-form";

interface SplitProps {
  users: string[];
  splitType: "equally" | "percentage" | "amount" | "fraction";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
}

export default function Split({ users, splitType, control }: SplitProps) {
  const title =
    splitType === "percentage"
      ? "Percentage Split"
      : splitType === "amount"
      ? "Amount Split"
      : "Fraction Split";

  if (splitType === "equally") return null;

  return (
    <div className="flex flex-col gap-4">
      <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">
        {title} <span className="text-red-500">*</span>
      </FormLabel>

      {users.map((user, idx) => {
        const name = `${splitType}.${idx}` as const;
        return (
          <FormField
            key={user}
            control={control}
            name={name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{user}</FormLabel>
                <FormControl>
                  <Input
                    type={splitType === "fraction" ? "text" : "number"}
                    placeholder={
                      splitType === "fraction"
                        ? "1/2"
                        : splitType === "percentage"
                        ? "25"
                        : splitType === "amount"
                        ? "10.5"
                        : undefined
                    }
                    // always pass a value so it never goes uncontrolled
                    value={field.value ?? ""}
                    onChange={(e) => {
                      const raw = e.target.value;
                      if (splitType === "fraction") {
                        field.onChange(raw);
                      } else {
                        const num = parseFloat(raw);
                        field.onChange(isNaN(num) ? undefined : num);
                      }
                    }}
                    // specify step for numeric inputs
                    step={splitType === "amount" ? "0.1" : "1"}
                    className="focus-visible:ring-gray-300 border-gray-300 dark:border-gray-600 w-max"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      })}
    </div>
  );
}
