import type { userProfileSchema } from "@/schemas";
import z from "zod";

export type UserProfile = z.infer<typeof userProfileSchema>;
