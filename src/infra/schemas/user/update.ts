import { z } from "zod";

export const updateUserSchema = z.object({
  name: z.string().optional(),
  role: z.string().optional(),
  email: z.email().optional(),
  password: z.string().optional(),
});

export type UpdateUserRequestBody = z.infer<typeof updateUserSchema>;
