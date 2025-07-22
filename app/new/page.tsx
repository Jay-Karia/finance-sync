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
import { MemberChipInput } from "@/components/ui/input-chip";
import { FaPlus } from "react-icons/fa6";
import { useAtom } from "jotai/react";
import { groupsAtom } from "@/atoms";
import { generateBase64Id } from "@/lib/utils";
import { toast } from "sonner";
import { ERROR_TOAST_STYLE, SUCCESS_TOAST_STYLE } from "@/constants";

export default function NewGroupPage() {
  const [groups, setGroups] = useAtom(groupsAtom);

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
    try {
      const groupsCopy = [...groups];
      const newGroup = {
        ...values,
        id: generateBase64Id(),
        transactions: [],
        totalSpent: 0,
      };
      // Add the creator as the member
      if (newGroup.createdBy) {
        newGroup.members.push(newGroup.createdBy);
      }
      groupsCopy.push(newGroup);

      // Update the state
      setGroups(groupsCopy);

      // Reset the form
      form.reset();

      toast.success("Group created successfully!", SUCCESS_TOAST_STYLE);
    } catch (error) {
      console.error("Failed to create group:", error);
      toast.error(
        "Failed to create group. Please try again.",
        ERROR_TOAST_STYLE
      );
    }
  }

  return (
    <div className="flex items-center justify-center px-4 py-10 w-full">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-zinc-50/65 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 text-center">
          <div className="mx-auto mb-2 h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-600 flex items-center justify-center">
            <FaPlus className="w-4 h-4 text-yellow-600 dark:text-yellow-300" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Create a New Group
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Split bills & share expenses seamlessly
          </p>
        </div>

        {/* Form */}
        <div className="p-6 md:p-8 w-full bg-white dark:bg-gray-800/50">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Group Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">
                      Group Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Road Trip"
                        {...field}
                        className="focus-visible:ring-gray-300 border-gray-300 dark:border-gray-600"
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
                        className="focus-visible:ring-gray-300 border-gray-300 dark:border-gray-600"
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
                      Created By <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your Name"
                        {...field}
                        className="focus-visible:ring-gray-300 border-gray-300 dark:border-gray-600"
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
                        createdBy={form.getValues("createdBy")}
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
                        className="focus-visible:ring-gray-300 border-gray-300 dark:border-gray-600"
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
