import { BcryptService } from "../../services/hash";
import { PrismaAccountRepository } from "../../repositories/prisma/account";
import { UpdateSystemOperatorController } from "../../controllers/system-operator/update";
import { PrismaSystemOperatorRepository } from "../../repositories/prisma/system-operator";
import { UpdateSystemOperatorUseCase } from "../../../app/use-cases/system-operator/update";

export const UpdateSystemOperatorControllerFactory = () => {
  const systemOperatorRepo = new PrismaSystemOperatorRepository();
  const accountRepo = new PrismaAccountRepository();
  const hashService = new BcryptService();
  const useCase = new UpdateSystemOperatorUseCase(
    systemOperatorRepo,
    accountRepo,
    hashService,
  );
  return new UpdateSystemOperatorController(useCase);
};
