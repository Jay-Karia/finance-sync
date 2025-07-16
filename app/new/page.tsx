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
import {MemberChipInput} from "@/components/ui/chip";

export default function NewGroupPage() {
  const form = useForm<z.infer<typeof newGroupSchema>>({
    resolver: zodResolver(newGroupSchema),
    defaultValues: {
      name: "",
      description: "",
      members: [],
      date: new Date().toISOString().split("T")[0], // Default to today's date
    },
  });

  function onSubmit(values: z.infer<typeof newGroupSchema>) {
    console.log(values);
  }

  return (
    <div className="border flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 max-w-2xl w-max mx-auto my-10 p-6 rounded-lg shadow-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Group Name</FormLabel>
                <FormControl>
                  <Input placeholder="Road Trip" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="A fun road trip with friends"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="members"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Members</FormLabel>
                <FormControl>
                  <MemberChipInput
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Type name and press comma or Enter"
                  />
                </FormControl>
                <FormDescription>
                  Enter member names or emails, then press comma or Enter to add
                  them.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Create</Button>
        </form>
      </Form>
    </div>
  );
}
