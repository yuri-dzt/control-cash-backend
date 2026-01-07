import { z } from "zod";

export const deleteUserSchema = z.object({
  id: z.string().min(1, "O id é obrigatório"),
});

export type deleteUserRequestBody = z.infer<typeof deleteUserSchema>;
