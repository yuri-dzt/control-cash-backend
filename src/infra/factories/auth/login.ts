import { JwtService } from "../../services/jwt";
import { BcryptService } from "../../services/hash";
import { LoginController } from "../../controllers/auth/login";
import { LoginUseCase } from "../../../app/use-cases/auth/login";
import { PrismaUserRepository } from "../../repositories/prisma/user";
import { PrismaSessionRepository } from "../../repositories/prisma/session";

export const LoginControllerFactory = () => {
  const userRepo = new PrismaUserRepository();
  const sessionRepo = new PrismaSessionRepository();
  const jwtService = new JwtService();
  const hashService = new BcryptService();
  const useCase = new LoginUseCase(
    userRepo,
    sessionRepo,
    jwtService,
    hashService
  );
  return new LoginController(useCase);
};
