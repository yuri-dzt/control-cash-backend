import { DeleteSystemOperatorController } from "../../controllers/system-operator/delete";
import { PrismaSystemOperatorRepository } from "../../repositories/prisma/system-operator";
import { DeleteSystemOperatorUseCase } from "../../../app/use-cases/system-operator/delete";

export const DeleteSystemOperatorControllerFactory = () => {
  const systemOperatorRepo = new PrismaSystemOperatorRepository();
  const useCase = new DeleteSystemOperatorUseCase(
    systemOperatorRepo
  );
  return new DeleteSystemOperatorController(useCase);
};
