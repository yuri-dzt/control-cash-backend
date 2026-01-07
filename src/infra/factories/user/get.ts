import { GetUsersController } from "../../controllers/user/get";
import { GetUsersUseCase } from "../../../app/use-cases/user/get";
import { PrismaUserRepository } from "../../repositories/prisma/user";

export const GetUsersControllerFactory = () => {
  const userRepo = new PrismaUserRepository();
  const useCase = new GetUsersUseCase(
    userRepo
  );
  return new GetUsersController(useCase);
};
