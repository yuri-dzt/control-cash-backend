import { z } from "zod";

export const deleteSessionSchema = z.object({
  id: z.string().min(1, "O id é obrigatório"),
});

export type deleteSessionRequestBody = z.infer<typeof deleteSessionSchema>;
