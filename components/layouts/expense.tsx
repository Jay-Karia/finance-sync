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

// When the expense is given by the group.
export default function Expense({ group }: { group: Group }) {
  const form = useForm<z.infer<typeof newExpenseSchema>>({
    resolver: zodResolver(newExpenseSchema),
    defaultValues: {
      name: "",
      amount: 0,
      date: new Date().toISOString().split("T")[0],
      paidBy: [],
      splitBetween: [],
      splitType: "equally",
      userShares: {},
      notes: "",
      createdBy: group.createdBy || "",
    },
  });

  function onSubmit(values: z.infer<typeof newExpenseSchema>) {
    // Handle form submission logic here
    console.log("Form submitted with values:", values);
  }
  return (
    <div>
      <div className="p-6 md:p-8 w-full bg-white dark:bg-gray-800/50">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paidBy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">
                    Paid By <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      {group.members?.map((member) => (
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
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                        <SelectItem value="fraction">Fraction</SelectItem>
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
                    <div className="space-y-2 flex flex-col sm:flex-row sm:flex-wrap gap-4">
                      {group.members?.map((member) => (
                        <label
                          key={member}
                          className="flex items-center space-x-2 w-max"
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
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                      className="focus-visible:ring-gray-300 border-gray-300 dark:border-gray-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col sm:flex-row gap-4 pt-6 mt-4 border-t border-gray-100 dark:border-gray-700">
              <Button
                type="submit"
                className="sm:flex-1 bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black font-medium"
              >
                Create Expense
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
