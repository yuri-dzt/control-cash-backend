import { JwtService } from "../../services/jwt";
import { BcryptService } from "../../services/hash";
import { LoginController } from "../../controllers/auth/login";
import { LoginUseCase } from "../../../app/use-cases/auth/login";
import { PrismaUserRepository } from "../../repositories/prisma/user";

export const LoginControllerFactory = () => {
  const userRepo = new PrismaUserRepository();
  const jwtService = new JwtService();
  const hashService = new BcryptService();
  const useCase = new LoginUseCase(
    userRepo,
    jwtService,
    hashService
  );
  return new LoginController(useCase);
};
