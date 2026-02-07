import { ZodError } from "zod";
import { type Request, type Response, Router } from "express";

import { createSystemOperatorSchema } from "../schemas/system-operator/create";
import { updateSystemOperatorSchema } from "../schemas/system-operator/update";
import { GetSystemOperatorsControllerFactory } from "../factories/system-operator/get";
import { createFirstSystemOperatorSchema } from "../schemas/system-operator/create-first";
import { CreateSystemOperatorControllerFactory } from "../factories/system-operator/create";
import { UpdateSystemOperatorControllerFactory } from "../factories/system-operator/update";
import { DeleteSystemOperatorControllerFactory } from "../factories/system-operator/delete";
import { GetSystemOperatorsUseCaseInput } from "../../app/use-cases/system-operator/get/input";
import { authorizeSuperAdminMiddleware, authorizeAdminRolesMiddleware } from "../middlewares/jwt";
import { CreateSystemOperatorUseCaseInput } from "../../app/use-cases/system-operator/create/input";
import { UpdateSystemOperatorUseCaseInput } from "../../app/use-cases/system-operator/update/input";
import { CreateFirstSystemOperatorControllerFactory } from "../factories/system-operator/create-first";
import { CreateFirstSystemOperatorUseCaseInput } from "../../app/use-cases/system-operator/create-first/input";

const route = Router();

route.post('/system-operators/first', async (req: Request<any, any, CreateFirstSystemOperatorUseCaseInput>, res: Response) => {
  try {
    const { name, email, password, secret_key } = createFirstSystemOperatorSchema.parse(req.body)

    const controller = CreateFirstSystemOperatorControllerFactory();
    const response = await controller.handle({
      name,
      email,
      password,
      secret_key
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

route.post('/system-operators', authorizeSuperAdminMiddleware, async (req: Request<any, any, CreateSystemOperatorUseCaseInput>, res: Response) => {
  try {
    const { name, email, password, role } = createSystemOperatorSchema.parse(req.body)

    const controller = CreateSystemOperatorControllerFactory();
    const response = await controller.handle({
      name,
      email,
      password,
      role
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

route.patch('/system-operators/:id', authorizeAdminRolesMiddleware, async (req: Request<any, any, UpdateSystemOperatorUseCaseInput>, res: Response) => {
  try {
    const { id } = req.params
    const { name, email, password, role, is_active } = updateSystemOperatorSchema.parse(req.body)

    const controller = UpdateSystemOperatorControllerFactory();
    const response = await controller.handle({
      id,
      name,
      email,
      password,
      role,
      is_active
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

route.delete('/system-operators/:id', authorizeSuperAdminMiddleware, async (req: Request<any, any, UpdateSystemOperatorUseCaseInput>, res: Response) => {
  try {
    const { id } = req.params
    const admin_id = req.user

    const controller = DeleteSystemOperatorControllerFactory();
    const response = await controller.handle({
      id,
      admin_id,
    })

    return res.status(response.status_code).json(response.body)
  } catch (err) {
    return res.status(500).json({ message: (err as Error).message });
  }
})

route.get('/system-operators', authorizeAdminRolesMiddleware, async (req: Request<any, any, GetSystemOperatorsUseCaseInput>, res: Response) => {
  try {
    const { id, name, email, role, is_active, created_at } = req.params

    const controller = GetSystemOperatorsControllerFactory();
    const response = await controller.handle({
      id,
      name,
      email,
      role,
      is_active,
      created_at
    })

    return res.status(response.status_code).json(response.body)
  } catch (err) {
    return res.status(500).json({ message: (err as Error).message });
  }
})

export default route