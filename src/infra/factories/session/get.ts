import { GetSessionsController } from "../../controllers/session/get";
import { GetSessionsUseCase } from "../../../app/use-cases/session/get";
import { PrismaSessionRepository } from "../../repositories/prisma/session";

export const GetSessionsControllerFactory = () => {
  const sessionRepo = new PrismaSessionRepository();
  const useCase = new GetSessionsUseCase(
    sessionRepo
  );
  return new GetSessionsController(useCase);
};
