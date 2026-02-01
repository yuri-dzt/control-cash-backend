import { GetSystemOperatorsUseCaseInput } from "./input";
import { GetSystemOperatorsUseCaseError } from "./error";
import { ISystemOperatorDto } from "../../../../contracts/dtos/system-operator";
import { SystemOperatorMapper } from "../../../../contracts/mappers/system-operator";
import { ISystemOperatorRepository } from "../../../../contracts/repositories/system-operator";

export class GetSystemOperatorsUseCase {
  constructor(
    private readonly systemOperatorRepo: ISystemOperatorRepository,
  ) { }

  async execute(props: GetSystemOperatorsUseCaseInput): Promise<ISystemOperatorDto[] | GetSystemOperatorsUseCaseError> {
    try {
      const systemOperators = await this.systemOperatorRepo.getAll(props);
      if (!systemOperators) {
        return []
      }

      return systemOperators.map(SystemOperatorMapper.toDto)
    } catch {
      return new GetSystemOperatorsUseCaseError("Error occurred while getting system operator");
    }
  }
}
