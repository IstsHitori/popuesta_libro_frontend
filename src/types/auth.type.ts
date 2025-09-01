import type { loginFormSchema, loginResponseSchema } from "@/schemas";
import type z from "zod";

export type LoginForm = z.infer<typeof loginFormSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
