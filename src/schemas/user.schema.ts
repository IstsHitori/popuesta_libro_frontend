import z from "zod";

export const userProfileSchema= z.object({
  id: z.number(),
  document: z.string(),
  name: z.string(),
  school: z.string(),
  gender: z.string(),
  money: z.string(),
  level: z.number(),
  score: z.number(),
});
