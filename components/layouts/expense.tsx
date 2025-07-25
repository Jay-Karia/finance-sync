"use client";

import { newExpenseSchema } from "@/schema/expense";
import { Group } from "@/types/group";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";
import { Transaction as ExpenseType } from "@/types/expense";
import { toast } from "sonner";
import { ERROR_TOAST_STYLE, SUCCESS_TOAST_STYLE } from "@/constants";
import { useSetAtom } from "jotai";
import { groupsAtom } from "@/atoms";
import Link from "next/link";
import { useState } from "react";
import { updateUserShares } from "@/lib/share";

// When the expense is given by the group.
export default function Expense({ group }: { group: Group }) {
  const setGroups = useSetAtom(groupsAtom);
  const [payAmount, setPayAmount] = useState<number[]>(
    new Array<number>(group.members?.length || 0).fill(0)
  );

  const form = useForm<z.infer<typeof newExpenseSchema>>({
    resolver: zodResolver(newExpenseSchema),
    defaultValues: {
      name: "",
      amount: 0,
      date: new Date().toISOString().split("T")[0],
      paidBy: [],
      splitBetween: [],
      splitType: "equally",
      payAmount: [],
    },
  });

  const splitType = form.watch("splitType");
  const splitBetween = form.watch("splitBetween");
  const paidBy = form.watch("paidBy");

  function onSubmit(values: z.infer<typeof newExpenseSchema>) {
    try {
      const expense: ExpenseType = {
        id: btoa(Date.now().toString()), // simple base64 encoding of timestamp
        groupId: group.id,
        name: values.name,
        amount: values.amount,
        date: values.date,
        paidBy: values.paidBy,
        paidAmounts: values.payAmount,
        participants: values.splitBetween,
        splitType: values.splitType,
        expenseType: "expense",
        splitAmounts:
          values.splitType === "amount" ? values.splitAmounts || [] : [],
        splitPercentages:
          values.splitType === "percentage"
            ? values.splitPercentages || []
            : [],
      };

      // Update the user shares
      group = updateUserShares(group, expense);
      // Push the expense to the group array
      group.transactions = [...(group.transactions || []), expense];
      // Update the total spent
      group.totalSpent = (group.totalSpent || 0) + values.amount;
      // Update the group
      setGroups((prevGroups) =>
        prevGroups.map((g) => (g.id === group.id ? group : g))
      );

      // Reset the form
      form.reset();
      payAmount.fill(0);

      toast("Expense created successfully!", SUCCESS_TOAST_STYLE);
    } catch (error) {
      console.error("Error creating expense:", error);
      toast.error(
        "Failed to create expense. Please try again.",
        ERROR_TOAST_STYLE
      );
    }
  }

  return (
    <div className="p-6 md:p-8 w-full bg-white dark:bg-gray-800/50">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">
                  For What? <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Parking Fee"
                    {...field}
                    className="focus-visible:ring-gray-300 border-gray-300 dark:border-gray-600"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Amount */}
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">
                  Amount <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    placeholder="100.00"
                    {...field}
                    className="focus-visible:ring-gray-300 border-gray-300 dark:border-gray-600"
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      field.onChange(value);
                    }}
                    step="0.1"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Paid By */}
          <FormField
            control={form.control}
            name="paidBy"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">
                  Paid By <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div className="space-y-4">
                    {group.members?.map((member: string, index: number) => (
                      <label
                        key={member}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          checked={field.value.includes(member)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              field.onChange([...field.value, member]);
                            } else {
                              field.onChange(
                                field.value.filter((m) => m !== member)
                              );

                              // Reset the amount when unchecked
                              const newPayAmount = [...payAmount];
                              newPayAmount[index] = 0;
                              setPayAmount(newPayAmount);
                            }
                          }}
                          className="rounded border-gray-300 dark:border-gray-600"
                        />
                        <span className="text-gray-700 dark:text-gray-300 w-max">
                          {member}
                        </span>
                        {/* Pay Amount */}
                        <div className="sm:w-1/4 w-full ml-2 h-6 flex items-center">
                          {paidBy.includes(member) && paidBy.length > 1 && (
                            <FormField
                              control={form.control}
                              name="payAmount"
                              render={({ field: payAmountField }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      min={0}
                                      placeholder="0.00"
                                      step="0.1"
                                      value={payAmount[index] || ""}
                                      className="focus-visible:ring-gray-300 border-gray-300 dark:border-gray-600"
                                      onChange={(e) => {
                                        const value =
                                          parseFloat(e.target.value) || 0;
                                        const newPayAmount = [...payAmount];
                                        newPayAmount[index] = value;
                                        setPayAmount(newPayAmount);
                                        payAmountField.onChange(newPayAmount);
                                      }}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator />

          {/* Split Type */}
          <FormField
            control={form.control}
            name="splitType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">
                  Split Type <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Split Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="equally">Equally</SelectItem>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="amount">Amount</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Split Between */}
          <FormField
            control={form.control}
            name="splitBetween"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">
                  Split Between <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <>
                    {/* Select All Checkbox */}
                    <label className="flex items-center space-x-2 mb-2">
                      <Checkbox
                        checked={field.value.length === group.members?.length}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            field.onChange(group.members || []);
                          } else {
                            field.onChange([]);
                          }
                        }}
                        className="rounded border-gray-300 dark:border-gray-600"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        All
                      </span>
                    </label>
                    <div className="space-y-2 flex flex-col sm:flex-row sm:flex-wrap sm:gap-4 gap-1">
                      {group.members?.map((member) => (
                        <label
                          key={member}
                          className="flex items-center space-x-2 w-max h-max"
                        >
                          <Checkbox
                            checked={field.value.includes(member)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                field.onChange([...field.value, member]);
                              } else {
                                field.onChange(
                                  field.value.filter((m) => m !== member)
                                );
                              }
                            }}
                            className="rounded border-gray-300 dark:border-gray-600"
                          />
                          <span className="text-gray-700 dark:text-gray-300">
                            {member}
                          </span>
                        </label>
                      ))}
                    </div>
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Percentage Split */}
          {splitType === "percentage" && (
            <FormField
              control={form.control}
              name="splitPercentages"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">
                    Percentage Split <span className="text-red-500">*</span>
                  </FormLabel>
                  <div className="space-y-2">
                    {splitBetween.map((member, index) => (
                      <div key={member} className="flex items-center space-x-2">
                        <span className="text-gray-700 dark:text-gray-300 w-24">
                          {member}:
                        </span>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="25"
                            min={0}
                            onChange={(e) => {
                              const value = parseFloat(e.target.value);
                              const newPercentages = [...(field.value || [])];
                              newPercentages[index] = isNaN(value) ? 0 : value;
                              field.onChange(newPercentages);
                            }}
                            step="0.1"
                            className="focus-visible:ring-gray-300 border-gray-300 dark:border-gray-600 w-max"
                          />
                        </FormControl>
                        <span className="text-gray-500">%</span>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Amount Split */}
          {splitType === "amount" && (
            <FormField
              control={form.control}
              name="splitAmounts"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">
                    Amount Split <span className="text-red-500">*</span>
                  </FormLabel>
                  <div className="space-y-2">
                    {splitBetween.map((member, index) => (
                      <div key={member} className="flex items-center space-x-2">
                        <span className="text-gray-700 dark:text-gray-300 w-24">
                          {member}:
                        </span>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="10.50"
                            min={0}
                            onChange={(e) => {
                              const value = parseFloat(e.target.value);
                              const newAmounts = [...(field.value || [])];
                              newAmounts[index] = isNaN(value) ? 0 : value;
                              field.onChange(newAmounts);
                            }}
                            step="0.1"
                            className="focus-visible:ring-gray-300 border-gray-300 dark:border-gray-600 w-max"
                          />
                        </FormControl>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Separator />

          {/* Date */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">
                  Date
                </FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    className="focus-visible:ring-gray-300 border-gray-300 dark:border-gray-600 w-max"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col sm:flex-row gap-4 pt-6 mt-4 border-t border-gray-100 dark:border-gray-700">
            <Button
              className="sm:w-1/2 w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600"
              asChild
            >
              <Link href={`/groups/${group.id}`}>Back</Link>
            </Button>
            <Button
              type="submit"
              className="sm:flex-1 bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black font-medium sm:w-1/2 w-full"
            >
              Create Expense
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
