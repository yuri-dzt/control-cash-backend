import { DeleteUserController } from "../../controllers/user/delete";
import { PrismaUserRepository } from "../../repositories/prisma/user";
import { DeleteUserUseCase } from "../../../app/use-cases/user/delete";

export const DeleteUserControllerFactory = () => {
  const userRepo = new PrismaUserRepository();
  const useCase = new DeleteUserUseCase(
    userRepo
  );
  return new DeleteUserController(useCase);
};
