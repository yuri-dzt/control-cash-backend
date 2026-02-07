import { JwtService } from "../../services/jwt";
import { BcryptService } from "../../services/hash";
import { LoginController } from "../../controllers/auth/login";
import { LoginUseCase } from "../../../app/use-cases/auth/login";
import { PrismaAccountRepository } from "../../repositories/prisma/account";

export const LoginControllerFactory = () => {
  const accountRepo = new PrismaAccountRepository();
  const jwtService = new JwtService();
  const hashService = new BcryptService();
  const useCase = new LoginUseCase(
    accountRepo,
    jwtService,
    hashService,
  );
  return new LoginController(useCase);
};
