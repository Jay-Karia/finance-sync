import z from "zod";
import { groupSchema } from "@/schema/group";

export type Group = z.infer<typeof groupSchema>;
