import { BcryptService } from "../../services/hash";
import { CreateUserController } from "../../controllers/user/create";
import { PrismaUserRepository } from "../../repositories/prisma/user";
import { CreateUserUseCase } from "../../../app/use-cases/user/create";

export const CreateUserControllerFactory = () => {
  const userRepo = new PrismaUserRepository();
  const hashService = new BcryptService();
  const useCase = new CreateUserUseCase(
    userRepo,
    hashService
  );
  return new CreateUserController(useCase);
};
