import { userProfileSchema } from "@/schemas/user.schema";
import z from "zod";

export type UserProfile = z.infer<typeof userProfileSchema>;
