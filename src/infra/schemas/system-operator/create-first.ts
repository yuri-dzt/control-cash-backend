import { z } from "zod";

export const createFirstSystemOperatorSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(4, 'Password must be at least 4 characters long'),
  secret_key: z.string().min(3, 'Secret key must be at least 3 characters long'),
});

export type CreateFirstSystemOperatorRequestBody = z.infer<typeof createFirstSystemOperatorSchema>;
