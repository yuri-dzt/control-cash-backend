import { GetSystemOperatorsController } from "../../controllers/system-operator/get";
import { GetSystemOperatorsUseCase } from "../../../app/use-cases/system-operator/get";
import { PrismaSystemOperatorRepository } from "../../repositories/prisma/system-operator";

export const GetSystemOperatorsControllerFactory = () => {
  const systemOperatorRepo = new PrismaSystemOperatorRepository();
  const useCase = new GetSystemOperatorsUseCase(
    systemOperatorRepo
  );
  return new GetSystemOperatorsController(useCase);
};
