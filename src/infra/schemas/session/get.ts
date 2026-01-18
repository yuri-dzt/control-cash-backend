import { z } from "zod";

export const getSessionSchema = z.object({
  id: z.string().min(1, "O id é obrigatório"),
});

export type getSessionRequestBody = z.infer<typeof getSessionSchema>;
