import { z } from "zod";

export const updateSystemOperatorSchema = z.object({
  name: z.string().optional(),
  email: z.string().email('Invalid email address').optional(),
  password: z.string().optional(),
  is_active: z.boolean().optional(),
  role: z.string().optional(),
});

export type UpdateSystemOperatorRequestBody = z.infer<typeof updateSystemOperatorSchema>;
