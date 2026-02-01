import { z } from "zod";

export const createSystemOperatorSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(4, 'Password must be at least 4 characters long'),
  role: z.string().min(3, 'Role must be at least 3 characters long'),
});

export type CreateSystemOperatorRequestBody = z.infer<typeof createSystemOperatorSchema>;
