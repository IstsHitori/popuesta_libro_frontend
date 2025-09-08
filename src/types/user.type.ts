import type { userEarnedItemSchema, userProfileSchema } from "@/schemas";
import z from "zod";

export type UserProfile = z.infer<typeof userProfileSchema>;
export type UserEarnedItems = z.infer<typeof userEarnedItemSchema>;
