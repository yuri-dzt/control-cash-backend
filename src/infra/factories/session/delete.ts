import { DeleteSessionController } from "../../controllers/session/delete";
import { PrismaSessionRepository } from "../../repositories/prisma/session";
import { DeleteSessionUseCase } from "../../../app/use-cases/session/delete";

export const DeleteSessionControllerFactory = () => {
  const sessionRepo = new PrismaSessionRepository();
  const useCase = new DeleteSessionUseCase(
    sessionRepo
  );
  return new DeleteSessionController(useCase);
};
