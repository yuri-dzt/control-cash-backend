import { BcryptService } from "../../services/hash";
import { UpdateUserController } from "../../controllers/user/update";
import { PrismaUserRepository } from "../../repositories/prisma/user";
import { UpdateUserUseCase } from "../../../app/use-cases/user/update";

export const UpdateUserControllerFactory = () => {
  const userRepo = new PrismaUserRepository();
  const hashService = new BcryptService();
  const useCase = new UpdateUserUseCase(
    userRepo,
    hashService
  );
  return new UpdateUserController(useCase);
};
