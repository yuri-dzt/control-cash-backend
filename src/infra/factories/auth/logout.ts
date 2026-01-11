import { LogoutController } from "../../controllers/auth/logout";
import { LogoutUseCase } from "../../../app/use-cases/auth/logout";
import { PrismaSessionRepository } from "../../repositories/prisma/session";

export const LogoutControllerFactory = () => {
  const sessionRepo = new PrismaSessionRepository();
  const useCase = new LogoutUseCase(
    sessionRepo,
  );
  return new LogoutController(useCase);
};
