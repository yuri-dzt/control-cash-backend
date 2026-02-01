import { DeleteSystemOperatorUseCaseInput } from "./input";
import { DeleteSystemOperatorUseCaseError } from "./error";
import { SystemOperatorRole } from "../../../../domain/entities/system-operator/enum";
import { ISystemOperatorRepository } from "../../../../contracts/repositories/system-operator";

export class DeleteSystemOperatorUseCase {
  constructor(
    private readonly systemOperatorRepo: ISystemOperatorRepository,
  ) { }

  async execute(props: DeleteSystemOperatorUseCaseInput): Promise<undefined | DeleteSystemOperatorUseCaseError> {
    try {
      const adminExist = await this.systemOperatorRepo.findById(props.admin_id);
      if (!adminExist) {
        return new DeleteSystemOperatorUseCaseError("Admin not found");
      }
      if (adminExist.role !== SystemOperatorRole.SUPER_ADMIN) {
        return new DeleteSystemOperatorUseCaseError("Admin does not have permission to delete");
      }

      const operatorExist = await this.systemOperatorRepo.findById(props.id);
      if (!operatorExist) {
        return new DeleteSystemOperatorUseCaseError("System operator not found");
      }

      await this.systemOperatorRepo.delete(operatorExist.id);

      return undefined
    } catch {
      return new DeleteSystemOperatorUseCaseError("Error occurred while deleting system operator");
    }
  }
}
