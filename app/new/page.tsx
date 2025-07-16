"use client";

import { newGroupSchema } from "@/schema/group";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MemberChipInput } from "@/components/ui/chip";
import { Users } from "lucide-react";

export default function NewGroupPage() {
  const form = useForm<z.infer<typeof newGroupSchema>>({
    resolver: zodResolver(newGroupSchema),
    defaultValues: {
      name: "",
      description: "",
      members: [],
      date: new Date().toISOString().split("T")[0],
      createdBy: "",
    },
  });

  function onSubmit(values: z.infer<typeof newGroupSchema>) {
    console.log(values);
  }

  return (
    <div className="flex items-center justify-center px-4 py-10 w-full">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden">
        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 p-6 border-b border-yellow-200 dark:border-yellow-800/30">
          <div className="flex items-center">
            <div className="bg-yellow-200 dark:bg-yellow-700/30 p-3 rounded-lg mr-4">
              <Users className="h-6 w-6 text-yellow-700 dark:text-yellow-300" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Create New Group
            </h1>
          </div>
        </div>

        {/* Form */}
        <div className="p-6 md:p-8 w-full bg-white dark:bg-gray-800">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Group Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">
                      Group Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Road Trip"
                        {...field}
                        className="focus-visible:ring-yellow-500 border-gray-300 dark:border-gray-600"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Group Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="A fun road trip with friends"
                        {...field}
                        className="focus-visible:ring-yellow-500 border-gray-300 dark:border-gray-600"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Created By */}
              <FormField
                control={form.control}
                name="createdBy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">
                      Created By
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your Name"
                        {...field}
                        className="focus-visible:ring-yellow-500 border-gray-300 dark:border-gray-600"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Group Members */}
              <FormField
                control={form.control}
                name="members"
                render={({ field }) => (
                  <FormItem className="border-t border-b py-6 border-gray-100 dark:border-gray-700">
                    <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">
                      Members
                    </FormLabel>
                    <FormControl>
                      <MemberChipInput
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Type name and press comma or Enter"
                      />
                    </FormControl>
                    <FormDescription className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Enter member names or emails, then press comma or Enter to
                      add them.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                        className="focus-visible:ring-yellow-500 border-gray-300 dark:border-gray-600"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col sm:flex-row gap-4 pt-6 mt-4 border-t border-gray-100 dark:border-gray-700">
                <Button
                  type="button"
                  variant="outline"
                  className="sm:flex-1 hover:bg-gray-50 dark:hover:bg-gray-700"
                  onClick={() => form.reset()}
                >
                  Clear
                </Button>
                <Button
                  type="submit"
                  className="sm:flex-1 bg-yellow-400 hover:bg-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-gray-900 dark:text-gray-900 font-medium border-yellow-500"
                >
                  Create Group
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
