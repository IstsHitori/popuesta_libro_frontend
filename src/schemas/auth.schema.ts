import { AUTH_MESSAGES } from "@/constants";
import z from "zod";
import { userProfileSchema } from "./user.schema";

export const loginFormSchema = z.object({
  document: z.number({ error: AUTH_MESSAGES.DOCUMENT_REQUIRED }),
});

export const loginResponseSchema = z.object({
  token: z.string(AUTH_MESSAGES.USER_REQUIRED),
  user: userProfileSchema,
});
