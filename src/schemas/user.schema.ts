import z from "zod";
import { USER_MESSAGES } from "@/constants";

export const userEarnedItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  item_type: z.string(),
});

export const userProfileSchema = z.object({
  id: z.number({ error: USER_MESSAGES.ID_REQUIRED }),
  document: z.string({ error: USER_MESSAGES.DOCUMENT_REQUIRED }),
  name: z.string({ error: USER_MESSAGES.NAME_REQUIRED }),
  school: z.string({ error: USER_MESSAGES.SCHOOL_REQUIRED }),
  gender: z.string({ error: USER_MESSAGES.GENDER_REQUIRED }),
  money: z.string({ error: USER_MESSAGES.MONEY_REQUIRED }),
  level: z.number({ error: USER_MESSAGES.LEVEL_REQUIRED }),
  items: z.array(userEarnedItemSchema),
});
