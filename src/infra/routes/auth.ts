import { ZodError } from "zod";
import { type Request, type Response, Router } from "express";

import { loginSchema } from "../schemas/auth/login";
import { LoginControllerFactory } from "../factories/auth/login";
import { LoginUseCaseInput } from "../../app/use-cases/auth/login/input";

const route = Router();

route.post('/login', async (req: Request<any, any, LoginUseCaseInput>, res: Response) => {
  try {
    const { email, password } = loginSchema.parse(req.body)

    const controller = LoginControllerFactory();
    const response = await controller.handle({
      email,
      password,
    })

    return res.status(response.status_code).json(response.body)
  } catch (err) {
    if (err instanceof ZodError) {
      const formattedErrors = err.issues.map(e => ({
        field: e.path.join('.'),
        message: e.message,
      }));

      return res.status(400).json({ errors: formattedErrors });
    }

    return res.status(500).json({ message: (err as Error).message });
  }
})

export default route