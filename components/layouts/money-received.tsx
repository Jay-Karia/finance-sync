"use client";

import { newMoneyReceivedSchema } from "@/schema/money-received";
import { Group } from "@/types/group";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import z from "zod";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useSetAtom } from "jotai";
import { groupsAtom } from "@/atoms";
import { Transaction } from "@/types/expense";
import { toast } from "sonner";
import { ERROR_TOAST_STYLE, SUCCESS_TOAST_STYLE } from "@/constants";
import Link from "next/link";

export default function MoneyReceived({ group }: { group: Group }) {
  const setGroups = useSetAtom(groupsAtom);

  const form = useForm<z.infer<typeof newMoneyReceivedSchema>>({
    resolver: zodResolver(newMoneyReceivedSchema),
    defaultValues: {
      receivedBy: "",
      amount: 0,
      date: new Date().toISOString().split("T")[0],
      receivedFrom: "",
    },
  });

  function onSubmit(values: z.infer<typeof newMoneyReceivedSchema>) {
    try {
      const expense: Transaction = {
        id: btoa(Date.now().toString()), // simple base64 encoding of timestamp
        groupId: group.id,
        name: values.forWhat,
        amount: values.amount,
        date: values.date,
        paidBy: [values.receivedFrom],
        participants: [values.receivedBy],
        splitType: "equally",
        notes: "",
        expenseType: "received",
      };

      // Push the expense to the group array
      group.transactions = [...(group.transactions || []), expense];
      // Update the group
      setGroups((prevGroups) =>
        prevGroups.map((g) => (g.id === group.id ? group : g))
      );

      // Reset the form
      form.reset();

      toast("Money received successfully!", SUCCESS_TOAST_STYLE);
    } catch (error) {
      console.error("Error creating expense:", error);
      toast.error(
        "Failed to receive money. Please try again.",
        ERROR_TOAST_STYLE
      );
    }
  }

  return (
    <div className="p-6 md:p-8 w-full bg-white dark:bg-gray-800/50">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Received From */}
          <FormField
            control={form.control}
            name="receivedFrom"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">
                  Who gave <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a member" />
                    </SelectTrigger>
                    <SelectContent>
                      {group.members.map((member) => (
                        <SelectItem key={member} value={member}>
                          {member}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                    className="focus-visible:ring-gray-300 border-gray-300 dark:border-gray-600 w-max"
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

          {/* For What */}
          <FormField
            control={form.control}
            name="forWhat"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">
                  For What <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter purpose"
                    {...field}
                    className="focus-visible:ring-gray-300 border-gray-300 dark:border-gray-600"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Received To */}
          <FormField
            control={form.control}
            name="receivedBy"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">
                  Received By <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Received By" />
                    </SelectTrigger>
                    <SelectContent>
                      {group.members.map((member) => (
                        <SelectItem key={member} value={member}>
                          {member}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
              className="w-1/2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600"
              asChild
            >
              <Link href={`/groups/${group.id}`}>Back</Link>
            </Button>
            <Button
              type="submit"
              className="sm:flex-1 bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black font-medium"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
