"use client";

import { newMoneyGivenSchema } from "@/schema/money-given";
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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { Group } from "@/types/group";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Checkbox } from "../ui/checkbox";
import {Textarea} from "../ui/textarea";

export default function MoneyGiven({ group }: { group: Group }) {
  const form = useForm<z.infer<typeof newMoneyGivenSchema>>({
    resolver: zodResolver(newMoneyGivenSchema),
    defaultValues: {
      givenBy: "",
      amount: 0,
      date: new Date().toISOString().split("T")[0],
      givenTo: [],
    },
  });

  function onSubmit(values: z.infer<typeof newMoneyGivenSchema>) {
    // Handle form submission logic here
    console.log("Form submitted with values:", values);
  }

  return (
    <div className="p-6 md:p-8 w-full bg-white dark:bg-gray-800/50">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Given By */}
          <FormField
            control={form.control}
            name="givenBy"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">
                  Given By <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Given By" />
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
                    placeholder="Dinner, Gift, etc."
                    {...field}
                    className="focus-visible:ring-gray-300 border-gray-300 dark:border-gray-600"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Given To */}
          <FormField
            control={form.control}
            name="givenTo"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">
                  Given To <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div className="space-y-2 flex flex-col sm:flex-row sm:flex-wrap gap-4">
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
