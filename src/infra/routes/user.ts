import { ZodError } from "zod";
import { type Request, type Response, Router } from "express";

import { deleteUserSchema } from "../schemas/user/delete";
import { updateUserSchema } from "../schemas/user/update";
import { createUserSchema } from "../schemas/user/create";
import { GetUsersControllerFactory } from "../factories/user/get";
import { CreateUserControllerFactory } from "../factories/user/create";
import { DeleteUserControllerFactory } from "../factories/user/delete";
import { UpdateUserControllerFactory } from "../factories/user/update";
import { UpdateUserInput } from "../../app/use-cases/user/update/input";
import { CreateUserInput } from "../../app/use-cases/user/create/input";
import { DeleteUserInput } from "../../app/use-cases/user/delete/input";
import { RefreshAccountControllerFactory } from "../factories/user/refresh-account";
import { verifyTokenMiddleware } from "../middlewares/jwt";

const route = Router();

route.post('/users', async (req: Request<any, any, CreateUserInput>, res: Response) => {
  try {
    const { email, password, name } = createUserSchema.parse(req.body)

    const controller = CreateUserControllerFactory();
    const response = await controller.handle({
      email,
      password,
      name,
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

route.delete('/users/:id', async (req: Request<any, any, DeleteUserInput>, res: Response) => {
  try {
    const { id } = deleteUserSchema.parse(req.params)

    const controller = DeleteUserControllerFactory();
    const response = await controller.handle({
      id
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

route.get('/users', async (req: Request, res: Response) => {
  try {
    const controller = GetUsersControllerFactory();
    const response = await controller.handle()

    return res.status(response.status_code).json(response.body)
  } catch (err) {
    return res.status(500).json({ message: (err as Error).message });
  }
})

route.patch('/users/:user_id', async (req: Request<any, any, UpdateUserInput>, res: Response) => {
  try {
    const { user_id } = req.params
    const { email, password, name, role } = updateUserSchema.parse(req.body)

    const controller = UpdateUserControllerFactory();
    const response = await controller.handle({
      user_id,
      email,
      password,
      name,
      role,
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

route.get('/users/refresh', verifyTokenMiddleware, async (req: Request<any, any, any>, res: Response) => {
  try {
    const { account_id } = req.user

    const controller = RefreshAccountControllerFactory();
    const response = await controller.handle({
      id: account_id
    })

    return res.status(response.status_code).json(response.body)
  } catch (err) {
    return res.status(500).json({ message: (err as Error).message });
  }
})

export default route