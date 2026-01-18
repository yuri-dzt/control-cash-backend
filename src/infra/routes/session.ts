import { ZodError } from "zod";
import { type Request, type Response, Router } from "express";

import { verifyTokenMiddleware } from "../middlewares/jwt";
import { deleteSessionSchema } from "../schemas/session/delete";
import { GetSessionsControllerFactory } from "../factories/session/get";
import { GetSessionsInput } from "../../app/use-cases/session/get/input";
import { DeleteSessionControllerFactory } from "../factories/session/delete";
import { DeleteSessionInput } from "../../app/use-cases/session/delete/input";

const route = Router();

route.delete('/sessions/:id', verifyTokenMiddleware, async (req: Request<any, any, DeleteSessionInput>, res: Response) => {
  try {
    const { id } = deleteSessionSchema.parse(req.params)

    const controller = DeleteSessionControllerFactory();
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

route.get('/sessions', verifyTokenMiddleware, async (req: Request<any, any, GetSessionsInput>, res: Response) => {
  try {
    const { account_id } = req.user
    const controller = GetSessionsControllerFactory();
    const response = await controller.handle({
      user_id: account_id
    })

    return res.status(response.status_code).json(response.body)
  } catch (err) {


    return res.status(500).json({ message: (err as Error).message });
  }
})

export default route