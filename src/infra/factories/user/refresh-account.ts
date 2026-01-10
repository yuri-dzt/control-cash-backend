import { PrismaUserRepository } from "../../repositories/prisma/user";
import { RefreshAccountController } from "../../controllers/user/refresh-account";
import { RefreshAccountUseCase } from "../../../app/use-cases/user/refresh-account";

export const RefreshAccountControllerFactory = () => {
  const userRepo = new PrismaUserRepository();
  const useCase = new RefreshAccountUseCase(
    userRepo
  );
  return new RefreshAccountController(useCase);
};
