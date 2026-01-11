import { JwtService } from "../../services/jwt";
import { PrismaUserRepository } from "../../repositories/prisma/user";
import { PrismaSessionRepository } from "../../repositories/prisma/session";
import { RefreshTokenController } from "../../controllers/auth/refresh-token";
import { RefreshTokenUseCase } from "../../../app/use-cases/auth/refresh-token";

export const RefreshTokenControllerFactory = () => {
  const userRepo = new PrismaUserRepository();
  const sessionRepo = new PrismaSessionRepository();
  const jwtService = new JwtService();
  const useCase = new RefreshTokenUseCase(
    sessionRepo,
    userRepo,
    jwtService
  );
  return new RefreshTokenController(useCase);
};
