import { BcryptService } from "../../services/hash";
import { PrismaAccountRepository } from "../../repositories/prisma/account";
import { CreateSystemOperatorController } from "../../controllers/system-operator/create";
import { PrismaSystemOperatorRepository } from "../../repositories/prisma/system-operator";
import { CreateSystemOperatorUseCase } from "../../../app/use-cases/system-operator/create";

export const CreateSystemOperatorControllerFactory = () => {
  const systemOperatorRepo = new PrismaSystemOperatorRepository();
  const accountRepo = new PrismaAccountRepository();
  const hashService = new BcryptService();
  const useCase = new CreateSystemOperatorUseCase(
    systemOperatorRepo,
    accountRepo,
    hashService,
  );
  return new CreateSystemOperatorController(useCase);
};
