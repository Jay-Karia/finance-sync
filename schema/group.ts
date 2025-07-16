import { z } from "zod"

export const newGroupSchema = z.object({
  name: z.string().min(1, "Group name is required"),
  description: z.string().optional(),
  members: z.array(z.string()),
  date: z.string().optional(),
})
