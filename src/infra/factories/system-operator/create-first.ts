import { BcryptService } from "../../services/hash";
import { PrismaSystemOperatorRepository } from "../../repositories/prisma/system-operator";
import { CreateFirstSystemOperatorController } from "../../controllers/system-operator/create-first";
import { CreateFirstSystemOperatorUseCase } from "../../../app/use-cases/system-operator/create-first";

export const CreateFirstSystemOperatorControllerFactory = () => {
  const systemOperatorRepo = new PrismaSystemOperatorRepository();
  const hashService = new BcryptService();
  const useCase = new CreateFirstSystemOperatorUseCase(
    systemOperatorRepo,
    hashService,
  );
  return new CreateFirstSystemOperatorController(useCase);
};
